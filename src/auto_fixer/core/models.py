"""Data models for auto-fixer module"""

from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime


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
    root_cause: str  # From RootCause enum in unified_analyzer
    severity: str    # From Severity enum in unified_analyzer

    # File paths
    code_file_path: Optional[str] = None
    test_file_path: Optional[str] = None
    log_file_path: Optional[str] = None
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
