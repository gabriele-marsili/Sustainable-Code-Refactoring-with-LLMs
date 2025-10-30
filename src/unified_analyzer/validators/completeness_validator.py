#!/usr/bin/env python3
"""
Completeness Validator - Data Coverage Analysis
================================================

This module validates the completeness of execution data across all clusters.
It ensures that every entry in every cluster has the complete set of execution
results (5 runs for base, 5 runs x 4 prompt versions for LLM).

Author: Sustainable Code Refactoring Research Project
Date: 2025-10-28
"""

import json
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
from dataclasses import dataclass, field
from datetime import datetime
from collections import defaultdict

try:
    from utility_dir.utility_paths import CLUSTERS_DIR_PATH, EXECUTION_OUTPUTS_DIR_PATH
    PATHS_AVAILABLE = True
except ImportError:
    # Fallback paths
    CLUSTERS_DIR_PATH = Path(__file__).parent.parent.parent / "clusters"
    EXECUTION_OUTPUTS_DIR_PATH = Path(__file__).parent.parent.parent / "execution_outputs"
    PATHS_AVAILABLE = False


@dataclass
class MissingExecution:
    """Represents a missing or incomplete execution"""
    cluster_name: str
    entry_id: str
    language: str
    execution_type: str  # "base" or "llm_v{1-4}"
    run_number: int  # 1-5
    reason: str  # "missing_file" or "missing_entry_in_file"
    expected_file: str

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "cluster_name": self.cluster_name,
            "entry_id": self.entry_id,
            "language": self.language,
            "execution_type": self.execution_type,
            "run_number": self.run_number,
            "reason": self.reason,
            "expected_file": self.expected_file
        }


@dataclass
class EntryCompletenessStatus:
    """Completeness status for a single entry"""
    entry_id: str
    language: str
    cluster_name: str

    # Base code completeness
    base_expected: int = 5  # Expected 5 runs
    base_found: int = 0
    base_missing_runs: List[int] = field(default_factory=list)

    # LLM code completeness (per prompt version)
    llm_expected_per_version: int = 5  # Expected 5 runs per version
    llm_versions: List[int] = field(default_factory=lambda: [1, 2, 3, 4])
    llm_found: Dict[int, int] = field(default_factory=dict)  # version -> count
    llm_missing_runs: Dict[int, List[int]] = field(default_factory=dict)  # version -> [runs]

    @property
    def is_base_complete(self) -> bool:
        """Check if base executions are complete"""
        return self.base_found == self.base_expected

    @property
    def is_llm_complete(self) -> bool:
        """Check if all LLM versions are complete"""
        for version in self.llm_versions:
            if self.llm_found.get(version, 0) < self.llm_expected_per_version:
                return False
        return True

    @property
    def is_complete(self) -> bool:
        """Check if entry is fully complete (base + all LLM versions)"""
        return self.is_base_complete and self.is_llm_complete

    @property
    def completeness_percentage(self) -> float:
        """Calculate overall completeness percentage"""
        total_expected = self.base_expected + (len(self.llm_versions) * self.llm_expected_per_version)
        total_found = self.base_found + sum(self.llm_found.values())
        return (total_found / total_expected * 100) if total_expected > 0 else 0.0

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "entry_id": self.entry_id,
            "language": self.language,
            "cluster_name": self.cluster_name,
            "base": {
                "expected": self.base_expected,
                "found": self.base_found,
                "complete": self.is_base_complete,
                "missing_runs": self.base_missing_runs
            },
            "llm": {
                "expected_per_version": self.llm_expected_per_version,
                "versions": self.llm_versions,
                "found": self.llm_found,
                "complete": self.is_llm_complete,
                "missing_runs": self.llm_missing_runs
            },
            "completeness_percentage": round(self.completeness_percentage, 2),
            "is_complete": self.is_complete
        }


@dataclass
class ClusterCompletenessReport:
    """Completeness report for a single cluster"""
    cluster_name: str
    total_entries: int = 0
    complete_entries: int = 0
    incomplete_entries: int = 0
    entry_statuses: List[EntryCompletenessStatus] = field(default_factory=list)
    missing_executions: List[MissingExecution] = field(default_factory=list)

    @property
    def completeness_percentage(self) -> float:
        """Calculate cluster completeness percentage"""
        return (self.complete_entries / self.total_entries * 100) if self.total_entries > 0 else 0.0

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "cluster_name": self.cluster_name,
            "total_entries": self.total_entries,
            "complete_entries": self.complete_entries,
            "incomplete_entries": self.incomplete_entries,
            "completeness_percentage": round(self.completeness_percentage, 2),
            "entry_statuses": [status.to_dict() for status in self.entry_statuses],
            "missing_executions": [missing.to_dict() for missing in self.missing_executions]
        }


