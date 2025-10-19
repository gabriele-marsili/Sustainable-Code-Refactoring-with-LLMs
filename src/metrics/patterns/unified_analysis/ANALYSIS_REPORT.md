# Unified Pattern Analysis Report

**Generated**: 2025-10-18 18:23:41

## Executive Summary

- **Total Clusters Analyzed**: 381
- **Clusters Selected**: 248 (65.1%)
- **Selection Criteria**:
  - Similarity < 75.0%
  - Improvement ≥ 15.0%
- **Code Pairs Analyzed**: 19660
- **Unique Patterns Detected**: 47
- **Total Pattern Occurrences**: 13363

## Methodology

### Pattern Detection
Energy-efficient patterns detected based on scientific literature:
- Pereira et al. (2017): Energy Efficiency across Programming Languages
- Pinto & Castor (2017): Energy-Aware Software Engineering
- Hindle (2012): Green Mining and Power Consumption

### Pattern Categories
1. **Algorithmic**: Complexity reduction, memoization, vectorization
2. **Syntax**: Modern language features (comprehensions, lambdas, etc.)
3. **Memory**: Smart pointers, object pooling, pre-allocation
4. **Control Flow**: Early returns, guard clauses
5. **Concurrency**: Async/await, goroutines, parallel streams

## Selected Clusters

| Cluster | Improvement (%) | Similarity (%) | Entries | Top Patterns |
|---------|-----------------|----------------|---------|--------------|
| knapsack | 98.5 | 55.5 | 2 | extraction, make, return |
| savings_account | 98.1 | 66.4 | 1 | None |
| parallel_letter_frequency | 97.7 | 74.9 | 2 | defer |
| wordy | 97.6 | 70.4 | 6 | check, clause, extraction |
| parsing_log_files | 97.6 | 63.3 | 2 | make, goroutine, defer |
| minesweeper | 97.4 | 65.7 | 11 | return, clause, map |
| largest_series_product | 97.1 | 63.8 | 6 | make, declaration, range |
| palindrome_products | 97.1 | 71.2 | 9 | return, clause, extraction |
| welcome_to_tech_palace | 97.1 | 66.2 | 3 | range, make |
| grep | 97.1 | 70.3 | 3 | make, defer, goroutine |
| yacht | 97.0 | 47.7 | 3 | make, range, declaration |
| party_robot | 97.0 | 70.7 | 3 | declaration |
| ledger | 97.0 | 70.9 | 3 | None |
| change | 97.0 | 47.8 | 3 | make, range, declaration |
| state_of_tic_tac_toe | 96.9 | 73.2 | 1 | make |
| resistor_color_trio | 96.6 | 71.0 | 6 | destructuring, extraction, return |
| variable_length_quantity | 96.6 | 66.2 | 4 | make, clause, extraction |
| book_store | 96.6 | 43.5 | 2 | range, declaration, make |
| tree_building | 96.5 | 71.3 | 2 | make, check |
| zebra_puzzle | 96.5 | 50.7 | 2 | declaration, range, make |

## Pattern Statistics

### Top 15 Most Frequent Patterns

| Rank | Pattern | Frequency | Category | Energy Impact |
|------|---------|-----------|----------|---------------|
| 1 | generic_guard_clause | 2250 | control_flow | medium |
| 2 | generic_constant_extraction | 2208 | memory | low |
| 3 | generic_early_return | 2157 | control_flow | medium |
| 4 | go_make | 855 | memory | medium |
| 5 | js_arrow_function | 629 | syntax | low |
| 6 | cpp_const_correctness | 542 | syntax | low |
| 7 | js_for_of | 540 | syntax | low |
| 8 | generic_null_check | 391 | control_flow | low |
| 9 | go_range | 352 | syntax | low |
| 10 | js_spread_operator | 342 | syntax | medium |
| 11 | go_short_declaration | 320 | syntax | low |
| 12 | cpp_range_for | 304 | syntax | low |
| 13 | js_array_map | 303 | algorithmic | medium |
| 14 | js_array_filter | 237 | algorithmic | medium |
| 15 | js_destructuring | 177 | syntax | low |

### Distribution by Category

- **Control_flow**: 4858 occurrences
- **Syntax**: 4099 occurrences
- **Memory**: 3340 occurrences
- **Algorithmic**: 1055 occurrences
- **Concurrency**: 11 occurrences

### Distribution by Energy Impact

- **High Impact**: 419 (3.1%)
- **Medium Impact**: 6697 (50.1%)
- **Low Impact**: 6247 (46.7%)

## Statistical Correlation Analysis

- **Total Patterns Analyzed**: 44
- **Statistically Significant** (p < 0.05): 31
- **Positive Correlations** (r > 0.2): 0
- **Negative Correlations** (r < -0.2): 0

### Top Positive Correlations
(Patterns associated with performance improvement)

| Pattern | Correlation | p-value | Frequency | Impact |
|---------|-------------|---------|-----------|--------|

## Key Findings

### High-Impact Patterns (>30% energy reduction)

- **cpp_constexpr**: 103 occurrences - Compile-time computation
- **python_generator_expression**: 99 occurrences - Generator for lazy evaluation
- **java_stringbuilder**: 73 occurrences - StringBuilder for concatenation
- **generic_memoization**: 62 occurrences - Memoization/caching
- **java_streams**: 49 occurrences - Java Streams API

## Recommendations

### For Code Optimization


### For LLM Training/Prompting
- Focus on clusters with similarity < 75.0% and improvement > 15.0%
- Encourage high-impact algorithmic patterns (memoization, vectorization, complexity reduction)
- Promote modern language-specific idioms that show consistent positive correlations

## Visualizations Generated
- `cluster_selection_analysis.png`: Cluster selection criteria visualization
- `pattern_frequencies.png`: Top 20 pattern frequency distribution
- `pattern_categories.png`: Pattern distribution by category
- `patterns_by_language.png`: Language-specific pattern heatmap
- `energy_impact_distribution.png`: Distribution by energy impact level
- `ast_complexity_analysis.png`: AST metric changes analysis

## Data Files
- `pattern_statistics.json`: Complete pattern statistics
- `correlations.json`: Pattern-performance correlations
- `selected_clusters.json`: Details of selected clusters
- `entry_comparisons.csv`: Full comparison data

---
*Report generated by Unified Pattern Analyzer v1.0*
*2025-10-18 18:23:41*