# Unified Analyzer

## 🎯 Overview

**Unified Analyzer** è il modulo centralizzato per l'analisi, validazione e fixing di errori ed anomalie nelle esecuzioni di test. Fornisce una **single source of truth** per:

- ✅ **Anomaly Detection:** Invalid values, missing metrics, outliers
- ✅ **Root Cause Analysis:** Compilation, runtime, test errors, Docker issues
- ✅ **Error Classification:** Fixable vs unfixable errors
- ✅ **Auto-Fixing:** Automatic fixes for environment/infrastructure issues
- ✅ **Validation:** Sanity checks and output validation
- ✅ **Orchestration:** Workflow management per analyze → fix → rerun pipelines
- ✅ **Reporting:** Multi-format export (JSON, CSV, Markdown, Text)

---

## 📂 Module Structure

```
unified_analyzer/
├── core/                         # Configuration & Data Models
│   ├── config.py                # AnalyzerConfig
│   ├── models.py                # ExecutionEntry, Anomaly, ClassifiedError, FixReport
│   └── enums.py                 # AnomalyType, Severity, RootCause, ErrorCategory
│
├── data/                         # Data Loading & Parsing
│   ├── loader.py                # DataLoader - Load execution results
│   ├── parser.py                # FilenameParser - Parse file/cluster names
│   └── validator.py             # Basic data validation
│
├── analyzers/                    # Core Analysis Engines
│   ├── anomaly_detector.py     # Detect invalid/missing/outlier metrics
│   ├── log_analyzer.py         # Parse log files for errors
│   ├── root_cause_analyzer.py  # Determine root causes
│   └── error_classifier.py     # Classify fixable vs unfixable errors
│
├── validators/                   # Comprehensive Validation
│   ├── sanity_checker.py       # Check execution completeness
│   ├── output_validator.py     # Validate JSON structure
│   └── cluster_validator.py    # Cluster-level validation
│
├── fixers/                       # Automatic Fix Engines
│   ├── base_fixer.py           # Base class for fixers
│   ├── environment_fixer.py    # Fix Docker/environment issues
│   ├── permission_fixer.py     # Fix file permissions
│   └── path_fixer.py           # Fix incorrect paths
│
├── orchestration/                # Workflow Orchestration
│   ├── execution_selector.py  # Select entries for re-execution
│   ├── cluster_rerunner.py    # Re-run problematic clusters
│   └── workflow_manager.py    # Complete workflow orchestration
│
├── reporters/                    # Report Generation
│   ├── report_generator.py    # Generate analysis reports
│   ├── exporters.py           # Export to JSON/CSV/Markdown
│   └── fix_reporter.py        # Report fixing actions
│
├── cli/                          # Command-Line Interface
│   ├── analyze.py             # analyze command
│   ├── validate.py            # validate command
│   ├── fix.py                 # fix command
│   └── rerun.py               # rerun command
│
├── utils/                        # Utilities
│   ├── patterns.py            # Common regex patterns
│   └── helpers.py             # Helper functions
│
├── main.py                       # Main entry point
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Basic Usage

```bash
cd src

# Analyze all clusters for anomalies
python -m unified_analyzer analyze \
    --clusters all \
    --modes invalid missing outliers \
    --root-cause \
    --export json markdown

# Validate execution outputs
python -m unified_analyzer validate \
    --sanity-check \
    --output-validation

# Complete workflow (analyze → classify → fix → rerun)
python -m unified_analyzer workflow \
    --full \
    --apply-fixes \
    --reexecute
```

---

## 📖 API Documentation

### 1. Anomaly Detection

**Class:** `AnomalyDetector`  
**Location:** `analyzers/anomaly_detector.py`

#### Key Methods

```python
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.core.config import AnalyzerConfig

# Initialize
config = AnalyzerConfig.load_default()
detector = AnomalyDetector(config)

# Detect all anomalies
anomalies = detector.detect_all(execution_entries)

