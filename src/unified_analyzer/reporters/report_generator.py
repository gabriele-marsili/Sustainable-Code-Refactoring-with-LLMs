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
        total_entries: int,
        all_entries: List = None  # Optional: all entries for better stats
    ) -> AnalysisReport:
        """
        Generate complete analysis report

        Args:
            anomalies: List of detected anomalies
            total_entries: Total number of entries analyzed
            all_entries: Optional list of all entries (for per-language percentages)

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
        report.summary_by_language = self._summarize_by_language(anomalies, all_entries)
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

    def _summarize_by_language(self, anomalies: List[Anomaly], all_entries: List = None) -> Dict[str, Dict]:
        """
        Summarize anomalies by programming language with percentages

        Args:
            anomalies: List of anomalies
            all_entries: Optional list of all entries for percentage calculation
        """
        # Count total entries per language
        total_by_language = defaultdict(int)
        if all_entries:
            for entry in all_entries:
                total_by_language[entry.language] += 1

        # Count unique problematic entries per language
        problematic_entries_by_lang = defaultdict(set)
        for anomaly in anomalies:
            problematic_entries_by_lang[anomaly.entry.language].add(anomaly.entry.id)

        summary = defaultdict(lambda: {
            'total_anomalies': 0,
            'total_entries': 0,
            'problematic_entries': 0,
            'anomaly_percentage': 0.0,
            'by_type': defaultdict(int),
            'by_severity': defaultdict(int)
        })

        for anomaly in anomalies:
            lang = anomaly.entry.language
            summary[lang]['total_anomalies'] += 1
            summary[lang]['by_type'][anomaly.anomaly_type] += 1
            summary[lang]['by_severity'][anomaly.severity] += 1

        # Add totals and calculate percentages
        for lang in summary:
            summary[lang]['total_entries'] = total_by_language.get(lang, 0)
            summary[lang]['problematic_entries'] = len(problematic_entries_by_lang[lang])

            if summary[lang]['total_entries'] > 0:
                summary[lang]['anomaly_percentage'] = (
                    summary[lang]['problematic_entries'] / summary[lang]['total_entries'] * 100
                )

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

        # Language breakdown with percentages
        lines.append("By Programming Language:")
        lines.append("-" * 80)
        lines.append(f"  {'Language':<15} {'Entries':<12} {'Problems':<12} {'Anomalies':<12} {'Rate':<10}")
        lines.append("  " + "-" * 76)
        for lang, lang_summary in sorted(report.summary_by_language.items()):
            total_entries = lang_summary.get('total_entries', 0)
            problematic = lang_summary.get('problematic_entries', 0)
            total_anomalies = lang_summary.get('total_anomalies', 0)
            percentage = lang_summary.get('anomaly_percentage', 0)

            if total_entries > 0:
                lines.append(
                    f"  {lang.upper():<15} {total_entries:>8}    "
                    f"{problematic:>8}    {total_anomalies:>8}    {percentage:>6.2f}%"
                )
            else:
                lines.append(
                    f"  {lang.upper():<15} {'N/A':<12} {problematic:>8}    {total_anomalies:>8}    {'N/A'}"
                )
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

    def generate_removal_impact_analysis(
        self,
        report: AnalysisReport,
        all_entries: List
    ) -> Dict:
        """
        Analyze the impact of removing all problematic entries

        Args:
            report: Analysis report with anomalies
            all_entries: List of all entries

        Returns:
            Dictionary with impact analysis
        """
        # Identify unique problematic entries
        problematic_entry_ids = set()
        problematic_by_cluster = defaultdict(set)
        problematic_by_language = defaultdict(set)

        for anomaly in report.anomalies:
            entry_id = anomaly.entry.id
            cluster = anomaly.entry.cluster_name
            language = anomaly.entry.language

            problematic_entry_ids.add(entry_id)
            problematic_by_cluster[cluster].add(entry_id)
            problematic_by_language[language].add(entry_id)

        # Count totals
        total_entries = len(all_entries)
        total_by_cluster = defaultdict(int)
        total_by_language = defaultdict(int)

        for entry in all_entries:
            total_by_cluster[entry.cluster_name] += 1
            total_by_language[entry.language] += 1

        # Calculate impact
        impact = {
            'total_entries': total_entries,
            'problematic_entries': len(problematic_entry_ids),
            'removal_percentage': len(problematic_entry_ids) / total_entries * 100 if total_entries > 0 else 0,
            'entries_remaining': total_entries - len(problematic_entry_ids),
            'by_language': {},
            'by_cluster': {},
            'clusters_severely_impacted': [],  # >50% loss
            'clusters_moderately_impacted': [],  # 25-50% loss
            'languages_severely_impacted': [],  # >50% loss
            'recommendation': 'unknown'
        }

        # Impact by language
        for lang, total in total_by_language.items():
            problematic_count = len(problematic_by_language[lang])
            remaining = total - problematic_count
            loss_percentage = problematic_count / total * 100 if total > 0 else 0

            impact['by_language'][lang] = {
                'total': total,
                'problematic': problematic_count,
                'remaining': remaining,
                'loss_percentage': loss_percentage
            }

            if loss_percentage > 50:
                impact['languages_severely_impacted'].append({
                    'language': lang,
                    'loss_percentage': loss_percentage,
                    'remaining': remaining
                })

        # Impact by cluster
        for cluster, total in total_by_cluster.items():
            problematic_count = len(problematic_by_cluster[cluster])
            remaining = total - problematic_count
            loss_percentage = problematic_count / total * 100 if total > 0 else 0

            impact['by_cluster'][cluster] = {
                'total': total,
                'problematic': problematic_count,
                'remaining': remaining,
                'loss_percentage': loss_percentage
            }

            if loss_percentage > 50:
                impact['clusters_severely_impacted'].append({
                    'cluster': cluster,
                    'loss_percentage': loss_percentage,
                    'remaining': remaining
                })
            elif loss_percentage > 25:
                impact['clusters_moderately_impacted'].append({
                    'cluster': cluster,
                    'loss_percentage': loss_percentage,
                    'remaining': remaining
                })

        # Generate recommendation
        if impact['removal_percentage'] > 25:
            impact['recommendation'] = 'HIGH_RISK'
        elif impact['removal_percentage'] > 10:
            impact['recommendation'] = 'MODERATE_RISK'
        elif len(impact['languages_severely_impacted']) > 0:
            impact['recommendation'] = 'LANGUAGE_IMBALANCE_RISK'
        else:
            impact['recommendation'] = 'LOW_RISK'

        return impact

    def generate_removal_impact_text(self, impact: Dict) -> str:
        """
        Generate human-readable impact analysis

        Args:
            impact: Impact analysis dictionary

        Returns:
            Formatted text
        """
        lines = []
        lines.append("=" * 80)
        lines.append("REMOVAL IMPACT ANALYSIS")
        lines.append("=" * 80)
        lines.append("")
        lines.append("This analysis shows the impact of removing ALL entries with anomalies.")
        lines.append("")

        # Overall impact
        lines.append("Overall Impact:")
        lines.append("-" * 40)
        lines.append(f"  Total entries in dataset: {impact['total_entries']:,}")
        lines.append(f"  Problematic entries: {impact['problematic_entries']:,}")
        lines.append(f"  Would be removed: {impact['removal_percentage']:.2f}%")
        lines.append(f"  Entries remaining: {impact['entries_remaining']:,}")
        lines.append("")

        # Recommendation
        rec = impact['recommendation']
        lines.append("Recommendation:")
        lines.append("-" * 40)
        if rec == 'HIGH_RISK':
            lines.append("  ⚠️  HIGH RISK - Removing >25% of dataset")
            lines.append("  Recommendation: DO NOT remove all entries. Consider selective removal.")
        elif rec == 'MODERATE_RISK':
            lines.append("  ⚠️  MODERATE RISK - Removing 10-25% of dataset")
            lines.append("  Recommendation: Proceed with caution. Review entries individually.")
        elif rec == 'LANGUAGE_IMBALANCE_RISK':
            lines.append("  ⚠️  LANGUAGE IMBALANCE RISK")
            lines.append("  Some languages would lose >50% of entries.")
            lines.append("  Recommendation: Consider language-specific strategies.")
        else:
            lines.append("  ✅ LOW RISK - Removing <10% of dataset")
            lines.append("  Recommendation: Safe to proceed with removal.")
        lines.append("")

        # Language impact
        lines.append("Impact by Language:")
        lines.append("-" * 80)
        lines.append(f"  {'Language':<15} {'Total':<10} {'Remove':<10} {'Remain':<10} {'Loss %':<10}")
        lines.append("  " + "-" * 76)
        for lang, stats in sorted(impact['by_language'].items(), key=lambda x: x[1]['loss_percentage'], reverse=True):
            symbol = "⚠️ " if stats['loss_percentage'] > 50 else "  "
            lines.append(
                f"  {symbol}{lang.upper():<13} {stats['total']:<10} "
                f"{stats['problematic']:<10} {stats['remaining']:<10} {stats['loss_percentage']:>6.2f}%"
            )
        lines.append("")

        # Severely impacted languages
        if impact['languages_severely_impacted']:
            lines.append("⚠️  Severely Impacted Languages (>50% loss):")
            lines.append("-" * 40)
            for lang_info in impact['languages_severely_impacted']:
                lines.append(f"  - {lang_info['language'].upper()}: {lang_info['loss_percentage']:.1f}% loss ({lang_info['remaining']} remaining)")
            lines.append("")

        # Cluster impact summary
        severely_impacted = len(impact['clusters_severely_impacted'])
        moderately_impacted = len(impact['clusters_moderately_impacted'])

        if severely_impacted > 0 or moderately_impacted > 0:
            lines.append("Impacted Clusters:")
            lines.append("-" * 40)
            lines.append(f"  Severely impacted (>50% loss): {severely_impacted} clusters")
            lines.append(f"  Moderately impacted (25-50% loss): {moderately_impacted} clusters")

            if severely_impacted > 0 and severely_impacted <= 10:
                lines.append("")
                lines.append("  Severely impacted clusters:")
                for cluster_info in sorted(impact['clusters_severely_impacted'], key=lambda x: x['loss_percentage'], reverse=True):
                    lines.append(f"    - {cluster_info['cluster']}: {cluster_info['loss_percentage']:.1f}% loss")

        lines.append("")
        lines.append("=" * 80)

        return "\n".join(lines)

    def generate_removal_list(
        self,
        report: AnalysisReport,
        output_path: str = None
    ) -> List[Dict]:
        """
        Generate list of entries to remove

        Args:
            report: Analysis report
            output_path: Optional path to save JSON file

        Returns:
            List of entries to remove with metadata
        """
        removal_list = []
        seen_entries = set()

        for anomaly in report.anomalies:
            entry_id = anomaly.entry.id

            # Avoid duplicates
            if entry_id in seen_entries:
                continue
            seen_entries.add(entry_id)

            removal_entry = {
                'entry_id': entry_id,
                'cluster_name': anomaly.entry.cluster_name,
                'language': anomaly.entry.language,
                'filename': anomaly.entry.filename,
                'test_type': anomaly.entry.test_type,
                'anomaly_types': [],
                'severities': [],
                'issues': [],
                'reason': ''
            }

            # Collect all anomalies for this entry
            entry_anomalies = [a for a in report.anomalies if a.entry.id == entry_id]

            for a in entry_anomalies:
                removal_entry['anomaly_types'].append(str(a.anomaly_type))
                removal_entry['severities'].append(str(a.severity))
                removal_entry['issues'].extend(a.detected_issues)

            # Deduplicate
            removal_entry['anomaly_types'] = list(set(removal_entry['anomaly_types']))
            removal_entry['severities'] = list(set(removal_entry['severities']))

            # Generate reason
            removal_entry['reason'] = f"Entry has {len(entry_anomalies)} anomalies: " + ", ".join(removal_entry['anomaly_types'][:3])

            removal_list.append(removal_entry)

        # Save if path provided
        if output_path:
            import json
            from pathlib import Path

            output_file = Path(output_path)
            output_file.parent.mkdir(parents=True, exist_ok=True)

            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'generated_at': datetime.now().isoformat(),
                    'total_entries': len(removal_list),
                    'entries': removal_list
                }, f, indent=2, ensure_ascii=False)

            logger.info(f"Removal list saved to: {output_path}")

        return removal_list

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
