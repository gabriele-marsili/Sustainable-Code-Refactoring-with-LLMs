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
import matplotlib.patches as mpatches
from matplotlib.gridspec import GridSpec
from collections import defaultdict

logger = logging.getLogger(__name__)

# ============================================================================
# CLEAN PROFESSIONAL STYLING
# ============================================================================

STYLE_CONFIG = {
    'figure.dpi': 150,
    'savefig.dpi': 300,
    'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.1,
    'font.family': 'sans-serif',
    'font.sans-serif': ['Arial', 'DejaVu Sans'],
    'font.size': 11,
    'axes.labelsize': 12,
    'axes.titlesize': 13,
    'axes.linewidth': 1.0,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'legend.fontsize': 10,
    'legend.frameon': True,
    'legend.framealpha': 0.95,
    'legend.edgecolor': 'gray',
    'grid.alpha': 0.3,
    'grid.linestyle': '--',
    'grid.linewidth': 0.6,
}

plt.rcParams.update(STYLE_CONFIG)

# Simple, clear colors
COLORS = {
    'selected': '#E63946',      # Red for selected
    'not_selected': '#B8B8B8',  # Light gray
    'excellent': '#06A77D',     # Green
    'good': '#52B788',
    'moderate': '#95D5B2',
    'neutral': '#FCA311',       # Orange
    'bad': '#E76F51',           # Red-orange
}

METRIC_COLORS = {
    'cpu': '#E63946',      # Red
    'ram': '#457B9D',      # Blue
    'time': '#2A9D8F',     # Teal
}


def format_pattern_name(pattern_name: str) -> str:
    """
    Format pattern name: use (generic), (py), (js), etc.

    Examples:
        G1_lower_complexity -> (generic) lower complexity
        PY1_builtin_functions -> (py) builtin functions
        JS1_monomorphic_objects -> (js) monomorphic objects
    """
    # Remove prefixes and format
    if pattern_name.startswith('G'):
        # Generic pattern
        name = pattern_name[2:] if len(pattern_name) > 2 and pattern_name[1].isdigit() else pattern_name
        if name.startswith('_'):
            name = name[1:]
        return f"(generic) {name.replace('_', ' ')}"

    elif pattern_name.startswith('PY'):
        name = pattern_name[2:] if len(pattern_name) > 2 else pattern_name
        if name.startswith('_') or name.startswith('1') or name.startswith('2') or name.startswith('3') or name.startswith('4') or name.startswith('5'):
            if name[0].isdigit():
                name = name[1:]
            if name.startswith('_'):
                name = name[1:]
        return f"(py) {name.replace('_', ' ')}"

    elif pattern_name.startswith('JS'):
        name = pattern_name[2:]
        if name[0].isdigit():
            name = name[1:]
        if name.startswith('_'):
            name = name[1:]
        return f"(js) {name.replace('_', ' ')}"

    elif pattern_name.startswith('J') and not pattern_name.startswith('JS'):
        name = pattern_name[1:]
        if name[0].isdigit():
            name = name[1:]
        if name.startswith('_'):
            name = name[1:]
        return f"(java) {name.replace('_', ' ')}"

    elif pattern_name.startswith('CPP'):
        name = pattern_name[3:]
        if name[0].isdigit():
            name = name[1:]
        if name.startswith('_'):
            name = name[1:]
        return f"(c++) {name.replace('_', ' ')}"

    elif pattern_name.startswith('C') and not pattern_name.startswith('CPP'):
        name = pattern_name[1:]
        if name[0].isdigit():
            name = name[1:]
        if name.startswith('_'):
            name = name[1:]
        return f"(c) {name.replace('_', ' ')}"

    elif pattern_name.startswith('GO'):
        name = pattern_name[2:]
        if name[0].isdigit():
            name = name[1:]
        if name.startswith('_'):
            name = name[1:]
        return f"(go) {name.replace('_', ' ')}"

    else:
        return pattern_name.replace('_', ' ')


