# Energy-Efficient Pattern Analysis System

## Overview

This system performs comprehensive analysis of energy-efficient code patterns introduced by LLMs, correlating pattern presence with performance improvements across multiple programming languages.

**Key Capabilities**:
- ✅ Detects 80+ energy-efficient code patterns from scientific literature
- ✅ Analyzes AST complexity changes (cyclomatic complexity, nesting depth, function count)
- ✅ Computes statistical correlations between patterns and performance improvements
- ✅ Generates publication-grade visualizations
- ✅ Supports 5 programming languages: Python, JavaScript/TypeScript, Java, C/C++, Go
- ✅ Produces comprehensive markdown reports with findings

## System Architecture

```
Unified Pattern Analyzer
├── EnergyPatternDetector     → Detects 80+ patterns from literature
├── ASTAnalyzer               → Analyzes code structure complexity
├── UnifiedPatternAnalyzer    → Main orchestrator
└── PatternVisualizer         → Creates 7 visualization types
```

### Data Flow

```
1. Load cluster metadata → 2. Calculate similarity/improvement → 3. Select clusters
                                    ↓
   (similarity < 75% AND improvement ≥ 15%)
                                    ↓
4. Detect patterns in base vs LLM code → 5. Load performance data
                                    ↓
6. Compute correlations → 7. Generate visualizations → 8. Create report
```

## Installation

### Requirements

```bash
pip install numpy pandas matplotlib seaborn scikit-learn
```

**Python Version**: 3.8+

### File Structure

Ensure the following directory structure exists:

```
src/
├── clusters/                          # Input: Cluster metadata JSON files
│   └── cluster_{name}.json
├── execution_outputs/                 # Input: Performance metrics
│   ├── {cluster}_results_{1-5}.json           # Base code runs
│   └── {cluster}_results_v{1-4}_{1-5}.json    # LLM code runs
├── dataset/                           # Input: Source code files
│   ├── python/
│   ├── javascript/
│   ├── java/
│   ├── cpp/
│   └── go/
└── metrics/patterns/
    ├── unified_pattern_analyzer.py    # Main analysis system
    ├── pattern_visualizator.py        # Visualization system
    ├── ENERGY_EFFICIENT_PATTERNS_LITERATURE.md  # Pattern documentation
    └── outputs/                       # Output directory (auto-created)
        ├── visualizations/
        ├── statistics/
        ├── reports/
        └── exports/
```

## Usage

### Basic Usage

Run complete analysis with default thresholds:

```bash
cd src/metrics/patterns
python unified_pattern_analyzer.py
```

**Default Thresholds**:
- Similarity threshold: 75% (clusters with similarity < 75% are selected)
- Improvement threshold: 15% (clusters with improvement ≥ 15% are selected)

### Custom Thresholds

```bash
python unified_pattern_analyzer.py --similarity-threshold 80.0 --improvement-threshold 20.0
```

**Selection Logic**: Clusters are selected if they meet BOTH criteria:
- `avg_similarity < similarity_threshold` (low similarity = significant code changes)
- `overall_improvement >= improvement_threshold` (high improvement = better performance)

### Python API Usage

```python
from pathlib import Path
from unified_pattern_analyzer import UnifiedPatternAnalyzer

# Initialize analyzer
analyzer = UnifiedPatternAnalyzer(
    cluster_dir=Path("../../clusters"),
    dataset_dir=Path("../../dataset"),
    execution_dir=Path("../../execution_outputs"),
    output_dir=Path("./outputs"),
    similarity_threshold=75.0,
    improvement_threshold=15.0
)

# Run complete analysis
results = analyzer.run_complete_analysis()

# Access results
print(f"Selected {len(results['selected_clusters'])} clusters for analysis")
print(f"Detected {len(results['pattern_stats']['pattern_frequencies'])} unique patterns")
print(f"Found {len(results['correlations'])} significant correlations")
```

## Output Files

### 1. Visualizations (`outputs/visualizations/`)

