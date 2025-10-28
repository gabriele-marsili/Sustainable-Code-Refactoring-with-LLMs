"""Root cause analysis for anomalies"""

import logging
import sys
import os
import re
from typing import List, Dict, Optional, Tuple
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.config import AnalyzerConfig
from ..core.models import Anomaly, ExecutionEntry, LogAnalysis
from ..core.enums import RootCause, AnomalyType
from ..data.loader import DataLoader
from ..data.parser import FilenameParser
from .log_analyzer import LogAnalyzer

logger = logging.getLogger(__name__)


class RootCauseAnalyzer:
    """Analyzes root causes of anomalies"""

    def __init__(self, config: AnalyzerConfig, data_loader: DataLoader):
        """
        Initialize root cause analyzer

        Args:
            config: Analyzer configuration
            data_loader: Data loader instance
        """
        self.config = config
        self.data_loader = data_loader
        self.log_analyzer = LogAnalyzer()
        self.parser = FilenameParser()

    def analyze(self, anomaly: Anomaly) -> Anomaly:
        """
        Analyze an anomaly and determine probable root causes

        Updates the anomaly object with:
        - probable_causes: List of likely root causes
        - log_analysis: Analysis of log file (if available)
        - recommended_actions: Suggested fixes

        Args:
            anomaly: Anomaly to analyze

        Returns:
            Updated anomaly object
        """
        entry = anomaly.entry

        # Step 1: Analyze log file if available and enabled
        if self.config.enable_log_analysis and entry.log_path:
            log_content = self.data_loader.load_log_file(entry.log_path)
            if log_content:
                anomaly.log_analysis = self.log_analyzer.analyze_log(
                    entry.log_path,
                    log_content
                )
            else:
                logger.debug(f"Could not load log file: {entry.log_path}")

        # Step 2: Determine root causes based on anomaly type
        if anomaly.anomaly_type == AnomalyType.MISSING_METRICS:
            causes = self._analyze_missing_metrics(anomaly)
        elif anomaly.anomaly_type == AnomalyType.INVALID_VALUE:
            causes = self._analyze_invalid_values(anomaly)
        elif anomaly.anomaly_type == AnomalyType.OUTLIER:
            causes = self._analyze_outlier(anomaly)
        else:
            causes = [RootCause.UNKNOWN]

        anomaly.probable_causes = causes

        # Step 3: Generate recommended actions
        anomaly.recommended_actions = self._generate_recommendations(anomaly)

        return anomaly

    def _analyze_missing_metrics(self, anomaly: Anomaly) -> List[RootCause]:
        """Analyze anomaly with missing metrics"""
        entry = anomaly.entry
        causes = []

        # Check log analysis first
        if anomaly.log_analysis:
            log_causes = self._determine_cause_from_log(anomaly.log_analysis, entry)
            if log_causes:
                return log_causes

        # Check error message
        if entry.error_message:
            msg_causes = self._analyze_error_message(entry.error_message)
            if msg_causes:
                causes.extend(msg_causes)

        # If test didn't pass -> likely code or test issue
        if entry.regression_test_passed is False:
            causes.append(RootCause.ASSERTION_FAILURE)

        # Check for execution failure indicators
        if entry.success is False and not causes:
            # Only add if we haven't found other causes
            causes.append(RootCause.RUNTIME_CRASH)

        # If no metrics collected at all -> metrics collection issue
        if entry.has_missing_metrics() and not entry.error_message:
            causes.append(RootCause.METRICS_COLLECTION_FAILURE)

        return causes if causes else [RootCause.UNKNOWN]

    def _analyze_invalid_values(self, anomaly: Anomaly) -> List[RootCause]:
        """Analyze anomaly with invalid values (0 or negative)"""
        entry = anomaly.entry
        causes = []

        # If test passed but metrics are 0 -> metrics collection failure
        if entry.regression_test_passed and entry.has_zero_metrics():
            causes.append(RootCause.METRICS_COLLECTION_FAILURE)
            return causes

        # Check log analysis
        if anomaly.log_analysis:
            log_causes = self._determine_cause_from_log(anomaly.log_analysis, entry)
            if log_causes:
                return log_causes

        # Check error message
        if entry.error_message:
            msg_causes = self._analyze_error_message(entry.error_message)
            if msg_causes:
                causes.extend(msg_causes)

        # Test failed -> likely code or test issue
        if entry.regression_test_passed is False:
            # Try to distinguish between test and code error
            cause, _ = self._distinguish_test_vs_code_error(entry, anomaly.log_analysis)
            causes.append(cause)

        return causes if causes else [RootCause.UNKNOWN]

    def _analyze_outlier(self, anomaly: Anomaly) -> List[RootCause]:
        """Analyze outlier anomaly"""
        entry = anomaly.entry

        # For outliers, if test passed, it might just be algorithmic difference
        if entry.regression_test_passed:
            # This is an interesting case: code works but has very different performance
            # Could be legitimate optimization or a different algorithm
            return [RootCause.CODE_BUG]  # "Bug" here means unexpected performance

        # If test failed, analyze like invalid values
        return self._analyze_invalid_values(anomaly)

    def _determine_cause_from_log(
        self,
        log_analysis: LogAnalysis,
        entry: ExecutionEntry
    ) -> List[RootCause]:
        """Determine root cause from log analysis"""
        causes = []

        # Compilation errors
        if log_analysis.has_compilation_errors:
            # Determine if error is in test file or code file
            cause, _ = self._distinguish_test_vs_code_error(entry, log_analysis)
            causes.append(cause)
            return causes

        # Runtime crashes
        if log_analysis.has_runtime_errors:
            causes.append(RootCause.RUNTIME_CRASH)

        # Test failures
        if log_analysis.has_test_failures:
            # Check if it's test setup failure
            if log_analysis.error_file_paths:
                test_setup = any(
                    self.parser.is_test_file(fp)
                    for fp in log_analysis.error_file_paths
                )
                if test_setup:
                    causes.append(RootCause.TEST_SUITE_ERROR)
                else:
                    causes.append(RootCause.ASSERTION_FAILURE)
            else:
                causes.append(RootCause.ASSERTION_FAILURE)

        # Timeouts
        if log_analysis.has_timeout:
            causes.append(RootCause.TIMEOUT)

        # Memory issues
        if log_analysis.has_memory_issues:
            causes.append(RootCause.MEMORY_ERROR)

        return causes

    def _distinguish_test_vs_code_error(
        self,
        entry: ExecutionEntry,
        log_analysis: Optional[LogAnalysis]
    ) -> Tuple[RootCause, str]:
        """
        KEY METHOD: Distinguish between test suite error and code bug

        Returns:
            Tuple of (RootCause, explanation_string)
        """

        # LEVEL 1: Analyze compilation errors from log
        if log_analysis and log_analysis.has_compilation_errors:
            for error in log_analysis.compilation_errors:
                # Extract file path from error
                error_file = self.parser.extract_error_file_path(error)

                if error_file:
                    # Check if it's a test file
                    if self.parser.is_test_file(error_file):
                        return (
                            RootCause.TEST_SUITE_ERROR,
                            f"Compilation error in test file: {error_file}"
                        )
                    else:
                        return (
                            RootCause.CODE_BUG,
                            f"Compilation error in code file: {error_file}"
                        )

        # LEVEL 2: Analyze link errors
        if log_analysis and log_analysis.compilation_errors:
            for error in log_analysis.compilation_errors:
                if 'undefined reference' in error.lower():
                    # Check if it references test functions
                    if any(test_kw in error.lower() for test_kw in ['test', 'Test', 'TEST']):
                        return (
                            RootCause.TEST_SUITE_ERROR,
                            f"Test suite link error: {error}"
                        )
                    else:
                        return (
                            RootCause.CODE_BUG,
                            f"Code link error - missing implementation: {error}"
                        )

        # LEVEL 3: Analyze runtime errors
        if log_analysis and log_analysis.has_runtime_errors:
            for error in log_analysis.runtime_errors:
                if any(test_kw in error.lower() for test_kw in ['test_', 'Test', 'TEST']):
                    return (
                        RootCause.TEST_SUITE_ERROR,
                        f"Runtime crash in test code: {error}"
                    )

        # LEVEL 4: Analyze error message patterns
        if entry.error_message:
            msg_lower = entry.error_message.lower()

            # Test suite patterns
            test_patterns = [
                'no tests found',
                'test file not found',
                'test suite',
                'cannot find test',
                'test executable'
            ]

            for pattern in test_patterns:
                if pattern in msg_lower:
                    return (
                        RootCause.TEST_SUITE_ERROR,
                        f"Test suite issue: {pattern}"
                    )

        # LEVEL 5: Check test pass status with zero metrics
        if entry.regression_test_passed and entry.has_zero_metrics():
            return (
                RootCause.METRICS_COLLECTION_FAILURE,
                "Test passed but metrics are zero - collection issue"
            )

        # LEVEL 6: Compare with similar entries
        similar_entries = self._get_similar_entries(entry)
        if similar_entries:
            failed_count = sum(
                1 for e in similar_entries
                if not e.regression_test_passed or not e.has_valid_metrics()
            )

            failure_rate = failed_count / len(similar_entries)

            # If most entries fail (>75%) -> likely systemic issue (test suite or config)
            if failure_rate > 0.75:
                return (
                    RootCause.TEST_SUITE_ERROR,
                    f"Systemic failure: {failed_count}/{len(similar_entries)} entries fail"
                )
            # If only this entry fails -> likely code bug
            elif failure_rate < 0.25:
                return (
                    RootCause.CODE_BUG,
                    f"Isolated failure: only {failed_count}/{len(similar_entries)} entries fail"
                )

        # LEVEL 7: Language-specific heuristics
        if entry.language in ['c', 'cpp']:
            return self._analyze_cpp_specific(entry, log_analysis)

        # DEFAULT: Unable to determine
        return (
            RootCause.UNKNOWN,
            "Unable to determine root cause - manual inspection required"
        )

    def _analyze_cpp_specific(
        self,
        entry: ExecutionEntry,
        log_analysis: Optional[LogAnalysis]
    ) -> Tuple[RootCause, str]:
        """C++ specific analysis"""

        if not log_analysis:
            return (RootCause.UNKNOWN, "No log analysis available")

        # Check for CMake errors -> configuration issue
        if log_analysis.compilation_errors:
            for error in log_analysis.compilation_errors:
                if 'cmake' in error.lower():
                    return (
                        RootCause.CONFIGURATION_ERROR,
                        "CMake configuration error"
                    )

        # Check for common C++ issues
        if log_analysis.has_runtime_errors:
            for error in log_analysis.runtime_errors:
                if 'segmentation fault' in error.lower():
                    return (RootCause.RUNTIME_CRASH, "Segmentation fault")
                if 'bad_alloc' in error.lower():
                    return (RootCause.MEMORY_ERROR, "Memory allocation failed")

        return (RootCause.COMPILATION_ERROR, "C++ compilation/build error")

    def _analyze_error_message(self, error_message: str) -> List[RootCause]:
        """Analyze error message for root causes"""
        causes = []
        msg_lower = error_message.lower()

        # Compilation
        if any(kw in msg_lower for kw in ['compilation', 'compile', 'syntax']):
            causes.append(RootCause.COMPILATION_ERROR)

        # Timeout
        if 'timeout' in msg_lower or 'timed out' in msg_lower:
            causes.append(RootCause.TIMEOUT)

        # Memory
        if any(kw in msg_lower for kw in ['memory', 'malloc', 'allocation']):
            causes.append(RootCause.MEMORY_ERROR)

        # Docker
        if 'docker' in msg_lower:
            causes.append(RootCause.DOCKER_ERROR)

        return causes

    def _get_similar_entries(self, entry: ExecutionEntry) -> List[ExecutionEntry]:
        """Get similar entries for comparison"""
        # Load all entries from the same cluster
        try:
            all_entries = self.data_loader.load_execution_results(
                entry.cluster_name,
                test_type=entry.test_type
            )

            # Filter to same language
            similar = [
                e for e in all_entries
                if e.language == entry.language and e.id != entry.id
            ]

            return similar

        except Exception as e:
            logger.error(f"Error loading similar entries: {e}")
            return []

    def _generate_recommendations(self, anomaly: Anomaly) -> List[str]:
        """Generate recommended actions based on root causes"""
        recommendations = []
        entry = anomaly.entry

        if not anomaly.probable_causes:
            return ["Manual inspection required"]

        primary_cause = anomaly.probable_causes[0]

        # Recommendations based on root cause
        if primary_cause == RootCause.TEST_SUITE_ERROR:
            recommendations.extend([
                "Review test suite configuration and compilation setup",
                "Check test file paths and naming conventions",
                "Verify test framework dependencies are installed",
                f"Inspect log file: {entry.log_path}" if entry.log_path else "Check execution logs"
            ])

        elif primary_cause == RootCause.CODE_BUG:
            recommendations.extend([
                "Review code implementation for logic errors",
                "Check for compilation errors or warnings",
                "Verify all required functions are implemented",
                "Run tests locally to reproduce the issue"
            ])

        elif primary_cause == RootCause.COMPILATION_ERROR:
            recommendations.extend([
                "Fix compilation errors in source files",
                "Check for missing includes or dependencies",
                "Verify syntax is correct for the language version",
                "Review compiler output in log file"
            ])

        elif primary_cause == RootCause.RUNTIME_CRASH:
            recommendations.extend([
                "Check for null pointer dereferences",
                "Verify array bounds and memory access",
                "Use debugger or add print statements to identify crash location",
                "Review stack trace in log file"
            ])

        elif primary_cause == RootCause.TIMEOUT:
            recommendations.extend([
                "Optimize algorithm for better time complexity",
                "Check for infinite loops",
                "Consider increasing timeout threshold if appropriate",
                "Profile code to find performance bottlenecks"
            ])

        elif primary_cause == RootCause.MEMORY_ERROR:
            recommendations.extend([
                "Check for memory leaks",
                "Verify proper memory allocation/deallocation",
                "Consider reducing memory usage in algorithm",
                "Check for excessive recursion or large data structures"
            ])

        elif primary_cause == RootCause.METRICS_COLLECTION_FAILURE:
            recommendations.extend([
                "Verify metrics collection script is working",
                "Check if process monitoring tools are installed",
                "Review execution environment configuration",
                "Test metrics collection manually"
            ])

        elif primary_cause == RootCause.CONFIGURATION_ERROR:
            recommendations.extend([
                "Review build configuration files (CMakeLists.txt, Makefile, etc.)",
                "Check environment variables and paths",
                "Verify all required tools and compilers are installed",
                "Test build process manually"
            ])

        else:
            recommendations.append("Manual inspection required - cause unclear")

        # Add log inspection if available
        if entry.log_path and "log file" not in str(recommendations):
            recommendations.append(f"Review detailed log: {entry.log_path}")

        return recommendations
