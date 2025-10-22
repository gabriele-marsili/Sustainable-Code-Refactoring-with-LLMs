# Execution Metrics Analysis Report

**Generated:** 2025-10-15 15:25:56

## Overview

This report summarizes execution metrics aggregated across all clusters.

**IMPORTANT**: Base code entries are filtered to include ONLY those with 100% pass rate across all 5 executions.

### Objective 1

**Metrics by Prompt Version**

- Base code entries (100% pass rate): 1311
- Prompt versions analyzed: v1, v2, v3, v4

### Objective 2

**Metrics by Programming Language**

- Languages (base code): python, java, typescript, cpp, go, javascript, c
- Languages (LLM code): python, java, javascript, cpp, typescript, go, c

### Objective 3

**Metrics by Model + Prompt Version**

- Model combinations analyzed: 12
- Improvement percentages calculated
- **Improvement interpretation**:
  - For CPU/RAM/Execution Time: **Negative is GOOD** (lower is better)
  - For Pass Rate: **Positive is GOOD** (higher is better)

### Objective 4

**Metrics by Language + Model**

- Language-model combinations analyzed: 21

## Visualization Files

All plots are saved in subdirectories within `execution_stats_plots/`:

### Box Plots (show distribution and variance)
- `metrics_means_related_to_prompt_versions/`
- `metrics_means_related_to_languages/`
- `metrics_means_related_to_both_model_and_prompt_version/`
- `metrics_means_related_to_language_and_model/`

### Bar Plots (show mean comparisons)
- Available in same directories with `_barplot.png` suffix

### Scatter Plots (show base vs LLM comparison)
- Available in language metrics directory

## Metrics

The following metrics are analyzed:

- **CPU Usage (%)**: CPU utilization during execution
- **RAM Usage (KB)**: Memory consumption
- **Execution Time (ms)**: Time taken to execute tests
- **Pass Rate (%)**: Percentage of tests passed

## Data Filtering

**Base Code**: Only entries with 100% pass rate (across all 5 executions) are included.

This ensures we compare LLM-generated code against known-good baseline implementations.

## Notes

- All plots use box plots to show data distribution and variance
- Red dashed line indicates mean value
- Outliers are shown but axis limits are adjusted for clarity
- For improvement percentages (Objective 3):
  - **Negative values are GOOD** for CPU, RAM, and Execution Time (lower is better)
  - **Positive values are GOOD** for Pass Rate (higher is better)
  - Green text = improvement, Red text = degradation
