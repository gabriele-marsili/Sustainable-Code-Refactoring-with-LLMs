"""Data models for unified analyzer"""

import sys
import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any, Set
from datetime import datetime
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from .enums import AnomalyType, RootCause, Severity
from enum import Enum


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

    # ✅ Enhanced diagnostic fields (from run_tests_on_cluster.py)
    docker_exit_code: Optional[int] = None
    error_category: Optional[str] = None  # From MetricsParser.categorize_error()
    docker_stdout_preview: Optional[str] = None
    docker_stderr_preview: Optional[str] = None
    raw_log_preview: Optional[str] = None

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
        base_dict = {
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

        # ✅ Add diagnostic fields if available (only for failures)
        if not self.success or not self.has_valid_metrics():
            diagnostic_fields = {
                'docker_exit_code': self.docker_exit_code,
                'error_category': self.error_category,
                'docker_stdout_preview': self.docker_stdout_preview,
                'docker_stderr_preview': self.docker_stderr_preview,
                'raw_log_preview': self.raw_log_preview,
            }
            # Only add non-None values
            base_dict.update({k: v for k, v in diagnostic_fields.items() if v is not None})

        return base_dict


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

    # Convenience properties for pipeline compatibility
    @property
    def cluster_name(self) -> str:
        """Get cluster name from entry"""
        return self.entry.cluster_name

    @property
    def entry_id(self) -> str:
        """Get entry ID from entry"""
        return self.entry.id

    @property
    def language(self) -> str:
        """Get language from entry"""
        return self.entry.language

    @property
    def test_type(self) -> str:
        """Get test type from entry"""
        return self.entry.test_type

    @property
    def metrics_affected(self) -> List[str]:
        """Extract metric names from detected issues"""
        metrics = []
        for issue in self.detected_issues:
            for metric in ['execution_time_ms', 'CPU_usage', 'RAM_usage']:
                if metric in issue:
                    metrics.append(metric)
        return list(set(metrics))  # Remove duplicates

    @property
    def root_cause(self) -> Optional[RootCause]:
        """Get primary root cause (for backward compatibility)"""
        return self.get_primary_cause()

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
        # Convert language summary (with nested enum keys) to JSON-serializable format
        serializable_lang_summary = {}
        for lang, summary in self.summary_by_language.items():
            serializable_lang_summary[lang] = {
                'total_anomalies': summary.get('total_anomalies', 0),
                'total_entries': summary.get('total_entries', 0),
                'problematic_entries': summary.get('problematic_entries', 0),
                'anomaly_percentage': summary.get('anomaly_percentage', 0.0),
                'by_type': {str(k): v for k, v in summary.get('by_type', {}).items()},
                'by_severity': {str(k): v for k, v in summary.get('by_severity', {}).items()}
            }

        return {
            'analysis_timestamp': self.analysis_timestamp.isoformat(),
            'config': self.config,
            'total_entries_analyzed': self.total_entries_analyzed,
            'total_anomalies': len(self.anomalies),
            'anomalies': [a.to_dict() for a in self.anomalies],
            'statistics': self.statistics,
            'clusters_affected': list(self.clusters_affected),
            'summary_by_language': serializable_lang_summary,
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


# ============================================================================
# AUTO-FIXER MODELS (Migrated from auto_fixer/core/models.py)
# ============================================================================


class ErrorCategory(Enum):
    """Categories of errors based on fixability"""

    # FIXABLE - Environment/Infrastructure issues
    DOCKER_ERROR = "docker_error"
    METRICS_COLLECTION = "metrics_collection"
    CONFIGURATION_ERROR = "configuration_error"
    ENVIRONMENT_SETUP = "environment_setup"

    # UNFIXABLE - Code-level issues requiring manual intervention
    CODE_BUG = "code_bug"
    TEST_SUITE_ERROR = "test_suite_error"
    COMPILATION_ERROR = "compilation_error"
    RUNTIME_CRASH = "runtime_crash"
    ASSERTION_FAILURE = "assertion_failure"

    # UNCERTAIN - Requires investigation
    UNKNOWN = "unknown"

    def is_fixable(self) -> bool:
        """Check if this error category can be auto-fixed"""
        fixable_categories = {
            ErrorCategory.DOCKER_ERROR,
            ErrorCategory.METRICS_COLLECTION,
            ErrorCategory.CONFIGURATION_ERROR,
            ErrorCategory.ENVIRONMENT_SETUP
        }
        return self in fixable_categories

    def is_code_related(self) -> bool:
        """Check if this error is related to code (test or implementation)"""
        code_categories = {
            ErrorCategory.CODE_BUG,
            ErrorCategory.TEST_SUITE_ERROR,
            ErrorCategory.COMPILATION_ERROR,
            ErrorCategory.RUNTIME_CRASH,
            ErrorCategory.ASSERTION_FAILURE
        }
        return self in code_categories


class FixAction(Enum):
    """Types of fix actions that can be performed"""

    # Docker/Container fixes
    RESTART_DOCKER = "restart_docker"
    REBUILD_CONTAINER = "rebuild_container"
    CLEAN_DOCKER_CACHE = "clean_docker_cache"
    FIX_DOCKER_PERMISSIONS = "fix_docker_permissions"

    # Metrics collection fixes
    RESTART_METRICS_COLLECTION = "restart_metrics_collection"
    RECALIBRATE_METRICS = "recalibrate_metrics"
    FIX_PROCESS_MONITORING = "fix_process_monitoring"

    # Configuration fixes
    FIX_FILE_PATHS = "fix_file_paths"
    RESTORE_CONFIG = "restore_config"
    REGENERATE_CONFIG = "regenerate_config"

    # Re-execution
    RERUN_ENTRY = "rerun_entry"
    RERUN_WITH_VERBOSE = "rerun_with_verbose"

    # Investigation
    COLLECT_DEBUG_INFO = "collect_debug_info"
    MANUAL_REVIEW_REQUIRED = "manual_review_required"


class FixResult(Enum):
    """Result of a fix attempt"""
    SUCCESS = "success"
    PARTIAL_SUCCESS = "partial_success"
    FAILED = "failed"
    NOT_APPLICABLE = "not_applicable"
    SKIPPED = "skipped"


@dataclass
class ClassifiedError:
    """An error classified by the ErrorClassifier"""

    # From Unified Analyzer
    anomaly_id: str
    cluster_name: str
    entry_id: str
    language: str

    # Error information
    category: ErrorCategory
    root_cause: str  # From RootCause enum
    severity: str    # From Severity enum

    # File paths
    code_file_path: Optional[str] = None
    test_file_path: Optional[str] = None
    log_file_path: Optional[Path] = None
    error_file_paths: List[str] = field(default_factory=list)

    # Error details
    error_message: Optional[str] = None
    detected_issues: List[str] = field(default_factory=list)

    # Fix information
    is_fixable: bool = field(init=False)
    recommended_actions: List[FixAction] = field(default_factory=list)

    # Metadata
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())

    def __post_init__(self):
        """Set is_fixable based on category"""
        self.is_fixable = self.category.is_fixable()


@dataclass
class FixAttempt:
    """Record of a single fix attempt"""

    error: ClassifiedError
    action: FixAction
    result: FixResult

    # Details
    message: str
    duration_seconds: float = 0.0

    # Re-execution info (if applicable)
    rerun_successful: Optional[bool] = None
    new_metrics: Optional[Dict[str, Any]] = None

    # Timestamp
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())


