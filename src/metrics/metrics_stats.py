#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import glob
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from typing import Dict, Any, List, Tuple
import sys
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import argparse

import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning)


# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir import utility_paths  # noqa: E402

# =============================================================================
# CONFIGURATION
# =============================================================================

OUTPUT_DIR_FILEPATH = str(utility_paths.OUTPUT_DIR_FILEPATH)

# Metrics categories based on the research paper
HIGH_IMPORTANCE_METRICS = [
    "halstead_length",
    "halstead_vocabulary",
    "halstead_effort",
    "loc",
    "math_operations",
    "numeric_literals",
    "max_nested_blocks",
]

MEDIUM_IMPORTANCE_METRICS = [
    "halstead_volume",
    "halstead_difficulty",
    "halstead_time",
    "cyclomatic_complexity",
    "maintainability_index",
    "comparisons",
    "loops",
    "variables",
    "string_literals",
    "unique_words",
]

KEYWORD_METRICS = [
    "conditional_statements",
    "loop_constructs",
    "function_definitions",
    "exception_handling",
    "logical_operators",
    "return_statements",
]

# Energy efficiency calculations
ENERGY_METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================


def extract_exercise_name_from_cluster(cluster_path: str) -> str:
    """Extract exercise name from cluster file path."""
    filename = os.path.basename(cluster_path)
    # Remove cluster_ prefix and .with_metrics.json suffix
    exercise_name = (
        filename.replace("cluster_", "")
        .replace(".with_metrics.json", "")
        .replace(".json", "")
    )
    return exercise_name


def find_output_files_for_exercise(
    output_dir: str, exercise_name: str
) -> Tuple[List[str], List[str]]:
    """
    Find base and LLM output files for a specific exercise.

    Args:
        output_dir: Directory containing output files
        exercise_name: Name of the exercise

    Returns:
        Tuple of (base_files, llm_files_v4)
    """
    # Pattern for base files: {exercise_name}_results_{exec_number}.json
    base_pattern = f"{exercise_name}_results_*.json"
    base_files = glob.glob(os.path.join(output_dir, base_pattern))

    # Filter out version files (those containing _v)
    base_files = [f for f in base_files if "_v" not in os.path.basename(f)]

    # Pattern for LLM v4 files: {exercise_name}_results_v4_{exec_number}.json
    llm_v4_pattern = f"{exercise_name}_results_v4_*.json"
    llm_v4_files = glob.glob(os.path.join(output_dir, llm_v4_pattern))

    print(
        f"[INFO] Found {len(base_files)} base files and {len(llm_v4_files)} LLM v4 files for exercise '{exercise_name}'"
    )

    return sorted(base_files), sorted(llm_v4_files)


# =============================================================================
# DATA LOADING AND PREPROCESSING
# =============================================================================


