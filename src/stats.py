import json
import matplotlib.pyplot as plt
from collections import defaultdict, Counter
from statistics import mean
from pathlib import Path


class StatsHandler:
    def __init__(self, dataset_path: str):
        self.dataset_path = Path(dataset_path)
        self.data = self.load_dataset()
        self.global_metrics = {}
        self.per_language_metrics = {}
        self.comparison_per_snippet = []
        self.best_models = {}
        self.best_per_lang = {}

    def load_dataset(self):
        if not self.dataset_path.exists():
            raise FileNotFoundError(f"[ERRORE] Dataset non trovato: {self.dataset_path}")
        with open(self.dataset_path, 'r', encoding="utf-8") as f:
            return json.load(f)

    def compute_statistics(self):
        global_metrics = defaultdict(lambda: defaultdict(list))
        per_language_metrics = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
        comparison_per_snippet = []

        # ➤ Controlla se è una lista (formato flat) o un dizionario per linguaggio
        if isinstance(self.data, dict):
            data_entries = []
            for lang_entries in self.data.values():
                data_entries.extend(lang_entries)
        elif isinstance(self.data, list):
            data_entries = self.data
        else:
            raise ValueError("Formato del dataset non riconosciuto.")

        for entry in data_entries:
            language = entry['language']
            base_metrics = {
                'execution_time_ms': entry['execution_time_ms'],
                'CPU_usage': entry['CPU_usage'],
                'RAM_usage': entry['RAM_usage']
            }

            for llm_result in entry['LLM_results']:
                llm = llm_result['LLM_type']

                for metric in ['execution_time_difference_ms', 'CPU_usage_difference', 'ram_usage_difference']:
                    normalized_metric = metric.replace('_difference', '')
                    global_metrics[llm][normalized_metric].append(llm_result[metric])
                    per_language_metrics[language][llm][normalized_metric].append(llm_result[metric])

                comparison_per_snippet.append({
                    "id": entry["id"],
                    "language": language,
                    "llm": llm,
                    "execution_time_ms": llm_result["execution_time_ms"],
                    "CPU_usage": llm_result["CPU_usage"],
                    "RAM_usage": llm_result["RAM_usage"],
                    "execution_time_improved": llm_result["execution_time_improved"],
                    "CPU_improved": llm_result["CPU_improved"],
                    "ram_improved": llm_result["ram_improved"]
                })

        self.global_metrics = global_metrics
        self.per_language_metrics = per_language_metrics
        self.comparison_per_snippet = comparison_per_snippet

    
    def find_best_models(self):
        best_models = {}
        for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
            # Crea dizionario temporaneo con solo LLM che hanno dati per quella metrica
            valid_llms = {
                llm: mean(values[metric])
                for llm, values in self.global_metrics.items()
                if metric in values and values[metric]  # chiave presente e lista non vuota
            }

            if valid_llms:
                best_llm = min(valid_llms, key=valid_llms.get)
                best_models[metric] = best_llm
            else:
                best_models[metric] = "N/A"
        self.best_models = best_models


    def find_best_models_by_language(self):
        best_per_lang = defaultdict(dict)
        for lang, llm_data in self.per_language_metrics.items():
            for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
                best_llm = min(
                    llm_data,
                    key=lambda llm: mean(llm_data[llm][metric]) if llm_data[llm][metric] else float('inf')
                )
                best_per_lang[lang][metric] = best_llm
        self.best_per_lang = best_per_lang

    def print_summary(self):
        print("\n📊 Average Performance Difference per LLM (lower is better):")
        for llm, metrics in self.global_metrics.items():
            print(f"\n🔹 {llm}")
            for metric, values in metrics.items():
                print(f"  {metric}: {mean(values):.2f}")

        print("\n🏆 Best LLM per Overall Metric:")
        for metric, llm in self.best_models.items():
            print(f"  {metric}: {llm}")

        print("\n📚 Best LLM per Language and Metric:")
        for lang, metrics in self.best_per_lang.items():
            print(f"\n🔸 Language: {lang}")
            for metric, llm in metrics.items():
                print(f"  {metric}: {llm}")

    def plot_llm_performance(self):
        for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
            llms = []
            values = []

            for llm, metrics in self.global_metrics.items():
                if metric in metrics and metrics[metric]:
                    llms.append(llm)
                    values.append(mean(metrics[metric]))

            if not llms:
                print(f"[WARN] Nessun dato per metrica {metric}, grafico non generato.")
                continue

            plt.figure(figsize=(8, 5))
            plt.bar(llms, values, color='teal')
            plt.title(f"Average {metric} improvement (lower is better)")
            plt.ylabel(metric)
            plt.xlabel("LLM")
            plt.grid(True, axis='y', linestyle='--', alpha=0.7)
            plt.tight_layout()
            plt.show()



    def plot_best_llm_by_language(self):
        for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
            langs = []
            best_llms = []
            for lang in sorted(self.best_per_lang.keys()):
                langs.append(lang)
                best_llms.append(self.best_per_lang[lang][metric])

            counts = Counter(best_llms)
            labels, values = zip(*counts.items())

            plt.figure(figsize=(8, 5))
            plt.bar(labels, values, color='coral')
            plt.title(f"🏆 Best LLM by Language for {metric}")
            plt.ylabel("Number of Languages")
            plt.xlabel("LLM")
            plt.grid(True, axis='y', linestyle='--', alpha=0.7)
            plt.tight_layout()
            plt.show()

    def full_analysis(self):
        self.compute_statistics()
        self.find_best_models()
        self.find_best_models_by_language()
        self.print_summary()
        self.plot_llm_performance()
        self.plot_best_llm_by_language()
        
    

    def print_dataset_statistics(self):
        root_dir = Path("dataset")
        dataset_path = root_dir / "dataset.json"
        
        if not dataset_path.exists():
            print(f"[ERRORE] File non trovato: {dataset_path}")
            return

        with open(dataset_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        total_entries = 0
        language_counter = Counter()
        source_counter = Counter()
        clusters_same_language = defaultdict(lambda: defaultdict(list))  # {language: {filename: [entries]}}
        clusters_cross_language = defaultdict(list)  # {filename_no_ext: [entries]}

        for language, entries in data.items():
            for entry in entries:
                total_entries += 1
                language_counter[language] += 1
                source_counter[entry.get("source", "Unknown")] += 1

                filename = entry.get("filename")
                if filename:
                    filename_no_ext = Path(filename).stem
                    clusters_same_language[language][filename].append(entry)
                    clusters_cross_language[filename_no_ext].append(entry)

        print("\n\n== Statistiche del Dataset ==")
        print(f"Totale entry: {total_entries}\n")

        print("Entry per linguaggio:")
        for lang, count in language_counter.items():
            print(f"  {lang}: {count}")

        print("\nEntry per source:")
        for source, count in source_counter.items():
            print(f"  {source}: {count}")

        print("\nCluster per linguaggio (filename condiviso):")
        for lang, filenames in clusters_same_language.items():
            for fname, entries in filenames.items():
                if len(entries) > 1:
                    print(f"  {lang} - {fname}: {len(entries)} occorrenze")

        print("\nCluster cross-linguaggio (esercizi in più linguaggi):")
        for fname_stem, entries in clusters_cross_language.items():
            involved_langs = set(e["language"] for e in entries)
            if len(involved_langs) > 1:
                print(f"  - {fname_stem}: {len(entries)} entry da linguaggi: {', '.join(sorted(involved_langs))}")

        # Funzione per plottare i grafici
        def plot_bar_chart(counter, title, xlabel):
            if not counter:
                print(f"[INFO] Nessun dato per: {title}")
                return
            labels, values = zip(*sorted(counter.items(), key=lambda x: -x[1]))
            plt.figure(figsize=(10, 6))
            plt.bar(labels, values, color="skyblue")
            plt.title(title)
            plt.xlabel(xlabel)
            plt.ylabel("Numero di entry")
            plt.xticks(rotation=45, ha="right")
            plt.tight_layout()
            plt.show()

        # Visualizzazione grafica
        """
        plot_bar_chart(language_counter, "Entry per Linguaggio", "Linguaggio")
        plot_bar_chart(source_counter, "Entry per Fonte", "Fonte")

        cross_lang_distribution = Counter()
        for fname_stem, entries in clusters_cross_language.items():
            involved_langs = set(e["language"] for e in entries)
            if len(involved_langs) > 1:
                cross_lang_distribution[len(involved_langs)] += 1

        plot_bar_chart(cross_lang_distribution, "Esercizi con Presenza Cross-Linguaggio", "Numero di Linguaggi Coinvolti")
        """

