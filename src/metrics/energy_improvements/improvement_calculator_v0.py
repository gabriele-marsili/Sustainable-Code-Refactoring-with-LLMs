import os
import sys
from pathlib import Path
import json
from typing import Dict, List, Any
import logging
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from collections import defaultdict

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Small constant to avoid division by zero in relative improvements
EPSILON = 1e-9

# Set matplotlib style for better plots
plt.style.use('seaborn-v0_8')
sns.set_palette("Set2")

def read_json(path: Path) -> Dict:
    """Read JSON file with error handling."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading {path}: {e}")
        return {}

class ImprovedPerformanceAnalyzer:
    """
    Comprehensive performance analyzer for base code vs LLM-generated code.
    
    This class calculates statistics and improvements with proper handling of:
    - Individual comparisons (base vs LLM per entry)
    - Aggregated comparisons (base vs average of all models)
    - Multi-dimensional statistics (model, language, prompt version combinations)
    """
    
    def __init__(self):
        self.cluster_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.reports_dir = Path(__file__).parent / "reports"
        self.reports_dir.mkdir(exist_ok=True)
        
        # Data storage
        self.base_data = {}  # {cluster_name: {entry_id: {metrics...}}}
        self.llm_data = {}   # {cluster_name: {llm_entry_id: {metrics...}}}
        
        # Statistics storage
        self.base_statistics = {}
        self.llm_statistics = {}
        self.improvement_statistics = {}
        
        # Results storage
        self.individual_improvements = {}  # base vs individual LLM entries
        self.aggregated_improvements = {}  # base vs averaged LLM performance
        self.aggregated_improvements_by_prompt = {}  # base vs avg across models per prompt version
        self.aggregated_improvements_by_model = {}   # base vs avg across prompts per model

    def get_cluster_files(self) -> List[Path]:
        """Get cluster files from cluster directory."""
        return [
            p for p in self.cluster_dir.glob("*.json")
            if "with_metrics" not in p.name
            and "debug_" not in p.name
            and "bad_entries" not in p.name
            and "cluster_" in p.name
        ]

    def process_base_code_metrics(self, cluster_name: str) -> Dict[str, Any]:
        """Process base code metrics averaged across 5 executions."""
        entries = {}
        
        for i in range(1, 6):  # 5 executions
            result_file = f"{cluster_name}_results_{i}.json"
            result_path = utility_paths.OUTPUT_DIR_FILEPATH / result_file
            result_content = read_json(result_path)
            
            for lang, lang_entries in result_content.get("results", {}).items():
                for entry in lang_entries:
                    if not all(key in entry for key in ["CPU_usage", "RAM_usage", "execution_time_ms"]):
                        continue
                    
                    entry_id = entry["id"]
                    
                    if entry_id not in entries:
                        entries[entry_id] = {
                            "id": entry_id,
                            "language": entry["language"],
                            "cpu_values": [],
                            "ram_values": [],
                            "time_values": [],
                            "test_passed_values": []
                        }
                    
                    entries[entry_id]["cpu_values"].append(entry["CPU_usage"])
                    entries[entry_id]["ram_values"].append(entry["RAM_usage"])
                    entries[entry_id]["time_values"].append(entry["execution_time_ms"])
                    entries[entry_id]["test_passed_values"].append(
                        1 if entry.get("regressionTestPassed", False) else 0
                    )
        
        # Calculate means
        processed_entries = {}
        for entry_id, data in entries.items():
            if len(data["cpu_values"]) > 0:  # Ensure we have data
                processed_entries[entry_id] = {
                    "id": entry_id,
                    "language": data["language"],
                    "cpu_mean": np.mean(data["cpu_values"]),
                    "ram_mean": np.mean(data["ram_values"]),
                    "time_mean": np.mean(data["time_values"]),
                    "test_pass_rate": np.mean(data["test_passed_values"]),
                    "execution_count": len(data["cpu_values"])
                }
        
        return processed_entries

    def process_llm_code_metrics(self, cluster_name: str) -> Dict[str, Any]:
        """Process LLM code metrics averaged across 5 executions for each model/prompt combination."""
        entries = defaultdict(lambda: {
            "cpu_values": [],
            "ram_values": [],
            "time_values": [],
            "test_passed_values": []
        })
        
        for prompt_v in range(1, 5):  # 4 prompt versions
            for i in range(1, 6):  # 5 executions
                result_file = f"{cluster_name}_results_v{prompt_v}_{i}.json"
                result_path = utility_paths.OUTPUT_DIR_FILEPATH / result_file
                result_content = read_json(result_path)
                
                for lang, lang_entries in result_content.get("results", {}).items():
                    for entry in lang_entries:
                        for llm_result in entry.get('LLM_results', []):
                            if not all(key in llm_result for key in ["CPU_usage", "RAM_usage", "execution_time_ms"]):
                                continue
                            
                            base_id = entry["id"]
                            llm_type = llm_result['LLM_type']
                            llm_entry_id = f"{base_id}_{llm_type}_v{prompt_v}"
                            
                            if llm_entry_id not in entries:
                                entries[llm_entry_id].update({
                                    "id": llm_entry_id,
                                    "base_id": base_id,
                                    "language": entry["language"],
                                    "llm_type": llm_type,
                                    "prompt_version": prompt_v
                                })
                            
                            entries[llm_entry_id]["cpu_values"].append(llm_result["CPU_usage"])
                            entries[llm_entry_id]["ram_values"].append(llm_result["RAM_usage"])
                            entries[llm_entry_id]["time_values"].append(llm_result["execution_time_ms"])
                            entries[llm_entry_id]["test_passed_values"].append(
                                1 if llm_result.get("regressionTestPassed", False) else 0
                            )
        
        # Calculate means
        processed_entries = {}
        for llm_entry_id, data in entries.items():
            if len(data["cpu_values"]) > 0:  # Ensure we have data
                processed_entries[llm_entry_id] = {
                    "id": llm_entry_id,
                    "base_id": data["base_id"],
                    "language": data["language"],
                    "llm_type": data["llm_type"],
                    "prompt_version": data["prompt_version"],
                    "cpu_mean": np.mean(data["cpu_values"]),
                    "ram_mean": np.mean(data["ram_values"]),
                    "time_mean": np.mean(data["time_values"]),
                    "test_pass_rate": np.mean(data["test_passed_values"]),
                    "execution_count": len(data["cpu_values"])
                }
        
        return processed_entries

    def calculate_base_LLM_metrics(self, cluster_name: str) -> Dict[str, Dict[str, Any]]:
        """
        Calculate and return both base metrics (averaged over 5 runs) and LLM metrics
        (averaged over 5 runs for each model and prompt version combination).

        Returns a dict with keys: 'base' and 'llm'.
        """
        base_entries = self.process_base_code_metrics(cluster_name)
        llm_entries = self.process_llm_code_metrics(cluster_name)
        return {"base": base_entries, "llm": llm_entries}

    def calculate_improvement(self, base_value: float, llm_value: float) -> float:
        """
        Relative improvement for lower-is-better metrics (CPU, RAM, time).

        Formula (per entry i):
        impr_i = ((B_i - L_i) / B_i) * 100 [%]

        Where B_i is the base mean over 5 runs and L_i is the LLM mean over 5 runs (for a
        given model/prompt or aggregated as specified). Positive implies a reduction.
        """
        denom = base_value if base_value is not None else 0.0
        if denom <= 0:
            # Fallback to absolute difference in percentage points relative to 1 unit
            return (-(llm_value - denom)) * 100.0
        return ((base_value - llm_value) / max(denom, EPSILON)) * 100.0

    def calculate_improvement_rate(self, base_rate: float, llm_rate: float) -> float:
        """
        Relative improvement for higher-is-better metrics (test pass rate).

        Preferred formula:
        impr_i = ((r_L - r_B) / r_B) * 100 [%]

        If r_B == 0, return absolute change in percentage points: (r_L - r_B) * 100
        """
        if base_rate <= 0:
            return (llm_rate - base_rate) * 100.0
        return ((llm_rate - base_rate) / max(base_rate, EPSILON)) * 100.0

    def calculate_individual_improvements(self) -> Dict[str, Any]:
        """Calculate improvements for each individual LLM entry vs its base counterpart."""
        improvements = {}
        
        for cluster_name in self.base_data.keys():
            if cluster_name not in self.llm_data:
                continue
                
            cluster_improvements = []
            base_entries = self.base_data[cluster_name]
            llm_entries = self.llm_data[cluster_name]
            
            for llm_id, llm_data in llm_entries.items():
                base_id = llm_data["base_id"]
                
                if base_id not in base_entries:
                    continue
                
                base_data = base_entries[base_id]
                
                improvement = {
                    "cluster": cluster_name,
                    "base_id": base_id,
                    "llm_id": llm_id,
                    "language": llm_data["language"],
                    "llm_type": llm_data["llm_type"],
                    "prompt_version": llm_data["prompt_version"],
                    "cpu_improvement": self.calculate_improvement(base_data["cpu_mean"], llm_data["cpu_mean"]),
                    "ram_improvement": self.calculate_improvement(base_data["ram_mean"], llm_data["ram_mean"]),
                    "time_improvement": self.calculate_improvement(base_data["time_mean"], llm_data["time_mean"]),
                    "test_improvement": self.calculate_improvement_rate(base_data["test_pass_rate"], llm_data["test_pass_rate"]),
                    "base_cpu": base_data["cpu_mean"],
                    "base_ram": base_data["ram_mean"],
                    "base_time": base_data["time_mean"],
                    "llm_cpu": llm_data["cpu_mean"],
                    "llm_ram": llm_data["ram_mean"],
                    "llm_time": llm_data["time_mean"]
                }
                
                cluster_improvements.append(improvement)
            
            improvements[cluster_name] = cluster_improvements
        
        return improvements

    def calculate_aggregated_improvements(self) -> Dict[str, Any]:
        """Calculate improvements of base code vs averaged LLM performance per base entry."""
        improvements = {}
        
        for cluster_name in self.base_data.keys():
            if cluster_name not in self.llm_data:
                continue
                
            base_entries = self.base_data[cluster_name]
            llm_entries = self.llm_data[cluster_name]
            
            # Group LLM entries by base_id
            llm_by_base = defaultdict(list)
            for llm_data in llm_entries.values():
                llm_by_base[llm_data["base_id"]].append(llm_data)
            
            cluster_improvements = []
            
            for base_id, base_data in base_entries.items():
                if base_id not in llm_by_base:
                    continue
                
                llm_group = llm_by_base[base_id]
                
                # Calculate average LLM performance for this base entry
                avg_cpu = np.mean([llm["cpu_mean"] for llm in llm_group])
                avg_ram = np.mean([llm["ram_mean"] for llm in llm_group])
                avg_time = np.mean([llm["time_mean"] for llm in llm_group])
                avg_test = np.mean([llm["test_pass_rate"] for llm in llm_group])
                
                improvement = {
                    "cluster": cluster_name,
                    "base_id": base_id,
                    "language": base_data["language"],
                    "llm_count": len(llm_group),
                    "cpu_improvement": self.calculate_improvement(base_data["cpu_mean"], avg_cpu),
                    "ram_improvement": self.calculate_improvement(base_data["ram_mean"], avg_ram),
                    "time_improvement": self.calculate_improvement(base_data["time_mean"], avg_time),
                    "test_improvement": self.calculate_improvement_rate(base_data["test_pass_rate"], avg_test),
                    "base_cpu": base_data["cpu_mean"],
                    "base_ram": base_data["ram_mean"],
                    "base_time": base_data["time_mean"],
                    "avg_llm_cpu": avg_cpu,
                    "avg_llm_ram": avg_ram,
                    "avg_llm_time": avg_time
                }
                
                cluster_improvements.append(improvement)
            
            improvements[cluster_name] = cluster_improvements
        
        return improvements

    def calculate_aggregated_improvements_by_prompt(self) -> Dict[str, Any]:
        """Calculate improvements: base vs average across models for each prompt version per base entry."""
        improvements = {}
        for cluster_name in self.base_data.keys():
            if cluster_name not in self.llm_data:
                continue
            base_entries = self.base_data[cluster_name]
            llm_entries = self.llm_data[cluster_name]

            # Group LLM entries by (base_id, prompt_version)
            llm_by_base_prompt = defaultdict(list)
            for llm_data in llm_entries.values():
                llm_by_base_prompt[(llm_data["base_id"], llm_data["prompt_version"])].append(llm_data)

            cluster_improvements = []
            for (base_id, prompt_v), llm_group in llm_by_base_prompt.items():
                if base_id not in base_entries:
                    continue
                base_data = base_entries[base_id]

                avg_cpu = np.mean([llm["cpu_mean"] for llm in llm_group])
                avg_ram = np.mean([llm["ram_mean"] for llm in llm_group])
                avg_time = np.mean([llm["time_mean"] for llm in llm_group])
                avg_test = np.mean([llm["test_pass_rate"] for llm in llm_group])

                improvement = {
                    "cluster": cluster_name,
                    "base_id": base_id,
                    "language": base_data["language"],
                    "prompt_version": prompt_v,
                    "llm_count": len(llm_group),
                    "cpu_improvement": self.calculate_improvement(base_data["cpu_mean"], avg_cpu),
                    "ram_improvement": self.calculate_improvement(base_data["ram_mean"], avg_ram),
                    "time_improvement": self.calculate_improvement(base_data["time_mean"], avg_time),
                    "test_improvement": self.calculate_improvement_rate(base_data["test_pass_rate"], avg_test),
                    "base_cpu": base_data["cpu_mean"],
                    "base_ram": base_data["ram_mean"],
                    "base_time": base_data["time_mean"],
                    "avg_llm_cpu": avg_cpu,
                    "avg_llm_ram": avg_ram,
                    "avg_llm_time": avg_time,
                }
                cluster_improvements.append(improvement)

            improvements[cluster_name] = cluster_improvements
        return improvements

    def calculate_aggregated_improvements_by_model(self) -> Dict[str, Any]:
        """Calculate improvements: base vs average across prompt versions for each model per base entry."""
        improvements = {}
        for cluster_name in self.base_data.keys():
            if cluster_name not in self.llm_data:
                continue
            base_entries = self.base_data[cluster_name]
            llm_entries = self.llm_data[cluster_name]

            # Group LLM entries by (base_id, llm_type)
            llm_by_base_model = defaultdict(list)
            for llm_data in llm_entries.values():
                llm_by_base_model[(llm_data["base_id"], llm_data["llm_type"])].append(llm_data)

            cluster_improvements = []
            for (base_id, model), llm_group in llm_by_base_model.items():
                if base_id not in base_entries:
                    continue
                base_data = base_entries[base_id]

                avg_cpu = np.mean([llm["cpu_mean"] for llm in llm_group])
                avg_ram = np.mean([llm["ram_mean"] for llm in llm_group])
                avg_time = np.mean([llm["time_mean"] for llm in llm_group])
                avg_test = np.mean([llm["test_pass_rate"] for llm in llm_group])

                improvement = {
                    "cluster": cluster_name,
                    "base_id": base_id,
                    "language": base_data["language"],
                    "llm_type": model,
                    "llm_count": len(llm_group),
                    "cpu_improvement": self.calculate_improvement(base_data["cpu_mean"], avg_cpu),
                    "ram_improvement": self.calculate_improvement(base_data["ram_mean"], avg_ram),
                    "time_improvement": self.calculate_improvement(base_data["time_mean"], avg_time),
                    "test_improvement": avg_test - base_data["test_pass_rate"],
                    "base_cpu": base_data["cpu_mean"],
                    "base_ram": base_data["ram_mean"],
                    "base_time": base_data["time_mean"],
                    "avg_llm_cpu": avg_cpu,
                    "avg_llm_ram": avg_ram,
                    "avg_llm_time": avg_time,
                }
                cluster_improvements.append(improvement)

            improvements[cluster_name] = cluster_improvements
        return improvements

    def calculate_base_statistics(self) -> Dict[str, Any]:
        """Calculate comprehensive statistics for base code."""
        all_entries = []
        for cluster_data in self.base_data.values():
            all_entries.extend(cluster_data.values())
        
        if not all_entries:
            return {}
        
        stats = {
            "overall": self._calculate_metric_stats([e for e in all_entries]),
            "by_language": {}
        }
        
        # Group by language
        by_language = defaultdict(list)
        for entry in all_entries:
            by_language[entry["language"]].append(entry)
        
        for language, entries in by_language.items():
            stats["by_language"][language] = self._calculate_metric_stats(entries)
        
        return stats

    def calculate_llm_statistics(self) -> Dict[str, Any]:
        """Calculate comprehensive statistics for LLM-generated code."""
        all_entries = []
        for cluster_data in self.llm_data.values():
            all_entries.extend(cluster_data.values())
        
        if not all_entries:
            return {}
        
        stats = {
            "overall": self._calculate_metric_stats(all_entries),
            "by_language": {},
            "by_model": {},
            "by_prompt_version": {},
            "by_model_language": {},
            "by_model_prompt": {},
            "by_language_prompt": {},
            "by_model_language_prompt": {}
        }
        
        # Single dimension groupings
        groupings = {
            "by_language": lambda e: e["language"],
            "by_model": lambda e: e["llm_type"],
            "by_prompt_version": lambda e: f"v{e['prompt_version']}"
        }
        
        for stat_key, grouping_func in groupings.items():
            grouped = defaultdict(list)
            for entry in all_entries:
                grouped[grouping_func(entry)].append(entry)
            
            for group_key, entries in grouped.items():
                stats[stat_key][group_key] = self._calculate_metric_stats(entries)
        
        # Multi-dimensional groupings
        multi_groupings = {
            "by_model_language": lambda e: f"{e['llm_type']}_{e['language']}",
            "by_model_prompt": lambda e: f"{e['llm_type']}_v{e['prompt_version']}",
            "by_language_prompt": lambda e: f"{e['language']}_v{e['prompt_version']}",
            "by_model_language_prompt": lambda e: f"{e['llm_type']}_{e['language']}_v{e['prompt_version']}"
        }
        
        for stat_key, grouping_func in multi_groupings.items():
            grouped = defaultdict(list)
            for entry in all_entries:
                grouped[grouping_func(entry)].append(entry)
            
            for group_key, entries in grouped.items():
                if len(entries) >= 3:  # Only include groups with sufficient data
                    stats[stat_key][group_key] = self._calculate_metric_stats(entries)
        
        return stats

    def calculate_improvement_statistics(self) -> Dict[str, Any]:
        """Calculate comprehensive improvement statistics."""
        # Prepare improvement sets with consistent statistical units
        indiv_improvements = []
        for cluster_improvements in self.individual_improvements.values():
            indiv_improvements.extend(cluster_improvements)

        agg_overall_improvements = []
        for cluster_improvements in self.aggregated_improvements.values():
            agg_overall_improvements.extend(cluster_improvements)

        agg_by_prompt_improvements = []
        for cluster_improvements in self.aggregated_improvements_by_prompt.values():
            agg_by_prompt_improvements.extend(cluster_improvements)

        agg_by_model_improvements = []
        for cluster_improvements in self.aggregated_improvements_by_model.values():
            agg_by_model_improvements.extend(cluster_improvements)

        if not agg_overall_improvements and not indiv_improvements:
            return {}

        stats = {
            # Overall: base vs mean across all models and prompts per entry
            "overall": self._calculate_improvement_stats(agg_overall_improvements) if agg_overall_improvements else {},
            # Single dimension buckets (computed with per-entry averages in that dimension)
            "by_model": {},
            "by_language": {},
            "by_prompt_version": {},
            # Intertwined buckets
            "by_model_language": {},
            "by_model_prompt": {},
            "by_language_prompt": {},
            "by_model_language_prompt": {},
            # Additional: by prompt v averaged across models
            "by_prompt_version_avg_models": {}
        }
        
        # Single dimension groupings
        # By language: use overall aggregated improvements grouped by base language
        grouped = defaultdict(list)
        for imp in agg_overall_improvements:
            grouped[imp["language"]].append(imp)
        for lang, imps in grouped.items():
            stats["by_language"][lang] = self._calculate_improvement_stats(imps)

        # By model: use aggregated-by-model improvements
        grouped = defaultdict(list)
        for imp in agg_by_model_improvements:
            grouped[imp["llm_type"]].append(imp)
        for model, imps in grouped.items():
            stats["by_model"][model] = self._calculate_improvement_stats(imps)

        # By prompt version: use aggregated-by-prompt improvements (avg across models)
        grouped = defaultdict(list)
        for imp in agg_by_prompt_improvements:
            grouped[f"v{imp['prompt_version']}"] .append(imp)
        for pv, imps in grouped.items():
            stats["by_prompt_version"][pv] = self._calculate_improvement_stats(imps)
        
        # Multi-dimensional groupings
        # Model + Language: use aggregated-by-model improvements grouped by model+language
        grouped = defaultdict(list)
        for imp in agg_by_model_improvements:
            grouped[f"{imp['llm_type']}_{imp['language']}"] .append(imp)
        for key, imps in grouped.items():
            if len(imps) >= 3:
                stats["by_model_language"][key] = self._calculate_improvement_stats(imps)

        # Language + Prompt: use aggregated-by-prompt improvements grouped by language+prompt
        grouped = defaultdict(list)
        for imp in agg_by_prompt_improvements:
            grouped[f"{imp['language']}_v{imp['prompt_version']}"] .append(imp)
        for key, imps in grouped.items():
            if len(imps) >= 3:
                stats["by_language_prompt"][key] = self._calculate_improvement_stats(imps)

        # Model + Prompt and Model + Language + Prompt: use individual improvements (one unit per model+prompt)
        if indiv_improvements:
            grouped = defaultdict(list)
            for imp in indiv_improvements:
                grouped[f"{imp['llm_type']}_v{imp['prompt_version']}"] .append(imp)
            for key, imps in grouped.items():
                if len(imps) >= 3:
                    stats["by_model_prompt"][key] = self._calculate_improvement_stats(imps)

            grouped = defaultdict(list)
            for imp in indiv_improvements:
                grouped[f"{imp['llm_type']}_{imp['language']}_v{imp['prompt_version']}"] .append(imp)
            for key, imps in grouped.items():
                if len(imps) >= 3:
                    stats["by_model_language_prompt"][key] = self._calculate_improvement_stats(imps)
        
        # Explicitly fill by_prompt_version_avg_models from aggregated-by-prompt improvements
        grouped_prompt = defaultdict(list)
        for imp in agg_by_prompt_improvements:
            grouped_prompt[f"v{imp['prompt_version']}"] .append(imp)
        for pv, imps in grouped_prompt.items():
            stats["by_prompt_version_avg_models"][pv] = self._calculate_improvement_stats(imps)
        
        return stats

    def _calculate_metric_stats(self, entries: List[Dict]) -> Dict[str, float]:
        """
        Calculate statistics for a list of entries using per-entry means.

        Returns mean, median, std, min, max for CPU/RAM/Time and test pass rate,
        plus 95% CI for the mean based on Student's t (per-entry sample size).
        """
        if not entries:
            return {}
        
        cpu_values = [e["cpu_mean"] for e in entries]
        ram_values = [e["ram_mean"] for e in entries]
        time_values = [e["time_mean"] for e in entries]
        test_values = [e["test_pass_rate"] for e in entries]
        n = len(entries)
        def ci95(values: List[float]) -> float:
            if n <= 1:
                return 0.0
            s = np.std(values, ddof=1)
            # approximate t critical ~ 1.96 for n>30; use 2.0 for small n
            t_crit = 1.96 if n > 30 else 2.0
            return t_crit * (s / np.sqrt(n))
        
        return {
            "count": len(entries),
            "cpu_mean": np.mean(cpu_values),
            "cpu_median": float(np.median(cpu_values)),
            "cpu_min": np.min(cpu_values),
            "cpu_max": np.max(cpu_values),
            "cpu_std": float(np.std(cpu_values, ddof=1)) if n > 1 else 0.0,
            "cpu_ci95": ci95(cpu_values),
            "ram_mean": np.mean(ram_values),
            "ram_median": float(np.median(ram_values)),
            "ram_min": np.min(ram_values),
            "ram_max": np.max(ram_values),
            "ram_std": float(np.std(ram_values, ddof=1)) if n > 1 else 0.0,
            "ram_ci95": ci95(ram_values),
            "time_mean": np.mean(time_values),
            "time_median": float(np.median(time_values)),
            "time_min": np.min(time_values),
            "time_max": np.max(time_values),
            "time_std": float(np.std(time_values, ddof=1)) if n > 1 else 0.0,
            "time_ci95": ci95(time_values),
            "test_pass_rate": np.mean(test_values),
            "test_pass_rate_median": float(np.median(test_values)),
            "test_pass_rate_std": float(np.std(test_values, ddof=1)) if n > 1 else 0.0,
            "test_pass_rate_ci95": ci95(test_values),
        }

    def _calculate_improvement_stats(self, improvements: List[Dict]) -> Dict[str, float]:
        """
        Calculate statistics for a list of per-entry improvements.

        Returns mean, median, std, min, max, and 95% CI for CPU/RAM/Time/Test improvements.
        Improvements are in percentage points for CPU/RAM/Time and percent change for test rate.
        """
        if not improvements:
            return {}
        
        cpu_imp = [i["cpu_improvement"] for i in improvements]
        ram_imp = [i["ram_improvement"] for i in improvements]
        time_imp = [i["time_improvement"] for i in improvements]
        test_imp = [i["test_improvement"] for i in improvements]
        n = len(improvements)
        def ci95(values: List[float]) -> float:
            if n <= 1:
                return 0.0
            s = np.std(values, ddof=1)
            t_crit = 1.96 if n > 30 else 2.0
            return t_crit * (s / np.sqrt(n))
        
        return {
            "count": len(improvements),
            "cpu_improvement_mean": np.mean(cpu_imp),
            "cpu_improvement_median": float(np.median(cpu_imp)),
            "cpu_improvement_min": np.min(cpu_imp),
            "cpu_improvement_max": np.max(cpu_imp),
            "cpu_improvement_std": float(np.std(cpu_imp, ddof=1)) if n > 1 else 0.0,
            "cpu_improvement_ci95": ci95(cpu_imp),
            "ram_improvement_mean": np.mean(ram_imp),
            "ram_improvement_median": float(np.median(ram_imp)),
            "ram_improvement_min": np.min(ram_imp),
            "ram_improvement_max": np.max(ram_imp),
            "ram_improvement_std": float(np.std(ram_imp, ddof=1)) if n > 1 else 0.0,
            "ram_improvement_ci95": ci95(ram_imp),
            "time_improvement_mean": np.mean(time_imp),
            "time_improvement_median": float(np.median(time_imp)),
            "time_improvement_min": np.min(time_imp),
            "time_improvement_max": np.max(time_imp),
            "time_improvement_std": float(np.std(time_imp, ddof=1)) if n > 1 else 0.0,
            "time_improvement_ci95": ci95(time_imp),
            "test_improvement_mean": np.mean(test_imp),
            "test_improvement_median": float(np.median(test_imp)),
            "test_improvement_min": np.min(test_imp),
            "test_improvement_max": np.max(test_imp),
            "test_improvement_std": float(np.std(test_imp, ddof=1)) if n > 1 else 0.0,
            "test_improvement_ci95": ci95(test_imp),
        }

    def create_base_statistics_plots(self) -> None:
        """Create plots for base code statistics."""
        if not self.base_statistics:
            return
        
        # Overall base statistics
        if "overall" in self.base_statistics:
            overall = self.base_statistics["overall"]
            
            fig, axes = plt.subplots(1, 3, figsize=(15, 5))
            metrics = ["cpu_mean", "ram_mean", "time_mean"]
            titles = ["CPU Usage (Mean)", "RAM Usage (Mean)", "Execution Time (Mean)"]
            colors = ['#1f77b4', '#ff7f0e', '#2ca02c']
            
            for i, (metric, title, color) in enumerate(zip(metrics, titles, colors)):
                axes[i].bar(["Base Code"], [overall[metric]], color=color, alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                axes[i].text(0, overall[metric] * 1.01, f'{overall[metric]:.1f}', 
                           ha='center', va='bottom', fontweight='bold')
            
            plt.suptitle("Base Code Performance Metrics", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "01_base_overall_metrics.png", dpi=300, bbox_inches='tight')
            plt.close()
        
        # Base statistics by language
        if "by_language" in self.base_statistics:
            languages = list(self.base_statistics["by_language"].keys())
            metrics = ["cpu_mean", "ram_mean", "time_mean"]
            titles = ["CPU Usage by Language", "RAM Usage by Language", "Execution Time by Language"]
            
            fig, axes = plt.subplots(1, 3, figsize=(18, 6))
            
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                values = [self.base_statistics["by_language"][lang][metric] for lang in languages]
                bars = axes[i].bar(languages, values, alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                axes[i].tick_params(axis='x', rotation=45)
                
                # Add value labels
                for bar, value in zip(bars, values):
                    height = bar.get_height()
                    axes[i].text(bar.get_x() + bar.get_width()/2., height * 1.01,
                               f'{value:.1f}', ha='center', va='bottom', fontsize=9)
            
            plt.suptitle("Base Code Performance by Programming Language", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "02_base_by_language.png", dpi=300, bbox_inches='tight')
            plt.close()

        # Base min/max overall
        if "overall" in self.base_statistics:
            overall = self.base_statistics["overall"]
            labels = ["CPU", "RAM", "Time"]
            mins = [overall["cpu_min"], overall["ram_min"], overall["time_min"]]
            maxs = [overall["cpu_max"], overall["ram_max"], overall["time_max"]]
            x = np.arange(len(labels))
            width = 0.35
            fig, ax = plt.subplots(figsize=(10, 6))
            ax.bar(x - width/2, mins, width, label='Min')
            ax.bar(x + width/2, maxs, width, label='Max')
            ax.set_xticks(x)
            ax.set_xticklabels(labels)
            ax.set_title('Base Code Min/Max Metrics')
            ax.legend()
            plt.tight_layout()
            plt.savefig(self.reports_dir / "02b_base_overall_min_max.png", dpi=300, bbox_inches='tight')
            plt.close()

        # Base min/max by language
        if "by_language" in self.base_statistics and self.base_statistics["by_language"]:
            languages = list(self.base_statistics["by_language"].keys())
            fig, axes = plt.subplots(1, 3, figsize=(18, 6))
            for i, (metric_min, metric_max, title) in enumerate([
                ("cpu_min", "cpu_max", "CPU Min/Max by Language"),
                ("ram_min", "ram_max", "RAM Min/Max by Language"),
                ("time_min", "time_max", "Time Min/Max by Language"),
            ]):
                mins = [self.base_statistics["by_language"][lang][metric_min] for lang in languages]
                maxs = [self.base_statistics["by_language"][lang][metric_max] for lang in languages]
                x = np.arange(len(languages))
                width = 0.35
                axes[i].bar(x - width/2, mins, width, label='Min')
                axes[i].bar(x + width/2, maxs, width, label='Max')
                axes[i].set_xticks(x)
                axes[i].set_xticklabels(languages, rotation=45)
                axes[i].set_title(title)
                axes[i].legend()
            plt.tight_layout()
            plt.savefig(self.reports_dir / "02c_base_by_language_min_max.png", dpi=300, bbox_inches='tight')
            plt.close()

    def create_llm_statistics_plots(self) -> None:
        """Create plots for LLM statistics."""
        if not self.llm_statistics:
            return
        
        # Overall LLM statistics
        if "overall" in self.llm_statistics:
            overall = self.llm_statistics["overall"]
            fig, axes = plt.subplots(2, 2, figsize=(15, 10))
            axes = axes.flatten()
            metrics = ["cpu_mean", "ram_mean", "time_mean", "test_pass_rate"]
            titles = ["CPU Usage (Mean)", "RAM Usage (Mean)", "Execution Time (Mean)", "Test Pass Rate"]
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                axes[i].bar(["LLM Code"], [overall[metric]], alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                axes[i].text(0, overall[metric] * 1.01, f'{overall[metric]:.1f}', 
                           ha='center', va='bottom', fontweight='bold')
            plt.suptitle("LLM-Generated Code Overall Metrics", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "03a_llm_overall_metrics.png", dpi=300, bbox_inches='tight')
            plt.close()

        # LLM statistics by language
        if "by_language" in self.llm_statistics and self.llm_statistics["by_language"]:
            languages = list(self.llm_statistics["by_language"].keys())
            metrics = ["cpu_mean", "ram_mean", "time_mean", "test_pass_rate"]
            titles = ["CPU Usage by Language", "RAM Usage by Language", "Execution Time by Language", "Test Pass Rate by Language"]
            fig, axes = plt.subplots(2, 2, figsize=(18, 10))
            axes = axes.flatten()
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                values = [self.llm_statistics["by_language"][lang][metric] for lang in languages]
                bars = axes[i].bar(languages, values, alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                axes[i].tick_params(axis='x', rotation=45)
                for bar, value in zip(bars, values):
                    height = bar.get_height()
                    axes[i].text(bar.get_x() + bar.get_width()/2., height * 1.01, f'{value:.1f}', ha='center', va='bottom', fontsize=9)
            plt.suptitle("LLM-Generated Code Performance by Language", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "03b_llm_by_language.png", dpi=300, bbox_inches='tight')
            plt.close()

        # LLM statistics by model
        if "by_model" in self.llm_statistics:
            models = list(self.llm_statistics["by_model"].keys())
            metrics = ["cpu_mean", "ram_mean", "time_mean", "test_pass_rate"]
            titles = ["CPU Usage by Model", "RAM Usage by Model", "Execution Time by Model", "Test Pass Rate by Model"]
            
            fig, axes = plt.subplots(2, 2, figsize=(15, 10))
            axes = axes.flatten()
            
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                values = [self.llm_statistics["by_model"][model][metric] for model in models]
                bars = axes[i].bar(models, values, alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                
                # Add value labels
                for bar, value in zip(bars, values):
                    height = bar.get_height()
                    axes[i].text(bar.get_x() + bar.get_width()/2., height * 1.01,
                               f'{value:.1f}', ha='center', va='bottom', fontsize=9)
            
            plt.suptitle("LLM-Generated Code Performance by Model", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "03_llm_by_model.png", dpi=300, bbox_inches='tight')
            plt.close()
        
        # LLM statistics by prompt version
        if "by_prompt_version" in self.llm_statistics:
            prompt_versions = sorted(self.llm_statistics["by_prompt_version"].keys())
            metrics = ["cpu_mean", "ram_mean", "time_mean", "test_pass_rate"]
            titles = ["CPU Usage by Prompt Version", "RAM Usage by Prompt Version", 
                     "Execution Time by Prompt Version", "Test Pass Rate by Prompt Version"]
            
            fig, axes = plt.subplots(2, 2, figsize=(15, 10))
            axes = axes.flatten()
            
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                values = [self.llm_statistics["by_prompt_version"][pv][metric] for pv in prompt_versions]
                bars = axes[i].bar(prompt_versions, values, alpha=0.7)
                axes[i].set_title(title)
                axes[i].set_ylabel("Value")
                
                # Add value labels
                for bar, value in zip(bars, values):
                    height = bar.get_height()
                    axes[i].text(bar.get_x() + bar.get_width()/2., height * 1.01,
                               f'{value:.1f}', ha='center', va='bottom', fontsize=9)
            
            plt.suptitle("LLM-Generated Code Performance by Prompt Version", fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / "04_llm_by_prompt_version.png", dpi=300, bbox_inches='tight')
            plt.close()

        # Multi-dimensional LLM performance heatmaps
        all_llm_entries = []
        for cluster_data in self.llm_data.values():
            all_llm_entries.extend(cluster_data.values())
        if all_llm_entries:
            df = pd.DataFrame(all_llm_entries)
            for metric, title, fname in [
                ("cpu_mean", "CPU Mean", "04b_llm_heatmap_model_language_cpu.png"),
                ("ram_mean", "RAM Mean", "04c_llm_heatmap_model_language_ram.png"),
                ("time_mean", "Time Mean", "04d_llm_heatmap_model_language_time.png"),
            ]:
                pivot = df.pivot_table(values=metric, index='language', columns='llm_type', aggfunc='mean')
                plt.figure(figsize=(10, 6))
                sns.heatmap(pivot, annot=True, fmt='.1f', cmap='Blues')
                plt.title(f'LLM Performance Heatmap (Model vs Language) - {title}\nValues are per-entry means (5 runs).')
                plt.tight_layout()
                plt.savefig(self.reports_dir / fname, dpi=300, bbox_inches='tight')
                plt.close()
            for metric, title, fname in [
                ("cpu_mean", "CPU Mean", "04e_llm_heatmap_model_prompt_cpu.png"),
                ("ram_mean", "RAM Mean", "04f_llm_heatmap_model_prompt_ram.png"),
                ("time_mean", "Time Mean", "04g_llm_heatmap_model_prompt_time.png"),
            ]:
                dfp = df.copy()
                dfp['prompt_v'] = 'v' + dfp['prompt_version'].astype(str)
                pivot = dfp.pivot_table(values=metric, index='prompt_v', columns='llm_type', aggfunc='mean')
                plt.figure(figsize=(10, 6))
                sns.heatmap(pivot, annot=True, fmt='.1f', cmap='Blues')
                plt.title(f'LLM Performance Heatmap (Model vs Prompt) - {title}\nValues are per-entry means (5 runs).')
                plt.tight_layout()
                plt.savefig(self.reports_dir / fname, dpi=300, bbox_inches='tight')
                plt.close()

    def create_improvement_plots(self) -> None:
        """Create comprehensive improvement visualization plots."""
        if not self.improvement_statistics:
            return
        
        # Overall improvements
        if "overall" in self.improvement_statistics:
            overall = self.improvement_statistics["overall"]
            
            # Create one plot per metric with formula annotations
            metric_map = [
                ("cpu_improvement_mean", "CPU Usage", "Lower is better: ((B-L)/B)*100"),
                ("ram_improvement_mean", "RAM Usage", "Lower is better: ((B-L)/B)*100"),
                ("time_improvement_mean", "Execution Time", "Lower is better: ((B-L)/B)*100"),
                ("test_improvement_mean", "Test Pass Rate", "Higher is better: ((rL-rB)/rB)*100; rB=0 -> (rL-rB)*100"),
            ]
            for key, title, formula in metric_map:
                fig, ax = plt.subplots(1, 1, figsize=(8, 5))
                value = overall.get(key, 0.0)
                color = 'green' if value > 0 else 'red'
                bars = ax.bar([title], [value], color=color, alpha=0.7)
                ax.set_title(f"Overall Improvement: {title}")
                ax.set_ylabel("Improvement (%)")
                ax.axhline(y=0, color='black', linestyle='-', alpha=0.3)
                ax.grid(True, alpha=0.3)
                height = bars[0].get_height()
                ax.text(bars[0].get_x() + bars[0].get_width()/2., height * 1.01 if height >= 0 else height * 0.99,
                        f'{value:+.2f}%', ha='center', va='bottom' if height >= 0 else 'top', fontweight='bold')
                ax.text(0.02, 0.98, f"Formula: {formula}\nUnits: per-entry means (5 runs)",
                        transform=ax.transAxes, verticalalignment='top', fontsize=9,
                        bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
                plt.tight_layout()
                outname = f"05_overall_improvement_{key.replace('_mean','')}.png"
                plt.savefig(self.reports_dir / outname, dpi=300, bbox_inches='tight')
                plt.close()
        
        # Improvements by model (one chart per metric)
        self._create_improvement_category_plot("by_model", "Model", "06_improvements_by_model")
        
        # Improvements by language (one chart per metric)
        self._create_improvement_category_plot("by_language", "Language", "07_improvements_by_language")
        
        # Improvements by prompt version (one chart per metric)
        self._create_improvement_category_plot("by_prompt_version", "Prompt Version", "08_improvements_by_prompt_version")

        # Improvements by model+language
        self._create_improvement_category_plot("by_model_language", "Model + Language", "08b_improvements_by_model_language.png")
        # Improvements by model+prompt
        self._create_improvement_category_plot("by_model_prompt", "Model + Prompt", "08c_improvements_by_model_prompt.png")
        # Improvements by language+prompt
        self._create_improvement_category_plot("by_language_prompt", "Language + Prompt", "08d_improvements_by_language_prompt.png")
        # Improvements by prompt version (averaged across models)
        self._create_improvement_category_plot("by_prompt_version_avg_models", "Prompt Version (Avg across Models)", "08f_improvements_by_prompt_version_avg_models.png")
        # Improvements by model+language+prompt
        self._create_improvement_category_plot("by_model_language_prompt", "Model + Language + Prompt", "08e_improvements_by_model_language_prompt.png")

    def _create_improvement_category_plot(self, category_key: str, category_name: str, filename_prefix: str) -> None:
        """Create improvement plots for a specific category."""
        if category_key not in self.improvement_statistics:
            return
        
        category_data = self.improvement_statistics[category_key]
        categories = list(category_data.keys())
        
        if not categories:
            return
        
        metric_info = [
            ("cpu_improvement_mean", "CPU Improvement", "Lower is better: ((B-L)/B)*100"),
            ("ram_improvement_mean", "RAM Improvement", "Lower is better: ((B-L)/B)*100"),
            ("time_improvement_mean", "Time Improvement", "Lower is better: ((B-L)/B)*100"),
        ]
        for metric, title, formula in metric_info:
            values = [category_data[cat][metric] for cat in categories]
            colors = ['green' if v > 0 else 'red' for v in values]
            fig, ax = plt.subplots(1, 1, figsize=(18, 6))
            bars = ax.bar(categories, values, color=colors, alpha=0.7)
            ax.set_title(f'{title} by {category_name} (%)')
            ax.set_ylabel('Improvement (%)')
            ax.axhline(y=0, color='black', linestyle='-', alpha=0.3)
            ax.grid(True, alpha=0.3)
            ax.tick_params(axis='x', rotation=45)
            for bar, value in zip(bars, values):
                height = bar.get_height()
                ax.text(bar.get_x() + bar.get_width()/2., height * 1.01 if height >= 0 else height * 0.99,
                        f'{value:+.2f}%', ha='center', va='bottom' if height >= 0 else 'top', fontweight='bold')
            ax.text(0.02, 0.98, f"Formula: {formula}\nUnits: per-entry means (5 runs)",
                    transform=ax.transAxes, verticalalignment='top', fontsize=9,
                    bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
            plt.tight_layout()
            outname = f"{filename_prefix}_{metric}.png"
            plt.savefig(self.reports_dir / outname, dpi=300, bbox_inches='tight')
            plt.close()

    def create_comparison_plots(self) -> None:
        """Create comparison plots between base and LLM performance."""
        if not self.base_statistics or not self.llm_statistics:
            return
        
        base_overall = self.base_statistics.get("overall", {})
        llm_overall = self.llm_statistics.get("overall", {})
        
        if not base_overall or not llm_overall:
            return
        
        # Overall comparison
        fig, axes = plt.subplots(1, 3, figsize=(18, 6))
        
        metrics = ["cpu_mean", "ram_mean", "time_mean"]
        titles = ["CPU Usage Comparison", "RAM Usage Comparison", "Execution Time Comparison"]
        colors = ['#1f77b4', '#ff7f0e']
        
        for i, (metric, title) in enumerate(zip(metrics, titles)):
            categories = ['Base Code', 'LLM Code']
            values = [base_overall[metric], llm_overall[metric]]
            
            bars = axes[i].bar(categories, values, color=colors, alpha=0.7)
            axes[i].set_title(title)
            axes[i].set_ylabel('Value')
            
            # Add value labels
            for bar, value in zip(bars, values):
                height = bar.get_height()
                axes[i].text(bar.get_x() + bar.get_width()/2., height * 1.01,
                           f'{value:.1f}', ha='center', va='bottom', fontweight='bold')
            
            # Calculate and show improvement percentage
            improvement = self.calculate_improvement(base_overall[metric], llm_overall[metric])
            color = 'green' if improvement > 0 else 'red'
            axes[i].text(0.5, 0.95, f'Improvement: {improvement:+.1f}%', 
                        transform=axes[i].transAxes, ha='center', va='top',
                        bbox=dict(boxstyle='round', facecolor=color, alpha=0.3),
                        fontweight='bold')
        
        plt.suptitle('Base Code vs LLM-Generated Code Performance', fontsize=16, fontweight='bold')
        plt.tight_layout()
        plt.savefig(self.reports_dir / '09_base_vs_llm_comparison.png', dpi=300, bbox_inches='tight')
        plt.close()

    def create_heatmaps(self) -> None:
        """Create heatmaps for multi-dimensional analysis."""
        # Prepare data for heatmap
        all_improvements = []
        for cluster_improvements in self.individual_improvements.values():
            all_improvements.extend(cluster_improvements)
        
        if not all_improvements:
            return
        
        df = pd.DataFrame(all_improvements)
        
        # Create heatmap: Model vs Language
        if len(df) > 0:
            metrics = ['cpu_improvement', 'ram_improvement', 'time_improvement']
            titles = ['CPU Improvement (%)', 'RAM Improvement (%)', 'Time Improvement (%)']
            
            fig, axes = plt.subplots(1, 3, figsize=(20, 6))
            
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                pivot_table = df.pivot_table(values=metric, index='language', columns='llm_type', aggfunc='mean')
                
                sns.heatmap(pivot_table, annot=True, fmt='.1f', cmap='RdYlGn', center=0,
                           ax=axes[i], cbar_kws={'label': 'Improvement (%)'})
                axes[i].set_title(title)
                axes[i].set_xlabel('Model')
                axes[i].set_ylabel('Language')
            
            plt.suptitle('Performance Improvements Heatmap: Model vs Language', fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / '10_improvement_heatmap_model_language.png', dpi=300, bbox_inches='tight')
            plt.close()
            
            # Create heatmap: Model vs Prompt Version
            fig, axes = plt.subplots(1, 3, figsize=(20, 6))
            
            for i, (metric, title) in enumerate(zip(metrics, titles)):
                df_prompt = df.copy()
                df_prompt['prompt_v'] = 'v' + df_prompt['prompt_version'].astype(str)
                pivot_table = df_prompt.pivot_table(values=metric, index='prompt_v', columns='llm_type', aggfunc='mean')
                
                sns.heatmap(pivot_table, annot=True, fmt='.1f', cmap='RdYlGn', center=0,
                           ax=axes[i], cbar_kws={'label': 'Improvement (%)'})
                axes[i].set_title(title)
                axes[i].set_xlabel('Model')
                axes[i].set_ylabel('Prompt Version')
            
            plt.suptitle('Performance Improvements Heatmap: Model vs Prompt Version', fontsize=16, fontweight='bold')
            plt.tight_layout()
            plt.savefig(self.reports_dir / '11_improvement_heatmap_model_prompt.png', dpi=300, bbox_inches='tight')
            plt.close()

    def save_all_results(self) -> None:
        """Save all results to JSON files."""
        def convert_numpy(obj):
            """Convert numpy types to Python native types."""
            if isinstance(obj, np.integer):
                return int(obj)
            elif isinstance(obj, np.floating):
                return float(obj)
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            elif isinstance(obj, dict):
                return {key: convert_numpy(value) for key, value in obj.items()}
            elif isinstance(obj, list):
                return [convert_numpy(item) for item in obj]
            return obj
        
        results = {
            "base_data": self.base_data,
            "llm_data": self.llm_data,
            "base_statistics": self.base_statistics,
            "llm_statistics": self.llm_statistics,
            "improvement_statistics": self.improvement_statistics,
            "individual_improvements": self.individual_improvements,
            "aggregated_improvements": self.aggregated_improvements,
            "aggregated_improvements_by_prompt": self.aggregated_improvements_by_prompt
        }
        
        results = convert_numpy(results)
        
        # Save complete results
        with open(self.reports_dir / 'complete_analysis_results.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Save summary statistics separately
        summary = {
            "base_statistics": self.base_statistics,
            "llm_statistics": self.llm_statistics,
            "improvement_statistics": self.improvement_statistics
        }
        
        with open(self.reports_dir / 'summary_statistics.json', 'w') as f:
            json.dump(convert_numpy(summary), f, indent=2)
        
        logger.info(f"All results saved to {self.reports_dir}")

    def run_complete_analysis(self) -> None:
        """Run the complete performance analysis."""
        cluster_files = self.get_cluster_files()
        total_clusters = len(cluster_files)
        
        logger.info(f"Starting analysis of {total_clusters} cluster files...")
        
        # Process all clusters
        for i, cluster_path in enumerate(cluster_files):
            cluster_name = cluster_path.stem.replace("cluster_", "").replace(".json", "")
            logger.info(f"Processing cluster: {cluster_name} ({i+1}/{total_clusters} | {(i+1) / total_clusters * 100:.1f}%)")
            
            try:
                combined = self.calculate_base_LLM_metrics(cluster_name)
                self.base_data[cluster_name] = combined["base"]
                self.llm_data[cluster_name] = combined["llm"]
                logger.info(f"Cluster {cluster_name}: {len(combined['base'])} base entries, {len(combined['llm'])} LLM entries")
                
            except Exception as e:
                logger.error(f"Error processing cluster {cluster_name}: {e}")
                continue
        
        # Calculate all statistics
        logger.info("Calculating statistics...")
        self.base_statistics = self.calculate_base_statistics()
        self.llm_statistics = self.calculate_llm_statistics()
        
        # Calculate improvements
        logger.info("Calculating improvements...")
        self.individual_improvements = self.calculate_individual_improvements()
        self.aggregated_improvements = self.calculate_aggregated_improvements()
        self.aggregated_improvements_by_prompt = self.calculate_aggregated_improvements_by_prompt()
        self.improvement_statistics = self.calculate_improvement_statistics()
        
        # Create visualizations
        logger.info("Creating visualizations...")
        self.create_base_statistics_plots()
        self.create_llm_statistics_plots()
        self.create_improvement_plots()
        self.create_comparison_plots()
        self.create_heatmaps()
        
        # Save all results
        logger.info("Saving results...")
        self.save_all_results()
        
        # Print summary
        self.print_analysis_summary()
        
        logger.info(f"Analysis complete! All results and visualizations saved to {self.reports_dir}")

    def print_analysis_summary(self) -> None:
        """Print a comprehensive summary of the analysis results."""
        print("\n" + "="*100)
        print("COMPREHENSIVE PERFORMANCE ANALYSIS SUMMARY")
        print("="*100)
        
        # Base code summary
        if self.base_statistics.get("overall"):
            base_overall = self.base_statistics["overall"]
            print("\nBASE CODE STATISTICS:")
            print(f"  Total entries analyzed: {base_overall['count']}")
            print(f"  Average CPU usage: {base_overall['cpu_mean']:.2f}")
            print(f"  Average RAM usage: {base_overall['ram_mean']:.2f}")
            print(f"  Average execution time: {base_overall['time_mean']:.2f} ms")
            print(f"  Average test pass rate: {base_overall['test_pass_rate']:.1%}")
        
        # LLM code summary
        if self.llm_statistics.get("overall"):
            llm_overall = self.llm_statistics["overall"]
            print("\nLLM-GENERATED CODE STATISTICS:")
            print(f"  Total entries analyzed: {llm_overall['count']}")
            print(f"  Average CPU usage: {llm_overall['cpu_mean']:.2f}")
            print(f"  Average RAM usage: {llm_overall['ram_mean']:.2f}")
            print(f"  Average execution time: {llm_overall['time_mean']:.2f} ms")
            print(f"  Average test pass rate: {llm_overall['test_pass_rate']:.1%}")
        
        # Overall improvements summary
        if self.improvement_statistics.get("overall"):
            imp_overall = self.improvement_statistics["overall"]
            print("\nOVERALL PERFORMANCE IMPROVEMENTS (LLM vs Base):")
            print(f"  CPU Usage improvement: {imp_overall['cpu_improvement_mean']:+.1f}% {'✓' if imp_overall['cpu_improvement_mean'] > 0 else '✗'}")
            print(f"  RAM Usage improvement: {imp_overall['ram_improvement_mean']:+.1f}% {'✓' if imp_overall['ram_improvement_mean'] > 0 else '✗'}")
            print(f"  Execution Time improvement: {imp_overall['time_improvement_mean']:+.1f}% {'✓' if imp_overall['time_improvement_mean'] > 0 else '✗'}")
            print(f"  Test Pass Rate improvement: {imp_overall['test_improvement_mean']:+.3f} {'✓' if imp_overall['test_improvement_mean'] > 0 else '✗'}")
        
        # Best performing models
        if self.improvement_statistics.get("by_model"):
            print("\nBEST PERFORMING MODELS:")
            model_scores = {}
            for model, stats in self.improvement_statistics["by_model"].items():
                # Calculate composite score (average of CPU, RAM, and Time improvements)
                composite = (stats["cpu_improvement_mean"] + stats["ram_improvement_mean"] + stats["time_improvement_mean"]) / 3
                model_scores[model] = composite
            
            sorted_models = sorted(model_scores.items(), key=lambda x: x[1], reverse=True)
            for i, (model, score) in enumerate(sorted_models, 1):
                print(f"  {i}. {model.upper()}: {score:+.1f}% average improvement")
        
        # Best performing languages
        if self.improvement_statistics.get("by_language"):
            print("\nBEST PERFORMING LANGUAGES:")
            lang_scores = {}
            for lang, stats in self.improvement_statistics["by_language"].items():
                # Calculate composite score (average of CPU, RAM, and Time improvements)
                composite = (stats["cpu_improvement_mean"] + stats["ram_improvement_mean"] + stats["time_improvement_mean"]) / 3
                lang_scores[lang] = composite
            
            sorted_langs = sorted(lang_scores.items(), key=lambda x: x[1], reverse=True)
            for i, (lang, score) in enumerate(sorted_langs, 1):
                print(f"  {i}. {lang}: {score:+.1f}% average improvement")
        
        # Data overview
        total_base_entries = sum(len(cluster_data) for cluster_data in self.base_data.values())
        total_llm_entries = sum(len(cluster_data) for cluster_data in self.llm_data.values())
        total_clusters = len(self.base_data)
        
        print("\nDATA OVERVIEW:")
        print(f"  Clusters processed: {total_clusters}")
        print(f"  Base code entries: {total_base_entries}")
        print(f"  LLM-generated entries: {total_llm_entries}")
        print(f"  Total comparisons made: {sum(len(imp) for imp in self.individual_improvements.values())}")
        
        print("\nREPORTS AND VISUALIZATIONS:")
        print("  Location: {self.reports_dir}")
        print("  Generated files:")
        for i, filename in enumerate(sorted(self.reports_dir.glob("*.png")), 1):
            print(f"    {i:2d}. {filename.name}")
        
        print("="*100)
        print("INTERPRETATION GUIDE:")
        print("  • Positive improvement % = Better performance (reduced resource usage)")
        print("  • Negative improvement % = Worse performance (increased resource usage)")
        print("  • Green bars/values = Improvements, Red bars/values = Degradations")
        print("="*100)


if __name__ == "__main__":
    analyzer = ImprovedPerformanceAnalyzer()
    analyzer.run_complete_analysis()