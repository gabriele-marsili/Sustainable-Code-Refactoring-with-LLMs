import json
import os
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime
from collections import defaultdict


# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths, general_utils  # noqa: E402

METRICS = general_utils.METRICS


@dataclass
class OutlierInfo:
    """Informazioni su un outlier rilevato"""
    entry_id: str
    cluster_name: str
    llm_model: str
    prompt_version: str
    language: str
    metric_name: str
    improvement_percentage: float
    base_mean: float
    llm_mean: float
    base_exec_files: List[str]
    llm_exec_files: List[str]

    def to_dict(self) -> Dict:
        return asdict(self)


@dataclass
class MetricData:
    """Container for metric values and metadata"""
    execution_time_ms: float
    CPU_usage: float
    RAM_usage: float
    regressionTestPassed: bool
    language : str
    model : str | None
    prompt_v : str | None

    def is_valid(self) -> bool:
        """Check if metrics are valid (non-zero execution time, no None values)"""
        return (
            self.execution_time_ms is not None and
            self.execution_time_ms > 0 and
            self.CPU_usage is not None and
            self.RAM_usage is not None and
            self.regressionTestPassed
        )

    def to_dict(self) -> Dict:
        """Convert to dictionary"""
        res = {
            'execution_time_ms': self.execution_time_ms,
            'CPU_usage': self.CPU_usage,
            'RAM_usage': self.RAM_usage,
            'regressionTestPassed': self.regressionTestPassed,
            'language' : self.language,                        
        }

        if self.model : 
            res['model'] = self.model

        if self.prompt_v: 
            res['prompt_v'] = self.prompt_v

        return res

    @staticmethod
    def safe_float_conversion(value) -> Optional[float]:
        """
        Safely convert a value to float, handling strings and None

        Args:
            value: Value to convert (can be int, float, string, or None)

        Returns:
            Float value or None if conversion fails
        """
        if value is None:
            return None
        try:
            return float(value)
        except (ValueError, TypeError):
            return None


