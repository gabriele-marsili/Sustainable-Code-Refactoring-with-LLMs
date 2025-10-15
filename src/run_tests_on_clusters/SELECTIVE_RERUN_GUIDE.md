# Language-Selective Re-execution Guide

**Feature:** Selective re-execution of tests for specific programming languages
**Created:** 2025-10-15
**Purpose:** Debug and fix problematic language executions (C, C++) without re-running all tests

---

## Overview

This feature allows you to selectively re-execute tests for specific programming languages while preserving valid results from other languages. This is particularly useful for:

- Debugging execution issues with specific languages (e.g., C/C++)
- Fixing Docker container configurations for problematic languages
- Re-running tests after fixing language-specific bugs
- Incremental validation improvements

## How It Works

The selective re-execution workflow:

1. **Select Languages**: Specify which languages to re-execute (e.g., `c,cpp`)
2. **Load Existing Results**: Read current results from output files
3. **Create Backup**: Automatically backup existing results before modification
4. **Execute Tests**: Run tests only for selected languages
5. **Validate Results**: Check if new results have valid metrics
6. **Merge Results**:
   - Replace old results with new **valid** results
   - Preserve old results if new results are **invalid**
7. **Generate Report**: Create detailed execution report with statistics

## Command-Line Usage

### Basic Syntax

```bash
python run_tests_on_cluster.py \
    --cluster-name <cluster> \
    --selective-rerun \
    --languages <lang1,lang2,...> \
    [--base-only | --llm-only | --full] \
    [other options...]
```

### Required Arguments

- `--cluster-name`: Specific cluster to re-execute (e.g., `raindrops`)
- `--selective-rerun`: Enable selective re-execution mode
- One of: `--base-only`, `--llm-only`, or `--full`

### Language Selection

Use `--languages` to specify which languages to re-execute:

```bash
# Re-execute only C and C++
--languages c,cpp

# Re-execute only Python
--languages python

# Re-execute all languages (default)
--languages all
```

**Supported languages:**
- `python`
- `javascript`
- `typescript`
- `java` or `Java`
- `go`
- `c`
- `cpp` (C++)
- `rust`

## Examples

### Example 1: Fix C/C++ for raindrops cluster (base code)

Based on validation reports showing C/C++ have 600+ invalid entries in the `raindrops` cluster:

```bash
cd src/run_tests_on_clusters

python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c,cpp \
    --base-only \
    --run-quantity 5
```

**What happens:**
- Loads existing `raindrops_results_{1-5}.json` files
- Creates backups: `raindrops_results_{1-5}_backup_<timestamp>.json`
- Re-executes tests for C and C++ entries only
- Merges new valid results with existing results
- Preserves results for Python, TypeScript, JavaScript, etc.

### Example 2: Fix C/C++ for LLM-generated code (all prompt versions)

```bash
python run_tests_on_cluster.py \
    --cluster-name leap \
    --selective-rerun \
    --languages c,cpp \
    --llm-only \
    --prompt-version -1 \
    --run-quantity 5
```

**What happens:**
- Processes all 4 prompt versions (v1, v2, v3, v4)
- For each version and each run (1-5):
  - Loads existing `leap_results_v{1-4}_{1-5}.json`
  - Re-executes C/C++ tests
  - Merges results
- Generates comprehensive report

### Example 3: Full re-execution (base + LLM)

```bash
python run_tests_on_cluster.py \
    --cluster-name pangram \
    --selective-rerun \
    --languages c,cpp \
    --full \
    --prompt-version 1 \
    --run-quantity 5
```

**What happens:**
- Re-executes both base code and LLM code (prompt v1)
- Processes 10 files total: 5 base + 5 LLM

## Output and Reports

### File Modifications

Original files are modified **in-place** with backups created:

```
src/execution_outputs/
├── raindrops_results_1.json              # Modified
├── raindrops_results_1_backup_1729012345.json  # Backup
├── raindrops_results_2.json              # Modified
├── raindrops_results_2_backup_1729012345.json  # Backup
...
```

### Execution Report

A detailed JSON report is saved to `--execution-report-dir`:

```
src/execution_outputs/
└── raindrops_selective_execution_1729012345.json
```