@dataclass
class FixReport:
    """Complete report of auto-fix session"""

    # Summary
    total_errors_analyzed: int
    fixable_errors: int
    unfixable_errors: int

    # Results
    successful_fixes: int
    failed_fixes: int
    skipped_fixes: int

    # Errors by category
    errors_by_category: Dict[str, int] = field(default_factory=dict)

    # Detailed results
    classified_errors: List[ClassifiedError] = field(default_factory=list)
    fix_attempts: List[FixAttempt] = field(default_factory=list)

    # Code issues requiring review
    code_issues_for_review: List[ClassifiedError] = field(default_factory=list)

    # Metadata
    session_start: str = field(default_factory=lambda: datetime.now().isoformat())
    session_end: Optional[str] = None
    duration_seconds: float = 0.0

    def add_classified_error(self, error: ClassifiedError):
        """Add a classified error to the report"""
        self.classified_errors.append(error)

        # Update counts
        if error.is_fixable:
            self.fixable_errors += 1
        else:
            self.unfixable_errors += 1
            if error.category.is_code_related():
                self.code_issues_for_review.append(error)

        # Update category counts
        category_name = error.category.value
        self.errors_by_category[category_name] = \
            self.errors_by_category.get(category_name, 0) + 1

    def add_fix_attempt(self, attempt: FixAttempt):
        """Add a fix attempt to the report"""
        self.fix_attempts.append(attempt)

        # Update counts
        if attempt.result == FixResult.SUCCESS:
            self.successful_fixes += 1
        elif attempt.result == FixResult.FAILED:
            self.failed_fixes += 1
        elif attempt.result == FixResult.SKIPPED:
            self.skipped_fixes += 1

    def finalize(self):
        """Finalize the report with end time and duration"""
        self.session_end = datetime.now().isoformat()
        if self.session_start:
            start = datetime.fromisoformat(self.session_start)
            end = datetime.fromisoformat(self.session_end)
            self.duration_seconds = (end - start).total_seconds()


@dataclass
class ExecutionRequest:
    """Request to re-execute specific entries"""

    cluster_name: str
    entry_ids: List[str]

    # Execution parameters
    test_type: str = "base"  # or "llm"
    num_executions: int = 1
    verbose: bool = True

    # Fix context
    reason: str = ""
    fix_attempts: List[FixAttempt] = field(default_factory=list)
