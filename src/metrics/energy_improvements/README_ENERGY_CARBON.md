# Energy and Carbon Footprint Analysis

## Overview

This module calculates **absolute energy consumption** (in Joules) and **carbon emissions** (in gCO2eq - grams of CO2 equivalent) from execution metrics collected during code testing. It provides a comprehensive analysis of the environmental impact of base code vs. LLM-generated code refactorings.

### Key Features

- **Energy Calculation**: Derives power consumption from CPU% and RAM usage, converting to Joules
- **Carbon Footprint**: Converts energy to carbon emissions using regional carbon intensity
- **Improvement Analysis**: Calculates percentage reduction in energy/carbon for LLM code vs. base code
- **Comprehensive Visualizations**: 8 detailed plots analyzing different dimensions (model, prompt, language)
- **Configurable Coefficients**: Hardware TDP and carbon intensity easily adjustable

---

## Architecture

### Module Structure

```
src/metrics/energy_improvements/
├── energy_config.json              # Configuration: TDP, RAM power, carbon intensity
├── energy_analyzer.py              # Main analysis logic
├── energy_visualizator.py          # Visualization generation
├── energy_carbon_stats.json        # Generated statistics (output)
├── plots/                          # Generated visualizations (output)
│   ├── energy_distribution_boxplot.png
│   ├── carbon_distribution_boxplot.png
│   ├── energy_by_prompt_version_barplot.png
│   ├── carbon_by_prompt_version_barplot.png
│   ├── energy_by_model_barplot.png
│   ├── carbon_by_model_barplot.png
│   ├── energy_by_language_boxplot.png
│   ├── carbon_by_language_boxplot.png
│   └── energy_carbon_summary.md
└── README_ENERGY_CARBON.md         # This file
```

---

## Methodology

### 1. Energy Consumption Calculation

Energy consumption is calculated using **Green Computing** methodologies, deriving power from CPU and RAM utilization.

#### Formula

```python
# Step 1: Convert execution time to seconds
exec_time_sec = exec_time_ms / 1000.0

# Step 2: Calculate CPU power consumption
cpu_power_watt = TDP_CPU_WATT * (CPU_usage_percent / 100.0)

# Step 3: Calculate RAM power consumption
ram_gb = RAM_usage_KB / (1024 * 1024)
ram_power_watt = ram_gb * POWER_PER_GB_RAM_WATT

# Step 4: Apply PUE (Power Usage Effectiveness) factor for data center efficiency
total_power_watt = (cpu_power_watt + ram_power_watt) * PUE_FACTOR

# Step 5: Calculate energy (Power × Time)
energy_joules = total_power_watt * exec_time_sec
```

#### Example Calculation

**Given:**
- CPU Usage: 50%
- RAM Usage: 1,048,576 KB (1 GB)
- Execution Time: 1000 ms (1 second)
- TDP_CPU: 95 W
- POWER_PER_GB_RAM: 0.375 W/GB
- PUE: 1.5

**Calculation:**
```
cpu_power = 95 * (50/100) = 47.5 W
ram_power = 1.0 * 0.375 = 0.375 W
total_power = (47.5 + 0.375) * 1.5 = 71.8125 W
energy = 71.8125 * 1.0 = 71.8125 Joules
```

---

### 2. Carbon Footprint Calculation

Carbon emissions are calculated by converting energy consumption to kWh and applying a carbon intensity factor.

#### Formula

```python
# Step 1: Convert Joules to kWh
energy_kwh = energy_joules / 3,600,000.0  # 1 kWh = 3.6 million Joules

# Step 2: Calculate carbon emissions
carbon_gco2eq = energy_kwh * CARBON_INTENSITY_GCO2_PER_KWH
```

#### Example Calculation

**Given:**
- Energy: 71.8125 Joules
- Carbon Intensity: 400 gCO2eq/kWh (EU average)

**Calculation:**
```
energy_kwh = 71.8125 / 3,600,000 = 0.0000199479 kWh
carbon = 0.0000199479 * 400 = 0.00798 gCO2eq
```

---

### 3. Improvement Calculation

