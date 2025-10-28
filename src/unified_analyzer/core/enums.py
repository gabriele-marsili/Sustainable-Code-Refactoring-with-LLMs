"""Enumerations for unified analyzer"""

from enum import Enum


class AnomalyType(Enum):
    """Types of anomalies that can be detected"""

    OUTLIER = "outlier"
    INVALID_VALUE = "invalid_value"
    MISSING_METRICS = "missing_metrics"
    EXECUTION_FAILED = "execution_failed"

    def __str__(self):
        return self.value

    def display_name(self):
        """Human-readable name"""
        names = {
            self.OUTLIER: "Outlier",
            self.INVALID_VALUE: "Invalid Value",
            self.MISSING_METRICS: "Missing Metrics",
            self.EXECUTION_FAILED: "Execution Failed"
        }
        return names.get(self, self.value)


class RootCause(Enum):
    """Root causes for anomalies"""

    TEST_SUITE_ERROR = "test_suite_error"
    CODE_BUG = "code_bug"
    COMPILATION_ERROR = "compilation_error"
    RUNTIME_CRASH = "runtime_crash"
    TIMEOUT = "timeout"
    MEMORY_ERROR = "memory_error"
    ASSERTION_FAILURE = "assertion_failure"
    DOCKER_ERROR = "docker_error"
    METRICS_COLLECTION_FAILURE = "metrics_collection_failure"
    CONFIGURATION_ERROR = "configuration_error"
    UNKNOWN = "unknown"

    def __str__(self):
        return self.value

    def display_name(self):
        """Human-readable name"""
        names = {
            self.TEST_SUITE_ERROR: "Test Suite Error",
            self.CODE_BUG: "Code Bug",
            self.COMPILATION_ERROR: "Compilation Error",
            self.RUNTIME_CRASH: "Runtime Crash",
            self.TIMEOUT: "Timeout",
            self.MEMORY_ERROR: "Memory Error",
            self.ASSERTION_FAILURE: "Assertion Failure",
            self.DOCKER_ERROR: "Docker Error",
            self.METRICS_COLLECTION_FAILURE: "Metrics Collection Failure",
            self.CONFIGURATION_ERROR: "Configuration Error",
            self.UNKNOWN: "Unknown"
        }
        return names.get(self, self.value)


class Severity(Enum):
    """Severity levels for anomalies"""

    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

    def __str__(self):
        return self.value

    def __lt__(self, other):
        """Allow comparison for sorting"""
        if not isinstance(other, Severity):
            return NotImplemented
        order = [self.CRITICAL, self.HIGH, self.MEDIUM, self.LOW]
        return order.index(self) < order.index(other)

    def display_name(self):
        """Human-readable name"""
        return self.value.capitalize()

    def color(self):
        """Color for rich display"""
        colors = {
            self.CRITICAL: "red",
            self.HIGH: "orange1",
            self.MEDIUM: "yellow",
            self.LOW: "blue"
        }
        return colors.get(self, "white")


class AnalysisMode(Enum):
    """Analysis modes that can be enabled"""

    OUTLIERS = "outliers"
    INVALID_VALUES = "invalid_values"
    MISSING_METRICS = "missing_metrics"
    ROOT_CAUSE = "root_cause"
    ALL = "all"

    def __str__(self):
        return self.value
