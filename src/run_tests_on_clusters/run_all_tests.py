#!/usr/bin/env python3
"""
 Parallel Test Runner for All Clusters
Distributes cluster execution across threads with dynamic load balancing and comprehensive reporting
"""

import os
import subprocess
import time
import logging

from pathlib import Path
from typing import List, Dict, Optional, Tuple

from dataclasses import dataclass, field
import argparse
from collections import defaultdict


from utility_dir import utility_paths, general_utils
from discordInteraction import create_webhook_reporter
from dotenv import load_dotenv
from execution_sanity_checks import sanity_checker
import sys
from threading import Lock
from concurrent.futures import ProcessPoolExecutor, as_completed
import multiprocessing as mp


@dataclass
class ClusterExecutionReport:
    """Detailed report for a single cluster execution"""

    cluster_name: str
    prompt_version: int
    run_number: int
    start_time: float
    end_time: float
    total_entries: int = 0
    successful_entries: int = 0
    failed_entries: int = 0
    errors: List[Dict] = field(default_factory=list)
    execution_type: str = "full"  # base, llm, or full

    @property
    def execution_time(self) -> float:
        return self.end_time - self.start_time

    @property
    def success_rate(self) -> float:
        return (
            (self.successful_entries / self.total_entries * 100)
            if self.total_entries > 0
            else 0.0
        )

    def to_dict(self) -> Dict:
        return {
            "cluster_name": self.cluster_name,
            "prompt_version": self.prompt_version,
            "run_number": self.run_number,
            "execution_time_seconds": self.execution_time,
            "total_entries": self.total_entries,
            "successful_entries": self.successful_entries,
            "failed_entries": self.failed_entries,
            "success_rate": self.success_rate,
            "execution_type": self.execution_type,
            "errors": self.errors,
        }


@dataclass
class WorkerState:
    """State tracking for a single worker thread"""

    worker_id: int
    clusters_completed: int = 0
    total_execution_time: float = 0.0
    current_cluster: Optional[str] = None
    is_active: bool = True
    last_update: float = field(default_factory=time.time)

    def update_completion(self, cluster_name: str, execution_time: float):
        self.clusters_completed += 1
        self.total_execution_time += execution_time
        self.current_cluster = None
        self.last_update = time.time()


