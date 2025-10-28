# Energy Improvements Analysis

## Overview

This directory contains the comprehensive analysis script for evaluating energy improvements achieved by LLM-optimized code across different models, prompt versions, and programming languages.

## Analysis Script

**`analyze_energy_improvements.py`** - Main analysis script that processes improvement data and generates statistics and visualizations.

### Usage

```bash
cd src/metrics/energy_improvements
python3 analyze_energy_improvements.py
```

The script will:
1. Load all improvement data from `clusters_improvements_data/` directory
2. Categorize data into valid improvements, invalid improvements, and outliers
3. Generate comprehensive statistics
4. Create professional visualizations

### Data Processing

The script processes data according to the following rules:

**Valid Improvements:**
- `label` = "reduction" (actual improvement) or "degradation" (performance loss)
- `is_outlier` = False
- `label` ≠ "invalid"

**Invalid Improvements:**
- `label` = "invalid"
- Typically indicates execution failures or missing data

**Outliers:**
- `is_outlier` = True
- Extreme values that may skew statistics

**Interpretation:**
- **Negative improvement %** = BETTER (reduction in resource usage)
- **Positive improvement %** = WORSE (increase in resource usage)

## Analyses Performed

### 1. Improvements by Programming Language
Analyzes CPU, RAM, and execution time improvements grouped by programming language.

**Output:**
- `stats_by_language.json` - Statistics per language
- `fig_improvements_by_language.png` - Box plots showing distribution

**Key Insights:**
- Go shows best performance improvements (CPU: -25.26%, RAM: -46.84%, Time: -61.61%)
- TypeScript also performs well (CPU: -12.40%, RAM: -40.33%, Time: -25.27%)
- Python shows mixed results (CPU: -1.90%, RAM: ~0%, Time: +14.53%)

### 2. Improvements by LLM Model
Compares performance across OpenAI, Gemini, and Claude models.

**Output:**
- `stats_by_model.json` - Statistics per model
- `fig_improvements_by_model.png` - Box plots comparing models

**Key Insights:**
- All three models show similar performance
- OpenAI: CPU -17.33%, RAM -33.36%, Time -27.39%
- Gemini: CPU -15.26%, RAM -33.00%, Time -28.15%
- Claude: CPU -17.03%, RAM -32.80%, Time -27.07%

### 3. Improvements by Prompt Version
Evaluates the impact of different prompt versions (v1, v2, v3, v4).

**Output:**
- `stats_by_prompt.json` - Statistics per prompt version
- `fig_improvements_by_prompt.png` - Box plots per prompt

**Key Insights:**
- Prompt v1 shows more conservative improvements
- Prompts v2, v3, v4 show significantly better improvements:
  - CPU: ~-18-19% vs v1's -10.44%
  - RAM: ~-37-38% vs v1's -19.33%
  - Time: ~-31-32% vs v1's -14.10%

### 4. Improvements by Model + Prompt Version
Combined analysis showing performance of each model with each prompt version.

**Output:**
- `stats_by_model_and_prompt.json` - Detailed statistics
- `fig_heatmap_model_prompt.png` - Heatmap visualization (mean values)
- `fig_model_prompt_combinations_boxplots.png` - **Box plots showing all 12 combinations with distributions**

**Key Insights:**
- Prompt v1 consistently shows lower improvements across all models
- OpenAI + prompt_v2 shows strongest CPU improvements (-19.70%)
- Gemini + prompt_v2 shows strongest time improvements (-33.74%)
- The aggregate box plot clearly shows the progression from v1 to v2-v4 for all models
- Distribution analysis reveals consistency across models for the same prompt version

### 5. Invalid Improvements Analysis
Analyzes cases where code execution failed or was invalid.

**Output:**
- `stats_invalid_improvements.json` - Invalid counts by model/prompt/language
- `fig_invalid_and_outliers.png` - Bar charts (top row)

**Key Insights:**
- Total invalid: 5,307 out of 36,792 (14.4%)
- By model: OpenAI 1,872, Gemini 1,737, Claude 1,698
- By prompt: v1 1,197, v2 1,377, v3 1,359, v4 1,374
- Prompt v1 has fewer invalid cases (more conservative approach)

### 6. Outliers Analysis
Identifies extreme values that may indicate unusual optimization behaviors.

**Output:**
- `stats_outliers.json` - Outlier counts by model/prompt/language
- `fig_invalid_and_outliers.png` - Bar charts (bottom row)

