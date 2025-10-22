#!/usr/bin/env python3
"""
Outlier Filter Module

Provides efficient filtering and execution logic for re-running only outlier entries,
dramatically reducing execution time by reusing existing results for non-outlier entries.


Date: 2025-10-18
"""

import json
import logging
from pathlib import Path
from typing import Dict, Set, List, Tuple, Optional, Any
from dataclasses import dataclass, field
from collections import defaultdict

logger = logging.getLogger(__name__)


@dataclass
class OutlierEntry:
    """Represents a single outlier entry"""

    cluster_name: str
    entry_id_base: str
    entry_id_llm: str
    llm_model: str
    prompt_version: str
    language: str
    metric_name: str
    improvement_percentage: float

    def get_execution_key(self) -> str:
        """Generate unique key for this outlier execution"""
        # Extract version number from prompt_version (e.g., "v1" -> "1")
        version_num = self.prompt_version.replace('v', '')
        return f"{self.cluster_name}_{self.entry_id_base}_{self.llm_model}_v{version_num}"


@dataclass
class OutlierFilterStats:
    """Statistics about outlier filtering"""

    total_outliers: int = 0
    affected_clusters: int = 0
    affected_entries_base: Set[str] = field(default_factory=set)
    affected_entries_llm: Dict[str, Set[str]] = field(default_factory=lambda: defaultdict(set))
    outliers_by_cluster: Dict[str, List[OutlierEntry]] = field(default_factory=lambda: defaultdict(list))
    outliers_by_prompt_version: Dict[str, int] = field(default_factory=lambda: defaultdict(int))
    outliers_by_llm_model: Dict[str, int] = field(default_factory=lambda: defaultdict(int))

    def add_outlier(self, outlier: OutlierEntry):
        """Add an outlier to statistics"""
        self.total_outliers += 1
        self.affected_entries_base.add(outlier.entry_id_base)
        self.affected_entries_llm[outlier.prompt_version].add(outlier.entry_id_llm)
        self.outliers_by_cluster[outlier.cluster_name].append(outlier)
        self.outliers_by_prompt_version[outlier.prompt_version] += 1
        self.outliers_by_llm_model[outlier.llm_model] += 1

    def get_affected_entry_ids_for_base(self, cluster_name: str) -> Set[str]:
        """Get set of entry IDs that need base code re-execution for a cluster"""
        cluster_outliers = self.outliers_by_cluster.get(cluster_name, [])
        return {o.entry_id_base for o in cluster_outliers}

    def get_affected_entry_ids_for_llm(
        self, cluster_name: str, prompt_version: str
    ) -> Set[str]:
        """Get set of entry IDs that need LLM code re-execution for a cluster and prompt version"""
        cluster_outliers = self.outliers_by_cluster.get(cluster_name, [])
        version_str = f"v{prompt_version}" if not prompt_version.startswith('v') else prompt_version
        return {
            o.entry_id_llm
            for o in cluster_outliers
            if o.prompt_version == version_str
        }

    def needs_base_execution(self, cluster_name: str, entry_id: str) -> bool:
        """Check if an entry needs base code re-execution"""
        return entry_id in self.get_affected_entry_ids_for_base(cluster_name)

    def needs_llm_execution(
        self, cluster_name: str, entry_id: str, prompt_version: str
    ) -> bool:
        """Check if an entry needs LLM code re-execution"""
        return entry_id in self.get_affected_entry_ids_for_llm(cluster_name, prompt_version)

    def print_summary(self):
        """Print summary statistics"""
        logger.info("=" * 80)
        logger.info("OUTLIER FILTER STATISTICS")
        logger.info("=" * 80)
        logger.info(f"Total outliers loaded: {self.total_outliers}")
        logger.info(f"Affected clusters: {self.affected_clusters}")
        logger.info(f"Unique base entries to re-execute: {len(self.affected_entries_base)}")

        logger.info(f"\nOutliers by LLM model:")
        for model, count in sorted(self.outliers_by_llm_model.items()):
            logger.info(f"  {model}: {count}")

        logger.info(f"\nOutliers by prompt version:")
        for version, count in sorted(self.outliers_by_prompt_version.items()):
            logger.info(f"  {version}: {count}")
            logger.info(f"    Unique LLM entries: {len(self.affected_entries_llm[version])}")


