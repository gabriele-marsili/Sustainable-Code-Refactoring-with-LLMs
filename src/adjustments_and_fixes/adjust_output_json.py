
import json
import sys
from pathlib import Path
from datetime import datetime
from utility_dir import utility_paths

DATASET_JSON_FILEPATH = utility_paths.DATASET_JSON_FILEPATH
FOCUSED_CLUSTER_JSON_FILEPATH = utility_paths.FOCUSED_CLUSTER_JSON_FILEPATH
FOCUSED_CLUSTER_2_JSON_FILEPATH = utility_paths.FOCUSED_CLUSTER_2_JSON_FILEPATH


FIELDS_TO_EXTRACT = [
    "CPU_usage",
    "RAM_usage",
    "execution_time_ms",
    "LLM_results"
]

def extract_and_clean(input_json_path: Path, output_json_path: Path):
    with open(input_json_path, "r", encoding="utf-8") as infile:
        full_data = json.load(infile)

    output = {
        "execution_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "results": {}
    }

    # Cleaned version of original file
    cleaned_data = {}

    for language, entries in full_data.items():
        cleaned_entries = []
        extracted_entries = []

        for entry in entries:
            # Estratti
            extracted_entry = {
                "id": entry.get("id"),
                "filename": entry.get("filename"),
                "language": entry.get("language")
            }
            for field in FIELDS_TO_EXTRACT:
                if field in entry:
                    extracted_entry[field] = entry[field]

            # Pulizia
            cleaned_entry = {
                k: v for k, v in entry.items() if k not in FIELDS_TO_EXTRACT
            }

            extracted_entries.append(extracted_entry)
            cleaned_entries.append(cleaned_entry)

        output["results"][language] = extracted_entries
        cleaned_data[language] = cleaned_entries

    # Scrivi output dei metadati
    with open(output_json_path, "w", encoding="utf-8") as outfile:
        json.dump(output, outfile, indent=4, ensure_ascii=False)

    # Sovrascrivi il file originale con i metadati rimossi
    with open(input_json_path, "w", encoding="utf-8") as outfile:
        json.dump(cleaned_data, outfile, indent=4, ensure_ascii=False)

    print(f"[OK] Estratti e rimossi i metadati. Output salvato in: {output_json_path}")
    print(f"[OK] File di input aggiornato senza i metadati.")

if __name__ == "__main__":
    

    input_path = DATASET_JSON_FILEPATH
    
    extract_and_clean(input_path, utility_paths.OUTPUT_DATASET_FILEPATH)
