"""
Energy and Carbon Footprint Visualizator

This module generates comprehensive visualizations for energy and carbon analysis,
including box plots, bar plots, and summary reports.

Author: Senior AI Engineer & Data Scientist
Date: 2025-11-01
Version: 1.0
"""

import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pathlib import Path
from typing import Dict, List, Optional
import sys
import logging

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))
from utility_dir.general_utils import read_json


class EnergyCarbonStatsVisualizator:
    """
    Visualizator for energy and carbon statistics.

    Generates box plots, bar plots, and summary reports from energy_carbon_stats.json.
    """

    def __init__(self, stats_json_path: str):
        """
        Initialize visualizator with statistics data.

        Args:
            stats_json_path: Path to energy_carbon_stats.json
        """
        self.stats_json_path = Path(stats_json_path)
        self.stats_data = read_json(stats_json_path)

        # Setup output directory
        self.plots_dir = self.stats_json_path.parent / "plots"
        self.plots_dir.mkdir(exist_ok=True)

        # Setup logger
        self.logger = logging.getLogger(__name__)

        # Define color schemes
        self.model_colors = {
            "base": "#2ecc71",      # Green
            "openai": "#3498db",    # Blue
            "claude": "#9b59b6",    # Purple
            "gemini": "#e74c3c"     # Red
        }

        # Set plot style
        sns.set_style("whitegrid")
        plt.rcParams['figure.dpi'] = 300
        plt.rcParams['savefig.dpi'] = 300
        plt.rcParams['font.size'] = 10

        self.logger.info(f"EnergyCarbonStatsVisualizator initialized. Output dir: {self.plots_dir}")

    def _get_improvement_annotation(self, category_name: str, metric: str = 'energy') -> str:
        """
        Get improvement percentage annotation for a category.

        Args:
            category_name: Category name (e.g., "OpenAI v1", "Claude v2")
            metric: 'energy' or 'carbon'

        Returns:
            Formatted string like "-15.3%" or "+5.2%"
        """
        # Map category name to stats dict structure
        model_map = {
            "openai": "openAI",
            "claude": "claude",
            "gemini": "gemini"
        }

        # Parse category name (e.g., "OpenAI v1" -> model="openai", prompt="v1")
        parts = category_name.lower().split()
        if len(parts) < 2:
            return ""

        model = parts[0]
        prompt_v = parts[1]

        if model not in model_map:
            return ""

        # Get stats from by_model_prompt
        key = f"{model_map[model]}_{prompt_v}"
        stats = self.stats_data.get("by_model_prompt", {}).get(key, {})

        improvement_key = f"{metric}_improvement_pct"
        improvement_stats = stats.get(improvement_key, {})

        # Use MEDIAN instead of MEAN to avoid outlier influence
        median_improvement = improvement_stats.get("median")

        if median_improvement is None:
            return ""

        # Format with sign and color indication
        sign = "+" if median_improvement > 0 else ""
        return f"{sign}{median_improvement:.1f}%"

    def _format_metric_label(self, metric: str, value: float) -> str:
        """
        Format metric value with appropriate units and precision.

        Args:
            metric: 'energy' or 'carbon'
            value: Metric value

        Returns:
            Formatted string with units
        """
        if metric == 'energy':
            # Convert to mJ (millijoules) if < 1 J
            if value < 1.0:
                return f"{value * 1000:.2f} mJ"
            elif value < 1000:
                return f"{value:.2f} J"
            else:
                return f"{value / 1000:.2f} kJ"
        else:  # carbon
            # Keep in gCO2eq, but adjust precision based on magnitude
            if value < 0.001:
                return f"{value * 1000:.4f} mgCO2eq"
            elif value < 1.0:
                return f"{value:.4f} gCO2eq"
            else:
                return f"{value:.2f} gCO2eq"

    def plot_energy_distribution_boxplot(self) -> Path:
        """
        Generate box plot for energy distribution across categories.

        Categories: Base Code (Avg), LLM (Avg), OpenAI v1, OpenAI v2, ..., Claude v1, ...

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating energy distribution box plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("energy_by_category", [])

        # Prepare data for plotting
        categories = []
        values_list = []
        colors = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            values_list.append(values)

            # Assign color
            if "Base" in category:
                colors.append(self.model_colors["base"])
            elif "openai" in category.lower():
                colors.append(self.model_colors["openai"])
            elif "claude" in category.lower():
                colors.append(self.model_colors["claude"])
            elif "gemini" in category.lower():
                colors.append(self.model_colors["gemini"])
            else:
                colors.append("#95a5a6")  # Gray for LLM (Avg)

        # Create figure
        fig, ax = plt.subplots(figsize=(16, 8))

        # Create box plot
        bp = ax.boxplot(values_list, labels=categories, patch_artist=True,
                        showmeans=True, meanline=True,
                        boxprops=dict(linewidth=1.5),
                        medianprops=dict(color='black', linewidth=2),
                        meanprops=dict(color='red', linewidth=2, linestyle='--'))

        # Color boxes
        for patch, color in zip(bp['boxes'], colors):
            patch.set_facecolor(color)
            patch.set_alpha(0.7)

        # Add improvement annotations
        for i, category in enumerate(categories):
            if i >= 2:  # Skip "Base Code (Avg)" and "LLM (Avg)"
                improvement = self._get_improvement_annotation(category, metric='energy')
                if improvement:
                    # Position annotation at Q3 (75th percentile) for better visibility
                    # This positions it above the box but below outliers
                    q3 = np.percentile(values_list[i], 75) if values_list[i] else 0
                    median = np.median(values_list[i]) if values_list[i] else 0
                    # Position slightly above Q3
                    y_pos = q3 + (q3 - median) * 0.5
                    ax.text(i + 1, y_pos, improvement,
                           ha='center', va='bottom', fontsize=9,
                           color='green' if '-' in improvement else 'red',
                           fontweight='bold',
                           bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.7, edgecolor='none'))

        # Labels and title
        ax.set_xlabel('Category', fontsize=12, fontweight='bold')
        ax.set_ylabel('Energy Consumption (Joules)', fontsize=12, fontweight='bold')
        ax.set_title('Energy Distribution: Base Code vs LLM-Generated Code\n'
                    '(By Model and Prompt Version)', fontsize=14, fontweight='bold')

        # Rotate x-axis labels for readability
        plt.xticks(rotation=45, ha='right')

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "energy_distribution_boxplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Energy distribution box plot saved to: {output_path}")
        return output_path

    def plot_carbon_distribution_boxplot(self) -> Path:
        """
        Generate box plot for carbon footprint distribution across categories.

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating carbon distribution box plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("carbon_by_category", [])

        # Prepare data for plotting
        categories = []
        values_list = []
        colors = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            values_list.append(values)

            # Assign color
            if "Base" in category:
                colors.append(self.model_colors["base"])
            elif "openai" in category.lower():
                colors.append(self.model_colors["openai"])
            elif "claude" in category.lower():
                colors.append(self.model_colors["claude"])
            elif "gemini" in category.lower():
                colors.append(self.model_colors["gemini"])
            else:
                colors.append("#95a5a6")  # Gray

        # Create figure
        fig, ax = plt.subplots(figsize=(16, 8))

        # Create box plot
        bp = ax.boxplot(values_list, labels=categories, patch_artist=True,
                        showmeans=True, meanline=True,
                        boxprops=dict(linewidth=1.5),
                        medianprops=dict(color='black', linewidth=2),
                        meanprops=dict(color='red', linewidth=2, linestyle='--'))

        # Color boxes
        for patch, color in zip(bp['boxes'], colors):
            patch.set_facecolor(color)
            patch.set_alpha(0.7)

        # Add improvement annotations
        for i, category in enumerate(categories):
            if i >= 2:  # Skip "Base Code (Avg)" and "LLM (Avg)"
                improvement = self._get_improvement_annotation(category, metric='carbon')
                if improvement:
                    # Position annotation at Q3 (75th percentile) for better visibility
                    # This positions it above the box but below outliers
                    q3 = np.percentile(values_list[i], 75) if values_list[i] else 0
                    median = np.median(values_list[i]) if values_list[i] else 0
                    # Position slightly above Q3
                    y_pos = q3 + (q3 - median) * 0.5
                    ax.text(i + 1, y_pos, improvement,
                           ha='center', va='bottom', fontsize=9,
                           color='green' if '-' in improvement else 'red',
                           fontweight='bold',
                           bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.7, edgecolor='none'))

        # Labels and title
        ax.set_xlabel('Category', fontsize=12, fontweight='bold')
        ax.set_ylabel('Carbon Footprint (gCO2eq)', fontsize=12, fontweight='bold')
        ax.set_title('Carbon Footprint Distribution: Base Code vs LLM-Generated Code\n'
                    '(By Model and Prompt Version)', fontsize=14, fontweight='bold')

        # Rotate x-axis labels for readability
        plt.xticks(rotation=45, ha='right')

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "carbon_distribution_boxplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Carbon distribution box plot saved to: {output_path}")
        return output_path

    def plot_energy_by_prompt_version(self) -> Path:
        """
        Generate bar plot comparing energy consumption by prompt version.

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating energy by prompt version bar plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("energy_by_prompt", [])

        # Prepare data
        categories = []
        means = []
        stds = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            means.append(np.mean(values))
            stds.append(np.std(values))

        # Create figure
        fig, ax = plt.subplots(figsize=(10, 6))

        # Create bar plot
        x_pos = np.arange(len(categories))
        bars = ax.bar(x_pos, means, yerr=stds, capsize=5, alpha=0.7,
                     color=[self.model_colors["base"] if c == "Base" else "#3498db" for c in categories],
                     edgecolor='black', linewidth=1.5)

        # Add value labels and improvement percentages on bars
        base_mean = means[0] if categories and categories[0] == "Base" else None

        for i, (bar, mean_val) in enumerate(zip(bars, means)):
            height = bar.get_height()

            # Show absolute value
            ax.text(bar.get_x() + bar.get_width() / 2., height,
                   f'{mean_val:.2f}',
                   ha='center', va='bottom', fontsize=9)

            # Add improvement percentage for non-base categories
            if base_mean and i > 0:  # Skip "Base"
                improvement_pct = ((mean_val - base_mean) / base_mean) * 100
                color = 'green' if improvement_pct < 0 else 'red'
                ax.text(bar.get_x() + bar.get_width() / 2., height * 1.15,
                       f'{improvement_pct:+.1f}%',
                       ha='center', va='bottom', fontsize=9,
                       color=color, fontweight='bold')

        # Labels and title
        ax.set_xlabel('Prompt Version', fontsize=12, fontweight='bold')
        ax.set_ylabel('Mean Energy Consumption (Joules)', fontsize=12, fontweight='bold')
        ax.set_title('Energy Consumption by Prompt Version\n(Base vs v1-v4)', fontsize=14, fontweight='bold')
        ax.set_xticks(x_pos)
        ax.set_xticklabels(categories)

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "energy_by_prompt_version_barplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Energy by prompt version bar plot saved to: {output_path}")
        return output_path

    def plot_carbon_by_prompt_version(self) -> Path:
        """
        Generate bar plot comparing carbon footprint by prompt version.

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating carbon by prompt version bar plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("carbon_by_prompt", [])

        # Prepare data
        categories = []
        means = []
        stds = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            means.append(np.mean(values))
            stds.append(np.std(values))

        # Create figure
        fig, ax = plt.subplots(figsize=(10, 6))

        # Create bar plot
        x_pos = np.arange(len(categories))
        bars = ax.bar(x_pos, means, yerr=stds, capsize=5, alpha=0.7,
                     color=[self.model_colors["base"] if c == "Base" else "#3498db" for c in categories],
                     edgecolor='black', linewidth=1.5)

        # Add value labels and improvement percentages on bars
        base_mean = means[0] if categories and categories[0] == "Base" else None

        for i, (bar, mean_val) in enumerate(zip(bars, means)):
            height = bar.get_height()

            # Show absolute value
            ax.text(bar.get_x() + bar.get_width() / 2., height,
                   f'{mean_val:.4f}',
                   ha='center', va='bottom', fontsize=9)

            # Add improvement percentage for non-base categories
            if base_mean and i > 0:  # Skip "Base"
                improvement_pct = ((mean_val - base_mean) / base_mean) * 100
                color = 'green' if improvement_pct < 0 else 'red'
                ax.text(bar.get_x() + bar.get_width() / 2., height * 1.15,
                       f'{improvement_pct:+.1f}%',
                       ha='center', va='bottom', fontsize=9,
                       color=color, fontweight='bold')

        # Labels and title
        ax.set_xlabel('Prompt Version', fontsize=12, fontweight='bold')
        ax.set_ylabel('Mean Carbon Footprint (gCO2eq)', fontsize=12, fontweight='bold')
        ax.set_title('Carbon Footprint by Prompt Version\n(Base vs v1-v4)', fontsize=14, fontweight='bold')
        ax.set_xticks(x_pos)
        ax.set_xticklabels(categories)

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "carbon_by_prompt_version_barplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Carbon by prompt version bar plot saved to: {output_path}")
        return output_path

    def plot_energy_by_model(self) -> Path:
        """
        Generate bar plot comparing energy consumption by model.

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating energy by model bar plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("energy_by_model", [])

        # Prepare data
        categories = []
        means = []
        stds = []
        colors_list = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            means.append(np.mean(values))
            stds.append(np.std(values))

            # Assign color
            if category == "Base":
                colors_list.append(self.model_colors["base"])
            elif "openai" in category.lower():
                colors_list.append(self.model_colors["openai"])
            elif "claude" in category.lower():
                colors_list.append(self.model_colors["claude"])
            elif "gemini" in category.lower():
                colors_list.append(self.model_colors["gemini"])
            else:
                colors_list.append("#95a5a6")

        # Create figure
        fig, ax = plt.subplots(figsize=(10, 6))

        # Create bar plot
        x_pos = np.arange(len(categories))
        bars = ax.bar(x_pos, means, yerr=stds, capsize=5, alpha=0.7,
                     color=colors_list, edgecolor='black', linewidth=1.5)

        # Add value labels and improvement percentages on bars
        base_mean = means[0] if categories and categories[0] == "Base" else None

        for i, (bar, mean_val) in enumerate(zip(bars, means)):
            height = bar.get_height()

            # Show absolute value
            ax.text(bar.get_x() + bar.get_width() / 2., height,
                   f'{mean_val:.2f}',
                   ha='center', va='bottom', fontsize=9)

            # Add improvement percentage for non-base categories
            if base_mean and i > 0:  # Skip "Base"
                improvement_pct = ((mean_val - base_mean) / base_mean) * 100
                color = 'green' if improvement_pct < 0 else 'red'
                ax.text(bar.get_x() + bar.get_width() / 2., height * 1.15,
                       f'{improvement_pct:+.1f}%',
                       ha='center', va='bottom', fontsize=9,
                       color=color, fontweight='bold')

        # Labels and title
        ax.set_xlabel('Model', fontsize=12, fontweight='bold')
        ax.set_ylabel('Mean Energy Consumption (Joules)', fontsize=12, fontweight='bold')
        ax.set_title('Energy Consumption by LLM Model\n(Base vs OpenAI vs Claude vs Gemini)',
                    fontsize=14, fontweight='bold')
        ax.set_xticks(x_pos)
        ax.set_xticklabels(categories)

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "energy_by_model_barplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Energy by model bar plot saved to: {output_path}")
        return output_path

    def plot_carbon_by_model(self) -> Path:
        """
        Generate bar plot comparing carbon footprint by model.

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating carbon by model bar plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("carbon_by_model", [])

        # Prepare data
        categories = []
        means = []
        stds = []
        colors_list = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            means.append(np.mean(values))
            stds.append(np.std(values))

            # Assign color
            if category == "Base":
                colors_list.append(self.model_colors["base"])
            elif "openai" in category.lower():
                colors_list.append(self.model_colors["openai"])
            elif "claude" in category.lower():
                colors_list.append(self.model_colors["claude"])
            elif "gemini" in category.lower():
                colors_list.append(self.model_colors["gemini"])
            else:
                colors_list.append("#95a5a6")

        # Create figure
        fig, ax = plt.subplots(figsize=(10, 6))

        # Create bar plot
        x_pos = np.arange(len(categories))
        bars = ax.bar(x_pos, means, yerr=stds, capsize=5, alpha=0.7,
                     color=colors_list, edgecolor='black', linewidth=1.5)

        # Add value labels and improvement percentages on bars
        base_mean = means[0] if categories and categories[0] == "Base" else None

        for i, (bar, mean_val) in enumerate(zip(bars, means)):
            height = bar.get_height()

            # Show absolute value
            ax.text(bar.get_x() + bar.get_width() / 2., height,
                   f'{mean_val:.4f}',
                   ha='center', va='bottom', fontsize=9)

            # Add improvement percentage for non-base categories
            if base_mean and i > 0:  # Skip "Base"
                improvement_pct = ((mean_val - base_mean) / base_mean) * 100
                color = 'green' if improvement_pct < 0 else 'red'
                ax.text(bar.get_x() + bar.get_width() / 2., height * 1.15,
                       f'{improvement_pct:+.1f}%',
                       ha='center', va='bottom', fontsize=9,
                       color=color, fontweight='bold')

        # Labels and title
        ax.set_xlabel('Model', fontsize=12, fontweight='bold')
        ax.set_ylabel('Mean Carbon Footprint (gCO2eq)', fontsize=12, fontweight='bold')
        ax.set_title('Carbon Footprint by LLM Model\n(Base vs OpenAI vs Claude vs Gemini)',
                    fontsize=14, fontweight='bold')
        ax.set_xticks(x_pos)
        ax.set_xticklabels(categories)

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "carbon_by_model_barplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Carbon by model bar plot saved to: {output_path}")
        return output_path

    def plot_energy_by_language(self) -> Path:
        """
        Generate box plot for energy consumption by programming language (LLM only).

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating energy by language box plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("energy_by_language", [])

        # Prepare data
        categories = []
        values_list = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            values_list.append(values)

        if not categories:
            self.logger.warning("No data for energy by language plot")
            return None

        # Create figure
        fig, ax = plt.subplots(figsize=(12, 6))

        # Create box plot
        bp = ax.boxplot(values_list, labels=categories, patch_artist=True,
                        showmeans=True, meanline=True,
                        boxprops=dict(facecolor='#3498db', alpha=0.7, linewidth=1.5),
                        medianprops=dict(color='black', linewidth=2),
                        meanprops=dict(color='red', linewidth=2, linestyle='--'))

        # Labels and title
        ax.set_xlabel('Programming Language', fontsize=12, fontweight='bold')
        ax.set_ylabel('Energy Consumption (Joules)', fontsize=12, fontweight='bold')
        ax.set_title('Energy Consumption by Programming Language\n(LLM-Generated Code Only)',
                    fontsize=14, fontweight='bold')

        # Rotate x-axis labels if needed
        if len(categories) > 5:
            plt.xticks(rotation=45, ha='right')

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "energy_by_language_boxplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Energy by language box plot saved to: {output_path}")
        return output_path

    def plot_carbon_by_language(self) -> Path:
        """
        Generate box plot for carbon footprint by programming language (LLM only).

        Returns:
            Path to saved plot file
        """
        self.logger.info("Generating carbon by language box plot...")

        plot_data = self.stats_data.get("plot_data", {}).get("carbon_by_language", [])

        # Prepare data
        categories = []
        values_list = []

        for item in plot_data:
            category = item["category"]
            values = item["values"]

            if not values:
                continue

            categories.append(category)
            values_list.append(values)

        if not categories:
            self.logger.warning("No data for carbon by language plot")
            return None

        # Create figure
        fig, ax = plt.subplots(figsize=(12, 6))

        # Create box plot
        bp = ax.boxplot(values_list, labels=categories, patch_artist=True,
                        showmeans=True, meanline=True,
                        boxprops=dict(facecolor='#e74c3c', alpha=0.7, linewidth=1.5),
                        medianprops=dict(color='black', linewidth=2),
                        meanprops=dict(color='darkred', linewidth=2, linestyle='--'))

        # Labels and title
        ax.set_xlabel('Programming Language', fontsize=12, fontweight='bold')
        ax.set_ylabel('Carbon Footprint (gCO2eq)', fontsize=12, fontweight='bold')
        ax.set_title('Carbon Footprint by Programming Language\n(LLM-Generated Code Only)',
                    fontsize=14, fontweight='bold')

        # Rotate x-axis labels if needed
        if len(categories) > 5:
            plt.xticks(rotation=45, ha='right')

        # Grid
        ax.yaxis.grid(True, alpha=0.3)

        # Tight layout
        plt.tight_layout()

        # Save
        output_path = self.plots_dir / "carbon_by_language_boxplot.png"
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        plt.close()

        self.logger.info(f"Carbon by language box plot saved to: {output_path}")
        return output_path

    def generate_all_plots(self) -> List[Path]:
        """
        Generate all visualization plots.

        Returns:
            List of paths to generated plot files
        """
        self.logger.info("=" * 60)
        self.logger.info("GENERATING ALL PLOTS")
        self.logger.info("=" * 60)

        plot_files = []

        try:
            # Plot 1: Energy distribution box plot
            path = self.plot_energy_distribution_boxplot()
            if path:
                plot_files.append(path)

            # Plot 2: Carbon distribution box plot
            path = self.plot_carbon_distribution_boxplot()
            if path:
                plot_files.append(path)

            # Plot 3: Energy by prompt version
            path = self.plot_energy_by_prompt_version()
            if path:
                plot_files.append(path)

            # Plot 4: Carbon by prompt version
            path = self.plot_carbon_by_prompt_version()
            if path:
                plot_files.append(path)

            # Plot 5: Energy by model
            path = self.plot_energy_by_model()
            if path:
                plot_files.append(path)

            # Plot 6: Carbon by model
            path = self.plot_carbon_by_model()
            if path:
                plot_files.append(path)

            # Plot 7: Energy by language
            path = self.plot_energy_by_language()
            if path:
                plot_files.append(path)

            # Plot 8: Carbon by language
            path = self.plot_carbon_by_language()
            if path:
                plot_files.append(path)

            self.logger.info("=" * 60)
            self.logger.info(f"ALL PLOTS GENERATED SUCCESSFULLY ({len(plot_files)} plots)")
            self.logger.info("=" * 60)

        except Exception as e:
            self.logger.error(f"Error generating plots: {e}", exc_info=True)

        return plot_files

    def generate_summary_report(self) -> Path:
        """
        Generate markdown summary report with statistics and visualizations.

        Returns:
            Path to generated markdown file
        """
        self.logger.info("Generating summary report...")

        report_lines = []

        # Header
        report_lines.append("# Energy and Carbon Footprint Analysis Report\n")
        report_lines.append(f"**Generated:** {Path(__file__).parent.name}\n")
        report_lines.append("---\n\n")

        # Global Statistics
        report_lines.append("## Global Statistics\n\n")

        global_stats = self.stats_data.get("global_stats", {})

        # Base Code Stats
        report_lines.append("### Base Code\n\n")
        base_energy = global_stats.get("base", {}).get("energy_joules", {})
        base_carbon = global_stats.get("base", {}).get("carbon_gco2eq", {})

        report_lines.append("| Metric | Mean | Median | Std | Min | Max | Count |\n")
        report_lines.append("|--------|------|--------|-----|-----|-----|-------|\n")
        report_lines.append(
            f"| Energy (J) | {base_energy.get('mean', 0):.2f} | "
            f"{base_energy.get('median', 0):.2f} | {base_energy.get('std', 0):.2f} | "
            f"{base_energy.get('min', 0):.2f} | {base_energy.get('max', 0):.2f} | "
            f"{base_energy.get('count', 0)} |\n"
        )
        report_lines.append(
            f"| Carbon (gCO2eq) | {base_carbon.get('mean', 0):.4f} | "
            f"{base_carbon.get('median', 0):.4f} | {base_carbon.get('std', 0):.4f} | "
            f"{base_carbon.get('min', 0):.4f} | {base_carbon.get('max', 0):.4f} | "
            f"{base_carbon.get('count', 0)} |\n\n"
        )

        # LLM Code Stats
        report_lines.append("### LLM-Generated Code\n\n")
        llm_energy = global_stats.get("llm", {}).get("energy_joules", {})
        llm_carbon = global_stats.get("llm", {}).get("carbon_gco2eq", {})

        report_lines.append("| Metric | Mean | Median | Std | Min | Max | Count |\n")
        report_lines.append("|--------|------|--------|-----|-----|-----|-------|\n")
        report_lines.append(
            f"| Energy (J) | {llm_energy.get('mean', 0):.2f} | "
            f"{llm_energy.get('median', 0):.2f} | {llm_energy.get('std', 0):.2f} | "
            f"{llm_energy.get('min', 0):.2f} | {llm_energy.get('max', 0):.2f} | "
            f"{llm_energy.get('count', 0)} |\n"
        )
        report_lines.append(
            f"| Carbon (gCO2eq) | {llm_carbon.get('mean', 0):.4f} | "
            f"{llm_carbon.get('median', 0):.4f} | {llm_carbon.get('std', 0):.4f} | "
            f"{llm_carbon.get('min', 0):.4f} | {llm_carbon.get('max', 0):.4f} | "
            f"{llm_carbon.get('count', 0)} |\n\n"
        )

        # Improvements
        report_lines.append("### Improvements (LLM vs Base)\n\n")
        energy_impr = global_stats.get("improvements", {}).get("energy_improvement_pct", {})
        carbon_impr = global_stats.get("improvements", {}).get("carbon_improvement_pct", {})

        report_lines.append("| Metric | Mean | Median | Std | Min | Max |\n")
        report_lines.append("|--------|------|--------|-----|-----|-----|\n")
        report_lines.append(
            f"| Energy Improvement (%) | {energy_impr.get('mean', 0):.2f} | "
            f"{energy_impr.get('median', 0):.2f} | {energy_impr.get('std', 0):.2f} | "
            f"{energy_impr.get('min', 0):.2f} | {energy_impr.get('max', 0):.2f} |\n"
        )
        report_lines.append(
            f"| Carbon Improvement (%) | {carbon_impr.get('mean', 0):.2f} | "
            f"{carbon_impr.get('median', 0):.2f} | {carbon_impr.get('std', 0):.2f} | "
            f"{carbon_impr.get('min', 0):.2f} | {carbon_impr.get('max', 0):.2f} |\n\n"
        )

        report_lines.append("**Note:** Negative improvement indicates reduction (better for sustainability).\n\n")

        # By Model
        report_lines.append("## Results by LLM Model\n\n")
        by_model = self.stats_data.get("by_model", {})

        report_lines.append("| Model | Energy Mean (J) | Carbon Mean (gCO2eq) | "
                          "Energy Impr (%) | Carbon Impr (%) |\n")
        report_lines.append("|-------|-----------------|----------------------|-----------------|------------------|\n")

        for model in ["openAI", "claude", "gemini"]:
            model_stats = by_model.get(model, {})
            e_mean = model_stats.get("energy_joules", {}).get("mean", 0)
            c_mean = model_stats.get("carbon_gco2eq", {}).get("mean", 0)
            e_impr = model_stats.get("energy_improvement_pct", {}).get("mean", 0)
            c_impr = model_stats.get("carbon_improvement_pct", {}).get("mean", 0)

            report_lines.append(
                f"| {model} | {e_mean:.2f} | {c_mean:.4f} | {e_impr:.2f} | {c_impr:.2f} |\n"
            )

        report_lines.append("\n")

        # By Prompt Version
        report_lines.append("## Results by Prompt Version\n\n")
        by_prompt = self.stats_data.get("by_prompt_version", {})

        report_lines.append("| Prompt | Energy Mean (J) | Carbon Mean (gCO2eq) | "
                          "Energy Impr (%) | Carbon Impr (%) |\n")
        report_lines.append("|--------|-----------------|----------------------|-----------------|------------------|\n")

        for prompt_v in ["v1", "v2", "v3", "v4"]:
            prompt_stats = by_prompt.get(prompt_v, {})
            e_mean = prompt_stats.get("energy_joules", {}).get("mean", 0)
            c_mean = prompt_stats.get("carbon_gco2eq", {}).get("mean", 0)
            e_impr = prompt_stats.get("energy_improvement_pct", {}).get("mean", 0)
            c_impr = prompt_stats.get("carbon_improvement_pct", {}).get("mean", 0)

            report_lines.append(
                f"| {prompt_v} | {e_mean:.2f} | {c_mean:.4f} | {e_impr:.2f} | {c_impr:.2f} |\n"
            )

        report_lines.append("\n")

        # Visualizations
        report_lines.append("## Visualizations\n\n")
        report_lines.append("### Energy and Carbon Distribution\n\n")
        report_lines.append("![Energy Distribution](energy_distribution_boxplot.png)\n\n")
        report_lines.append("![Carbon Distribution](carbon_distribution_boxplot.png)\n\n")

        report_lines.append("### Analysis by Prompt Version\n\n")
        report_lines.append("![Energy by Prompt](energy_by_prompt_version_barplot.png)\n\n")
        report_lines.append("![Carbon by Prompt](carbon_by_prompt_version_barplot.png)\n\n")

        report_lines.append("### Analysis by Model\n\n")
        report_lines.append("![Energy by Model](energy_by_model_barplot.png)\n\n")
        report_lines.append("![Carbon by Model](carbon_by_model_barplot.png)\n\n")

        report_lines.append("### Analysis by Programming Language\n\n")
        report_lines.append("![Energy by Language](energy_by_language_boxplot.png)\n\n")
        report_lines.append("![Carbon by Language](carbon_by_language_boxplot.png)\n\n")

        # Methodology
        report_lines.append("---\n\n")
        report_lines.append("## Methodology\n\n")
        report_lines.append("### Energy Calculation Formula\n\n")
        report_lines.append("```\n")
        report_lines.append("1. exec_time_sec = exec_time_ms / 1000\n")
        report_lines.append("2. cpu_power_watt = TDP_CPU * (CPU_usage% / 100)\n")
        report_lines.append("3. ram_power_watt = (RAM_KB / 1048576) * POWER_PER_GB_RAM\n")
        report_lines.append("4. total_power = (cpu_power + ram_power) * PUE_FACTOR\n")
        report_lines.append("5. energy_joules = total_power * exec_time_sec\n")
        report_lines.append("```\n\n")

        report_lines.append("### Carbon Calculation Formula\n\n")
        report_lines.append("```\n")
        report_lines.append("1. energy_kwh = energy_joules / 3,600,000\n")
        report_lines.append("2. carbon_gco2eq = energy_kwh * CARBON_INTENSITY\n")
        report_lines.append("```\n\n")

        report_lines.append("### Coefficients Used\n\n")
        report_lines.append("- **TDP_CPU_WATT:** 95.0 W (typical desktop CPU)\n")
        report_lines.append("- **POWER_PER_GB_RAM_WATT:** 0.375 W/GB (DDR4 average)\n")
        report_lines.append("- **PUE_FACTOR:** 1.5 (data center efficiency)\n")
        report_lines.append("- **CARBON_INTENSITY:** 400.0 gCO2eq/kWh (EU average)\n\n")

        report_lines.append("**Note:** These values are configurable in `energy_config.json`.\n")

        # Write report
        output_path = self.plots_dir / "energy_carbon_summary.md"
        with open(output_path, 'w') as f:
            f.writelines(report_lines)

        self.logger.info(f"Summary report saved to: {output_path}")

        return output_path


if __name__ == "__main__":
    """
    Standalone execution for testing visualizator.
    """
    import sys

    if len(sys.argv) < 2:
        print("Usage: python energy_visualizator.py <path_to_energy_carbon_stats.json>")
        sys.exit(1)

    stats_path = sys.argv[1]

    visualizer = EnergyCarbonStatsVisualizator(stats_path)
    plot_files = visualizer.generate_all_plots()

    print(f"\nGenerated {len(plot_files)} plots:")
    for pf in plot_files:
        print(f"  - {pf}")

    report_path = visualizer.generate_summary_report()
    print(f"\nSummary report: {report_path}")