Improvement percentage is calculated for each LLM-generated code entry compared to its corresponding base code entry.

#### Formula

```python
energy_improvement_pct = ((energy_llm - energy_base) / energy_base) * 100.0
carbon_improvement_pct = ((carbon_llm - carbon_base) / carbon_base) * 100.0
```

#### Interpretation

- **Negative value** (e.g., -15.3%): **Reduction** → LLM code is more efficient (GOOD)
- **Positive value** (e.g., +8.2%): **Increase** → LLM code is less efficient (BAD)

---

## Configuration

### Coefficients in `energy_config.json`

```json
{
  "hardware_constants": {
    "TDP_CPU_WATT": 95.0,
    "POWER_PER_GB_RAM_WATT": 0.375,
    "PUE_FACTOR": 1.5
  },
  "carbon_intensity": {
    "CARBON_INTENSITY_GCO2_PER_KWH": 400.0,
    "region": "EU-average"
  }
}
```

### Customization Guide

#### 1. TDP_CPU_WATT (Thermal Design Power)

**Default:** 95.0 W (typical desktop CPU)

**Common Values:**
- Low-power laptop CPU: 15-45 W
- Desktop CPU: 65-125 W
- High-performance server CPU: 150-280 W

**How to find your CPU's TDP:**
- Intel CPUs: Search "[CPU model] TDP" on Intel ARK
- AMD CPUs: Search on AMD specifications page
- Linux: `sudo dmidecode -t processor | grep "Max Speed"`

#### 2. POWER_PER_GB_RAM_WATT

**Default:** 0.375 W/GB (DDR4 average)

**Common Values:**
- DDR3: ~0.5 W/GB
- DDR4: ~0.3-0.4 W/GB
- DDR5: ~0.25-0.35 W/GB

**Source:** Based on industry measurements and research papers:
- Micron DDR4 datasheet: ~3W for 8GB module → 0.375 W/GB

#### 3. PUE_FACTOR (Power Usage Effectiveness)

**Default:** 1.5 (average data center)

**Common Values:**
- Highly efficient data center (Google, AWS): 1.1-1.2
- Average data center: 1.5-1.8
- Older/inefficient data center: 2.0-3.0
- Home/office (no dedicated cooling): 1.0

**Definition:** Ratio of total facility energy to IT equipment energy
- PUE = 1.0: Perfect efficiency (100% of energy goes to IT)
- PUE = 2.0: 50% energy overhead (cooling, power distribution, etc.)

#### 4. CARBON_INTENSITY_GCO2_PER_KWH

**Default:** 400.0 gCO2eq/kWh (EU average)

**Regional Values (2024 estimates):**
- **France:** ~60 gCO2eq/kWh (nuclear + renewables)
- **Norway:** ~20 gCO2eq/kWh (hydro)
- **Germany:** ~400 gCO2eq/kWh (coal + renewables)
- **Poland:** ~700 gCO2eq/kWh (coal-heavy)
- **USA:** ~400 gCO2eq/kWh (mixed)
- **China:** ~550 gCO2eq/kWh (coal-heavy)
- **Global Average:** ~475 gCO2eq/kWh

