# datasetCreator.py

import requests
import shutil
from pathlib import Path
import re
from typing import List, Dict, Tuple, Optional
import time
import base64
from fileMetadata import Metadata
import os
import json
import shutil
from dotenv import load_dotenv

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
        headers = {'Accept': 'application/vnd.github.v3+json',"User-Agent":"Awesome-Octocat-App"}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'

        try:
            time.sleep(3)
            response = self.session.get(url, headers=headers)
            if response.status_code == 403:
                print(f"Rate limit raggiunto, attendere 60 secondi...")
                print(url)
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
        headers = {'Accept': 'application/vnd.github.v3+json',"User-Agent":"Awesome-Octocat-App"}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'

        try:
            time.sleep(3)
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
            #print(f"saved file in path {local_path}")
            return True
        except Exception as e:
            print(f"Errore nel salvare content {content} in {local_path}:\n{e}")
            return False

    
    
    def remove_entry_by_id(self, target_id: str):
        json_file_path = str(self.jsonDataset_file)
        
        # Carica il file JSON
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Flag per sapere se abbiamo trovato l'ID
        found = False

        # Ciclo su ciascun linguaggio nel dizionario
        for language, entries in list(data.items()):
            for i, entry in enumerate(entries):
                if entry.get('id') == target_id:
                    # Ottieni il path da eliminare
                    code_path :str = entry.get('codeSnippetFilePath')
                    parts = code_path.split("/")
                    dir_path = ""
                    for i in range((len(parts)-1)): 
                        if i == 0 : dir_path += parts[i]
                        else : dir_path += ("/"+parts[i])
                        
                    if dir_path:
                        folder_path = self.root_dir / dir_path

                        # Elimina la cartella se esiste
                        if os.path.isdir(folder_path):
                            shutil.rmtree(folder_path)
                            print(f"Cartella '{folder_path}' eliminata.")
                        else:
                            print(f"Cartella '{folder_path}' non trovata.")

                    # Rimuovi l'entry dal dataset
                    del data[language][i]
                    found = True

                    # Se la lista per quel linguaggio è vuota, elimina anche la chiave
                    if not data[language]:
                        del data[language]
                    break

            if found:
                break

        if found:
            # Riscrive il JSON aggiornato
            with open(json_file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Entry con ID '{target_id}' rimossa dal file JSON.")
        else:
            print(f"ID '{target_id}' non trovato.")

    
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
                elif f['type'] == "file" and "." in f['name'] and self.is_valid_fileExt(f["name"]):
                    file_content = self.get_file_content(repo, f['path'])
                    complete_path = sub_dir / f['name']
                    if not self.save_file_content(file_content,complete_path): raise Exception(f"Error saving file {f['name']} in dir {sub_dir} (recursive dir solver)")
    
    def create_code_pair_by_dir(self, repo:str, srcDir:List[Dict], testDir:List[Dict], language:str, exercise_name:str, source:str, go_mod_file:Dict|None, license:str,build_dir_content:List[dict] | None):
        file_id = f"{language}_{exercise_name}_{source}"
        if file_id in self.processed_ids:
            print(f"      Saltando: {file_id} (già presente)")
            return
    
               
        # Crea la struttura delle directory
        source_for_path = source.replace(" ","_")
        source_for_path = source_for_path.replace("(","")
        source_for_path = source_for_path.replace(")","")
        lang_dir = self.root_dir / language
        code_dir = lang_dir / (exercise_name+"_"+source_for_path)
        code_dir.mkdir(parents=True, exist_ok=True)
        
        if go_mod_file : #save go mod file
            gomod_file_content = self.get_file_content(repo,go_mod_file['path'])
            complete_path = code_dir / go_mod_file['name']
            self.save_file_content(gomod_file_content,complete_path)
        
        src_dir = code_dir / "src"
        test_dir = code_dir / "test"
        build_dir = code_dir / "build"
        src_dir.mkdir(parents=True, exist_ok=True)        
        test_dir.mkdir(parents=True, exist_ok=True)

        # Nomi dei file
        code_filename = f"{exercise_name}.{self.get_file_extension(language)}"
        test_filename = f"{exercise_name}_testSuite.{self.get_file_extension(language)}"

        #save build dir in local : 
        if build_dir_content != None:
            build_dir.mkdir(parents=True, exist_ok=True) #create build dir in local
            for file in build_dir_content :
                if file['type'] == "dir":
                    try: self.recursive_dir_solver(file, build_dir, repo)
                    except Exception as e:
                        print(f"Error in recursive dir solver (creation of build dir):\n{e}")             
                        shutil.rmtree(code_dir,True)
                        raise e    
                elif file['type'] == "file" and self.is_valid_fileExt(str(file["name"])):
                    fileContent = self.get_file_content(repo, file['path'])
                    complete_path = build_dir / file['name']
                    if not self.save_file_content(fileContent,complete_path):                     
                        shutil.rmtree(code_dir,True)
                        raise Exception(f"\nError saving file {file['name']} in dir {build_dir}")


        #save test dir in local
        for file in testDir:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, test_dir, repo)
                except Exception as e:       
                    print(f"Error in recursive dir solver:\n{e}")             
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file" and self.is_valid_fileExt(str(file["name"])):
                fileContent = self.get_file_content(repo, file['path'])
                complete_path = test_dir / file['name']
                if not self.save_file_content(fileContent,complete_path):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"\nError saving file {file['name']} in dir {test_dir}")
                
        #save src dir in local
        mainFile = None
        for file in srcDir:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, src_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file" and self.is_valid_fileExt(str(file["name"])):
                if exercise_name in file['name'] and ".go" in file['name']:
                    mainFile = file
                    
                fileContent = self.get_file_content(repo, file['path'])
                complete_path = src_dir / file['name']
                if not self.save_file_content(fileContent,complete_path):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {src_dir}")
             

        try:
            if mainFile : localFilePath = src_dir / mainFile['name']
            else : localFilePath = src_dir / (exercise_name+".go")
            

            self.add_to_json_dataset_v2(file_id,code_filename,test_filename,src_dir,test_dir,language,source, localFilePath, license)   
            self.processed_ids.add(file_id) # Aggiungi l'ID al set degli ID processati
            self.language_counts[language] = self.language_counts.get(language, 0) + 1 # Incrementa il contatore del linguaggio

            print(f"      ✓ Aggiunta coppia: {exercise_name} ({language}) da {source}. Totale per {language}: {self.language_counts[language]}")

        except Exception as e:
            shutil.rmtree(code_dir,True)
            raise e
        

    def create_code_pair_by_array(self, repo:str, srcDirArr:List[Dict], testDirArr:List[Dict], language:str, exercise_name:str, source:str, go_mod_file:Dict|None, license:str):
        file_id = f"{language}_{exercise_name}_{source}"
        if file_id in self.processed_ids:
            print(f"      Saltando: {file_id} (già presente)")
            return
    
        # Crea la struttura delle directory
        source_for_path = source.replace(" ","_")
        source_for_path = source_for_path.replace("(","")
        source_for_path = source_for_path.replace(")","")
        lang_dir = self.root_dir / language
        code_dir = lang_dir / (exercise_name+"_"+source_for_path)
        code_dir.mkdir(parents=True, exist_ok=True)
        
        if go_mod_file : #save makefile
            go_mod_file_content = self.get_file_content(repo,go_mod_file['path'])
            complete_path = code_dir / go_mod_file['name']
            self.save_file_content(go_mod_file_content,complete_path)
        
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
                    print(f"err recursive:\n{e}")
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file" and self.is_valid_fileExt(str(file["name"])):
                fileContent = self.get_file_content(repo, file['path'])
                complete_path = test_dir / file['name']
                if not self.save_file_content(fileContent,complete_path):    
                    print(f"Error saving file {file['name']} in dir {test_dir} (test file)")
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {test_dir}")
                
        #save src dir in local
        mainFile = None
        for file in srcDirArr:
            if file['type'] == "dir": 
                try:
                    self.recursive_dir_solver(file, src_dir, repo)
                except Exception as e:                    
                    shutil.rmtree(code_dir,True)
                    raise e
            elif file['type'] == "file" and self.is_valid_fileExt(str(file["name"])):
                if exercise_name in file['name'] and ".go" in file['name'] and not "test" in file['name']:
                    mainFile = file
                    
                fileContent = self.get_file_content(repo, file['path'])
                complete_path = src_dir / file['name']
                if not self.save_file_content(fileContent,complete_path):                     
                    shutil.rmtree(code_dir,True)
                    raise Exception(f"Error saving file {file['name']} in dir {src_dir}")
             
        # Nomi dei file
        code_filename = f"{exercise_name}.{self.get_file_extension(language)}"
        test_filename = f"{exercise_name}_testSuite.{self.get_file_extension(language)}"

        try:
            if mainFile : localFilePath = src_dir / mainFile['name']
            else : localFilePath = src_dir / exercise_name
                        
            
            self.add_to_json_dataset_v2(file_id,code_filename,test_filename,src_dir,test_dir,language,source,localFilePath,license)   
            self.processed_ids.add(file_id) # Aggiungi l'ID al set degli ID processati
            self.language_counts[language] = self.language_counts.get(language, 0) + 1 # Incrementa il contatore del linguaggio

            print(f"      ✓ Aggiunta coppia: {exercise_name} ({language}) da {source}. Totale per {language}: {self.language_counts[language]}")

        except Exception as e:
            shutil.rmtree(code_dir,True)
            raise e
        

    def create_single_code_test_pair(self, repo: str, code_file: Dict, test_file: Dict,
                                   language: str, exercise_name: str, source: str):
        """Crea una singola coppia codice-test e la aggiunge al dataset"""
        license = "None"
        name = (repo.split("/"))[0]
        file_id = f"{language}_{exercise_name}_{source}"

        # Controlla se l'ID è già stato processato
        if file_id in self.processed_ids:
            self.remove_entry_by_id(file_id)
            
        file_id = f"{language}_{exercise_name}_{source}_{name}"

        # Applica il limite di file per linguaggio, se impostato
        if self.max_files_per_language is not None:
            current_count = self.language_counts.get(language, 0)
            if current_count >= self.max_files_per_language:
                print(f"      Limite raggiunto per {language}, saltando {exercise_name}")
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
        source_for_path = source.replace(" ","_")
        source_for_path = source_for_path.replace("(","")
        source_for_path = source_for_path.replace(")","")
        if not name in source_for_path : source_for_path += ("_"+name)
        lang_dir = self.root_dir / language
        code_dir = lang_dir / (exercise_name+"_"+source_for_path)       
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
            self.add_to_json_dataset_v2(
                file_id,
                code_filename,
                test_filename,
                str(code_path.relative_to(self.root_dir)),
                str(test_path.relative_to(self.root_dir)),
                language,
                source,
                code_path,
                license
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

        elif language =='c':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'cout' in content_lower or 'printf' in content_lower) and len(content.strip()) > 20

        elif language =='cpp':
            # Deve contenere implementazioni reali
            return len(content.strip()) > 20


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

    def is_valid_fileExt(self, fileName:str) -> bool:
        parts = fileName.split(".")
        ext = parts[(len(parts)-1)]
        if ext in ["o","out","json","filters","sln","vcxproj",".vs","suo","sln","bin","db","exe","obj"]: return False
        else : return "." in fileName

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
    
    def is_camel_case_version(self, str1: str, str2: str) -> bool:
        # Rimuove eventuali estensioni
        str1 = str1.split('.')[0]
        str2 = str2.split('.')[0]

        # Funzione per convertire snake_case in CamelCase o camelCase
        def to_camel_case(snake: str) -> str:
            parts = snake.split('_')
            return parts[0] + ''.join(word.capitalize() for word in parts[1:])

        camel = to_camel_case(str1)
        pascal = camel[0].upper() + camel[1:]

        # Match esatto o come prefisso
        return str2.startswith(camel) or str2.startswith(pascal)

    
    def save_dataset_entry(self,entry,language:str):    
        file_id = entry['id']
        if file_id in self.processed_ids:
            print(f"  ID {file_id} già processato, saltando l'aggiunta al JSON.")
            return

        lang_lower = language.lower()
        if lang_lower not in self.dataset_content:
            self.dataset_content[lang_lower] = []

       
        self.dataset_content[lang_lower].append(entry)
        self.processed_ids.add(file_id) # Aggiungi l'ID al set di quelli processati

        # Salva il file JSON dopo ogni aggiunta per persistenza
        try:
            with open(self.jsonDataset_file, 'w', encoding='utf-8') as f:
                json.dump(self.dataset_content, f, indent=4)
        except Exception as e:
            print(f"Errore nel salvare il file JSON (save dataset entry):\n{e}")

    
    def get_file_metadata(self, filePath:str, fileName:str):
        metadata = Metadata(filePath,fileName)
        return {
            'downloadDate':metadata.download_date(),
            'characterQuantity':metadata.character_count(),
            'wordQuantity':metadata.word_count()
        }
    
    def add_to_json_dataset_v2(self, file_id: str, code_name: str, test_name: str,
                           code_path: str, test_path: str, language: str, source: str, localFilePath:Path,license:str):
        """Aggiunge una entry al dataset JSON e lo salva"""
        if file_id in self.processed_ids:
            print(f"  ID {file_id} già processato, saltando l'aggiunta al JSON.")
            return

        lang_lower = language.lower()
        if lang_lower not in self.dataset_content:
            self.dataset_content[lang_lower] = []

        parsedPath = str(localFilePath)
        if not parsedPath.endswith(".c") and language == "c" : parsedPath += ".c"
        parsedPath = Path(__file__).parent / parsedPath        
        parsedPath = str(parsedPath.resolve())
        

        new_entry = {
            "id": file_id, # Aggiunto l'ID per facilitare il tracking
            "filename": code_name,
            "language": language,
            "source": source,
            "codeSnippetFilePath": str(code_path),
            "testUnitFilePath": str(test_path),   
            "licenseType":license        
        }
        new_entry.update(self.get_file_metadata(parsedPath,code_name))
        
        
        self.dataset_content[lang_lower].append(new_entry)
        self.processed_ids.add(file_id) # Aggiungi l'ID al set di quelli processati

        # Salva il file JSON dopo ogni aggiunta per persistenza
        try:
            with open(self.jsonDataset_file, 'w', encoding='utf-8') as f:
                json.dump(self.dataset_content, f, indent=4)
        except Exception as e:
            print(f"Errore nel salvare il file JSON (v2): {e}")
     
    def run_full_extraction(self, sources: List[str] = None, languages: List[str] = None):
        """Esegue l'estrazione completa del dataset"""
        if sources is None:
            sources = [
                #'all_go'
                'all_java'
            ]
        if languages is None:
            languages = ['python', 'java', 'javascript', 'typescript', 'cpp', 'go', 'rust', 'csharp', 'ruby', 'php']

        self.target_languages = [lang.lower() for lang in languages]

        self.setup_directories()
        self.init_json_dataset() # Ora carica anche gli ID esistenti e il contenuto JSON

        print("=== Inizio creazione dataset con soluzioni umane ===")
        print(f"Linguaggi target: {', '.join(self.target_languages)}")

        try:
            if "all_java" in sources:
                repos = [ #internalDirIsPresent True <==> dir 'java' in root dir of repo
                    {"repo" : "rabestro/exercism-solutions-java", "name" : "rabestro","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    {"repo" : "ValMati/exercism-java", "name" : "ValMati","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    {"repo" : "tusktenon/exercism-java", "name" : "tusktenon","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "zzorgg/Exercism", "name" : "zzorgg","internalDirIsPresent":True, "source":"Exercism","licenseType":"None"},
                ]
                self.process_all_java(repos)  
                
            
            """
            if "all_go" in sources : 
                repos = [
                    {"repo" : "rootulp/exercism", "name" : "rootulp","internalDirIsPresent":True, "source":"Exercism","licenseType":"MIT"},
                    {"repo" : "ThomasZumsteg/exercism-go", "name" : "ThomasZumsteg","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "thinkverse/exercism-go", "name" : "thinkverse","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "drapala/exercism_go", "name" : "drapala","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                ]
                self.process_all_go(repos)  
            
            
            if "all_cpp" in sources : 
                repos = [
                    #{"repo" : "johnngugi/exercism-cpp", "name" : "johnngugi","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "ThomasZumsteg/exercism-cpp", "name" : "ThomasZumsteg","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "Akshive/Exercism-cpp-solutions", "name" : "Akshive","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    #{"repo" : "cmccandless/ExercismSolutions-cpp", "name" : "cmccandless","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    #{"repo" : "pawelo091991/Cpp-Exercism-Solutions", "name" : "pawelo091991","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "denniskovshov/exercism-cpp", "name" : "denniskovshov","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"}                    
                    {"repo" : "viniciusjavs/exercism-cpp", "name" : "viniciusjavs","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "blogscot/exercism-cpp", "name" : "blogscot","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "MaxyMoos/exercism_cpp", "name" : "MaxyMoos","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "", "name" : "","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"}
                    
                ]
                self.process_all_cpp(repos)  
            
            
            if "all_c" in sources : 
                repos = [
                    #{"repo" : "HeitorMP/exercism-C", "name" : "HeitorMP","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "ThomasZumsteg/exercism-c", "name" : "ThomasZumsteg","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "chriswilding/exercism-c", "name" : "chriswilding","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    #{"repo" : "paddydoyle/exercism-c", "name" : "paddydoyle","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    #{"repo" : "m3g4d1v3r/exercism_c_solutions", "name" : "m3g4d1v3r","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "leleah/Exercism_solutions_c", "name" : "leleah","internalDirIsPresent":False, "source":"Exercism","licenseType":"None"},
                    {"repo" : "attilahorvath/exercism-c", "name" : "attilahorvath","internalDirIsPresent":False, "source":"Exercism","licenseType":"MIT"},
                    {"repo" : "vlzware/exercism_c", "name" : "vlzware","internalDirIsPresent":True, "source":"Exercism","licenseType":"MIT"},
                ]
                self.process_all_c(repos)                                                                      

            
            if "all_ts" in sources : 
                repos = [
                    {"repo" : "uzilan/exercism-solutions-typescript", "name" : "uzilan","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "thewanionly/exercism-typescript", "name" : "thewanionly","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "shybyte/exercism-typescript", "name" : "shybyte","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "chriswilding/exercism-typescript", "name" : "chriswilding","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "FilipeCerejo/exercism-typescript", "name" : "FilipeCerejo","tsInternalDirIsPresent":False, "source":"Exercism"},
                    {"repo" : "alemarr/exercism-solutions-typescript", "name" : "alemarr","tsInternalDirIsPresent":False, "source":"Exercism"},                    
                ]
                self.process_all_ts(repos)
           
            if "samajammin" in sources:
                self.process_samajammin()
            if "bearguns" in sources:
                self.process_bearguns()
            if "PhymasSC" in sources:
                self.process_PhymasSC()
            if "irvingbennett" in sources:
                self.process_irvingbennett()
            if "programmiri" in sources:
                self.process_programmiri()
            if "ffflorian" in sources:
                self.process_ffflorian()
            if "oguzsh" in sources:
                self.process_oguzsh()
            if "ThomasZumsteg-js" in sources:
                self.process_ThomasZumsteg_js()
            if "robiworks" in sources:
                self.process_robiworks()
            #if "uzilan" in sources:
                #self.process_uzilan()
            
            if "mandarussell" in sources:
                self.process_mandarussell()
            if "blogscot" in sources:
                self.process_blogscot()
            if "RinatMambetov" in sources:
                self.process_RinatMambetov()
            if "LauriESB" in sources:
                self.process_LauriESB()
            if "java-exercism-shyvum" in sources:
                self.process_shyvum()
            if 'java-thomasZumsteg' in sources:
                self.process_thomasZumsteg()     
            """       

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
     

    def get_dataset_go_entries(self):
        self.dataset_content.get("go", [])                    
       
    def process_files_to_add(self,files,exercism_name:str,source:str,repo,lang_ext:str = ".go") -> List[str]:
        code_paths = []
        for f in files :
            if self.is_camel_case_version(exercism_name,f['name']) and str(f['name']).endswith(lang_ext):
                print(f"adding file {f['name']} to exercism {exercism_name}")
                                    
                # Crea la struttura delle directory
                source_for_path = source.replace(" ","_")
                source_for_path = source_for_path.replace("(","")
                source_for_path = source_for_path.replace(")","")
                lang_dir = self.root_dir / lang_ext.replace(".","")
                code_dir = lang_dir / (exercism_name+"_"+source_for_path)
                
                file_content = self.get_file_content(repo, f['path'])
                complete_path = code_dir / f['name']
                self.save_file_content(file_content,complete_path)
                print(f"✅ saved file {complete_path} (to exercism {exercism_name})")
                code_paths.append(complete_path)
        
        return code_paths
                
   
    def process_all_java(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            internalDirIsPresent = r["internalDirIsPresent"]
            source = r["source"]
            licenseType = r["licenseType"]
            if not name in source : 
                fullName = name
                if not "java" in name : fullName = "java_"+fullName
                source += f" ({fullName})"
            counter = 0
        
            print(f"\nProcessing repo {repo} (Java) ({source})")  
            if internalDirIsPresent : repo_contents = self.get_github_contents(repo,"java")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name:str= item["name"]
                    
                    code_snippet_present = False
                    test_file_present = False
                    
                                                                
                    if internalDirIsPresent:
                        conent = self.get_github_contents(repo, "java/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                        
                    file_name = file_name.replace("-","_")
                    print(f"\nProcessing filename : {file_name}")
                                                         
                    code_snippet_filename = ""                                        
                    test_file_filename = ""                                        
                    
                    files_to_add = []
                    for f_item in conent: #exercise_dir     
                        if f_item["type"] == "dir" and f_item['name'] == "src": #exercise_dir/src
                            src_dir_content = self.get_github_contents(repo,f_item['path'])
                            for element in src_dir_content : 
                                
                                #exercise_dir/src/main or exercise_dir/src/test
                                if element["type"] == "dir" and (element['name'] == "main" or element['name'] == "test"):
                                    dir_content = self.get_github_contents(repo,element['path'])
                                    for el in dir_content : 
                                        
                                        if el['type'] == "dir" and el['name'] == "java":
                                            java_dir_content = self.get_github_contents(repo,el['path'])
                                            #exercise_dir/src/main/java or exercise_dir/src/test/java
                                            for f in java_dir_content : 
                                                cc_test = self.is_camel_case_version(file_name,f['name'])
                                                if cc_test and f['type'] == "file" and str(f['name']).endswith('.java'):
                                                    files_to_add.append(f)
                                                    if element['name'] == "main" : 
                                                        code_snippet_present = True
                                                        code_snippet_filename = f['name']
                                                        print(f"🟢 code snippet found for file {f['name']}")
                                                    if element['name'] == "test" : 
                                                        test_file_present = True
                                                        test_file_filename = f['name']
                                                        print(f"🟢 test file found for file {f['name']}")
                                                else : 
                                                    print(f"cc_test = {cc_test} for file {f['name']} -> file_name = {file_name}")
                                                    
                                        
                                        cc_test_2 = self.is_camel_case_version(file_name,el['name'])
                                        if cc_test_2 and el['type'] == "file" and str(el['name']).endswith('.java'):
                                            files_to_add.append(el)
                                            if element['name'] == "main" : 
                                                code_snippet_present = True
                                                code_snippet_filename = el['name']
                                                print(f"🟢 code snippet found for file {el['name']}")
                                                
                                            if element['name'] == "test" : 
                                                test_file_present = True
                                                test_file_filename = el['name']
                                                print(f"🟢 test file found for file {el['name']}")
                                        else :
                                            print(f"cc_test_2 = {cc_test_2} for file {el['name']} -> file_name = {file_name}")
                                               
                                

                                                                                                                    
                    #file_id = f"go_{file_name}_{source}"
                    
                    #check if main & test file are present
                    
                    if code_snippet_present and test_file_present:  
                        code_paths : List[str] = self.process_files_to_add(files_to_add,file_name,source,repo,'.java')
                        counter += 1
                        e_id = f"Java_{file_name}_{source}"
                        codeSnippetFilePath = ""
                        testUnitFilePath = ""
                        for p in code_paths : 
                            
                            p = (str(p)).replace("dataset/","")
                            p = (str(p)).replace("java/","Java/")
                            
                            if test_file_filename in p :
                                testUnitFilePath = p
                                continue
                            
                            if code_snippet_filename in p: 
                                codeSnippetFilePath = p
                        
                        parsed_path = Path(__file__).parent / "dataset" / codeSnippetFilePath  
                        metadata = self.get_file_metadata(parsed_path,code_snippet_filename)
                        
                        entry = {
                            "id": e_id,
                            "filename": code_snippet_filename,
                            "language": "Java",
                            "source": source,
                            "codeSnippetFilePath": codeSnippetFilePath,
                            "testUnitFilePath": testUnitFilePath,
                            "licenseType": licenseType,
                            "downloadDate": metadata['downloadDate'],
                            "characterQuantity":  metadata['characterQuantity'],
                            "wordQuantity":  metadata['wordQuantity']
                        }
                        self.save_dataset_entry(entry,'java')

                    else:
                        print(f"🟡 pairs not found for file {file_name}")
                    
                    """
                    if src_dir_content and test_dir_content :
                        print(f"Creating pair for file : {file_name} (by dir)")
                        self.create_code_pair_by_dir(repo,src_dir_content,test_dir_content, "go",file_name, source, go_mod_File,licenseType,build_dir_content)
                        counter +=1
                    elif len(src_dir_fileArr) > 0 and len(test_dir_fileArr) > 0:
                        main_file_is_present = False
                        for file in src_dir_fileArr:
                            #print(F"f name : {file['name']}")
                            if file_name in file["name"] and not "test" in file["name"] and str(file["name"]).endswith(".go") :
                                main_file_is_present = True
                                break
                            
                        if not main_file_is_present:
                            print(f"Skip creation pair for file : {file_name} (by arr) : main file NOT found")                        
                        else:
                            print(f"Creating pair for file : {file_name} (by arr)")                    
                            self.create_code_pair_by_array(repo,src_dir_fileArr,test_dir_fileArr, "go",file_name, source, go_mod_File,licenseType)
                            counter +=1
                    """
                        
                        
            print(f"\nProcessed {counter} java pairs for repo {repo} | {name} | {source}")
                
    
    def process_all_go(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            internalDirIsPresent = r["internalDirIsPresent"]
            source = r["source"]
            licenseType = r["licenseType"]
            if not name in source : 
                fullName = name
                if not "go" in name : fullName = "go_"+fullName
                source += f" ({fullName})"
            counter = 0
        
            print(f"\nProcessing repo {repo} (go) ({source})")  
            if internalDirIsPresent : repo_contents = self.get_github_contents(repo,"go")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name:str= item["name"]
                    
                                                                
                    if internalDirIsPresent:
                        conent = self.get_github_contents(repo, "go/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                        
                    file_name = file_name.replace("-","_")
                    print(f"\nProcessing filename : {file_name}")
                    
                    
                    go_mod_File = None
                    src_dir_content = None
                    test_dir_content = None
                    build_dir_content = None
                    
                    src_dir_fileArr = []
                    test_dir_fileArr = []
                    
                    files_to_add = []
                    for f_item in conent:                     
                        if f_item['name'] == "go.mod" : go_mod_File = f_item
                            
                        #process internal dir
                        if f_item["type"] == "dir" and f_item['name'] != ".exercism":
                            #is_test_dir = "test" in f_item['name'] or "Test" in f_item['name'] 
                            dirContent = self.get_github_contents(repo,f_item["path"])
                            #if is_test_dir : test_dir_content = dirContent
                            #elif "src" in f_item['name'] or "Src" in f_item['name']: src_dir_content = dirContent
                            #elif "build" in f_item['name'] or "Build" in f_item['name']: build_dir_content = dirContent
                            
                            for f in dirContent:
                                if str(f['name']).endswith(".go") : files_to_add.append(f)
                                #if is_test_dir : test_dir_fileArr.append(f)
                                #else : src_dir_fileArr.append(f)
                        
                        if f_item['type'] == "file": # and file_name in f_item["name"]: 
                            if str(f_item['name']).endswith(".go") : files_to_add.append(f_item)
                            #if "test" in f_item["name"]:
                            #    test_dir_fileArr.append(f_item)
                            #else:
                            #    src_dir_fileArr.append(f_item)     
                    
                    #file_id = f"go_{file_name}_{source}"
                    self.process_files_to_add(files_to_add,file_name,source,repo)
                    
                    """
                    if src_dir_content and test_dir_content :
                        print(f"Creating pair for file : {file_name} (by dir)")
                        self.create_code_pair_by_dir(repo,src_dir_content,test_dir_content, "go",file_name, source, go_mod_File,licenseType,build_dir_content)
                        counter +=1
                    elif len(src_dir_fileArr) > 0 and len(test_dir_fileArr) > 0:
                        main_file_is_present = False
                        for file in src_dir_fileArr:
                            #print(F"f name : {file['name']}")
                            if file_name in file["name"] and not "test" in file["name"] and str(file["name"]).endswith(".go") :
                                main_file_is_present = True
                                break
                            
                        if not main_file_is_present:
                            print(f"Skip creation pair for file : {file_name} (by arr) : main file NOT found")                        
                        else:
                            print(f"Creating pair for file : {file_name} (by arr)")                    
                            self.create_code_pair_by_array(repo,src_dir_fileArr,test_dir_fileArr, "go",file_name, source, go_mod_File,licenseType)
                            counter +=1
                    """
                        
                        
            print(f"\nProcessed {counter} go pairs for repo {repo} | {name} | {source}")
    
    
        
    #repositories already processed
   
    """ 
    def process_all_cpp(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            internalDirIsPresent = r["internalDirIsPresent"]
            source = r["source"]
            licenseType = r["licenseType"]
            if not name in source : 
                source += f" ({name})"
            counter = 0
        
            print(f"\nProcessing repo {repo} (cpp) ({source})")  
            if internalDirIsPresent : repo_contents = self.get_github_contents(repo,"cpp")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name:str= item["name"]
                    
                                                                
                    if internalDirIsPresent:
                        conent = self.get_github_contents(repo, "cpp/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                        
                    file_name = file_name.replace("-","_")
                    print(f"\nProcessing filename : {file_name}")
                    
                    
                    makeFile = None
                    src_dir_content = None
                    test_dir_content = None
                    build_dir_content = None
                    
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
                            elif "build" in f_item['name'] or "Build" in f_item['name']: build_dir_content = dirContent
                            
                            for f in dirContent:
                                if is_test_dir : test_dir_fileArr.append(f)
                                else : src_dir_fileArr.append(f)
                        
                        if f_item['type'] == "file" and file_name in f_item["name"]: 
                            if "test" in f_item["name"]:
                                test_dir_fileArr.append(f_item)
                            else:
                                src_dir_fileArr.append(f_item)     
                    
                    if src_dir_content and test_dir_content :
                        print(f"Creating pair for file : {file_name} (by dir)")
                        self.create_code_pair_by_dir(repo,src_dir_content,test_dir_content, "cpp",file_name, source, makeFile,licenseType,build_dir_content)
                        counter +=1
                    elif len(src_dir_fileArr) > 0 and len(test_dir_fileArr) > 0:
                        main_file_is_present = False
                        for file in src_dir_fileArr:
                            #print(F"f name : {file['name']}")
                            if file_name in file["name"] and not "test" in file["name"] and str(file["name"]).endswith(".cpp") :
                                main_file_is_present = True
                                break
                            
                        if not main_file_is_present:
                            print(f"Skip creation pair for file : {file_name} (by arr) : main file NOT found")                        
                        else:
                            print(f"Creating pair for file : {file_name} (by arr)")                    
                            self.create_code_pair_by_array(repo,src_dir_fileArr,test_dir_fileArr, "cpp",file_name, source, makeFile,licenseType)
                            counter +=1
                    
                        
                        
            print(f"\nProcessed {counter} c++ pairs for repo {repo} | {name} | {source}")
    
        
    def process_all_c(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            internalDirIsPresent = r["internalDirIsPresent"]
            source = r["source"]
            licenseType = r["licenseType"]
            if not name in source : 
                source += f" ({name})"
            counter = 0
        
            print(f"\nProcessing repo {repo} (c) ({source})")  
            if internalDirIsPresent : repo_contents = self.get_github_contents(repo,"c")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name:str= item["name"]
                    
                                                                
                    if internalDirIsPresent:
                        conent = self.get_github_contents(repo, "c/"+file_name)
                    else:
                        conent = self.get_github_contents(repo, file_name)
                        
                    file_name = file_name.replace("-","_")
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
                                else : src_dir_fileArr.append(f)
                        
                        if f_item['type'] == "file" and file_name in f_item["name"]: 
                            if "test" in f_item["name"]:
                                test_dir_fileArr.append(f_item)
                            else:
                                src_dir_fileArr.append(f_item)     
                    
                    if src_dir_content and test_dir_content :
                        print(f"Creating pair for file : {file_name} (by dir)")
                        self.create_code_pair_by_dir(repo,src_dir_content,test_dir_content, "c",file_name, source, makeFile,licenseType)
                        counter +=1
                    elif len(src_dir_fileArr) > 0 and len(test_dir_fileArr) > 0:
                        print(f"Creating pair for file : {file_name} (by arr)")                    
                        self.create_code_pair_by_array(repo,src_dir_fileArr,test_dir_fileArr, "c",file_name, source, makeFile,licenseType)
                        counter +=1
                    
                        
                        
            print(f"\nProcessed {counter} c pairs for repo {repo} | {name} | {source}")
    
    
     
       
    def process_all_ts(self, repos):
        for r in repos:
            repo = r["repo"]
            name = r["name"]
            internalDirIsPresent = r["tsInternalDirIsPresent"]
            source = r["source"]
                        
            counter = 0
        
            print(f"\nProcessing repo {repo} (ts) ({source})")  
            if internalDirIsPresent : repo_contents = self.get_github_contents(repo,"typescript")
            else : repo_contents = self.get_github_contents(repo)
            
            for item in repo_contents :
                if item["type"] == "dir" and item["name"] != ".gradle":
                    file_name = item["name"]
                    print(f"\nProcessing filename : {file_name}")
                                                                
                    if internalDirIsPresent:
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
    load_dotenv()
    creator.github_token = os.getenv("GITHUB_TOKEN") # Carica il token da variabile d'ambiente
    print(f"creator.github_token = {creator.github_token}")
    # Esegui l'estrazione con tutti i linguaggi e le nuove fonti
    creator.run_full_extraction(
        sources=[
            #'java-thomasZumsteg',
            #"java-exercism-shyvum",
            #"LauriESB",
            #"RinatMambetov",
            #"blogscot",
            #"mandarussell",
            #"uzilan",
            #"robiworks",
            #"ThomasZumsteg-js",
            #"oguzsh",
            #"ffflorian",
            #"programmiri",
            #"irvingbennett",
            #"PhymasSC",
            #"bearguns",
            #"samajammin",
            #"all_ts"
            #"all_c",
            #"all_cpp",
            #"all_go"
            "all_java"
        ],
        languages=[
            'python', 'javascript', 'java', 'cpp', 'go', 'rust', 'typescript',
            'c', 'csharp', 'ruby', 'php'
        ]
    )