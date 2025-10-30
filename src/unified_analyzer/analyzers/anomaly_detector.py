"""Anomaly detection in execution results"""

import logging
import sys
import os
from typing import List, Dict, Optional, Tuple
from collections import defaultdict
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.config import AnalyzerConfig
from ..core.models import ExecutionEntry, Anomaly
from ..core.enums import AnomalyType, Severity, AnalysisMode

logger = logging.getLogger(__name__)


class AnomalyDetector:
    """Detects anomalies in execution entries"""

    def __init__(self, config: AnalyzerConfig):
        """
        Initialize anomaly detector

        Args:
            config: Analyzer configuration
        """
        self.config = config
        self._anomaly_counter = 0

    def detect_all(self, entries: List[ExecutionEntry]) -> List[Anomaly]:
        """
        Run all enabled detection methods

        Args:
            entries: List of execution entries

        Returns:
            List of detected anomalies
        """
        anomalies = []

        if self.config.is_mode_enabled(AnalysisMode.INVALID_VALUES):
            logger.info("Detecting invalid values...")
            anomalies.extend(self.detect_invalid_values(entries))

        if self.config.is_mode_enabled(AnalysisMode.MISSING_METRICS):
            logger.info("Detecting missing metrics...")
            anomalies.extend(self.detect_missing_metrics(entries))

        if self.config.is_mode_enabled(AnalysisMode.OUTLIERS):
            logger.info("Detecting outliers...")
            anomalies.extend(self.detect_outliers(entries))

        logger.info(f"Total anomalies detected: {len(anomalies)}")
        return anomalies

    def detect_invalid_values(self, entries: List[ExecutionEntry]) -> List[Anomaly]:
        """
        Detect entries with invalid metric values

        Invalid means: value <= 0 or None

        Args:
            entries: List of execution entries

        Returns:
            List of anomalies
        """
        anomalies = []

        for entry in entries:
            issues = []

            # Check each metric
            for metric_name in self.config.required_metrics:
                value = entry.get_metric(metric_name)

                if value is None:
                    issues.append(f"{metric_name} is None")
                elif value <= self.config.invalid_value_threshold:
                    issues.append(f"{metric_name} = {value} (invalid)")

            # Create anomaly if issues found
            if issues:
                severity = self._determine_severity_for_invalid(entry, issues)

                # Enhanced diagnostic info with all available data
                diagnostic_info = {
                    'execution_time_ms': entry.execution_time_ms,
                    'cpu_usage': entry.cpu_usage,
                    'ram_usage': entry.ram_usage,
                    'test_passed': entry.regression_test_passed,
                    'success': entry.success,
                    'has_error_message': entry.error_message is not None,
                    'error_message': entry.error_message[:200] if entry.error_message else None,
                }

                # Add diagnostic fields if available
                if hasattr(entry, 'docker_exit_code') and entry.docker_exit_code is not None:
                    diagnostic_info['docker_exit_code'] = entry.docker_exit_code
                if hasattr(entry, 'error_category') and entry.error_category:
                    diagnostic_info['error_category'] = entry.error_category
                if hasattr(entry, 'docker_stderr_preview') and entry.docker_stderr_preview:
                    diagnostic_info['docker_stderr_preview'] = entry.docker_stderr_preview[:200]

                anomaly = Anomaly(
                    anomaly_id=self._generate_anomaly_id(),
                    entry=entry,
                    anomaly_type=AnomalyType.INVALID_VALUE,
                    severity=severity,
                    detected_issues=issues,
                    diagnostic_info=diagnostic_info
                )

                anomalies.append(anomaly)

        logger.info(f"Detected {len(anomalies)} invalid value anomalies")
        return anomalies

    def detect_missing_metrics(self, entries: List[ExecutionEntry]) -> List[Anomaly]:
        """
        Detect entries with completely missing metrics

        Args:
            entries: List of execution entries

        Returns:
            List of anomalies
        """
        anomalies = []

        for entry in entries:
            if not entry.has_missing_metrics():
                continue

            issues = []

            # List all missing metrics
            for metric_name in self.config.required_metrics:
                value = entry.get_metric(metric_name)
                if value is None:
                    issues.append(f"{metric_name} is missing")

            # Create anomaly
            severity = Severity.CRITICAL  # Missing metrics is always critical

            anomaly = Anomaly(
                anomaly_id=self._generate_anomaly_id(),
                entry=entry,
                anomaly_type=AnomalyType.MISSING_METRICS,
                severity=severity,
                detected_issues=issues,
                diagnostic_info={
                    'success': entry.success,
                    'test_passed': entry.regression_test_passed,
                    'has_error_message': entry.error_message is not None,
                    'has_log': entry.log_path is not None
                }
            )

            anomalies.append(anomaly)

        logger.info(f"Detected {len(anomalies)} missing metrics anomalies")
        return anomalies

    def detect_outliers(
        self,
        entries: List[ExecutionEntry],
        threshold_percentage: Optional[float] = None
    ) -> List[Anomaly]:
        """
        Detect outliers using IQR method

        Args:
            entries: List of execution entries
            threshold_percentage: Custom threshold (uses config if None)

        Returns:
            List of anomalies
        """
        if threshold_percentage is None:
            threshold_percentage = self.config.outlier_threshold_percentage

        anomalies = []

        # Group entries by cluster and language for comparison
        grouped = self._group_entries_for_outlier_detection(entries)

        for group_key, group_entries in grouped.items():
            # Need at least 4 entries for meaningful outlier detection
            if len(group_entries) < 4:
                continue

            # Check each metric
            for metric_name in self.config.required_metrics:
                outlier_entries = self._detect_outliers_for_metric(
                    group_entries,
                    metric_name,
                    threshold_percentage
                )

                for entry, metric_value, median_value, deviation_pct in outlier_entries:
                    issues = [
                        f"{metric_name} = {metric_value:.2f} "
                        f"(median: {median_value:.2f}, "
                        f"deviation: {deviation_pct:.1f}%)"
                    ]

                    severity = self._determine_severity_for_outlier(deviation_pct)

                    anomaly = Anomaly(
                        anomaly_id=self._generate_anomaly_id(),
                        entry=entry,
                        anomaly_type=AnomalyType.OUTLIER,
                        severity=severity,
                        detected_issues=issues,
                        diagnostic_info={
                            'metric': metric_name,
                            'value': metric_value,
                            'median': median_value,
                            'deviation_percentage': deviation_pct,
                            'group_key': group_key,
                            'group_size': len(group_entries)
                        }
                    )

                    anomalies.append(anomaly)

        logger.info(f"Detected {len(anomalies)} outlier anomalies")
        return anomalies

    def _group_entries_for_outlier_detection(
        self,
        entries: List[ExecutionEntry]
    ) -> Dict[str, List[ExecutionEntry]]:
        """Group entries for outlier comparison"""
        grouped = defaultdict(list)

        for entry in entries:
            # Group by cluster + language + test_type
            # This ensures we compare apples to apples
            key = f"{entry.cluster_name}_{entry.language}_{entry.test_type}"

            # Only include entries with valid metrics
            if entry.has_valid_metrics():
                grouped[key].append(entry)

        return grouped

    def _detect_outliers_for_metric(
        self,
        entries: List[ExecutionEntry],
        metric_name: str,
        threshold_percentage: float
    ) -> List[Tuple[ExecutionEntry, float, float, float]]:
        """
        Detect outliers for a specific metric using percentage threshold

        Returns:
            List of (entry, metric_value, median_value, deviation_percentage)
        """
        outliers = []

        # Extract metric values
        values = []
        entry_value_map = {}  # Map entry_id -> (entry, value)

        for entry in entries:
            value = entry.get_metric(metric_name)
            if value is not None and value > 0:
                values.append(value)
                entry_value_map[entry.id] = (entry, value)

        if len(values) < 4:
            return outliers

        # Calculate median
        sorted_values = sorted(values)
        n = len(sorted_values)
        median = sorted_values[n // 2] if n % 2 == 1 else \
                 (sorted_values[n // 2 - 1] + sorted_values[n // 2]) / 2

        # Find outliers based on percentage deviation from median
        for entry_id, (entry, value) in entry_value_map.items():
            deviation_pct = abs((value - median) / median * 100)

            if deviation_pct > threshold_percentage:
                outliers.append((entry, value, median, deviation_pct))

        return outliers

    def _determine_severity_for_invalid(
        self,
        entry: ExecutionEntry,
        issues: List[str]
    ) -> Severity:
        """Determine severity for invalid value anomaly"""

        # If all metrics are invalid -> CRITICAL
        if len(issues) >= len(self.config.required_metrics):
            return Severity.CRITICAL

        # If 2+ metrics invalid -> HIGH
        if len(issues) >= 2:
            return Severity.HIGH

        # If test failed -> HIGH
        if entry.regression_test_passed is False:
            return Severity.HIGH

        # Single metric invalid -> MEDIUM
        return Severity.MEDIUM

    def _determine_severity_for_outlier(self, deviation_pct: float) -> Severity:
        """Determine severity based on deviation percentage"""

        if deviation_pct > 1000:  # 10x deviation
            return Severity.CRITICAL
        elif deviation_pct > 500:  # 5x deviation
            return Severity.HIGH
        elif deviation_pct > 200:  # 2x deviation
            return Severity.MEDIUM
        else:
            return Severity.LOW

    def _generate_anomaly_id(self) -> str:
        """Generate unique anomaly ID"""
        self._anomaly_counter += 1
        timestamp = datetime.now().strftime("%Y%m%d")
        return f"ANM-{timestamp}-{self._anomaly_counter:04d}"