**Key Insights:**
- Total outliers: 189 out of 36,792 (0.5%)
- C language has most outliers: 109
- Python: 31, JavaScript: 27, TypeScript: 16, Java: 6
- Fairly balanced across models (58-71 each)

### 7. Success Rate Analysis
Calculates the percentage of valid executions for each model-prompt combination.

**Output:**
- `stats_success_rate.json` - Success rates
- `fig_success_rate.png` - Grouped bar chart

**Key Insights:**
- Claude + prompt_v1: 88.16% (highest success rate)
- OpenAI + prompt_v1: 86.20%
- Gemini + prompt_v1: 86.59%
- v2, v3, v4 prompts show ~85% success rates (trade-off for better optimizations)

### 8. Distribution Analysis
Shows the overall distribution of improvements across all metrics.

**Output:**
- `fig_improvement_distributions.png` - Histograms with median lines

**Key Insights:**
- Most improvements cluster around median values
- CPU and RAM show more variation than execution time
- Clear distinction between reductions and degradations

## Output Files

### Statistics (JSON)
All statistics include: count, mean, median, std, min, max, q25, q75

1. **stats_by_language.json** - Metrics grouped by programming language
2. **stats_by_model.json** - Metrics grouped by LLM model
3. **stats_by_prompt.json** - Metrics grouped by prompt version
4. **stats_by_model_and_prompt.json** - Combined model + prompt analysis
5. **stats_invalid_improvements.json** - Counts of invalid executions
6. **stats_outliers.json** - Counts of outlier values
7. **stats_success_rate.json** - Valid execution percentages

### Visualizations (PNG)
All charts are high-resolution (300 DPI) and publication-ready.

1. **fig_improvements_by_language.png** - Box plots per language (3 metrics)
2. **fig_improvements_by_model.png** - Box plots per model (3 metrics)
3. **fig_improvements_by_prompt.png** - Box plots per prompt (3 metrics)
4. **fig_heatmap_model_prompt.png** - Heatmaps showing model×prompt interaction
5. **fig_model_prompt_combinations_boxplots.png** - Aggregate box plots showing all 12 model+prompt combinations (openAI_v1-v4, gemini_v1-v4, claude_v1-v4)
6. **fig_invalid_and_outliers.png** - Bar charts for failures and outliers
7. **fig_success_rate.png** - Grouped bar chart of success rates
8. **fig_improvement_distributions.png** - Histograms of improvement distributions

## Data Structure

The script expects data in `clusters_improvements_data/` with the following structure:

```json
{
  "entry_id": {
    "base_5_exec_data": {
      "language": "python",
      "avg_exec_CPU_usage": 80.4,
      "avg_exec_RAM_usage": 13900.8,
      "avg_exec_execution_time_ms": 22.0
    },
    "improvements_data": {
      "openAI|gemini|claude": {
        "prompt_v1|v2|v3|v4": {
          "CPU_usage": {
            "improvement_percentage": -2.74,
            "label": "reduction|degradation|invalid",
            "is_outlier": false,
            "base_value": 80.4,
            "llm_value": 78.2
          },
          "RAM_usage": { ... },
          "execution_time_ms": { ... }
        }
      }
    }
  }
}
```

## Key Findings Summary

### Best Performing Combinations:
1. **Go + Any Model + Prompt v2-v4**: Exceptional improvements across all metrics
2. **TypeScript + Gemini + Prompt v2**: Strong balanced improvements
3. **Claude + Prompt v1**: Highest reliability (88% success rate)

### Performance vs Reliability Trade-off:
- **Prompt v1**: More conservative, higher success rate (~86-88%), lower improvements
- **Prompts v2-v4**: More aggressive optimizations, slightly lower success rate (~85%), significantly better improvements

### Language-Specific Insights:
- **Go**: Best optimization target (significant improvements)
- **TypeScript**: Good optimization target (balanced improvements)
- **Python**: Mixed results (CPU improves, time degrades slightly)
- **Java/JavaScript**: Moderate improvements
- **C**: Generates most outliers (needs careful review)

### Model Comparison:
- All three models (OpenAI, Gemini, Claude) perform similarly
- Claude shows slightly better reliability
- Gemini shows slightly better execution time improvements
- Choice of prompt version has more impact than choice of model

## Requirements

```bash
pip install numpy matplotlib seaborn pandas
```

## Notes

- Script processes 365 cluster files with 36,792 total records
- Processing time: ~30-60 seconds depending on system
- Charts use colorblind-friendly palettes where possible
- All improvements are calculated relative to baseline (unoptimized) code
- Negative percentages indicate improvements (resource reduction)
