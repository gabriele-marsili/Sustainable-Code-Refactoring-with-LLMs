import json
from pathlib import Path

def find_and_replace_in_files(file_path, old_string, new_string):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        if old_string in content:
            modified_content = content.replace(old_string, new_string)

            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(modified_content)
                
            print(f"✅ Modificato: {file_path}")
        else:
            print(f"➖ Nessuna modifica necessaria: {file_path}")

    except Exception as e:
        print(f"❌ Errore durante l'elaborazione del file {file_path}: {e}")

if __name__ == "__main__":
    base_dir = Path(__file__).resolve().parent.parent.parent
    bad_entries_cluster_json_path = base_dir / "src/bad_entries_cluster.json"
    if not bad_entries_cluster_json_path.exists(): print(f"❌ Cluster bad entries not exists")
    # Le stringhe che vuoi sostituire
    old_text = "from problems.hard."
    new_text = "from "
    
    datas = None
    with open(bad_entries_cluster_json_path, "r", encoding="utf-8") as f:
        datas = json.load(f)
    
    for lang, entries in datas.items():
        if lang == "python":
            for entry in entries:
                test_suite_file_path = entry['testUnitFilePath']
                test_suite_file_path = base_dir / "src" / "dataset" / test_suite_file_path

                find_and_replace_in_files(test_suite_file_path, old_text, new_text)