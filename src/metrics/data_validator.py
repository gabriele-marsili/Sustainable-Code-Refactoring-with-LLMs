"""
Data Validator per i file JSON di risultati esecuzione.
Verifica integrità, completezza e correttezza dei dati.
"""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths, general_utils
from exec_metrics_config import ExecMetricsAnalysisConfig
from typing import Dict, List
import logging
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class ValidationIssue:
    """Rappresenta un problema di validazione."""

    severity: str  # "error", "warning", "info"
    category: str  # "missing_file", "invalid_structure", "missing_data", etc.
    message: str
    file: str = ""
    details: Dict = field(default_factory=dict)

    def __str__(self):
        return f"[{self.severity.upper()}] {self.category}: {self.message}"


@dataclass
class ValidationReport:
    """Report completo di validazione."""

    cluster_name: str
    timestamp: str
    total_files_checked: int = 0
    valid_files: int = 0
    issues: List[ValidationIssue] = field(default_factory=list)

    @property
    def has_errors(self) -> bool:
        return any(issue.severity == "error" for issue in self.issues)

    @property
    def has_warnings(self) -> bool:
        return any(issue.severity == "warning" for issue in self.issues)

    def add_issue(
        self,
        severity: str,
        category: str,
        message: str,
        file: str = "",
        details: Dict = None,
    ):
        """Aggiunge un issue al report."""
        self.issues.append(
            ValidationIssue(
                severity=severity,
                category=category,
                message=message,
                file=file,
                details=details or {},
            )
        )

    def get_summary(self) -> str:
        """Restituisce un riassunto del report."""
        errors = sum(1 for i in self.issues if i.severity == "error")
        warnings = sum(1 for i in self.issues if i.severity == "warning")
        info = sum(1 for i in self.issues if i.severity == "info")

        return (
            f"Validation Report for {self.cluster_name}\n"
            f"Files checked: {self.total_files_checked}\n"
            f"Valid files: {self.valid_files}\n"
            f"Errors: {errors}, Warnings: {warnings}, Info: {info}"
        )


