"""
Auto-Fixer Module

Automatically diagnoses and fixes execution errors detected by the Unified Analyzer.
Focuses on resolving environment/infrastructure issues while identifying code-level problems.

This module:
- Classifies errors into fixable (environment) vs unfixable (code)
- Automatically fixes Docker, metrics collection, and configuration issues
- Selectively re-executes only problematic entries
- Generates detailed reports with paths to problematic code files

Usage:
    # Complete workflow
    from auto_fixer.main import AutoFixer
    fixer = AutoFixer()
    report = fixer.run_complete_workflow(apply_fixes=True, reexecute=True)

    # CLI
    python auto_fixer/main.py --apply-fixes --reexecute --export json markdown csv
"""

__version__ = "1.0.0"
__author__ = "Thesis Project"

from .core.error_classifier import ErrorClassifier
from .core.execution_selector import ExecutionSelector
from .fixers.environment_fixer import EnvironmentFixer
from .reporters.fix_reporter import FixReporter
from .main import AutoFixer

# Core models
from .core.models import (
    ErrorCategory,
    FixAction,
    FixResult,
    ClassifiedError,
    FixAttempt,
    FixReport,
    ExecutionRequest
)

__all__ = [
    # Main orchestrator
    "AutoFixer",

    # Core components
    "ErrorClassifier",
    "ExecutionSelector",
    "EnvironmentFixer",
    "FixReporter",

    # Models
    "ErrorCategory",
    "FixAction",
    "FixResult",
    "ClassifiedError",
    "FixAttempt",
    "FixReport",
    "ExecutionRequest",
]
