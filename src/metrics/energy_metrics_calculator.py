import os
import sys
import json

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir import utility_paths  # noqa: E402


class EnergyMetricsCalculator:
    def __init__(self):
        pass

    def write_data_in_json_file(self, content, file_path):
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(content, f, indent=4)

            print(f"\nDatas saved in file : {file_path}")

        except Exception as e:
            print(f"Error saving data in file : {file_path}:\n{e}")

    def load_file_content(self, file_path: str):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(
                f"\nError in loading json file content for file path : {file_path}\n{e}"
            )

    def load_base_metrics(self, cluster_name: str, average_data_output_filepath=""):
        output_file_path = utility_paths.OUTPUT_DIR_FILEPATH
        out_files_cluster_names = [
            f"{cluster_name}_results_1.json",
            f"{cluster_name}_results_2.json",
            f"{cluster_name}_results_3.json",
            f"{cluster_name}_results_4.json",
            f"{cluster_name}_results_5.json",
        ]
        datas = []
        for file_name in os.listdir(output_file_path):
            file_path = str(utility_paths.OUTPUT_DIR_FILEPATH / file_name)
            for out_file_name in out_files_cluster_names:
                if out_file_name in file_path:
                    data = self.load_file_content(file_path)
                    datas.append(data)

        # extract average datas :
        average_data_report = {
            "entries": {},
            "total_cpu_usage": 0,
            "total_RAM_usage": 0,
            "total_execution_time_ms": 0,
            "total_entry_quantity": 0,
            "total_cpu_usage_mean": 0,
            "total_RAM_usage_mean": 0,
            "total_execution_time_ms_mean": 0,
        }
        for data in datas:  # 5 runs
            for language, entries in data["results"].items():  # results for each run
                for entry in entries:  # entries for each results
                    found = False
                    if entry["CPU_usage"]:
                        found = True
                        average_data_report["total_cpu_usage"] += entry["CPU_usage"]

                    if entry["RAM_usage"]:
                        found = True
                        average_data_report["total_RAM_usage"] += entry["RAM_usage"]

                    if entry["execution_time_ms"]:
                        found = True
                        average_data_report["total_execution_time_ms"] += entry[
                            "execution_time_ms"
                        ]

                    if found:
                        average_data_report["total_entry_quantity"] += 1

                    if entry["id"] not in average_data_report["entries"]:
                        entry_data = {
                            "id": entry["id"],
                            "language": language,
                            "total_cpu_usage": 0,
                            "total_RAM_usage": 0,
                            "total_execution_time_ms": 0,
                            "total_cpu_usage_mean": 0,
                            "total_RAM_usage_mean": 0,
                            "total_execution_time_ms_mean": 0,
                            "run_quantity": 0,
                        }
                        average_data_report["entries"][entry["id"]] = entry_data

                    found = False

                    if entry["CPU_usage"]:
                        average_data_report["entries"][entry["id"]][
                            "total_cpu_usage"
                        ] += entry["CPU_usage"]
                        found = True

                    if entry["RAM_usage"]:
                        average_data_report["entries"][entry["id"]][
                            "total_RAM_usage"
                        ] += entry["RAM_usage"]
                        found = True

                    if entry["execution_time_ms"]:
                        average_data_report["entries"][entry["id"]][
                            "total_execution_time_ms"
                        ] += entry["execution_time_ms"]
                        found = True

                    if found:
                        average_data_report["entries"][entry["id"]]["run_quantity"] += 1

        average_data_report["total_cpu_usage_mean"] = (
            average_data_report["total_cpu_usage"]
            / average_data_report["total_entry_quantity"]
        )
        average_data_report["total_RAM_usage_mean"] = (
            average_data_report["total_RAM_usage"]
            / average_data_report["total_entry_quantity"]
        )
        average_data_report["total_execution_time_ms_mean"] = (
            average_data_report["total_execution_time_ms"]
            / average_data_report["total_entry_quantity"]
        )

        for entry_id in average_data_report["entries"]:
            entry = average_data_report["entries"][entry_id]
            # print(f"entry\n{entry}")
            entry["total_RAM_usage_mean"] = (
                entry["total_RAM_usage"] / entry["run_quantity"]
            )
            entry["total_cpu_usage_mean"] = (
                entry["total_cpu_usage"] / entry["run_quantity"]
            )
            entry["total_execution_time_ms_mean"] = (
                entry["total_execution_time_ms"] / entry["run_quantity"]
            )

        if average_data_output_filepath != "":
            try:
                with open(average_data_output_filepath, "w", encoding="utf-8") as f:
                    json.dump(average_data_report, f, indent=4)
                print(
                    f"average data report for energy metrics (base code snippets) saved in file : {average_data_output_filepath}"
                )
            except Exception as e:
                print(
                    f"Error saving average energy metrics (base code snippet) in file : {average_data_output_filepath}:\n{e}"
                )

        return average_data_report

    def load_llm_metrics(
        self, cluster_name: str, prompt_v: int = 4, average_data_output_filepath=""
    ):
        output_file_path = utility_paths.OUTPUT_DIR_FILEPATH
        out_files_cluster_names = [
            f"{cluster_name}_results_v{prompt_v}_1.json",
            f"{cluster_name}_results_v{prompt_v}_2.json",
            f"{cluster_name}_results_v{prompt_v}_3.json",
            f"{cluster_name}_results_v{prompt_v}_4.json",
            f"{cluster_name}_results_v{prompt_v}_5.json",
        ]
        datas = []
        for file_name in os.listdir(output_file_path):
            file_path = str(utility_paths.OUTPUT_DIR_FILEPATH / file_name)
            for out_file_name in out_files_cluster_names:
                if out_file_name in file_path:
                    data = self.load_file_content(file_path)
                    datas.append(data)

        # extract average datas :
        average_data_report = {
            "entries": {},
            "total_cpu_usage": 0,
            "total_RAM_usage": 0,
            "total_execution_time_ms": 0,
            "total_entry_quantity": 0,  # total LLM entries
            # mean
            "total_cpu_usage_mean": 0,
            "total_RAM_usage_mean": 0,
            "total_execution_time_ms_mean": 0,
            # per language
            "openAI": {  # info only for OpenAI
                "total_cpu_usage": 0,
                "total_RAM_usage": 0,
                "total_execution_time_ms": 0,
                "total_entry_quantity": 0,  # total LLM entries on OpenAI
                # mean
                "total_cpu_usage_mean": 0,
                "total_RAM_usage_mean": 0,
                "total_execution_time_ms_mean": 0,
            },
            "claude": {  # info only for claude
                "total_cpu_usage": 0,
                "total_RAM_usage": 0,
                "total_execution_time_ms": 0,
                "total_entry_quantity": 0,  # total LLM entries on claude
                # mean
                "total_cpu_usage_mean": 0,
                "total_RAM_usage_mean": 0,
                "total_execution_time_ms_mean": 0,
            },
            "gemini": {  # info only for gemini
                "total_cpu_usage": 0,
                "total_RAM_usage": 0,
                "total_execution_time_ms": 0,
                "total_entry_quantity": 0,  # total LLM entries on gemini
                # mean
                "total_cpu_usage_mean": 0,
                "total_RAM_usage_mean": 0,
                "total_execution_time_ms_mean": 0,
            },
        }
        for data in datas:  # 5 runs
            for language, entries in data["results"].items():  # results for each run
                for entry in entries:  # entries for each results
                    if "LLM_results" not in entry:
                        entry["LLM_results"] = [
                            {
                                "execution_time_ms": 290,
                                "CPU_usage": 40.0,
                                "RAM_usage": 82908,
                                "regressionTestPassed": False,
                                "LLM_type": "openAI",
                                "path": "-",
                                "log": "-",
                            },
                            {
                                "execution_time_ms": 310,
                                "CPU_usage": 51.0,
                                "RAM_usage": 82532,
                                "regressionTestPassed": False,
                                "LLM_type": "claude",
                                "path": "-",
                                "log": "-",
                            },
                            {
                                "execution_time_ms": 320,
                                "CPU_usage": 42.0,
                                "RAM_usage": 83720,
                                "regressionTestPassed": False,
                                "LLM_type": "gemini",
                                "path": "-",
                                "log": "-",
                            },
                        ]

                    # print(f"entry:\n{entry}")
                    for llm_res in entry["LLM_results"]:
                        # skip entries that not passed regression test
                        if not llm_res["regressionTestPassed"]:
                            continue

                        # total datas
                        found = False
                        if llm_res["CPU_usage"]:
                            average_data_report["total_cpu_usage"] += llm_res[
                                "CPU_usage"
                            ]
                            found = True

                        if llm_res["RAM_usage"]:
                            average_data_report["total_RAM_usage"] += llm_res[
                                "RAM_usage"
                            ]
                            found = True

                        if llm_res["execution_time_ms"]:
                            average_data_report["total_execution_time_ms"] += llm_res[
                                "execution_time_ms"
                            ]
                            found = True

                        if found:
                            average_data_report["total_entry_quantity"] += 1

                        # entry datas
                        if entry["id"] not in average_data_report["entries"]:
                            entry_data = {
                                "id": entry["id"],
                                "language": language,
                                "LLM_results": {  # LLM res for each entry (on 5 runs)
                                    "openAI": {
                                        "total_cpu_usage": 0,
                                        "total_RAM_usage": 0,
                                        "total_execution_time_ms": 0,
                                        "total_cpu_usage_mean": 0,
                                        "total_RAM_usage_mean": 0,
                                        "total_execution_time_ms_mean": 0,
                                        "run_quantity": 0,
                                    },
                                    "gemini": {
                                        "total_cpu_usage": 0,
                                        "total_RAM_usage": 0,
                                        "total_execution_time_ms": 0,
                                        "total_cpu_usage_mean": 0,
                                        "total_RAM_usage_mean": 0,
                                        "total_execution_time_ms_mean": 0,
                                        "run_quantity": 0,
                                    },
                                    "claude": {
                                        "total_cpu_usage": 0,
                                        "total_RAM_usage": 0,
                                        "total_execution_time_ms": 0,
                                        "total_cpu_usage_mean": 0,
                                        "total_RAM_usage_mean": 0,
                                        "total_execution_time_ms_mean": 0,
                                        "run_quantity": 0,
                                    },
                                },
                            }
                            average_data_report["entries"][entry["id"]] = entry_data

                        entry_data = average_data_report["entries"][entry["id"]]
                        model = llm_res["LLM_type"]

                        found = False
                        if llm_res["CPU_usage"]:
                            entry_data["LLM_results"][model]["total_cpu_usage"] += (
                                llm_res["CPU_usage"]
                            )
                            found = True

                        if llm_res["RAM_usage"]:
                            entry_data["LLM_results"][model]["total_RAM_usage"] += (
                                llm_res["RAM_usage"]
                            )
                            found = True

                        if llm_res["execution_time_ms"]:
                            entry_data["LLM_results"][model][
                                "total_execution_time_ms"
                            ] += llm_res["execution_time_ms"]
                            found = True

                        if found:
                            entry_data["LLM_results"][model]["run_quantity"] += 1

                        # model datas :
                        found = False
                        if llm_res["CPU_usage"]:
                            average_data_report[model]["total_cpu_usage"] += llm_res[
                                "CPU_usage"
                            ]
                            found = True

                        if llm_res["RAM_usage"]:
                            average_data_report[model]["total_RAM_usage"] += llm_res[
                                "RAM_usage"
                            ]
                            found = True

                        if llm_res["execution_time_ms"]:
                            average_data_report[model]["total_execution_time_ms"] += (
                                llm_res["execution_time_ms"]
                            )
                            found = True

                        if found:
                            average_data_report[model]["total_entry_quantity"] += 1

        # adjust means

        # total
        average_data_report["total_cpu_usage_mean"] = (
            average_data_report["total_cpu_usage"]
            / average_data_report["total_entry_quantity"]
        )
        average_data_report["total_RAM_usage_mean"] = (
            average_data_report["total_RAM_usage"]
            / average_data_report["total_entry_quantity"]
        )
        average_data_report["total_execution_time_ms_mean"] = (
            average_data_report["total_execution_time_ms"]
            / average_data_report["total_entry_quantity"]
        )

        # for each model
        for model in ["openAI", "gemini", "claude"]:
            average_data_report[model]["total_cpu_usage_mean"] = (
                average_data_report[model]["total_cpu_usage"]
                / average_data_report[model]["total_entry_quantity"]
            )
            average_data_report[model]["total_RAM_usage_mean"] = (
                average_data_report[model]["total_RAM_usage"]
                / average_data_report[model]["total_entry_quantity"]
            )
            average_data_report[model]["total_execution_time_ms_mean"] = (
                average_data_report[model]["total_execution_time_ms"]
                / average_data_report[model]["total_entry_quantity"]
            )

        # for each entry
        for entry_id in average_data_report["entries"]:
            entry = average_data_report["entries"][entry_id]
            for model in ["openAI", "gemini", "claude"]:
                run_q = entry["LLM_results"][model]["run_quantity"]

                if run_q != 0:
                    entry["LLM_results"][model]["total_RAM_usage_mean"] = (
                        entry["LLM_results"][model]["total_RAM_usage"] / run_q
                    )
                else:
                    entry["LLM_results"][model]["total_RAM_usage_mean"] = 0

                if run_q != 0:
                    entry["LLM_results"][model]["total_cpu_usage_mean"] = (
                        entry["LLM_results"][model]["total_cpu_usage"] / run_q
                    )

                else:
                    entry["LLM_results"][model]["total_cpu_usage_mean"] = 0

                # print(f"entry:\n{entry}")

                if run_q != 0:
                    entry["LLM_results"][model]["total_execution_time_ms_mean"] = (
                        entry["LLM_results"][model]["total_execution_time_ms"] / run_q
                    )
                else:
                    entry["LLM_results"][model]["total_execution_time_ms_mean"] = 0

        if average_data_output_filepath != "":
            try:
                with open(average_data_output_filepath, "w", encoding="utf-8") as f:
                    json.dump(average_data_report, f, indent=4)
                print(
                    f"average data report for llm energy metrics saved in file : {average_data_output_filepath}"
                )
            except Exception as e:
                print(
                    f"Error saving average energy metrics (LLM) in file : {average_data_output_filepath}:\n{e}"
                )

        return average_data_report

    def calculate_energy_improvements(
        self, cluster_name: str, prompt_v=4, out_destination_file_path=""
    ):
        base_average_energy_metrics_file_path = (
            utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
            / f"cluster_{cluster_name}_base_energy_metrics_average_report.json"
        )
        # print(f"base_average_energy_metrics_file_path:\n{base_average_energy_metrics_file_path}")
        llm_average_energy_metrics_file_path = (
            utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
            / f"cluster_{cluster_name}_llm_v{prompt_v}_energy_metrics_average_report.json"
        )
        # print(f"\nllm_average_energy_metrics_file_path:\n{llm_average_energy_metrics_file_path}")

        base_average_energy_data = self.load_file_content(
            base_average_energy_metrics_file_path
        )
        llm_average_energy_data = self.load_file_content(
            llm_average_energy_metrics_file_path
        )

        base_average_energy_entries = base_average_energy_data["entries"]
        llm_average_energy_entries = llm_average_energy_data["entries"]

        report = {
            "openAI": {
                "entries": [],
                "CPU_improvement": 0,
                "RAM_improvement": 0,
                "execution_time_improvement": 0,
            },
            "gemini": {
                "entries": [],
                "CPU_improvement": 0,
                "RAM_improvement": 0,
                "execution_time_improvement": 0,
            },
            "claude": {
                "entries": [],
                "CPU_improvement": 0,
                "RAM_improvement": 0,
                "execution_time_improvement": 0,
            },
            "mean_CPU_improvement": 0,
            "mean_RAM_improvement": 0,
            "mean_execution_time_improvement": 0,
        }
        for entry_id in llm_average_energy_entries:
            entry = llm_average_energy_entries[entry_id]
            entry_id = entry["id"]
            for model, model_data in entry["LLM_results"].items():
                if entry_id in base_average_energy_entries:
                    base_entry_data = base_average_energy_entries[entry_id]
                    base_avg_RAM = base_entry_data["total_RAM_usage_mean"]
                    if base_avg_RAM == 0.0:
                        continue
                    model_delta_RAM = (
                        base_avg_RAM - model_data["total_RAM_usage_mean"]
                    ) / base_avg_RAM

                    # print(f"base_entry_data:\n{base_entry_data}")
                    base_avg_CPU = base_entry_data["total_cpu_usage_mean"]
                    if base_avg_CPU == 0.0:
                        continue
                    model_delta_CPU = (
                        base_avg_RAM - model_data["total_cpu_usage_mean"]
                    ) / base_avg_CPU

                    base_avg_time = base_entry_data["total_execution_time_ms_mean"]
                    if base_avg_time == 0.0:
                        continue

                    model_delta_time = (
                        base_avg_RAM - model_data["total_execution_time_ms_mean"]
                    ) / base_avg_time

                    report_entry_data = {
                        "id": entry_id,
                        "CPU_improvement": model_delta_CPU,
                        "RAM_improvement": model_delta_RAM,
                        "execution_time_improvement": model_delta_time,
                    }

                    report[model]["entries"].append(report_entry_data)

        for model in ["openAI", "claude", "gemini"]:
            entries = report[model]["entries"]
            e_quantity = len(entries)
            total_CPU_improvement = 0
            total_RAM_improvement = 0
            total_TIME_improvement = 0
            for entry in entries:
                total_CPU_improvement += entry["CPU_improvement"]
                total_RAM_improvement += entry["RAM_improvement"]
                total_TIME_improvement += entry["execution_time_improvement"]

            report[model]["CPU_improvement"] = total_CPU_improvement / e_quantity
            report[model]["RAM_improvement"] = total_RAM_improvement / e_quantity
            report[model]["execution_time_improvement"] = (
                total_TIME_improvement / e_quantity
            )

        report["mean_CPU_improvement"] = (
            report["claude"]["CPU_improvement"]
            + report["gemini"]["CPU_improvement"]
            + report["openAI"]["CPU_improvement"]
        ) / 3
        report["mean_RAM_improvement"] = (
            report["claude"]["RAM_improvement"]
            + report["gemini"]["RAM_improvement"]
            + report["openAI"]["RAM_improvement"]
        ) / 3
        report["mean_execution_time_improvement"] = (
            report["claude"]["execution_time_improvement"]
            + report["gemini"]["execution_time_improvement"]
            + report["openAI"]["execution_time_improvement"]
        ) / 3

        if out_destination_file_path != "":
            self.write_data_in_json_file(report, out_destination_file_path)

        return report


