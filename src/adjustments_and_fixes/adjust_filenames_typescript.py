import os
import json
from pathlib import Path
from utility_dir import utility_paths

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = utility_paths.DATASET_DIR / "typescript"
JSON_PATH = utility_paths.DATASET_JSON_FILEPATH
JSON_PATH_FOCUSED_CLUSTER = utility_paths.FOCUSED_CLUSTER_JSON_FILEPATH

def rename_files():
    renamed = []
    for root, dirs, files in os.walk(DATASET_DIR):
        for file in files:
            if file.endswith("_testSuite.ts"):
                old_path = Path(root) / file
                new_name = file.replace("_testSuite.ts", ".test.ts")
                new_path = Path(root) / new_name
                os.rename(old_path, new_path)
                renamed.append((str(old_path), str(new_path)))
    return renamed

def update_json(renamed_files,path):
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    for lang, entries in data.items():
        if lang.lower() != "typescript":
            continue
        for entry in entries:
            old_test_path = entry["testUnitFilePath"]
            for old, new in renamed_files:
                if old_test_path in old:
                    relative_new = str(Path(new).relative_to(DATASET_DIR.parent))
                    entry["testUnitFilePath"] = relative_new
                    break

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"✅ Updated JSON with {len(renamed_files)} test file path(s).")

if __name__ == "__main__":
    renamed_files = rename_files()
    print(f"🔄 Renamed {len(renamed_files)} file(s).")
    update_json(renamed_files,JSON_PATH)
    update_json(renamed_files,JSON_PATH_FOCUSED_CLUSTER)
