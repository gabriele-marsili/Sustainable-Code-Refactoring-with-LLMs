import json
import os
import sys
from typing import List
from pathlib import Path

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths, general_utils  # noqa: E402

METRICS = general_utils.METRICS


class ImprovementCalculator:
    def __init__(self):
        pass

    def get_cluster_files(self) -> List[Path]:
        """Get cluster files from cluster directory."""
        return [
            p
            for p in utility_paths.CLUSTERS_DIR_FILEPATH.glob("*.json")
            if "with_metrics" not in p.name
            and "debug_" not in p.name
            and "bad_entries" not in p.name
            and "cluster_" in p.name
        ]

    def calculate_mean_on_exec_base(self, cluster_name):
        """Calcola la media su 5 esecuzioni per ogni entry del codice base."""
        report = {}

        for exec_num in range(1, 6):  # 5 exec
            cluster_out_path = (
                utility_paths.OUTPUT_DIR_FILEPATH
                / f"{cluster_name}_results_{exec_num}.json"
            )
            cluster_content = general_utils.read_json(cluster_out_path)

            for _lang, entries in cluster_content["results"].items():
                for entry in entries:
                    e_id = entry["id"]
                    
                    # Inizializza entry se non esiste
                    if e_id not in report:
                        report[e_id] = {
                            "sum_CPU_usage": 0,
                            "sum_RAM_usage": 0,
                            "sum_execution_time_ms": 0,
                            "exec_quantity": 0,
                            "language": entry["language"],
                        }

                    # Accumula solo se tutti i valori sono presenti e non None
                    if all(entry.get(m) is not None for m in METRICS):
                        for m in METRICS:
                            report[e_id][f"sum_{m}"] += entry[m]
                        report[e_id]["exec_quantity"] += 1

        # Calcola le medie finali
        for e_id in report.keys():
            exec_quantity = report[e_id]["exec_quantity"]
            for m in METRICS:
                if exec_quantity == 0:
                    report[e_id][f"avg_exec_{m}"] = -1  # Valore di fallback
                else:
                    report[e_id][f"avg_exec_{m}"] = report[e_id][f"sum_{m}"] / exec_quantity
                # Rimuovi le somme temporanee
                del report[e_id][f"sum_{m}"]

        return report

    def calculate_mean_on_exec_LLM(self, cluster_name):
        """Calcola la media su 5 esecuzioni per ogni entry LLM (modello + prompt version)."""
        report = {}

        for exec_num in range(1, 6):
            for prompt_v in range(1, 5):
                cluster_path = (
                    utility_paths.OUTPUT_DIR_FILEPATH
                    / f"{cluster_name}_results_v{prompt_v}_{exec_num}.json"
                )

                cluster_content = general_utils.read_json(cluster_path)

                for _lang, entries in cluster_content["results"].items():
                    for entry in entries:
                        e_id = entry["id"]

                        # Inizializza struttura per entry se non esiste
                        if e_id not in report:
                            report[e_id] = self._init_llm_report_structure()

                        if "LLM_results" not in entry:
                            continue

                        llm_res = entry["LLM_results"]
                        for llm_entry in llm_res:
                            model = llm_entry["LLM_type"]
                            prompt_key = f"prompt_v{prompt_v}"
                            
                            # Riferimento diretto alla struttura
                            prompt_data = report[e_id][model][prompt_key]
                            
                            prompt_data["exec_quantity"] += 1
                            prompt_data["language"] = entry["language"]

                            # Verifica se tutti i valori necessari sono presenti
                            metrics_valid = all(
                                llm_entry.get(m) is not None for m in METRICS
                            )
                            
                            if llm_entry.get("regressionTestPassed", False) and metrics_valid:
                                prompt_data["successfully_exec_quantity"] += 1
                                
                                # Accumula i valori delle metriche
                                for m in METRICS:
                                    key = f"sum_{m}"
                                    if key not in prompt_data:
                                        prompt_data[key] = 0
                                    prompt_data[key] += llm_entry[m]

        # Calcola le medie finali
        for e_id in report.keys():
            for model in ["openAI", "gemini", "claude"]:
                for prompt_v in range(1, 5):
                    prompt_key = f"prompt_v{prompt_v}"
                    prompt_data = report[e_id][model][prompt_key]
                    
                    s_exec_q = prompt_data["successfully_exec_quantity"]
                    exec_q = prompt_data["exec_quantity"]
                    
                    # Calcola medie per le metriche di performance
                    for m in METRICS:
                        sum_key = f"sum_{m}"
                        avg_key = f"avg_exec_{m}"
                        
                        if s_exec_q == 0 or sum_key not in prompt_data:
                            prompt_data[avg_key] = -1  # Valore di fallback
                        else:
                            prompt_data[avg_key] = prompt_data[sum_key] / s_exec_q
                            # Rimuovi la somma temporanea
                            del prompt_data[sum_key]
                    
                    # Calcola il pass rate come percentuale
                    if exec_q == 0:
                        prompt_data["avg_exec_regressionTestPassed"] = 0
                    else:
                        prompt_data["avg_exec_regressionTestPassed"] = (s_exec_q / exec_q) * 100

        return report

    def _init_llm_report_structure(self):
        """Inizializza la struttura dati per un entry LLM."""
        models = ["openAI", "gemini", "claude"]
        structure = {}
        
        for model in models:
            structure[model] = {}
            for prompt_v in range(1, 5):
                structure[model][f"prompt_v{prompt_v}"] = {
                    "exec_quantity": 0,
                    "successfully_exec_quantity": 0,
                    "language": "",
                }
        
        return structure

    def calculate_improvements_for_cluster(self, cluster_name):
        """Calcola gli improvements per un cluster."""
        print(f"Calculating improvements for cluster: {cluster_name}")
        
        base_5_exec_avgs_report = self.calculate_mean_on_exec_base(cluster_name)
        LLM_5_exec_avgs_report = self.calculate_mean_on_exec_LLM(cluster_name)

        report = {}

        for entry_id in base_5_exec_avgs_report.keys():
            if entry_id not in LLM_5_exec_avgs_report:
                print(f"Warning: Entry {entry_id} not found in LLM results")
                continue

            base_avg_values = base_5_exec_avgs_report[entry_id]
            LLM_avg_values = LLM_5_exec_avgs_report[entry_id]

            report[entry_id] = {
                "base_5_exec_data": base_avg_values,
                "LLM_5_exec_data": LLM_avg_values,
                "improvements_data": self._init_improvements_structure(),
            }

            improvement_data = report[entry_id]["improvements_data"]

            # Calcola improvements per ogni modello e prompt version
            for model in ["openAI", "gemini", "claude"]:
                for prompt_v in range(1, 5):
                    prompt_key = f"prompt_v{prompt_v}"
                    
                    llm_prompt_data = LLM_avg_values[model][prompt_key]
                    improvement_prompt_data = improvement_data[model][prompt_key]
                    
                    # Copia dati di esecuzione
                    improvement_prompt_data["LLM_successfully_exec_quantity"] = \
                        llm_prompt_data["successfully_exec_quantity"]
                    improvement_prompt_data["LLM_exec_quantity"] = \
                        llm_prompt_data["exec_quantity"]
                    improvement_prompt_data["language"] = \
                        llm_prompt_data["language"]

                    # Calcola improvements solo se ci sono esecuzioni successful
                    if llm_prompt_data["successfully_exec_quantity"] > 0:
                        # Calcola improvement per regression test passed
                        base_pass_rate = 100  # Il codice base passa sempre i test (assumiamo)
                        llm_pass_rate = llm_prompt_data["avg_exec_regressionTestPassed"]
                        
                        # Improvement negativo indica degrado nel pass rate
                        improvement_prompt_data["regressionTestPassed"] = \
                            -(base_pass_rate - llm_pass_rate)

                        # Calcola improvements per le altre metriche
                        for metric in METRICS:
                            base_value = base_avg_values[f"avg_exec_{metric}"]
                            llm_value = llm_prompt_data[f"avg_exec_{metric}"]
                            
                            if base_value <= 0 or llm_value < 0:
                                improvement_prompt_data[metric] = -999  # Valore di errore
                                print(f"Warning: Invalid values for {entry_id}, {model}, {prompt_key}, {metric}")
                                print(f"  Base: {base_value}, LLM: {llm_value}")
                            else:
                                # Improvement positivo indica miglioramento (riduzione del valore)
                                improvement_prompt_data[metric] = \
                                    ((base_value - llm_value) / base_value) * 100
                    else:
                        # Nessuna esecuzione successful - imposta valori di fallback
                        for metric in METRICS + ["regressionTestPassed"]:
                            improvement_prompt_data[metric] = -999

        # Salva risultati
        out_path = (
            utility_paths.CLUSTERS_IMPROVEMENTS_DATA_FILEPATH
            / f"improvements_cluster_{cluster_name}.json"
        )

        out_path.parent.mkdir(parents=True, exist_ok=True)

        with open(out_path, "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"Improvements data saved to: {out_path}")

    def _init_improvements_structure(self):
        """Inizializza la struttura dati per gli improvements."""
        models = ["openAI", "gemini", "claude"]
        metrics = METRICS + ["regressionTestPassed"]
        
        structure = {}
        for model in models:
            structure[model] = {}
            for prompt_v in range(1, 5):
                prompt_data = {
                    "LLM_successfully_exec_quantity": 0,
                    "LLM_exec_quantity": 0,
                    "language": "",
                }
                for metric in metrics:
                    prompt_data[metric] = -1
                
                structure[model][f"prompt_v{prompt_v}"] = prompt_data
        
        return structure

    def calculate_improvements_for_all_clusters(self):
        """Calcola improvements per tutti i clusters."""
        clusters = self.get_cluster_files()
        total_clusters = len(clusters)

        print(f"\nGoing to calculate improvements for {total_clusters} clusters")
        for i, cluster_path in enumerate(clusters):
            cluster_name = cluster_path.stem.replace("cluster_", "").replace(".json", "")
            print(f"Processing cluster: {cluster_name} ({i + 1}/{total_clusters} | {(i + 1) / total_clusters * 100:.1f}%)")
            
            try:
                self.calculate_improvements_for_cluster(cluster_name)
            except Exception as e:
                print(f"Error processing cluster {cluster_name}: {e}")
                continue

    def debug_cluster_data(self, cluster_name, entry_id=None):
        """Metodo di debug per ispezionare i dati di un cluster."""
        print(f"\n=== DEBUG CLUSTER: {cluster_name} ===")
        
        base_report = self.calculate_mean_on_exec_base(cluster_name)
        llm_report = self.calculate_mean_on_exec_LLM(cluster_name)
        
        if entry_id:
            entries_to_check = [entry_id] if entry_id in base_report else []
        else:
            entries_to_check = list(base_report.keys())[:3]  # Prime 3 entries
        
        for e_id in entries_to_check:
            print(f"\n--- Entry ID: {e_id} ---")
            
            if e_id in base_report:
                print("BASE DATA:")
                base_data = base_report[e_id]
                for metric in METRICS:
                    print(f"  avg_exec_{metric}: {base_data.get(f'avg_exec_{metric}', 'N/A')}")
                print(f"  exec_quantity: {base_data.get('exec_quantity', 'N/A')}")
            
            if e_id in llm_report:
                print("\nLLM DATA (sample - OpenAI prompt_v1):")
                llm_data = llm_report[e_id]["openAI"]["prompt_v1"]
                for metric in METRICS:
                    print(f"  avg_exec_{metric}: {llm_data.get(f'avg_exec_{metric}', 'N/A')}")
                print(f"  avg_exec_regressionTestPassed: {llm_data.get('avg_exec_regressionTestPassed', 'N/A')}")
                print(f"  successfully_exec_quantity: {llm_data.get('successfully_exec_quantity', 'N/A')}")
                print(f"  exec_quantity: {llm_data.get('exec_quantity', 'N/A')}")


if __name__ == "__main__":
    calculator = ImprovementCalculator()
    
    # Per debugging, puoi utilizzare:
    # calculator.debug_cluster_data("bob", "specific_entry_id")
    
    # Per processare tutti i clusters:
    calculator.calculate_improvements_for_all_clusters()