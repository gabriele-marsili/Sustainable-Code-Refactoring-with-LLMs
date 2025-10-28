#!/usr/bin/env python3
"""
Identifies specific C/C++ entries with problematic execution results.
Creates a detailed list of entries that need to be re-executed.
"""

import json
import os
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple
import pandas as pd

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))
from utility_dir import utility_paths

OUTPUT_DIR = utility_paths.OUTPUT_DIR_FILEPATH
CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH


def load_cluster_metadata(cluster_name: str) -> Dict:
    """Load cluster metadata JSON file."""
    cluster_file = CLUSTERS_DIR / f"cluster_{cluster_name}.json"
    if not cluster_file.exists():
        return {}

    with open(cluster_file, 'r', encoding='utf-8') as f:
        return json.load(f)


def has_invalid_metrics(entry: Dict) -> bool:
    """Check if an entry has invalid or suspicious metrics."""
    cpu = entry.get('CPU_usage')
    ram = entry.get('RAM_usage')
    time_ms = entry.get('execution_time_ms')
    passed = entry.get('regressionTestPassed')

    # Check for invalid values
    if cpu is None or ram is None or time_ms is None:
        return True

    # Convert to numeric if needed
    try:
        cpu = float(cpu) if isinstance(cpu, str) else cpu
        ram = int(ram) if isinstance(ram, str) else ram
        time_ms = int(time_ms) if isinstance(time_ms, str) else time_ms
    except (ValueError, TypeError):
        return True

    if cpu == 0.0 or ram == 0 or time_ms == 0:
        return True

    # Check for suspicious patterns
    if cpu < 0 or ram < 0 or time_ms < 0:
        return True

    # Test failed
    if passed is False:
        return True

    return False