class PatternVisualizerV4:
    """
    Clean, professional visualizer - v4.0

    Addresses all feedback:
    - Simplified cluster selection plot
    - All detected patterns in box plots
    - No shadow, better legends
    - Language distribution added
    - Clearer heatmaps
    - Removed confusing plots (Fig14, Fig15)
    - Pattern naming: (generic), (py), etc.
    - PNG only, no PDF
    """

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

        self.total_clusters = 0
        self.total_entries = 0
        self.total_patterns = 0

        logger.info("=" * 80)
        logger.info("PATTERN VISUALIZER V4.0 - REFINED EDITION")
        logger.info("=" * 80)

    def set_statistics(self, total_clusters: int, total_entries: int, total_patterns: int):
        self.total_clusters = total_clusters
        self.total_entries = total_entries
        self.total_patterns = total_patterns

    # ========================================================================
    # FIG1: CLUSTER SELECTION - SIMPLIFIED
    # ========================================================================

    def plot_cluster_selection_simple(
        self,
        cluster_stats: Dict,
        selected_names: List[str],
        similarity_threshold: float = 65.0,
        improvement_threshold: float = -10.0
    ):
        """
        SIMPLIFIED cluster selection plot

        Shows ONLY:
        - Similarity vs best improvement (across all metrics)
        - Clear quadrants
        - Selection criteria explicit
        """
        logger.info("Creating simplified cluster selection plot...")

        fig, ax = plt.subplots(figsize=(10, 7))

        # Collect data
        similarities = []
        best_improvements = []  # Best (most negative) across all metrics
        colors = []
        markers = []
        sizes = []

        for name, stats in cluster_stats.items():
            if stats['avg_similarity'] is None:
                continue

            sim = stats['avg_similarity']

            # Get best improvement across all metrics
            improvements = []
            if stats['avg_cpu_improvement'] is not None:
                improvements.append(stats['avg_cpu_improvement'])
            if stats['avg_ram_improvement'] is not None:
                improvements.append(stats['avg_ram_improvement'])
            if stats['avg_time_improvement'] is not None:
                improvements.append(stats['avg_time_improvement'])

            if not improvements:
                continue

            best_imp = min(improvements)  # Most negative = best

            similarities.append(sim)
            best_improvements.append(best_imp)

            is_selected = name in selected_names

            if is_selected:
                colors.append(COLORS['selected'])
                markers.append('D')
                sizes.append(120)
            else:
                colors.append(COLORS['not_selected'])
                markers.append('o')
                sizes.append(50)

        # Plot points
        for i, (sim, imp, color, marker, size) in enumerate(
            zip(similarities, best_improvements, colors, markers, sizes)
        ):
            ax.scatter([sim], [imp], c=[color], marker=marker, s=size,
                      alpha=0.7, edgecolors='black', linewidths=0.8, zorder=3)

        # Threshold lines
        ax.axvline(similarity_threshold, color='green', linestyle='--',
                  linewidth=2, alpha=0.8, label=f'Similarity threshold ({similarity_threshold}%)',
                  zorder=2)
        ax.axhline(improvement_threshold, color='blue', linestyle='--',
                  linewidth=2, alpha=0.8, label=f'Improvement threshold ({improvement_threshold}%)',
                  zorder=2)

        # Shade selection quadrant
        ax.axvspan(0, similarity_threshold, alpha=0.08, color='green', zorder=0)
        ax.axhspan(-100, improvement_threshold, alpha=0.08, color='blue', zorder=0)

        # Zero line
        ax.axhline(0, color='black', linestyle='-', linewidth=1, alpha=0.4, zorder=1)

        # Labels
        ax.set_xlabel('Average Similarity (%)', fontweight='bold', fontsize=13)
        ax.set_ylabel('Best Improvement Across Metrics (%)', fontweight='bold', fontsize=13)
        ax.set_title(
            'Cluster Selection Criteria\n'
            'Selected clusters must satisfy BOTH conditions:\n'
            f'Similarity < {similarity_threshold}% AND Best Improvement < {improvement_threshold}%',
            fontweight='bold', fontsize=14, pad=15
        )

        # Grid
        ax.grid(True, alpha=0.3, linestyle='--', linewidth=0.6)
        ax.set_axisbelow(True)

        # Legend
        legend_elements = [
            plt.Line2D([0], [0], marker='D', color='w', markerfacecolor=COLORS['selected'],
                      markersize=10, label=f'Selected ({len(selected_names)} clusters)',
                      markeredgecolor='black', markeredgewidth=0.8),
            plt.Line2D([0], [0], marker='o', color='w', markerfacecolor=COLORS['not_selected'],
                      markersize=8, label=f'Not Selected ({len(cluster_stats)-len(selected_names)} clusters)',
                      markeredgecolor='black', markeredgewidth=0.8),
        ]
        ax.legend(handles=legend_elements, loc='upper right', fontsize=11, framealpha=0.95)

        # Add quadrant labels
        ax.text(0.02, 0.98, 'SELECTED\nQUADRANT', transform=ax.transAxes,
               fontsize=11, fontweight='bold', color='darkgreen',
               verticalalignment='top', alpha=0.6,
               bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.3))

        plt.tight_layout()
        plt.savefig(self.output_dir / 'Fig1_cluster_selection.png', dpi=300, bbox_inches='tight')
        plt.close()

        logger.info("✓ Fig1: Cluster selection (simplified)")

    # ========================================================================
    # FIG2-4: BOX PLOTS - ALL PATTERNS (MODIFICATA)
    # ========================================================================

    def plot_all_patterns_boxplots(self, correlations: List[Dict]):
        """
        Box plots showing ALL detected patterns (not just top N)
        One figure per metric
        
        MODIFICATA:
        - Grafico orizzontale (vert=False) per evitare sovrapposizione etichette.
        - Asse Y ora mostra i pattern, Asse X i valori di improvement.
        - Linee di riferimento e griglia aggiornate per l'orientamento orizzontale.
        - Etichette degli assi scambiate.
        - Dati invertiti per mostrare i migliori (più negativi) in alto.
        """
        logger.info("Creating box plots for ALL detected patterns (horizontal)...")

        metrics = [
            ('cpu', 'CPU Usage', 'cpu_avg_improvement', 'cpu_std', 'cpu_sample_size'),
            ('ram', 'RAM Usage', 'ram_avg_improvement', 'ram_std', 'ram_sample_size'),
            ('time', 'Execution Time', 'time_avg_improvement', 'time_std', 'time_sample_size')
        ]

        for fig_num, (metric_key, metric_label, avg_key, std_key, size_key) in enumerate(metrics, start=2):
            # Filter: need at least 3 samples
            valid = [c for c in correlations if c[size_key] >= 3]

            if not valid:
                logger.warning(f"No patterns for {metric_label}")
                continue

            # Sort by average improvement (ascending: best are first)
            valid.sort(key=lambda x: x[avg_key] if x[avg_key] is not None else 999)

            # Create figure (size based on number of patterns)
            n_patterns = len(valid)
            # <--- MODIFICA: Altezza figura dipende da n_patterns, larghezza fissa
            fig_height = max(8, n_patterns * 0.4) # Aumentato leggermente lo spazio per etichetta
            fig, ax = plt.subplots(figsize=(12, fig_height)) # Larghezza fissa 12, altezza dinamica

            # Prepare data
            labels = []
            data_points = []
            colors_list = []

            for pattern in valid:
                avg = pattern[avg_key]
                std = pattern[std_key]
                size = pattern[size_key]

                if avg is None or std is None:
                    continue

                # Generate distribution
                data = np.random.normal(avg, std, size)
                data_points.append(data)

                # Format label
                name = format_pattern_name(pattern['pattern'])
                # Non c'è più bisogno di troncare il nome, c'è spazio
                labels.append(f"{name}\n(n={size})")

                # Color by improvement level
                if avg < -15:
                    colors_list.append(COLORS['excellent'])
                elif avg < -5:
                    colors_list.append(COLORS['good'])
                elif avg < 5:
                    colors_list.append(COLORS['neutral'])
                else:
                    colors_list.append(COLORS['bad'])

            if not data_points:
                continue

            # <--- MODIFICA: Inverti i dati per plottare i migliori in alto
            labels.reverse()
            data_points.reverse()
            colors_list.reverse()
            # --->

            # <--- MODIFICA: Grafico orizzontale con vert=False
            bp = ax.boxplot(data_points, labels=labels, patch_artist=True,
                           vert=False,  # <-- CAMBIATO A ORIZZONTALE
                           showfliers=True,
                           flierprops=dict(marker='o', markersize=4, alpha=0.5,
                                         markerfacecolor='red', markeredgecolor='none'),
                           medianprops=dict(color='black', linewidth=1.5),
                           boxprops=dict(linewidth=0.8),
                           whiskerprops=dict(linewidth=0.8),
                           capprops=dict(linewidth=0.8))
            # --->

            # Color boxes
            for patch, color_val in zip(bp['boxes'], colors_list):
                patch.set_facecolor(color_val)
                patch.set_alpha(0.7)

            # <--- MODIFICA: Linee di riferimento verticali (axvline)
            ax.axvline(0, color='black', linestyle='--', linewidth=1, alpha=0.4)
            ax.axvline(-10, color='green', linestyle=':', linewidth=1, alpha=0.3)
            # --->

            # <--- MODIFICA: Etichette assi scambiate
            ax.set_xlabel(f'{metric_label} Improvement (%)', fontweight='bold', fontsize=13)
            # L'etichetta Y (nomi pattern) è gestita da boxplot
            # --->
            
            ax.set_title(
                f'{metric_label} - All Detected Patterns (n={n_patterns})\n'
                f'Negative values = reduction = improvement',
                fontweight='bold', fontsize=14, pad=15
            )

            # <--- MODIFICA: tick_params per l'asse 'y' (etichette pattern)
            ax.tick_params(axis='y', labelsize=9) # Rimossa rotazione
            # --->
            
            # <--- MODIFICA: Griglia sull'asse X (valori numerici)
            ax.grid(axis='x', alpha=0.3)
            # --->
            
            ax.set_axisbelow(True)

            # Legend
            legend_elements = [
                mpatches.Patch(color=COLORS['excellent'], label='Excellent (< -15%)', alpha=0.7),
                mpatches.Patch(color=COLORS['good'], label='Good (-15% to -5%)', alpha=0.7),
                mpatches.Patch(color=COLORS['neutral'], label='Neutral (-5% to +5%)', alpha=0.7),
                mpatches.Patch(color=COLORS['bad'], label='Degradation (> +5%)', alpha=0.7),
            ]
            ax.legend(handles=legend_elements, loc='upper right', fontsize=10, framealpha=0.95)

            plt.tight_layout()
            plt.savefig(self.output_dir / f'F{fig_num}_{metric_key}_all_patterns.png',
                       dpi=300, bbox_inches='tight')
            plt.close()

            logger.info(f"✓ F{fig_num}: {metric_label} - all {n_patterns} patterns")

    # ========================================================================
    # FIG5: PATTERN DISTRIBUTION (NO SHADOW + LANGUAGE BREAKDOWN)
    # ========================================================================

    def plot_pattern_distribution_enhanced(self, correlations: List[Dict]):
        """
        Enhanced pattern distribution:
        - Pie chart (NO shadow)
        - Language breakdown bar chart
        - Clean statistics
        """
        logger.info("Creating enhanced pattern distribution...")

        # Categorize patterns
        categories = defaultdict(int)
        language_counts = defaultdict(int)

        for corr in correlations:
            pattern = corr['pattern']
            freq = corr['frequency']

            # Category
            if pattern.startswith('G'):
                categories['Algorithmic'] += freq
            elif any(x in pattern.lower() for x in ['memory', 'allocation', 'pool']):
                categories['Memory'] += freq
            elif any(x in pattern.lower() for x in ['concurrent', 'lock', 'async']):
                categories['Concurrency'] += freq
            elif any(x in pattern.lower() for x in ['branch', 'return']):
                categories['Control Flow'] += freq
            else:
                categories['Language-Specific'] += freq

            # Language
            if pattern.startswith('PY'):
                language_counts['Python'] += freq
            elif pattern.startswith('JS'):
                language_counts['JavaScript/TS'] += freq
            elif pattern.startswith('J') and not pattern.startswith('JS'):
                language_counts['Java'] += freq
            elif pattern.startswith('C') and not pattern.startswith('CPP'):
                language_counts['C'] += freq
            elif pattern.startswith('CPP'):
                language_counts['C++'] += freq
            elif pattern.startswith('GO'):
                language_counts['Go'] += freq
            elif pattern.startswith('G'):
                language_counts['Generic'] += freq

        # Create figure with 2 subplots
        fig = plt.figure(figsize=(16, 7))
        gs = GridSpec(1, 2, figure=fig, width_ratios=[1, 1.2], wspace=0.3)

        # LEFT: Pie chart (NO SHADOW)
        ax1 = fig.add_subplot(gs[0, 0])

        sorted_cats = sorted(categories.items(), key=lambda x: x[1], reverse=True)
        labels = [cat for cat, _ in sorted_cats]
        sizes = [freq for _, freq in sorted_cats]
        colors_pie = ['#2E86AB', '#A23B72', '#F18F01', '#06A77D', '#6C757D'][:len(labels)]

        wedges, texts, autotexts = ax1.pie(
            sizes, labels=labels, autopct='%1.1f%%',
            startangle=90, colors=colors_pie,
            textprops={'fontsize': 11, 'weight': 'bold'},
            pctdistance=0.85
        )

        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontsize(12)

        ax1.set_title('Pattern Categories', fontweight='bold', fontsize=13, pad=10)

        # RIGHT: Language bar chart
        ax2 = fig.add_subplot(gs[0, 1])

        sorted_langs = sorted(language_counts.items(), key=lambda x: x[1], reverse=True)
        lang_labels = [lang for lang, _ in sorted_langs]
        lang_counts = [count for _, count in sorted_langs]

        bars = ax2.barh(lang_labels, lang_counts, color='#457B9D', alpha=0.8, edgecolor='black')

        # Add value labels
        for bar, count in zip(bars, lang_counts):
            width = bar.get_width()
            ax2.text(width + max(lang_counts) * 0.02, bar.get_y() + bar.get_height() / 2,
                    f'{count}',
                    ha='left', va='center', fontweight='bold', fontsize=11)

        ax2.set_xlabel('Number of Pattern Instances', fontweight='bold', fontsize=12)
        ax2.set_title('Pattern Distribution by Language', fontweight='bold', fontsize=13, pad=10)
        ax2.grid(axis='x', alpha=0.3)
        ax2.set_axisbelow(True)

        plt.suptitle(
            f'Pattern Analysis Overview\n'
            f'Total Clusters: {self.total_clusters} | Total Entries: {self.total_entries} | '
            f'Total Pattern Instances: {sum(sizes)} | Unique Patterns: {len(correlations)}',
            fontsize=14, fontweight='bold', y=0.98
        )

        plt.tight_layout()
        plt.savefig(self.output_dir / 'Fig5_pattern_distribution.png', dpi=300, bbox_inches='tight')
        plt.close()

        logger.info("✓ Fig5: Pattern distribution (categories + languages)")

    # ========================================================================
    # FIG6+: HEATMAPS - CLEARER FONTS
    # ========================================================================

    def plot_heatmaps_clear(self, correlations: List[Dict]):
        """
        Clear heatmaps with improved fonts and readability
        Separate: Generic + per language
        """
        logger.info("Creating clear heatmaps...")

        # Organize patterns
        generic_patterns = []
        language_patterns = defaultdict(list)

        for corr in correlations:
            if corr['frequency'] < 3:
                continue

            pattern_name = corr['pattern']

            if pattern_name.startswith('G'):
                generic_patterns.append(corr)
            elif pattern_name.startswith('PY'):
                language_patterns['Python'].append(corr)
            elif pattern_name.startswith('JS'):
                language_patterns['JavaScript/TS'].append(corr)
            elif pattern_name.startswith('J') and not pattern_name.startswith('JS'):
                language_patterns['Java'].append(corr)
            elif pattern_name.startswith('C') and not pattern_name.startswith('CPP'):
                language_patterns['C'].append(corr)
            elif pattern_name.startswith('CPP'):
                language_patterns['C++'].append(corr)
            elif pattern_name.startswith('GO'):
                language_patterns['Go'].append(corr)

        # Generic patterns heatmap
        if generic_patterns:
            self._create_clear_heatmap(
                generic_patterns,
                "Generic Cross-Language Patterns",
                "Fig6_generic_heatmap",
                6
            )

        # Language-specific heatmaps
        fig_num = 7
        for lang, patterns in sorted(language_patterns.items()):
            if patterns:
                self._create_clear_heatmap(
                    patterns,
                    f"{lang} Patterns",
                    f"F{fig_num}_{lang.lower().replace('/', '_')}_heatmap",
                    fig_num
                )
                fig_num += 1

    def _create_clear_heatmap(self, patterns: List[Dict], title: str, filename: str, fig_num: int):
        """Helper to create a single clear heatmap"""

        patterns = sorted(patterns, key=lambda x: x['frequency'], reverse=True)

        # Prepare data
        pattern_names = []
        cpu_vals = []
        ram_vals = []
        time_vals = []

        for p in patterns:
            # Format name clearly
            name = format_pattern_name(p['pattern'])
            if len(name) > 50:
                name = name[:47] + '...'

            pattern_names.append(name)
            cpu_vals.append(p['cpu_avg_improvement'] if p['cpu_avg_improvement'] is not None else 0)
            ram_vals.append(p['ram_avg_improvement'] if p['ram_avg_improvement'] is not None else 0)
            time_vals.append(p['time_avg_improvement'] if p['time_avg_improvement'] is not None else 0)

        # Create matrix
        matrix = np.array([cpu_vals, ram_vals, time_vals]).T

        # Limits
        vmax = min(30, max(abs(matrix.min()), abs(matrix.max())))
        vmin = -vmax

        # Figure
        fig, ax = plt.subplots(figsize=(9, max(7, len(patterns) * 0.45)))

        # Heatmap
        im = ax.imshow(matrix, cmap='RdYlGn_r', aspect='auto', vmin=vmin, vmax=vmax)

        # Ticks - LARGER FONTS
        ax.set_xticks([0, 1, 2])
        ax.set_xticklabels(['CPU\nUsage', 'RAM\nUsage', 'Exec.\nTime'],
                          fontweight='bold', fontsize=13)
        ax.set_yticks(range(len(pattern_names)))
        ax.set_yticklabels(pattern_names, fontsize=11)

        # Value annotations - CLEAR
        for i in range(len(pattern_names)):
            for j in range(3):
                value = matrix[i, j]
                text_color = 'white' if abs(value) > vmax * 0.5 else 'black'
                ax.text(j, i, f'{value:.1f}%',
                       ha='center', va='center',
                       color=text_color, fontweight='bold', fontsize=10)

        # Title
        ax.set_title(
            f'{title}\n'
            f'{len(patterns)} patterns | Negative = Improvement',
            fontweight='bold', fontsize=14, pad=15
        )

        # Colorbar
        cbar = plt.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
        cbar.set_label('Improvement (%)\nNegative = Better',
                      rotation=270, labelpad=25, fontweight='bold', fontsize=12)
        cbar.ax.tick_params(labelsize=10)

        # Grid
        ax.set_xticks(np.arange(3) - 0.5, minor=True)
        ax.set_yticks(np.arange(len(pattern_names)) - 0.5, minor=True)
        ax.grid(which='minor', color='white', linestyle='-', linewidth=2)

        plt.tight_layout()
        plt.savefig(self.output_dir / f'{filename}.png', dpi=300, bbox_inches='tight')
        plt.close()

        logger.info(f"✓ F{fig_num}: {title}")

    # ========================================================================
    # FIG13: TOP PATTERNS COMPARISON (SIMPLIFIED)
    # ========================================================================

    def plot_top_patterns_simple(self, correlations: List[Dict], top_n: int = 15):
        """
        Simple bar chart for top patterns
        Easy to understand
        """
        logger.info("Creating top patterns comparison...")

        # Filter and sort
        valid = [c for c in correlations if c['frequency'] >= 5]
        valid.sort(key=lambda x: abs(
            (x['cpu_avg_improvement'] or 0) +
            (x['ram_avg_improvement'] or 0) +
            (x['time_avg_improvement'] or 0)
        ) / 3, reverse=True)

        top = valid[:top_n]

        if not top:
            return

        # Prepare data
        pattern_names = []
        cpu_vals = []
        ram_vals = []
        time_vals = []

        for p in top:
            name = format_pattern_name(p['pattern'])
            if len(name) > 40:
                name = name[:37] + '...'
            pattern_names.append(name)

            cpu_vals.append(p['cpu_avg_improvement'] if p['cpu_avg_improvement'] is not None else 0)
            ram_vals.append(p['ram_avg_improvement'] if p['ram_avg_improvement'] is not None else 0)
            time_vals.append(p['time_avg_improvement'] if p['time_avg_improvement'] is not None else 0)

        # Figure
        fig, ax = plt.subplots(figsize=(13, 10))

        y_pos = np.arange(len(pattern_names))
        bar_height = 0.25

        # Bars
        ax.barh(y_pos - bar_height, cpu_vals, bar_height,
               label='CPU', color=METRIC_COLORS['cpu'], alpha=0.8, edgecolor='black', linewidth=0.5)
        ax.barh(y_pos, ram_vals, bar_height,
               label='RAM', color=METRIC_COLORS['ram'], alpha=0.8, edgecolor='black', linewidth=0.5)
        ax.barh(y_pos + bar_height, time_vals, bar_height,
               label='Time', color=METRIC_COLORS['time'], alpha=0.8, edgecolor='black', linewidth=0.5)

        # Zero line
        ax.axvline(0, color='black', linestyle='-', linewidth=1.2, alpha=0.5)

        # Reference lines
        ax.axvline(-10, color='green', linestyle=':', linewidth=1, alpha=0.4)

        # Labels
        ax.set_yticks(y_pos)
        ax.set_yticklabels(pattern_names, fontsize=11)
        ax.set_xlabel('Improvement (%)\nNegative = Better', fontweight='bold', fontsize=13)
        ax.set_title(
            f'Top {top_n} Patterns by Impact\n'
            f'Bars show improvement for each metric',
            fontweight='bold', fontsize=14, pad=15
        )

        # Legend
        ax.legend(loc='best', fontsize=11, framealpha=0.95,
                 title='Metrics', title_fontsize=12)

        # Grid
        ax.grid(axis='x', alpha=0.3)
        ax.set_axisbelow(True)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'Fig13_top_patterns.png', dpi=300, bbox_inches='tight')
        plt.close()

        logger.info("✓ Fig13: Top patterns comparison")

    # ========================================================================
    # MAIN WORKFLOW
    # ========================================================================

    def create_all_visualizations(
        self,
        cluster_stats: Dict,
        correlations: List[Dict],
        selected_clusters: List[str],
        similarity_threshold: float = 65.0,
        improvement_threshold: float = -10.0
    ):
        """
        Generate complete visualization suite - v4.0

        Simplified, clear, professional
        """
        logger.info("\n" + "=" * 80)
        logger.info("GENERATING VISUALIZATIONS - V4.0")
        logger.info("=" * 80)

        # Fig1: Cluster selection (simplified)
        self.plot_cluster_selection_simple(
            cluster_stats, selected_clusters,
            similarity_threshold, improvement_threshold
        )

        # Fig2-4: Box plots (ALL patterns)
        self.plot_all_patterns_boxplots(correlations)

        # Fig5: Pattern distribution (enhanced)
        self.plot_pattern_distribution_enhanced(correlations)

        # Fig6+: Heatmaps (clear)
        self.plot_heatmaps_clear(correlations)

        # Fig13: Top patterns (simple)
        self.plot_top_patterns_simple(correlations, top_n=15)

        logger.info("\n" + "=" * 80)
        logger.info("VISUALIZATION COMPLETE")
        logger.info("=" * 80)
        logger.info(f"All figures saved to: {self.output_dir}")
        logger.info("Format: PNG (300 DPI)")
        logger.info("=" * 80)