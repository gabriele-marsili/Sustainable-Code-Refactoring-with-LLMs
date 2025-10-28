"""Log file analysis for error detection and diagnostics"""

import re
import logging
from pathlib import Path
from typing import List, Dict, Optional, Pattern
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.models import LogAnalysis

logger = logging.getLogger(__name__)


class LogAnalyzer:
    """Analyzes log files to extract error information"""

    def __init__(self):
        """Initialize log analyzer with error patterns"""
        self.error_patterns = self._load_error_patterns()

    def _load_error_patterns(self) -> Dict[str, List[Pattern]]:
        """Load regex patterns for common errors"""
        return {
            # Compilation errors
            'compilation_cpp': [
                re.compile(r'error:\s+(.+)', re.IGNORECASE),
                re.compile(r'fatal error:\s+(.+)', re.IGNORECASE),
                re.compile(r'undefined reference to\s+[`\'"]([^`\'"]+)[`\'"]'),
                re.compile(r'cannot find -l(\w+)'),
                re.compile(r'ld returned \d+ exit status'),
            ],
            'compilation_java': [
                re.compile(r'error:\s+(.+)'),
                re.compile(r'cannot find symbol'),
                re.compile(r'class, interface, or enum expected'),
            ],
            'compilation_python': [
                re.compile(r'SyntaxError:\s+(.+)'),
                re.compile(r'IndentationError:\s+(.+)'),
            ],

            # Runtime errors
            'runtime_cpp': [
                re.compile(r'Segmentation fault'),
                re.compile(r'core dumped'),
                re.compile(r'Aborted'),
                re.compile(r'terminate called'),
                re.compile(r'pure virtual method called'),
                re.compile(r'std::bad_alloc'),
                re.compile(r'std::out_of_range'),
            ],
            'runtime_java': [
                re.compile(r'Exception in thread'),
                re.compile(r'java\.lang\.\w+Exception'),
                re.compile(r'NullPointerException'),
                re.compile(r'ArrayIndexOutOfBoundsException'),
            ],
            'runtime_python': [
                re.compile(r'Traceback \(most recent call last\)'),
                re.compile(r'\w+Error:\s+(.+)'),
                re.compile(r'\w+Exception:\s+(.+)'),
            ],

            # Test failures
            'test_gtest': [
                re.compile(r'\[\s*FAILED\s*\]'),
                re.compile(r'Expected:\s+(.+)'),
                re.compile(r'Actual:\s+(.+)'),
                re.compile(r'Expected equality of these values'),
            ],
            'test_junit': [
                re.compile(r'FAILURES!!!'),
                re.compile(r'Tests run:.*Failures:.*Errors:'),
            ],
            'test_pytest': [
                re.compile(r'FAILED\s+(.+)'),
                re.compile(r'AssertionError'),
                re.compile(r'E\s+assert\s+(.+)'),
            ],

            # Memory errors
            'memory': [
                re.compile(r'out of memory', re.IGNORECASE),
                re.compile(r'malloc.*failed', re.IGNORECASE),
                re.compile(r'allocation failed', re.IGNORECASE),
                re.compile(r'cannot allocate', re.IGNORECASE),
            ],

            # Timeout
            'timeout': [
                re.compile(r'timeout', re.IGNORECASE),
                re.compile(r'timed out', re.IGNORECASE),
                re.compile(r'time limit exceeded', re.IGNORECASE),
            ],

            # CMake/Build system errors
            'cmake': [
                re.compile(r'CMake Error'),
                re.compile(r'Could NOT find'),
                re.compile(r'target.*does not exist'),
            ],
        }

    def analyze_log(self, log_path: Path, log_content: Optional[str] = None) -> LogAnalysis:
        """
        Analyze log file completely

        Args:
            log_path: Path to log file
            log_content: Optional pre-loaded content

        Returns:
            LogAnalysis object
        """
        analysis = LogAnalysis(log_path=log_path)

        if log_content is None:
            if not log_path.exists():
                logger.warning(f"Log file not found: {log_path}")
                return analysis

            try:
                with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
                    log_content = f.read()
            except Exception as e:
                logger.error(f"Error reading log file {log_path}: {e}")
                return analysis

        # Run all analyses
        analysis.compilation_errors = self.extract_compilation_errors(log_content)
        analysis.has_compilation_errors = len(analysis.compilation_errors) > 0

        analysis.runtime_errors = self.extract_runtime_errors(log_content)
        analysis.has_runtime_errors = len(analysis.runtime_errors) > 0

        analysis.test_failures = self.extract_test_failures(log_content)
        analysis.has_test_failures = len(analysis.test_failures) > 0

        analysis.has_timeout = self.detect_timeout(log_content)
        analysis.has_memory_issues = self.detect_memory_issues(log_content)

        analysis.stack_traces = self.extract_stack_traces(log_content)
        analysis.error_file_paths = self.extract_error_file_paths(log_content)

        return analysis

    def extract_compilation_errors(self, log_content: str) -> List[str]:
        """Extract compilation error messages"""
        errors = []

        # Try all compilation patterns
        for pattern_list in [
            self.error_patterns['compilation_cpp'],
            self.error_patterns['compilation_java'],
            self.error_patterns['compilation_python'],
            self.error_patterns['cmake']
        ]:
            for pattern in pattern_list:
                matches = pattern.finditer(log_content)
                for match in matches:
                    # Extract the full line containing the error
                    start = log_content.rfind('\n', 0, match.start()) + 1
                    end = log_content.find('\n', match.end())
                    if end == -1:
                        end = len(log_content)

                    error_line = log_content[start:end].strip()
                    if error_line and error_line not in errors:
                        errors.append(error_line)

        return errors[:50]  # Limit to first 50 errors

    def extract_runtime_errors(self, log_content: str) -> List[str]:
        """Extract runtime error messages"""
        errors = []

        for pattern_list in [
            self.error_patterns['runtime_cpp'],
            self.error_patterns['runtime_java'],
            self.error_patterns['runtime_python']
        ]:
            for pattern in pattern_list:
                matches = pattern.finditer(log_content)
                for match in matches:
                    # Extract context around the error
                    start = max(0, log_content.rfind('\n', 0, match.start()) + 1)
                    end = log_content.find('\n', match.end())
                    if end == -1:
                        end = len(log_content)

                    error_line = log_content[start:end].strip()
                    if error_line and error_line not in errors:
                        errors.append(error_line)

        return errors[:50]

    def extract_test_failures(self, log_content: str) -> List[str]:
        """Extract test failure messages"""
        failures = []

        for pattern_list in [
            self.error_patterns['test_gtest'],
            self.error_patterns['test_junit'],
            self.error_patterns['test_pytest']
        ]:
            for pattern in pattern_list:
                matches = pattern.finditer(log_content)
                for match in matches:
                    # Get a few lines of context
                    start = max(0, log_content.rfind('\n', 0, match.start()) + 1)
                    # Get next 3 lines
                    end = match.end()
                    for _ in range(3):
                        next_nl = log_content.find('\n', end + 1)
                        if next_nl == -1:
                            break
                        end = next_nl

                    failure_context = log_content[start:end].strip()
                    if failure_context and failure_context not in failures:
                        failures.append(failure_context)

        return failures[:20]

    def extract_stack_traces(self, log_content: str) -> List[str]:
        """Extract stack traces from log"""
        traces = []

        # Pattern for stack traces (multiple formats)
        trace_patterns = [
            re.compile(r'(?:at |#\d+\s+).*?(?:\n|$)', re.MULTILINE),
            re.compile(r'File ".*?", line \d+', re.MULTILINE),
        ]

        for pattern in trace_patterns:
            matches = pattern.findall(log_content)
            traces.extend(matches)

        return traces[:100]  # Limit traces

    def detect_timeout(self, log_content: str) -> bool:
        """Detect if execution timed out"""
        for pattern in self.error_patterns['timeout']:
            if pattern.search(log_content):
                return True
        return False

    def detect_memory_issues(self, log_content: str) -> bool:
        """Detect memory-related issues"""
        for pattern in self.error_patterns['memory']:
            if pattern.search(log_content):
                return True
        return False

    def extract_error_file_paths(self, log_content: str) -> List[str]:
        """Extract file paths mentioned in errors"""
        file_paths = []

        # Pattern for file paths in error messages
        # Common formats:
        # /path/to/file.cpp:10:5: error
        # file.java:10: error
        path_pattern = re.compile(r'([/\w\-\.]+\.[a-z]+):\d+(?::\d+)?:', re.MULTILINE)

        matches = path_pattern.findall(log_content)
        for match in matches:
            if match not in file_paths:
                file_paths.append(match)

        return file_paths

    def is_test_setup_failure(self, log_content: str) -> bool:
        """Check if error is in test setup/fixture"""
        setup_patterns = [
            r'SetUp\(\)',
            r'TearDown\(\)',
            r'TestFixture::',
            r'SetUpTestCase',
            r'@Before',
            r'@BeforeClass',
            r'setUp\(',
        ]

        for pattern in setup_patterns:
            if re.search(pattern, log_content):
                return True

        return False

    def get_error_summary(self, analysis: LogAnalysis) -> str:
        """Get a short summary of the errors found"""
        summary_parts = []

        if analysis.has_compilation_errors:
            summary_parts.append(f"{len(analysis.compilation_errors)} compilation error(s)")

        if analysis.has_runtime_errors:
            summary_parts.append(f"{len(analysis.runtime_errors)} runtime error(s)")

        if analysis.has_test_failures:
            summary_parts.append(f"{len(analysis.test_failures)} test failure(s)")

        if analysis.has_timeout:
            summary_parts.append("timeout")

        if analysis.has_memory_issues:
            summary_parts.append("memory issues")

        if not summary_parts:
            return "No errors detected"

        return ", ".join(summary_parts)
