"""
Confronta l'esecuzione dei test base vs LLM per identificare le differenze.
Se LLM funziona e base no, il problema non è Docker ma la configurazione/struttura.
"""

import json
import sys
import os
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths

def compare_base_vs_llm():
    """Confronta esecuzione base vs LLM per lo stesso cluster."""

    print("=" * 120)
    print("CONFRONTO ESECUZIONE BASE CODE vs LLM CODE")
    print("=" * 120)
    print()

    # Seleziona alcuni cluster rappresentativi per ogni linguaggio problematico
    test_clusters = {
        'cpp': ['acronym', 'allergies', 'anagram'],
        'java': ['acronym', 'anagram'],
        'python': ['acronym', 'anagram'],
        'javascript': ['allergies', 'anagram'],
        'c': ['acronym']
    }

    execution_outputs = utility_paths.OUTPUT_DIR_FILEPATH

    for lang, clusters in test_clusters.items():
        print(f"\n{'=' * 120}")
        print(f"LINGUAGGIO: {lang.upper()}")
        print('=' * 120)

        for cluster in clusters:
            print(f"\nCluster: {cluster}")
            print("-" * 120)

            # Carica base execution
            base_file = execution_outputs / f"{cluster}_results_1.json"
            if not base_file.exists():
                print(f"  ⚠️  Base file non trovato: {base_file}")
                continue

            try:
                base_data = json.load(open(base_file))
            except Exception as e:
                print(f"  ❌ Errore leggendo base file: {e}")
                continue

            # Carica LLM execution (v1)
            llm_file = execution_outputs / f"{cluster}_results_v1_1.json"
            if not llm_file.exists():
                print(f"  ⚠️  LLM file non trovato: {llm_file}")
                continue

            try:
                llm_data = json.load(open(llm_file))
            except Exception as e:
                print(f"  ❌ Errore leggendo LLM file: {e}")
                continue

            # Confronta entries per il linguaggio
            lang_key = lang if lang in base_data.get('results', {}) else lang.upper()
            if lang_key not in base_data.get('results', {}):
                # Prova case variations
                for key in base_data.get('results', {}).keys():
                    if key.lower() == lang:
                        lang_key = key
                        break

            base_entries = base_data.get('results', {}).get(lang_key, [])
            llm_entries = llm_data.get('results', {}).get(lang_key, [])

            print(f"\n  BASE CODE:")
            print(f"    Total entries: {len(base_entries)}")

            if base_entries:
                passing = sum(1 for e in base_entries if e.get('regressionTestPassed') and e.get('success'))
                print(f"    Passing: {passing}/{len(base_entries)} ({passing/len(base_entries)*100:.1f}%)")

                # Sample base entry
                sample_base = base_entries[0]
                print(f"\n    Sample base entry:")
                print(f"      ID: {sample_base.get('id')}")
                print(f"      Filename: {sample_base.get('filename')}")
                print(f"      Language: {sample_base.get('language')}")
                print(f"      Passed: {sample_base.get('regressionTestPassed')}")
                print(f"      Success: {sample_base.get('success')}")
                print(f"      Exec time: {sample_base.get('execution_time_ms')}")
                print(f"      CPU: {sample_base.get('CPU_usage')}")
                print(f"      RAM: {sample_base.get('RAM_usage')}")
                error_msg = sample_base.get('error_message') or 'None'
                print(f"      Error: {error_msg[:100] if len(error_msg) > 100 else error_msg}")

                # Check log path
                if 'log_path' in sample_base:
                    log_path = Path(sample_base['log_path'])
                    print(f"      Log path: {log_path}")
                    if log_path.exists():
                        print(f"      Log exists: ✓")
                        # Read last lines
                        try:
                            with open(log_path, 'r') as f:
                                lines = f.readlines()
                                print(f"      Log lines: {len(lines)}")
                                if lines:
                                    print(f"      Last 5 lines:")
                                    for line in lines[-5:]:
                                        print(f"        {line.strip()}")
                        except Exception as e:
                            print(f"      Error reading log: {e}")
                    else:
                        print(f"      Log exists: ✗")

            print(f"\n  LLM CODE (v1):")
            print(f"    Total entries: {len(llm_entries)}")

            if llm_entries:
                # LLM entries hanno struttura diversa
                total_llm_tests = 0
                passing_llm_tests = 0

                for entry in llm_entries:
                    llm_results = entry.get('LLM_results', [])
                    total_llm_tests += len(llm_results)
                    passing_llm_tests += sum(1 for r in llm_results if r.get('regressionTestPassed') and r.get('success'))

                print(f"    Total LLM test results: {total_llm_tests}")
                print(f"    Passing: {passing_llm_tests}/{total_llm_tests} ({passing_llm_tests/total_llm_tests*100:.1f}% if total > 0 else 0)")

                # Sample LLM entry
                sample_llm_entry = llm_entries[0]
                print(f"\n    Sample LLM entry:")
                print(f"      ID: {sample_llm_entry.get('id')}")
                print(f"      Filename: {sample_llm_entry.get('filename')}")
                print(f"      Language: {sample_llm_entry.get('language')}")

                llm_results = sample_llm_entry.get('LLM_results', [])
                if llm_results:
                    sample_llm_result = llm_results[0]
                    print(f"\n      Sample LLM result (1/{len(llm_results)}):")
                    print(f"        LLM type: {sample_llm_result.get('LLM_type')}")
                    print(f"        Path: {sample_llm_result.get('path')}")
                    print(f"        Passed: {sample_llm_result.get('regressionTestPassed')}")
                    print(f"        Success: {sample_llm_result.get('success')}")
                    print(f"        Exec time: {sample_llm_result.get('execution_time_ms')}")
                    print(f"        CPU: {sample_llm_result.get('CPU_usage')}")
                    print(f"        RAM: {sample_llm_result.get('RAM_usage')}")
                    llm_error = sample_llm_result.get('error_message') or 'None'
                    print(f"        Error: {llm_error[:100] if len(llm_error) > 100 else llm_error}")

            # CONFRONTO CHIAVE
            print(f"\n  CONFRONTO:")
            print(f"    {'Caratteristica':30s} | {'Base':20s} | {'LLM':20s} | {'Nota':30s}")
            print(f"    {'-'*30} | {'-'*20} | {'-'*20} | {'-'*30}")

            if base_entries and llm_entries:
                sample_base = base_entries[0]
                sample_llm_entry = llm_entries[0]
                llm_result = sample_llm_entry.get('LLM_results', [{}])[0]

                # Confronta struttura
                comparisons = [
                    ('ID', sample_base.get('id'), sample_llm_entry.get('id')),
                    ('Filename', sample_base.get('filename'), sample_llm_entry.get('filename')),
                    ('Language', sample_base.get('language'), sample_llm_entry.get('language')),
                    ('Exec Time', sample_base.get('execution_time_ms'), llm_result.get('execution_time_ms')),
                    ('CPU Usage', sample_base.get('CPU_usage'), llm_result.get('CPU_usage')),
                    ('Passed', sample_base.get('regressionTestPassed'), llm_result.get('regressionTestPassed')),
                ]

                for name, base_val, llm_val in comparisons:
                    base_str = str(base_val)[:18] if base_val is not None else 'None'
                    llm_str = str(llm_val)[:18] if llm_val is not None else 'None'

                    if base_val != llm_val:
                        if name == 'Exec Time' and base_val == 0 and llm_val and llm_val > 0:
                            nota = "⚠️  Base=0, LLM>0!"
                        elif name == 'Passed' and not base_val and llm_val:
                            nota = "❌ Base FAIL, LLM PASS"
                        elif name == 'Passed' and base_val and not llm_val:
                            nota = "⚠️  Base PASS, LLM FAIL"
                        else:
                            nota = "Differente"
                    else:
                        nota = "OK"

                    print(f"    {name:30s} | {base_str:20s} | {llm_str:20s} | {nota:30s}")

            print()

    # ANALISI GENERALE
    print("\n" + "=" * 120)
    print("ANALISI GENERALE")
    print("=" * 120)
    print()

    print("Osservazioni chiave:")
    print("  1. Se LLM ha execution_time > 0 ma base ha execution_time = 0:")
    print("     → Il timer FUNZIONA (lo vediamo in LLM), ma qualcosa è diverso nell'esecuzione base")
    print()
    print("  2. Se LLM passa ma base fallisce con Docker error:")
    print("     → Il problema è nella configurazione/struttura del base code, non nel Docker")
    print()
    print("  3. Possibili cause:")
    print("     a) File paths errati nel base code")
    print("     b) Dipendenze mancanti per base code (ma presenti per LLM)")
    print("     c) Differenze nella struttura directory base vs LLM")
    print("     d) Test runner che usa logica diversa per base vs LLM")
    print()

    print("Prossimi passi:")
    print("  1. Verificare il test runner: come esegue base vs LLM")
    print("  2. Controllare struttura directory dataset per base code")
    print("  3. Verificare che i file base abbiano tutte le dipendenze")
    print()

if __name__ == "__main__":
    compare_base_vs_llm()
