# Language-Selective Re-execution - Quick Reference

## Basic Command

```bash
python run_tests_on_cluster.py \
    --cluster-name <cluster> \
    --selective-rerun \
    --languages <lang1,lang2> \
    [--base-only | --llm-only | --full] \
    --run-quantity 5
```

## Common Use Cases

### Fix C/C++ in one cluster (base code)
```bash
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c,cpp \
    --base-only \
    --run-quantity 5
```

### Fix C/C++ for all LLM versions
```bash
python run_tests_on_cluster.py \
    --cluster-name leap \
    --selective-rerun \
    --languages c,cpp \
    --llm-only \
    --prompt-version -1 \
    --run-quantity 5
```

### Fix C/C++ for everything (base + LLM)
```bash
python run_tests_on_cluster.py \
    --cluster-name pangram \
    --selective-rerun \
    --languages c,cpp \
    --full \
    --prompt-version -1 \
    --run-quantity 5
```

### Batch process top 10 clusters
```bash
./fix_c_cpp_clusters.sh
```

## Supported Languages

`python`, `javascript`, `typescript`, `java`, `Java`, `go`, `c`, `cpp`, `rust`

## What It Does

1. ✅ Loads existing result files
2. ✅ Creates automatic backups
3. ✅ Re-executes tests for selected languages only
4. ✅ Validates new results
5. ✅ Replaces old results with new **valid** results
6. ✅ Preserves old results if new results **invalid**
7. ✅ Generates detailed execution report

## Important Notes

- ⚠️ Requires existing result files (run normal execution first if needed)
- ✅ Automatic backups created: `<filename>_backup_<timestamp>.json`
- ✅ Safe: Invalid new results don't replace valid old results
- ✅ Progress shown in real-time

## Files

- **Implementation:** `language_selective_runner.py`
- **Main script:** `run_tests_on_cluster.py`
- **Documentation:** `SELECTIVE_RERUN_GUIDE.md`
- **Automation:** `fix_c_cpp_clusters.sh`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

## Quick Workflow

```bash
# 1. Validate current state
cd src
python validate_execution_outputs.py

# 2. Check problematic clusters
cat validation_reports/PROBLEMATIC_CLUSTERS.md | head -20

# 3. Fix one cluster
cd run_tests_on_clusters
python run_tests_on_cluster.py \
    --cluster-name raindrops \
    --selective-rerun \
    --languages c,cpp \
    --full \
    --prompt-version -1

# 4. Re-validate
cd ..
python validate_execution_outputs.py

# 5. Compare improvements
diff validation_reports/VALIDATION_SUMMARY.txt <old_summary>
```

## Getting Help

```bash
# Show all options
python run_tests_on_cluster.py --help

# Read full documentation
cat SELECTIVE_RERUN_GUIDE.md

# View implementation details
cat IMPLEMENTATION_SUMMARY.md
```

## Troubleshooting

### "No existing results found"
→ Run normal execution first:
```bash
python run_tests_on_cluster.py --cluster-name <cluster> --base-only
```

### Still getting invalid results
→ Check Docker configuration:
```bash
cat ../docker/c/Dockerfile
cat ../docker/cpp/Dockerfile
```

### Restore from backup
```bash
cp <file>_backup_<timestamp>.json <file>.json
```

---

**Quick tip:** Start with a single cluster and `--run-quantity 1` to test, then scale up.
