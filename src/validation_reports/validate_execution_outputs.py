"""
Validation script for execution outputs in src/execution_outputs/

This script validates all execution output JSON files to ensure data quality
and generates a comprehensive report of invalid entries with statistics by language.

"""

import json
import os
import re
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple, Optional
import sys


class ExecutionOutputValidator:
    """Validator for execution output JSON files."""

    def __init__(self, execution_outputs_dir: str):
        """
        Initialize the validator.

        Args:
            execution_outputs_dir: Path to the execution_outputs directory
        """
        self.execution_outputs_dir = Path(execution_outputs_dir)
        self.clusters_dir = Path(execution_outputs_dir).parent / "clusters"

        # Validation results storage
        self.validation_results = {
            "valid_entries": [],
            "invalid_entries": [],
            "total_files_processed": 0,
            "total_entries_processed": 0
        }

        # Statistics by language
        self.language_stats = defaultdict(lambda: {
            "total_entries": 0,
            "valid_entries": 0,
            "invalid_entries": 0,
            "invalid_details": {
                "none_values": 0,
                "zero_execution_time": 0,
                "failed_regression_test": 0
            }
        })

        # Cluster to language mapping
        self.cluster_language_map = {}
        self._load_cluster_metadata()

    def _load_cluster_metadata(self):
        """Load cluster metadata to map cluster names to programming languages."""
        print("Loading cluster metadata...")

        if not self.clusters_dir.exists():
            print(f"Warning: Clusters directory not found at {self.clusters_dir}")
            return

        for cluster_file in self.clusters_dir.glob("cluster_*.json"):
            try:
                with open(cluster_file, 'r', encoding='utf-8') as f:
                    cluster_data = json.load(f)

                cluster_name = cluster_file.stem.replace("cluster_", "")

                # Extract languages from the cluster (clusters can have multiple languages)
                languages = set()
                for lang_key, entries in cluster_data.items():
                    if isinstance(entries, list) and len(entries) > 0:
                        for entry in entries:
                            if "language" in entry:
                                languages.add(entry["language"])

                if languages:
                    # Store all languages for this cluster
                    self.cluster_language_map[cluster_name] = list(languages)

            except Exception as e:
                print(f"Error loading cluster {cluster_file}: {e}")

        print(f"Loaded metadata for {len(self.cluster_language_map)} clusters")

    def _parse_filename(self, filename: str) -> Optional[Dict[str, any]]:
        """
        Parse execution output filename to extract metadata.

        Filename patterns:
        - {cluster_name}_results_{exec_number}.json (base code)
        - {cluster_name}_results_v{prompt_version}_{exec_number}.json (LLM code)

        Args:
            filename: Name of the file to parse

        Returns:
            Dict with parsed metadata or None if parsing fails
        """
        # Pattern for LLM-generated code results
        llm_pattern = r"^(.+)_results_v(\d+)_(\d+)\.json$"
        # Pattern for base code results
        base_pattern = r"^(.+)_results_(\d+)\.json$"

        llm_match = re.match(llm_pattern, filename)
        if llm_match:
            return {
                "cluster_name": llm_match.group(1),
                "prompt_version": int(llm_match.group(2)),
                "execution_number": int(llm_match.group(3)),
                "is_llm_generated": True
            }

        base_match = re.match(base_pattern, filename)
        if base_match:
            return {
                "cluster_name": base_match.group(1),
                "prompt_version": None,
                "execution_number": int(base_match.group(2)),
                "is_llm_generated": False
            }

        return None

    def _validate_entry(self, entry: Dict, file_metadata: Dict) -> Tuple[bool, List[str]]:
        """
        Validate a single entry based on the criteria:
        1. All metric values must not be None
        2. execution_time_ms must not be 0
        3. regressionTestPassed can be False (just not None)

        Args:
            entry: The entry data to validate
            file_metadata: Metadata about the file

        Returns:
            Tuple of (is_valid, list of validation errors)
        """
        errors = []

        # Required metrics
        required_metrics = ["CPU_usage", "RAM_usage", "execution_time_ms", "regressionTestPassed"]

        # Check 1: No None values
        for metric in required_metrics:
            if metric not in entry:
                errors.append(f"Missing metric: {metric}")
            elif entry[metric] is None:
                errors.append(f"{metric} is None")

        # Check 2: execution_time_ms must not be 0
        if "execution_time_ms" in entry and entry["execution_time_ms"] is not None:
            if entry["execution_time_ms"] == 0:
                errors.append("execution_time_ms is 0")

        # Note: regressionTestPassed can be False, that's valid

        return len(errors) == 0, errors

    def _get_languages_for_cluster(self, cluster_name: str) -> List[str]:
        """Get the programming languages associated with a cluster."""
        return self.cluster_language_map.get(cluster_name, ["unknown"])

    def validate_file(self, file_path: Path) -> Dict:
        """
        Validate all entries in a single execution output file.

        Args:
            file_path: Path to the JSON file

        Returns:
            Dict with validation results for this file
        """
        file_result = {
            "filename": file_path.name,
            "file_path": str(file_path),
            "valid": True,
            "entries": [],
            "summary": {
                "total_entries": 0,
                "valid_entries": 0,
                "invalid_entries": 0
            }
        }

        # Parse filename
        file_metadata = self._parse_filename(file_path.name)
        if not file_metadata:
            file_result["valid"] = False
            file_result["error"] = "Could not parse filename"
            return file_result

        file_result["metadata"] = file_metadata

        # Load JSON data
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception as e:
            file_result["valid"] = False
            file_result["error"] = f"Error loading JSON: {str(e)}"
            return file_result

        # Get languages for this cluster
        cluster_languages = self._get_languages_for_cluster(file_metadata["cluster_name"])

        # Extract LLM results from the nested structure
        # Structure: { "results": { "language": [{ "id": "...", "LLM_results": [...] }] } }
        llm_results_to_validate = []

        if isinstance(data, dict) and "results" in data:
            results_section = data["results"]
            for lang_key, entries in results_section.items():
                if isinstance(entries, list):
                    for entry in entries:
                        if isinstance(entry, dict) and "LLM_results" in entry:
                            entry_id = entry.get("id", "unknown")
                            entry_language = entry.get("language", lang_key)

                            for llm_result in entry["LLM_results"]:
                                llm_results_to_validate.append({
                                    "entry_id": entry_id,
                                    "language": entry_language,
                                    "llm_result": llm_result
                                })

        file_result["summary"]["total_entries"] = len(llm_results_to_validate)

        for idx, item in enumerate(llm_results_to_validate):
            llm_result = item["llm_result"]
            entry_id = item["entry_id"]
            entry_language = item["language"]

            is_valid, errors = self._validate_entry(llm_result, file_metadata)

            entry_result = {
                "entry_index": idx,
                "entry_id": entry_id,
                "llm_type": llm_result.get("LLM_type", "unknown"),
                "valid": is_valid,
                "errors": errors,
                "metrics": {
                    "CPU_usage": llm_result.get("CPU_usage"),
                    "RAM_usage": llm_result.get("RAM_usage"),
                    "execution_time_ms": llm_result.get("execution_time_ms"),
                    "regressionTestPassed": llm_result.get("regressionTestPassed")
                },
                "language": entry_language
            }

            file_result["entries"].append(entry_result)

            if is_valid:
                file_result["summary"]["valid_entries"] += 1
                self.validation_results["valid_entries"].append({
                    "file": file_path.name,
                    "cluster": file_metadata["cluster_name"],
                    "entry_id": entry_id,
                    "language": entry_language,
                    "llm_type": entry_result["llm_type"]
                })

                # Update language stats
                self.language_stats[entry_language]["total_entries"] += 1
                self.language_stats[entry_language]["valid_entries"] += 1
            else:
                file_result["summary"]["invalid_entries"] += 1
                file_result["valid"] = False

                invalid_entry_info = {
                    "file": file_path.name,
                    "cluster": file_metadata["cluster_name"],
                    "entry_id": entry_id,
                    "llm_type": entry_result["llm_type"],
                    "language": entry_language,
                    "errors": errors,
                    "metrics": entry_result["metrics"],
                    "is_llm_generated": file_metadata["is_llm_generated"],
                    "prompt_version": file_metadata.get("prompt_version"),
                    "execution_number": file_metadata["execution_number"]
                }

                self.validation_results["invalid_entries"].append(invalid_entry_info)

                # Update language stats
                self.language_stats[entry_language]["total_entries"] += 1
                self.language_stats[entry_language]["invalid_entries"] += 1

                # Categorize error types
                for error in errors:
                    if "is None" in error:
                        self.language_stats[entry_language]["invalid_details"]["none_values"] += 1
                    elif "execution_time_ms is 0" in error:
                        self.language_stats[entry_language]["invalid_details"]["zero_execution_time"] += 1

                # Check if it's a failed regression test case
                if llm_result.get("regressionTestPassed") is False:
                    self.language_stats[entry_language]["invalid_details"]["failed_regression_test"] += 1

        self.validation_results["total_entries_processed"] += file_result["summary"]["total_entries"]

        return file_result

    def validate_all_files(self) -> List[Dict]:
        """
        Validate all JSON files in the execution_outputs directory.

        Returns:
            List of validation results for all files
        """
        all_results = []

        if not self.execution_outputs_dir.exists():
            print(f"Error: Directory {self.execution_outputs_dir} does not exist")
            return all_results

        # Get all JSON files
        json_files = sorted(self.execution_outputs_dir.glob("*.json"))

        print(f"\nFound {len(json_files)} JSON files to validate")
        print("=" * 80)

        for idx, file_path in enumerate(json_files, 1):
            print(f"Processing {idx}/{len(json_files)}: {file_path.name}")

            result = self.validate_file(file_path)
            all_results.append(result)

            self.validation_results["total_files_processed"] += 1

            # Print progress
            if result["valid"]:
                print(f"  ✓ Valid - {result['summary']['valid_entries']} entries")
            else:
                print(f"  ✗ Invalid - {result['summary']['invalid_entries']}/{result['summary']['total_entries']} invalid entries")

        return all_results

    def generate_report(self, output_file: Optional[str] = None) -> str:
        """
        Generate a comprehensive validation report.

        Args:
            output_file: Optional path to save the report

        Returns:
            The report as a string
        """
        report_lines = []

        report_lines.append("=" * 80)
        report_lines.append("EXECUTION OUTPUTS VALIDATION REPORT")
        report_lines.append("=" * 80)
        report_lines.append("")

        # Overall summary
        report_lines.append("OVERALL SUMMARY")
        report_lines.append("-" * 80)
        report_lines.append(f"Total files processed: {self.validation_results['total_files_processed']}")
        report_lines.append(f"Total entries processed: {self.validation_results['total_entries_processed']}")
        report_lines.append(f"Valid entries: {len(self.validation_results['valid_entries'])}")
        report_lines.append(f"Invalid entries: {len(self.validation_results['invalid_entries'])}")

        if self.validation_results['total_entries_processed'] > 0:
            validity_rate = (len(self.validation_results['valid_entries']) /
                           self.validation_results['total_entries_processed']) * 100
            report_lines.append(f"Validity rate: {validity_rate:.2f}%")

        report_lines.append("")

        # Language statistics
        report_lines.append("STATISTICS BY PROGRAMMING LANGUAGE")
        report_lines.append("-" * 80)

        # Sort languages by number of invalid entries (descending)
        sorted_languages = sorted(
            self.language_stats.items(),
            key=lambda x: x[1]["invalid_entries"],
            reverse=True
        )

        for language, stats in sorted_languages:
            report_lines.append(f"\n{language.upper()}:")
            report_lines.append(f"  Total entries: {stats['total_entries']}")
            report_lines.append(f"  Valid entries: {stats['valid_entries']}")
            report_lines.append(f"  Invalid entries: {stats['invalid_entries']}")

            if stats['total_entries'] > 0:
                invalid_rate = (stats['invalid_entries'] / stats['total_entries']) * 100
                report_lines.append(f"  Invalid rate: {invalid_rate:.2f}%")

            if stats['invalid_entries'] > 0:
                report_lines.append(f"  Invalid details:")
                report_lines.append(f"    - None values: {stats['invalid_details']['none_values']}")
                report_lines.append(f"    - Zero execution time: {stats['invalid_details']['zero_execution_time']}")
                report_lines.append(f"    - Failed regression tests: {stats['invalid_details']['failed_regression_test']}")

        report_lines.append("")

        # Invalid entries details
        if self.validation_results['invalid_entries']:
            report_lines.append("INVALID ENTRIES DETAILS")
            report_lines.append("-" * 80)

            # Group by cluster
            clusters_with_issues = defaultdict(list)
            for invalid_entry in self.validation_results['invalid_entries']:
                clusters_with_issues[invalid_entry['cluster']].append(invalid_entry)

            report_lines.append(f"\nTotal clusters with invalid entries: {len(clusters_with_issues)}")
            report_lines.append("")

            for cluster_name, invalid_entries in sorted(clusters_with_issues.items()):
                report_lines.append(f"\nCluster: {cluster_name}")
                report_lines.append(f"  Invalid entries: {len(invalid_entries)}")

                # Group by file
                files_in_cluster = defaultdict(list)
                for entry in invalid_entries:
                    files_in_cluster[entry['file']].append(entry)

                for filename, entries in sorted(files_in_cluster.items()):
                    report_lines.append(f"\n  File: {filename}")

                    for entry in entries:
                        report_lines.append(f"    - Entry ID: {entry['entry_id']}")
                        report_lines.append(f"      Language: {entry['language']}")
                        report_lines.append(f"      LLM Type: {entry.get('llm_type', 'N/A')}")
                        report_lines.append(f"      Errors: {', '.join(entry['errors'])}")
                        report_lines.append(f"      Metrics: CPU={entry['metrics']['CPU_usage']}, "
                                          f"RAM={entry['metrics']['RAM_usage']}, "
                                          f"Time={entry['metrics']['execution_time_ms']}, "
                                          f"TestPassed={entry['metrics']['regressionTestPassed']}")

                        if entry['is_llm_generated']:
                            report_lines.append(f"      LLM Generated: Yes (prompt v{entry['prompt_version']}, "
                                              f"execution {entry['execution_number']})")
                        else:
                            report_lines.append(f"      Base code (execution {entry['execution_number']})")
        else:
            report_lines.append("NO INVALID ENTRIES FOUND - All validation checks passed!")

        report_lines.append("")
        report_lines.append("=" * 80)
        report_lines.append("END OF REPORT")
        report_lines.append("=" * 80)

        report = "\n".join(report_lines)

        # Save to file if specified
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(report)
            print(f"\nReport saved to: {output_file}")

        return report

    def save_detailed_json_report(self, output_file: str):
        """
        Save detailed validation results as JSON.

        Args:
            output_file: Path to save the JSON report
        """
        detailed_report = {
            "summary": {
                "total_files_processed": self.validation_results["total_files_processed"],
                "total_entries_processed": self.validation_results["total_entries_processed"],
                "valid_entries_count": len(self.validation_results["valid_entries"]),
                "invalid_entries_count": len(self.validation_results["invalid_entries"])
            },
            "language_statistics": dict(self.language_stats),
            "invalid_entries": self.validation_results["invalid_entries"]
        }

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(detailed_report, f, indent=2, ensure_ascii=False)

        print(f"Detailed JSON report saved to: {output_file}")