**Report structure:**
```json
{
  "cluster": "raindrops",
  "execution_timestamp": "2025-10-15 14:30:45",
  "selected_languages": ["c", "cpp"],
  "overall_statistics": {
    "total_entries_processed": 120,
    "total_new_results": 120,
    "total_preserved_results": 0
  },
  "language_reports": {
    "c": {
      "statistics": {
        "total_entries": 60,
        "executed_entries": 60,
        "successful_entries": 58,
        "failed_entries": 2
      },
      "validation": {
        "valid_new_results": 58,
        "invalid_new_results": 2,
        "preserved_old_results": 0
      },
      "errors": [...]
    },
    "cpp": {...}
  }
}
```

### Console Output

During execution, you'll see progress like:

```
================================================================================
SELECTIVE RE-EXECUTION MODE
================================================================================
Selected languages: c, cpp

Processing LLM results (prompt v1)...
  Run 1/5
    Executing tests for selected languages...
    Executed 24 entries in 45.3s
    ✓ Saved merged results: raindrops_results_v1_1.json
      Valid new: 22, Preserved old: 0, Invalid new: 2

  Run 2/5
    ...

================================================================================
                    SELECTIVE EXECUTION REPORT: raindrops
================================================================================
Execution Time: 2025-10-15 14:35:20
Selected Languages: c, cpp

Overall Statistics:
  Total Entries Processed: 120
  New Results Generated: 120
  Preserved Old Results: 0

Per-Language Breakdown:

  C:
    Total Entries: 60
    Executed: 60
    Successful: 58
    Failed: 2
    Valid New: 58
    Invalid New: 2

  CPP:
    Total Entries: 60
    Executed: 60
    Successful: 59
    Failed: 1
    Valid New: 59
    Invalid New: 1

================================================================================
SELECTIVE RE-EXECUTION COMPLETED
================================================================================
```

## Result Merging Logic

### Valid Result Replacement

New result is **valid** if:
1. All metrics are present (`CPU_usage`, `RAM_usage`, `execution_time_ms`, `regressionTestPassed`)
2. No metric is `None`
3. `execution_time_ms != 0`

If valid → **Replace old result with new result**

### Old Result Preservation

New result is **invalid** if any:
- Metric is `None`
- `execution_time_ms == 0`

If invalid → **Keep old result, log error**

### Error Tracking

All validation failures are tracked in the execution report:

```json
{
  "errors": [
    {
      "entry_id": "c_raindrops_exercism-c-user1",
      "error_type": "invalid_metrics",
      "error_message": "New result has invalid metrics, preserved old result",
      "timestamp": "2025-10-15 14:32:10"
    }
  ]
}
```

## Use Cases from Validation Reports

Based on the validation analysis in `src/validation_reports/`:

### Priority 1: Top 5 Problematic Clusters (C/C++)

```bash
# raindrops - 600 invalid entries
python run_tests_on_cluster.py --cluster-name raindrops --selective-rerun --languages c,cpp --full --prompt-version -1

# leap - 540 invalid entries
python run_tests_on_cluster.py --cluster-name leap --selective-rerun --languages c,cpp --full --prompt-version -1

# pangram - 421 invalid entries
python run_tests_on_cluster.py --cluster-name pangram --selective-rerun --languages c,cpp --full --prompt-version -1

# anagram - 210 invalid entries
python run_tests_on_cluster.py --cluster-name anagram --selective-rerun --languages cpp --full --prompt-version -1

# all_your_base - 139 invalid entries
python run_tests_on_cluster.py --cluster-name all_your_base --selective-rerun --languages cpp --full --prompt-version -1
```

### Priority 2: Fix All Clusters with C/C++ Issues

Create a script to process all 53 problematic clusters:

```bash
#!/bin/bash

# List from PROBLEMATIC_CLUSTERS.md
clusters=(
    "raindrops" "leap" "pangram" "anagram" "all_your_base"
    "allergies" "clock" "word_count" "grains" "meetup"
    # ... add remaining 43 clusters
)

for cluster in "${clusters[@]}"; do
    echo "Processing $cluster..."
    python run_tests_on_cluster.py \
        --cluster-name "$cluster" \
        --selective-rerun \
        --languages c,cpp \
        --full \
        --prompt-version -1 \
        --run-quantity 5
done
```

## Best Practices

### 1. Always Review Validation Reports First

Before using selective re-execution:

