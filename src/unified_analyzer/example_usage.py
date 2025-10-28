#!/usr/bin/env python3
"""
Example usage of Unified Analyzer

This script demonstrates various ways to use the Unified Analyzer
for analyzing execution results and detecting anomalies.
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.core.enums import AnalysisMode, AnomalyType, Severity
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer
from unified_analyzer.reporters.report_generator import ReportGenerator
from unified_analyzer.reporters.exporters import ReportExporter


def example_1_basic_analysis():
    """Example 1: Basic anomaly detection"""
    print("=" * 80)
    print("EXAMPLE 1: Basic Anomaly Detection")
    print("=" * 80)

    # Create configuration
    config = AnalyzerConfig.load_default()
    config.verbose = True

    # Initialize components
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)

    # Load data for a specific cluster
    cluster_name = "contains_duplicate"
    print(f"\nAnalyzing cluster: {cluster_name}")

    entries = data_loader.load_execution_results(cluster_name, test_type='both')
    print(f"Loaded {len(entries)} execution entries")

    # Detect anomalies
    anomalies = anomaly_detector.detect_all(entries)
    print(f"\nDetected {len(anomalies)} anomalies:")

    for anomaly in anomalies[:5]:  # Show first 5
        print(f"  - {anomaly.anomaly_id}: {anomaly.anomaly_type.display_name()} "
              f"[{anomaly.severity.display_name()}] in {anomaly.entry.id}")

    print("\n")


def example_2_root_cause_analysis():
    """Example 2: Root cause analysis"""
    print("=" * 80)
    print("EXAMPLE 2: Root Cause Analysis")
    print("=" * 80)

    config = AnalyzerConfig.for_root_cause_analysis()
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)
    root_cause_analyzer = RootCauseAnalyzer(config, data_loader)

    # Analyze a cluster
    cluster_name = "reverse_array"
    print(f"\nAnalyzing cluster: {cluster_name}")

    entries = data_loader.load_execution_results(cluster_name)
    anomalies = anomaly_detector.detect_all(entries)

    print(f"Detected {len(anomalies)} anomalies")
    print("\nPerforming root cause analysis...")

    for anomaly in anomalies:
        root_cause_analyzer.analyze(anomaly)

    # Show results
    print("\nRoot Cause Summary:")
    for anomaly in anomalies[:3]:  # Show first 3
        print(f"\n  Anomaly: {anomaly.anomaly_id}")
        print(f"    Entry: {anomaly.entry.id} ({anomaly.entry.language})")
        print(f"    Type: {anomaly.anomaly_type.display_name()}")

        if anomaly.probable_causes:
            print(f"    Root Cause: {anomaly.probable_causes[0].display_name()}")

        if anomaly.recommended_actions:
            print(f"    Recommended Actions:")
            for action in anomaly.recommended_actions[:2]:
                print(f"      - {action}")

    print("\n")


def example_3_outlier_detection():
    """Example 3: Outlier detection with custom threshold"""
    print("=" * 80)
    print("EXAMPLE 3: Outlier Detection")
    print("=" * 80)

    config = AnalyzerConfig()
    config.enabled_modes = [AnalysisMode.OUTLIERS]
    config.outlier_threshold_percentage = 300.0  # 300% deviation

    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)

    # Load data from multiple clusters
    clusters = ["contains_duplicate", "reverse_array", "palindrome_integer"]
    all_entries = []

    for cluster_name in clusters:
        entries = data_loader.load_execution_results(cluster_name)
        all_entries.extend(entries)

    print(f"\nAnalyzing {len(all_entries)} entries from {len(clusters)} clusters")

    outliers = anomaly_detector.detect_outliers(
        all_entries,
        threshold_percentage=300.0
    )

    print(f"\nDetected {len(outliers)} outliers:")
    for outlier in outliers[:5]:
        metric = outlier.diagnostic_info.get('metric', 'unknown')
        value = outlier.diagnostic_info.get('value', 0)
        median = outlier.diagnostic_info.get('median', 0)
        deviation = outlier.diagnostic_info.get('deviation_percentage', 0)

        print(f"  - {outlier.entry.id}: {metric} = {value:.2f} "
              f"(median: {median:.2f}, deviation: {deviation:.1f}%)")

    print("\n")


def example_4_full_report_generation():
    """Example 4: Full report generation with export"""
    print("=" * 80)
    print("EXAMPLE 4: Full Report Generation")
    print("=" * 80)

    config = AnalyzerConfig.load_default()
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)
    root_cause_analyzer = RootCauseAnalyzer(config, data_loader)
    report_generator = ReportGenerator(config)

    # Load data
    cluster_names = data_loader.get_all_cluster_names()[:5]  # First 5 clusters
    print(f"\nAnalyzing first 5 clusters...")

    all_entries = []
    for cluster_name in cluster_names:
        entries = data_loader.load_execution_results(cluster_name)
        all_entries.extend(entries)

    print(f"Loaded {len(all_entries)} entries")

    # Detect and analyze
    anomalies = anomaly_detector.detect_all(all_entries)
    print(f"Detected {len(anomalies)} anomalies")

    print("Performing root cause analysis...")
    for anomaly in anomalies:
        root_cause_analyzer.analyze(anomaly)

    # Generate report
    report = report_generator.generate_full_report(anomalies, len(all_entries))

    # Print summary
    print("\n" + report_generator.generate_summary_text(report))

    # Export to multiple formats
    print("\nExporting reports...")
    exporter = ReportExporter()

    # JSON
    json_path = config.reports_dir / "example_report.json"
    exporter.export_json(report, json_path)
    print(f"  - Exported JSON: {json_path}")

    # CSV
    csv_path = config.reports_dir / "example_anomalies.csv"
    exporter.export_csv(anomalies, csv_path, include_recommendations=True)
    print(f"  - Exported CSV: {csv_path}")

    # Markdown
    md_path = config.reports_dir / "example_report.md"
    exporter.export_markdown(report, md_path, include_details=False)
    print(f"  - Exported Markdown: {md_path}")

    print("\n")


def example_5_filter_by_language():
    """Example 5: Language-specific analysis"""
    print("=" * 80)
    print("EXAMPLE 5: Language-Specific Analysis")
    print("=" * 80)

    config = AnalyzerConfig()
    config.priority_languages = ['c', 'cpp']  # Focus on C/C++

    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)

    # Load all data
    cluster_names = data_loader.get_all_cluster_names()[:10]
    all_entries = []

    for cluster_name in cluster_names:
        entries = data_loader.load_execution_results(cluster_name)
        all_entries.extend(entries)

    # Filter to priority languages
    priority_entries = [
        e for e in all_entries
        if config.is_priority_language(e.language)
    ]

    print(f"\nTotal entries: {len(all_entries)}")
    print(f"Priority language entries (C/C++): {len(priority_entries)}")

    # Detect anomalies
    anomalies = anomaly_detector.detect_all(priority_entries)

    print(f"\nDetected {len(anomalies)} anomalies in C/C++ code:")

    # Group by anomaly type
    by_type = {}
    for anomaly in anomalies:
        atype = anomaly.anomaly_type
        if atype not in by_type:
            by_type[atype] = []
        by_type[atype].append(anomaly)

    for atype, type_anomalies in by_type.items():
        print(f"  {atype.display_name()}: {len(type_anomalies)}")

    print("\n")


def example_6_cluster_comparison():
    """Example 6: Compare multiple clusters"""
    print("=" * 80)
    print("EXAMPLE 6: Cluster Comparison")
    print("=" * 80)

    config = AnalyzerConfig.load_default()
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)

    # Analyze multiple clusters
    clusters_to_compare = [
        "contains_duplicate",
        "reverse_array",
        "palindrome_integer"
    ]

    results = {}

    for cluster_name in clusters_to_compare:
        entries = data_loader.load_execution_results(cluster_name)
        anomalies = anomaly_detector.detect_all(entries)

        results[cluster_name] = {
            'total_entries': len(entries),
            'total_anomalies': len(anomalies),
            'anomaly_rate': len(anomalies) / len(entries) if entries else 0,
            'by_severity': {}
        }

        for severity in [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW]:
            count = len([a for a in anomalies if a.severity == severity])
            results[cluster_name]['by_severity'][severity] = count

    # Print comparison
    print("\nCluster Comparison:")
    print("-" * 80)
    print(f"{'Cluster':<30} {'Entries':>10} {'Anomalies':>10} {'Rate':>10}")
    print("-" * 80)

    for cluster_name, stats in results.items():
        print(f"{cluster_name:<30} {stats['total_entries']:>10} "
              f"{stats['total_anomalies']:>10} "
              f"{stats['anomaly_rate']*100:>9.1f}%")

    print("\n")


def main():
    """Run all examples"""
    print("\n")
    print("*" * 80)
    print("UNIFIED ANALYZER - EXAMPLE USAGE")
    print("*" * 80)
    print("\n")

    try:
        # Run examples
        example_1_basic_analysis()
        example_2_root_cause_analysis()
        example_3_outlier_detection()
        example_4_full_report_generation()
        example_5_filter_by_language()
        example_6_cluster_comparison()

        print("*" * 80)
        print("ALL EXAMPLES COMPLETED SUCCESSFULLY")
        print("*" * 80)
        print("\n")

    except Exception as e:
        print(f"\nERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
