#!/usr/bin/env python3
"""
Script to identify improvement outliers in LLM-generated code performance metrics.

This script:
1. Calculates mean metrics across 5 executions for base code
2. Calculates mean metrics across 5 executions for LLM-generated code (per model and prompt version)
3. Computes improvement percentages entry by entry
4. Identifies outliers based on a configurable threshold
5. Generates detailed JSON reports with raw data for debugging

"""

import json
import argparse
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
from collections import defaultdict
from datetime import datetime

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).resolve().parent.parent))
from utility_dir.utility_paths import OUTPUT_DIR_FILEPATH, METRICS_DIR_FILEPATH


@dataclass
class MetricData:
    """Container for metric values and metadata"""
    execution_time_ms: float
    CPU_usage: float
    RAM_usage: float
    regressionTestPassed: bool

    def is_valid(self) -> bool:
        """Check if metrics are valid (non-zero execution time, no None values)"""
        return (
            self.execution_time_ms is not None and
            self.execution_time_ms > 0 and
            self.CPU_usage is not None and
            self.RAM_usage is not None and
            self.regressionTestPassed
        )

    def to_dict(self) -> Dict:
        """Convert to dictionary"""
        return {
            'execution_time_ms': self.execution_time_ms,
            'CPU_usage': self.CPU_usage,
            'RAM_usage': self.RAM_usage,
            'regressionTestPassed': self.regressionTestPassed
        }

    @staticmethod
    def safe_float_conversion(value) -> Optional[float]:
        """
        Safely convert a value to float, handling strings and None

        Args:
            value: Value to convert (can be int, float, string, or None)

        Returns:
            Float value or None if conversion fails
        """
        if value is None:
            return None
        try:
            return float(value)
        except (ValueError, TypeError):
            return None


@dataclass
class OutlierReport:
    """Container for outlier information"""
    cluster_name: str
    entry_id_base: str
    entry_id_llm: str
    llm_model: str
    prompt_version: str
    language: str
    metric_name: str
    improvement_percentage: float
    base_mean: float
    llm_mean: float
    base_raw_values: List[float]
    llm_raw_values: List[float]
    base_execution_files: List[str]
    llm_execution_files: List[str]

    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        return asdict(self)


