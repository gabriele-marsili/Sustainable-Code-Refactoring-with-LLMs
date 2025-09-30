#!/usr/bin/env python3
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from pathlib import Path
from typing import List, Dict


from utility_dir import utility_paths, general_utils


class SanityChecker:
    def __init__(self):
        pass

    def cluster_paths_to_names(self, cluster_paths: List[Path]) -> List[str]:
        names = []
        for cp in cluster_paths:
            if "with_metrics" not in cp.name:
                names.append(cp.name.replace("cluster_", "").replace(".json", ""))

        return names

    def get_clusters_paths(self) -> List[Path]:
        cluster_files = []
        for file_path in utility_paths.CLUSTERS_DIR_FILEPATH.glob("cluster_*.json"):
            if not any(
                skip in file_path.name
                for skip in ["debug", "test", "bad_entries", "with_metrics"]
            ):
                cluster_files.append(file_path)

        return cluster_files

    def get_cluster_exec_report(self, cluster_name: str) -> Dict:
        report = {
            "cluster_name": cluster_name,
            "LLM_results": {
                "1": {
                    "exec_number": {
                        "1": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "2": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "3": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "4": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "5": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                    }
                },
                "2": {
                    "exec_number": {
                        "1": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "2": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "3": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "4": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "5": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                    }
                },
                "3": {
                    "exec_number": {
                        "1": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "2": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "3": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "4": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "5": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                    }
                },
                "4": {
                    "exec_number": {
                        "1": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "2": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "3": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "4": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                        "5": {
                            "total_tested": 0,
                            "successful_tests": 0,
                            "errors": [],  # {filename : value, error_message, log_path, path}
                        },
                    }
                },
            },
            "base_results": {
                "exec_number": {
                    "1": {
                        "total_tested": 0,
                        "successful_tests": 0,
                        "errors": [],  # {filename : value, error_message, log_path, path}
                    },
                    "2": {
                        "total_tested": 0,
                        "successful_tests": 0,
                        "errors": [],  # {filename : value, error_message, log_path, path}
                    },
                    "3": {
                        "total_tested": 0,
                        "successful_tests": 0,
                        "errors": [],  # {filename : value, error_message, log_path, path}
                    },
                    "4": {
                        "total_tested": 0,
                        "successful_tests": 0,
                        "errors": [],  # {filename : value, error_message, log_path, path}
                    },
                    "5": {
                        "total_tested": 0,
                        "successful_tests": 0,
                        "errors": [],  # {filename : value, error_message, log_path, path, id}
                    },
                }
            },
            "total_clutser_exec": 0,
            "total_clutser_successfully_exec": 0,
            "success_exec_rate": 0,
            "base_out_names_not_yet_runned": [],
            "LLM_out_names_not_yet_runned": [],
        }

        # base
        for exec_num in range(1, 6):
            name = f"{cluster_name}_results_{exec_num}.json"
            base_out_file = utility_paths.OUTPUT_DIR_FILEPATH / name
            content = general_utils.read_json(base_out_file)

            if "execution_metadata" not in content:
                report["base_out_names_not_yet_runned"].append(name)
                continue

            metadata = content["execution_metadata"]

            value = report["base_results"]["exec_number"][f"{exec_num}"]
            value["total_tested"] = metadata["total_tests"]

            if "completed_tests" in metadata:
                completed_tests = metadata["completed_tests"]
            else:
                completed_tests = metadata["successful_tests"]

            value["successful_tests"] = completed_tests

            report["total_clutser_exec"] += metadata["total_tests"]
            report["total_clutser_successfully_exec"] += completed_tests

            errors = []
            for _lang, entries in content["results"].items():
                for entry in entries:
                    if not entry["success"] or (
                        entry["error_message"] != ""
                        and entry["error_message"] is not None
                    ):
                        errors.append(
                            {
                                "id": entry["id"],
                                "filename": entry.get("filename", ""),
                                "error_message": entry["error_message"],
                                "log_path": entry["log_path"],
                                "path": utility_paths.DATASET_DIR
                                / f"{entry['language']}"
                                / f"cluter_{cluster_name}.json",
                            }
                        )

            value["errors"] = errors

            report["base_results"]["exec_number"][f"{exec_num}"] = value

        for prompt_v in range(1, 5):
            for exec_number in range(1, 6):
                name = f"{cluster_name}_results_v{prompt_v}_{exec_number}.json"
                out_file_path = utility_paths.OUTPUT_DIR_FILEPATH / name
                content = general_utils.read_json(out_file_path)
                if "execution_metadata" not in content:
                    report["LLM_out_names_not_yet_runned"].append(name)
                    continue

                exec_metadata = content["execution_metadata"]

                value = report["LLM_results"][f"{prompt_v}"]["exec_number"][
                    f"{exec_number}"
                ]
                value["total_tested"] = exec_metadata["total_tests"]

                if "completed_tests" in exec_metadata:
                    completed_tests = exec_metadata["completed_tests"]
                else:
                    completed_tests = exec_metadata["successful_tests"]

                value["successful_tests"] = completed_tests

                report["total_clutser_exec"] += exec_metadata["total_tests"]
                report["total_clutser_successfully_exec"] += completed_tests

                errors = []
                for _lang, entries in content["results"].items():
                    for entry in entries:
                        for llm_res in entry["LLM_results"]:
                            if "success" in llm_res and "error_message" in llm_res:
                                if not llm_res["success"] or (
                                    llm_res["error_message"] != ""
                                    and llm_res["error_message"] is not None
                                ):
                                    errors.append(
                                        {
                                            "id": entry["id"],
                                            "filename": entry.get("filename", ""),
                                            "error_message": llm_res["error_message"],
                                            "log_path": llm_res["log_path"],
                                            "path": llm_res["path"],
                                        }
                                    )
                            else:
                                if (
                                    "CPU_usage" not in llm_res
                                    or "RAM_usage" not in llm_res
                                    or "execution_time_ms" not in llm_res
                                    or "regressionTestPassed" not in llm_res
                                    or llm_res["CPU_usage"] is None
                                    or llm_res["RAM_usage"] is None
                                    or llm_res["execution_time_ms"] is None
                                ):
                                    errors.append(
                                        {
                                            "id": entry["id"],
                                            "filename": entry["filename"],
                                            "error_message": llm_res["error_message"],
                                            "log_path": llm_res["log_path"],
                                            "path": llm_res["path"],
                                        }
                                    )

                value["errors"] = errors

                report["LLM_results"][f"{prompt_v}"]["exec_number"][
                    f"{exec_number}"
                ] = value

        if report["total_clutser_exec"] != 0:
            report["success_exec_rate"] = (
                report["total_clutser_successfully_exec"]
                / report["total_clutser_exec"]
                * 100
            )

        return report

    def sanity_checks(self):
        c_paths = self.get_clusters_paths()
        c_names = self.cluster_paths_to_names(c_paths)
        sanity_report_metadata = {
            "cluster_quantity": len(c_names),
            "fully_executed_cluster_quantity": 0,
            "not_fully_executed_cluster_names": [],
            "execution_rate": 0,
        }
        for i, name in enumerate(c_names):
            report = self.get_cluster_exec_report(name)
            sanity_r_out_path = (
                utility_paths.CLUSTERS_SANITY_CHECKS_DIR
                / f"sanity_checks_cluster_{name}.json"
            )
            general_utils.write_json(sanity_r_out_path, report)
            # print(f"\n\nCluster sanity report for cluster {name}:\n\n{self.get_cluster_exec_report(name)}")
            print(
                f"\nChecking cluster {name} | {i}/{sanity_report_metadata['cluster_quantity']}"
            )

            if report["success_exec_rate"] > 99.0:
                sanity_report_metadata["fully_executed_cluster_quantity"] += 1
            else:
                sanity_report_metadata["not_fully_executed_cluster_names"].append(name)

        if sanity_report_metadata["cluster_quantity"] > 0:
            sanity_report_metadata["execution_rate"] = (
                sanity_report_metadata["fully_executed_cluster_quantity"]
                / sanity_report_metadata["cluster_quantity"]
                * 100
            )

        general_utils.write_json(
            utility_paths.SANITY_CHECKS_METADATA_JSON_FILE_PATH, sanity_report_metadata
        )


if __name__ == "__main__":
    checker = SanityChecker()
    checker.sanity_checks()
