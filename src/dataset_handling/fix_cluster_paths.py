"""
Fix cluster JSON paths for entries created by github_ingestor.py

The ingestor incorrectly saved full file paths instead of just directories:
- Wrong: "c/space-age_exercism-leleah/src/space_age.c"
- Correct: "c/space-age_exercism-leleah/src"

This script fixes all affected entries in cluster JSON files.
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir.general_utils import read_json, write_json
from utility_dir import utility_paths
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def fix_path_if_needed(path: str) -> tuple[str, bool]:
    """
    Remove filename from path if present

    Args:
        path: Path that might include filename

    Returns:
        (corrected_path, was_modified)
    """
    # Split path
    parts = path.split("/")

    if len(parts) < 3:
        return path, False

    # Check if last part is a filename (has extension)
    last_part = parts[-1]

    # Common C/C++ extensions
    extensions = ['.c', '.cpp', '.h', '.hpp']
    has_extension = any(last_part.endswith(ext) for ext in extensions)

    if has_extension:
        # Remove filename, keep only directory
        corrected = "/".join(parts[:-1])
        return corrected, True

    return path, False


def fix_cluster_file(cluster_file: Path) -> dict:
    """
    Fix paths in a single cluster file

    Returns:
        Statistics about the fixes
    """
    stats = {
        'entries_checked': 0,
        'code_paths_fixed': 0,
        'test_paths_fixed': 0,
        'entries_modified': 0
    }

    try:
        cluster_data = read_json(cluster_file)
        modified = False

        for language, entries in cluster_data.items():
            for entry in entries:
                stats['entries_checked'] += 1
                entry_modified = False

                # Fix codeSnippetFilePath
                if 'codeSnippetFilePath' in entry:
                    original = entry['codeSnippetFilePath']
                    fixed, was_fixed = fix_path_if_needed(original)

                    if was_fixed:
                        entry['codeSnippetFilePath'] = fixed
                        stats['code_paths_fixed'] += 1
                        entry_modified = True
                        logger.info(f"  Fixed code path: {original} → {fixed}")

                # Fix testUnitFilePath
                if 'testUnitFilePath' in entry:
                    original = entry['testUnitFilePath']
                    fixed, was_fixed = fix_path_if_needed(original)

                    if was_fixed:
                        entry['testUnitFilePath'] = fixed
                        stats['test_paths_fixed'] += 1
                        entry_modified = True
                        logger.info(f"  Fixed test path: {original} → {fixed}")

                if entry_modified:
                    stats['entries_modified'] += 1
                    modified = True

        # Save if any changes were made
        if modified:
            write_json(cluster_file, cluster_data)
            logger.info(f"✅ Saved {cluster_file.name}")

        return stats

    except Exception as e:
        logger.error(f"❌ Error processing {cluster_file.name}: {e}")
        return stats


def main():
    """Fix all cluster files"""
    logger.info("="*60)
    logger.info("Cluster Path Fixer")
    logger.info("="*60)
    logger.info("Fixing paths in cluster JSON files...")
    logger.info("")

    clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
    cluster_files = list(clusters_dir.glob("cluster_*.json"))

    logger.info(f"Found {len(cluster_files)} cluster files")
    logger.info("")

    total_stats = {
        'files_processed': 0,
        'files_modified': 0,
        'entries_checked': 0,
        'code_paths_fixed': 0,
        'test_paths_fixed': 0,
        'entries_modified': 0
    }

    for cluster_file in sorted(cluster_files):
        logger.info(f"Processing: {cluster_file.name}")

        stats = fix_cluster_file(cluster_file)

        total_stats['files_processed'] += 1
        total_stats['entries_checked'] += stats['entries_checked']
        total_stats['code_paths_fixed'] += stats['code_paths_fixed']
        total_stats['test_paths_fixed'] += stats['test_paths_fixed']
        total_stats['entries_modified'] += stats['entries_modified']

        if stats['entries_modified'] > 0:
            total_stats['files_modified'] += 1

        logger.info("")

    # Print summary
    logger.info("="*60)
    logger.info("SUMMARY")
    logger.info("="*60)
    logger.info(f"Files processed: {total_stats['files_processed']}")
    logger.info(f"Files modified: {total_stats['files_modified']}")
    logger.info(f"Entries checked: {total_stats['entries_checked']}")
    logger.info(f"Entries modified: {total_stats['entries_modified']}")
    logger.info(f"Code paths fixed: {total_stats['code_paths_fixed']}")
    logger.info(f"Test paths fixed: {total_stats['test_paths_fixed']}")
    logger.info("="*60)

    if total_stats['entries_modified'] > 0:
        logger.info("✅ Cluster files have been corrected")
    else:
        logger.info("✅ No corrections needed - all paths are already correct")


if __name__ == "__main__":
    main()
