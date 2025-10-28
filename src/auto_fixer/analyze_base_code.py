#!/usr/bin/env python3
"""
Analyze Base Code Script

This script analyzes ONLY base code entries to identify problematic ones
and generate detailed statistics per language to help decide which entries
should be removed from the dataset.
"""

import sys
import os
import logging
import argparse
import json
from pathlib import Path
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from auto_fixer.analyzers.base_code_analyzer import BaseCodeAnalyzer
from unified_analyzer.core.config import AnalyzerConfig

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)


def print_summary(report):
    """Print summary to console"""
    print("\n" + "=" * 80)
    print("BASE CODE ANALYSIS REPORT")
    print("=" * 80)
    print(f"Analysis Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Total Entries Analyzed: {report.total_entries_analyzed:,}")
    print(f"Problematic Entries: {report.total_problematic_entries:,}")
    print(f"Problematic Rate: {report.total_problematic_entries/max(report.total_entries_analyzed,1)*100:.2f}%")
    print(f"\nEntries to Consider Removing: {len(report.entries_to_remove):,}")
    
    print("\n" + "-" * 80)
    print("BY ROOT CAUSE:")
    print("-" * 80)
    for root_cause, count in sorted(report.issues_by_root_cause.items(), key=lambda x: x[1], reverse=True):
        print(f"  {root_cause:30s}: {count:5,} issues")
    
    print("\n" + "-" * 80)
    print("BY LANGUAGE (Impact Analysis):")
    print("-" * 80)
    print(f"{'Language':<15} {'Total':<10} {'Problematic':<15} {'Impact%':<10} {'Critical':<10} {'High':<10}")
    print("-" * 80)
    
    for language in sorted(report.language_stats.keys()):
        stats = report.language_stats[language]
        print(
            f"{language:<15} "
            f"{stats.total_entries:<10,} "
            f"{stats.problematic_entries:<15,} "
            f"{stats.removal_impact_percentage:<10.2f} "
            f"{stats.critical_issues:<10} "
            f"{stats.high_issues:<10}"
        )
    
    print("\n" + "-" * 80)
    print("RECOMMENDATION:")
    print("-" * 80)
    
    # Calculate overall impact
    total_removals = len(report.entries_to_remove)
    removal_rate = total_removals / max(report.total_entries_analyzed, 1) * 100
    
    print(f"\nIf you remove {total_removals:,} entries ({removal_rate:.2f}% of dataset):")
    print(f"  - You will eliminate high-severity code bugs")
    print(f"  - Impact varies by language:")
    
    for language in sorted(report.language_stats.keys()):
        stats = report.language_stats[language]
        if stats.removal_impact_percentage > 10:
            print(f"    ⚠️  {language}: {stats.removal_impact_percentage:.1f}% impact (HIGH)")
        elif stats.removal_impact_percentage > 5:
            print(f"    ⚠️  {language}: {stats.removal_impact_percentage:.1f}% impact (MEDIUM)")
        else:
            print(f"    ✓  {language}: {stats.removal_impact_percentage:.1f}% impact (LOW)")
    
    print("\n" + "=" * 80 + "\n")


def export_detailed_csv(report, output_path):
    """Export detailed CSV with all problematic entries"""
    import csv
    
    with open(output_path, 'w', newline='', encoding='utf-8') as f:
        fieldnames = [
            'entry_id', 'cluster_name', 'language', 'filename',
            'root_cause', 'severity', 'should_remove',
            'execution_time_ms', 'cpu_usage', 'ram_usage',
            'error_message', 'code_file_path', 'test_file_path', 'log_path'
        ]
        
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for issue in report.problematic_entries:
            should_remove = (
                issue.severity in ['critical', 'high'] and
                issue.root_cause in ['code_bug', 'compilation_error', 'runtime_crash', 'assertion_failure']
            )
            
            writer.writerow({
                'entry_id': issue.entry_id,
                'cluster_name': issue.cluster_name,
                'language': issue.language,
                'filename': issue.filename,
                'root_cause': issue.root_cause,
                'severity': issue.severity,
                'should_remove': 'YES' if should_remove else 'NO',
                'execution_time_ms': issue.execution_time_ms or '',
                'cpu_usage': issue.cpu_usage or '',
                'ram_usage': issue.ram_usage or '',
                'error_message': (issue.error_message or '')[:200],  # Truncate
                'code_file_path': issue.code_file_path or '',
                'test_file_path': issue.test_file_path or '',
                'log_path': issue.log_path or ''
            })
    
    logger.info(f"Detailed CSV exported to: {output_path}")


