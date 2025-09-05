import os
import json
import shutil
from collections import defaultdict
from pathlib import Path
from utility_dir import utility_paths


# === UTILS ===

CLUSTER_ALREADY_CREATED = [
   
]


class ClusterCreator:
    def __init__(
        self,
        root_dir="dataset",
        cluster_name="focused_cluster_datas_3.json",
        save_in_dir=False,
    ):
        self.root_dir = Path(root_dir)
        self.jsonDataset_file = self.root_dir / "dataset.json"
        self.FOCUSED_CLUSTER_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
        self.FOCUSED_CLUSTER_JSON = utility_paths.CLUSTERS_DIR_FILEPATH / cluster_name
        self.save_in_dir = save_in_dir

    def count_entries(self):
        total = 0
        cluster_quantity = 0
        for file_name in os.listdir(self.FOCUSED_CLUSTER_DIR):
            
            cluster_quantity += 1
            file_path = utility_paths.CLUSTERS_DIR_FILEPATH / file_name
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = json.load(f)
                    for _lang, entries in content.items():
                        total += len(entries)
            except Exception as e:
                print((f"error opening file : {e}"))
        
        print(f"cluster_quantity = {cluster_quantity}")
        return total

    def load_dataset(self):
        with open(self.jsonDataset_file, "r", encoding="utf-8") as f:
            content = json.load(f)
            total = 0
            for _lang, entries in content.items():
                total += len(entries)
            print(f"\ntotal entires in dataset = {total}\n")
            return content

    def get_exercise_name(self, entry):
        # Presuppone che il nome esercizio sia ricavabile dal filename
        filename = entry.get("filename")
        base = Path(filename).stem
        return base.split(".")[0]  # Se è tipo x.test.js rimuove .test

    def check_already_created(self, entry):
        for name in CLUSTER_ALREADY_CREATED:
            if name in entry["id"]:
                return True

        return False

    def group_entries_by_exercise(self, dataset):
        clusters_cross_language = defaultdict(list)  # {filename_no_ext: [entries]}
        total_entries = 0
        for _language, entries in dataset.items():
            for entry in entries:
                total_entries += 1

                filename = entry.get("filename")
                if filename:
                    filename_no_ext = Path(filename).stem
                    clusters_cross_language[filename_no_ext].append(entry)
                else :
                    print(f"skipped entry : {entry['id']}")

        print(f"total entries found in group entires: {total_entries}")
        return clusters_cross_language

    def copy_entry(self, entry, lang):
        exercise = self.get_exercise_name(entry)
        folder_name = f"{exercise}_{lang}_{entry['source']}"
        dest_dir = self.FOCUSED_CLUSTER_DIR / folder_name
        os.makedirs(dest_dir, exist_ok=True)

        # Percorsi assoluti ai file o directory da copiare
        paths = {
            "code": self.root_dir / entry["codeSnippetFilePath"],
            "test": self.root_dir / entry["testUnitFilePath"],
        }

        for label, src in paths.items():
            if not src.exists():
                print(f"⚠️[AVVISO] {label} path non trovato: {src}")
                continue

            if src.is_dir():
                dest_subdir = dest_dir / src.name
                if dest_subdir.exists():
                    shutil.rmtree(dest_subdir)
                shutil.copytree(src, dest_subdir)
            else:
                shutil.copy(src, dest_dir / src.name)

        return lang, folder_name

    def save_focused_dataset(self, focused_entries):
        # print(f"focused_entries:\n{focused_entries}")
        output = defaultdict(list)
        for entry in focused_entries:
            lang = entry["language"]
            output[lang].append(entry)
        with open(self.FOCUSED_CLUSTER_JSON, "w", encoding="utf-8") as f:
            json.dump(output, f, indent=4)

    def clusterize_all_dataset(self):
        if not os.path.exists(self.jsonDataset_file):
            print(f"Errore: {self.jsonDataset_file} non trovato.")
            return

        dataset = self.load_dataset()
        clusters = self.group_entries_by_exercise(dataset)
        print(f"\nCluster quantity by group entires : {len(clusters)}\n")
        for cluster_name, cluster_entries in clusters.items():
            if cluster_name in CLUSTER_ALREADY_CREATED:
                print(f"SKIPPED CLUSTER ALREADY PRESENT : {cluster_name}")
                continue
            else:
                self.FOCUSED_CLUSTER_JSON = utility_paths.CLUSTERS_DIR_FILEPATH / (
                    f"cluster_{cluster_name}.json"
                )

                if self.save_in_dir:
                    os.makedirs(self.FOCUSED_CLUSTER_DIR, exist_ok=True)
                    for lang, entry in cluster_entries:
                        self.copy_entry(entry, lang)

                self.save_focused_dataset(cluster_entries)

                if cluster_name not in CLUSTER_ALREADY_CREATED:
                    CLUSTER_ALREADY_CREATED.append(cluster_name)

        #print(f"\nDataset clusterized! Clusters:\n{CLUSTER_ALREADY_CREATED}")

    def start(self):
        if not os.path.exists(self.jsonDataset_file):
            print(f"Errore: {self.jsonDataset_file} non trovato.")
            return

        dataset = self.load_dataset()
        clusters = self.group_entries_by_exercise(dataset)
        print(f"\nCluster quantity by group entires : {len(clusters)}\n")

        # Trova il cluster cross-language più grande (in termini di numero di linguaggi)
        top_cluster_name, top_cluster_entries = max(
            clusters.items(), key=lambda kv: len(kv[1])
        )

        self.FOCUSED_CLUSTER_JSON = utility_paths.CLUSTERS_DIR_FILEPATH / (
            f"cluster_{top_cluster_name}.json"
        )

        print(
            f"\nCluster selezionato: '{top_cluster_name}' con {len(top_cluster_entries)} versioni cross-language."
        )

        if self.save_in_dir:
            os.makedirs(self.FOCUSED_CLUSTER_DIR, exist_ok=True)

            for lang, entry in top_cluster_entries:
                self.copy_entry(entry, lang)

        self.save_focused_dataset(top_cluster_entries)

        # print(f"\nCartella '{self.FOCUSED_CLUSTER_DIR}' creata con i file degli esercizi.")
        print(f"\nMetadati salvati in '{self.FOCUSED_CLUSTER_JSON}'.")

        if top_cluster_name in CLUSTER_ALREADY_CREATED:
            top_cluster_name = "done"
        else:
            CLUSTER_ALREADY_CREATED.append(top_cluster_name)

        return top_cluster_name


if __name__ == "__main__":
    c_creator = ClusterCreator()
    # c_creator.start()
    #c_creator.clusterize_all_dataset()
    #print(f"\nCurrent dataset cluster quantity : {len(CLUSTER_ALREADY_CREATED)}")
    print(f"\nCurrent dataset entries quantity : {c_creator.count_entries()}")
