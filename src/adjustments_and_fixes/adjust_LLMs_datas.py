import sys
import os
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json
import re
import os.path
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
        
        DIRS = ["openAI","claude","gemini"]
        
        # Processa ogni linguaggio nel JSON
        for language, entries in data.items():
            print(f"\nProcessando linguaggio: {language}")
            
            for entry in entries:
                entry_id = entry.get('id', 'ID sconosciuto')
                entry_filename = entry['filename']
                print(f"  Processando entry: {entry_id}")
                
                exercise_path = str(entry['codeSnippetFilePath']).replace("/"+entry['filename'],"")
                if entry['language'] == "c" or entry['language'] == "cpp":
                    exercise_path = exercise_path.replace("/src","")
                exercise_path = utility_paths.DATASET_DIR / exercise_path
                
                llms_data = []
                
                # Processa ogni percorso LLM
                for dir_name in DIRS:
                    complete_dir_path = exercise_path / dir_name
                    
                    if os.path.isdir(str(complete_dir_path)):
                        for LLM_file in os.scandir(str(complete_dir_path)):  
                            if LLM_file.is_file() and not LLM_file.name.endswith(".json") and not LLM_file.name.endswith("config.js")  and not LLM_file.name.endswith(".log") and not LLM_file.name.endswith(".sh") and not LLM_file.name.endswith(".h") and LLM_file.name != entry_filename:
                                path = LLM_file.path
                        
                                # Estrai il tipo di LLM
                                llm_type = extract_llm_type(path)
                                
                                # Conta parole e caratteri
                                word_count, char_count = count_words_and_chars(path)
                                
                                # Crea l'oggetto LLM
                                llm_obj = {
                                    "type": llm_type,
                                    "path": path,
                                    "word_quantity": word_count,
                                    "char_quantity": char_count,
                                    "filename" : LLM_file.name
                                }
                                
                                llms_data.append(llm_obj)
                                print(f"      Tipo: {llm_type}, Parole: {word_count}, Caratteri: {char_count}")
                
                # Sostituisci LLM_codeSnippetFilePaths con LLMs
                entry['LLMs'] = llms_data
                
        
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
    #raindrops = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_raindrops.json"
    bob = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_bob.json"
    pangram = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_pangram.json"
    leap = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_leap.json"

    clusters = [
        bob,
        pangram,
        leap
    ]
            
    for cluster in clusters : 
        process_json_file(cluster)
    
    

if __name__ == "__main__":
    main()