def main():
    """Main execution function."""
    # Set up paths
    src_dir = Path(__file__).parent.parent
    execution_outputs_dir = src_dir / "execution_outputs"
    reports_dir = src_dir / "validation_reports"

    # Create reports directory if it doesn't exist
    reports_dir.mkdir(exist_ok=True)

    print("=" * 80)
    print("EXECUTION OUTPUTS VALIDATOR")
    print("=" * 80)
    print(f"Execution outputs directory: {execution_outputs_dir}")
    print(f"Reports directory: {reports_dir}")
    print("")

    # Create validator
    validator = ExecutionOutputValidator(str(execution_outputs_dir))

    # Run validation
    print("Starting validation...")
    validator.validate_all_files()

    # Generate reports
    print("\n" + "=" * 80)
    print("Generating reports...")
    print("=" * 80 + "\n")

    # Text report
    text_report_path = reports_dir / "validation_report.txt"
    report = validator.generate_report(str(text_report_path))

    # Print report to console
    print(report)

    # JSON report
    json_report_path = reports_dir / "validation_report_detailed.json"
    validator.save_detailed_json_report(str(json_report_path))

    print("\n" + "=" * 80)
    print("VALIDATION COMPLETED")
    print("=" * 80)


if __name__ == "__main__":
    main()
