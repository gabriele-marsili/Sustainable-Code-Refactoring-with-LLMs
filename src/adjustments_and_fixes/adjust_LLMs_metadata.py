import sys
import os
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json
import re

from utility_dir import utility_paths

def count_words_and_chars(file_path):
    """
    Legge un file e restituisce il numero di parole e caratteri.
    
    Args:
        file_path (str): Percorso del file da analizzare
    
    Returns:
        tuple: (word_count, char_count)
    """
    file_path = utility_paths.DATASET_DIR / file_path
    print(f"f path = {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            
            # Conteggio caratteri (escludendo spazi bianchi e newline per il conteggio "pulito")
            char_count = len(content)
            
            # Conteggio parole (split su spazi bianchi e rimuove stringhe vuote)
            words = re.findall(r'\b\w+\b', content)
            word_count = len(words)
            
            return word_count, char_count
    except FileNotFoundError:
        print(f"Attenzione: File non trovato: {file_path}")
        return 0, 0
    except Exception as e:
        print(f"Errore nella lettura del file {file_path}: {e}")
        return 0, 0

def extract_llm_type(file_path):
    """
    Estrae il tipo di LLM dal percorso del file.
    
    Args:
        file_path (str): Percorso del file LLM
    
    Returns:
        str: Tipo di LLM (claude, gemini, openAI)
    """
    path_lower = file_path.lower()
    if 'claude' in path_lower:
        return 'claude'
    elif 'gemini' in path_lower:
        return 'gemini'
    elif 'openai' in path_lower or 'chatgpt' in path_lower:
        return 'openAI'
    else:
        # Fallback: prova a estrarre dalla struttura della cartella
        path_parts = file_path.split('/')
        for part in path_parts:
            part_lower = part.lower()
            if part_lower in ['claude', 'gemini', 'openai']:
                return part_lower if part_lower != 'openai' else 'openAI'
        return 'unknown'

def process_json_file(input_file_path, output_file_path=None):
    """
    Processa il file JSON aggiornando i metadati LLM.
    
    Args:
        input_file_path (str): Percorso del file JSON di input
        output_file_path (str): Percorso del file JSON di output (opzionale)
    """
    # Se non specificato, sovrascrive il file originale
    if output_file_path is None:
        output_file_path = input_file_path
    
    try:
        # Carica il file JSON
        with open(input_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        print(f"Processando file JSON: {input_file_path}")
        
        # Processa ogni linguaggio nel JSON
        for language, entries in data.items():
            print(f"\nProcessando linguaggio: {language}")
            
            for entry in entries:
                entry_id = entry.get('id', 'ID sconosciuto')
                print(f"  Processando entry: {entry_id}")
                
                # Verifica se esiste il campo LLM_codeSnippetFilePaths
                if 'LLM_codeSnippetFilePaths' not in entry:
                    print(f"    Attenzione: LLM_codeSnippetFilePaths non trovato per {entry_id}")
                    continue
                
                llm_paths = entry['LLM_codeSnippetFilePaths']
                llms_data = []
                
                # Processa ogni percorso LLM
                for path in llm_paths:
                    print(f"    Processando file LLM: {path}")
                    
                    # Estrai il tipo di LLM
                    llm_type = extract_llm_type(path)
                    
                    # Conta parole e caratteri
                    word_count, char_count = count_words_and_chars(path)
                    
                    # Crea l'oggetto LLM
                    llm_obj = {
                        "type": llm_type,
                        "path": path,
                        "word_quantity": word_count,
                        "char_quantity": char_count
                    }
                    
                    llms_data.append(llm_obj)
                    print(f"      Tipo: {llm_type}, Parole: {word_count}, Caratteri: {char_count}")
                
                # Sostituisci LLM_codeSnippetFilePaths con LLMs
                entry['LLMs'] = llms_data
                del entry['LLM_codeSnippetFilePaths']
        
        # Salva il file JSON aggiornato
        with open(output_file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        
        print(f"\nFile JSON aggiornato salvato in: {output_file_path}")
        
    except FileNotFoundError:
        print(f"Errore: File JSON non trovato: {input_file_path}")
    except json.JSONDecodeError as e:
        print(f"Errore nella decodifica JSON: {e}")
    except Exception as e:
        print(f"Errore generico: {e}")

def main():
    """
    Funzione principale dello script.
    """    
            
    process_json_file(utility_paths.FOCUSED_CLUSTER_JSON_FILEPATH)
    process_json_file(utility_paths.FOCUSED_CLUSTER_2_JSON_FILEPATH)

if __name__ == "__main__":
    main()