class ImprovementOutlierFinder:
    """Main class for finding improvement outliers in execution metrics"""

    METRIC_NAMES = ['execution_time_ms', 'CPU_usage', 'RAM_usage']
    PROMPT_VERSIONS = ['v1', 'v2', 'v3', 'v4']

    def __init__(self, execution_outputs_dir: Path, threshold_percentage: float = 200.0):
        """
        Initialize the outlier finder

        Args:
            execution_outputs_dir: Directory containing execution result JSON files
            threshold_percentage: Absolute percentage threshold for outlier detection (default: 200%)
        """
        self.execution_outputs_dir = Path(execution_outputs_dir)
        self.threshold_percentage = abs(threshold_percentage)
        self.outliers: List[OutlierReport] = []

        print(f"Initialized OutlierFinder with threshold: ±{self.threshold_percentage}%")
        print(f"Execution outputs directory: {self.execution_outputs_dir}")

    def get_cluster_names(self) -> List[str]:
        """Extract unique cluster names from execution output files"""
        cluster_names = set()

        # Look for base execution files (pattern: {cluster}_results_1.json)
        for file_path in self.execution_outputs_dir.glob("*_results_1.json"):
            filename = file_path.stem  # Remove .json
            # Remove _results_1 suffix to get cluster name
            cluster_name = filename.replace("_results_1", "")
            cluster_names.add(cluster_name)

        return sorted(list(cluster_names))

    def load_execution_file(self, file_path: Path) -> Optional[Dict]:
        """
        Load and parse execution JSON file

        Args:
            file_path: Path to JSON file

        Returns:
            Parsed JSON data or None if file doesn't exist or is invalid
        """
        if not file_path.exists():
            return None

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data
        except (json.JSONDecodeError, IOError) as e:
            print(f"Warning: Failed to load {file_path}: {e}")
            return None

    def extract_base_metrics(self, execution_data: Dict) -> Dict[str, List[MetricData]]:
        """
        Extract metrics from base code execution data

        Args:
            execution_data: Loaded JSON data from base execution file

        Returns:
            Dictionary mapping entry_id to list of MetricData objects
        """
        metrics_by_entry = defaultdict(list)

        if not execution_data or 'results' not in execution_data:
            return metrics_by_entry

        results = execution_data['results']

        # Iterate through all language sections
        for language, entries in results.items():
            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue

                metric_data = MetricData(
                    execution_time_ms=MetricData.safe_float_conversion(entry.get('execution_time_ms')),
                    CPU_usage=MetricData.safe_float_conversion(entry.get('CPU_usage')),
                    RAM_usage=MetricData.safe_float_conversion(entry.get('RAM_usage')),
                    regressionTestPassed=entry.get('regressionTestPassed', False)
                )

                if metric_data.is_valid():
                    metrics_by_entry[entry_id].append(metric_data)

        return metrics_by_entry

    def extract_llm_metrics(self, execution_data: Dict) -> Dict[Tuple[str, str, str], List[MetricData]]:
        """
        Extract metrics from LLM execution data

        Args:
            execution_data: Loaded JSON data from LLM execution file

        Returns:
            Dictionary mapping (entry_id, llm_type, language) to list of MetricData objects
        """
        metrics_by_entry_llm = defaultdict(list)

        if not execution_data or 'results' not in execution_data:
            return metrics_by_entry_llm

        results = execution_data['results']

        # Iterate through all language sections
        for language, entries in results.items():
            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue

                llm_results = entry.get('LLM_results', [])
                for llm_result in llm_results:
                    llm_type = llm_result.get('LLM_type')
                    if not llm_type:
                        continue

                    metric_data = MetricData(
                        execution_time_ms=MetricData.safe_float_conversion(llm_result.get('execution_time_ms')),
                        CPU_usage=MetricData.safe_float_conversion(llm_result.get('CPU_usage')),
                        RAM_usage=MetricData.safe_float_conversion(llm_result.get('RAM_usage')),
                        regressionTestPassed=llm_result.get('regressionTestPassed', False)
                    )

                    if metric_data.is_valid():
                        key = (entry_id, llm_type, language)
                        metrics_by_entry_llm[key].append(metric_data)

        return metrics_by_entry_llm

    def calculate_base_means(self, cluster_name: str) -> Dict[str, Dict[str, float]]:
        """
        Calculate mean metrics for base code across 5 executions (point 1.1)

        Args:
            cluster_name: Name of the cluster

        Returns:
            Dictionary mapping entry_id to mean metrics and raw values
        """
        base_means = {}

        # Collect metrics from all 5 executions
        all_metrics = defaultdict(list)
        execution_files = []

        for execution_num in range(1, 6):
            file_path = self.execution_outputs_dir / f"{cluster_name}_results_{execution_num}.json"
            execution_files.append(str(file_path.name))

            execution_data = self.load_execution_file(file_path)
            if not execution_data:
                continue

            metrics_by_entry = self.extract_base_metrics(execution_data)

            for entry_id, metric_list in metrics_by_entry.items():
                all_metrics[entry_id].extend(metric_list)

        # Calculate means for each entry
        for entry_id, metric_list in all_metrics.items():
            if not metric_list:
                continue

            # Calculate means for each metric
            means = {
                'execution_time_ms': sum(m.execution_time_ms for m in metric_list) / len(metric_list),
                'CPU_usage': sum(m.CPU_usage for m in metric_list) / len(metric_list),
                'RAM_usage': sum(m.RAM_usage for m in metric_list) / len(metric_list),
                'raw_values': {
                    'execution_time_ms': [m.execution_time_ms for m in metric_list],
                    'CPU_usage': [m.CPU_usage for m in metric_list],
                    'RAM_usage': [m.RAM_usage for m in metric_list]
                },
                'num_executions': len(metric_list),
                'execution_files': execution_files
            }

            base_means[entry_id] = means

        return base_means

    def calculate_llm_means(self, cluster_name: str, prompt_version: str) -> Dict[Tuple[str, str, str], Dict[str, float]]:
        """
        Calculate mean metrics for LLM code across 5 executions (point 1.2)

        Args:
            cluster_name: Name of the cluster
            prompt_version: Prompt version (v1, v2, v3, v4)

        Returns:
            Dictionary mapping (entry_id, llm_type, language) to mean metrics and raw values
        """
        llm_means = {}

        # Collect metrics from all 5 executions
        all_metrics = defaultdict(list)
        execution_files = []

        for execution_num in range(1, 6):
            file_path = self.execution_outputs_dir / f"{cluster_name}_results_{prompt_version}_{execution_num}.json"
            execution_files.append(str(file_path.name))

            execution_data = self.load_execution_file(file_path)
            if not execution_data:
                continue

            metrics_by_entry_llm = self.extract_llm_metrics(execution_data)

            for key, metric_list in metrics_by_entry_llm.items():
                all_metrics[key].extend(metric_list)

        # Calculate means for each (entry_id, llm_type, language) combination
        for key, metric_list in all_metrics.items():
            if not metric_list:
                continue

            # Calculate means for each metric
            means = {
                'execution_time_ms': sum(m.execution_time_ms for m in metric_list) / len(metric_list),
                'CPU_usage': sum(m.CPU_usage for m in metric_list) / len(metric_list),
                'RAM_usage': sum(m.RAM_usage for m in metric_list) / len(metric_list),
                'raw_values': {
                    'execution_time_ms': [m.execution_time_ms for m in metric_list],
                    'CPU_usage': [m.CPU_usage for m in metric_list],
                    'RAM_usage': [m.RAM_usage for m in metric_list]
                },
                'num_executions': len(metric_list),
                'execution_files': execution_files
            }

            llm_means[key] = means

        return llm_means

    def calculate_improvement(self, base_value: float, llm_value: float) -> float:
        """
        Calculate improvement percentage (point 1.3)

        For CPU, RAM, and execution_time: negative improvement is good (reduction)
        Formula: (llm_value - base_value) / base_value * 100

        Args:
            base_value: Mean value from base code
            llm_value: Mean value from LLM code

        Returns:
            Improvement percentage (negative = improvement, positive = degradation)
        """
        if base_value == 0:
            return 0.0

        return ((llm_value - base_value) / base_value) * 100.0

    def is_outlier(self, improvement_percentage: float) -> bool:
        """
        Check if improvement percentage is an outlier (point 2)

        Args:
            improvement_percentage: Calculated improvement percentage

        Returns:
            True if absolute value exceeds threshold
        """
        return abs(improvement_percentage) >= self.threshold_percentage

    def analyze_cluster(self, cluster_name: str) -> List[OutlierReport]:
        """
        Analyze a single cluster for outliers

        Args:
            cluster_name: Name of the cluster to analyze

        Returns:
            List of OutlierReport objects
        """
        outliers = []

        print(f"\nAnalyzing cluster: {cluster_name}")

        # Calculate base means
        base_means = self.calculate_base_means(cluster_name)

        if not base_means:
            print(f"  No valid base metrics found for {cluster_name}")
            return outliers

        print(f"  Found {len(base_means)} entries with valid base metrics")

        # Analyze each prompt version
        for prompt_version in self.PROMPT_VERSIONS:
            # Calculate LLM means for this prompt version
            llm_means = self.calculate_llm_means(cluster_name, prompt_version)

            if not llm_means:
                print(f"  No valid LLM metrics found for {cluster_name} {prompt_version}")
                continue

            print(f"  Analyzing prompt version {prompt_version}: {len(llm_means)} LLM entries")

            # Compare LLM results with base results entry by entry
            for (entry_id, llm_type, language), llm_data in llm_means.items():
                # Find corresponding base entry
                if entry_id not in base_means:
                    continue

                base_data = base_means[entry_id]

                # Calculate improvements for each metric
                for metric_name in self.METRIC_NAMES:
                    base_mean = base_data[metric_name]
                    llm_mean = llm_data[metric_name]

                    improvement = self.calculate_improvement(base_mean, llm_mean)

                    # Check if this is an outlier
                    if self.is_outlier(improvement):
                        outlier = OutlierReport(
                            cluster_name=cluster_name,
                            entry_id_base=entry_id,
                            entry_id_llm=entry_id,  # Same entry, different implementation
                            llm_model=llm_type,
                            prompt_version=prompt_version,
                            language=language,
                            metric_name=metric_name,
                            improvement_percentage=improvement,
                            base_mean=base_mean,
                            llm_mean=llm_mean,
                            base_raw_values=base_data['raw_values'][metric_name],
                            llm_raw_values=llm_data['raw_values'][metric_name],
                            base_execution_files=base_data['execution_files'],
                            llm_execution_files=llm_data['execution_files']
                        )

                        outliers.append(outlier)

                        print(f"    OUTLIER FOUND: {entry_id} | {llm_type} | {prompt_version} | {metric_name}")
                        print(f"      Improvement: {improvement:+.2f}% (base: {base_mean:.2f}, llm: {llm_mean:.2f})")

        return outliers

    def analyze_all_clusters(self) -> List[OutlierReport]:
        """
        Analyze all clusters in the execution outputs directory

        Returns:
            List of all OutlierReport objects found
        """
        cluster_names = self.get_cluster_names()

        print(f"\nFound {len(cluster_names)} clusters to analyze")
        print(f"Threshold for outliers: ±{self.threshold_percentage}%")
        print("="*80)

        all_outliers = []

        for cluster_name in cluster_names:
            cluster_outliers = self.analyze_cluster(cluster_name)
            all_outliers.extend(cluster_outliers)

        print("\n" + "="*80)
        print(f"Analysis complete: Found {len(all_outliers)} outliers across {len(cluster_names)} clusters")

        return all_outliers

    def save_report(self, outliers: List[OutlierReport], output_path: Path) -> None:
        """
        Save outlier report to JSON file (point 4)

        Args:
            outliers: List of OutlierReport objects
            output_path: Path where to save the report
        """
        report_data = {
            'metadata': {
                'generation_date': datetime.now().isoformat(),
                'threshold_percentage': self.threshold_percentage,
                'total_outliers': len(outliers),
                'execution_outputs_dir': str(self.execution_outputs_dir)
            },
            'outliers': [outlier.to_dict() for outlier in outliers]
        }

        # Group outliers by type for summary
        summary = {
            'by_cluster': defaultdict(int),
            'by_llm_model': defaultdict(int),
            'by_prompt_version': defaultdict(int),
            'by_metric': defaultdict(int),
            'by_language': defaultdict(int)
        }

        for outlier in outliers:
            summary['by_cluster'][outlier.cluster_name] += 1
            summary['by_llm_model'][outlier.llm_model] += 1
            summary['by_prompt_version'][outlier.prompt_version] += 1
            summary['by_metric'][outlier.metric_name] += 1
            summary['by_language'][outlier.language] += 1

        # Convert defaultdict to regular dict for JSON serialization
        report_data['summary'] = {
            'by_cluster': dict(summary['by_cluster']),
            'by_llm_model': dict(summary['by_llm_model']),
            'by_prompt_version': dict(summary['by_prompt_version']),
            'by_metric': dict(summary['by_metric']),
            'by_language': dict(summary['by_language'])
        }

        # Save to file
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)

        print(f"\nReport saved to: {output_path}")
        print(f"Total outliers: {len(outliers)}")
        print("\nSummary:")
        print(f"  By LLM Model: {dict(summary['by_llm_model'])}")
        print(f"  By Prompt Version: {dict(summary['by_prompt_version'])}")
        print(f"  By Metric: {dict(summary['by_metric'])}")
        print(f"  By Language: {dict(summary['by_language'])}")


