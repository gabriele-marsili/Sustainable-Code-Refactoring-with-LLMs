#!/usr/bin/env python3
"""
Base Code Analyzer - Focused analysis on base code entries

This module analyzes ONLY base code entries (not LLM-generated code)
to identify problematic entries that should be considered for removal.
"""

import sys
import os
import logging
from pathlib import Path
from typing import Dict, List, Set, Optional
from collections import defaultdict
from dataclasses import dataclass, field

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer

logger = logging.getLogger(__name__)


@dataclass
class EntryIssue:
    """Details about an issue with a specific entry"""
    entry_id: str
    cluster_name: str
    language: str
    filename: str
    
    # Issue details
    root_cause: str
    severity: str
    error_message: Optional[str] = None
    
    # Metrics (if available)
    execution_time_ms: Optional[float] = None
    cpu_usage: Optional[float] = None
    ram_usage: Optional[float] = None
    
    # File paths
    code_file_path: Optional[str] = None
    test_file_path: Optional[str] = None
    log_path: Optional[str] = None
    
    # How many times this entry failed
    failure_count: int = 1


@dataclass
class LanguageStats:
    """Statistics for a programming language"""
    language: str
    total_entries: int = 0
    problematic_entries: int = 0
    
    # By root cause
    issues_by_root_cause: Dict[str, int] = field(default_factory=lambda: defaultdict(int))
    
    # By severity
    critical_issues: int = 0
    high_issues: int = 0
    medium_issues: int = 0
    
    # Impact metrics
    removal_impact_percentage: float = 0.0
    
    def calculate_impact(self):
        """Calculate the impact of removing problematic entries"""
        if self.total_entries > 0:
            self.removal_impact_percentage = (
                self.problematic_entries / self.total_entries * 100
            )


@dataclass
class BaseCodeAnalysisReport:
    """Complete analysis report for base code"""
    
    # Summary
    total_entries_analyzed: int = 0
    total_problematic_entries: int = 0
    
    # By language
    language_stats: Dict[str, LanguageStats] = field(default_factory=dict)
    
    # Detailed issues
    problematic_entries: List[EntryIssue] = field(default_factory=list)
    
    # Entry IDs to consider for removal
    entries_to_remove: Set[str] = field(default_factory=set)
    
    # By cluster
    issues_by_cluster: Dict[str, List[EntryIssue]] = field(default_factory=lambda: defaultdict(list))
    
    # Root causes summary
    issues_by_root_cause: Dict[str, int] = field(default_factory=lambda: defaultdict(int))


