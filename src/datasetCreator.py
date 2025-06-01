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

class CodeTestDatasetCreator:
    def __init__(self, root_dir: str = "dataset"):
        self.root_dir = Path(root_dir)
        self.csv_file = self.root_dir / "dataset.csv"
        self.github_token = None
        self.session = requests.Session()
        
    def setup_directories(self):
        """Crea la struttura delle directory"""
        self.root_dir.mkdir(exist_ok=True)
        
    def init_csv(self):
        """Inizializza il file CSV con gli header"""
        with open(self.csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                'id', 'nome_file_codice', 'nome_file_test', 
                'path_file_codice', 'path_file_test', 
                'linguaggio', 'source'
            ])
    
    def get_github_contents(self, repo: str, path: str = "") -> List[Dict]:
        """Ottiene i contenuti di una directory GitHub"""
        url = f"https://api.github.com/repos/{repo}/contents/{path}"
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'
            
        try:
            response = self.session.get(url, headers=headers)
            if response.status_code == 403:
                print(f"Rate limit raggiunto, attendere...")
                time.sleep(60)
                response = self.session.get(url, headers=headers)
            
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
    
    def process_exercism_solutions(self):
        """Processa le soluzioni Exercism di jeanphilippeadielou"""
        repo = "jeanphilippeadielou/Exercism"
        print("Processando soluzioni Exercism umane...")
        
        # Ottieni le directory dei linguaggi
        contents = self.get_github_contents(repo)
        
        for item in contents:
            if item['type'] != 'dir':
                continue
                
            language = item['name'].lower()
            
            # Filtra solo linguaggi supportati
            if not self.is_supported_language(language):
                continue
                
            print(f"  Processando linguaggio: {language}")
            self.process_language_directory(repo, language, item['path'], "exercism_solutions")
            time.sleep(1)  # Rate limiting
    
    def process_pyleet_solutions(self):
        """Processa le soluzioni PyLeet"""
        # PyLeet è solo Python, controlla se Python è nei target languages
        if hasattr(self, 'target_languages') and 'python' not in self.target_languages:
            print("PyLeet saltato - Python non nei linguaggi target")
            return
            
        repo = "huajianmao/pyleet"
        print("Processando soluzioni PyLeet...")
        
        # Processa le soluzioni Python
        self.process_pyleet_structure(repo, "python", "pyleet_solutions")
    
    def process_codewars_solutions(self):
        """Processa le soluzioni CodeWars JavaScript"""
        # CodeWars è solo JavaScript, controlla se è nei target languages
        if (hasattr(self, 'target_languages') and 
            'javascript' not in self.target_languages and 
            'js' not in self.target_languages):
            print("CodeWars saltato - JavaScript non nei linguaggi target")
            return
            
        repo = "WMattWood/codewars"
        print("Processando soluzioni CodeWars...")
        
        # Processa le soluzioni JavaScript
        self.process_codewars_structure(repo, "javascript", "codewars_solutions")
    
  
    
    def process_pyleet_structure (self, repo: str, language: str, source: str):
        
        
        #retrive solutions : 
        solutions_items = []
        solution_content = self.get_github_contents(repo, "solutions")
        for item in solution_content : 
            if item['type'] == 'file' and item['name'].endswith('.py'):
                    solutions_items.append(item)
                                
        #retrive tests:
        test_contents = self.get_github_contents(repo, "tests")
          
        for test_code_item in test_contents:
            if test_code_item['type'] == 'file' and test_code_item['name'].endswith('.py'):
                filename = test_code_item['name']
                    
                # Se è un test file, cerca il corrispondente file di codice
                if self.is_test_file(filename, language):
                    # Cerca il file di codice corrispondente
                    code_filename = filename.replace('test_', '').replace('_test', '')
                        
                    # Cerca il file di codice nella stessa directory
                    for solution_code_item in solutions_items:
                        if (solution_code_item['name'] == code_filename and 
                            not self.is_test_file(solution_code_item['name'], language)):
                                
                            exercise_name = code_filename.replace('.py', '')
                            self.create_single_code_test_pair(
                                repo, solution_code_item, test_code_item, language,
                                exercise_name, source
                            )
                            break
    
    def process_language_directory(self, repo: str, language: str, path: str, source: str):
        """Processa una directory di linguaggio"""
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
    
    def process_codewars_structure(self, repo: str, language: str, source: str):
        """Processa la struttura specifica di CodeWars"""
        # Naviga nella directory js
        js_contents = self.get_github_contents(repo, "js")
        
        test_files = []
        solutions_files = []
        
        for item in js_contents:                            
            kata_name = item['name']
            kata_path = item['path']            
            
            if item['type'] == 'file' and item['name'].endswith('.js') and not self.is_test_file(item["name"],"javascript"):
                print(f"    Processando kata: {kata_name}")
                solutions_files.append(item)
                continue
                     
        
            if item["type"] == 'dir' and item["name"] == 'test':
                print("retriving test files...")
                #test files : 
                test_dir_content = self.get_github_contents(repo, kata_path)
                
                
                for test_item in test_dir_content :                    
                    is_test_file = self.is_test_file(test_item["name"],"javascript")                                        
                    ends_with_js = test_item['name'].endswith('test.js')                    
                    is_file = test_item['type'] == 'file'
                                                            
                    if is_file and ends_with_js and is_test_file:
                        test_files.append(test_item)
            
        print(f"solution files :\n",len(solutions_files))
        print(f"test files :\n",len(test_files))
        
        for test_file in test_files:                                
            test_file_name : str = test_file["name"]
            
            for solution_file in solutions_files :                 
                solution_filename = solution_file['name']     
                
                #print(f"solution_filename = {solution_filename}")           
                #print(f"test_file_name = {test_file_name}")           
                #print(f"solution_filename in test_file_name = {solution_filename in test_file_name}")           
                    
                if solution_filename in test_file_name.replace(".test",""):                                 
                    self.create_single_code_test_pair(
                        repo, solution_file, test_file, language, 
                        test_file_name, source
                    )
    
    def create_single_code_test_pair(self, repo: str, code_file: Dict, test_file: Dict, 
                                   language: str, exercise_name: str, source: str):
        """Crea una singola coppia codice-test"""
        
        # Ottieni i contenuti dei file
        code_content = self.get_file_content(repo, code_file['path'])
        test_content = self.get_file_content(repo, test_file['path'])
        
        if not code_content or not test_content:
            print(f"      Impossibile ottenere contenuti per {exercise_name}")
            return
        
        # Verifica che sia effettivamente codice implementato (non template)
        if not self.is_implemented_code(code_content, language):
            print(f"      Codice non implementato per {exercise_name}, saltando...")
            return
        
        # Crea la struttura delle directory
        lang_dir = self.root_dir / language
        code_dir = lang_dir / exercise_name  # Usa solo exercise_name, non duplicato
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
            
            # Genera ID univoco
            file_id = f"{language}_{exercise_name}_{source}"
            
            # Aggiungi al CSV
            self.add_to_csv(
                file_id,
                code_filename,
                test_filename,
                str(code_path.relative_to(self.root_dir)),
                str(test_path.relative_to(self.root_dir)),
                language,
                source
            )
            
            print(f"      ✓ Aggiunta coppia: {exercise_name}")
        else:
            print(f"      ✗ Errore nel salvare: {exercise_name}")
    
    def create_code_test_pairs_v2(self, repo: str, code_files: List[Dict], test_files: List[Dict], 
                                 language: str, exercise_name: str, source: str):
        """Crea coppie codice-test con la nuova struttura"""
        
        for code_file in code_files:
            # Trova il test corrispondente
            matching_test = self.find_matching_test_v2(code_file, test_files, language)
            
            if not matching_test:
                print(f"      Nessun test trovato per {code_file['name']}")
                continue
            
            # CORREZIONE: Usa solo exercise_name, non combinarlo con il nome del file
            self.create_single_code_test_pair(
                repo, code_file, matching_test, language, 
                exercise_name, source  # Rimosso: f"{exercise_name}_{code_file['name'].split('.')[0]}"
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
            'throw new error',  # JavaScript
            'return null;',
            'return undefined;',
            'function() {}',  # JavaScript vuota
        ]
        
        # Se contiene solo pattern di non implementazione, scarta
        for pattern in non_implemented_patterns:
            if pattern in content_lower and len(content.strip()) < 100:
                return False
        
        # Verifica che ci sia effettivamente logica implementata
        if language == 'python':
            # Deve contenere più di solo import e def/class
            lines = [line.strip() for line in content.split('\n') if line.strip()]
            non_empty_lines = [line for line in lines if not line.startswith('#') 
                             and not line.startswith('import') 
                             and not line.startswith('from')
                             and line != 'pass']
            return len(non_empty_lines) > 2
            
        elif language in ['javascript', 'js']:
            # Deve contenere più di solo dichiarazioni di funzione vuote
            return 'return' in content_lower and len(content.strip()) > 50
            
        elif language == 'java':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'system.out' in content_lower) and len(content.strip()) > 100
            
        elif language in ['cpp', 'c']:
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'cout' in content_lower or 'printf' in content_lower) and len(content.strip()) > 50
            
        elif language == 'go':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'fmt.' in content_lower) and len(content.strip()) > 50
            
        elif language == 'rust':
            # Deve contenere implementazioni reali
            return ('return' in content_lower or 'println!' in content_lower) and len(content.strip()) > 50
            
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
        
        return any(indicator in filename_lower for indicator in test_indicators)
    
    def find_matching_test_v2(self, code_file: Dict, test_files: List[Dict], language: str) -> Optional[Dict]:
        """Trova il file di test corrispondente con logica migliorata"""
        code_name = code_file['name'].split('.')[0].lower()
        
        # Prima cerca match esatti
        for test_file in test_files:
            test_name = test_file['name'].lower()
            if code_name in test_name:
                return test_file
        
        # Se non trova match specifico, ritorna il primo test file disponibile
        return test_files[0] if test_files else None
    
    def is_supported_language(self, language: str) -> bool:
        """Verifica se il linguaggio è supportato e richiesto"""
        # Mappa linguaggi con nomi alternativi
        language_mapping = {
            'python': ['python', 'py'],
            'java': ['java'],
            'javascript': ['javascript', 'js'],
            'cpp': ['cpp', 'c++', 'cxx'],
            'c': ['c'],
            'go': ['go', 'golang'],
            'rust': ['rust', 'rs'],
            'csharp': ['csharp', 'c#', 'cs'],
            'ruby': ['ruby', 'rb'],
            'php': ['php']
        }
        
        # Se non sono specificati target languages, accetta tutti i supportati
        if not hasattr(self, 'target_languages'):
            supported = []
            for lang_variants in language_mapping.values():
                supported.extend(lang_variants)
            return language.lower() in supported
        
        # Altrimenti filtra solo quelli richiesti
        for target_lang in self.target_languages:
            for lang, variants in language_mapping.items():
                if target_lang.lower() in [v.lower() for v in variants]:
                    if language.lower() in [v.lower() for v in variants]:
                        return True
        return False
    
    def get_file_extension(self, language: str) -> str:
        """Ritorna l'estensione file per il linguaggio"""
        extensions = {
            'python': 'py',
            'java': 'java',
            'javascript': 'js',
            'js': 'js',
            'cpp': 'cpp',
            'c': 'c',
            'go': 'go',
            'rust': 'rs',
            'csharp': 'cs',
            'ruby': 'rb',
            'php': 'php'
        }
        return extensions.get(language.lower(), 'txt')
    
    def add_to_csv(self, file_id: str, code_name: str, test_name: str, 
                   code_path: str, test_path: str, language: str, source: str):
        """Aggiunge una entry al CSV"""
        with open(self.csv_file, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                file_id, code_name, test_name, code_path, 
                test_path, language, source
            ])
    
    def run_full_extraction(self, sources: List[str] = None, languages: List[str] = None):
        """Esegue l'estrazione completa del dataset"""
        if sources is None:
            sources = ['exercism', 'pyleet', 'codewars']
        if languages is None:
            languages = ['python', 'java', 'javascript']
        
        self.target_languages = [lang.lower() for lang in languages]
        
        self.setup_directories()
        self.init_csv()
        
        print("=== Inizio creazione dataset con soluzioni umane ===")
        print(f"Linguaggi target: {', '.join(self.target_languages)}")
        
        try:
            if 'exercism' in sources:
                self.process_exercism_solutions()
            
            if 'pyleet' in sources:
                self.process_pyleet_solutions()
            
            if 'codewars' in sources:
                self.process_codewars_solutions()
                
        
                
        except Exception as e:
            print(f"Errore durante l'estrazione: {e}")
            import traceback
            traceback.print_exc()
        
        print(f"\n=== Dataset completato! ===")
        print(f"File CSV: {self.csv_file}")
        
        # Statistiche
        if self.csv_file.exists():
            with open(self.csv_file, 'r') as f:
                line_count = sum(1 for line in f) - 1
            print(f"Coppie codice-test create: {line_count}")

# Utilizzo
if __name__ == "__main__":
    creator = CodeTestDatasetCreator()
    
    # Imposta il token GitHub se disponibile
    # creator.github_token = "your_github_token_here"
    
    # Esegui l'estrazione con tutti i linguaggi disponibili
    creator.run_full_extraction(
        ['exercism', 'pyleet', 'codewars'], 
        ['python', 'javascript', 'java', 'cpp', 'go', 'rust']
    )