def main():
    """Main entry point for the script"""
    parser = argparse.ArgumentParser(
        description='Find improvement outliers in LLM-generated code performance metrics',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Use default threshold (200%)
  python find_improvement_outliers.py

  # Use custom threshold (300%)
  python find_improvement_outliers.py --threshold 300

  # Specify custom output file
  python find_improvement_outliers.py --output my_outliers.json

  # Use custom execution outputs directory
  python find_improvement_outliers.py --exec-dir /path/to/execution_outputs
        """
    )

    parser.add_argument(
        '--threshold',
        type=float,
        default=200.0,
        help='Absolute percentage threshold for outlier detection (default: 200%%)'
    )

    parser.add_argument(
        '--output',
        type=str,
        default=None,
        help='Output JSON file path (default: metrics/outlier_reports/outliers_report_YYYYMMDD_HHMMSS.json)'
    )

    parser.add_argument(
        '--exec-dir',
        type=str,
        default=None,
        help='Execution outputs directory (default: uses utility_paths.OUTPUT_DIR_FILEPATH)'
    )

    args = parser.parse_args()

    # Determine execution outputs directory
    exec_dir = Path(args.exec_dir) if args.exec_dir else OUTPUT_DIR_FILEPATH

    if not exec_dir.exists():
        print(f"Error: Execution outputs directory does not exist: {exec_dir}")
        sys.exit(1)

    # Create outlier finder instance
    finder = ImprovementOutlierFinder(
        execution_outputs_dir=exec_dir,
        threshold_percentage=args.threshold
    )

    # Analyze all clusters
    outliers = finder.analyze_all_clusters()

    # Determine output path
    if args.output:
        output_path = Path(args.output)
    else:
        # Create default output path with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        outlier_reports_dir = METRICS_DIR_FILEPATH / "outlier_reports"
        output_path = outlier_reports_dir / f"outliers_report_{timestamp}.json"

    # Save report
    finder.save_report(outliers, output_path)

    print("\n" + "="*80)
    print("Analysis complete!")
    print(f"Found {len(outliers)} outliers with threshold ±{args.threshold}%")
    print(f"Report saved to: {output_path}")


if __name__ == "__main__":
    main()