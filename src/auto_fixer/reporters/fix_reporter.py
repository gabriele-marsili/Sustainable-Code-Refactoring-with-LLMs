"""Fix reporter - generates detailed reports with code file paths"""

import logging
import sys
import os
import json
from typing import List, Dict, Optional
from datetime import datetime
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.models import (
    ClassifiedError, FixAttempt, FixReport, ErrorCategory, FixResult
)

logger = logging.getLogger(__name__)


class FixReporter:
    """
    Generates comprehensive reports of auto-fix sessions.

    KEY RESPONSIBILITIES:
    1. Create detailed reports with code file paths
    2. Separate fixable from unfixable errors
    3. Highlight code issues for potential removal
    4. Export reports in multiple formats (JSON, CSV, Markdown, Text)
    5. Provide actionable recommendations
    """

    def __init__(self, output_dir: Optional[str] = None):
        """
        Initialize fix reporter.

        Args:
            output_dir: Directory for report output (default: src/auto_fixer/reports)
        """
        if output_dir is None:
            from utility_dir.utility_paths import SRC_DIR
            output_dir = SRC_DIR / "auto_fixer" / "reports" #os.path.join(ROOT_DIR, "src", "auto_fixer", "reports")

        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    def create_report(
        self,
        classified_errors: List[ClassifiedError],
        fix_attempts: List[FixAttempt]
    ) -> FixReport:
        """
        Create a comprehensive fix report.

        Args:
            classified_errors: List of ClassifiedError objects
            fix_attempts: List of FixAttempt objects

        Returns:
            FixReport object
        """
        # Initialize report
        report = FixReport(
            total_errors_analyzed=len(classified_errors),
            fixable_errors=0,
            unfixable_errors=0,
            successful_fixes=0,
            failed_fixes=0,
            skipped_fixes=0
        )

        # Add all classified errors
        for error in classified_errors:
            report.add_classified_error(error)

        # Add all fix attempts
        for attempt in fix_attempts:
            report.add_fix_attempt(attempt)

        # Finalize report
        report.finalize()

        logger.info(f"Created fix report with {len(classified_errors)} errors")

        return report

    def export_json(self, report: FixReport, filename: Optional[str] = None) -> str:
        """
        Export report to JSON format.

        Args:
            report: FixReport to export
            filename: Optional custom filename

        Returns:
            Path to exported file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"fix_report_{timestamp}.json"

        filepath = os.path.join(self.output_dir, filename)

        # Convert report to dict
        report_dict = self._report_to_dict(report)

        # Write JSON
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(report_dict, f, indent=2, ensure_ascii=False)

        logger.info(f"Exported JSON report to: {filepath}")
        return filepath

    def export_markdown(
        self,
        report: FixReport,
        filename: Optional[str] = None
    ) -> str:
        """
        Export report to Markdown format.

        Args:
            report: FixReport to export
            filename: Optional custom filename

        Returns:
            Path to exported file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"fix_report_{timestamp}.md"

        filepath = os.path.join(self.output_dir, filename)

        # Generate markdown content
        md_content = self._generate_markdown(report)

        # Write file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(md_content)

        logger.info(f"Exported Markdown report to: {filepath}")
        return filepath

    def export_csv(self, report: FixReport, filename: Optional[str] = None) -> str:
        """
        Export code issues to CSV format for easy review.

        Args:
            report: FixReport to export
            filename: Optional custom filename

        Returns:
            Path to exported file
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"code_issues_{timestamp}.csv"

        filepath = os.path.join(self.output_dir, filename)

        # Write CSV
        with open(filepath, 'w', encoding='utf-8') as f:
            # Header - enhanced with more file information
            f.write("cluster_name,entry_id,language,category,root_cause,severity,")
            f.write("code_file_path,test_file_path,log_file_path,")
            f.write("is_code_issue,is_test_issue,is_environment_issue,")
            f.write("error_message,detected_issues,recommendation\n")

            # Rows - only code issues for review
            for error in report.code_issues_for_review:
                f.write(f'"{error.cluster_name}",')
                f.write(f'"{error.entry_id}",')
                f.write(f'"{error.language}",')
                f.write(f'"{error.category.value}",')
                f.write(f'"{error.root_cause}",')
                f.write(f'"{error.severity}",')
                f.write(f'"{error.code_file_path or "N/A"}",')
                f.write(f'"{error.test_file_path or "N/A"}",')
                f.write(f'"{error.log_file_path or "N/A"}",')

                # Categorization flags for easy filtering
                is_code_issue = error.category in [
                    ErrorCategory.CODE_BUG,
                    ErrorCategory.COMPILATION_ERROR,
                    ErrorCategory.RUNTIME_CRASH
                ]
                is_test_issue = error.category == ErrorCategory.TEST_SUITE_ERROR
                is_env_issue = error.is_fixable

                f.write(f'"{is_code_issue}",')
                f.write(f'"{is_test_issue}",')
                f.write(f'"{is_env_issue}",')

                # Escape error message
                msg = (error.error_message or "").replace('"', '""')[:200]  # Limit length
                f.write(f'"{msg}",')

                # Detected issues
                issues = "; ".join(error.detected_issues[:3]) if error.detected_issues else "N/A"
                issues = issues.replace('"', '""')
                f.write(f'"{issues}",')

                # Recommendation
                if error.category == ErrorCategory.CODE_BUG:
                    rec = "REMOVE: Code has fundamental bug - consider excluding from dataset"
                elif error.category == ErrorCategory.TEST_SUITE_ERROR:
                    rec = "FIX: Test configuration needs correction"
                elif error.category == ErrorCategory.COMPILATION_ERROR:
                    rec = "FIX: Syntax/type errors in code"
                elif error.category == ErrorCategory.RUNTIME_CRASH:
                    rec = "REVIEW: Runtime crash in implementation"
                elif error.category == ErrorCategory.ASSERTION_FAILURE:
                    rec = "REVIEW: Test assertions failing"
                else:
                    rec = "MANUAL: Requires investigation"

                f.write(f'"{rec}"\n')

        logger.info(f"Exported CSV report to: {filepath}")
        return filepath

    def print_summary(self, report: FixReport):
        """
        Print human-readable summary to console.

        Args:
            report: FixReport to summarize
        """
        print("\n" + "=" * 80)
        print("AUTO-FIXER REPORT - SUMMARY")
        print("=" * 80)

        # Overall statistics
        print(f"\nSession Duration: {report.duration_seconds:.1f} seconds")
        print(f"Total Errors Analyzed: {report.total_errors_analyzed}")
        print(f"  - Fixable (Environment): {report.fixable_errors}")
        print(f"  - Unfixable (Code):      {report.unfixable_errors}")

        # Fix results
        print(f"\nFix Attempts:")
        print(f"  - Successful: {report.successful_fixes}")
        print(f"  - Failed:     {report.failed_fixes}")
        print(f"  - Skipped:    {report.skipped_fixes}")

        # Errors by category
        print(f"\nErrors by Category:")
        for category, count in sorted(
            report.errors_by_category.items(),
            key=lambda x: x[1],
            reverse=True
        ):
            print(f"  - {category:30s}: {count:3d}")

        # Code issues requiring review
        print(f"\n{'=' * 80}")
        print(f"CODE ISSUES REQUIRING MANUAL REVIEW: {len(report.code_issues_for_review)}")
        print(f"{'=' * 80}")

        if report.code_issues_for_review:
            # Group by cluster
            issues_by_cluster = defaultdict(list)
            for error in report.code_issues_for_review:
                issues_by_cluster[error.cluster_name].append(error)

            for cluster_name, errors in sorted(issues_by_cluster.items()):
                print(f"\nCluster: {cluster_name} ({len(errors)} issues)")
                for error in errors:
                    print(f"  - Entry: {error.entry_id}")
                    print(f"    Category: {error.category.value}")
                    print(f"    Root Cause: {error.root_cause}")
                    print(f"    Severity: {error.severity}")

                    # File paths with clear labels
                    print(f"    Files:")
                    if error.code_file_path:
                        print(f"      • Implementation: {error.code_file_path}")
                    else:
                        print(f"      • Implementation: [Not identified]")

                    if error.test_file_path:
                        print(f"      • Test Suite: {error.test_file_path}")
                    else:
                        print(f"      • Test Suite: [Not identified]")

                    if error.log_file_path:
                        print(f"      • Log: {error.log_file_path}")

                    if error.detected_issues:
                        print(f"    Detected Issues:")
                        for issue in error.detected_issues[:3]:  # Show first 3
                            print(f"      • {issue}")

                    if error.error_message:
                        msg = error.error_message[:150]
                        if len(error.error_message) > 150:
                            msg += "..."
                        print(f"    Error: {msg}")

                    # Recommendation with icon
                    if error.category == ErrorCategory.CODE_BUG:
                        print(f"    → ⚠️  CONSIDER REMOVING if code cannot be fixed")
                        print(f"       (Issue in implementation code)")
                    elif error.category == ErrorCategory.TEST_SUITE_ERROR:
                        print(f"    → 🔧 FIX TEST SUITE configuration")
                        print(f"       (Issue in test file)")
                    elif error.category == ErrorCategory.COMPILATION_ERROR:
                        print(f"    → 🔨 FIX COMPILATION errors")
                    elif error.category == ErrorCategory.RUNTIME_CRASH:
                        print(f"    → 💥 FIX RUNTIME crash")
                    elif error.category == ErrorCategory.ASSERTION_FAILURE:
                        print(f"    → ❌ FIX ASSERTION failures")
                    else:
                        print(f"    → 🔍 MANUAL REVIEW REQUIRED")

                    print()

        print("=" * 80 + "\n")

    def _report_to_dict(self, report: FixReport) -> dict:
        """Convert FixReport to dictionary for JSON export"""
        return {
            'summary': {
                'session_start': report.session_start,
                'session_end': report.session_end,
                'duration_seconds': report.duration_seconds,
                'total_errors_analyzed': report.total_errors_analyzed,
                'fixable_errors': report.fixable_errors,
                'unfixable_errors': report.unfixable_errors,
                'successful_fixes': report.successful_fixes,
                'failed_fixes': report.failed_fixes,
                'skipped_fixes': report.skipped_fixes,
            },
            'errors_by_category': report.errors_by_category,
            'classified_errors': [
                self._error_to_dict(error)
                for error in report.classified_errors
            ],
            'fix_attempts': [
                self._attempt_to_dict(attempt)
                for attempt in report.fix_attempts
            ],
            'code_issues_for_review': [
                self._error_to_dict(error)
                for error in report.code_issues_for_review
            ]
        }

    def _error_to_dict(self, error: ClassifiedError) -> dict:
        """Convert ClassifiedError to dictionary"""
        return {
            'anomaly_id': error.anomaly_id,
            'cluster_name': error.cluster_name,
            'entry_id': error.entry_id,
            'language': error.language,
            'category': error.category.value,
            'root_cause': error.root_cause,
            'severity': error.severity,
            'is_fixable': error.is_fixable,
            'code_file_path': error.code_file_path,
            'test_file_path': error.test_file_path,
            'log_file_path': error.log_file_path,
            'error_file_paths': error.error_file_paths,
            'error_message': error.error_message,
            'detected_issues': error.detected_issues,
            'recommended_actions': [
                action.value for action in error.recommended_actions
            ],
            'timestamp': error.timestamp
        }

    def _attempt_to_dict(self, attempt: FixAttempt) -> dict:
        """Convert FixAttempt to dictionary"""
        return {
            'anomaly_id': attempt.error.anomaly_id,
            'action': attempt.action.value,
            'result': attempt.result.value,
            'message': attempt.message,
            'duration_seconds': attempt.duration_seconds,
            'rerun_successful': attempt.rerun_successful,
            'new_metrics': attempt.new_metrics,
            'timestamp': attempt.timestamp
        }

    def _generate_markdown(self, report: FixReport) -> str:
        """Generate Markdown content for report"""
        md = []

        # Title
        md.append("# Auto-Fixer Report\n")
        md.append(f"**Generated:** {report.session_end}\n")
        md.append(f"**Duration:** {report.duration_seconds:.1f} seconds\n")

        # Summary
        md.append("\n## Summary\n")
        md.append(f"- **Total Errors Analyzed:** {report.total_errors_analyzed}\n")
        md.append(f"- **Fixable (Environment):** {report.fixable_errors}\n")
        md.append(f"- **Unfixable (Code):** {report.unfixable_errors}\n")
        md.append(f"- **Successful Fixes:** {report.successful_fixes}\n")
        md.append(f"- **Failed Fixes:** {report.failed_fixes}\n")
        md.append(f"- **Skipped Fixes:** {report.skipped_fixes}\n")

        # Errors by category
        md.append("\n## Errors by Category\n")
        md.append("| Category | Count |\n")
        md.append("|----------|-------|\n")
        for category, count in sorted(
            report.errors_by_category.items(),
            key=lambda x: x[1],
            reverse=True
        ):
            md.append(f"| {category} | {count} |\n")

        # Code issues for review
        md.append(f"\n## Code Issues Requiring Manual Review\n")
        md.append(f"\n**Total:** {len(report.code_issues_for_review)} issues\n")

        if report.code_issues_for_review:
            # Group by cluster
            issues_by_cluster = defaultdict(list)
            for error in report.code_issues_for_review:
                issues_by_cluster[error.cluster_name].append(error)

            for cluster_name, errors in sorted(issues_by_cluster.items()):
                md.append(f"\n### Cluster: `{cluster_name}` ({len(errors)} issues)\n")

                for error in errors:
                    md.append(f"\n#### Entry: `{error.entry_id}`\n")
                    md.append(f"- **Category:** {error.category.value}\n")
                    md.append(f"- **Severity:** {error.severity}\n")
                    md.append(f"- **Language:** {error.language}\n")
                    md.append(f"- **Root Cause:** {error.root_cause}\n")

                    # File paths section with clear distinction
                    md.append("\n**File Paths:**\n")
                    if error.code_file_path:
                        md.append(f"- **Implementation Code:** `{error.code_file_path}`\n")
                    else:
                        md.append(f"- **Implementation Code:** _Not identified_\n")

                    if error.test_file_path:
                        md.append(f"- **Test Suite:** `{error.test_file_path}`\n")
                    else:
                        md.append(f"- **Test Suite:** _Not identified_\n")

                    if error.log_file_path:
                        md.append(f"- **Execution Log:** `{error.log_file_path}`\n")

                    if error.error_file_paths:
                        md.append(f"- **Additional Files:** {', '.join(f'`{p}`' for p in error.error_file_paths)}\n")

                    if error.detected_issues:
                        md.append(f"\n**Detected Issues:**\n")
                        for issue in error.detected_issues:
                            md.append(f"- {issue}\n")

                    if error.error_message:
                        md.append(f"\n**Error Message:**\n```\n{error.error_message}\n```\n")

                    # Recommendation with more detail
                    md.append("\n**Recommendation:**\n")
                    if error.category == ErrorCategory.CODE_BUG:
                        md.append("- ⚠️  **CONSIDER REMOVING** this entry if code cannot be fixed\n")
                        md.append(f"  - Issue is in implementation code: `{error.code_file_path or 'unknown'}`\n")
                        md.append("  - Suggests fundamental algorithmic or logic error\n")
                    elif error.category == ErrorCategory.TEST_SUITE_ERROR:
                        md.append("- 🔧 **FIX TEST SUITE** configuration\n")
                        md.append(f"  - Issue is in test file: `{error.test_file_path or 'unknown'}`\n")
                        md.append("  - Test configuration or setup needs correction\n")
                    elif error.category == ErrorCategory.COMPILATION_ERROR:
                        md.append("- 🔨 **FIX COMPILATION** errors\n")
                        md.append("  - Code has syntax or type errors preventing compilation\n")
                    elif error.category == ErrorCategory.RUNTIME_CRASH:
                        md.append("- 💥 **FIX RUNTIME** crash\n")
                        md.append("  - Code crashes during execution (likely in implementation)\n")
                    elif error.category == ErrorCategory.ASSERTION_FAILURE:
                        md.append("- ❌ **FIX ASSERTION** failures\n")
                        md.append("  - Test assertions failing (check both code and test expectations)\n")
                    else:
                        md.append("- 🔍 **MANUAL REVIEW REQUIRED**\n")

        return ''.join(md)


class ReportFormatter:
    """Helper class for formatting report data"""

    @staticmethod
    def format_duration(seconds: float) -> str:
        """Format duration in human-readable format"""
        if seconds < 60:
            return f"{seconds:.1f}s"
        elif seconds < 3600:
            minutes = int(seconds // 60)
            secs = int(seconds % 60)
            return f"{minutes}m {secs}s"
        else:
            hours = int(seconds // 3600)
            minutes = int((seconds % 3600) // 60)
            return f"{hours}h {minutes}m"

    @staticmethod
    def format_percentage(numerator: int, denominator: int) -> str:
        """Format percentage with 1 decimal place"""
        if denominator == 0:
            return "N/A"
        pct = (numerator / denominator) * 100
        return f"{pct:.1f}%"
