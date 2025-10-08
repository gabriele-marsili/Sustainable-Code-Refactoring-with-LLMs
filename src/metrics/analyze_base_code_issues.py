"""
Analisi approfondita dei problemi nei dati di base per C, CPP, Java, Python, JavaScript.
Identifica problemi di esecuzione, Docker, dipendenze, ecc.
"""

import json
import sys
import os
from pathlib import Path
from collections import defaultdict
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths, general_utils


def analyze_base_code_execution_issues():
    """Analizza dettagliatamente i problemi di esecuzione del base code."""

    print("=" * 100)
    print("ANALISI APPROFONDITA PROBLEMI BASE CODE")
    print("=" * 100)
    print()

    # Linguaggi da analizzare
    target_languages = ['c', 'cpp', 'java', 'python', 'javascript']

    # Statistiche per linguaggio
    language_stats = defaultdict(lambda: {
        'total_entries': 0,
        'passing_all_5': 0,
        'failing_at_least_1': 0,
        'docker_errors': 0,
        'timeout_errors': 0,
        'compilation_errors': 0,
        'test_failures': 0,
        'execution_times': [],
        'pass_rates': [],
        'clusters_with_issues': [],
        'error_examples': []
    })

    execution_outputs = utility_paths.OUTPUT_DIR_FILEPATH
    result_files = sorted(execution_outputs.glob("*_results_*.json"))

    # Raggruppa per cluster (5 esecuzioni per cluster)
    clusters_data = defaultdict(lambda: defaultdict(list))

    for result_file in result_files:
        # Parse filename: {cluster}_results_{execution_num}.json
        parts = result_file.stem.split('_results_')
        if len(parts) != 2:
            continue

        cluster_name = parts[0]

        # Salta se è un file LLM (contiene _v1_, _v2_, ecc.)
        if '_v' in cluster_name:
            continue

        execution_num = parts[1]

        try:
            data = json.load(open(result_file))

            # Cerca entries per ogni linguaggio target
            for lang_key in data.get("results", {}).keys():
                lang_lower = lang_key.lower()

                if lang_lower in target_languages:
                    entries = data["results"][lang_key]

                    for entry in entries:
                        entry_id = entry.get("id", "unknown")
                        clusters_data[cluster_name][lang_lower].append({
                            'execution': execution_num,
                            'entry_id': entry_id,
                            'passed': entry.get("regressionTestPassed", False),
                            'success': entry.get("success", False),
                            'error_message': entry.get("error_message", ""),
                            'execution_time': entry.get("execution_time_ms"),
                            'cpu_usage': entry.get("CPU_usage"),
                            'ram_usage': entry.get("RAM_usage")
                        })

        except Exception as e:
            print(f"Errore leggendo {result_file}: {e}")

    # Analizza dati aggregati
    print(f"Clusters analizzati: {len(clusters_data)}")
    print()

    for cluster_name, lang_data in clusters_data.items():
        for lang, executions in lang_data.items():
            if not executions:
                continue

            # Raggruppa per entry_id
            entries_by_id = defaultdict(list)
            for exec_data in executions:
                entries_by_id[exec_data['entry_id']].append(exec_data)

            # Analizza ogni entry
            for entry_id, exec_list in entries_by_id.items():
                stats = language_stats[lang]
                stats['total_entries'] += 1

                # Verifica se passa tutte le 5 esecuzioni
                all_passed = all(e['passed'] and e['success'] for e in exec_list)
                at_least_one_failed = any(not e['passed'] or not e['success'] for e in exec_list)

                if all_passed and len(exec_list) == 5:
                    stats['passing_all_5'] += 1

                    # Raccogli execution times validi
                    exec_times = [e['execution_time'] for e in exec_list if e['execution_time'] is not None]
                    if exec_times:
                        stats['execution_times'].extend(exec_times)

                if at_least_one_failed:
                    stats['failing_at_least_1'] += 1

                    # Analizza tipo di errore
                    for exec_data in exec_list:
                        if not exec_data['passed'] or not exec_data['success']:
                            error_msg = (exec_data['error_message'] or "").lower()

                            if 'docker' in error_msg or 'exit code' in error_msg:
                                stats['docker_errors'] += 1
                                if len(stats['error_examples']) < 3:
                                    stats['error_examples'].append({
                                        'cluster': cluster_name,
                                        'entry_id': entry_id,
                                        'error': exec_data['error_message'][:200]
                                    })
                            elif 'timeout' in error_msg:
                                stats['timeout_errors'] += 1
                            elif 'compilation' in error_msg or 'compile' in error_msg:
                                stats['compilation_errors'] += 1
                            else:
                                stats['test_failures'] += 1

                    # Aggiungi cluster alla lista problemi
                    if cluster_name not in stats['clusters_with_issues']:
                        stats['clusters_with_issues'].append(cluster_name)

    # Report per linguaggio
    print("=" * 100)
    print("REPORT PER LINGUAGGIO")
    print("=" * 100)
    print()

    for lang in target_languages:
        stats = language_stats[lang]

        if stats['total_entries'] == 0:
            print(f"### {lang.upper()}: NO DATA")
            print()
            continue

        print(f"### {lang.upper()}")
        print(f"{'─' * 90}")
        print(f"Total entries: {stats['total_entries']}")
        print(f"Passing all 5 executions: {stats['passing_all_5']} ({stats['passing_all_5']/stats['total_entries']*100:.1f}%)")
        print(f"Failing at least 1 execution: {stats['failing_at_least_1']} ({stats['failing_at_least_1']/stats['total_entries']*100:.1f}%)")
        print()

        if stats['failing_at_least_1'] > 0:
            print(f"Breakdown errori:")
            print(f"  - Docker errors: {stats['docker_errors']}")
            print(f"  - Timeout errors: {stats['timeout_errors']}")
            print(f"  - Compilation errors: {stats['compilation_errors']}")
            print(f"  - Test failures: {stats['test_failures']}")
            print()

        if stats['execution_times']:
            exec_times = np.array(stats['execution_times'])
            print(f"Execution time statistics (entries che passano tutti i test):")
            print(f"  - Count: {len(exec_times)}")
            print(f"  - Mean: {np.mean(exec_times):.2f} ms")
            print(f"  - Median: {np.median(exec_times):.2f} ms")
            print(f"  - Std Dev: {np.std(exec_times):.2f} ms")
            print(f"  - Min: {np.min(exec_times):.2f} ms")
            print(f"  - Max: {np.max(exec_times):.2f} ms")
            print(f"  - 95th percentile: {np.percentile(exec_times, 95):.2f} ms")
            print()

            # Check per valori anomali
            zero_count = np.sum(exec_times == 0)
            very_low = np.sum(exec_times < 1)
            very_high = np.sum(exec_times > 10000)

            if zero_count > 0:
                print(f"  ⚠️  WARNING: {zero_count} execution times = 0 ms (anomalo!)")
            if very_low > 0:
                print(f"  ⚠️  WARNING: {very_low} execution times < 1 ms (sospetto)")
            if very_high > 0:
                print(f"  ⚠️  WARNING: {very_high} execution times > 10000 ms (outliers)")
            print()

        if stats['clusters_with_issues']:
            print(f"Clusters con problemi ({len(stats['clusters_with_issues'])} totali):")
            for i, cluster in enumerate(stats['clusters_with_issues'][:10], 1):
                print(f"  {i}. {cluster}")
            if len(stats['clusters_with_issues']) > 10:
                print(f"  ... e altri {len(stats['clusters_with_issues']) - 10}")
            print()

        if stats['error_examples']:
            print(f"Esempi di errori:")
            for i, err in enumerate(stats['error_examples'], 1):
                print(f"  {i}) Cluster: {err['cluster']}, Entry: {err['entry_id']}")
                print(f"     Error: {err['error']}")
            print()

        print()

    # Identifica linguaggi che richiedono re-run
    print("=" * 100)
    print("RACCOMANDAZIONI")
    print("=" * 100)
    print()

    languages_need_rerun = []

    for lang in target_languages:
        stats = language_stats[lang]

        if stats['total_entries'] == 0:
            print(f"❌ {lang.upper()}: NO DATA - Probabilmente problema sistemico")
            languages_need_rerun.append(lang)
        elif stats['passing_all_5'] == 0:
            print(f"❌ {lang.upper()}: 0% pass rate - Problema sistemico (Docker/ambiente)")
            languages_need_rerun.append(lang)
        elif stats['passing_all_5'] / stats['total_entries'] < 0.5:
            print(f"⚠️  {lang.upper()}: {stats['passing_all_5']/stats['total_entries']*100:.1f}% pass rate - Verificare Docker/ambiente")
            languages_need_rerun.append(lang)
        elif stats['docker_errors'] > stats['total_entries'] * 0.1:
            print(f"⚠️  {lang.upper()}: {stats['docker_errors']} Docker errors - Verificare configurazione")
            languages_need_rerun.append(lang)
        else:
            print(f"✅ {lang.upper()}: Pass rate accettabile ({stats['passing_all_5']/stats['total_entries']*100:.1f}%)")

    print()

    if languages_need_rerun:
        print("=" * 100)
        print(f"LINGUAGGI CHE RICHIEDONO RE-RUN: {', '.join([l.upper() for l in languages_need_rerun])}")
        print("=" * 100)
        print()

        # Salva report
        report_file = Path(__file__).parent / "base_code_issues_report.json"
        with open(report_file, 'w') as f:
            json.dump({
                'languages_need_rerun': languages_need_rerun,
                'statistics': {
                    lang: {
                        'total_entries': stats['total_entries'],
                        'passing_all_5': stats['passing_all_5'],
                        'failing_at_least_1': stats['failing_at_least_1'],
                        'pass_rate': stats['passing_all_5'] / stats['total_entries'] * 100 if stats['total_entries'] > 0 else 0,
                        'docker_errors': stats['docker_errors'],
                        'timeout_errors': stats['timeout_errors'],
                        'compilation_errors': stats['compilation_errors'],
                        'test_failures': stats['test_failures'],
                        'clusters_with_issues': stats['clusters_with_issues'][:20],
                        'error_examples': stats['error_examples']
                    }
                    for lang, stats in language_stats.items()
                }
            }, f, indent=2)

        print(f"Report dettagliato salvato in: {report_file}")

    return language_stats, languages_need_rerun


if __name__ == "__main__":
    analyze_base_code_execution_issues()
