import json
import os
import sys
from pathlib import Path

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../"))
from utility_dir import utility_paths  # noqa: E402


def fix_key_in_json(input_path: str):
    input_file = Path(input_path)
    output_file = input_file

    # Carica il contenuto JSON
    with input_file.open("r", encoding="utf-8") as f:
        data = json.load(f)

    # Funzione ricorsiva per sostituire la chiave ovunque
    def replace_key(obj):
        if isinstance(obj, dict):
            new_obj = {}
            for k, v in obj.items():
                new_key = "regressionTestPassed" if k == "regressionTestPassed" else k
                new_obj[new_key] = replace_key(v)
            return new_obj
        elif isinstance(obj, list):
            return [replace_key(i) for i in obj]
        else:
            return obj

    fixed_data = replace_key(data)

    # Salva il JSON corretto
    with output_file.open("w", encoding="utf-8") as f:
        json.dump(fixed_data, f, indent=4, ensure_ascii=False)

    # print(f"File corretto salvato in: {output_file}")


def adjust_all():
    clusters = [
        p
        for p in utility_paths.CLUSTERS_DIR_FILEPATH.glob("*.json")
        if "with_metrics" not in p.name
        and "debug_" not in p.name
        and "bad_entries" not in p.name
        and "cluster_" in p.name
    ]

    total_clusters = len(clusters)

    print(f"\nGoing to fix regraition for {total_clusters} clusters")
    for i, cluster_path in enumerate(clusters):
        cluster_name = cluster_path.stem.replace("cluster_", "").replace(".json", "")
        print(
            f"Processing cluster: {cluster_name} ({i + 1}/{total_clusters} | {(i + 1) / total_clusters * 100:.1f}%)"
        )

        for exec_num in range(1, 6):
            for prompt_v in range(1, 5):
                out_cluster_path = (
                    utility_paths.OUTPUT_DIR_FILEPATH
                    / f"{cluster_name}_results_v{prompt_v}_{exec_num}.json"
                )

                fix_key_in_json(str(out_cluster_path))


if __name__ == "__main__":
    adjust_all()