class OutlierFilter:
    """
    Filters execution to only re-run outlier entries, reusing existing results.

    This class dramatically reduces execution time by:
    1. Loading outlier report to identify problematic entries
    2. Filtering cluster entries to only execute outliers
    3. Merging new outlier results with existing non-outlier results
    """

    def __init__(self, outlier_report_path: Path):
        """
        Initialize outlier filter

        Args:
            outlier_report_path: Path to outliers_report_*.json file
        """
        self.outlier_report_path = Path(outlier_report_path)
        self.outlier_data: Optional[Dict] = None
        self.stats = OutlierFilterStats()
        self._loaded = False

    def load_outlier_report(self) -> bool:
        """
        Load and parse outlier report

        Returns:
            True if successful, False otherwise
        """
        if not self.outlier_report_path.exists():
            logger.error(f"Outlier report not found: {self.outlier_report_path}")
            return False

        try:
            with open(self.outlier_report_path, 'r', encoding='utf-8') as f:
                self.outlier_data = json.load(f)

            logger.info(f"✓ Loaded outlier report: {self.outlier_report_path.name}")
            logger.info(f"  Generation date: {self.outlier_data['metadata']['generation_date']}")
            logger.info(f"  Threshold: ±{self.outlier_data['metadata']['threshold_percentage']}%")
            logger.info(f"  Total outliers: {self.outlier_data['metadata']['total_outliers']}")

            # Parse outliers
            self._parse_outliers()
            self._loaded = True

            return True

        except Exception as e:
            logger.error(f"Failed to load outlier report: {e}", exc_info=True)
            return False

    def _parse_outliers(self):
        """Parse outliers from loaded data and build statistics"""
        if not self.outlier_data:
            return

        outliers_list = self.outlier_data.get('outliers', [])

        for outlier_dict in outliers_list:
            outlier = OutlierEntry(
                cluster_name=outlier_dict['cluster_name'],
                entry_id_base=outlier_dict['entry_id_base'],
                entry_id_llm=outlier_dict['entry_id_llm'],
                llm_model=outlier_dict['llm_model'],
                prompt_version=outlier_dict['prompt_version'],
                language=outlier_dict['language'],
                metric_name=outlier_dict['metric_name'],
                improvement_percentage=outlier_dict['improvement_percentage']
            )
            self.stats.add_outlier(outlier)

        # Count affected clusters
        self.stats.affected_clusters = len(self.stats.outliers_by_cluster)

        logger.info(f"✓ Parsed {len(outliers_list)} outliers")

    def is_loaded(self) -> bool:
        """Check if outlier report is loaded"""
        return self._loaded

    def has_outliers_for_cluster(self, cluster_name: str) -> bool:
        """Check if a cluster has any outliers"""
        return cluster_name in self.stats.outliers_by_cluster

    def get_outlier_count_for_cluster(self, cluster_name: str) -> int:
        """Get number of outliers for a cluster"""
        return len(self.stats.outliers_by_cluster.get(cluster_name, []))

    def get_base_entry_ids_to_execute(self, cluster_name: str) -> Set[str]:
        """
        Get set of entry IDs that need base code re-execution

        Args:
            cluster_name: Name of the cluster

        Returns:
            Set of entry IDs to execute (outliers only)
        """
        return self.stats.get_affected_entry_ids_for_base(cluster_name)

    def get_llm_entry_ids_to_execute(
        self, cluster_name: str, prompt_version: int
    ) -> Set[str]:
        """
        Get set of entry IDs that need LLM code re-execution

        Args:
            cluster_name: Name of the cluster
            prompt_version: Prompt version number (1-4)

        Returns:
            Set of entry IDs to execute (outliers only)
        """
        version_str = f"v{prompt_version}"
        return self.stats.get_affected_entry_ids_for_llm(cluster_name, version_str)

    def should_execute_base_entry(self, cluster_name: str, entry_id: str) -> bool:
        """
        Check if a base entry should be executed

        Args:
            cluster_name: Name of the cluster
            entry_id: Entry ID to check

        Returns:
            True if entry is an outlier and needs execution, False otherwise
        """
        return self.stats.needs_base_execution(cluster_name, entry_id)

    def should_execute_llm_entry(
        self, cluster_name: str, entry_id: str, prompt_version: int
    ) -> bool:
        """
        Check if an LLM entry should be executed

        Args:
            cluster_name: Name of the cluster
            entry_id: Entry ID to check
            prompt_version: Prompt version number (1-4)

        Returns:
            True if entry is an outlier and needs execution, False otherwise
        """
        version_str = f"v{prompt_version}"
        return self.stats.needs_llm_execution(cluster_name, entry_id, version_str)

    def get_affected_prompt_versions(self, cluster_name: str) -> Set[int]:
        """
        Get set of prompt versions that have outliers for a cluster

        Args:
            cluster_name: Name of the cluster

        Returns:
            Set of prompt version numbers (e.g., {1, 2, 4})
        """
        cluster_outliers = self.stats.outliers_by_cluster.get(cluster_name, [])
        versions = set()
        for outlier in cluster_outliers:
            # Extract number from "v1", "v2", etc.
            version_num = int(outlier.prompt_version.replace('v', ''))
            versions.add(version_num)
        return versions

    def print_cluster_summary(self, cluster_name: str):
        """Print summary for a specific cluster"""
        if not self.has_outliers_for_cluster(cluster_name):
            logger.info(f"No outliers found for cluster: {cluster_name}")
            return

        outliers = self.stats.outliers_by_cluster[cluster_name]
        base_entries = self.get_base_entry_ids_to_execute(cluster_name)
        affected_versions = self.get_affected_prompt_versions(cluster_name)

        logger.info(f"\n{'=' * 80}")
        logger.info(f"OUTLIER SUMMARY FOR CLUSTER: {cluster_name}")
        logger.info(f"{'=' * 80}")
        logger.info(f"Total outliers: {len(outliers)}")
        logger.info(f"Unique base entries to re-execute: {len(base_entries)}")
        logger.info(f"Affected prompt versions: {sorted(affected_versions)}")

        for version in sorted(affected_versions):
            llm_entries = self.get_llm_entry_ids_to_execute(cluster_name, version)
            logger.info(f"  v{version}: {len(llm_entries)} entries to re-execute")

        # Show outlier distribution by metric
        metrics_count = defaultdict(int)
        for outlier in outliers:
            metrics_count[outlier.metric_name] += 1

        logger.info(f"\nOutliers by metric:")
        for metric, count in sorted(metrics_count.items()):
            logger.info(f"  {metric}: {count}")

    def get_statistics(self) -> OutlierFilterStats:
        """Get filter statistics"""
        return self.stats


