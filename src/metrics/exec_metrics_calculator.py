import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths, general_utils
import logging
from pathlib import Path
from typing import Dict, List, Tuple
import numpy as np
from collections import defaultdict


class ExecMetricCalculator:
    """Calcola le metriche di esecuzione aggregando tutti i cluster del dataset"""

    def __init__(self, logger_level: general_utils.LoggerLevel):

        match logger_level.value:
            case general_utils.LoggerLevel.INFO.value:
                level = logging.INFO
            case general_utils.LoggerLevel.WARNING.value:
                level = logging.WARNING
            case general_utils.LoggerLevel.ERROR.value:
                level = logging.ERROR
            case general_utils.LoggerLevel.DEBUG.value:
                level = logging.DEBUG
            case _:
                level = logging.INFO

        logging.basicConfig(level=level, format="%(asctime)s - %(levelname)s - %(message)s")
        self.logger = logging.getLogger(__name__)

        self.metrics = ["CPU_usage", "RAM_usage", "execution_time_ms"]
        self.pass_rate_metric = "pass_rate"
        self.all_metrics = self.metrics + [self.pass_rate_metric]
        self.llm_types = ["openAI", "claude", "gemini"]
        self.prompt_versions = ["v1", "v2", "v3", "v4"]
        self.languages = ["c", "c++", "go", "java", "python", "javascript", "typescript"]

        # Paths
        self.execution_outputs_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.stats_output_dir = utility_paths.METRICS_DIR_FILEPATH / "execution_stats"
        self.stats_output_dir.mkdir(parents=True, exist_ok=True)

    def load_execution_results(self, cluster_name: str) -> Tuple[Dict, Dict]:
        """
        Carica tutti i risultati delle esecuzioni per un cluster.
        Returns: (base_results, llm_results)
        """
        base_results = {}  # {execution_num: data}
        llm_results = defaultdict(dict)  # {prompt_version: {execution_num: data}}

        # Carica base code results
        for exec_num in range(1, 6):  # 5 esecuzioni
            filename = f"{cluster_name}_results_{exec_num}.json"
            filepath = self.execution_outputs_dir / filename

            if filepath.exists():
                data = general_utils.read_json(filepath)
                base_results[exec_num] = data
                self.logger.debug(f"Loaded base results: {filename}")
            else:
                self.logger.warning(f"Base results file not found: {filename}")

        # Carica LLM results
        for version in self.prompt_versions:
            for exec_num in range(1, 6):
                filename = f"{cluster_name}_results_{version}_{exec_num}.json"
                filepath = self.execution_outputs_dir / filename

                if filepath.exists():
                    data = general_utils.read_json(filepath)
                    llm_results[version][exec_num] = data
                    self.logger.debug(f"Loaded LLM results: {filename}")

        return base_results, llm_results

    def extract_metrics_from_base_result(self, result_data: Dict) -> Dict:
        """
        Estrae le metriche dai dati di risultato BASE.
        IMPORTANTE: include TUTTE le entries per il calcolo del pass_rate
        Returns: {entry_id: {language: str, metrics: {metric: value}, passed: bool}}
        """
        extracted = {}

        if not result_data or "results" not in result_data:
            return extracted

        results = result_data["results"]

        for language, entries in results.items():
            lang_lower = language.lower()

            for entry in entries:
                entry_id = entry.get("id")
                if not entry_id:
                    continue

                # Considera TUTTE le entries per il pass_rate
                passed = entry.get("regressionTestPassed", False)

                # Metriche: solo per entries che passano
                if passed :
                    metrics = {
                        "CPU_usage": entry.get("CPU_usage"),
                        "RAM_usage": entry.get("RAM_usage"),
                        "execution_time_ms": entry.get("execution_time_ms"),
                    }
                else:
                    # Entry non passa: niente metriche
                    metrics = {
                        "CPU_usage": None,
                        "RAM_usage": None,
                        "execution_time_ms": None,
                    }

                extracted[entry_id] = {
                    "language": lang_lower,
                    "metrics": metrics,
                    "passed": passed
                }

        return extracted

    def extract_metrics_from_llm_result(self, result_data: Dict) -> Dict:
        """
        Estrae le metriche dai dati di risultato LLM.
        IMPORTANTE: include TUTTE le LLM entries per il calcolo del pass_rate
        Returns: {variant_key: {language: str, llm_type: str, entry_id: str, metrics: dict, passed: bool}}
        """
        extracted = {}

        if not result_data or "results" not in result_data:
            return extracted

        results = result_data["results"]

        for language, entries in results.items():
            lang_lower = language.lower()

            for entry in entries:
                entry_id = entry.get("id")
                if not entry_id:
                    continue

                # Process ALL LLM results (not just passing ones)
                llm_results = entry.get("LLM_results", [])
                for idx, llm_result in enumerate(llm_results):
                    llm_type = llm_result.get("LLM_type", "").lower()
                    llm_path = llm_result.get("path", "")
                    passed = llm_result.get("regressionTestPassed", False)

                    # Metriche: solo per entries che passano
                    if passed:
                        metrics = {
                            "CPU_usage": llm_result.get("CPU_usage"),
                            "RAM_usage": llm_result.get("RAM_usage"),
                            "execution_time_ms": llm_result.get("execution_time_ms"),
                        }
                    else:
                        # Entry non passa: niente metriche
                        metrics = {
                            "CPU_usage": None,
                            "RAM_usage": None,
                            "execution_time_ms": None,
                        }

                    # Create unique key for each LLM variant
                    variant_key = f"{entry_id}_{llm_type}_{Path(llm_path).stem}_{idx}"
                    extracted[variant_key] = {
                        "language": lang_lower,
                        "llm_type": llm_type,
                        "entry_id": entry_id,
                        "metrics": metrics,
                        "passed": passed
                    }

        return extracted

    def calculate_mean_over_executions(self, executions_data: List[Dict], is_base: bool = False) -> Dict:
        """
        Calcola la media di ogni metrica su 5 esecuzioni.
        IMPORTANTE: calcola pass_rate considerando TUTTE le esecuzioni
        Per base code: filtra solo entries con pass_rate = 100%
        """
        if not executions_data:
            return {}

        # Aggregate metrics and pass status
        aggregated = defaultdict(lambda: defaultdict(list))
        pass_status = defaultdict(list)  # Track pass/fail for each entry
        metadata = {}

        for exec_data in executions_data:
            for key, data in exec_data.items():
                # Store metadata on first occurrence
                if key not in metadata:
                    metadata[key] = {
                        "language": data["language"]
                    }
                    if "llm_type" in data:
                        metadata[key]["llm_type"] = data["llm_type"]
                    if "entry_id" in data:
                        metadata[key]["entry_id"] = data["entry_id"]

                # Track pass status for pass_rate calculation
                pass_status[key].append(1 if data["passed"] else 0)

                # Aggregate metrics (only non-None values)
                for metric, value in data["metrics"].items():
                    if value is not None:
                        aggregated[key][metric].append(value)

        # Calculate means
        means = {}
        for key in metadata.keys():
            # Calculate pass_rate first
            pass_rate = None
            if key in pass_status and pass_status[key]:
                pass_rate = (sum(pass_status[key]) / len(pass_status[key])) * 100

            # FILTRO CRITICO: Per base code, includi solo entries con pass_rate = 100%
            if is_base and pass_rate is not None and pass_rate < 100.0:
                self.logger.debug(f"Skipping base code entry {key} with pass_rate {pass_rate:.1f}%")
                continue

            means[key] = {
                "language": metadata[key]["language"],
                "metrics": {}
            }

            # Copy additional fields if present
            if "llm_type" in metadata[key]:
                means[key]["llm_type"] = metadata[key]["llm_type"]
            if "entry_id" in metadata[key]:
                means[key]["entry_id"] = metadata[key]["entry_id"]

            # Add pass_rate
            if pass_rate is not None:
                means[key]["metrics"]["pass_rate"] = pass_rate

            # Calculate mean for other metrics
            for metric, values in aggregated[key].items():
                if values:
                    means[key]["metrics"][metric] = np.mean(values)

        return means

    def calculate_improvements(self, base_means: Dict, llm_means: Dict) -> Dict:
        """
        Calcola gli improvement entry per entry.
        Returns: {variant_key: {metric: improvement_percentage}}
        """
        improvements = {}

        for variant_key, llm_data in llm_means.items():
            # Extract base entry_id
            entry_id = llm_data.get("entry_id", variant_key.split("_")[0])

            if entry_id not in base_means:
                continue

            base_metrics = base_means[entry_id]["metrics"]
            llm_metrics = llm_data["metrics"]

            improvements[variant_key] = {
                "language": llm_data["language"],
                "llm_type": llm_data.get("llm_type", ""),
                "improvements": {}
            }

            for metric in self.all_metrics:
                if metric in base_metrics and metric in llm_metrics:
                    base_val = base_metrics[metric]
                    llm_val = llm_metrics[metric]

                    if base_val != 0:
                        improvement = ((llm_val - base_val) / base_val) * 100
                        improvements[variant_key]["improvements"][metric] = improvement

        return improvements


    def aggregate_across_clusters(self) -> Dict:
        """
        Aggrega tutti i dati da tutti i cluster per creare le statistiche globali.
        Questa è la funzione principale che sostituisce compute_all_statistics.
        """
        self.logger.info("Starting cross-cluster aggregation")

        cluster_names = general_utils.get_cluster_names(utility_paths.CLUSTERS_DIR_FILEPATH)
        self.logger.info(f"Found {len(cluster_names)} clusters to process")

        # Strutture dati aggregate
        aggregated_data = {
            # Objective 1: per prompt version
            "prompt_version_data": {
                "base": defaultdict(list),  # {metric: [values]}
                **{version: defaultdict(list) for version in self.prompt_versions}
            },

            # Objective 2: per language
            "language_data": {
                "base": defaultdict(lambda: defaultdict(list)),  # {language: {metric: [values]}}
                "llm": defaultdict(lambda: defaultdict(list))
            },

            # Objective 3: per model + version
            "model_version_data": {
                "base": defaultdict(list),  # {metric: [values]}
                "combinations": defaultdict(lambda: defaultdict(list)),  # {model_version: {metric: [values]}}
                "improvements": defaultdict(lambda: defaultdict(list))  # {model_version: {metric: [improvements]}}
            },

            # Objective 4: per language + model
            "language_model_data": defaultdict(lambda: defaultdict(list))  # {lang_model: {metric: [values]}}
        }

        # Process each cluster
        for cluster_name in cluster_names:
            self.logger.info(f"Processing cluster: {cluster_name}")

            try:
                base_results, llm_results = self.load_execution_results(cluster_name)

                # Extract base code means
                base_executions = []
                for exec_num, data in base_results.items():
                    extracted = self.extract_metrics_from_base_result(data)
                    base_executions.append(extracted)

                base_means = self.calculate_mean_over_executions(base_executions, is_base=True)

                # === OBJECTIVE 1: Aggregate base data ===
                for entry_id, data in base_means.items():
                    for metric, value in data["metrics"].items():
                        if value is not None:
                            aggregated_data["prompt_version_data"]["base"][metric].append(value)

                # === OBJECTIVE 2: Aggregate base data by language ===
                for entry_id, data in base_means.items():
                    language = data["language"]
                    for metric, value in data["metrics"].items():
                        if value is not None:
                            aggregated_data["language_data"]["base"][language][metric].append(value)

                # === OBJECTIVE 3: Aggregate base data for improvements ===
                for entry_id, data in base_means.items():
                    for metric, value in data["metrics"].items():
                        if value is not None:
                            aggregated_data["model_version_data"]["base"][metric].append(value)

                # Process LLM results
                for version in self.prompt_versions:
                    if version not in llm_results:
                        continue

                    llm_executions = []
                    for exec_num, data in llm_results[version].items():
                        extracted = self.extract_metrics_from_llm_result(data)
                        llm_executions.append(extracted)

                    llm_means = self.calculate_mean_over_executions(llm_executions, is_base=False)
                    improvements = self.calculate_improvements(base_means, llm_means)

                    # === OBJECTIVE 1: Aggregate LLM data by version ===
                    for variant_key, data in llm_means.items():
                        for metric, value in data["metrics"].items():
                            if value is not None:
                                aggregated_data["prompt_version_data"][version][metric].append(value)

                    # === OBJECTIVE 2: Aggregate LLM data by language ===
                    for variant_key, data in llm_means.items():
                        language = data["language"]
                        for metric, value in data["metrics"].items():
                            if value is not None:
                                aggregated_data["language_data"]["llm"][language][metric].append(value)

                    # === OBJECTIVE 3: Aggregate by model + version ===
                    for variant_key, data in llm_means.items():
                        llm_type = data.get("llm_type", "unknown")
                        combo_key = f"{llm_type}_{version}"

                        for metric, value in data["metrics"].items():
                            if value is not None:
                                aggregated_data["model_version_data"]["combinations"][combo_key][metric].append(value)

                    # Aggregate improvements
                    for variant_key, data in improvements.items():
                        llm_type = data.get("llm_type", "unknown")
                        combo_key = f"{llm_type}_{version}"

                        for metric, improvement in data["improvements"].items():
                            aggregated_data["model_version_data"]["improvements"][combo_key][metric].append(improvement)

                    # === OBJECTIVE 4: Aggregate by language + model ===
                    for variant_key, data in llm_means.items():
                        language = data["language"]
                        llm_type = data.get("llm_type", "unknown")
                        combo_key = f"{language}_{llm_type}"

                        for metric, value in data["metrics"].items():
                            if value is not None:
                                aggregated_data["language_model_data"][combo_key][metric].append(value)

            except Exception as e:
                self.logger.error(f"Error processing cluster {cluster_name}: {e}", exc_info=True)

        # Convert defaultdicts to regular dicts for JSON serialization
        # IMPORTANTE: Calcola improvements dalle medie aggregate, non entry-per-entry
        result = {
            "objective_1": {
                "base": {k: list(v) for k, v in aggregated_data["prompt_version_data"]["base"].items()},
                "prompt_versions": {
                    version: {k: list(v) for k, v in metrics.items()}
                    for version, metrics in aggregated_data["prompt_version_data"].items()
                    if version != "base"
                }
            },
            "objective_2": {
                "base_by_language": {
                    lang: {k: list(v) for k, v in metrics.items()}
                    for lang, metrics in aggregated_data["language_data"]["base"].items()
                },
                "llm_by_language": {
                    lang: {k: list(v) for k, v in metrics.items()}
                    for lang, metrics in aggregated_data["language_data"]["llm"].items()
                }
            },
            "objective_3": {
                "base": {k: list(v) for k, v in aggregated_data["model_version_data"]["base"].items()},
                "model_version_stats": {
                    combo: {k: list(v) for k, v in metrics.items()}
                    for combo, metrics in aggregated_data["model_version_data"]["combinations"].items()
                },
                # CORRETTO: Usa la MEDIA DEGLI IMPROVEMENTS entry-per-entry (non improvement delle medie)
                "mean_improvements": {
                    combo: {
                        metric: float(np.mean(improvements_list))
                        for metric, improvements_list in metrics.items()
                        if improvements_list
                    }
                    for combo, metrics in aggregated_data["model_version_data"]["improvements"].items()
                }
            },
            "objective_4": {
                "language_model_stats": {
                    combo: {k: list(v) for k, v in metrics.items()}
                    for combo, metrics in aggregated_data["language_model_data"].items()
                }
            }
        }

        # Save results
        for objective_name, data in result.items():
            output_path = self.stats_output_dir / f"{objective_name}_aggregated.json"
            general_utils.write_json(output_path, data)
            self.logger.info(f"Saved {objective_name} aggregated data to {output_path}")

        self.logger.info("Cross-cluster aggregation completed")

        return result