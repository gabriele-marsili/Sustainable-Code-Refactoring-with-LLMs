#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Enhanced Energy Efficiency Metrics Statistics Analysis

This module analyzes the correlation between code complexity metrics (from the research paper)
and energy efficiency improvements introduced by LLM-generated code variants.

Based on: "Enhancing LLM-Based Code Generation with Complexity Metrics: A Feedback-Driven Approach"
"""

import os
import json
import glob
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from typing import Dict, Any, List
import sys
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import warnings

warnings.filterwarnings('ignore')

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from utility_dir import utility_paths  # noqa: E402

# =============================================================================
# CONFIGURATION
# =============================================================================

OUTPUT_DIR_FILEPATH = str(utility_paths.OUTPUT_DIR_FILEPATH)
CLUSTER_METRICS_FILE = str(utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_bob.with_metrics.json")

# Metrics categories based on the research paper
HIGH_IMPORTANCE_METRICS = [
    'halstead_length', 'halstead_vocabulary', 'halstead_effort',
    'loc', 'math_operations', 'numeric_literals', 'max_nested_blocks'
]

MEDIUM_IMPORTANCE_METRICS = [
    'halstead_volume', 'halstead_difficulty', 'halstead_time',
    'cyclomatic_complexity', 'maintainability_index', 'comparisons',
    'loops', 'variables', 'string_literals', 'unique_words'
]

KEYWORD_METRICS = [
    'conditional_statements', 'loop_constructs', 'function_definitions',
    'exception_handling', 'logical_operators', 'return_statements'
]

# Energy efficiency proxy calculations
ENERGY_METRICS = ['CPU_usage', 'RAM_usage', 'execution_time_ms']

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

def load_execution_results(output_dir: str) -> List[Dict[str, Any]]:
    """Load all execution result files from the output directory."""
    all_results = []
    json_files = glob.glob(os.path.join(output_dir, "*.json"))
    
    print(f"[INFO] Found {len(json_files)} result files in {output_dir}")
    
    for file_path in json_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                all_results.append({
                    "filename": os.path.basename(file_path),
                    "data": data
                })
        except json.JSONDecodeError as e:
            print(f"[WARN] Corrupted JSON file: {file_path} - {e}")
        except Exception as e:
            print(f"[WARN] Error loading file {file_path}: {e}")
    
    print(f"[INFO] Successfully loaded {len(all_results)} execution result files")
    return all_results

def flatten_metrics_dict(metrics: Dict[str, Any], prefix: str = "") -> Dict[str, Any]:
    """
    Flatten nested metrics dictionaries for easier DataFrame operations.
    
    Args:
        metrics: Nested dictionary of metrics
        prefix: Prefix for flattened keys
    
    Returns:
        Flattened dictionary
    """
    flat_dict = {}
    
    for key, value in metrics.items():
        new_key = f"{prefix}{key}" if prefix else key
        
        if isinstance(value, dict):
            # Recursively flatten nested dictionaries
            flat_dict.update(flatten_metrics_dict(value, f"{new_key}."))
        elif isinstance(value, (int, float, bool)):
            # Only include numeric values for analysis
            flat_dict[new_key] = value
        elif isinstance(value, str):
            # Convert string metrics if they represent numbers
            try:
                flat_dict[new_key] = float(value)
            except ValueError:
                # Skip non-numeric string values
                pass
    
    return flat_dict

def calculate_energy_efficiency_metrics(base_metrics: Dict, llm_metrics: Dict) -> Dict[str, float]:
    """
    Calculate energy efficiency improvements between base and LLM-generated code.
    
    Args:
        base_metrics: Energy metrics from base code
        llm_metrics: Energy metrics from LLM-generated code
    
    Returns:
        Dictionary of improvement metrics
    """
    improvements = {}
    
    # CPU efficiency improvement (lower is better)
    base_cpu = base_metrics.get('CPU_usage', 0)
    llm_cpu = llm_metrics.get('CPU_usage', 0)
    if base_cpu > 0:
        improvements['cpu_improvement_pct'] = ((base_cpu - llm_cpu) / base_cpu) * 100
    else:
        improvements['cpu_improvement_pct'] = 0
    
    # Memory efficiency improvement (lower is better)
    base_ram = base_metrics.get('RAM_usage', 0)
    llm_ram = llm_metrics.get('RAM_usage', 0)
    if base_ram > 0:
        improvements['ram_improvement_pct'] = ((base_ram - llm_ram) / base_ram) * 100
    else:
        improvements['ram_improvement_pct'] = 0
    
    # Execution time improvement (lower is better)
    base_time = base_metrics.get('execution_time_ms', 0)
    llm_time = llm_metrics.get('execution_time_ms', 0)
    if base_time > 0:
        improvements['time_improvement_pct'] = ((base_time - llm_time) / base_time) * 100
    else:
        improvements['time_improvement_pct'] = 0
    
    # Combined energy proxy (CPU% * execution_time)
    base_energy = base_cpu * (base_time / 1000.0) if base_time > 0 else 0
    llm_energy = llm_cpu * (llm_time / 1000.0) if llm_time > 0 else 0
    
    if base_energy > 0:
        improvements['energy_improvement_pct'] = ((base_energy - llm_energy) / base_energy) * 100
    else:
        improvements['energy_improvement_pct'] = 0
    
    # Store raw values for analysis
    improvements['base_energy_proxy'] = base_energy
    improvements['llm_energy_proxy'] = llm_energy
    improvements['base_cpu'] = base_cpu
    improvements['llm_cpu'] = llm_cpu
    improvements['base_ram'] = base_ram
    improvements['llm_ram'] = llm_ram
    improvements['base_time'] = base_time
    improvements['llm_time'] = llm_time
    
    return improvements

def merge_metrics_and_execution_data(cluster_data: Dict[str, Any], 
                                   exec_results: List[Dict[str, Any]]) -> pd.DataFrame:
    """
    Merge complexity metrics with execution results for comprehensive analysis.
    
    Args:
        cluster_data: Dataset with complexity metrics
        exec_results: Execution performance data
    
    Returns:
        Combined DataFrame for analysis
    """
    # Create mapping from filename to execution results
    exec_map = {}
    
    for result_file in exec_results:
        res_data = result_file["data"]
        
        for lang, entries in res_data.get("results", {}).items():
            for entry in entries:
                # Base code execution results
                base_filename = entry.get("filename", "")
                exec_map[base_filename] = {
                    "CPU_usage": entry.get("CPU_usage"),
                    "RAM_usage": entry.get("RAM_usage"), 
                    "execution_time_ms": entry.get("execution_time_ms"),
                    "regrationTestPassed": entry.get("regrationTestPassed"),
                    "variant_type": "base",
                    "language": lang
                }
                
                # LLM-generated code execution results
                for llm_result in entry.get("LLM_results", []):
                    llm_filename = os.path.basename(llm_result.get("path", ""))
                    exec_map[llm_filename] = {
                        "CPU_usage": llm_result.get("CPU_usage"),
                        "RAM_usage": llm_result.get("RAM_usage"),
                        "execution_time_ms": llm_result.get("execution_time_ms"),
                        "regrationTestPassed": llm_result.get("regrationTestPassed"),
                        "LLM_type": llm_result.get("LLM_type"),
                        "variant_type": "llm",
                        "language": lang,
                        "base_filename": base_filename  # Link to base for comparison
                    }
    
    # Process cluster data and merge with execution results
    rows = []
    
    for lang, entries in cluster_data.items():
        for entry in entries:
            entry_id = entry.get("id", "")
            
            # Process base code snippet
            base_filename = entry.get("filename", os.path.basename(entry.get("codeSnippetFilePath", "")))
            base_metrics = entry.get("base_metrics", {})
            
            if base_metrics:
                flat_metrics = flatten_metrics_dict(base_metrics, "base_")
                
                row = {
                    "entry_id": entry_id,
                    "filename": base_filename,
                    "variant_type": "base",
                    "language": lang,
                    **flat_metrics
                }
                
                # Add execution data if available
                if base_filename in exec_map:
                    row.update(exec_map[base_filename])
                
                rows.append(row)
            
            # Process LLM variants
            for llm_entry in entry.get("LLMs", []):
                llm_filename = llm_entry.get("filename", os.path.basename(llm_entry.get("path", "")))
                llm_metrics = llm_entry.get("metrics", {})
                
                if llm_metrics:
                    flat_metrics = flatten_metrics_dict(llm_metrics, "llm_")
                    
                    row = {
                        "entry_id": entry_id,
                        "filename": llm_filename,
                        "variant_type": "llm",
                        "language": lang,
                        "llm_type": llm_entry.get("type", "unknown"),
                        "base_filename": base_filename,
                        **flat_metrics
                    }
                    
                    # Add execution data if available
                    if llm_filename in exec_map:
                        row.update(exec_map[llm_filename])
                    
                    # Calculate energy efficiency improvements
                    if (base_filename in exec_map and llm_filename in exec_map and
                        exec_map[base_filename].get("regrationTestPassed") and 
                        exec_map[llm_filename].get("regrationTestPassed")):
                        
                        improvements = calculate_energy_efficiency_metrics(
                            exec_map[base_filename], 
                            exec_map[llm_filename]
                        )
                        row.update(improvements)
                    
                    rows.append(row)
    
    df = pd.DataFrame(rows)
    print(f"[INFO] Created merged dataset with {len(df)} rows and {len(df.columns)} columns")
    
    return df

# =============================================================================
# STATISTICAL ANALYSIS FUNCTIONS
# =============================================================================

def calculate_correlation_matrix(df: pd.DataFrame, 
                               complexity_metrics: List[str],
                               efficiency_metrics: List[str]) -> pd.DataFrame:
    """
    Calculate correlation matrix between complexity metrics and energy efficiency.
    
    Args:
        df: DataFrame with metrics data
        complexity_metrics: List of complexity metric column names
        efficiency_metrics: List of efficiency metric column names
    
    Returns:
        Correlation matrix DataFrame
    """
    # Filter available metrics
    available_complexity = [m for m in complexity_metrics if m in df.columns]
    available_efficiency = [m for m in efficiency_metrics if m in df.columns]
    
    if not available_complexity or not available_efficiency:
        print("[WARN] No valid metrics found for correlation analysis")
        return pd.DataFrame()
    
    # Calculate correlations
    metrics_df = df[available_complexity + available_efficiency].dropna()
    correlation_matrix = metrics_df.corr()
    
    # Extract cross-correlations (complexity vs efficiency)
    cross_corr = correlation_matrix.loc[available_complexity, available_efficiency]
    
    return cross_corr

def perform_regression_analysis(df: pd.DataFrame, 
                              target_metric: str,
                              predictor_metrics: List[str]) -> Dict[str, Any]:
    """
    Perform regression analysis to identify most predictive complexity metrics.
    
    Args:
        df: DataFrame with metrics data
        target_metric: Target efficiency metric
        predictor_metrics: List of complexity metrics as predictors
    
    Returns:
        Dictionary with regression results
    """
    # Filter available predictors
    available_predictors = [m for m in predictor_metrics if m in df.columns]
    
    if target_metric not in df.columns or not available_predictors:
        return {"error": "Missing required columns for regression"}
    
    # Prepare data
    analysis_df = df[available_predictors + [target_metric]].dropna()
    
    if len(analysis_df) < 10:
        return {"error": "Insufficient data points for regression"}
    
    X = analysis_df[available_predictors]
    y = analysis_df[target_metric]
    
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
    feature_importance = pd.DataFrame({
        'metric': available_predictors,
        'coefficient': model.coef_,
        'abs_coefficient': np.abs(model.coef_)
    }).sort_values('abs_coefficient', ascending=False)
    
    return {
        'r2_score': r2,
        'feature_importance': feature_importance,
        'n_samples': len(analysis_df),
        'intercept': model.intercept_,
        'predictors_used': available_predictors
    }

def analyze_llm_performance_differences(df: pd.DataFrame) -> Dict[str, pd.DataFrame]:
    """
    Analyze differences in complexity metrics and efficiency between LLM types.
    
    Args:
        df: DataFrame with metrics data
    
    Returns:
        Dictionary with analysis results by LLM type
    """
    llm_analysis = {}
    
    # Filter LLM data
    llm_data = df[df['variant_type'] == 'llm'].copy()
    
    if llm_data.empty:
        return {"error": "No LLM data available for analysis"}
    
    # Group by LLM type
    for llm_type in llm_data['llm_type'].unique():
        if pd.isna(llm_type):
            continue
            
        llm_subset = llm_data[llm_data['llm_type'] == llm_type]
        
        # Calculate summary statistics for efficiency metrics
        efficiency_cols = [col for col in llm_subset.columns if 'improvement_pct' in col]
        
        if efficiency_cols:
            summary_stats = llm_subset[efficiency_cols].describe()
            llm_analysis[llm_type] = summary_stats
    
    return llm_analysis

# =============================================================================
# VISUALIZATION FUNCTIONS
# =============================================================================

def create_correlation_heatmap(correlation_matrix: pd.DataFrame, 
                             title: str = "Complexity Metrics vs Energy Efficiency Correlation"):
    """Create and display correlation heatmap."""
    if correlation_matrix.empty:
        print("[WARN] Empty correlation matrix - skipping heatmap")
        return
    
    plt.figure(figsize=(12, 8))
    sns.heatmap(correlation_matrix, 
                annot=True, 
                fmt='.3f', 
                cmap='RdBu_r',
                center=0,
                square=True,
                cbar_kws={"shrink": .8})
    
    plt.title(title, fontsize=14, fontweight='bold')
    plt.xlabel('Energy Efficiency Metrics', fontsize=12)
    plt.ylabel('Complexity Metrics', fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.show()

def plot_metric_distribution_by_variant(df: pd.DataFrame, metric: str):
    """Plot distribution of a metric by variant type (base vs LLM)."""
    if metric not in df.columns:
        print(f"[WARN] Metric '{metric}' not found in data")
        return
    
    plt.figure(figsize=(10, 6))
    
    # Filter data
    plot_data = df[df[metric].notna()]
    
    if plot_data.empty:
        print(f"[WARN] No data available for metric '{metric}'")
        return
    
    # Create violin plot
    sns.violinplot(data=plot_data, x='variant_type', y=metric, hue='language')
    
    plt.title(f'Distribution of {metric} by Variant Type', fontsize=14, fontweight='bold')
    plt.xlabel('Variant Type', fontsize=12)
    plt.ylabel(metric, fontsize=12)
    plt.xticks(rotation=0)
    plt.legend(title='Language', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.show()

def plot_energy_improvement_by_complexity(df: pd.DataFrame, 
                                        complexity_metric: str,
                                        efficiency_metric: str = 'energy_improvement_pct'):
    """Plot energy improvement vs complexity metric."""
    if complexity_metric not in df.columns or efficiency_metric not in df.columns:
        print(f"[WARN] Required metrics not found: {complexity_metric}, {efficiency_metric}")
        return
    
    # Filter LLM data with valid improvements
    plot_data = df[(df['variant_type'] == 'llm') & 
                   (df[complexity_metric].notna()) & 
                   (df[efficiency_metric].notna())]
    
    if plot_data.empty:
        print("[WARN] No valid data for energy improvement analysis")
        return
    
    plt.figure(figsize=(10, 6))
    
    # Scatter plot with regression line
    sns.scatterplot(data=plot_data, 
                   x=complexity_metric, 
                   y=efficiency_metric,
                   hue='llm_type',
                   alpha=0.7,
                   s=60)
    
    # Add regression line
    try:
        sns.regplot(data=plot_data, 
                   x=complexity_metric, 
                   y=efficiency_metric,
                   scatter=False,
                   color='red',
                   line_kws={'alpha': 0.5})
    except:  # noqa: E722
        pass  # Skip regression line if not possible
    
    plt.title(f'Energy Improvement vs {complexity_metric}', fontsize=14, fontweight='bold')
    plt.xlabel(complexity_metric.replace('_', ' ').title(), fontsize=12)
    plt.ylabel('Energy Improvement (%)', fontsize=12)
    plt.legend(title='LLM Type', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.show()

def create_feature_importance_plot(regression_results: Dict[str, Any],
                                 title: str = "Most Predictive Complexity Metrics"):
    """Create feature importance plot from regression results."""
    if 'feature_importance' not in regression_results:
        print("[WARN] No feature importance data available")
        return
    
    importance_df = regression_results['feature_importance'].head(10)  # Top 10
    
    plt.figure(figsize=(10, 6))
    
    bars = plt.barh(range(len(importance_df)), 
                    importance_df['abs_coefficient'],
                    color=['green' if x >= 0 else 'red' for x in importance_df['coefficient']])
    
    plt.yticks(range(len(importance_df)), 
               [metric.replace('_', ' ').title() for metric in importance_df['metric']])
    plt.xlabel('Absolute Coefficient Value', fontsize=12)
    plt.title(f'{title}\n(R² = {regression_results["r2_score"]:.3f})', 
              fontsize=14, fontweight='bold')
    
    # Add value labels on bars
    for i, (bar, coef) in enumerate(zip(bars, importance_df['coefficient'])):
        plt.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height()/2, 
                f'{coef:.3f}', ha='left', va='center', fontsize=9)
    
    plt.grid(True, alpha=0.3, axis='x')
    plt.tight_layout()
    plt.show()

# =============================================================================
# MAIN ANALYSIS PIPELINE
# =============================================================================

def generate_comprehensive_report(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Generate comprehensive analysis report.
    
    Args:
        df: Combined DataFrame with all metrics
    
    Returns:
        Dictionary with analysis results
    """
    report = {
        'data_summary': {},
        'correlations': {},
        'regressions': {},
        'llm_comparison': {}
    }
    
    # Data summary
    report['data_summary'] = {
        'total_entries': len(df),
        'base_entries': len(df[df['variant_type'] == 'base']),
        'llm_entries': len(df[df['variant_type'] == 'llm']),
        'languages': df['language'].nunique(),
        'llm_types': df[df['variant_type'] == 'llm']['llm_type'].nunique()
    }
    
    # Correlation analysis
    efficiency_metrics = ['energy_improvement_pct', 'cpu_improvement_pct', 
                         'ram_improvement_pct', 'time_improvement_pct']
    
    high_importance_cols = [f"llm_{m}" for m in HIGH_IMPORTANCE_METRICS]
    medium_importance_cols = [f"llm_{m}" for m in MEDIUM_IMPORTANCE_METRICS]
    
    report['correlations']['high_importance'] = calculate_correlation_matrix(
        df, high_importance_cols, efficiency_metrics)
    report['correlations']['medium_importance'] = calculate_correlation_matrix(
        df, medium_importance_cols, efficiency_metrics)
    
    # Regression analysis for energy improvement
    report['regressions']['energy_high'] = perform_regression_analysis(
        df, 'energy_improvement_pct', high_importance_cols)
    report['regressions']['energy_medium'] = perform_regression_analysis(
        df, 'energy_improvement_pct', medium_importance_cols)
    
    # LLM comparison
    report['llm_comparison'] = analyze_llm_performance_differences(df)
    
    return report

