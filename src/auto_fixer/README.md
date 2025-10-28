# AutoFixer - Automatic Error Detection and Resolution System

## Overview

**AutoFixer** automatically detects, classifies, and resolves execution errors in the Sustainable Code Refactoring project. It integrates with **Unified Analyzer** for error detection and **ClusterRunner** for selective re-execution.

## Quick Start

```bash
cd src

# Basic usage: Analyze and report
python auto_fixer/main.py

# Apply automatic fixes
python auto_fixer/main.py --apply-fixes

# Full workflow: detect → fix → re-execute
python auto_fixer/main.py --apply-fixes --reexecute

# Export reports
python auto_fixer/main.py --export json csv markdown
```

## Architecture

```
AutoFixer Workflow:
1. Unified Analyzer → Detect anomalies
2. Error Classifier → Classify fixable vs unfixable
3. Environment Fixer → Apply automatic fixes
4. Execution Selector → Identify entries to re-run
5. Cluster Runner → Selective re-execution
6. Fix Reporter → Generate reports
```

## Key Features

### ✅ Automated Error Detection
- Integrates with Unified Analyzer
- Analyzes metrics and test results
- Performs root cause analysis

### 🎯 Intelligent Classification

**Fixable (Environment/Infrastructure):**
- Docker errors
- Metrics collection failures
- Configuration issues

**Unfixable (Code-level):**
- Code bugs (implementation errors)
- Test suite errors
- Compilation errors
- Runtime crashes
- Assertion failures

### ⚡ Selective Re-execution

**NEW**: Only re-runs problematic entries using `entry_ids_filter` parameter.

```python
# ClusterRunner with selective execution
runner.run_cluster_tests(
    cluster_path=cluster_path,
    base_only=True,
    entry_ids_filter=["entry_001", "entry_003"],  # Only these entries
    overwrite_results=True
)
```

Benefits:
- Preserves existing valid results
- Significantly reduces re-execution time
- Surgical precision for error fixing

### 📊 Comprehensive Reporting

Export formats:
- **JSON**: Machine-readable structured data
- **CSV**: Easy filtering in spreadsheet tools (with is_code_issue, is_test_issue flags)
- **Markdown**: Human-readable formatted reports
- **Console**: Real-time progress summaries

## Error Classification

### Fixable Categories

| Category | Description | Fix Action |
|----------|-------------|------------|
| `DOCKER_ERROR` | Container issues | Restart Docker, rebuild container |
| `METRICS_COLLECTION` | Metrics = 0 | Recalibrate metrics |
| `CONFIGURATION_ERROR` | Config file issues | Restore/regenerate config |

### Unfixable Categories

| Category | Description | Recommendation |
|----------|-------------|----------------|
| `CODE_BUG` | Logic error in implementation | **REMOVE** from dataset |
| `TEST_SUITE_ERROR` | Test configuration wrong | **FIX** test suite |
| `COMPILATION_ERROR` | Syntax/type errors | **FIX** code |
| `RUNTIME_CRASH` | Code crashes | **REVIEW** implementation |
| `ASSERTION_FAILURE` | Test assertions fail | **REVIEW** expectations |

## Usage Examples

### Basic Usage

```bash
# Analyze specific clusters
python auto_fixer/main.py --clusters contains_duplicate palindrome

# Dry run (simulate without executing)
python auto_fixer/main.py --apply-fixes --dry-run

# Verbose output for debugging
python auto_fixer/main.py --verbose
```

### Programmatic Usage

```python
from auto_fixer.main import AutoFixer

# Initialize
fixer = AutoFixer(
    dry_run=False,
    verbose=True,
    output_dir="./reports"
)

# Run complete workflow
report = fixer.run_complete_workflow(
    cluster_names=None,    # None = all clusters
    apply_fixes=True,
    reexecute=True
)

# Access results
print(f"Total errors: {report.total_errors_analyzed}")
print(f"Fixable: {report.fixable_errors}")
print(f"Code issues: {len(report.code_issues_for_review)}")
```

### Get Code Issues for Review

```python
# Get code issues that need manual review
code_issues = fixer.get_code_issues_for_review(classified_errors)

for cluster_name, errors in code_issues.items():
    print(f"\nCluster: {cluster_name}")
    for error in errors:
        print(f"  Entry: {error.entry_id}")
        print(f"  Code: {error.code_file_path}")
        print(f"  Test: {error.test_file_path}")
        if error.category.value == "code_bug":
            print(f"  → CONSIDER REMOVING")
```

## Module Documentation

### 1. ErrorClassifier

Classifies anomalies into fixable/unfixable categories.

```python
from auto_fixer.core.error_classifier import ErrorClassifier

classifier = ErrorClassifier()
classified_error = classifier.classify(anomaly)

print(f"Category: {classified_error.category.value}")
print(f"Is fixable: {classified_error.is_fixable}")
print(f"Code file: {classified_error.code_file_path}")
print(f"Actions: {classified_error.recommended_actions}")
```

### 2. ExecutionSelector

Selects entries for re-execution.

```python
from auto_fixer.core.execution_selector import ExecutionSelector

selector = ExecutionSelector()

# Select fixable errors
execution_requests = selector.select_entries_for_reexecution(
    classified_errors,
    only_fixable=True
)

# Select by category
from auto_fixer.core.models import ErrorCategory
requests = selector.select_by_category(
    classified_errors,
    categories=[ErrorCategory.DOCKER_ERROR]
)
```

### 3. EnvironmentFixer

Applies automatic fixes.