class BaseCodeAnalyzer:
    """
    Analyzes base code entries to identify problematic ones.
    
    Focuses ONLY on base code (not LLM-generated) to determine
    which entries should be removed from the dataset.
    """
    
    def __init__(self, config: Optional[AnalyzerConfig] = None):
        """Initialize base code analyzer"""
        self.config = config or AnalyzerConfig.load_default()
        self.data_loader = DataLoader(self.config)
        self.detector = AnomalyDetector(self.config)
        self.root_cause_analyzer = RootCauseAnalyzer(self.config, self.data_loader)
        
        logger.info("BaseCodeAnalyzer initialized")
    
    def analyze_all_clusters(
        self,
        cluster_names: Optional[List[str]] = None,
        enable_root_cause: bool = True
    ) -> BaseCodeAnalysisReport:
        """
        Analyze all clusters and generate comprehensive report
        
        Args:
            cluster_names: Specific clusters to analyze (None = all)
            enable_root_cause: Whether to perform root cause analysis
            
        Returns:
            BaseCodeAnalysisReport with detailed findings
        """
        logger.info("Starting base code analysis...")
        
        # Get clusters to analyze
        if cluster_names:
            clusters = cluster_names
        else:
            clusters = self.data_loader.get_all_cluster_names()
        
        logger.info(f"Analyzing {len(clusters)} clusters...")
        
        # Initialize report
        report = BaseCodeAnalysisReport()
        
        # Track entries per language
        entries_per_language = defaultdict(set)
        
        # Analyze each cluster
        for i, cluster_name in enumerate(clusters, 1):
            if i % 50 == 0:
                logger.info(f"Progress: {i}/{len(clusters)} clusters analyzed...")
            
            try:
                cluster_issues = self._analyze_cluster(
                    cluster_name,
                    enable_root_cause
                )
                
                # Add to report
                for issue in cluster_issues:
                    report.problematic_entries.append(issue)
                    report.issues_by_cluster[cluster_name].append(issue)
                    report.issues_by_root_cause[issue.root_cause] += 1
                    
                    # Track for language stats
                    entries_per_language[issue.language].add(issue.entry_id)
                    
                    # Add to removal candidates if severe
                    if issue.severity in ['critical', 'high']:
                        if issue.root_cause in [
                            'code_bug', 'compilation_error', 
                            'runtime_crash', 'assertion_failure'
                        ]:
                            report.entries_to_remove.add(issue.entry_id)
                
                # Also track total entries from cluster metadata
                metadata = self.data_loader.load_cluster_metadata(cluster_name)
                if metadata:
                    for language, entries in metadata.items():
                        for entry in entries:
                            entries_per_language[language].add(entry['id'])
                
            except Exception as e:
                logger.error(f"Error analyzing cluster {cluster_name}: {e}")
                continue
        
        # Calculate language statistics
        self._calculate_language_stats(report, entries_per_language)
        
        # Final counts
        report.total_entries_analyzed = sum(
            len(entries) for entries in entries_per_language.values()
        )
        report.total_problematic_entries = len(report.problematic_entries)
        
        logger.info(
            f"Analysis complete: {report.total_problematic_entries} issues found "
            f"in {report.total_entries_analyzed} entries"
        )
        
        return report
    
    def _analyze_cluster(
        self,
        cluster_name: str,
        enable_root_cause: bool
    ) -> List[EntryIssue]:
        """Analyze a single cluster for base code issues"""
        issues = []
        
        # Load ONLY base test results
        entries = self.data_loader.load_execution_results(
            cluster_name,
            test_type='base'  # ONLY base code!
        )
        
        if not entries:
            return issues
        
        # Detect anomalies
        try:
            anomalies = self.detector.detect_invalid_values(entries)
            anomalies.extend(self.detector.detect_missing_metrics(entries))
        except Exception as e:
            logger.warning(f"Error detecting anomalies in {cluster_name}: {e}")
            return issues
        
        # Perform root cause analysis
        if enable_root_cause:
            for anomaly in anomalies:
                try:
                    self.root_cause_analyzer.analyze(anomaly)
                except Exception as e:
                    logger.debug(f"Root cause analysis failed: {e}")
        
        # Convert anomalies to EntryIssue objects
        for anomaly in anomalies:
            entry = anomaly.entry
            
            # Determine root cause
            root_cause = (
                anomaly.probable_causes[0].value 
                if anomaly.probable_causes 
                else 'unknown'
            )
            
            issue = EntryIssue(
                entry_id=entry.id,
                cluster_name=cluster_name,
                language=entry.language,
                filename=entry.filename,
                root_cause=root_cause,
                severity=anomaly.severity.value,
                error_message=entry.error_message,
                execution_time_ms=entry.execution_time_ms,
                cpu_usage=entry.cpu_usage,
                ram_usage=entry.ram_usage,
                code_file_path=str(entry.code_path) if entry.code_path else None,
                test_file_path=str(entry.test_path) if entry.test_path else None,
                log_path=str(entry.log_path) if entry.log_path else None
            )
            
            issues.append(issue)
        
        return issues
    
    def _calculate_language_stats(
        self,
        report: BaseCodeAnalysisReport,
        entries_per_language: Dict[str, Set[str]]
    ):
        """Calculate statistics per language"""
        
        # Initialize stats for each language
        for language, entry_ids in entries_per_language.items():
            stats = LanguageStats(
                language=language,
                total_entries=len(entry_ids)
            )
            
            # Count problematic entries for this language
            problematic_ids = set()
            for issue in report.problematic_entries:
                if issue.language == language:
                    problematic_ids.add(issue.entry_id)
                    stats.issues_by_root_cause[issue.root_cause] += 1
                    
                    if issue.severity == 'critical':
                        stats.critical_issues += 1
                    elif issue.severity == 'high':
                        stats.high_issues += 1
                    elif issue.severity == 'medium':
                        stats.medium_issues += 1
            
            stats.problematic_entries = len(problematic_ids)
            stats.calculate_impact()
            
            report.language_stats[language] = stats
