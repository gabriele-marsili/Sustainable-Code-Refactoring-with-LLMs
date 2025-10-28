# Unified Analyzer - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### 1. Test the Installation

```bash
# Navigate to src directory
cd src

# Run type handling test
python unified_analyzer/test_type_handling.py

# Run root cause analyzer test
python unified_analyzer/test_root_cause.py
```

Expected output:
```
✓ String to float conversion works
✓ Numeric types handled correctly
✓ Zero values detected properly
✓ None values handled
✓ Invalid strings converted to None

✓ RootCause enum is correct
✓ EXECUTION_FAILED correctly in AnomalyType only
✓ RootCauseAnalyzer works without errors
✓ All anomaly types can be analyzed
```

### 2. Run Your First Analysis

```bash
# Quick scan of all clusters (fast, no log analysis)
python unified_analyzer/main.py --quick
```

This will:
- Load all execution results
- Detect invalid values and missing metrics
- Print summary to console
- Take ~10-30 seconds depending on data size

### 3. View Examples

```bash
# Run 6 complete examples
python unified_analyzer/example_usage.py
```

This demonstrates all major features with real data.

### 4. Deep Analysis on Specific Cluster

```bash
# Full analysis with root cause on one cluster
python unified_analyzer/main.py \
  --clusters contains_duplicate \
  --root-cause \
  --verbose \
  --export json csv
```

This will:
- Analyze only the `contains_duplicate` cluster
- Perform root cause analysis (test vs code distinction)
- Show verbose output
- Export results to JSON and CSV

---

## 📋 Common Use Cases

### Use Case 1: Find All Invalid Entries
```bash
python unified_analyzer/main.py --modes invalid missing --export csv
```
**Output**: CSV file with all entries that have invalid or missing metrics

### Use Case 2: Detect Outliers
```bash
python unified_analyzer/main.py --modes outliers --outlier-threshold 300
```
**Output**: Console report of entries with extreme values (>300% deviation)

### Use Case 3: Debug C++ Test Failures
```bash
python unified_analyzer/main.py \
  --root-cause \
  --modes invalid missing \
  --export markdown
```
**Output**: Markdown report with root causes (distinguishing test suite errors from code bugs)

### Use Case 4: Generate Full Report
```bash
python unified_analyzer/main.py \
  --root-cause \
  --export json csv markdown text \
  --output-dir ./my_reports
```
**Output**: Complete report in 4 formats saved to `./my_reports/`

### Use Case 5: Analyze Only LLM Results
```bash
python unified_analyzer/main.py --test-type llm --root-cause
```
**Output**: Analysis focused on LLM-generated code results

---

## 🔧 Configuration Options

### Analysis Modes
- `--modes invalid`: Only detect invalid values (≤0 or None)
- `--modes missing`: Only detect missing metrics
- `--modes outliers`: Only detect extreme values
- `--modes all`: Run all analyses (default)

### Test Types
- `--test-type base`: Only analyze base code results
- `--test-type llm`: Only analyze LLM-generated code results
- `--test-type both`: Analyze both (default)

### Root Cause Analysis
- `--root-cause`: Enable deep analysis (slower but detailed)
- `--quick`: Fast scan mode (no log analysis)

### Export Formats
- `--export json`: Structured report for automation
- `--export csv`: Table for Excel/Pandas
- `--export markdown`: Human-readable documentation
- `--export text`: Plain text summary

### Other Options
- `--clusters NAME1 NAME2`: Analyze specific clusters only
- `--outlier-threshold PCT`: Custom outlier threshold (default: 500%)
- `--output-dir PATH`: Custom output directory
- `--verbose`: Detailed logging

---

## 📊 Understanding the Output

### Console Summary
```
================================================================================
UNIFIED ANALYZER - ANALYSIS SUMMARY
================================================================================
Total Entries Analyzed: 1,248
Total Anomalies Detected: 87
Anomaly Rate: 6.97%

Severity Breakdown:
  Critical   :    22 anomalies  ← Entries with all metrics invalid
  High       :    34 anomalies  ← Multiple issues or test failures
  Medium     :    21 anomalies  ← Single metric issues
  Low        :    10 anomalies  ← Minor outliers

Top Root Causes:
  Test Suite Error      :    28  ← Errors in test files
  Code Bug              :    22  ← Errors in code under test
  Compilation Error     :    15  ← Build failures
```

