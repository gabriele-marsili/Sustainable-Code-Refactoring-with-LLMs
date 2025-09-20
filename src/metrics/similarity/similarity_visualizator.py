import json
import statistics
from pathlib import Path
import sys
import os
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from utility_dir import utility_paths  # noqa: E402


def safe_mean(values):
    values = [v for v in values if v is not None]
    return statistics.mean(values) if values else None


class ClusterAnalysis:
    def __init__(self):
        self.cluster_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH

    def read_json(self, path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_all_clusters(self) -> list[Path]:
        clusters = [p for p in Path(self.cluster_dir).glob("*.json")]
        final_clusters = []
        for cluster in clusters:
            cluster_name = (cluster.name).replace("cluster_", "").replace(".json", "")
            if any(
                pattern in cluster_name
                for pattern in ["with_metrics", "debug_", "focused_", "bad_entries"]
            ):
                continue
            else:
                final_clusters.append(cluster)

        return final_clusters

    def get_execution_files(self, cluster_name) -> list[Path]:
        return [p for p in Path(self.exec_dir).glob(f"{cluster_name}_results*.json")]

    def avg_performance(self, exec_results):
        """Calcola la media di CPU, RAM e tempo da più run"""
        cpu = statistics.mean([r["CPU_usage"] for r in exec_results])
        ram = statistics.mean([r["RAM_usage"] for r in exec_results])
        time = statistics.mean([r["execution_time_ms"] for r in exec_results])
        return cpu, ram, time

    def collect_data(self):
        rows = []

        for cluster_path in self.get_all_clusters():
            cluster_name = (
                (cluster_path.name).replace("cluster_", "").replace(".json", "")
            )
            cluster_content = self.read_json(cluster_path)

            # carica performance files
            exec_files = self.get_execution_files(cluster_name)
            perf_data = {}
            for ef in exec_files:
                content = self.read_json(ef)
                for lang, results in content["results"].items():
                    for res in results:
                        if "LLM_results" in res:  # file LLM
                            for llm_res in res["LLM_results"]:
                                key = (
                                    lang,
                                    llm_res["LLM_type"],
                                    Path(llm_res["path"]).stem,
                                )
                                if key not in perf_data:
                                    perf_data[key] = {"CPU": [], "RAM": [], "TIME": []}
                                perf_data[key]["CPU"].append(llm_res["CPU_usage"])
                                perf_data[key]["RAM"].append(llm_res["RAM_usage"])
                                perf_data[key]["TIME"].append(
                                    llm_res["execution_time_ms"]
                                )
                        else:  # file base
                            key = (lang, "original", Path(res["filename"]).stem)
                            if key not in perf_data:
                                perf_data[key] = {"CPU": [], "RAM": [], "TIME": []}
                            
                            try :
                                perf_data[key]["CPU"].append(res["CPU_usage"])
                                perf_data[key]["RAM"].append(res["RAM_usage"])
                                perf_data[key]["TIME"].append(res["execution_time_ms"])
                            except Exception as _e : 
                                #print(f"Exception in res :\n{res}\n:{e}\n")
                                pass

            # calcola medie performance
            perf_avg = {
                k: {
                    "CPU": safe_mean(v["CPU"]),
                    "RAM": safe_mean(v["RAM"]),
                    "TIME": safe_mean(v["TIME"]),
                }
                for k, v in perf_data.items()
            }

            # aggiunge le similarità dal cluster
            for lang, entries in cluster_content.items():
                for entry in entries:
                    for llm in entry["LLMs"]:
                        prompt_v = (str(llm["filename"]).split("."))[0]
                        #print(F"prompt_v = {prompt_v} | filename = {str(llm["filename"])}")
                        prompt_v = str(prompt_v.split("_v")[1])

                        if prompt_v not in ["1","2","3","4"]:
                            continue
                        
                        path_stem = Path(llm["path"]).stem
                        key = (lang, llm["type"], path_stem)

                        if key in perf_avg and perf_avg[key]["CPU"] is not None and perf_avg[key]["RAM"] is not None and perf_avg[key]["TIME"] is not None: 
                            rows.append(
                                {
                                    "cluster": cluster_name,
                                    "language": lang,
                                    "llm_type": llm["type"],
                                    "prompt_version": prompt_v,
                                    "fuzzy": llm["fuzzy_score"],
                                    "cosine": llm["cosine_similarity_score"],
                                    "similarity_index": llm["similarity_index"],
                                    "CPU": perf_avg[key]["CPU"],
                                    "RAM": perf_avg[key]["RAM"],
                                    "TIME": perf_avg[key]["TIME"],
                                }
                            )

        return pd.DataFrame(rows)

    def plot_statistics(self, df: pd.DataFrame):
        sns.set(style="whitegrid")

        # 1. Distribuzione similarità totale
        plt.figure(figsize=(8, 5))
        sns.histplot(df["similarity_index"], bins=20, kde=True)
        plt.title("Distribuzione Similarità Index (tutti i cluster)")
        plt.xlabel("Similarity Index (%)")
        plt.ylabel("Count")
        plt.show()

        # 2. Media per linguaggio
        plt.figure(figsize=(10, 5))
        sns.barplot(data=df, x="language", y="similarity_index", ci="sd")
        plt.title("Similarità media per linguaggio")
        plt.ylabel("Similarity Index (%)")
        plt.show()

        # 3. Media per modello
        plt.figure(figsize=(10, 5))
        sns.barplot(data=df, x="llm_type", y="similarity_index", ci="sd")
        plt.title("Similarità media per modello LLM")
        plt.ylabel("Similarity Index (%)")
        plt.show()

        # 4. Heatmap <linguaggio, modello, prompt>
        pivot = df.pivot_table(
            index=["language", "llm_type"],
            columns="prompt_version",
            values="similarity_index",
            aggfunc="mean",
        )
        plt.figure(figsize=(12, 6))
        sns.heatmap(pivot, annot=True, cmap="coolwarm", fmt=".1f")
        plt.title("Similarità media per <linguaggio, modello, prompt>")
        plt.show()

        # 5. Correlazione Similarità ↔ Performance
        metrics = ["CPU", "RAM", "TIME"]
        for m in metrics:
            plt.figure(figsize=(7, 5))
            sns.scatterplot(data=df, x="similarity_index", y=m, hue="llm_type")
            plt.title(f"Correlazione Similarità ↔ {m}")
            plt.xlabel("Similarity Index (%)")
            plt.ylabel(m)
            plt.legend()
            plt.show()


if __name__ == "__main__":
    ca = ClusterAnalysis()
    df = ca.collect_data()
    print(df.head())
    ca.plot_statistics(df)
