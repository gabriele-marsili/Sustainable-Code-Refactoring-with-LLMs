"""Data models for unified analyzer"""

import sys
import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any, Set
from datetime import datetime
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from .enums import AnomalyType, RootCause, Severity


@dataclass
class ExecutionEntry:
    """Represents a single execution entry"""

    id: str
    cluster_name: str
    language: str
    filename: str
    test_type: str  # 'base' or 'llm'
    exec_number: int
    prompt_version: Optional[int] = None
    llm_type: Optional[str] = None

    # Metrics
    execution_time_ms: Optional[float] = None
    cpu_usage: Optional[float] = None
    ram_usage: Optional[float] = None
    regression_test_passed: Optional[bool] = None

    # Error information
    success: Optional[bool] = None
    error_message: Optional[str] = None
    log_path: Optional[Path] = None

    # Additional metadata
    code_path: Optional[Path] = None
    test_path: Optional[Path] = None

    def _to_float(self, value: Any) -> Optional[float]:
        """Convert value to float, handling strings and None"""
        if value is None:
            return None
        if isinstance(value, str):
            try:
                return float(value)
            except (ValueError, TypeError):
                return None
        if isinstance(value, (int, float)):
            return float(value)
        return None

    def has_valid_metrics(self) -> bool:
        """Check if entry has all required metrics with valid values"""
        exec_time = self._to_float(self.execution_time_ms)
        cpu = self._to_float(self.cpu_usage)
        ram = self._to_float(self.ram_usage)

        return all([
            exec_time is not None and exec_time > 0,
            cpu is not None and cpu > 0,
            ram is not None and ram > 0
        ])

    def has_zero_metrics(self) -> bool:
        """Check if entry has zero values for metrics"""
        exec_time = self._to_float(self.execution_time_ms)
        cpu = self._to_float(self.cpu_usage)
        ram = self._to_float(self.ram_usage)

        return any([
            exec_time == 0,
            cpu == 0,
            ram == 0
        ])

    def has_missing_metrics(self) -> bool:
        """Check if entry has missing metrics"""
        return any([
            self.execution_time_ms is None,
            self.cpu_usage is None,
            self.ram_usage is None
        ])

    def get_metric(self, metric_name: str) -> Optional[float]:
        """Get a metric value by name, always returns float or None"""
        metric_map = {
            'execution_time_ms': self.execution_time_ms,
            'CPU_usage': self.cpu_usage,
            'RAM_usage': self.ram_usage
        }
        value = metric_map.get(metric_name)
        return self._to_float(value)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'id': self.id,
            'cluster_name': self.cluster_name,
            'language': self.language,
            'filename': self.filename,
            'test_type': self.test_type,
            'exec_number': self.exec_number,
            'prompt_version': self.prompt_version,
            'llm_type': self.llm_type,
            'execution_time_ms': self.execution_time_ms,
            'cpu_usage': self.cpu_usage,
            'ram_usage': self.ram_usage,
            'regression_test_passed': self.regression_test_passed,
            'success': self.success,
            'error_message': self.error_message,
            'log_path': str(self.log_path) if self.log_path else None,
            'code_path': str(self.code_path) if self.code_path else None,
            'test_path': str(self.test_path) if self.test_path else None
        }


@dataclass
class LogAnalysis:
    """Results from log file analysis"""

    log_path: Path
    has_compilation_errors: bool = False
    has_runtime_errors: bool = False
    has_test_failures: bool = False
    has_timeout: bool = False
    has_memory_issues: bool = False

    compilation_errors: List[str] = field(default_factory=list)
    runtime_errors: List[str] = field(default_factory=list)
    test_failures: List[str] = field(default_factory=list)
    stack_traces: List[str] = field(default_factory=list)

    error_file_paths: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'log_path': str(self.log_path),
            'has_compilation_errors': self.has_compilation_errors,
            'has_runtime_errors': self.has_runtime_errors,
            'has_test_failures': self.has_test_failures,
            'has_timeout': self.has_timeout,
            'has_memory_issues': self.has_memory_issues,
            'compilation_errors': self.compilation_errors,
            'runtime_errors': self.runtime_errors,
            'test_failures': self.test_failures,
            'error_file_paths': self.error_file_paths
        }


