# Analysis Report: Invalid Metrics in Execution Outputs

**Date**: 2025-10-12
**Analyzed Files**: 9,717 execution output files
**Issue**: Metrics with value = 0 or missing, especially for C, C++, and Java

---

## Executive Summary

The analysis revealed that **28.2% of base test executions** have invalid metrics (zero or missing values), with critical impact on:
- **C**: 78.6% of base entries invalid (790/1005)
- **C++**: 97.1% of base entries invalid (670/690)
- **Java**: 12.0% of base entries invalid (92/764)

In contrast, LLM-generated code has only **7.1% invalid files**, indicating the problem is **not in the execution system itself** but in how base code tests are executed/parsed.

---

## Root Causes Identified

### 1. **C Language - Architecture Mismatch**
**Problem**: Compiled binaries fail to execute with:
```
qemu-x86_64: Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory
```

**Root Cause**:
- Tests are compiled inside Docker containers (likely Alpine Linux or cross-compilation setup)
- Binaries are compiled for x86_64 Linux
- When executed, the dynamic linker is not found or incompatible with the execution environment
- This results in `execution_time_ms: 0.00` and tests marked as failed

**Impact**: 35 clusters affected, including hello_world, space_age, sieve, etc.

### 2. **C++ Language - Missing Metrics in Output**
**Problem**: Tests execute successfully but `output.log` contains only test results, not `time` metrics:
```
Running 1 test case...
*** No errors detected
```
Missing:
- User time
- System time
- RAM usage
- CPU usage

**Root Cause**:
The `run.sh` script uses:
```bash
timeout 300 /usr/bin/time -v ./test_exec > output.log 2>&1
```

However, when execution happens inside Docker with specific shell configurations, the stderr redirect (`2>&1`) may not work as expected, causing `time` output to be lost.

**Impact**: 20+ clusters affected (hello_world, sieve, hamming, etc.)

### 3. **Java - Intermittent Failures**
**Problem**: Some Java test entries completely lack metrics (only id, filename, language fields present)

**Example** from `hello_world_results_1.json`:
```json
{
  "id": "Java_hello-world_exercism-java-blogscot_blogscot",
  "filename": "hello-world.java",
  "language": "Java"
}
```

**Root Cause**: Likely exceptions during test execution that cause early return with empty `ExecutionMetrics` object.

**Impact**: 15 clusters affected sporadically

---

## Statistics

### Overall
- **Total files analyzed**: 9,717
  - Base: 1,988 files (561 invalid = **28.2%**)
  - LLM: 7,665 files (547 invalid = **7.1%**)

### By Language (Base Tests)

| Language   | Total Entries | Invalid | % Invalid |
|------------|---------------|---------|-----------|
| C          | 1,005         | 790     | **78.6%** |
| C++        | 690           | 670     | **97.1%** |
| Java       | 764           | 92      | **12.0%** |
| JavaScript | 1,658         | 233     | 14.1%     |
| Python     | 1,363         | 226     | 16.6%     |
| TypeScript | 1,580         | 120     | 7.6%      |
| Go         | 2,039         | 27      | 1.3%      |

### Clusters to Re-run
- **Priority (C/C++/Java)**: 82 clusters
- **Other languages**: 98 clusters
- **LLM clusters**: 65 clusters

---

## Proposed Solutions

### Solution 1: Fix C Execution - Use Static Linking or Correct Dynamic Linker

**Option A - Static Linking** (Recommended):
Modify Makefile to use static linking:
```makefile
CC = gcc
CFLAGS = -Isrc -Itest -static
LDFLAGS = -static
```

**Option B - Fix Dynamic Linker Path**:
Ensure the Docker image has the correct glibc and update run.sh:
```bash
# Add linker path if needed
export LD_LIBRARY_PATH=/lib:/usr/lib
./tests.out
```

**Option C - Compile and Execute in Same Environment**:
Don't rely on pre-compiled binaries; always compile fresh in the Docker container:
```bash
make clean
make
/usr/bin/time -v ./tests.out 2>&1 | tee output.log
```

### Solution 2: Fix C++ Metrics Capture

**Problem**: `time` output not captured in `output.log`

**Fix**: Use explicit file descriptor redirection and ensure `time` output goes to a separate temp file:

```bash
#!/bin/bash
set -e

# ... compilation steps ...

echo "🧪 Esecuzione test con misurazione risorse..."

# Capture time output separately, then merge
/usr/bin/time -v -o time_metrics.txt ./test_exec > test_output.txt 2>&1

# Merge both outputs
cat test_output.txt time_metrics.txt > output.log

echo "✅ Test completati"
```

**Alternative Fix**: Use a wrapper script that ensures proper redirection:
```bash
( /usr/bin/time -v ./test_exec 2>&1 ) > output.log 2>&1
```

### Solution 3: Fix Java Execution - Add Better Error Handling

Modify `run_tests_on_cluster.py` to catch and log Java-specific exceptions:

