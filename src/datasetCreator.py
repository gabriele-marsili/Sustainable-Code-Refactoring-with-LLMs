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

class CodeTestDatasetCreator:
    def __init__(self, root_dir: str = "dataset"):
        self.root_dir = Path(root_dir)
        self.csv_file = self.root_dir / "dataset.csv"
        self.github_token = None
        self.session = requests.Session()
        self.processed_ids = set() # Per tenere traccia degli ID già processati
        self.max_files_per_language = None # Nuovo attributo per il limite di file per linguaggio
        self.language_counts = {} # Contatore per linguaggi
        
    def setup_directories(self):
        """Crea la struttura delle directory"""
        self.root_dir.mkdir(exist_ok=True)
        
    def init_csv(self):
        """Inizializza il file CSV con gli header o carica gli ID esistenti"""
        if not self.csv_file.exists():
            with open(self.csv_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([
                    'id', 'nome_file_codice', 'nome_file_test', 
                    'path_file_codice', 'path_file_test', 
                    'linguaggio', 'source'
                ])
        else:
            # Carica gli ID esistenti per evitare duplicati
            with open(self.csv_file, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                next(reader, None) # Salta l'header
                for row in reader:
                    if row:
                        self.processed_ids.add(row[0])
                        # Aggiorna i conteggi dei linguaggi esistenti
                        lang = row[5]
                        self.language_counts[lang] = self.language_counts.get(lang, 0) + 1
            print(f"Caricati {len(self.processed_ids)} ID esistenti dal CSV.")

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
    
    def process_exercism_solutions(self):
        """Processa le soluzioni Exercism di jeanphilippeadielou"""
        repo = "jeanphilippeadielou/Exercism"
        print("\nProcessando soluzioni Exercism umane...")
        
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
        if not self.is_supported_language('python'):
            print("PyLeet saltato - Python non nei linguaggi target o non supportato")
            return
            
        repo = "huajianmao/pyleet"
        print("\nProcessando soluzioni PyLeet...")
        
        # Processa le soluzioni Python
        self.process_pyleet_structure(repo, "python", "pyleet_solutions")
    
    def process_codewars_solutions(self):
        """Processa le soluzioni CodeWars JavaScript"""
        # CodeWars è solo JavaScript, controlla se è nei target languages
        if not self.is_supported_language('javascript'):
            print("CodeWars saltato - JavaScript non nei linguaggi target o non supportato")
            return
            
        repo = "WMattWood/codewars"
        print("\nProcessando soluzioni CodeWars...")
        
        # Processa le soluzioni JavaScript
        self.process_codewars_structure(repo, "javascript", "codewars_solutions")
    
    # --- Nuovi metodi per le nuove repository ---

    def process_larrybotha_solutions(self):
        """Processa le soluzioni TypeScript di larrybotha/coding-challenge-solutions"""
        if not self.is_supported_language('typescript'):
            print("larrybotha/coding-challenge-solutions saltato - TypeScript non nei linguaggi target o non supportato")
            return

        repo = "larrybotha/coding-challenge-solutions"
        print(f"\nProcessando soluzioni TypeScript da {repo}...")
        base_path = "hacker-rank/algorithms/warmup"
        contents = self.get_github_contents(repo, base_path)

        for item in contents:
            if item['type'] == 'dir':
                exercise_name = item['name']
                exercise_path = item['path']
                if exercise_name == "README.md" : pass
                print(f"    Processando esercizio: {exercise_name}")

                exercise_contents = self.get_github_contents(repo, exercise_path)
                code_file = None
                test_file = None

                for file_item in exercise_contents:
                    try:
                        if exercise_name != "README.md" and file_item['type'] == 'file':
                            name = file_item['name']
                            if self.is_test_file(name,'typescript'):
                                test_file = file_item
                            else : 
                                code_file = file_item
                    except Exception as e :
                        print(f"exception\n{e}\nfile item :\n{file_item}")
                        raise e
                        
                
                if code_file and test_file:
                    self.create_single_code_test_pair(
                        repo, code_file, test_file, 'typescript',
                        exercise_name, 'larrybotha_solutions'
                    )
                else:
                    print(f"      File soluzione o test mancante per {exercise_name}")
                time.sleep(0.5) # Rate limiting

    #to do
    def process_jainmohit_solutions(self):
        """Processa le soluzioni TypeScript di jainmohit2001/coding-challenges"""
        if not self.is_supported_language('typescript'):
            print("jainmohit2001/coding-challenges saltato - TypeScript non nei linguaggi target o non supportato")
            return

        repo = "jainmohit2001/coding-challenges"
        print(f"\nProcessando soluzioni TypeScript da {repo}...")
        base_path = "problems"
        categories = self.get_github_contents(repo, base_path)

        for category_item in categories:
            if category_item['type'] == 'dir':
                category_path = category_item['path']
                problems = self.get_github_contents(repo, category_path)

                for problem_item in problems:
                    if problem_item['type'] == 'dir':
                        exercise_name = problem_item['name']
                        exercise_path = problem_item['path']
                        print(f"    Processando esercizio: {exercise_name}")

                        exercise_contents = self.get_github_contents(repo, exercise_path)
                        code_file = None
                        test_file = None

                        for file_item in exercise_contents:
                            if file_item['type'] == 'file':
                                if file_item['name'] == 'index.ts':
                                    code_file = file_item
                                elif file_item['name'] == 'index.test.ts':
                                    test_file = file_item
                        
                        if code_file and test_file:
                            self.create_single_code_test_pair(
                                repo, code_file, test_file, 'typescript',
                                exercise_name, 'jainmohit_solutions'
                            )
                        else:
                            print(f"      File soluzione o test mancante per {exercise_name}")
                        time.sleep(0.5) # Rate limiting

    def process_mathusanm_leetcode(self):
        """Processa le soluzioni Python di mathusanm6/LeetCode"""
        if not self.is_supported_language('python'):
            print("mathusanm6/LeetCode saltato - Python non nei linguaggi target o non supportato")
            return

        repo = "mathusanm6/LeetCode"
        print(f"\nProcessando soluzioni Python da {repo}...")
        
        # Ottieni tutti i file di test dalla directory 'python/tests'
        test_dir_contents = self.get_github_contents(repo, "python/tests")
        test_files = [item for item in test_dir_contents if item['type'] == 'file' and item['name'].startswith('test_')]

        #retrive codes : 
        code_sub_dirs = ["easy","hard","medium"]
        code_files = []
        for sub_dir in code_sub_dirs:
            code_dir_contents = self.get_github_contents(repo, f"python/problems/{sub_dir}")
            files = [item for item in code_dir_contents if item['type'] == 'file' and item['name'].endswith('.py') and not item['name'].startswith('test_')]
            code_files.extend(files)

        for test_file in test_files:
            test_filename = test_file['name']
            
            code_file = next((f for f in code_files if f['name'] in test_filename), None)

            if code_file:
                exercise_name = code_file['name'].replace('.py', '')
                self.create_single_code_test_pair(
                    repo, code_file, test_file, 'python',
                    exercise_name, 'mathusanm_leetcode'
                )
            else:
                print(f"      Nessun file di codice corrispondente per il test {test_file['name']}")
            time.sleep(0.5) # Rate limiting

    #to do
    def process_donnemartin_challenges(self):
        """Processa le soluzioni Python di donnnemartin/interactive-coding-challenges"""
        if not self.is_supported_language('python'):
            print("donnemartin/interactive-coding-challenges saltato - Python non nei linguaggi target o non supportato")
            return

        repo = "donnemartin/interactive-coding-challenges"
        print(f"\nProcessando soluzioni Python da {repo}...")

        # Le categorie sono le directory direttamente sotto la root
        categories = self.get_github_contents(repo)
        for category_item in categories:
            if category_item['type'] == 'dir' and not category_item['name'].startswith('.'):
                category_path = category_item['path']
                exercises = self.get_github_contents(repo, category_path)

                for exercise_item in exercises:
                    if exercise_item['type'] == 'dir':
                        exercise_name_dir = exercise_item['name'] # nome della cartella dell'esercizio
                        exercise_path = exercise_item['path']
                        print(f"    Processando categoria: {category_item['name']} - Esercizio: {exercise_name_dir}")

                        exercise_contents = self.get_github_contents(repo, exercise_path)
                        code_file = None
                        test_file = None

                        for file_item in exercise_contents:
                            if file_item['type'] == 'file' and file_item['name'].endswith('.py'):
                                if 'solution' in file_item['name'] and not self.is_test_file(file_item['name'], 'python'):
                                    code_file = file_item
                                elif self.is_test_file(file_item['name'], 'python'):
                                    test_file = file_item
                        
                        if code_file and test_file:
                            # Il nome dell'esercizio nel dataset sarà il nome della directory dell'esercizio
                            self.create_single_code_test_pair(
                                repo, code_file, test_file, 'python',
                                exercise_name_dir, 'donnemartin_challenges'
                            )
                        else:
                            print(f"      File soluzione o test mancante per {exercise_name_dir}")
                        time.sleep(0.5) # Rate limiting

    def process_mtrajk_coding_problems(self):
        """Processa le soluzioni Python di MTrajK/coding-problems."""
        if not self.is_supported_language('python'):
            print("MTrajK/coding-problems saltato - Python non nei linguaggi target o non supportato.")
            return

        repo = "MTrajK/coding-problems"
        print(f"\nProcessando soluzioni Python da {repo}...")
        
        # Ottieni le directory principali, che sono le categorie o i problemi stessi
        root_contents = self.get_github_contents(repo)
        
        for problem_item in root_contents:
            if problem_item['type'] == 'dir': # Entra nella directory del problema/categoria
                # Per questa repo, ogni directory di primo livello contiene i file .py direttamente
                # o altre sottocartelle con i file. Dobbiamo esplorare.
                category_or_problem_name = problem_item['name']
                category_or_problem_path = problem_item['path']
                
                # Ottieni i contenuti di questa directory
                inner_contents = self.get_github_contents(repo, category_or_problem_path)
                
                for file_item in inner_contents:
                    # Cerca file Python direttamente nella directory o in una sottocartella "solutions"
                    if file_item['type'] == 'file' and file_item['name'].endswith('.py'):
                        # Questo è il file del problema (codice + test)
                        exercise_name = Path(file_item['name']).stem # Nome del file senza estensione
                        print(f"    Processando esercizio: {category_or_problem_name}/{exercise_name}")
                        
                        full_content = self.get_file_content(repo, file_item['path'])
                        
                        if full_content:
                            solution_code, test_code = self.extract_code_and_tests_from_mtrajk_file(full_content)
                            
                            if solution_code and test_code:
                                # Creiamo un oggetto "fittizio" per il file di test e codice
                                # per riutilizzare create_single_code_test_pair
                                # Il "path" è solo per un riferimento, non verrà usato per scaricare di nuovo
                                code_mock_file = {
                                    'name': f"{exercise_name}.py",
                                    'path': f"mock_path/{exercise_name}.py" # mock path
                                }
                                test_mock_file = {
                                    'name': f"{exercise_name}_testSuite.py",
                                    'path': f"mock_path/{exercise_name}_testSuite.py" # mock path
                                }
                                
                                # Salviamo i contenuti estratti localmente
                                lang_dir = self.root_dir / 'python'
                                code_dir = lang_dir / exercise_name 
                                code_dir.mkdir(parents=True, exist_ok=True)
                                
                                code_local_path = code_dir / f"{exercise_name}.py"
                                test_local_path = code_dir / f"{exercise_name}_testSuite.py"

                                # Applica il limite di file per linguaggio, se impostato
                                file_id = f"python_{exercise_name}_mtrajk_coding_problems"
                                if file_id in self.processed_ids:
                                    print(f"      Saltando: {file_id} (già presente)")
                                    time.sleep(0.1) # Breve pausa per evitare rate limit
                                    continue
                                
                                if self.max_files_per_language is not None:
                                    current_count = self.language_counts.get('python', 0)
                                    if current_count >= self.max_files_per_language:
                                        print(f"      Limite raggiunto per python, saltando {exercise_name}")
                                        time.sleep(0.1) # Breve pausa per evitare rate limit
                                        continue

                                if (self.save_file_content(solution_code, code_local_path) and 
                                    self.save_file_content(test_code, test_local_path)):
                                    
                                    self.add_to_csv(
                                        file_id,
                                        code_mock_file['name'],
                                        test_mock_file['name'],
                                        str(code_local_path.relative_to(self.root_dir)),
                                        str(test_local_path.relative_to(self.root_dir)),
                                        'python',
                                        'mtrajk_coding_problems'
                                    )
                                    self.processed_ids.add(file_id)
                                    self.language_counts['python'] = self.language_counts.get('python', 0) + 1
                                    print(f"      ✓ Aggiunta coppia: {exercise_name} (python) da mtrajk_coding_problems. Totale per python: {self.language_counts['python']}")
                                else:
                                    print(f"      ✗ Errore nel salvare file per {exercise_name}")
                            else:
                                print(f"      Impossibile estrarre codice o test da {file_item['name']}")
                        else:
                            print(f"      Impossibile ottenere contenuto per {file_item['name']}")
                        time.sleep(0.5) # Rate limiting
                    
                    else:
                        print(f"      Impossibile ottenere contenuto per {file_item['name']}")
                        time.sleep(0.5) # Rate limiting

    def extract_code_and_tests_from_mtrajk_file(self, file_content: str) -> Tuple[Optional[str], Optional[str]]:
        """
        Estrae la sezione della soluzione e la sezione di testing da un file Python
        della repository MTrajK/coding-problems.
        """
        
        
        #solution_start_marker = "############\n# Solution #\n############"
        testing_start_marker = "###########\n# Testing #\n###########"
        
        solution_code = None
        test_code = None
        
        # Suddividi il contenuto in base ai marcatori
        parts = file_content.split(testing_start_marker)
        if len(parts) > 1:
            solution_code = parts[0]
            test_code = parts[1]                                   
        
        if solution_code:
            solution_code = solution_code.strip()
        if test_code:
            test_code = test_code.strip()
            
        return solution_code, test_code

    def process_warycat_rustgym(self):
        """Processa le soluzioni Rust da warycat/rustgym (Advent of Code)"""
        if not self.is_supported_language('rust'):
            print("warycat/rustgym saltato - Rust non nei linguaggi target o non supportato")
            return

        repo = "warycat/rustgym"
        print(f"\nProcessando soluzioni Rust da {repo}...")
        base_path = "adventofcode"
        years = self.get_github_contents(repo, base_path)

        for year_item in years:
            if year_item['type'] == 'dir' and re.match(r'20\d{2}', year_item['name']): # Filtra per anni
                year_path = year_item['path']
                days = self.get_github_contents(repo, year_path)

                for day_item in days:
                    if day_item['type'] == 'dir' and re.match(r'day\d{2}', day_item['name']): # Filtra per giorni
                        exercise_name = f"{year_item['name']}_{day_item['name']}"
                        exercise_src_path = f"{day_item['path']}/src"
                        print(f"    Processando esercizio: {exercise_name}")

                        src_contents = self.get_github_contents(repo, exercise_src_path)
                        code_file = None
                        test_file = None

                        for file_item in src_contents:
                            if file_item['type'] == 'file' and file_item['name'].endswith('.rs'):
                                if file_item['name'] == 'main.rs' or file_item['name'] == 'lib.rs':
                                    code_file = file_item
                                elif file_item['name'] == 'test.rs' or 'test' in file_item['name']: # Nomi comuni per test Rust
                                    test_file = file_item
                        
                        # Molti esercizi Advent of Code in Rust hanno i test integrati nel main.rs o lib.rs
                        # Se test.rs non esiste, usiamo il file di codice come "sorgente" per i test impliciti
                        if code_file:
                            if not test_file:
                                test_file = code_file # Assume test integrati nel file di codice

                            self.create_single_code_test_pair(
                                repo, code_file, test_file, 'rust',
                                exercise_name, 'rustgym_adventofcode'
                            )
                        else:
                            print(f"      File soluzione Rust mancante per {exercise_name}")
                        time.sleep(0.5) # Rate limiting

    def process_codedge_go_challenges(self):
        """Processa le soluzioni Go da codedge/coding-challenges"""
        if not self.is_supported_language('go'):
            print("codedge/coding-challenges (Go) saltato - Go non nei linguaggi target o non supportato")
            return

        repo = "codedge/coding-challenges"
        print(f"\nProcessando soluzioni Go da {repo}...")
        base_path = "src/go"
        go_challenges = self.get_github_contents(repo, base_path)

        for challenge_item in go_challenges:
            if challenge_item['type'] == 'dir':
                exercise_name = challenge_item['name']
                exercise_path = challenge_item['path']
                print(f"    Processando esercizio: {exercise_name}")

                exercise_contents = self.get_github_contents(repo, exercise_path)
                code_file = None
                test_file = None

                for file_item in exercise_contents:
                    if file_item['type'] == 'file':
                        if file_item['name'] == 'main.go':
                            code_file = file_item
                        elif file_item['name'] == 'main_test.go':
                            test_file = file_item
                
                if code_file and test_file:
                    self.create_single_code_test_pair(
                        repo, code_file, test_file, 'go',
                        exercise_name, 'codedge_go_challenges'
                    )
                else:
                    print(f"      File soluzione o test Go mancante per {exercise_name}")
                time.sleep(0.5) # Rate limiting

    def process_therenegadecoder_sample_programs(self):
        """Processa programmi campione da TheRenegadeCoder/sample-programs (multi-linguaggio)"""
        repo = "TheRenegadeCoder/sample-programs"
        print(f"Processando programmi campione da {repo} (multi-linguaggio)...")
        base_path = "main"
        languages_dirs = self.get_github_contents(repo, base_path)

        for lang_item in languages_dirs:
            if lang_item['type'] == 'dir':
                language = lang_item['name'].lower()
                
                if not self.is_supported_language(language):
                    print(f"    Saltando linguaggio non supportato/target: {language}")
                    continue

                print(f"  Processando linguaggio: {language}")
                lang_path = lang_item['path']
                program_dirs = self.get_github_contents(repo, lang_path)

                for program_item in program_dirs:
                    if program_item['type'] == 'dir':
                        exercise_name = program_item['name']
                        exercise_path = program_item['path']
                        print(f"    Processando esercizio: {exercise_name}")

                        program_contents = self.get_github_contents(repo, exercise_path)
                        code_file = None
                        test_file = None

                        for file_item in program_contents:
                            if file_item['type'] == 'file':
                                if file_item['name'].startswith('main.'):
                                    code_file = file_item
                                elif file_item['name'].startswith('test.'):
                                    test_file = file_item
                        
                        if code_file and test_file:
                            self.create_single_code_test_pair(
                                repo, code_file, test_file, language,
                                exercise_name, 'therenegadecoder_samples'
                            )
                        else:
                            print(f"      File soluzione o test mancante per {exercise_name}")
                        time.sleep(0.5) # Rate limiting
    
    def process_pyleet_structure (self, repo: str, language: str, source: str):
        
        #retrive solutions : 
        solutions_items = []
        solution_content = self.get_github_contents(repo, "solutions")
        for item in solution_content : 
            if item['type'] == 'file' and item['name'].endswith('.py'):
                solutions_items.append(item)
                                
        #retrive tests:
        test_contents = self.get_github_contents(repo, "tests")
        
        print(f"solutions : {len(solutions_items)}")
        print(f"tests : {len(test_contents)}")
          
        for test_code_item in test_contents:
            if test_code_item['type'] == 'file' and test_code_item['name'].endswith('.py'):
                filename = test_code_item['name']
                    
                # Se è un test file, cerca il corrispondente file di codice
                if self.is_test_file(filename, language):
                    # Cerca il file di codice corrispondente
                    code_filename : str = filename.replace('test_', '').replace('_test', '')
                    
                        
                    # Cerca il file di codice nella stessa directory
                    for solution_code_item in solutions_items:
                        #print(f"processing {filename} - {code_filename} - {solution_code_item['name']}")
                        solution_filename : str = solution_code_item['name']
                        cond = solution_filename.lower() == code_filename.lower()                       
                        if cond:                                
                            exercise_name = code_filename.replace('.py', '')
                            print(f"creating pair for {exercise_name}")
                            self.create_single_code_test_pair(
                                repo, solution_code_item, test_code_item, language,
                                exercise_name, source
                            )
                            
    
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
            
        print(f"Soluzioni trovate: {len(solutions_files)}")
        print(f"Test trovati: {len(test_files)}")
        
        for test_file in test_files:                                
            test_file_name : str = test_file["name"]
            
            for solution_file in solutions_files :                 
                solution_filename = solution_file['name']     
                
                # Semplificata la logica di match, togliendo .test per un match più generico
                if solution_filename.replace('.js', '') in test_file_name.replace(".test.js", "").replace(".js", ""):                                 
                    self.create_single_code_test_pair(
                        repo, solution_file, test_file, language, 
                        solution_filename.replace('.js', ''), source # Usa il nome della soluzione come exercise_name
                    )
                    break # Trovato il match, passa al prossimo test file
    
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
            test_name_stem = Path(test_file['name']).stem.lower()
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
            sources = [ 
                'exercism', 'pyleet', 'codewars', 
                'larrybotha', 'jainmohit2001', 'mathusanm6', 
                'donnemartin', 'MTrajK', 'warycat', 
                'codedge', 'TheRenegadeCoder'
            ]
        if languages is None:
            languages = ['python', 'java', 'javascript', 'typescript', 'cpp', 'go', 'rust', 'csharp', 'ruby', 'php'] 

        self.target_languages = [lang.lower() for lang in languages]
        
        self.setup_directories()
        self.init_csv() # Ora carica anche gli ID esistenti
        
        print("=== Inizio creazione dataset con soluzioni umane ===")
        print(f"Linguaggi target: {', '.join(self.target_languages)}")
        
        try:
            if 'exercism' in sources:
                self.process_exercism_solutions()
            
            if 'pyleet' in sources:
                self.process_pyleet_solutions()
            
            if 'codewars' in sources:
                self.process_codewars_solutions()
            
            # Nuove fonti
            if 'larrybotha' in sources:
                self.process_larrybotha_solutions()

            if 'jainmohit2001' in sources:
                pass
                #self.process_jainmohit_solutions() to do

            if 'mathusanm6' in sources:
                self.process_mathusanm_leetcode()

            if 'donnemartin' in sources:
                pass #to do
                #self.process_donnemartin_challenges()

            if 'MTrajK' in sources:
                self.process_mtrajk_coding_problems()

            if 'warycat' in sources:
                pass #to do
                #self.process_warycat_rustgym()

            if 'codedge' in sources:
                pass # to do 
                #self.process_codedge_go_challenges()
            
            if 'TheRenegadeCoder' in sources:
                pass # to do
                #self.process_therenegadecoder_sample_programs()
                
        except Exception as e:
            print(f"Errore durante l'estrazione: {e}")
            import traceback
            traceback.print_exc()
        
        print(f"\n=== Dataset completato! ===")
        print(f"File CSV: {self.csv_file}")
        
        # Statistiche (ora basate su self.processed_ids e self.language_counts)
        print(f"Coppie codice-test create (totale): {len(self.processed_ids)}")
        print("\nDistribuzione per linguaggio (totale):")
        for lang, count in sorted(self.language_counts.items()):
            print(f"  - {lang}: {count} coppie")

# Utilizzo per test rapidi (rimuovere o commentare in produzione)
if __name__ == "__main__":
    creator = CodeTestDatasetCreator()
    creator.github_token = os.getenv("GITHUB_TOKEN") # Carica il token da variabile d'ambiente
    
    # Esegui l'estrazione con tutti i linguaggi e le nuove fonti
    creator.run_full_extraction(
        sources=[
            'exercism', 'pyleet', 'codewars', 
            'larrybotha', 'jainmohit', 'mathusanm', 
            'donnemartin', 'mtrajk', 'warycat', 
            'codedge', 'therenegadecoder'
        ], 
        languages=[
            'python', 'javascript', 'java', 'cpp', 'go', 'rust', 'typescript', 
            'c', 'csharp', 'ruby', 'php'
        ]
    )