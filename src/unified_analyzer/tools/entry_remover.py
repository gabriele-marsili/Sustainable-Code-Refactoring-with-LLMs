#!/usr/bin/env python3
"""
Entry Remover - Remove problematic base entries from cluster files

This script:
1. Reads a removal list JSON file
2. Filters for base entries only
3. Removes them from cluster JSON files
4. Creates backups before modification
5. Generates detailed removal report

Author: Sustainable Code Refactoring Research Project
Date: 2025-10-30
"""

import json
import sys
import os
from pathlib import Path
from typing import Dict, List, Tuple
from datetime import datetime
from collections import defaultdict
import shutil

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.progress import track
    RICH_AVAILABLE = True
    console = Console()
except ImportError:
    RICH_AVAILABLE = False
    console = None


class EntryRemover:
    """Remove problematic base entries from cluster files and execution outputs"""

    def __init__(
        self,
        clusters_dir: Path,
        execution_outputs_dir: Path = None,
        backup_dir: Path = None,
        dry_run: bool = False,
        remove_execution_outputs: bool = False
    ):
        """
        Initialize entry remover

        Args:
            clusters_dir: Directory containing cluster JSON files
            execution_outputs_dir: Directory containing execution output files
            backup_dir: Directory for backups (default: clusters_dir/backups)
            dry_run: If True, simulate without making changes
            remove_execution_outputs: If True, also remove execution output files
        """
        self.clusters_dir = Path(clusters_dir)
        self.execution_outputs_dir = Path(execution_outputs_dir) if execution_outputs_dir else self.clusters_dir.parent / "execution_outputs"
        self.backup_dir = Path(backup_dir) if backup_dir else self.clusters_dir / "backups"
        self.dry_run = dry_run
        self.remove_execution_outputs = remove_execution_outputs

        # Stats
        self.stats = {
            'clusters_processed': 0,
            'clusters_modified': 0,
            'entries_removed': 0,
            'entries_kept': 0,
            'execution_files_removed': 0,
            'execution_files_kept': 0,
            'by_language': defaultdict(int),
            'by_cluster': defaultdict(int)
        }

    def _log(self, message: str, style: str = "info"):
        """Log message"""
        if console:
            if style == "success":
                console.print(f"[green]{message}[/green]")
            elif style == "error":
                console.print(f"[red]{message}[/red]")
            elif style == "warning":
                console.print(f"[yellow]{message}[/yellow]")
            else:
                console.print(f"[cyan]{message}[/cyan]")
        else:
            print(message)

    def load_removal_list(self, removal_list_path: Path) -> List[Dict]:
        """
        Load removal list from JSON file

        Args:
            removal_list_path: Path to removal list JSON

        Returns:
            List of entries to remove
        """
        if not removal_list_path.exists():
            raise FileNotFoundError(f"Removal list not found: {removal_list_path}")

        with open(removal_list_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        entries = data.get('entries', [])
        self._log(f"Loaded {len(entries)} entries from removal list")

        # Filter for base entries only
        base_entries = [e for e in entries if e.get('test_type') == 'base']
        self._log(f"Filtered to {len(base_entries)} base entries", "info")

        return base_entries

    def create_backup(self, cluster_file: Path) -> Path:
        """
        Create backup of cluster file

        Args:
            cluster_file: Cluster file to backup

        Returns:
            Path to backup file
        """
        if self.dry_run:
            return cluster_file

        # Create backup directory with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_subdir = self.backup_dir / timestamp
        backup_subdir.mkdir(parents=True, exist_ok=True)

        # Copy file
        backup_file = backup_subdir / cluster_file.name
        shutil.copy2(cluster_file, backup_file)

        return backup_file

    def remove_entries_from_cluster(
        self,
        cluster_name: str,
        entries_to_remove: List[Dict]
    ) -> Tuple[int, int]:
        """
        Remove entries from a cluster file

        Args:
            cluster_name: Name of the cluster
            entries_to_remove: List of entries to remove (already filtered for this cluster)

        Returns:
            Tuple of (entries_removed, entries_kept)
        """
        cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"

        if not cluster_file.exists():
            self._log(f"Cluster file not found: {cluster_file.name}", "warning")
            return (0, 0)

        # Load cluster data
        with open(cluster_file, 'r', encoding='utf-8') as f:
            cluster_data = json.load(f)

        # Create set of entry IDs to remove for faster lookup
        ids_to_remove = {entry['entry_id'] for entry in entries_to_remove}

        # Process each language
        modified = False
        removed_count = 0
        kept_count = 0

        for language, entries in cluster_data.items():
            if not isinstance(entries, list):
                continue

            # Filter out entries to remove
            original_count = len(entries)
            filtered_entries = [
                entry for entry in entries
                if entry.get('id') not in ids_to_remove
            ]
            new_count = len(filtered_entries)

            # Update cluster data
            cluster_data[language] = filtered_entries

            # Update stats
            language_removed = original_count - new_count
            if language_removed > 0:
                modified = True
                removed_count += language_removed
                self.stats['by_language'][language] += language_removed

            kept_count += new_count

        # Save if modified
        if modified:
            if not self.dry_run:
                # Create backup first
                backup_file = self.create_backup(cluster_file)
                self._log(f"  Backup created: {backup_file.name}", "info")

                # Write modified data
                with open(cluster_file, 'w', encoding='utf-8') as f:
                    json.dump(cluster_data, f, indent=2, ensure_ascii=False)

                self._log(f"  Removed {removed_count} entries from {cluster_file.name}", "success")
            else:
                self._log(f"  [DRY RUN] Would remove {removed_count} entries from {cluster_file.name}", "warning")

            self.stats['clusters_modified'] += 1
            self.stats['by_cluster'][cluster_name] = removed_count

        return (removed_count, kept_count)

    def find_execution_files_for_entry(self, cluster_name: str, entry_id: str) -> List[Path]:
        """
        Find all execution output files for a specific entry (base + LLM versions)

        Args:
            cluster_name: Name of the cluster
            entry_id: Entry ID to find files for

        Returns:
            List of execution output file paths
        """
        if not self.execution_outputs_dir.exists():
            return []

        files_found = []

        # Pattern for base files: {cluster}_results_{1-5}.json
        for i in range(1, 6):
            base_file = self.execution_outputs_dir / f"{cluster_name}_results_{i}.json"
            if base_file.exists():
                files_found.append(base_file)

        # Pattern for LLM files: {cluster}_results_v{1-4}_{1-5}.json
        for version in range(1, 5):
            for run in range(1, 6):
                llm_file = self.execution_outputs_dir / f"{cluster_name}_results_v{version}_{run}.json"
                if llm_file.exists():
                    files_found.append(llm_file)

        return files_found

    def remove_entry_from_execution_file(self, file_path: Path, entry_id: str) -> bool:
        """
        Remove a specific entry from an execution output file

        Args:
            file_path: Path to execution output JSON file
            entry_id: Entry ID to remove

        Returns:
            True if file was modified, False otherwise
        """
        if not file_path.exists():
            return False

        try:
            # Load execution data
            with open(file_path, 'r', encoding='utf-8') as f:
                exec_data = json.load(f)

            modified = False
            total_removed = 0

            # Check for nested structure with "results" key
            if isinstance(exec_data, dict) and 'results' in exec_data:
                # Structure: {"results": {"language": [entries]}}
                for language, entries in exec_data['results'].items():
                    if not isinstance(entries, list):
                        continue

                    original_count = len(entries)
                    exec_data['results'][language] = [
                        entry for entry in entries
                        if entry.get('entry_id') != entry_id and entry.get('id') != entry_id
                    ]
                    new_count = len(exec_data['results'][language])

                    if original_count != new_count:
                        modified = True
                        removed = original_count - new_count
                        total_removed += removed
                        self._log(f"    Removed {removed} entries from {language} in {file_path.name}", "info")

                # Save modified file if changes were made
                if modified:
                    # Track stats (even in dry-run)
                    self.stats['execution_files_removed'] += total_removed

                    if not self.dry_run:
                        # Check if all language sections are empty
                        all_empty = all(
                            len(entries) == 0
                            for entries in exec_data['results'].values()
                            if isinstance(entries, list)
                        )

                        if all_empty:
                            # Remove the file if no entries remain
                            file_path.unlink()
                            self._log(f"    Removed empty file: {file_path.name}", "warning")
                        else:
                            # Save modified data
                            with open(file_path, 'w', encoding='utf-8') as f:
                                json.dump(exec_data, f, indent=2, ensure_ascii=False)

            elif isinstance(exec_data, dict):
                # Single entry file
                if exec_data.get('entry_id') == entry_id or exec_data.get('id') == entry_id:
                    self._log(f"    Removed file: {file_path.name}", "info")
                    self.stats['execution_files_removed'] += 1
                    if not self.dry_run:
                        file_path.unlink()
                    return True

            elif isinstance(exec_data, list):
                # Multiple entries file (list format)
                original_count = len(exec_data)
                exec_data = [
                    entry for entry in exec_data
                    if entry.get('entry_id') != entry_id and entry.get('id') != entry_id
                ]
                new_count = len(exec_data)

                if original_count != new_count:
                    modified = True
                    removed_count = original_count - new_count

                    # Track stats (even in dry-run)
                    self.stats['execution_files_removed'] += removed_count

                    if not self.dry_run:
                        if new_count > 0:
                            # Still has entries, save modified file
                            with open(file_path, 'w', encoding='utf-8') as f:
                                json.dump(exec_data, f, indent=2, ensure_ascii=False)
                            self._log(f"    Modified file: {file_path.name} (removed {removed_count} entries)", "info")
                        else:
                            # No entries left, remove file
                            file_path.unlink()
                            self._log(f"    Removed empty file: {file_path.name}", "info")

            return modified

        except Exception as e:
            self._log(f"    Error processing {file_path.name}: {e}", "error")
            return False

    def remove_execution_outputs_for_entries(self, removal_list: List[Dict]) -> int:
        """
        Remove execution output files for removed entries

        Args:
            removal_list: List of entries to remove

        Returns:
            Number of files processed
        """
        if not self.remove_execution_outputs:
            return 0

        self._log("\nRemoving execution output files...")

        files_processed = 0
        entries_by_cluster = defaultdict(list)

        # Group entries by cluster
        for entry in removal_list:
            entries_by_cluster[entry['cluster_name']].append(entry['entry_id'])

        # Process each cluster
        for cluster_name, entry_ids in entries_by_cluster.items():
            # Find all execution files for this cluster
            execution_files = self.find_execution_files_for_entry(cluster_name, None)

            for exec_file in execution_files:
                # Remove each entry from the file
                for entry_id in entry_ids:
                    if self.remove_entry_from_execution_file(exec_file, entry_id):
                        files_processed += 1

        return files_processed

    def remove_all_entries(self, removal_list: List[Dict]) -> Dict:
        """
        Remove all entries in the removal list

        Args:
            removal_list: List of base entries to remove

        Returns:
            Dictionary with removal statistics
        """
        # Group entries by cluster
        entries_by_cluster = defaultdict(list)
        for entry in removal_list:
            entries_by_cluster[entry['cluster_name']].append(entry)

        self._log(f"\nProcessing {len(entries_by_cluster)} clusters...")

        # Process each cluster
        if console and RICH_AVAILABLE:
            clusters = list(entries_by_cluster.keys())
            for cluster_name in track(clusters, description="Removing entries..."):
                entries = entries_by_cluster[cluster_name]
                removed, kept = self.remove_entries_from_cluster(cluster_name, entries)
                self.stats['entries_removed'] += removed
                self.stats['entries_kept'] += kept
                self.stats['clusters_processed'] += 1
        else:
            for cluster_name, entries in entries_by_cluster.items():
                self._log(f"Processing cluster: {cluster_name}")
                removed, kept = self.remove_entries_from_cluster(cluster_name, entries)
                self.stats['entries_removed'] += removed
                self.stats['entries_kept'] += kept
                self.stats['clusters_processed'] += 1

        # Remove execution outputs if flag is set
        if self.remove_execution_outputs:
            files_processed = self.remove_execution_outputs_for_entries(removal_list)
            self._log(f"Processed {files_processed} execution output entries", "success")

        return self.stats

    def generate_report(self) -> str:
        """
        Generate removal report

        Returns:
            Formatted report string
        """
        lines = []
        lines.append("=" * 80)
        lines.append("ENTRY REMOVAL REPORT")
        lines.append("=" * 80)
        lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        lines.append(f"Mode: {'DRY RUN (no changes made)' if self.dry_run else 'PRODUCTION'}")
        lines.append("")

        # Overall stats
        lines.append("Overall Statistics:")
        lines.append("-" * 40)
        lines.append(f"  Clusters processed: {self.stats['clusters_processed']}")
        lines.append(f"  Clusters modified: {self.stats['clusters_modified']}")
        lines.append(f"  Entries removed: {self.stats['entries_removed']}")
        lines.append(f"  Entries kept: {self.stats['entries_kept']}")

        # Execution output stats (if applicable)
        if self.remove_execution_outputs:
            lines.append(f"  Execution files removed: {self.stats['execution_files_removed']}")
            lines.append(f"  Execution files kept: {self.stats['execution_files_kept']}")

        lines.append("")

        # By language
        if self.stats['by_language']:
            lines.append("Removals by Language:")
            lines.append("-" * 40)
            for lang, count in sorted(self.stats['by_language'].items(), key=lambda x: x[1], reverse=True):
                lines.append(f"  {lang.upper():<15} : {count:>5} entries removed")
            lines.append("")

        # By cluster (top 20)
        if self.stats['by_cluster']:
            lines.append("Top 20 Clusters by Removals:")
            lines.append("-" * 40)
            sorted_clusters = sorted(self.stats['by_cluster'].items(), key=lambda x: x[1], reverse=True)
            for cluster, count in sorted_clusters[:20]:
                lines.append(f"  {cluster:<40} : {count:>3} entries")

            if len(sorted_clusters) > 20:
                lines.append(f"  ... and {len(sorted_clusters) - 20} more clusters")
            lines.append("")

        # Backup location
        if not self.dry_run:
            lines.append("Backup Information:")
            lines.append("-" * 40)
            lines.append(f"  Backup directory: {self.backup_dir}")
            lines.append(f"  Backups created: {self.stats['clusters_modified']}")
            lines.append("")

        lines.append("=" * 80)

        return "\n".join(lines)

    def save_report(self, output_path: Path):
        """
        Save report to file

        Args:
            output_path: Path to save report
        """
        report_text = self.generate_report()

        output_path.parent.mkdir(parents=True, exist_ok=True)

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report_text)

        # Also save JSON stats
        json_path = output_path.with_suffix('.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump({
                'generated_at': datetime.now().isoformat(),
                'dry_run': self.dry_run,
                'stats': {
                    'clusters_processed': self.stats['clusters_processed'],
                    'clusters_modified': self.stats['clusters_modified'],
                    'entries_removed': self.stats['entries_removed'],
                    'entries_kept': self.stats['entries_kept'],
                    'by_language': dict(self.stats['by_language']),
                    'by_cluster': dict(self.stats['by_cluster'])
                }
            }, f, indent=2, ensure_ascii=False)

        self._log(f"Report saved to: {output_path}", "success")
        self._log(f"JSON stats saved to: {json_path}", "success")


