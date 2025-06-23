# datasetCreator.py

import os
import csv
import requests
import json
import shutil
from pathlib import Path
import re
from typing import List, Dict, Tuple, Optional
import time
import base64
from fileMetadata import FileMetadata

class CodeTestDatasetCreator:
    def __init__(self, root_dir: str = "dataset"):
        self.root_dir = Path(root_dir)
        self.jsonDataset_file = self.root_dir / "dataset.json"
        self.github_token = None
        self.session = requests.Session()
        self.processed_ids = set() # Per tenere traccia degli ID già processati
        self.max_files_per_language = None # Nuovo attributo per il limite di file per linguaggio
        self.language_counts = {} # Contatore per linguaggi
        self.dataset_content: Dict[str, List[Dict]] = {} # Nuovo: conterrà i dati del JSON

    def setup_directories(self):
        """Crea la struttura delle directory"""
        self.root_dir.mkdir(exist_ok=True)

    def init_json_dataset(self):
        """Inizializza il file JSON con una struttura vuota o carica i dati esistenti"""
        if not self.jsonDataset_file.exists():
            print(f"Creando un nuovo file dataset.json in {self.jsonDataset_file}")
            with open(self.jsonDataset_file, 'w', encoding='utf-8') as f:
                json.dump({}, f, indent=4) # Inizializza con un oggetto JSON vuoto
            self.dataset_content = {}
        else:
            # Carica i dati esistenti
            print(f"Caricando dati esistenti da {self.jsonDataset_file}")
            with open(self.jsonDataset_file, 'r', encoding='utf-8') as f:
                try:
                    self.dataset_content = json.load(f)
                    # Popola processed_ids e language_counts dai dati caricati
                    for lang, entries in self.dataset_content.items():
                        self.language_counts[lang] = len(entries)
                        for entry in entries:
                            # Assumiamo che 'id' sia una chiave univoca per l'identificazione
                            # Se non c'è un 'id' esplicito, potresti dover costruirne uno
                            # E.g., f"{entry['language']}_{entry['filename']}_{entry['source']}"
                            # Per questo esempio, userò 'id' se esiste, altrimenti una combinazione
                            file_id = entry.get('id', f"{entry['language']}_{entry['filename']}_{entry['source']}")
                            self.processed_ids.add(file_id)
                except json.JSONDecodeError:
                    print(f"Errore nella lettura del file JSON, lo inizializzo come vuoto.")
                    self.dataset_content = {}
            print(f"Caricati {len(self.processed_ids)} ID esistenti dal JSON.")

    def get_github_contents(self, repo: str, path: str = "") -> List[Dict]:
        """Ottiene i contenuti di una directory GitHub"""
        url = f"https://api.github.com/repos/{repo}/contents/{path}"
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'

        try:
            response = self.session.get(url, headers=headers)
            if response.status_code == 403:
                print(f"Rate limit raggiunto, attendere 60 secondi...")
                time.sleep(60)
                response = self.session.get(url, headers=headers) # Riprova dopo l'attesa

            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Errore nel recuperare {url}:\n{e}")
            return []

    def get_file_content(self, repo: str, file_path: str) -> Optional[str]:
        """Ottiene il contenuto di un file da GitHub"""
        url = f"https://api.github.com/repos/{repo}/contents/{file_path}"
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'

        try:
            response = self.session.get(url, headers=headers)
            if response.status_code == 404:
                return None
            response.raise_for_status()

            data = response.json()
            if data.get('encoding') == 'base64':
                content = base64.b64decode(data['content']).decode('utf-8')
                return content
            return data.get('content', '')
        except Exception as e:
            print(f"Errore nel recuperare contenuto {file_path}:\n{e}")
            return None

    def save_file_content(self, content: str, local_path: Path) -> bool:
        """Salva il contenuto in un file locale"""
        try:
            local_path.parent.mkdir(parents=True, exist_ok=True)
            with open(local_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"Errore nel salvare {local_path}:\n{e}")
            return False

    def process_language_directory(self, repo: str, language: str, path: str, source: str):
        """Processa una directory di linguaggio (es. per Exercism)"""
        contents = self.get_github_contents(repo, path)

        for item in contents:
            if item['type'] != 'dir':
                continue

            exercise_name = item['name']
            exercise_path = item['path']

            print(f"    Processando esercizio: {exercise_name}")

            # Trova file di codice e test nella directory dell'esercizio
            exercise_contents = self.get_github_contents(repo, exercise_path)

            code_files = []
            test_files = []

            for file_item in exercise_contents:
                if file_item['type'] != 'file':
                    continue

                filename = file_item['name']

                if self.is_solution_file(filename, language):
                    code_files.append(file_item)
                elif self.is_test_file(filename, language):
                    test_files.append(file_item)

            # Crea coppie codice-test
            self.create_code_test_pairs_v2(
                repo, code_files, test_files, language,
                exercise_name, source
            )

    def recursive_dir_solver(self, dirFile:Dict, dirPath:Path, repo:str):
        """Save a dir and it's content in dirPath"""
        if dirFile["type"] == "dir":
            sub_dir:Path = dirPath / dirFile["name"]
            sub_dir.mkdir(parents=True, exist_ok=True)
            dirContent = self.get_github_contents(repo,dirFile["path"])
            for f in dirContent:
                if f['type'] == "dir": self.recursive_dir_solver(f,sub_dir, repo)
                elif f['type'] == "file":
                    file_content = self.get_file_content(repo, f['path'])
                    if not self.save_file_content(file_content,sub_dir): raise Exception(f"Error saving file {f['name']} in dir {sub_dir}")
    
    def create_code_pair_by_dir(self, repo:str, srcDir:Dict, testDir:Dict, language:str, exercise_name:str, source:str, makeFile:Dict|None):
        file_id = f"{language}_{exercise_name}_{source}"
        if file_id in self.processed_ids:
            # print(f"      Saltando: {file_id} (già presente)")
            return
    
        src_dir_content = self.get_github_contents(repo, srcDir['path'])
        test_dir_content = self.get_github_contents(repo, testDir['path'])
        
        if not src_dir_content or not test_dir_content:
            print(f"      Impossibile ottenere contenuti per {exercise_name}")
            return
    
        for f in test_dir_content:
            if "test" in f["name"] and ".c" in f['name']:
                test_file = self.get_file_content(repo,f['path'])
                if not self.is_implemented_code(test_file, language):
                    print(f"      Codice non implementato per {exercise_name}, saltando...")
                    return
                
        # Crea la struttura delle directory
        lang_dir = self.root_dir / language
        code_dir = lang_dir / exercise_name
        code_dir.mkdir(parents=True, exist_ok=True)
        
        if makeFile : #save makefile
            makeFile_content = self.get_file_content(repo,makeFile['path'])
            self.save_file_content(makeFile_content,code_dir)
        
        src_dir = code_dir / "src"
        test_dir = code_dir / "test"
        src_dir.mkdir(parents=True, exist_ok=True)        
        test_dir.mkdir(parents=True, exist_ok=True)

        
        #save test dir in local
        for file in test_dir_content:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, test_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file":                                
                fileContent = self.get_file_content(repo, file['path'])
                if not self.save_file_content(fileContent,test_dir):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {test_dir}")
                
        #save src dir in local
        for file in src_dir_content:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, src_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file":                                
                fileContent = self.get_file_content(repo, file['path'])
                if not self.save_file_content(fileContent,src_dir):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {src_dir}")
             
        # Nomi dei file
        code_filename = f"{exercise_name}.{self.get_file_extension(language)}"
        test_filename = f"{exercise_name}_testSuite.{self.get_file_extension(language)}"

        try:
            self.add_to_json_dataset_v2(file_id,code_filename,test_filename,src_dir,test_dir,language,source)   
            self.processed_ids.add(file_id) # Aggiungi l'ID al set degli ID processati
            self.language_counts[language] = self.language_counts.get(language, 0) + 1 # Incrementa il contatore del linguaggio

            print(f"      ✓ Aggiunta coppia: {exercise_name} ({language}) da {source}. Totale per {language}: {self.language_counts[language]}")

        except Exception as e:
            shutil.rmtree(code_dir,True)
            raise e
        

    def create_code_pair_by_array(self, repo:str, srcDirArr:List[Dict], testDirArr:List[Dict], language:str, exercise_name:str, source:str, makeFile:Dict|None):
        file_id = f"{language}_{exercise_name}_{source}"
        if file_id in self.processed_ids:
            # print(f"      Saltando: {file_id} (già presente)")
            return
    
        for f in testDirArr:
            if "test" in f["name"] and ".c" in f['name']:
                test_file = self.get_file_content(repo,f['path'])
                if not self.is_implemented_code(test_file, language):
                    print(f"      Codice non implementato per {exercise_name}, saltando...")
                    return
                
        # Crea la struttura delle directory
        lang_dir = self.root_dir / language
        code_dir = lang_dir / exercise_name
        code_dir.mkdir(parents=True, exist_ok=True)
        
        if makeFile : #save makefile
            makeFile_content = self.get_file_content(repo,makeFile['path'])
            self.save_file_content(makeFile_content,code_dir)
        
        src_dir = code_dir / "src"
        test_dir = code_dir / "test"
        src_dir.mkdir(parents=True, exist_ok=True)        
        test_dir.mkdir(parents=True, exist_ok=True)

        
        #save test dir in local
        for file in testDirArr:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, test_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file":                                
                fileContent = self.get_file_content(repo, file['path'])
                if not self.save_file_content(fileContent,test_dir):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {test_dir}")
                
        #save src dir in local
        for file in srcDirArr:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, src_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file":                                
                fileContent = self.get_file_content(repo, file['path'])
                if not self.save_file_content(fileContent,src_dir):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {src_dir}")
             
        # Nomi dei file
        code_filename = f"{exercise_name}.{self.get_file_extension(language)}"
        test_filename = f"{exercise_name}_testSuite.{self.get_file_extension(language)}"

        try:
            self.add_to_json_dataset_v2(file_id,code_filename,test_filename,src_dir,test_dir,language,source)   
            self.processed_ids.add(file_id) # Aggiungi l'ID al set degli ID processati
            self.language_counts[language] = self.language_counts.get(language, 0) + 1 # Incrementa il contatore del linguaggio

            print(f"      ✓ Aggiunta coppia: {exercise_name} ({language}) da {source}. Totale per {language}: {self.language_counts[language]}")

        except Exception as e:
            shutil.rmtree(code_dir,True)
            raise e
        

    
            

    def create_single_code_test_pair(self, repo: str, code_file: Dict, test_file: Dict,
                                   language: str, exercise_name: str, source: str):
        """Crea una singola coppia codice-test e la aggiunge al dataset"""

        file_id = f"{language}_{exercise_name}_{source}"

        # Controlla se l'ID è già stato processato
        if file_id in self.processed_ids:
            # print(f"      Saltando: {file_id} (già presente)")
            return

        # Applica il limite di file per linguaggio, se impostato
        if self.max_files_per_language is not None:
            current_count = self.language_counts.get(language, 0)
            if current_count >= self.max_files_per_language:
                # print(f"      Limite raggiunto per {language}, saltando {exercise_name}")
                return

        # Ottieni i contenuti dei file
        code_content = self.get_file_content(repo, code_file['path'])
        test_content = self.get_file_content(repo, test_file['path'])

        if not code_content or not test_content:
            print(f"      Impossibile ottenere contenuti per {exercise_name} (codice: {code_file['name']}, test: {test_file['name']})")
            return

        # Verifica che sia effettivamente codice implementato (non template)
        if not self.is_implemented_code(code_content, language):
            print(f"      Codice non implementato per {exercise_name}, saltando...")
            return

        # Crea la struttura delle directory
        lang_dir = self.root_dir / language
        code_dir = lang_dir / exercise_name
        code_dir.mkdir(parents=True, exist_ok=True)

        # Nomi dei file
        code_filename = f"{exercise_name}.{self.get_file_extension(language)}"
        test_filename = f"{exercise_name}_testSuite.{self.get_file_extension(language)}"

        # Percorsi completi
        code_path = code_dir / code_filename
        test_path = code_dir / test_filename

        # Salva i file
        if (self.save_file_content(code_content, code_path) and
            self.save_file_content(test_content, test_path)):

            # Aggiungi al JSON
            self.add_to_json_dataset(
                file_id,
                code_filename,
                test_filename,
                str(code_path.relative_to(self.root_dir)),
                str(test_path.relative_to(self.root_dir)),
                language,
                source
            )
            self.processed_ids.add(file_id) # Aggiungi l'ID al set degli ID processati
            self.language_counts[language] = self.language_counts.get(language, 0) + 1 # Incrementa il contatore del linguaggio

            print(f"      ✓ Aggiunta coppia: {exercise_name} ({language}) da {source}. Totale per {language}: {self.language_counts[language]}")
        else:
            print(f"      ✗ Errore nel salvare: {exercise_name}")

    def create_code_test_pairs_v2(self, repo: str, code_files: List[Dict], test_files: List[Dict],
                                 language: str, exercise_name: str, source: str):
        """Crea coppie codice-test con la nuova struttura (usato da Exercism)"""

        for code_file in code_files:
            # Trova il test corrispondente
            matching_test = self.find_matching_test_v2(code_file, test_files, language)

            if not matching_test:
                print(f"      Nessun test trovato per {code_file['name']} in {exercise_name}")
                continue

            # CORREZIONE: Usa solo exercise_name, non combinarlo con il nome del file
            self.create_single_code_test_pair(
                repo, code_file, matching_test, language,
                exercise_name, source
            )

    def is_implemented_code(self, content: str, language: str) -> bool:
        """Verifica se il codice è effettivamente implementato e non un template"""
        content_lower = content.lower()

        # Pattern che indicano codice non implementato
        non_implemented_patterns = [
            'pass',  # Python
            'todo',
            'not implemented',
            'implement',
            'your code here',
            'fill in',
            '# write your code',
            '// write your code',
            'throw new error',  # JavaScript, TypeScript
            'return null;',
            'return undefined;',
            'function() {}',  # JavaScript vuota
            '// solution' # Commento generico che indica la necessità di implementazione
        ]

        # Se contiene solo pattern di non implementazione e il contenuto è molto breve, scarta
        for pattern in non_implemented_patterns:
            if pattern in content_lower and len(content.strip()) < 100:
                # Una stringa di "pass" o "todo" di 4-5 caratteri non è implementazione
                # Consideriamo anche commenti che sono solo segnaposto
                return False

        # Controlla la lunghezza effettiva del codice dopo aver rimosso commenti e spazi bianchi
        # Questa è una metrica più robusta dell'euristica dei pattern
        clean_content = re.sub(r'(#.*)|(//.*)|(/\*.*\*/)', '', content, flags=re.MULTILINE).strip()
        if len(clean_content) < 30: # Un minimo di 30 caratteri di codice significativo
            return False

        # Verifica che ci sia effettivamente logica implementata (euristiche aggiuntive)
        if language == 'python':
            # Deve contenere più di solo import e def/class e 'pass'
            lines = [line.strip() for line in content.split('\n') if line.strip()]
            non_empty_lines = [line for line in lines if not line.startswith('#')
                             and not line.startswith('import')
                             and not line.startswith('from')
                             and line != 'pass']
            return len(non_empty_lines) > 2 and "raise notimplementederror" not in content_lower

        elif language in ['javascript', 'js', 'typescript', 'ts']:
            # Deve contenere più di solo dichiarazioni di funzione vuote o throw new Error
            return ('return' in content_lower or 'console.log' in content_lower) and "throw new error" not in content_lower and len(content.strip()) > 50

        elif language == 'java':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'system.out' in content_lower) and len(content.strip()) > 100 and "throw new unsupportedoperationexception" not in content_lower

        elif language in ['cpp', 'c']:
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'cout' in content_lower or 'printf' in content_lower) and len(content.strip()) > 50

        elif language == 'go':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'fmt.' in content_lower) and len(content.strip()) > 50

        elif language == 'rust':
            # Deve contenere implementazioni reali e non solo panic!
            return ('return' in content_lower or 'println!' in content_lower) and "unimplemented!" not in content_lower and "todo!" not in content_lower and "panic!" not in content_lower and len(content.strip()) > 50

        return len(content.strip()) > 50  # Fallback generico

    def is_solution_file(self, filename: str, language: str) -> bool:
        """Determina se un file è una soluzione implementata"""
        filename_lower = filename.lower()

        # Non deve essere un file di test
        if self.is_test_file(filename, language):
            return False

        # Pattern per soluzioni
        solution_patterns = {
            'python': [r'\.py$'],
            'java': [r'\.java$'],
            'javascript': [r'\.js$'],
            'js': [r'\.js$'],
            'typescript': [r'\.ts$'], # Aggiunto TypeScript
            'ts': [r'\.ts$'], # Aggiunto TypeScript
            'cpp': [r'\.(cpp|cc|cxx)$'],
            'c': [r'\.c$'],
            'go': [r'\.go$'],
            'rust': [r'\.rs$'],
            'csharp': [r'\.cs$'],
            'ruby': [r'\.rb$'],
            'php': [r'\.php$']
        }

        if language not in solution_patterns:
            return False

        for pattern in solution_patterns[language]:
            if re.search(pattern, filename, re.IGNORECASE):
                return True
        return False

    def is_test_file(self, filename: str, language: str) -> bool:
        """Determina se un file è un file di test"""
        filename_lower = filename.lower()

        test_indicators = [
            'test', 'spec', 'check', 'verify',
            '_test', 'test_', '.test.', '.spec.'
        ]

        # Euristiche specifiche per linguaggio per escludere file non-test
        if language == 'python':
            # file come 'solution.py' o 'main.py' non sono test anche se contengono 'test' (es. test case in commento)
            if filename_lower.endswith('_solution.py') or filename_lower.endswith('main.py'):
                return False
            if filename_lower.startswith('test_') and filename_lower.endswith('.py'):
                return True
            if '_test.py' in filename_lower: # Es. my_module_test.py
                return True

        if language in ['javascript', 'js', 'typescript', 'ts']:
            if '.test.' in filename_lower or '.spec.' in filename_lower:
                return True
            if filename_lower.endswith('test.js') or filename_lower.endswith('test.ts'):
                return True
            if filename_lower.startswith('test-') and filename_lower.endswith('.js'): # per alcuni framework JS
                return True
            # Evita di marcare index.ts o index.js come test a meno che non sia specificamente index.test.ts
            if 'index.ts' in filename_lower and 'index.test.ts' not in filename_lower:
                return False
            if 'index.js' in filename_lower and 'index.test.js' not in filename_lower:
                return False

        if language == 'go':
            if '_test.go' in filename_lower:
                return True

        if language == 'rust':
            if filename_lower == 'test.rs': # Nome comune per test in Rust
                return True
            if 'test' in filename_lower and '#[test]' in filename_lower: # Per test integrati
                 return True

        # Fallback generico
        return any(indicator in filename_lower for indicator in test_indicators)

    def find_matching_test_v2(self, code_file: Dict, test_files: List[Dict], language: str) -> Optional[Dict]:
        """Trova il file di test corrispondente con logica migliorata"""
        code_name_stem = Path(code_file['name']).stem.lower() # Nome senza estensione

        # Prova a trovare un match esatto o molto simile basato sul nome
        for test_file in test_files:
            test_name_stem = Path(test_file['name']).stem.stem.lower() # Assicurati di prendere lo stem anche per il test file, e due volte per nomi come 'my_solution.test'
            # Euristiche per match:
            # 1. code_name è contenuto in test_name (es. 'solution' vs 'solution_test')
            # 2. test_name è basato su code_name (es. 'mycode' vs 'test_mycode')
            if code_name_stem in test_name_stem or \
               test_name_stem.replace('test_', '') == code_name_stem or \
               test_name_stem.replace('_test', '') == code_name_stem:
                return test_file

        # Se non trova un match specifico, ritorna il primo test file disponibile
        # Questo è un fallback e potrebbe non essere sempre corretto, ma è meglio di nulla
        return test_files[0] if test_files else None

    def is_supported_language(self, language: str) -> bool:
        """Verifica se il linguaggio è supportato e richiesto"""
        # Mappa linguaggi con nomi alternativi e aggiungi typescript
        language_mapping = {
            'python': ['python', 'py'],
            'java': ['java'],
            'javascript': ['javascript', 'js'],
            'typescript': ['typescript', 'ts'], # Aggiunto TypeScript
            'ts': ['typescript', 'ts'], # Aggiunto TypeScript
            'cpp': ['cpp', 'c++', 'cxx'],
            'c': ['c'],
            'go': ['go', 'golang'],
            'rust': ['rust', 'rs'],
            'csharp': ['csharp', 'c#', 'cs'],
            'ruby': ['ruby', 'rb'],
            'php': ['php']
        }

        # Normalize the input language
        normalized_language = language.lower()

        # If target_languages is not set, accept all supported languages
        if not hasattr(self, 'target_languages') or not self.target_languages:
            for lang_variants in language_mapping.values():
                if normalized_language in [v.lower() for v in lang_variants]:
                    return True
            return False

        # If target_languages are specified, check if the input language is among them
        for target_lang_requested in self.target_languages:
            for official_lang, variants in language_mapping.items():
                if target_lang_requested.lower() in [v.lower() for v in variants]:
                    if normalized_language in [v.lower() for v in variants]:
                        return True
        return False

    def get_file_extension(self, language: str) -> str:
        """Ritorna l'estensione file per il linguaggio"""
        extensions = {
            'python': 'py',
            'java': 'java',
            'javascript': 'js',
            'js': 'js',
            'typescript': 'ts', # Aggiunto
            'ts': 'ts', # Aggiunto
            'cpp': 'cpp',
            'c': 'c',
            'go': 'go',
            'rust': 'rs',
            'csharp': 'cs',
            'ruby': 'rb',
            'php': 'php'
        }
        return extensions.get(language.lower(), 'txt')

    def add_to_json_dataset(self, file_id: str, code_name: str, test_name: str,
                           code_path: str, test_path: str, language: str, source: str):
        """Aggiunge una entry al dataset JSON e lo salva"""
        if file_id in self.processed_ids:
            print(f"  ID {file_id} già processato, saltando l'aggiunta al JSON.")
            return

        lang_lower = language.lower()
        if lang_lower not in self.dataset_content:
            self.dataset_content[lang_lower] = []

        new_entry = {
            "id": file_id, # Aggiunto l'ID per facilitare il tracking
            "filename": code_name,
            "language": language,
            "source": source,
            "codeSnippetFilePath": code_path,
            "testUnitFilePath": test_path
        }
        self.dataset_content[lang_lower].append(new_entry)
        self.processed_ids.add(file_id) # Aggiungi l'ID al set di quelli processati

        # Salva il file JSON dopo ogni aggiunta per persistenza
        try:
            with open(self.jsonDataset_file, 'w', encoding='utf-8') as f:
                json.dump(self.dataset_content, f, indent=4)
        except Exception as e:
            print(f"Errore nel salvare il file JSON: {e}")
            
    
    def get_file_metadata(self, filePath:str, fileName:str):
        metadata = FileMetadata(filePath,fileName)
        return {
            'downloadDate':metadata.download_date(),
            'characterQuantity':metadata.character_count(),
            'wordQuantity':metadata.word_count()
        }
    
    def add_to_json_dataset_v2(self, file_id: str, code_name: str, test_name: str,
                           code_path: str, test_path: str, language: str, source: str):
        """Aggiunge una entry al dataset JSON e lo salva"""
        if file_id in self.processed_ids:
            print(f"  ID {file_id} già processato, saltando l'aggiunta al JSON.")
            return

        lang_lower = language.lower()
        if lang_lower not in self.dataset_content:
            self.dataset_content[lang_lower] = []



        new_entry = {
            "id": file_id, # Aggiunto l'ID per facilitare il tracking
            "filename": code_name,
            "language": language,
            "source": source,
            "codeSnippetFilePath": code_path,
            "testUnitFilePath": test_path,           
        }
        new_entry.update(self.get_file_metadata(code_path,code_name))
        
        
        self.dataset_content[lang_lower].append(new_entry)
        self.processed_ids.add(file_id) # Aggiungi l'ID al set di quelli processati

        # Salva il file JSON dopo ogni aggiunta per persistenza
        try:
            with open(self.jsonDataset_file, 'w', encoding='utf-8') as f:
                json.dump(self.dataset_content, f, indent=4)
        except Exception as e:
            print(f"Errore nel salvare il file JSON: {e}")
     
    def run_full_extraction(self, sources: List[str] = None, languages: List[str] = None):
        """Esegue l'estrazione completa del dataset"""
        if sources is None:
            sources = [
                'java-thomasZumsteg'
            ]
        if languages is None:
            languages = ['python', 'java', 'javascript', 'typescript', 'cpp', 'go', 'rust', 'csharp', 'ruby', 'php']

        self.target_languages = [lang.lower() for lang in languages]

        self.setup_directories()
        self.init_json_dataset() # Ora carica anche gli ID esistenti e il contenuto JSON

        print("=== Inizio creazione dataset con soluzioni umane ===")
        print(f"Linguaggi target: {', '.join(self.target_languages)}")

        try:   
            if "all_c" in sources : 
                repos = [
                    {"repo" : "", "name" : "","internalDirIsPresent":False, "source":"Exercism","licenseType":""},
                    {"repo" : "", "name" : "","internalDirIsPresent":False, "source":"Exercism","licenseType":""},
                    {"repo" : "", "name" : "","internalDirIsPresent":False, "source":"Exercism","licenseType":""},
                    {"repo" : "", "name" : "","internalDirIsPresent":False, "source":"Exercism","licenseType":""},
                ]
                self.process_all_c(repos)                                                                      

            """
            if "all_ts" in sources : 
                repos = [
                    {"repo" : "uzilan/exercism-solutions-typescript", "name" : "","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "thewanionly/exercism-typescript", "name" : "thewanionly","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "shybyte/exercism-typescript", "name" : "shybyte","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "chriswilding/exercism-typescript", "name" : "chriswilding","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "FilipeCerejo/exercism-typescript", "name" : "FilipeCerejo","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "alemarr/exercism-solutions-typescript", "name" : "alemarr","tsInternalDirIsPresent":False, "source":"Exercism"},                    
                ]
                self.process_all_ts(repos)
            """
            #if "samajammin" in sources:
            #    self.process_samajammin()
            #if "bearguns" in sources:
            #    self.process_bearguns()
            #if "PhymasSC" in sources:
            #    self.process_PhymasSC()
            #if "irvingbennett" in sources:
            #    self.process_irvingbennett()
            #if "programmiri" in sources:
            #    self.process_programmiri()
            #if "ffflorian" in sources:
            #    self.process_ffflorian()
            #if "oguzsh" in sources:
            #    self.process_oguzsh()
            #if "ThomasZumsteg-js" in sources:
            #    self.process_ThomasZumsteg_js()
            #if "robiworks" in sources:
            #    self.process_robiworks()
            #if "uzilan" in sources:
            #    self.process_uzilan()
            #if "mandarussell" in sources:
            #    self.process_mandarussell()
            #if "blogscot" in sources:
            #    self.process_blogscot()
            #if "RinatMambetov" in sources:
            #    self.process_RinatMambetov()
            #if "LauriESB" in sources:
            #    self.process_LauriESB()
            #if "java-exercism-shyvum" in sources:
            #    self.process_shyvum()
            #if 'java-thomasZumsteg' in sources:
            #    self.process_thomasZumsteg()            

        except Exception as e:
            print(f"Errore durante l'estrazione: {e}")
            import traceback
            traceback.print_exc()

        print(f"\n=== Dataset completato! ===")
        print(f"File JSON: {self.jsonDataset_file}")

        # Statistiche (ora basate su self.processed_ids e self.language_counts)
        print(f"Coppie codice-test create (totale): {len(self.processed_ids)}")
        print("\nDistribuzione per linguaggio (totale):")
        for lang, count in sorted(self.language_counts.items()):
            print(f"  - {lang}: {count} coppie")
     

       
    def process_all_c(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            ts_internal_dir = r["internalDirIsPresent"]
            source = r["source"]
            licenseType = r["licenseType"]
                        
            counter = 0
        
            print(f"\nProcessing repo {repo} (c) ({source})")  
            if ts_internal_dir : repo_contents = self.get_github_contents(repo,"c")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name:str= item["name"]
                    
                                                                
                    if ts_internal_dir:
                        conent = self.get_github_contents(repo, "c/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                        
                    file_name.replace("-","_")
                    print(f"\nProcessing filename : {file_name}")
                    
                    
                    makeFile = None
                    src_dir_content = None
                    test_dir_content = None
                    
                    src_dir_fileArr = []
                    test_dir_fileArr = []
                    
                    for f_item in conent:
                        if f_item['name'] == "makefile":
                            makeFile = f_item
                            
                        if f_item["type"] == "dir":
                            is_test_dir = "test" in f_item['name'] or "Test" in f_item['name'] 
                            dirContent = self.get_github_contents(repo,f_item["path"])
                            if is_test_dir : test_dir_content = dirContent
                            elif "src" in f_item['name'] or "Src" in f_item['name']: src_dir_content = dirContent
                            
                            for f in dirContent:
                                if is_test_dir : test_dir_fileArr.append(f)
                                else : src_dir_content.append(f)
                        
                        if f_item['type'] == "file" and file_name in f_item["name"]: 
                            if "test" in f_item["name"]:
                                test_dir_fileArr.append(f_item)
                            else:
                                src_dir_fileArr.append(f_item)     
                    
                    if src_dir_content and test_dir_content :
                        print(f"Creating pair for file : {file_name}")
                        self.create_code_pair_by_dir(repo,src_dir_content,test_dir_content, "c",file_name, source, makeFile)
                        counter +=1
                    elif len(src_dir_fileArr) > 0 and len(test_dir_fileArr) > 0:
                        print(f"Creating pair for file : {file_name}")                    
                        self.create_code_pair_by_array(repo,src_dir_fileArr,test_dir_fileArr, "c",file_name, source, makeFile)
                        counter +=1
                    
                        
                        
            print(f"\nProcessed {counter} typescript pairs for repo {repo} | {name} | {source}")
    
    
        
    #repositories already processed
    """
     
       
    def process_all_ts(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            ts_internal_dir = r["tsInternalDirIsPresent"]
            source = r["source"]
                        
            counter = 0
        
            print(f"\nProcessing repo {repo} (ts) ({source})")  
            if ts_internal_dir : repo_contents = self.get_github_contents(repo,"typescript")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name = item["name"]
                    print(f"\nProcessing filename : {file_name}")
                                                                
                    if ts_internal_dir:
                        conent = self.get_github_contents(repo, "typescript/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                    
                    
                    
                    main_file = None
                    test_file = None
                    for f_item in conent:
                        if f_item['type'] == "file" and file_name in f_item["name"]: 
                            if ".test." in f_item["name"]:
                                test_file = f_item
                            else:
                                main_file = f_item                                        
                    
                    if test_file and main_file : 
                        print(f"Creating pair for file : {file_name}")                    
                        self.create_single_code_test_pair(repo,main_file,test_file,"typescript",file_name,f"{source}-typescript-{name}")
                        counter +=1
                        
            print(f"\nProcessed {counter} typescript pairs for repo {repo} | {name} | {source}")
   
   
     def process_samajammin(self):
        repo = "samajammin/exercism"
        counter = 0
       
        print("\nProcessing samajammin exercism (js)")        
        repo_contents = self.get_github_contents(repo,"typescript")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, "typescript/"+file_name)
                #conent = self.get_github_contents(repo, "typescript/"+file_name)
                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".test." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item                                        
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"typescript",file_name,"exercism-javascript-samajammin")
                    counter +=1
                    
        print(f"\nProcessed {counter} typescript pairs for repo {repo}")
   
    def process_bearguns(self):
        repo = "bearguns/exercism-js"
       
        print("\nProcessing bearguns exercism (js)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item                                        
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-bearguns")
   
     
    def process_PhymasSC(self):
        repo = "PhymasSC/Exercism-Learning-Log"
       
        print("\nProcessing PhymasSC exercism (js)")        
        repo_contents = self.get_github_contents(repo,"javascript")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, "javascript/"+file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-PhymasSC")
   
   
    def process_irvingbennett(self):
        repo = "irvingbennett/javascript"
       
        print("\nProcessing irvingbennett exercism (js)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-irvingbennett")
       
    
    
    def process_programmiri(self):
        repo = "programmiri/exercism-javascript"
       
        print("\nProcessing programmiri exercism (js)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-programmiri")
      
    def process_ffflorian(self):
        repo = "ffflorian/exercism"
       
        print("\nProcessing ffflorian exercism (js)")        
        repo_contents = self.get_github_contents(repo,"javascript")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, "javascript/"+file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-ffflorian")
    

     def process_oguzsh(self):
        repo = "oguzsh/exercism-js-problems"
       
        print("\nProcessing oguzsh exercism (js)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                #print(f"-> test file fonud : {test_file != None}")
                #print(f"-> main file fonud : {main_file != None}")
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-oguzsh")
    
    
    def process_ThomasZumsteg_js(self):
        repo = "ThomasZumsteg/exercism-javascript"
       
        print("\nProcessing ThomasZumsteg_js exercism (js)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                                                              
                conent = self.get_github_contents(repo, file_name)                
                
                main_file = None
                test_file = None
                for f_item in conent:
                    if f_item['type'] == "file" and file_name in f_item["name"]: 
                        if ".spec." in f_item["name"]:
                            test_file = f_item
                        else:
                            main_file = f_item
                        
                
                #print(f"-> test file fonud : {test_file != None}")
                #print(f"-> main file fonud : {main_file != None}")
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"javascript",file_name,"exercism-javascript-ThomasZumsteg")
    
       
    def process_robiworks(self):
        repo = "robiworks/Exercism"
       
        print("\nProcessing robiworks exercism (Java)")        
        repo_contents = self.get_github_contents(repo,"java")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".gradle":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = "java/"+file_name+"/src/main/java"
                test_path = "java/"+file_name+"/src/test/java"
                
                if file_name == "lasagna": test_path+="/utils"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": 
                        main_file = f_item
                        break
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": 
                        test_file = f_item
                        break
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-uzilan")
 
 
    def process_mandarussell(self):
        repo = "mandarussell/Exercism-Java-Solutions"
       
        print("\nProcessing mandarussell exercism (Java)")        
        repo_contents = self.get_github_contents(repo,"java")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".idea":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = "java/"+file_name+"/src/main/java"
                test_path = "java/"+file_name+"/src/test/java"
                
                if file_name == "lasagna": test_path+="/utils"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": 
                        main_file = f_item
                        break
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": 
                        test_file = f_item
                        break
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-mandarussell")
       
    
    
    def process_blogscot(self):
        repo = "blogscot/exercism-java"
       
        print("\nProcessing blogscot exercism (Java)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".idea":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = file_name+"/src/main/java"
                test_path = file_name+"/src/test/java"
                
                if file_name == "lasagna": test_path+="/utils"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": 
                        main_file = f_item
                        break
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": 
                        test_file = f_item
                        break
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-blogscot")
    
    def process_RinatMambetov(self):
        repo = "RinatMambetov/exercism-java"
       
        print("\nProcessing RinatMambetov exercism (Java)")        
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".idea":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = file_name+"/src/main/java"
                test_path = file_name+"/src/test/java"
                
                if file_name == "lasagna": test_path+="/utils"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": 
                        main_file = f_item
                        break
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": 
                        test_file = f_item
                        break
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-RinatMambetov")
   
    
    def process_LauriESB(self):
        repo = "LauriESB/exercism-java"
       
        print("\nProcessing LauriESB exercism (Java)")        
        repo_contents = self.get_github_contents(repo,"solutions")
        for item in repo_contents :
            if item["type"] == "dir" :
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = "solutions/"+file_name+"/src/main/java"
                test_path = "solutions/"+file_name+"/src/test/java"
                
                if file_name == "lasagna": test_path+="/utils"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": 
                        main_file = f_item
                        break
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": 
                        test_file = f_item
                        break
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-LauriESB")
     
     
    def process_shyvum(self):   
        repo = "shyvum/Exercism"
       
        print("\nProcessing shyvum exercism (Java)")        
        repo_contents = self.get_github_contents(repo,"java")
        for item in repo_contents :
            if item["type"] == "dir" and item["name"] != ".idea":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = "java/"+file_name+"/src/main/java"
                test_path = "java/"+file_name+"/src/test/java"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": main_file = f_item
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": test_file = f_item
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-shyvum")
       
       
        #js:
        print("\nProcessing shyvum exercism (js)")
        repo_contents = self.get_github_contents(repo,"javascript")
        for item in repo_contents:
            if item["type"] == "dir" :
                file_name = item["name"]
                print(f"\nProcessing file : {file_name} (js)")
                dir_content = self.get_github_contents(repo, "javascript/"+file_name)
                code_file = None
                test_file = None
                for file in dir_content:
                    if file_name in str(file["name"]):
                        if "spec" in str(file["name"]): #test
                            test_file = file
                        else: 
                            code_file = file
                
                if code_file and test_file:
                    print(f"Creating pair for file : {file_name}")                    
                    self.create_single_code_test_pair(repo,code_file,test_file,"javascript",file_name,"exercism-javascript-shyvum")
                                    
    def process_thomasZumsteg(self):
        repo = "ThomasZumsteg/exercism-java"
        print("\nProcessing ThomasZumsteg exercism (Java)")
        repo_contents = self.get_github_contents(repo)
        for item in repo_contents :
            if item["type"] == "dir":
                file_name = item["name"]
                print(f"\nProcessing filename : {file_name}")
                
                main_path = file_name+"/src/main/java"
                test_path = file_name+"/src/test/java"
                
                main_conent = self.get_github_contents(repo, main_path)
                test_conent = self.get_github_contents(repo, test_path)
                
                main_file = None
                for f_item in main_conent:
                    if f_item['type'] == "file": main_file = f_item
                
                test_file = None
                for f_item in test_conent:
                    if f_item['type'] == "file": test_file = f_item
                    
                if test_file and main_file : 
                    print(f"Creating pair for file : {file_name}")
                    
                    self.create_single_code_test_pair(repo,main_file,test_file,"Java",file_name,"exercism-java-ThomasZumsteg")
    """
   

# Utilizzo per test rapidi (rimuovere o commentare in produzione)
if __name__ == "__main__":
    creator = CodeTestDatasetCreator()
    creator.github_token = os.getenv("GITHUB_TOKEN") # Carica il token da variabile d'ambiente

    # Esegui l'estrazione con tutti i linguaggi e le nuove fonti
    creator.run_full_extraction(
        sources=[
           #'java-thomasZumsteg'
           #"java-exercism-shyvum"
           #"LauriESB"
           #"RinatMambetov"
           #"blogscot"
           #"mandarussell"
           #"uzilan"
           #"robiworks"
           #"ThomasZumsteg-js"
           #"oguzsh"
           #"ffflorian"
           #"programmiri"
           #"irvingbennett"
            #"PhymasSC"
            #"bearguns"
            #"samajammin"
            #"all_ts"
            "all_c",
            #"all_c++",
            #"all_go"
        ],
        languages=[
            'python', 'javascript', 'java', 'cpp', 'go', 'rust', 'typescript',
            'c', 'csharp', 'ruby', 'php'
        ]
    )