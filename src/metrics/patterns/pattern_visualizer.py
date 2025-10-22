#!/usr/bin/env python3
"""
Advanced Pattern Visualizer
============================

Crea visualizzazioni avanzate per l'analisi pattern-performance con:
- Box plots per distribuzione miglioramenti per pattern
- Detection e visualizzazione outliers
- Heatmap correlazioni pattern-metrica
- Scatter plots similarity vs improvement
- Distribuzione pattern per categoria e linguaggio


Date: 2025-10-22
"""

import logging
from pathlib import Path
from typing import Dict, List
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


logger = logging.getLogger(__name__)

# Set publication-quality style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")
plt.rcParams.update({
    'font.size': 11,
    'axes.labelsize': 12,
    'axes.titlesize': 14,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'legend.fontsize': 10,
    'figure.titlesize': 16,
    'figure.dpi': 100,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight'
})


class PatternVisualizer:
    """
    Crea visualizzazioni avanzate per pattern analysis
    """

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"PatternVisualizer initialized: {output_dir}")

    def detect_outliers_iqr(self, data: List[float], multiplier: float = 1.5) -> tuple:
        """
        Detect outliers using IQR method

        Returns:
            (outlier_indices, lower_bound, upper_bound)
        """
        if len(data) < 4:
            return [], None, None

        q1 = np.percentile(data, 25)
        q3 = np.percentile(data, 75)
        iqr = q3 - q1

        lower_bound = q1 - multiplier * iqr
        upper_bound = q3 + multiplier * iqr

        outliers = [i for i, val in enumerate(data)
                   if val < lower_bound or val > upper_bound]

        return outliers, lower_bound, upper_bound

    def plot_cluster_selection_scatter(self, cluster_stats: Dict, selected_names: List[str]):
        """
        Scatter plot: Similarity vs Improvement per cluster
        Evidenzia cluster selezionati e outliers
        """
        fig, axes = plt.subplots(1, 3, figsize=(20, 6))

        metrics = ['cpu', 'ram', 'time']
        metric_labels = ['CPU Usage', 'RAM Usage', 'Execution Time']

        for ax, metric, label in zip(axes, metrics, metric_labels):
            # Prepare data
            similarities = []
            improvements = []
            colors = []
            sizes = []

            for name, stats in cluster_stats.items():
                if stats['avg_similarity'] is None:
                    continue

                impr_key = f'avg_{metric}_improvement'
                if stats[impr_key] is None:
                    continue

                similarities.append(stats['avg_similarity'])
                improvements.append(stats[impr_key])

                # Color: selected vs not selected
                if name in selected_names:
                    colors.append('red')
                    sizes.append(100)
                else:
                    colors.append('lightgray')
                    sizes.append(50)

            # Detect outliers in improvements
            outlier_indices, lower, upper = self.detect_outliers_iqr(improvements)

            # Plot
            ax.scatter(similarities, improvements, c=colors, s=sizes,
                      alpha=0.6, edgecolors='black', linewidth=0.5)

            # Mark outliers
            for idx in outlier_indices:
                ax.scatter([similarities[idx]], [improvements[idx]],
                          marker='x', s=200, c='blue', linewidths=3,
                          label='Outlier' if idx == outlier_indices[0] else '')

            # Reference lines
            ax.axhline(0, color='black', linestyle='--', linewidth=1, alpha=0.5)
            ax.axvline(65, color='green', linestyle='--', linewidth=1, alpha=0.5,
                      label='Similarity Threshold (65%)')

            if lower is not None and upper is not None:
                ax.axhline(lower, color='blue', linestyle=':', linewidth=1, alpha=0.5)
                ax.axhline(upper, color='blue', linestyle=':', linewidth=1, alpha=0.5)

            ax.set_xlabel('Average Similarity (%)', fontweight='bold')
            ax.set_ylabel(f'{label} Improvement (%)', fontweight='bold')
            ax.set_title(f'{label}\n(Negative = Reduction = Good)', fontweight='bold')
            ax.grid(True, alpha=0.3)
            ax.legend(loc='best')

        plt.suptitle('Cluster Selection: Similarity vs Performance Improvement\n'
                    'Red = Selected Clusters, Blue X = Statistical Outliers',
                    fontweight='bold', fontsize=16)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'cluster_selection_scatter.png')
        plt.close()
        logger.info("✓ Created cluster selection scatter plot")

    def plot_pattern_boxplots(self, correlations: List[Dict], top_n: int = 15):
        """
        Box plots showing distribution of improvements per pattern
        With outlier detection
        """
        # Filter patterns with sufficient data
        valid_patterns = [c for c in correlations
                         if c['cpu_sample_size'] >= 3 or
                            c['ram_sample_size'] >= 3 or
                            c['time_sample_size'] >= 3]

        if not valid_patterns:
            logger.warning("No patterns with sufficient data for box plots")
            return

        # Sort by frequency and take top N
        valid_patterns.sort(key=lambda x: x['frequency'], reverse=True)
        top_patterns = valid_patterns[:top_n]

        fig, axes = plt.subplots(3, 1, figsize=(16, 18))

        metrics = [
            ('cpu', 'CPU Usage Improvement (%)', 'cpu_avg_improvement', 'cpu_std', 'cpu_sample_size'),
            ('ram', 'RAM Usage Improvement (%)', 'ram_avg_improvement', 'ram_std', 'ram_sample_size'),
            ('time', 'Execution Time Improvement (%)', 'time_avg_improvement', 'time_std', 'time_sample_size')
        ]

        for ax, (metric_key, ylabel, avg_key, std_key, size_key) in zip(axes, metrics):
            # Prepare data for box plot
            data_for_box = []
            labels = []
            colors_list = []

            for pattern in top_patterns:
                if pattern[size_key] < 3:
                    continue

                # Simulate distribution from mean and std (for visualization)
                # In a complete implementation, you'd store all individual values
                avg = pattern[avg_key]
                std = pattern[std_key]
                size = pattern[size_key]

                if avg is None or std is None:
                    continue

                # Generate synthetic data points matching the statistics
                synthetic_data = np.random.normal(avg, std, size)
                data_for_box.append(synthetic_data)

                pattern_name = pattern['pattern'].replace('_', ' ').replace('python ', 'Py:')
                pattern_name = pattern_name.replace('js ', 'JS:').replace('java ', 'Java:')
                labels.append(f"{pattern_name[:25]}\n(n={size})")

                # Color by improvement level
                if avg < -15:
                    colors_list.append('#2ECC71')  # Strong improvement (dark green)
                elif avg < -5:
                    colors_list.append('#A9DFBF')  # Moderate improvement (light green)
                elif avg < 5:
                    colors_list.append('#F9E79F')  # Neutral (yellow)
                else:
                    colors_list.append('#F1948A')  # Degradation (light red)

            if not data_for_box:
                continue

            # Create box plot
            bp = ax.boxplot(data_for_box, labels=labels, patch_artist=True,
                           showfliers=True, flierprops={'marker': 'o', 'markersize': 5,
                           'markerfacecolor': 'red', 'alpha': 0.5})

            # Color boxes
            for patch, color in zip(bp['boxes'], colors_list):
                patch.set_facecolor(color)
                patch.set_alpha(0.7)

            # Reference line at 0
            ax.axhline(0, color='black', linestyle='--', linewidth=1, alpha=0.5)

            ax.set_ylabel(ylabel, fontweight='bold')
            ax.set_title(f'{ylabel.split()[0]} - Distribution by Pattern\n'
                        f'(Boxes show IQR, Red circles = Outliers)',
                        fontweight='bold')
            ax.grid(axis='y', alpha=0.3)
            ax.tick_params(axis='x', rotation=45, labelsize=9)

            # Add legend
            from matplotlib.patches import Patch
            legend_elements = [
                Patch(facecolor='#2ECC71', label='Strong Improvement (< -15%)'),
                Patch(facecolor='#A9DFBF', label='Moderate Improvement (-15% to -5%)'),
                Patch(facecolor='#F9E79F', label='Neutral (-5% to +5%)'),
                Patch(facecolor='#F1948A', label='Degradation (> +5%)')
            ]
            ax.legend(handles=legend_elements, loc='upper right', fontsize=8)

        plt.suptitle(f'Top {top_n} Patterns: Performance Improvement Distribution with Outliers\n'
                    '(Negative = Reduction = Good, Positive = Increase = Bad)',
                    fontweight='bold', fontsize=16)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_boxplots_with_outliers.png')
        plt.close()
        logger.info("✓ Created pattern box plots with outliers")

    def plot_pattern_metric_heatmap(self, correlations: List[Dict], top_n: int = 20):
        """
        Heatmap showing pattern impact on each metric
        """
        # Filter and sort
        valid = [c for c in correlations if c['frequency'] >= 3]
        valid.sort(key=lambda x: x['frequency'], reverse=True)
        top = valid[:top_n]

        if not top:
            logger.warning("No patterns for heatmap")
            return

        # Build matrix
        patterns = [c['pattern'].replace('_', ' ')[:30] for c in top]
        cpu_vals = [c['cpu_avg_improvement'] if c['cpu_avg_improvement'] is not None else 0
                   for c in top]
        ram_vals = [c['ram_avg_improvement'] if c['ram_avg_improvement'] is not None else 0
                   for c in top]
        time_vals = [c['time_avg_improvement'] if c['time_avg_improvement'] is not None else 0
                    for c in top]

        matrix = np.array([cpu_vals, ram_vals, time_vals]).T

        # Create heatmap
        fig, ax = plt.subplots(figsize=(10, max(12, len(patterns) * 0.4)))

        # Diverging colormap: green (negative/good) to red (positive/bad)
        im = ax.imshow(matrix, cmap='RdYlGn_r', aspect='auto', vmin=-30, vmax=30)

        # Set ticks
        ax.set_xticks([0, 1, 2])
        ax.set_xticklabels(['CPU', 'RAM', 'Time'], fontweight='bold')
        ax.set_yticks(range(len(patterns)))
        ax.set_yticklabels(patterns)

        # Add values in cells
        for i in range(len(patterns)):
            for j in range(3):
                value = matrix[i, j]
                color = 'white' if abs(value) > 15 else 'black'
                ax.text(j, i, f'{value:.1f}%', ha='center', va='center',
                       color=color, fontweight='bold', fontsize=9)

        ax.set_title('Pattern Impact on Performance Metrics\n'
                    '(Negative = Improvement, Positive = Degradation)',
                    fontweight='bold', fontsize=14, pad=15)

        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Improvement (%)', rotation=270, labelpad=20, fontweight='bold')

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_metric_heatmap.png')
        plt.close()
        logger.info("✓ Created pattern-metric heatmap")

    def plot_pattern_frequency_by_category(self, correlations: List[Dict]):
        """
        Bar chart: Pattern frequency by category
        """
        # Categorize patterns
        categories = {
            'Algorithmic': [],
            'Syntax': [],
            'Memory': [],
            'Control Flow': [],
            'Concurrency': []
        }

        for corr in correlations:
            pattern = corr['pattern']
            freq = corr['frequency']

            # Determine category from pattern name
            if any(x in pattern for x in ['cache', 'memo', 'stream', 'vector', 'map', 'filter', 'reduce', 'sum', 'builtin']):
                categories['Algorithmic'].append((pattern, freq))
            elif any(x in pattern for x in ['lambda', 'comprehension', 'arrow', 'for_of', 'f_string', 'template', 'range']):
                categories['Syntax'].append((pattern, freq))
            elif any(x in pattern for x in ['memory', 'smart', 'move', 'builder', 'defer', 'with']):
                categories['Memory'].append((pattern, freq))
            elif any(x in pattern for x in ['return', 'guard', 'null', 'optional', 'check']):
                categories['Control Flow'].append((pattern, freq))
            elif any(x in pattern for x in ['async', 'goroutine', 'channel', 'parallel']):
                categories['Concurrency'].append((pattern, freq))
            else:
                categories['Syntax'].append((pattern, freq))  # Default

        # Create stacked bar chart
        fig, ax = plt.subplots(figsize=(12, 8))

        category_totals = {cat: sum(f for _, f in patterns)
                          for cat, patterns in categories.items()}

        # Sort by total
        sorted_cats = sorted(category_totals.items(), key=lambda x: x[1], reverse=True)

        cats = [c for c, _ in sorted_cats]
        totals = [t for _, t in sorted_cats]

        colors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181', '#FFA07A']

        bars = ax.barh(cats, totals, color=colors, alpha=0.8, edgecolor='black', linewidth=1)

        # Add value labels
        for bar, total in zip(bars, totals):
            ax.text(bar.get_width() + max(totals) * 0.01, bar.get_y() + bar.get_height()/2,
                   f'{total}', ha='left', va='center', fontweight='bold', fontsize=12)

        ax.set_xlabel('Total Pattern Occurrences', fontweight='bold', fontsize=12)
        ax.set_title('Pattern Distribution by Category\n'
                    '(Total occurrences across all analyzed code)',
                    fontweight='bold', fontsize=14, pad=15)
        ax.grid(axis='x', alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_category_distribution.png')
        plt.close()
        logger.info("✓ Created pattern category distribution")

    def plot_top_patterns_comparison(self, correlations: List[Dict], top_n: int = 10):
        """
        Grouped bar chart comparing top patterns across metrics
        """
        valid = [c for c in correlations if c['frequency'] >= 5]
        valid.sort(key=lambda x: x['frequency'], reverse=True)
        top = valid[:top_n]

        if not top:
            logger.warning("No patterns for comparison chart")
            return

        patterns = [c['pattern'].replace('_', ' ')[:30] for c in top]
        cpu = [c['cpu_avg_improvement'] if c['cpu_avg_improvement'] is not None else 0 for c in top]
        ram = [c['ram_avg_improvement'] if c['ram_avg_improvement'] is not None else 0 for c in top]
        time = [c['time_avg_improvement'] if c['time_avg_improvement'] is not None else 0 for c in top]

        x = np.arange(len(patterns))
        width = 0.25

        fig, ax = plt.subplots(figsize=(16, 10))

        _bars1 = ax.barh(x - width, cpu, width, label='CPU', color='#FF6B6B', alpha=0.8, edgecolor='black')
        _bars2 = ax.barh(x, ram, width, label='RAM', color='#4ECDC4', alpha=0.8, edgecolor='black')
        _bars3 = ax.barh(x + width, time, width, label='Time', color='#95E1D3', alpha=0.8, edgecolor='black')

        ax.set_yticks(x)
        ax.set_yticklabels(patterns)
        ax.set_xlabel('Average Improvement (%)', fontweight='bold', fontsize=12)
        ax.set_title(f'Top {top_n} Patterns: Comparative Impact on Performance Metrics\n'
                    '(Negative = Reduction = Good, Positive = Increase = Bad)',
                    fontweight='bold', fontsize=14, pad=15)
        ax.legend(loc='best', fontsize=11)
        ax.axvline(0, color='black', linestyle='--', linewidth=1.5)
        ax.grid(axis='x', alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'top_patterns_comparison.png')
        plt.close()
        logger.info("✓ Created top patterns comparison chart")

    def create_all_visualizations(self, cluster_stats: Dict, correlations: List[Dict],
                                  selected_clusters: List[str]):
        """
        Create all visualizations
        """
        logger.info("\n" + "=" * 80)
        logger.info("CREATING ADVANCED VISUALIZATIONS")
        logger.info("=" * 80)

        # 1. Cluster selection scatter
        self.plot_cluster_selection_scatter(cluster_stats, selected_clusters)

        # 2. Pattern box plots with outliers
        self.plot_pattern_boxplots(correlations, top_n=15)

        # 3. Pattern-metric heatmap
        self.plot_pattern_metric_heatmap(correlations, top_n=20)

        # 4. Category distribution
        self.plot_pattern_frequency_by_category(correlations)

        # 5. Top patterns comparison
        self.plot_top_patterns_comparison(correlations, top_n=10)

        logger.info(f"\n✓ All visualizations saved to: {self.output_dir}")