# Detect specific types
invalid_anomalies = detector.detect_invalid_values(entries)
missing_anomalies = detector.detect_missing_metrics(entries)
outlier_anomalies = detector.detect_outliers(entries)
```

#### Anomaly Types

- **INVALID_VALUE:** Metrics with value ≤ 0 or None
- **MISSING_METRICS:** Completely missing metrics
- **OUTLIER:** Values deviating >500% from median (configurable)

---

### 2. Root Cause Analysis

**Class:** `RootCauseAnalyzer`  
**Location:** `analyzers/root_cause_analyzer.py`

```python
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer

# Initialize
analyzer = RootCauseAnalyzer(config, data_loader)

# Analyze anomaly
anomaly_with_cause = analyzer.analyze(anomaly)

# Access results
primary_cause = anomaly_with_cause.probable_causes[0]
recommendations = anomaly_with_cause.recommended_actions
log_analysis = anomaly_with_cause.log_analysis
```

#### Root Causes

- **CODE_BUG:** Logic error in implementation
- **TEST_SUITE_ERROR:** Error in test code/setup
- **COMPILATION_ERROR:** Code doesn't compile
- **RUNTIME_CRASH:** Segfault, exception, crash
- **ASSERTION_FAILURE:** Test assertion failed
- **TIMEOUT:** Execution exceeded time limit
- **MEMORY_ERROR:** Out of memory / memory leak
- **DOCKER_ERROR:** Docker container issue
- **METRICS_COLLECTION_FAILURE:** Metrics not collected
- **CONFIGURATION_ERROR:** Build/config issue
- **UNKNOWN:** Unable to determine

---

### 3. Error Classification

**Class:** `ErrorClassifier`  
**Location:** `analyzers/error_classifier.py`

```python
from unified_analyzer.analyzers.error_classifier import ErrorClassifier

# Initialize
classifier = ErrorClassifier()

# Classify anomalies
classified_errors = classifier.classify_batch(anomalies)

# Filter fixable errors
fixable = [e for e in classified_errors if e.is_fixable]
unfixable = [e for e in classified_errors if not e.is_fixable]

# Get statistics
stats = classifier.get_stats()
```

#### Error Categories

**Fixable (Environment/Infrastructure):**
- DOCKER_ERROR
- METRICS_COLLECTION
- CONFIGURATION_ERROR
- ENVIRONMENT_SETUP

**Unfixable (Code-level):**
- CODE_BUG
- TEST_SUITE_ERROR
- COMPILATION_ERROR
- RUNTIME_CRASH
- ASSERTION_FAILURE

**Uncertain:**
- UNKNOWN
- TIMEOUT (could be algorithm or environment)
- MEMORY_ERROR (could be code or environment)

---

### 4. Data Loading

**Class:** `DataLoader`  
**Location:** `data/loader.py`

```python
from unified_analyzer.data.loader import DataLoader

# Initialize
loader = DataLoader(config)

# Load execution results
entries = loader.load_execution_results("two-sum", test_type="base")

# Load LLM results
llm_entries = loader.load_execution_results("two-sum", test_type="llm")

# Get all cluster names
cluster_names = loader.get_all_cluster_names()

# Load log file
log_content = loader.load_log_file("/path/to/log.txt")
```

---

### 5. Validation

**Class:** `SanityChecker`  
**Location:** `validators/sanity_checker.py`

```python
from unified_analyzer.validators.sanity_checker import SanityChecker

# Initialize
checker = SanityChecker()

# Run sanity checks on cluster
report = checker.get_cluster_exec_report("two-sum")

# Check all clusters
checker.sanity_checks()
```

**Class:** `ExecutionOutputValidator`  
**Location:** `validators/output_validator.py`

```python
from unified_analyzer.validators.output_validator import ExecutionOutputValidator

# Initialize
validator = ExecutionOutputValidator(execution_outputs_dir)

# Validate all files
validator.validate_all_files()

# Generate report
validator.generate_report(output_file="validation_report.txt")
```

---

### 6. Auto-Fixing

**Class:** `EnvironmentFixer`  
**Location:** `fixers/environment_fixer.py`

```python
from unified_analyzer.fixers.environment_fixer import EnvironmentFixer

# Initialize
fixer = EnvironmentFixer(dry_run=False)

# Fix classified errors
fix_attempts = fixer.fix_batch(classified_errors)

