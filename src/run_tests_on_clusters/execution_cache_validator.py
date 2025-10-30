#!/usr/bin/env python3
"""
Execution Cache Validator - Smart Re-execution Logic
=====================================================

This module implements "Smart Re-execution" logic for run_tests_on_cluster.py:
- Check 1: Validates existing output files
- Check 2: Restores from backup if available

Before queueing an entry for execution, checks:
1. Does valid output already exist?
2. Can we restore from backup?
3. Only execute if both checks fail

Author: Sustainable Code Refactoring Research Project
Date: 2025-10-28
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import shutil


class ExecutionStatus(Enum):
    """Status of execution cache check"""
    VALID_EXISTS = "valid_exists"  # Valid data exists, skip execution
    RESTORED_FROM_BACKUP = "restored_from_backup"  # Valid backup found and restored
    NEEDS_EXECUTION = "needs_execution"  # No valid data or backup, must execute


@dataclass
class CacheCheckResult:
    """Result of cache validation check"""
    status: ExecutionStatus
    reason: str
    has_valid_output: bool = False
    has_valid_backup: bool = False
    backup_path: Optional[Path] = None
    output_files_checked: List[str] = None

    def __post_init__(self):
        if self.output_files_checked is None:
            self.output_files_checked = []


class ExecutionCacheValidator:
    """
    Validates execution cache and implements smart re-execution logic

    This class checks whether an entry needs to be executed by:
    1. Checking if valid output already exists
    2. Checking if valid backup exists and can be restored
    3. Only queues for execution if both checks fail
    """

    def __init__(
        self,
        output_dir: Path,
        backup_dirs: Optional[List[Path]] = None,
        expected_runs: int = 5
    ):
        """
        Initialize validator

        Args:
            output_dir: Directory containing execution outputs
            backup_dirs: List of backup directories to check
            expected_runs: Expected number of runs per entry (default: 5)
        """
        self.output_dir = output_dir
        self.expected_runs = expected_runs

        # Default backup directories
        if backup_dirs is None:
            backup_dirs = []
            base_dir = output_dir.parent
            for backup_name in ["backup_executions", "execution_outputs_test_backup"]:
                backup_path = base_dir / backup_name
                if backup_path.exists():
                    backup_dirs.append(backup_path)

        self.backup_dirs = backup_dirs

        # Cache for loaded files
        self._file_cache: Dict[str, dict] = {}

    def _load_execution_file(self, filepath: Path) -> Optional[dict]:
        """Load execution file with caching"""
        filepath_str = str(filepath)

        if filepath_str in self._file_cache:
            return self._file_cache[filepath_str]

        if not filepath.exists():
            return None

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self._file_cache[filepath_str] = data
                return data
        except (json.JSONDecodeError, IOError):
            return None

    def _validate_entry_metrics(self, entry: dict) -> bool:
        """
        Validate that entry has valid metrics

        Args:
            entry: Entry dictionary from results file

        Returns:
            True if metrics are valid
        """
        # Check required fields
        required_fields = ["id", "language", "execution_time_ms", "CPU_usage", "RAM_usage"]

        for field in required_fields:
            if field not in entry:
                return False

        # Check metrics are not null/zero/invalid
        metrics = ["execution_time_ms", "CPU_usage", "RAM_usage"]

        for metric in metrics:
            value = entry.get(metric)

            # Check for null, zero, or negative values
            if value is None:
                return False
            if isinstance(value, (int, float)) and value <= 0:
                return False

        # Additional checks for specific metrics
        # CPU should be reasonable (0-100% per core, but can go higher with multiple cores)
        cpu_usage = entry.get("CPU_usage")
        if isinstance(cpu_usage, (int, float)) and (cpu_usage < 0 or cpu_usage > 1000):
            return False

        # RAM should be positive
        ram_usage = entry.get("RAM_usage")
        if isinstance(ram_usage, (int, float)) and ram_usage < 0:
            return False

        return True

    def _check_entry_in_file(self, entry_id: str, filepath: Path) -> Tuple[bool, bool]:
        """
        Check if entry exists and is valid in file

        Args:
            entry_id: Entry ID to check
            filepath: Path to results file

        Returns:
            (exists, is_valid) tuple
        """
        data = self._load_execution_file(filepath)

        if not data or "results" not in data:
            return False, False

        # Search for entry in all languages
        results_by_lang = data["results"]
        for lang_entries in results_by_lang.values():
            for entry in lang_entries:
                if entry.get("id") == entry_id:
                    # Found entry, now validate metrics
                    is_valid = self._validate_entry_metrics(entry)
                    return True, is_valid

        return False, False

    def check_valid_output_exists(
        self,
        cluster_name: str,
        entry_id: str,
        test_type: str = "base",
        prompt_version: int = 1
    ) -> CacheCheckResult:
        """
        Check 1: Does valid output already exist?

        Args:
            cluster_name: Cluster name
            entry_id: Entry ID
            test_type: "base" or "llm"
            prompt_version: Prompt version (for LLM only)

        Returns:
            CacheCheckResult
        """
        is_llm = test_type == "llm"
        files_checked = []
        valid_count = 0

        # Determine file pattern
        for run_num in range(1, self.expected_runs + 1):
            if is_llm:
                filename = f"{cluster_name}_results_v{prompt_version}_{run_num}.json"
            else:
                filename = f"{cluster_name}_results_{run_num}.json"

            filepath = self.output_dir / filename
            files_checked.append(filename)

            exists, is_valid = self._check_entry_in_file(entry_id, filepath)

            if exists and is_valid:
                valid_count += 1

        # All runs must be valid
        if valid_count == self.expected_runs:
            return CacheCheckResult(
                status=ExecutionStatus.VALID_EXISTS,
                reason=f"Valid data exists for all {self.expected_runs} runs",
                has_valid_output=True,
                output_files_checked=files_checked
            )
        elif valid_count > 0:
            return CacheCheckResult(
                status=ExecutionStatus.NEEDS_EXECUTION,
                reason=f"Only {valid_count}/{self.expected_runs} runs have valid data",
                has_valid_output=False,
                output_files_checked=files_checked
            )
        else:
            return CacheCheckResult(
                status=ExecutionStatus.NEEDS_EXECUTION,
                reason="No valid data found in output files",
                has_valid_output=False,
                output_files_checked=files_checked
            )

    def check_and_restore_from_backup(
        self,
        cluster_name: str,
        entry_id: str,
        test_type: str = "base",
        prompt_version: int = 1,
        dry_run: bool = False
    ) -> CacheCheckResult:
        """
        Check 2: Does valid backup exist? If yes, restore it.

        Args:
            cluster_name: Cluster name
            entry_id: Entry ID
            test_type: "base" or "llm"
            prompt_version: Prompt version (for LLM only)
            dry_run: If True, don't actually copy files

        Returns:
            CacheCheckResult
        """
        is_llm = test_type == "llm"

        # Check each backup directory
        for backup_dir in self.backup_dirs:
            if not backup_dir.exists():
                continue

            # Check if backup has valid data
            valid_count = 0
            files_to_restore = []

            for run_num in range(1, self.expected_runs + 1):
                if is_llm:
                    filename = f"{cluster_name}_results_v{prompt_version}_{run_num}.json"
                else:
                    filename = f"{cluster_name}_results_{run_num}.json"

                backup_filepath = backup_dir / filename
                exists, is_valid = self._check_entry_in_file(entry_id, backup_filepath)

                if exists and is_valid:
                    valid_count += 1
                    files_to_restore.append((backup_filepath, filename))

            # If all runs are valid in backup, restore
            if valid_count == self.expected_runs:
                if not dry_run:
                    # Restore files from backup to output_dir
                    for backup_filepath, filename in files_to_restore:
                        dest_path = self.output_dir / filename
                        shutil.copy2(backup_filepath, dest_path)

                return CacheCheckResult(
                    status=ExecutionStatus.RESTORED_FROM_BACKUP,
                    reason=f"Restored {len(files_to_restore)} files from backup: {backup_dir.name}",
                    has_valid_backup=True,
                    backup_path=backup_dir,
                    output_files_checked=[f[1] for f in files_to_restore]
                )

        # No valid backup found
        return CacheCheckResult(
            status=ExecutionStatus.NEEDS_EXECUTION,
            reason="No valid backup found",
            has_valid_backup=False
        )

    def should_execute_entry(
        self,
        cluster_name: str,
        entry_id: str,
        test_type: str = "base",
        prompt_version: int = 1,
        dry_run: bool = False
    ) -> CacheCheckResult:
        """
        Smart re-execution decision: Check cache, backup, then decide

        This is the main entry point for smart execution logic.

        Workflow:
        1. Check if valid output exists -> SKIP
        2. Check if valid backup exists -> RESTORE
        3. Otherwise -> EXECUTE

        Args:
            cluster_name: Cluster name
            entry_id: Entry ID
            test_type: "base" or "llm"
            prompt_version: Prompt version (for LLM only)
            dry_run: If True, don't actually restore files

        Returns:
            CacheCheckResult with recommended action
        """
        # Check 1: Valid output exists?
        check1 = self.check_valid_output_exists(
            cluster_name=cluster_name,
            entry_id=entry_id,
            test_type=test_type,
            prompt_version=prompt_version
        )

        if check1.status == ExecutionStatus.VALID_EXISTS:
            return check1

        # Check 2: Valid backup exists?
        check2 = self.check_and_restore_from_backup(
            cluster_name=cluster_name,
            entry_id=entry_id,
            test_type=test_type,
            prompt_version=prompt_version,
            dry_run=dry_run
        )

        if check2.status == ExecutionStatus.RESTORED_FROM_BACKUP:
            return check2

        # Both checks failed, needs execution
        return CacheCheckResult(
            status=ExecutionStatus.NEEDS_EXECUTION,
            reason="No valid output or backup found - execution required",
            has_valid_output=False,
            has_valid_backup=False
        )


# Convenience functions
def should_execute_entry(
    cluster_name: str,
    entry_id: str,
    test_type: str = "base",
    prompt_version: int = 1,
    output_dir: Optional[Path] = None,
    backup_dirs: Optional[List[Path]] = None,
    dry_run: bool = False
) -> CacheCheckResult:
    """
    Convenience function for smart execution check

    Args:
        cluster_name: Cluster name
        entry_id: Entry ID
        test_type: "base" or "llm"
        prompt_version: Prompt version (for LLM only)
        output_dir: Output directory (auto-detected if None)
        backup_dirs: Backup directories (auto-detected if None)
        dry_run: If True, don't actually restore files

    Returns:
        CacheCheckResult
    """
    if output_dir is None:
        output_dir = Path(__file__).parent.parent / "execution_outputs"

    validator = ExecutionCacheValidator(
        output_dir=output_dir,
        backup_dirs=backup_dirs
    )

    return validator.should_execute_entry(
        cluster_name=cluster_name,
        entry_id=entry_id,
        test_type=test_type,
        prompt_version=prompt_version,
        dry_run=dry_run
    )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Test execution cache validation and backup restore"
    )
    parser.add_argument("cluster_name", help="Cluster name")
    parser.add_argument("entry_id", help="Entry ID")
    parser.add_argument(
        "--test-type",
        default="base",
        choices=["base", "llm"],
        help="Test type"
    )
    parser.add_argument(
        "--prompt-version",
        type=int,
        default=1,
        help="Prompt version (for LLM only)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Don't actually restore files"
    )

    args = parser.parse_args()

    result = should_execute_entry(
        cluster_name=args.cluster_name,
        entry_id=args.entry_id,
        test_type=args.test_type,
        prompt_version=args.prompt_version,
        dry_run=args.dry_run
    )

    print(f"\nStatus: {result.status.value}")
    print(f"Reason: {result.reason}")
    print(f"Has valid output: {result.has_valid_output}")
    print(f"Has valid backup: {result.has_valid_backup}")

    if result.backup_path:
        print(f"Backup path: {result.backup_path}")

    if result.output_files_checked:
        print(f"Files checked: {len(result.output_files_checked)}")

    # Print recommendation
    if result.status == ExecutionStatus.VALID_EXISTS:
        print("\n✅ SKIP execution - valid data exists")
    elif result.status == ExecutionStatus.RESTORED_FROM_BACKUP:
        print("\n✅ RESTORED from backup - skip execution")
    else:
        print("\n⚠️  QUEUE for execution")
