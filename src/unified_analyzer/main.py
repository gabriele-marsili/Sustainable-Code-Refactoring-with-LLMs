#!/usr/bin/env python3
"""
Main entry point for Unified Analyzer

This script provides a command-line interface for analyzing execution results,
detecting anomalies, and performing root cause analysis.
"""

import sys
import os
import logging
import argparse
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.core.enums import AnalysisMode
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer
from unified_analyzer.reporters.report_generator import ReportGenerator
from unified_analyzer.reporters.exporters import ReportExporter


def setup_logging(verbose: bool = False):
    """Setup logging configuration"""
    level = logging.DEBUG if verbose else logging.INFO

    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )


def parse_arguments():
    """Parse command-line arguments"""
    parser = argparse.ArgumentParser(
        description='Unified Analyzer - Analyze execution results and detect anomalies',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Analyze all clusters
  python main.py

  # Analyze specific clusters
  python main.py --clusters contains_duplicate reverse_array

  # Only detect invalid values (quick scan)
  python main.py --modes invalid missing

  # Full analysis with root cause
  python main.py --modes all --root-cause

  # Export results
  python main.py --export json csv --output-dir ./reports

  # Verbose output
  python main.py --verbose
        """
    )

    parser.add_argument(
        '--clusters',
        nargs='+',
        help='Specific clusters to analyze (default: all)'
    )

    parser.add_argument(
        '--modes',
        nargs='+',
        choices=['invalid', 'missing', 'outliers', 'all'],
        default=['all'],
        help='Analysis modes to run (default: all)'
    )

    parser.add_argument(
        '--test-type',
        choices=['base', 'llm', 'both'],
        default='both',
        help='Type of test results to analyze (default: both)'
    )

    parser.add_argument(
        '--root-cause',
        action='store_true',
        help='Perform root cause analysis (may be slower)'
    )

    parser.add_argument(
        '--export',
        nargs='+',
        choices=['json', 'csv', 'markdown', 'text'],
        help='Export formats (can specify multiple)'
    )

    parser.add_argument(
        '--output-dir',
        type=Path,
        help='Output directory for reports (default: ./unified_analyzer/reports)'
    )

    parser.add_argument(
        '--outlier-threshold',
        type=float,
        default=500.0,
        help='Outlier threshold percentage (default: 500%%)'
    )

    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Verbose output'
    )

    parser.add_argument(
        '--quick',
        action='store_true',
        help='Quick scan mode (no log analysis, no root cause)'
    )

    return parser.parse_args()


def main():
    """Main execution function"""
    args = parse_arguments()

    # Setup logging
    setup_logging(args.verbose)
    logger = logging.getLogger(__name__)

    logger.info("=" * 80)
    logger.info("UNIFIED ANALYZER - Starting Analysis")
    logger.info("=" * 80)

    # Create configuration
    if args.quick:
        config = AnalyzerConfig.for_quick_scan()
    elif args.root_cause:
        config = AnalyzerConfig.for_root_cause_analysis()
    else:
        config = AnalyzerConfig.load_default()

    # Override config with arguments
    if args.output_dir:
        config.reports_dir = args.output_dir
        config.reports_dir.mkdir(parents=True, exist_ok=True)

    if args.outlier_threshold:
        config.outlier_threshold_percentage = args.outlier_threshold

    # Set enabled modes
    mode_map = {
        'invalid': AnalysisMode.INVALID_VALUES,
        'missing': AnalysisMode.MISSING_METRICS,
        'outliers': AnalysisMode.OUTLIERS,
        'all': AnalysisMode.ALL
    }

    if 'all' not in args.modes:
        config.enabled_modes = [mode_map[m] for m in args.modes]

    config.verbose = args.verbose

    # Initialize components
    logger.info("Initializing components...")
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)
    root_cause_analyzer = RootCauseAnalyzer(config, data_loader) if args.root_cause else None
    report_generator = ReportGenerator(config)

    # Get clusters to analyze
    if args.clusters:
        cluster_names = args.clusters
        logger.info(f"Analyzing {len(cluster_names)} specified clusters")
    else:
        cluster_names = data_loader.get_all_cluster_names()
        logger.info(f"Analyzing all {len(cluster_names)} clusters")

    # Load all execution entries
    logger.info("Loading execution data...")
    all_entries = []

    for cluster_name in cluster_names:
        entries = data_loader.load_execution_results(cluster_name, args.test_type)
        all_entries.extend(entries)

    logger.info(f"Loaded {len(all_entries)} execution entries")

    if not all_entries:
        logger.warning("No execution entries found!")
        return 1

    # Detect anomalies
    logger.info("Detecting anomalies...")
    anomalies = anomaly_detector.detect_all(all_entries)

    logger.info(f"Detected {len(anomalies)} anomalies")

    # Perform root cause analysis
    if args.root_cause and anomalies:
        logger.info("Performing root cause analysis...")
        for i, anomaly in enumerate(anomalies, 1):
            if i % 10 == 0:
                logger.info(f"  Analyzed {i}/{len(anomalies)} anomalies...")
            root_cause_analyzer.analyze(anomaly)

        logger.info("Root cause analysis complete")

    # Generate report
    logger.info("Generating report...")
    report = report_generator.generate_full_report(anomalies, len(all_entries))

    # Print summary to console
    print("\n" + report_generator.generate_summary_text(report))

    # Export if requested
    if args.export:
        timestamp = report.analysis_timestamp.strftime("%Y%m%d_%H%M%S")
        base_filename = f"analysis_report_{timestamp}"

        exporter = ReportExporter()

        for export_format in args.export:
            if export_format == 'json':
                output_path = config.reports_dir / f"{base_filename}.json"
                exporter.export_json(report, output_path)

            elif export_format == 'csv':
                output_path = config.reports_dir / f"{base_filename}.csv"
                exporter.export_csv(anomalies, output_path, include_recommendations=True)

            elif export_format == 'markdown':
                output_path = config.reports_dir / f"{base_filename}.md"
                exporter.export_markdown(report, output_path, include_details=True)

            elif export_format == 'text':
                output_path = config.reports_dir / f"{base_filename}.txt"
                exporter.export_summary_text(report, output_path)

    logger.info("=" * 80)
    logger.info("Analysis Complete")
    logger.info("=" * 80)

    return 0


if __name__ == "__main__":
    sys.exit(main())