def main():
    """Main analysis pipeline."""
    print("="*60)
    print("ENHANCED ENERGY EFFICIENCY METRICS ANALYSIS")
    print("="*60)
    
    # Load data
    print("\n[1/6] Loading data...")
    cluster_data = load_cluster_metrics(CLUSTER_METRICS_FILE)
    exec_results = load_execution_results(OUTPUT_DIR_FILEPATH)
    
    if not cluster_data or not exec_results:
        print("[ERROR] Failed to load required data files")
        return
    
    # Merge datasets
    print("\n[2/6] Merging complexity metrics with execution results...")
    df = merge_metrics_and_execution_data(cluster_data, exec_results)
    
    if df.empty:
        print("[ERROR] No data available after merging")
        return
    
    print("[INFO] Dataset summary:")
    print(f"  - Total entries: {len(df)}")
    print(f"  - Base code variants: {len(df[df['variant_type'] == 'base'])}")
    print(f"  - LLM-generated variants: {len(df[df['variant_type'] == 'llm'])}")
    print(f"  - Languages: {df['language'].nunique()}")
    
    # Generate comprehensive analysis report
    print("\n[3/6] Performing statistical analysis...")
    report = generate_comprehensive_report(df)
    
    print("[INFO] Analysis complete:")
    print(f"  - Languages analyzed: {report['data_summary']['languages']}")
    print(f"  - LLM types: {report['data_summary']['llm_types']}")
    
    # Visualization 1: Correlation heatmaps
    print("\n[4/6] Creating correlation visualizations...")
    
    if not report['correlations']['high_importance'].empty:
        create_correlation_heatmap(
            report['correlations']['high_importance'],
            "High-Importance Complexity Metrics vs Energy Efficiency"
        )
    
    if not report['correlations']['medium_importance'].empty:
        create_correlation_heatmap(
            report['correlations']['medium_importance'],
            "Medium-Importance Complexity Metrics vs Energy Efficiency"
        )
    
    # Visualization 2: Feature importance from regression
    print("\n[5/6] Creating predictive analysis visualizations...")
    
    if 'error' not in report['regressions']['energy_high']:
        create_feature_importance_plot(
            report['regressions']['energy_high'],
            "Most Predictive High-Importance Metrics for Energy Efficiency"
        )
    
    # Visualization 3: Energy improvement scatter plots
    print("\n[6/6] Creating energy improvement analysis plots...")
    
    # Plot for key metrics identified in the paper
    key_metrics = ['llm_halstead_effort', 'llm_loc', 'llm_max_nested_blocks', 
                   'llm_math_operations', 'llm_cyclomatic_complexity']
    
    for metric in key_metrics:
        if metric in df.columns:
            plot_energy_improvement_by_complexity(df, metric)
    
    # Distribution analysis
    efficiency_metrics = ['energy_improvement_pct', 'cpu_improvement_pct']
    for metric in efficiency_metrics:
        if metric in df.columns:
            plot_metric_distribution_by_variant(df, metric)
    
    print("\n" + "="*60)
    print("ANALYSIS COMPLETE")
    print("="*60)
    
    # Print summary insights
    print("\n📊 KEY INSIGHTS:")
    
    # Best correlations
    if not report['correlations']['high_importance'].empty:
        corr_df = report['correlations']['high_importance']
        #max_corr = corr_df.abs().max().max()
        best_pair = corr_df.abs().stack().idxmax()
        print(f"• Strongest correlation: {best_pair[0]} vs {best_pair[1]} (r = {corr_df.loc[best_pair]:.3f})")
    
    # Best predictive model
    if 'error' not in report['regressions']['energy_high']:
        r2 = report['regressions']['energy_high']['r2_score']
        print(f"• High-importance metrics explain {r2*100:.1f}% of energy efficiency variance")
        
        top_predictor = report['regressions']['energy_high']['feature_importance'].iloc[0]
        print(f"• Most predictive metric: {top_predictor['metric']} (coef = {top_predictor['coefficient']:.3f})")
    
    # LLM performance differences
    if report['llm_comparison'] and 'error' not in report['llm_comparison']:
        print(f"• Analyzed {len(report['llm_comparison'])} different LLM types")
    
    print(f"\n💡 Recommendation: Focus on optimizing {', '.join(HIGH_IMPORTANCE_METRICS[:3])} for maximum energy efficiency gains.")

if __name__ == "__main__":
    main()