| File | Description | Type |
|------|-------------|------|
| `cluster_selection_analysis.png` | Scatter plot of similarity vs improvement showing selection criteria | Scatter plot |
| `pattern_frequencies.png` | Top 20 most frequent patterns color-coded by category | Horizontal bar chart |
| `pattern_categories.png` | Distribution of patterns across 5 categories | Pie + bar chart |
| `patterns_by_language.png` | Heatmap of pattern distribution across languages | Heatmap |
| `energy_impact_distribution.png` | Distribution of patterns by energy impact level (high/medium/low) | Bar chart |
| `correlation_heatmap.png` | Pattern-performance correlation matrix | Heatmap |
| `ast_complexity_analysis.png` | AST metrics changes (complexity, depth, function count) | 4-panel histogram |

### 2. Statistics (`outputs/statistics/`)

**`pattern_statistics.json`**: Pattern frequency and distribution data
```json
{
  "pattern_frequencies": {"python_list_comprehension": 45, ...},
  "by_category": {"algorithmic": 120, "syntax": 89, ...},
  "by_language": {
    "python": {"python_list_comprehension": 45, ...},
    "javascript": {"js_arrow_function": 32, ...}
  },
  "by_impact": {"high": 87, "medium": 156, "low": 234}
}
```

**`correlations.json`**: Pattern-performance correlation analysis
```json
[
  {
    "pattern": "python_list_comprehension",
    "metric": "execution_time_ms",
    "correlation": -0.67,
    "p_value": 0.0023,
    "significance": "***",
    "occurrences": 45,
    "impact": "medium",
    "category": "syntax"
  }
]
```

**Correlation Interpretation**:
- **Negative correlation** (e.g., -0.67): Pattern presence → lower metric value (GOOD for CPU/RAM/time)
- **Positive correlation** (e.g., +0.42): Pattern presence → higher metric value (BAD for CPU/RAM/time)
- **Significance levels**: `***` (p<0.001), `**` (p<0.01), `*` (p<0.05)
- **Minimum occurrences**: 3 (patterns with <3 occurrences are excluded)

### 3. Reports (`outputs/reports/`)

**`pattern_analysis_report.md`**: Comprehensive markdown report with:
- Executive summary
- Selection criteria and selected clusters
- Pattern detection results by category
- Statistical correlation findings
- Language-specific insights
- Recommendations for energy-efficient coding

### 4. Exports (`outputs/exports/`)

**`selected_clusters_metadata.json`**: Metadata for all selected clusters
```json
{
  "cluster_name": "accumulate",
  "avg_similarity": 68.3,
  "overall_improvement": 22.5,
  "selected_for_analysis": true,
  "entries_count": 12,
  "languages": ["python", "java", "javascript"]
}
```

**`entry_comparisons.csv`**: Detailed per-entry comparison data
```csv
cluster,entry_id,language,similarity,base_patterns,llm_patterns,new_patterns,ast_complexity_change,improvement_cpu,improvement_ram,improvement_time
accumulate,abc123,python,67.2,"loop,manual_iteration","list_comprehension,builtin_sum","list_comprehension,builtin_sum",-2,-18.3,-12.5,-21.4
```

## Pattern Detection

### Pattern Categories

The system detects patterns across 5 categories:

1. **Algorithmic** (High Impact: >30% energy reduction)
   - Complexity reduction (O(n²) → O(n log n))
   - Memoization/caching
   - Lazy evaluation
   - NumPy vectorization (Python)

2. **Syntax** (Low-Medium Impact: <15% energy reduction)
   - List/dict comprehensions (Python)
   - Arrow functions (JavaScript)
   - Lambda expressions (Java)
   - f-strings (Python)
   - Template literals (JavaScript)

3. **Memory Management** (Medium-High Impact: 15-40% reduction)
   - Smart pointers (C++)
   - Object pooling
   - Pre-allocation
   - Move semantics (C++)

4. **Control Flow** (Medium Impact: 10-25% reduction)
   - Early returns/guard clauses
   - Loop optimizations
   - Loop invariant code motion

5. **Concurrency** (Medium-High Impact: 20-40% reduction)
   - Async/await (JavaScript)
   - Goroutines (Go)
   - Parallel streams (Java)

### Language-Specific Patterns

**Python** (25 patterns):
- List/dict/set comprehensions
- Generator expressions
- Built-in functions (sum, min, max, any, all)
- f-strings
- enumerate/zip
- NumPy vectorization
- Caching decorators (@lru_cache)

