#!/usr/bin/env python3
"""
Pattern Analyzer with AST Analysis - CORRECTED VERSION
- Fixed performance calculation issues
- Improved data validation and outlier handling
- Enhanced visualization clarity
- Better statistical analysis
"""

import json
import statistics
import ast
import logging
from pathlib import Path
import sys
import os
#import difflib
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from scipy import stats
from matplotlib.patches import Rectangle

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402

# ---------- UPDATED CONFIG ----------
SIMILARITY_THRESHOLD = 65.0  # considerati "diversi" dall'originale se < 65%
IMPROVEMENT_THRESHOLD = (
    10.0  # considerati "migliorati" se overall_improvement >= 10% (base rule)
)
TOP_PERCENTILE = (
    0.75  # in alternativa alla base rule: presi i top 25% per overall_improvement
)
WEIGHTS = {"TIME": 0.5, "CPU": 0.30, "RAM": 0.20}

# New outlier detection parameters
MAX_IMPROVEMENT = 200.0  # Cap improvements at 200%
MIN_IMPROVEMENT = -200.0  # Cap degradations at -200%

REPORTS_DIR = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "report_corrected"
DIFFS_DIR = REPORTS_DIR / "diffs"
JSON_OUT = REPORTS_DIR / "llm_improvement_candidates_corrected.json"
AST_PATTERNS_OUT = REPORTS_DIR / "ast_patterns_corrected.json"
PLOT_SIM_VS_IMPR = REPORTS_DIR / "similarity_vs_improvement_corrected.png"
PATTERN_BAR = REPORTS_DIR / "pattern_counts_corrected.png"
PATTERN_CORRELATION = REPORTS_DIR / "pattern_performance_correlation_corrected.png"
AST_COMPLEXITY = REPORTS_DIR / "ast_complexity_analysis_corrected.png"
IMPROVEMENT_HEATMAP = REPORTS_DIR / "improvement_heatmap_corrected.png"
PATTERN_DISTRIBUTION = REPORTS_DIR / "pattern_distribution_by_llm_prompt_language.png"
# ----------------------------

# Setup directories and logging
REPORTS_DIR.mkdir(parents=True, exist_ok=True)
DIFFS_DIR.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@dataclass
class PerformanceMetrics:
    cpu: Optional[float] = None
    ram: Optional[float] = None
    time: Optional[float] = None
    pass_rate: Optional[float] = None


@dataclass
class ASTMetrics:
    node_count: int = 0
    depth: int = 0
    complexity: int = 0
    function_count: int = 0
    class_count: int = 0
    loop_count: int = 0
    condition_count: int = 0


@dataclass
class PatternAnalysis:
    textual_patterns: List[str]
    ast_patterns: List[str]
    ast_metrics: ASTMetrics
    improvement_score: Optional[float] = None


def read_json(path: Path) -> Dict:
    """Read JSON file with error handling."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading {path}: {e}")
        return {}


def safe_mean(values: List[Optional[float]]) -> Optional[float]:
    """Calculate mean of values, ignoring None values."""
    vals = [v for v in values if v is not None and not np.isnan(v) and np.isfinite(v)]
    return statistics.mean(vals) if vals else None


def is_outlier(value: float, threshold: float = 3.0) -> bool:
    """Simple outlier detection using absolute threshold."""
    return abs(value) > threshold * 1000  # Flag values > 3000% as outliers


class PatternAnalyzer:
    """Enhanced Pattern Analyzer with corrected calculations."""

    def __init__(self):
        self.cluster_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR

    def compute_improvement(
        self, base_value: Optional[float], llm_value: Optional[float], metric
    ) -> Optional[float]:
        """
        Compute percentage improvement with proper validation and outlier handling.
        Positive = better performance, Negative = worse performance
        """
        if base_value is None or llm_value is None or base_value == 0 or llm_value == 0:
            return None
        
        # Handle zero and near-zero values
        if abs(base_value) < 1e-6:
            logger.warning(f"Base value too small: {base_value}, skipping calculation")
            return None
            
        try:
            improvement = (base_value - llm_value) / abs(base_value) * 100.0
            
            # Cap extreme values
            if metric != "ram usage":
                if improvement > MAX_IMPROVEMENT:
                    logger.warning(f"Capping improvement from {improvement} to {MAX_IMPROVEMENT} | base value : {base_value} , LLM value : {llm_value}, metric = {metric}")
                    return MAX_IMPROVEMENT
                elif improvement < MIN_IMPROVEMENT:
                    logger.warning(f"Capping degradation from {improvement} to {MIN_IMPROVEMENT} | base value : {base_value} , LLM value : {llm_value}, metric = {metric}")
                    return MIN_IMPROVEMENT
                
            # Flag potential outliers
            if is_outlier(improvement):
                logger.warning(f"Potential outlier detected: base={base_value}, llm={llm_value}, improvement={improvement}")
                
            return improvement
        except Exception as e:
            logger.error(f"Error computing improvement: base={base_value}, llm={llm_value}, error={e}")
            return None

    def validate_performance_data(self, perf_data: Dict) -> Dict:
        """Validate and clean performance data."""
        cleaned_data = {}
        
        for key, perf in perf_data.items():
            # Check for reasonable values
            valid = True
            
            if perf.time is not None and (perf.time < 0 or perf.time > 1000000):  # > 1000 seconds
                logger.warning(f"Suspicious time value: {perf.time} for {key}")
                valid = False
                
            if perf.cpu is not None and (perf.cpu < 0 or perf.cpu > 150):  # > 150% CPU
                logger.warning(f"Suspicious CPU value: {perf.cpu} for {key}")
                valid = False
                
            if perf.ram is not None and (perf.ram < 0 or perf.ram > 10000000):  # > 10GB RAM
                logger.warning(f"Suspicious RAM value: {perf.ram} for {key}")
                valid = False
                
            if valid:
                cleaned_data[key] = perf
            
        return cleaned_data

    def create_corrected_visualizations(
        self,
        df: pd.DataFrame,
        pattern_counter: Counter,
        ast_patterns: Dict,
        correlation_data: Dict,
    ):
        """Create improved and corrected visualizations."""
        
        # Set better style
        plt.style.use('default')  # Use default instead of seaborn
        plt.rcParams.update({
            'font.size': 10,
            'axes.labelsize': 12,
            'axes.titlesize': 14,
            'xtick.labelsize': 10,
            'ytick.labelsize': 10,
            'legend.fontsize': 10,
            'figure.titlesize': 16
        })

        # 1. CORRECTED Similarity vs Improvement scatter plot
        self._create_corrected_similarity_plot(df)
        
        # 2. IMPROVED Pattern frequency charts
        self._create_improved_pattern_charts(pattern_counter, ast_patterns)
        
        # 3. CORRECTED AST complexity analysis
        self._create_corrected_ast_analysis(df)
        
        # 4. IMPROVED Correlation heatmap
        self._create_improved_correlation_heatmap(correlation_data)
        
        # 5. CORRECTED Improvement heatmap
        self._create_corrected_improvement_heatmap(df)

        # 6. Pattern distribution by LLM, prompt version, language
        self._create_pattern_distribution(df)

    def _create_corrected_similarity_plot(self, df: pd.DataFrame):
        """Create a much clearer similarity vs improvement plot."""
        
        # Filter out extreme outliers for visualization
        df_filtered = df[
            (df['overall_improvement'].between(-150, 150)) &
            (df['similarity_index'].between(0, 100))
        ].copy()
        
        fig, ax = plt.subplots(figsize=(14, 10))
        
        # Use different markers and colors for each LLM
        llm_styles = {
            'openAI': {'color': '#FF6B6B', 'marker': 'o', 'alpha': 0.6},
            'claude': {'color': '#4ECDC4', 'marker': 's', 'alpha': 0.6},
            'gemini': {'color': '#45B7D1', 'marker': '^', 'alpha': 0.6}
        }
        
        for llm_type in df_filtered['llm_type'].unique():
            llm_data = df_filtered[df_filtered['llm_type'] == llm_type]
            style = llm_styles.get(llm_type, {'color': 'gray', 'marker': 'o', 'alpha': 0.6})
            
            ax.scatter(
                llm_data['similarity_index'],
                llm_data['overall_improvement'],
                c=style['color'],
                marker=style['marker'],
                alpha=style['alpha'],
                s=40,
                label=f'{llm_type} (n={len(llm_data)})',
                edgecolors='white',
                linewidth=0.5
            )

        # Add threshold lines
        ax.axvline(SIMILARITY_THRESHOLD, color='red', linestyle='--', alpha=0.8, 
                  label=f'Similarity threshold ({SIMILARITY_THRESHOLD}%)')
        ax.axhline(IMPROVEMENT_THRESHOLD, color='orange', linestyle='--', alpha=0.8,
                  label=f'Improvement threshold ({IMPROVEMENT_THRESHOLD}%)')
        ax.axhline(0, color='black', linestyle='-', alpha=0.3, linewidth=0.8)

        # Highlight selection region
        ax.add_patch(Rectangle((0, IMPROVEMENT_THRESHOLD), SIMILARITY_THRESHOLD,
                              150 - IMPROVEMENT_THRESHOLD, alpha=0.1, color='green',
                              label='Target selection region'))

        ax.set_xlabel('Code Similarity Index (%)', fontweight='bold')
        ax.set_ylabel('Overall Performance Improvement (%)', fontweight='bold')
        ax.set_title('LLM Code Optimization: Similarity vs Performance Analysis\n(Outliers filtered for clarity)',
                    fontweight='bold', pad=20)
        
        # Improve legend
        ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left', frameon=True, 
                 fancybox=True, shadow=True)
        ax.grid(True, alpha=0.3)
        
        # Add statistics box
        stats_text = f"""Dataset Statistics:
