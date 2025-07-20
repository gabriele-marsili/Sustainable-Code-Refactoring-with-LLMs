#!/usr/bin/env python3
"""
Script per analizzare i file di log e correggere automaticamente 
i test suite con errori di importazione usando le API di ChatGPT / HF.
"""

import json
import os
import re
from pathlib import Path
from openai import OpenAI
from typing import List, Dict, Optional
from pathlib import Path
import requests
from dotenv import load_dotenv
import re
import time
from utility_dir import utility_paths
keys = [
    
]

load_dotenv()
groq_token = os.getenv("GROQ_TOKEN")
print(f"groq_token = {groq_token}")

class TestSuiteFixer:
    def __init__(self, openai_api_key: str):
        """
        Inizializza il fixer con la chiave API di OpenAI.
        
        Args:
            openai_api_key: Chiave API di OpenAI
        """
        self.client = OpenAI(api_key=openai_api_key)
        self.c_index = 0
        self.groq_token = groq_token
        
    def load_json_file(self, json_file_path: str) -> Dict:
        """
        Carica il file JSON con le entries.
        
        Args:
            json_file_path: Path al file JSON
            
        Returns:
            Dict contenente i dati del JSON
        """
        try:
            with open(json_file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Errore: File {json_file_path} non trovato")
            return {}
        except json.JSONDecodeError:
            print(f"Errore: File {json_file_path} non è un JSON valido")
            return {}
    
    def read_log_file(self, log_file_path: str) -> str:
        """
        Legge il contenuto del file di log.
        
        Args:
            log_file_path: Path al file di log
            
        Returns:
            Contenuto del file di log
        """
        try:
            with open(log_file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except FileNotFoundError:
            print(f"Errore: File di log {log_file_path} non trovato")
            return ""
    
    def has_import_error(self, log_content: str) -> bool:
        """
        Verifica se il log contiene errori di importazione.
        
        Args:
            log_content: Contenuto del file di log
            
        Returns:
            True se ci sono errori di importazione, False altrimenti
        """
        # Pattern per rilevare errori di importazione comuni
        import_error_patterns = [
            r"ImportError: Failed to import test module",
            r"NameError: name '.+' is not defined",
            r"ModuleNotFoundError: No module named",
            r"ImportError: cannot import name"
        ]
        
        for pattern in import_error_patterns:
            if re.search(pattern, log_content, re.IGNORECASE):
                return True
        return False
    
    def extract_test_suite_file(self, log_content: str, log_file_path: str) -> Optional[str]:
        """
        Estrae il nome del file test suite dal log e restituisce il path completo.
        
        Args:
            log_content: Contenuto del file di log
            log_file_path: Path al file di log
            
        Returns:
            Path completo al file test suite o None se non trovato
        """
        # Pattern per estrarre il nome del file test suite
        patterns = [
            r"File \"[^\"]*\/([^\/]+_testSuite\.py)\"",
            r"in <module>\s*print\([^)]*\)",
            r"([^\/\s]+_testSuite\.py)"
        ]
        
        test_suite_file = None
        for pattern in patterns:
            match = re.search(pattern, log_content)
            if match:
                if "_testSuite.py" in match.group(0):
                    # Estrai il nome del file
                    file_match = re.search(r"([^\/\s]+_testSuite\.py)", match.group(0))
                    if file_match:
                        test_suite_file = file_match.group(1)
                        break
        
        if not test_suite_file:
            # Fallback: cerca nel path del log
            log_dir = os.path.dirname(log_file_path)
            for file in os.listdir(log_dir):
                if file.endswith("_testSuite.py"):
                    test_suite_file = file
                    break
        
        if test_suite_file:
            # Costruisci il path completo
            log_dir = os.path.dirname(log_file_path)
            return os.path.join(log_dir, test_suite_file)
        
        return None
    
    def read_test_suite_file(self, test_suite_path: str) -> str:
        """
        Legge il contenuto del file test suite.
        
        Args:
            test_suite_path: Path al file test suite
            
        Returns:
            Contenuto del file test suite
        """
        try:
            with open(test_suite_path, 'r', encoding='utf-8') as file:
                return file.read()
        except FileNotFoundError:
            print(f"Errore: File test suite {test_suite_path} non trovato")
            return ""
    
    def extract_function_name(self, test_suite_path: str) -> str:
        """
        Estrae il nome della funzione dal nome del file test suite.
        
        Args:
            test_suite_path: Path al file test suite
            
        Returns:
            Nome della funzione da importare
        """
        file_name = os.path.basename(test_suite_path)
        # Rimuovi "_testSuite.py" per ottenere il nome della funzione
        function_name = file_name.replace("_testSuite.py", "")
        return function_name
    
    def _extract_code_from_markdown(self, content: str) -> str:
        """
        Estrae il codice Python dai blocchi markdown ```
        
        Args:
            content: Contenuto che può contenere codice in blocchi markdown
            
        Returns:
            str: Solo il codice Python estratto, o il contenuto originale se non ci sono blocchi
        """
        
        
        # Pattern per blocchi di codice con eventuali linguaggi specificati
        patterns = [
            r'```python\n(.*?)```',     # ```python ... ```
            r'```py\n(.*?)```',         # ```py ... ```
            r'```\n(.*?)```',           # ``` ... ```
            r'```python(.*?)```',       # ```python... ``` (senza newline)
            r'```py(.*?)```',           # ```py... ``` (senza newline)
            r'```(.*?)```'              # ```... ``` (generico)
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content, re.DOTALL)
            if matches:
                # Prendi il primo match e puliscilo
                code = matches[0].strip()
                if code and ('import' in code or 'class' in code or 'def' in code):
                    return code
        
        # Se non trova blocchi markdown, prova a rimuovere testo prima/dopo il codice
        lines = content.split('\n')
        
        # Trova la prima linea che sembra codice Python
        start_idx = None
        for i, line in enumerate(lines):
            if any(keyword in line for keyword in ['import ', 'class ', 'def ', 'if __name__']):
                start_idx = i
                break
        
        # Trova l'ultima linea che sembra codice Python
        end_idx = None
        for i in range(len(lines) - 1, -1, -1):
            line = lines[i].strip()
            if line and not line.startswith('Here') and not line.startswith('The') and line != '':
                end_idx = i
                break
        
        # Se abbiamo trovato inizio e fine, estrai solo quella parte
        if start_idx is not None and end_idx is not None:
            code_lines = lines[start_idx:end_idx + 1]
            return '\n'.join(code_lines)
        
        # Fallback: restituisci il contenuto originale pulito
        return content.strip()


    def fix_test_with_groq(self, test_suite_content: str, function_name: str) -> str:
        """
        Utilizza Groq API (gratuito, veloce, molto efficace)
        Registrati su: https://console.groq.com/
        """
        if not self.groq_token:
            raise ValueError("Token Groq necessario. Registrati su https://console.groq.com/")
        
        prompt = f"""Correggi il seguente file Python per renderlo una test suite unittest valida:

        {test_suite_content}

        Struttura richiesta:
        - Importa la funzione: from {function_name} import {function_name}
        - Usa la classe Test(unittest.TestCase)
        - Mantieni la logica dei test esistenti
        - Aggiungi if __name__ == "__main__": unittest.main()

        Restituisci SOLO il codice Python corretto, senza spiegazioni."""

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.groq_token}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "llama3-70b-8192",  # Modello gratuito molto capace
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.1,
            "max_tokens": 2048
        }
        
        try:
            response = requests.post(url, headers=headers, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            
            raw_content = result['choices'][0]['message']['content'].strip()
            
            # Estrai il codice se è dentro blocchi markdown ```
            extracted_code = self._extract_code_from_markdown(raw_content)
            return extracted_code

            
        except requests.RequestException as e:
            print(f"Errore Groq API: {e}")
            return None
  
  
    def fix_test_suite_with_chatgpt(self, test_suite_content: str, function_name: str) -> str:
        """
        Usa ChatGPT per correggere il file test suite.
        
        Args:
            test_suite_content: Contenuto del file test suite
            function_name: Nome della funzione da importare
            
        Returns:
            Contenuto corretto del file test suite
        """
        prompt = f"""sistema il seguente file python : 

        {test_suite_content}

        come fosse una test suite che usa unittest, con struttura simile a :

        import unittest
        from max_profit import max_profit

        class Test(unittest.TestCase):
            def test_1(self):        
                self.assertEqual(max_profit([7, 6, 4, 3, 1]),0)
            def test_2(self):        
                self.assertEqual(max_profit([1, 2, 3, 4, 5]),5)
            def test_3(self):        
                self.assertEqual(max_profit([7, 1, 5, 3, 6, 4]),7)

        if __name__ == "__main__":
            unittest.main()

        l'import della funzione dovrebbe esser come il nome dell'esercizio (ad esempio se ho shuffle_array_testSuite.py il nome della funzione da importare dovrebbe essere shuffle_array dal file shuffle_array, quindi -> 'from shuffle_array import shuffle_array')

        In questo caso specifico, l'import dovrebbe essere: 'from {function_name} import {function_name}'
        
        Come output atteso mi aspetto solamente il codice richiesto.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Sei un assistente che corregge file Python test suite. Rispondi solo con il codice Python corretto, senza spiegazioni aggiuntive."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.1
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Errore nell'API ChatGPT: {e}")
            if "401" in str(e) or "'code': 'invalid_api_key'" in str(e):
                if self.c_index == len(keys): raise Exception("All keys are invalid")
                openai_api_key = keys[self.c_index]
                self.c_index += 1
                self.client = OpenAI(api_key=openai_api_key)
                return self.fix_test_suite_with_chatgpt(test_suite_content,function_name)
            return ""
    
    def save_fixed_test_suite(self, test_suite_path: str, fixed_content: str) -> bool:
        """
        Salva il file test suite corretto.
        
        Args:
            test_suite_path: Path al file test suite
            fixed_content: Contenuto corretto
            
        Returns:
            True se salvato con successo, False altrimenti
        """
        try:
            # Crea un backup del file originale
            backup_path = test_suite_path + ".backup"
            if os.path.exists(test_suite_path):
                with open(test_suite_path, 'r', encoding='utf-8') as original:
                    with open(backup_path, 'w', encoding='utf-8') as backup:
                        backup.write(original.read())
            
            # Salva il contenuto corretto
            with open(test_suite_path, 'w', encoding='utf-8') as file:
                file.write(fixed_content)
            
            print(f"✅ File corretto salvato: {test_suite_path}")
            print(f"📁 Backup creato: {backup_path}")
            return True
        except Exception as e:
            print(f"Errore nel salvare il file {test_suite_path}: {e}")
            return False
    
    def process_entries(self, json_file_path: str) -> None:
        """
        Processa tutte le entries nel file JSON.
        
        Args:
            json_file_path: Path al file JSON
        """
        data = self.load_json_file(json_file_path)
        
        if not data or "entries" not in data:
            print("Nessuna entry trovata nel file JSON")
            return
        
        entries = data["entries"]
        print(f"📊 Trovate {len(entries)} entries da processare")
        
        processed_count = 0
        fixed_count = 0
        
        for entry in entries:
            lang = entry.get("language")
            if lang != "python":
                continue
            entry_id = entry.get("id", "unknown")
            log_file_path = entry.get("log_file_path", "")
            
            print(f"\n🔍 Processando entry: {entry_id}")
            
            if not log_file_path or not os.path.exists(log_file_path):
                print(f"⚠️  File di log non trovato: {log_file_path}")
                continue
            
            # Leggi il contenuto del log
            log_content = self.read_log_file(log_file_path)
            if not log_content:
                continue
            
            # Verifica se ci sono errori di importazione
            if not self.has_import_error(log_content):
                print("✅ Nessun errore di importazione rilevato")
                continue
            
            print("🚨 Errore di importazione rilevato")
            
            # Estrai il file test suite
            parts = (str(log_file_path).replace("/output.log","")).split("/")
            file_name = parts.pop()
            test_file_name = file_name+"_testSuite.py"
            test_suite_path = str(log_file_path).replace("output.log",test_file_name)
            """
            test_suite_path = self.extract_test_suite_file(log_content, log_file_path)
            if not test_suite_path:
                # src/dataset/python/shuffle_array/output.log
                
                print("⚠️  Impossibile estrarre il file test suite")
                continue
            """    
            print(f"📂 File test suite trovato: {test_suite_path}")
            
            # Leggi il contenuto del test suite
            test_suite_content = self.read_test_suite_file(test_suite_path)
            if not test_suite_content:
                continue
            
            # Estrai il nome della funzione
            function_name = self.extract_function_name(test_suite_path)
            print(f"🔧 Nome funzione da importare: {function_name}")
            
            # Correggi il file usando ChatGPT
            print("🤖 Correzione in corso con HF...")
            time.sleep(3)
            fixed_content = self.fix_test_with_groq(test_suite_content, function_name)
            #fixed_content = self.fix_test_suite_with_chatgpt(test_suite_content, function_name)
            
            if fixed_content:
                # Salva il file corretto
                if self.save_fixed_test_suite(test_suite_path, fixed_content):
                    fixed_count += 1
            
            processed_count += 1
        
        print(f"\n📈 Elaborazione completata:")
        print(f"   - Entries processate: {processed_count}")
        print(f"   - Files corretti: {fixed_count}")


def main():
    """
    Funzione principale dello script.
    """
    src_path = Path(__file__).resolve().parent.parent #src
        
    bad_entries_json_path = utility_paths.BAD_ENTRIES_FILEPATH
    #dataset_path = src_path / "dataset/dataset.json"
    #bad_entries_cluster_json_path = src_path / "bad_entries_cluster.json"


    # Configura la tua chiave API di OpenAI
    OPENAI_API_KEY = "sk-abcdef1234567890abcdef1234567890abcdef12"  # Sostituisci con la tua chiave API
    
    # Path al file JSON
    json_file_path = bad_entries_json_path
    
    # Verifica che la chiave API sia stata impostata
    if OPENAI_API_KEY == "":
        print("⚠️  ATTENZIONE: Imposta la tua chiave API di OpenAI nella variabile OPENAI_API_KEY")
        return
    
    # Crea il fixer e processa le entries
    fixer = TestSuiteFixer(OPENAI_API_KEY)
    fixer.process_entries(json_file_path)


if __name__ == "__main__":
    main()