**Sources:**
- [Electricity Maps](https://app.electricitymaps.com/)
- [IEA Emission Factors](https://www.iea.org/data-and-statistics/data-tools/co2-emissions-from-fuel-combustion)
- [Our World in Data - Carbon Intensity](https://ourworldindata.org/grapher/carbon-intensity-electricity)

**How to find your region's carbon intensity:**
1. Visit [Electricity Maps](https://app.electricitymaps.com/)
2. Click on your region
3. Note the "Carbon Intensity" value in gCO2eq/kWh
4. Update `energy_config.json` with your value

---

## Usage

### Running the Analysis

```bash
# Navigate to the energy_improvements directory
cd src/metrics/energy_improvements

# Run the analyzer
python energy_analyzer.py
```

### What Happens

1. **Configuration Loading**: Reads `energy_config.json`
2. **Data Loading**: Processes all JSON files from `src/execution_outputs/`
3. **Filtering**:
   - Removes entries with invalid metrics (None, ≤ 0)
   - For LLM entries: only includes those with `regressionTestPassed == True`
4. **Aggregation**: Calculates mean across 5 executions per entry
5. **Energy/Carbon Calculation**: Applies formulas to each entry
6. **Improvement Calculation**: Compares LLM vs. base (1-to-1 matching)
7. **Statistics Generation**: Aggregates by model, prompt, language
8. **Visualization**: Generates 8 plots + markdown summary
9. **Output**: Saves `energy_carbon_stats.json` and plots to `plots/`

### Expected Output

```
logs/energy_analyzer.log              # Detailed execution log
energy_carbon_stats.json              # Comprehensive statistics
plots/
  ├── energy_distribution_boxplot.png
  ├── carbon_distribution_boxplot.png
  ├── energy_by_prompt_version_barplot.png
  ├── carbon_by_prompt_version_barplot.png
  ├── energy_by_model_barplot.png
  ├── carbon_by_model_barplot.png
  ├── energy_by_language_boxplot.png
  ├── carbon_by_language_boxplot.png
  └── energy_carbon_summary.md
```

---

## Visualizations Guide

### 1. Energy/Carbon Distribution Box Plots

**Files:** `energy_distribution_boxplot.png`, `carbon_distribution_boxplot.png`

**What it shows:**
- Box plots for each category: Base Code (Avg), LLM (Avg), then by model+prompt (OpenAI v1, v2, ..., Claude v1, ...)
- Annotations show improvement % for each LLM category
- Green annotations: reduction (good), Red: increase (bad)

**How to read:**
- Box: interquartile range (IQR, middle 50% of data)
- Black line in box: median
- Red dashed line: mean
- Whiskers: full data range (excluding outliers)
- Circles: outliers

**Interpretation:**
- Lower boxes = less energy/carbon consumption
- Negative improvement % = LLM code is more efficient

### 2. Energy/Carbon by Prompt Version Bar Plots

**Files:** `energy_by_prompt_version_barplot.png`, `carbon_by_prompt_version_barplot.png`

**What it shows:**
- Mean energy/carbon consumption for Base and each prompt version (v1-v4)
- Error bars show standard deviation

**Interpretation:**
- Compare which prompt version produces most efficient code
- Lower bars = better performance

### 3. Energy/Carbon by Model Bar Plots

**Files:** `energy_by_model_barplot.png`, `carbon_by_model_barplot.png`

**What it shows:**
- Mean energy/carbon consumption for Base and each LLM model (OpenAI, Claude, Gemini)
- Error bars show standard deviation

**Interpretation:**
- Compare which LLM model generates most efficient code
- Helps choose optimal model for sustainability

### 4. Energy/Carbon by Language Box Plots

**Files:** `energy_by_language_boxplot.png`, `carbon_by_language_boxplot.png`

**What it shows:**
- Distribution of energy/carbon consumption for LLM-generated code by programming language
- Only LLM code (not base) to isolate language-specific patterns

**Interpretation:**
- Identify which languages benefit most from LLM optimization
- Compare inherent efficiency of different languages

---

## Data Sources and Filtering

### Input Data

- **Location:** `src/execution_outputs/`
- **File Naming:**
  - Base code: `{cluster}_results_{1-5}.json` (5 executions)
  - LLM code: `{cluster}_results_v{1-4}_{1-5}.json` (4 prompts × 5 executions)

### Filtering Criteria

**All entries:**
- `execution_time_ms` must be > 0
- `CPU_usage` must be > 0
- `RAM_usage` must be > 0

**LLM entries only:**
- `regressionTestPassed` must be `True`
- Ensures we only measure energy of **correct** code

### Aggregation

- Each entry's final metrics = **mean of 5 valid executions**
- Ensures statistical robustness and reduces noise

---

## Statistics Output

### `energy_carbon_stats.json` Structure

```json
{
  "global_stats": {
    "base": {
      "energy_joules": { "mean": ..., "median": ..., "std": ..., "min": ..., "max": ..., "count": ... },
      "carbon_gco2eq": { ... }
    },
    "llm": { ... },
    "improvements": {
      "energy_improvement_pct": { ... },
      "carbon_improvement_pct": { ... }
    }
  },
  "by_prompt_version": {
    "v1": { "energy_joules": {...}, "carbon_gco2eq": {...}, "energy_improvement_pct": {...}, ... },
    "v2": { ... },
    "v3": { ... },
    "v4": { ... }
  },
  "by_model": {
    "openAI": { ... },
    "claude": { ... },
    "gemini": { ... }
  },
  "by_language": {
    "python": { "energy_joules": {...}, "carbon_gco2eq": {...} },
    "java": { ... },
    ...
  },
  "by_model_prompt": {
    "openAI_v1": { ... },
    "openAI_v2": { ... },
    ...
  },
  "plot_data": {
    "energy_by_category": [ ... ],
    "carbon_by_category": [ ... ],
    ...
  }
}
```

---

## Troubleshooting

### Issue: "No valid entries found"

**Cause:** All entries filtered out due to invalid metrics or failed regression tests

**Solution:**
1. Check `src/execution_outputs/` has JSON files
2. Verify metrics are not None/null in JSON files
3. For LLM: ensure some entries have `regressionTestPassed: true`

### Issue: "Improvement % is None for many LLM entries"

**Cause:** No matching base entry found for LLM entry

**Solution:**
1. Ensure base code results exist for all clusters
2. Check entry IDs match between base and LLM files
3. Review `energy_analyzer.log` for warnings

### Issue: "Energy values seem too high/low"

**Cause:** Incorrect TDP or RAM power coefficients

**Solution:**
1. Verify your hardware specs
2. Update `energy_config.json` with correct values
3. Re-run analysis

### Issue: "Carbon values are unrealistic"

**Cause:** Carbon intensity factor doesn't match your region

**Solution:**
1. Find your region's carbon intensity (see Configuration section)
2. Update `CARBON_INTENSITY_GCO2_PER_KWH` in `energy_config.json`
3. Re-run analysis

---

## Scientific References

### Energy Modeling

1. **Kansal, A., & Zhao, F. (2008).** "Fine-Grained Energy Profiling for Power-Aware Application Design." *ACM SIGMETRICS*.

2. **Hähnel, M., Döbel, B., Völp, M., & Härtig, H. (2012).** "Measuring Energy Consumption for Short Code Paths Using RAPL." *ACM SIGMETRICS Performance Evaluation Review*.

3. **Schöne, R., Ilsche, T., Bielert, M., Velten, M., & Hackenberg, D. (2019).** "Energy Efficiency Aspects of the AMD Zen 2 Architecture." *arXiv preprint arXiv:1911.03674*.

### Carbon Footprint

4. **Strubell, E., Ganesh, A., & McCallum, A. (2019).** "Energy and Policy Considerations for Deep Learning in NLP." *ACL*.

5. **Patterson, D., et al. (2021).** "Carbon Emissions and Large Neural Network Training." *arXiv preprint arXiv:2104.10350*.

6. **Lannelongue, L., Grealey, J., & Inouye, M. (2021).** "Green Algorithms: Quantifying the Carbon Footprint of Computation." *Advanced Science*.

### Power Usage Effectiveness (PUE)

7. **Belady, C., et al. (2008).** "Green Grid Data Center Power Efficiency Metrics: PUE and DCiE." *The Green Grid White Paper*.

---

## Contributing

To extend or modify this module:

1. **Add new metrics:** Edit `calculate_energy_carbon_for_entries()` in `energy_analyzer.py`
2. **Add new visualizations:** Create new methods in `EnergyCarbonStatsVisualizator` class
3. **Change formulas:** Update calculation functions and document in this README
4. **Add coefficients:** Update `energy_config.json` schema and `EnergyConfig` class

---

## License

This module is part of the "Sustainable Code Refactoring with LLMs" research project.

---

## Contact

For questions or issues related to this module, please refer to the main project README or open an issue in the repository.

**Author:** Senior AI Engineer & Data Scientist
**Date:** 2025-11-01
**Version:** 1.0
