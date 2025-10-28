#!/usr/bin/env python3
"""
Auto-Fixer Main Orchestrator

Complete workflow for automatic error fixing:
1. Load anomalies from Unified Analyzer
2. Classify errors (fixable vs unfixable)
3. Apply automatic fixes for environment/infrastructure issues
4. Select problematic entries for re-execution
5. Re-execute using run_tests_on_cluster.py
6. Generate detailed reports with code file paths
"""

import logging
import sys
import os
import argparse
from typing import List, Optional
import time

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from unified_analyzer.core.models import Anomaly, AnalysisReport
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer

from auto_fixer.core.error_classifier import ErrorClassifier
from auto_fixer.core.execution_selector import ExecutionSelector
from auto_fixer.fixers.environment_fixer import EnvironmentFixer
from auto_fixer.reporters.fix_reporter import FixReporter
from auto_fixer.core.models import ClassifiedError, FixReport

logger = logging.getLogger(__name__)


class AutoFixer:
    """
    Main orchestrator for automatic error fixing workflow.

    Complete pipeline:
    1. Analyze execution results (via Unified Analyzer)
    2. Classify errors into fixable/unfixable
    3. Apply automatic fixes
    4. Re-execute problematic entries
    5. Generate reports
    """

    def __init__(
        self,
        dry_run: bool = False,
        verbose: bool = False,
        output_dir: Optional[str] = None
    ):
        """
        Initialize AutoFixer.

        Args:
            dry_run: If True, simulate fixes without executing
            verbose: Enable verbose logging
            output_dir: Directory for reports
        """
        self.dry_run = dry_run
        self.verbose = verbose

        # Setup logging
        log_level = logging.DEBUG if verbose else logging.INFO
        logging.basicConfig(
            level=log_level,
            format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )

        # Initialize components
        self.classifier = ErrorClassifier()
        self.selector = ExecutionSelector()
        self.fixer = EnvironmentFixer(dry_run=dry_run)
        self.reporter = FixReporter(output_dir=output_dir)

        # Unified Analyzer components
        self.config = AnalyzerConfig.load_default()
        self.data_loader = DataLoader(self.config)
        self.detector = AnomalyDetector(self.config)
        self.root_cause_analyzer = RootCauseAnalyzer(self.config, self.data_loader)

        logger.info("AutoFixer initialized")

    def run_complete_workflow(
        self,
        cluster_names: Optional[List[str]] = None,
        apply_fixes: bool = True,
        reexecute: bool = False
    ) -> FixReport:
        """
        Run complete auto-fix workflow.

        Args:
            cluster_names: Specific clusters to analyze (None = all)
            apply_fixes: Whether to apply automatic fixes
            reexecute: Whether to re-execute problematic entries

        Returns:
            FixReport with complete results
        """
        logger.info("=" * 80)
        logger.info("AUTO-FIXER - COMPLETE WORKFLOW")
        logger.info("=" * 80)

        start_time = time.time()

        # STEP 1: Run Unified Analyzer to detect anomalies
        logger.info("\nSTEP 1: Detecting anomalies with Unified Analyzer...")
        anomalies = self._run_unified_analyzer(cluster_names)
        logger.info(f"Detected {len(anomalies)} anomalies")

        # STEP 2: Classify errors
        logger.info("\nSTEP 2: Classifying errors...")
        classified_errors = self.classifier.classify_batch(anomalies)
        self.classifier.print_stats()

        # STEP 3: Apply automatic fixes (if enabled)
        fix_attempts = []
        if apply_fixes:
            logger.info("\nSTEP 3: Applying automatic fixes...")
            fix_attempts = self.fixer.fix_batch(classified_errors)
            self.fixer.print_stats()
        else:
            logger.info("\nSTEP 3: Skipping automatic fixes (disabled)")

        # STEP 4: Select entries for re-execution
        logger.info("\nSTEP 4: Selecting entries for re-execution...")
        execution_requests = self.selector.select_entries_for_reexecution(
            classified_errors,
            only_fixable=True
        )
        self.selector.print_stats()

        # STEP 5: Re-execute problematic entries (if enabled)
        if reexecute and execution_requests:
            logger.info("\nSTEP 5: Re-executing problematic entries...")
            self._reexecute_entries(execution_requests)
        else:
            logger.info(f"\nSTEP 5: Skipping re-execution (disabled or no entries)")

        # STEP 6: Generate report
        logger.info("\nSTEP 6: Generating report...")
        report = self.reporter.create_report(classified_errors, fix_attempts)

        # Print summary
        self.reporter.print_summary(report)

        # Calculate total duration
        duration = time.time() - start_time
        logger.info(f"\nTotal workflow duration: {duration:.1f} seconds")
        logger.info("=" * 80)

        return report

    def classify_existing_anomalies(
        self,
        anomalies: List[Anomaly]
    ) -> List[ClassifiedError]:
        """
        Classify anomalies that were already detected.

        Args:
            anomalies: List of Anomaly objects from Unified Analyzer

        Returns:
            List of ClassifiedError objects
        """
        logger.info(f"Classifying {len(anomalies)} existing anomalies...")
        classified_errors = self.classifier.classify_batch(anomalies)
        return classified_errors

    def get_code_issues_for_review(
        self,
        classified_errors: List[ClassifiedError]
    ) -> dict:
        """
        Get code-related issues that require manual review.

        Args:
            classified_errors: List of ClassifiedError objects

        Returns:
            Dictionary mapping cluster_name to list of code issues
        """
        return self.selector.get_code_issues_for_review(classified_errors)

    def _run_unified_analyzer(
        self,
        cluster_names: Optional[List[str]] = None
    ) -> List[Anomaly]:
        """
        Run Unified Analyzer to detect anomalies.

        Args:
            cluster_names: Specific clusters to analyze (None = all)

        Returns:
            List of Anomaly objects
        """
        all_anomalies = []

        # Load execution results
        if cluster_names:
            clusters_to_analyze = cluster_names
        else:
            # Load all available clusters
            clusters_to_analyze = self.data_loader.get_all_cluster_names()

        logger.info(f"Analyzing {len(clusters_to_analyze)} clusters...")

        for cluster_name in clusters_to_analyze:
            try:
                # Load entries
                entries = self.data_loader.load_execution_results(
                    cluster_name,
                    test_type='base'
                )

                if not entries:
                    logger.warning(f"No entries found for cluster {cluster_name}")
                    continue

                # Detect anomalies
                try:
                    anomalies = self.detector.detect_all(entries)
                except TypeError as e:
                    # Handle ExecutionEntry unhashable error in outlier detection
                    if "unhashable type" in str(e):
                        logger.warning(
                            f"Skipping outlier detection for cluster {cluster_name} "
                            f"(ExecutionEntry unhashable issue)"
                        )
                        # Detect only invalid values and missing metrics
                        anomalies = []
                        anomalies.extend(self.detector.detect_invalid_values(entries))
                        anomalies.extend(self.detector.detect_missing_metrics(entries))
                    else:
                        raise

                # Perform root cause analysis (if root_cause_analyzer is available)
                if hasattr(self, 'root_cause_analyzer') and self.root_cause_analyzer:
                    for anomaly in anomalies:
                        try:
                            self.root_cause_analyzer.analyze(anomaly)
                        except Exception as e:
                            logger.debug(f"Root cause analysis failed for anomaly: {e}")

                all_anomalies.extend(anomalies)

                logger.debug(
                    f"Cluster {cluster_name}: {len(entries)} entries, "
                    f"{len(anomalies)} anomalies"
                )

            except Exception as e:
                logger.error(
                    f"Error analyzing cluster {cluster_name}: {e}",
                    exc_info=True
                )

        return all_anomalies

    def _reexecute_entries(self, execution_requests):
        """
        Re-execute problematic entries using run_tests_on_cluster.py

        Args:
            execution_requests: List of ExecutionRequest objects
        """
        # Import ClusterRunner and required modules
        sys.path.insert(
            0,
            os.path.join(os.path.dirname(__file__), "..", "run_tests_on_clusters")
        )

        try:
            from run_tests_on_clusters import run_tests_on_cluster


            # Import utility paths
            sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
            from utility_dir import utility_paths

            for request in execution_requests:
                logger.info(
                    f"Re-executing {len(request.entry_ids)} entries from "
                    f"cluster {request.cluster_name}"
                )

                try:
                    # Create ClusterRunner instance
                    runner = run_tests_on_cluster.ClusterRunner(
                        max_workers=4,
                        is_debug=request.verbose
                    )

                    # Build cluster path
                    cluster_path = (
                        utility_paths.CLUSTERS_DIR_FILEPATH /
                        f"cluster_{request.cluster_name}.json"
                    )

                    if not cluster_path.exists():
                        logger.error(f"Cluster file not found: {cluster_path}")
                        continue

                    # Determine execution mode based on test_type
                    base_only = (request.test_type == "base")
                    llm_only = (request.test_type == "llm")

                    # Execute with selective entry_ids filter
                    logger.info(
                        f"Running selective execution for cluster {request.cluster_name} "
                        f"with {len(request.entry_ids)} entry IDs"
                    )

                    base_results, llm_results = runner.run_cluster_tests(
                        cluster_path=cluster_path,
                        base_only=base_only,
                        llm_only=llm_only,
                        full=False,  # Not full mode when selective
                        use_cache=True,
                        run_number=1,  # Single re-execution
                        cluster_name=request.cluster_name,
                        selected_languages=["all"],
                        overwrite_results=True,  # Overwrite previous results
                        entry_ids_filter=request.entry_ids  # ✅ NEW: Selective execution
                    )

                    # Log results
                    total_results = len(base_results) + len(llm_results)
                    logger.info(
                        f"✓ Re-execution completed for {request.cluster_name}: "
                        f"{total_results} entries executed "
                        f"({len(base_results)} base, {len(llm_results)} LLM)"
                    )

                except Exception as e:
                    logger.error(
                        f"Error re-executing cluster {request.cluster_name}: {e}",
                        exc_info=True
                    )

        except ImportError as e:
            logger.error(f"Could not import ClusterRunner: {e}")
            logger.warning("Re-execution skipped - ClusterRunner not available")