```python
def _run_container_test(self, language, ...):
    # ... existing code ...

    try:
        result = subprocess.run(docker_cmd, ...)

        # Special handling for Java
        if language.lower() == "java" and result.returncode != 0:
            self.logger.error(f"Java test failed with code {result.returncode}")
            self.logger.error(f"Output: {result.stdout[:1000]}")

            # Create minimal valid metrics
            metrics = ExecutionMetrics()
            metrics.error_message = f"Java execution failed: exit code {result.returncode}"
            metrics.regression_test_passed = False
            return metrics

    # ... rest of code ...
```

### Solution 4: Improve Metrics Parsing - Add Minimum Valid Thresholds

Update `ExecutionMetrics.is_valid()` to be more forgiving:

```python
def is_valid(self) -> bool:
    """Check if metrics are meaningful with better handling"""
    # For very fast tests, execution_time_ms could be 0-1ms
    # Allow small values but not None
    return (
        self.execution_time_ms is not None
        and self.CPU_usage is not None
        and self.RAM_usage is not None
        and self.RAM_usage > 0  # RAM must be > 0
        # Allow execution_time_ms >= 0 (very fast tests)
        # Allow CPU_usage >= 0 (idle tests)
    )
```

**Note**: This is a workaround; the real fix should ensure proper metrics are collected.

---

## Implementation Plan

### Phase 1: Fix Run Scripts (High Priority)

1. **C - Update all base C run.sh files**:
   ```bash
   find src/dataset/c -name "run.sh" -not -path "*/openAI/*" \
        -not -path "*/claude/*" -not -path "*/gemini/*" -exec \
        sed -i '' 's|/usr/bin/time -v ./tests.out > output.log 2>&1|(/usr/bin/time -v ./tests.out) > output.log 2>&1|g' {} \;
   ```

2. **C++ - Update all base C++ run.sh files**:
   ```bash
   find src/dataset/cpp -name "run.sh" -not -path "*/openAI/*" \
        -not -path "*/claude/*" -not -path "*/gemini/*" -exec \
        sed -i '' 's|/usr/bin/time -v ./test_exec > output.log 2>&1|/usr/bin/time -v -o /tmp/time.txt ./test_exec > /tmp/test.txt 2>&1 && cat /tmp/test.txt /tmp/time.txt > output.log|g' {} \;
   ```

3. **Java - Add explicit error logging to run.sh**

### Phase 2: Re-run Tests on Priority Clusters

Execute tests on the 82 priority clusters (C/C++/Java) with fixed configurations:

```bash
cd src/run_tests_on_clusters
while read cluster; do
    echo "Testing $cluster..."
    python3 run_tests_on_cluster.py --cluster-name "$cluster" \
            --base-only --num-executions 5 --max-workers 2
done < clusters_to_rerun.txt
```

### Phase 3: Validation

After re-running:
1. Run `analyze_invalid_outputs.py` again
2. Compare before/after statistics
3. If still >10% invalid, investigate individual cases

---

## Files Generated by This Analysis

1. **`analyze_invalid_outputs.py`**: Analysis script
2. **`invalid_outputs_report.json`**: Detailed JSON report with all invalid entries
3. **`clusters_to_rerun.txt`**: List of 245 clusters needing re-execution
4. **`debug_c_execution.py`**: Manual debugging script for C/C++ issues
5. **`ANALYSIS_REPORT.md`**: This report

---

## Recommendations

1. **Immediate Action**: Fix C/C++ run.sh scripts as described in Phase 1
2. **Test**: Run debug script on 2-3 clusters to verify fixes work
3. **Deploy**: Re-run all 82 priority clusters
4. **Monitor**: Check logs during execution for new error patterns
5. **Document**: Update CLAUDE.md with execution requirements and known issues

---

## Technical Notes for Senior Developer

### Why LLM Files Have Fewer Issues

LLM-generated code files are in subdirectories (`openAI/`, `claude/`, `gemini/`) and their `run.sh` scripts may have been generated/fixed more recently with better redirect handling.

### Docker/Colima Specifics

The code uses Colima on macOS (Darwin 24.5.0). Docker volume mounts from macOS to containers can have issues with:
- File descriptor inheritance
- Signal handling
- Pipe buffering

The current code already uses temp directories (`~/docker_tmp`) to work around Colima mount issues.

### Alternative: Parse Container Logs Differently

Instead of relying on `output.log`, we could parse Docker container stats directly:
```bash
docker stats --no-stream --format "{{.CPUPerc}},{{.MemUsage}}" container_name
```

This would bypass the `time` command entirely, but would require significant refactoring.

---

## Conclusion

The root causes are:
1. **C**: Architecture/linker mismatch causing binary execution failures
2. **C++**: Shell redirection issues losing `time` metrics
3. **Java**: Exception handling gaps

All are fixable with targeted run.sh modifications and better error handling. The high percentage of valid LLM executions confirms the test infrastructure works when configured correctly.