```python
from auto_fixer.fixers.environment_fixer import EnvironmentFixer

fixer = EnvironmentFixer(dry_run=False)

# Fix single error
fix_attempts = fixer.fix_error(classified_error)

# Batch fixing
all_attempts = fixer.fix_batch(classified_errors)
fixer.print_stats()
```

### 4. FixReporter

Generates reports.

```python
from auto_fixer.reporters.fix_reporter import FixReporter

reporter = FixReporter(output_dir="./reports")

# Create and export reports
report = reporter.create_report(classified_errors, fix_attempts)
reporter.print_summary(report)

json_path = reporter.export_json(report)
csv_path = reporter.export_csv(report)
md_path = reporter.export_markdown(report)
```

## Report Formats

### CSV Report Columns

The CSV report includes:
- `cluster_name`, `entry_id`, `language`
- `category`, `root_cause`, `severity`
- `code_file_path` - Path to implementation code
- `test_file_path` - Path to test suite
- `log_file_path` - Path to execution log
- `is_code_issue` - Boolean flag for code bugs
- `is_test_issue` - Boolean flag for test errors
- `is_environment_issue` - Boolean flag for fixable errors
- `error_message` - Error details (truncated)
- `detected_issues` - List of issues found
- `recommendation` - Action to take

**Easy Filtering in Excel:**
```
Filter by is_code_issue=True → Entries to consider removing
Filter by is_test_issue=True → Test suites to fix
Filter by is_environment_issue=True → Already handled by fixer
```

### Markdown Report

Includes:
- Executive summary with statistics
- Errors by category (table)
- Code issues grouped by cluster with:
  - File paths (implementation, test, log)
  - Detected issues
  - Error messages
  - Detailed recommendations

## Advanced Usage

### Selective Execution Without AutoFixer

```python
from pathlib import Path
from run_tests_on_cluster import ClusterRunner
from utility_dir import utility_paths

runner = ClusterRunner(max_workers=4)
cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_palindrome.json"

# Run only specific entries
base_results, llm_results = runner.run_cluster_tests(
    cluster_path=cluster_path,
    base_only=True,
    entry_ids_filter=["entry_001", "entry_003"],  # Selective!
    overwrite_results=True,
    cluster_name="palindrome"
)
```

### Filtering by Language

```python
# Filter errors by language
python_errors = [e for e in classified_errors if e.language == "python"]
java_errors = [e for e in classified_errors if e.language == "java"]

# Create separate requests
python_requests = selector.select_entries_for_reexecution(python_errors)
java_requests = selector.select_entries_for_reexecution(java_errors)
```

### Prioritizing Re-execution

```python
# Prioritize by number of errors
prioritized = selector.prioritize_requests(execution_requests)

# Custom priority order
custom_priority = ["contains_duplicate", "two_sum"]
prioritized = selector.prioritize_requests(
    execution_requests,
    priority_order=custom_priority
)
```

## Troubleshooting

### No Anomalies Detected

```bash
# Generate execution results first
cd src/run_tests_on_clusters
python run_all_tests.py

# Then run AutoFixer
cd ..
python auto_fixer/main.py --verbose
```

### Docker Fixes Failing

```bash
# Manually restart Colima
colima stop && colima start

# Then retry
python auto_fixer/main.py --apply-fixes
```

### Selective Execution Not Working

Ensure `entry_ids_filter` is provided:

```python
# ✅ CORRECT
runner.run_cluster_tests(..., entry_ids_filter=["entry_001"])

# ❌ WRONG (runs all entries)
runner.run_cluster_tests(...)
```

## Testing

Run integration tests:

```bash
cd src
python auto_fixer/test_selective_execution.py
```

Expected output:
```
✓ ExecutionSelector: PASSED
✓ Selective Execution Integration: PASSED
✓ ALL TESTS PASSED!
```

## Directory Structure

```
src/auto_fixer/
├── main.py                    # Main orchestrator (AutoFixer class)
├── core/
│   ├── models.py              # Data models (ClassifiedError, FixReport, etc.)
│   ├── error_classifier.py   # Error classification logic
│   └── execution_selector.py # Re-execution selection
├── fixers/
│   └── environment_fixer.py  # Automatic fix implementations
├── reporters/
│   └── fix_reporter.py       # Report generation (JSON/CSV/MD)
└── reports/                   # Generated reports (auto-created)
```

## Integration with Main Pipeline

AutoFixer integrates seamlessly:

```bash
# 1. Run tests
cd src/run_tests_on_clusters
python run_all_tests.py

# 2. Auto-fix errors
cd ..
python auto_fixer/main.py --apply-fixes --reexecute --export csv

# 3. Review code issues
open auto_fixer/reports/code_issues_*.csv

# 4. Run metrics analysis
cd metrics
python main_exec_metrics_analysis.py
```

## Contributing

To add a new fix action:

1. Define in `core/models.py`:
   ```python
   class FixAction(Enum):
       MY_FIX = "my_fix"
   ```

2. Implement in `fixers/environment_fixer.py`:
   ```python
   def _my_fix(self) -> Tuple[FixResult, str]:
       # Implementation
       return (FixResult.SUCCESS, "Fixed!")
   ```

3. Route in `_execute_fix_action()`:
   ```python
   elif action == FixAction.MY_FIX:
       result, message = self._my_fix()
   ```

4. Recommend in `error_classifier.py`:
   ```python
   if category == ErrorCategory.MY_ERROR:
       actions.append(FixAction.MY_FIX)
   ```

## License

Part of Sustainable Code Refactoring with LLMs research - University of Pisa.

---

**Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Status:** Production Ready
