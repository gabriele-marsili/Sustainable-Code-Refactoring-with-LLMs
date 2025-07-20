import os
import json
import shutil
from collections import defaultdict
from pathlib import Path
from utility_dir import utility_paths


# === UTILS ===

CLUSTER_ALREADY_CREATED = [
    "raindrops",
    "bob",
    "leap",
    "pangram"
]

class ClusterCreator : 
    def __init__(self, root_dir = "dataset", cluster_name = "focused_cluster_datas_3.json",save_in_dir=False):
        self.root_dir = Path(root_dir)
        self.jsonDataset_file = self.root_dir / "dataset.json"
        self.FOCUSED_CLUSTER_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
        self.FOCUSED_CLUSTER_JSON = utility_paths.CLUSTERS_DIR_FILEPATH / cluster_name
        self.save_in_dir = save_in_dir

    def load_dataset(self):
        with open(self.jsonDataset_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_exercise_name(self,entry):
        # Presuppone che il nome esercizio sia ricavabile dal filename
        filename = entry.get("filename")
        base = Path(filename).stem
        return base.split(".")[0]  # Se è tipo x.test.js rimuove .test

    def check_already_created(self,entry):
        for name in CLUSTER_ALREADY_CREATED : 
            if name in entry["id"] : return True
        
        return False
    
    def group_entries_by_exercise(self,dataset):
        cluster_map = defaultdict(list)
        for lang, entries in dataset.items():
            for entry in entries:
                #skip already created clusters :
                if not self.check_already_created(entry):
                    exercise = self.get_exercise_name(entry)
                    key = exercise.lower()
                    cluster_map[key].append((lang, entry))
        return cluster_map

    def copy_entry(self, entry, lang):
        exercise = self.get_exercise_name(entry)
        folder_name = f"{exercise}_{lang}_{entry['source']}"
        dest_dir = self.FOCUSED_CLUSTER_DIR / folder_name
        os.makedirs(dest_dir, exist_ok=True)

        # Percorsi assoluti ai file o directory da copiare
        paths = {
            "code": self.root_dir / entry["codeSnippetFilePath"],
            "test": self.root_dir / entry["testUnitFilePath"]
        }

        for label, src in paths.items():
            if not src.exists():
                print(f"[AVVISO] {label} path non trovato: {src}")
                continue

            if src.is_dir():
                dest_subdir = dest_dir / src.name
                if dest_subdir.exists():
                    shutil.rmtree(dest_subdir)
                shutil.copytree(src, dest_subdir)
            else:
                shutil.copy(src, dest_dir / src.name)

        return lang, folder_name


    def save_focused_dataset(self,focused_entries):
        output = defaultdict(list)
        for lang, entry in focused_entries:
            output[lang].append(entry)
        with open(self.FOCUSED_CLUSTER_JSON, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=4)

    def start(self):
        if not os.path.exists(self.jsonDataset_file):
            print(f"Errore: {self.jsonDataset_file} non trovato.")
            return

        dataset = self.load_dataset()
        clusters = self.group_entries_by_exercise(dataset)

        # Trova il cluster cross-language più grande (in termini di numero di linguaggi)
        top_cluster_name, top_cluster_entries = max(clusters.items(), key=lambda kv: len(kv[1]))

        print(f"Cluster selezionato: '{top_cluster_name}' con {len(top_cluster_entries)} versioni cross-language.")

        if self.save_in_dir : 
            os.makedirs(self.FOCUSED_CLUSTER_DIR, exist_ok=True)

            for lang, entry in top_cluster_entries:
                self.copy_entry(entry, lang)

        self.save_focused_dataset(top_cluster_entries)

        print(f"\nCartella '{self.FOCUSED_CLUSTER_DIR}' creata con i file degli esercizi.")
        print(f"Metadati salvati in '{self.FOCUSED_CLUSTER_JSON}'.")
        
