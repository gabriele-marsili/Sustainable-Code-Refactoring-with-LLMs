"""
Unit tests for github_ingestor module

Run with: python -m pytest test_github_ingestor.py -v
Or: python test_github_ingestor.py
"""

import sys
from pathlib import Path
import json

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from dataset_handling.github_ingestor import (
    ExercismValidator,
    ExercismEntry,
    DuplicateChecker,
    GitHubAPIClient
)


def test_validator_source_file_c():
    """Test C source file detection"""
    validator = ExercismValidator()

    # Valid C source files
    result1 = validator.is_source_file("hamming.c", "c")
    assert result1 == True, f"Expected True for hamming.c, got {result1}"

    result2 = validator.is_source_file("two_sum.c", "c")
    assert result2 == True, f"Expected True for two_sum.c, got {result2}"

    # Invalid (test files)
    result3 = validator.is_source_file("test_hamming.c", "c")
    assert result3 == False, f"Expected False for test_hamming.c, got {result3}"

    result4 = validator.is_source_file("hamming_test.c", "c")
    assert result4 == False, f"Expected False for hamming_test.c, got {result4}"

    # Invalid (wrong extension)
    result5 = validator.is_source_file("hamming.cpp", "c")
    assert result5 == False, f"Expected False for hamming.cpp, got {result5}"

    result6 = validator.is_source_file("hamming.h", "c")
    assert result6 == False, f"Expected False for hamming.h, got {result6}"

    print("✓ Test C source file detection passed")


def test_validator_source_file_cpp():
    """Test C++ source file detection"""
    validator = ExercismValidator()

    # Valid C++ source files
    assert validator.is_source_file("hamming.cpp", "cpp") == True
    assert validator.is_source_file("two_sum.cpp", "cpp") == True

    # Invalid (test files)
    assert validator.is_source_file("test_hamming.cpp", "cpp") == False
    assert validator.is_source_file("hamming_test.cpp", "cpp") == False
    assert validator.is_source_file("HammingTest.cpp", "cpp") == False

    # Invalid (wrong extension)
    assert validator.is_source_file("hamming.c", "cpp") == False
    assert validator.is_source_file("hamming.h", "cpp") == False

    print("✓ Test C++ source file detection passed")


def test_validator_test_file_c():
    """Test C test file detection"""
    validator = ExercismValidator()

    # Valid test files
    assert validator.is_test_file("test_hamming.c", "c") == True
    assert validator.is_test_file("hamming_test.c", "c") == True
    assert validator.is_test_file("TEST_hamming.c", "c") == True

    # Invalid
    assert validator.is_test_file("hamming.c", "c") == False
    assert validator.is_test_file("hamming.h", "c") == False

    print("✓ Test C test file detection passed")


def test_validator_test_file_cpp():
    """Test C++ test file detection"""
    validator = ExercismValidator()

    # Valid test files
    assert validator.is_test_file("test_hamming.cpp", "cpp") == True
    assert validator.is_test_file("hamming_test.cpp", "cpp") == True
    assert validator.is_test_file("hamming_test.cc", "cpp") == True
    assert validator.is_test_file("HammingTest.cpp", "cpp") == True

    # Invalid
    assert validator.is_test_file("hamming.cpp", "cpp") == False
    assert validator.is_test_file("hamming.h", "cpp") == False

    print("✓ Test C++ test file detection passed")


def test_validator_header_file():
    """Test header file detection"""
    validator = ExercismValidator()

    # Valid headers
    assert validator.is_header_file("hamming.h") == True
    assert validator.is_header_file("unity.h") == True
    assert validator.is_header_file("catch.hpp") == True
    assert validator.is_header_file("test_framework.hpp") == True

    # Invalid
    assert validator.is_header_file("hamming.c") == False
    assert validator.is_header_file("hamming.cpp") == False
    assert validator.is_header_file("makefile") == False

    print("✓ Test header file detection passed")


def test_validator_build_file():
    """Test build file detection"""
    validator = ExercismValidator()

    # Valid build files
    assert validator.is_build_file("Makefile") == True
    assert validator.is_build_file("makefile") == True
    assert validator.is_build_file("MAKEFILE") == True
    assert validator.is_build_file("CMakeLists.txt") == True
    assert validator.is_build_file("cmakelists.txt") == True

    # Invalid
    assert validator.is_build_file("hamming.c") == False
    assert validator.is_build_file("build.sh") == False
    assert validator.is_build_file("configure") == False

    print("✓ Test build file detection passed")


def test_validator_complete_entry_c():
    """Test validation of complete C entry"""
    validator = ExercismValidator()

    # Complete entry
    files = [
        {'type': 'file', 'name': 'hamming.c'},
        {'type': 'file', 'name': 'hamming.h'},
        {'type': 'file', 'name': 'test_hamming.c'},
        {'type': 'file', 'name': 'unity.h'},
        {'type': 'file', 'name': 'Makefile'}
    ]

    is_valid, categorized = validator.validate_entry(files, 'c')

    assert is_valid == True
    assert len(categorized['source_files']) == 1
    assert len(categorized['test_files']) == 1
    assert len(categorized['header_files']) == 2  # hamming.h + unity.h
    assert len(categorized['build_files']) == 1

    print("✓ Test complete C entry validation passed")


