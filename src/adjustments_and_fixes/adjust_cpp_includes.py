import os
import json
from pathlib import Path

from utility_dir import utility_paths

BASE_DIR = utility_paths.DATASET_DIR

BAD_ENTRIES_CLUSTER_JSON_PATH = utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH
BASE_DIR = Path("../dataset")

def fix_includes_in_test_files(dataset_json_path=BAD_ENTRIES_CLUSTER_JSON_PATH):
    with open(dataset_json_path, 'r', encoding='utf-8') as f:
        dataset = json.load(f)

    cpp_entries = dataset.get("cpp", [])

    for entry in cpp_entries:
        filename = entry["filename"]
        base_header = os.path.splitext(filename)[0] + ".h"
        test_dir = BASE_DIR / entry["testUnitFilePath"]

        if not test_dir.is_dir():
            print(f"[WARN] Directory non trovata: {test_dir}")
            continue

        for file in os.listdir(test_dir):
            if file.endswith("_test.cpp"):
                test_path = os.path.join(test_dir, file)

                with open(test_path, 'r', encoding='utf-8') as tf:
                    lines = tf.readlines()

                modified = False
                new_lines = []

                for line in lines:
                    if f'#include "{base_header}"' in line:
                        new_line = line.replace(f'#include "{base_header}"',
                                                f'#include "../src/{base_header}"')
                        new_lines.append(new_line)
                        modified = True
                        print(f"[INFO] Fixato in {test_path}")
                    else:
                        new_lines.append(line)

                if modified:
                    with open(test_path, 'w', encoding='utf-8') as tf:
                        tf.writelines(new_lines)
                else:
                    print(f"[OK] Nessuna modifica necessaria: {test_path}")

if __name__ == "__main__":
    fix_includes_in_test_files()
