#!/usr/bin/env python3
"""
Pipeline Module - Automated Analysis and Rerun Workflow
=========================================================

This module orchestrates the complete analysis pipeline:
1. Analyze execution results and detect anomalies
2. Generate rerun queue for failed entries
3. Execute selective reruns (via run_tests_on_cluster.py)
4. Recalculate statistics
5. Regenerate visualization plots

Author: Sustainable Code Refactoring Research Project
Date: 2025-10-28
"""

import json
import subprocess
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple, TYPE_CHECKING
from dataclasses import dataclass, asdict, field

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn
    from rich.table import Table
    from rich import box
    RICH_AVAILABLE = True
except ImportError:
    RICH_AVAILABLE = False
    print("⚠️  Warning: rich library not available. Install with: pip install rich")

# Import unified_analyzer modules
if TYPE_CHECKING:
    from unified_analyzer.core.models import Anomaly, ClassifiedError

try:
    from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
    from unified_analyzer.analyzers.error_classifier import ErrorClassifier
    from unified_analyzer.core.config import AnalyzerConfig
    from unified_analyzer.core.models import Anomaly, ClassifiedError
    UNIFIED_ANALYZER_AVAILABLE = True
except ImportError:
    UNIFIED_ANALYZER_AVAILABLE = False
    # Create dummy classes for type hints when unified_analyzer is not available
    class Anomaly:  # type: ignore
        pass
    class ClassifiedError:  # type: ignore
        pass
    print("⚠️  Warning: unified_analyzer not available")


@dataclass
class RerunEntry:
    """Single entry to be rerun"""
    cluster_name: str
    entry_id: str
    language: str
    test_type: str  # "base" or "llm_v{1-4}"
    reason: str
    anomaly_id: Optional[str] = None
    root_cause: Optional[str] = None
    error_category: Optional[str] = None

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return asdict(self)


