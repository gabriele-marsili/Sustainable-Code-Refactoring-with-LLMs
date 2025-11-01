"""
Remove entries with empty source files from cluster JSONs

Entries with characterQuantity: 0 indicate that the source file was empty
during ingestion, which represents an ingestion error that should be removed.
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


def remove_empty_entries_from_cluster(cluster_file: Path) -> dict:
    """
    Remove entries with empty source files (characterQuantity == 0)

    Returns:
        Statistics about removals
    """
    stats = {
        'entries_checked': 0,
        'entries_removed': 0,
        'removed_ids': []
    }

    try:
        cluster_data = read_json(cluster_file)
        modified = False

        for language, entries in cluster_data.items():
            # Filter out entries with characterQuantity == 0
            original_count = len(entries)

            filtered_entries = []
            for entry in entries:
                stats['entries_checked'] += 1

                char_quantity = entry.get('characterQuantity', -1)

                if char_quantity == 0:
                    # Empty file - remove this entry
                    entry_id = entry.get('id', 'unknown')
                    stats['entries_removed'] += 1
                    stats['removed_ids'].append(entry_id)
                    modified = True
                    logger.warning(f"  Removing empty entry: {entry_id}")
                else:
                    filtered_entries.append(entry)

            # Update the entries list
            cluster_data[language] = filtered_entries

            if len(filtered_entries) < original_count:
                logger.info(f"  {language}: {original_count} → {len(filtered_entries)} entries")

        # Save if any changes were made
        if modified:
            write_json(cluster_file, cluster_data)
            logger.info(f"✅ Saved {cluster_file.name}")

        return stats

    except Exception as e:
        logger.error(f"❌ Error processing {cluster_file.name}: {e}")
        return stats


def main():
    """Remove empty entries from all cluster files"""
    logger.info("="*60)
    logger.info("Empty Entry Remover")
    logger.info("="*60)
    logger.info("Removing entries with empty source files (characterQuantity == 0)...")
    logger.info("")

    clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
    cluster_files = list(clusters_dir.glob("cluster_*.json"))

    logger.info(f"Found {len(cluster_files)} cluster files")
    logger.info("")

    total_stats = {
        'files_processed': 0,
        'files_modified': 0,
        'entries_checked': 0,
        'entries_removed': 0,
        'removed_ids': []
    }

    for cluster_file in sorted(cluster_files):
        stats = remove_empty_entries_from_cluster(cluster_file)

        total_stats['files_processed'] += 1
        total_stats['entries_checked'] += stats['entries_checked']
        total_stats['entries_removed'] += stats['entries_removed']
        total_stats['removed_ids'].extend(stats['removed_ids'])

        if stats['entries_removed'] > 0:
            total_stats['files_modified'] += 1

        if stats['entries_removed'] > 0:
            logger.info("")

    # Print summary
    logger.info("="*60)
    logger.info("SUMMARY")
    logger.info("="*60)
    logger.info(f"Files processed: {total_stats['files_processed']}")
    logger.info(f"Files modified: {total_stats['files_modified']}")
    logger.info(f"Entries checked: {total_stats['entries_checked']}")
    logger.info(f"Entries removed: {total_stats['entries_removed']}")

    if total_stats['removed_ids']:
        logger.info(f"\nRemoved entries:")
        for entry_id in total_stats['removed_ids']:
            logger.info(f"  - {entry_id}")

    logger.info("="*60)

    if total_stats['entries_removed'] > 0:
        logger.info("✅ Empty entries have been removed")
    else:
        logger.info("✅ No empty entries found")


if __name__ == "__main__":
    main()
