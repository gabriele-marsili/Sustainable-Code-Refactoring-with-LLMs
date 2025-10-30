"""Execution selector - identifies entries that need re-execution"""

import logging
import sys
import os
from typing import List, Dict, Set, Optional
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from .models import ClassifiedError, ExecutionRequest, ErrorCategory

logger = logging.getLogger(__name__)


class ExecutionSelector:
    """
    Selects which entries need to be re-executed based on classified errors.

    KEY RESPONSIBILITIES:
    1. Group errors by cluster and entry
    2. Determine which entries should be re-executed after fixes
    3. Prioritize re-execution based on error fixability
    4. Generate ExecutionRequest objects for ClusterRunner
    """

    def __init__(self):
        """Initialize execution selector"""
        self.stats = {
            'total_errors_analyzed': 0,
            'entries_for_reexecution': 0,
            'clusters_affected': 0
        }

    def select_entries_for_reexecution(
        self,
        classified_errors: List[ClassifiedError],
        only_fixable: bool = True
    ) -> List[ExecutionRequest]:
        """
        Select entries that should be re-executed.

        Args:
            classified_errors: List of ClassifiedError objects
            only_fixable: If True, only select entries with fixable errors

        Returns:
            List of ExecutionRequest objects grouped by cluster
        """
        self.stats['total_errors_analyzed'] = len(classified_errors)

        # Filter errors based on fixability
        if only_fixable:
            errors_to_process = [
                e for e in classified_errors
                if e.is_fixable
            ]
            logger.info(
                f"Selected {len(errors_to_process)}/{len(classified_errors)} "
                f"fixable errors for re-execution"
            )
        else:
            errors_to_process = classified_errors
            logger.info(
                f"Selected all {len(errors_to_process)} errors for re-execution"
            )

        # Group by cluster
        entries_by_cluster = self._group_by_cluster(errors_to_process)

        # Create ExecutionRequest for each cluster
        execution_requests = []

        for cluster_name, cluster_info in entries_by_cluster.items():
            request = ExecutionRequest(
                cluster_name=cluster_name,
                entry_ids=cluster_info['entry_ids'],
                test_type=cluster_info['test_type'],
                num_executions=1,  # Single re-execution after fix
                verbose=True,  # Always verbose for debugging
                reason=self._generate_reason(cluster_info['errors'])
            )

            execution_requests.append(request)

        # Update stats
        self.stats['clusters_affected'] = len(execution_requests)
        self.stats['entries_for_reexecution'] = sum(
            len(req.entry_ids) for req in execution_requests
        )

        logger.info(
            f"Generated {len(execution_requests)} execution requests for "
            f"{self.stats['entries_for_reexecution']} entries across "
            f"{self.stats['clusters_affected']} clusters"
        )

        return execution_requests

    def select_by_category(
        self,
        classified_errors: List[ClassifiedError],
        categories: List[ErrorCategory]
    ) -> List[ExecutionRequest]:
        """
        Select entries based on specific error categories.

        Args:
            classified_errors: List of ClassifiedError objects
            categories: List of ErrorCategory to filter by

        Returns:
            List of ExecutionRequest objects
        """
        filtered_errors = [
            e for e in classified_errors
            if e.category in categories
        ]

        logger.info(
            f"Selected {len(filtered_errors)}/{len(classified_errors)} errors "
            f"matching categories: {[c.value for c in categories]}"
        )

        return self.select_entries_for_reexecution(
            filtered_errors,
            only_fixable=False  # Already filtered
        )

    def select_by_cluster(
        self,
        classified_errors: List[ClassifiedError],
        cluster_names: List[str]
    ) -> List[ExecutionRequest]:
        """
        Select entries from specific clusters only.

        Args:
            classified_errors: List of ClassifiedError objects
            cluster_names: List of cluster names to include

        Returns:
            List of ExecutionRequest objects
        """
        filtered_errors = [
            e for e in classified_errors
            if e.cluster_name in cluster_names
        ]

        logger.info(
            f"Selected {len(filtered_errors)}/{len(classified_errors)} errors "
            f"from clusters: {cluster_names}"
        )

        return self.select_entries_for_reexecution(
            filtered_errors,
            only_fixable=True
        )

    def get_code_issues_for_review(
        self,
        classified_errors: List[ClassifiedError]
    ) -> Dict[str, List[ClassifiedError]]:
        """
        Get code-related issues that require manual review.

        Args:
            classified_errors: List of ClassifiedError objects

        Returns:
            Dictionary mapping cluster_name to list of code-related errors
        """
        code_issues = [
            e for e in classified_errors
            if e.category.is_code_related()
        ]

        # Group by cluster
        issues_by_cluster = defaultdict(list)
        for error in code_issues:
            issues_by_cluster[error.cluster_name].append(error)

        logger.info(
            f"Found {len(code_issues)} code-related issues across "
            f"{len(issues_by_cluster)} clusters requiring manual review"
        )

        return dict(issues_by_cluster)

    def _group_by_cluster(
        self,
        errors: List[ClassifiedError]
    ) -> Dict[str, Dict]:
        """
        Group errors by cluster and collect metadata.

        Returns:
            Dict mapping cluster_name to {
                'entry_ids': List[str],
                'test_type': str,
                'errors': List[ClassifiedError]
            }
        """
        clusters = defaultdict(lambda: {
            'entry_ids': set(),
            'test_type': 'base',  # Default
            'errors': []
        })

        for error in errors:
            cluster_name = error.cluster_name
            clusters[cluster_name]['entry_ids'].add(error.entry_id)
            clusters[cluster_name]['errors'].append(error)

        # Convert sets to lists
        result = {}
        for cluster_name, info in clusters.items():
            result[cluster_name] = {
                'entry_ids': sorted(list(info['entry_ids'])),
                'test_type': info['test_type'],
                'errors': info['errors']
            }

        return result

    def _generate_reason(self, errors: List[ClassifiedError]) -> str:
        """
        Generate a human-readable reason for re-execution.

        Args:
            errors: List of errors for this cluster

        Returns:
            String describing why re-execution is needed
        """
        # Count by category
        category_counts = defaultdict(int)
        for error in errors:
            category_counts[error.category.value] += 1

        # Build reason string
        reason_parts = []
        for category, count in sorted(category_counts.items()):
            reason_parts.append(f"{count} {category}")

        reason = f"Re-execution after fixes: {', '.join(reason_parts)}"

        return reason

    def prioritize_requests(
        self,
        requests: List[ExecutionRequest],
        priority_order: Optional[List[str]] = None
    ) -> List[ExecutionRequest]:
        """
        Prioritize execution requests based on cluster importance.

        Args:
            requests: List of ExecutionRequest objects
            priority_order: Optional list of cluster names in priority order

        Returns:
            Sorted list of ExecutionRequest objects
        """
        if not priority_order:
            # Default: sort by number of entries (most problematic first)
            return sorted(
                requests,
                key=lambda r: len(r.entry_ids),
                reverse=True
            )

        # Sort by priority order
        priority_map = {
            name: idx for idx, name in enumerate(priority_order)
        }

        def get_priority(request: ExecutionRequest) -> int:
            return priority_map.get(request.cluster_name, len(priority_order))

        return sorted(requests, key=get_priority)

    def get_stats(self) -> Dict[str, int]:
        """Get selection statistics"""
        return self.stats.copy()

    def print_stats(self):
        """Print selection statistics"""
        print("\n" + "=" * 60)
        print("EXECUTION SELECTION STATISTICS")
        print("=" * 60)
        print(f"Total Errors Analyzed:       {self.stats['total_errors_analyzed']}")
        print(f"Entries for Re-execution:    {self.stats['entries_for_reexecution']}")
        print(f"Clusters Affected:           {self.stats['clusters_affected']}")
        print("=" * 60 + "\n")
