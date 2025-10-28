"""Configuration for unified analyzer"""

import sys
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Dict, Optional

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from utility_dir import utility_paths
from .enums import AnalysisMode


@dataclass
class AnalyzerConfig:
    """Configuration for the unified analyzer"""

    # Directory paths
    clusters_dir: Path = utility_paths.CLUSTERS_DIR_FILEPATH
    output_dir: Path = utility_paths.OUTPUT_DIR_FILEPATH
    logs_dir: Path = utility_paths.SRC_DIR / "logs"
    dataset_dir: Path = utility_paths.DATASET_DIR

    # Analysis thresholds
    outlier_threshold_percentage: float = 500.0  # 500% deviation for outliers
    outlier_iqr_multiplier: float = 3.0  # IQR method multiplier
    invalid_value_threshold: float = 0.0  # Values <= this are invalid

    # Required metrics
    required_metrics: List[str] = field(default_factory=lambda: [
        'CPU_usage', 'RAM_usage', 'execution_time_ms'
    ])

    # Analysis modes
    enabled_modes: List[AnalysisMode] = field(default_factory=lambda: [
        AnalysisMode.ALL
    ])

    # Filtering options
    priority_languages: List[str] = field(default_factory=lambda: [
        'c', 'cpp', 'java'
    ])

    skip_cluster_patterns: List[str] = field(default_factory=lambda: [
        'debug_', 'test_', 'focused_', 'bad_entries', 'with_metrics'
    ])

    # Root cause analysis options
    enable_log_analysis: bool = True
    enable_code_inspection: bool = True
    max_log_size_mb: int = 10  # Max log file size to read

    # Performance options
    max_workers: int = 4  # For parallel processing
    cache_enabled: bool = True

    # Output options
    verbose: bool = True
    save_reports: bool = True
    reports_dir: Path = field(default_factory=lambda:
        utility_paths.SRC_DIR / "unified_analyzer" / "reports"
    )

    def __post_init__(self):
        """Validate and convert paths"""
        self.clusters_dir = Path(self.clusters_dir)
        self.output_dir = Path(self.output_dir)
        self.logs_dir = Path(self.logs_dir)
        self.dataset_dir = Path(self.dataset_dir)
        self.reports_dir = Path(self.reports_dir)

        # Create reports directory if it doesn't exist
        if self.save_reports:
            self.reports_dir.mkdir(parents=True, exist_ok=True)

    def is_mode_enabled(self, mode: AnalysisMode) -> bool:
        """Check if an analysis mode is enabled"""
        return AnalysisMode.ALL in self.enabled_modes or mode in self.enabled_modes

    def should_skip_cluster(self, cluster_name: str) -> bool:
        """Check if cluster should be skipped"""
        return any(pattern in cluster_name.lower()
                  for pattern in self.skip_cluster_patterns)

    def is_priority_language(self, language: str) -> bool:
        """Check if language is in priority list"""
        return language.lower() in [lang.lower() for lang in self.priority_languages]

    def to_dict(self) -> Dict:
        """Convert to dictionary"""
        return {
            'clusters_dir': str(self.clusters_dir),
            'output_dir': str(self.output_dir),
            'logs_dir': str(self.logs_dir),
            'outlier_threshold_percentage': self.outlier_threshold_percentage,
            'outlier_iqr_multiplier': self.outlier_iqr_multiplier,
            'invalid_value_threshold': self.invalid_value_threshold,
            'required_metrics': self.required_metrics,
            'enabled_modes': [str(mode) for mode in self.enabled_modes],
            'priority_languages': self.priority_languages,
            'enable_log_analysis': self.enable_log_analysis,
            'enable_code_inspection': self.enable_code_inspection,
            'verbose': self.verbose
        }

    @classmethod
    def load_default(cls) -> "AnalyzerConfig":
        """Load default configuration"""
        return cls()

    @classmethod
    def for_outlier_detection(cls) -> "AnalyzerConfig":
        """Configuration optimized for outlier detection"""
        config = cls()
        config.enabled_modes = [AnalysisMode.OUTLIERS]
        config.enable_log_analysis = False
        return config

    @classmethod
    def for_root_cause_analysis(cls) -> "AnalyzerConfig":
        """Configuration optimized for root cause analysis"""
        config = cls()
        config.enabled_modes = [
            AnalysisMode.INVALID_VALUES,
            AnalysisMode.MISSING_METRICS,
            AnalysisMode.ROOT_CAUSE
        ]
        config.enable_log_analysis = True
        config.enable_code_inspection = True
        return config

    @classmethod
    def for_quick_scan(cls) -> "AnalyzerConfig":
        """Configuration for quick scan (no deep analysis)"""
        config = cls()
        config.enabled_modes = [
            AnalysisMode.INVALID_VALUES,
            AnalysisMode.MISSING_METRICS
        ]
        config.enable_log_analysis = False
        config.enable_code_inspection = False
        return config
