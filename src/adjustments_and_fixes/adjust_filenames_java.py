import os
import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset" / "Java"
JSON_PATH = BASE_DIR / "dataset" / "dataset.json"
JSON_PATH_FOCUSED_CLUSTER = BASE_DIR / "focused_cluster_datas.json"

def find_public_class(file_path):
    """Estrae il nome della classe pubblica dal contenuto di un file .java"""
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            match = re.match(r"\s*public\s+class\s+(\w+)", line)
            if match:
                return match.group(1)
    return None

def rename_java_files():
    renamed = []
    for root, _, files in os.walk(DATASET_DIR):
        for file in files:
            if file.endswith(".java"):
                full_path = Path(root) / file
                class_name = find_public_class(full_path)

                if class_name and class_name + ".java" != file:
                    new_path = Path(root) / (class_name + ".java")
                    os.rename(full_path, new_path)
                    renamed.append((str(full_path), str(new_path)))
    return renamed

def update_json(renamed_files, path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_count = 0

    for lang, entries in data.items():
        if lang.lower() != "java":
            continue
        for entry in entries:
            keys = ["codeSnippetFilePath", "testUnitFilePath"]
            if "LLM_codeSnippetFilePaths" in entry:
                keys += entry["LLM_codeSnippetFilePaths"]

            for key in keys:
                if isinstance(entry.get(key), list):
                    for i, val in enumerate(entry[key]):
                        for old, new in renamed_files:
                            if val in old:
                                relative_new = str(Path(new).relative_to(DATASET_DIR.parent))
                                entry[key][i] = relative_new
                                updated_count += 1
                else:
                    for old, new in renamed_files:
                        if entry.get(key) and entry[key] in old:
                            relative_new = str(Path(new).relative_to(DATASET_DIR.parent))
                            entry[key] = relative_new
                            updated_count += 1

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"✅ Updated JSON '{path.name}' with {updated_count} file path(s).")

if __name__ == "__main__":
    renamed = rename_java_files()
    print(f"🔄 Renamed {len(renamed)} .java file(s).")
    if renamed:
        update_json(renamed, JSON_PATH)
        update_json(renamed, JSON_PATH_FOCUSED_CLUSTER)
