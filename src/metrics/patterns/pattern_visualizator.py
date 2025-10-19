#!/usr/bin/env python3
"""
Pattern Visualization System

Creates publication-grade visualizations for pattern-performance analysis.
"""

import logging
from pathlib import Path
from typing import List, Dict, Any
from collections import Counter, defaultdict

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.patches import Rectangle

logger = logging.getLogger(__name__)


class PatternVisualizer:
    """Creates comprehensive visualizations for pattern analysis"""

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Set publication-quality style
        plt.style.use('seaborn-v0_8-darkgrid')
        sns.set_palette("husl")

        # Configure matplotlib
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

    def create_all_visualizations(self, cluster_analyses, entry_comparisons,
                                 pattern_stats, correlations):
        """Create complete visualization suite"""

        logger.info("  Creating cluster selection scatter plot...")
        self.plot_cluster_selection(cluster_analyses)

        logger.info("  Creating pattern frequency charts...")
        self.plot_pattern_frequencies(pattern_stats)

        logger.info("  Creating pattern category distribution...")
        self.plot_pattern_categories(pattern_stats)

        logger.info("  Creating cross-language generic patterns heatmap...")
        self.plot_generic_patterns_by_language(pattern_stats)

        logger.info("  Creating pattern distribution by all languages...")
        self.plot_pattern_distribution_by_all_languages(pattern_stats)

        logger.info("  Creating energy impact distribution...")
        self.plot_energy_impact_distribution(pattern_stats)

        logger.info("  Creating correlation heatmap...")
        self.plot_correlation_heatmap(correlations)

        logger.info("  Creating pattern-metric correlation analysis...")
        self.plot_pattern_metric_correlations(entry_comparisons, correlations)

        logger.info("  Creating expected improvement by pattern charts...")
        self.plot_expected_improvements_by_pattern(entry_comparisons)

        logger.info("  All visualizations created successfully")

    def plot_cluster_selection(self, cluster_analyses):
        """Plot cluster selection based on similarity vs improvement"""

        fig, ax = plt.subplots(figsize=(14, 10))

        selected = [c for c in cluster_analyses if c.selected_for_analysis]
        not_selected = [c for c in cluster_analyses if not c.selected_for_analysis]

        # Plot non-selected (background)
        if not_selected:
            ax.scatter(
                [c.avg_similarity for c in not_selected],
                [c.overall_improvement for c in not_selected],
                alpha=0.5, s=60, c='lightgray',
                label=f'Not Selected ({len(not_selected)})',
                edgecolors='black', linewidth=0.5
            )

        # Plot selected (highlighted)
        if selected:
            scatter = ax.scatter(
                [c.avg_similarity for c in selected],
                [c.overall_improvement for c in selected],
                alpha=0.8, s=100, c='red',
                label=f'Selected for Analysis ({len(selected)})',
                edgecolors='darkred', linewidth=1.5
            )

            # Annotate selected clusters
            for c in selected[:10]:  # Annotate top 10
                ax.annotate(
                    c.cluster_name,
                    (c.avg_similarity, c.overall_improvement),
                    xytext=(5, 5), textcoords='offset points',
                    fontsize=8, alpha=0.7
                )

        # Threshold lines
        ax.axvline(75, color='blue', linestyle='--', linewidth=2,
                   label='Similarity Threshold (75%)', alpha=0.8)
        ax.axhline(15, color='green', linestyle='--', linewidth=2,
                   label='Improvement Threshold (15%)', alpha=0.8)

        # Selection region highlight
        ax.add_patch(Rectangle(
            (0, 15), 75, 100,
            alpha=0.1, color='green', label='Target Selection Region'
        ))

        ax.set_xlabel('Average Code Similarity (%)', fontweight='bold', fontsize=13)
        ax.set_ylabel('Overall Performance Improvement (%)', fontweight='bold', fontsize=13)
        ax.set_title(
            'Cluster Selection Strategy\nLow Similarity + High Improvement = Energy Pattern Candidates',
            fontweight='bold', fontsize=15, pad=20
        )

        ax.legend(loc='best', frameon=True, shadow=True)
        ax.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'cluster_selection_analysis.png')
        plt.close()

    def plot_pattern_frequencies(self, pattern_stats):
        """Plot pattern frequency bar chart"""

        pattern_freq = pattern_stats['pattern_frequencies']
        if not pattern_freq:
            return

        # Top 20 patterns
        top_patterns = dict(sorted(pattern_freq.items(), key=lambda x: x[1], reverse=True)[:20])

        fig, ax = plt.subplots(figsize=(14, 10))

        patterns = list(top_patterns.keys())
        counts = list(top_patterns.values())

        # Clean pattern names for display
        display_names = [p.replace('_', ' ').replace('python ', 'Py: ')
                        .replace('js ', 'JS: ').replace('java ', 'Java: ')
                        .replace('cpp ', 'C++: ').replace('go ', 'Go: ')
                        .replace('generic ', 'Generic: ') for p in patterns]

        # Color by category
        colors = []
        for pattern in patterns:
            if 'algorithmic' in pattern or 'cache' in pattern or 'memoization' in pattern:
                colors.append('#FF6B6B')  # Red for algorithmic
            elif 'memory' in pattern or 'smart' in pattern:
                colors.append('#4ECDC4')  # Cyan for memory
            elif 'concurrency' in pattern or 'async' in pattern or 'goroutine' in pattern:
                colors.append('#95E1D3')  # Green for concurrency
            else:
                colors.append('#F38181')  # Pink for syntax

        bars = ax.barh(display_names, counts, color=colors, alpha=0.8, edgecolor='black', linewidth=0.8)

        # Add value labels
        for i, (bar, count) in enumerate(zip(bars, counts)):
            ax.text(bar.get_width() + max(counts) * 0.01, bar.get_y() + bar.get_height()/2,
                   f'{count}', ha='left', va='center', fontweight='bold', fontsize=10)

        ax.set_xlabel('Frequency (Number of Occurrences)', fontweight='bold', fontsize=12)
        ax.set_title('Top 20 Energy-Efficient Patterns Introduced by LLMs',
                    fontweight='bold', fontsize=15, pad=15)
        ax.grid(axis='x', alpha=0.3)

        # Legend for colors
        from matplotlib.patches import Patch
        legend_elements = [
            Patch(facecolor='#FF6B6B', label='Algorithmic'),
            Patch(facecolor='#4ECDC4', label='Memory Management'),
            Patch(facecolor='#95E1D3', label='Concurrency'),
            Patch(facecolor='#F38181', label='Syntax/Control Flow')
        ]
        ax.legend(handles=legend_elements, loc='lower right', frameon=True, shadow=True)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_frequencies.png')
        plt.close()

    def plot_pattern_categories(self, pattern_stats):
        """Plot pattern distribution by category"""

        by_category = pattern_stats.get('by_category', {})
        if not by_category:
            return

        total_patterns = pattern_stats.get('total_occurrences', sum(by_category.values()))
        unique_patterns = pattern_stats.get('unique_patterns', 0)

        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 7))

        # Pie chart
        categories = list(by_category.keys())
        counts = list(by_category.values())

        colors = sns.color_palette("Set2", len(categories))

        wedges, texts, autotexts = ax1.pie(
            counts, labels=categories, autopct='%1.1f%%',
            colors=colors, startangle=90,
            textprops={'fontweight': 'bold', 'fontsize': 11}
        )

        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontsize(12)

        ax1.set_title(f'Pattern Distribution by Category\nTotal Patterns: {total_patterns} | Unique: {unique_patterns}',
                     fontweight='bold', fontsize=14, pad=15)

        # Bar chart
        ax2.barh(categories, counts, color=colors, alpha=0.8, edgecolor='black', linewidth=0.8)

        for i, (cat, count) in enumerate(zip(categories, counts)):
            percentage = (count / total_patterns * 100) if total_patterns > 0 else 0
            ax2.text(count + max(counts) * 0.01, i, f'{count} ({percentage:.1f}%)',
                    ha='left', va='center', fontweight='bold')

        ax2.set_xlabel('Number of Occurrences', fontweight='bold')
        ax2.set_title(f'Pattern Category Frequencies (Total: {total_patterns})',
                     fontweight='bold', fontsize=14, pad=15)
        ax2.grid(axis='x', alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_categories.png')
        plt.close()

    def plot_generic_patterns_by_language(self, pattern_stats):
        """Plot ONLY generic cross-language patterns distribution as heatmap"""

        by_language = pattern_stats.get('by_language', {})
        if not by_language:
            return

        # Filter ONLY generic patterns (those starting with 'generic_')
        generic_patterns = set()
        for lang_patterns in by_language.values():
            for pattern in lang_patterns.keys():
                if pattern.startswith('generic_'):
                    generic_patterns.add(pattern)

        if not generic_patterns:
            logger.warning("  No generic cross-language patterns found")
            return

        # Count how many languages each generic pattern appears in
        pattern_lang_count = {}
        for pattern in generic_patterns:
            count = sum(1 for lang_patterns in by_language.values()
                       if pattern in lang_patterns and lang_patterns[pattern] > 0)
            pattern_lang_count[pattern] = count

        # Filter only patterns present in at least 2 languages
        cross_lang_patterns = [p for p, count in pattern_lang_count.items() if count >= 2]

        if not cross_lang_patterns:
            logger.warning("  No generic patterns found in multiple languages")
            return

        # Sort by total frequency
        pattern_totals = {}
        for pattern in cross_lang_patterns:
            total = sum(lang_patterns.get(pattern, 0) for lang_patterns in by_language.values())
            pattern_totals[pattern] = total

        sorted_patterns = sorted(cross_lang_patterns, key=lambda p: pattern_totals[p], reverse=True)

        # Build matrix
        languages = sorted(by_language.keys())
        matrix = np.zeros((len(sorted_patterns), len(languages)))

        for i, pattern in enumerate(sorted_patterns):
            for j, lang in enumerate(languages):
                matrix[i, j] = by_language[lang].get(pattern, 0)

        fig, ax = plt.subplots(figsize=(14, max(10, len(sorted_patterns) * 0.5)))

        im = ax.imshow(matrix, cmap='YlGnBu', aspect='auto')

        # Set ticks
        ax.set_xticks(range(len(languages)))
        ax.set_yticks(range(len(sorted_patterns)))
        ax.set_xticklabels(languages, rotation=45, ha='right', fontweight='bold')

        # Clean pattern names
        clean_names = [p.replace('generic_', '').replace('_', ' ').title()
                      for p in sorted_patterns]
        ax.set_yticklabels(clean_names)

        # Add values and language count
        for i in range(len(sorted_patterns)):
            for j in range(len(languages)):
                value = matrix[i, j]
                if value > 0:
                    color = 'white' if value > matrix.max() * 0.5 else 'black'
                    ax.text(j, i, f'{int(value)}', ha='center', va='center',
                           color=color, fontweight='bold', fontsize=9)

        ax.set_title('Generic Cross-Language Pattern Distribution\n(Patterns Present in 2+ Languages)',
                    fontweight='bold', fontsize=15, pad=20)
        ax.set_xlabel('Programming Language', fontweight='bold', fontsize=12)
        ax.set_ylabel('Generic Pattern', fontweight='bold', fontsize=12)

        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Frequency', rotation=270, labelpad=20, fontweight='bold')

        plt.tight_layout()
        plt.savefig(self.output_dir / 'generic_patterns_cross_language_heatmap.png')
        plt.close()

    def plot_pattern_distribution_by_all_languages(self, pattern_stats):
        """Plot pattern category distribution across all supported languages"""

        by_language = pattern_stats.get('by_language', {})
        if not by_language:
            return

        # Define all supported languages
        all_languages = ['python', 'java', 'javascript', 'typescript', 'c', 'cpp', 'go']

        # Map variations to standard names
        lang_mapping = {
            'js': 'javascript',
            'ts': 'typescript',
            'c++': 'cpp',
            'golang': 'go'
        }

        # Normalize language names
        normalized_by_language = {}
        for lang, patterns in by_language.items():
            normalized_lang = lang_mapping.get(lang.lower(), lang.lower())
            if normalized_lang in all_languages:
                if normalized_lang not in normalized_by_language:
                    normalized_by_language[normalized_lang] = Counter()
                normalized_by_language[normalized_lang].update(patterns)

        # Calculate pattern categories per language
        categories = ['algorithmic', 'syntax', 'memory', 'control_flow', 'concurrency']

        # Build matrix: languages x categories
        matrix = np.zeros((len(all_languages), len(categories)))

        for i, lang in enumerate(all_languages):
            if lang in normalized_by_language:
                for pattern, count in normalized_by_language[lang].items():
                    # Determine category from pattern name
                    if any(x in pattern for x in ['cache', 'memo', 'vector', 'stream', 'map', 'filter', 'reduce']):
                        cat_idx = 0  # algorithmic
                    elif any(x in pattern for x in ['lambda', 'comprehension', 'arrow', 'for_of', 'range']):
                        cat_idx = 1  # syntax
                    elif any(x in pattern for x in ['memory', 'smart', 'move', 'builder', 'defer']):
                        cat_idx = 2  # memory
                    elif any(x in pattern for x in ['return', 'guard', 'null', 'optional']):
                        cat_idx = 3  # control_flow
                    elif any(x in pattern for x in ['async', 'goroutine', 'channel', 'parallel']):
                        cat_idx = 4  # concurrency
                    else:
                        cat_idx = 1  # default to syntax

                    matrix[i, cat_idx] += count

        # Create stacked bar chart
        fig, ax = plt.subplots(figsize=(14, 8))

        colors = sns.color_palette("Set2", len(categories))

        # Create stacked bars
        bottom = np.zeros(len(all_languages))
        bars = []

        for j, category in enumerate(categories):
            bar = ax.bar(all_languages, matrix[:, j], bottom=bottom,
                        label=category.replace('_', ' ').title(),
                        color=colors[j], alpha=0.85, edgecolor='black', linewidth=0.8)
            bars.append(bar)
            bottom += matrix[:, j]

        # Add total counts on top of bars
        for i, lang in enumerate(all_languages):
            total = matrix[i, :].sum()
            if total > 0:
                ax.text(i, total + max(bottom) * 0.01, f'{int(total)}',
                       ha='center', va='bottom', fontweight='bold', fontsize=11)

        ax.set_ylabel('Number of Pattern Occurrences', fontweight='bold', fontsize=12)
        ax.set_xlabel('Programming Language', fontweight='bold', fontsize=12)
        ax.set_title('Pattern Category Distribution Across All Languages',
                    fontweight='bold', fontsize=15, pad=20)
        ax.legend(loc='upper left', frameon=True, shadow=True, fontsize=11)
        ax.grid(axis='y', alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_distribution_all_languages.png')
        plt.close()

    def plot_energy_impact_distribution(self, pattern_stats):
        """Plot distribution of patterns by energy impact level"""

        by_impact = pattern_stats.get('by_impact', {})
        if not by_impact:
            return

        fig, ax = plt.subplots(figsize=(10, 7))

        # Order: high, medium, low
        impact_order = ['high', 'medium', 'low']
        impacts = [by_impact.get(imp, 0) for imp in impact_order]
        colors_map = {'high': '#FF6B6B', 'medium': '#FFA07A', 'low': '#FFD700'}
        colors = [colors_map[imp] for imp in impact_order]

        bars = ax.bar(impact_order, impacts, color=colors, alpha=0.8,
                     edgecolor='black', linewidth=1.5)

        # Add value labels and percentages
        total = sum(impacts)
        for bar, count in zip(bars, impacts):
            height = bar.get_height()
            percentage = (count / total * 100) if total > 0 else 0
            ax.text(bar.get_x() + bar.get_width()/2, height + max(impacts) * 0.02,
                   f'{count}\n({percentage:.1f}%)',
                   ha='center', va='bottom', fontweight='bold', fontsize=12)

        ax.set_ylabel('Number of Pattern Occurrences', fontweight='bold', fontsize=12)
        ax.set_xlabel('Energy Impact Level', fontweight='bold', fontsize=12)
        ax.set_title('Distribution of Patterns by Energy Impact\n(Based on Literature)',
                    fontweight='bold', fontsize=15, pad=15)
        ax.grid(axis='y', alpha=0.3)

        # Add impact descriptions
        descriptions = {
            'high': 'High Impact:\n>30% energy reduction',
            'medium': 'Medium Impact:\n10-30% energy reduction',
            'low': 'Low Impact:\n<10% energy reduction'
        }

        y_pos = max(impacts) * 0.85
        for i, (imp, desc) in enumerate(descriptions.items()):
            ax.text(i, y_pos, desc, ha='center', va='center',
                   bbox=dict(boxstyle='round', facecolor='white', alpha=0.8),
                   fontsize=9)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'energy_impact_distribution.png')
        plt.close()

    def plot_correlation_heatmap(self, correlations):
        """Plot correlation heatmap"""

        if not correlations:
            # No data - create placeholder
            fig, ax = plt.subplots(figsize=(12, 8))

            ax.text(0.5, 0.5, 'Correlation Heatmap\n(No correlation data available)\n\n'
                   'Requires execution metrics data in execution_outputs/',
                   ha='center', va='center', fontsize=14,
                   bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8))

            ax.set_title('Pattern-Performance Correlation Analysis',
                        fontweight='bold', fontsize=15)
            ax.axis('off')

            plt.tight_layout()
            plt.savefig(self.output_dir / 'correlation_heatmap.png')
            plt.close()
            return

        # Filter to significant correlations
        significant = [c for c in correlations if c.get('significant', False)]

        if not significant:
            # No significant correlations
            fig, ax = plt.subplots(figsize=(12, 8))

            ax.text(0.5, 0.5, f'No Statistically Significant Correlations Found\n\n'
                   f'Analyzed {len(correlations)} patterns\n'
                   f'None reached p < 0.05 threshold',
                   ha='center', va='center', fontsize=14,
                   bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8))

            ax.set_title('Pattern-Performance Correlation Analysis',
                        fontweight='bold', fontsize=15)
            ax.axis('off')

            plt.tight_layout()
            plt.savefig(self.output_dir / 'correlation_heatmap.png')
            plt.close()
            return

        # Create correlation matrix visualization
        # Top 20 correlations (by absolute value)
        top_correlations = sorted(significant, key=lambda x: abs(x['correlation']), reverse=True)[:20]

        patterns = [c['pattern'].replace('_', ' ')[:30] for c in top_correlations]
        corr_values = [c['correlation'] for c in top_correlations]
        p_values = [c['p_value'] for c in top_correlations]
        frequencies = [c['frequency'] for c in top_correlations]

        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(18, 10), gridspec_kw={'width_ratios': [3, 1]})

        # Left plot: Correlation bar chart
        colors = ['green' if c > 0 else 'red' for c in corr_values]
        bars = ax1.barh(patterns, corr_values, color=colors, alpha=0.7, edgecolor='black', linewidth=0.8)

        # Add value labels and significance markers
        for i, (bar, corr, p_val) in enumerate(zip(bars, corr_values, p_values)):
            sig_marker = '***' if p_val < 0.001 else '**' if p_val < 0.01 else '*'
            label_x = corr + (0.02 if corr > 0 else -0.02)
            ha = 'left' if corr > 0 else 'right'

            ax1.text(label_x, bar.get_y() + bar.get_height()/2,
                    f'{corr:.3f}{sig_marker}',
                    ha=ha, va='center', fontweight='bold', fontsize=9)

        ax1.axvline(0, color='black', linewidth=1.5, linestyle='-')
        ax1.axvline(0.3, color='green', linewidth=1, linestyle='--', alpha=0.5)
        ax1.axvline(-0.3, color='red', linewidth=1, linestyle='--', alpha=0.5)

        ax1.set_xlabel('Correlation Coefficient (r)', fontweight='bold', fontsize=12)
        ax1.set_title('Pattern-Resource Reduction Correlations\n(Top 20 Significant Patterns)',
                     fontweight='bold', fontsize=14, pad=15)
        ax1.grid(axis='x', alpha=0.3)

        # Legend
        from matplotlib.patches import Patch
        legend_elements = [
            Patch(facecolor='green', label='Positive (correlated with reduction)'),
            Patch(facecolor='red', label='Negative (correlated with increase)'),
            Patch(facecolor='white', edgecolor='black', label='*** p<0.001, ** p<0.01, * p<0.05')
        ]
        ax1.legend(handles=legend_elements, loc='lower right', frameon=True, shadow=True)

        # Right plot: Frequency distribution
        ax2.barh(patterns, frequencies, color='steelblue', alpha=0.7, edgecolor='black', linewidth=0.8)

        for i, (freq, pattern) in enumerate(zip(frequencies, patterns)):
            ax2.text(freq + max(frequencies) * 0.02, i, f'{freq}',
                    ha='left', va='center', fontweight='bold', fontsize=9)

        ax2.set_xlabel('Pattern Frequency', fontweight='bold', fontsize=12)
        ax2.set_title('Occurrence Count', fontweight='bold', fontsize=14, pad=15)
        ax2.set_yticklabels([])  # Hide y-labels (shared with left plot)
        ax2.grid(axis='x', alpha=0.3)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'correlation_heatmap.png')
        plt.close()

    def plot_pattern_metric_correlations(self, entry_comparisons, correlations):
        """Plot pattern correlations for each specific metric (CPU, RAM, Time)"""

        # We need to load performance data and compute per-metric correlations
        # This requires accessing execution data similar to unified_pattern_analyzer

        from pathlib import Path
        import sys
        import os
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
        from utility_dir import utility_paths, general_utils

        # Build pattern-metric improvement mapping
        pattern_metric_improvements = defaultdict(lambda: {'CPU': [], 'RAM': [], 'Time': []})

        for comp in entry_comparisons:
            cluster = comp.cluster
            entry_id = comp.entry_id
            llm_type = comp.llm_type
            prompt_v = comp.prompt_version

            if prompt_v == "vNA":
                continue

            # Get LLM-introduced patterns
            llm_patterns = [p.name for p in comp.patterns if p.is_llm_introduced]

            if not llm_patterns:
                continue

            # Load performance data across 5 runs
            cpu_improvements = []
            ram_improvements = []
            time_improvements = []

            for run_num in range(1, 6):
                base_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{run_num}.json"
                llm_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{prompt_v}_{run_num}.json"

                if not base_exec_file.exists() or not llm_exec_file.exists():
                    continue

                base_data = general_utils.read_json(base_exec_file)
                llm_data = general_utils.read_json(llm_exec_file)

                if not base_data or not llm_data:
                    continue

                # Find metrics
                base_metrics = None
                for lang_key, results in base_data.get("results", {}).items():
                    for result in results:
                        if result.get("id") == entry_id:
                            base_metrics = {
                                'cpu': result.get("CPU_usage"),
                                'ram': result.get("RAM_usage"),
                                'time': result.get("execution_time_ms")
                            }
                            break
                    if base_metrics:
                        break

                if not base_metrics:
                    continue

                llm_metrics = None
                for lang_key, results in llm_data.get("results", {}).items():
                    for result in results:
                        if result.get("id") != entry_id:
                            continue
                        llm_results_array = result.get("LLM_results", [])
                        for llm_res in llm_results_array:
                            if llm_res.get("LLM_type") == llm_type:
                                llm_metrics = {
                                    'cpu': llm_res.get("CPU_usage"),
                                    'ram': llm_res.get("RAM_usage"),
                                    'time': llm_res.get("execution_time_ms")
                                }
                                break
                        if llm_metrics:
                            break
                    if llm_metrics:
                        break

                if base_metrics and llm_metrics:
                    try:
                        base_cpu = float(base_metrics['cpu']) if base_metrics['cpu'] is not None else None
                        llm_cpu = float(llm_metrics['cpu']) if llm_metrics['cpu'] is not None else None
                        if base_cpu and llm_cpu and base_cpu > 0:
                            cpu_impr = (base_cpu - llm_cpu) / base_cpu * 100
                            cpu_improvements.append(cpu_impr)
                    except (TypeError, ValueError):
                        pass

                    try:
                        base_ram = float(base_metrics['ram']) if base_metrics['ram'] is not None else None
                        llm_ram = float(llm_metrics['ram']) if llm_metrics['ram'] is not None else None
                        if base_ram and llm_ram and base_ram > 0:
                            ram_impr = (base_ram - llm_ram) / base_ram * 100
                            ram_improvements.append(ram_impr)
                    except (TypeError, ValueError):
                        pass

                    try:
                        base_time = float(base_metrics['time']) if base_metrics['time'] is not None else None
                        llm_time = float(llm_metrics['time']) if llm_metrics['time'] is not None else None
                        if base_time and llm_time and base_time > 0:
                            time_impr = (base_time - llm_time) / base_time * 100
                            time_improvements.append(time_impr)
                    except (TypeError, ValueError):
                        pass

            # Average improvements across runs
            cpu_mean = np.mean(cpu_improvements) if cpu_improvements else None
            ram_mean = np.mean(ram_improvements) if ram_improvements else None
            time_mean = np.mean(time_improvements) if time_improvements else None

            # Assign to all patterns in this entry
            for pattern in llm_patterns:
                if cpu_mean is not None:
                    pattern_metric_improvements[pattern]['CPU'].append(cpu_mean)
                if ram_mean is not None:
                    pattern_metric_improvements[pattern]['RAM'].append(ram_mean)
                if time_mean is not None:
                    pattern_metric_improvements[pattern]['Time'].append(time_mean)

        # Filter patterns with sufficient data
        significant_patterns = {}
        for pattern, metrics in pattern_metric_improvements.items():
            if len(metrics['CPU']) >= 5 or len(metrics['RAM']) >= 5 or len(metrics['Time']) >= 5:
                significant_patterns[pattern] = {
                    'CPU': np.mean(metrics['CPU']) if metrics['CPU'] else 0,
                    'RAM': np.mean(metrics['RAM']) if metrics['RAM'] else 0,
                    'Time': np.mean(metrics['Time']) if metrics['Time'] else 0,
                    'count': max(len(metrics['CPU']), len(metrics['RAM']), len(metrics['Time']))
                }

        if not significant_patterns:
            logger.warning("  No sufficient data for pattern-metric correlations")
            return

        # Sort by overall impact
        sorted_patterns = sorted(significant_patterns.items(),
                                key=lambda x: abs(x[1]['CPU']) + abs(x[1]['RAM']) + abs(x[1]['Time']),
                                reverse=True)[:20]

        patterns = [p[0].replace('_', ' ')[:30] for p in sorted_patterns]
        cpu_impacts = [p[1]['CPU'] for p in sorted_patterns]
        ram_impacts = [p[1]['RAM'] for p in sorted_patterns]
        time_impacts = [p[1]['Time'] for p in sorted_patterns]

        # Create grouped bar chart
        fig, ax = plt.subplots(figsize=(16, 10))

        x = np.arange(len(patterns))
        width = 0.25

        bars1 = ax.barh(x - width, cpu_impacts, width, label='CPU Usage',
                       color='#FF6B6B', alpha=0.8, edgecolor='black', linewidth=0.8)
        bars2 = ax.barh(x, ram_impacts, width, label='RAM Usage',
                       color='#4ECDC4', alpha=0.8, edgecolor='black', linewidth=0.8)
        bars3 = ax.barh(x + width, time_impacts, width, label='Execution Time',
                       color='#95E1D3', alpha=0.8, edgecolor='black', linewidth=0.8)

        ax.set_yticks(x)
        ax.set_yticklabels(patterns)
        ax.set_xlabel('Average Resource Reduction (%)', fontweight='bold', fontsize=12)
        ax.set_title('Pattern Impact on Specific Performance Metrics\n(Positive = Reduction/Improvement, Negative = Increase/Degradation)',
                    fontweight='bold', fontsize=15, pad=20)
        ax.legend(loc='best', frameon=True, shadow=True, fontsize=11)
        ax.axvline(0, color='black', linewidth=1.5, linestyle='-')
        ax.grid(axis='x', alpha=0.3)

        # Add reference annotations
        max_val = max(max(cpu_impacts), max(ram_impacts), max(time_impacts))
        min_val = min(min(cpu_impacts), min(ram_impacts), min(time_impacts))
        ax.text(max_val * 0.7, len(patterns) - 0.5, 'Better →',
               fontsize=10, color='green', fontweight='bold', ha='center')
        ax.text(min_val * 0.7 if min_val < 0 else -5, len(patterns) - 0.5, '← Worse',
               fontsize=10, color='red', fontweight='bold', ha='center')

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_metric_specific_correlations.png')
        plt.close()

    def plot_expected_improvements_by_pattern(self, entry_comparisons):
        """Plot expected improvement percentages for each pattern on each metric"""

        from pathlib import Path
        import sys
        import os
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
        from utility_dir import utility_paths, general_utils

        # Build comprehensive pattern-metric mapping
        pattern_improvements = defaultdict(lambda: {'CPU': [], 'RAM': [], 'Time': [], 'Overall': []})

        for comp in entry_comparisons:
            cluster = comp.cluster
            entry_id = comp.entry_id
            llm_type = comp.llm_type
            prompt_v = comp.prompt_version

            if prompt_v == "vNA":
                continue

            llm_patterns = [p.name for p in comp.patterns if p.is_llm_introduced]

            if not llm_patterns:
                continue

            # Aggregate across 5 runs
            all_cpu, all_ram, all_time = [], [], []

            for run_num in range(1, 6):
                base_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{run_num}.json"
                llm_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{prompt_v}_{run_num}.json"

                if not base_exec_file.exists() or not llm_exec_file.exists():
                    continue

                base_data = general_utils.read_json(base_exec_file)
                llm_data = general_utils.read_json(llm_exec_file)

                if not base_data or not llm_data:
                    continue

                base_metrics = None
                for lang_key, results in base_data.get("results", {}).items():
                    for result in results:
                        if result.get("id") == entry_id:
                            base_metrics = {
                                'cpu': result.get("CPU_usage"),
                                'ram': result.get("RAM_usage"),
                                'time': result.get("execution_time_ms")
                            }
                            break
                    if base_metrics:
                        break

                if not base_metrics:
                    continue

                llm_metrics = None
                for lang_key, results in llm_data.get("results", {}).items():
                    for result in results:
                        if result.get("id") != entry_id:
                            continue
                        for llm_res in result.get("LLM_results", []):
                            if llm_res.get("LLM_type") == llm_type:
                                llm_metrics = {
                                    'cpu': llm_res.get("CPU_usage"),
                                    'ram': llm_res.get("RAM_usage"),
                                    'time': llm_res.get("execution_time_ms")
                                }
                                break
                        if llm_metrics:
                            break
                    if llm_metrics:
                        break

                if base_metrics and llm_metrics:
                    try:
                        base_cpu = float(base_metrics['cpu']) if base_metrics['cpu'] is not None else None
                        llm_cpu = float(llm_metrics['cpu']) if llm_metrics['cpu'] is not None else None
                        if base_cpu and llm_cpu and base_cpu > 0:
                            all_cpu.append((base_cpu - llm_cpu) / base_cpu * 100)
                    except (TypeError, ValueError):
                        pass

                    try:
                        base_ram = float(base_metrics['ram']) if base_metrics['ram'] is not None else None
                        llm_ram = float(llm_metrics['ram']) if llm_metrics['ram'] is not None else None
                        if base_ram and llm_ram and base_ram > 0:
                            all_ram.append((base_ram - llm_ram) / base_ram * 100)
                    except (TypeError, ValueError):
                        pass

                    try:
                        base_time = float(base_metrics['time']) if base_metrics['time'] is not None else None
                        llm_time = float(llm_metrics['time']) if llm_metrics['time'] is not None else None
                        if base_time and llm_time and base_time > 0:
                            all_time.append((base_time - llm_time) / base_time * 100)
                    except (TypeError, ValueError):
                        pass

            cpu_mean = np.mean(all_cpu) if all_cpu else None
            ram_mean = np.mean(all_ram) if all_ram else None
            time_mean = np.mean(all_time) if all_time else None

            valid_improvements = [x for x in [cpu_mean, ram_mean, time_mean] if x is not None]
            overall_mean = np.mean(valid_improvements) if valid_improvements else None

            for pattern in llm_patterns:
                if cpu_mean is not None:
                    pattern_improvements[pattern]['CPU'].append(cpu_mean)
                if ram_mean is not None:
                    pattern_improvements[pattern]['RAM'].append(ram_mean)
                if time_mean is not None:
                    pattern_improvements[pattern]['Time'].append(time_mean)
                if overall_mean is not None:
                    pattern_improvements[pattern]['Overall'].append(overall_mean)

        # Calculate expected improvements
        expected_improvements = {}
        for pattern, metrics in pattern_improvements.items():
            if len(metrics['Overall']) >= 3:  # Minimum 3 occurrences
                expected_improvements[pattern] = {
                    'CPU': (np.mean(metrics['CPU']), np.std(metrics['CPU'])) if metrics['CPU'] else (0, 0),
                    'RAM': (np.mean(metrics['RAM']), np.std(metrics['RAM'])) if metrics['RAM'] else (0, 0),
                    'Time': (np.mean(metrics['Time']), np.std(metrics['Time'])) if metrics['Time'] else (0, 0),
                    'Overall': (np.mean(metrics['Overall']), np.std(metrics['Overall'])),
                    'count': len(metrics['Overall'])
                }

        if not expected_improvements:
            logger.warning("  No sufficient data for expected improvement analysis")
            return

        # Sort by overall impact
        sorted_patterns = sorted(expected_improvements.items(),
                                key=lambda x: abs(x[1]['Overall'][0]),
                                reverse=True)[:15]

        # Create comprehensive visualization
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(18, 14))

        patterns = [p[0].replace('_', ' ')[:25] for p in sorted_patterns]

        # 1. Overall expected improvement
        overall_means = [p[1]['Overall'][0] for p in sorted_patterns]
        overall_stds = [p[1]['Overall'][1] for p in sorted_patterns]

        colors = ['green' if m > 0 else 'red' for m in overall_means]
        bars = ax1.barh(patterns, overall_means, xerr=overall_stds,
                       color=colors, alpha=0.7, edgecolor='black', linewidth=0.8,
                       capsize=5)

        for i, (bar, mean, std) in enumerate(zip(bars, overall_means, overall_stds)):
            label_x = mean + (std + 1 if mean > 0 else -(std + 1))
            ha = 'left' if mean > 0 else 'right'
            ax1.text(label_x, bar.get_y() + bar.get_height()/2,
                    f'{mean:.1f}%', ha=ha, va='center', fontweight='bold', fontsize=9)

        ax1.axvline(0, color='black', linewidth=1.5)
        ax1.set_xlabel('Expected Resource Reduction (%)', fontweight='bold', fontsize=11)
        ax1.set_title('Overall Expected Resource Reduction by Pattern\n(with Standard Deviation)',
                     fontweight='bold', fontsize=13)
        ax1.grid(axis='x', alpha=0.3)
        # Add annotations
        ax1.text(0.98, 0.98, 'Positive = Reduction (Better)\nNegative = Increase (Worse)',
                transform=ax1.transAxes, fontsize=9, verticalalignment='top',
                horizontalalignment='right', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

        # 2. CPU-specific
        cpu_means = [p[1]['CPU'][0] for p in sorted_patterns]
        # Green for reduction (good), Red for increase (bad)
        colors_cpu = ['#2ECC71' if m > 5 else '#A9DFBF' if m > 0 else '#E74C3C' if m < -5 else '#F1948A' for m in cpu_means]
        ax2.barh(patterns, cpu_means, color=colors_cpu, alpha=0.8, edgecolor='black', linewidth=0.8)
        ax2.axvline(0, color='black', linewidth=1.5)
        ax2.set_xlabel('CPU Usage Reduction (%)', fontweight='bold', fontsize=11)
        ax2.set_title('Expected CPU Reduction', fontweight='bold', fontsize=13)
        ax2.grid(axis='x', alpha=0.3)

        # 3. RAM-specific
        ram_means = [p[1]['RAM'][0] for p in sorted_patterns]
        colors_ram = ['#2ECC71' if m > 5 else '#A9DFBF' if m > 0 else '#E74C3C' if m < -5 else '#F1948A' for m in ram_means]
        ax3.barh(patterns, ram_means, color=colors_ram, alpha=0.8, edgecolor='black', linewidth=0.8)
        ax3.axvline(0, color='black', linewidth=1.5)
        ax3.set_xlabel('RAM Usage Reduction (%)', fontweight='bold', fontsize=11)
        ax3.set_title('Expected RAM Reduction', fontweight='bold', fontsize=13)
        ax3.grid(axis='x', alpha=0.3)

        # 4. Time-specific
        time_means = [p[1]['Time'][0] for p in sorted_patterns]
        colors_time = ['#2ECC71' if m > 5 else '#A9DFBF' if m > 0 else '#E74C3C' if m < -5 else '#F1948A' for m in time_means]
        ax4.barh(patterns, time_means, color=colors_time, alpha=0.8, edgecolor='black', linewidth=0.8)
        ax4.axvline(0, color='black', linewidth=1.5)
        ax4.set_xlabel('Execution Time Reduction (%)', fontweight='bold', fontsize=11)
        ax4.set_title('Expected Time Reduction', fontweight='bold', fontsize=13)
        ax4.grid(axis='x', alpha=0.3)

        fig.suptitle('Expected Performance Improvements by Pattern\n"If I introduce pattern X, what resource reduction Y% should I expect?"',
                    fontweight='bold', fontsize=16, y=0.995)

        plt.tight_layout(rect=[0, 0, 1, 0.98])
        plt.savefig(self.output_dir / 'expected_improvements_by_pattern.png')
        plt.close()

        # Also create a summary table visualization
        self._create_improvement_table(sorted_patterns, expected_improvements)

    def _create_improvement_table(self, sorted_patterns, expected_improvements):
        """Create a visual table of expected improvements"""

        fig, ax = plt.subplots(figsize=(16, 12))
        ax.axis('tight')
        ax.axis('off')

        # Build table data
        table_data = [['Pattern', 'Overall', 'CPU', 'RAM', 'Time', 'N', 'Interpretation']]

        for pattern, _ in sorted_patterns[:20]:
            data = expected_improvements[pattern]
            pattern_name = pattern.replace('_', ' ')[:30]

            overall_str = f"{data['Overall'][0]:.1f}% ± {data['Overall'][1]:.1f}"
            cpu_str = f"{data['CPU'][0]:.1f}%"
            ram_str = f"{data['RAM'][0]:.1f}%"
            time_str = f"{data['Time'][0]:.1f}%"
            count = data['count']

            # Interpretation (positive = reduction = good, negative = increase = bad)
            overall_val = data['Overall'][0]
            if overall_val > 10:
                interp = "Strong reduction"
            elif overall_val > 5:
                interp = "Moderate reduction"
            elif overall_val > 0:
                interp = "Slight reduction"
            elif overall_val > -5:
                interp = "Slight increase"
            else:
                interp = "Notable increase"

            table_data.append([pattern_name, overall_str, cpu_str, ram_str, time_str, str(count), interp])

        table = ax.table(cellText=table_data, cellLoc='center', loc='center',
                        colWidths=[0.25, 0.15, 0.1, 0.1, 0.1, 0.05, 0.2])

        table.auto_set_font_size(False)
        table.set_fontsize(9)
        table.scale(1, 2.5)

        # Style header
        for i in range(7):
            cell = table[(0, i)]
            cell.set_facecolor('#4ECDC4')
            cell.set_text_props(weight='bold', color='white', fontsize=10)

        # Color code rows (green = reduction/good, red = increase/bad)
        for i in range(1, len(table_data)):
            overall_val = float(table_data[i][1].split('%')[0])
            if overall_val > 5:
                color = '#E8F5E9'  # Light green (strong reduction)
            elif overall_val > 0:
                color = '#FFF9C4'  # Light yellow (slight reduction)
            else:
                color = '#FFEBEE'  # Light red (increase/degradation)

            for j in range(7):
                table[(i, j)].set_facecolor(color)

        ax.set_title('Pattern-Resource Reduction Lookup Table\n"What resource reduction can I expect from each pattern?"\n(Positive = Reduction, Negative = Increase)',
                    fontweight='bold', fontsize=16, pad=20)

        plt.tight_layout()
        plt.savefig(self.output_dir / 'pattern_improvement_lookup_table.png')
        plt.close()
