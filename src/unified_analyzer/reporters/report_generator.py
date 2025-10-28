"""Report generation from analysis results"""

import sys
import os
import logging
from typing import List, Dict, Set
from datetime import datetime
from collections import defaultdict

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from ..core.config import AnalyzerConfig
from ..core.models import Anomaly, AnalysisReport
from ..core.enums import AnomalyType, Severity, RootCause

logger = logging.getLogger(__name__)


class ReportGenerator:
    """Generates analysis reports"""

    def __init__(self, config: AnalyzerConfig):
        """
        Initialize report generator

        Args:
            config: Analyzer configuration
        """
        self.config = config

    def generate_full_report(
        self,
        anomalies: List[Anomaly],
        total_entries: int
    ) -> AnalysisReport:
        """
        Generate complete analysis report

        Args:
            anomalies: List of detected anomalies
            total_entries: Total number of entries analyzed

        Returns:
            AnalysisReport object
        """
        report = AnalysisReport(
            analysis_timestamp=datetime.now(),
            config=self.config.to_dict(),
            total_entries_analyzed=total_entries,
            anomalies=anomalies
        )

        # Calculate statistics
        report.statistics = self._calculate_statistics(anomalies, total_entries)

        # Build summaries
        report.clusters_affected = self._get_affected_clusters(anomalies)
        report.summary_by_language = self._summarize_by_language(anomalies)
        report.summary_by_anomaly_type = self._summarize_by_anomaly_type(anomalies)
        report.summary_by_severity = self._summarize_by_severity(anomalies)
        report.summary_by_root_cause = self._summarize_by_root_cause(anomalies)

        logger.info(f"Generated report with {len(anomalies)} anomalies")
        return report

    def _calculate_statistics(
        self,
        anomalies: List[Anomaly],
        total_entries: int
    ) -> Dict:
        """Calculate statistics"""
        return {
            'total_entries': total_entries,
            'total_anomalies': len(anomalies),
            'anomaly_rate': len(anomalies) / total_entries if total_entries > 0 else 0,
            'critical_anomalies': len([a for a in anomalies if a.severity == Severity.CRITICAL]),
            'high_severity_anomalies': len([a for a in anomalies if a.severity == Severity.HIGH]),
            'medium_severity_anomalies': len([a for a in anomalies if a.severity == Severity.MEDIUM]),
            'low_severity_anomalies': len([a for a in anomalies if a.severity == Severity.LOW]),
        }

    def _get_affected_clusters(self, anomalies: List[Anomaly]) -> Set[str]:
        """Get set of affected cluster names"""
        return {a.entry.cluster_name for a in anomalies}

    def _summarize_by_language(self, anomalies: List[Anomaly]) -> Dict[str, Dict]:
        """Summarize anomalies by programming language"""
        summary = defaultdict(lambda: {
            'total': 0,
            'by_type': defaultdict(int),
            'by_severity': defaultdict(int)
        })

        for anomaly in anomalies:
            lang = anomaly.entry.language
            summary[lang]['total'] += 1
            summary[lang]['by_type'][anomaly.anomaly_type] += 1
            summary[lang]['by_severity'][anomaly.severity] += 1

        return dict(summary)

    def _summarize_by_anomaly_type(self, anomalies: List[Anomaly]) -> Dict[AnomalyType, int]:
        """Count anomalies by type"""
        summary = defaultdict(int)
        for anomaly in anomalies:
            summary[anomaly.anomaly_type] += 1
        return dict(summary)

    def _summarize_by_severity(self, anomalies: List[Anomaly]) -> Dict[Severity, int]:
        """Count anomalies by severity"""
        summary = defaultdict(int)
        for anomaly in anomalies:
            summary[anomaly.severity] += 1
        return dict(summary)

    def _summarize_by_root_cause(self, anomalies: List[Anomaly]) -> Dict[RootCause, int]:
        """Count anomalies by root cause"""
        summary = defaultdict(int)
        for anomaly in anomalies:
            if anomaly.probable_causes:
                # Count primary cause
                summary[anomaly.probable_causes[0]] += 1
        return dict(summary)

    def generate_summary_text(self, report: AnalysisReport) -> str:
        """
        Generate human-readable text summary

        Args:
            report: Analysis report

        Returns:
            Formatted text summary
        """
        lines = []
        lines.append("=" * 80)
        lines.append("UNIFIED ANALYZER - ANALYSIS SUMMARY")
        lines.append("=" * 80)
        lines.append(f"Analysis Date: {report.analysis_timestamp.strftime('%Y-%m-%d %H:%M:%S')}")
        lines.append(f"Total Entries Analyzed: {report.total_entries_analyzed:,}")
        lines.append(f"Total Anomalies Detected: {len(report.anomalies):,}")
        lines.append(f"Anomaly Rate: {report.statistics['anomaly_rate']*100:.2f}%")
        lines.append("")

        # Severity breakdown
        lines.append("Severity Breakdown:")
        lines.append("-" * 40)
        for severity in [Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW]:
            count = report.summary_by_severity.get(severity, 0)
            if count > 0:
                lines.append(f"  {severity.display_name():<10} : {count:>5} anomalies")
        lines.append("")

        # Anomaly type breakdown
        lines.append("Anomaly Types:")
        lines.append("-" * 40)
        for atype, count in report.summary_by_anomaly_type.items():
            lines.append(f"  {atype.display_name():<25} : {count:>5}")
        lines.append("")

        # Language breakdown
        lines.append("By Programming Language:")
        lines.append("-" * 40)
        for lang, lang_summary in sorted(report.summary_by_language.items()):
            total = lang_summary['total']
            lines.append(f"  {lang.upper():<15} : {total:>5} anomalies")
        lines.append("")

        # Root causes (top 5)
        if report.summary_by_root_cause:
            lines.append("Top Root Causes:")
            lines.append("-" * 40)
            sorted_causes = sorted(
                report.summary_by_root_cause.items(),
                key=lambda x: x[1],
                reverse=True
            )
            for cause, count in sorted_causes[:5]:
                lines.append(f"  {cause.display_name():<30} : {count:>5}")
            lines.append("")

        # Affected clusters
        lines.append(f"Affected Clusters: {len(report.clusters_affected)}")
        if len(report.clusters_affected) <= 20:
            lines.append("-" * 40)
            for cluster in sorted(report.clusters_affected):
                anomaly_count = len(report.get_anomalies_by_cluster(cluster))
                lines.append(f"  {cluster:<40} : {anomaly_count:>3} anomalies")
        else:
            lines.append(f"  (Too many to list - {len(report.clusters_affected)} clusters)")

        lines.append("")
        lines.append("=" * 80)

        return "\n".join(lines)

    def generate_cluster_report(
        self,
        report: AnalysisReport,
        cluster_name: str
    ) -> str:
        """
        Generate detailed report for a specific cluster

        Args:
            report: Full analysis report
            cluster_name: Name of cluster

        Returns:
            Formatted report text
        """
        cluster_anomalies = report.get_anomalies_by_cluster(cluster_name)

        if not cluster_anomalies:
            return f"No anomalies found for cluster: {cluster_name}"

        lines = []
        lines.append("=" * 80)
        lines.append(f"CLUSTER REPORT: {cluster_name}")
        lines.append("=" * 80)
        lines.append(f"Total Anomalies: {len(cluster_anomalies)}")
        lines.append("")

        # Group by language
        by_language = defaultdict(list)
        for anomaly in cluster_anomalies:
            by_language[anomaly.entry.language].append(anomaly)

        for language, anomalies in sorted(by_language.items()):
            lines.append(f"{language.upper()} ({len(anomalies)} anomalies):")
            lines.append("-" * 40)

            for anomaly in sorted(anomalies, key=lambda a: a.severity):
                lines.append(f"  [{anomaly.severity.display_name()}] {anomaly.anomaly_id}")
                lines.append(f"    Entry: {anomaly.entry.id}")
                lines.append(f"    Type: {anomaly.anomaly_type.display_name()}")

                if anomaly.probable_causes:
                    cause = anomaly.probable_causes[0]
                    lines.append(f"    Root Cause: {cause.display_name()}")

                if anomaly.detected_issues:
                    lines.append(f"    Issues: {', '.join(anomaly.detected_issues[:2])}")

                lines.append("")

        return "\n".join(lines)