def load_cluster_metrics(path: str) -> Dict[str, Any]:
    """Load the dataset with computed complexity metrics."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"[INFO] Successfully loaded cluster metrics from: {path}")
        return data
    except Exception as e:
        print(f"[ERROR] Failed to load cluster metrics: {e}")
        return {}


def load_execution_results(file_paths: List[str]) -> List[Dict[str, Any]]:
    """Load specific execution result files."""
    all_results = []

    for file_path in file_paths:
        try:
            # print(f"file_path = {file_path}")
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                all_results.append(
                    {
                        "filename": os.path.basename(file_path),
                        "filepath": file_path,
                        "data": data,
                    }
                )
        except json.JSONDecodeError as e:
            print(f"[WARN] Corrupted JSON file: {file_path} - {e}")
        except Exception as e:
            print(f"[WARN] Error loading file {file_path}: {e}")

    print(f"[INFO] Successfully loaded {len(all_results)} execution result files")
    return all_results

def calculate_average_energy_metrics(
    exec_results: List[Dict[str, Any]], is_llm: bool = False
) -> Dict[str, Dict[str, float]]:
    """
    Calculate average energy metrics from multiple execution files.

    Args:
        exec_results: List of execution result data
        is_llm: Whether these are LLM results or base results

    Returns:
        Dictionary mapping entry_id to average energy metrics
    """
    energy_data = {}

    for result_file in exec_results:
        data = result_file["data"] #json data 

        for lang, entries in data.get("results", {}).items():
            for entry in entries:
                entry_id = entry.get("id", "")

                #metriche LLM indipendenti da LLM type (aggregate)
                if is_llm:
                    # For LLM results, aggregate across all LLM types
                    for llm_result in entry.get("LLM_results", []):
                        if llm_result.get("regrationTestPassed", False):
                            if entry_id not in energy_data:
                                energy_data[entry_id] = {
                                    "CPU_usage": [],
                                    "RAM_usage": [],
                                    "execution_time_ms": [],
                                    "llm_type": llm_result.get("LLM_type", "unknown"),
                                }

                            #Handle None values explicitly
                            cpu_usage = llm_result.get("CPU_usage")
                            ram_usage = llm_result.get("RAM_usage")
                            exec_time = llm_result.get("execution_time_ms")
                            
                            # Only append non-None values, convert None to 0
                            energy_data[entry_id]["CPU_usage"].append(
                                cpu_usage if cpu_usage is not None else 0
                            )
                            energy_data[entry_id]["RAM_usage"].append(
                                ram_usage if ram_usage is not None else 0
                            )
                            energy_data[entry_id]["execution_time_ms"].append(
                                exec_time if exec_time is not None else 0
                            )
                else:
                    # For base results
                    if entry.get("regrationTestPassed", False): #filter for only entries with regression test passed 
                        if entry_id not in energy_data:
                            energy_data[entry_id] = {
                                "CPU_usage": [],
                                "RAM_usage": [],
                                "execution_time_ms": [],
                            }

                        
                        cpu_usage = entry.get("CPU_usage")
                        ram_usage = entry.get("RAM_usage")
                        exec_time = entry.get("execution_time_ms")

                        #handle none values : 
                        energy_data[entry_id]["CPU_usage"].append(
                            cpu_usage if cpu_usage is not None else 0
                        )
                        energy_data[entry_id]["RAM_usage"].append(
                            ram_usage if ram_usage is not None else 0
                        )
                        energy_data[entry_id]["execution_time_ms"].append(
                            exec_time if exec_time is not None else 0
                        )

    # Calculate averages
    averaged_data = {}
    for entry_id, metrics in energy_data.items():
        averaged_data[entry_id] = {}
        for metric_name, values in metrics.items():
            if metric_name != "llm_type" and values:
                # Additional safety: filter out any remaining None values before mean calculation
                clean_values = [v for v in values if v is not None]
                if clean_values:
                    averaged_data[entry_id][metric_name] = np.mean(clean_values)
                else:
                    averaged_data[entry_id][metric_name] = 0.0
            elif metric_name == "llm_type":
                averaged_data[entry_id][metric_name] = values

    return averaged_data


def calculate_energy_efficiency_improvements(
    base_metrics: Dict[str, float], llm_metrics: Dict[str, float]
) -> Dict[str, float]:
    """
    Calculate energy efficiency improvements between base and LLM-generated code.

    Args:
        base_metrics: Average energy metrics from base code
        llm_metrics: Average energy metrics from LLM-generated code

    Returns:
        Dictionary of improvement metrics
    """
    improvements = {}

    #improvements (higher = better) : 
    #quanto una determinata metrica migliora rispetto alla metrica di base 
    #es : se ho base time = 2000 e llm time = 1000 avrò 
    # improv = (2000-1000)/2000 = 0.5 = 50%
    
    
    # CPU efficiency improvement (higher is better)
    base_cpu = base_metrics.get("CPU_usage", 0)
    llm_cpu = llm_metrics.get("CPU_usage", 0)
    if base_cpu > 0:
        improvements["cpu_improvement_pct"] = ((base_cpu - llm_cpu) / base_cpu) * 100
    else:
        improvements["cpu_improvement_pct"] = 0

    # Memory efficiency improvement (higher is better)
    base_ram = base_metrics.get("RAM_usage", 0)
    llm_ram = llm_metrics.get("RAM_usage", 0)
    if base_ram > 0:
        improvements["ram_improvement_pct"] = ((base_ram - llm_ram) / base_ram) * 100
    else:
        improvements["ram_improvement_pct"] = 0

    # Execution time improvement (higher is better)
    base_time = base_metrics.get("execution_time_ms", 0)
    llm_time = llm_metrics.get("execution_time_ms", 0)
    if base_time > 0:
        improvements["time_improvement_pct"] = (
            (base_time - llm_time) / base_time
        ) * 100
    else:
        improvements["time_improvement_pct"] = 0

    # Combined energy proxy (CPU% * execution_time)
    base_energy = base_cpu * (base_time / 1000.0) if base_time > 0 else 0
    llm_energy = llm_cpu * (llm_time / 1000.0) if llm_time > 0 else 0

    if base_energy > 0:
        improvements["energy_improvement_pct"] = (
            (base_energy - llm_energy) / base_energy
        ) * 100
    else:
        improvements["energy_improvement_pct"] = 0

    # Store raw values for analysis
    improvements["base_energy_proxy"] = base_energy
    improvements["llm_energy_proxy"] = llm_energy
    improvements["base_cpu"] = base_cpu
    improvements["llm_cpu"] = llm_cpu
    improvements["base_ram"] = base_ram
    improvements["llm_ram"] = llm_ram
    improvements["base_time"] = base_time
    improvements["llm_time"] = llm_time

    return improvements


def create_analysis_dataframe(
    cluster_data: Dict[str, Any], #original cluster data with article's metrics 
    base_energy: Dict[str, Dict[str, float]], #average energy metrics (CPU, RAM, time) for base snippets 
    llm_energy: Dict[str, Dict[str, float]], #average energy metrics (CPU, RAM, time) for LLMs
) -> pd.DataFrame:
    """
    Create analysis DataFrame combining complexity metrics and energy improvements.

    Args:
        cluster_data: Cluster data with complexity metrics
        base_energy: Base code energy metrics (averaged)
        llm_energy: LLM code energy metrics (averaged)

    Returns:
        DataFrame for analysis
    """

    # print(f"cluster data:\n{cluster_data}\n")
    # print(f"base_energy:\n{base_energy}\n")
    # print(f"llm_energy:\n{llm_energy}\n")

    rows = []

    for lang, entries in cluster_data.items(): #iter cluster data   
        for entry in entries:
            entry_id = entry.get("id", "")
            # print(f"entry_id: {entry_id}\n")

            # Get base article's metrics (related to base code snippet)
            base_metrics = entry.get("base_metrics", {})
            
            if not base_metrics:
                continue

            # Flatten base complexity metrics
            base_complexity = {}
            for category, metrics in base_metrics.items():
                if isinstance(metrics, dict):
                    for metric_name, value in metrics.items():
                        if isinstance(value, (int, float)):
                            base_complexity[f"base_{metric_name}"] = value

            # print(f"base_complexity: {base_complexity}\n")
            # print(f"entry LLMs:\n{entry.get("LLMs", [])}\n")
            
            # Process LLM variants
            for llm_entry in entry.get("LLMs", []):
                llm_metrics = llm_entry.get("metrics", {})
                # print(f"llm_metrics:\n{llm_metrics}\n")
                if not llm_metrics:
                    continue

                llm_type = llm_entry.get("type", "unknown")

                # Flatten LLM complexity metrics
                llm_complexity = {}
                for category, metrics in llm_metrics.items():
                    if isinstance(metrics, dict):
                        for metric_name, value in metrics.items():
                            if isinstance(value, (int, float)):
                                llm_complexity[f"llm_{metric_name}"] = value

                # Calculate energy improvements if both base and LLM energy data exist                
                if entry_id in base_energy and entry_id in llm_energy:
                    energy_improvements = calculate_energy_efficiency_improvements(
                        base_energy[entry_id], llm_energy[entry_id]
                    )

                    # Create row
                    row = {
                        "entry_id": entry_id,
                        "language": lang,
                        "llm_type": llm_type,
                        **base_complexity,
                        **llm_complexity,
                        **energy_improvements,
                    }

                    rows.append(row)

    # print(f"\n\nRows length = {len(rows)}")
    df = pd.DataFrame(rows)
    print(f"[INFO] Created analysis dataframe with {len(df)} rows")

    if not df.empty:
        # print(f"[INFO] Columns: {list(df.columns)}")
        print("[INFO] Energy improvement stats:")
        for metric in [
            "cpu_improvement_pct",
            "ram_improvement_pct",
            "time_improvement_pct",
            "energy_improvement_pct",
        ]:
            if metric in df.columns:
                print(
                    f"  {metric}: mean={df[metric].mean():.2f}%, std={df[metric].std():.2f}%"
                )

    return df


# =============================================================================
# STATISTICAL ANALYSIS FUNCTIONS
# =============================================================================


def calculate_correlation_analysis(df: pd.DataFrame) -> Dict[str, pd.DataFrame]:
    """
    Calculate correlations between complexity metrics and energy improvements.
    """
    if df.empty:
        return {}

    # Define metric groups
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    high_importance_cols = [
        f"llm_{m}" for m in HIGH_IMPORTANCE_METRICS if f"llm_{m}" in df.columns
    ]
    medium_importance_cols = [
        f"llm_{m}" for m in MEDIUM_IMPORTANCE_METRICS if f"llm_{m}" in df.columns
    ]

    correlations = {}

    if efficiency_metrics:
        # High importance metrics correlations
        if high_importance_cols:
            high_corr_data = df[high_importance_cols + efficiency_metrics].corr()
            correlations["high_importance"] = high_corr_data.loc[
                high_importance_cols, efficiency_metrics
            ]

        # Medium importance metrics correlations
        if medium_importance_cols:
            med_corr_data = df[medium_importance_cols + efficiency_metrics].corr()
            correlations["medium_importance"] = med_corr_data.loc[
                medium_importance_cols, efficiency_metrics
            ]

        # Overall correlation summary
        all_complexity_metrics = high_importance_cols + medium_importance_cols
        if all_complexity_metrics:
            overall_corr = df[all_complexity_metrics + efficiency_metrics].corr()
            correlations["overall"] = overall_corr.loc[
                all_complexity_metrics, efficiency_metrics
            ]

    return correlations


def perform_regression_analysis(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Perform regression analysis to identify most predictive complexity metrics.
    """
    if df.empty:
        return {}

    results = {}
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    complexity_metrics = [
        col
        for col in df.columns
        if col.startswith("llm_")
        and col not in efficiency_metrics
        and col != "llm_type"
    ]

    for target in efficiency_metrics:
        if target not in df.columns:
            continue

        # Prepare data
        available_predictors = [m for m in complexity_metrics if m in df.columns]
        analysis_df = df[available_predictors + [target]].dropna()

        if len(analysis_df) < 5 or not available_predictors:
            continue

        X = analysis_df[available_predictors]
        y = analysis_df[target]

        # Standardize features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # Fit regression model
        model = LinearRegression()
        model.fit(X_scaled, y)

        # Calculate predictions and metrics
        y_pred = model.predict(X_scaled)
        r2 = r2_score(y, y_pred)

        # Feature importance (absolute coefficients)
        feature_importance = pd.DataFrame(
            {
                "metric": available_predictors,
                "coefficient": model.coef_,
                "abs_coefficient": np.abs(model.coef_),
            }
        ).sort_values("abs_coefficient", ascending=False)

        results[target] = {
            "r2_score": r2,
            "feature_importance": feature_importance,
            "n_samples": len(analysis_df),
            "intercept": model.intercept_,
            "predictors_used": available_predictors,
        }

    return results


