import json
import matplotlib.pyplot as plt
from collections import defaultdict, Counter
from statistics import mean, stdev
from pathlib import Path
import re
import numpy as np
from utility_dir import utility_paths

class StatsHandler:
    def __init__(self, output_directory: str, cluster_filter: str = None):
        self.output_directory = Path(output_directory)
        self.cluster_filter = cluster_filter  # Nuovo parametro per filtrare per cluster
        self.data = {}
        self.baseline_data = {}  # Nuovo: dati per i code snippet di base
        self.global_metrics = {}
        self.per_language_metrics = {}
        self.comparison_per_snippet = []
        self.best_models = {}
        self.best_per_lang = {}
        # Nuove statistiche per i regression test
        self.regression_test_stats = {}
        self.regression_test_per_language = {}
        # Nuove statistiche per le versioni dei prompt
        self.version_stats = {}
        self.version_comparison = {}
        self.cluster_version_stats = {}
        # Nuove statistiche per baseline
        self.baseline_stats = {}
        self.baseline_vs_versions_comparison = {}
        
    def load_output_files(self):
        """Carica tutti i file di output .json dalla directory specificata, con filtro per cluster"""
        if not self.output_directory.exists():
            raise FileNotFoundError(f"[ERRORE] Directory non trovata: {self.output_directory}")
        
        json_files = list(self.output_directory.glob("*.json"))
        if not json_files:
            raise FileNotFoundError(f"[ERRORE] Nessun file .json trovato in: {self.output_directory}")
        
        # Filtra per cluster se specificato
        if self.cluster_filter:
            json_files = [f for f in json_files if self.cluster_filter in f.name]
            if not json_files:
                raise FileNotFoundError(f"[ERRORE] Nessun file trovato per il cluster: {self.cluster_filter}")
        
        print(f"Trovati {len(json_files)} file JSON per il cluster '{self.cluster_filter or 'tutti'}'")
        
        for file_path in json_files:
            try:
                with open(file_path, 'r', encoding="utf-8") as f:
                    file_data = json.load(f)
                    
                # Estrai informazioni dal nome del file
                filename = file_path.stem
                file_info = self.parse_filename(filename)
                
                if file_info:
                    if len(file_info) == 3:  # File con versione prompt
                        cluster_name, version, run_number = file_info
                        
                        if cluster_name not in self.data:
                            self.data[cluster_name] = {}
                        if version not in self.data[cluster_name]:
                            self.data[cluster_name][version] = {}
                        
                        self.data[cluster_name][version][run_number] = file_data
                    
                    elif len(file_info) == 2:  # File baseline (senza versione)
                        cluster_name, run_number = file_info
                        
                        if cluster_name not in self.baseline_data:
                            self.baseline_data[cluster_name] = {}
                        
                        self.baseline_data[cluster_name][run_number] = file_data
                    
            except json.JSONDecodeError as e:
                print(f"[WARN] Errore nel parsing del file {file_path}: {e}")
            except Exception as e:
                print(f"[WARN] Errore nel caricamento del file {file_path}: {e}")

    def parse_filename(self, filename):
        """Estrae cluster, versione e numero di run dal nome del file"""
        # Pattern per file con versione: cluster_results_vX_Y.json
        version_pattern = r"(.+)_results_v(\d+)_(\d+)"
        version_match = re.match(version_pattern, filename)
        
        if version_match:
            cluster_name = version_match.group(1)
            version = f"v{version_match.group(2)}"
            run_number = int(version_match.group(3))
            return cluster_name, version, run_number
        
        # Pattern per file baseline: cluster_results_Y.json
        baseline_pattern = r"(.+)_results_(\d+)"
        baseline_match = re.match(baseline_pattern, filename)
        
        if baseline_match:
            cluster_name = baseline_match.group(1)
            run_number = int(baseline_match.group(2))
            return cluster_name, run_number
        
        return None

   
    def compute_baseline_statistics(self):
        """Computa statistiche per i code snippet di base"""
        self.baseline_stats = {}
        
        for cluster_name, runs in self.baseline_data.items():
            baseline_data = {
                'execution_times': [],
                'cpu_usages': [],
                'ram_usages': [],
                'entry_count': 0,
                'languages': set()
            }
            
            # Aggrega dati da tutti i run baseline
            for run_number, run_data in runs.items():
                results = run_data.get('results', {})
                
                for language, entries in results.items():
                    baseline_data['languages'].add(language)
                    baseline_data['entry_count'] += len(entries)
                    
                    for entry in entries:
                        baseline_data['execution_times'].append(entry.get('execution_time_ms', 0))
                        baseline_data['cpu_usages'].append(entry.get('CPU_usage', 0))
                        baseline_data['ram_usages'].append(entry.get('RAM_usage', 0))
            
            # Calcola statistiche aggregate
            if baseline_data['execution_times']:
                self.baseline_stats[cluster_name] = {
                    'avg_execution_time': mean(baseline_data['execution_times']),
                    'std_execution_time': stdev(baseline_data['execution_times']) if len(baseline_data['execution_times']) > 1 else 0,
                    'avg_cpu_usage': mean(baseline_data['cpu_usages']),
                    'std_cpu_usage': stdev(baseline_data['cpu_usages']) if len(baseline_data['cpu_usages']) > 1 else 0,
                    'avg_ram_usage': mean(baseline_data['ram_usages']),
                    'std_ram_usage': stdev(baseline_data['ram_usages']) if len(baseline_data['ram_usages']) > 1 else 0,
                    'total_entries': baseline_data['entry_count'],
                    'sample_count': len(baseline_data['execution_times']),
                    'languages': list(baseline_data['languages'])
                }

    def compute_version_statistics(self):
        """Computa statistiche aggregate per versione di prompt (modificata per calcolo entry)"""
        self.version_stats = {}
        self.cluster_version_stats = {}
        
        for cluster_name, versions in self.data.items():
            self.cluster_version_stats[cluster_name] = {}
            
            for version, runs in versions.items():
                version_data = {
                    'execution_times': [],
                    'cpu_usages': [],
                    'ram_usages': [],
                    'regression_tests_passed': [],
                    'regression_tests_total': [],
                    'llm_results': [],
                    'entry_count': 0  
                }
                
                # Aggrega dati da tutti i run di questa versione
                for run_number, run_data in runs.items():
                    results = run_data.get('results', {})
                    
                    for language, entries in results.items():
                        en_counter = 0
                        for entry in entries:
                            #print(f"entry:\n{entry}")
                            llm_results = entry['LLM_results']
                            if run_number == 1 : 
                                version_data['entry_count'] += len(llm_results)  # Conta LLM_results
                            
                            for llm_result in llm_results:
                                test_passed = llm_result.get('regrationTestPassed', False)
    
                                if test_passed:
                                    version_data['execution_times'].append(llm_result.get('execution_time_ms', 0))
                                    version_data['cpu_usages'].append(llm_result.get('CPU_usage', 0))
                                    version_data['ram_usages'].append(llm_result.get('RAM_usage', 0))
                                
                                version_data['regression_tests_passed'].append(1 if test_passed else 0)
                                version_data['regression_tests_total'].append(1)
                                
                                
                                version_data['llm_results'].append({
                                    'cluster': cluster_name,
                                    'version': version,
                                    'run': run_number,
                                    'language': language,
                                    'llm_type': llm_result.get('LLM_type', 'unknown'),
                                    'execution_time_ms': llm_result.get('execution_time_ms', 0),
                                    'CPU_usage': llm_result.get('CPU_usage', 0),
                                    'RAM_usage': llm_result.get('RAM_usage', 0),
                                    'regression_test_passed': test_passed
                                })
                
                # Calcola statistiche aggregate per questa versione
                if version_data['execution_times']:
                    cpu_usages_clean = [x for x in version_data['cpu_usages'] if x is not None]
                    ram_usages_clean = [x for x in version_data['ram_usages'] if x is not None]
                    exec_times_clean = [x for x in version_data['execution_times'] if x is not None]                    
                    
                    stats = {
                        'avg_execution_time': mean(exec_times_clean),
                        'std_execution_time': stdev(exec_times_clean) if len(exec_times_clean) > 1 else 0,
                        'avg_cpu_usage': mean(cpu_usages_clean) if cpu_usages_clean else 0,
                        'std_cpu_usage': stdev(cpu_usages_clean) if len(cpu_usages_clean) > 1 else 0,
                        'avg_ram_usage': mean(ram_usages_clean) if ram_usages_clean else 0,
                        'std_ram_usage': stdev(ram_usages_clean) if len(ram_usages_clean) > 1 else 0,
                        'total_tests': sum(version_data['regression_tests_total']),
                        'tests_passed': sum(version_data['regression_tests_passed']),
                        'pass_rate': (sum(version_data['regression_tests_passed']) / sum(version_data['regression_tests_total']) * 100) if sum(version_data['regression_tests_total']) > 0 else 0,
                        'total_entries': version_data['entry_count'],
                        'sample_count': len(exec_times_clean),
                        'llm_results': version_data['llm_results']
                    }
                    
                    self.cluster_version_stats[cluster_name][version] = stats
                    
                    # Statistiche globali per versione
                    if version not in self.version_stats:
                        self.version_stats[version] = {
                            'execution_times': [],
                            'cpu_usages': [],
                            'ram_usages': [],
                            'pass_rates': [],
                            'clusters': [],
                            'total_entries': 0  
                        }
                    
                    self.version_stats[version]['execution_times'].extend(version_data['execution_times'])
                    self.version_stats[version]['cpu_usages'].extend(version_data['cpu_usages'])
                    self.version_stats[version]['ram_usages'].extend(version_data['ram_usages'])
                    self.version_stats[version]['pass_rates'].append(stats['pass_rate'])
                    self.version_stats[version]['clusters'].append(cluster_name)
                    self.version_stats[version]['total_entries'] += stats['total_entries']

    def compute_baseline_vs_versions_comparison(self):
        """Computa confronto tra baseline e versioni prompt"""
        self.baseline_vs_versions_comparison = {}
        
        for cluster_name in self.baseline_stats.keys():
            if cluster_name in self.cluster_version_stats:
                comparison = {
                    'cluster': cluster_name,
                    'baseline': self.baseline_stats[cluster_name],
                    'versions': {}
                }
                
                for version, stats in self.cluster_version_stats[cluster_name].items():
                    comparison['versions'][version] = {
                        'avg_execution_time': stats['avg_execution_time'],
                        'avg_cpu_usage': stats['avg_cpu_usage'],
                        'avg_ram_usage': stats['avg_ram_usage'],
                        'pass_rate': stats['pass_rate'],
                        'total_entries': stats['total_entries']
                    }
                
                self.baseline_vs_versions_comparison[cluster_name] = comparison

    
    def compute_version_comparison(self):
        """Computa confronti tra versioni diverse (modificata per includere entry count)"""
        self.version_comparison = {}
        
        for version, data in self.version_stats.items():
            if data['execution_times']:
                self.version_comparison[version] = {
                    'avg_execution_time': mean(data['execution_times']),
                    'avg_cpu_usage': mean(data['cpu_usages']),
                    'avg_ram_usage': mean(data['ram_usages']),
                    'avg_pass_rate': mean(data['pass_rates']),
                    'total_entries': data['total_entries'],  
                    'cluster_count': len(set(data['clusters']))
                }

    
    def plot_single_metric(self, metric_name, metric_key, unit="", include_baseline=True):
        """Visualizza una singola metrica alla volta"""
        if not self.version_comparison:
            print(f"[WARN] Nessun dato per il confronto della metrica {metric_name}")
            return
        
        fig, ax = plt.subplots(1, 1, figsize=(12, 8))
        
        versions = sorted(self.version_comparison.keys())
        values = [self.version_comparison[v][metric_key] for v in versions]
        
        # Plot delle versioni
        bars = ax.bar(versions, values, color='lightblue', alpha=0.7, label='Prompt Versions')
        
        # Aggiungi baseline se disponibile e richiesto
        if include_baseline and self.baseline_stats and metric_key != 'avg_pass_rate':
            baseline_values = []
            baseline_labels = []
            
            for cluster, stats in self.baseline_stats.items():
                if metric_key in stats:
                    baseline_values.append(stats[metric_key])
                    baseline_labels.append(f"{cluster}\n(Baseline)")
            
            if baseline_values:
                baseline_x = range(len(versions), len(versions) + len(baseline_values))
                baseline_bars = ax.bar(baseline_x, baseline_values, color='orange', alpha=0.7, label='Baseline')
                
                # Imposta etichette per baseline
                ax.set_xticks(list(range(len(versions))) + list(baseline_x))
                ax.set_xticklabels(versions + baseline_labels)
                
                # Aggiungi valori sui bar baseline
                for bar, value in zip(baseline_bars, baseline_values):
                    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + (max(values + baseline_values) * 0.01),
                           f'{value:.1f}', ha='center', va='bottom')
        
        ax.set_title(f'{metric_name} Comparison - Cluster: {self.cluster_filter or "All"}')
        ax.set_xlabel('Version / Baseline')
        ax.set_ylabel(f'{metric_name} ({unit})')
        ax.grid(True, axis='y', linestyle='--', alpha=0.7)
        ax.legend()
        
        # Aggiungi valori sui bar delle versioni
        for bar, value in zip(bars, values):
            ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + (max(values) * 0.01),
                   f'{value:.1f}', ha='center', va='bottom')
        
        plt.tight_layout()
        plt.show()

    def plot_all_metrics_separately(self):
        """Visualizza tutte le metriche in grafici separati"""
        metrics = [
            ('Execution Time', 'avg_execution_time', 'ms'),
            ('CPU Usage', 'avg_cpu_usage', '%'),
            ('RAM Usage', 'avg_ram_usage', 'KB'),
            ('Pass Rate', 'avg_pass_rate', '%')
        ]
        
        for metric_name, metric_key, unit in metrics:
            include_baseline = metric_key != 'avg_pass_rate'  # Baseline non ha pass rate
            self.plot_single_metric(metric_name, metric_key, unit, include_baseline)

    
    def find_best_prompt_version(self):
        """Trova la migliore versione del prompt basata su criteri combinati"""
        if not self.version_comparison:
            return None
        
        best_version = None
        best_score = float('inf')
        
        for version, stats in self.version_comparison.items():
            # Score combinato: minimizza tempo e uso risorse, massimizza pass rate
            # Normalizza le metriche per il confronto
            exec_time_norm = stats['avg_execution_time']
            cpu_norm = stats['avg_cpu_usage']
            ram_norm = stats['avg_ram_usage'] / 1000  # Converti in MB per la scala
            pass_rate_penalty = (100 - stats['avg_pass_rate']) * 10  # Penalità per test falliti
            
            # Score combinato (più basso è meglio)
            combined_score = exec_time_norm + cpu_norm + ram_norm + pass_rate_penalty
            
            if combined_score < best_score:
                best_score = combined_score
                best_version = version
        
        return best_version, best_score

    def print_version_statistics(self):
        """Stampa statistiche per versione (modificata per includere entry count)"""
        print(f"\n🔄 Prompt Version Statistics for Cluster: {self.cluster_filter or 'All'}:")
        print("="*60)
        
        # Statistiche baseline
        if self.baseline_stats:
            print("\n📊 Baseline Statistics (Code Snippets):")
            for cluster, stats in self.baseline_stats.items():
                print(f"\n🔹 {cluster} (Baseline):")
                print(f"  ⏱️  Avg Execution Time: {stats['avg_execution_time']:.2f} ms")
                print(f"  🖥️  Avg CPU Usage: {stats['avg_cpu_usage']:.2f}%")
                print(f"  💾  Avg RAM Usage: {stats['avg_ram_usage']:.2f} KB")
                print(f"  📝  Total Entries: {stats['total_entries']}")
                print(f"  🧪  Sample Count: {stats['sample_count']}")
                print(f"  🗣️  Languages: {', '.join(stats['languages'])}")
        
        # Statistiche globali per versione
        print("\n📊 Global Statistics by Version:")
        for version in sorted(self.version_comparison.keys()):
            stats = self.version_comparison[version]
            print(f"\n🔹 {version}:")
            print(f"  ⏱️  Avg Execution Time: {stats['avg_execution_time']:.2f} ms")
            print(f"  🖥️  Avg CPU Usage: {stats['avg_cpu_usage']:.2f}%")
            print(f"  💾  Avg RAM Usage: {stats['avg_ram_usage']:.2f} KB")
            print(f"  ✅  Avg Pass Rate: {stats['avg_pass_rate']:.1f}%")
            print(f"  📝  Total Entries: {stats['total_entries']}")
            print(f"  📚  Clusters: {stats['cluster_count']}")
        
        # Migliore versione
        best_info = self.find_best_prompt_version()
        if best_info:
            best_version, score = best_info
            print(f"\n🏆 Best Prompt Version: {best_version} (score: {score:.2f})")
        
        # Confronto baseline vs versioni
        if self.baseline_vs_versions_comparison:
            print("\n📊 Baseline vs Versions Comparison:")
            for cluster, comparison in self.baseline_vs_versions_comparison.items():
                print(f"\n🔸 Cluster: {cluster}")
                baseline = comparison['baseline']
                print(f"  Baseline: {baseline['avg_execution_time']:.2f}ms, "
                      f"{baseline['avg_cpu_usage']:.1f}% CPU, "
                      f"{baseline['avg_ram_usage']:.0f}KB RAM, "
                      f"{baseline['total_entries']} entries")
                
                for version, stats in comparison['versions'].items():
                    # Calcola differenze percentuali
                    exec_diff = ((stats['avg_execution_time'] - baseline['avg_execution_time']) / baseline['avg_execution_time']) * 100
                    cpu_diff = ((stats['avg_cpu_usage'] - baseline['avg_cpu_usage']) / baseline['avg_cpu_usage']) * 100
                    ram_diff = ((stats['avg_ram_usage'] - baseline['avg_ram_usage']) / baseline['avg_ram_usage']) * 100
                    
                    print(f"  {version}: {stats['avg_execution_time']:.2f}ms ({exec_diff:+.1f}%), "
                          f"{stats['avg_cpu_usage']:.1f}% CPU ({cpu_diff:+.1f}%), "
                          f"{stats['avg_ram_usage']:.0f}KB RAM ({ram_diff:+.1f}%), "
                          f"{stats['pass_rate']:.1f}% pass, {stats['total_entries']} entries")

    def plot_version_comparison(self):
        """Visualizza confronto tra versioni"""
        if not self.version_comparison:
            print("[WARN] Nessun dato per il confronto tra versioni")
            return
        
        versions = sorted(self.version_comparison.keys())
        metrics = ['avg_execution_time', 'avg_cpu_usage', 'avg_ram_usage', 'avg_pass_rate']
        metric_names = ['Execution Time (ms)', 'CPU Usage (%)', 'RAM Usage (KB)', 'Pass Rate (%)']
        
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        axes = axes.flatten()
        
        for i, (metric, name) in enumerate(zip(metrics, metric_names)):
            values = [self.version_comparison[v][metric] for v in versions]
            
            ax = axes[i]
            bars = ax.bar(versions, values, color='lightblue' if metric != 'avg_pass_rate' else 'lightgreen')
            ax.set_title(f'{name} by Prompt Version')
            ax.set_xlabel('Version')
            ax.set_ylabel(name)
            ax.grid(True, axis='y', linestyle='--', alpha=0.7)
            
            # Aggiungi valori sui bar
            for bar, value in zip(bars, values):
                ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + (max(values) * 0.01),
                       f'{value:.1f}', ha='center', va='bottom')
        
        plt.tight_layout()
        plt.suptitle('🔄 Prompt Version Performance Comparison', y=1.02, fontsize=16)
        plt.show()

    def plot_cluster_version_heatmap(self):
        """Crea heatmap delle performance per cluster e versione"""
        if not self.cluster_version_stats:
            print("[WARN] Nessun dato per l'heatmap cluster-versione")
            return
        
        clusters = sorted(self.cluster_version_stats.keys())
        all_versions = set()
        for cluster_data in self.cluster_version_stats.values():
            all_versions.update(cluster_data.keys())
        versions = sorted(all_versions)
        
        metrics = ['avg_execution_time', 'avg_cpu_usage', 'avg_ram_usage', 'pass_rate']
        metric_names = ['Execution Time', 'CPU Usage', 'RAM Usage', 'Pass Rate']
        
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        axes = axes.flatten()
        
        for i, (metric, name) in enumerate(zip(metrics, metric_names)):
            # Crea matrice per heatmap
            matrix = np.full((len(clusters), len(versions)), np.nan)
            
            for ci, cluster in enumerate(clusters):
                for vi, version in enumerate(versions):
                    if version in self.cluster_version_stats[cluster]:
                        matrix[ci, vi] = self.cluster_version_stats[cluster][version][metric]
            
            ax = axes[i]
            im = ax.imshow(matrix, aspect='auto', cmap='RdYlGn_r' if metric != 'pass_rate' else 'RdYlGn')
            
            ax.set_xticks(range(len(versions)))
            ax.set_xticklabels(versions)
            ax.set_yticks(range(len(clusters)))
            ax.set_yticklabels(clusters)
            ax.set_title(f'{name} Heatmap')
            
            # Aggiungi valori nelle celle
            for ci in range(len(clusters)):
                for vi in range(len(versions)):
                    if not np.isnan(matrix[ci, vi]):
                        ax.text(vi, ci, f'{matrix[ci, vi]:.1f}', 
                               ha='center', va='center', fontsize=8)
            
            plt.colorbar(im, ax=ax)
        
        plt.tight_layout()
        plt.suptitle('🔥 Performance Heatmap by Cluster and Version', y=1.02, fontsize=16)
        plt.show()

    def plot_version_trend_analysis(self):
        """Analizza trend delle performance attraverso le versioni"""
        if not self.version_comparison:
            return
        
        versions = sorted(self.version_comparison.keys(), key=lambda x: int(x[1:]))
        version_numbers = [int(v[1:]) for v in versions]
        
        metrics = ['avg_execution_time', 'avg_cpu_usage', 'avg_ram_usage', 'avg_pass_rate']
        metric_names = ['Execution Time (ms)', 'CPU Usage (%)', 'RAM Usage (KB)', 'Pass Rate (%)']
        colors = ['red', 'blue', 'green', 'orange']
        
        plt.figure(figsize=(14, 8))
        
        for i, (metric, name, color) in enumerate(zip(metrics, metric_names, colors)):
            values = [self.version_comparison[v][metric] for v in versions]
            
            if metric == 'avg_ram_usage':
                values = [v/1000 for v in values]  # Converti in MB
                name = 'RAM Usage (MB)'
            
            plt.subplot(2, 2, i+1)
            plt.plot(version_numbers, values, marker='o', color=color, linewidth=2, markersize=8)
            plt.title(f'{name} Trend')
            plt.xlabel('Version')
            plt.ylabel(name)
            plt.grid(True, linestyle='--', alpha=0.7)
            plt.xticks(version_numbers)
            
            # Aggiungi annotazioni per miglioramenti/peggioramenti
            for j in range(1, len(values)):
                change = values[j] - values[j-1]
                if metric != 'avg_pass_rate':  # Per pass rate, incremento è buono
                    if change < 0:
                        plt.annotate('↗️', xy=(version_numbers[j], values[j]), 
                                   xytext=(5, 5), textcoords='offset points', color='green')
                    elif change > 0:
                        plt.annotate('↘️', xy=(version_numbers[j], values[j]), 
                                   xytext=(5, 5), textcoords='offset points', color='red')
                else:
                    if change > 0:
                        plt.annotate('↗️', xy=(version_numbers[j], values[j]), 
                                   xytext=(5, 5), textcoords='offset points', color='green')
                    elif change < 0:
                        plt.annotate('↘️', xy=(version_numbers[j], values[j]), 
                                   xytext=(5, 5), textcoords='offset points', color='red')
        
        plt.tight_layout()
        plt.suptitle('📈 Performance Trends Across Prompt Versions', y=1.02, fontsize=16)
        plt.show()

    def export_version_analysis(self, output_file="version_analysis.json"):
        """Esporta l'analisi delle versioni in un file JSON"""
        analysis_data = {
            'version_comparison': self.version_comparison,
            'cluster_version_stats': self.cluster_version_stats,
            'best_version': self.find_best_prompt_version()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(analysis_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Analisi delle versioni esportata in: {output_file}")

    def full_version_analysis(self):
        """Analisi completa delle versioni dei prompt"""
        print("Loading output files...")
        self.load_output_files()
        
        print("Computing baseline statistics...")
        self.compute_baseline_statistics()
        
        print("Computing version statistics...")
        self.compute_version_statistics()
        self.compute_version_comparison()
        self.compute_baseline_vs_versions_comparison()
        
        # Stampa risultati
        self.print_version_statistics()
        
        # Visualizzazioni separate per metrica
        print("Generating visualizations...")
        self.plot_all_metrics_separately()
        self.plot_cluster_version_heatmap()
        self.plot_version_trend_analysis()
        
        # Esporta risultati
        self.export_version_analysis()

    # Mantieni i metodi originali per compatibilità
    def compute_regression_test_statistics(self):
        """Computa statistiche sui regression test da tutti i file caricati"""
        regression_stats = defaultdict(lambda: {'passed': 0, 'failed': 0, 'total': 0})
        regression_per_lang = defaultdict(lambda: defaultdict(lambda: {'passed': 0, 'failed': 0, 'total': 0}))
        
        for cluster_name, versions in self.data.items():
            for version, runs in versions.items():
                for run_number, run_data in runs.items():
                    results = run_data.get('results', {})
                    
                    for language, entries in results.items():
                        for entry in entries:
                            for llm_result in entry.get('LLM_results', []):
                                llm = llm_result.get('LLM_type', 'unknown')
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

        # Ordina i cluster cross-linguaggio per numero decrescente di linguaggi coinvolti
        sorted_cross_lang_clusters = sorted(
            clusters_cross_language.items(),
            key=lambda item: len(set(e["language"] for e in item[1])),
            reverse=True
        )

        for fname_stem, entries in sorted_cross_lang_clusters:
            involved_langs = set(e["language"] for e in entries)
            if len(involved_langs) > 1:
                print(f"  - {fname_stem}: {len(entries)} entry da linguaggi: {', '.join(sorted(involved_langs))}")
    

    def full_analysis(self):
        """Analisi completa includendo le nuove funzionalità per le versioni"""
        print("Loading output files...")
        self.load_output_files()
        
        print("Computing regression test statistics...")
        self.compute_regression_test_statistics()
        
        print("Computing version statistics...")
        self.compute_version_statistics()
        self.compute_version_comparison()
        
        # Stampa risultati
        self.print_regression_test_summary()
        self.print_version_statistics()
        
        # Visualizzazioni
        print("Generating visualizations...")
        self.plot_version_comparison()
        self.plot_cluster_version_heatmap()
        self.plot_version_trend_analysis()
        
        # Esporta risultati
        self.export_version_analysis()

    def count_entries_result_file(self, f_name:str):
        counter = 0
        not_llm_entry_counter = 0
        final_path = self.output_directory / f_name
        with open(final_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        if data :            
            results_obj = data['results']
            for key in results_obj :
                language_entries = results_obj[key]
                for entry in language_entries:
                    not_llm_entry_counter  += 1
                    try : 
                        counter += len(entry["LLM_results"])                    
                    except Exception as e : 
                        print(f"\nentry : {entry}\nfile {f_name}\n")
                        raise e
                    
        return (counter,not_llm_entry_counter )
                

    def count_entries_cluster(self, f_name:str, version:int):
        counter = 0
        not_llm_entry_counter = 0
        final_path = utility_paths.CLUSTERS_DIR_FILEPATH / f_name
        with open(final_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        if data :            
            for key in data :
                language_entries = data[key]
                for entry in language_entries:
                    not_llm_entry_counter  += 1
                    quantity = len([x for x in entry["LLMs"] if f"_v{version}" in x['filename']]) 
                    
                    if quantity != 3 : 
                        s = f"quantity = {quantity} for f name : {f_name} version {version} | entry:\n{entry}"
                        raise Exception(s)
                    
                    counter += quantity
                    
        return (counter,not_llm_entry_counter )
  


def count(handler: StatsHandler) :    
    for version in range(1,5):
        
        f_name = f"cluster_leap.json"
        (llm_entry_quantity, not_llm_entry_quantity) = handler.count_entries_cluster(f_name,version)
        print(f"quanitity of entries for file {f_name} : {not_llm_entry_quantity} | llm entries v {version} : {llm_entry_quantity}")


        for run in range(1,6) :             
            f_name = f"leap_results_v{version}_{run}.json"
            (llm_entry_quantity, not_llm_entry_quantity) = handler.count_entries_result_file(f_name)
            print(f"quanitity of entries for file {f_name} : {not_llm_entry_quantity} | llm entries : {llm_entry_quantity}")
    
    


# Esempio di utilizzo
if __name__ == "__main__":
    
    cluster_name = None #"raindrops"  # o None per tutti i cluster
    handler = StatsHandler(str(utility_paths.OUTPUT_DIR_FILEPATH), cluster_filter=cluster_name)
    
    
    #handler.full_version_analysis()
    #count(handler)
    
    # analisi completa originale + versioni
    handler.full_analysis()