@dataclass
class CompletenessValidationReport:
    """Overall completeness validation report"""
    generated_at: str = field(default_factory=lambda: datetime.now().isoformat())
    clusters_analyzed: int = 0
    total_entries: int = 0
    complete_entries: int = 0
    incomplete_entries: int = 0
    total_missing_executions: int = 0
    cluster_reports: List[ClusterCompletenessReport] = field(default_factory=list)

    @property
    def overall_completeness_percentage(self) -> float:
        """Calculate overall completeness percentage"""
        return (self.complete_entries / self.total_entries * 100) if self.total_entries > 0 else 0.0

    def get_incomplete_entries(self) -> List[Tuple[str, str, EntryCompletenessStatus]]:
        """Get list of incomplete entries across all clusters"""
        incomplete = []
        for cluster_report in self.cluster_reports:
            for status in cluster_report.entry_statuses:
                if not status.is_complete:
                    incomplete.append((cluster_report.cluster_name, status.entry_id, status))
        return incomplete

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return {
            "generated_at": self.generated_at,
            "summary": {
                "clusters_analyzed": self.clusters_analyzed,
                "total_entries": self.total_entries,
                "complete_entries": self.complete_entries,
                "incomplete_entries": self.incomplete_entries,
                "total_missing_executions": self.total_missing_executions,
                "overall_completeness_percentage": round(self.overall_completeness_percentage, 2)
            },
            "cluster_reports": [report.to_dict() for report in self.cluster_reports]
        }

    def save(self, output_path: Path):
        """Save report to JSON file"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)


class CompletenessValidator:
    """
    Validates completeness of execution data across all clusters

    For each entry in each cluster, checks that:
    - Base code: 5 execution results exist
    - LLM code: 5 execution results x 4 prompt versions exist
    """

    def __init__(
        self,
        clusters_dir: Optional[Path] = None,
        execution_outputs_dir: Optional[Path] = None,
        expected_runs: int = 5,
        expected_prompt_versions: List[int] = None
    ):
        """
        Initialize validator

        Args:
            clusters_dir: Directory containing cluster JSON files
            execution_outputs_dir: Directory containing execution result files
            expected_runs: Expected number of runs per entry (default: 5)
            expected_prompt_versions: Expected prompt versions (default: [1,2,3,4])
        """
        self.clusters_dir = clusters_dir or CLUSTERS_DIR_PATH
        self.execution_outputs_dir = execution_outputs_dir or EXECUTION_OUTPUTS_DIR_PATH
        self.expected_runs = expected_runs
        self.expected_prompt_versions = expected_prompt_versions or [1, 2, 3, 4]

        # Cache for loaded execution files
        self._execution_cache: Dict[str, dict] = {}

    def _load_cluster(self, cluster_path: Path) -> dict:
        """Load cluster JSON file"""
        with open(cluster_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _load_execution_file(self, filename: str) -> Optional[dict]:
        """Load execution results file with caching"""
        if filename in self._execution_cache:
            return self._execution_cache[filename]

        filepath = self.execution_outputs_dir / filename
        if not filepath.exists():
            return None

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self._execution_cache[filename] = data
                return data
        except (json.JSONDecodeError, IOError):
            return None

    def _check_entry_in_results(self, entry_id: str, results_data: dict) -> bool:
        """Check if entry_id exists in results data"""
        if not results_data or "results" not in results_data:
            return False

        # Results are grouped by language
        results_by_lang = results_data["results"]
        for lang_entries in results_by_lang.values():
            for entry in lang_entries:
                if entry.get("id") == entry_id:
                    return True
        return False

    def validate_entry_completeness(
        self,
        entry_id: str,
        language: str,
        cluster_name: str
    ) -> EntryCompletenessStatus:
        """
        Validate completeness for a single entry

        Args:
            entry_id: Entry identifier
            language: Programming language
            cluster_name: Cluster name

        Returns:
            EntryCompletenessStatus object
        """
        status = EntryCompletenessStatus(
            entry_id=entry_id,
            language=language,
            cluster_name=cluster_name
        )

        # Check base code completeness (5 runs)
        for run_num in range(1, self.expected_runs + 1):
            filename = f"{cluster_name}_results_{run_num}.json"
            results = self._load_execution_file(filename)

            if results and self._check_entry_in_results(entry_id, results):
                status.base_found += 1
            else:
                status.base_missing_runs.append(run_num)

        # Check LLM code completeness (5 runs x 4 versions)
        for version in self.expected_prompt_versions:
            status.llm_found[version] = 0
            status.llm_missing_runs[version] = []

            for run_num in range(1, self.expected_runs + 1):
                filename = f"{cluster_name}_results_v{version}_{run_num}.json"
                results = self._load_execution_file(filename)

                if results and self._check_entry_in_results(entry_id, results):
                    status.llm_found[version] += 1
                else:
                    status.llm_missing_runs[version].append(run_num)

        return status

    def validate_cluster(self, cluster_name: str) -> ClusterCompletenessReport:
        """
        Validate completeness for entire cluster

        Args:
            cluster_name: Name of cluster (without "cluster_" prefix)

        Returns:
            ClusterCompletenessReport object
        """
        report = ClusterCompletenessReport(cluster_name=cluster_name)

        # Load cluster data
        cluster_path = self.clusters_dir / f"cluster_{cluster_name}.json"
        if not cluster_path.exists():
            return report  # Empty report for non-existent cluster

        cluster_data = self._load_cluster(cluster_path)

        # Iterate through all languages and entries in cluster
        for language, entries in cluster_data.items():
            if not isinstance(entries, list):
                continue

            for entry in entries:
                entry_id = entry.get("id")
                if not entry_id:
                    continue

                report.total_entries += 1

                # Validate this entry
                status = self.validate_entry_completeness(
                    entry_id=entry_id,
                    language=language,
                    cluster_name=cluster_name
                )

                report.entry_statuses.append(status)

                if status.is_complete:
                    report.complete_entries += 1
                else:
                    report.incomplete_entries += 1

                    # Add missing executions to report
                    # Base missing
                    for run_num in status.base_missing_runs:
                        missing = MissingExecution(
                            cluster_name=cluster_name,
                            entry_id=entry_id,
                            language=language,
                            execution_type="base",
                            run_number=run_num,
                            reason="missing_entry_in_file",
                            expected_file=f"{cluster_name}_results_{run_num}.json"
                        )
                        report.missing_executions.append(missing)

                    # LLM missing
                    for version in status.llm_versions:
                        for run_num in status.llm_missing_runs.get(version, []):
                            missing = MissingExecution(
                                cluster_name=cluster_name,
                                entry_id=entry_id,
                                language=language,
                                execution_type=f"llm_v{version}",
                                run_number=run_num,
                                reason="missing_entry_in_file",
                                expected_file=f"{cluster_name}_results_v{version}_{run_num}.json"
                            )
                            report.missing_executions.append(missing)

        return report

    def validate_all_clusters(
        self,
        cluster_names: Optional[List[str]] = None
    ) -> CompletenessValidationReport:
        """
        Validate completeness for all clusters

        Args:
            cluster_names: Optional list of specific clusters to validate.
                          If None, validates all clusters found in clusters_dir.

        Returns:
            CompletenessValidationReport object
        """
        report = CompletenessValidationReport()

        # Determine which clusters to validate
        if cluster_names is None:
            # Auto-discover all clusters
            cluster_files = sorted(self.clusters_dir.glob("cluster_*.json"))
            cluster_names = [f.stem.replace("cluster_", "") for f in cluster_files]

        # Validate each cluster
        for cluster_name in cluster_names:
            cluster_report = self.validate_cluster(cluster_name)

            if cluster_report.total_entries > 0:  # Only include non-empty clusters
                report.cluster_reports.append(cluster_report)
                report.clusters_analyzed += 1
                report.total_entries += cluster_report.total_entries
                report.complete_entries += cluster_report.complete_entries
                report.incomplete_entries += cluster_report.incomplete_entries
                report.total_missing_executions += len(cluster_report.missing_executions)

        return report

    def get_missing_executions_for_rerun(
        self,
        report: CompletenessValidationReport
    ) -> List[Dict[str, str]]:
        """
        Convert completeness report to rerun queue format

        Args:
            report: CompletenessValidationReport

        Returns:
            List of entries in rerun queue format
        """
        rerun_entries = []
        seen = set()  # To avoid duplicates

        for cluster_report in report.cluster_reports:
            for missing in cluster_report.missing_executions:
                # Create unique key
                key = (
                    missing.cluster_name,
                    missing.entry_id,
                    missing.execution_type
                )

                if key in seen:
                    continue
                seen.add(key)

                # Determine test_type
                if missing.execution_type == "base":
                    test_type = "base"
                else:
                    test_type = missing.execution_type  # "llm_v1", "llm_v2", etc.

                rerun_entry = {
                    "cluster_name": missing.cluster_name,
                    "entry_id": missing.entry_id,
                    "language": missing.language,
                    "test_type": test_type,
                    "reason": f"Incomplete execution data: missing {len([m for m in cluster_report.missing_executions if m.entry_id == missing.entry_id and m.execution_type == missing.execution_type])} runs",
                    "anomaly_id": None,
                    "root_cause": "INCOMPLETE_DATA",
                    "error_category": "DATA_COMPLETENESS"
                }
                rerun_entries.append(rerun_entry)

        return rerun_entries


# Convenience functions for direct use
def validate_cluster_completeness(
    cluster_name: str,
    clusters_dir: Optional[Path] = None,
    execution_outputs_dir: Optional[Path] = None
) -> ClusterCompletenessReport:
    """
    Convenience function to validate a single cluster

    Args:
        cluster_name: Cluster to validate
        clusters_dir: Optional clusters directory
        execution_outputs_dir: Optional execution outputs directory

    Returns:
        ClusterCompletenessReport
    """
    validator = CompletenessValidator(
        clusters_dir=clusters_dir,
        execution_outputs_dir=execution_outputs_dir
    )
    return validator.validate_cluster(cluster_name)


def validate_all_completeness(
    clusters_dir: Optional[Path] = None,
    execution_outputs_dir: Optional[Path] = None,
    output_file: Optional[Path] = None
) -> CompletenessValidationReport:
    """
    Convenience function to validate all clusters and optionally save report

    Args:
        clusters_dir: Optional clusters directory
        execution_outputs_dir: Optional execution outputs directory
        output_file: Optional output file path for JSON report

    Returns:
        CompletenessValidationReport
    """
    validator = CompletenessValidator(
        clusters_dir=clusters_dir,
        execution_outputs_dir=execution_outputs_dir
    )
    report = validator.validate_all_clusters()

    if output_file:
        report.save(output_file)

    return report


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Validate completeness of execution data across clusters"
    )
    parser.add_argument(
        "--cluster",
        type=str,
        help="Specific cluster to validate (default: all)"
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Output file for JSON report"
    )
    parser.add_argument(
        "--summary-only",
        action="store_true",
        help="Show only summary statistics"
    )

    args = parser.parse_args()

    if args.cluster:
        # Validate single cluster
        report = validate_cluster_completeness(args.cluster)
        print(f"\n{'='*80}")
        print(f"Cluster: {report.cluster_name}")
        print(f"{'='*80}")
        print(f"Total entries: {report.total_entries}")
        print(f"Complete: {report.complete_entries} ({report.completeness_percentage:.1f}%)")
        print(f"Incomplete: {report.incomplete_entries}")
        print(f"Missing executions: {len(report.missing_executions)}")
    else:
        # Validate all clusters
        report = validate_all_completeness(output_file=args.output)
        print(f"\n{'='*80}")
        print("COMPLETENESS VALIDATION REPORT")
        print(f"{'='*80}")
        print(f"Clusters analyzed: {report.clusters_analyzed}")
        print(f"Total entries: {report.total_entries}")
        print(f"Complete: {report.complete_entries} ({report.overall_completeness_percentage:.1f}%)")
        print(f"Incomplete: {report.incomplete_entries}")
        print(f"Total missing executions: {report.total_missing_executions}")

        if args.output:
            print(f"\nReport saved to: {args.output}")

        if not args.summary_only and report.incomplete_entries > 0:
            print(f"\nIncomplete entries by cluster:")
            for cluster_report in report.cluster_reports:
                if cluster_report.incomplete_entries > 0:
                    print(f"  - {cluster_report.cluster_name}: {cluster_report.incomplete_entries} entries")