@dataclass
class GlobalExecutionState:
    """Thread-safe global execution state with load balancing"""

    start_time: float = field(default_factory=time.time)
    total_clusters: int = 0
    completed_clusters: int = 0
    total_entries_executed: int = 0
    total_entries_successful: int = 0
    worker_states: Dict[int, WorkerState] = field(default_factory=dict)
    cluster_reports: List[ClusterExecutionReport] = field(default_factory=list)
    lock: Lock = field(default_factory=Lock)

    def update_from_report(self, report: ClusterExecutionReport, worker_id: int):
        with self.lock:
            self.completed_clusters += 1
            self.total_entries_executed += report.total_entries
            self.total_entries_successful += report.successful_entries
            self.cluster_reports.append(report)

            if worker_id in self.worker_states:
                self.worker_states[worker_id].update_completion(
                    report.cluster_name, report.execution_time
                )

    def get_worker_load_distribution(self) -> Dict[int, float]:
        """Get current load distribution across workers"""
        with self.lock:
            return {
                worker_id: state.total_execution_time
                for worker_id, state in self.worker_states.items()
            }

    @property
    def elapsed_time(self) -> str:
        elapsed = time.time() - self.start_time
        hours = int(elapsed // 3600)
        minutes = int((elapsed % 3600) // 60)
        seconds = int(elapsed % 60)
        return f"{hours:02d}h {minutes:02d}m {seconds:02d}s"

    @property
    def overall_success_rate(self) -> float:
        with self.lock:
            return (
                (self.total_entries_successful / self.total_entries_executed * 100)
                if self.total_entries_executed > 0
                else 0.0
            )


class ClusterExecutor:
    """Executes a single cluster using run_tests_on_cluster.py"""

    def __init__(self):
        self.logger = logging.getLogger(__name__ + ".ClusterExecutor")

    def  execute_cluster(
        self, cluster_name: str, prompt_version: int = -1, max_workers: int = 4
    ) -> ClusterExecutionReport:
        """Execute a single cluster and return detailed report"""

        start_time = time.time()

        # Build command        
        cmd = [
            sys.executable, "run_tests_on_cluster.py",
            "--full",
            "--cluster-name", 
            cluster_name,  
            "--prompt-version",
            str(prompt_version),
            "--run-quantity", 
            "5",
            "--not-check-pending",
            "--webhook",
        ]

        self.logger.info(f"Starting cluster execution: {cluster_name}")

        try:
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,                
                text=True,
                bufsize=1,
                universal_newlines=True                
            )

            for line in process.stdout:
                logging.info(f"[{cluster_name}] {line.strip()}")

            _, stderr = process.communicate()
            
            end_time = time.time()

            # Parse execution results
            report = self._parse_execution_results(
                cluster_name,
                prompt_version,
                start_time,
                end_time,
                process.returncode == 0,
            )

            if process.returncode != 0:
                self.logger.error(
                    f"Cluster {cluster_name} failed with exit code {process.returncode}"
                )
                if stderr:
                    self.logger.error(f"STDERR: {stderr[-2000:]}")

            self.logger.info(f"[{cluster_name}] Successfully completed")
            return report

        except subprocess.TimeoutExpired:
            end_time = time.time()
            self.logger.error(f"Cluster {cluster_name} timed out")
            return ClusterExecutionReport(
                cluster_name=cluster_name,
                prompt_version=prompt_version,
                run_number=1,
                start_time=start_time,
                end_time=end_time,
                errors=[{"error": "Execution timeout (2 hours)", "type": "timeout"}],
            )

        except Exception as e:
            end_time = time.time()
            self.logger.error(
                f"Cluster {cluster_name} execution error: {e}", exc_info=True
            )
            return ClusterExecutionReport(
                cluster_name=cluster_name,
                prompt_version=prompt_version,
                run_number=1,
                start_time=start_time,
                end_time=end_time,
                errors=[{"error": str(e), "type": "exception"}],
            )

    def _parse_execution_results(
        self,
        cluster_name: str,
        prompt_version: int,
        start_time: float,
        end_time: float,
        success: bool,
    ) -> ClusterExecutionReport:
        """Parse results from output files to generate detailed report"""

        report = ClusterExecutionReport(
            cluster_name=cluster_name,
            prompt_version=prompt_version,
            run_number=1,
            start_time=start_time,
            end_time=end_time,
        )

        # Collect statistics from all result files
        total_entries = 0
        successful_entries = 0
        errors = []

        # Parse base results (5 runs)
        for run_num in range(1, 6):
            base_file = (
                utility_paths.OUTPUT_DIR_FILEPATH
                / f"{cluster_name}_results_{run_num}.json"
            )
            if base_file.exists():
                stats, errs = self._parse_result_file(base_file, "base", run_num)
                total_entries += stats["total"]
                successful_entries += stats["successful"]
                errors.extend(errs)

        # Parse LLM results
        if prompt_version == -1:
            versions = range(1, 5)
        else:
            versions = [prompt_version]

        for v in versions:
            for run_num in range(1, 6):
                llm_file = (
                    utility_paths.OUTPUT_DIR_FILEPATH
                    / f"{cluster_name}_results_v{v}_{run_num}.json"
                )
                if llm_file.exists():
                    stats, errs = self._parse_result_file(
                        llm_file, f"llm_v{v}", run_num
                    )
                    total_entries += stats["total"]
                    successful_entries += stats["successful"]
                    errors.extend(errs)

        report.total_entries = total_entries
        report.successful_entries = successful_entries
        report.failed_entries = total_entries - successful_entries
        report.errors = errors

        return report

    def _parse_result_file(
        self, file_path: Path, execution_type: str, run_number: int
    ) -> Tuple[Dict[str, int], List[Dict]]:
        """Parse a single result file and extract statistics"""

        stats = {"total": 0, "successful": 0}
        errors = []

        try:
            data = general_utils.read_json(file_path)

            if "execution_metadata" not in data:
                return stats, errors

            metadata = data["execution_metadata"]
            stats["total"] = metadata.get("total_tests", 0)
            stats["successful"] = metadata.get(
                "completed_tests", metadata.get("successful_tests", 0)
            )

            # Extract errors from results
            for language, entries in data.get("results", {}).items():
                for entry in entries:
                    # Check base execution
                    if execution_type == "base":
                        if not entry.get("success", True) or entry.get("error_message"):
                            errors.append(
                                {
                                    "entry_id": entry.get("id", "unknown"),
                                    "filename": entry.get("filename", ""),
                                    "language": language,
                                    "execution_type": execution_type,
                                    "run_number": run_number,
                                    "error_message": entry.get(
                                        "error_message", "Unknown error"
                                    ),
                                    "log_path": entry.get("log_path", ""),
                                    "file_path": str(file_path),
                                }
                            )

                    # Check LLM results
                    if "LLM_results" in entry:
                        for llm_result in entry["LLM_results"]:
                            if not llm_result.get("success", True) or llm_result.get(
                                "error_message"
                            ):
                                errors.append(
                                    {
                                        "entry_id": entry.get("id", "unknown"),
                                        "filename": llm_result.get("filename", ""),
                                        "language": language,
                                        "execution_type": execution_type,
                                        "run_number": run_number,
                                        "llm_type": llm_result.get("LLM_type", ""),
                                        "error_message": llm_result.get(
                                            "error_message", "Unknown error"
                                        ),
                                        "log_path": llm_result.get("log_path", ""),
                                        "file_path": llm_result.get("path", ""),
                                    }
                                )

        except Exception as e:
            logging.error(f"Error parsing result file {file_path}: {e}")

        return stats, errors


class LoadBalancer:
    """Dynamic load balancer for distributing work across threads"""

    def __init__(self, num_workers: int):
        self.num_workers = num_workers
        #self.work_queues: List[Queue] = [Queue() for _ in range(num_workers)]
        self.cluster_times: Dict[str, float] = {}  # Historical execution times
        self.lock = Lock()
        self.logger = logging.getLogger(__name__ + ".LoadBalancer")

    def distribute_initial_load(self, clusters: List[str]) -> List[List[str]]:
        """Distribute clusters across workers with estimated load balancing"""

        # Estimate execution times (can be improved with historical data)
        cluster_estimates = []
        for cluster in clusters:
            # Use historical time if available, otherwise estimate
            estimated_time = self.cluster_times.get(cluster, 300.0)  # Default 5 minutes
            cluster_estimates.append((cluster, estimated_time))

        # Sort by estimated time (longest first for better balancing)
        cluster_estimates.sort(key=lambda x: x[1], reverse=True)

        # Distribute using greedy algorithm
        worker_loads = [0.0] * self.num_workers
        worker_assignments: List[List[str]] = [[] for _ in range(self.num_workers)]

        for cluster, estimated_time in cluster_estimates:
            # Assign to worker with minimum current load
            min_worker = min(range(self.num_workers), key=lambda i: worker_loads[i])
            worker_assignments[min_worker].append(cluster)
            worker_loads[min_worker] += estimated_time

        self.logger.info(
            f"Initial load distribution: {[len(w) for w in worker_assignments]}"
        )
        return worker_assignments

    def record_execution_time(self, cluster_name: str, execution_time: float):
        """Record execution time for future load balancing"""
        with self.lock:
            self.cluster_times[cluster_name] = execution_time


class ParallelRunner:
    """Main orchestrator for parallel cluster execution"""

    def __init__(
        self,
        num_workers: int = 3,
        max_workers_per_cluster: int = 4,
        webhook_url: Optional[str] = None,
        webhook_interval: int = 5,
    ):
        self.num_workers = num_workers
        self.max_workers_per_cluster = max_workers_per_cluster
        self.webhook_url = webhook_url
        self.webhook_interval = webhook_interval

        self.state = GlobalExecutionState()
        self.executor = ClusterExecutor()
        self.load_balancer = LoadBalancer(num_workers)

        self.logger = self._setup_logging()

        if webhook_url:
            self.webhook_reporter = create_webhook_reporter(
                webhook_url, " Parallel Runner"
            )
        else:
            self.webhook_reporter = None

        
        

    def _setup_logging(self) -> logging.Logger:
        """Setup logging"""
        #log_dir = utility_paths.SRC_DIR / "logs"
        #log_dir.mkdir(parents=True, exist_ok=True)

        #log_file = log_dir / f"parallel_runner_{int(time.time())}.log"

        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            handlers=[logging.StreamHandler(),logging.StreamHandler(sys.stdout)],
        )

        return logging.getLogger(__name__)

    def get_pending_clusters(self) -> List[str]:
        """Get clusters that need execution from metadata"""
        try:
            metadata_path = utility_paths.SANITY_CHECKS_METADATA_JSON_FILE_PATH

            if not metadata_path.exists():
                self.logger.error("Metadata file not found")
                raise Exception("Metadata file not found")

            metadata = general_utils.read_json(metadata_path)
            pending = metadata.get("not_fully_executed_cluster_names", [])

            self.logger.info(f"Found {len(pending)} pending clusters from metadata")
            return pending

        except Exception as e:
            self.logger.error(f"Error reading metadata: {e}")
            return self._get_all_clusters()

    def _get_all_clusters(self) -> List[str]:
        """Get all cluster names"""
        cluster_names = []
        for file_path in utility_paths.CLUSTERS_DIR_FILEPATH.glob("cluster_*.json"):
            if not any(
                skip in file_path.name
                for skip in ["debug", "test", "bad_entries", "with_metrics"]
            ):
                name = file_path.stem.replace("cluster_", "")
                cluster_names.append(name)
        return sorted(cluster_names)

    def run_all_pending(self, prompt_version: int = -1):
        """Execute all pending clusters with dynamic load balancing"""

        # Get pending clusters
        pending_clusters = self.get_pending_clusters()

        if not pending_clusters:
            self.logger.info("No pending clusters to execute")
            return

        self.state.total_clusters = len(pending_clusters)

        # Initialize worker states
        for i in range(self.num_workers):
            self.state.worker_states[i] = WorkerState(worker_id=i)

        self.logger.info(
            f"Starting execution of {self.state.total_clusters} clusters with {self.num_workers} workers"
        )
            
        with ProcessPoolExecutor(
            max_workers=self.num_workers,
            mp_context=mp.get_context('spawn')  # Importante per compatibilità cross-platform
        ) as executor:
            
            # Sottometti tutti i cluster come futures
            future_to_cluster = {
                executor.submit(
                    execute_cluster_standalone,
                    cluster_name,
                    prompt_version,
                    self.max_workers_per_cluster,
                    self.num_workers  
                ): cluster_name
                for cluster_name in pending_clusters
            }

            # Processa i risultati man mano che completano
            completed = 0
            for future in as_completed(future_to_cluster):
                cluster_name = future_to_cluster[future]
                
                try:
                    report, worker_id = future.result()
                    
                    # Update global state
                    self.state.update_from_report(report, worker_id)
                    self.load_balancer.record_execution_time(
                        cluster_name, report.execution_time
                    )
                    
                    completed += 1
                    self.logger.info(
                        f"Completed {completed}/{self.state.total_clusters}: {cluster_name}"
                    )
                    
                    # Progress update
                    self._print_progress()
                    
                except Exception as e:
                    self.logger.error(
                        f"Cluster {cluster_name} failed with error: {e}", 
                        exc_info=True
                    )

        # Final report
        self._generate_final_report()

        if self.webhook_reporter:
            self._send_final_webhook()
            
    def _print_progress(self):
        """Print current progress"""
        with self.state.lock:
            print(f"\n{'=' * 70}")
            print(
                f"Progress: {self.state.completed_clusters}/{self.state.total_clusters} clusters"
            )
            print(
                f"Entries: {self.state.total_entries_successful}/{self.state.total_entries_executed} successful"
            )
            print(f"Success Rate: {self.state.overall_success_rate:.1f}%")
            print(f"Elapsed: {self.state.elapsed_time}")

            # Worker status
            print("\nWorker Status:")
            for worker_id, state in self.state.worker_states.items():
                status = (
                    f"Processing: {state.current_cluster}"
                    if state.current_cluster
                    else "Idle"
                )
                print(
                    f"  Worker {worker_id}: {state.clusters_completed} completed | {status}"
                )

            print(f"{'=' * 70}\n")

    def _generate_final_report(self):
        """Generate comprehensive final report"""

        report_path = (
            utility_paths.SRC_DIR
            / "execution_reports"
            / f"execution_report_{int(time.time())}.json"
        )
        report_path.parent.mkdir(parents=True, exist_ok=True)

        report = {
            "execution_summary": {
                "start_time": time.strftime(
                    "%Y-%m-%d %H:%M:%S", time.localtime(self.state.start_time)
                ),
                "end_time": time.strftime("%Y-%m-%d %H:%M:%S"),
                "total_execution_time": self.state.elapsed_time,
                "total_clusters": self.state.total_clusters,
                "completed_clusters": self.state.completed_clusters,
                "total_entries_executed": self.state.total_entries_executed,
                "total_entries_successful": self.state.total_entries_successful,
                "overall_success_rate": self.state.overall_success_rate,
            },
            "worker_statistics": {
                f"worker_{worker_id}": {
                    "clusters_completed": state.clusters_completed,
                    "total_execution_time": state.total_execution_time,
                }
                for worker_id, state in self.state.worker_states.items()
            },
            "cluster_reports": [
                report.to_dict() for report in self.state.cluster_reports
            ],
            "error_summary": self._generate_error_summary(),
        }

        general_utils.write_json(report_path, report)
        self.logger.info(f"Final report saved to: {report_path}")

        # Print summary
        print("\n" + "=" * 80)
        print("FINAL EXECUTION REPORT")
        print("=" * 80)
        print(f"Total Clusters: {self.state.total_clusters}")
        print(f"Completed: {self.state.completed_clusters}")
        print(f"Total Entries Executed: {self.state.total_entries_executed}")
        print(f"Total Entries Successful: {self.state.total_entries_successful}")
        print(f"Overall Success Rate: {self.state.overall_success_rate:.1f}%")
        print(f"Total Time: {self.state.elapsed_time}")
        print("=" * 80 + "\n")

    def _generate_error_summary(self) -> Dict:
        """Generate summary of all errors"""

        error_summary = {
            "total_errors": 0,
            "errors_by_type": defaultdict(int),
            "errors_by_language": defaultdict(int),
            "errors_by_cluster": defaultdict(int),
            "detailed_errors": [],
        }

        for report in self.state.cluster_reports:
            for error in report.errors:
                error_summary["total_errors"] += 1
                error_summary["errors_by_cluster"][report.cluster_name] += 1

                if "language" in error:
                    error_summary["errors_by_language"][error["language"]] += 1

                if "execution_type" in error:
                    error_summary["errors_by_type"][error["execution_type"]] += 1

                error_summary["detailed_errors"].append(error)

        # Convert defaultdicts to regular dicts
        error_summary["errors_by_type"] = dict(error_summary["errors_by_type"])
        error_summary["errors_by_language"] = dict(error_summary["errors_by_language"])
        error_summary["errors_by_cluster"] = dict(error_summary["errors_by_cluster"])

        return error_summary

    def _send_final_webhook(self):
        """Send final webhook notification"""
        if not self.webhook_reporter:
            return

        try:
            self.webhook_reporter.send_test_results(
                test_name="🎉 Complete Dataset Execution Finished",
                duration=self.state.elapsed_time,
                files_executed=self.state.completed_clusters,
                total_files=self.state.total_clusters,
                tests_passed=self.state.total_entries_successful,
                total_tests=self.state.total_entries_executed,
                errors=self.state.total_entries_executed
                - self.state.total_entries_successful,
                additional_info={
                    "Success Rate": f"{self.state.overall_success_rate:.1f}%",
                    "Workers Used": str(self.num_workers),
                },
                custom_message="All clusters processed!",
            )
        except Exception as e:
            self.logger.error(f"Failed to send final webhook: {e}")


