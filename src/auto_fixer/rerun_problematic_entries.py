#!/usr/bin/env python3
"""
Re-executes only specific problematic C/C++ entries with fixed time wrapper.
This script selectively re-runs entries that had invalid metrics in previous runs.
"""

import json
import os
import sys
import subprocess
import argparse
from pathlib import Path
from typing import Dict, List, Set
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))
from utility_dir import utility_paths

CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
RERUN_CONFIG = Path(__file__).parent / "entries_to_rerun.json"


def load_rerun_config() -> Dict[str, List[Dict]]:
    """Load the configuration of entries to re-run."""
    if not RERUN_CONFIG.exists():
        print(f"Error: Configuration file not found: {RERUN_CONFIG}")
        print("Please run identify_problematic_entries.py first.")
        sys.exit(1)

    with open(RERUN_CONFIG, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_cluster_languages(cluster_name: str) -> Set[str]:
    """Get all languages in a cluster."""
    cluster_file = CLUSTERS_DIR / f"cluster_{cluster_name}.json"
    if not cluster_file.exists():
        return set()

    with open(cluster_file, 'r', encoding='utf-8') as f:
        cluster_data = json.load(f)

    languages = set()
    for lang in ['c', 'cpp', 'python', 'java', 'javascript', 'typescript', 'go', 'rust']:
        if lang in cluster_data and cluster_data[lang]:
            languages.add(lang)

    return languages


def filter_entries_by_language(entry_ids: List[str], target_language: str) -> List[str]:
    """Filter entry IDs to only include those of a specific language."""
    filtered = []
    for entry_id in entry_ids:
        # Entry ID format: language_exercise_source
        entry_lang = entry_id.split('_')[0].lower()
        if entry_lang == target_language.lower():
            filtered.append(entry_id)
    return filtered


def run_cluster_for_entries(
    cluster_name: str,
    entry_ids: List[str],
    num_executions: int = 5,
    overwrite: bool = True,
    dry_run: bool = False
) -> bool:
    """
    Run tests for specific entries in a cluster.

    Args:
        cluster_name: Name of the cluster
        entry_ids: List of entry IDs to execute
        num_executions: Number of executions per entry
        overwrite: Whether to overwrite existing results
        dry_run: If True, only print what would be executed

    Returns:
        True if successful, False otherwise
    """
    # Get languages for this cluster
    cluster_languages = get_cluster_languages(cluster_name)

    # Filter entries by language (only C/C++)
    c_entries = filter_entries_by_language(entry_ids, 'c')
    cpp_entries = filter_entries_by_language(entry_ids, 'cpp')

    # Determine which languages to run
    languages_to_run = []
    if c_entries and 'c' in cluster_languages:
        languages_to_run.append('c')
    if cpp_entries and 'cpp' in cluster_languages:
        languages_to_run.append('cpp')

    if not languages_to_run:
        print(f"  ⚠ No C/C++ entries to re-run in cluster {cluster_name}")
        return True

    # Build command
    cmd = [
        'python3',
        str(Path(__file__).parent.parent / 'run_tests_on_clusters' / 'run_tests_on_cluster.py'),
        '--cluster-name', cluster_name,
        '--run-quantity', str(num_executions),
        '--languages', ','.join(languages_to_run),
        '--full'  # Run both base and LLM versions
    ]

    if overwrite:
        cmd.append('--overwrite-results')

    if dry_run:
        print(f"  Would execute: {' '.join(cmd)}")
        return True

    print(f"  Executing: {' '.join(cmd)}")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=600  # 10 minutes timeout per cluster
        )

        if result.returncode == 0:
            print(f"  ✓ Successfully re-executed {cluster_name}")
            return True
        else:
            print(f"  ✗ Failed to re-execute {cluster_name}")
            print(f"    Error: {result.stderr[:200]}")
            return False

    except subprocess.TimeoutExpired:
        print(f"  ✗ Timeout while re-executing {cluster_name}")
        return False
    except Exception as e:
        print(f"  ✗ Error re-executing {cluster_name}: {e}")
        return False


def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(
        description='Re-execute only problematic C/C++ entries'
    )
    parser.add_argument(
        '--num-executions',
        type=int,
        default=5,
        help='Number of executions per entry (default: 5)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Print what would be executed without actually running'
    )
    parser.add_argument(
        '--no-overwrite',
        action='store_true',
        help='Do not overwrite existing results'
    )
    parser.add_argument(
        '--cluster',
        type=str,
        help='Only re-run a specific cluster'
    )
    parser.add_argument(
        '--limit',
        type=int,
        help='Limit to first N clusters'
    )

    args = parser.parse_args()

    print("=" * 80)
    print("RE-EXECUTING PROBLEMATIC C/C++ ENTRIES")
    print("=" * 80)
    print()

    # Load configuration
    rerun_config = load_rerun_config()

    print(f"Found {len(rerun_config)} clusters with problematic entries")

    total_entries = sum(len(entries) for entries in rerun_config.values())
    print(f"Total problematic entries: {total_entries}")
    print()

    if args.dry_run:
        print("⚠ DRY RUN MODE - No actual execution")
        print()

    # Filter to specific cluster if requested
    if args.cluster:
        if args.cluster in rerun_config:
            rerun_config = {args.cluster: rerun_config[args.cluster]}
            print(f"Running only cluster: {args.cluster}")
        else:
            print(f"Error: Cluster '{args.cluster}' not found in configuration")
            sys.exit(1)

    # Apply limit if requested
    if args.limit:
        clusters = list(rerun_config.keys())[:args.limit]
        rerun_config = {k: v for k, v in rerun_config.items() if k in clusters}
        print(f"Limited to first {args.limit} clusters")

    print()
    print("=" * 80)
    print(f"Starting re-execution at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)
    print()

    # Execute clusters
    successful = 0
    failed = 0

    for i, (cluster_name, entries) in enumerate(rerun_config.items(), 1):
        entry_ids = [e['entry_id'] for e in entries]

        print(f"[{i}/{len(rerun_config)}] Cluster: {cluster_name}")
        print(f"  Entries to re-run: {len(entry_ids)}")

        success = run_cluster_for_entries(
            cluster_name,
            entry_ids,
            num_executions=args.num_executions,
            overwrite=not args.no_overwrite,
            dry_run=args.dry_run
        )

        if success:
            successful += 1
        else:
            failed += 1

        print()

    # Summary
    print("=" * 80)
    print("EXECUTION SUMMARY")
    print("=" * 80)
    print(f"Total clusters processed: {len(rerun_config)}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Success rate: {successful / len(rerun_config) * 100:.1f}%")
    print()
    print(f"Completed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()


if __name__ == "__main__":
    main()