# =============================================================================
# VISUALIZATION FUNCTIONS
# =============================================================================


def create_energy_improvement_overview(df: pd.DataFrame, exercise_name: str):
    """
    Creates a single, proportional bar chart showing average energy efficiency
    improvements with a clear visual representation of success rate.
    """
    if df.empty:
        print("No data available for energy improvement overview.")
        return

    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    if not efficiency_metrics:
        print("No efficiency metrics found in data.")
        return

    # Calculate means and success rates
    analysis_data = []
    for metric in efficiency_metrics:
        data = df[metric].dropna()
        if len(data) > 0:
            mean = data.mean()
            success_rate = (data > 0).sum() / len(data) * 100
            analysis_data.append({
                'metric': metric.replace("_improvement_pct", "").replace("_", " ").title(),
                'mean_improvement': mean,
                'success_rate': success_rate
            })
    
    if not analysis_data:
        print("No valid data for visualization.")
        return

    df_plot = pd.DataFrame(analysis_data)
    
    # Create the plot
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # Sort by mean improvement for better readability
    df_plot = df_plot.sort_values('mean_improvement', ascending=False)
    
    # Use a diverging color scheme
    colors = ['#2E8B57' if mean > 0 else '#CD5C5C' for mean in df_plot['mean_improvement']]
    
    # Main bar plot for mean improvement
    bars = ax.barh(df_plot['metric'], df_plot['mean_improvement'], color=colors, alpha=0.8,
                   edgecolor='black', linewidth=1.5, height=0.6)

    # Add a secondary axis for success rate
    ax2 = ax.twiny()
    ax2.plot(df_plot['success_rate'], df_plot['metric'], 'o--', color='#1E90FF', 
             markersize=10, linewidth=2, label='Success Rate (%)')
    ax2.set_xlim(0, 100)
    ax2.set_xlabel('Success Rate (%)', fontsize=12, color='#1E90FF', fontweight='bold')
    ax2.tick_params(axis='x', colors='#1E90FF')
    
    # Add text labels
    for bar in bars:
        width = bar.get_width()
        label_pos = width if width >= 0 else width - 5
        color = 'black'
        ax.text(label_pos + (3 if width >= 0 else -3), bar.get_y() + bar.get_height()/2,
                f'{width:+.1f}%', ha='left' if width >= 0 else 'right', va='center',
                fontsize=11, fontweight='bold', color=color)
    
    # Final plot customization
    ax.axvline(x=0, color='gray', linestyle='--', linewidth=1.5, alpha=0.7)
    ax.set_title(f'Average Energy Efficiency Improvement\n({exercise_name})',
                 fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('Mean Improvement (%)', fontsize=12, fontweight='bold')
    ax.set_ylabel('Energy Metric', fontsize=12, fontweight='bold')
    ax.grid(axis='x', linestyle='--', alpha=0.5)
    
    # Create a single legend
    lines, labels = ax.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax2.legend(lines + lines2, labels + labels2, loc='upper left')

    plt.tight_layout()
    plt.show()


def create_correlation_analysis_detailed(df: pd.DataFrame, exercise_name: str):
    """
    Creates a single, proportional heatmap showing the correlation between
    LLM code complexity metrics and energy efficiency improvements.
    Highlights strong positive and negative correlations.
    """
    correlations = calculate_correlation_analysis(df)
    
    if not correlations or "overall" not in correlations or correlations["overall"].empty:
        print("No correlation data available for analysis.")
        return

    corr_data = correlations["overall"]
    
    # Filter to show only meaningful correlations (|r| > 0.1)
    mask = np.abs(corr_data) < 0.1
    
    fig, ax = plt.subplots(figsize=(12, 10))
    
    # Custom diverging colormap
    from matplotlib.colors import LinearSegmentedColormap
    colors = ['#d73027', '#f46d43', '#fee08b', '#ffffff', 
              '#e6f598', '#abdda4', '#3288bd']
    cmap = LinearSegmentedColormap.from_list('custom_diverging', colors)
    
    # Create the heatmap
    sns.heatmap(corr_data, annot=True, fmt='.2f', cmap=cmap, center=0,
                square=False, mask=mask, cbar_kws={'label': 'Correlation Coefficient'},
                linewidths=0.5, linecolor='gray', annot_kws={'size': 10, 'weight': 'bold'},
                ax=ax)
    
    # Enhance labels for readability
    y_labels = [label.replace("llm_", "").replace("_", " ").title() 
                for label in corr_data.index]
    x_labels = [label.replace("_improvement_pct", " Improvement").replace("_", " ").title() 
                for label in corr_data.columns]
    
    ax.set_yticklabels(y_labels, rotation=0, fontsize=10, fontweight='bold')
    ax.set_xticklabels(x_labels, rotation=45, ha='right', fontsize=10, fontweight='bold')
    
    ax.set_title(f'Complexity-Efficiency Correlation Heatmap\n({exercise_name})', 
                 fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('Energy Efficiency Improvement', fontsize=12, fontweight='bold')
    ax.set_ylabel('LLM Code Complexity Metric', fontsize=12, fontweight='bold')
    
    # Add an annotation box to explain the interpretation
    text_box = """
    INTERPRETATION:
    • Positive correlation (blue) indicates that higher complexity
      is associated with better energy efficiency.
    • Negative correlation (red) indicates that higher complexity
      is associated with worse energy efficiency.
    • Only correlations with absolute value > 0.1 are shown.
    """
    ax.text(1.02, 0.98, text_box, transform=ax.transAxes,
             fontsize=10, verticalalignment='top', horizontalalignment='left',
             bbox=dict(boxstyle='round,pad=0.5', facecolor='white', alpha=0.7))

    plt.tight_layout()
    plt.show()


def create_performance_comparison_detailed(df: pd.DataFrame, exercise_name: str):
    """
    Creates a single, multi-panel plot comparing the performance distributions
    of base code vs. LLM-generated code for each energy metric.
    """
    if df.empty:
        print("No data available for performance comparison.")
        return

    # Define metrics to compare (base vs LLM pairs)
    comparison_metrics = []
    for energy_metric in ["cpu", "ram", "time", "energy_proxy"]:
        base_col = f"base_{energy_metric}"
        llm_col = f"llm_{energy_metric}"
        if base_col in df.columns and llm_col in df.columns:
            comparison_metrics.append((base_col, llm_col, energy_metric))

    if not comparison_metrics:
        print("No matching base/LLM metric pairs found.")
        return
        
    n_metrics = len(comparison_metrics)
    fig, axes = plt.subplots(1, n_metrics, figsize=(4 * n_metrics, 8), sharey=False)
    
    if n_metrics == 1:
        axes = [axes] # Ensure axes is an iterable for the loop
        
    for idx, (base_col, llm_col, metric_name) in enumerate(comparison_metrics):
        ax = axes[idx]
        
        base_data = df[base_col].dropna()
        llm_data = df[llm_col].dropna()
        
        if len(base_data) == 0 or len(llm_data) == 0:
            ax.text(0.5, 0.5, 'No Data Available', ha='center', va='center', 
                    transform=ax.transAxes, fontsize=12)
            ax.set_title(f'{metric_name.title()} Performance')
            continue

        # Create side-by-side violin plots
        violin_data = [base_data, llm_data]
        parts = ax.violinplot(violin_data, positions=[1, 2], showmeans=True, showmedians=True)
        
        # Color violins: red for base, green for LLM
        colors = ['#CD5C5C', '#2E8B57']
        for pc, color in zip(parts['bodies'], colors):
            pc.set_facecolor(color)
            pc.set_alpha(0.7)
            pc.set_edgecolor('black')
        
        # Customize statistical lines
        parts['cmeans'].set_color('blue')
        parts['cmeans'].set_linewidth(3)
        parts['cmedians'].set_color('navy')
        parts['cmedians'].set_linewidth(2)
        parts['cmedians'].set_linestyle('--')
        
        # Labels and formatting
        ax.set_xticks([1, 2])
        ax.set_xticklabels(['Base\nCode', 'LLM\nOptimized'], fontsize=12, fontweight='bold')
        
        # Dynamic y-axis label
        if metric_name == "cpu":
            ylabel = "CPU Usage (%)"
        elif metric_name == "ram":
            ylabel = "RAM Usage (MB)"
        elif metric_name == "time":
            ylabel = "Execution Time (ms)"
        else:
            ylabel = "Energy Proxy"
        
        ax.set_ylabel(ylabel, fontsize=12, fontweight='bold')
        ax.set_title(f'{metric_name.title()}', fontsize=14, fontweight='bold')
        ax.grid(True, alpha=0.3)
        
        # Add statistical summary
        base_mean = base_data.mean()
        llm_mean = llm_data.mean()
        
        # Highlight improvement with text
        if base_mean > 0:
            improvement = ((base_mean - llm_mean) / base_mean) * 100
            
            # Use color to highlight positive/negative improvement
            text_color = '#2E8B57' if improvement > 0 else '#CD5C5C'
            ax.text(0.5, 0.95, f'Δ: {improvement:+.1f}%', transform=ax.transAxes,
                    fontsize=12, fontweight='bold', ha='center', va='top', color=text_color)
        
    plt.suptitle(f'Detailed Performance Comparison\n({exercise_name})',
                 fontsize=18, fontweight='bold', y=1.02)
    plt.tight_layout()
    plt.show()


def create_predictive_analysis_detailed(regression_results: Dict[str, Any], exercise_name: str):
    """
    Creates a single plot with a comprehensive heatmap showing which complexity metrics
    are most predictive of energy improvements.
    """
    if not regression_results:
        print("No regression results available for predictive analysis.")
        return

    # Combine all feature importance data into a single DataFrame
    all_features = {}
    for target_metric, results in regression_results.items():
        if "feature_importance" in results and not results["feature_importance"].empty:
            importance_df = results["feature_importance"].head(10)  # Top 10 features
            
            for _, row in importance_df.iterrows():
                feature_name = row["metric"].replace("llm_", "").replace("_", " ").title()
                if feature_name not in all_features:
                    all_features[feature_name] = {}
                
                all_features[feature_name][target_metric] = row["coefficient"]

    if not all_features:
        print("No predictive features found.")
        return

    # Create the matrix for the heatmap
    feature_matrix = pd.DataFrame(all_features).T.fillna(0)
    
    # Rename columns for better display
    column_names = [col.replace("_improvement_pct", " Improvement").replace("_", " ").title() 
                    for col in feature_matrix.columns]
    feature_matrix.columns = column_names
    
    fig, ax = plt.subplots(figsize=(12, 10))
    
    # Create the heatmap
    sns.heatmap(feature_matrix, annot=True, fmt='.3f', cmap='RdBu_r', center=0,
                cbar_kws={'label': 'Coefficient Impact'}, linewidths=0.5,
                annot_kws={'size': 10, 'weight': 'bold'}, ax=ax)
    
    ax.set_title(f'Predictive Power of Complexity Metrics\n({exercise_name})', 
                 fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('Energy Efficiency Metrics', fontsize=12, fontweight='bold')
    ax.set_ylabel('Code Complexity Features', fontsize=12, fontweight='bold')
    
    # Add a text box with summary information
    r2_scores_text = "\n".join([f"• {target.replace('_improvement_pct', '').title()}: R² = {results['r2_score']:.3f}"
                                for target, results in regression_results.items()])
    
    text_box = f"""
    MODEL PERFORMANCE (R² SCORE):
    {r2_scores_text}

    INTERPRETATION:
    • Blue cells indicate that increasing the complexity metric
      positively impacts energy efficiency.
    • Red cells indicate that increasing the complexity metric
      negatively impacts energy efficiency.
    • Higher R² scores mean the model is better at predicting
      the improvement based on complexity metrics.
    """
    
    ax.text(1.02, 0.98, text_box, transform=ax.transAxes,
             fontsize=10, verticalalignment='top', horizontalalignment='left',
             bbox=dict(boxstyle='round,pad=0.5', facecolor='white', alpha=0.7))

    plt.tight_layout()
    plt.show()


def create_final_summary_report(df: pd.DataFrame, exercise_name: str):
    """
    Creates a single, comprehensive summary report combining key statistics
    and actionable recommendations in a structured, visual format.
    """
    if df.empty:
        print("No data available for summary report.")
        return

    fig, ax = plt.subplots(figsize=(10, 12))
    ax.axis('off')

    # Overall Assessment Section
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    scores = []
    if efficiency_metrics:
        for metric in efficiency_metrics:
            data = df[metric].dropna()
            if len(data) > 0:
                mean_improvement = data.mean()
                success_rate = (data > 0).sum() / len(data) * 100
                scores.append((mean_improvement + success_rate) / 2)
    
    avg_score = sum(scores) / len(scores) if scores else 0
    
    if avg_score > 15:
        overall_grade = "EXCELLENT 👍"
        grade_color = "#2E8B57"
    elif avg_score > 5:
        overall_grade = "GOOD 😊"
        grade_color = "#90EE90"
    elif avg_score > -5:
        overall_grade = "MIXED ⚖️"
        grade_color = "#FFD700"
    else:
        overall_grade = "NEEDS WORK 👎"
        grade_color = "#CD5C5C"

    assessment_text = f"""
    
    <span style='font-size: 20pt; font-weight: bold;'>OVERALL ASSESSMENT:</span>
    <span style='font-size: 16pt; font-weight: bold; color: {grade_color};'>{overall_grade}</span>
    
    • Average Performance Score: <span style='font-weight: bold;'>{avg_score:.1f}</span>
    • LLM Optimization Impact: <span style='font-weight: bold; color: {'#2E8B57' if avg_score > 0 else '#CD5C5C'};'>{'POSITIVE' if avg_score > 0 else 'NEGATIVE'}</span>
    
    ---
    
    <span style='font-size: 16pt; font-weight: bold;'>KEY FINDINGS:</span>
    """

    # Key Findings Section (Top 3 improvements)
    findings = []
    if efficiency_metrics:
        for metric in efficiency_metrics:
            data = df[metric].dropna()
            if len(data) > 0:
                mean_improvement = data.mean()
                success_rate = (data > 0).sum() / len(data) * 100
                findings.append({
                    'metric': metric.replace("_improvement_pct", "").replace("_", " ").title(),
                    'mean': mean_improvement,
                    'success': success_rate
                })
        
        findings.sort(key=lambda x: x['mean'], reverse=True)
        findings_text = ""
        for i, f in enumerate(findings[:3]):
            findings_text += f"""
    • <span style='font-weight: bold;'>{i+1}. {f['metric']}:</span>
      - Avg. Improvement: <span style='font-weight: bold;'>{f['mean']:+.1f}%</span>
      - Success Rate: <span style='font-weight: bold;'>{f['success']:.1f}%</span>
    """
    
    # Recommendations Section
    recommendations_text = f"""
    ---
    
    <span style='font-size: 16pt; font-weight: bold;'>ACTIONABLE RECOMMENDATIONS:</span>
    
    • <span style='font-weight: bold; color: #2E8B57;'>LEVERAGE STRENGTHS:</span>
      Focus on patterns that led to improvements in metrics like '{findings[0]['metric']}' to further optimize code.
      
    • <span style='font-weight: bold; color: #CD5C5C;'>ADDRESS WEAKNESSES:</span>
      Investigate and refactor LLM-generated code that degrades performance, especially in metrics that showed negative improvement.
      
    • <span style='font-weight: bold; color: #4682B4;'>SEEK BALANCE:</span>
      Use complexity metrics (e.g., from the correlation analysis) as a guide to generate code that is both efficient and maintainable.
    """
    
    # Final text composition
    final_text = (
        assessment_text + 
        findings_text + 
        recommendations_text
    )

    ax.text(0.02, 0.98, final_text, transform=ax.transAxes,
            fontsize=12, verticalalignment='top', horizontalalignment='left',
            fontfamily='monospace',
            bbox=dict(boxstyle="round,pad=1", facecolor="#F5F5F5", edgecolor="#E0E0E0"))

    fig.suptitle(f'Executive Summary Report: {exercise_name}', 
                 fontsize=18, fontweight='bold', y=0.98)
    
    plt.tight_layout()
    plt.show()


# =============================================================================
# MAIN ANALYSIS PIPELINE
# =============================================================================


def generate_comprehensive_report(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate comprehensive analysis report."""
    if df.empty:
        return {"error": "No data available for analysis"}

    report = {"data_summary": {}, "correlations": {}, "regressions": {}, "insights": {}}

    # Data summary
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]

    report["data_summary"] = {
        "total_entries": len(df),
        "unique_exercises": df["entry_id"].nunique(),
        "llm_types": df["llm_type"].unique().tolist(),
        "languages": df["language"].unique().tolist(),
        "efficiency_metrics": efficiency_metrics,
    }

    # Summary statistics for improvements
    if efficiency_metrics:
        improvements_summary = {}
        for metric in efficiency_metrics:
            if metric in df.columns:
                improvements_summary[metric] = {
                    "mean": df[metric].mean(),
                    "median": df[metric].median(),
                    "std": df[metric].std(),
                    "positive_cases": (df[metric] > 0).sum(),
                    "negative_cases": (df[metric] < 0).sum(),
                    "total_cases": df[metric].notna().sum(),
                }
        report["improvements_summary"] = improvements_summary

    # Correlation analysis
    correlations = calculate_correlation_analysis(df)
    report["correlations"] = correlations

    # Regression analysis
    regressions = perform_regression_analysis(df)
    report["regressions"] = regressions

    # Key insights
    insights = []

    # Best improvements
    for metric in efficiency_metrics:
        if metric in df.columns:
            mean_improvement = df[metric].mean()
            if mean_improvement > 0:
                insights.append(
                    f"Average {metric.replace('_', ' ')}: +{mean_improvement:.2f}%"
                )
            else:
                insights.append(
                    f"Average {metric.replace('_', ' ')}: {mean_improvement:.2f}%"
                )

    # Best correlations
    if "overall" in correlations and not correlations["overall"].empty:
        corr_df = correlations["overall"]
        max_corr_idx = corr_df.abs().stack().idxmax()
        max_corr_val = corr_df.loc[max_corr_idx]
        insights.append(
            f"Strongest correlation: {max_corr_idx[0]} vs {max_corr_idx[1]} (r={max_corr_val:.3f})"
        )

    # Best predictive model
    best_r2 = 0
    best_target = None
    for target, results in regressions.items():
        if results.get("r2_score", 0) > best_r2:
            best_r2 = results["r2_score"]
            best_target = target

    if best_target:
        insights.append(f"Best predictive model: {best_target} (R² = {best_r2:.3f})")
        top_predictor = regressions[best_target]["feature_importance"].iloc[0]
        insights.append(
            f"Most predictive metric: {top_predictor['metric']} (coef = {top_predictor['coefficient']:.3f})"
        )

    report["insights"] = insights

    return report


def main():
    """Main analysis pipeline."""
    #obtain input file 
    parser = argparse.ArgumentParser(
        description="Enhanced Language-Agnostic Code Complexity Metrics Analysis",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--input",
        "-i",
        required=True,
        help="Cluster name (with .json ext) of input file with metrics",
    )
    args = parser.parse_args()

    # Construct full input path
    if os.path.isabs(args.input):
        CLUSTER_METRICS_FILE = str(args.input)
    else:
        CLUSTER_METRICS_FILE = str(
            os.path.join(utility_paths.CLUSTERS_DIR_FILEPATH, args.input)
        )

    if not os.path.exists(CLUSTER_METRICS_FILE):
        print(f"[ERROR] Input file not found: {CLUSTER_METRICS_FILE}", file=sys.stderr)
        sys.exit(1)

    # Extract exercise name from cluster file
    exercise_name = extract_exercise_name_from_cluster(CLUSTER_METRICS_FILE)
    print(f"[INFO] Analyzing exercise: {exercise_name}")

    # Load data by input cluster file
    print("\n[1/7] Loading cluster data...")
    cluster_data = load_cluster_metrics(CLUSTER_METRICS_FILE)

    if not cluster_data:
        print("[ERROR] Failed to load cluster data")
        return

    # Find corresponding output files (1-5 execution files for base code snippet + 1-5exec files for v4 = best prompt v)
    print(f"\n[2/7] Finding output files for exercise '{exercise_name}'...")
    base_files, llm_v4_files = find_output_files_for_exercise(
        OUTPUT_DIR_FILEPATH, exercise_name
    )
    # print(f"\nbase_files\n{base_files}")
    # print(f"\nllm_v4_files\n{llm_v4_files}")

    if not base_files:
        print(f"[ERROR] No base execution files found for exercise '{exercise_name}'")
        return

    if not llm_v4_files:
        print(f"[ERROR] No LLM v4 execution files found for exercise '{exercise_name}'")
        return

    # Load execution results
    # get arrays of base results : each item of arr is a dict with keys : filename, filepath and data (json parsed file content)
    print("\n[3/7] Loading execution results...")
    base_exec_results = load_execution_results(base_files) 
    # print(f"\nbase_exec_results\n{base_exec_results}")

    llm_exec_results = load_execution_results(llm_v4_files)
    # print(f"\nllm_exec_results\n{llm_exec_results}")

    if not base_exec_results or not llm_exec_results:
        print("[ERROR] Failed to load execution results")
        return

    # Calculate average energy metrics
    print("\n[4/7] Calculating average energy metrics...")
    base_energy_avg = calculate_average_energy_metrics(base_exec_results, is_llm=False)
    # print(f"\nbase_energy_avg\n{base_energy_avg}")

    llm_energy_avg = calculate_average_energy_metrics(llm_exec_results, is_llm=True)

    print(f"[INFO] Base energy data for {len(base_energy_avg)} entries")
    print(f"[INFO] LLM energy data for {len(llm_energy_avg)} entries")
    #len base_energy_avg could be different by len llm_energy_avg if there are entry in which all LLMs fails regression test

    if not base_energy_avg or not llm_energy_avg:
        print("[ERROR] No energy data available for analysis")
        return

    # Create analysis dataframe
    print("\n[5/7] Creating analysis dataframe...")
    df = create_analysis_dataframe(cluster_data, base_energy_avg, llm_energy_avg)

    if df.empty:
        print("[ERROR] No data available after merging")
        return

    print(f"[INFO] Analysis dataframe created with {len(df)} rows")

    # Generate comprehensive analysis report
    print("\n[6/7] Performing statistical analysis...")
    report = generate_comprehensive_report(df)

    if "error" in report:
        print(f"[ERROR] {report['error']}")
        return

    # Print summary
    print("\n" + "=" * 80)
    print("EXERCISE ANALYSIS SUMMARY")
    print("=" * 80)
    print(f"Exercise: {exercise_name}")
    print(f"Total comparisons: {report['data_summary']['total_entries']}")
    print(f"Unique entries: {report['data_summary']['unique_exercises']}")
    print(f"LLM types: {', '.join(report['data_summary']['llm_types'])}")
    print(f"Languages: {', '.join(report['data_summary']['languages'])}")

    # Print energy improvement summary
    if "improvements_summary" in report:
        print("\n📊 ENERGY IMPROVEMENT SUMMARY:")
        for metric, stats in report["improvements_summary"].items():
            improvement_type = (
                metric.replace("_improvement_pct", "").replace("_", " ").title()
            )
            mean_val = stats["mean"]
            positive_cases = stats["positive_cases"]
            total_cases = stats["total_cases"]

            if mean_val > 0:
                print(f"• {improvement_type}: +{mean_val:.2f}% average improvement")
            else:
                print(f"• {improvement_type}: {mean_val:.2f}% average change")

            print(
                f"  - {positive_cases}/{total_cases} cases showed improvement ({positive_cases / total_cases * 100:.1f}%)"
            )

    # Create enhanced visualizations
    print("\n[7/7] Creating enhanced single-screen visualizations...")
    print("Creating comprehensive energy improvement overview...")
    create_energy_improvement_overview(df, exercise_name)
    
    print("Creating detailed correlation analysis...")
    create_correlation_analysis_detailed(df, exercise_name)
    
    print("Creating performance comparison analysis...")
    create_performance_comparison_detailed(df, exercise_name)
    
    if "regressions" in report and report["regressions"]:
        print("Creating predictive analysis...")
        create_predictive_analysis_detailed(report["regressions"], exercise_name)
    
    print("Creating final summary report...")
    create_final_summary_report(df, exercise_name)

    print(f"\nAnalysis complete for exercise '{exercise_name}'!")
    print("All visualizations are now displayed as single, comprehensive screens.")
    print("Each chart provides clear interpretation guides and actionable insights.")
    
    # Print key insights
    print("\n🔍 KEY INSIGHTS:")
    for insight in report.get("insights", []):
        print(f"• {insight}")

    # Recommendations
    print("\n💡 RECOMMENDATIONS:")

    # Find metrics with strongest correlations
    strong_correlations = []
    if "correlations" in report and "overall" in report["correlations"]:
        corr_df = report["correlations"]["overall"]
        if not corr_df.empty:
            # Find correlations above threshold
            for efficiency_metric in corr_df.columns:
                for complexity_metric in corr_df.index:
                    corr_val = corr_df.loc[complexity_metric, efficiency_metric]
                    if abs(corr_val) > 0.3:  # Strong correlation threshold
                        strong_correlations.append(
                            (complexity_metric, efficiency_metric, corr_val)
                        )

    if strong_correlations:
        strong_correlations.sort(key=lambda x: abs(x[2]), reverse=True)
        print("• Focus on these complexity metrics for energy optimization:")
        for complexity_metric, efficiency_metric, corr_val in strong_correlations[:5]:
            metric_name = (
                complexity_metric.replace("llm_", "").replace("_", " ").title()
            )
            improvement_type = (
                efficiency_metric.replace("_improvement_pct", "")
                .replace("_", " ")
                .title()
            )
            correlation_direction = "reducing" if corr_val > 0 else "increasing"
            print(
                f"  - {metric_name} (corr={corr_val:.3f} with {improvement_type}) - consider {correlation_direction}"
            )

    # Best predictive models
    if "regressions" in report:
        best_models = [
            (target, results["r2_score"])
            for target, results in report["regressions"].items()
            if results.get("r2_score", 0) > 0.1
        ]
        best_models.sort(key=lambda x: x[1], reverse=True)

        if best_models:
            print("• Most predictable energy improvements:")
            for target, r2_score in best_models[:3]:
                improvement_type = (
                    target.replace("_improvement_pct", "").replace("_", " ").title()
                )
                print(f"  - {improvement_type} (R² = {r2_score:.3f})")

    print(f"\n✅ Analysis complete for exercise '{exercise_name}'!")
    print("=" * 80)


if __name__ == "__main__":
    main()
 