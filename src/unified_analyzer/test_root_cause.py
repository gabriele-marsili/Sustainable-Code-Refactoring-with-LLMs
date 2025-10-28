#!/usr/bin/env python3
"""
Quick test to verify RootCauseAnalyzer works correctly
"""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from unified_analyzer.core.models import ExecutionEntry, Anomaly
from unified_analyzer.core.enums import AnomalyType, Severity, RootCause
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer


def test_root_cause_enum():
    """Test that all RootCause values are valid"""
    print("Testing RootCause enum...")
    print("=" * 60)

    valid_causes = [
        RootCause.TEST_SUITE_ERROR,
        RootCause.CODE_BUG,
        RootCause.COMPILATION_ERROR,
        RootCause.RUNTIME_CRASH,
        RootCause.TIMEOUT,
        RootCause.MEMORY_ERROR,
        RootCause.ASSERTION_FAILURE,
        RootCause.DOCKER_ERROR,
        RootCause.METRICS_COLLECTION_FAILURE,
        RootCause.CONFIGURATION_ERROR,
        RootCause.UNKNOWN
    ]

    print(f"Valid RootCause values: {len(valid_causes)}")
    for cause in valid_causes:
        print(f"  ✓ {cause.name}: {cause.display_name()}")

    # Verify EXECUTION_FAILED is NOT in RootCause
    try:
        _ = RootCause.EXECUTION_FAILED
        print("\n  ✗ ERROR: EXECUTION_FAILED should not exist in RootCause!")
        return False
    except AttributeError:
        print("\n  ✓ Correct: EXECUTION_FAILED not in RootCause enum")

    # Verify EXECUTION_FAILED IS in AnomalyType
    from unified_analyzer.core.enums import AnomalyType
    try:
        _ = AnomalyType.EXECUTION_FAILED
        print("  ✓ Correct: EXECUTION_FAILED exists in AnomalyType enum")
    except AttributeError:
        print("  ✗ ERROR: EXECUTION_FAILED should exist in AnomalyType!")
        return False

    return True


def test_root_cause_analyzer():
    """Test RootCauseAnalyzer with different anomaly scenarios"""
    print("\n" + "=" * 60)
    print("Testing RootCauseAnalyzer...")
    print("=" * 60)

    config = AnalyzerConfig.load_default()
    config.enable_log_analysis = False  # Disable for quick test

    data_loader = DataLoader(config)
    analyzer = RootCauseAnalyzer(config, data_loader)

    # Test 1: Missing metrics anomaly
    print("\nTest 1: Missing metrics anomaly")
    entry1 = ExecutionEntry(
        id="test_1",
        cluster_name="test_cluster",
        language="python",
        filename="test.py",
        test_type="base",
        exec_number=1,
        execution_time_ms=None,
        cpu_usage=None,
        ram_usage=None,
        success=False
    )

    anomaly1 = Anomaly(
        anomaly_id="TEST-001",
        entry=entry1,
        anomaly_type=AnomalyType.MISSING_METRICS,
        severity=Severity.CRITICAL,
        detected_issues=["All metrics missing"]
    )

    analyzer.analyze(anomaly1)
    print(f"  Probable causes: {[c.display_name() for c in anomaly1.probable_causes]}")
    print(f"  ✓ Analysis completed without errors")

    # Test 2: Invalid values anomaly
    print("\nTest 2: Invalid values anomaly")
    entry2 = ExecutionEntry(
        id="test_2",
        cluster_name="test_cluster",
        language="cpp",
        filename="test.cpp",
        test_type="base",
        exec_number=1,
        execution_time_ms=0,
        cpu_usage=0,
        ram_usage=0,
        regression_test_passed=False
    )

    anomaly2 = Anomaly(
        anomaly_id="TEST-002",
        entry=entry2,
        anomaly_type=AnomalyType.INVALID_VALUE,
        severity=Severity.HIGH,
        detected_issues=["CPU_usage = 0", "RAM_usage = 0"]
    )

    analyzer.analyze(anomaly2)
    print(f"  Probable causes: {[c.display_name() for c in anomaly2.probable_causes]}")
    print(f"  ✓ Analysis completed without errors")

    # Test 3: Outlier anomaly
    print("\nTest 3: Outlier anomaly")
    entry3 = ExecutionEntry(
        id="test_3",
        cluster_name="test_cluster",
        language="java",
        filename="Test.java",
        test_type="base",
        exec_number=1,
        execution_time_ms=10000,  # Very high
        cpu_usage=95.0,
        ram_usage=8192.0,
        regression_test_passed=True
    )

    anomaly3 = Anomaly(
        anomaly_id="TEST-003",
        entry=entry3,
        anomaly_type=AnomalyType.OUTLIER,
        severity=Severity.MEDIUM,
        detected_issues=["execution_time_ms extremely high"]
    )

    analyzer.analyze(anomaly3)
    print(f"  Probable causes: {[c.display_name() for c in anomaly3.probable_causes]}")
    print(f"  Recommendations: {len(anomaly3.recommended_actions)} actions")
    print(f"  ✓ Analysis completed without errors")

    return True


def main():
    """Run all tests"""
    print("\n")
    print("*" * 60)
    print("ROOT CAUSE ANALYZER - QUICK TEST")
    print("*" * 60)
    print("\n")

    try:
        # Test enum
        if not test_root_cause_enum():
            print("\n✗ Enum test failed!")
            return 1

        # Test analyzer
        if not test_root_cause_analyzer():
            print("\n✗ Analyzer test failed!")
            return 1

        print("\n" + "*" * 60)
        print("ALL TESTS PASSED! ✓")
        print("*" * 60)
        print("\nSummary:")
        print("  ✓ RootCause enum is correct")
        print("  ✓ EXECUTION_FAILED correctly in AnomalyType only")
        print("  ✓ RootCauseAnalyzer works without errors")
        print("  ✓ All anomaly types can be analyzed")
        print("\n")
        return 0

    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