# Apply specific fix
result = fixer.fix_docker_permissions(entry_path)
```

#### Available Fixes

- Docker permission fixes
- Container restart/rebuild
- Metrics collection restart
- Configuration restoration
- File path corrections

---

### 7. Orchestration

**Class:** `ExecutionSelector`  
**Location:** `orchestration/execution_selector.py`

```python
from unified_analyzer.orchestration.execution_selector import ExecutionSelector

# Initialize
selector = ExecutionSelector()

# Select entries for re-execution
execution_requests = selector.select_entries_for_reexecution(
    classified_errors,
    only_fixable=True
)

# Get code issues for manual review
code_issues = selector.get_code_issues_for_review(classified_errors)
```

---

## 🎛️ Configuration

**File:** `core/config.py`

```python
from unified_analyzer.core.config import AnalyzerConfig

# Load default config
config = AnalyzerConfig.load_default()

# Quick scan mode (faster, no log analysis)
config = AnalyzerConfig.for_quick_scan()

# Root cause analysis mode (comprehensive)
config = AnalyzerConfig.for_root_cause_analysis()

# Customize
config.outlier_threshold_percentage = 300.0  # Default: 500%
config.enable_log_analysis = True
config.invalid_value_threshold = 0.0
```

### Configuration Options

- `enabled_modes`: Analysis modes to run (INVALID_VALUES, MISSING_METRICS, OUTLIERS, ALL)
- `outlier_threshold_percentage`: Outlier detection threshold (default: 500%)
- `invalid_value_threshold`: Threshold for invalid values (default: 0.0)
- `enable_log_analysis`: Enable log file parsing (default: True)
- `required_metrics`: List of required metrics to check
- `output_dir`: Directory for execution outputs
- `reports_dir`: Directory for generated reports

---

## 📊 Reports & Export

### Report Types

1. **Analysis Report:** Complete anomaly analysis with statistics
2. **Validation Report:** Validation results per cluster/language
3. **Fix Report:** Fixing actions and results
4. **Summary Reports:** High-level overview

### Export Formats

```python
from unified_analyzer.reporters.exporters import ReportExporter

exporter = ReportExporter()

# Export to JSON
exporter.export_json(report, "analysis_report.json")

# Export to CSV
exporter.export_csv(anomalies, "anomalies.csv")

# Export to Markdown
exporter.export_markdown(report, "analysis_report.md")

# Export summary text
exporter.export_summary_text(report, "summary.txt")
```

---

## 🔧 CLI Commands

### Analyze Command

```bash
python -m unified_analyzer analyze \
    --clusters CLUSTER1 CLUSTER2 \
    --modes invalid missing outliers \
    --test-type both \
    --root-cause \
    --outlier-threshold 500 \
    --export json csv markdown \
    --output-dir ./reports \
    --verbose
```

**Options:**
- `--clusters`: Specific clusters to analyze (default: all)
- `--modes`: Analysis modes (invalid, missing, outliers, all)
- `--test-type`: Type of results (base, llm, both)
- `--root-cause`: Enable root cause analysis
- `--outlier-threshold`: Outlier detection threshold %
- `--export`: Export formats
- `--output-dir`: Output directory for reports
- `--verbose`: Enable verbose logging

### Validate Command

```bash
python -m unified_analyzer validate \
    --sanity-check \
    --output-validation \
    --cluster-validation \
    --export report
```

**Options:**
- `--sanity-check`: Run sanity checks on completeness
- `--output-validation`: Validate JSON structure
- `--cluster-validation`: Cluster-level validation

### Fix Command

```bash
python -m unified_analyzer fix \
    --clusters CLUSTER1 CLUSTER2 \
    --apply-fixes \
    --dry-run
```

**Options:**
- `--clusters`: Clusters to fix
- `--apply-fixes`: Actually apply fixes (not just simulate)
- `--dry-run`: Simulate fixes without executing

### Rerun Command

```bash
python -m unified_analyzer rerun \
    --clusters CLUSTER1 \
    --outlier-mode \
    --num-executions 5 \
    --overwrite-results
```

**Options:**
- `--clusters`: Clusters to re-run
- `--outlier-mode`: Selective re-execution for outlier entries
- `--num-executions`: Number of execution runs
- `--overwrite-results`: Overwrite existing results

### Workflow Command

```bash
python -m unified_analyzer workflow \
    --full \
    --apply-fixes \
    --reexecute \
    --export all
