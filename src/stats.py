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
        # Nuove statistiche per i regression test
        self.regression_test_stats = {}
        self.regression_test_per_language = {}

    def load_dataset(self):
        if not self.dataset_path.exists():
            raise FileNotFoundError(f"[ERRORE] Dataset non trovato: {self.dataset_path}")
        with open(self.dataset_path, 'r', encoding="utf-8") as f:
            return json.load(f)

    def compute_regression_test_statistics(self):
        """Computa statistiche sui regression test passati/falliti per LLM e linguaggio"""
        regression_stats = defaultdict(lambda: {'passed': 0, 'failed': 0, 'total': 0})
        regression_per_lang = defaultdict(lambda: defaultdict(lambda: {'passed': 0, 'failed': 0, 'total': 0}))
        
        # Controlla se è una lista (formato flat) o un dizionario per linguaggio
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
            
            for llm_result in entry['LLM_results']:
                llm = llm_result['LLM_type']
                test_passed = llm_result.get('regrationTestPassed', False)
                
                # Statistiche globali
                regression_stats[llm]['total'] += 1
                if test_passed:
                    regression_stats[llm]['passed'] += 1
                else:
                    regression_stats[llm]['failed'] += 1
                
                # Statistiche per linguaggio
                regression_per_lang[language][llm]['total'] += 1
                if test_passed:
                    regression_per_lang[language][llm]['passed'] += 1
                else:
                    regression_per_lang[language][llm]['failed'] += 1

        self.regression_test_stats = dict(regression_stats)
        self.regression_test_per_language = dict(regression_per_lang)

    def compute_statistics(self):
        """Computa statistiche considerando solo gli LLM che passano i regression test"""
        global_metrics = defaultdict(lambda: defaultdict(list))
        per_language_metrics = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
        comparison_per_snippet = []

        # Controlla se è una lista (formato flat) o un dizionario per linguaggio
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
                
                # FILTRO: Considera solo gli LLM che passano i regression test
                if not llm_result.get('regrationTestPassed', False):
                    continue

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
                    "ram_improved": llm_result["ram_improved"],
                    "regression_test_passed": llm_result.get('regrationTestPassed', False)
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
                if llm_data:  # Controlla che ci siano dati per questo linguaggio
                    valid_llms = {
                        llm: mean(metrics[metric]) 
                        for llm, metrics in llm_data.items() 
                        if metric in metrics and metrics[metric]
                    }
                    if valid_llms:
                        best_llm = min(valid_llms, key=valid_llms.get)
                        best_per_lang[lang][metric] = best_llm
                    else:
                        best_per_lang[lang][metric] = "N/A"
        self.best_per_lang = best_per_lang

    def print_regression_test_summary(self):
        """Stampa statistiche sui regression test"""
        print("\n🧪 Regression Test Statistics:")
        print("="*50)
        
        # Statistiche globali
        print("\n📊 Global Regression Test Results:")
        for llm, stats in self.regression_test_stats.items():
            passed = stats['passed']
            total = stats['total']
            failed = stats['failed']
            pass_rate = (passed / total * 100) if total > 0 else 0
            print(f"🔹 {llm}:")
            print(f"  ✅ Passed: {passed}/{total} ({pass_rate:.1f}%)")
            print(f"  ❌ Failed: {failed}/{total} ({100-pass_rate:.1f}%)")
        
        # Statistiche per linguaggio
        print("\n📚 Regression Test Results by Language:")
        for lang, llm_stats in self.regression_test_per_language.items():
            print(f"\n🔸 Language: {lang}")
            for llm, stats in llm_stats.items():
                passed = stats['passed']
                total = stats['total']
                failed = stats['failed']
                pass_rate = (passed / total * 100) if total > 0 else 0
                print(f"  {llm}: {passed}/{total} passed ({pass_rate:.1f}%)")
        
        # LLM che passano tutti i test
        print("\n🏆 LLMs with 100% Pass Rate:")
        perfect_llms = [llm for llm, stats in self.regression_test_stats.items() 
                       if stats['passed'] == stats['total'] and stats['total'] > 0]
        if perfect_llms:
            for llm in perfect_llms:
                print(f"  ✨ {llm} ({self.regression_test_stats[llm]['total']} tests)")
        else:
            print("  None")
        
        # LLM che falliscono tutti i test
        print("\n💥 LLMs with 0% Pass Rate:")
        failed_llms = [llm for llm, stats in self.regression_test_stats.items() 
                      if stats['passed'] == 0 and stats['total'] > 0]
        if failed_llms:
            for llm in failed_llms:
                print(f"  ❌ {llm} ({self.regression_test_stats[llm]['total']} tests)")
        else:
            print("  None")

    def print_summary(self):
        print("\n📊 Average Performance Difference per LLM (only regression test passed, lower is better):")
        for llm, metrics in self.global_metrics.items():
            print(f"\n🔹 {llm}")
            for metric, values in metrics.items():
                if values:  # Controlla che ci siano valori
                    print(f"  {metric}: {mean(values):.2f} (based on {len(values)} samples)")
                else:
                    print(f"  {metric}: N/A (no valid samples)")

        print("\n🏆 Best LLM per Overall Metric (only regression test passed):")
        for metric, llm in self.best_models.items():
            print(f"  {metric}: {llm}")

        print("\n📚 Best LLM per Language and Metric (only regression test passed):")
        for lang, metrics in self.best_per_lang.items():
            print(f"\n🔸 Language: {lang}")
            for metric, llm in metrics.items():
                print(f"  {metric}: {llm}")

    def plot_regression_test_results(self):
        """Visualizza i risultati dei regression test"""
        # Grafico globale dei pass rate
        llms = list(self.regression_test_stats.keys())
        pass_rates = [
            (stats['passed'] / stats['total'] * 100) if stats['total'] > 0 else 0
            for stats in self.regression_test_stats.values()
        ]
        
        plt.figure(figsize=(12, 6))
        colors = ['green' if rate == 100 else 'orange' if rate >= 50 else 'red' for rate in pass_rates]
        bars = plt.bar(llms, pass_rates, color=colors)
        plt.title("🧪 Regression Test Pass Rate by LLM")
        plt.ylabel("Pass Rate (%)")
        plt.xlabel("LLM")
        plt.ylim(0, 100)
        plt.grid(True, axis='y', linestyle='--', alpha=0.7)
        
        # Aggiungi etichette sui bar
        for bar, rate in zip(bars, pass_rates):
            plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                    f'{rate:.1f}%', ha='center', va='bottom')
        
        plt.tight_layout()
        plt.show()
        
        # Grafico per linguaggio
        for lang, llm_stats in self.regression_test_per_language.items():
            llms = list(llm_stats.keys())
            pass_rates = [
                (stats['passed'] / stats['total'] * 100) if stats['total'] > 0 else 0
                for stats in llm_stats.values()
            ]
            
            plt.figure(figsize=(10, 6))
            colors = ['green' if rate == 100 else 'orange' if rate >= 50 else 'red' for rate in pass_rates]
            bars = plt.bar(llms, pass_rates, color=colors)
            plt.title(f"🧪 Regression Test Pass Rate for {lang}")
            plt.ylabel("Pass Rate (%)")
            plt.xlabel("LLM")
            plt.ylim(0, 100)
            plt.grid(True, axis='y', linestyle='--', alpha=0.7)
            
            # Aggiungi etichette sui bar
            for bar, rate in zip(bars, pass_rates):
                plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                        f'{rate:.1f}%', ha='center', va='bottom')
            
            plt.tight_layout()
            plt.show()

    def plot_llm_performance(self):
        """Plotta performance solo per LLM che passano i regression test"""
        for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
            llms = []
            values = []
            sample_counts = []

            for llm, metrics in self.global_metrics.items():
                if metric in metrics and metrics[metric]:
                    llms.append(llm)
                    values.append(mean(metrics[metric]))
                    sample_counts.append(len(metrics[metric]))

            if not llms:
                print(f"[WARN] Nessun dato per metrica {metric} (regression test passed), grafico non generato.")
                continue

            plt.figure(figsize=(12, 6))
            bars = plt.bar(llms, values, color='teal')
            plt.title(f"Average {metric} improvement (lower is better) - Only Regression Test Passed")
            plt.ylabel(metric)
            plt.xlabel("LLM")
            plt.grid(True, axis='y', linestyle='--', alpha=0.7)
            
            # Aggiungi numero di campioni sui bar
            for bar, count in zip(bars, sample_counts):
                plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + (max(values) * 0.01),
                        f'n={count}', ha='center', va='bottom', fontsize=8)
            
            plt.tight_layout()
            plt.show()

    def plot_best_llm_by_language(self):
        """Plotta migliori LLM per linguaggio (solo regression test passed)"""
        for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
            best_llms = []
            for lang in sorted(self.best_per_lang.keys()):
                if metric in self.best_per_lang[lang] and self.best_per_lang[lang][metric] != "N/A":
                    best_llms.append(self.best_per_lang[lang][metric])

            if not best_llms:
                print(f"[WARN] Nessun dato per metrica {metric} per linguaggio, grafico non generato.")
                continue

            counts = Counter(best_llms)
            labels, values = zip(*counts.items())

            plt.figure(figsize=(10, 6))
            plt.bar(labels, values, color='coral')
            plt.title(f"🏆 Best LLM by Language for {metric} (Regression Test Passed)")
            plt.ylabel("Number of Languages")
            plt.xlabel("LLM")
            plt.grid(True, axis='y', linestyle='--', alpha=0.7)
            plt.tight_layout()
            plt.show()

    def full_analysis(self):
        """Analisi completa con regression test statistics"""
        print("Computing regression test statistics...")
        self.compute_regression_test_statistics()
        
        print("Computing performance statistics (regression test passed only)...")
        self.compute_statistics()
        
        print("Finding best models...")
        self.find_best_models()
        self.find_best_models_by_language()
        
        # Stampa i risultati
        self.print_regression_test_summary()
        self.print_summary()
        
        # Visualizzazioni
        self.plot_regression_test_results()
        self.plot_llm_performance()
        self.plot_best_llm_by_language()

    def print_dataset_statistics(self, charts: bool = False):
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
        if charts:
            plot_bar_chart(language_counter, "Entry per Linguaggio", "Linguaggio")
            plot_bar_chart(source_counter, "Entry per Fonte", "Fonte")

            cross_lang_distribution = Counter()
            for fname_stem, entries in clusters_cross_language.items():
                involved_langs = set(e["language"] for e in entries)
                if len(involved_langs) > 1:
                    cross_lang_distribution[len(involved_langs)] += 1

            plot_bar_chart(cross_lang_distribution, "Esercizi con Presenza Cross-Linguaggio", "Numero di Linguaggi Coinvolti")