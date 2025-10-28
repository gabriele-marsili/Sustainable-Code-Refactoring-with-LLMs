"""Data validation utilities"""

import sys
import os
from typing import Dict, List, Tuple

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))


class DataValidator:
    """Validator for data structures"""

    @staticmethod
    def validate_cluster_structure(data: Dict) -> Tuple[bool, List[str]]:
        """
        Validate cluster JSON structure

        Expected structure:
        {
            "python": [{"id": ..., "filename": ..., "LLMs": [...]}],
            "java": [...],
            ...
        }

        Args:
            data: Cluster data dictionary

        Returns:
            Tuple of (is_valid, list_of_errors)
        """
        errors = []

        if not isinstance(data, dict):
            errors.append("Cluster data must be a dictionary")
            return (False, errors)

        # Check if there are language keys
        if not data:
            errors.append("Cluster data is empty")
            return (False, errors)

        # Validate each language section
        for language, entries in data.items():
            if not isinstance(entries, list):
                errors.append(f"Language '{language}' entries must be a list")
                continue

            for idx, entry in enumerate(entries):
                if not isinstance(entry, dict):
                    errors.append(f"Language '{language}' entry {idx} must be a dict")
                    continue

                # Check required fields
                required_fields = ['id', 'filename', 'language']
                for field in required_fields:
                    if field not in entry:
                        errors.append(
                            f"Language '{language}' entry {idx} missing field: {field}"
                        )

                # Validate LLMs field if present
                if 'LLMs' in entry:
                    if not isinstance(entry['LLMs'], list):
                        errors.append(
                            f"Language '{language}' entry {idx} LLMs must be a list"
                        )

        return (len(errors) == 0, errors)

    @staticmethod
    def validate_execution_output(data: Dict) -> Tuple[bool, List[str]]:
        """
        Validate execution output JSON structure

        Expected structure:
        {
            "results": {
                "python": [
                    {
                        "id": ...,
                        "execution_time_ms": ...,
                        "CPU_usage": ...,
                        ...
                    }
                ]
            }
        }

        Args:
            data: Execution output data

        Returns:
            Tuple of (is_valid, list_of_errors)
        """
        errors = []

        if not isinstance(data, dict):
            errors.append("Execution output must be a dictionary")
            return (False, errors)

        if 'results' not in data:
            errors.append("Missing 'results' key in execution output")
            return (False, errors)

        results = data['results']
        if not isinstance(results, dict):
            errors.append("'results' must be a dictionary")
            return (False, errors)

        # Validate each language section
        for language, entries in results.items():
            if not isinstance(entries, list):
                errors.append(f"Results for '{language}' must be a list")
                continue

            for idx, entry in enumerate(entries):
                if not isinstance(entry, dict):
                    errors.append(f"Entry {idx} in '{language}' must be a dict")
                    continue

                # Check for entry ID
                if 'id' not in entry:
                    errors.append(f"Entry {idx} in '{language}' missing 'id'")

        return (len(errors) == 0, errors)

    @staticmethod
    def validate_metrics(
        metrics: Dict[str, float],
        required_metrics: List[str]
    ) -> Tuple[bool, List[str]]:
        """
        Validate metrics dictionary

        Args:
            metrics: Dictionary of metric_name -> value
            required_metrics: List of required metric names

        Returns:
            Tuple of (is_valid, list_of_issues)
        """
        issues = []

        # Check for missing metrics
        for metric in required_metrics:
            if metric not in metrics:
                issues.append(f"Missing metric: {metric}")
            elif metrics[metric] is None:
                issues.append(f"Metric {metric} is None")
            elif metrics[metric] <= 0:
                issues.append(f"Metric {metric} has invalid value: {metrics[metric]}")

        return (len(issues) == 0, issues)

    @staticmethod
    def validate_entry_completeness(entry: Dict) -> Tuple[bool, List[str]]:
        """
        Validate if an entry has complete data

        Args:
            entry: Entry dictionary

        Returns:
            Tuple of (is_complete, list_of_missing_items)
        """
        missing = []

        required_base_fields = ['id', 'filename', 'language']
        for field in required_base_fields:
            if field not in entry or entry[field] is None:
                missing.append(field)

        required_metrics = ['execution_time_ms', 'CPU_usage', 'RAM_usage']
        for metric in required_metrics:
            if metric not in entry or entry[metric] is None:
                missing.append(metric)

        return (len(missing) == 0, missing)

    @staticmethod
    def is_valid_json_file(data: Dict) -> bool:
        """
        Basic check if data looks like valid JSON

        Args:
            data: Data to check

        Returns:
            True if valid
        """
        return isinstance(data, (dict, list))
