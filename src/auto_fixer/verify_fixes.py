#!/usr/bin/env python3
"""
Verifies that the selective re-execution fixed the problematic entries.
Compares before/after statistics.
"""

import json
import sys
from pathlib import Path
from datetime import datetime

sys.path.insert(0, str(Path(__file__).parent))
from identify_problematic_entries import analyze_execution_results


def load_previous_stats():
    """Load statistics from previous analysis."""
    csv_file = Path(__file__).parent / "problematic_c_cpp_entries.csv"
    if not csv_file.exists():
        return None

    # Count lines in CSV (minus header)
    with open(csv_file, 'r') as f:
        total_lines = sum(1 for _ in f) - 1

    return {
        'total_problematic': total_lines,
        'timestamp': datetime.fromtimestamp(csv_file.stat().st_mtime)
    }


def main():
    """Main verification function."""
    print("=" * 80)
    print("VERIFICATION: CHECKING IF PROBLEMS WERE FIXED")
    print("=" * 80)
    print()

    # Load previous statistics
    previous = load_previous_stats()
    if previous:
        print("Previous Analysis:")
        print(f"  Total problematic entries: {previous['total_problematic']}")
        print(f"  Analysis date: {previous['timestamp'].strftime('%Y-%m-%d %H:%M:%S')}")
        print()

    print("Analyzing current execution results...")
    print()

    # Analyze current state
    problematic_entries, df = analyze_execution_results()

    current_total = len(problematic_entries)
    unique_count = df.groupby(['cluster_name', 'entry_id']).ngroups if not df.empty else 0

    print("=" * 80)
    print("CURRENT ANALYSIS")
    print("=" * 80)
    print(f"Total problematic entries (all runs): {current_total}")
    print(f"Unique problematic entries: {unique_count}")
    print()

    if previous:
        improvement = previous['total_problematic'] - current_total
        improvement_pct = (improvement / previous['total_problematic'] * 100) if previous['total_problematic'] > 0 else 0

        print("=" * 80)
        print("IMPROVEMENT")
        print("=" * 80)
        print(f"Entries fixed: {improvement}")
        print(f"Improvement: {improvement_pct:.1f}%")
        print()

        if current_total == 0:
            print("✓ SUCCESS! All problematic entries have been fixed!")
        elif improvement > 0:
            print(f"✓ PROGRESS! {improvement} entries fixed.")
            print(f"⚠ Still {current_total} problematic entries remaining.")
            print("\nRemaining problematic clusters:")
            if not df.empty:
                cluster_counts = df.groupby('cluster_name').size().sort_values(ascending=False).head(10)
                for cluster, count in cluster_counts.items():
                    print(f"  - {cluster}: {count} entries")
        else:
            print("⚠ No improvement detected.")
            print("This might mean:")
            print("  1. The re-execution hasn't been run yet")
            print("  2. The re-execution didn't complete successfully")
            print("  3. There are still issues with the time wrapper")

    print()
    print("=" * 80)

    if current_total > 0:
        print("\nTo fix remaining issues, run:")
        print("  python3 rerun_problematic_entries.py")
        print("\nOr for specific cluster:")
        print("  python3 rerun_problematic_entries.py --cluster CLUSTER_NAME")


if __name__ == "__main__":
    main()