```bash
cd src/validation_reports
cat PROBLEMATIC_CLUSTERS.md | head -30
```

This tells you which clusters and languages need fixing.

### 2. Test on Single Cluster First

Before batch processing:

```bash
# Test on one cluster
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c \
    --base-only \
    --run-quantity 1
```

Verify the results look correct, then scale up.

### 3. Check Backups

Backups are created automatically with timestamps:

```bash
ls -lh src/execution_outputs/*backup*
```

To restore from backup if needed:

```bash
cp raindrops_results_1_backup_1729012345.json raindrops_results_1.json
```

### 4. Review Execution Reports

After completion:

```bash
cd src/execution_outputs
ls -lh *selective_execution*.json

# View report
cat raindrops_selective_execution_*.json | jq .
```

Look for:
- High `valid_new_results` count (good)
- Low `invalid_new_results` count (good)
- High `preserved_old_results` might indicate ongoing issues

### 5. Re-validate After Fixes

After selective re-execution, validate improvements:

```bash
cd src
python validate_execution_outputs.py
```

Compare new validation reports with old ones to measure improvement.

## Troubleshooting

### Issue: "No existing results found"

**Cause:** No output file exists yet for this cluster/run

**Solution:** Run normal execution first:
```bash
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --base-only \
    --run-quantity 5
```

Then use selective re-execution.

### Issue: All new results still invalid

**Causes:**
1. Docker container issue for that language
2. Execution timeout
3. Missing dependencies

**Debug steps:**

1. Check Docker logs:
```bash
docker ps -a
docker logs <container_id>
```

2. Test single entry manually:
```bash
# Check Dockerfile
cat src/docker/c/Dockerfile

# Rebuild without cache
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c \
    --base-only \
    --no-cache
```

3. Review execution scripts:
```bash
cat src/docker/c/run.sh
```

### Issue: "Language-selective runner module not available"

**Cause:** `language_selective_runner.py` not found

**Solution:**
```bash
cd src/run_tests_on_clusters
ls -l language_selective_runner.py

# If missing, ensure it's in the correct directory
```

## Advanced Usage

### Custom Report Directory

```bash
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c,cpp \
    --base-only \
    --execution-report-dir /path/to/custom/reports
```

### Parallel Execution (Multiple Clusters)

Create a parallel script:

```bash
#!/bin/bash

# Run 4 clusters in parallel
for cluster in raindrops leap pangram anagram; do
    (
        python run_tests_on_cluster.py \
            --cluster-name "$cluster" \
            --selective-rerun \
            --languages c,cpp \
            --full \
            --prompt-version -1 &
    )
done

wait
echo "All clusters completed"
```

## Integration with Validation System

### Workflow Integration

Complete workflow to fix C/C++ issues:

```bash
# Step 1: Validate current state
cd src
python validate_execution_outputs.py

# Step 2: Review problematic clusters
cd validation_reports
cat PROBLEMATIC_CLUSTERS.md

# Step 3: Fix Docker/execution issues (manual)
# Edit src/docker/c/Dockerfile or src/docker/cpp/Dockerfile

# Step 4: Re-execute problematic languages
cd ../run_tests_on_clusters
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c,cpp \
    --full \
    --prompt-version -1

# Step 5: Re-validate
cd ..
python validate_execution_outputs.py

# Step 6: Compare reports
diff validation_reports/VALIDATION_SUMMARY.txt \
     validation_reports_new/VALIDATION_SUMMARY.txt
```

---

## Summary

**Key Benefits:**
- ✅ Re-execute only problematic languages
- ✅ Preserve valid results for other languages
- ✅ Automatic backup before modification
- ✅ Intelligent result validation and merging
- ✅ Comprehensive error reporting
- ✅ Progress tracking during execution

**When to Use:**
- Debugging C/C++ execution issues (primary use case)
- After fixing Docker containers
- After updating execution scripts
- Incremental quality improvements

**Safety Features:**
- Automatic backups with timestamps
- Validation before replacing results
- Old result preservation when new results invalid
- Detailed error tracking

For questions or issues, refer to:
- `language_selective_runner.py` - Implementation details
- `src/validation_reports/README.md` - Validation documentation
- `src/validation_reports/PROBLEMATIC_CLUSTERS.md` - List of clusters needing attention
