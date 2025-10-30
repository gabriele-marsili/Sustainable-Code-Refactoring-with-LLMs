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
import tempfile
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths, general_utils
from utility_dir.general_utils import LLMresult, LLMentryResult, BaseEntryResult
from discordInteraction import create_webhook_reporter
from dotenv import load_dotenv


# Import language-selective runner module
try:
    from language_selective_runner import (
        LanguageSelectiveResultMerger,
        SelectiveExecutionReport,
        LanguageExecutionReport,
        parse_language_selection,
        get_available_languages,
    )

    SELECTIVE_RUNNER_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Language-selective runner not available: {e}")
    SELECTIVE_RUNNER_AVAILABLE = False

# Import outlier filter module
try:
    from outlier_filter import OutlierFilter, ResultMerger

    OUTLIER_FILTER_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Outlier filter module not available: {e}")
    OUTLIER_FILTER_AVAILABLE = False


# Global configuration
BASE_DIR = utility_paths.SRC_DIR
DATASET_DIR = utility_paths.DATASET_DIR
OUTPUT_DIR = utility_paths.OUTPUT_DIR_FILEPATH
CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"

DEBUG_MODE = False

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


@dataclass
class ExecutionMetrics:
    """Accurate metrics container with validation and diagnostic info"""

    execution_time_ms: Optional[float] = (
        None  # ✅ CHANGED: float to preserve sub-millisecond precision
    )
    cpu_usage: Optional[float] = None
    ram_usage: Optional[int] = None
    regression_test_passed: bool = False
    success: bool = False
    error_message: Optional[str] = None
    log_path: Optional[str] = None

    # ✅ NEW: Enhanced diagnostic fields
    docker_exit_code: Optional[int] = None
    docker_stdout: Optional[str] = None
    docker_stderr: Optional[str] = None
    error_category: Optional[str] = None  # compilation, import, timeout, assertion, docker, unknown
    raw_log_content: Optional[str] = None
    test_framework_output: Optional[str] = None

    def is_valid(self) -> bool:
        """Check if metrics are meaningful"""
        return (
            self.execution_time_ms is not None
            and self.cpu_usage is not None
            and self.ram_usage is not None
            and self.regression_test_passed is not None
            and self.ram_usage != 0
            and self.execution_time_ms
            > 0  # ✅ CHANGED: Accept any positive value, not just != 0
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization"""
        base_dict = {
            "execution_time_ms": self.execution_time_ms,
            "CPU_usage": self.cpu_usage,
            "RAM_usage": self.ram_usage,
            "regressionTestPassed": self.regression_test_passed,
            "success": self.success,
            "error_message": self.error_message,
            "log_path": self.log_path,
        }

        # ✅ NEW: Add diagnostic info if available (only when there's an error)
        if not self.success or not self.is_valid():
            diagnostic_dict = {
                "docker_exit_code": self.docker_exit_code,
                "error_category": self.error_category,
                "docker_stdout_preview": self.docker_stdout[:1000] if self.docker_stdout else None,
                "docker_stderr_preview": self.docker_stderr[:1000] if self.docker_stderr else None,
                "raw_log_preview": self.raw_log_content[:1000] if self.raw_log_content else None,
            }
            base_dict.update({k: v for k, v in diagnostic_dict.items() if v is not None})

        return base_dict


class MetricsParser:
    """Parse and obtains metrics by the log of the executed files"""

    @staticmethod
    def categorize_error(log_content: str, docker_stdout: str = "", docker_exit_code: int = 0) -> str:
        """Categorize error based on log content and docker output

        Returns one of: compilation, import, timeout, assertion, docker, metrics_parse_failure, unknown
        """
        combined_output = f"{log_content}\n{docker_stdout}".lower()

        # Compilation errors (C, C++, Java, TypeScript)
        compilation_patterns = [
            r"error:\s*(undefined reference|multiple definition)",  # C/C++ linker
            r"fatal error:.*\.h.*no such file",  # C/C++ missing headers
            r"compilation terminated",
            r"collect2: error: ld returned",  # Linker errors
            r"error: expected.*before",  # C/C++ syntax
            r"javac.*error:",  # Java compilation
            r"tsc.*error ts\d+:",  # TypeScript compilation
            r"cannot find symbol",  # Java
            r"incompatible types",  # Java
        ]

        # Import/Module errors
        import_patterns = [
            r"modulenotfounderror:",
            r"importerror:",
            r"cannot find module",
            r"module.*not found",
            r"no module named",
            r"error: cannot find package",  # Go
            r"use of undeclared identifier",  # C/C++
        ]

        # Timeout errors
        timeout_patterns = [
            r"timeout",
            r"timed out",
            r"time limit exceeded",
        ]

        # Test assertion failures
        assertion_patterns = [
            r"assertion.*failed",
            r"assert.*error",
            r"expected.*but got",
            r"test.*failed",
            r"\d+ failed.*\d+ passed",  # Jest/pytest
            r"failures:\s*\d+",  # Unity C
        ]

        # Docker-specific errors
        docker_patterns = [
            r"docker: error",
            r"cannot connect to.*docker",
            r"permission denied.*docker",
            r"oci runtime error",
            r"container.*not found",
        ]

        # Check patterns in order of specificity
        for pattern in compilation_patterns:
            if re.search(pattern, combined_output, re.IGNORECASE):
                return "compilation"

        for pattern in import_patterns:
            if re.search(pattern, combined_output, re.IGNORECASE):
                return "import"

        for pattern in timeout_patterns:
            if re.search(pattern, combined_output, re.IGNORECASE):
                return "timeout"

        for pattern in assertion_patterns:
            if re.search(pattern, combined_output, re.IGNORECASE):
                return "assertion"

        for pattern in docker_patterns:
            if re.search(pattern, combined_output, re.IGNORECASE):
                return "docker"

        # If no metrics were found but docker exited non-zero
        if docker_exit_code != 0 and not any([
            re.search(r"execution.*time", log_content, re.IGNORECASE),
            re.search(r"cpu.*usage", log_content, re.IGNORECASE),
            re.search(r"ram.*usage", log_content, re.IGNORECASE),
        ]):
            return "metrics_parse_failure"

        return "unknown"

    @staticmethod
    def parse_time_output(log_content: str, debug_mode=False) -> ExecutionMetrics:
        """Parse time command output with multiple fallback strategies"""
        metrics = ExecutionMetrics()
        logger = logging.getLogger(__name__ + ".MetricsParser")

        if DEBUG_MODE :
            debug_mode = True
            

        if debug_mode :
            logger.level = logging.DEBUG

        try:
            # Log del contenuto per debug
            logger.debug(
                f"\n📝Parsing log content (first 500 chars): {log_content[:500]}"
            )

            # Strategy 1: User + System time (most accurate)
            user_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)
            system_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)

            if user_match and system_match:
                user_time = float(user_match.group(1))
                system_time = float(system_match.group(1))
                metrics.execution_time_ms = (
                    user_time + system_time
                ) * 1000  # ✅ FIXED: Keep as float
                logger.debug(
                    f"Strategy 1 - User+System time: {metrics.execution_time_ms}ms"
                )

                if debug_mode:
                    print(
                        f"Strategy 1 - User+System time: {metrics.execution_time_ms}ms"
                    )

            # Strategy 2: Wall clock time
            if not metrics.execution_time_ms:
                wall_match = re.search(
                    r"Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+):(\d+\.?\d*)",
                    log_content,
                )
                if wall_match:
                    minutes = int(wall_match.group(1))
                    seconds = float(wall_match.group(2))
                    metrics.execution_time_ms = (
                        minutes * 60 + seconds
                    ) * 1000  # ✅ FIXED: Keep as float
                    logger.debug(
                        f"Strategy 2 - Wall clock: {metrics.execution_time_ms}ms"
                    )
                    if debug_mode:
                        print(f"Strategy 2 - Wall clock: {metrics.execution_time_ms}ms")

            # Strategy 3: Real time from bash time
            if not metrics.execution_time_ms:
                real_match = re.search(r"real\s+(\d+)m([\d.]+)s", log_content)
                if real_match:
                    minutes = int(real_match.group(1))
                    seconds = float(real_match.group(2))
                    metrics.execution_time_ms = (
                        minutes * 60 + seconds
                    ) * 1000  # ✅ FIXED: Keep as float
                    logger.debug(
                        f"Strategy 3 - Real time: {metrics.execution_time_ms}ms"
                    )
                    if debug_mode:
                        print(f"Strategy 3 - Real time: {metrics.execution_time_ms}ms")

            # Strategy 4: Jest execution time for JS/TS
            if not metrics.execution_time_ms:
                jest_match = re.search(r"Time:\s+([\d.]+)\s*s", log_content)
                if jest_match:
                    seconds = float(jest_match.group(1))
                    metrics.execution_time_ms = (
                        seconds * 1000
                    )  # ✅ FIXED: Keep as float
                    logger.debug(
                        f"Strategy 4 - Jest time: {metrics.execution_time_ms}ms"
                    )
                    if debug_mode:
                        print(f"Strategy 4 - Jest time: {metrics.execution_time_ms}ms")

            if not metrics.execution_time_ms:
                logger.warning("⚠️No execution time found in log")
                if debug_mode:
                    print("⚠️No execution time found in log")

            # RAM Usage
            ram_match = re.search(
                r"Maximum resident set size \(kbytes\): (\d+)", log_content
            )
            if ram_match:
                metrics.ram_usage = int(ram_match.group(1))
                logger.debug(f"RAM usage: {metrics.ram_usage} KB")
            else:
                logger.warning("⚠️No RAM usage found in log")

            # CPU Usage
            cpu_match = re.search(
                r"Percent of CPU this job got: (\d+\.?\d*)%", log_content
            )
            if cpu_match:
                metrics.cpu_usage = float(cpu_match.group(1))
                logger.debug(f"CPU usage: {metrics.cpu_usage}%")
            else:
                logger.warning("⚠️No CPU usage found in log")

            # Test Results - CORREZIONE: gestione più accurata dei risultati Jest
            test_failed = False
            test_passed = False

            # Pattern per fallimenti
            failure_patterns = [
                (r"Tests:\s+\d+\s+failed", "jest_summary_fail"),
                (r"FAIL\s+", "jest_fail_marker"),
                (r"● .* ›", "jest_test_fail"),  # Correzione carattere
                (r"(\d+) failed", "count_failed"),
                (r"Test Suites:.*failed", "jest_suite_fail"),
            ]

            for pattern, pattern_name in failure_patterns:
                if re.search(pattern, log_content, re.IGNORECASE):
                    logger.debug(f"Test failure detected: {pattern_name}")
                    test_failed = True
                    break

            # Pattern per successi - SOLO se non ci sono fallimenti
            if not test_failed:
                success_patterns = [
                    (r"Tests:\s+(\d+)\s+passed,\s+\d+\s+total", "jest_passed"),
                    (r"Test Suites:.*(\d+)\s+passed", "jest_suites_passed"),
                    (r"PASS\s+", "pass_marker"),
                ]

                for pattern, pattern_name in success_patterns:
                    match = re.search(pattern, log_content, re.IGNORECASE)
                    if match:
                        # Verifica che ci siano test passati
                        if pattern_name == "jest_passed":
                            passed_count = int(match.group(1))
                            if passed_count > 0:
                                test_passed = True
                                logger.debug(f"Success: {passed_count} tests passed")
                                break
                        else:
                            test_passed = True
                            logger.debug(f"Success pattern: {pattern_name}")
                            break

            # Se non abbiamo trovato né successi né fallimenti, controlla exit code
            if not test_failed and not test_passed:
                # Cerca indicatori di errore generale
                error_indicators = [
                    "Error:",
                    "Exception:",
                    "SyntaxError:",
                    "TypeError:",
                ]
                for indicator in error_indicators:
                    if indicator in log_content:
                        test_failed = True
                        logger.debug(f"Error indicator found: {indicator}")
                        break

            metrics.regression_test_passed = test_passed and not test_failed
            metrics.success = metrics.is_valid() and metrics.regression_test_passed

            logger.info(
                f"👀 Parsing complete - Metrics are valid: {metrics.is_valid()}, "
                f"Tests passed: {metrics.regression_test_passed}, "
                f"Time: {metrics.execution_time_ms}ms, "
                f"CPU: {metrics.cpu_usage}%, "
                f"RAM: {metrics.ram_usage}KB"
            )

            if not metrics.is_valid() : 
                logger.warning(f"Log of invalid metrics: {log_content}")

        except Exception as e:
            metrics.error_message = f"Parsing error: {str(e)}"
            logger.error(f"Metrics parsing failed: {e}", exc_info=True)

        return metrics

    @staticmethod
    def parse_c_or_cpp(log_content: str) -> ExecutionMetrics:
        
        logger = logging.getLogger(__name__ + ".MetricsParser")

        metrics = ExecutionMetrics()
        # user_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)

        elapsed_ns_match = re.search(r"Elapsed_ns: (\d+)", log_content)

        system_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)
        ram_match = re.search(
            r"Maximum resident set size \(kbytes\): (\d+)", log_content
        )
        cpu_match = re.search(r"Percent of CPU this job got: (\d+)%", log_content)

        if elapsed_ns_match:
            elapsed_ns = int(elapsed_ns_match.group(1))
            # elapsed_us = elapsed_ns / 1_000
            elapsed_ms = elapsed_ns / 1_000_000

            metrics.execution_time_ms = elapsed_ms  # ✅ FIXED: Keep as float to preserve precision (e.g., 0.888ms)
        else:
            # Fallback to system time if available
            if system_match:
                system_time = float(system_match.group(1))
                metrics.execution_time_ms = (
                    system_time * 1000
                )  # ✅ FIXED: Keep as float
            else:
                metrics.execution_time_ms = None

        # ✅ FIXED: Convert to correct types
        metrics.cpu_usage = float(cpu_match.group(1)) if cpu_match else None
        metrics.ram_usage = int(ram_match.group(1)) if ram_match else None

        test_failed = False
        test_passed = False

        # Pattern per fallimenti
        failure_patterns = [
            (r"Tests:\s+\d+\s+failed", "jest_summary_fail"),
            (r"FAIL\s+", "jest_fail_marker"),
            (r"● .* ›", "jest_test_fail"),  # Correzione carattere
            (r"(\d+) failed", "count_failed"),
            (r"Test Suites:.*failed", "jest_suite_fail"),
        ]

        for pattern, pattern_name in failure_patterns:
            if re.search(pattern, log_content, re.IGNORECASE):
                logger.debug(f"Test failure detected: {pattern_name}")
                test_failed = True
                break

        # Pattern per successi - SOLO se non ci sono fallimenti
        if not test_failed:
            success_patterns = [
                (r"Tests:\s+(\d+)\s+passed,\s+\d+\s+total", "jest_passed"),
                (r"Test Suites:.*(\d+)\s+passed", "jest_suites_passed"),
                (r"PASS\s+", "pass_marker"),
                # ✅ NEW: C Unity test framework patterns
                (
                    r"(\d+)\s+Tests\s+0\s+Failures",
                    "c_unity_success",
                ),  # "4 Tests 0 Failures 0 Ignored"
                (r"^OK$", "c_unity_ok"),  # "OK" on separate line
                (r"Exit_code:\s*0", "exit_code_zero"),  # "Exit_code: 0"
            ]

            for pattern, pattern_name in success_patterns:
                match = re.search(pattern, log_content, re.IGNORECASE | re.MULTILINE)
                if match:
                    # Verifica che ci siano test passati
                    if pattern_name == "jest_passed":
                        passed_count = int(match.group(1))
                        if passed_count > 0:
                            test_passed = True
                            logger.debug(f"Success: {passed_count} tests passed")
                            break
                    elif pattern_name == "c_unity_success":
                        test_count = int(match.group(1))
                        if test_count > 0:
                            test_passed = True
                            logger.debug(
                                f"C Unity success: {test_count} tests passed, 0 failures"
                            )
                            break
                    else:
                        test_passed = True
                        logger.debug(f"Success pattern: {pattern_name}")
                        break

            # Se non abbiamo trovato né successi né fallimenti, controlla exit code
        if not test_failed and not test_passed:
            # Cerca indicatori di errore generale
            error_indicators = [
                "Error:",
                "Exception:",
                "SyntaxError:",
                "TypeError:",
            ]
            for indicator in error_indicators:
                if indicator in log_content:
                    test_failed = True
                    logger.debug(f"Error indicator found: {indicator}")
                    break

        metrics.regression_test_passed = test_passed and not test_failed
        metrics.success = metrics.is_valid() and metrics.regression_test_passed

        logger.info(
            f"👀 Parsing complete - Metrics are valid: {metrics.is_valid()}, "
            f"Tests passed: {metrics.regression_test_passed}, "
            f"Time: {metrics.execution_time_ms}ms, "
            f"CPU: {metrics.cpu_usage}%, "
            f"RAM: {metrics.ram_usage}KB"
        )

        if not metrics.is_valid() : 
                logger.warning(f"Log of invalid metrics: {log_content}")

        return metrics

    @staticmethod
    def parse_typescript_json(log_path: Path) -> ExecutionMetrics:
        """Parse TypeScript/Jest JSON output with robust fallbacks"""
        metrics = ExecutionMetrics()
        logger = logging.getLogger(__name__ + ".MetricsParser")

        try:
            logger.debug(f"Parsing TypeScript JSON: {log_path}")

            # Verifica esistenza file
            if not log_path.exists():
                logger.error(f"Log file not found: {log_path}")
                metrics.error_message = "Log file not found"
                return metrics

            with open(log_path, "r") as f:
                content = f.read()
                logger.debug(f"Log content (first 300 chars): {content[:300]}")

            # Try JSON parsing first
            try:
                data = json.loads(content)
                logger.debug("Successfully parsed as JSON")

                # Extract timing
                if (
                    "startTime" in data
                    and "testResults" in data
                    and data["testResults"]
                ):
                    start_time = data.get("startTime", 0)
                    test_results = data.get("testResults", [])
                    if test_results:
                        end_time = test_results[0].get("endTime", start_time)
                        metrics.execution_time_ms = max(0, end_time - start_time)
                        logger.debug(
                            f"Execution time from JSON: {metrics.execution_time_ms}ms"
                        )

                # Extract test results
                num_failed = data.get("numFailedTests", 1)
                num_passed = data.get("numPassedTests", 0)
                metrics.regression_test_passed = num_failed == 0

                logger.info(f"Tests - Passed: {num_passed}, Failed: {num_failed}")

            except json.JSONDecodeError:
                logger.warning("Not valid JSON, trying text parsing")
                # Fallback to text parsing
                text_metrics = MetricsParser.parse_time_output(content)
                metrics.execution_time_ms = text_metrics.execution_time_ms
                metrics.regression_test_passed = text_metrics.regression_test_passed
                logger.debug("Used text parsing fallback")

            # Look for resource usage in separate file
            resource_log = log_path.parent / "resource_usage.log"
            if resource_log.exists():
                logger.debug(f"Found resource log: {resource_log}")
                with open(resource_log, "r") as f:
                    resource_content = f.read()

                ram_match = re.search(
                    r"Maximum resident set size \(kbytes\): (\d+)", resource_content
                )
                if ram_match:
                    metrics.ram_usage = int(ram_match.group(1))
                    logger.debug(f"RAM from resource log: {metrics.ram_usage} KB")

                cpu_match = re.search(
                    r"Percent of CPU this job got: (\d+\.?\d*)%", resource_content
                )
                if cpu_match:
                    metrics.cpu_usage = float(cpu_match.group(1))
                    logger.debug(f"CPU from resource log: {metrics.cpu_usage}%")
            else:
                logger.warning(f"Resource log not found: {resource_log}")
                # Try to get from main log
                if not metrics.ram_usage:
                    ram_match = re.search(
                        r"Maximum resident set size \(kbytes\): (\d+)", content
                    )
                    if ram_match:
                        metrics.ram_usage = int(ram_match.group(1))
                        logger.debug(f"RAM from main log: {metrics.ram_usage} KB")

                if not metrics.cpu_usage:
                    cpu_match = re.search(
                        r"Percent of CPU this job got: (\d+\.?\d*)%", content
                    )
                    if cpu_match:
                        metrics.cpu_usage = float(cpu_match.group(1))
                        logger.debug(f"CPU from main log: {metrics.cpu_usage}%")

            metrics.success = metrics.is_valid()

            logger.debug(
                f"TypeScript parsing complete - Valid: {metrics.is_valid()}, "
                f"Time: {metrics.execution_time_ms}ms, "
                f"CPU: {metrics.cpu_usage}%, "
                f"RAM: {metrics.ram_usage}KB, "
                f"Tests passed: {metrics.regression_test_passed}"
            )

        except Exception as e:
            metrics.error_message = f"TypeScript parsing error: {str(e)}"
            logger.error(f"TypeScript metrics parsing failed: {e}", exc_info=True)

        return metrics


class ContainerManager:
    """Manage Docker containers"""

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
            # Verifica che l'immagine esista
            image_check = subprocess.run(
                ["docker", "images", "-q", container_name],
                capture_output=True,
                text=True,
                timeout=5,
            )

            if image_check.returncode != 0 or not image_check.stdout.strip():
                self.logger.debug(f"Container image {container_name} not found")
                return False

            # L'immagine esiste, quindi è "healthy" per i nostri scopi
            # (non stiamo controllando container in esecuzione, ma l'immagine Docker)
            return True

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

        # VERIFICA ESPLICITA del Dockerfile
        dockerfile = dockerfile_path / "Dockerfile"
        if not dockerfile.exists():
            raise FileNotFoundError(f"Dockerfile not found in {dockerfile_path}")

        # Cleanup existing container/image
        self.cleanup_container(container_name)

        # Build new container - USA PATH ASSOLUTO e specifica esplicitamente il Dockerfile
        build_cmd = [
            "docker",
            "build",
            "-f",
            str(dockerfile.absolute()),  # Specifica esplicitamente il Dockerfile
            "-t",
            container_name,
            str(dockerfile_path.absolute()),  # Path assoluto del context
        ]

        if not use_cache:
            build_cmd.insert(2, "--no-cache")  # Inserisci DOPO "build"

        # DEBUG: logga il comando completo
        self.logger.debug(f"Building with command: {' '.join(build_cmd)}")

        try:
            result = subprocess.run(
                build_cmd,
                capture_output=True,
                text=True,
                timeout=60 * 20,
            )

            if result.returncode != 0:
                # Logga output completo per debugging
                self.logger.error(f"Build stdout: {result.stdout}")
                self.logger.error(f"Build stderr: {result.stderr}")
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
            # container_name = self.get_container_name(language)

            # Check if we have a healthy container
            if language in self.active_containers:
                existing_name = self.active_containers[language]
                usage_count = self.container_usage.get(language, 0)

                # Verifica più approfondita dello stato
                if usage_count < self.max_usage_before_refresh:
                    if self.is_container_healthy(existing_name):
                        self.container_usage[language] = usage_count + 1
                        self.logger.debug(
                            f"Reusing container {existing_name} (usage: {usage_count + 1})"
                        )
                        return existing_name
                    else:
                        self.logger.warning(
                            f"Container {existing_name} unhealthy, will rebuild"
                        )
                else:
                    self.logger.info(
                        f"Container {existing_name} reached usage limit, will rebuild"
                    )

                # Container unhealthy or overused, remove from tracking
                self.cleanup_container(existing_name)
                if language in self.active_containers:
                    del self.active_containers[language]
                if language in self.container_usage:
                    del self.container_usage[language]

            # Build new container
            try:
                self.logger.info(f"Building new container for {language}")
                new_container = self.build_container(language, use_cache)
                self.active_containers[language] = new_container
                self.container_usage[language] = 1
                self.container_health[language] = True

                # IMPORTANTE: Piccolo delay per dare tempo a Docker di finalizzare
                time.sleep(0.5)

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
    """Executor of the tests for each entry
    setupts the env for each language + execute tests"""

    def __init__(self, container_manager: ContainerManager):
        self.container_manager = container_manager
        self.logger = logging.getLogger(__name__ + ".TestExecutor")

        # Lock per linguaggio per evitare rebuild concorrenti
        self.language_locks = {}
        self.general_lock = threading.RLock()

    def _get_language_lock(self, language: str) -> threading.RLock:
        """Get or create lock for specific language"""
        with self.general_lock:
            if language not in self.language_locks:
                self.language_locks[language] = threading.RLock()
            return self.language_locks[language]

    def setup_test_environment(
        self, language: str, mount_path: Path, llm_dir: str = ""
    ):
        """Setup test environment with proper file copying and configuration"""
        dockerfile_path = DOCKER_DIR / language.lower()

        # Copy run.sh con permessi esecutivi
        run_sh_src = dockerfile_path / "run.sh"
        run_sh_dest = mount_path / "run.sh"

        if run_sh_src.exists():
            shutil.copy2(run_sh_src, run_sh_dest)
            # CRITICO: Setta i permessi DOPO la copia
            run_sh_dest.chmod(0o755)
            self.logger.debug(f"Copied and made executable: {run_sh_dest}")

            # Verifica che sia effettivamente eseguibile
            if not os.access(run_sh_dest, os.X_OK):
                self.logger.warning(f"run.sh is not executable: {run_sh_dest}")
                try:
                    os.chmod(run_sh_dest, 0o755)
                except Exception as e:
                    self.logger.error(f"Failed to make run.sh executable: {e}")

            """ #debug
            try:
                with open(run_sh_dest, 'r') as f:
                    run_sh_content = f.read()
                self.logger.debug(f"run.sh content (first 200 chars): {run_sh_content[:200]}")
            except Exception as e:
                self.logger.warning(f"Could not read run.sh: {e}")
            """

        else:
            self.logger.error(f"run.sh source not found: {run_sh_src}")

        # Language-specific setup
        if language == "javascript":
            self._setup_javascript(dockerfile_path, mount_path)
        elif language == "typescript":
            self._setup_typescript(dockerfile_path, mount_path)
        elif language == "python":
            self._setup_python(dockerfile_path, mount_path)
        elif language in ["cpp", "c"]:
            self._setup_cpp_or_c(dockerfile_path, mount_path)
        elif language == "java":
            self._setup_java(dockerfile_path, mount_path)
        elif language == "go":
            self._setup_go(dockerfile_path, mount_path)

    def _setup_javascript(self, dockerfile_path: Path, mount_path: Path):
        """Setup JavaScript environment"""
        files_to_copy = ["package.json", "jest.config.js"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            dest_file = mount_path / filename
            if src_file.exists():
                shutil.copy2(src_file, dest_file)

    def _setup_java(self, dockerfile_path: Path, mount_path: Path):
        """Setup Java environment"""
        files_to_copy = ["pom.xml", "build.gradle"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            if src_file.exists():
                shutil.copy2(src_file, mount_path / filename)
                self.logger.debug(f"Copied {filename}")

    def _setup_go(self, dockerfile_path: Path, mount_path: Path):
        """Setup Go environment"""
        files_to_copy = ["go.mod", "go.sum"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            if src_file.exists():
                shutil.copy2(src_file, mount_path / filename)
                self.logger.debug(f"Copied {filename}")

    def _setup_typescript(self, dockerfile_path: Path, mount_path: Path):
        """Setup TypeScript environment"""
        # Copy TypeScript config
        tsconfig_candidates = [
            DATASET_DIR / "typescript" / "tsconfig.json",
            dockerfile_path / "tsconfig.json",
        ]

        for tsconfig_src in tsconfig_candidates:
            if tsconfig_src.exists():
                tsconfig_dest = mount_path / "tsconfig.json"
                shutil.copy2(tsconfig_src, tsconfig_dest)
                self.logger.debug(f"Copied tsconfig.json from {tsconfig_src}")
                break

        # Copy package.json and jest config
        files_to_copy = ["package.json", "jest.config.js"]
        for filename in files_to_copy:
            src_file = dockerfile_path / filename
            dest_file = mount_path / filename
            if src_file.exists():
                shutil.copy2(src_file, dest_file)
                self.logger.debug(f"Copied {filename}")

        # Rimuovi node_modules in modo sicuro
        node_modules = mount_path / "node_modules"
        try:
            if node_modules.exists() or node_modules.is_symlink():
                if node_modules.is_symlink():
                    node_modules.unlink()
                elif node_modules.is_dir():
                    shutil.rmtree(node_modules, ignore_errors=True)
                self.logger.debug(f"Removed node_modules from {mount_path}")
        except Exception as e:
            self.logger.debug(f"Could not remove node_modules: {e}")

    def _setup_python(self, dockerfile_path: Path, mount_path: Path):
        """Setup Python environment"""
        utils_src = dockerfile_path / "utils"
        utils_dest = mount_path / "utils"
        if utils_src.exists() and not utils_dest.exists():
            shutil.copytree(utils_src, utils_dest)

    def _setup_cpp_or_c(self, dockerfile_path: Path, mount_path: Path):
        """Setup C/C++ environment"""

        # Copy time_wrapper.py (se esiste)
        wrapper_src = dockerfile_path / "time_wrapper.py"
        if wrapper_src.exists():
            wrapper_dest = mount_path / "time_wrapper.py"
            shutil.copy2(wrapper_src, wrapper_dest)
            wrapper_dest.chmod(0o755)
            #print(f"Copied timing wrapper: {wrapper_dest}")
        else:
            print(f"wrapper_src does not exists : {wrapper_src}")

        # Copy Makefile
        makefile_src = dockerfile_path / "Makefile"
        if makefile_src.exists():
            shutil.copy2(makefile_src, mount_path / "Makefile")

    """
    def execute_test(
        self,
        entry: Dict,
        language: str,
        test_type: str = "base",
        llm_info: Optional[Dict] = None,
        use_cache: bool = True,
    ) -> BaseEntryResult | LLMentryResult:

        # Get test path (dir path of dir in with there is the test file)
        test_path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
        container_name = self.container_manager.get_or_create_container(
            language, use_cache
        )

        # Handle LLM code substitution if needed
        original_file_backup = None
        llm_dir = ""
        if llm_info and test_type == "llm":
            llm_dir = Path(llm_info["path"]).parent.name
            original_file_backup = self._substitute_llm_code(entry, llm_info, test_path)

        try:
            # Setup environment AFTER potential LLM substitution
            self.setup_test_environment(language, test_path, llm_dir)

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
            if llm_info:
                result = LLMentryResult(
                    entry["id"],
                    entry["filename"],
                    language,
                    LLM_results=[
                        LLMresult(
                            llm_info["type"],
                            llm_info["path"],
                            llm_info.get("log", ""),
                            metrics.execution_time_ms,
                            metrics.cpu_usage,
                            metrics.ram_usage,
                            metrics.regression_test_passed,
                            llm_info.get("success", None),
                            llm_info.get("error_message", None),
                        )
                    ],
                )
            else:
                result = BaseEntryResult(
                    entry["id"],
                    entry["filename"],
                    language,
                    metrics.log_path,
                    metrics.execution_time_ms,
                    metrics.cpu_usage,
                    metrics.ram_usage,
                    metrics.regression_test_passed,
                    metrics.is_valid(),
                    metrics.error_message,
                    metrics.log_path,
                )
            return result

        finally:
            # Restore original file if LLM substitution was made
            if original_file_backup:
                self._restore_original_code(original_file_backup)
    """

    def _substitute_llm_code_in_temp(
        self, entry: Dict, llm_info: Dict, temp_path: Path, debug=False
    ):
        """Substitute LLM code in temporary directory (no backup needed)"""
        try:
            language = entry["language"]
            llm_code_path = DATASET_DIR / llm_info["path"]

            if language in ["c", "cpp"] or llm_code_path.is_dir():
                if llm_info["filename"] not in str(llm_code_path):
                    llm_code_path = llm_code_path / llm_info["filename"]

            if not llm_code_path.exists():
                self.logger.warning(f"LLM code file not found: {llm_code_path}")
                return

            # Determinare il file target nella directory temporanea

            if debug:  # manual change default args value to enable
                print(f"temp_path = {temp_path}")
                for f in os.scandir(temp_path):

                    def print_content(dir_entry: os.DirEntry[str]):
                        name = "Dir" if dir_entry.is_dir() else "File"
                        print(f"{name} {dir_entry.name}")
                        if dir_entry.is_dir():
                            print(f"Content in {dir_entry.name}:")
                            for f in os.scandir(dir_entry.path):
                                print_content(f)

                    print_content(f)

            target_file = temp_path / entry["filename"]
            if language in ["c", "cpp"]:
                target_file = temp_path / "src" / entry["filename"]

            if not target_file.exists():
                self.logger.warning(f"Target file not found in temp: {target_file}")
                return

            # Semplice copia - non serve backup nella directory temporanea
            shutil.copy2(llm_code_path, target_file)
            self.logger.debug(f"Substituted LLM code: {llm_code_path} -> {target_file}")

        except Exception as e:
            self.logger.error(
                f"Failed to substitute LLM code in temp: {e}", exc_info=True
            )

    def execute_test(
        self,
        entry: Dict,
        language: str,
        test_type: str = "base",
        llm_info: Optional[Dict] = None,
        use_cache: bool = True,
        debug_mode: bool = False,
    ) -> BaseEntryResult | LLMentryResult:
        """Execute single test with comprehensive error handling"""

        # ✅ Fix per Colima: usare directory temporanee montabili da Docker
        base_temp = Path.home() / "docker_tmp"
        base_temp.mkdir(parents=True, exist_ok=True)

        with tempfile.TemporaryDirectory(
            prefix=f"test_{entry['id']}_", dir=base_temp
        ) as temp_dir:
            temp_path = Path(temp_dir)
            self.logger.debug(f"Using temp dir (docker-visible): {temp_path}")
            test_path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent

            # Funzione per ignorare file non necessari
            def ignore_items(directory, items):
                ignored = set()
                for item in items:
                    full_path = Path(directory) / item
                    # Ignora node_modules, __pycache__, .git, e symlinks
                    if item in [
                        "node_modules",
                        "__pycache__",
                        ".git",
                        ".pytest_cache",
                        "venv",
                        ".venv",
                        "build",
                        "dist",
                        "*.egg-info",
                    ]:
                        ignored.add(item)
                    # Ignora symlinks per evitare problemi
                    elif full_path.is_symlink():
                        ignored.add(item)
                return ignored

            # Copia con gestione errori robusta
            try:
                shutil.copytree(
                    test_path,
                    temp_path,
                    dirs_exist_ok=True,
                    ignore=ignore_items,
                    symlinks=False,
                )
                self.logger.debug(f"Copied test directory to {temp_path}")

            except Exception as e:
                self.logger.warning(f"copytree failed: {e}, trying manual copy")
                # Fallback: copia manuale file per file
                try:
                    for item in test_path.iterdir():
                        if (
                            item.name in ["node_modules", "__pycache__", ".git"]
                            or item.is_symlink()
                        ):
                            continue

                        dest = temp_path / item.name
                        try:
                            if item.is_file():
                                shutil.copy2(item, dest)
                            elif item.is_dir():
                                shutil.copytree(
                                    item, dest, ignore=ignore_items, symlinks=False
                                )
                        except Exception as copy_err:
                            self.logger.debug(f"Skipped {item.name}: {copy_err}")

                except Exception as fallback_err:
                    self.logger.error(f"Manual copy failed: {fallback_err}")
                    metrics = ExecutionMetrics()
                    metrics.error_message = f"Failed to copy test files: {fallback_err}"
                    return self._create_result(entry, language, llm_info, metrics)

            # Verifica che i file siano stati copiati
            #copied_files = list(temp_path.rglob("*"))
            #self.logger.debug(
            #    f"Files in temp dir: {[f.name for f in copied_files if f.is_file()]} files"
            #)
           

            # Container management con lock
            lang_lock = self._get_language_lock(language)
            with lang_lock:
                container_name = self.container_manager.get_or_create_container(
                    language, use_cache
                )

            # LLM code substitution
            if llm_info and test_type == "llm":
                self._substitute_llm_code_in_temp(entry, llm_info, temp_path)

            try:
                # Setup environment
                self.setup_test_environment(language, temp_path)

                # Verifica finale esistenza file
                if not self._verify_test_files(language, temp_path, entry["filename"]):
                    self.logger.error(
                        f"Test files verification failed for {entry['id']}"
                    )
                    metrics = ExecutionMetrics()
                    metrics.error_message = "Test files not found after setup"
                    return self._create_result(entry, language, llm_info, metrics)

                # Execute test
                metrics = self._run_container_test(
                    language,
                    temp_path,
                    container_name,
                    entry["id"],
                    entry["filename"],
                    debug_mode,
                )

                

                return self._create_result(entry, language, llm_info, metrics)

            except Exception as e:
                self.logger.error(f"Test execution failed: {e}", exc_info=True)
                if debug_mode:
                    print(f"❌ Test execution failed:\n{e}")
                metrics = ExecutionMetrics()
                metrics.error_message = str(e)
                return self._create_result(entry, language, llm_info, metrics)

            finally:
                # cleanup esplicito, anche se Docker o Colima non rilascia i file subito
                try:
                    shutil.rmtree(temp_path, ignore_errors=True)
                    self.logger.debug(f"Cleaned up temp dir: {temp_path}")
                except Exception as e:
                    self.logger.warning(f"Could not delete temp dir {temp_path}: {e}")

    def _verify_test_files(
        self, language: str, test_path: Path, code_filename: str
    ) -> bool:
        """Verify that test files exist before running tests"""
        test_patterns = {
            "javascript": [
                "*.test.js",
                "*_testSuite.js",
                "*_test.js",
                "*.spec.js",
                "*Test.js",
            ],
            "typescript": [
                "*.test.ts",
                "*.test.js",
                "*_test.ts",
                "*.spec.ts",
                "*Test.ts",
            ],
            "python": ["test_*.py", "*_test.py"],
            "java": ["*Test.java", "*Tests.java"],
            "go": ["*_test.go"],
            "cpp": ["*_test.cpp", "*test.cpp", "*Test.cpp"],
            "c": ["*_test.c", "*test.c", "*Test.c"],
        }

        patterns = test_patterns.get(language.lower(), ["*test*"])

        testFiles: list[Path] = []
        for pattern in patterns:
            # Ricerca ricorsiva per trovare test anche in subdirectory
            testFiles.extend(list(test_path.rglob(pattern)))

        # Rimuovi duplicati mantenendo l'ordine
        test_files = list(dict.fromkeys(testFiles))

        if test_files:
            self.logger.debug(f"Test files found: {[f.name for f in test_files]}")

            # DEBUG: Verifica contenuto e path assoluti
            for tf in test_files:
                self.logger.debug(f"Test file absolute path: {tf.absolute()}")
                self.logger.debug(
                    f"Test file relative to test_path: {tf.relative_to(test_path)}"
                )

            # --- DEBUG BLOCK: Print content of the test file before execution ---
            """
            for target_file_path in testFiles:
                
                try:
                    if target_file_path.exists():
                        self.logger.info(
                            f"Content of test file {target_file_path.name} (in temp dir) before execution:"
                        )

                        # Read and print the content
                        with open(target_file_path, "r", encoding="utf-8") as f:
                            file_content = f.read()
                            print("\n" + "=" * 50)
                            print(file_content)
                            print("=" * 50 + "\n")
                    else:
                        self.logger.warning(
                            f"File {target_file_path.name} not found at {target_file_path}"
                        )
                except Exception as debug_err:
                    self.logger.error(f"Error printing test file content: {debug_err}")
            """
            # ----------------- END DEBUG BLOCK --------------------------------

            return True

        # Se non trova test, verifica almeno l'esistenza del file di codice
        code_file = test_path / code_filename
        if not code_file.exists():
            # Ricerca ricorsiva del file di codice
            matching_files = list(test_path.rglob(code_filename))
            if matching_files:
                self.logger.debug(f"Code file found at: {matching_files[0]}")
                return True

            self.logger.error(f"Neither code nor test files found in {test_path}")
            # Lista contenuto directory per debug
            if test_path.exists():
                all_files = list(test_path.rglob("*"))
                self.logger.error(
                    f"Directory contents: {[str(f.relative_to(test_path)) for f in all_files if f.is_file()]}"
                )
            return False

        self.logger.warning(f"Code file exists but no test files found in {test_path}")
        return True  # Procedi comunque se il file di codice esiste

    def _create_result(
        self,
        entry: Dict,
        language: str,
        llm_info: Optional[Dict],
        metrics: ExecutionMetrics,
    ) -> BaseEntryResult | LLMentryResult:
        """Create appropriate result object"""
        if llm_info:
            return LLMentryResult(
                entry["id"],
                entry["filename"],
                language,
                LLM_results=[
                    LLMresult(
                        llm_info["type"],
                        llm_info["path"],
                        llm_info.get("log", ""),
                        metrics.execution_time_ms,
                        metrics.cpu_usage,
                        metrics.ram_usage,
                        metrics.regression_test_passed,
                        metrics.success,
                        metrics.error_message,
                    )
                ],
            )
        else:
            return BaseEntryResult(
                entry["id"],
                entry["filename"],
                language,
                metrics.log_path or "",
                metrics.execution_time_ms,
                metrics.cpu_usage,
                metrics.ram_usage,
                metrics.regression_test_passed,
                metrics.success,
                metrics.error_message,
                metrics.log_path,
            )

    def _substitute_llm_code(
        self, entry: Dict, llm_info: Dict, test_path: Path
    ) -> Optional[Tuple[Path, Path]]:
        """Substitute LLM code with backup of original"""
        try:
            language = entry["language"]
            llm_code_path: Path = DATASET_DIR / llm_info["path"]
            original_code_path: Path = DATASET_DIR / entry["codeSnippetFilePath"]

            if language == "c" or language == "cpp" or llm_code_path.is_dir():
                llm_code_path = DATASET_DIR / llm_info["path"]
                if llm_info["filename"] not in str(llm_code_path):
                    llm_code_path = llm_code_path / llm_info["filename"]

            if original_code_path.is_dir() or language == "c" or language == "cpp":
                original_code_path = DATASET_DIR / entry["codeSnippetFilePath"]
                if entry["filename"] not in str(original_code_path):
                    original_code_path = original_code_path / entry["filename"]

            if not llm_code_path.exists():
                self.logger.warning(f"LLM code file not found: {llm_code_path}")
                return None

            if not original_code_path.exists():
                self.logger.warning(
                    f"Original code file not found: {original_code_path}"
                )
                return None

            # Verify test file exists and log its location
            test_file_path = original_code_path.parent
            test_files = (
                list(test_file_path.glob("*.test.*"))
                + list(test_file_path.glob("*_test.*"))
                + list(test_file_path.glob("*_"))
            )
            self.logger.debug(
                f"Test files found in {test_file_path}: {[f.name for f in test_files]}"
            )

            if not test_files:
                self.logger.warning(f"No test files found in {test_file_path}")

            # Create backup with unique suffix to avoid conflicts
            import time

            backup_path = (
                original_code_path.parent
                / f"{original_code_path.stem}_{int(time.time())}.backup"
            )

            # Ensure we're not overwriting an existing backup
            counter = 0
            while backup_path.exists():
                backup_path = (
                    original_code_path.parent
                    / f"{original_code_path.stem}_{int(time.time())}_{counter}.backup"
                )
                counter += 1

            shutil.copy2(original_code_path, backup_path)
            self.logger.debug(f"Created backup: {backup_path}")

            # Substitute LLM code
            shutil.copy2(llm_code_path, original_code_path)
            self.logger.debug(
                f"Substituted code from {llm_code_path} to {original_code_path}"
            )

            return (original_code_path, backup_path)

        except Exception as e:
            self.logger.error(f"Failed to substitute LLM code: {e}", exc_info=True)
            return None

    def _restore_original_code(self, backup_info: Tuple[Path, Path]):
        """Restore original code from backup"""
        try:
            original_path, backup_path = backup_info

            if not backup_path.exists():
                self.logger.error(f"Backup file not found: {backup_path}")
                return

            shutil.copy2(backup_path, original_path)
            self.logger.debug(f"Restored original code from {backup_path}")

            # Clean up backup file
            backup_path.unlink()
            self.logger.debug(f"Removed backup file: {backup_path}")

        except Exception as e:
            self.logger.error(f"Failed to restore original code: {e}", exc_info=True)

    def _parse_metrics_from_log(
        self,
        log_file: Path,
        language: str,
        result: subprocess.CompletedProcess,
        debug_mode=False,
    ) -> ExecutionMetrics:
        """Parse metrics from log file with fallback to stdout and enhanced diagnostics"""
        metrics = ExecutionMetrics()

        if DEBUG_MODE :
            debug_mode = True

        # ✅ NEW: Store docker output for diagnostics
        metrics.docker_exit_code = result.returncode
        metrics.docker_stdout = result.stdout if result.stdout else ""
        # Note: stderr is merged with stdout in subprocess call

        log_content = ""

        # Try to read log file
        if log_file.exists():
            try:
                with open(log_file, "r") as f:
                    log_content = f.read()
                self.logger.debug(f"Read {len(log_content)} chars from log file")
                if debug_mode:
                    print(f"Read {len(log_content)} chars from log file")
            except Exception as e:
                self.logger.error(f"Failed to read log file: {e}")
                if debug_mode:
                    print(f"Failed to read log file: {e}")

        # Fallback to stdout if no log content
        if not log_content and result.stdout:
            log_content = result.stdout
            self.logger.debug("Using stdout as log content")
            if debug_mode:
                print("Using stdout as log content")

        # ✅ NEW: Store raw log content for diagnostics
        metrics.raw_log_content = log_content

        if not log_content:
            self.logger.error("No log content available for parsing")
            if debug_mode:
                print("No log content available for parsing")
            metrics.error_message = "No log content generated"
            # ✅ NEW: Categorize error
            metrics.error_category = MetricsParser.categorize_error(
                log_content, metrics.docker_stdout, metrics.docker_exit_code
            )
            return metrics

        if debug_mode:
            print(f"log_content:{log_content}")

        # Parse based on language
        if language == "typescript":
            stripped = log_content.strip()
            if stripped.startswith("{"):
                self.logger.debug("Parsing as TypeScript JSON")
                metrics = (
                    MetricsParser.parse_typescript_json(log_file)
                    if log_file.exists()
                    else metrics
                )
            else:
                self.logger.debug("Parsing TypeScript output as text")
                metrics = MetricsParser.parse_time_output(log_content, debug_mode)

        elif language == "javascript":
            stripped = log_content.strip()
            if stripped.startswith("{"):
                self.logger.debug("Parsing JavaScript as JSON")
                metrics = (
                    MetricsParser.parse_typescript_json(log_file)
                    if log_file.exists()
                    else metrics
                )
            else:
                self.logger.debug("Parsing JavaScript as text")
                metrics = MetricsParser.parse_time_output(log_content, debug_mode)

        elif language == "c" or language == "cpp":
            metrics = MetricsParser.parse_c_or_cpp(log_content)

        else:
            # Altri linguaggi
            metrics = MetricsParser.parse_time_output(log_content, debug_mode)

        # ✅ NEW: Categorize errors for failed tests
        if not metrics.is_valid() or not metrics.regression_test_passed or metrics.docker_exit_code != 0:
            metrics.error_category = MetricsParser.categorize_error(
                log_content, metrics.docker_stdout, metrics.docker_exit_code
            )
            self.logger.info(f"Error categorized as: {metrics.error_category}")

        return metrics

    def _run_container_test(
        self,
        language: str,
        mount_path: Path,
        container_name: str,
        entry_id: str,
        filename: str,
        llm_dir: str = "",
        debug_mode=False,
    ) -> ExecutionMetrics:
        """Run container test with comprehensive metrics collection"""

        if DEBUG_MODE :  
            self.logger.level = logging.DEBUG
        
        # Prepare log file path
        log_file = mount_path / "output.log"
        if log_file.exists():
            try:
                with open(log_file, "w") as f:
                    f.truncate(0)
                self.logger.debug(f"Cleared content of stale log file: {log_file.name}")
                if debug_mode:
                    print(f"Cleared content of stale log file: {log_file.name}")
            except Exception as e:
                self.logger.warning(
                    f"Failed to clear content of stale log file {log_file.name}: {e}"
                )
                if debug_mode:
                    print(
                        f"Failed to clear content of stale log file {log_file.name}:\n{e}"
                    )

        # Log pre-execution info
        self.logger.info(f"Running test for {entry_id} ({language})")
        self.logger.debug(f"Mount path: {mount_path}")
        self.logger.debug(f"Container: {container_name}")

        if debug_mode:
            print(f"Mount path: {mount_path}")
            print(f"Container: {container_name}")

        if language in ["typescript", "javascript"]:
            self.logger.debug("Directory structure before test execution:")

            for item in mount_path.rglob("*"):
                if item.is_file():
                    self.logger.debug(f"  {item.relative_to(mount_path)}")

        # Verifica che run.sh esista e sia eseguibile
        run_sh = mount_path / "run.sh"
        if not run_sh.exists():
            self.logger.error(f"run.sh not found in {mount_path}")
            metrics = ExecutionMetrics()
            metrics.error_message = "run.sh not found"
            return metrics

        # Ensure run.sh is executable
        try:
            run_sh.chmod(0o755)
        except Exception as e:
            self.logger.warning(f"Could not chmod run.sh: {e}")

        # For JS/TS, log configuration files
        if language in ["javascript", "typescript"]:
            pkg_json = mount_path / "package.json"
            jest_config = mount_path / "jest.config.js"

            self.logger.debug(f"package.json exists: {pkg_json.exists()}")
            self.logger.debug(f"jest.config.js exists: {jest_config.exists()}")

            if language == "typescript":
                tsconfig = mount_path / "tsconfig.json"
                self.logger.debug(f"tsconfig.json exists: {tsconfig.exists()}")

        # Prepare docker run command with resource monitoring
        docker_cmd = [
            "docker",
            "run",
            "--rm",
            "--memory=4g",
            "--cpus=2.0",
            "-v",
            f"{mount_path}:/app",
            "-w",
            "/app",
            container_name,
            "/bin/sh",
            "-c",
            "chmod +x ./run.sh && ./run.sh",
        ]

        # Per Java, passa il filename come argomento
        if language.lower() == "java":
            docker_cmd[-1] = f"chmod +x ./run.sh && ./run.sh {filename}"

        self.logger.debug(f"Docker command: {' '.join(docker_cmd)}")

        try:
            # Execute with timeout
            result = subprocess.run(
                docker_cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                timeout=300,  # 5 minute timeout
            )

            self.logger.debug(f"Docker exit code: {result.returncode}")
            if debug_mode:
                print(f"Docker exit code: {result.returncode}")

            # Log first part of output for debugging
            if result.stdout:
                self.logger.debug(
                    f"Docker output (first 500 chars): {result.stdout[:500]}"
                )

                if debug_mode:
                    print(f"Docker output (first 500 chars): {result.stdout[:500]}")

            # Parse metrics from log
            metrics = self._parse_metrics_from_log(
                log_file, language, result, debug_mode
            )

            if metrics.regression_test_passed and metrics.is_valid():
                self.logger.info(
                    f"🟢 Tests PASSED for {entry_id} despite exit code {result.returncode}"
                )
                metrics.success = True
            elif result.returncode != 0:
                self.logger.warning(f"❌ Tests failed with exit code {result.returncode}")
                self.logger.warning(f"Res {result}")
                # Non sovrascrivere il flag se è già stato settato dal parsing
                if not metrics.regression_test_passed:
                    if not metrics.error_message:
                        metrics.error_message = f"Docker exit code: {result.returncode}"

            # Archive log with enhanced diagnostics for failures
            if log_file.exists():
                log_archive = (
                    LOGS_DIR / f"{container_name}_{entry_id}_{int(time.time())}.log"
                )
                log_archive.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(log_file, log_archive)
                metrics.log_path = str(log_archive)
                self.logger.debug(f"Log archived to: {log_archive}")

                # ✅ NEW: Save detailed diagnostic log for failures
                if not metrics.is_valid() or not metrics.regression_test_passed:
                    diagnostic_log = log_archive.parent / f"{log_archive.stem}_diagnostic.json"
                    diagnostic_data = {
                        "entry_id": entry_id,
                        "language": language,
                        "container": container_name,
                        "docker_exit_code": result.returncode,
                        "error_category": metrics.error_category,
                        "error_message": metrics.error_message,
                        "docker_stdout_full": result.stdout,
                        "raw_log_content": metrics.raw_log_content[:5000] if metrics.raw_log_content else None,
                        "metrics_found": {
                            "execution_time_ms": metrics.execution_time_ms,
                            "cpu_usage": metrics.cpu_usage,
                            "ram_usage": metrics.ram_usage,
                        }
                    }
                    try:
                        with open(diagnostic_log, "w") as f:
                            json.dump(diagnostic_data, f, indent=2)
                        self.logger.info(f"Diagnostic log saved to: {diagnostic_log}")
                    except Exception as diag_err:
                        self.logger.warning(f"Could not save diagnostic log: {diag_err}")

            else:
                self.logger.warning(f"No output.log found at {log_file}")
                # Salva stdout come log
                if result.stdout:
                    log_archive = (
                        LOGS_DIR
                        / f"{container_name}_{entry_id}_{int(time.time())}_stdout.log"
                    )
                    log_archive.parent.mkdir(parents=True, exist_ok=True)
                    with open(log_archive, "w") as f:
                        f.write(result.stdout)
                    metrics.log_path = str(log_archive)
                    self.logger.debug(f"Docker stdout saved to: {log_archive}")

            return metrics

        except subprocess.TimeoutExpired as timeout_err:
            self.logger.error(f"Test timeout for {entry_id}")
            metrics = ExecutionMetrics()
            metrics.error_message = "Test execution timeout (300s)"
            metrics.error_category = "timeout"
            metrics.docker_exit_code = -1
            # Save timeout diagnostic
            if timeout_err.stdout:
                metrics.docker_stdout = timeout_err.stdout
            return metrics

        except Exception as e:
            self.logger.error(
                f"Test execution failed for {entry_id}: {e}", exc_info=True
            )
            metrics = ExecutionMetrics()
            metrics.error_message = str(e)
            metrics.error_category = "unknown"
            return metrics


class ClusterRunner:
    """Main orchestrator for cluster testing"""

    def __init__(self, max_workers: int = 4, is_debug: bool = False):
        self.max_workers = max_workers
        self.container_manager = ContainerManager()
        self.test_executor = TestExecutor(self.container_manager)
        self.execution_state = ExecutionState()
        self.results_cache: Dict[str, BaseEntryResult | LLMentryResult] = {}
        self.lock = threading.RLock()

        # Setup logging
        self._setup_logging(is_debug)

        # Register cleanup
        atexit.register(self.cleanup)

    def _setup_logging(self, is_debug):
        """Setup comprehensive logging"""
        LOGS_DIR.mkdir(parents=True, exist_ok=True)

        log_file = LOGS_DIR / f"test_runner_{int(time.time())}.log"

        log_lvl = logging.DEBUG if is_debug else logging.INFO

        logging.basicConfig(
            level=log_lvl,
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
        run_number: int = 1,
        cluster_name="",
        selected_languages=["all"],
        overwrite_results=False,
        outlier_filter=None,
        entry_ids_filter: Optional[List[str]] = None,
        debug_mode=False,
    ) -> Tuple[List[BaseEntryResult], List[LLMentryResult]]:
        """Run all tests for a cluster with comprehensive error handling

        Args:
            outlier_filter: Optional OutlierFilter instance to filter which entries to execute
            entry_ids_filter: Optional list of entry IDs to execute selectively.
                            If provided, only these entries will be executed.
                            Useful for re-executing specific problematic entries.

        Returns:
            Tuple[base_results, llm_results] - Separate results for base and LLM tests
        """

        cluster_data = self.load_cluster_data(cluster_path)

        self.execution_state.current_cluster = cluster_path.stem

        # set of entry ids of entries not valid / not executed
        cluster_base_not_completed_entries_ids = set()
        cluster_LLM_not_completed_entries_ids = set()

        # Prepare test tasks
        base_tasks = []
        llm_tasks = []

        base_results: list[BaseEntryResult] = []
        llm_results: list[LLMentryResult] = []

        skip_check_res_base = False
        skip_check_res_LLM = False

        if base_only or full:
            out_base_cluster_results_path = (
                utility_paths.SRC_DIR
                / "execution_outputs"
                / f"{cluster_name}_results_{run_number}.json"
            )

            out_base_cluster_content = general_utils.read_json(
                out_base_cluster_results_path
            )

            try:
                if "results" not in out_base_cluster_content:
                    # fallback on backup:
                    backup_path = utility_paths.SRC_DIR / "backup_executions"

                    backup_files = list(
                        backup_path.rglob(
                            f"{cluster_name}_results_{run_number}_backup_*.json"
                        )
                    )

                    if len(backup_files) > 0:
                        out_base_cluster_results_path = backup_files[0]
                        out_base_cluster_content = general_utils.read_json(
                            out_base_cluster_results_path
                        )
                    else:  # fallback cluster non eseguito
                        out_base_cluster_content = general_utils.read_json(
                            utility_paths.CLUSTERS_DIR_FILEPATH
                            / f"cluster_{cluster_name}.json"
                        )

                        for _lang, entries in out_base_cluster_content.items():
                            for entry in entries:
                                cluster_base_not_completed_entries_ids.add(entry["id"])

                        skip_check_res_base = True

                if not skip_check_res_base:
                    if "results" not in out_base_cluster_content:
                        raise Exception(
                            f"results not in out_base_cluster_content\nContent:\n{out_base_cluster_content}\n\nPath : {out_base_cluster_results_path}"
                        )

                    for _lang, entries in out_base_cluster_content["results"].items():
                        for json_entry in entries:
                            entry: BaseEntryResult = BaseEntryResult.from_json(
                                json_entry
                            )
                            if overwrite_results or not entry.is_valid():
                                cluster_base_not_completed_entries_ids.add(entry.id)
                            else:
                                base_results.append(entry)

                                # adjust execution state :
                                with self.lock:
                                    self.execution_state.completed_tests += 1
                                    if entry.regressionTestPassed:
                                        self.execution_state.successful_tests += 1
                                    else:
                                        self.execution_state.failed_tests += 1

            except Exception as e:
                print(f"exception :\n{e}")
                raise e

        if llm_only or full:
            out_LLM_cluster_results_path = (
                utility_paths.SRC_DIR
                / "execution_outputs"
                / f"{cluster_name}_results_v{prompt_version}_{run_number}.json"
            )

            out_LLM_cluster_content = general_utils.read_json(
                out_LLM_cluster_results_path
            )

            try:
                if "results" not in out_LLM_cluster_content:
                    # fallback on backup:
                    backup_path = utility_paths.SRC_DIR / "backup_executions"

                    backup_files = list(
                        backup_path.rglob(
                            f"{cluster_name}_results_v{prompt_version}_{run_number}_backup_*.json"
                        )
                    )

                    if len(backup_files) > 0:
                        out_LLM_cluster_results_path = backup_files[0]
                        out_LLM_cluster_content = general_utils.read_json(
                            out_LLM_cluster_results_path
                        )
                    else:  # fallback cluster non eseguito
                        out_LLM_cluster_content = general_utils.read_json(
                            utility_paths.CLUSTERS_DIR_FILEPATH
                            / f"cluster_{cluster_name}.json"
                        )

                        for _lang, entries in out_LLM_cluster_content.items():
                            for entry in entries:
                                cluster_LLM_not_completed_entries_ids.add(entry["id"])

                        skip_check_res_LLM = True

                if not skip_check_res_LLM:
                    if "results" not in out_LLM_cluster_content:
                        raise Exception(
                            f"results not in out_LLM_cluster_content\nContent:\n{out_LLM_cluster_content}\n\nPath : {out_LLM_cluster_results_path}"
                        )

                    for _lang, entries in out_LLM_cluster_content["results"].items():
                        for json_entry in entries:
                            entry: LLMentryResult = LLMentryResult.from_json(json_entry)
                            if overwrite_results or not entry.is_valid():
                                cluster_LLM_not_completed_entries_ids.add(entry.id)

                            else:
                                llm_results.append(entry)

                                for res in entry.LLM_results:
                                    # adjust execution state :
                                    with self.lock:
                                        self.execution_state.completed_tests += 1
                                        if res.regressionTestPassed:
                                            self.execution_state.successful_tests += 1
                                        else:
                                            self.execution_state.failed_tests += 1

            except Exception as e:
                print(f"exception :\n{e}")
                raise e

        # Validate execution mode
        mode_count = sum([base_only, llm_only, full])
        if mode_count != 1:
            raise ValueError(
                "Must specify exactly one of: --base-only, --llm-only, or --full"
            )

        self.logger.info(
            f"\nCluster {cluster_path.stem} version : {prompt_version} run# : {run_number}\nCluster path: {cluster_path}\n{len(base_results)} base entries already executed | {len(cluster_base_not_completed_entries_ids)} to execute\n{len(llm_results)} LLM entries already executed | {len(cluster_LLM_not_completed_entries_ids)} to execute\n\n"
        )

        # Log selective execution mode if active
        if entry_ids_filter is not None:
            self.logger.info(
                f"🎯 SELECTIVE EXECUTION MODE: Running only {len(entry_ids_filter)} "
                f"specific entry IDs: {entry_ids_filter[:5]}{'...' if len(entry_ids_filter) > 5 else ''}"
            )

        # add base and llm task (entries to run)
        for language, entries in cluster_data.items():
            for entry in entries:
                # Apply entry_ids_filter if provided (selective execution)
                if entry_ids_filter is not None and entry["id"] not in entry_ids_filter:
                    # Skip this entry - not in the selective filter
                    continue

                # Base test tasks
                if (base_only or full) and entry[
                    "id"
                ] in cluster_base_not_completed_entries_ids:
                    base_tasks.append(
                        {
                            "entry": entry,
                            "language": language,
                            "test_type": "base",
                            "llm_info": None,
                            "use_cache": use_cache,
                            "debug_mode": debug_mode,
                        }
                    )

                # LLM test tasks
                if (
                    (llm_only or full)
                    and "LLMs" in entry
                    and entry["id"] in cluster_LLM_not_completed_entries_ids
                ):
                    for llm in entry["LLMs"]:
                        if f"_v{prompt_version}" in llm.get("filename", ""):
                            llm_tasks.append(
                                {
                                    "entry": entry,
                                    "language": language,
                                    "test_type": "llm",
                                    "llm_info": llm,
                                    "use_cache": use_cache,
                                    "debug_mode": debug_mode,
                                }
                            )

        total_tasks = len(base_tasks) + len(llm_tasks)
        self.logger.info(
            f"Starting {total_tasks} tests for cluster {cluster_path.stem} "
            f"(Base: {len(base_tasks)}, LLM: {len(llm_tasks)})"
        )

        if (
            len(base_tasks) == 0
            and len(llm_tasks) == 0
            and len(base_results) == 0
            and len(llm_results) == 0
        ):
            raise Exception("0 base task 0 llm task 0 base results and 0 llm results")

        # filter for languages :
        # print(f"selected_languages:\n{selected_languages}")
        if len(selected_languages) > 0 and selected_languages[0] != "all":

            def check_task_language(task):
                # print(f"task:\n{task}")
                return task["language"] in selected_languages

            base_tasks = list(filter(check_task_language, base_tasks))
            llm_tasks = list(filter(check_task_language, llm_tasks))

        # Filter for outlier entries ONLY if outlier_filter is provided
        if outlier_filter is not None:
            self.logger.info("Applying outlier filter to entries...")

            # Filter base tasks
            if base_tasks:

                def is_outlier_base(task):
                    entry_id = task["entry"]["id"]
                    # For RerunFilter, use should_execute_entry which checks if entry_id is in the set
                    if hasattr(outlier_filter, 'should_execute_base_entry'):
                        return outlier_filter.should_execute_base_entry(
                            cluster_name, entry_id
                        )
                    else:
                        # RerunFilter only has should_execute_entry
                        return outlier_filter.should_execute_entry(entry_id, test_type="base")

                original_base_count = len(base_tasks)
                base_tasks = list(filter(is_outlier_base, base_tasks))
                self.logger.info(
                    f"  Base tasks filtered: {original_base_count} → {len(base_tasks)} (outliers only)"
                )

            # Filter LLM tasks
            if llm_tasks:

                def is_outlier_llm(task):
                    entry_id = task["entry"]["id"]
                    # Extract prompt version from filename (e.g., "_v1" -> 1)
                    # llm_info = task.get('llm_info', {})
                    # filename = llm_info.get('filename', '')
                    # The prompt_version is already set in the method parameters
                    # For RerunFilter, use should_execute_entry which checks if entry_id is in the set
                    if hasattr(outlier_filter, 'should_execute_llm_entry'):
                        return outlier_filter.should_execute_llm_entry(
                            cluster_name, entry_id, prompt_version
                        )
                    else:
                        # RerunFilter only has should_execute_entry
                        return outlier_filter.should_execute_entry(entry_id, test_type="llm")

                original_llm_count = len(llm_tasks)
                llm_tasks = list(filter(is_outlier_llm, llm_tasks))
                self.logger.info(
                    f"  LLM tasks filtered: {original_llm_count} → {len(llm_tasks)} (outliers only)"
                )

        # Execute base tests first if needed
        if base_tasks:
            self.logger.info(f"Executing {len(base_tasks)} base tests...")
            base_results_2 = self._execute_task_batch(base_tasks, "Base", debug_mode)
            base_results.extend(base_results_2)

        # Execute LLM tests if needed
        if llm_tasks:
            self.logger.info(f"Executing {len(llm_tasks)} LLM tests...")
            llm_results_2 = self._execute_task_batch(llm_tasks, "LLM", debug_mode)
            llm_results.extend(llm_results_2)

        """
        parsed_llm_results: List[LLMentryResult] = []
        dict_llm_res: Dict[str, LLMentryResult] = {}
        for res in llm_results:
            if res.id in dict_llm_res:
                results = res.LLM_results
                dict_llm_res[res.id].LLM_results.extend(results)
            else:
                dict_llm_res[res.id] = res

        for _key, res in dict_llm_res.items():
            parsed_llm_results.append(res)
        """

        self._report_final_results(base_results + llm_results)
        return base_results, llm_results  # parsed_llm_results

    def _execute_task_batch(
        self, tasks: List[Dict], batch_name: str, debug_mode=False
    ) -> List[BaseEntryResult | LLMentryResult]:
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
                        if result.is_valid():
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

    def _execute_single_test(self, task: Dict) -> BaseEntryResult | LLMentryResult:
        """Execute single test task"""
        return self.test_executor.execute_test(
            entry=task["entry"],
            language=task["language"],
            test_type=task["test_type"],
            llm_info=task["llm_info"],
            use_cache=task["use_cache"],
            debug_mode=task["debug_mode"],
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

    def _report_final_results(self, results: List[BaseEntryResult | LLMentryResult]):
        """Report final test results"""
        total = len(results)
        failed_report = "Failed reports :\n"
        successful = 0

        for r in results:
            if r.is_valid():
                successful += 1
            else:
                failed_report += f"\nf name : {r.filename}"

        print("\n" + "=" * 60)
        print("CLUSTER TEST RESULTS")
        print("=" * 60)
        print(f"Total tests executed: {total}")
        if total > 0:
            print(f"Successful tests: {successful} ({successful / total * 100:.1f}%)")
        print(f"Failed tests: {total - successful}")
        print(f"{failed_report}")
        print(f"Total execution time: {self.execution_state.elapsed_time}")
        print("=" * 60)

    def save_results(
        self,
        results: List[BaseEntryResult | LLMentryResult],
        output_path: Path,
        test_type_suffix: str = "",
        is_llm=False,
    ):
        """Save results to JSON file with comprehensive metadata"""
        output_data = {
            "execution_date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "execution_metadata": {
                "total_tests": len(results),
                "successful_tests": sum(1 for r in results if r.is_valid()),
                "execution_time": self.execution_state.elapsed_time,
                "cluster": self.execution_state.current_cluster,
                "test_type": test_type_suffix,
            },
            "results": defaultdict(list),
        }

        for result in results:
            # Add base metrics
            if not is_llm:
                entry_data: BaseEntryResult = result

            else:  # Add LLM results
                entry_data: LLMentryResult = result

            output_data["results"][result.language].append(entry_data.to_json())

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
                skip in file_path.name
                for skip in ["debug", "test", "bad_entries", "focused_", "with_metrics"]
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

            base_completed = self._validate_by_pattern(base_pattern)
            llm_completed = self._validate_by_pattern(llm_pattern)

            return base_completed and llm_completed

        return self._validate_by_pattern(pattern)

    def _validate_by_pattern(self, pattern: str):
        """Validate a cluster exec by pattern"""
        matching_files = list(self.output_dir.glob(pattern))

        # Consider completed if we have 5 successful runs
        valid_files = 0
        for file_path in matching_files:
            if self._validate_output_file(file_path):
                valid_files += 1
                if valid_files == 5:
                    return True

        return False

    def _validate_output_file(self, file_path: Path) -> bool:
        """Validate that output file contains meaningful results"""
        try:
            data = general_utils.read_json(file_path)

            results = data.get("results", {})
            if not results:
                return False

            successfull_entries = 0
            total_entries = 0

            # Check if we have entries with meaningful metrics
            for _language, entries in results.items():
                for json_entry in entries:
                    if "LLM_results" in json_entry:  # LLM
                        entry = LLMentryResult.from_json(json_entry)
                    else:  # base
                        entry = BaseEntryResult.from_json(json_entry)

                    total_entries += 1
                    if entry.is_valid():
                        successfull_entries += 1

            if total_entries <= 0:
                return False

            return successfull_entries / total_entries > 0.8  # successfull if >= 80%

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

        if prompt_version == -1:
            v = "all prompt v"
        else:
            v = f"v {prompt_version}"
        self.logger.info(f"Found {len(pending)} pending clusters for {test_type} {v}")
        return pending


def send_webhook_notification(webhook_url: str, results_summary: Dict):
    """Send Discord webhook notification"""
    try:
        if not webhook_url:
            return

        reporter = create_webhook_reporter(webhook_url, "Test Runner")

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
            custom_message="Test execution completed!",
        )

        if success:
            print("Webhook notification sent successfully!")

    except Exception as e:
        logging.error(f"Failed to send webhook: {e}")


def main():
    """Main entry point with comprehensive argument handling"""
    parser = argparse.ArgumentParser(description=" Test Runner for Code Snippets")

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
        "--webhook",
        action="store_true",
        help="Send Discord webhook notifications",
    )
    parser.add_argument("--silent", action="store_true", help="Reduce output verbosity")

    # Language-selective execution
    parser.add_argument(
        "--languages",
        type=str,
        default="all",
        help="Comma-separated list of languages to execute (e.g., 'c,cpp') or 'all' for all languages (default: all)",
    )
    parser.add_argument(
        "--selective-rerun",
        action="store_true",
        help="Enable selective re-execution mode: only runs specified languages and merges with existing results",
    )
    parser.add_argument(
        "--execution-report-dir",
        type=Path,
        default=OUTPUT_DIR,
        help="Directory to save selective execution reports",
    )

    parser.add_argument(
        "--overwrite-results",
        action="store_true",
        default=False,
        help="Force to overwrite results for each entry even if it's valid",
    )

    # Outlier-selective execution
    parser.add_argument(
        "--outlier-mode",
        action="store_true",
        help="Enable outlier-selective execution: only re-runs entries identified as outliers in the report",
    )
    parser.add_argument(
        "--outlier-report",
        type=str,
        help="Path to outliers_report_*.json file (required for --outlier-mode)",
    )

    # Rerun-queue selective execution (for pipeline)
    parser.add_argument(
        "--rerun-file",
        type=str,
        help="Path to rerun_queue.json file generated by pipeline analysis",
    )

    parser.add_argument(
        "--debug-mode",
        action="store_true",
        default=False,
        help="Run in debug mode with verbose prints",
    )

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
    test_runner = ClusterRunner(max_workers=args.max_workers)

    selected_languages = parse_language_selection(args.languages)

    overwrite_results = args.overwrite_results

    # Handle outlier-selective execution mode
    if args.outlier_mode:
        if not OUTLIER_FILTER_AVAILABLE:
            print("Error: Outlier filter module not available.")
            print("Please ensure outlier_filter.py is in the same directory.")
            return 1

        if not args.outlier_report:
            print("Error: --outlier-report is required when using --outlier-mode")
            return 1

        if not args.cluster_name:
            print("Error: --cluster-name is required for outlier-mode execution")
            return 1

        print("\n" + "=" * 80)
        print("OUTLIER-SELECTIVE EXECUTION MODE")
        print("=" * 80)

        # Load outlier filter
        outlier_report_path = Path(args.outlier_report)
        if not outlier_report_path.is_absolute():
            # Try relative to metrics/outlier_reports directory
            metrics_dir = BASE_DIR / "metrics" / "outlier_reports"
            outlier_report_path = metrics_dir / args.outlier_report
            if not outlier_report_path.exists():
                # Try as-is relative to current directory
                outlier_report_path = Path(args.outlier_report)

        if not outlier_report_path.exists():
            print(f"Error: Outlier report not found: {outlier_report_path}")
            return 1

        outlier_filter = OutlierFilter(outlier_report_path)
        if not outlier_filter.load_outlier_report():
            print("Error: Failed to load outlier report")
            return 1

        # Check if cluster has outliers
        if not outlier_filter.has_outliers_for_cluster(args.cluster_name):
            print(f"\nNo outliers found for cluster '{args.cluster_name}'")
            print("No execution needed. Exiting.")
            return 0

        # Print cluster summary
        outlier_filter.print_cluster_summary(args.cluster_name)

        # Verify cluster file exists
        cluster_path = args.clusters_dir / f"cluster_{args.cluster_name}.json"
        if not cluster_path.exists():
            print(f"Error: Cluster file not found: {cluster_path}")
            return 1

        # Determine test type
        if args.full:
            test_types = ["base", "llm"]
        elif args.base_only:
            test_types = ["base"]
        elif args.llm_only:
            test_types = ["llm"]
        else:
            print("Error: Must specify one of --base-only, --llm-only, or --full")
            return 1

        merger = ResultMerger()
        total_entries_executed = 0
        total_entries_reused = 0

        # Process each test type
        for test_type in test_types:
            is_llm = test_type == "llm"

            if is_llm:
                # Get affected prompt versions
                affected_versions = outlier_filter.get_affected_prompt_versions(
                    args.cluster_name
                )
                prompt_versions = (
                    sorted(affected_versions)
                    if args.prompt_version == -1
                    else [args.prompt_version]
                )

                print(
                    f"\nProcessing LLM results for prompt versions: {prompt_versions}"
                )

                for p_v in prompt_versions:
                    # Get outlier entry IDs for this version
                    outlier_entry_ids = outlier_filter.get_llm_entry_ids_to_execute(
                        args.cluster_name, p_v
                    )

                    print(
                        f"\n  Prompt v{p_v}: {len(outlier_entry_ids)} outlier entries to re-execute"
                    )

                    # Process each run
                    for run_num in range(1, args.run_quantity + 1):
                        print(f"    Run {run_num}/{args.run_quantity}")

                        # Determine output file path
                        output_filename = (
                            f"{args.cluster_name}_results_v{p_v}_{run_num}.json"
                        )
                        output_path = args.output_dir / output_filename

                        # Load existing results
                        existing_results = merger.load_existing_results(output_path)

                        # Execute tests ONLY for outlier entries
                        print(
                            f"      Executing {len(outlier_entry_ids)} outlier entries..."
                        )
                        start_time = time.time()

                        _, llm_results = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=False,
                            llm_only=True,
                            prompt_version=p_v,
                            use_cache=not args.no_cache,
                            full=False,
                            run_number=run_num,
                            cluster_name=args.cluster_name,
                            selected_languages=list(selected_languages),
                            overwrite_results=overwrite_results,
                            outlier_filter=outlier_filter,
                            debug_mode=args.debug_mode,
                        )

                        elapsed = time.time() - start_time

                        # Filter to only executed outliers
                        executed_results = [
                            r for r in llm_results if r.id in outlier_entry_ids
                        ]

                        print(
                            f"      Executed {len(executed_results)} entries in {elapsed:.1f}s"
                        )
                        total_entries_executed += len(executed_results)

                        # Merge with existing results
                        new_results_dicts = [r.to_json() for r in executed_results]

                        if existing_results and existing_results.get("results"):
                            merged_data = merger.merge_results(
                                existing_data=existing_results,
                                new_results=new_results_dicts,
                                outlier_entry_ids=outlier_entry_ids,
                            )
                            total_merged = sum(
                                len(entries)
                                for entries in merged_data.get("results", {}).values()
                            )
                            reused_count = total_merged - len(executed_results)
                            total_entries_reused += reused_count
                            print(
                                f"      Merged: {len(executed_results)} new + {reused_count} reused = {total_merged} total"
                            )
                        else:
                            # No existing results - create new data structure
                            results_by_lang = {}
                            for r in new_results_dicts:
                                lang = r.get("language", "unknown")
                                if lang not in results_by_lang:
                                    results_by_lang[lang] = []
                                results_by_lang[lang].append(r)
                            merged_data = {"results": results_by_lang}
                            print(
                                f"      No existing results - saved {len(new_results_dicts)} new entries"
                            )

                        # Save merged results
                        merger.save_merged_results(
                            merged_data=merged_data,
                            output_file=output_path,
                            backup=True,
                        )

            else:  # Base code execution
                outlier_entry_ids = outlier_filter.get_base_entry_ids_to_execute(
                    args.cluster_name
                )
                print(
                    f"\nBase code: {len(outlier_entry_ids)} outlier entries to re-execute"
                )

                # Process each run
                for run_num in range(1, args.run_quantity + 1):
                    print(f"  Run {run_num}/{args.run_quantity}")

                    # Determine output file path
                    output_filename = f"{args.cluster_name}_results_{run_num}.json"
                    output_path = args.output_dir / output_filename

                    # Load existing results
                    existing_results = merger.load_existing_results(output_path)

                    # Execute tests ONLY for outlier entries
                    print(f"    Executing {len(outlier_entry_ids)} outlier entries...")
                    start_time = time.time()

                    base_results, _ = test_runner.run_cluster_tests(
                        cluster_path=cluster_path,
                        base_only=True,
                        llm_only=False,
                        prompt_version=-1,
                        use_cache=not args.no_cache,
                        full=False,
                        run_number=run_num,
                        cluster_name=args.cluster_name,
                        selected_languages=list(selected_languages),
                        overwrite_results=overwrite_results,
                        outlier_filter=outlier_filter,
                        debug_mode=args.debug_mode,
                    )

                    elapsed = time.time() - start_time

                    # Filter to only executed outliers
                    executed_results = [
                        r for r in base_results if r.id in outlier_entry_ids
                    ]

                    print(
                        f"    Executed {len(executed_results)} entries in {elapsed:.1f}s"
                    )
                    total_entries_executed += len(executed_results)

                    # Merge with existing results
                    new_results_dicts = [r.to_json() for r in executed_results]

                    if existing_results and existing_results.get("results"):
                        merged_data = merger.merge_results(
                            existing_data=existing_results,
                            new_results=new_results_dicts,
                            outlier_entry_ids=outlier_entry_ids,
                        )
                        total_merged = sum(
                            len(entries)
                            for entries in merged_data.get("results", {}).values()
                        )
                        reused_count = total_merged - len(executed_results)
                        total_entries_reused += reused_count
                        print(
                            f"    Merged: {len(executed_results)} new + {reused_count} reused = {total_merged} total"
                        )
                    else:
                        # No existing results - create new data structure
                        results_by_lang = {}
                        for r in new_results_dicts:
                            lang = r.get("language", "unknown")
                            if lang not in results_by_lang:
                                results_by_lang[lang] = []
                            results_by_lang[lang].append(r)
                        merged_data = {"results": results_by_lang}
                        print(
                            f"    No existing results - saved {len(new_results_dicts)} new entries"
                        )

                    # Save merged results
                    merger.save_merged_results(
                        merged_data=merged_data, output_file=output_path, backup=True
                    )

        # Print final summary
        print("\n" + "=" * 80)
        print("OUTLIER-SELECTIVE EXECUTION COMPLETE")
        print("=" * 80)
        print(f"Total entries executed: {total_entries_executed}")
        print(f"Total entries reused: {total_entries_reused}")
        print(
            f"Time saved by reusing: ~{total_entries_reused * 100 / max(total_entries_executed + total_entries_reused, 1):.1f}%"
        )
        print("=" * 80)

        return 0

    # Handle rerun-file execution mode (for pipeline)
    if args.rerun_file:
        print("\n" + "=" * 80)
        print("RERUN-FILE EXECUTION MODE (Pipeline Analysis)")
        print("=" * 80)

        rerun_file_path = Path(args.rerun_file)
        if not rerun_file_path.is_absolute():
            # Try relative to src/rerun_queues directory
            rerun_file_path = BASE_DIR / "rerun_queues" / args.rerun_file
            if not rerun_file_path.exists():
                # Try as-is relative to current directory
                rerun_file_path = Path(args.rerun_file)

        if not rerun_file_path.exists():
            print(f"Error: Rerun file not found: {rerun_file_path}")
            return 1

        # Load rerun queue
        try:
            with open(rerun_file_path, 'r', encoding='utf-8') as f:
                rerun_queue = json.load(f)
        except Exception as e:
            print(f"Error loading rerun file: {e}")
            return 1

        entries = rerun_queue.get("entries", [])
        if not entries:
            print("No entries to rerun in queue file")
            return 0

        print(f"Loaded rerun queue with {len(entries)} entries")
        print(f"Generated at: {rerun_queue.get('generated_at', 'unknown')}")

        # Group entries by cluster and test type
        from collections import defaultdict
        entries_by_cluster = defaultdict(lambda: defaultdict(list))

        for entry in entries:
            cluster_name = entry.get("cluster_name")
            test_type = entry.get("test_type", "base")
            entry_id = entry.get("entry_id")
            entries_by_cluster[cluster_name][test_type].append(entry_id)

        print(f"\nClusters affected: {len(entries_by_cluster)}")

        # Display summary
        for cluster_name, types in entries_by_cluster.items():
            total_entries = sum(len(ids) for ids in types.values())
            print(f"  - {cluster_name}: {total_entries} entries")
            for test_type, entry_ids in types.items():
                print(f"      {test_type}: {len(entry_ids)} entries")

        merger = ResultMerger()
        total_entries_executed = 0

        # Process each cluster
        for cluster_name, types_dict in entries_by_cluster.items():
            print(f"\n{'='*80}")
            print(f"Processing cluster: {cluster_name}")
            print(f"{'='*80}")

            cluster_path = args.clusters_dir / f"cluster_{cluster_name}.json"
            if not cluster_path.exists():
                print(f"Warning: Cluster file not found: {cluster_path}")
                print("Skipping this cluster")
                continue

            # Process each test type
            for test_type, entry_ids in types_dict.items():
                print(f"\nTest type: {test_type}")
                print(f"Entry IDs to rerun: {len(entry_ids)}")

                # Determine if base or LLM
                is_llm = test_type.startswith("llm")

                if is_llm:
                    # Extract prompt version from test_type (e.g., "llm_v1" -> 1)
                    try:
                        prompt_version = int(test_type.split("_v")[1]) if "_v" in test_type else 1
                    except (IndexError, ValueError):
                        prompt_version = 1

                    # Process each run
                    for run_num in range(1, args.run_quantity + 1):
                        print(f"  Run {run_num}/{args.run_quantity}")

                        output_filename = f"{cluster_name}_results_v{prompt_version}_{run_num}.json"
                        output_path = args.output_dir / output_filename

                        # Load existing results (if any)
                        existing_results = merger.load_existing_results(output_path)

                        # Execute tests for these specific entry IDs
                        print(f"    Executing {len(entry_ids)} entries...")
                        start_time = time.time()

                        # Create a simple filter object for entry_ids
                        class RerunFilter:
                            def __init__(self, entry_ids):
                                self.entry_ids = set(entry_ids)

                            def should_execute_entry(self, entry_id, test_type="base"):
                                return entry_id in self.entry_ids

                        rerun_filter = RerunFilter(entry_ids)

                        _, llm_results = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=False,
                            llm_only=True,
                            prompt_version=prompt_version,
                            use_cache=not args.no_cache,
                            full=False,
                            run_number=run_num,
                            cluster_name=cluster_name,
                            selected_languages=list(selected_languages),
                            overwrite_results=overwrite_results,
                            outlier_filter=rerun_filter,
                            debug_mode=args.debug_mode,
                        )

                        elapsed = time.time() - start_time

                        # Filter to only executed entries
                        executed_results = [r for r in llm_results if r.id in entry_ids]

                        print(f"    Executed {len(executed_results)} entries in {elapsed:.1f}s")
                        total_entries_executed += len(executed_results)

                        # Merge with existing results
                        new_results_dicts = [r.to_json() for r in executed_results]

                        if existing_results and existing_results.get("results"):
                            merged_data = merger.merge_results(
                                existing_data=existing_results,
                                new_results=new_results_dicts,
                                outlier_entry_ids=entry_ids,
                            )
                            total_merged = sum(len(e) for e in merged_data.get("results", {}).values())
                            print(f"    Merged: {len(executed_results)} new, {total_merged} total")
                        else:
                            # No existing results - create new
                            results_by_lang = {}
                            for r in new_results_dicts:
                                lang = r.get("language", "unknown")
                                if lang not in results_by_lang:
                                    results_by_lang[lang] = []
                                results_by_lang[lang].append(r)
                            merged_data = {"results": results_by_lang}
                            print(f"    No existing results - saved {len(new_results_dicts)} new entries")

                        # Save merged results
                        merger.save_merged_results(
                            merged_data=merged_data,
                            output_file=output_path,
                            backup=True,
                        )

                else:  # Base code execution
                    # Process each run
                    for run_num in range(1, args.run_quantity + 1):
                        print(f"  Run {run_num}/{args.run_quantity}")

                        output_filename = f"{cluster_name}_results_{run_num}.json"
                        output_path = args.output_dir / output_filename

                        # Load existing results
                        existing_results = merger.load_existing_results(output_path)

                        # Execute tests
                        print(f"    Executing {len(entry_ids)} entries...")
                        start_time = time.time()

                        # Create filter
                        class RerunFilter:
                            def __init__(self, entry_ids):
                                self.entry_ids = set(entry_ids)

                            def should_execute_entry(self, entry_id, test_type="base"):
                                return entry_id in self.entry_ids

                        rerun_filter = RerunFilter(entry_ids)

                        base_results, _ = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=True,
                            llm_only=False,
                            prompt_version=-1,
                            use_cache=not args.no_cache,
                            full=False,
                            run_number=run_num,
                            cluster_name=cluster_name,
                            selected_languages=list(selected_languages),
                            overwrite_results=overwrite_results,
                            outlier_filter=rerun_filter,
                            debug_mode=args.debug_mode,
                        )

                        elapsed = time.time() - start_time

                        # Filter to only executed entries
                        executed_results = [r for r in base_results if r.id in entry_ids]

                        print(f"    Executed {len(executed_results)} entries in {elapsed:.1f}s")
                        total_entries_executed += len(executed_results)

                        # Merge with existing
                        new_results_dicts = [r.to_json() for r in executed_results]

                        if existing_results and existing_results.get("results"):
                            merged_data = merger.merge_results(
                                existing_data=existing_results,
                                new_results=new_results_dicts,
                                outlier_entry_ids=entry_ids,
                            )
                            total_merged = sum(len(e) for e in merged_data.get("results", {}).values())
                            print(f"    Merged: {len(executed_results)} new, {total_merged} total")
                        else:
                            # No existing results
                            results_by_lang = {}
                            for r in new_results_dicts:
                                lang = r.get("language", "unknown")
                                if lang not in results_by_lang:
                                    results_by_lang[lang] = []
                                results_by_lang[lang].append(r)
                            merged_data = {"results": results_by_lang}
                            print(f"    No existing results - saved {len(new_results_dicts)} new entries")

                        # Save merged results
                        merger.save_merged_results(
                            merged_data=merged_data,
                            output_file=output_path,
                            backup=True
                        )

        # Print final summary
        print("\n" + "=" * 80)
        print("RERUN-FILE EXECUTION COMPLETE")
        print("=" * 80)
        print(f"Total entries executed: {total_entries_executed}")
        print(f"Clusters processed: {len(entries_by_cluster)}")
        print("=" * 80)

        return 0

    # Handle selective re-execution mode
    if args.selective_rerun:
        if not SELECTIVE_RUNNER_AVAILABLE:
            print("Error: Language-selective runner module not available.")
            print(
                "Please ensure language_selective_runner.py is in the same directory."
            )
            return 1

        print("\n" + "=" * 80)
        print("SELECTIVE RE-EXECUTION MODE")
        print("=" * 80)

        # Parse selected languages

        print(f"Selected languages: {', '.join(sorted(selected_languages))}")

        # Validate we have a specific cluster
        if not args.cluster_name:
            print("Error: --cluster-name is required for selective re-execution")
            return 1

        cluster_path = args.clusters_dir / f"cluster_{args.cluster_name}.json"
        if not cluster_path.exists():
            print(f"Error: Cluster file not found: {cluster_path}")
            return 1

        # Initialize selective execution components
        merger = LanguageSelectiveResultMerger(logger=logging.getLogger(__name__))
        report = SelectiveExecutionReport(
            cluster_name=args.cluster_name,
            execution_timestamp=time.strftime("%Y-%m-%d %H:%M:%S"),
            selected_languages=list(selected_languages),
        )

        # Determine test type
        if args.full:
            test_types = ["base", "llm"]
        elif args.base_only:
            test_types = ["base"]
        elif args.llm_only:
            test_types = ["llm"]
        else:
            print("Error: Must specify one of --base-only, --llm-only, or --full")
            return 1

        # Process each test type
        for test_type in test_types:
            is_llm = test_type == "llm"

            if is_llm:
                # Process each prompt version
                prompt_versions = (
                    range(1, 5) if args.prompt_version == -1 else [args.prompt_version]
                )

                for p_v in prompt_versions:
                    print(f"\nProcessing LLM results (prompt v{p_v})...")

                    # Process each run
                    for run_num in range(1, args.run_quantity + 1):
                        print(f"  Run {run_num}/{args.run_quantity}")

                        # Determine output file path
                        output_filename = (
                            f"{args.cluster_name}_results_v{p_v}_{run_num}.json"
                        )
                        output_path = args.output_dir / output_filename

                        # Load existing results
                        existing_data = merger.load_existing_results(output_path)

                        if existing_data is None:
                            print(
                                f"    Warning: No existing results found at {output_path}"
                            )
                            print("    Skipping this run - will execute fresh tests")
                            # Fall back to normal execution
                            continue

                        # Create backup
                        backup_path = merger.create_backup(output_path)
                        if backup_path:
                            report.backup_file = str(backup_path)

                        # Execute tests for selected languages only
                        print("    Executing tests for selected languages...")
                        start_time = time.time()

                        _, llm_results = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=False,
                            llm_only=True,
                            prompt_version=p_v,
                            use_cache=not args.no_cache,
                            full=False,
                            run_number=run_num,
                            cluster_name=args.cluster_name,
                            selected_languages=list(selected_languages),
                            overwrite_results=overwrite_results,
                            debug_mode=args.debug_mode,
                        )

                        elapsed = time.time() - start_time

                        # Filter results to only selected languages
                        filtered_llm_results = [
                            r for r in llm_results if r.language in selected_languages
                        ]

                        print(
                            f"    Executed {len(filtered_llm_results)} entries in {elapsed:.1f}s"
                        )

                        # Merge results
                        merged_data, lang_report = merger.merge_results(
                            existing_data=existing_data,
                            new_results=filtered_llm_results,
                            selected_languages=list(selected_languages),
                            is_llm=True,
                        )

                        # Save merged results
                        merger.save_merged_results(merged_data, output_path)
                        print(f"    ✓ Saved merged results: {output_path.name}")
                        print(
                            f"      Valid new: {lang_report.valid_new_results}, "
                            f"Preserved old: {lang_report.preserved_old_results}, "
                            f"Invalid new: {lang_report.invalid_new_results}"
                        )

                        # Add to report
                        report.add_language_report(lang_report)

                        # Reset state for next run
                        test_runner.execution_state = ExecutionState()

            else:  # base code execution
                print("\nProcessing base code results...")

                # Process each run
                for run_num in range(1, args.run_quantity + 1):
                    print(f"  Run {run_num}/{args.run_quantity}")

                    # Determine output file path
                    output_filename = f"{args.cluster_name}_results_{run_num}.json"
                    output_path = args.output_dir / output_filename

                    # Load existing results
                    existing_data = merger.load_existing_results(output_path)

                    if existing_data is None:
                        print(
                            f"    Warning: No existing results found at {output_path}"
                        )
                        print("    Skipping this run - will execute fresh tests")
                        continue

                    # Create backup
                    backup_path = merger.create_backup(output_path)
                    if backup_path:
                        report.backup_file = str(backup_path)

                    # Execute tests for selected languages only
                    print("    Executing tests for selected languages...")
                    start_time = time.time()

                    base_results, _ = test_runner.run_cluster_tests(
                        cluster_path=cluster_path,
                        base_only=True,
                        llm_only=False,
                        prompt_version=args.prompt_version,
                        use_cache=not args.no_cache,
                        full=False,
                        run_number=run_num,
                        cluster_name=args.cluster_name,
                        selected_languages=list(selected_languages),
                        overwrite_results=overwrite_results,
                        debug_mode=args.debug_mode,
                    )

                    elapsed = time.time() - start_time

                    # Filter results to only selected languages
                    filtered_base_results = [
                        r for r in base_results if r.language in selected_languages
                    ]

                    print(
                        f"    Executed {len(filtered_base_results)} entries in {elapsed:.1f}s"
                    )

                    # Merge results
                    merged_data, lang_report = merger.merge_results(
                        existing_data=existing_data,
                        new_results=filtered_base_results,
                        selected_languages=list(selected_languages),
                        is_llm=False,
                    )

                    # Save merged results
                    merger.save_merged_results(merged_data, output_path)
                    print(f"    ✓ Saved merged results: {output_path.name}")
                    print(
                        f"      Valid new: {lang_report.valid_new_results}, "
                        f"Preserved old: {lang_report.preserved_old_results}, "
                        f"Invalid new: {lang_report.invalid_new_results}"
                    )

                    # Add to report
                    report.add_language_report(lang_report)

                    # Reset state for next run
                    test_runner.execution_state = ExecutionState()

        # Save execution report
        report_filename = (
            f"{args.cluster_name}_selective_execution_{int(time.time())}.json"
        )
        report_path = args.execution_report_dir / report_filename
        report.save_to_file(report_path)

        # Print summary
        report.print_summary()
        print(f"\n✓ Execution report saved to: {report_path}")

        print("\n" + "=" * 80)
        print("SELECTIVE RE-EXECUTION COMPLETED")
        print("=" * 80)

        return 0

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

        total_to_run = len(clusters_to_process)

        print(f"Processing {total_to_run} {test_type_desc} clusters...")

        # Process each cluster
        for i, cluster_path in enumerate(clusters_to_process):
            cluster_name = cluster_path.stem.replace("cluster_", "")
            cluster_path = (
                utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
            )

            print(
                f"\nProcessing cluster: {cluster_name} | {i}/{total_to_run}  ({i / total_to_run * 100} %)"
            )

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

                        start_time: float = time.time()

                        base_results, llm_results = test_runner.run_cluster_tests(
                            cluster_path=cluster_path,
                            base_only=base_only,
                            llm_only=llm_only,
                            prompt_version=p_v,
                            use_cache=not args.no_cache,
                            full=full,
                            run_number=run_num,
                            cluster_name=cluster_name,
                            selected_languages=list(selected_languages),
                            overwrite_results=overwrite_results,
                            debug_mode=args.debug_mode,
                        )

                        elapsed = time.time() - start_time
                        hours = int(elapsed // 3600)
                        minutes = int((elapsed % 3600) // 60)
                        seconds = int(elapsed % 60)
                        elapsed_str = f"{hours:02d}h {minutes:02d}m {seconds:02d}s"

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
                                    llm_results, llm_output_path, f"llm_v{p_v}", True
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
                                llm_results, output_path, f"llm_v{p_v}", True
                            )

                        # Send webhook notification
                        if args.webhook:
                            webhook_url = os.getenv("DISCORD_WEBHOOK")
                            # all_results = base_results + llm_results

                            cluster_content = general_utils.read_json(cluster_path)
                            base_total = 0
                            total = 0
                            for _lang, entries in cluster_content.items():
                                base_total += len(entries)

                            total = (
                                base_total
                                if args.base_only
                                else base_total * 3
                                if args.llm_only
                                else base_total * 3 + base_total
                            )
                            successful_tests = 0
                            failed_tests = 0
                            total_executed = len(base_results) + len(llm_results)

                            for res in base_results:
                                if res.is_valid():
                                    successful_tests += 1
                                else:
                                    failed_tests += 1

                            for res in llm_results:
                                if res.is_valid():
                                    successful_tests += 1
                                else:
                                    failed_tests += 1

                            results_summary = {
                                "cluster": cluster_name,
                                "duration": elapsed_str,
                                "completed": total_executed,
                                "total": total,
                                "successful": successful_tests,
                                "failed": failed_tests,
                                "success_rate": successful_tests / total_executed * 100
                                if total_executed > 0
                                else 0
                                if total_executed > 0
                                else 0,
                                "test_type": "full"
                                if args.full
                                else ("base" if args.base_only else "llm"),
                                "run #": run_num,
                                "prompt version": p_v,
                            }
                            send_webhook_notification(webhook_url, results_summary)

                        # Reset state for next run
                        test_runner.execution_state = ExecutionState()

                else:
                    # Execute tests
                    start_time: float = time.time()

                    base_results, llm_results = test_runner.run_cluster_tests(
                        cluster_path=cluster_path,
                        base_only=args.base_only,
                        llm_only=args.llm_only,
                        prompt_version=args.prompt_version,
                        use_cache=not args.no_cache,
                        full=args.full,
                        run_number=run_num,
                        cluster_name=cluster_name,
                        selected_languages=list(selected_languages),
                        overwrite_results=overwrite_results,
                        debug_mode=args.debug_mode,
                    )

                    elapsed = time.time() - start_time
                    hours = int(elapsed // 3600)
                    minutes = int((elapsed % 3600) // 60)
                    seconds = int(elapsed % 60)
                    elapsed_str = f"{hours:02d}h {minutes:02d}m {seconds:02d}s"

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
                                True,
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
                            llm_results,
                            output_path,
                            f"llm_v{args.prompt_version}",
                            True,
                        )

                    # Send webhook notification
                    if args.webhook:
                        webhook_url = os.getenv("DISCORD_WEBHOOK")

                        cluster_content = general_utils.read_json(cluster_path)
                        base_total = 0
                        total = 0
                        for _lang, entries in cluster_content.items():
                            base_total += len(entries)

                        total = (
                            base_total
                            if args.base_only
                            else base_total * 3
                            if args.llm_only
                            else base_total * 3 + base_total
                        )
                        successful_tests = 0
                        failed_tests = 0
                        total_executed = len(base_results) + len(llm_results)

                        for res in base_results:
                            if res.is_valid():
                                successful_tests += 1
                            else:
                                failed_tests += 1

                        for res in llm_results:
                            if res.is_valid():
                                successful_tests += 1
                            else:
                                failed_tests += 1

                        # all_results = base_results + llm_results
                        results_summary = {
                            "cluster": cluster_name,
                            "duration": elapsed_str,
                            "completed": total_executed,
                            "total": total,
                            "successful": successful_tests,
                            "failed": failed_tests,
                            "success_rate": successful_tests / total_executed * 100
                            if total_executed > 0
                            else 0
                            if total_executed > 0
                            else 0,
                            "test_type": "full"
                            if args.full
                            else ("base" if args.base_only else "llm"),
                            "run #": run_num,
                            "prompt version": args.prompt_version,
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

    """
    test_runner = ClusterRunner(max_workers=2, is_debug=True)

    base_results, llm_results = test_runner.run_cluster_tests(
        cluster_path=utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_reverse_string.json",
        base_only=False,
        llm_only=False,
        prompt_version=1,
        use_cache=False,
        full=True,
        run_number=1,
        cluster_name="reverse_string",
        debug_mode = args.debug_mode
    )
    """


# Example usage commands:
# python3 run_tests_on_cluster.py --base-only --webhook --max-workers 6 --not-check-pending
# python3 run_tests_on_cluster.py --llm-only --prompt-version 1 --webhook --max-workers 6 --not-check-pending

# run all base + LLM (5 times each) (every prompt v of LLMs) :
# python3 run_tests_on_cluster.py --full --webhook --max-workers 8 --not-check-pending --prompt-version -1


# run all (base + LLM) (5 times each) (every prompt v of LLMs) with check pending before:
# python3 run_tests_on_cluster.py --full --webhook --max-workers 6 --prompt-version -1


# python3 run_tests_on_cluster.py --base-only --webhook --max-workers 4 --prompt-version -1 --cluster-name allergies --debug-mode