**JavaScript/TypeScript** (18 patterns):
- Arrow functions
- Array methods (map, filter, reduce)
- Template literals
- Spread operator
- Destructuring
- Async/await
- Optional chaining

**Java** (15 patterns):
- Streams API
- Lambda expressions
- Method references
- Optional
- StringBuilder
- Switch expressions

**C/C++** (20 patterns):
- Smart pointers
- Move semantics
- const correctness
- Range-based for loops
- constexpr
- Inline functions
- Auto type deduction

**Go** (12 patterns):
- Goroutines
- Channels
- Defer statements
- Short variable declaration (:=)
- Interface-based polymorphism

## AST Analysis

### Metrics Computed

For **Python** code (full AST analysis):
- **Cyclomatic Complexity**: Number of independent paths through code
- **Nesting Depth**: Maximum nesting level of control structures
- **Function Count**: Number of function/method definitions

For **other languages** (heuristic analysis):
- Line-based complexity estimation
- Brace-depth calculation
- Function/method counting via regex

### Interpretation

**Complexity Change**:
- Negative values: Code simplification (GOOD)
- Positive values: Code complexity increase (may be BAD)

**Depth Change**:
- Negative values: Reduced nesting (GOOD for readability/performance)
- Positive values: Increased nesting (may impact performance)

**Function Count Change**:
- Positive values: Code modularization (GOOD for maintainability)
- Negative values: Function inlining (may improve performance)

## Statistical Analysis

### Correlation Metrics

The system computes **Pearson correlation coefficients** between:
- Pattern presence (binary: 0/1)
- Performance improvement percentage

**Formula**: `r = cov(X, Y) / (σ_X * σ_Y)`

**Interpretation Guidelines**:
| |r| range | Interpretation |
|-----------|----------------|
| 0.0-0.3   | Weak correlation |
| 0.3-0.6   | Moderate correlation |
| 0.6-0.8   | Strong correlation |
| 0.8-1.0   | Very strong correlation |

**Significance Levels**:
- `***`: p < 0.001 (highly significant)
- `**`: p < 0.01 (significant)
- `*`: p < 0.05 (marginally significant)

### Filtering Criteria

Correlations are filtered to ensure reliability:
1. **Minimum occurrences**: Pattern must appear in ≥3 entries
2. **Statistical significance**: p-value < 0.05
3. **Non-zero variance**: Both pattern presence and improvement must vary

## Example Workflow

### Scenario: Analyzing Improvement Patterns

**Goal**: Identify which patterns correlate most strongly with CPU usage reduction

**Steps**:

1. **Run analysis**:
```bash
python unified_pattern_analyzer.py --similarity-threshold 70 --improvement-threshold 10
```

2. **Check selection results**:
```
INFO - Selected 47 clusters for analysis (similarity < 70%, improvement ≥ 10%)
INFO - Total entries to analyze: 342
```

3. **Review pattern detection**:
```
INFO - Detected 1,234 total pattern matches
INFO - Top patterns: python_list_comprehension (67), js_arrow_function (54), java_streams (42)
```

4. **Examine correlations** (from `correlations.json`):
```json
[
  {
    "pattern": "python_list_comprehension",
    "metric": "CPU_usage",
    "correlation": -0.72,
    "p_value": 0.0001,
    "significance": "***",
    "occurrences": 67,
    "interpretation": "Strong negative correlation: Pattern presence strongly associated with CPU reduction"
  }
]
```

5. **Visualize results**: Check `outputs/visualizations/correlation_heatmap.png`

6. **Read findings**: Review `outputs/reports/pattern_analysis_report.md`

## Troubleshooting

### Common Issues

**Issue**: `FileNotFoundError: cluster_*.json not found`
- **Cause**: Cluster directory path incorrect
- **Solution**: Verify `cluster_dir` points to directory containing `cluster_{name}.json` files

**Issue**: `No clusters selected for analysis`
- **Cause**: Thresholds too strict, no clusters meet criteria
- **Solution**: Lower thresholds (e.g., `--similarity-threshold 85 --improvement-threshold 5`)