### JSON Export Structure
```json
{
  "analysis_timestamp": "2025-10-26T15:30:45",
  "total_entries_analyzed": 1248,
  "total_anomalies": 87,
  "anomalies": [
    {
      "anomaly_id": "ANM-20251026-0001",
      "entry": { /* execution entry details */ },
      "anomaly_type": "invalid_value",
      "severity": "high",
      "detected_issues": ["CPU_usage = 0", "RAM_usage = 0"],
      "probable_causes": ["test_suite_error"],
      "recommended_actions": [
        "Review test suite configuration",
        "Check test file paths"
      ]
    }
  ]
}
```

### CSV Export Columns
- `anomaly_id`: Unique identifier
- `cluster_name`: Cluster affected
- `entry_id`: Specific entry
- `language`: Programming language
- `anomaly_type`: Type of anomaly
- `severity`: CRITICAL, HIGH, MEDIUM, LOW
- `primary_root_cause`: Most likely cause
- `recommendations`: Suggested actions

---

## 🔍 Interpreting Root Causes

### Test Suite Error
**Meaning**: Problem in the test files/configuration
**Action**: Review test suite, check CMakeLists.txt, verify test framework setup

### Code Bug
**Meaning**: Problem in the code being tested
**Action**: Review code implementation, fix logic errors, check for edge cases

### Compilation Error
**Meaning**: Code or test doesn't compile
**Action**: Fix syntax errors, add missing includes, resolve link errors

### Runtime Crash
**Meaning**: Segmentation fault, nullptr, exception
**Action**: Check array bounds, memory access, null pointer handling

### Metrics Collection Failure
**Meaning**: Test passed but metrics are 0
**Action**: Verify metrics collection script, check process monitoring tools

### Unknown
**Meaning**: Unable to determine cause automatically
**Action**: Manual inspection required, check logs

---

## 🐛 Troubleshooting

### "No execution entries found"
**Problem**: No data loaded
**Solution**:
```bash
# Check if output files exist
ls src/execution_outputs/*.json

# Verify cluster files
ls src/clusters/cluster_*.json
```

### "TypeError: '>' not supported"
**Problem**: Metrics stored as strings
**Solution**: Already fixed in v1.0.1! Update to latest version.

### "Could not load log file"
**Problem**: Log files too large or missing
**Solution**: Use `--quick` mode or increase `max_log_size_mb` in config

### Analysis is slow
**Problem**: Root cause analysis on many entries
**Solutions**:
- Use `--quick` for fast scan
- Analyze specific clusters: `--clusters NAME1 NAME2`
- Skip root cause: remove `--root-cause` flag

### Unexpected anomaly counts
**Problem**: Threshold might be too sensitive/permissive
**Solutions**:
- Adjust outlier threshold: `--outlier-threshold 300`
- Check specific cluster: `--clusters CLUSTER_NAME --verbose`

---

## 📚 Next Steps

1. **Review Results**: Check the generated reports for your data
2. **Tune Thresholds**: Adjust `--outlier-threshold` based on your needs
3. **Integrate**: Add to your workflow after test execution
4. **Extend**: Add custom error patterns in `log_analyzer.py`

## 💡 Tips

- Start with `--quick` to get a feel for the data
- Use `--verbose` when debugging specific issues
- Export to CSV for easy filtering in Excel
- Combine with `grep` to find specific patterns:
  ```bash
  python unified_analyzer/main.py --export csv
  grep "test_suite_error" analysis_report_*.csv
  ```

---

## 📖 More Information

- **Full Documentation**: See `README.md`
- **Integration Guide**: See `INTEGRATION_GUIDE.md`
- **Examples**: See `example_usage.py`
- **Changelog**: See `CHANGELOG.md`
