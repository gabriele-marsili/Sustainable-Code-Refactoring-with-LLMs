# Unified Analyzer - Changelog

## Version 1.0.2 - Bug Fixes

### Fixed
- **AttributeError: RootCause has no attribute 'EXECUTION_FAILED'**
  - Fixed incorrect use of `RootCause.EXECUTION_FAILED` in `root_cause_analyzer.py`
  - Replaced with `RootCause.RUNTIME_CRASH` which is the appropriate cause for execution failures
  - Note: `EXECUTION_FAILED` exists in `AnomalyType` enum, not `RootCause` enum

### Changes

#### `analyzers/root_cause_analyzer.py`
- **Updated**: `_analyze_missing_metrics()` method
  - Changed `RootCause.EXECUTION_FAILED` to `RootCause.RUNTIME_CRASH`
  - Added condition to only add RUNTIME_CRASH if no other causes found
  - Prevents duplicate/conflicting root causes

---

## Version 1.0.1 - Type Safety Improvements

### Fixed
- **TypeError with metric comparisons**: Fixed `TypeError: '>' not supported between instances of 'str' and 'int'`
  - Added `_to_float()` helper method in `ExecutionEntry` to safely convert metric values
  - Updated `has_valid_metrics()`, `has_zero_metrics()`, and `get_metric()` to use type-safe conversions
  - Added `_safe_float()` static method in `DataLoader` to normalize metrics at load time

### Changes

#### `core/models.py` - ExecutionEntry
- **New method**: `_to_float(value: Any) -> Optional[float]`
  - Safely converts strings, integers, and floats to float
  - Returns `None` for invalid values or `None` input
  - Handles `ValueError` and `TypeError` gracefully

- **Updated methods**:
  - `has_valid_metrics()`: Now uses `_to_float()` for all comparisons
  - `has_zero_metrics()`: Now uses `_to_float()` for all comparisons
  - `get_metric()`: Always returns `float` or `None` (never returns raw strings)

#### `data/loader.py` - DataLoader
- **New method**: `_safe_float(value) -> Optional[float]`
  - Static method for normalizing metrics during data loading
  - Identical conversion logic to `ExecutionEntry._to_float()`

- **Updated method**:
  - `_create_execution_entry()`: Now normalizes all metrics (execution_time_ms, CPU_usage, RAM_usage) to float during creation

#### `main.py`
- **Fixed**: Removed unused imports (`Optional`, `List`) to clean up linter warnings

### Type Handling Examples

The system now correctly handles:

1. **String metrics**: `"123.45"` → `123.45` (float)
2. **Integer metrics**: `67` → `67.0` (float)
3. **Float metrics**: `1024.5` → `1024.5` (float)
4. **String zeros**: `"0"` → `0.0` (float, correctly detected as zero)
5. **None values**: `None` → `None` (correctly detected as missing)
6. **Invalid strings**: `"not_a_number"` → `None` (safely handled)

### Testing

Added `test_type_handling.py` to verify all conversion scenarios work correctly:
- String to float conversion
- Numeric type handling
- Zero value detection
- None value handling
- Invalid string handling

Run test:
```bash
python src/unified_analyzer/test_type_handling.py
```

### Backward Compatibility

✅ All changes are backward compatible:
- Existing code continues to work
- New type safety is transparent to users
- No API changes

### Performance Impact

Minimal performance impact:
- Type conversion happens once at data load time
- Conversion is cached in the ExecutionEntry object
- No repeated conversions during analysis

---

## Version 1.0.0 - Initial Release

### Features
- Complete anomaly detection system (outliers, invalid values, missing metrics)
- Multi-level root cause analysis with test vs code distinction
- Comprehensive log file parsing (C++, Java, Python)
- Export to JSON, CSV, Markdown, Text
- CLI with argparse
- Backward compatible with existing codebase
- Full documentation and examples