class ResultMerger:
    """
    Merges new outlier execution results with existing non-outlier results.

    This class handles the intelligent merging of:
    - Newly executed outlier entries
    - Existing valid non-outlier entries from previous executions
    """

    @staticmethod
    def merge_results(
        existing_data: Dict[str, Any],
        new_results: List[Dict[str, Any]],
        outlier_entry_ids: Set[str]
    ) -> Dict[str, Any]:
        """
        Merge existing and new results

        Args:
            existing_data: Previous execution data with format {"results": {"python": [...], ...}}
            new_results: Newly executed outlier results (list of dicts)
            outlier_entry_ids: Set of entry IDs that were re-executed

        Returns:
            Merged data in format {"results": {"python": [...], ...}}
        """
        # Extract existing results by language
        existing_results_by_lang = existing_data.get('results', {})

        # Create lookup for new results by entry ID
        new_results_map = {r['id']: r for r in new_results}

        # Track merged results by language
        merged_by_lang = {}
        total_existing = 0
        total_replaced = 0
        total_kept = 0

        # Process existing results
        for lang, lang_entries in existing_results_by_lang.items():
            merged_lang = []

            for existing in lang_entries:
                total_existing += 1
                entry_id = existing['id']

                if entry_id in outlier_entry_ids:
                    # This is an outlier - use new result if available
                    if entry_id in new_results_map:
                        merged_lang.append(new_results_map[entry_id])
                        logger.debug(f"Replaced outlier entry: {entry_id}")
                        total_replaced += 1
                        # Remove from new_results_map to track what's been merged
                        del new_results_map[entry_id]
                    else:
                        # Shouldn't happen, but keep existing as fallback
                        logger.warning(f"Outlier entry not in new results: {entry_id}")
                        merged_lang.append(existing)
                        total_kept += 1
                else:
                    # Non-outlier - keep existing result
                    merged_lang.append(existing)
                    logger.debug(f"Kept existing result for: {entry_id}")
                    total_kept += 1

            if merged_lang:
                merged_by_lang[lang] = merged_lang

        # Add any remaining new results that weren't in existing results
        # Group by language
        for entry_id, new_result in new_results_map.items():
            lang = new_result.get('language', 'unknown')
            if lang not in merged_by_lang:
                merged_by_lang[lang] = []
            merged_by_lang[lang].append(new_result)
            logger.debug(f"Added new entry: {entry_id}")

        total_merged = sum(len(entries) for entries in merged_by_lang.values())

        logger.info(f"Merge complete: {total_existing} existing ({total_replaced} replaced, {total_kept} kept) + {len(new_results_map)} new → {total_merged} total")

        return {"results": merged_by_lang}

    @staticmethod
    def load_existing_results(result_file: Path) -> Dict[str, Any]:
        """
        Load existing results from file

        Returns:
            Dictionary with format: {"results": {"python": [...], "java": [...]}} or empty dict
        """
        if not result_file.exists():
            logger.info(f"No existing results file: {result_file.name}")
            return {"results": {}}

        try:
            with open(result_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Handle different formats
            if isinstance(data, dict) and 'results' in data:
                # Already in correct format: {"results": {"python": [...], ...}}
                total_entries = sum(len(entries) for entries in data['results'].values())
                logger.info(f"Loaded {total_entries} existing results from {result_file.name}")
                return data
            elif isinstance(data, list):
                # Old list format - convert to new format
                logger.warning(f"Old list format detected in {result_file.name}, converting...")
                # Group by language if available
                by_lang = {}
                for entry in data:
                    lang = entry.get('language', 'unknown')
                    if lang not in by_lang:
                        by_lang[lang] = []
                    by_lang[lang].append(entry)
                return {"results": by_lang}
            else:
                logger.warning(f"Unexpected format in {result_file.name}")
                return {"results": {}}

        except Exception as e:
            logger.error(f"Failed to load existing results from {result_file.name}: {e}")
            return {"results": {}}

    @staticmethod
    def save_merged_results(
        merged_data: Dict[str, Any],
        output_file: Path,
        backup: bool = True
    ):
        """
        Save merged results to file

        Args:
            merged_data: Merged data in format {"results": {"python": [...], ...}}
            output_file: Output file path
            backup: If True, backup existing file before overwriting
        """
        # Backup existing file if requested
        if backup and output_file.exists():
            from datetime import datetime
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_file = output_file.with_suffix(f'.backup_{timestamp}.json')
            import shutil
            shutil.copy2(output_file, backup_file)
            logger.info(f"Backed up existing results to {backup_file.name}")

        # Save merged results
        output_file.parent.mkdir(parents=True, exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(merged_data, f, indent=2, ensure_ascii=False)

        total_entries = sum(len(entries) for entries in merged_data.get('results', {}).values())
        logger.info(f"Saved {total_entries} merged results to {output_file.name}")