def analyze_execution_results() -> Tuple[List[Dict], pd.DataFrame]:
    """
    Analyze all execution results and identify problematic C/C++ entries.

    Returns:
        Tuple of (list of problematic entries, DataFrame for analysis)
    """
    problematic_entries = []

    # Get all execution output files
    output_files = list(OUTPUT_DIR.glob("*_results_*.json"))

    print(f"Found {len(output_files)} execution output files")
    print("Analyzing for problematic C/C++ entries...\n")

    for output_file in output_files:
        # Parse filename to extract cluster name and run info
        filename = output_file.stem

        # Extract cluster name (everything before _results_)
        if "_results_v" in filename:
            # LLM version: cluster_name_results_v1_1.json
            cluster_name = filename.split("_results_v")[0]
            version_part = filename.split("_results_v")[1]
            prompt_version = f"v{version_part.split('_')[0]}"
            run_number = version_part.split('_')[1] if '_' in version_part else '1'
            is_base = False
        else:
            # Base version: cluster_name_results_1.json
            cluster_name = filename.split("_results_")[0]
            prompt_version = "base"
            run_number = filename.split("_results_")[1]
            is_base = True

        # Load execution results
        try:
            with open(output_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception as e:
            print(f"Error loading {output_file}: {e}")
            continue

        # Extract results (may be nested under 'results' key)
        if isinstance(data, dict) and 'results' in data:
            results_by_lang = data['results']
        elif isinstance(data, dict):
            results_by_lang = data
        else:
            continue

        # Load cluster metadata to check languages
        cluster_metadata = load_cluster_metadata(cluster_name)
        if not cluster_metadata:
            continue

        # Check each entry in results (iterate through languages)
        for lang, entries in results_by_lang.items():
            if not isinstance(entries, list):
                continue

            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue

                # Find corresponding metadata entry
                metadata_entry = None
                for lang_key in ['c', 'cpp', 'python', 'java', 'javascript', 'typescript', 'go', 'rust']:
                    if lang_key in cluster_metadata:
                        for meta in cluster_metadata[lang_key]:
                            if meta.get('id') == entry_id:
                                metadata_entry = meta
                                break
                        if metadata_entry:
                            break

                if not metadata_entry:
                    continue

                language = metadata_entry.get('language', '').lower()

                # Focus on C/C++ entries
                if language not in ['c', 'cpp']:
                    continue

                # Check if entry has invalid metrics
                if has_invalid_metrics(entry):
                    problematic_entries.append({
                        'cluster_name': cluster_name,
                        'entry_id': entry_id,
                        'language': language,
                        'filename': metadata_entry.get('filename', 'unknown'),
                        'prompt_version': prompt_version,
                        'run_number': run_number,
                        'is_base': is_base,
                        'cpu_usage': entry.get('CPU_usage'),
                        'ram_usage': entry.get('RAM_usage'),
                        'execution_time_ms': entry.get('execution_time_ms'),
                        'test_passed': entry.get('regressionTestPassed'),
                        'output_file': str(output_file.name)
                    })

    # Create DataFrame for analysis
    df = pd.DataFrame(problematic_entries)

    return problematic_entries, df


def main():
    """Main execution function."""
    print("=" * 80)
    print("IDENTIFYING PROBLEMATIC C/C++ ENTRIES")
    print("=" * 80)
    print()

    # Analyze results
    problematic_entries, df = analyze_execution_results()

    if df.empty:
        print("No problematic C/C++ entries found!")
        return

    print(f"Found {len(problematic_entries)} problematic C/C++ entries")
    print()

    # Statistics by cluster
    print("=" * 80)
    print("PROBLEMATIC ENTRIES BY CLUSTER")
    print("=" * 80)
    cluster_stats = df.groupby('cluster_name').agg({
        'entry_id': 'count',
        'language': lambda x: ', '.join(sorted(set(x)))
    }).rename(columns={'entry_id': 'count', 'language': 'languages'})

    print(cluster_stats.sort_values('count', ascending=False).to_string())
    print()

    # Statistics by version
    print("=" * 80)
    print("PROBLEMATIC ENTRIES BY VERSION")
    print("=" * 80)
    version_stats = df.groupby('prompt_version').size()
    print(version_stats.to_string())
    print()

    # Statistics by language
    print("=" * 80)
    print("PROBLEMATIC ENTRIES BY LANGUAGE")
    print("=" * 80)
    language_stats = df.groupby('language').size()
    print(language_stats.to_string())
    print()

    # Unique entries (across all runs and versions)
    unique_entries = df.groupby(['cluster_name', 'entry_id', 'language']).size().reset_index()[['cluster_name', 'entry_id', 'language']]

    print("=" * 80)
    print("UNIQUE PROBLEMATIC ENTRIES (ACROSS ALL RUNS)")
    print("=" * 80)
    print(f"Total unique entries: {len(unique_entries)}")
    print()

    # Save results
    output_csv = Path(__file__).parent / "problematic_c_cpp_entries.csv"
    df.to_csv(output_csv, index=False)
    print(f"Saved detailed list to: {output_csv}")

    # Save unique entries list
    unique_csv = Path(__file__).parent / "unique_problematic_entries.csv"
    unique_entries.to_csv(unique_csv, index=False)
    print(f"Saved unique entries list to: {unique_csv}")

    # Create JSON for re-execution script
    rerun_data = {}
    for _, row in unique_entries.iterrows():
        cluster = row['cluster_name']
        if cluster not in rerun_data:
            rerun_data[cluster] = []
        rerun_data[cluster].append({
            'entry_id': row['entry_id'],
            'language': row['language']
        })

    rerun_json = Path(__file__).parent / "entries_to_rerun.json"
    with open(rerun_json, 'w', encoding='utf-8') as f:
        json.dump(rerun_data, f, indent=2)
    print(f"Saved re-run configuration to: {rerun_json}")
    print()

    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total problematic entries (all runs): {len(problematic_entries)}")
    print(f"Unique problematic entries: {len(unique_entries)}")
    print(f"Clusters affected: {len(rerun_data)}")
    print()


if __name__ == "__main__":
    main()
