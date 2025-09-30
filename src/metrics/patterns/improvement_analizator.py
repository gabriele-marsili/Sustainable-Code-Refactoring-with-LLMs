#!/usr/bin/env python3
import os
import sys
import json
import logging
from pathlib import Path
from typing import Dict, List, Optional
import numpy as np

# Add project root utils
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]

def _read_json(p: Path) -> Dict:
    try:
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.warning(f"Failed to read {p}: {e}")
        return {}


def _median(values: List[Optional[float]]) -> Optional[float]:
    vals = [v for v in values if v is not None and np.isfinite(v)]
    if not vals:
        return None
    return float(np.median(vals))


class ImprovementAnalyer:
    """Class to analyze metrics improvements :
    1) extract clusters -> cluster names
    2) calculate similarity mean for each cluster and selects only those with similarity means <= similarity threshold
    3) calclulate improvement mean for each cluster and selects only those with improvement means >= improvement threshold
        3.1 ) cluster improvment mean = mean of improvements
            -> i) calculate mean for each metrics for base snippet (entry) on 5 runs (id <--> mean[metric] )
            -> ii)

    """

    def __init__(self):
        self.report_dir = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "report_v4"
        self.report_dir.mkdir(parents=True, exist_ok=True)

        self.PATH_PATTERN_COUNTS = self.report_dir / "pattern_counts.png"
        self.PATH_PATTERN_CORR = self.report_dir / "pattern_performance_correlation.png"
        self.PATH_SIM_VS_IMPR = self.report_dir / "similarity_vs_improvement.png"

    def calculate_exec_metrics_avg_base_cluster(self, cluster_name):
        """Calcola un report con id = (entryID, metricM) e value = media su 5 esec per la metrica M"""
        report = {  # (entryId, metric) : avg
        }
        m_quantity = {}

        for exec_num in range(1, 6):  # 5 exec
            cluster_path = (
                utility_paths.OUTPUT_DIR_FILEPATH
                / f"{cluster_name}_results_{exec_num}.json"
            )

            cluster_content = _read_json(cluster_path)
            # print(f"cluster_content:\n{cluster_content}")

            for _lang, entries in cluster_content["results"].items():
                for entry in entries:  # update avg
                    # print(f"entry:\n{entry}")
                    e_id = entry["id"]
                    # somma

                    for m in METRICS:
                        if m in entry and entry[m] is not None:
                            report[f"{e_id},{m}"] = (
                                report.get(f"{e_id},{m}", 0) + entry[m]
                            )
                            report[f"{e_id},{m}"] = (
                                report.get(f"{e_id},{m}", 0) + entry[m]
                            )
                            report[f"{e_id},{m}"] = (
                                report.get(f"{e_id},{m}", 0) + entry[m]
                            )

                            m_quantity[f"{e_id},{m}"] = (
                                m_quantity.get(f"{e_id},{m}", 0) + 1
                            )
                            m_quantity[f"{e_id},{m}"] = (
                                m_quantity.get(f"{e_id},{m}", 0) + 1
                            )
                            m_quantity[f"{e_id},{m}"] = (
                                m_quantity.get(f"{e_id},{m}", 0) + 1
                            )

                    # media :
                    if exec_num == 5:
                        for m in METRICS:
                            if m in report and m in m_quantity:
                                report[f"{e_id},{m}"] = (
                                    report[f"{e_id},{m}"] / m_quantity[f"{e_id},{m}"]
                                )
                                report[f"{e_id},{m}"] = (
                                    report[f"{e_id},{m}"] / m_quantity[f"{e_id},{m}"]
                                )
                                report[f"{e_id},{m}"] = (
                                    report[f"{e_id},{m}"] / m_quantity[f"{e_id},{m}"]
                                )

        return report

    def calculate_base_cluster_mean_report(self, cluster_name):
        """Calcola mean bC,M : report con (cluster_name, metricM) come id e valore = media sull'intero cluster per la metrica M"""
        report = {}
        metrics_quantity = {}
        for m in METRICS:
            metrics_quantity[m] = 0

        avg_single_entry_report = self.calculate_exec_metrics_avg_base_cluster(
            cluster_name
        )
        keys = avg_single_entry_report.keys()

        for key in keys:
            avg = avg_single_entry_report[key]  # mean (M, e_id)
            key = str(key)
            # print(f"key = {key}")
            parts = key.split(",")
            # e_id = parts[0]
            metric_M = parts[1]

            # sum dell'avg su 5 run per la metrica M
            report[metric_M] = report.get(metric_M, 0) + avg

            metrics_quantity[metric_M] += 1

        for metric_M in report.keys():  # calculate avg per ogni metrica nel cluster
            report[metric_M] = report[metric_M] / metrics_quantity[metric_M]

        return report

    def calculate_exec_metrics_avg_llm_cluster(self, cluster_name):
        """Calcola un report con id = (metricM, entryID, model, prompV) e value = media su 5 esec per la metrica M su eID+model+prompV"""
        report = {  # (entryId, metric) : avg
        }

        m_quantity = {}

        for exec_num in range(1, 6):
            for prompt_v in range(1, 5):
                cluster_path = (
                    utility_paths.OUTPUT_DIR_FILEPATH
                    / f"{cluster_name}_results_v{prompt_v}_{exec_num}.json"
                )

                cluster_content = _read_json(cluster_path)

                for _lang, entries in cluster_content["results"].items():
                    for entry in entries:
                        e_id = entry["id"]
                        # print(f"entry\n{entry}")
                        if "LLM_results" not in entry:
                            continue

                        llm_res = entry["LLM_results"]

                        for llm_entry in llm_res:
                            model = llm_entry["LLM_type"]

                            # somma :
                            for m in METRICS:
                                id = f"{m},{e_id},{model},{prompt_v}"
                                if not llm_entry[m]:
                                    continue
                                # print(f"llm_entry:\n{llm_entry}\nm = {m} | llm_entry[m] = {llm_entry[m]}\nreport.get(id, 0) = {report.get(id, 0)}")
                                report[id] = report.get(id, 0) + llm_entry[m]
                                m_quantity[id] = m_quantity.get(id, 0) + 1

                            # media
                            if exec_num == 5:
                                for m in METRICS:
                                    id = f"{m},{e_id},{model},{prompt_v}"
                                    assert id != ""
                                    if id in report and id in m_quantity:
                                        report[id] = report[id] / m_quantity[id]

        return report

    def calculate_mean_entry_llm(self, cluster_name):
        """Calcola llm mean [M, e_id] come 1/12 * sommatoria_model+promptV(llm mean[M] e_id,model,promptV)
        ossia calcola la media per entry (indipendente da model+promptV)"""

        report = {}

        r_quantity = {}

        avg_single_entry_LLM_report = self.calculate_exec_metrics_avg_llm_cluster(
            cluster_name
        )

        keys = avg_single_entry_LLM_report.keys()
        for key in keys:
            avg = avg_single_entry_LLM_report[key]

            parts = str(key).split(",")
            metric_M = parts[0]
            e_id = parts[1]
            # model = parts[2]
            # prompt_v = parts[3]

            report_id = f"{e_id},{metric_M}"

            report[report_id] = report.get(report_id, 0) + avg

            r_quantity[report_id] = (
                r_quantity.get(report_id, 0) + 1
            )  # must be 12 at the end

        for report_id in report.keys():  # media (per entry per metrica):
            quantity = r_quantity[report_id]
            # print(f"quantity = {quantity}")

            report[report_id] = report[report_id] / quantity

        return report

    def calculate_llm_cluster_mean_report(self, cluster_name):
        """Calcola media cluster LLM per ogni metrica M come : 1/#entries * sommatoria[e_id] (llm mean [M, e_id])"""

        report = {}
        metrics_quantity = {}
        for m in METRICS:
            metrics_quantity[m] = 0

        avg_single_entry_report = self.calculate_mean_entry_llm(cluster_name)
        keys = avg_single_entry_report.keys()

        for key in keys:
            avg = avg_single_entry_report[key]
            parts = str(key).split(",")
            metric_M = parts[1]

            # sum dell'avg per metrica M (per entries):
            report[metric_M] = report.get(metric_M, 0) + avg

            metrics_quantity[metric_M] += 1  # quantità di entries per metrica M

        for metric_M in report.keys():  # calculate avg per ogni metrica nel cluster
            report[metric_M] = report[metric_M] / metrics_quantity[metric_M]

        return report

    def calculate_metric_improvements_report(self, cluster_name):
        """Calcola improvement(C,M) con C = cluster M = metrica, ossia calcola il miglioramento % per ogni metrica tra base code e LLM code dato un cluster C"""

        report = {}

        cluster_base_avgs = self.calculate_base_cluster_mean_report(cluster_name)
        cluster_llm_avgs = self.calculate_llm_cluster_mean_report(cluster_name)

        # fallback per i cluster problematici dove 5 esec hanno 0 risultati :
        for m in METRICS:
            if m not in cluster_base_avgs and m in cluster_llm_avgs:
                cluster_base_avgs[m] = cluster_llm_avgs[m]

        try:
            for m in METRICS:
                report[m] = (
                    (cluster_base_avgs[m] - cluster_llm_avgs[m])
                    / cluster_base_avgs[m]
                    * 100
                )
        except Exception as e:
            print(f"cluster_base_avgs:\n{cluster_base_avgs}")
            print(f"cluster_llm_avgs:\n{cluster_llm_avgs}")
            print(f"Exeption:\n{e}")

        return report

    def calculate_overall_mean_cluster_improvement(self, cluster_name):
        """Calcola l'improvement medio per un cluster C come media degli improvements per metrica sul cluster C"""

        (metric_cluster_report, prompt_v_report, model_report) = self.calculate_improvements_means_for_cluster(
            cluster_name
        )
        s = 0
        # print(f"improvements_for_metrics:\n{improvements_for_metrics}")
        for m in METRICS:
            s += metric_cluster_report[m]['mean']

        return {
            "cluster name": cluster_name,
            "overall mean improvement": s / len(METRICS),
            "metric cluster report": metric_cluster_report,
            "prompt v report": prompt_v_report,
            "model report": model_report,
        }

    def save_improvement_data_in_cluster_res_metadata(self, cluster_name):
        overall_mean_impr_report = self.calculate_overall_mean_cluster_improvement(
            cluster_name
        )

        content = {}

        content["improvements_metadata"] = overall_mean_impr_report

        out_cluster_dir = utility_paths.SRC_DIR / "out_improvements_metadata"
        #print(f"out_cluster_dir = {out_cluster_dir}")
        out_cluster_dir.mkdir(parents=True, exist_ok=True)

        out_cluster_path = (
            out_cluster_dir / f"{cluster_name}.json"
        )
        #print(f"out_cluster_path = {out_cluster_path}")



        with open(out_cluster_path, "w", encoding="utf-8") as f:
            json.dump(content, f)

    def save_improvement_data_for_all_clusters(self):
        clusters = os.listdir(utility_paths.CLUSTERS_DIR_FILEPATH)
        tot = len(clusters)
        for i, cluster_file_name in enumerate(clusters):
            if not cluster_file_name.endswith(
                ".json"
            ) or not cluster_file_name.startswith("cluster_"):
                continue

            # Filtra cluster di debug/test
            if any(
                skip in cluster_file_name.lower()
                for skip in [
                    "debug_",
                    "test_",
                    "focused_",
                    "bad_entries",
                    "with_metrics",
                ]
            ):
                continue

            cluster_name = cluster_file_name.replace("cluster_", "").replace(
                ".json", ""
            )

            print(f"processing cluster {cluster_name} | {i}/{tot} ({(i / tot * 100)}%)")

            self.save_improvement_data_in_cluster_res_metadata(cluster_name)

    def calculate_improvements_means_for_cluster(self, cluster_name):
        metrics_for_entry_base = self.calculate_exec_metrics_avg_base_cluster(
            cluster_name
        )
        metrics_for_entry_llm = self.calculate_exec_metrics_avg_llm_cluster(
            cluster_name
        )

        report = {
            "CPU_usage": {
                "entry_quantity": 0,
                "sum": 0,
                "mean": 0,
            },
            "RAM_usage": {
                "entry_quantity": 0,
                "sum": 0,
                "mean": 0,
            },
            "execution_time_ms": {
                "entry_quantity": 0,
                "sum": 0,
                "mean": 0,
            },
        }
        prompt_v_report = {
            "1" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
            "2" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
            "3" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
            "4" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
        }
        model_report = {
            "openAI" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
            "claude" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
            "gemini" : {
                "CPU_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "RAM_usage": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
                "execution_time_ms": {
                    "entry_quantity": 0,
                    "sum": 0,
                    "mean": 0,
                },
            },
        }

        for llm_key in metrics_for_entry_llm.keys():
            llm_parts = str(llm_key).split(",")
            llm_metric = llm_parts[0]
            llm_entry_id = llm_parts[1]
            llm_model = llm_parts[2]
            llm_prompt_v = llm_parts[3]
            llm_value_avg = metrics_for_entry_llm[llm_key]
            for base_key in metrics_for_entry_base.keys():
                base_parts = str(base_key).split(",")
                base_entry_id = base_parts[0]
                base_metric = base_parts[1]
                base_value = metrics_for_entry_base[base_key]

                if base_entry_id == llm_entry_id and base_metric == llm_metric and base_value is not None and llm_value_avg is not None and base_value != 0:
                    single_entry_improvement_percentage = (
                        (base_value - llm_value_avg) / base_value * 100
                    )
                    # update sum :
                    report[base_metric]['sum'] = (
                        report[base_metric]["sum"] + single_entry_improvement_percentage
                    )
                    # update entry quantity :
                    #print(f"base_metric = {base_metric}")
                    #print(f"report[base_metric] = {report[base_metric]}")
                    report[base_metric]["entry_quantity"] = report[base_metric]["entry_quantity"] + 1

                    
                    # update prompt V report :
                    #print(f"llm_prompt_v = {llm_prompt_v}")
                    #print(f"base_metric = {base_metric}")
                    #print(f"prompt_v_report[llm_prompt_v] = {prompt_v_report[llm_prompt_v]}")
                    #print(f"prompt_v_report[llm_prompt_v][base_metric] = {prompt_v_report[llm_prompt_v][base_metric]}")
                    prompt_v_values = prompt_v_report[llm_prompt_v][base_metric]
                    prompt_v_values['sum'] += single_entry_improvement_percentage
                    prompt_v_values['entry_quantity'] += 1
                    prompt_v_report[llm_prompt_v][base_metric] = prompt_v_values

                    # update model report :
                    model_values = model_report[llm_model][base_metric]
                    model_values['sum'] += single_entry_improvement_percentage
                    model_values['entry_quantity'] += 1
                    model_report[llm_model][base_metric] = model_values

        for metric in report : 
            v = report[metric]
            if v['entry_quantity'] == 0 : 
                continue            
            report[metric]['mean'] = v['sum'] / v['entry_quantity']

        for prompt_v in prompt_v_report : 
            prompt_v_data = prompt_v_report[prompt_v]
            for metric in prompt_v_data:
                if v['entry_quantity'] == 0 : 
                    continue            
                v = prompt_v_data[metric]
                prompt_v_report[prompt_v][metric] = v["sum"] / v["entry_quantity"]

        for model in model_report : 
            model_data = model_report[model]
            for metric in model_data:
                v = model_data[metric]
                if v['entry_quantity'] == 0 : 
                    continue            
                model_report[model][metric] = v["sum"] / v["entry_quantity"]

        return (report, prompt_v_report, model_report)
    

if __name__ == "__main__":
    analyzer = ImprovementAnalyer()
    #analyzer.save_improvement_data_in_cluster_res_metadata('bob')
    analyzer.save_improvement_data_for_all_clusters()