def load_metrics_for_all_clusters(calculator: EnergyMetricsCalculator):
    for cluster_name in ["raindrops", "bob", "pangram", "leap"]:
        base_average_energy_metrics_file_path = (
            utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
            / f"cluster_{cluster_name}_base_energy_metrics_average_report.json"
        )
        llm_average_energy_metrics_file_path = (
            utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
            / f"cluster_{cluster_name}_llm_v{prompt_v}_energy_metrics_average_report.json"
        )

        calculator.load_base_metrics(
            cluster_name, base_average_energy_metrics_file_path
        )
        calculator.load_llm_metrics(
            cluster_name, prompt_v, llm_average_energy_metrics_file_path
        )


def write_energy_improvement_report_for_all_clusters(
    calculator: EnergyMetricsCalculator,
):
    for cluster_name in ["raindrops", "bob", "pangram", "leap"]:
        out_destination_file_path = str(
            utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH
            / f"cluster_{cluster_name}_energy_improvement_report.json"
        )
        calculator.calculate_energy_improvements(
            cluster_name, 4, out_destination_file_path
        )


if __name__ == "__main__":
    prompt_v = 4  # best prompt v
    calculator = EnergyMetricsCalculator()
    # load_metrics_for_all_clusters(calculator)
    write_energy_improvement_report_for_all_clusters(calculator)