@dataclass
class RerunQueue:
    """Queue of entries to be rerun"""
    entries: List[RerunEntry] = field(default_factory=list)
    generated_at: str = field(default_factory=lambda: datetime.now().isoformat())
    total_entries: int = 0

    def __post_init__(self):
        self.total_entries = len(self.entries)

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization"""
        return {
            "generated_at": self.generated_at,
            "total_entries": self.total_entries,
            "entries": [entry.to_dict() for entry in self.entries]
        }

    def save(self, filepath: Path):
        """Save queue to JSON file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=2, ensure_ascii=False)

    @classmethod
    def load(cls, filepath: Path) -> 'RerunQueue':
        """Load queue from JSON file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        entries = [RerunEntry(**entry_data) for entry_data in data['entries']]
        return cls(
            entries=entries,
            generated_at=data['generated_at'],
            total_entries=data['total_entries']
        )


@dataclass
class PipelineResult:
    """Result of pipeline execution"""
    success: bool
    step_results: Dict[str, bool] = field(default_factory=dict)
    step_messages: Dict[str, str] = field(default_factory=dict)
    rerun_queue_path: Optional[Path] = None
    anomalies_detected: int = 0
    entries_rerun: int = 0
    execution_time_seconds: float = 0.0
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        result = asdict(self)
        if self.rerun_queue_path:
            result['rerun_queue_path'] = str(self.rerun_queue_path)
        return result


class AnalysisPipeline:
    """
    Orchestrates the complete analysis and rerun pipeline
    """

    def __init__(
        self,
        src_dir: Optional[Path] = None,
        console: Optional[Console] = None,
        verbose: bool = True
    ):
        """
        Initialize pipeline

        Args:
            src_dir: Root src/ directory (auto-detected if None)
            console: Rich console for output (created if None)
            verbose: Enable verbose output
        """
        self.src_dir = src_dir or Path(__file__).parent
        self.verbose = verbose

        # Setup console
        if RICH_AVAILABLE:
            self.console = console or Console()
        else:
            self.console = None

        # Paths
        self.execution_outputs_dir = self.src_dir / "execution_outputs"
        self.rerun_queue_dir = self.src_dir / "rerun_queues"
        self.rerun_queue_dir.mkdir(exist_ok=True)

        # Results
        self.result = PipelineResult(success=False)

    def _log(self, message: str, style: str = "info"):
        """Log message to console"""
        if self.console and self.verbose:
            if style == "success":
                self.console.print(f"✅ {message}", style="bold green")
            elif style == "error":
                self.console.print(f"❌ {message}", style="bold red")
            elif style == "warning":
                self.console.print(f"⚠️  {message}", style="bold yellow")
            else:
                self.console.print(f"ℹ️  {message}", style="cyan")
        elif self.verbose:
            print(message)

    def _log_step(self, step_name: str, status: str = "start"):
        """Log step status"""
        if self.console:
            if status == "start":
                self.console.rule(f"[bold cyan]🔄 {step_name}", style="cyan")
            elif status == "success":
                self.console.print(f"\n✅ {step_name} completato\n", style="bold green")
            elif status == "error":
                self.console.print(f"\n❌ {step_name} fallito\n", style="bold red")

    def step1_analyze_and_generate_queue(
        self,
        clusters: str = "all",
        modes: str = "all",
        root_cause: bool = True
    ) -> Tuple[bool, Optional[Path]]:
        """
        Step 1: Analyze execution results and generate rerun queue

        Args:
            clusters: Cluster filter ("all" or comma-separated names)
            modes: Mode filter ("all", "base", "llm", etc.)
            root_cause: Enable root cause analysis

        Returns:
            (success, rerun_queue_path)
        """
        self._log_step("Step 1: Analisi Anomalie e Generazione Rerun Queue", "start")

        if not UNIFIED_ANALYZER_AVAILABLE:
            self._log("unified_analyzer non disponibile", "error")
            self.result.step_results['step1'] = False
            self.result.step_messages['step1'] = "unified_analyzer module not found"
            return False, None

        try:
            # Initialize detector
            config = AnalyzerConfig()
            detector = AnomalyDetector(config)

            self._log(f"Caricamento dati da: {self.execution_outputs_dir}")

            # Load execution data
            from unified_analyzer.data.loader import DataLoader
            loader = DataLoader(config)

            # Load all execution entries from all clusters
            entries = []
            cluster_names = loader.get_all_cluster_names() if clusters == "all" else clusters.split(",")
            for cluster_name in cluster_names:
                cluster_entries = loader.load_execution_results(cluster_name.strip(), modes)
                entries.extend(cluster_entries)

            self._log(f"Caricate {len(entries)} entry di esecuzione")

            # Detect anomalies
            self._log("Rilevamento anomalie in corso...")
            anomalies = detector.detect_all(entries)

            self._log(f"Rilevate {len(anomalies)} anomalie", "warning" if anomalies else "success")
            self.result.anomalies_detected = len(anomalies)

            # Check data completeness
            self._log("Verifica completezza dati in corso...")
            try:
                from unified_analyzer.validators.completeness_validator import CompletenessValidator
                completeness_validator = CompletenessValidator(
                    clusters_dir=self.src_dir / "clusters",
                    execution_outputs_dir=self.execution_outputs_dir
                )
                completeness_report = completeness_validator.validate_all_clusters()

                self._log(f"Completeness check: {completeness_report.complete_entries}/{completeness_report.total_entries} entries complete")

                # Get missing/incomplete entries
                incomplete_entries = completeness_validator.get_missing_executions_for_rerun(completeness_report)

                if incomplete_entries:
                    self._log(f"Trovate {len(incomplete_entries)} entry incomplete", "warning")

            except ImportError:
                self._log("Completeness validator non disponibile - skip", "warning")
                incomplete_entries = []

            # Combine anomalies and incomplete data
            total_issues = len(anomalies) + len(incomplete_entries)

            if not anomalies and not incomplete_entries:
                self._log("Nessun problema rilevato - nessuna riesecuzione necessaria", "success")
                self.result.step_results['step1'] = True
                self.result.step_messages['step1'] = "No issues detected"
                return True, None

            # Classify errors (optional, for better reporting)
            if root_cause and anomalies:
                self._log("Classificazione errori in corso...")
                classifier = ErrorClassifier()
                classified_errors = classifier.classify_batch(anomalies)
                self._log(f"Classificati {len(classified_errors)} errori")

            # Build rerun queue (anomalies + incomplete data)
            self._log(f"Generazione rerun queue ({total_issues} entry)...")
            rerun_queue = self._build_rerun_queue(anomalies, incomplete_entries)

            # Save queue
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            queue_path = self.rerun_queue_dir / f"rerun_queue_{timestamp}.json"
            rerun_queue.save(queue_path)

            self._log(f"Rerun queue salvata: {queue_path}", "success")
            self._log(f"Entry da rieseguire: {rerun_queue.total_entries}")

            # Display summary table
            if self.console:
                self._display_queue_summary(rerun_queue)

            self.result.step_results['step1'] = True
            self.result.step_messages['step1'] = f"Generated queue with {rerun_queue.total_entries} entries"
            self.result.rerun_queue_path = queue_path

            self._log_step("Step 1", "success")
            return True, queue_path

        except Exception as e:
            self._log(f"Errore durante analisi: {str(e)}", "error")
            self.result.step_results['step1'] = False
            self.result.step_messages['step1'] = f"Error: {str(e)}"
            self._log_step("Step 1", "error")
            return False, None

    def _build_rerun_queue(
        self,
        anomalies: List[Anomaly],
        incomplete_entries: List[Dict[str, str]] = None
    ) -> RerunQueue:
        """
        Build rerun queue from detected anomalies and incomplete data

        Args:
            anomalies: List of detected anomalies
            incomplete_entries: List of incomplete entries from completeness validator

        Returns:
            RerunQueue object
        """
        entries = []

        # Add anomalies
        for anomaly in anomalies:
            # Extract info from anomaly
            entry = RerunEntry(
                cluster_name=anomaly.cluster_name,
                entry_id=anomaly.entry_id,
                language=anomaly.language,
                test_type=anomaly.test_type or "base",
                reason=f"{anomaly.anomaly_type.value}: {', '.join(anomaly.metrics_affected)}",
                anomaly_id=anomaly.anomaly_id,
                root_cause=anomaly.root_cause.value if anomaly.root_cause else None,
                error_category=None  # Will be filled by classifier if needed
            )
            entries.append(entry)

        # Add incomplete entries
        if incomplete_entries:
            for incomplete in incomplete_entries:
                entry = RerunEntry(
                    cluster_name=incomplete["cluster_name"],
                    entry_id=incomplete["entry_id"],
                    language=incomplete["language"],
                    test_type=incomplete["test_type"],
                    reason=incomplete["reason"],
                    anomaly_id=None,
                    root_cause=incomplete.get("root_cause"),
                    error_category=incomplete.get("error_category")
                )
                entries.append(entry)

        return RerunQueue(entries=entries)

    def _display_queue_summary(self, queue: RerunQueue):
        """Display rerun queue summary table"""
        table = Table(
            title=f"📋 Rerun Queue Summary - {queue.total_entries} entries",
            box=box.ROUNDED
        )
        table.add_column("Cluster", style="cyan")
        table.add_column("Language", style="yellow")
        table.add_column("Type", style="magenta")
        table.add_column("Reason", style="white", overflow="fold")

        # Group by cluster for display
        cluster_groups = {}
        for entry in queue.entries:
            key = (entry.cluster_name, entry.language, entry.test_type)
            if key not in cluster_groups:
                cluster_groups[key] = []
            cluster_groups[key].append(entry)

        # Display first 20 entries
        count = 0
        for (cluster, lang, test_type), entries in list(cluster_groups.items())[:20]:
            reason = entries[0].reason
            table.add_row(
                f"{cluster} ({len(entries)})",
                lang,
                test_type,
                reason[:50] + "..." if len(reason) > 50 else reason
            )
            count += 1

        if len(cluster_groups) > 20:
            table.add_row("...", "...", "...", f"(+{len(cluster_groups) - 20} more)")

        self.console.print(table)

    def step2_selective_rerun(
        self,
        rerun_queue_path: Path,
        num_executions: int = 5,
        dry_run: bool = False
    ) -> bool:
        """
        Step 2: Execute selective reruns using run_tests_on_cluster.py

        Args:
            rerun_queue_path: Path to rerun_queue.json
            num_executions: Number of executions per entry
            dry_run: If True, simulate without actual execution

        Returns:
            success
        """
        self._log_step("Step 2: Riesecuzione Selettiva Cluster", "start")

        if not rerun_queue_path or not rerun_queue_path.exists():
            self._log(f"Rerun queue non trovato: {rerun_queue_path}", "error")
            self.result.step_results['step2'] = False
            self.result.step_messages['step2'] = "Rerun queue file not found"
            return False

        try:
            # Load queue
            queue = RerunQueue.load(rerun_queue_path)
            self._log(f"Caricata rerun queue con {queue.total_entries} entry")

            if dry_run:
                self._log("⚠️  DRY RUN MODE - Nessuna esecuzione reale", "warning")
                self.result.step_results['step2'] = True
                self.result.step_messages['step2'] = f"Dry run: would rerun {queue.total_entries} entries"
                self.result.entries_rerun = queue.total_entries
                self._log_step("Step 2", "success")
                return True

            # Call run_tests_on_cluster.py with --rerun-file
            runner_script = self.src_dir / "run_tests_on_clusters" / "run_tests_on_cluster.py"

            if not runner_script.exists():
                self._log(f"Script runner non trovato: {runner_script}", "error")
                self.result.step_results['step2'] = False
                self.result.step_messages['step2'] = "run_tests_on_cluster.py not found"
                return False

            self._log(f"Esecuzione riesecuzione con {num_executions} run per entry...")

            cmd = [
                sys.executable,
                str(runner_script),
                "--rerun-file", str(rerun_queue_path),
                "--run-quantity", str(num_executions)
            ]

            self._log(f"Comando: {' '.join(cmd)}")

            # Execute
            result = subprocess.run(
                cmd,
                cwd=str(self.src_dir),
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                self._log(f"Riesecuzione completata con successo", "success")
                self._log(f"Output:\n{result.stdout}")
                self.result.step_results['step2'] = True
                self.result.step_messages['step2'] = f"Successfully rerun {queue.total_entries} entries"
                self.result.entries_rerun = queue.total_entries
                self._log_step("Step 2", "success")
                return True
            else:
                self._log(f"Errore durante riesecuzione (exit code: {result.returncode})", "error")
                self._log(f"Stderr:\n{result.stderr}")
                self.result.step_results['step2'] = False
                self.result.step_messages['step2'] = f"Execution failed: {result.stderr[:200]}"
                self._log_step("Step 2", "error")
                return False

        except Exception as e:
            self._log(f"Errore durante riesecuzione: {str(e)}", "error")
            self.result.step_results['step2'] = False
            self.result.step_messages['step2'] = f"Error: {str(e)}"
            self._log_step("Step 2", "error")
            return False

    def step3_recalculate_statistics(self) -> bool:
        """
        Step 3: Recalculate execution statistics

        Returns:
            success
        """
        self._log_step("Step 3: Ricalcolo Statistiche", "start")

        try:
            metrics_script = self.src_dir / "metrics" / "main_exec_metrics_analysis.py"

            if not metrics_script.exists():
                self._log(f"Script metriche non trovato: {metrics_script}", "error")
                self.result.step_results['step3'] = False
                self.result.step_messages['step3'] = "main_exec_metrics_analysis.py not found"
                return False

            self._log("Esecuzione ricalcolo statistiche...")

            cmd = [sys.executable, str(metrics_script)]

            result = subprocess.run(
                cmd,
                cwd=str(self.src_dir / "metrics"),
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                self._log("Statistiche ricalcolate con successo", "success")
                if self.verbose:
                    self._log(f"Output:\n{result.stdout}")
                self.result.step_results['step3'] = True
                self.result.step_messages['step3'] = "Statistics recalculated successfully"
                self._log_step("Step 3", "success")
                return True
            else:
                self._log(f"Errore durante ricalcolo (exit code: {result.returncode})", "error")
                self._log(f"Stderr:\n{result.stderr}")
                self.result.step_results['step3'] = False
                self.result.step_messages['step3'] = f"Calculation failed: {result.stderr[:200]}"
                self._log_step("Step 3", "error")
                return False

        except Exception as e:
            self._log(f"Errore durante ricalcolo statistiche: {str(e)}", "error")
            self.result.step_results['step3'] = False
            self.result.step_messages['step3'] = f"Error: {str(e)}"
            self._log_step("Step 3", "error")
            return False

    def step4_regenerate_plots(self) -> bool:
        """
        Step 4: Regenerate visualization plots

        Returns:
            success
        """
        self._log_step("Step 4: Rigenerazione Grafici", "start")

        try:
            viz_script = self.src_dir / "metrics" / "execMetricStatsVisualizator.py"

            if not viz_script.exists():
                self._log(f"Script visualizzazione non trovato: {viz_script}", "error")
                self.result.step_results['step4'] = False
                self.result.step_messages['step4'] = "execMetricStatsVisualizator.py not found"
                return False

            self._log("Rigenerazione grafici in corso...")

            cmd = [sys.executable, str(viz_script)]

            result = subprocess.run(
                cmd,
                cwd=str(self.src_dir / "metrics"),
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                self._log("Grafici rigenerati con successo", "success")
                if self.verbose:
                    self._log(f"Output:\n{result.stdout}")
                self.result.step_results['step4'] = True
                self.result.step_messages['step4'] = "Plots regenerated successfully"
                self._log_step("Step 4", "success")
                return True
            else:
                self._log(f"Errore durante rigenerazione (exit code: {result.returncode})", "error")
                self._log(f"Stderr:\n{result.stderr}")
                self.result.step_results['step4'] = False
                self.result.step_messages['step4'] = f"Regeneration failed: {result.stderr[:200]}"
                self._log_step("Step 4", "error")
                return False

        except Exception as e:
            self._log(f"Errore durante rigenerazione grafici: {str(e)}", "error")
            self.result.step_results['step4'] = False
            self.result.step_messages['step4'] = f"Error: {str(e)}"
            self._log_step("Step 4", "error")
            return False

    def run_complete_pipeline(
        self,
        clusters: str = "all",
        modes: str = "all",
        root_cause: bool = True,
        num_executions: int = 5,
        skip_rerun: bool = False,
        dry_run: bool = False
    ) -> PipelineResult:
        """
        Execute complete analysis pipeline

        Args:
            clusters: Cluster filter
            modes: Mode filter
            root_cause: Enable root cause analysis
            num_executions: Number of executions per rerun entry
            skip_rerun: Skip step 2 (rerun) - useful for testing
            dry_run: Simulate without actual execution

        Returns:
            PipelineResult object
        """
        start_time = datetime.now()

        if self.console:
            self.console.print(Panel.fit(
                "[bold cyan]⚡ PIPELINE COMPLETA DI ANALISI E RIESECUZIONE[/bold cyan]\n"
                f"Clusters: {clusters} | Modes: {modes} | Root Cause: {root_cause}",
                border_style="cyan"
            ))

        # Step 1: Analyze and generate queue
        success, queue_path = self.step1_analyze_and_generate_queue(
            clusters=clusters,
            modes=modes,
            root_cause=root_cause
        )

        if not success:
            self._log("Pipeline interrotta: Step 1 fallito", "error")
            self.result.success = False
            self.result.execution_time_seconds = (datetime.now() - start_time).total_seconds()
            return self.result

        # Step 2: Selective rerun (if queue exists)
        if queue_path and not skip_rerun:
            success = self.step2_selective_rerun(
                rerun_queue_path=queue_path,
                num_executions=num_executions,
                dry_run=dry_run
            )

            if not success:
                self._log("Pipeline interrotta: Step 2 fallito", "error")
                self.result.success = False
                self.result.execution_time_seconds = (datetime.now() - start_time).total_seconds()
                return self.result
        elif skip_rerun:
            self._log("Step 2 skippato (--skip-rerun)", "warning")
            self.result.step_results['step2'] = True
            self.result.step_messages['step2'] = "Skipped"
        else:
            self._log("Nessuna riesecuzione necessaria", "success")
            self.result.step_results['step2'] = True
            self.result.step_messages['step2'] = "No reruns needed"

        # Step 3: Recalculate statistics
        if not dry_run:
            success = self.step3_recalculate_statistics()

            if not success:
                self._log("⚠️  Step 3 fallito, ma continuo...", "warning")
        else:
            self._log("Step 3 skippato (dry run)", "warning")
            self.result.step_results['step3'] = True
            self.result.step_messages['step3'] = "Skipped (dry run)"

        # Step 4: Regenerate plots
        if not dry_run:
            success = self.step4_regenerate_plots()

            if not success:
                self._log("⚠️  Step 4 fallito, ma continuo...", "warning")
        else:
            self._log("Step 4 skippato (dry run)", "warning")
            self.result.step_results['step4'] = True
            self.result.step_messages['step4'] = "Skipped (dry run)"

        # Pipeline complete
        self.result.success = all(self.result.step_results.values())
        self.result.execution_time_seconds = (datetime.now() - start_time).total_seconds()

        # Display final summary
        if self.console:
            self._display_pipeline_summary()

        return self.result

    def _display_pipeline_summary(self):
        """Display pipeline execution summary"""
        self.console.rule("[bold green]📊 PIPELINE COMPLETATA", style="green")

        # Summary table
        table = Table(title="Pipeline Results", box=box.ROUNDED)
        table.add_column("Step", style="cyan", width=40)
        table.add_column("Status", width=15)
        table.add_column("Message", style="white", overflow="fold")

        for step_name, success in self.result.step_results.items():
            status_icon = "✅" if success else "❌"
            status_style = "green" if success else "red"
            message = self.result.step_messages.get(step_name, "")

            table.add_row(
                step_name.replace('_', ' ').title(),
                f"[{status_style}]{status_icon}[/{status_style}]",
                message
            )

        self.console.print(table)

        # Stats
        self.console.print()
        self.console.print(f"⏱️  Tempo totale: {self.result.execution_time_seconds:.2f}s")
        self.console.print(f"🔍 Anomalie rilevate: {self.result.anomalies_detected}")
        self.console.print(f"🔄 Entry rieseguite: {self.result.entries_rerun}")

        if self.result.rerun_queue_path:
            self.console.print(f"📄 Rerun queue: {self.result.rerun_queue_path}")

        overall_status = "✅ SUCCESSO" if self.result.success else "⚠️  COMPLETATA CON ERRORI"
        overall_style = "bold green" if self.result.success else "bold yellow"
        self.console.print(f"\n[{overall_style}]{overall_status}[/{overall_style}]")


def run_analysis_pipeline(
    clusters: str = "all",
    modes: str = "all",
    root_cause: bool = True,
    num_executions: int = 5,
    skip_rerun: bool = False,
    dry_run: bool = False,
    verbose: bool = True,
    src_dir: Optional[Path] = None
) -> PipelineResult:
    """
    Main entry point for analysis pipeline

    This function orchestrates the complete workflow:
    1. Analyze execution results and detect anomalies
    2. Generate rerun queue for failed entries
    3. Execute selective reruns
    4. Recalculate statistics
    5. Regenerate visualization plots

    Args:
        clusters: Cluster filter ("all" or comma-separated names)
        modes: Mode filter ("all", "base", "llm", etc.)
        root_cause: Enable root cause analysis
        num_executions: Number of executions per rerun entry
        skip_rerun: Skip step 2 (useful for testing)
        dry_run: Simulate without actual execution
        verbose: Enable verbose output
        src_dir: Root src/ directory (auto-detected if None)

    Returns:
        PipelineResult object with execution details

    Example:
        >>> from pipeline import run_analysis_pipeline
        >>> result = run_analysis_pipeline(
        ...     clusters="all",
        ...     modes="all",
        ...     num_executions=5
        ... )
        >>> if result.success:
        ...     print(f"Pipeline completed! Rerun {result.entries_rerun} entries")
    """
    pipeline = AnalysisPipeline(
        src_dir=src_dir,
        verbose=verbose
    )

    return pipeline.run_complete_pipeline(
        clusters=clusters,
        modes=modes,
        root_cause=root_cause,
        num_executions=num_executions,
        skip_rerun=skip_rerun,
        dry_run=dry_run
    )


# CLI interface
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Analysis Pipeline - Automated workflow for error detection and reruns"
    )
    parser.add_argument(
        "--clusters",
        default="all",
        help="Cluster filter (default: all)"
    )
    parser.add_argument(
        "--modes",
        default="all",
        help="Mode filter (default: all)"
    )
    parser.add_argument(
        "--root-cause",
        action="store_true",
        default=True,
        help="Enable root cause analysis (default: True)"
    )
    parser.add_argument(
        "--num-executions",
        type=int,
        default=5,
        help="Number of executions per rerun entry (default: 5)"
    )
    parser.add_argument(
        "--skip-rerun",
        action="store_true",
        help="Skip step 2 (selective rerun)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Simulate without actual execution"
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Minimal output"
    )

    args = parser.parse_args()

    result = run_analysis_pipeline(
        clusters=args.clusters,
        modes=args.modes,
        root_cause=args.root_cause,
        num_executions=args.num_executions,
        skip_rerun=args.skip_rerun,
        dry_run=args.dry_run,
        verbose=not args.quiet
    )

    sys.exit(0 if result.success else 1)