class ImprovementCalculator:
    def __init__(self, outlier_threshold: float = 200.0):
        """
        Inizializza il calculator con threshold per outliers.

        Args:
            outlier_threshold: Soglia assoluta percentuale per considerare un improvement come outlier (default: 200%)
        """
        self.outlier_threshold = abs(outlier_threshold)
        self.outliers: List[OutlierInfo] = []
        print(f"ImprovementCalculator initialized with outlier threshold: ±{self.outlier_threshold}%")

    def extract_base_metrics(self, execution_data: Dict) -> Dict[str, List[MetricData]]:
        """
        Extract metrics from base code execution data

        Args:
            execution_data: Loaded JSON data from base execution file

        Returns:
            Dictionary mapping entry_id to list of MetricData objects
        """
        metrics_by_entry = defaultdict(list)

        if not execution_data or 'results' not in execution_data:
            return metrics_by_entry

        results = execution_data['results']

        # Iterate through all language sections
        for language, entries in results.items():
            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue

                metric_data = MetricData(
                    execution_time_ms=MetricData.safe_float_conversion(entry.get('execution_time_ms')),
                    CPU_usage=MetricData.safe_float_conversion(entry.get('CPU_usage')),
                    RAM_usage=MetricData.safe_float_conversion(entry.get('RAM_usage')),
                    regressionTestPassed=entry.get('regressionTestPassed', False),
                    language=entry.get('language',language),
                    model=None,
                    prompt_v=None
                )

                if metric_data.is_valid():
                    metrics_by_entry[entry_id].append(metric_data)

        return metrics_by_entry

    def extract_llm_metrics(self, execution_data: Dict, p_v:int) -> Dict[Tuple[str, str, str], List[MetricData]]:
        """
        Extract metrics from LLM execution data

        Args:
            execution_data: Loaded JSON data from LLM execution file

        Returns:
            Dictionary mapping (entry_id, llm_type, language) to list of MetricData objects
        """
        metrics_by_entry_llm = defaultdict(list)

        if not execution_data or 'results' not in execution_data:
            return metrics_by_entry_llm

        results = execution_data['results']

        # Iterate through all language sections
        for language, entries in results.items():
            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue

                llm_results = entry.get('LLM_results', [])
                for llm_result in llm_results:
                    llm_type = llm_result.get('LLM_type')
                    if not llm_type:
                        continue

                    metric_data = MetricData(
                        execution_time_ms=MetricData.safe_float_conversion(llm_result.get('execution_time_ms')),
                        CPU_usage=MetricData.safe_float_conversion(llm_result.get('CPU_usage')),
                        RAM_usage=MetricData.safe_float_conversion(llm_result.get('RAM_usage')),
                        regressionTestPassed=llm_result.get('regressionTestPassed', False),
                        language=llm_result.get("language",entry.get("language",language)),
                        model=llm_type,
                        prompt_v=p_v
                    )

                    if metric_data.is_valid():
                        key = (entry_id, llm_type, language)
                        metrics_by_entry_llm[key].append(metric_data)

        return metrics_by_entry_llm

    
    def calculate_mean_on_exec_base(self, cluster_name):
        """Calcola la media su 5 esecuzioni per ogni entry del codice base."""
   
        base_means = {}

        # Collect metrics from all 5 executions
        all_metrics = defaultdict(list)
        execution_files = []

        for execution_num in range(1, 6):
            file_path = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster_name}_results_{execution_num}.json"
            execution_files.append(str(file_path.name))

            execution_data = general_utils.read_json(file_path)
            if not execution_data:
                continue

            metrics_by_entry = self.extract_base_metrics(execution_data)

            for entry_id, metric_list in metrics_by_entry.items():
                all_metrics[entry_id].extend(metric_list)

        # Calculate means for each entry
        for entry_id, metric_list in all_metrics.items():
            if not metric_list:
                continue

            cpu_usage_sum = sum(m.CPU_usage for m in metric_list)
            RAM_usage_sum = sum(m.RAM_usage for m in metric_list)
            execution_time_ms_sum = sum(m.execution_time_ms for m in metric_list)

            # Calculate means for each metric
            means = {
                'execution_time_ms':  execution_time_ms_sum / len(metric_list),
                'CPU_usage': cpu_usage_sum  / len(metric_list),
                'RAM_usage': RAM_usage_sum / len(metric_list),
                'raw_values': {
                    'execution_time_ms': [m.execution_time_ms for m in metric_list],
                    'CPU_usage': [m.CPU_usage for m in metric_list],
                    'RAM_usage': [m.RAM_usage for m in metric_list]
                },
                'exec_quantity': len(metric_list),
                'execution_files': execution_files,
                "sum_CPU_usage": cpu_usage_sum,
                "sum_RAM_usage": RAM_usage_sum,
                "sum_execution_time_ms": execution_time_ms_sum,                
                "languages": [m.language for m in metric_list],
            }

            base_means[entry_id] = means

        return base_means

    def calculate_mean_on_exec_LLM(self, cluster_name:str,prompt_version: str)-> Dict[Tuple[str, str, str], Dict[str, float]]:
        """
        Calculate mean metrics for LLM code across 5 executions (point 1.2)

        Args:
            cluster_name: Name of the cluster
            prompt_version: Prompt version (v1, v2, v3, v4)

        Returns:
            Dictionary mapping (entry_id, llm_type, language) to mean metrics and raw values
        """
        llm_means = {}

        # Collect metrics from all 5 executions
        all_metrics = defaultdict(list)
        execution_files = []

        for execution_num in range(1, 6):
            file_path = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster_name}_results_{prompt_version}_{execution_num}.json"
            execution_files.append(str(file_path.name))

            execution_data = general_utils.read_json(file_path)
            if not execution_data:
                continue

            p_v : int = int(prompt_version.replace("v",""))
            metrics_by_entry_llm = self.extract_llm_metrics(execution_data,p_v)

            for key, metric_list in metrics_by_entry_llm.items():
                all_metrics[key].extend(metric_list)

        # Calculate means for each (entry_id, llm_type, language) combination
        for key, metric_list in all_metrics.items():
            if not metric_list:
                continue

            # Calculate means for each metric
            means = {
                'execution_time_ms': sum(m.execution_time_ms for m in metric_list) / len(metric_list),
                'CPU_usage': sum(m.CPU_usage for m in metric_list) / len(metric_list),
                'RAM_usage': sum(m.RAM_usage for m in metric_list) / len(metric_list),
                'raw_values': {
                    'execution_time_ms': [m.execution_time_ms for m in metric_list],
                    'CPU_usage': [m.CPU_usage for m in metric_list],
                    'RAM_usage': [m.RAM_usage for m in metric_list]
                },
                'num_executions': len(metric_list),
                'execution_files': execution_files,
                'languages' : [m.language for m in metric_list],
                'prompt_version' : p_v,
                'models' : [m.model for m in metric_list]
            }

            llm_means[key] = means

        return llm_means
    
        

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

    def calculate_improvement_percentage(self, base_value: float, llm_value: float) -> float:
        """       
        Formula: ((llm_value - base_value) / base_value) * 100

        Interpretazione:
        - Valore negativo: MIGLIORAMENTO (riduzione di CPU/RAM/Time)
        - Valore positivo: PEGGIORAMENTO (aumento di CPU/RAM/Time)

        Args:
            base_value: Valore medio del codice base
            llm_value: Valore medio del codice LLM

        Returns:
            Percentuale di improvement (negativo = buono, positivo = cattivo)
        """
        if base_value == 0:
            return 0.0

        return ((llm_value - base_value) / base_value) * 100.0

    def is_outlier(self, improvement_percentage: float) -> bool:
        """
        Verifica se un improvement è un outlier.

        Args:
            improvement_percentage: Percentuale di improvement calcolata

        Returns:
            True se il valore assoluto supera la threshold
        """
        return abs(improvement_percentage) >= self.outlier_threshold

    def calculate_improvements_for_cluster(self, cluster_name):
        """
        Calcola gli improvements per un cluster e genera il report migliorato.

        Nuova struttura report con label e flag outlier:
        {
            "entry_id": {
                "base_5_exec_data": {
                    "exec_quantity": int,
                    "language": str,
                    "avg_exec_CPU_usage": float,
                    "avg_exec_RAM_usage": float,
                    "avg_exec_execution_time_ms": float
                },
                "LLM_5_exec_data": {
                    "openAI": {
                        "prompt_v1": {
                            "exec_quantity": int,
                            "successfully_exec_quantity": int,
                            "language": str,
                            "avg_exec_CPU_usage": float,
                            "avg_exec_RAM_usage": float,
                            "avg_exec_execution_time_ms": float,
                            "avg_exec_regressionTestPassed": float
                        }, ...
                    }, ...
                },
                "improvements_data": {
                    "openAI": {
                        "prompt_v1": {
                            "LLM_successfully_exec_quantity": int,
                            "LLM_exec_quantity": int,
                            "language": str,
                            "CPU_usage": {
                                "improvement_percentage": float,
                                "label": "reduction" | "degradation",
                                "is_outlier": bool,
                                "base_value": float,
                                "llm_value": float
                            },
                            "RAM_usage": {...},
                            "execution_time_ms": {...},
                            "regressionTestPassed": float
                        }, ...
                    }, ...
                }
            }
        }
        """
        print(f"Calculating improvements for cluster: {cluster_name}")

        base_means = self.calculate_mean_on_exec_base(cluster_name)

        if not base_means:
            print(f"  🔴 No valid base metrics found for {cluster_name}")
            return

        # Inizializza report
        report = {}

        # Raccogli tutti i dati LLM per tutte le prompt versions
        all_llm_data = {}  # {prompt_version: {key: llm_data}}

        for v in range(1, 5):
            prompt_version = f"v{v}"
            llm_means = self.calculate_mean_on_exec_LLM(cluster_name, prompt_version)

            if not llm_means:
                print(f"  ⚠️ No valid LLM metrics found for {cluster_name} {prompt_version}")
                continue

            all_llm_data[prompt_version] = llm_means

        # Costruisci il report per ogni entry
        for entry_id, base_data in base_means.items():
            # Estrai il linguaggio
            language = base_data['languages'][0] if base_data['languages'] else 'unknown'

            # Inizializza struttura per questa entry
            report[entry_id] = {
                "base_5_exec_data": {
                    "exec_quantity": base_data['exec_quantity'],
                    "language": language,
                    "avg_exec_CPU_usage": base_data['CPU_usage'],
                    "avg_exec_RAM_usage": base_data['RAM_usage'],
                    "avg_exec_execution_time_ms": base_data['execution_time_ms']
                },
                "LLM_5_exec_data": {},
                "improvements_data": {}
            }

            # Inizializza strutture per LLM
            for model in ["openAI", "gemini", "claude"]:
                report[entry_id]["LLM_5_exec_data"][model] = {}
                report[entry_id]["improvements_data"][model] = {}

                for prompt_v in range(1, 5):
                    prompt_key = f"prompt_v{prompt_v}"

                    # Inizializza con valori di default
                    report[entry_id]["LLM_5_exec_data"][model][prompt_key] = {
                        "exec_quantity": 0,
                        "successfully_exec_quantity": 0,
                        "language": "",
                        "avg_exec_CPU_usage": -1,
                        "avg_exec_RAM_usage": -1,
                        "avg_exec_execution_time_ms": -1,
                        "avg_exec_regressionTestPassed": 0
                    }

                    report[entry_id]["improvements_data"][model][prompt_key] = {
                        "LLM_successfully_exec_quantity": 0,
                        "LLM_exec_quantity": 0,
                        "language": "",
                        "CPU_usage": self._create_metric_improvement_data(-999, -999, -999),
                        "RAM_usage": self._create_metric_improvement_data(-999, -999, -999),
                        "execution_time_ms": self._create_metric_improvement_data(-999, -999, -999),
                        "regressionTestPassed": -0.0
                    }

            # Processa tutti i dati LLM per questa entry
            for prompt_version, llm_means in all_llm_data.items():
                prompt_num = int(prompt_version.replace('v', ''))
                prompt_key = f"prompt_v{prompt_num}"

                # Cerca questa entry nei risultati LLM
                for (llm_entry_id, llm_type, llm_language), llm_data in llm_means.items():
                    if llm_entry_id != entry_id:
                        continue

                    # Popola LLM_5_exec_data
                    llm_exec_section = report[entry_id]["LLM_5_exec_data"][llm_type][prompt_key]
                    llm_exec_section["exec_quantity"] = llm_data['num_executions']
                    llm_exec_section["successfully_exec_quantity"] = llm_data['num_executions']
                    llm_exec_section["language"] = llm_data['languages'][0] if llm_data['languages'] else language
                    llm_exec_section["avg_exec_CPU_usage"] = llm_data['CPU_usage']
                    llm_exec_section["avg_exec_RAM_usage"] = llm_data['RAM_usage']
                    llm_exec_section["avg_exec_execution_time_ms"] = llm_data['execution_time_ms']
                    llm_exec_section["avg_exec_regressionTestPassed"] = 100.0

                    # Calcola improvements
                    improvements_section = report[entry_id]["improvements_data"][llm_type][prompt_key]
                    improvements_section["LLM_successfully_exec_quantity"] = llm_data['num_executions']
                    improvements_section["LLM_exec_quantity"] = llm_data['num_executions']
                    improvements_section["language"] = llm_exec_section["language"]

                    # Calcola improvement per ogni metrica
                    for metric_name in ['CPU_usage', 'RAM_usage', 'execution_time_ms']:
                        base_mean = base_data[metric_name]
                        llm_mean = llm_data[metric_name]

                        if base_mean <= 0 or llm_mean < 0:
                            # Valori invalidi
                            improvements_section[metric_name] = self._create_metric_improvement_data(
                                -999, base_mean, llm_mean
                            )
                            print(f"  ⚠️ Invalid values for {entry_id}, {llm_type}, {prompt_key}, {metric_name}")
                        else:
                            # Calcola improvement
                            improvement = self.calculate_improvement_percentage(base_mean, llm_mean)
                            label = "reduction" if improvement < 0 else "degradation"
                            is_outlier_flag = self.is_outlier(improvement)

                            improvements_section[metric_name] = self._create_metric_improvement_data(
                                improvement, base_mean, llm_mean, label, is_outlier_flag
                            )

                            # Traccia outlier
                            if is_outlier_flag:
                                outlier = OutlierInfo(
                                    entry_id=entry_id,
                                    cluster_name=cluster_name,
                                    llm_model=llm_type,
                                    prompt_version=prompt_key,
                                    language=llm_exec_section["language"],
                                    metric_name=metric_name,
                                    improvement_percentage=improvement,
                                    base_mean=base_mean,
                                    llm_mean=llm_mean,
                                    base_exec_files=[f"{cluster_name}_results_{i}.json" for i in range(1, 6)],
                                    llm_exec_files=llm_data['execution_files']
                                )
                                self.outliers.append(outlier)

                                print(f"  ⚠️ OUTLIER ({label}): {entry_id} | {llm_type} | {prompt_key} | {metric_name}: "
                                      f"{improvement:+.2f}% (base: {base_mean:.2f}, llm: {llm_mean:.2f})")

                    # Regression test passed
                    improvements_section["regressionTestPassed"] = -0.0

        # Salva il report
        out_path = (
            utility_paths.CLUSTERS_IMPROVEMENTS_DATA_FILEPATH
            / f"improvements_cluster_{cluster_name}.json"
        )

        out_path.parent.mkdir(parents=True, exist_ok=True)

        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"✅ Improvements data saved to: {out_path}")
        print(f"   Entries processed: {len(report)}")

        # Salva anche il report degli outliers per questo cluster (se presenti)
        cluster_outliers = [o for o in self.outliers if o.cluster_name == cluster_name]
        if cluster_outliers:
            outliers_path = (
                utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
                / "improvement_outliers"
                / f"outliers_{cluster_name}.json"
            )
            self._save_outliers_report(cluster_outliers, outliers_path, cluster_name)

    def _create_metric_improvement_data(
        self,
        improvement: float,
        base_value: float,
        llm_value: float,
        label: str = None,
        is_outlier: bool = False
    ) -> Dict:
        """
        Crea la struttura dati per un improvement di una metrica specifica.

        Args:
            improvement: Percentuale di improvement
            base_value: Valore base
            llm_value: Valore LLM
            label: "reduction" o "degradation" (None per valori invalidi)
            is_outlier: Flag per indicare se è un outlier

        Returns:
            Dizionario con i dati del improvement
        """
        if improvement == -999:
            # Valori invalidi
            return {
                "improvement_percentage": -999,
                "label": "invalid",
                "is_outlier": False,
                "base_value": base_value,
                "llm_value": llm_value
            }

        return {
            "improvement_percentage": improvement,
            "label": label if label else ("reduction" if improvement < 0 else "degradation"),
            "is_outlier": is_outlier,
            "base_value": base_value,
            "llm_value": llm_value
        }


    def _save_outliers_report(
        self, outliers: List[OutlierInfo], output_path: Path, cluster_name: str = None
    ) -> None:
        """
        Salva il report degli outliers in formato JSON.

        Args:
            outliers: Lista di OutlierInfo
            output_path: Path dove salvare il report
            cluster_name: Nome del cluster (opzionale, per report singolo cluster)
        """
        from collections import defaultdict

        report_data = {
            "metadata": {
                "generation_date": datetime.now().isoformat(),
                "threshold_percentage": self.outlier_threshold,
                "total_outliers": len(outliers),
                "cluster_name": cluster_name if cluster_name else "all_clusters",
            },
            "outliers": [outlier.to_dict() for outlier in outliers],
        }

        # Crea summary statistico
        summary = {
            "by_cluster": defaultdict(int),
            "by_llm_model": defaultdict(int),
            "by_prompt_version": defaultdict(int),
            "by_metric": defaultdict(int),
            "by_language": defaultdict(int),
        }

        for outlier in outliers:
            summary["by_cluster"][outlier.cluster_name] += 1
            summary["by_llm_model"][outlier.llm_model] += 1
            summary["by_prompt_version"][outlier.prompt_version] += 1
            summary["by_metric"][outlier.metric_name] += 1
            summary["by_language"][outlier.language] += 1

        report_data["summary"] = {
            "by_cluster": dict(summary["by_cluster"]),
            "by_llm_model": dict(summary["by_llm_model"]),
            "by_prompt_version": dict(summary["by_prompt_version"]),
            "by_metric": dict(summary["by_metric"]),
            "by_language": dict(summary["by_language"]),
        }

        # Salva il file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)

        print(f"  Outliers report saved to: {output_path}")
        print(f"  Total outliers for this cluster: {len(outliers)}")

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
        clusters = general_utils.get_cluster_path_list(
            utility_paths.CLUSTERS_DIR_FILEPATH
        )
        total_clusters = len(clusters)

        print(f"\nGoing to calculate improvements for {total_clusters} clusters")
        print(f"Outlier threshold: ±{self.outlier_threshold}%")
        print("="*80)

        # Reset outliers list
        self.outliers = []

        for i, cluster_path in enumerate(clusters):
            cluster_name = cluster_path.stem.replace("cluster_", "").replace(
                ".json", ""
            )
            print(
                f"\nProcessing cluster: {cluster_name} ({i + 1}/{total_clusters} | {(i + 1) / total_clusters * 100:.1f}%)"
            )

            try:
                self.calculate_improvements_for_cluster(cluster_name)
            except Exception as e:
                print(f"Error processing cluster {cluster_name}: {e}")
                raise e

        # Salva report globale outliers
        print("\n" + "="*80)
        print(f"All clusters processed. Total outliers found: {len(self.outliers)}")

        if self.outliers:
            outliers_path = (
                utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
                / "improvement_outliers"
                / f"outliers_{cluster_name}.json"
            )
            self._save_outliers_report(self.outliers, outliers_path)

            # Stampa summary
            print("\n" + "="*80)
            print("OUTLIERS SUMMARY")
            print("="*80)

            from collections import defaultdict
            by_metric = defaultdict(int)
            by_cluster = defaultdict(int)

            for outlier in self.outliers:
                by_metric[outlier.metric_name] += 1
                by_cluster[outlier.cluster_name] += 1

            print("\nBy Metric:")
            for metric, count in sorted(by_metric.items(), key=lambda x: x[1], reverse=True):
                print(f"  {metric}: {count}")

            print("\nTop 10 Clusters with most outliers:")
            for cluster, count in sorted(by_cluster.items(), key=lambda x: x[1], reverse=True)[:10]:
                print(f"  {cluster}: {count}")

            print("\n" + "="*80)

    

if __name__ == "__main__":
    calculator = ImprovementCalculator()    
    calculator.calculate_improvements_for_all_clusters()
