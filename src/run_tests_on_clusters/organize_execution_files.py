#!/usr/bin/env python3
"""
Script: organize_execution_files.py
Purpose: Organize backup and selective execution report files into dedicated directories

This script:
1. Moves all *_backup_*.json files from src/execution_outputs to src/backup_executions
2. Moves all *_selective_execution_*.json files from src/execution_outputs to src/execution_reports

Author: Senior Python Developer
Date: 2025-10-15
"""

import shutil
from pathlib import Path
from typing import List, Tuple
import sys


class FileOrganizer:
    """Organize execution output files into dedicated directories"""

    def __init__(self, source_dir: Path):
        """
        Initialize the file organizer

        Args:
            source_dir: Source directory containing execution outputs
        """
        self.source_dir = source_dir
        self.backup_dir = source_dir.parent / "backup_executions"
        self.reports_dir = source_dir.parent / "execution_reports"

        # Statistics
        self.stats = {
            "backups_moved": 0,
            "reports_moved": 0,
            "errors": 0,
            "skipped": 0
        }

    def create_directories(self) -> bool:
        """
        Create target directories if they don't exist

        Returns:
            True if successful, False otherwise
        """
        try:
            self.backup_dir.mkdir(parents=True, exist_ok=True)
            print(f"✓ Backup directory ready: {self.backup_dir}")

            self.reports_dir.mkdir(parents=True, exist_ok=True)
            print(f"✓ Reports directory ready: {self.reports_dir}")

            return True

        except Exception as e:
            print(f"✗ Error creating directories: {e}")
            return False

    def find_backup_files(self) -> List[Path]:
        """
        Find all backup files (*_backup_*.json)

        Returns:
            List of backup file paths
        """
        backup_files = list(self.source_dir.glob("*_backup_*.json"))
        print(f"\nFound {len(backup_files)} backup files")
        return backup_files

    def find_report_files(self) -> List[Path]:
        """
        Find all selective execution report files (*_selective_execution_*.json)

        Returns:
            List of report file paths
        """
        report_files = list(self.source_dir.glob("*_selective_execution_*.json"))
        print(f"Found {len(report_files)} selective execution report files")
        return report_files

    def move_file(self, source: Path, destination_dir: Path) -> bool:
        """
        Move a file to the destination directory

        Args:
            source: Source file path
            destination_dir: Destination directory

        Returns:
            True if successful, False otherwise
        """
        try:
            destination = destination_dir / source.name

            # Check if destination already exists
            if destination.exists():
                print(f"  ⚠ Skipping {source.name}: already exists in destination")
                self.stats["skipped"] += 1
                return False

            # Move the file
            shutil.move(str(source), str(destination))
            return True

        except Exception as e:
            print(f"  ✗ Error moving {source.name}: {e}")
            self.stats["errors"] += 1
            return False

    def move_backup_files(self, files: List[Path]) -> int:
        """
        Move all backup files to backup directory

        Args:
            files: List of backup file paths

        Returns:
            Number of files successfully moved
        """
        print(f"\n{'='*80}")
        print("MOVING BACKUP FILES")
        print(f"{'='*80}")

        moved_count = 0

        for i, file_path in enumerate(files, 1):
            print(f"[{i}/{len(files)}] Moving {file_path.name}...")

            if self.move_file(file_path, self.backup_dir):
                moved_count += 1
                self.stats["backups_moved"] += 1
                print(f"  ✓ Moved to {self.backup_dir.name}/")

        return moved_count

    def move_report_files(self, files: List[Path]) -> int:
        """
        Move all report files to reports directory

        Args:
            files: List of report file paths

        Returns:
            Number of files successfully moved
        """
        print(f"\n{'='*80}")
        print("MOVING SELECTIVE EXECUTION REPORTS")
        print(f"{'='*80}")

        moved_count = 0

        for i, file_path in enumerate(files, 1):
            print(f"[{i}/{len(files)}] Moving {file_path.name}...")

            if self.move_file(file_path, self.reports_dir):
                moved_count += 1
                self.stats["reports_moved"] += 1
                print(f"  ✓ Moved to {self.reports_dir.name}/")

        return moved_count

    def print_summary(self):
        """Print summary of operations"""
        print(f"\n{'='*80}")
        print("ORGANIZATION SUMMARY")
        print(f"{'='*80}")
        print(f"Backup files moved:            {self.stats['backups_moved']}")
        print(f"Report files moved:            {self.stats['reports_moved']}")
        print(f"Files skipped (already exist): {self.stats['skipped']}")
        print(f"Errors encountered:            {self.stats['errors']}")
        print(f"{'='*80}")

        # Show directory locations
        print(f"\nFiles organized into:")
        print(f"  Backups:  {self.backup_dir}")
        print(f"  Reports:  {self.reports_dir}")

    def run(self) -> bool:
        """
        Run the complete file organization process

        Returns:
            True if successful, False if errors occurred
        """
        print("="*80)
        print("EXECUTION FILES ORGANIZER")
        print("="*80)
        print(f"Source directory: {self.source_dir}")
        print()

        # Verify source directory exists
        if not self.source_dir.exists():
            print(f"✗ Error: Source directory does not exist: {self.source_dir}")
            return False

        # Create target directories
        if not self.create_directories():
            return False

        # Find files
        backup_files = self.find_backup_files()
        report_files = self.find_report_files()

        if not backup_files and not report_files:
            print("\n✓ No files to organize. Everything is clean!")
            return True

        # Confirm with user
        print(f"\n{'='*80}")
        print("OPERATION PLAN")
        print(f"{'='*80}")
        print(f"Will move:")
        print(f"  {len(backup_files)} backup files → {self.backup_dir}")
        print(f"  {len(report_files)} report files → {self.reports_dir}")
        print()

        response = input("Proceed? [Y/n]: ").strip().lower()
        if response and response != 'y':
            print("Operation cancelled by user.")
            return False

        # Move files
        if backup_files:
            self.move_backup_files(backup_files)

        if report_files:
            self.move_report_files(report_files)

        # Print summary
        self.print_summary()

        return self.stats["errors"] == 0


def main():
    """Main entry point"""
    # Determine source directory
    # Assuming script is in src/run_tests_on_clusters/
    script_dir = Path(__file__).parent
    source_dir = script_dir.parent / "execution_outputs"

    # Allow override via command line
    if len(sys.argv) > 1:
        source_dir = Path(sys.argv[1])

    # Run organizer
    organizer = FileOrganizer(source_dir)
    success = organizer.run()

    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()