def execute_cluster_standalone(
    cluster_name: str,
    prompt_version: int,
    max_workers: int,
    num_workers: int
) -> Tuple[ClusterExecutionReport, int]:
    """
    Funzione standalone per esecuzione cluster (picklable)
    Deve essere a livello modulo per essere serializzabile
    """
    import os
    
    # Setup logging per questo processo
    logger = logging.getLogger(f"Worker-{os.getpid()}")
    
    # Calcola worker_id basato su PID
    worker_id = os.getpid() % num_workers
    
    logger.info(f"Worker {worker_id} (PID: {os.getpid()}) executing cluster: {cluster_name}")
    
    # Crea un nuovo executor per questo processo
    executor = ClusterExecutor()
    
    # Esegui il cluster
    report = executor.execute_cluster(
        cluster_name,
        prompt_version=prompt_version,
        max_workers=max_workers,
    )
    
    return report, worker_id

def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description=" Parallel Test Runner")

    parser.add_argument(
        "--num-workers",
        type=int,
        default=3,
        help="Number of parallel worker threads (default: 3)",
    )
    parser.add_argument(
        "--max-workers-per-cluster",
        type=int,
        default=4,
        help="Max workers per cluster execution (default: 4)",
    )
    parser.add_argument(
        "--webhook-interval",
        type=int,
        default=5,
        help="Webhook notification interval (default: 5)",
    )
    parser.add_argument(
        "--no-webhook", action="store_true", help="Disable Discord webhooks"
    )
    parser.add_argument(
        "--prompt-version",
        type=int,
        default=-1,
        choices=[-1, 1, 2, 3, 4],
        help="LLM prompt version (-1 for all)",
    )

    args = parser.parse_args()

    # Load environment
    load_dotenv()

    # Get webhook URL
    webhook_url = None if args.no_webhook else os.getenv("DISCORD_WEBHOOK_RUN_ALL")

    # Create runner
    runner = ParallelRunner(
        num_workers=args.num_workers,
        max_workers_per_cluster=args.max_workers_per_cluster,
        webhook_url=webhook_url,
        webhook_interval=webhook_url,
    )

    sanity_c = sanity_checker.SanityChecker()
    sanity_c.sanity_checks()

    try:
        runner.run_all_pending(prompt_version=args.prompt_version)
        print("\n✓ All executions completed successfully!")
        return 0

    except KeyboardInterrupt:
        print("\n\nExecution interrupted by user")
        return 130

    except Exception as e:
        print(f"\n✗ Fatal error: {e}")
        logging.error(f"Fatal error: {e}", exc_info=True)
        return 1


if __name__ == "__main__":
    exit(main())
