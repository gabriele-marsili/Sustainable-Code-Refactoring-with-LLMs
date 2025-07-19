import json
import os
import shutil
from pathlib import Path

DATASET_ROOT = Path("../dataset")
DATASET_JSON = DATASET_ROOT / "dataset.json"  # Percorso relativo al tuo progetto

def flatten_go_exercises():
    with open(DATASET_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    changed = False
    for entry in data.get("go", []):
        # Determina directory esercizio
        base_path = os.path.join(DATASET_ROOT, str(entry["codeSnippetFilePath"]).replace("/src",""))
        print(f"base_path = {base_path}")
        # Se il codiceSnippetFilePath già punta a .go, ignora
        if base_path.endswith(".go"):
            continue

        exercise_name = str(entry["codeSnippetFilePath"]).replace("go/","").replace("/src","")
        print(f"exercise_name = {exercise_name}")
        
        exercise_dir = DATASET_ROOT / "go" / exercise_name
        src_dir = DATASET_ROOT / str(entry["codeSnippetFilePath"])
        test_dir = DATASET_ROOT / str(entry["testUnitFilePath"])

        # 1. Sposta file src
        if os.path.isdir(src_dir):
            for fname in os.listdir(src_dir):
                if fname.endswith(".go"):
                    print(f"moving snippet code f name : {str(fname)}")
                    src_file = os.path.join(src_dir, fname)
                    dest_file = os.path.join(exercise_dir, fname)
                    shutil.move(src_file, dest_file)
                    entry["codeSnippetFilePath"] = str(entry["codeSnippetFilePath"]).replace("/src","/"+str(fname))
                    print(f"Moved code → {dest_file}")
            os.rmdir(src_dir)
            changed = True

        # 2. Sposta e rinomina test
        if os.path.isdir(test_dir):
            for fname in os.listdir(test_dir):
                if fname.endswith(".go"):
                    print(f"moving test code f name : {str(fname)}")
                    src_file = os.path.join(test_dir, fname)
                    dest_file = os.path.join(exercise_dir, fname)
                    shutil.move(src_file, dest_file)
                    entry["testUnitFilePath"] = str(entry["testUnitFilePath"]).replace("/test","/"+str(fname))
                    print(f"Moved test → {dest_file}")
            os.rmdir(test_dir)
            changed = True

    # 3. Salva dataset.json aggiornato
    if changed:
        with open(DATASET_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print("Updated dataset.json")
    else:
        print("No Go entries needed updating")

def fix_paths():
    with open(DATASET_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    for entry in data.get("go", []):
        f_name :str = entry['filename']
        test_f_name :str = f_name.replace(".go","_test.go")
        entry["codeSnippetFilePath"] = str(entry["codeSnippetFilePath"]).replace(f_name,"/"+str(f_name))
        entry["testUnitFilePath"] = str(entry["testUnitFilePath"]).replace(test_f_name,"/"+str(test_f_name))
            

    
    with open(DATASET_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
        
    
    

if __name__ == "__main__":
    fix_paths()
