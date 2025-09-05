import json
import os
import re
from collections import defaultdict
from pathlib import Path

from utility_dir import utility_paths


def normalize_name(name: str) -> str:
    """
    Normalizza il nome di un esercizio per uniformare vari formati:
    - camelCase -> camel_case
    - kebab-case -> kebab_case
    - maiuscole -> minuscole
    - spazi -> underscore
    """
    # sostituisco separatori con underscore
    name = re.sub(r"[-\s]", "_", name)

    # camelCase -> snake_case
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", name)

    return name.lower().strip("_")


def load_dataset(filepath: str) -> dict:
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def build_clusters(dataset: dict) -> dict:
    clusters = defaultdict(lambda: defaultdict(list))

    for language, entries in dataset.items():
        for entry in entries:
            filename = entry.get("filename", "")
            base_name = os.path.splitext(filename)[0]  # tolgo estensione
            normalized_name = normalize_name(base_name)

            clusters[normalized_name][language].append(entry)

    return clusters


def save_clusters(clusters: dict, out_dir: str):
    Path(out_dir).mkdir(parents=True, exist_ok=True)

    for exercise_name, data in clusters.items():
        out_path = Path(out_dir) / f"cluster_{exercise_name}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)


def main():
    dataset_path = utility_paths.DATASET_JSON_FILEPATH
    dataset = load_dataset(dataset_path)

    clusters = build_clusters(dataset)

    # salvo i cluster
    save_clusters(clusters, utility_paths.CLUSTERS_DIR_FILEPATH)

    # statistiche
    total_clusters = len(clusters)
    total_entries = sum(
        sum(len(entries) for entries in lang_data.values())
        for lang_data in clusters.values()
    )

    print(f"Totale cluster: {total_clusters}")
    print(f"Totale entries: {total_entries}")


if __name__ == "__main__":
    main()