Total entries: {len(df):,}
Filtered for plot: {len(df_filtered):,}
Mean improvement: {df_filtered['overall_improvement'].mean():.1f}%
Std improvement: {df_filtered['overall_improvement'].std():.1f}%"""
        
        ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, fontsize=9,
               verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

        plt.tight_layout()
        plt.savefig(PLOT_SIM_VS_IMPR, dpi=300, bbox_inches='tight')
        plt.close()

    def _create_pattern_distribution(self, df: pd.DataFrame):
        """Visualize distribution of patterns grouped by LLM type, prompt version, and language."""
        # Identify pattern columns
        pattern_cols = [c for c in df.columns if c.startswith("pattern_")]
        if not pattern_cols:
            return

        # Prepare aggregated counts by dimensions
        # We will keep top K patterns to avoid clutter
        K = 10
        pattern_totals = {c: int(df[c].fillna(False).astype(int).sum()) for c in pattern_cols}
        top_patterns = [p for p, _ in sorted(pattern_totals.items(), key=lambda x: x[1], reverse=True)[:K]]

        # Build a pivot-like 3x grid: by LLM type, prompt version, language
        fig, axes = plt.subplots(1, 3, figsize=(22, 7))
        dims = [
            ("llm_type", "LLM Type"),
            ("prompt_version", "Prompt Version"),
            ("language", "Language"),
        ]

        for ax, (col, title) in zip(axes, dims):
            if col not in df.columns:
                ax.axis('off')
                continue
            # Aggregate counts for top patterns per group
            # Create long-form records
            records = []
            for group_value, group_df in df.groupby(col):
                if pd.isna(group_value):
                    group_value = "NA"
                for pcol in top_patterns:
                    count_val = int(group_df[pcol].fillna(False).astype(int).sum())
                    if count_val > 0:
                        records.append((str(group_value), pcol.replace("pattern_", ""), count_val))

            if not records:
                ax.axis('off')
                continue

            # Build a small heatmap-like image
            groups = sorted(list({r[0] for r in records}))
            pats = [pc.replace("pattern_", "") for pc in top_patterns]
            mat = np.zeros((len(pats), len(groups)), dtype=float)
            for g, p, v in records:
                i = pats.index(p)
                j = groups.index(g)
                mat[i, j] = v

            im = ax.imshow(mat, cmap='Blues', aspect='auto')
            ax.set_title(f"Top {K} Patterns by {title}")
            ax.set_xticks(range(len(groups)))
            ax.set_yticks(range(len(pats)))
            ax.set_xticklabels(groups, rotation=45, ha='right')
            ax.set_yticklabels(pats)

            # annotate values
            vmax = mat.max() if mat.size else 0
            for i in range(len(pats)):
                for j in range(len(groups)):
                    val = mat[i, j]
                    if val > 0:
                        color = 'white' if vmax and val > 0.6 * vmax else 'black'
                        ax.text(j, i, str(int(val)), va='center', ha='center', color=color, fontsize=9)

            plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04, label='Count')

        plt.tight_layout()
        plt.savefig(PATTERN_DISTRIBUTION, dpi=300, bbox_inches='tight')
        plt.close()

    def _create_improved_pattern_charts(self, pattern_counter: Counter, ast_patterns: Dict):
        """Create clearer pattern frequency charts with explanations."""
        
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(20, 16))
        
        # 1. Top textual patterns
        textual_patterns = {k: v for k, v in pattern_counter.items() if not k.startswith("ast_")}
        if textual_patterns:
            top_textual = dict(list(textual_patterns.items())[:12])
            
            # Create horizontal bar chart
            y_pos = np.arange(len(top_textual))
            patterns = list(top_textual.keys())
            counts = list(top_textual.values())
            
            bars = ax1.barh(y_pos, counts, color='skyblue', edgecolor='navy', alpha=0.7)
            ax1.set_yticks(y_pos)
            ax1.set_yticklabels(patterns)
            ax1.set_xlabel('Frequency (Number of Occurrences)')
            ax1.set_title('Top 12 Textual Patterns Introduced by LLMs', fontweight='bold', pad=15)
            ax1.grid(axis='x', alpha=0.3)
            
            # Add value labels
            for i, (bar, count) in enumerate(zip(bars, counts)):
                ax1.text(bar.get_width() + max(counts) * 0.01, bar.get_y() + bar.get_height()/2,
                        f'{count}', ha='left', va='center', fontweight='bold')

        # 2. AST patterns
        ast_pattern_counts = Counter()
        for patterns_list in ast_patterns.values():
            ast_pattern_counts.update(patterns_list)
        
        if ast_pattern_counts:
            top_ast = dict(list(ast_pattern_counts.items())[:10])
            
            y_pos = np.arange(len(top_ast))
            patterns = list(top_ast.keys())
            counts = list(top_ast.values())
            
            bars = ax2.barh(y_pos, counts, color='lightcoral', edgecolor='darkred', alpha=0.7)
            ax2.set_yticks(y_pos)
            ax2.set_yticklabels(patterns)
            ax2.set_xlabel('Frequency (Number of Occurrences)')
            ax2.set_title('Top 10 AST-Based Patterns Introduced by LLMs', fontweight='bold', pad=15)
            ax2.grid(axis='x', alpha=0.3)
            
            # Add value labels
            for i, (bar, count) in enumerate(zip(bars, counts)):
                ax2.text(bar.get_width() + max(counts) * 0.01, bar.get_y() + bar.get_height()/2,
                        f'{count}', ha='left', va='center', fontweight='bold')

        # 3. Pattern effectiveness (frequency vs avg improvement)
        # This requires pattern effectiveness data - placeholder for now
        ax3.text(0.5, 0.5, 'Pattern Effectiveness Analysis\n(Requires pattern-performance correlation data)', 
                ha='center', va='center', transform=ax3.transAxes, fontsize=12,
                bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8))
        ax3.set_title('Pattern Effectiveness Analysis', fontweight='bold')

        # 4. Pattern categories pie chart
        pattern_categories = {
            'Modern JS/TS': ['const_let', 'arrow_function', 'template_literals', 'for_of_loop', 
                           'spread_operator', 'destructuring', 'optional_chaining'],
            'Functional Programming': ['array_map', 'array_filter', 'array_reduce', 'lambda_expression',
                                     'functional_programming', 'generator_expression'],
            'Memory Management': ['make_allocation', 'slice_usage'],
            'Control Flow': ['range_loop', 'enhanced_for', 'defer_statement'],
            'Python Modern': ['f_string', 'list_comprehension', 'enumerate_usage', 'builtin_min_max'],
            'Other': []
        }
        
        category_counts = {cat: 0 for cat in pattern_categories}
        
        for pattern, count in pattern_counter.items():
            categorized = False
            for category, patterns in pattern_categories.items():
                if pattern in patterns:
                    category_counts[category] += count
                    categorized = True
                    break
            if not categorized:
                category_counts['Other'] += count
        
        # Filter out zero categories
        category_counts = {k: v for k, v in category_counts.items() if v > 0}
        
        if category_counts:
            colors = plt.cm.Set3(np.linspace(0, 1, len(category_counts)))
            wedges, texts, autotexts = ax4.pie(category_counts.values(), labels=category_counts.keys(),
                                              autopct='%1.1f%%', colors=colors, startangle=90)
            ax4.set_title('Pattern Distribution by Category', fontweight='bold', pad=15)
            
            # Improve text readability
            for autotext in autotexts:
                autotext.set_color('white')
                autotext.set_fontweight('bold')

        plt.tight_layout()
        plt.savefig(PATTERN_BAR, dpi=300, bbox_inches='tight')
        plt.close()

    def _create_corrected_ast_analysis(self, df: pd.DataFrame):
        """Create corrected AST complexity analysis."""
        
        # Filter data with valid AST metrics and reasonable improvement values
        ast_data = df.dropna(subset=['base_complexity', 'llm_complexity', 'overall_improvement'])
        ast_data = ast_data[ast_data['overall_improvement'].between(-100, 100)]  # Filter outliers
        
        if len(ast_data) == 0:
            logger.warning("No valid AST data available for analysis")
            return
        
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 12))
        
        # 1. Complexity change vs improvement (CORRECTED)
        complexity_change = ast_data['llm_complexity'] - ast_data['base_complexity']
        
        _scatter = ax1.scatter(complexity_change, ast_data['overall_improvement'], 
                            alpha=0.6, s=50, c=ast_data['overall_improvement'],
                            cmap='RdYlGn', edgecolors='black', linewidth=0.5)
        ax1.set_xlabel('Complexity Change (LLM - Base)')
        ax1.set_ylabel('Overall Performance Improvement (%)')
        ax1.set_title('Code Complexity Change vs Performance Improvement')
        ax1.grid(True, alpha=0.3)
        ax1.axhline(0, color='black', linestyle='-', alpha=0.5)
        ax1.axvline(0, color='black', linestyle='-', alpha=0.5)
        
        # Add trend line if we have enough data
        if len(complexity_change) > 3:
            try:
                z = np.polyfit(complexity_change, ast_data['overall_improvement'], 1)
                p = np.poly1d(z)
                x_trend = np.linspace(complexity_change.min(), complexity_change.max(), 100)
                ax1.plot(x_trend, p(x_trend), "r--", alpha=0.8, linewidth=2)
                
                # Calculate and display correlation
                corr = np.corrcoef(complexity_change, ast_data['overall_improvement'])[0, 1]
                ax1.text(0.05, 0.95, f'Correlation: {corr:.3f}', transform=ax1.transAxes,
                        bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
            except Exception as _e:
                pass

        # 2. Function count change analysis
        func_change = ast_data['llm_function_count'] - ast_data['base_function_count']
        
        ax2.scatter(func_change, ast_data['overall_improvement'], 
                   alpha=0.6, s=50, color='orange', edgecolors='black', linewidth=0.5)
        ax2.set_xlabel('Function Count Change (LLM - Base)')
        ax2.set_ylabel('Overall Performance Improvement (%)')
        ax2.set_title('Function Count Change vs Performance Improvement')
        ax2.grid(True, alpha=0.3)
        ax2.axhline(0, color='black', linestyle='-', alpha=0.5)
        ax2.axvline(0, color='black', linestyle='-', alpha=0.5)

        # 3. Nesting depth analysis
        depth_change = ast_data['llm_depth'] - ast_data['base_depth']
        
        ax3.scatter(depth_change, ast_data['overall_improvement'], 
                   alpha=0.6, s=50, color='green', edgecolors='black', linewidth=0.5)
        ax3.set_xlabel('Nesting Depth Change (LLM - Base)')
        ax3.set_ylabel('Overall Performance Improvement (%)')
        ax3.set_title('Nesting Depth Change vs Performance Improvement')
        ax3.grid(True, alpha=0.3)
        ax3.axhline(0, color='black', linestyle='-', alpha=0.5)
        ax3.axvline(0, color='black', linestyle='-', alpha=0.5)

        # 4. CORRECTED AST metrics comparison
        metrics_to_plot = ['base_complexity', 'llm_complexity', 'base_function_count', 'llm_function_count']
        valid_metrics = [col for col in metrics_to_plot if col in ast_data.columns]
        
        if valid_metrics:
            ast_data[valid_metrics].boxplot(ax=ax4)
            ax4.set_title('AST Metrics Distribution Comparison')
            ax4.set_ylabel('Count/Score')
            ax4.tick_params(axis='x', rotation=45)
            ax4.grid(True, alpha=0.3)
            
            # Add mean values as text
            for i, metric in enumerate(valid_metrics):
                mean_val = ast_data[metric].mean()
                ax4.text(i+1, mean_val, f'μ={mean_val:.1f}', ha='center', va='bottom',
                        bbox=dict(boxstyle='round', facecolor='yellow', alpha=0.7))

        plt.tight_layout()
        plt.savefig(AST_COMPLEXITY, dpi=300, bbox_inches='tight')
        plt.close()

    def _create_improved_correlation_heatmap(self, correlation_data: Dict):
        """Create an improved correlation heatmap with better explanations."""
        
        if not correlation_data:
            logger.warning("No correlation data available")
            return
        
        # Prepare data
        patterns = list(correlation_data.keys())[:20]  # Top 20 patterns
        metrics = ['time_improvement', 'cpu_improvement', 'ram_improvement', 'overall_improvement']
        
        corr_matrix = np.zeros((len(patterns), len(metrics)))
        
        for i, pattern in enumerate(patterns):
            for j, metric in enumerate(metrics):
                corr_value = correlation_data[pattern].get(metric, 0)
                # Cap extreme correlations
                corr_matrix[i, j] = np.clip(corr_value, -1, 1)
        
        fig, ax = plt.subplots(figsize=(12, max(10, len(patterns) * 0.4)))
        
        # Create heatmap
        im = ax.imshow(corr_matrix, cmap='RdBu_r', aspect='auto', vmin=-1, vmax=1)
        
        # Set labels
        ax.set_xticks(range(len(metrics)))
        ax.set_yticks(range(len(patterns)))
        ax.set_xticklabels([m.replace('_', ' ').title() for m in metrics])
        ax.set_yticklabels(patterns)
        
        # Add correlation values
        for i in range(len(patterns)):
            for j in range(len(metrics)):
                value = corr_matrix[i, j]
                color = 'white' if abs(value) > 0.5 else 'black'
                ax.text(j, i, f'{value:.2f}', ha='center', va='center', 
                       color=color, fontweight='bold', fontsize=9)
        
        ax.set_title('Pattern-Performance Correlation Analysis\n(Correlation Coefficients)', 
                    fontweight='bold', pad=20)
        
        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Pearson Correlation Coefficient', rotation=270, labelpad=20)
        
        # Add explanation
        explanation = """
        Interpretation Guide:
        • Red (positive): Pattern correlates with better performance
        • Blue (negative): Pattern correlates with worse performance  
        • White (near zero): No significant correlation
        • Values range from -1 (perfect negative) to +1 (perfect positive)
        """
        
        ax.text(1.02, 0.5, explanation, transform=ax.transAxes, fontsize=10,
               verticalalignment='center', bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8))
        
        plt.tight_layout()
        plt.savefig(PATTERN_CORRELATION, dpi=300, bbox_inches='tight')
        plt.close()

    def _create_corrected_improvement_heatmap(self, df: pd.DataFrame):
        """Create corrected improvement heatmap."""
        
        # Filter reasonable improvement values
        df_filtered = df[df['overall_improvement'].between(-100, 100)]
        
        # Create pivot table
        pivot_data = df_filtered.pivot_table(
            values='overall_improvement',
            index='language',
            columns='llm_type',
            aggfunc='mean'
        )
        
        if pivot_data.empty:
            logger.warning("No data available for improvement heatmap")
            return
        
        fig, ax = plt.subplots(figsize=(10, 8))
        
        # Create heatmap
        im = ax.imshow(pivot_data.values, cmap='RdYlGn', aspect='auto',
                      vmin=-50, vmax=50)  # Reasonable range
        
        # Set labels
        ax.set_xticks(range(len(pivot_data.columns)))
        ax.set_yticks(range(len(pivot_data.index)))
        ax.set_xticklabels(pivot_data.columns)
        ax.set_yticklabels(pivot_data.index)
        
        # Add values
        for i in range(len(pivot_data.index)):
            for j in range(len(pivot_data.columns)):
                value = pivot_data.iloc[i, j]
                if not pd.isna(value):
                    color = 'white' if abs(value) > 25 else 'black'
                    ax.text(j, i, f'{value:.1f}%', ha='center', va='center',
                           color=color, fontweight='bold')
        
        ax.set_title('Average Performance Improvement by Language and LLM Type\n(Filtered for reasonable values)',
                    fontweight='bold', pad=20)
        
        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Average Improvement (%)', rotation=270, labelpad=15)
        
        plt.tight_layout()
        plt.savefig(IMPROVEMENT_HEATMAP, dpi=300, bbox_inches='tight')
        plt.close()

    def get_cluster_files(self) -> List[Path]:
        """Get cluster files from cluster directory."""
        return [
            p for p in self.cluster_dir.glob("*.json")
            if "with_metrics" not in p.name
            and "debug_" not in p.name
            and "bad_entries" not in p.name
        ]

    def get_execution_files_for_cluster(self, cluster_name: str) -> List[Path]:
        """Get execution files for a specific cluster."""
        return list(self.exec_dir.glob(f"{cluster_name}_results*.json"))

    def aggregate_performance(self, cluster_name: str) -> Tuple[Dict[Tuple[str, str, str], PerformanceMetrics], Dict[Tuple[str, str, str], Optional[str]]]:
        """Aggregate performance metrics across executions with validation.
        Returns tuple: (averaged performance, prompt_version map).
        """
        perf_data = defaultdict(lambda: {"CPU": [], "RAM": [], "TIME": [], "PASS": []})
        exec_files = self.get_execution_files_for_cluster(cluster_name)

        if not exec_files:
            return {}

        for ef in exec_files:
            content = read_json(ef)
            if not content:
                continue

            # Parse prompt version from execution filename if present
            file_prompt_version: Optional[str] = self.parse_prompt_version_from_string(ef.name)

            for lang, results in content.get("results", {}).items():
                for res in results:
                    entry_id = res.get("id", "unknown")

                    # Base case (original code)
                    if "LLM_results" not in res:
                        key = (lang, "original", entry_id)
                        rec = perf_data[key]
                        rec["CPU"].append(res.get("CPU_usage"))
                        rec["RAM"].append(res.get("RAM_usage"))
                        rec["TIME"].append(res.get("execution_time_ms"))
                        rec["PASS"].append(1 if res.get("regressionTestPassed") else 0)
                    else:
                        # LLM results
                        for llm_res in res.get("LLM_results", []):
                            llm_type = llm_res.get("LLM_type", "unknown")
                            # Determine prompt version preference: explicit -> file name -> path
                            explicit_pv = llm_res.get("promptVersion") or llm_res.get("prompt_version")
                            pv_from_path = self.parse_prompt_version_from_string(llm_res.get("path", ""))
                            llm_prompt_version: Optional[str] = explicit_pv or file_prompt_version or pv_from_path
                            key = (lang, llm_type, f"{entry_id}::{llm_prompt_version or 'NA'}")
                            rec = perf_data[key]
                            rec["CPU"].append(llm_res.get("CPU_usage"))
                            rec["RAM"].append(llm_res.get("RAM_usage"))
                            rec["TIME"].append(llm_res.get("execution_time_ms"))
                            rec["PASS"].append(1 if llm_res.get("regressionTestPassed") else 0)

        # Compute averages with validation
        perf_avg = {}
        for key, data in perf_data.items():
            perf_avg[key] = PerformanceMetrics(
                cpu=safe_mean(data["CPU"]),
                ram=safe_mean(data["RAM"]),
                time=safe_mean(data["TIME"]),
                pass_rate=safe_mean(data["PASS"]),
            )

        # Validate the data
        return self.validate_performance_data(perf_avg)

    def parse_prompt_version_from_string(self, text: str) -> Optional[str]:
        """Extract prompt version tokens like v1, v2, V3, or named versions between _v..._ from strings."""
        if not text:
            return None
        # common patterns: _v3_, v3, V3, _vX_ with letters/digits
        m = re.search(r"_v([A-Za-z0-9]+)_", text)
        if m:
            return m.group(1)
        m = re.search(r"\bv([A-Za-z0-9]+)\b", text)
        if m:
            return m.group(1)
        return None

    # ---------------- AST extraction (Python) ----------------
    def _compute_python_ast_metrics(self, code: Optional[str]) -> Optional[ASTMetrics]:
        if not code:
            return None
        try:
            tree = ast.parse(code)
        except Exception:
            return None

        node_count = 0
        function_count = 0
        class_count = 0
        loop_count = 0
        condition_count = 0

        # Approximate cyclomatic complexity: count decision points
        complexity = 0

        def _max_depth(node: ast.AST, current: int = 0) -> int:
            children = list(ast.iter_child_nodes(node))
            if not children:
                return current
            return max(_max_depth(child, current + 1) for child in children)

        for node in ast.walk(tree):
            node_count += 1
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                function_count += 1
                complexity += 1
            elif isinstance(node, ast.ClassDef):
                class_count += 1
            elif isinstance(node, (ast.For, ast.While, ast.AsyncFor)):
                loop_count += 1
                complexity += 1
            elif isinstance(node, (ast.If, ast.IfExp)):
                condition_count += 1
                complexity += 1
            elif isinstance(node, (ast.Try, ast.With, ast.BoolOp)):
                complexity += 1

        depth = _max_depth(tree)

        return ASTMetrics(
            node_count=node_count,
            depth=depth,
            complexity=complexity,
            function_count=function_count,
            class_count=class_count,
            loop_count=loop_count,
            condition_count=condition_count,
        )

    def extract_ast_metrics_and_patterns(self, language: str, code: Optional[str]) -> Tuple[Optional[ASTMetrics], List[str]]:
        """Extract AST metrics and AST-driven patterns. Full AST for Python; heuristics otherwise."""
        if language.lower() == "python":
            metrics = self._compute_python_ast_metrics(code)
            patterns: List[str] = []
            if metrics is not None:
                try:
                    tree = ast.parse(code or "")
                    # AST-based patterns for Python
                    has_with = any(isinstance(n, ast.With) for n in ast.walk(tree))
                    has_try = any(isinstance(n, ast.Try) for n in ast.walk(tree))
                    has_async = any(isinstance(n, ast.AsyncFunctionDef) for n in ast.walk(tree))
                    has_comprehension = any(isinstance(n, (ast.ListComp, ast.DictComp, ast.SetComp, ast.GeneratorExp)) for n in ast.walk(tree))
                    if has_with:
                        patterns.append("ast_with_context_manager")
                    if has_try:
                        patterns.append("ast_try_except")
                    if has_async:
                        patterns.append("ast_async_function")
                    if has_comprehension:
                        patterns.append("ast_comprehension")
                except Exception:
                    pass
            return metrics, patterns

        # Heuristic placeholders for non-Python languages (no full AST available here)
        if not code:
            return None, []
        lang = language.lower()
        patterns: List[str] = []
        if lang in ("javascript", "js", "typescript", "ts"):
            if re.search(r"\basync\b|=>|\.map\s*\(", code):
                patterns.append("ast_like_higher_order")
            if re.search(r"\?\.", code):
                patterns.append("ast_like_optional_chaining")
        elif lang in ("go", "golang"):
            if re.search(r"\bgo\s+\w+\s*\(", code):
                patterns.append("ast_like_goroutine")
            if re.search(r"\bdefer\s+", code):
                patterns.append("ast_like_defer")
        elif lang in ("java", "c", "c++", "cpp"):
            if re.search(r"(->|::|\.stream\s*\()", code):
                patterns.append("ast_like_fp_streams")
        return None, patterns

    def read_code(self, path_str: str) -> Optional[str]:
        """Read code file with error handling."""
        if not path_str:
            return None

        p = Path(path_str)
        if not p.exists():
            p2 = self.dataset_dir / path_str
            if p2.exists():
                p = p2
            else:
                return None

        try:
            return p.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            logger.warning(f"Error reading {p}: {e}")
            return None

    def extract_textual_patterns(self, language: str, base_code: str, llm_code: str) -> List[str]:
        """Extract textual patterns using regex with improved detection."""
        patterns = []
        b_code = base_code or ""
        l_code = llm_code or ""

        def has_pattern(pat: str, txt: str) -> bool:
            return bool(re.search(pat, txt, flags=re.MULTILINE | re.IGNORECASE))

        # Enhanced pattern detection by language
        if language.lower() in ("python",):
            checks = {
                "list_comprehension": r"\[[^\]]+for\s+[^\]]+in\s+[^\]]+\]",
                "dict_comprehension": r"\{[^\}]+for\s+[^\}]+in\s+[^\}]+\}",
                "generator_expression": r"\([^\)]+for\s+[^\)]+in\s+[^\)]+\)",
                "f_string": r"f['\"][^'\"]*\{[^}]+\}[^'\"]*['\"]",
                "with_statement": r"^\s*with\s+",
                "lru_cache_decorator": r"@lru_cache|@functools\.lru_cache",
                "builtin_sum": r"\bsum\s*\(",
                "builtin_min_max": r"\b(min|max)\s*\(",
                "functional_programming": r"\b(map|filter|reduce)\s*\(",
                "type_hints": r"->\s*[A-Za-z_]",
                "lambda_expression": r"\blambda\s+[^:]+:",
                "enumerate_usage": r"\benumerate\s*\(",
                "zip_usage": r"\bzip\s*\(",
                "any_all_usage": r"\b(any|all)\s*\(",
            }
        elif language.lower() in ("javascript", "js", "typescript", "ts"):
            checks = {
                "arrow_function": r"(?:\w+\s*=>|=>\s*\w+|\([^)]*\)\s*=>)",
                "array_map": r"\.map\s*\(",
                "array_filter": r"\.filter\s*\(",
                "array_reduce": r"\.reduce\s*\(",
                "for_of_loop": r"for\s*\(\s*(?:const|let|var)?\s*\w+\s+of\s+",
                "async_await": r"\b(async\s+function|await\s+)",
                "const_let": r"\b(const|let)\s+\w+",
                "template_literals": r"`[^`]*\$\{[^}]+\}[^`]*`",
                "destructuring": r"(?:const|let|var)\s*(?:\{[^}]+\}|\[[^\]]+\])\s*=",
                "spread_operator": r"\.\.\.\w+",
                "optional_chaining": r"\?\.",
            }
        elif language.lower() in ("go", "golang"):
            checks = {
                "range_loop": r"for\s+[^{]*range\s+",
                "make_allocation": r"\bmake\s*\([^)]+\)",
                "goroutine": r"\bgo\s+\w+\s*\(",
                "defer_statement": r"\bdefer\s+",
                "channel_usage": r"\bchan\s+",
                "interface_usage": r"\binterface\s*\{",
                "slice_usage": r"\[\]\w+",
            }
        elif language.lower() in ("java", "c", "c++", "cpp"):
            checks = {
                "stream_api": r"\.stream\s*\(\)|\.map\s*\(|\.filter\s*\(|\.reduce\s*\(",
                "enhanced_for": r"for\s*\(\s*\w+\s+\w+\s*:\s*\w+\s*\)",
                "lambda_expression": r"->\s*",
                "optional_usage": r"\bOptional\b",
                "collection_methods": r"\.(forEach|collect|toList)\s*\(",
            }
        else:
            checks = {}

        for key, pattern in checks.items():
            if has_pattern(pattern, l_code) and not has_pattern(pattern, b_code):
                patterns.append(key)

        return patterns

    def analyze_pattern_correlations(self, df: pd.DataFrame) -> Dict:
        """Analyze correlations between patterns and performance improvements."""
        correlation_data = {}

        # Get all pattern columns
        pattern_columns = [col for col in df.columns if col.startswith("pattern_")]
        improvement_columns = [
            "impr_time_pct",
            "impr_cpu_pct", 
            "impr_ram_pct",
            "overall_improvement",
        ]

        for pattern_col in pattern_columns:
            pattern_name = pattern_col.replace("pattern_", "")
            correlation_data[pattern_name] = {}

            for imp_col in improvement_columns:
                # Calculate correlation with proper data filtering
                pattern_data = df[pattern_col].astype(int)
                improvement_data = df[imp_col].dropna()
                
                # Filter out extreme outliers for correlation calculation
                improvement_data = improvement_data[improvement_data.between(-200, 200)]

                if len(pattern_data) > 1 and len(improvement_data) > 1:
                    # Align the data
                    common_indices = pattern_data.index.intersection(improvement_data.index)
                    if len(common_indices) > 10:  # Need reasonable sample size
                        try:
                            corr, p_value = stats.pearsonr(
                                pattern_data.loc[common_indices],
                                improvement_data.loc[common_indices],
                            )
                            if not np.isnan(corr):
                                correlation_data[pattern_name][
                                    imp_col.replace("impr_", "").replace("_pct", "_improvement")
                                ] = corr
                        except Exception as e:
                            logger.warning(f"Error calculating correlation for {pattern_name}-{imp_col}: {e}")

        return correlation_data

    def generate_data_quality_report(self, df: pd.DataFrame) -> Dict:
        """Generate a comprehensive data quality report."""
        
        total_entries = len(df)
        
        # Outlier detection
        improvement_outliers = df[
            (df['overall_improvement'] < -200) | (df['overall_improvement'] > 200)
        ]
        
        # Missing data analysis
        missing_data = {}
        for col in ['overall_improvement', 'similarity_index', 'impr_time_pct', 'impr_cpu_pct', 'impr_ram_pct']:
            if col in df.columns:
                missing_count = df[col].isna().sum()
                missing_data[col] = {
                    'count': missing_count,
                    'percentage': missing_count / total_entries * 100
                }
        
        # Performance metrics distribution
        perf_stats = {}
        for col in ['overall_improvement', 'impr_time_pct', 'impr_cpu_pct', 'impr_ram_pct']:
            if col in df.columns and not df[col].empty:
                valid_data = df[col].dropna()
                if len(valid_data) > 0:
                    perf_stats[col] = {
                        'mean': float(valid_data.mean()),
                        'median': float(valid_data.median()),
                        'std': float(valid_data.std()),
                        'min': float(valid_data.min()),
                        'max': float(valid_data.max()),
                        'q25': float(valid_data.quantile(0.25)),
                        'q75': float(valid_data.quantile(0.75))
                    }
        
        return {
            'total_entries': total_entries,
            'outliers': {
                'improvement_outliers': len(improvement_outliers),
                'outlier_percentage': len(improvement_outliers) / total_entries * 100
            },
            'missing_data': missing_data,
            'performance_statistics': perf_stats,
            'data_quality_issues': {
                'extreme_values': len(improvement_outliers),
                'negative_similarities': len(df[df['similarity_index'] < 0]) if 'similarity_index' in df.columns else 0,
                'invalid_improvements': len(df[df['overall_improvement'].abs() > 1000]) if 'overall_improvement' in df.columns else 0
            }
        }

    def run_corrected_analysis(self) -> Tuple[pd.DataFrame, pd.DataFrame, Counter]:
        """Run the complete corrected analysis."""
        logger.info("Starting corrected pattern analysis...")

        all_rows = []
        pattern_counter = Counter()
        ast_patterns = {}

        cluster_files = self.get_cluster_files()
        logger.info(f"Processing {len(cluster_files)} cluster files...")

        for cluster_file in cluster_files:
            cluster_name = cluster_file.stem.replace("cluster_", "").replace(".json", "")
            logger.info(f"Processing cluster: {cluster_name}")

            cluster_json = read_json(cluster_file)
            if not cluster_json:
                continue

            perf_avg = self.aggregate_performance(cluster_name)

            for lang, entries in cluster_json.items():
                for entry in entries:
                    entry_id = entry.get("id", "unknown")
                    base_key = (lang, "original", entry_id)
                    base_perf = perf_avg.get(base_key)

                    if base_perf is None:
                        continue

                    for llm in entry.get("LLMs", []):
                        llm_type = llm.get("type", "unknown")
                        # Resolve prompt version consistently with aggregation
                        llm_prompt_version = llm.get("promptVersion") or llm.get("prompt_version") or self.parse_prompt_version_from_string(llm.get("path", ""))
                        llm_key = (lang, llm_type, f"{entry_id}::{llm_prompt_version or 'NA'}")
                        llm_perf = perf_avg.get(llm_key)

                        if llm_perf is None:
                            continue

                        # Read code files
                        base_code_file_path = entry.get("codeSnippetFilePath", "")
                        entry_lang = entry['language']
                        if entry_lang == "c" or entry_lang == "cpp":
                            base_code_file_path += "/" + entry['filename']

                        if "dataset" not in base_code_file_path:
                            base_code_file_path = str(utility_paths.DATASET_DIR / base_code_file_path)

                        base_code = self.read_code(base_code_file_path)
                        llm_code = self.read_code(llm.get("path", ""))

                        # Extract patterns
                        textual_patterns = self.extract_textual_patterns(lang, base_code, llm_code)

                        # Extract AST metrics and AST patterns (when available)
                        base_ast_metrics, base_ast_patterns = self.extract_ast_metrics_and_patterns(lang, base_code)
                        llm_ast_metrics, llm_ast_patterns = self.extract_ast_metrics_and_patterns(lang, llm_code)
                        combined_ast_patterns = list(set((base_ast_patterns or []) + (llm_ast_patterns or [])))

                        # Update counters
                        pattern_counter.update(textual_patterns)
                        ast_patterns[f"{cluster_name}_{lang}_{entry_id}_{llm_type}"] = textual_patterns + combined_ast_patterns

                        # Calculate improvements with proper validation
                        impr_time = self.compute_improvement(base_perf.time, llm_perf.time, "time")
                        impr_cpu = self.compute_improvement(base_perf.cpu, llm_perf.cpu, "cpu usage")
                        impr_ram = self.compute_improvement(base_perf.ram, llm_perf.ram, "ram usage")

                        # Calculate overall improvement
                        overall = 0.0
                        wsum = 0.0
                        for name, w in WEIGHTS.items():
                            val = None
                            if name == "TIME":
                                val = impr_time
                            elif name == "CPU":
                                val = impr_cpu
                            elif name == "RAM":
                                val = impr_ram
                            if val is not None and not np.isnan(val):
                                overall += val * w
                                wsum += w
                        overall_improvement = overall / wsum if wsum > 0 else None

                        # Selection criteria with better validation
                        sim_index = llm.get("similarity_index")
                        is_candidate = (
                            overall_improvement is not None
                            and sim_index is not None
                            and 0 <= sim_index <= 100  # Valid similarity range
                            and sim_index < SIMILARITY_THRESHOLD
                            and overall_improvement >= IMPROVEMENT_THRESHOLD
                            and abs(overall_improvement) <= MAX_IMPROVEMENT  # Filter extreme values
                        )

                        # Create row data
                        row_data = {
                            "cluster": cluster_name,
                            "language": lang,
                            "id": entry_id,
                            "llm_type": llm_type,
                            "prompt_version": llm_prompt_version,
                            "similarity_index": sim_index,
                            "fuzzy": llm.get("fuzzy_score"),
                            "cosine": llm.get("cosine_similarity_score"),
                            "impr_time_pct": impr_time,
                            "impr_cpu_pct": impr_cpu,
                            "impr_ram_pct": impr_ram,
                            "overall_improvement": overall_improvement,
                            "base_pass_pct": base_perf.pass_rate * 100 if base_perf.pass_rate is not None else None,
                            "llm_pass_pct": llm_perf.pass_rate * 100 if llm_perf.pass_rate is not None else None,
                            "llm_path": llm.get("path"),
                            "base_path": base_code_file_path,
                            "is_candidate": is_candidate,
                            "textual_patterns": textual_patterns,
                            # AST metrics (Python where available)
                            "base_node_count": base_ast_metrics.node_count if base_ast_metrics else None,
                            "llm_node_count": llm_ast_metrics.node_count if llm_ast_metrics else None,
                            "base_depth": base_ast_metrics.depth if base_ast_metrics else None,
                            "llm_depth": llm_ast_metrics.depth if llm_ast_metrics else None,
                            "base_complexity": base_ast_metrics.complexity if base_ast_metrics else None,
                            "llm_complexity": llm_ast_metrics.complexity if llm_ast_metrics else None,
                            "base_function_count": base_ast_metrics.function_count if base_ast_metrics else None,
                            "llm_function_count": llm_ast_metrics.function_count if llm_ast_metrics else None,
                            "base_class_count": base_ast_metrics.class_count if base_ast_metrics else None,
                            "llm_class_count": llm_ast_metrics.class_count if llm_ast_metrics else None,
                            "base_loop_count": base_ast_metrics.loop_count if base_ast_metrics else None,
                            "llm_loop_count": llm_ast_metrics.loop_count if llm_ast_metrics else None,
                            "base_condition_count": base_ast_metrics.condition_count if base_ast_metrics else None,
                            "llm_condition_count": llm_ast_metrics.condition_count if llm_ast_metrics else None,
                        }

                        # Add pattern presence as boolean columns
                        for pattern in textual_patterns:
                            row_data[f"pattern_{pattern}"] = True
                        for pattern in combined_ast_patterns:
                            row_data[f"pattern_{pattern}"] = True

                        # Add AST deltas when available
                        if base_ast_metrics and llm_ast_metrics:
                            row_data["delta_complexity"] = llm_ast_metrics.complexity - base_ast_metrics.complexity
                            row_data["delta_depth"] = llm_ast_metrics.depth - base_ast_metrics.depth
                            row_data["delta_function_count"] = llm_ast_metrics.function_count - base_ast_metrics.function_count
                            row_data["delta_class_count"] = llm_ast_metrics.class_count - base_ast_metrics.class_count
                            row_data["delta_loop_count"] = llm_ast_metrics.loop_count - base_ast_metrics.loop_count
                            row_data["delta_condition_count"] = llm_ast_metrics.condition_count - base_ast_metrics.condition_count

                        all_rows.append(row_data)

        # Create DataFrame
        df = pd.DataFrame(all_rows)

        if df.empty:
            logger.warning("No data found. Please check your file paths and data.")
            return df, df, Counter()

        # Fill missing pattern columns
        pattern_cols = [col for col in df.columns if col.startswith("pattern_")]
        for col in pattern_cols:
            # Ensure boolean dtype and avoid downcasting warning
            df[col] = df[col].fillna(False).astype(bool)

        # Generate data quality report
        quality_report = self.generate_data_quality_report(df)
        logger.info(f"Data Quality Report: {quality_report['outliers']['outlier_percentage']:.1f}% outliers detected")

        # Selection with better criteria
        if not df["overall_improvement"].isna().all():
            # Use reasonable improvement values for percentile calculation
            valid_improvements = df["overall_improvement"].dropna()
            valid_improvements = valid_improvements[valid_improvements.between(-100, 100)]
            if len(valid_improvements) > 0:
                cutoff = valid_improvements.quantile(TOP_PERCENTILE)
                df["is_top_percentile"] = df["overall_improvement"].apply(
                    lambda v: True if v is not None and v >= cutoff else False
                )
            else:
                df["is_top_percentile"] = False
        else:
            df["is_top_percentile"] = False

        # Final selection
        df["selected"] = df["is_candidate"] | df["is_top_percentile"]
        selected_df = df[df["selected"]].copy()

        logger.info(f"Analysis complete. {len(selected_df)} candidates selected from {len(df)} total entries.")

        # Analyze correlations
        correlation_data = self.analyze_pattern_correlations(df)

        # Create improved visualizations
        self.create_corrected_visualizations(df, pattern_counter, ast_patterns, correlation_data)

        # Save results with quality report
        self._save_corrected_results(df, selected_df, quality_report, correlation_data)

        return df, selected_df, pattern_counter

    def _save_corrected_results(self, df: pd.DataFrame, selected_df: pd.DataFrame, 
                               quality_report: Dict, correlation_data: Dict):
        """Save corrected results with quality analysis."""
        
        def df_to_json_safe(dataframe):
            result = dataframe.to_dict("records")
            for record in result:
                for key, value in record.items():
                    # Handle numpy arrays first to avoid ambiguous truth values
                    if isinstance(value, np.ndarray):
                        record[key] = value.tolist()
                    # Handle numpy scalar types
                    elif isinstance(value, (np.generic,)):
                        py_val = value.item()
                        if py_val is None:
                            record[key] = None
                        else:
                            record[key] = py_val
                    # Handle standard scalars
                    elif pd.api.types.is_scalar(value):
                        if value is None or (isinstance(value, float) and np.isnan(value)):
                            record[key] = None
                        else:
                            record[key] = value
                    else:
                        # Fallback: try best-effort conversion
                        try:
                            record[key] = value
                        except Exception:
                            record[key] = str(value)
            return result

        def to_jsonable(obj):
            """Recursively convert numpy/pandas types to plain Python JSON-serializable types."""
            # numpy arrays
            if isinstance(obj, np.ndarray):
                return obj.tolist()
            # numpy scalar
            if isinstance(obj, np.generic):
                return obj.item()
            # pandas NA-like scalars
            try:
                if pd.api.types.is_scalar(obj):
                    if obj is None:
                        return None
                    if isinstance(obj, float) and np.isnan(obj):
                        return None
                    return obj
            except Exception:
                pass
            # dict
            if isinstance(obj, dict):
                return {k: to_jsonable(v) for k, v in obj.items()}
            # list/tuple
            if isinstance(obj, (list, tuple)):
                return [to_jsonable(v) for v in obj]
            # fallback
            return obj

        # Main results
        main_results = {
            "metadata": {
                "analysis_version": "corrected_v2",
                "timestamp": pd.Timestamp.now().isoformat(),
                "total_entries": len(df),
                "selected_entries": len(selected_df),
                "selection_rate_pct": len(selected_df) / len(df) * 100 if len(df) > 0 else 0
            },
            "data_quality_report": quality_report,
            "all_entries": df_to_json_safe(df),
            "selected_candidates": df_to_json_safe(selected_df),
            "correlation_analysis": correlation_data
        }

        with open(JSON_OUT, "w", encoding="utf-8") as f:
            json.dump(to_jsonable(main_results), f, indent=2, ensure_ascii=False)

        logger.info(f"Corrected results saved to {REPORTS_DIR}")

        # Save AST/textual patterns aggregated view as separate file
        try:
            patterns_cols = [c for c in df.columns if c.startswith("pattern_")]
            pattern_counts = {c.replace("pattern_", ""): int(df[c].sum()) for c in patterns_cols}
            with open(AST_PATTERNS_OUT, "w", encoding="utf-8") as f:
                json.dump({"pattern_counts": pattern_counts}, f, indent=2, ensure_ascii=False)
        except Exception as _e:
            pass


def main():
    """Main execution function for corrected analysis."""
    try:
        analyzer = PatternAnalyzer()
        df_all, df_selected, patterns = analyzer.run_corrected_analysis()

        print(f"\n{'=' * 70}")
        print("CORRECTED PATTERN ANALYSIS COMPLETE")
        print(f"{'=' * 70}")
        print(f"Total entries analyzed: {len(df_all):,}")
        print(f"Selected candidates: {len(df_selected):,}")
        print(f"Selection rate: {len(df_selected) / len(df_all) * 100:.1f}%" if len(df_all) > 0 else "N/A")
        print(f"Unique patterns found: {len(patterns):,}")
        
        if df_all['overall_improvement'].notna().any():
            valid_improvements = df_all['overall_improvement'].dropna()
            print("\nPerformance Improvement Statistics:")
            print(f"  Mean: {valid_improvements.mean():.1f}%")
            print(f"  Median: {valid_improvements.median():.1f}%")
            print(f"  Std Dev: {valid_improvements.std():.1f}%")
            print(f"  Range: {valid_improvements.min():.1f}% to {valid_improvements.max():.1f}%")
        
        print("\nTop 10 Most Frequent Patterns:")
        for pattern, count in patterns.most_common(10):
            print(f"  {pattern}: {count:,} occurrences")

        print(f"\nCorrected reports generated in: {REPORTS_DIR}")
        print(f"- Main results: {JSON_OUT.name}")
        print("- Corrected visualizations: similarity_vs_improvement_corrected.png, etc.")

    except Exception as e:
        logger.error(f"Corrected analysis failed: {e}")
        raise


if __name__ == "__main__":
    main()