def main():
    """CLI interface"""
    import argparse

    parser = argparse.ArgumentParser(
        description="Remove problematic base entries from cluster files"
    )
    parser.add_argument(
        "--removal-list",
        type=Path,
        required=True,
        help="Path to removal list JSON file"
    )
    parser.add_argument(
        "--clusters-dir",
        type=Path,
        help="Clusters directory (default: src/clusters)"
    )
    parser.add_argument(
        "--backup-dir",
        type=Path,
        help="Backup directory (default: clusters_dir/backups)"
    )
    parser.add_argument(
        "--output-report",
        type=Path,
        help="Output report path (default: removal_reports/report_TIMESTAMP.txt)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Simulate removal without making changes"
    )
    parser.add_argument(
        "--no-confirm",
        action="store_true",
        help="Skip confirmation prompt"
    )
    parser.add_argument(
        "--remove-execution-outputs",
        action="store_true",
        help="Also remove execution output files for removed entries"
    )
    parser.add_argument(
        "--execution-outputs-dir",
        type=Path,
        help="Execution outputs directory (default: src/execution_outputs)"
    )

    args = parser.parse_args()

    # Determine clusters directory
    if args.clusters_dir:
        clusters_dir = args.clusters_dir
    else:
        clusters_dir = Path(__file__).parent.parent.parent / "clusters"

    # Determine execution outputs directory
    if args.execution_outputs_dir:
        execution_outputs_dir = args.execution_outputs_dir
    else:
        execution_outputs_dir = Path(__file__).parent.parent.parent / "execution_outputs"

    # Display header
    if console:
        console.print("\n")
        mode_text = "[yellow]DRY RUN MODE[/yellow]" if args.dry_run else "[red]PRODUCTION MODE[/red]"
        exec_outputs_text = "[green]YES[/green]" if args.remove_execution_outputs else "[dim]NO[/dim]"
        console.print(Panel.fit(
            f"[bold cyan]ENTRY REMOVER TOOL[/bold cyan]\n\n"
            f"Mode: {mode_text}\n"
            f"Removal list: {args.removal_list.name}\n"
            f"Clusters dir: {clusters_dir}\n"
            f"Execution outputs dir: {execution_outputs_dir}\n"
            f"Remove execution outputs: {exec_outputs_text}\n"
            f"Action: Remove BASE entries only",
            border_style="cyan"
        ))
    else:
        print("\n" + "="*80)
        print("ENTRY REMOVER TOOL")
        print("="*80)
        print(f"Mode: {'DRY RUN' if args.dry_run else 'PRODUCTION'}")
        print(f"Removal list: {args.removal_list}")
        print(f"Clusters dir: {clusters_dir}")

    # Initialize remover
    remover = EntryRemover(
        clusters_dir=clusters_dir,
        execution_outputs_dir=execution_outputs_dir,
        backup_dir=args.backup_dir,
        dry_run=args.dry_run,
        remove_execution_outputs=args.remove_execution_outputs
    )

    # Load removal list
    try:
        remover._log("\n1. Loading removal list...")
        removal_list = remover.load_removal_list(args.removal_list)

        if not removal_list:
            remover._log("No base entries found in removal list!", "warning")
            return

        # Confirmation
        if not args.no_confirm and not args.dry_run:
            remover._log(f"\n⚠️  About to remove {len(removal_list)} base entries", "warning")
            remover._log("Backups will be created automatically.", "info")
            response = input("\nProceed? [y/N]: ").strip().lower()
            if response != 'y':
                remover._log("Operation cancelled by user.", "warning")
                return

        # Remove entries
        remover._log("\n2. Removing entries from clusters...")
        stats = remover.remove_all_entries(removal_list)

        # Generate report
        remover._log("\n3. Generating report...")
        report_text = remover.generate_report()

        # Display report
        if console:
            console.print("\n")
            console.print(Panel(
                report_text,
                title="[bold green]Removal Report[/bold green]",
                border_style="green"
            ))
        else:
            print("\n" + report_text)

        # Save report
        if args.output_report:
            output_path = args.output_report
        else:
            reports_dir = Path(__file__).parent.parent.parent / "removal_reports"
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            output_path = reports_dir / f"removal_report_{timestamp}.txt"

        remover.save_report(output_path)

        # Summary
        if args.dry_run:
            remover._log("\n✓ DRY RUN completed successfully!", "success")
            remover._log("Run without --dry-run to apply changes.", "info")
        else:
            remover._log(f"\n✓ Successfully removed {stats['entries_removed']} entries!", "success")
            if args.remove_execution_outputs and stats['execution_files_removed'] > 0:
                remover._log(f"✓ Removed {stats['execution_files_removed']} execution output entries!", "success")
            remover._log(f"Backups saved to: {remover.backup_dir}", "info")

    except Exception as e:
        if console:
            console.print(f"\n[bold red]ERROR: {e}[/bold red]\n")
        else:
            print(f"\nERROR: {e}\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
