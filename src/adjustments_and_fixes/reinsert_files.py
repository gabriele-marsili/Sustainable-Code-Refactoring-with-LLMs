#!/usr/bin/env python3
import os
import sys
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json
import glob
from pathlib import Path
from utility_dir import utility_paths

def scan_cpp_directory():
    """
    Scansiona la directory dataset/cpp e restituisce una lista di tutti gli esercizi trovati
    """
    dataset_path = utility_paths.DATASET_DIR
    cpp_path = os.path.join(dataset_path, "cpp")
    if not os.path.exists(cpp_path):
        print(f"Directory {cpp_path} non trovata!")
        return []
    
    exercises = []
    
    # Scansiona tutte le directory degli esercizi
    for exercise_dir in os.listdir(cpp_path):
        exercise_path = os.path.join(cpp_path, exercise_dir)
        
        # Verifica che sia una directory
        if not os.path.isdir(exercise_path):
            continue
            
        # Cerca i file cpp nella directory dell'esercizio
        cpp_files = []
        test_files = []
        
        # Pattern per trovare file cpp (escludendo i test)
        for dir in os.listdir(exercise_path):
            if dir == "src" or dir == "test":
                p = f"{exercise_path}/{dir}"
                for file in os.listdir(p):                    
                    if file.endswith('.cpp'):
                        if 'test' in file.lower() or 'Test' in file:
                            test_files.append(file)
                        else:
                            cpp_files.append(file)
        
        # Se non ci sono file cpp, salta questo esercizio
        if not cpp_files:
            print(f"Nessun file cpp trovato in {exercise_dir}")
            continue
            
        # Per ogni file cpp principale, crea un'entry
        for cpp_file in cpp_files:
            # Rimuovi l'estensione per ottenere il nome base
            base_name = os.path.splitext(cpp_file)[0]
            
            # Trova il file di test corrispondente
            test_file = None
            for test in test_files:
                if base_name.lower() in test.lower() or exercise_dir.lower() in test.lower():
                    test_file = test
                    break
            
            # Se non trovato, usa il primo file di test disponibile
            if not test_file and test_files:
                test_file = test_files[0]
            
            exercise_info = {
                'exercise_dir': exercise_dir,
                'cpp_file': cpp_file,
                'test_file': test_file,
                'base_name': base_name
            }
            exercises.append(exercise_info)
    
    return exercises

def create_json_entry(exercise_info):
    """
    Crea un'entry JSON per un esercizio
    """
    exercise_dir = exercise_info['exercise_dir']
    cpp_file = exercise_info['cpp_file']
    test_file = exercise_info['test_file']
    base_name = exercise_info['base_name']
    
    # Genera l'ID basandoti sul pattern esistente
    # Formato: cpp_{exercise_name}_{source}
    entry_id = f"cpp_{exercise_dir}_dataset"
    
    # Path relativi per i file
    code_path = f"cpp/{exercise_dir}/src/{cpp_file}"
    test_path = f"cpp/{exercise_dir}/test/{test_file}" if test_file else None
    
    source = entry_id.split("_")[2]
    entry = {
        "id": entry_id,
        "filename": cpp_file,
        "language": "cpp",
        "source": source,
        "codeSnippetFilePath": code_path,
        "testUnitFilePath": test_path,
        "licenseType": "None"
    }
    
    return entry

def load_existing_json(json_file_path):
    """
    Carica il file JSON esistente
    """
    if not os.path.exists(json_file_path):
        return {"cpp": []}
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data
    except json.JSONDecodeError as e:
        print(f"Errore nel parsing del JSON: {e}")
        return {"cpp": []}

def save_updated_json(data, json_file_path):
    """
    Salva il file JSON aggiornato
    """
    try:
        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"File JSON aggiornato salvato in: {json_file_path}")
    except Exception as e:
        print(f"Errore nel salvare il JSON: {e}")

def main():
    # Percorsi
    dataset_path =  str(utility_paths.DATASET_DIR)
    json_file_path = str(utility_paths.CLUSTERS_DIR_FILEPATH / "debug_cluster_cpp.json")
    
    print("🔍 Scansione della directory dataset/cpp...")
    
    # Scansiona la directory cpp
    exercises = scan_cpp_directory()
    print(f"📁 Trovati {len(exercises)} esercizi cpp")
    
    # Carica il JSON esistente
    print("📖 Caricamento del file JSON esistente...")
    data = load_existing_json(json_file_path)
    
    # Estrai gli ID esistenti
    existing_ids = set()
    if "cpp" in data:
        existing_ids = {entry["id"] for entry in data["cpp"]}
    else:
        data["cpp"] = []
    
    print(f"📊 Entries cpp esistenti: {len(existing_ids)}")
    
    # Aggiungi le entries mancanti
    new_entries = []
    for exercise in exercises:
        entry = create_json_entry(exercise)
        
        # Controlla se l'entry esiste già
        if entry["id"] not in existing_ids:
            new_entries.append(entry)
            data["cpp"].append(entry)
        else:
            print(f"⚠️  Entry già esistente: {entry['id']}")
    
    print(f"✅ Aggiunte {len(new_entries)} nuove entries")
    
    # Mostra un riepilogo delle nuove entries
    if new_entries:
        print("\n📋 Nuove entries aggiunte:")
        for entry in new_entries:
            print(f"  - {entry['id']}")
            print(f"    File: {entry['filename']}")
            print(f"    Test: {entry.get('testUnitFilePath', 'N/A')}")
            print()
    
    # Salva il file aggiornato
    if new_entries:
        save_updated_json(data, json_file_path)
        print(f"🎉 Processo completato! Totale entries cpp: {len(data['cpp'])}")
    else:
        print("ℹ️  Nessuna nuova entry da aggiungere")

if __name__ == "__main__":
    main()