def main():
    """CLI entry point"""
    parser = argparse.ArgumentParser(
        description="Auto-Fixer: Automatically fix execution errors",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:

  # Run complete workflow with fixes and re-execution
  python auto_fixer/main.py --apply-fixes --reexecute

  # Analyze specific clusters only
  python auto_fixer/main.py --clusters contains_duplicate palindrome

  # Dry run (simulate fixes without executing)
  python auto_fixer/main.py --dry-run --apply-fixes

  # Classify errors only, no fixes
  python auto_fixer/main.py

  # Export reports in multiple formats
  python auto_fixer/main.py --export json markdown csv

  # Verbose output for debugging
  python auto_fixer/main.py --verbose --apply-fixes
        """
    )

    parser.add_argument(
        '--clusters',
        nargs='+',
        help='Specific clusters to analyze (default: all)'
    )

    parser.add_argument(
        '--apply-fixes',
        action='store_true',
        help='Apply automatic fixes for environment/infrastructure issues'
    )

    parser.add_argument(
        '--reexecute',
        action='store_true',
        help='Re-execute problematic entries after fixing'
    )

    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Simulate fixes without executing (useful for testing)'
    )

    parser.add_argument(
        '--export',
        nargs='+',
        choices=['json', 'markdown', 'csv'],
        help='Export report formats'
    )

    parser.add_argument(
        '--output-dir',
        help='Output directory for reports'
    )

    parser.add_argument(
        '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )

    args = parser.parse_args()

    # Initialize AutoFixer
    fixer = AutoFixer(
        dry_run=args.dry_run,
        verbose=args.verbose,
        output_dir=args.output_dir
    )

    # Run workflow
    report = fixer.run_complete_workflow(
        cluster_names=args.clusters,
        apply_fixes=args.apply_fixes,
        reexecute=args.reexecute
    )

    # Export reports
    if args.export:
        print("\nExporting reports...")
        if 'json' in args.export:
            path = fixer.reporter.export_json(report)
            print(f"  JSON:     {path}")

        if 'markdown' in args.export:
            path = fixer.reporter.export_markdown(report)
            print(f"  Markdown: {path}")

        if 'csv' in args.export:
            path = fixer.reporter.export_csv(report)
            print(f"  CSV:      {path}")

    # Exit code based on unfixable errors
    if report.unfixable_errors > 0:
        print(
            f"\n⚠️  {report.unfixable_errors} unfixable errors require manual review"
        )
        sys.exit(1)
    else:
        print("\n✓ All errors resolved or fixable")
        sys.exit(0)


if __name__ == "__main__":
    main()
