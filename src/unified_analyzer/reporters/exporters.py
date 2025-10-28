"""Export reports to various formats"""

import json
import csv
import sys
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.models import AnalysisReport, Anomaly

logger = logging.getLogger(__name__)


class ReportExporter:
    """Exports reports to various formats"""

    @staticmethod
    def export_json(report: AnalysisReport, output_path: Path) -> bool:
        """
        Export report to JSON format

        Args:
            report: Analysis report
            output_path: Output file path

        Returns:
            True if successful
        """
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(report.to_dict(), f, indent=2, ensure_ascii=False)

            logger.info(f"Exported JSON report to: {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error exporting JSON: {e}")
            return False

    @staticmethod
    def export_csv(
        anomalies: List[Anomaly],
        output_path: Path,
        include_recommendations: bool = False
    ) -> bool:
        """
        Export anomalies to CSV format

        Args:
            anomalies: List of anomalies
            output_path: Output file path
            include_recommendations: Include recommendation column

        Returns:
            True if successful
        """
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)

            fieldnames = [
                'anomaly_id',
                'cluster_name',
                'entry_id',
                'language',
                'test_type',
                'anomaly_type',
                'severity',
                'detected_issues',
                'primary_root_cause',
                'execution_time_ms',
                'cpu_usage',
                'ram_usage',
                'test_passed',
                'log_path'
            ]

            if include_recommendations:
                fieldnames.append('recommendations')

            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()

                for anomaly in anomalies:
                    entry = anomaly.entry

                    row = {
                        'anomaly_id': anomaly.anomaly_id,
                        'cluster_name': entry.cluster_name,
                        'entry_id': entry.id,
                        'language': entry.language,
                        'test_type': entry.test_type,
                        'anomaly_type': str(anomaly.anomaly_type),
                        'severity': str(anomaly.severity),
                        'detected_issues': '; '.join(anomaly.detected_issues),
                        'primary_root_cause': str(anomaly.probable_causes[0]) if anomaly.probable_causes else '',
                        'execution_time_ms': entry.execution_time_ms,
                        'cpu_usage': entry.cpu_usage,
                        'ram_usage': entry.ram_usage,
                        'test_passed': entry.regression_test_passed,
                        'log_path': str(entry.log_path) if entry.log_path else ''
                    }

                    if include_recommendations:
                        row['recommendations'] = '; '.join(anomaly.recommended_actions)

                    writer.writerow(row)

            logger.info(f"Exported CSV to: {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error exporting CSV: {e}")
            return False

    @staticmethod
    def export_markdown(
        report: AnalysisReport,
        output_path: Path,
        include_details: bool = True
    ) -> bool:
        """
        Export report to Markdown format

        Args:
            report: Analysis report
            output_path: Output file path
            include_details: Include detailed anomaly listings

        Returns:
            True if successful
        """
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                # Header
                f.write("# Unified Analyzer - Analysis Report\n\n")
                f.write(f"**Analysis Date:** {report.analysis_timestamp.strftime('%Y-%m-%d %H:%M:%S')}\n\n")

                # Summary
                f.write("## Summary\n\n")
                f.write(f"- **Total Entries Analyzed:** {report.total_entries_analyzed:,}\n")
                f.write(f"- **Total Anomalies Detected:** {len(report.anomalies):,}\n")
                f.write(f"- **Anomaly Rate:** {report.statistics['anomaly_rate']*100:.2f}%\n")
                f.write(f"- **Clusters Affected:** {len(report.clusters_affected)}\n\n")

                # Severity breakdown
                f.write("## Severity Breakdown\n\n")
                f.write("| Severity | Count |\n")
                f.write("|----------|-------|\n")
                for severity_name, count in report.summary_by_severity.items():
                    f.write(f"| {severity_name.display_name()} | {count} |\n")
                f.write("\n")

                # Anomaly types
                f.write("## Anomaly Types\n\n")
                f.write("| Type | Count |\n")
                f.write("|------|-------|\n")
                for atype, count in report.summary_by_anomaly_type.items():
                    f.write(f"| {atype.display_name()} | {count} |\n")
                f.write("\n")

                # Language breakdown
                f.write("## By Programming Language\n\n")
                f.write("| Language | Anomalies |\n")
                f.write("|----------|----------|\n")
                for lang, lang_summary in sorted(report.summary_by_language.items()):
                    total = lang_summary['total']
                    f.write(f"| {lang.upper()} | {total} |\n")
                f.write("\n")

                # Root causes
                if report.summary_by_root_cause:
                    f.write("## Top Root Causes\n\n")
                    f.write("| Root Cause | Count |\n")
                    f.write("|------------|-------|\n")
                    sorted_causes = sorted(
                        report.summary_by_root_cause.items(),
                        key=lambda x: x[1],
                        reverse=True
                    )
                    for cause, count in sorted_causes[:10]:
                        f.write(f"| {cause.display_name()} | {count} |\n")
                    f.write("\n")

                # Detailed listings
                if include_details:
                    f.write("## Detailed Anomalies\n\n")

                    # Group by cluster
                    for cluster_name in sorted(report.clusters_affected):
                        cluster_anomalies = report.get_anomalies_by_cluster(cluster_name)

                        f.write(f"### Cluster: `{cluster_name}` ({len(cluster_anomalies)} anomalies)\n\n")

                        for anomaly in sorted(cluster_anomalies, key=lambda a: a.severity):
                            f.write(f"#### {anomaly.anomaly_id}\n\n")
                            f.write(f"- **Type:** {anomaly.anomaly_type.display_name()}\n")
                            f.write(f"- **Severity:** {anomaly.severity.display_name()}\n")
                            f.write(f"- **Entry:** {anomaly.entry.id} ({anomaly.entry.language})\n")

                            if anomaly.probable_causes:
                                cause = anomaly.probable_causes[0]
                                f.write(f"- **Root Cause:** {cause.display_name()}\n")

                            if anomaly.detected_issues:
                                f.write(f"- **Issues:**\n")
                                for issue in anomaly.detected_issues[:3]:
                                    f.write(f"  - {issue}\n")

                            if anomaly.recommended_actions:
                                f.write(f"- **Recommendations:**\n")
                                for action in anomaly.recommended_actions[:3]:
                                    f.write(f"  - {action}\n")

                            f.write("\n")

            logger.info(f"Exported Markdown to: {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error exporting Markdown: {e}")
            return False

    @staticmethod
    def export_summary_text(report: AnalysisReport, output_path: Path) -> bool:
        """
        Export summary as plain text

        Args:
            report: Analysis report
            output_path: Output file path

        Returns:
            True if successful
        """
        try:
            from .report_generator import ReportGenerator
            from ..core.config import AnalyzerConfig

            output_path.parent.mkdir(parents=True, exist_ok=True)

            generator = ReportGenerator(AnalyzerConfig())
            summary_text = generator.generate_summary_text(report)

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(summary_text)

            logger.info(f"Exported text summary to: {output_path}")
            return True

        except Exception as e:
            logger.error(f"Error exporting text summary: {e}")
            return False
