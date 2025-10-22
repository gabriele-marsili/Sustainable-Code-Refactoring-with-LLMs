"""
Language-Selective Test Re-execution System

This module provides functionality to selectively re-execute tests for specific
programming languages while preserving results for other languages.

Key Features:
- Language-specific test execution
- Result merging with validation
- Comprehensive error reporting
- Progress tracking


Date: 2025-10-15
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Set, Optional, Any, Tuple
from dataclasses import dataclass, field
from collections import defaultdict
import time


@dataclass
class LanguageExecutionReport:
    """Report for language-specific execution"""

    language: str
    total_entries: int = 0
    executed_entries: int = 0
    successful_entries: int = 0
    failed_entries: int = 0
    skipped_entries: int = 0

    # Error tracking
    errors: List[Dict[str, Any]] = field(default_factory=list)

    # Validation stats
    valid_new_results: int = 0
    invalid_new_results: int = 0
    preserved_old_results: int = 0

    def add_error(self, entry_id: str, error_type: str, error_message: str):
        """Add an error to the report"""
        self.errors.append({
            "entry_id": entry_id,
            "error_type": error_type,
            "error_message": error_message,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        })

    def to_dict(self) -> Dict[str, Any]:
        """Convert report to dictionary"""
        return {
            "language": self.language,
            "statistics": {
                "total_entries": self.total_entries,
                "executed_entries": self.executed_entries,
                "successful_entries": self.successful_entries,
                "failed_entries": self.failed_entries,
                "skipped_entries": self.skipped_entries
            },
            "validation": {
                "valid_new_results": self.valid_new_results,
                "invalid_new_results": self.invalid_new_results,
                "preserved_old_results": self.preserved_old_results
            },
            "errors": self.errors
        }


@dataclass
class SelectiveExecutionReport:
    """Comprehensive report for selective execution"""

    cluster_name: str
    execution_timestamp: str
    selected_languages: List[str]

    # Per-language reports
    language_reports: Dict[str, LanguageExecutionReport] = field(default_factory=dict)

    # Overall statistics
    total_entries_processed: int = 0
    total_new_results: int = 0
    total_preserved_results: int = 0

    # File operations
    input_file: Optional[str] = None
    output_file: Optional[str] = None
    backup_file: Optional[str] = None

    def add_language_report(self, report: LanguageExecutionReport):
        """Add a language-specific report"""
        self.language_reports[report.language] = report
        self.total_entries_processed += report.total_entries
        self.total_new_results += report.executed_entries

    def to_dict(self) -> Dict[str, Any]:
        """Convert report to dictionary"""
        return {
            "cluster": self.cluster_name,
            "execution_timestamp": self.execution_timestamp,
            "selected_languages": self.selected_languages,
            "overall_statistics": {
                "total_entries_processed": self.total_entries_processed,
                "total_new_results": self.total_new_results,
                "total_preserved_results": self.total_preserved_results
            },
            "file_operations": {
                "input_file": self.input_file,
                "output_file": self.output_file,
                "backup_file": self.backup_file
            },
            "language_reports": {
                lang: report.to_dict()
                for lang, report in self.language_reports.items()
            }
        }

    def save_to_file(self, output_path: Path):
        """Save report to JSON file"""
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)

    def print_summary(self):
        """Print a human-readable summary"""
        print("\n" + "=" * 80)
        print(f"SELECTIVE EXECUTION REPORT: {self.cluster_name}")
        print("=" * 80)
        print(f"Execution Time: {self.execution_timestamp}")
        print(f"Selected Languages: {', '.join(self.selected_languages)}")
        print(f"\nOverall Statistics:")
        print(f"  Total Entries Processed: {self.total_entries_processed}")
        print(f"  New Results Generated: {self.total_new_results}")
        print(f"  Preserved Old Results: {self.total_preserved_results}")

        print(f"\nPer-Language Breakdown:")
        for lang, report in self.language_reports.items():
            print(f"\n  {lang.upper()}:")
            print(f"    Total Entries: {report.total_entries}")
            print(f"    Executed: {report.executed_entries}")
            print(f"    Successful: {report.successful_entries}")
            print(f"    Failed: {report.failed_entries}")
            print(f"    Valid New: {report.valid_new_results}")
            print(f"    Invalid New: {report.invalid_new_results}")

            if report.errors:
                print(f"    Errors: {len(report.errors)}")
                for error in report.errors[:3]:  # Show first 3 errors
                    print(f"      - {error['entry_id']}: {error['error_type']}")
                if len(report.errors) > 3:
                    print(f"      ... and {len(report.errors) - 3} more errors")

        print("\n" + "=" * 80)


class LanguageSelectiveResultMerger:
    """Merge new results with existing results for specific languages"""

    def __init__(self, logger: Optional[logging.Logger] = None):
        self.logger = logger or logging.getLogger(__name__)

    def load_existing_results(self, file_path: Path) -> Optional[Dict[str, Any]]:
        """Load existing results from file"""
        try:
            if not file_path.exists():
                self.logger.warning(f"No existing results file found: {file_path}")
                return None

            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            self.logger.info(f"Loaded existing results from {file_path}")
            return data

        except Exception as e:
            self.logger.error(f"Error loading existing results: {e}")
            return None

    def validate_new_result(self, result: Dict[str, Any], is_llm: bool = False) -> bool:
        """
        Validate if a new result has meaningful metrics

        Validation criteria:
        1. All metric fields present
        2. execution_time_ms != 0
        3. CPU_usage and RAM_usage not None
        """
        try:
            if is_llm:
                # For LLM results, check LLM_results array
                llm_results = result.get('LLM_results', [])
                if not llm_results:
                    return False

                # Check each LLM result
                for llm_result in llm_results:
                    if not self._validate_metrics(llm_result):
                        return False
                return True
            else:
                # For base results, check metrics directly
                return self._validate_metrics(result)

        except Exception as e:
            self.logger.warning(f"Validation error: {e}")
            return False

    def _validate_metrics(self, metrics: Dict[str, Any]) -> bool:
        """Validate individual metrics"""
        required_fields = ['execution_time_ms', 'CPU_usage', 'RAM_usage', 'regressionTestPassed']

        # Check all required fields present
        for field in required_fields:
            if field not in metrics:
                return False
            if metrics[field] is None:
                return False

        # Check execution_time_ms != 0
        if metrics['execution_time_ms'] == 0:
            return False

        return True

    def merge_results(
        self,
        existing_data: Dict[str, Any],
        new_results: List[Any],
        selected_languages: Set[str],
        is_llm: bool = False
    ) -> Tuple[Dict[str, Any], LanguageExecutionReport]:
        """
        Merge new results with existing data for selected languages

        Args:
            existing_data: Existing results data
            new_results: New results to merge
            selected_languages: Set of languages to update
            is_llm: Whether these are LLM results

        Returns:
            Tuple of (merged_data, report)
        """
        merged_data = existing_data.copy()
        existing_results = merged_data.get('results', {})

        # Create report
        report = LanguageExecutionReport(language="multi")

        # Track results by language
        new_results_by_lang = defaultdict(list)
        for result in new_results:
            lang = result.language if hasattr(result, 'language') else result.get('language')
            if lang in selected_languages:
                new_results_by_lang[lang].append(result)

        # Process each selected language
        for lang in selected_languages:
            lang_key = self._normalize_language_key(lang, existing_results)
            new_lang_results = new_results_by_lang.get(lang, [])

            if not new_lang_results:
                self.logger.info(f"No new results for language: {lang}")
                continue

            # Get existing results for this language
            existing_lang_results = existing_results.get(lang_key, [])

            # Create a map of existing results by ID
            existing_by_id = {
                entry['id']: entry
                for entry in existing_lang_results
            }

            # Merge new results
            updated_results = []
            for new_result in new_lang_results:
                new_result_dict = new_result.to_json() if hasattr(new_result, 'to_json') else new_result
                entry_id = new_result_dict.get('id')

                report.total_entries += 1
                report.executed_entries += 1

                # Validate new result
                if self.validate_new_result(new_result_dict, is_llm):
                    # Use new valid result
                    updated_results.append(new_result_dict)
                    report.successful_entries += 1
                    report.valid_new_results += 1
                    self.logger.debug(f"✓ Valid new result for {entry_id}")
                else:
                    # New result invalid, preserve old if available
                    if entry_id in existing_by_id:
                        updated_results.append(existing_by_id[entry_id])
                        report.preserved_old_results += 1
                        report.invalid_new_results += 1
                        self.logger.warning(f"⚠ Invalid new result for {entry_id}, preserved old")
                        report.add_error(
                            entry_id,
                            "invalid_metrics",
                            "New result has invalid metrics, preserved old result"
                        )
                    else:
                        # No old result, keep invalid new one with error note
                        updated_results.append(new_result_dict)
                        report.failed_entries += 1
                        report.invalid_new_results += 1
                        self.logger.error(f"✗ Invalid new result for {entry_id}, no old result available")
                        report.add_error(
                            entry_id,
                            "invalid_metrics_no_fallback",
                            "New result invalid and no previous result available"
                        )

            # Update merged data
            merged_data['results'][lang_key] = updated_results
            self.logger.info(f"Updated {len(updated_results)} results for language: {lang}")

        # Update metadata
        merged_data['execution_date'] = time.strftime("%Y-%m-%d %H:%M:%S")
        if 'execution_metadata' in merged_data:
            merged_data['execution_metadata']['last_updated'] = time.strftime("%Y-%m-%d %H:%M:%S")
            merged_data['execution_metadata']['selective_execution'] = {
                'languages': list(selected_languages),
                'timestamp': time.strftime("%Y-%m-%d %H:%M:%S")
            }

        return merged_data, report

    def _normalize_language_key(self, lang: str, existing_results: Dict) -> str:
        """Normalize language key to match existing data structure"""
        # Try exact match first
        if lang in existing_results:
            return lang

        # Try case-insensitive match
        for key in existing_results.keys():
            if key.lower() == lang.lower():
                return key

        # Return original if no match
        return lang

    def create_backup(self, file_path: Path) -> Optional[Path]:
        """Create a backup of the existing file"""
        try:
            if not file_path.exists():
                return None

            backup_path = file_path.parent / f"{file_path.stem}_backup_{int(time.time())}{file_path.suffix}"
            import shutil
            shutil.copy2(file_path, backup_path)

            self.logger.info(f"Created backup: {backup_path}")
            return backup_path

        except Exception as e:
            self.logger.error(f"Error creating backup: {e}")
            return None

    def save_merged_results(self, merged_data: Dict[str, Any], output_path: Path):
        """Save merged results to file"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(merged_data, f, indent=2, ensure_ascii=False)

            self.logger.info(f"Saved merged results to {output_path}")

        except Exception as e:
            self.logger.error(f"Error saving merged results: {e}")
            raise


def get_available_languages() -> List[str]:
    """Get list of supported languages"""
    return ['python', 'javascript', 'typescript', 'java', 'Java', 'go', 'c', 'cpp']


def parse_language_selection(lang_arg: Optional[str]) -> Set[str]:
    """
    Parse language selection from command-line argument

    Args:
        lang_arg: Comma-separated list of languages or 'all'

    Returns:
        Set of normalized language names
    """
    if not lang_arg or lang_arg.lower() == 'all':
        return set(get_available_languages())

    selected = set()
    for lang in lang_arg.split(','):
        lang = lang.strip()
        if lang:
            selected.add(lang)

    return selected