@dataclass
class Anomaly:
    """Represents a detected anomaly"""

    anomaly_id: str
    entry: ExecutionEntry
    anomaly_type: AnomalyType
    severity: Severity

    detected_issues: List[str] = field(default_factory=list)
    probable_causes: List[RootCause] = field(default_factory=list)
    diagnostic_info: Dict[str, Any] = field(default_factory=dict)
    recommended_actions: List[str] = field(default_factory=list)

    log_analysis: Optional[LogAnalysis] = None
    detection_timestamp: datetime = field(default_factory=datetime.now)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'anomaly_id': self.anomaly_id,
            'entry': self.entry.to_dict(),
            'anomaly_type': str(self.anomaly_type),
            'severity': str(self.severity),
            'detected_issues': self.detected_issues,
            'probable_causes': [str(cause) for cause in self.probable_causes],
            'diagnostic_info': self.diagnostic_info,
            'recommended_actions': self.recommended_actions,
            'log_analysis': self.log_analysis.to_dict() if self.log_analysis else None,
            'detection_timestamp': self.detection_timestamp.isoformat()
        }

    def get_primary_cause(self) -> Optional[RootCause]:
        """Get the most likely root cause"""
        return self.probable_causes[0] if self.probable_causes else None


@dataclass
class AnalysisReport:
    """Complete analysis report"""

    analysis_timestamp: datetime
    config: Dict[str, Any]

    total_entries_analyzed: int
    anomalies: List[Anomaly]

    statistics: Dict[str, Any] = field(default_factory=dict)
    clusters_affected: Set[str] = field(default_factory=set)

    summary_by_language: Dict[str, Dict] = field(default_factory=dict)
    summary_by_anomaly_type: Dict[AnomalyType, int] = field(default_factory=dict)
    summary_by_severity: Dict[Severity, int] = field(default_factory=dict)
    summary_by_root_cause: Dict[RootCause, int] = field(default_factory=dict)

    def get_anomalies_by_cluster(self, cluster_name: str) -> List[Anomaly]:
        """Get anomalies for a specific cluster"""
        return [a for a in self.anomalies if a.entry.cluster_name == cluster_name]

    def get_anomalies_by_language(self, language: str) -> List[Anomaly]:
        """Get anomalies for a specific language"""
        return [a for a in self.anomalies if a.entry.language == language]

    def get_anomalies_by_type(self, anomaly_type: AnomalyType) -> List[Anomaly]:
        """Get anomalies of a specific type"""
        return [a for a in self.anomalies if a.anomaly_type == anomaly_type]

    def get_anomalies_by_severity(self, severity: Severity) -> List[Anomaly]:
        """Get anomalies of a specific severity"""
        return [a for a in self.anomalies if a.severity == severity]

    def get_critical_anomalies(self) -> List[Anomaly]:
        """Get all critical anomalies"""
        return self.get_anomalies_by_severity(Severity.CRITICAL)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary"""
        return {
            'analysis_timestamp': self.analysis_timestamp.isoformat(),
            'config': self.config,
            'total_entries_analyzed': self.total_entries_analyzed,
            'total_anomalies': len(self.anomalies),
            'anomalies': [a.to_dict() for a in self.anomalies],
            'statistics': self.statistics,
            'clusters_affected': list(self.clusters_affected),
            'summary_by_language': self.summary_by_language,
            'summary_by_anomaly_type': {
                str(k): v for k, v in self.summary_by_anomaly_type.items()
            },
            'summary_by_severity': {
                str(k): v for k, v in self.summary_by_severity.items()
            },
            'summary_by_root_cause': {
                str(k): v for k, v in self.summary_by_root_cause.items()
            }
        }
