#!/usr/bin/env python3
"""
Find clusters containing new C/C++ entries from GitHub ingestion.

This script identifies clusters that have C/C++ entries with source starting
with "exercism-" (indicating they were added via github_ingestor.py) and have
completed LLM generation (12 variants).

Output: Space-separated list of cluster names (without "cluster_" prefix)
"""

import sys
import os
from pathlib import Path

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir.general_utils import read_json
from utility_dir import utility_paths


def find_new_c_cpp_clusters(min_llm_variants: int = 12) -> list:
    """
    Find clusters with new C/C++ entries that have completed LLM generation.

    Args:
        min_llm_variants: Minimum number of LLM variants required (default: 12)

    Returns:
        List of cluster names (without cluster_ prefix)
    """
    clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
    cluster_files = sorted(clusters_dir.glob("cluster_*.json"))

    target_clusters = []

    for cluster_file in cluster_files:
        cluster_name = cluster_file.stem.replace("cluster_", "")

        try:
            cluster_data = read_json(cluster_file)

            # Check C and C++ entries
            has_new_entries = False

            for language in ['c', 'cpp']:
                if language not in cluster_data:
                    continue

                for entry in cluster_data[language]:
                    source = entry.get('source', '')
                    llms_count = len(entry.get('LLMs', []))

                    # Check if it's a new entry from GitHub ingestor
                    # with completed LLM generation
                    if source.startswith('exercism-') and llms_count >= min_llm_variants:
                        has_new_entries = True
                        break

                if has_new_entries:
                    break

            if has_new_entries:
                target_clusters.append(cluster_name)

        except Exception as e:
            print(f"Warning: Error processing {cluster_file.name}: {e}", file=sys.stderr)
            continue

    return target_clusters


def main():
    """Main entry point"""
    import argparse

    parser = argparse.ArgumentParser(
        description='Find clusters with new C/C++ entries ready for testing'
    )
    parser.add_argument(
        '--min-llms',
        type=int,
        default=12,
        help='Minimum number of LLM variants required (default: 12)'
    )
    parser.add_argument(
        '--format',
        choices=['space', 'newline', 'count'],
        default='space',
        help='Output format: space-separated, newline-separated, or count only'
    )
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Print detailed information to stderr'
    )

    args = parser.parse_args()

    clusters = find_new_c_cpp_clusters(min_llm_variants=args.min_llms)

    if args.verbose:
        print(f"Found {len(clusters)} clusters with new C/C++ entries:", file=sys.stderr)
        for cluster in clusters:
            print(f"  - {cluster}", file=sys.stderr)
        print("", file=sys.stderr)

    # Output to stdout (for script capture)
    if args.format == 'space':
        print(' '.join(clusters))
    elif args.format == 'newline':
        for cluster in clusters:
            print(cluster)
    elif args.format == 'count':
        print(len(clusters))


if __name__ == "__main__":
    main()
