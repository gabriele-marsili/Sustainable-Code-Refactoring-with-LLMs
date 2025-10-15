#!/usr/bin/env python3
"""
Script: view_validation_report.py
Purpose: Interactive visualization of validation_report_detailed.json

Features:
- Global overview with statistics
- Per-language breakdown
- Per-cluster analysis
- Error category analysis
- Top problematic clusters
- Interactive filtering and sorting

Author: Senior Python Developer
Date: 2025-10-15
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Any, Optional
from collections import defaultdict, Counter
from dataclasses import dataclass, field
import argparse


@dataclass
class LanguageStats:
    """Statistics for a specific language"""
    name: str
    total_entries: int = 0
    valid_entries: int = 0
    invalid_entries: int = 0

    # Error breakdown
    null_values: int = 0
    zero_execution_time: int = 0
    failed_tests: int = 0

    # Cluster tracking
    problematic_clusters: List[str] = field(default_factory=list)

    @property
    def validity_percentage(self) -> float:
        if self.total_entries == 0:
            return 0.0
        return (self.valid_entries / self.total_entries) * 100

    @property
    def invalidity_percentage(self) -> float:
        return 100.0 - self.validity_percentage


@dataclass
class ClusterStats:
    """Statistics for a specific cluster"""
    name: str
    total_entries: int = 0
    valid_entries: int = 0
    invalid_entries: int = 0
    languages: Dict[str, int] = field(default_factory=dict)  # language -> invalid_count

    @property
    def validity_percentage(self) -> float:
        if self.total_entries == 0:
            return 0.0
        return (self.valid_entries / self.total_entries) * 100


class ValidationReportViewer:
    """Interactive viewer for validation reports"""

    def __init__(self, report_path: Path):
        """
        Initialize the viewer

        Args:
            report_path: Path to validation_report_detailed.json
        """
        self.report_path = report_path
        self.data: Optional[Dict] = None
        self.language_stats: Dict[str, LanguageStats] = {}
        self.cluster_stats: Dict[str, ClusterStats] = {}

    def load_report(self) -> bool:
        """
        Load the validation report

        Returns:
            True if successful, False otherwise
        """
        try:
            with open(self.report_path, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
            print(f"✓ Loaded report from: {self.report_path}")
            return True
        except FileNotFoundError:
            print(f"✗ Error: Report file not found: {self.report_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"✗ Error: Invalid JSON in report: {e}")
            return False
        except Exception as e:
            print(f"✗ Error loading report: {e}")
            return False

    def analyze_data(self):
        """Analyze the loaded data and compute statistics"""
        if not self.data:
            return

        # Process invalid entries
        invalid_entries = self.data.get('invalid_entries', [])

        for entry in invalid_entries:
            cluster = entry.get('cluster', 'unknown')
            language = entry.get('language', 'unknown')
            errors = entry.get('errors', [])

            # Update language stats
            if language not in self.language_stats:
                self.language_stats[language] = LanguageStats(name=language)

            lang_stats = self.language_stats[language]
            lang_stats.invalid_entries += 1

            # Track errors
            for error in errors:
                if 'None' in error or 'NULL' in error.upper():
                    lang_stats.null_values += 1
                if 'execution_time_ms is 0' in error or 'execution_time_ms = 0' in error:
                    lang_stats.zero_execution_time += 1
                if 'regressionTestPassed' in error and 'False' in error:
                    lang_stats.failed_tests += 1

            # Track problematic clusters
            if cluster not in lang_stats.problematic_clusters:
                lang_stats.problematic_clusters.append(cluster)

            # Update cluster stats
            if cluster not in self.cluster_stats:
                self.cluster_stats[cluster] = ClusterStats(name=cluster)

            cluster_stats = self.cluster_stats[cluster]
            cluster_stats.invalid_entries += 1
            cluster_stats.languages[language] = cluster_stats.languages.get(language, 0) + 1

        # Add summary data
        summary = self.data.get('summary', {})
        total_entries = summary.get('total_entries', 0)
        valid_entries = summary.get('valid_entries', 0)

        # Update language totals from summary
        lang_summary = summary.get('by_language', {})
        for lang, stats in lang_summary.items():
            if lang not in self.language_stats:
                self.language_stats[lang] = LanguageStats(name=lang)

            self.language_stats[lang].total_entries = stats.get('total', 0)
            self.language_stats[lang].valid_entries = stats.get('valid', 0)
            # invalid_entries already counted above

        # Update cluster totals
        cluster_summary = summary.get('by_cluster', {})
        for cluster_name, stats in cluster_summary.items():
            if cluster_name not in self.cluster_stats:
                self.cluster_stats[cluster_name] = ClusterStats(name=cluster_name)

            self.cluster_stats[cluster_name].total_entries = stats.get('total', 0)
            self.cluster_stats[cluster_name].valid_entries = stats.get('valid', 0)

    def print_global_overview(self):
        """Print global overview"""
        print("\n" + "="*80)
        print("GLOBAL OVERVIEW")
        print("="*80)

        summary = self.data.get('summary', {})

        total = summary.get('total_entries', 0)
        valid = summary.get('valid_entries', 0)
        invalid = summary.get('invalid_entries', 0)

        valid_pct = (valid / total * 100) if total > 0 else 0
        invalid_pct = (invalid / total * 100) if total > 0 else 0

        print(f"\nTotal Entries:     {total:,}")
        print(f"Valid Entries:     {valid:,}  ({valid_pct:.2f}%)")
        print(f"Invalid Entries:   {invalid:,}  ({invalid_pct:.2f}%)")

        # Files info
        files_analyzed = summary.get('files_analyzed', 0)
        print(f"\nFiles Analyzed:    {files_analyzed:,}")

        # Clusters info
        total_clusters = len(self.cluster_stats)
        problematic_clusters = len([c for c in self.cluster_stats.values() if c.invalid_entries > 0])
        clean_clusters = total_clusters - problematic_clusters

        print(f"\nTotal Clusters:    {total_clusters}")
        print(f"Clean Clusters:    {clean_clusters}  ({clean_clusters/total_clusters*100:.1f}%)")
        print(f"Problematic:       {problematic_clusters}  ({problematic_clusters/total_clusters*100:.1f}%)")

    def print_language_breakdown(self, sort_by: str = 'invalid'):
        """
        Print per-language breakdown

        Args:
            sort_by: Sort criteria ('invalid', 'total', 'validity', 'name')
        """
        print("\n" + "="*80)
        print("BREAKDOWN PER LINGUAGGIO")
        print("="*80)

        # Sort languages
        languages = list(self.language_stats.values())

        if sort_by == 'invalid':
            languages.sort(key=lambda x: x.invalid_entries, reverse=True)
        elif sort_by == 'total':
            languages.sort(key=lambda x: x.total_entries, reverse=True)
        elif sort_by == 'validity':
            languages.sort(key=lambda x: x.validity_percentage)
        else:  # name
            languages.sort(key=lambda x: x.name)

        # Print header
        print(f"\n{'RANK':<6}{'LANGUAGE':<12}{'TOTAL':>10}{'VALID':>10}{'INVALID':>10}{'% VALID':>10}{'RATING':<10}")
        print("-" * 80)

        # Print each language
        for rank, lang in enumerate(languages, 1):
            # Rating based on validity percentage
            if lang.validity_percentage >= 99.5:
                rating = "⭐⭐⭐⭐⭐"
            elif lang.validity_percentage >= 99.0:
                rating = "⭐⭐⭐⭐☆"
            elif lang.validity_percentage >= 95.0:
                rating = "⭐⭐⭐☆☆"
            elif lang.validity_percentage >= 90.0:
                rating = "⭐⭐☆☆☆"
            elif lang.validity_percentage >= 80.0:
                rating = "⭐☆☆☆☆"
            else:
                rating = "🚨 CRITICAL"

            print(f"{rank:<6}{lang.name:<12}{lang.total_entries:>10,}{lang.valid_entries:>10,}"
                  f"{lang.invalid_entries:>10,}{lang.validity_percentage:>9.2f}%  {rating}")

        print("\n" + "-" * 80)

    def print_language_details(self, language: str):
        """
        Print detailed statistics for a specific language

        Args:
            language: Language name
        """
        if language not in self.language_stats:
            print(f"✗ Language '{language}' not found in report")
            return

        lang = self.language_stats[language]

        print("\n" + "="*80)
        print(f"DETTAGLIO LINGUAGGIO: {language.upper()}")
        print("="*80)

        print(f"\nEntry Statistics:")
        print(f"  Total Entries:     {lang.total_entries:,}")
        print(f"  Valid Entries:     {lang.valid_entries:,}  ({lang.validity_percentage:.2f}%)")
        print(f"  Invalid Entries:   {lang.invalid_entries:,}  ({lang.invalidity_percentage:.2f}%)")

        if lang.invalid_entries > 0:
            print(f"\nError Breakdown:")
            print(f"  NULL Values:       {lang.null_values:,}  ({lang.null_values/lang.invalid_entries*100:.1f}% of invalid)")
            print(f"  Zero Exec Time:    {lang.zero_execution_time:,}  ({lang.zero_execution_time/lang.invalid_entries*100:.1f}% of invalid)")
            print(f"  Failed Tests:      {lang.failed_tests:,}  ({lang.failed_tests/lang.invalid_entries*100:.1f}% of invalid)")

            print(f"\nProblematic Clusters: {len(lang.problematic_clusters)}")
            if lang.problematic_clusters:
                # Show top 10
                clusters_to_show = sorted(lang.problematic_clusters)[:10]
                for cluster in clusters_to_show:
                    cluster_stats = self.cluster_stats.get(cluster)
                    if cluster_stats:
                        lang_invalid = cluster_stats.languages.get(language, 0)
                        print(f"  - {cluster:<30} {lang_invalid:>4} invalid entries")

                if len(lang.problematic_clusters) > 10:
                    print(f"  ... and {len(lang.problematic_clusters) - 10} more clusters")

    def print_top_clusters(self, limit: int = 20):
        """
        Print top problematic clusters

        Args:
            limit: Number of clusters to show
        """
        print("\n" + "="*80)
        print(f"TOP {limit} CLUSTER PROBLEMATICI")
        print("="*80)

        # Sort by invalid entries
        clusters = sorted(self.cluster_stats.values(), key=lambda x: x.invalid_entries, reverse=True)
        clusters = [c for c in clusters if c.invalid_entries > 0][:limit]

        print(f"\n{'RANK':<6}{'CLUSTER':<30}{'INVALID':>10}{'TOTAL':>10}{'% VALID':>10}{'PRIMARY LANG':<15}")
        print("-" * 80)

        for rank, cluster in enumerate(clusters, 1):
            # Find primary problematic language
            if cluster.languages:
                primary_lang = max(cluster.languages.items(), key=lambda x: x[1])
                primary_lang_str = f"{primary_lang[0]} ({primary_lang[1]})"
            else:
                primary_lang_str = "N/A"

            print(f"{rank:<6}{cluster.name:<30}{cluster.invalid_entries:>10,}"
                  f"{cluster.total_entries:>10,}{cluster.validity_percentage:>9.2f}%  {primary_lang_str}")

    def print_cluster_details(self, cluster: str):
        """
        Print detailed statistics for a specific cluster

        Args:
            cluster: Cluster name
        """
        if cluster not in self.cluster_stats:
            print(f"✗ Cluster '{cluster}' not found in report")
            return

        clust = self.cluster_stats[cluster]

        print("\n" + "="*80)
        print(f"DETTAGLIO CLUSTER: {cluster}")
        print("="*80)

        print(f"\nEntry Statistics:")
        print(f"  Total Entries:     {clust.total_entries:,}")
        print(f"  Valid Entries:     {clust.valid_entries:,}  ({clust.validity_percentage:.2f}%)")
        print(f"  Invalid Entries:   {clust.invalid_entries:,}")

        if clust.languages:
            print(f"\nInvalid Entries by Language:")
            sorted_langs = sorted(clust.languages.items(), key=lambda x: x[1], reverse=True)
            for lang, count in sorted_langs:
                pct = (count / clust.invalid_entries * 100) if clust.invalid_entries > 0 else 0
                print(f"  {lang:<15} {count:>6,}  ({pct:.1f}% of cluster's invalid entries)")

    def print_error_analysis(self):
        """Print error category analysis"""
        print("\n" + "="*80)
        print("ANALISI CATEGORIE DI ERRORI")
        print("="*80)

        total_null = sum(lang.null_values for lang in self.language_stats.values())
        total_zero_time = sum(lang.zero_execution_time for lang in self.language_stats.values())
        total_failed_tests = sum(lang.failed_tests for lang in self.language_stats.values())
        total_invalid = sum(lang.invalid_entries for lang in self.language_stats.values())

        print(f"\nGlobal Error Categories:")
        print(f"  NULL Values:            {total_null:>8,}  ({total_null/total_invalid*100:.1f}% of invalid entries)")
        print(f"  Zero Execution Time:    {total_zero_time:>8,}  ({total_zero_time/total_invalid*100:.1f}% of invalid entries)")
        print(f"  Failed Tests:           {total_failed_tests:>8,}  ({total_failed_tests/total_invalid*100:.1f}% of invalid entries)")

        print(f"\nNote: Percentages don't sum to 100% as entries can have multiple errors")

        # Per-language error breakdown
        print(f"\nError Distribution by Language:")
        print(f"{'LANGUAGE':<15}{'NULL':>10}{'ZERO TIME':>12}{'FAILED TEST':>14}")
        print("-" * 55)

        for lang in sorted(self.language_stats.values(), key=lambda x: x.invalid_entries, reverse=True):
            if lang.invalid_entries > 0:
                print(f"{lang.name:<15}{lang.null_values:>10,}{lang.zero_execution_time:>12,}{lang.failed_tests:>14,}")

    def interactive_menu(self):
        """Show interactive menu"""
        while True:
            print("\n" + "="*80)
            print("VALIDATION REPORT VIEWER - MENU")
            print("="*80)
            print("\n1. Global Overview")
            print("2. Language Breakdown (sorted by invalid count)")
            print("3. Language Breakdown (sorted by validity %)")
            print("4. Language Details (specify language)")
            print("5. Top Problematic Clusters")
            print("6. Cluster Details (specify cluster)")
            print("7. Error Category Analysis")
            print("8. Show All Statistics")
            print("0. Exit")

            choice = input("\nSelect option: ").strip()

            if choice == '0':
                print("Exiting...")
                break
            elif choice == '1':
                self.print_global_overview()
            elif choice == '2':
                self.print_language_breakdown(sort_by='invalid')
            elif choice == '3':
                self.print_language_breakdown(sort_by='validity')
            elif choice == '4':
                lang = input("Enter language name: ").strip()
                self.print_language_details(lang)
            elif choice == '5':
                limit = input("Number of clusters to show (default 20): ").strip()
                limit = int(limit) if limit.isdigit() else 20
                self.print_top_clusters(limit)
            elif choice == '6':
                cluster = input("Enter cluster name: ").strip()
                self.print_cluster_details(cluster)
            elif choice == '7':
                self.print_error_analysis()
            elif choice == '8':
                self.print_global_overview()
                self.print_language_breakdown(sort_by='invalid')
                self.print_error_analysis()
                self.print_top_clusters(20)
            else:
                print("Invalid option. Please try again.")

            input("\nPress Enter to continue...")

    def run_quick_view(self):
        """Run quick view (non-interactive)"""
        self.print_global_overview()
        self.print_language_breakdown(sort_by='invalid')
        self.print_error_analysis()
        self.print_top_clusters(10)


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(description="View validation report statistics")
    parser.add_argument(
        '--report',
        type=Path,
        default=Path(__file__).parent / 'validation_report_detailed.json',
        help='Path to validation_report_detailed.json'
    )
    parser.add_argument(
        '--interactive',
        '-i',
        action='store_true',
        help='Run in interactive mode'
    )
    parser.add_argument(
        '--language',
        '-l',
        type=str,
        help='Show details for specific language'
    )
    parser.add_argument(
        '--cluster',
        '-c',
        type=str,
        help='Show details for specific cluster'
    )
    parser.add_argument(
        '--top',
        '-t',
        type=int,
        default=10,
        help='Number of top clusters to show (default: 10)'
    )

    args = parser.parse_args()

    # Create viewer
    viewer = ValidationReportViewer(args.report)

    # Load report
    if not viewer.load_report():
        sys.exit(1)

    # Analyze data
    print("Analyzing data...")
    viewer.analyze_data()
    print("✓ Analysis complete\n")

    # Run appropriate mode
    if args.interactive:
        viewer.interactive_menu()
    elif args.language:
        viewer.print_language_details(args.language)
    elif args.cluster:
        viewer.print_cluster_details(args.cluster)
    else:
        viewer.run_quick_view()


if __name__ == "__main__":
    main()