**Issue**: `KeyError: 'CPU_usage' in performance data`
- **Cause**: Execution output files missing or malformed
- **Solution**: Ensure `execution_outputs/` contains properly formatted JSON with metrics:
  ```json
  {
    "CPU_usage": 45.2,
    "RAM_usage": 128.5,
    "execution_time_ms": 234,
    "regressionTestPassed": true
  }
  ```

**Issue**: `No significant correlations found`
- **Cause**: Insufficient data or weak pattern-performance relationship
- **Solution**:
  - Increase dataset size
  - Lower p-value threshold (modify code: `SIGNIFICANCE_THRESHOLD = 0.10`)
  - Check that performance improvements are actually present

**Issue**: `ImportError: No module named 'sklearn'`
- **Cause**: Missing scikit-learn dependency
- **Solution**: `pip install scikit-learn`

### Debugging

Enable verbose logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)

analyzer = UnifiedPatternAnalyzer(...)
results = analyzer.run_complete_analysis()
```

Check intermediate outputs:
```python
# After step 1: cluster selection
print(f"Loaded {len(analyzer.cluster_analyses)} clusters")
print(f"Selected {sum(1 for c in analyzer.cluster_analyses if c.selected_for_analysis)} for analysis")

# After step 2: pattern detection
print(f"Analyzed {len(analyzer.entry_comparisons)} entries")
print(f"Total pattern matches: {sum(len(e.llm_patterns) for e in analyzer.entry_comparisons)}")

# After step 3: statistics
print(f"Pattern stats: {analyzer.pattern_stats}")
```

## Performance Considerations

**Execution Time**:
- Small dataset (<50 clusters): ~1-2 minutes
- Medium dataset (50-200 clusters): ~5-10 minutes
- Large dataset (>200 clusters): ~15-30 minutes

**Memory Usage**:
- Python AST parsing is memory-intensive
- Expect ~2-4 GB RAM for large datasets

**Optimization Tips**:
1. Filter clusters early with strict thresholds
2. Process languages separately if needed
3. Disable AST analysis for non-Python languages if speed is critical

## Scientific References

This system implements pattern detection based on peer-reviewed literature:

1. **Pereira, R., et al. (2017)**. "Energy Efficiency across Programming Languages: How Do Energy, Time, and Memory Relate?" *SLE 2017*.
   - Basis for language-specific energy impact estimates

2. **Pinto, G., & Castor, F. (2017)**. "Energy Efficiency: A New Concern for Application Software Developers." *CACM*.
   - Foundation for algorithmic pattern categorization

3. **Hindle, A. (2012)**. "Green Mining: A Methodology of Relating Software Change to Power Consumption." *MSR 2012*.
   - Methodology for correlating code changes with energy impact

4. **Georgiou, S., et al. (2018)**. "Analyzing Programming Languages' Energy Consumption." *Software: Practice and Experience*.
   - Cross-language performance comparison framework

See `ENERGY_EFFICIENT_PATTERNS_LITERATURE.md` for complete references and pattern documentation.

## Contributing

To add new patterns:

1. Add pattern definition to `EnergyPatternDetector._initialize_patterns()`:
```python
"new_pattern_name": {
    "regex": r"pattern_regex_here",
    "category": "algorithmic|syntax|memory|control_flow|concurrency",
    "impact": "high|medium|low",
    "description": "Pattern description",
    "language": "python|javascript|java|cpp|go|generic"
}
```

2. Update `ENERGY_EFFICIENT_PATTERNS_LITERATURE.md` with literature reference

3. Test on sample dataset:
```python
detector = EnergyPatternDetector()
matches = detector.detect_patterns(code_snippet, "python")
print([m.pattern_name for m in matches if "new_pattern" in m.pattern_name])
```

## License

This analysis system is part of a research thesis project. For academic use, please cite:

```
[Your Name] (2025). "Sustainable Code Refactoring with Large Language Models:
An Analysis of Energy-Efficient Pattern Introduction." Master's Thesis,
University of Pisa.
```

## Support

For questions or issues:
1. Check this README
2. Review `ENERGY_EFFICIENT_PATTERNS_LITERATURE.md`
3. Examine example outputs in `outputs/` directory
4. Contact thesis advisor or repository maintainer

---

**Version**: 1.0
**Last Updated**: 2025-01-18
**Tested With**: Python 3.8-3.12, pandas 2.0+, matplotlib 3.7+
