"""Error classification engine - distinguishes fixable from unfixable errors"""

import logging
import sys
import os
from typing import List, Dict, Optional

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from unified_analyzer.core.models import Anomaly
from unified_analyzer.core.enums import RootCause
from .models import ClassifiedError, ErrorCategory, FixAction

logger = logging.getLogger(__name__)


class ErrorClassifier:
    """
    Classifies errors from Unified Analyzer into fixable vs unfixable categories.

    KEY RESPONSIBILITIES:
    1. Map RootCause (from unified_analyzer) to ErrorCategory (fixable vs unfixable)
    2. Extract file paths for code-related errors
    3. Recommend appropriate fix actions for each error type
    4. Provide clear separation between environment and code issues
    """

    # Mapping from RootCause to ErrorCategory
    ROOT_CAUSE_TO_CATEGORY: Dict[RootCause, ErrorCategory] = {
        # FIXABLE - Environment/Infrastructure
        RootCause.DOCKER_ERROR: ErrorCategory.DOCKER_ERROR,
        RootCause.METRICS_COLLECTION_FAILURE: ErrorCategory.METRICS_COLLECTION,
        RootCause.CONFIGURATION_ERROR: ErrorCategory.CONFIGURATION_ERROR,

        # UNFIXABLE - Code-level issues
        RootCause.CODE_BUG: ErrorCategory.CODE_BUG,
        RootCause.TEST_SUITE_ERROR: ErrorCategory.TEST_SUITE_ERROR,
        RootCause.COMPILATION_ERROR: ErrorCategory.COMPILATION_ERROR,
        RootCause.RUNTIME_CRASH: ErrorCategory.RUNTIME_CRASH,
        RootCause.ASSERTION_FAILURE: ErrorCategory.ASSERTION_FAILURE,

        # UNCERTAIN
        RootCause.TIMEOUT: ErrorCategory.UNKNOWN,  # Could be algorithmic or environment
        RootCause.MEMORY_ERROR: ErrorCategory.UNKNOWN,  # Could be code or environment
        RootCause.UNKNOWN: ErrorCategory.UNKNOWN,
    }

    def __init__(self):
        """Initialize error classifier"""
        self.stats = {
            'total_classified': 0,
            'fixable': 0,
            'unfixable': 0,
            'code_related': 0,
            'environment_related': 0
        }

    def classify(self, anomaly: Anomaly) -> ClassifiedError:
        """
        Classify an anomaly into a ClassifiedError with actionable information.

        Args:
            anomaly: Anomaly from Unified Analyzer

        Returns:
            ClassifiedError with category, file paths, and recommended actions
        """
        entry = anomaly.entry

        # Step 1: Determine primary root cause and category
        primary_root_cause = (
            anomaly.probable_causes[0] if anomaly.probable_causes
            else RootCause.UNKNOWN
        )

        category = self._map_root_cause_to_category(primary_root_cause)

        # Step 2: Extract file paths
        code_file_path = self._extract_code_file_path(entry, anomaly)
        test_file_path = self._extract_test_file_path(entry, anomaly)
        log_file_path = entry.log_path
        error_file_paths = self._extract_error_file_paths(anomaly)

        # Step 3: Determine recommended fix actions
        recommended_actions = self._recommend_fix_actions(
            category, primary_root_cause, anomaly
        )

        # Step 4: Create ClassifiedError
        classified = ClassifiedError(
            anomaly_id=anomaly.anomaly_id,
            cluster_name=entry.cluster_name,
            entry_id=entry.id,
            language=entry.language,
            category=category,
            root_cause=primary_root_cause.value,
            severity=anomaly.severity.value,
            code_file_path=code_file_path,
            test_file_path=test_file_path,
            log_file_path=log_file_path,
            error_file_paths=error_file_paths,
            error_message=entry.error_message,
            detected_issues=anomaly.detected_issues,
            recommended_actions=recommended_actions
        )

        # Update stats
        self._update_stats(classified)

        return classified

    def classify_batch(self, anomalies: List[Anomaly]) -> List[ClassifiedError]:
        """
        Classify multiple anomalies in batch.

        Args:
            anomalies: List of anomalies from Unified Analyzer

        Returns:
            List of ClassifiedError objects
        """
        classified_errors = []

        for anomaly in anomalies:
            try:
                classified = self.classify(anomaly)
                classified_errors.append(classified)
            except Exception as e:
                logger.error(
                    f"Error classifying anomaly {anomaly.anomaly_id}: {e}",
                    exc_info=True
                )

        logger.info(
            f"Classified {len(classified_errors)}/{len(anomalies)} anomalies"
        )

        return classified_errors

    def _map_root_cause_to_category(
        self,
        root_cause: RootCause
    ) -> ErrorCategory:
        """Map RootCause to ErrorCategory"""
        return self.ROOT_CAUSE_TO_CATEGORY.get(
            root_cause,
            ErrorCategory.UNKNOWN
        )

    def _extract_code_file_path(
        self,
        entry,
        anomaly: Anomaly
    ) -> Optional[str]:
        """Extract path to the code file being tested"""
        # Try to get from entry metadata
        if hasattr(entry, 'filename') and entry.filename:
            return entry.filename

        # Try to get from log analysis
        if anomaly.log_analysis and anomaly.log_analysis.error_file_paths:
            # Look for non-test files
            from unified_analyzer.data.parser import FilenameParser
            parser = FilenameParser()

            for file_path in anomaly.log_analysis.error_file_paths:
                if not parser.is_test_file(file_path):
                    return file_path

        return None

    def _extract_test_file_path(
        self,
        entry,
        anomaly: Anomaly
    ) -> Optional[str]:
        """Extract path to the test file"""
        # Try to get from entry metadata
        if hasattr(entry, 'test_file') and entry.test_file:
            return entry.test_file

        # Try to get from log analysis
        if anomaly.log_analysis and anomaly.log_analysis.error_file_paths:
            # Look for test files
            from unified_analyzer.data.parser import FilenameParser
            parser = FilenameParser()

            for file_path in anomaly.log_analysis.error_file_paths:
                if parser.is_test_file(file_path):
                    return file_path

        return None

    def _extract_error_file_paths(self, anomaly: Anomaly) -> List[str]:
        """Extract all file paths mentioned in errors"""
        file_paths = []

        if anomaly.log_analysis and anomaly.log_analysis.error_file_paths:
            file_paths.extend(anomaly.log_analysis.error_file_paths)

        return list(set(file_paths))  # Remove duplicates

    def _recommend_fix_actions(
        self,
        category: ErrorCategory,
        root_cause: RootCause,
        anomaly: Anomaly
    ) -> List[FixAction]:
        """
        Recommend fix actions based on error category and root cause.

        Returns:
            List of recommended FixAction enum values
        """
        actions = []

        # DOCKER ERRORS
        if category == ErrorCategory.DOCKER_ERROR:
            actions.extend([
                FixAction.RESTART_DOCKER,
                FixAction.REBUILD_CONTAINER,
                FixAction.RERUN_ENTRY
            ])

            # If it's a permission issue
            if anomaly.entry.error_message and 'permission' in anomaly.entry.error_message.lower():
                actions.insert(0, FixAction.FIX_DOCKER_PERMISSIONS)

        # METRICS COLLECTION ERRORS
        elif category == ErrorCategory.METRICS_COLLECTION:
            actions.extend([
                FixAction.RESTART_METRICS_COLLECTION,
                FixAction.FIX_PROCESS_MONITORING,
                FixAction.RERUN_ENTRY
            ])

            # If test passed but metrics are zero
            if anomaly.entry.regression_test_passed:
                actions.insert(0, FixAction.RECALIBRATE_METRICS)

        # CONFIGURATION ERRORS
        elif category == ErrorCategory.CONFIGURATION_ERROR:
            actions.extend([
                FixAction.RESTORE_CONFIG,
                FixAction.FIX_FILE_PATHS,
                FixAction.RERUN_ENTRY
            ])

        # CODE-RELATED ERRORS (unfixable, but collect debug info)
        elif category.is_code_related():
            actions.extend([
                FixAction.COLLECT_DEBUG_INFO,
                FixAction.RERUN_WITH_VERBOSE,
                FixAction.MANUAL_REVIEW_REQUIRED
            ])

        # UNKNOWN ERRORS (try progressive diagnosis)
        elif category == ErrorCategory.UNKNOWN:
            # For timeouts, try re-running first
            if root_cause == RootCause.TIMEOUT:
                actions.extend([
                    FixAction.RERUN_ENTRY,
                    FixAction.COLLECT_DEBUG_INFO,
                    FixAction.MANUAL_REVIEW_REQUIRED
                ])
            # For memory errors, check if it's systemic
            elif root_cause == RootCause.MEMORY_ERROR:
                actions.extend([
                    FixAction.RESTART_DOCKER,
                    FixAction.CLEAN_DOCKER_CACHE,
                    FixAction.RERUN_ENTRY,
                    FixAction.MANUAL_REVIEW_REQUIRED
                ])
            else:
                actions.extend([
                    FixAction.COLLECT_DEBUG_INFO,
                    FixAction.RERUN_WITH_VERBOSE,
                    FixAction.MANUAL_REVIEW_REQUIRED
                ])

        return actions

    def _update_stats(self, classified: ClassifiedError):
        """Update internal statistics"""
        self.stats['total_classified'] += 1

        if classified.is_fixable:
            self.stats['fixable'] += 1
            self.stats['environment_related'] += 1
        else:
            self.stats['unfixable'] += 1
            if classified.category.is_code_related():
                self.stats['code_related'] += 1

    def get_stats(self) -> Dict[str, int]:
        """Get classification statistics"""
        return self.stats.copy()

    def print_stats(self):
        """Print classification statistics"""
        print("\n" + "=" * 60)
        print("ERROR CLASSIFICATION STATISTICS")
        print("=" * 60)
        print(f"Total Errors Classified: {self.stats['total_classified']}")
        print(f"Fixable (Environment):   {self.stats['fixable']}")
        print(f"Unfixable (Code):        {self.stats['unfixable']}")
        print(f"  - Code-related:        {self.stats['code_related']}")
        print(f"  - Environment-related: {self.stats['environment_related']}")
        print("=" * 60 + "\n")