def export_language_stats_json(report, output_path):
    """Export language statistics as JSON"""
    stats_data = {
        'analysis_date': datetime.now().isoformat(),
        'summary': {
            'total_entries': report.total_entries_analyzed,
            'problematic_entries': report.total_problematic_entries,
            'entries_to_remove': len(report.entries_to_remove),
            'removal_rate_percentage': len(report.entries_to_remove) / max(report.total_entries_analyzed, 1) * 100
        },
        'by_language': {}
    }
    
    for language, stats in report.language_stats.items():
        stats_data['by_language'][language] = {
            'total_entries': stats.total_entries,
            'problematic_entries': stats.problematic_entries,
            'removal_impact_percentage': stats.removal_impact_percentage,
            'critical_issues': stats.critical_issues,
            'high_issues': stats.high_issues,
            'medium_issues': stats.medium_issues,
            'issues_by_root_cause': dict(stats.issues_by_root_cause)
        }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(stats_data, f, indent=2, ensure_ascii=False)
    
    logger.info(f"Language statistics JSON exported to: {output_path}")


def export_removal_list(report, output_path):
    """Export simple list of entry IDs to remove"""
    with open(output_path, 'w', encoding='utf-8') as f:
        for entry_id in sorted(report.entries_to_remove):
            f.write(f"{entry_id}\n")
    
    logger.info(f"Removal list exported to: {output_path} ({len(report.entries_to_remove)} entries)")


def main():
    parser = argparse.ArgumentParser(
        description='Analyze base code entries and generate removal recommendations',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Analyze all clusters
  python analyze_base_code.py
  
  # Analyze specific clusters
  python analyze_base_code.py --clusters contains_duplicate two_sum
  
  # Export detailed reports
  python analyze_base_code.py --export-csv --export-json --export-removal-list
  
  # Custom output directory
  python analyze_base_code.py --export-csv --output-dir ./my_reports
        """
    )
    
    parser.add_argument(
        '--clusters',
        nargs='+',
        help='Specific clusters to analyze (default: all)'
    )
    
    parser.add_argument(
        '--export-csv',
        action='store_true',
        help='Export detailed CSV with all problematic entries'
    )
    
    parser.add_argument(
        '--export-json',
        action='store_true',
        help='Export language statistics as JSON'
    )
    
    parser.add_argument(
        '--export-removal-list',
        action='store_true',
        help='Export simple list of entry IDs to remove'
    )
    
    parser.add_argument(
        '--output-dir',
        default='./auto_fixer/reports',
        help='Output directory for reports (default: ./auto_fixer/reports)'
    )
    
    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Run analysis
    logger.info("Starting base code analysis...")
    analyzer = BaseCodeAnalyzer()
    report = analyzer.analyze_all_clusters(
        cluster_names=args.clusters,
        enable_root_cause=True
    )
    
    # Print summary
    print_summary(report)
    
    # Export reports if requested
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    if args.export_csv:
        csv_path = output_dir / f'base_code_issues_{timestamp}.csv'
        export_detailed_csv(report, csv_path)
    
    if args.export_json:
        json_path = output_dir / f'language_stats_{timestamp}.json'
        export_language_stats_json(report, json_path)
    
    if args.export_removal_list:
        list_path = output_dir / f'entries_to_remove_{timestamp}.txt'
        export_removal_list(report, list_path)
    
    # Summary message
    print(f"\n✓ Analysis complete!")
    if args.export_csv or args.export_json or args.export_removal_list:
        print(f"✓ Reports exported to: {output_dir}")
    print(f"\nNext steps:")
    print(f"  1. Review the CSV file to see all problematic entries")
    print(f"  2. Filter by 'should_remove=YES' to see removal candidates")
    print(f"  3. Check language_stats JSON to understand impact per language")
    print(f"  4. Use entries_to_remove.txt to remove entries from dataset")


if __name__ == "__main__":
    main()