def test_validator_incomplete_entry_no_makefile():
    """Test validation fails without Makefile"""
    validator = ExercismValidator()

    # Missing Makefile
    files = [
        {'type': 'file', 'name': 'hamming.c'},
        {'type': 'file', 'name': 'hamming.h'},
        {'type': 'file', 'name': 'test_hamming.c'}
    ]

    is_valid, categorized = validator.validate_entry(files, 'c')

    assert is_valid == False
    assert len(categorized['build_files']) == 0

    print("✓ Test incomplete entry (no Makefile) validation passed")


def test_validator_incomplete_entry_no_tests():
    """Test validation fails without tests"""
    validator = ExercismValidator()

    # Missing test file
    files = [
        {'type': 'file', 'name': 'hamming.c'},
        {'type': 'file', 'name': 'hamming.h'},
        {'type': 'file', 'name': 'Makefile'}
    ]

    is_valid, categorized = validator.validate_entry(files, 'c')

    assert is_valid == False
    assert len(categorized['test_files']) == 0

    print("✓ Test incomplete entry (no tests) validation passed")


def test_validator_complete_entry_cpp():
    """Test validation of complete C++ entry"""
    validator = ExercismValidator()

    # Complete C++ entry with CMakeLists.txt
    files = [
        {'type': 'file', 'name': 'hamming.cpp'},
        {'type': 'file', 'name': 'hamming.h'},
        {'type': 'file', 'name': 'hamming_test.cpp'},
        {'type': 'file', 'name': 'catch.hpp'},
        {'type': 'file', 'name': 'CMakeLists.txt'}
    ]

    is_valid, categorized = validator.validate_entry(files, 'cpp')

    assert is_valid == True
    assert len(categorized['source_files']) == 1
    assert len(categorized['test_files']) == 1
    assert len(categorized['header_files']) == 2
    assert len(categorized['build_files']) == 1

    print("✓ Test complete C++ entry validation passed")


def test_exercism_entry_unique_id():
    """Test unique ID generation"""
    entry = ExercismEntry(
        repo_name="exercism-solutions",
        repo_owner="john_doe",
        exercise_name="two-sum",
        language="c",
        source_files=[],
        test_files=[],
        header_files=[],
        build_files=[]
    )

    expected_id = "c_two-sum_john_doe"
    assert entry.get_unique_id() == expected_id

    print("✓ Test unique ID generation passed")


def test_duplicate_checker_mock():
    """Test duplicate checker with mock data"""
    # Create a temporary cluster directory structure
    import tempfile
    import shutil

    temp_dir = Path(tempfile.mkdtemp())

    try:
        # Create mock cluster file
        cluster_file = temp_dir / "cluster_hamming.json"
        cluster_data = {
            "c": [
                {
                    "id": "c_hamming_user1",
                    "filename": "hamming.c",
                    "language": "c",
                    "source": "exercism-user1"
                }
            ]
        }

        with open(cluster_file, 'w') as f:
            json.dump(cluster_data, f)

        # Initialize checker
        checker = DuplicateChecker(temp_dir)

        # Create test entries
        entry_duplicate = ExercismEntry(
            repo_name="repo1",
            repo_owner="user1",
            exercise_name="hamming",
            language="c",
            source_files=[],
            test_files=[],
            header_files=[],
            build_files=[]
        )

        entry_new = ExercismEntry(
            repo_name="repo2",
            repo_owner="user2",
            exercise_name="two-sum",
            language="c",
            source_files=[],
            test_files=[],
            header_files=[],
            build_files=[]
        )

        # Test duplicate detection
        assert checker.is_duplicate(entry_duplicate) == True
        assert checker.is_duplicate(entry_new) == False

        print("✓ Test duplicate checker passed")

    finally:
        # Cleanup
        shutil.rmtree(temp_dir, ignore_errors=True)


def test_github_api_client_initialization():
    """Test GitHub API client initialization"""
    # Without token
    client1 = GitHubAPIClient()
    assert client1.token is None
    assert 'Authorization' not in client1.headers

    # With token
    client2 = GitHubAPIClient(token="test_token_123")
    assert client2.token == "test_token_123"
    assert 'Authorization' in client2.headers
    assert client2.headers['Authorization'] == "token test_token_123"

    print("✓ Test GitHub API client initialization passed")


def run_all_tests():
    """Run all tests"""
    print("\n" + "="*60)
    print("Running GitHub Ingestor Unit Tests")
    print("="*60 + "\n")

    tests = [
        test_validator_source_file_c,
        test_validator_source_file_cpp,
        test_validator_test_file_c,
        test_validator_test_file_cpp,
        test_validator_header_file,
        test_validator_build_file,
        test_validator_complete_entry_c,
        test_validator_incomplete_entry_no_makefile,
        test_validator_incomplete_entry_no_tests,
        test_validator_complete_entry_cpp,
        test_exercism_entry_unique_id,
        test_duplicate_checker_mock,
        test_github_api_client_initialization
    ]

    passed = 0
    failed = 0

    for test_func in tests:
        try:
            test_func()
            passed += 1
        except AssertionError as e:
            print(f"✗ {test_func.__name__} FAILED: {e}")
            failed += 1
        except Exception as e:
            print(f"✗ {test_func.__name__} ERROR: {e}")
            failed += 1

    print("\n" + "="*60)
    print(f"Test Results: {passed} passed, {failed} failed")
    print("="*60)

    return failed == 0


if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
