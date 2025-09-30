#!/usr/bin/env python3
"""
Test Runner System for Code Snippet Testing
Provides accurate metrics collection, efficient container management, and reliable execution tracking.
"""

import os
import json
import subprocess
import shutil
import time
import threading
import logging
import re
import atexit
from pathlib import Path
from dataclasses import dataclass, field
from typing import Dict, List, Set, Optional, Tuple, Any
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict
import argparse

from utility_dir import utility_paths
from discordInteraction import create_webhook_reporter
from dotenv import load_dotenv

# Global configuration
BASE_DIR = utility_paths.SRC_DIR
DATASET_DIR = utility_paths.DATASET_DIR
OUTPUT_DIR = utility_paths.OUTPUT_DIR_FILEPATH
CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"


@dataclass
class ExecutionMetrics:
    """Accurate metrics container with validation"""

    execution_time_ms: Optional[int] = None
    cpu_usage: Optional[float] = None
    ram_usage: Optional[int] = None
    regression_test_passed: bool = False
    success: bool = False
    error_message: Optional[str] = None
    log_path: Optional[str] = None

    def is_valid(self) -> bool:
        """Check if metrics are meaningful"""
        return (
            self.execution_time_ms is not None
            and self.cpu_usage is not None
            and self.ram_usage is not None
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization"""
        return {
            "execution_time_ms": self.execution_time_ms,
            "CPU_usage": self.cpu_usage,
            "RAM_usage": self.ram_usage,
            "regressionTestPassed": self.regression_test_passed,
            "success": self.success,
            "error_message": self.error_message,
            "log_path": self.log_path,
        }


@dataclass
class TestResult:
    """Container for test execution results"""

    entry_id: str
    language: str
    test_type: str
    metrics: ExecutionMetrics
    llm_results: List[Dict[str, Any]] = field(default_factory=list)
    timestamp: float = field(default_factory=time.time)


@dataclass
class ExecutionState:
    """Global execution state tracking"""

    start_time: float = field(default_factory=time.time)
    completed_tests: int = 0
    successful_tests: int = 0
    failed_tests: int = 0
    current_cluster: str = ""
    total_clusters: int = 0
    processed_clusters: Set[str] = field(default_factory=set)

    @property
    def elapsed_time(self) -> str:
        elapsed = time.time() - self.start_time
        hours = int(elapsed // 3600)
        minutes = int((elapsed % 3600) // 60)
        seconds = int(elapsed % 60)
        return f"{hours:02d}h {minutes:02d}m {seconds:02d}s"

    @property
    def success_rate(self) -> float:
        return (
            (self.successful_tests / self.completed_tests * 100)
            if self.completed_tests > 0
            else 0.0
        )


class MetricsParser:
    """Enhanced metrics parser with better accuracy and error handling"""

    @staticmethod
    def parse_time_output(log_content: str) -> ExecutionMetrics:
        """Parse time command output with multiple fallback strategies"""
        metrics = ExecutionMetrics()

        try:
            # Strategy 1: User + System time (most accurate)
            user_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)
            system_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)

            if user_match and system_match:
                user_time = float(user_match.group(1))
                system_time = float(system_match.group(1))
                metrics.execution_time_ms = int((user_time + system_time) * 1000)

            # Strategy 2: Wall clock time
            elif not metrics.execution_time_ms:
                wall_match = re.search(
                    r"Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+):(\d+\.?\d*)",
                    log_content,
                )
                if wall_match:
                    minutes = int(wall_match.group(1))
                    seconds = float(wall_match.group(2))
                    metrics.execution_time_ms = int((minutes * 60 + seconds) * 1000)

            # Strategy 3: Real time from bash time
            elif not metrics.execution_time_ms:
                real_match = re.search(r"real\s+(\d+)m([\d.]+)s", log_content)
                if real_match:
                    minutes = int(real_match.group(1))
                    seconds = float(real_match.group(2))
                    metrics.execution_time_ms = int((minutes * 60 + seconds) * 1000)

            # RAM Usage
            ram_match = re.search(
                r"Maximum resident set size \(kbytes\): (\d+)", log_content
            )
            if ram_match:
                metrics.ram_usage = int(ram_match.group(1))

            # CPU Usage
            cpu_match = re.search(
                r"Percent of CPU this job got: (\d+\.?\d*)%", log_content
            )
            if cpu_match:
                metrics.cpu_usage = float(cpu_match.group(1))

            # Test Results
            # Check for various test failure patterns
            failure_patterns = [
                r"Failures: (\d+)",
                r"FAILED.*?(\d+)",
                r"(\d+) failed",
                r"Tests failed: (\d+)",
                r"FAIL:",
                r"Error:",
                r"Exception:",
            ]

            test_failed = False
            for pattern in failure_patterns:
                match = re.search(pattern, log_content, re.IGNORECASE)
                if match:
                    if pattern == r"Failures: (\d+)":
                        failures = int(match.group(1))
                        test_failed = failures > 0
                    else:
                        test_failed = True
                    break

            metrics.regression_test_passed = not test_failed
            metrics.success = metrics.is_valid() and not test_failed

        except Exception as e:
            metrics.error_message = f"Parsing error: {str(e)}"
            logging.error(f"Metrics parsing failed: {e}")

        return metrics

    @staticmethod
    def parse_typescript_json(log_path: Path) -> ExecutionMetrics:
        """Parse TypeScript/Jest JSON output"""
        metrics = ExecutionMetrics()

        try:
            with open(log_path, "r") as f:
                data = json.load(f)

            # Extract timing
            if "startTime" in data and "testResults" in data and data["testResults"]:
                start_time = data.get("startTime", 0)
                end_time = data.get("testResults", [{}])[0].get("endTime", start_time)
                metrics.execution_time_ms = max(0, end_time - start_time)

            # Extract test results
            metrics.regression_test_passed = data.get("numFailedTests", 1) == 0

            # Look for resource usage in separate file
            resource_log = log_path.parent / "resource_usage.log"
            if resource_log.exists():
                with open(resource_log, "r") as f:
                    resource_content = f.read()

                ram_match = re.search(
                    r"Maximum resident set size \(kbytes\): (\d+)", resource_content
                )
                if ram_match:
                    metrics.ram_usage = int(ram_match.group(1))

                cpu_match = re.search(
                    r"Percent of CPU this job got: (\d+\.?\d*)%", resource_content
                )
                if cpu_match:
                    metrics.cpu_usage = float(cpu_match.group(1))

            metrics.success = metrics.is_valid()

        except Exception as e:
            metrics.error_message = f"TypeScript parsing error: {str(e)}"
            logging.error(f"TypeScript metrics parsing failed: {e}")

        return metrics


class ContainerManager:
    """Improved container management with health checking and resource optimization"""

    def __init__(self):
        self.active_containers: Dict[str, str] = {}
        self.container_health: Dict[str, bool] = {}
        self.container_usage: Dict[str, int] = {}
        self.max_usage_before_refresh = 50
        self.lock = threading.RLock()
        self.logger = logging.getLogger(__name__ + ".ContainerManager")

    def get_container_name(self, language: str) -> str:
        """Generate consistent container name for language"""
        return f"test_runner_{language.lower()}_persistent"

    def is_container_healthy(self, container_name: str) -> bool:
        """Check if container is running and healthy"""
        try:
            result = subprocess.run(
                ["docker", "inspect", "--format", "{{.State.Status}}", container_name],
                capture_output=True,
                text=True,
                timeout=10,
            )

            if result.returncode == 0:
                status = result.stdout.strip().lower()
                return status in ["running", "created"]
        except subprocess.TimeoutExpired:
            self.logger.warning(f"Timeout checking container health: {container_name}")
        except Exception as e:
            self.logger.error(f"Error checking container health: {e}")

        return False

    def cleanup_container(self, container_name: str):
        """Safely cleanup a container"""
        commands = [
            ["docker", "stop", container_name],
            ["docker", "rm", container_name],
            ["docker", "rmi", container_name],  # Remove image for fresh build
        ]

        for cmd in commands:
            try:
                subprocess.run(cmd, capture_output=True, timeout=30)
            except subprocess.TimeoutExpired:
                self.logger.warning(f"Timeout running: {' '.join(cmd)}")
            except Exception:
                pass  # Continue cleanup even if some commands fail

    def build_container(self, language: str, use_cache: bool = True) -> str:
        """Build container for specific language"""
        container_name = self.get_container_name(language)
        dockerfile_path = DOCKER_DIR / language.lower()

        if not dockerfile_path.exists():
            raise FileNotFoundError(f"Docker configuration not found for {language}")

        # Cleanup existing container/image
        self.cleanup_container(container_name)

        # Build new container
        build_cmd = ["docker", "build", "-t", container_name, str(dockerfile_path)]
        if not use_cache:
            build_cmd.insert(-2, "--no-cache")

        try:
            result = subprocess.run(
                build_cmd,
                capture_output=True,
                text=True,
                timeout=600,  # 10 minutes timeout
            )

            if result.returncode != 0:
                raise subprocess.CalledProcessError(
                    result.returncode, build_cmd, result.stdout, result.stderr
                )

            self.logger.info(f"Successfully built container: {container_name}")
            return container_name

        except subprocess.TimeoutExpired:
            raise TimeoutError(f"Container build timeout for {language}")
        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"Container build failed for {language}: {e.stderr}")

    def get_or_create_container(self, language: str, use_cache: bool = True) -> str:
        """Get existing healthy container or create new one"""
        with self.lock:
            # Check if we have a healthy container
            if language in self.active_containers:
                existing_name = self.active_containers[language]
                usage_count = self.container_usage.get(language, 0)

                if (
                    self.is_container_healthy(existing_name)
                    and usage_count < self.max_usage_before_refresh
                ):
                    self.container_usage[language] = usage_count + 1
                    return existing_name
                else:
                    # Container unhealthy or overused, remove from tracking
                    if language in self.active_containers:
                        del self.active_containers[language]
                    if language in self.container_usage:
                        del self.container_usage[language]

            # Build new container
            try:
                new_container = self.build_container(language, use_cache)
                self.active_containers[language] = new_container
                self.container_usage[language] = 1
                self.container_health[language] = True
                return new_container

            except Exception as e:
                self.logger.error(f"Failed to create container for {language}: {e}")
                raise

    def cleanup_all(self):
        """Cleanup all managed containers"""
        with self.lock:
            for container_name in self.active_containers.values():
                self.cleanup_container(container_name)

            self.active_containers.clear()
            self.container_usage.clear()
            self.container_health.clear()


class TestExecutor:
    """test executor with improved accuracy and reliability"""

    def __init__(self, container_manager: ContainerManager):
        self.container_manager = container_manager
        self.logger = logging.getLogger(__name__ + ".TestExecutor")

    def setup_test_environment(
        self, language: str, mount_path: Path, llm_dir: str = ""
    ):
        """Setup test environment with proper file copying and configuration"""
        dockerfile_path = DOCKER_DIR / language.lower()

        # Copy run.sh
        run_sh_src = dockerfile_path / "run.sh"
        run_sh_dest = mount_path / "run.sh"

        if run_sh_src.exists():
            shutil.copy2(run_sh_src, run_sh_dest)
            run_sh_dest.chmod(0o755)  # Make executable

        if llm_dir:
            llm_run_sh = mount_path / llm_dir / "run.sh"
            llm_run_sh.parent.mkdir(parents=True, exist_ok=True)
            if run_sh_src.exists():
                shutil.copy2(run_sh_src, llm_run_sh)
                llm_run_sh.chmod(0o755)

        # Language-specific setup
        if language == "javascript":
            self._setup_javascript(dockerfile_path, mount_path)
        elif language == "typescript":
            self._setup_typescript(dockerfile_path, mount_path)
        elif language == "python":
            self._setup_python(dockerfile_path, mount_path)
        elif language == "cpp" or language == "c":
            self._setup_cpp_or_c(dockerfile_path, mount_path)

    def _setup_javascript(self, dockerfile_path: Path, mount_path: Path):
        """Setup JavaScript environment"""
        files_to_copy = ["package.json", "jest.config.js"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            dest_file = mount_path / filename
            if src_file.exists():
                shutil.copy2(src_file, dest_file)

    def _setup_typescript(self, dockerfile_path: Path, mount_path: Path):
        """Setup TypeScript environment"""
        # Copy TypeScript config from dataset
        tsconfig_src = DATASET_DIR / "typescript" / "tsconfig.json"
        if tsconfig_src.exists():
            shutil.copy2(tsconfig_src, mount_path / "tsconfig.json")

        # Copy package.json and jest config
        files_to_copy = ["package.json", "jest.config.js"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            dest_file = mount_path / filename
            if src_file.exists():
                shutil.copy2(src_file, dest_file)

        # Clean node_modules
        node_modules = mount_path / "node_modules"
        if node_modules.exists() and not node_modules.is_symlink():
            shutil.rmtree(node_modules)

    def _setup_python(self, dockerfile_path: Path, mount_path: Path):
        """Setup Python environment"""
        utils_src = dockerfile_path / "utils"
        utils_dest = mount_path / "utils"
        if utils_src.exists() and not utils_dest.exists():
            shutil.copytree(utils_src, utils_dest)

    def _setup_cpp_or_c(self, dockerfile_path: Path, mount_path: Path):
        """Setup C/C++ environment"""
        # Copy Makefile
        makefile_src = dockerfile_path / "Makefile"
        if makefile_src.exists():
            shutil.copy2(makefile_src, mount_path / "Makefile")

    def execute_test(
        self,
        entry: Dict,
        language: str,
        test_type: str = "base",
        llm_info: Optional[Dict] = None,
        use_cache: bool = True,
    ) -> TestResult:
        """Execute single test with comprehensive error handling and metrics collection"""

        # Get test path (dir path of dir in with there is the test file)
        test_path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
        container_name = self.container_manager.get_or_create_container(
            language, use_cache
        )

        # Setup environment
        llm_dir = ""
        if llm_info and test_type == "llm":
            llm_dir = Path(llm_info["path"]).parent.name

        self.setup_test_environment(language, test_path, llm_dir)

        # Handle LLM code substitution if needed
        original_file_backup = None
        if llm_info and test_type == "llm":
            original_file_backup = self._substitute_llm_code(entry, llm_info, test_path)

        try:
            # Execute the test
            metrics = self._run_container_test(
                language,
                test_path,
                container_name,
                entry["id"],
                entry["filename"],
                llm_dir,
            )

            # Create result
            result = TestResult(
                entry_id=entry["id"],
                language=language,
                test_type=test_type,
                metrics=metrics,
            )

            if llm_info:
                result.llm_results = [
                    {
                        **metrics.to_dict(),
                        "LLM_type": llm_info["type"],
                        "path": llm_info["path"],
                        "filename": llm_info["filename"],
                    }
                ]

            return result

        finally:
            # Restore original file if LLM substitution was made
            if original_file_backup:
                self._restore_original_code(original_file_backup)

    def _substitute_llm_code(
        self, entry: Dict, llm_info: Dict, test_path: Path
    ) -> Optional[Tuple[Path, Path]]:
        """Substitute LLM code with backup of original"""
        try:
            language = entry["language"]
            llm_code_path: Path = DATASET_DIR / llm_info["path"]
            original_code_path: Path = DATASET_DIR / entry["codeSnippetFilePath"]

            if language == "c" or language == "cpp" or llm_code_path.is_dir():
                llm_code_path = DATASET_DIR / llm_info["path"] / llm_info["filename"]

            if original_code_path.is_dir() or language == "c" or language == "cpp":
                original_code_path = (
                    DATASET_DIR / entry["codeSnippetFilePath"] / entry["filename"]
                )

            if not llm_code_path.exists():
                self.logger.warning(f"LLM code file not found: {llm_code_path}")
                return None

            # Create backup
            backup_path = original_code_path.with_suffix(".backup")
            shutil.copy2(original_code_path, backup_path)

            # Substitute LLM code
            shutil.copy2(llm_code_path, original_code_path)

            return (original_code_path, backup_path)

        except Exception as e:
            self.logger.error(f"Failed to substitute LLM code: {e}")
            return None

    def _restore_original_code(self, backup_info: Tuple[Path, Path]):
        """Restore original code from backup"""
        try:
            original_path, backup_path = backup_info
            shutil.move(backup_path, original_path)
        except Exception as e:
            self.logger.error(f"Failed to restore original code: {e}")

    def _run_container_test(
        self,
        language: str,
        mount_path: Path,
        container_name: str,
        entry_id: str,
        filename: str,
        llm_dir: str = "",
    ) -> ExecutionMetrics:
        """Run container test with comprehensive metrics collection"""

        # Prepare log file path
        log_file = mount_path / "output.log"

        # Prepare docker run command with resource monitoring
        if language.lower() == "java":
            docker_cmd = [
                "docker",
                "run",
                "--rm",
                "-v",
                f"{mount_path}:/app",
                container_name,
                filename,
            ]
        else:
            docker_cmd = [
                "docker",
                "run",
                "--rm",
                "--memory=4g",
                "--cpus=2.0",
                "-v",
                f"{mount_path}:/app",
                container_name,
            ]

        try:
            # Execute with timeout
            result = subprocess.run(
                docker_cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                timeout=300,  # 5 minute timeout
            )

            # Parse metrics from log
            metrics = ExecutionMetrics()

            if log_file.exists():
                with open(log_file, "r") as f:
                    log_content = f.read()

                if language == "typescript" and log_content.strip().startswith("{"):
                    # JSON output from Jest
                    metrics = MetricsParser.parse_typescript_json(log_file)
                else:
                    # Standard time output
                    metrics = MetricsParser.parse_time_output(log_content)

                # Save log for debugging
                log_archive = (
                    LOGS_DIR / f"{container_name}_{entry_id}_{int(time.time())}.log"
                )
                log_archive.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(log_file, log_archive)
                metrics.log_path = str(log_archive)

            else:
                self.logger.warning(f"No output.log found for {entry_id}")
                metrics.error_message = "No output.log generated"

            # Check docker exit code
            if result.returncode != 0:
                metrics.regression_test_passed = False
                if not metrics.error_message:
                    metrics.error_message = f"Docker exit code: {result.returncode}"

            return metrics

        except subprocess.TimeoutExpired:
            self.logger.error(f"Test timeout for {entry_id}")
            metrics = ExecutionMetrics()
            metrics.error_message = "Test execution timeout"
            return metrics

        except Exception as e:
            self.logger.error(f"Test execution failed for {entry_id}: {e}")
            metrics = ExecutionMetrics()
            metrics.error_message = str(e)
            return metrics


class EnhancedClusterRunner:
    """Main orchestrator for cluster testing with improved reliability and performance"""

    def __init__(self, max_workers: int = 4):
        self.max_workers = max_workers
        self.container_manager = ContainerManager()
        self.test_executor = TestExecutor(self.container_manager)
        self.execution_state = ExecutionState()
        self.results_cache: Dict[str, TestResult] = {}
        self.lock = threading.RLock()

        # Setup logging
        self._setup_logging()

        # Register cleanup
        atexit.register(self.cleanup)

    def _setup_logging(self):
        """Setup comprehensive logging"""
        LOGS_DIR.mkdir(parents=True, exist_ok=True)

        log_file = LOGS_DIR / f"test_runner_{int(time.time())}.log"

        logging.basicConfig(
            level=logging.INFO,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            handlers=[logging.FileHandler(log_file), logging.StreamHandler()],
        )

        self.logger = logging.getLogger(__name__ + ".ClusterRunner")

    def load_cluster_data(self, cluster_path: Path) -> Dict[str, List[Dict]]:
        """Load and validate cluster data"""
        try:
            with open(cluster_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            if not isinstance(data, dict):
                raise ValueError("Cluster data must be a dictionary")

            # Validate structure
            for language, entries in data.items():
                if not isinstance(entries, list):
                    raise ValueError(f"Language {language} must have list of entries")

                for entry in entries:
                    required_fields = [
                        "id",
                        "filename",
                        "language",
                        "codeSnippetFilePath",
                        "testUnitFilePath",
                    ]
                    missing = [field for field in required_fields if field not in entry]
                    if missing:
                        raise ValueError(
                            f"Entry {entry.get('id', 'unknown')} missing fields: {missing}"
                        )

            self.logger.info(
                f"Loaded cluster data with {sum(len(entries) for entries in data.values())} entries"
            )
            return data

        except Exception as e:
            self.logger.error(f"Failed to load cluster data from {cluster_path}: {e}")
            raise

    def run_cluster_tests(
        self,
        cluster_path: Path,
        base_only: bool = False,
        llm_only: bool = False,
        prompt_version: int = 1,
        use_cache: bool = True,
        full: bool = False,
    ) -> Tuple[List[TestResult], List[TestResult]]:
        """Run all tests for a cluster with comprehensive error handling

        Returns:
            Tuple[base_results, llm_results] - Separate results for base and LLM tests
        """

        cluster_data = self.load_cluster_data(cluster_path)
        self.execution_state.current_cluster = cluster_path.stem

        # Validate execution mode
        mode_count = sum([base_only, llm_only, full])
        if mode_count != 1:
            raise ValueError(
                "Must specify exactly one of: --base-only, --llm-only, or --full"
            )

        # Prepare test tasks
        base_tasks = []
        llm_tasks = []

        for language, entries in cluster_data.items():
            for entry in entries:
                # Base test tasks
                if base_only or full:
                    base_tasks.append(
                        {
                            "entry": entry,
                            "language": language,
                            "test_type": "base",
                            "llm_info": None,
                            "use_cache": use_cache,
                        }
                    )

                # LLM test tasks
                if (llm_only or full) and "LLMs" in entry:
                    for llm in entry["LLMs"]:
                        if f"_v{prompt_version}" in llm.get("filename", ""):
                            llm_tasks.append(
                                {
                                    "entry": entry,
                                    "language": language,
                                    "test_type": "llm",
                                    "llm_info": llm,
                                    "use_cache": use_cache,
                                }
                            )

        total_tasks = len(base_tasks) + len(llm_tasks)
        self.logger.info(
            f"Starting {total_tasks} tests for cluster {cluster_path.stem} "
            f"(Base: {len(base_tasks)}, LLM: {len(llm_tasks)})"
        )

        # Execute tests in parallel
        base_results = []
        llm_results = []

        # Execute base tests first if needed
        if base_tasks:
            self.logger.info(f"Executing {len(base_tasks)} base tests...")
            base_results = self._execute_task_batch(base_tasks, "Base")

        # Execute LLM tests if needed
        if llm_tasks:
            self.logger.info(f"Executing {len(llm_tasks)} LLM tests...")
            llm_results = self._execute_task_batch(llm_tasks, "LLM")

        self._report_final_results(base_results + llm_results)
        return base_results, llm_results

    def _execute_task_batch(
        self, tasks: List[Dict], batch_name: str
    ) -> List[TestResult]:
        """Execute a batch of tasks in parallel"""
        results = []

        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit all tasks
            future_to_task = {
                executor.submit(self._execute_single_test, task): task for task in tasks
            }

            # Collect results
            for future in as_completed(future_to_task):
                try:
                    result = future.result(timeout=600)  # 10 minute timeout per test
                    results.append(result)

                    with self.lock:
                        self.execution_state.completed_tests += 1
                        if result.metrics.success:
                            self.execution_state.successful_tests += 1
                        else:
                            self.execution_state.failed_tests += 1

                    # Progress reporting
                    if self.execution_state.completed_tests % 10 == 0:
                        self._report_progress(batch_name)

                except Exception as e:
                    self.logger.error(f"{batch_name} test execution failed: {e}")
                    with self.lock:
                        self.execution_state.completed_tests += 1
                        self.execution_state.failed_tests += 1

        return results

    def _execute_single_test(self, task: Dict) -> TestResult:
        """Execute single test task"""
        return self.test_executor.execute_test(
            entry=task["entry"],
            language=task["language"],
            test_type=task["test_type"],
            llm_info=task["llm_info"],
            use_cache=task["use_cache"],
        )

    def _report_progress(self, batch_name: str = ""):
        """Report current progress"""
        state = self.execution_state
        batch_prefix = f"{batch_name} " if batch_name else ""
        print(
            f"{batch_prefix}Progress: {state.completed_tests} completed | "
            f"Success: {state.successful_tests} ({state.success_rate:.1f}%) | "
            f"Failed: {state.failed_tests} | "
            f"Elapsed: {state.elapsed_time}"
        )

    def _report_final_results(self, results: List[TestResult]):
        """Report final test results"""
        total = len(results)
        successful = sum(1 for r in results if r.metrics.success)

        print("\n" + "=" * 60)
        print("CLUSTER TEST RESULTS")
        print("=" * 60)
        print(f"Total tests executed: {total}")
        print(f"Successful tests: {successful} ({successful / total * 100:.1f}%)")
        print(f"Failed tests: {total - successful}")
        print(f"Total execution time: {self.execution_state.elapsed_time}")
        print("=" * 60)

    def save_results(
        self, results: List[TestResult], output_path: Path, test_type_suffix: str = ""
    ):
        """Save results to JSON file with comprehensive metadata"""
        output_data = {
            "execution_date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "execution_metadata": {
                "total_tests": len(results),
                "successful_tests": sum(1 for r in results if r.metrics.success),
                "execution_time": self.execution_state.elapsed_time,
                "cluster": self.execution_state.current_cluster,
                "test_type": test_type_suffix,
            },
            "results": defaultdict(list),
        }

        for result in results:
            entry_data = {
                "id": result.entry_id,
                "language": result.language,
                "timestamp": result.timestamp,
            }

            # Add base metrics
            if result.test_type == "base" or not result.llm_results:
                entry_data.update(result.metrics.to_dict())

            # Add LLM results
            if result.llm_results:
                entry_data["LLM_results"] = result.llm_results

            output_data["results"][result.language].append(entry_data)

        # Convert defaultdict to regular dict for JSON serialization
        output_data["results"] = dict(output_data["results"])

        # Ensure output directory exists
        output_path.parent.mkdir(parents=True, exist_ok=True)

        # Save with pretty formatting
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)

        self.logger.info(f"Results saved to {output_path}")

    def cleanup(self):
        """Cleanup all resources"""
        self.logger.info("Cleaning up resources...")
        self.container_manager.cleanup_all()


class ClusterManager:
    """Manages cluster discovery and execution tracking"""

    def __init__(self, clusters_dir: Path, output_dir: Path):
        self.clusters_dir = clusters_dir
        self.output_dir = output_dir
        self.logger = logging.getLogger(__name__ + ".ClusterManager")

    def discover_clusters(self) -> List[Path]:
        """Discover all available cluster files"""
        if not self.clusters_dir.exists():
            self.logger.error(f"Clusters directory not found: {self.clusters_dir}")
            return []

        cluster_files = []
        for file_path in self.clusters_dir.glob("cluster_*.json"):
            if not any(
                skip in file_path.name for skip in ["debug", "test", "bad_entries"]
            ):
                cluster_files.append(file_path)

        self.logger.info(f"Discovered {len(cluster_files)} cluster files")
        return sorted(cluster_files)

    def is_cluster_completed(
        self, cluster_name: str, test_type: str, prompt_version: int = 1
    ) -> bool:
        """Check if cluster tests are already completed"""
        if test_type == "base":
            pattern = f"{cluster_name}_results_*.json"
        elif test_type == "llm":
            pattern = f"{cluster_name}_results_v{prompt_version}_*.json"
        else:  # full execution - check both patterns
            base_pattern = f"{cluster_name}_results_*.json"
            llm_pattern = f"{cluster_name}_results_v{prompt_version}_*.json"

            base_completed = len(list(self.output_dir.glob(base_pattern))) >= 3
            llm_completed = len(list(self.output_dir.glob(llm_pattern))) >= 3

            return base_completed and llm_completed

        matching_files = list(self.output_dir.glob(pattern))

        # Consider completed if we have at least 3 successful runs
        valid_files = 0
        for file_path in matching_files:
            if self._validate_output_file(file_path):
                valid_files += 1
                if valid_files >= 3:
                    return True

        return False

    def _validate_output_file(self, file_path: Path) -> bool:
        """Validate that output file contains meaningful results"""
        try:
            with open(file_path, "r") as f:
                data = json.load(f)

            results = data.get("results", {})
            if not results:
                return False

            # Check if we have entries with meaningful metrics
            for language, entries in results.items():
                for entry in entries:
                    # Check for base metrics
                    if (
                        "execution_time_ms" in entry
                        and entry["execution_time_ms"] is not None
                        and "CPU_usage" in entry
                        and entry["CPU_usage"] is not None
                        and "RAM_usage" in entry
                        and entry["RAM_usage"] is not None
                    ):
                        return True

                    # Or LLM results
                    if "LLM_results" in entry and entry["LLM_results"]:
                        for llm_result in entry["LLM_results"]:
                            if (
                                llm_result.get("execution_time_ms") is not None
                                and llm_result.get("CPU_usage") is not None
                                and llm_result.get("RAM_usage") is not None
                            ):
                                return True

            return False

        except Exception as e:
            self.logger.warning(f"Error validating output file {file_path}: {e}")
            return False

    def get_pending_clusters(
        self, test_type: str, prompt_version: int = 1
    ) -> List[Path]:
        """Get clusters that need to be processed"""
        all_clusters = self.discover_clusters()
        pending = []

        for cluster_path in all_clusters:
            cluster_name = cluster_path.stem.replace("cluster_", "")
            if prompt_version == -1:  # all prompt v
                for p_v in range(1, 5):
                    if not self.is_cluster_completed(cluster_name, test_type, p_v):
                        pending.append(cluster_path)
            elif not self.is_cluster_completed(cluster_name, test_type, prompt_version):
                pending.append(cluster_path)

        if prompt_version != -1:
            v = "all prompt v"
        else:
            v = f"v{prompt_version}"
        self.logger.info(f"Found {len(pending)} pending clusters for {test_type} {v}")
        return pending


def send_webhook_notification(webhook_url: str, results_summary: Dict):
    """Send Discord webhook notification"""
    try:
        if not webhook_url:
            return

        reporter = create_webhook_reporter(webhook_url, "Enhanced Test Runner")

        success = reporter.send_test_results(
            test_name=f"Cluster Tests: {results_summary['cluster']}",
            duration=results_summary["duration"],
            files_executed=results_summary["completed"],
            total_files=results_summary["total"],
            tests_passed=results_summary["successful"],
            total_tests=results_summary["total"],
            errors=results_summary["failed"],
            additional_info={
                "Run Number : ": results_summary["run #"],
                "Prompt Version : ": results_summary["prompt version"],
                "Success Rate": f"{results_summary['success_rate']:.1f}%",
                "Test Type": results_summary["test_type"],
            },
            custom_message="Enhanced test execution completed!",
        )

        if success:
            print("Webhook notification sent successfully!")

    except Exception as e:
        logging.error(f"Failed to send webhook: {e}")


def main():
    """Main entry point with comprehensive argument handling"""
    parser = argparse.ArgumentParser(
        description="Enhanced Test Runner for Code Snippets"
    )

    # Test execution options
    parser.add_argument(
        "--base-only", action="store_true", help="Run only base code tests"
    )
    parser.add_argument(
        "--llm-only", action="store_true", help="Run only LLM generated code tests"
    )
    parser.add_argument(
        "--full",
        action="store_true",
        help="Run both base and LLM tests (saves separate output files)",
    )
    parser.add_argument(
        "--prompt-version",
        type=int,
        default=1,
        choices=[-1, 1, 2, 3, 4],  # -1 => all prompt v
        help="LLM prompt version to test",
    )

    # Execution control
    parser.add_argument(
        "--max-workers", type=int, default=4, help="Maximum number of parallel workers"
    )
    parser.add_argument(
        "--no-cache", action="store_true", help="Disable Docker build cache"
    )
    parser.add_argument(
        "--run-quantity",
        type=int,
        default=5,
        help="Number of times to run each cluster",
    )
    parser.add_argument(
        "--not-check-pending",
        action="store_true",
        help="Use all clusters for execution, not checking for already run ones",
    )

    # Input/Output
    parser.add_argument(
        "--cluster-name",
        type=str,
        help="Specific cluster to run (without cluster_ prefix)",
    )
    parser.add_argument(
        "--clusters-dir",
        type=Path,
        default=CLUSTERS_DIR,
        help="Directory containing cluster files",
    )
    parser.add_argument(
        "--output-dir", type=Path, default=OUTPUT_DIR, help="Directory to save results"
    )
    parser.add_argument("--output-file", type=str, help="Specific output filename")

    # Notification
    parser.add_argument(
        "--webhook", action="store_true", help="Send Discord webhook notifications"
    )
    parser.add_argument("--silent", action="store_true", help="Reduce output verbosity")

    args = parser.parse_args()

    # Setup logging level
    if args.silent:
        logging.getLogger().setLevel(logging.WARNING)

    # Load environment variables
    try:
        load_dotenv()
    except Exception as e:
        print(f"Error in loading dotenv:\n{e}")
        pass

    # Initialize managers
    cluster_manager = ClusterManager(args.clusters_dir, args.output_dir)
    test_runner = EnhancedClusterRunner(max_workers=args.max_workers)

    try:
        # Determine clusters to process
        if args.cluster_name:
            cluster_path = args.clusters_dir / f"cluster_{args.cluster_name}.json"
            if not cluster_path.exists():
                print(f"Error: Cluster file not found: {cluster_path}")
                return 1
            clusters_to_process = [cluster_path]
        else:
            # Determine test type for pending cluster detection
            if args.full:
                test_type = "full"
            elif args.base_only:
                test_type = "base"
            elif args.llm_only:
                test_type = "llm"
            else:
                print("Error: Must specify one of --base-only, --llm-only, or --full")
                return 1

            if args.not_check_pending:
                clusters_to_process = cluster_manager.discover_clusters()
            else:
                clusters_to_process = cluster_manager.get_pending_clusters(
                    test_type, args.prompt_version
                )

        if args.prompt_version != -1:
            v = "all prompt v"
        else:
            v = f"v{args.prompt_version}"

        if not clusters_to_process:
            test_type_desc = (
                "base" if args.base_only else f"LLM {v}" if args.llm_only else "full"
            )
            print(f"No {test_type_desc} clusters need processing.")
            return 0

        test_type_desc = (
            "base" if args.base_only else f"LLM {v}" if args.llm_only else "full"
        )
        print(f"Processing {len(clusters_to_process)} {test_type_desc} clusters...")

        # Process each cluster
        for cluster_path in clusters_to_process:
            cluster_name = cluster_path.stem.replace("cluster_", "")
            print(f"\nProcessing cluster: {cluster_name}")

            for run_num in range(1, args.run_quantity + 1):
                print(f"Run {run_num}/{args.run_quantity}")

                if args.prompt_version == -1 and not args.base_only:
                    for p_v in range(1, 5):  # all prompt v
                        # Execute tests
                        base_only = args.base_only
                        llm_only = args.llm_only
                        full = args.full
                        if p_v > 1:
                            base_only = False
                            llm_only = True
                            full = False

                        base_results, llm_results = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=base_only,
                            llm_only=llm_only,
                            prompt_version=p_v,
                            use_cache=not args.no_cache,
                            full=full,
                        )

                        # Save results based on execution mode
                        if args.full:
                            # Save base results
                            if base_results:
                                if args.output_file:
                                    base_filename = (
                                        f"{args.output_file}_base_{run_num}.json"
                                    )
                                else:
                                    base_filename = (
                                        f"{cluster_name}_results_{run_num}.json"
                                    )

                                base_output_path = args.output_dir / base_filename
                                test_runner.save_results(
                                    base_results, base_output_path, "base"
                                )

                            # Save LLM results
                            if llm_results:
                                if args.output_file:
                                    llm_filename = (
                                        f"{args.output_file}_llm_v{p_v}_{run_num}.json"
                                    )
                                else:
                                    llm_filename = (
                                        f"{cluster_name}_results_v{p_v}_{run_num}.json"
                                    )

                                llm_output_path = args.output_dir / llm_filename
                                test_runner.save_results(
                                    llm_results, llm_output_path, f"llm_v{p_v}"
                                )

                        elif args.base_only:
                            if args.output_file:
                                output_filename = f"{args.output_file}_{run_num}.json"
                            else:
                                output_filename = (
                                    f"{cluster_name}_results_{run_num}.json"
                                )

                            output_path = args.output_dir / output_filename
                            test_runner.save_results(base_results, output_path, "base")

                        elif args.llm_only:
                            if args.output_file:
                                output_filename = f"{args.output_file}_{run_num}.json"
                            else:
                                output_filename = (
                                    f"{cluster_name}_results_v{p_v}_{run_num}.json"
                                )

                            output_path = args.output_dir / output_filename
                            test_runner.save_results(
                                llm_results, output_path, f"llm_v{p_v}"
                            )

                        # Send webhook notification
                        if args.webhook:
                            webhook_url = os.getenv("DISCORD_WEBHOOK")
                            # all_results = base_results + llm_results
                            results_summary = {
                                "cluster": cluster_name,
                                "duration": test_runner.execution_state.elapsed_time,
                                "completed": test_runner.execution_state.completed_tests,
                                "total": test_runner.execution_state.completed_tests,
                                "successful": test_runner.execution_state.successful_tests,
                                "failed": test_runner.execution_state.failed_tests,
                                "success_rate": test_runner.execution_state.success_rate,
                                "test_type": "full"
                                if args.full
                                else ("base" if args.base_only else "llm"),
                                "run #": run_num,
                                "prompt version": p_v
                            }
                            send_webhook_notification(webhook_url, results_summary)

                        # Reset state for next run
                        test_runner.execution_state = ExecutionState()

                else:
                    # Execute tests
                    base_results, llm_results = test_runner.run_cluster_tests(
                        cluster_path=cluster_path,
                        base_only=args.base_only,
                        llm_only=args.llm_only,
                        prompt_version=args.prompt_version,
                        use_cache=not args.no_cache,
                        full=args.full,
                    )

                    # Save results based on execution mode
                    if args.full:
                        # Save base results
                        if base_results:
                            if args.output_file:
                                base_filename = (
                                    f"{args.output_file}_base_{run_num}.json"
                                )
                            else:
                                base_filename = f"{cluster_name}_results_{run_num}.json"

                            base_output_path = args.output_dir / base_filename
                            test_runner.save_results(
                                base_results, base_output_path, "base"
                            )

                        # Save LLM results
                        if llm_results:
                            if args.output_file:
                                llm_filename = f"{args.output_file}_llm_v{args.prompt_version}_{run_num}.json"
                            else:
                                llm_filename = f"{cluster_name}_results_v{args.prompt_version}_{run_num}.json"

                            llm_output_path = args.output_dir / llm_filename
                            test_runner.save_results(
                                llm_results,
                                llm_output_path,
                                f"llm_v{args.prompt_version}",
                            )

                    elif args.base_only:
                        if args.output_file:
                            output_filename = f"{args.output_file}_{run_num}.json"
                        else:
                            output_filename = f"{cluster_name}_results_{run_num}.json"

                        output_path = args.output_dir / output_filename
                        test_runner.save_results(base_results, output_path, "base")

                    elif args.llm_only:
                        if args.output_file:
                            output_filename = f"{args.output_file}_{run_num}.json"
                        else:
                            output_filename = f"{cluster_name}_results_v{args.prompt_version}_{run_num}.json"

                        output_path = args.output_dir / output_filename
                        test_runner.save_results(
                            llm_results, output_path, f"llm_v{args.prompt_version}"
                        )

                    # Send webhook notification
                    if args.webhook:
                        webhook_url = os.getenv("DISCORD_WEBHOOK")
                        # all_results = base_results + llm_results
                        results_summary = {
                            "cluster": cluster_name,
                            "duration": test_runner.execution_state.elapsed_time,
                            "completed": test_runner.execution_state.completed_tests,
                            "total": test_runner.execution_state.completed_tests,
                            "successful": test_runner.execution_state.successful_tests,
                            "failed": test_runner.execution_state.failed_tests,
                            "success_rate": test_runner.execution_state.success_rate,
                            "test_type": "full"
                            if args.full
                            else ("base" if args.base_only else "llm"),
                            "run #": run_num,
                            "prompt version": args.prompt_version
                        }
                        send_webhook_notification(webhook_url, results_summary)

                    # Reset state for next run
                    test_runner.execution_state = ExecutionState()

        print("\nAll clusters processed successfully!")
        return 0

    except KeyboardInterrupt:
        print("\nExecution interrupted by user.")
        return 130

    except Exception as e:
        print(f"Error: {e}")
        logging.error(f"Execution failed: {e}", exc_info=True)
        return 1

    finally:
        test_runner.cleanup()


if __name__ == "__main__":
    exit(main())

# Example usage commands:
# python3 run_tests_on_cluster.py --base-only --webhook --max-workers 6 --not-check-pending
# python3 run_tests_on_cluster.py --llm-only --prompt-version 1 --webhook --max-workers 6 --not-check-pending

# run all base + LLM (5 times each) (every prompt v of LLMs) :
# python3 run_tests_on_cluster.py --full --webhook --max-workers 6 --not-check-pending --prompt-version -1