class DataValidator:
    """Valida i dati di esecuzione."""

    def __init__(self, config: ExecMetricsAnalysisConfig = None):
        self.logger = logging.getLogger(__name__)
        self.config = config or ExecMetricsAnalysisConfig()
        self.output_results_dir = utility_paths.OUTPUT_DIR_FILEPATH

    def validate_cluster(self, cluster_name: str) -> ValidationReport:
        """
        Valida tutti i file di un cluster.
        """
        self.logger.info(f"Validating cluster: {cluster_name}")

        report = ValidationReport(
            cluster_name=cluster_name, timestamp=datetime.now().isoformat()
        )

        # Check base code files
        self._validate_base_files(cluster_name, report)

        # Check LLM files
        self._validate_llm_files(cluster_name, report)

        # Cross-validation checks
        self._cross_validate(cluster_name, report)

        return report

    def _validate_base_files(self, cluster_name: str, report: ValidationReport):
        """Valida i file dei risultati base."""
        self.logger.debug(f"Validating base files for {cluster_name}")

        for exec_num in range(1, self.config.execution.num_executions + 1):
            filename = self.config.get_base_results_filename(cluster_name, exec_num)
            filepath = self.output_results_dir / filename

            report.total_files_checked += 1

            # Check file existence
            if not filepath.exists():
                report.add_issue(
                    severity="error",
                    category="missing_file",
                    message="Base results file not found",
                    file=filename,
                )
                continue

            # Validate file content
            data = general_utils.read_json(filepath)

            if not data:
                report.add_issue(
                    severity="error",
                    category="invalid_structure",
                    message="Empty or invalid JSON file",
                    file=filename,
                )
                continue

            # Validate structure
            validation_result = self._validate_base_file_structure(data, filename)

            if validation_result["valid"]:
                report.valid_files += 1

            for issue in validation_result["issues"]:
                report.add_issue(**issue)

    def _validate_llm_files(self, cluster_name: str, report: ValidationReport):
        """Valida i file dei risultati LLM."""
        self.logger.debug(f"Validating LLM files for {cluster_name}")

        for version in self.config.llm.prompt_versions:
            for exec_num in range(1, self.config.execution.num_executions + 1):
                filename = self.config.get_llm_results_filename(
                    cluster_name, version, exec_num
                )
                filepath = self.output_results_dir / filename

                report.total_files_checked += 1

                # Check file existence
                if not filepath.exists():
                    report.add_issue(
                        severity="warning",
                        category="missing_file",
                        message="LLM results file not found",
                        file=filename,
                        details={"version": version, "execution": exec_num},
                    )
                    continue

                # Validate file content
                data = general_utils.read_json(filepath)

                if not data:
                    report.add_issue(
                        severity="error",
                        category="invalid_structure",
                        message="Empty or invalid JSON file",
                        file=filename,
                    )
                    continue

                # Validate structure
                validation_result = self._validate_llm_file_structure(data, filename)

                if validation_result["valid"]:
                    report.valid_files += 1

                for issue in validation_result["issues"]:
                    report.add_issue(**issue)

    def _validate_base_file_structure(self, data: Dict, filename: str) -> Dict:
        """Valida la struttura di un file base."""
        issues = []
        valid = True

        # Check required fields
        if "results" not in data:
            issues.append(
                {
                    "severity": "error",
                    "category": "invalid_structure",
                    "message": "Missing 'results' field",
                    "file": filename,
                }
            )
            valid = False
            return {"valid": valid, "issues": issues}

        # Check results structure
        results = data["results"]

        for language, entries in results.items():
            if not isinstance(entries, list):
                issues.append(
                    {
                        "severity": "error",
                        "category": "invalid_structure",
                        "message": f"Language '{language}' results should be a list",
                        "file": filename,
                    }
                )
                valid = False
                continue

            for idx, entry in enumerate(entries):
                # Check required fields
                required_fields = ["id", "language"]
                for req_field in required_fields:
                    if req_field not in entry:
                        issues.append(
                            {
                                "severity": "error",
                                "category": "missing_data",
                                "message": f"Entry {idx} missing required field '{req_field}'",
                                "file": filename,
                                "details": {
                                    "language": language,
                                    "entry_id": entry.get("id", "unknown"),
                                },
                            }
                        )
                        valid = False

                for metric in self.config.metrics.numeric_metrics:
                    if metric not in entry or entry[metric] is None:
                        issues.append(
                            {
                                "severity": "warning",
                                "category": "missing_metric",
                                "message": f"Entry {idx} missing metric '{metric}'",
                                "file": filename,
                                "details": {
                                    "language": language,
                                    "entry_id": entry.get("id", "unknown"),
                                },
                            }
                        )

                # Check regressionTestPassed
                if "regressionTestPassed" not in entry:
                    issues.append(
                        {
                            "severity": "warning",
                            "category": "missing_metric",
                            "message": f"Entry {idx} missing 'regressionTestPassed'",
                            "file": filename,
                            "details": {
                                "language": language,
                                "entry_id": entry.get("id", "unknown"),
                            },
                        }
                    )

        return {"valid": valid, "issues": issues}

    def _validate_llm_file_structure(self, data: Dict, filename: str) -> Dict:
        """Valida la struttura di un file LLM."""
        issues = []
        valid = True

        # Check required fields
        if "results" not in data:
            issues.append(
                {
                    "severity": "error",
                    "category": "invalid_structure",
                    "message": "Missing 'results' field",
                    "file": filename,
                }
            )
            valid = False
            return {"valid": valid, "issues": issues}

        # Check execution metadata
        if "execution_metadata" in data:
            metadata = data["execution_metadata"]

            # Validate test counts
            if "total_tests" in metadata and "successful_tests" in metadata:
                total = metadata["total_tests"]
                successful = metadata["successful_tests"]

                if successful > total:
                    issues.append(
                        {
                            "severity": "error",
                            "category": "inconsistent_data",
                            "message": f"Successful tests ({successful}) > total tests ({total})",
                            "file": filename,
                        }
                    )
                    valid = False

        # Check results structure
        results = data["results"]

        for language, entries in results.items():
            if not isinstance(entries, list):
                issues.append(
                    {
                        "severity": "error",
                        "category": "invalid_structure",
                        "message": f"Language '{language}' results should be a list",
                        "file": filename,
                    }
                )
                valid = False
                continue

            for idx, entry in enumerate(entries):
                # Check LLM_results field
                if "LLM_results" not in entry:
                    issues.append(
                        {
                            "severity": "error",
                            "category": "missing_data",
                            "message": f"Entry {idx} missing 'LLM_results' field",
                            "file": filename,
                            "details": {
                                "language": language,
                                "entry_id": entry.get("id", "unknown"),
                            },
                        }
                    )
                    valid = False
                    continue

                llm_results = entry["LLM_results"]

                if not isinstance(llm_results, list):
                    issues.append(
                        {
                            "severity": "error",
                            "category": "invalid_structure",
                            "message": f"Entry {idx} 'LLM_results' should be a list",
                            "file": filename,
                        }
                    )
                    valid = False
                    continue

                # Validate each LLM result
                for llm_idx, llm_result in enumerate(llm_results):
                    # Check LLM_type
                    if "LLM_type" not in llm_result:
                        issues.append(
                            {
                                "severity": "warning",
                                "category": "missing_data",
                                "message": f"LLM result {llm_idx} missing 'LLM_type'",
                                "file": filename,
                            }
                        )

                    for metric in self.config.metrics.numeric_metrics:
                        if metric not in llm_result or llm_result[metric] is None:
                            issues.append(
                                {
                                    "severity": "warning",
                                    "category": "missing_metric",
                                    "message": f"LLM result {llm_idx} missing metric '{metric}'",
                                    "file": filename,
                                    "details": {
                                        "language": language,
                                        "entry_id": entry.get("id", "unknown"),
                                        "llm_type": llm_result.get(
                                            "LLM_type", "unknown"
                                        ),
                                    },
                                }
                            )

        return {"valid": valid, "issues": issues}

    def _cross_validate(self, cluster_name: str, report: ValidationReport):
        """Esegue validazioni incrociate tra file."""
        self.logger.debug(f"Cross-validating {cluster_name}")

        # Check consistency of entry IDs across executions
        self._check_entry_id_consistency(cluster_name, report)

        # Check for outliers in metrics
        self._check_metric_outliers(cluster_name, report)

    def _check_entry_id_consistency(self, cluster_name: str, report: ValidationReport):
        """Verifica che gli stessi entry ID appaiano in tutte le esecuzioni."""
        # Collect entry IDs from each execution
        base_entry_ids = []

        for exec_num in range(1, self.config.execution.num_executions + 1):
            filename = self.config.get_base_results_filename(cluster_name, exec_num)
            filepath = self.output_results_dir / filename

            if not filepath.exists():
                continue

            data = general_utils.read_json(filepath)
            if not data or "results" not in data:
                continue

            entry_ids = set()
            for language, entries in data["results"].items():
                for entry in entries:
                    if "id" in entry:
                        entry_ids.add(entry["id"])

            base_entry_ids.append(entry_ids)

        # Check consistency
        if len(base_entry_ids) > 1:
            reference_ids = base_entry_ids[0]

            for idx, ids in enumerate(base_entry_ids[1:], 2):
                missing = reference_ids - ids
                extra = ids - reference_ids

                if missing:
                    report.add_issue(
                        severity="warning",
                        category="inconsistent_data",
                        message=f"Execution {idx} missing {len(missing)} entries compared to execution 1",
                        details={"missing_ids": list(missing)[:5]},  # Show first 5
                    )

                if extra:
                    report.add_issue(
                        severity="info",
                        category="inconsistent_data",
                        message=f"Execution {idx} has {len(extra)} extra entries compared to execution 1",
                        details={"extra_ids": list(extra)[:5]},  # Show first 5
                    )

    def _check_metric_outliers(self, cluster_name: str, report: ValidationReport):
        """Identifica outliers nelle metriche."""
        # This is a simplified check - could be expanded with statistical tests
        self.logger.debug(f"Checking metric outliers for {cluster_name}")
        # Implementation would analyze metric distributions and flag extreme values

    def validate_all_clusters(self) -> Dict[str, ValidationReport]:
        """Valida tutti i cluster."""
        self.logger.info("Starting validation of all clusters")

        cluster_names = general_utils.get_cluster_names(
            utility_paths.CLUSTERS_DIR_FILEPATH
        )
        reports = {}

        for cluster_name in cluster_names:
            try:
                report = self.validate_cluster(cluster_name)
                reports[cluster_name] = report

                # Log summary
                self.logger.info(f"Cluster {cluster_name}: {report.get_summary()}")

            except Exception as e:
                self.logger.error(
                    f"Error validating cluster {cluster_name}: {e}", exc_info=True
                )

        return reports

    def generate_validation_report(self, reports: Dict[str, ValidationReport]) -> str:
        """Genera un report di validazione in formato markdown."""
        lines = ["# Data Validation Report\n"]
        lines.append(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        lines.append(f"**Total Clusters:** {len(reports)}\n")

        # Summary statistics
        total_errors = sum(
            sum(1 for i in r.issues if i.severity == "error") for r in reports.values()
        )
        total_warnings = sum(
            sum(1 for i in r.issues if i.severity == "warning")
            for r in reports.values()
        )
        total_files = sum(r.total_files_checked for r in reports.values())
        valid_files = sum(r.valid_files for r in reports.values())

        lines.append("## Overall Summary\n")
        lines.append(f"- Total files checked: {total_files}\n")
        lines.append(f"- Valid files: {valid_files}\n")
        lines.append(f"- Total errors: {total_errors}\n")
        lines.append(f"- Total warnings: {total_warnings}\n\n")

        # Per-cluster details
        lines.append("## Per-Cluster Details\n")

        for cluster_name, report in sorted(reports.items()):
            lines.append(f"### {cluster_name}\n")
            lines.append(f"{report.get_summary()}\n\n")

            # Show issues if any
            if report.issues:
                lines.append("#### Issues:\n")
                for issue in report.issues[:10]:  # Limit to first 10
                    lines.append(
                        f"- **[{issue.severity.upper()}]** {issue.category}: {issue.message}\n"
                    )

                if len(report.issues) > 10:
                    lines.append(f"- ... and {len(report.issues) - 10} more issues\n")

                lines.append("\n")

        return "".join(lines)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )

    validator = DataValidator()

    # Validate all clusters
    reports = validator.validate_all_clusters()

    # Generate and save report
    markdown_report = validator.generate_validation_report(reports)

    output_dir = utility_paths.METRICS_DIR_FILEPATH / "validation_reports"
    output_dir.mkdir(parents=True, exist_ok=True)

    report_file = (
        output_dir / f"validation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
    )
    with open(report_file, "w") as f:
        f.write(markdown_report)

    print(f"\nValidation report saved to: {report_file}\n")

    # Print summary
    clusters_with_errors = sum(1 for r in reports.values() if r.has_errors)
    clusters_with_warnings = sum(1 for r in reports.values() if r.has_warnings)

    print("=" * 80)
    print("VALIDATION SUMMARY")
    print("=" * 80)
    print(f"Total clusters validated: {len(reports)}")
    print(f"Clusters with errors: {clusters_with_errors}")
    print(f"Clusters with warnings: {clusters_with_warnings}")
    print("=" * 80)
