"""
Unified Analyzer Module

A comprehensive module for analyzing execution results, detecting anomalies,
and performing root cause analysis on test execution outputs.

This module consolidates and improves the analysis logic from:
- src/execution_sanity_checks/analyze_execution.py
- src/execution_sanity_checks/sanity_checker.py
- src/run_tests_on_clusters/analyze_invalid_outputs.py
- src/run_tests_on_clusters/outlier_filter.py
"""

__version__ = "1.0.0"
__author__ = "Thesis Project"

from .core.config import AnalyzerConfig
from .core.models import ExecutionEntry, Anomaly, AnalysisReport
from .core.enums import AnomalyType, RootCause, Severity

__all__ = [
    "AnalyzerConfig",
    "ExecutionEntry",
    "Anomaly",
    "AnalysisReport",
    "AnomalyType",
    "RootCause",
    "Severity",
]
