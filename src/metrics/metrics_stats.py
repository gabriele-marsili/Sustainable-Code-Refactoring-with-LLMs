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
import warnings
import argparse


warnings.filterwarnings("ignore")

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
        Tuple of (base_files, llm_files_v3)
    """
    # Pattern for base files: {exercise_name}_results_{exec_number}.json
    base_pattern = f"{exercise_name}_results_*.json"
    base_files = glob.glob(os.path.join(output_dir, base_pattern))

    # Filter out version files (those containing _v)
    base_files = [f for f in base_files if "_v" not in os.path.basename(f)]

    # Pattern for LLM v3 files: {exercise_name}_results_v3_{exec_number}.json
    llm_v3_pattern = f"{exercise_name}_results_v3_*.json"
    llm_v3_files = glob.glob(os.path.join(output_dir, llm_v3_pattern))

    print(
        f"[INFO] Found {len(base_files)} base files and {len(llm_v3_files)} LLM v3 files for exercise '{exercise_name}'"
    )

    return sorted(base_files), sorted(llm_v3_files)


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
        data = result_file["data"]

        for lang, entries in data.get("results", {}).items():
            for entry in entries:
                entry_id = entry.get("id", "")

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

                            energy_data[entry_id]["CPU_usage"].append(
                                llm_result.get("CPU_usage", 0)
                            )
                            energy_data[entry_id]["RAM_usage"].append(
                                llm_result.get("RAM_usage", 0)
                            )
                            energy_data[entry_id]["execution_time_ms"].append(
                                llm_result.get("execution_time_ms", 0)
                            )
                else:
                    # For base results
                    if entry.get("regrationTestPassed", False):
                        if entry_id not in energy_data:
                            energy_data[entry_id] = {
                                "CPU_usage": [],
                                "RAM_usage": [],
                                "execution_time_ms": [],
                            }

                        energy_data[entry_id]["CPU_usage"].append(
                            entry.get("CPU_usage", 0)
                        )
                        energy_data[entry_id]["RAM_usage"].append(
                            entry.get("RAM_usage", 0)
                        )
                        energy_data[entry_id]["execution_time_ms"].append(
                            entry.get("execution_time_ms", 0)
                        )

    # Calculate averages
    averaged_data = {}
    for entry_id, metrics in energy_data.items():
        averaged_data[entry_id] = {}
        for metric_name, values in metrics.items():
            if metric_name != "llm_type" and values:
                averaged_data[entry_id][metric_name] = np.mean(values)
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

    # CPU efficiency improvement (lower is better)
    base_cpu = base_metrics.get("CPU_usage", 0)
    llm_cpu = llm_metrics.get("CPU_usage", 0)
    if base_cpu > 0:
        improvements["cpu_improvement_pct"] = ((base_cpu - llm_cpu) / base_cpu) * 100
    else:
        improvements["cpu_improvement_pct"] = 0

    # Memory efficiency improvement (lower is better)
    base_ram = base_metrics.get("RAM_usage", 0)
    llm_ram = llm_metrics.get("RAM_usage", 0)
    if base_ram > 0:
        improvements["ram_improvement_pct"] = ((base_ram - llm_ram) / base_ram) * 100
    else:
        improvements["ram_improvement_pct"] = 0

    # Execution time improvement (lower is better)
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
    cluster_data: Dict[str, Any],
    base_energy: Dict[str, Dict[str, float]],
    llm_energy: Dict[str, Dict[str, float]],
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

    for lang, entries in cluster_data.items():
        for entry in entries:
            entry_id = entry.get("id", "")
            # print(f"entry_id: {entry_id}\n")

            # Get base metrics
            base_metrics = entry.get("base_metrics", {})
            # print(f"base_metrics: {base_metrics}\n")
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
                # print(f"entry id: {entry_id}")

                # if entry_id not in base_energy :
                # print(f"entry id not in base energy:\n{base_energy}")

                # if entry_id not in llm_energy :
                # print(f"entry id not in llm energy:\n{llm_energy}")

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


def create_correlation_heatmap(correlation_matrix: pd.DataFrame, title: str):
    """Create and display correlation heatmap."""
    if correlation_matrix.empty:
        print(f"[WARN] Empty correlation matrix for: {title}")
        return

    plt.figure(figsize=(12, 8))

    # Create mask for better visualization
    mask = np.abs(correlation_matrix) < 0.1

    sns.heatmap(
        correlation_matrix,
        annot=True,
        fmt=".3f",
        cmap="RdBu_r",
        center=0,
        square=True,
        mask=mask,
        cbar_kws={"shrink": 0.8},
    )

    plt.title(title, fontsize=14, fontweight="bold")
    plt.xlabel("Energy Efficiency Metrics", fontsize=12)
    plt.ylabel("Complexity Metrics", fontsize=12)
    plt.xticks(rotation=45, ha="right")
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.show()


def create_scatter_plots(df: pd.DataFrame):
    """Create scatter plots showing relationships between metrics and improvements."""
    if df.empty:
        return

    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    key_complexity_metrics = []

    # Find top correlated metrics
    for metric_prefix in HIGH_IMPORTANCE_METRICS[:5]:  # Top 5 high importance
        metric_name = f"llm_{metric_prefix}"
        if metric_name in df.columns:
            key_complexity_metrics.append(metric_name)

    if not efficiency_metrics or not key_complexity_metrics:
        print("[WARN] No suitable metrics found for scatter plots")
        return

    # Create scatter plots
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    fig.suptitle(
        "Complexity Metrics vs Energy Improvements", fontsize=16, fontweight="bold"
    )

    plot_idx = 0
    for i, efficiency_metric in enumerate(efficiency_metrics[:4]):  # Max 4 plots
        if plot_idx >= 4:
            break

        ax = axes[plot_idx // 2, plot_idx % 2]

        # Find best correlated complexity metric for this efficiency metric
        correlations = []
        for complexity_metric in key_complexity_metrics:
            if complexity_metric in df.columns and efficiency_metric in df.columns:
                corr = df[complexity_metric].corr(df[efficiency_metric])
                if not pd.isna(corr):
                    correlations.append((abs(corr), complexity_metric, corr))

        if correlations:
            correlations.sort(reverse=True)
            best_complexity_metric = correlations[0][1]
            correlation_value = correlations[0][2]

            # Create scatter plot
            scatter_data = df[[best_complexity_metric, efficiency_metric]].dropna()

            if len(scatter_data) > 0:
                sns.scatterplot(
                    data=scatter_data,
                    x=best_complexity_metric,
                    y=efficiency_metric,
                    alpha=0.7,
                    ax=ax,
                )

                # Add trend line
                z = np.polyfit(
                    scatter_data[best_complexity_metric],
                    scatter_data[efficiency_metric],
                    1,
                )
                p = np.poly1d(z)
                ax.plot(
                    scatter_data[best_complexity_metric],
                    p(scatter_data[best_complexity_metric]),
                    "r--",
                    alpha=0.8,
                    linewidth=2,
                )

                ax.set_title(
                    f"{efficiency_metric.replace('_', ' ').title()}\nvs {best_complexity_metric.replace('llm_', '').replace('_', ' ').title()}\n(r={correlation_value:.3f})"
                )
                ax.set_xlabel(
                    best_complexity_metric.replace("llm_", "").replace("_", " ").title()
                )
                ax.set_ylabel(efficiency_metric.replace("_", " ").title())
                ax.grid(True, alpha=0.3)

        plot_idx += 1

    # Hide unused subplots
    for i in range(plot_idx, 4):
        axes[i // 2, i % 2].set_visible(False)

    plt.tight_layout()
    plt.show()


def create_feature_importance_plot(regression_results: Dict[str, Any]):
    """Create feature importance plots from regression results."""
    if not regression_results:
        print("[WARN] No regression results available")
        return

    n_plots = len(regression_results)
    if n_plots == 0:
        return

    fig, axes = plt.subplots(
        (n_plots + 1) // 2, 2, figsize=(15, 6 * ((n_plots + 1) // 2))
    )
    if n_plots == 1:
        axes = [axes]
    elif n_plots == 2:
        axes = axes.flatten()
    else:
        axes = axes.flatten()

    plot_idx = 0
    for target_metric, results in regression_results.items():
        if "feature_importance" not in results:
            continue

        importance_df = results["feature_importance"].head(10)  # Top 10

        ax = axes[plot_idx] if n_plots > 1 else axes[0]

        # Create horizontal bar plot
        bars = ax.barh(
            range(len(importance_df)),
            importance_df["abs_coefficient"],
            color=["green" if x >= 0 else "red" for x in importance_df["coefficient"]],
        )

        ax.set_yticks(range(len(importance_df)))
        ax.set_yticklabels(
            [
                metric.replace("llm_", "").replace("_", " ").title()
                for metric in importance_df["metric"]
            ]
        )
        ax.set_xlabel("Absolute Coefficient Value")
        ax.set_title(
            f"Most Predictive Metrics for {target_metric.replace('_', ' ').title()}\n(R² = {results['r2_score']:.3f})"
        )

        # Add value labels on bars
        for i, (bar, coef) in enumerate(zip(bars, importance_df["coefficient"])):
            ax.text(
                bar.get_width() + 0.01,
                bar.get_y() + bar.get_height() / 2,
                f"{coef:.3f}",
                ha="left",
                va="center",
                fontsize=9,
            )

        ax.grid(True, alpha=0.3, axis="x")
        plot_idx += 1

    # Hide unused subplots
    for i in range(plot_idx, len(axes)):
        axes[i].set_visible(False)

    plt.tight_layout()
    plt.show()


def create_energy_improvement_summary(df: pd.DataFrame):
    """Create summary visualizations of energy improvements."""
    if df.empty:
        return

    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    if not efficiency_metrics:
        print("[WARN] No efficiency metrics found for summary")
        return

    # Summary statistics
    fig, axes = plt.subplots(1, 2, figsize=(15, 6))

    # Box plot of improvements
    improvement_data = df[efficiency_metrics].melt(
        var_name="Metric", value_name="Improvement_%"
    )
    improvement_data["Metric"] = (
        improvement_data["Metric"]
        .str.replace("_improvement_pct", "")
        .str.replace("_", " ")
        .str.title()
    )

    sns.boxplot(data=improvement_data, x="Metric", y="Improvement_%", ax=axes[0])
    axes[0].set_title(
        "Distribution of Energy Improvements", fontsize=14, fontweight="bold"
    )
    axes[0].set_xlabel("Improvement Type")
    axes[0].set_ylabel("Improvement (%)")
    axes[0].tick_params(axis="x", rotation=45)
    axes[0].axhline(y=0, color="red", linestyle="--", alpha=0.7)
    axes[0].grid(True, alpha=0.3)

    # Mean improvements by LLM type
    if "llm_type" in df.columns:
        llm_improvements = df.groupby("llm_type")[efficiency_metrics].mean()

        llm_improvements.plot(kind="bar", ax=axes[1])
        axes[1].set_title(
            "Average Energy Improvements by LLM Type", fontsize=14, fontweight="bold"
        )
        axes[1].set_xlabel("LLM Type")
        axes[1].set_ylabel("Average Improvement (%)")
        axes[1].legend(
            title="Improvement Type", bbox_to_anchor=(1.05, 1), loc="upper left"
        )
        axes[1].tick_params(axis="x", rotation=45)
        axes[1].axhline(y=0, color="red", linestyle="--", alpha=0.7)
        axes[1].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()


def create_energy_overview_dashboard(df: pd.DataFrame, exercise_name: str):
    """Create a more organized and readable energy improvement overview."""
    if df.empty:
        return

    # Create separate figures instead of one crowded dashboard
    create_improvement_summary_plot(df, exercise_name)
    create_correlation_analysis_plot(df, exercise_name)
    create_distribution_comparison_plot(df, exercise_name)
    create_efficiency_trends_plot(df, exercise_name)


def create_improvement_summary_plot(df: pd.DataFrame, exercise_name: str):
    """Create a clear summary of energy improvements."""
    if df.empty:
        return

    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    if not efficiency_metrics:
        return

    plt.figure(figsize=(12, 8))

    means = [df[metric].mean() for metric in efficiency_metrics]
    metric_names = [
        metric.replace("_improvement_pct", "").replace("_", " ").title()
        for metric in efficiency_metrics
    ]

    colors = ["#2E8B57" if mean > 0 else "#CD5C5C" for mean in means]

    bars = plt.bar(metric_names, means, color=colors, alpha=0.7, edgecolor="black")
    plt.axhline(y=0, color="black", linestyle="-", linewidth=2)
    plt.ylabel("Average Improvement (%)")
    plt.title(
        f"Energy Efficiency Improvements - {exercise_name}", fontweight="bold", pad=20
    )
    plt.grid(True, alpha=0.3, axis="y")
    plt.xticks(rotation=45, ha="right")

    # Add value labels
    for bar, mean in zip(bars, means):
        height = bar.get_height()
        plt.text(
            bar.get_x() + bar.get_width() / 2,
            height + (0.01 if height >= 0 else -0.02),
            f"{mean:.1f}%",
            ha="center",
            va="bottom" if height >= 0 else "top",
            fontweight="bold",
        )

    plt.tight_layout()
    plt.show()


def create_correlation_analysis_plot(df: pd.DataFrame, exercise_name: str):
    """Create a focused correlation heatmap."""
    correlations = calculate_correlation_analysis(df)

    if (
        not correlations
        or "overall" not in correlations
        or correlations["overall"].empty
    ):
        return

    plt.figure(figsize=(14, 10))

    # Get top 10 most correlated metrics
    corr_data = correlations["overall"]
    top_metrics = (
        corr_data.abs().max(axis=1).sort_values(ascending=False).head(10).index
    )
    top_corr_data = corr_data.loc[top_metrics]

    sns.heatmap(
        top_corr_data,
        annot=True,
        fmt=".2f",
        cmap="RdBu_r",
        center=0,
        square=True,
        cbar_kws={"shrink": 0.8},
        linewidths=0.5,
    )

    plt.title(
        f"Top Complexity vs Efficiency Correlations - {exercise_name}",
        fontweight="bold",
        pad=20,
    )
    plt.xlabel("Energy Efficiency Metrics", fontweight="bold")
    plt.ylabel("Code Complexity Metrics", fontweight="bold")
    plt.xticks(rotation=45, ha="right")
    plt.yticks(rotation=0)

    plt.tight_layout()
    plt.show()


def create_distribution_comparison_plot(df: pd.DataFrame, exercise_name: str):
    """Create a clear comparison of base vs LLM performance."""
    if df.empty:
        return

    fig, axes = plt.subplots(1, 3, figsize=(18, 6))
    fig.suptitle(
        f"Performance Distribution Comparison - {exercise_name}",
        fontsize=16,
        fontweight="bold",
    )

    metrics_to_compare = [
        ("base_cpu", "llm_cpu", "CPU Usage (%)"),
        ("base_ram", "llm_ram", "RAM Usage (MB)"),
        ("base_time", "llm_time", "Execution Time (ms)"),
    ]

    for idx, (base_metric, llm_metric, ylabel) in enumerate(metrics_to_compare):
        if base_metric in df.columns and llm_metric in df.columns:
            data = [df[base_metric].dropna(), df[llm_metric].dropna()]
            axes[idx].boxplot(data, labels=["Base", "LLM"])
            axes[idx].set_ylabel(ylabel)
            axes[idx].set_title(ylabel.split(" (")[0])
            axes[idx].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()


def create_efficiency_trends_plot(df: pd.DataFrame, exercise_name: str):
    """Create a focused trends analysis."""
    if df.empty:
        return

    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]
    if not efficiency_metrics:
        return

    plt.figure(figsize=(10, 8))

    # Prepare data for scatter plot
    x_metric = (
        "cpu_improvement_pct"
        if "cpu_improvement_pct" in efficiency_metrics
        else efficiency_metrics[0]
    )
    y_metric = (
        "time_improvement_pct"
        if "time_improvement_pct" in efficiency_metrics
        else efficiency_metrics[1]
    )

    if x_metric in df.columns and y_metric in df.columns:
        x_data = df[x_metric].dropna()
        y_data = df[y_metric].dropna()

        # Align data
        common_idx = x_data.index.intersection(y_data.index)
        if len(common_idx) > 0:
            x_aligned = x_data[common_idx]
            y_aligned = y_data[common_idx]

            # Color points based on quadrant
            colors = []
            for x_val, y_val in zip(x_aligned, y_aligned):
                if x_val > 0 and y_val > 0:
                    colors.append("#2E8B57")  # Green - both improved
                elif x_val < 0 and y_val < 0:
                    colors.append("#CD5C5C")  # Red - both degraded
                else:
                    colors.append("#FFD700")  # Yellow - mixed results

            plt.scatter(
                x_aligned, y_aligned, c=colors, alpha=0.7, s=60, edgecolors="black"
            )

            plt.axhline(y=0, color="black", linestyle="--", alpha=0.5)
            plt.axvline(x=0, color="black", linestyle="--", alpha=0.5)

            plt.xlabel(
                x_metric.replace("_improvement_pct", "").replace("_", " ").title()
            )
            plt.ylabel(
                y_metric.replace("_improvement_pct", "").replace("_", " ").title()
            )
            plt.title("Efficiency Improvements Correlation", fontweight="bold")
            plt.grid(True, alpha=0.3)

            # Add quadrant labels
            plt.text(
                0.8,
                0.8,
                "Both Improved",
                transform=plt.gca().transAxes,
                ha="center",
                va="center",
                fontweight="bold",
                bbox=dict(boxstyle="round", facecolor="#2E8B57", alpha=0.3),
            )
            plt.text(
                0.2,
                0.2,
                "Both Degraded",
                transform=plt.gca().transAxes,
                ha="center",
                va="center",
                fontweight="bold",
                bbox=dict(boxstyle="round", facecolor="#CD5C5C", alpha=0.3),
            )

    plt.tight_layout()
    plt.show()


def create_detailed_correlation_analysis(df: pd.DataFrame, exercise_name: str):
    """Create detailed correlation analysis with clear explanations."""
    if df.empty:
        return

    correlations = calculate_correlation_analysis(df)

    if not correlations:
        print("[WARN] No correlation data available")
        return

    fig, axes = plt.subplots(2, 2, figsize=(20, 16))
    fig.suptitle(
        f"Detailed Correlation Analysis - {exercise_name}",
        fontsize=18,
        fontweight="bold",
    )

    plot_idx = 0

    for correlation_type, correlation_data in correlations.items():
        if correlation_data.empty or plot_idx >= 4:
            continue

        ax = axes[plot_idx // 2, plot_idx % 2]

        # Create enhanced heatmap
        mask = np.abs(correlation_data) < 0.1  # Mask weak correlations

        sns.heatmap(
            correlation_data,
            annot=True,
            fmt=".3f",
            cmap="RdBu_r",
            center=0,
            square=True,
            mask=mask,
            cbar_kws={"shrink": 0.8},
            ax=ax,
            linewidths=0.5,
            linecolor="white",
        )

        # Enhance labels
        y_labels = [
            label.replace("llm_", "").replace("_", " ").title()
            for label in correlation_data.index
        ]
        x_labels = [
            label.replace("_improvement_pct", "").replace("_", " ").title()
            for label in correlation_data.columns
        ]

        ax.set_yticklabels(y_labels, rotation=0)
        ax.set_xticklabels(x_labels, rotation=45, ha="right")

        title = f"{correlation_type.replace('_', ' ').title()} Complexity Metrics"
        ax.set_title(title, fontweight="bold", pad=20)
        ax.set_xlabel("Energy Efficiency Improvements", fontweight="bold")
        ax.set_ylabel("Code Complexity Metrics", fontweight="bold")

        # Add significance indicators
        for i, row_label in enumerate(correlation_data.index):
            for j, col_label in enumerate(correlation_data.columns):
                corr_val = correlation_data.iloc[i, j]
                if abs(corr_val) > 0.5:
                    # Strong correlation - add a star
                    ax.text(
                        j + 0.5,
                        i + 0.7,
                        "★",
                        ha="center",
                        va="center",
                        color="yellow",
                        fontsize=12,
                        fontweight="bold",
                    )
                elif abs(corr_val) > 0.3:
                    # Moderate correlation - add a circle
                    ax.text(
                        j + 0.5,
                        i + 0.7,
                        "●",
                        ha="center",
                        va="center",
                        color="orange",
                        fontsize=8,
                        fontweight="bold",
                    )

        plot_idx += 1

    # Hide unused subplots
    for i in range(plot_idx, 4):
        axes[i // 2, i % 2].set_visible(False)

    # Add legend for significance indicators
    legend_text = (
        "Correlation Strength Indicators:\n"
        "★ Strong correlation (|r| > 0.5)\n"
        "● Moderate correlation (|r| > 0.3)\n"
        "Weak correlations (|r| < 0.1) are masked"
    )

    fig.text(
        0.02,
        0.02,
        legend_text,
        fontsize=10,
        verticalalignment="bottom",
        bbox=dict(boxstyle="round,pad=0.5", facecolor="lightblue", alpha=0.8),
    )

    plt.tight_layout()
    plt.show()


def create_complexity_impact_analysis(df: pd.DataFrame, exercise_name: str):
    """Create analysis showing which complexity metrics have the most impact on energy efficiency."""
    if df.empty:
        return

    # Perform regression analysis
    regression_results = perform_regression_analysis(df)

    if not regression_results:
        print("[WARN] No regression results available")
        return

    fig, axes = plt.subplots(2, 2, figsize=(20, 16))
    fig.suptitle(
        f"Complexity Metrics Impact on Energy Efficiency - {exercise_name}",
        fontsize=18,
        fontweight="bold",
    )

    plot_idx = 0
    colors = [
        "#2E8B57",
        "#4682B4",
        "#CD853F",
        "#9370DB",
    ]  # Different colors for each metric

    for target_metric, results in regression_results.items():
        if plot_idx >= 4:
            break

        ax = axes[plot_idx // 2, plot_idx % 2]

        if "feature_importance" not in results:
            continue

        # Get top 10 most important features
        importance_df = results["feature_importance"].head(10)

        if len(importance_df) == 0:
            continue

        # Create horizontal bar plot
        y_pos = np.arange(len(importance_df))
        bars = ax.barh(
            y_pos,
            importance_df["abs_coefficient"],
            color=[
                colors[plot_idx] if coef >= 0 else "#CD5C5C"
                for coef in importance_df["coefficient"]
            ],
            alpha=0.8,
            edgecolor="black",
            linewidth=1,
        )

        # Customize labels
        metric_labels = [
            metric.replace("llm_", "").replace("_", " ").title()
            for metric in importance_df["metric"]
        ]
        ax.set_yticks(y_pos)
        ax.set_yticklabels(metric_labels)

        # Add coefficient values on bars
        for i, (bar, coef, abs_coef) in enumerate(
            zip(bars, importance_df["coefficient"], importance_df["abs_coefficient"])
        ):
            ax.text(
                abs_coef + 0.01,
                bar.get_y() + bar.get_height() / 2,
                f"{coef:.3f}",
                ha="left",
                va="center",
                fontweight="bold",
                fontsize=9,
            )

        ax.set_xlabel("Impact Strength (|Coefficient|)", fontweight="bold")
        ax.set_title(
            f"{target_metric.replace('_improvement_pct', '').replace('_', ' ').title()} Improvement\n"
            f"Prediction (R² = {results['r2_score']:.3f})",
            fontweight="bold",
            pad=15,
        )
        ax.grid(True, alpha=0.3, axis="x")

        # Add interpretation text
        r2_interpretation = (
            "Excellent"
            if results["r2_score"] > 0.8
            else "Good"
            if results["r2_score"] > 0.6
            else "Moderate"
            if results["r2_score"] > 0.4
            else "Weak"
        )

        ax.text(
            0.02,
            0.98,
            f"Predictive Power: {r2_interpretation}",
            transform=ax.transAxes,
            fontsize=10,
            verticalalignment="top",
            bbox=dict(boxstyle="round,pad=0.3", facecolor="lightyellow", alpha=0.8),
        )

        plot_idx += 1

    # Hide unused subplots
    for i in range(plot_idx, 4):
        axes[i // 2, i % 2].set_visible(False)

    # Add interpretation guide
    interpretation_text = (
        "Interpretation Guide:\n"
        "• Longer bars = stronger impact on energy efficiency\n"
        "• Green bars = positive coefficients (higher complexity → better efficiency)\n"
        "• Red bars = negative coefficients (higher complexity → worse efficiency)\n"
        "• R² score indicates how well complexity metrics predict efficiency improvements\n"
        "• Higher R² (closer to 1.0) = better prediction accuracy"
    )

    fig.text(
        0.02,
        0.02,
        interpretation_text,
        fontsize=11,
        verticalalignment="bottom",
        bbox=dict(boxstyle="round,pad=0.5", facecolor="lightgray", alpha=0.9),
    )

    plt.tight_layout()
    plt.show()


def create_energy_trends_analysis(df: pd.DataFrame, exercise_name: str):
    """Create detailed analysis of energy efficiency trends."""
    if df.empty:
        return

    fig, axes = plt.subplots(2, 3, figsize=(24, 16))
    fig.suptitle(
        f"Energy Efficiency Trends Analysis - {exercise_name}",
        fontsize=18,
        fontweight="bold",
    )

    # Define colors
    colors = {
        "base": "#CD5C5C",  # Indian Red
        "llm": "#2E8B57",  # Sea Green
        "improvement": "#4682B4",  # Steel Blue
        "degradation": "#FF6347",  # Tomato
    }

    # 1. Raw energy consumption comparison
    ax1 = axes[0, 0]
    if "base_cpu" in df.columns and "llm_cpu" in df.columns:
        base_cpu = df["base_cpu"].dropna()
        llm_cpu = df["llm_cpu"].dropna()

        if len(base_cpu) > 0 and len(llm_cpu) > 0:
            # Create violin plot
            violin_parts = ax1.violinplot([base_cpu, llm_cpu], positions=[1, 2])

            for pc, color in zip(
                violin_parts["bodies"], [colors["base"], colors["llm"]]
            ):
                pc.set_facecolor(color)
                pc.set_alpha(0.7)

            # Add mean lines
            ax1.hlines(
                base_cpu.mean(),
                0.8,
                1.2,
                colors=colors["base"],
                linestyles="solid",
                linewidth=3,
            )
            ax1.hlines(
                llm_cpu.mean(),
                1.8,
                2.2,
                colors=colors["llm"],
                linestyles="solid",
                linewidth=3,
            )

            ax1.set_xticks([1, 2])
            ax1.set_xticklabels(["Base Code", "LLM Code"])
            ax1.set_ylabel("CPU Usage (%)")
            ax1.set_title("CPU Usage Distribution", fontweight="bold")
            ax1.grid(True, alpha=0.3)

            # Add statistics text
            stats_text = (
                f"Base: μ={base_cpu.mean():.2f}%, σ={base_cpu.std():.2f}%\n"
                f"LLM: μ={llm_cpu.mean():.2f}%, σ={llm_cpu.std():.2f}%"
            )
            ax1.text(
                0.02,
                0.98,
                stats_text,
                transform=ax1.transAxes,
                verticalalignment="top",
                fontsize=9,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8),
            )

    # 2. Memory usage comparison
    ax2 = axes[0, 1]
    if "base_ram" in df.columns and "llm_ram" in df.columns:
        base_ram = df["base_ram"].dropna()
        llm_ram = df["llm_ram"].dropna()

        if len(base_ram) > 0 and len(llm_ram) > 0:
            violin_parts = ax2.violinplot([base_ram, llm_ram], positions=[1, 2])

            for pc, color in zip(
                violin_parts["bodies"], [colors["base"], colors["llm"]]
            ):
                pc.set_facecolor(color)
                pc.set_alpha(0.7)

            ax2.hlines(
                base_ram.mean(),
                0.8,
                1.2,
                colors=colors["base"],
                linestyles="solid",
                linewidth=3,
            )
            ax2.hlines(
                llm_ram.mean(),
                1.8,
                2.2,
                colors=colors["llm"],
                linestyles="solid",
                linewidth=3,
            )

            ax2.set_xticks([1, 2])
            ax2.set_xticklabels(["Base Code", "LLM Code"])
            ax2.set_ylabel("RAM Usage (MB)")
            ax2.set_title("Memory Usage Distribution", fontweight="bold")
            ax2.grid(True, alpha=0.3)

            stats_text = (
                f"Base: μ={base_ram.mean():.2f} MB, σ={base_ram.std():.2f} MB\n"
                f"LLM: μ={llm_ram.mean():.2f} MB, σ={llm_ram.std():.2f} MB"
            )
            ax2.text(
                0.02,
                0.98,
                stats_text,
                transform=ax2.transAxes,
                verticalalignment="top",
                fontsize=9,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8),
            )

    # 3. Execution time comparison
    ax3 = axes[0, 2]
    if "base_time" in df.columns and "llm_time" in df.columns:
        base_time = df["base_time"].dropna()
        llm_time = df["llm_time"].dropna()

        if len(base_time) > 0 and len(llm_time) > 0:
            violin_parts = ax3.violinplot([base_time, llm_time], positions=[1, 2])

            for pc, color in zip(
                violin_parts["bodies"], [colors["base"], colors["llm"]]
            ):
                pc.set_facecolor(color)
                pc.set_alpha(0.7)

            ax3.hlines(
                base_time.mean(),
                0.8,
                1.2,
                colors=colors["base"],
                linestyles="solid",
                linewidth=3,
            )
            ax3.hlines(
                llm_time.mean(),
                1.8,
                2.2,
                colors=colors["llm"],
                linestyles="solid",
                linewidth=3,
            )

            ax3.set_xticks([1, 2])
            ax3.set_xticklabels(["Base Code", "LLM Code"])
            ax3.set_ylabel("Execution Time (ms)")
            ax3.set_title("Execution Time Distribution", fontweight="bold")
            ax3.grid(True, alpha=0.3)

            stats_text = (
                f"Base: μ={base_time.mean():.2f} ms, σ={base_time.std():.2f} ms\n"
                f"LLM: μ={llm_time.mean():.2f} ms, σ={llm_time.std():.2f} ms"
            )
            ax3.text(
                0.02,
                0.98,
                stats_text,
                transform=ax3.transAxes,
                verticalalignment="top",
                fontsize=9,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8),
            )

    # 4. Energy efficiency improvements scatter matrix
    ax4 = axes[1, 0]
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]

    if len(efficiency_metrics) >= 2:
        x_metric = efficiency_metrics[0]  # cpu_improvement_pct
        y_metric = (
            efficiency_metrics[2]
            if len(efficiency_metrics) > 2
            else efficiency_metrics[1]
        )  # time_improvement_pct

        x_data = df[x_metric].dropna()
        y_data = df[y_metric].dropna()

        if len(x_data) > 0 and len(y_data) > 0:
            # Align data
            common_idx = x_data.index.intersection(y_data.index)
            if len(common_idx) > 0:
                x_aligned = x_data[common_idx]
                y_aligned = y_data[common_idx]

                # Color points based on quadrants
                colors_scatter = []
                for x_val, y_val in zip(x_aligned, y_aligned):
                    if x_val > 0 and y_val > 0:
                        colors_scatter.append(colors["improvement"])
                    elif x_val < 0 and y_val < 0:
                        colors_scatter.append(colors["degradation"])
                    else:
                        colors_scatter.append("#FFD700")  # Gold for mixed results

                ax4.scatter(
                    x_aligned,
                    y_aligned,
                    c=colors_scatter,
                    alpha=0.7,
                    s=60,
                    edgecolors="black",
                    linewidth=0.5,
                )

                ax4.axhline(y=0, color="black", linestyle="--", alpha=0.5)
                ax4.axvline(x=0, color="black", linestyle="--", alpha=0.5)

                ax4.set_xlabel(
                    x_metric.replace("_improvement_pct", "").replace("_", " ").title()
                    + " Improvement (%)"
                )
                ax4.set_ylabel(
                    y_metric.replace("_improvement_pct", "").replace("_", " ").title()
                    + " Improvement (%)"
                )
                ax4.set_title("Efficiency Improvements Correlation", fontweight="bold")
                ax4.grid(True, alpha=0.3)

                # Add correlation coefficient
                corr_coef = np.corrcoef(x_aligned, y_aligned)[0, 1]
                ax4.text(
                    0.05,
                    0.95,
                    f"Correlation: r = {corr_coef:.3f}",
                    transform=ax4.transAxes,
                    fontsize=10,
                    verticalalignment="top",
                    bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8),
                )

    # 5. Improvement distribution by magnitude
    ax5 = axes[1, 1]
    if efficiency_metrics:
        # Combine all improvement percentages
        all_improvements = []
        metric_labels = []

        for metric in efficiency_metrics:
            if metric in df.columns:
                improvements = df[metric].dropna()
                all_improvements.extend(improvements)
                metric_labels.extend(
                    [metric.replace("_improvement_pct", "").replace("_", " ").title()]
                    * len(improvements)
                )

        if all_improvements:
            # Create histogram with different colors for positive and negative improvements
            bins = np.linspace(min(all_improvements), max(all_improvements), 30)

            positive_improvements = [x for x in all_improvements if x > 0]
            negative_improvements = [x for x in all_improvements if x < 0]

            if positive_improvements:
                ax5.hist(
                    positive_improvements,
                    bins=bins,
                    alpha=0.7,
                    color=colors["improvement"],
                    label=f"Improvements ({len(positive_improvements)})",
                    edgecolor="black",
                    linewidth=0.5,
                )
            if negative_improvements:
                ax5.hist(
                    negative_improvements,
                    bins=bins,
                    alpha=0.7,
                    color=colors["degradation"],
                    label=f"Degradations ({len(negative_improvements)})",
                    edgecolor="black",
                    linewidth=0.5,
                )

            ax5.axvline(x=0, color="black", linestyle="-", linewidth=2, alpha=0.8)
            ax5.set_xlabel("Efficiency Change (%)")
            ax5.set_ylabel("Frequency")
            ax5.set_title(
                "Distribution of Energy Efficiency Changes", fontweight="bold"
            )
            ax5.legend()
            ax5.grid(True, alpha=0.3)

            # Add statistics
            mean_improvement = np.mean(all_improvements)
            stats_text = (
                f"Mean: {mean_improvement:.2f}%\n"
                f"Std: {np.std(all_improvements):.2f}%\n"
                f"Improved: {len(positive_improvements)}/{len(all_improvements)} "
                f"({len(positive_improvements) / len(all_improvements) * 100:.1f}%)"
            )
            ax5.text(
                0.05,
                0.95,
                stats_text,
                transform=ax5.transAxes,
                verticalalignment="top",
                fontsize=9,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", alpha=0.8),
            )

    # 6. LLM type comparison (if available)
    ax6 = axes[1, 2]
    if "llm_type" in df.columns and "cpu_improvement_pct" in df.columns:
        llm_types = df["llm_type"].unique()

        if len(llm_types) > 1:
            improvements_by_llm = []
            llm_labels = []

            for llm_type in llm_types:
                llm_data = df[df["llm_type"] == llm_type][
                    "cpu_improvement_pct"
                ].dropna()
                if len(llm_data) > 0:
                    improvements_by_llm.append(llm_data)
                    llm_labels.append(llm_type)

            if improvements_by_llm:
                box_plot = ax6.boxplot(
                    improvements_by_llm, labels=llm_labels, patch_artist=True
                )

                # Color boxes
                colors_list = plt.cm.Set3(np.linspace(0, 1, len(improvements_by_llm)))
                for patch, color in zip(box_plot["boxes"], colors_list):
                    patch.set_facecolor(color)
                    patch.set_alpha(0.7)

                ax6.axhline(y=0, color="black", linestyle="-", linewidth=2, alpha=0.8)
                ax6.set_ylabel("CPU Improvement (%)")
                ax6.set_title("CPU Efficiency by LLM Type", fontweight="bold")
                ax6.grid(True, alpha=0.3, axis="y")
                ax6.tick_params(axis="x", rotation=45)

                # Add mean values as text
                for i, (data, label) in enumerate(zip(improvements_by_llm, llm_labels)):
                    mean_val = np.mean(data)
                    ax6.text(
                        i + 1,
                        ax6.get_ylim()[1] * 0.9,
                        f"μ={mean_val:.1f}%",
                        ha="center",
                        va="center",
                        fontweight="bold",
                        bbox=dict(
                            boxstyle="round,pad=0.2", facecolor="white", alpha=0.8
                        ),
                    )

    plt.tight_layout()
    plt.show()


def create_summary_insights_report(df: pd.DataFrame, exercise_name: str):
    """Create a summary report with key insights and actionable recommendations."""
    if df.empty:
        print("No data available for summary report")
        return

    print("\n" + "=" * 100)
    print(f"📊 COMPREHENSIVE ANALYSIS SUMMARY - {exercise_name}")
    print("=" * 100)

    # Basic statistics
    total_comparisons = len(df)
    unique_entries = df["entry_id"].nunique() if "entry_id" in df.columns else "N/A"

    print("\n📈 DATASET OVERVIEW:")
    print(f"   • Total code comparisons analyzed: {total_comparisons}")
    print(f"   • Unique code entries: {unique_entries}")

    if "llm_type" in df.columns:
        llm_types = df["llm_type"].unique()
        print(f"   • LLM types tested: {', '.join(llm_types)}")

    if "language" in df.columns:
        languages = df["language"].unique()
        print(f"   • Programming languages: {', '.join(languages)}")

    # Energy efficiency summary
    efficiency_metrics = [col for col in df.columns if "improvement_pct" in col]

    if efficiency_metrics:
        print("\n⚡ ENERGY EFFICIENCY IMPROVEMENTS:")

        overall_improvements = {}
        for metric in efficiency_metrics:
            if metric in df.columns:
                data = df[metric].dropna()
                if len(data) > 0:
                    mean_improvement = data.mean()
                    positive_cases = (data > 0).sum()
                    total_cases = len(data)
                    improvement_rate = (
                        (positive_cases / total_cases * 100) if total_cases > 0 else 0
                    )

                    metric_name = (
                        metric.replace("_improvement_pct", "").replace("_", " ").title()
                    )
                    overall_improvements[metric_name] = {
                        "mean": mean_improvement,
                        "rate": improvement_rate,
                        "positive": positive_cases,
                        "total": total_cases,
                    }

                    status = (
                        "✅ IMPROVED"
                        if mean_improvement > 0
                        else "❌ DEGRADED"
                        if mean_improvement < 0
                        else "➖ NEUTRAL"
                    )
                    print(
                        f"   • {metric_name}: {mean_improvement:+.2f}% average {status}"
                    )
                    print(
                        f"     └─ {positive_cases}/{total_cases} cases improved ({improvement_rate:.1f}%)"
                    )

        # Find best and worst performing metrics
        if overall_improvements:
            best_metric = max(overall_improvements.items(), key=lambda x: x[1]["mean"])
            worst_metric = min(overall_improvements.items(), key=lambda x: x[1]["mean"])

            print(
                f"\n   🏆 Best improvement: {best_metric[0]} ({best_metric[1]['mean']:+.2f}%)"
            )
            print(
                f"   ⚠️  Worst change: {worst_metric[0]} ({worst_metric[1]['mean']:+.2f}%)"
            )

    # Correlation insights
    correlations = calculate_correlation_analysis(df)
    if correlations and "overall" in correlations and not correlations["overall"].empty:
        print("\n🔗 KEY CORRELATIONS:")

        corr_df = correlations["overall"]

        # Find strongest positive and negative correlations
        strong_correlations = []
        for metric in corr_df.index:
            for efficiency in corr_df.columns:
                corr_val = corr_df.loc[metric, efficiency]
                if abs(corr_val) > 0.3:  # Significant correlation
                    strong_correlations.append((metric, efficiency, corr_val))

        # Sort by absolute correlation strength
        strong_correlations.sort(key=lambda x: abs(x[2]), reverse=True)

        if strong_correlations:
            print("   Top correlations found:")
            for metric, efficiency, corr_val in strong_correlations[:5]:
                metric_clean = metric.replace("llm_", "").replace("_", " ").title()
                efficiency_clean = (
                    efficiency.replace("_improvement_pct", "").replace("_", " ").title()
                )

                if corr_val > 0:
                    relationship = "Higher complexity → Better efficiency"
                    icon = "📈"
                else:
                    relationship = "Higher complexity → Worse efficiency"
                    icon = "📉"

                print(
                    f"   • {icon} {metric_clean} ↔ {efficiency_clean}: r={corr_val:.3f}"
                )
                print(f"     └─ {relationship}")
        else:
            print("   • No significant correlations found (|r| > 0.3)")

    # Regression analysis insights
    regression_results = perform_regression_analysis(df)
    if regression_results:
        print("\n🎯 PREDICTIVE ANALYSIS:")

        best_predictions = []
        for target, results in regression_results.items():
            r2_score = results.get("r2_score", 0)
            if r2_score > 0.3:  # Decent predictive power
                best_predictions.append((target, r2_score, results))

        best_predictions.sort(key=lambda x: x[1], reverse=True)

        if best_predictions:
            print("   Energy efficiency predictability:")
            for target, r2_score, results in best_predictions:
                target_clean = (
                    target.replace("_improvement_pct", "").replace("_", " ").title()
                )

                if r2_score > 0.8:
                    quality = "Excellent"
                    icon = "🎯"
                elif r2_score > 0.6:
                    quality = "Good"
                    icon = "✅"
                elif r2_score > 0.4:
                    quality = "Moderate"
                    icon = "⚠️"
                else:
                    quality = "Weak"
                    icon = "❌"

                print(
                    f"   • {icon} {target_clean}: R² = {r2_score:.3f} ({quality} prediction)"
                )

                # Show top predictive metrics
                if "feature_importance" in results:
                    top_features = results["feature_importance"].head(3)
                    print("     └─ Key predictive metrics:")
                    for _, row in top_features.iterrows():
                        feature_clean = (
                            row["metric"].replace("llm_", "").replace("_", " ").title()
                        )
                        coef_direction = (
                            "increases" if row["coefficient"] > 0 else "decreases"
                        )
                        print(
                            f"        • {feature_clean} ({coef_direction} efficiency)"
                        )
        else:
            print("   • Low predictive power across all efficiency metrics")

    # Generate actionable recommendations
    print("\n💡 ACTIONABLE RECOMMENDATIONS:")

    recommendations = []

    # Based on correlation analysis
    if correlations and "overall" in correlations and not correlations["overall"].empty:
        corr_df = correlations["overall"]

        # Find metrics that consistently correlate with improvements
        positive_correlations = {}
        negative_correlations = {}

        for metric in corr_df.index:
            pos_count = (corr_df.loc[metric] > 0.3).sum()
            neg_count = (corr_df.loc[metric] < -0.3).sum()

            if pos_count > neg_count and pos_count > 0:
                avg_corr = corr_df.loc[metric][corr_df.loc[metric] > 0.3].mean()
                positive_correlations[metric] = avg_corr
            elif neg_count > pos_count and neg_count > 0:
                avg_corr = corr_df.loc[metric][corr_df.loc[metric] < -0.3].mean()
                negative_correlations[metric] = avg_corr

        if positive_correlations:
            top_positive = max(positive_correlations.items(), key=lambda x: x[1])
            metric_name = top_positive[0].replace("llm_", "").replace("_", " ").title()
            recommendations.append(
                f"🔍 Focus on increasing {metric_name} - shows consistent positive correlation with energy efficiency"
            )

        if negative_correlations:
            top_negative = min(negative_correlations.items(), key=lambda x: x[1])
            metric_name = top_negative[0].replace("llm_", "").replace("_", " ").title()
            recommendations.append(
                f"⚠️  Monitor and potentially reduce {metric_name} - shows consistent negative correlation with energy efficiency"
            )

    # Based on current performance
    if efficiency_metrics:
        # Find metrics that need improvement
        needs_improvement = []
        for metric in efficiency_metrics:
            if metric in df.columns:
                data = df[metric].dropna()
                if len(data) > 0:
                    mean_val = data.mean()
                    improvement_rate = (data > 0).mean()
                    if mean_val < 0 or improvement_rate < 0.5:
                        metric_name = (
                            metric.replace("_improvement_pct", "")
                            .replace("_", " ")
                            .title()
                        )
                        needs_improvement.append(
                            (metric_name, mean_val, improvement_rate)
                        )

        if needs_improvement:
            worst_metric = min(needs_improvement, key=lambda x: x[1])
            recommendations.append(
                f"🚨 Priority: Improve {worst_metric[0]} efficiency - currently showing {worst_metric[1]:.1f}% average change with only {worst_metric[2] * 100:.1f}% success rate"
            )

    # Generic recommendations
    recommendations.extend(
        [
            "📊 Continue monitoring energy metrics to identify trends and patterns",
            "🔄 Consider iterative optimization focusing on the most predictive complexity metrics",
            "📈 Validate improvements with larger datasets to ensure statistical significance",
        ]
    )

    # Print recommendations
    if recommendations:
        for i, rec in enumerate(recommendations, 1):
            print(f"   {i}. {rec}")

    print("\n" + "=" * 100)
    print(
        "📋 Analysis complete! Use these insights to guide LLM code optimization strategies."
    )
    print("=" * 100 + "\n")


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

    # Load data
    print("\n[1/7] Loading cluster data...")
    cluster_data = load_cluster_metrics(CLUSTER_METRICS_FILE)

    if not cluster_data:
        print("[ERROR] Failed to load cluster data")
        return

    # Find corresponding output files
    print(f"\n[2/7] Finding output files for exercise '{exercise_name}'...")
    base_files, llm_v3_files = find_output_files_for_exercise(
        OUTPUT_DIR_FILEPATH, exercise_name
    )
    # print(f"\nbase_files\n{base_files}")
    # print(f"\nllm_v3_files\n{llm_v3_files}")

    if not base_files:
        print(f"[ERROR] No base execution files found for exercise '{exercise_name}'")
        return

    if not llm_v3_files:
        print(f"[ERROR] No LLM v3 execution files found for exercise '{exercise_name}'")
        return

    # Load execution results
    print("\n[3/7] Loading execution results...")
    base_exec_results = load_execution_results(base_files)
    # print(f"\nbase_exec_results\n{base_exec_results}")

    llm_exec_results = load_execution_results(llm_v3_files)
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

    # Create visualizations
    print("\n[7/7] Creating visualizations...")

    # Energy improvement summary
    #create_energy_improvement_summary(df)
    create_energy_overview_dashboard(df, exercise_name)

    # Correlation heatmaps
    """
    if "correlations" in report:
        for correlation_type, correlation_data in report["correlations"].items():
            if not correlation_data.empty:
                title = f"{correlation_type.replace('_', ' ').title()} Complexity Metrics vs Energy Efficiency"
                create_correlation_heatmap(correlation_data, title)
                create_detailed_correlation_analysis(df, exercise_name)
    

    # Scatter plots
    create_scatter_plots(df)

    create_complexity_impact_analysis(df, exercise_name)

    create_energy_trends_analysis(df, exercise_name)

    create_summary_insights_report(df, exercise_name)
    """

    # Feature importance plots
    if "regressions" in report and report["regressions"]:
        create_feature_importance_plot(report["regressions"])

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