```

**Options:**
- `--full`: Run complete workflow
- `--apply-fixes`: Apply automatic fixes
- `--reexecute`: Re-execute after fixing
- `--export`: Export all reports

---

## 🧪 Example Usage

### Example 1: Detect Anomalies in Specific Cluster

```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector

# Setup
config = AnalyzerConfig.load_default()
loader = DataLoader(config)
detector = AnomalyDetector(config)

# Load and analyze
entries = loader.load_execution_results("two-sum", test_type="base")
anomalies = detector.detect_all(entries)

print(f"Found {len(anomalies)} anomalies")
for anomaly in anomalies:
    print(f"  - {anomaly.anomaly_type}: {anomaly.detected_issues}")
```

### Example 2: Full Analysis with Root Cause

```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer
from unified_analyzer.reporters.report_generator import ReportGenerator

# Setup
config = AnalyzerConfig.for_root_cause_analysis()
loader = DataLoader(config)
detector = AnomalyDetector(config)
root_cause_analyzer = RootCauseAnalyzer(config, loader)
reporter = ReportGenerator(config)

# Load entries
cluster_names = ["two-sum", "palindrome", "reverse-string"]
all_entries = []
for cluster in cluster_names:
    entries = loader.load_execution_results(cluster, test_type="both")
    all_entries.extend(entries)

# Detect anomalies
anomalies = detector.detect_all(all_entries)

# Perform root cause analysis
for anomaly in anomalies:
    root_cause_analyzer.analyze(anomaly)

# Generate report
report = reporter.generate_full_report(anomalies, len(all_entries))

# Export
from unified_analyzer.reporters.exporters import ReportExporter
exporter = ReportExporter()
exporter.export_json(report, "full_analysis_report.json")
exporter.export_markdown(report, "full_analysis_report.md")
```

### Example 3: Auto-Fix Workflow

```python
from unified_analyzer.analyzers.error_classifier import ErrorClassifier
from unified_analyzer.fixers.environment_fixer import EnvironmentFixer
from unified_analyzer.orchestration.execution_selector import ExecutionSelector

# Classify errors
classifier = ErrorClassifier()
classified_errors = classifier.classify_batch(anomalies)

# Apply automatic fixes
fixer = EnvironmentFixer(dry_run=False)
fix_attempts = fixer.fix_batch(classified_errors)

# Select entries for re-execution
selector = ExecutionSelector()
execution_requests = selector.select_entries_for_reexecution(
    classified_errors,
    only_fixable=True
)

# Print results
print(f"Fixed {len([f for f in fix_attempts if f.result == FixResult.SUCCESS])} errors")
print(f"Need to re-run {len(execution_requests)} clusters")
```

---

## 🐛 Debugging & Troubleshooting

### Enable Debug Logging

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Common Issues

**Issue:** "No execution entries found"
- **Solution:** Check if cluster files exist in `execution_outputs/`

**Issue:** "Log file not found"
- **Solution:** Verify log paths in execution metadata

**Issue:** "Outlier detection returns too many false positives"
- **Solution:** Increase `outlier_threshold_percentage` in config

**Issue:** "Auto-fix fails with permission denied"
- **Solution:** Run with appropriate permissions or use `dry_run=True`

---

## 📈 Performance & Scalability

- **Fast Mode:** Use `AnalyzerConfig.for_quick_scan()` - skips log analysis
- **Batch Processing:** Process multiple clusters in parallel (future enhancement)
- **Incremental Analysis:** Analyze only new/modified results
- **Memory Optimization:** Lazy loading of log files

---

## 🤝 Contributing

To extend Unified Analyzer:

1. **New Anomaly Type:** Add to `AnomalyType` enum and detector method
2. **New Root Cause:** Add to `RootCause` enum and analysis logic
3. **New Fixer:** Extend `BaseFixer` class in `fixers/`
4. **New Export Format:** Add method to `ReportExporter`

---

## 📄 License

Part of the Sustainable Code Refactoring with LLMs research project.

---

**Version:** 2.0.0  
**Last Updated:** 2025-10-28  
**Maintainer:** [Your Name]
