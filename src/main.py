#!/usr/bin/env python3
"""
Main Entry Point - Sustainable Code Refactoring with LLMs
Professional TUI (Text User Interface) for orchestrating research workflow

Author: [Your Name]
Version: 2.0.0 (Post-Refactoring)
Date: 2025-10-28
"""

import sys
import os
from pathlib import Path
from typing import Optional

# Add src to path for imports
sys.path.insert(0, str(Path(__file__).parent))

# Rich imports for TUI
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, Confirm
from rich.table import Table
from rich.text import Text
from rich.layout import Layout
from rich.live import Live
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import box
from rich.rule import Rule
from rich.style import Style
from rich.theme import Theme

# Custom theme
custom_theme = Theme({
    "info": "cyan",
    "warning": "yellow",
    "error": "bold red",
    "success": "bold green",
    "title": "bold magenta",
    "subtitle": "italic cyan",
    "menu": "bold white on blue",
})

console = Console(theme=custom_theme)


class MainTUI:
    """
    Main TUI (Text User Interface) for the research project.

    Provides an interactive menu to:
    - Execute tests on clusters
    - Analyze execution results (errors/anomalies)
    - Calculate statistics (metrics, improvement, patterns)
    - Execute complete pipeline
    - View dataset statistics
    """

    def __init__(self):
        """Initialize TUI"""
        self.console = console
        self.running = True

    def clear_screen(self):
        """Clear terminal screen"""
        os.system('clear' if os.name != 'nt' else 'cls')

    def show_banner(self):
        """Display project banner"""
        banner = Text()
        banner.append("\n")
        banner.append("╔═══════════════════════════════════════════════════════════════╗\n", style="bold cyan")
        banner.append("║                                                               ║\n", style="bold cyan")
        banner.append("║     SUSTAINABLE CODE REFACTORING WITH LLMs                   ║\n", style="bold white")
        banner.append("║     Research Project - Università di Pisa                    ║\n", style="italic white")
        banner.append("║                                                               ║\n", style="bold cyan")
        banner.append("║     Version: 2.0.0 (Post-Refactoring)                        ║\n", style="green")
        banner.append("║     Date: 2025-10-28                                          ║\n", style="green")
        banner.append("║                                                               ║\n", style="bold cyan")
        banner.append("╚═══════════════════════════════════════════════════════════════╝\n", style="bold cyan")

        self.console.print(banner)

    def show_main_menu(self):
        """Display main menu with options"""
        menu_table = Table(
            title="[bold magenta]📋 MENU PRINCIPALE[/bold magenta]",
            box=box.ROUNDED,
            show_header=False,
            padding=(0, 2),
            expand=False,
            border_style="cyan"
        )

        menu_table.add_column("Option", style="bold cyan", width=8)
        menu_table.add_column("Description", style="white")

        menu_table.add_row(
            "[1]",
            "🚀 Esegui Test su Cluster"
        )
        menu_table.add_row(
            "[2]",
            "🔍 Analizza Risultati Esecuzioni (Errori/Anomalie)"
        )
        menu_table.add_row(
            "[3]",
            "📊 Calcola Statistiche (Metriche, Improvement, Pattern)"
        )
        menu_table.add_row(
            "[4]",
            "⚡ Esegui Pipeline Completa (Analisi → Riesecuzione → Stats)"
        )
        menu_table.add_row(
            "[5]",
            "📈 Visualizza Statistiche Dataset"
        )
        menu_table.add_row(
            "[6]",
            "⚙️  Configurazione e Setup"
        )
        menu_table.add_row(
            "[Q]",
            "🚪 Esci"
        )

        self.console.print("\n")
        self.console.print(menu_table)
        self.console.print("\n")

    def execute_tests_on_cluster(self):
        """Option 1: Execute tests on cluster"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]🚀 ESEGUI TEST SU CLUSTER[/bold cyan]",
            border_style="cyan"
        ))

        # Ask for cluster name
        cluster_name = Prompt.ask(
            "\n[cyan]Nome del cluster[/cyan] (es. two-sum, blank, o 'all')",
            default="all"
        )

        # Ask for number of executions
        num_executions = Prompt.ask(
            "[cyan]Numero di esecuzioni[/cyan]",
            default="5"
        )

        # Ask for mode (base, llm, or both)
        mode = Prompt.ask(
            "[cyan]Modalità[/cyan]",
            choices=["base", "llm", "both"],
            default="both"
        )

        self.console.print("\n[yellow]⏳ Avvio esecuzione test...[/yellow]\n")

        try:
            # Import and execute
            from run_tests_on_clusters import run_all_tests

            # Execute based on cluster selection
            if cluster_name.lower() == "all":
                self.console.print("[info]Esecuzione su tutti i cluster...[/info]")
                run_all_tests.main()
            else:
                # Execute specific cluster
                from run_tests_on_clusters import run_tests_on_cluster

                base_only = (mode == "base")
                llm_only = (mode == "llm")

                self.console.print(f"[info]Esecuzione cluster: {cluster_name}[/info]")
                self.console.print(f"[info]Modalità: {mode}, Esecuzioni: {num_executions}[/info]")

                # This would need proper integration with run_tests_on_cluster.py
                self.console.print("\n[warning]⚠️  Integrazione diretta in sviluppo[/warning]")
                self.console.print("[info]Per ora, usa direttamente:[/info]")
                self.console.print(f"[info]  cd run_tests_on_clusters && python run_tests_on_cluster.py --cluster-name {cluster_name} --num-executions {num_executions}[/info]")

            self.console.print("\n[success]✓ Esecuzione completata![/success]")

        except ImportError as e:
            self.console.print(f"[error]✗ Errore import modulo: {e}[/error]")
        except Exception as e:
            self.console.print(f"[error]✗ Errore durante esecuzione: {e}[/error]")

        self.wait_for_user()

    def analyze_execution_results(self):
        """Option 2: Analyze execution results (errors/anomalies)"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]🔍 ANALIZZA RISULTATI ESECUZIONI[/bold cyan]",
            border_style="cyan"
        ))

        # Ask for analysis options
        clusters = Prompt.ask(
            "\n[cyan]Cluster da analizzare[/cyan] (separati da spazio, o 'all')",
            default="all"
        )

        # Ask for analysis modes
        self.console.print("\n[cyan]Modalità di analisi disponibili:[/cyan]")
        self.console.print("  - invalid: Rileva valori invalidi (0, None)")
        self.console.print("  - missing: Rileva metriche mancanti")
        self.console.print("  - outliers: Rileva outlier (deviazione >500%)")
        self.console.print("  - all: Tutte le modalità")

        modes = Prompt.ask(
            "\n[cyan]Modalità[/cyan]",
            default="all"
        )

        root_cause = Confirm.ask(
            "[cyan]Eseguire root cause analysis?[/cyan]",
            default=True
        )

        export_format = Prompt.ask(
            "[cyan]Formato export[/cyan] (json, csv, markdown, text, all)",
            default="json"
        )

        self.console.print("\n[yellow]⏳ Avvio analisi...[/yellow]\n")

        try:
            # Import unified_analyzer components
            from unified_analyzer.core.config import AnalyzerConfig
            from unified_analyzer.core.enums import AnalysisMode
            from unified_analyzer.data.loader import DataLoader
            from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
            from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer
            from unified_analyzer.reporters.report_generator import ReportGenerator
            from unified_analyzer.reporters.exporters import ReportExporter
            from datetime import datetime

            # Build cluster list
            cluster_list = clusters.split() if clusters.lower() != "all" else None

            self.console.print(f"[info]Analisi cluster: {clusters}[/info]")
            self.console.print(f"[info]Modalità: {modes}[/info]")
            self.console.print(f"[info]Root cause: {'Sì' if root_cause else 'No'}[/info]")
            self.console.print(f"[info]Export: {export_format}[/info]\n")

            # Create configuration
            if root_cause:
                config = AnalyzerConfig.for_root_cause_analysis()
            else:
                config = AnalyzerConfig.load_default()

            # Set enabled modes
            mode_map = {
                'invalid': AnalysisMode.INVALID_VALUES,
                'missing': AnalysisMode.MISSING_METRICS,
                'outliers': AnalysisMode.OUTLIERS,
                'all': AnalysisMode.ALL
            }

            mode_list = modes.split()
            if 'all' not in mode_list:
                config.enabled_modes = [mode_map[m] for m in mode_list if m in mode_map]

            # Initialize components
            self.console.print("[info]Inizializzazione componenti...[/info]")
            data_loader = DataLoader(config)
            anomaly_detector = AnomalyDetector(config)
            root_cause_analyzer = RootCauseAnalyzer(config, data_loader) if root_cause else None
            report_generator = ReportGenerator(config)

            # Get clusters to analyze
            if cluster_list and cluster_list != ["all"]:
                cluster_names = cluster_list
                self.console.print(f"[info]Analizzando {len(cluster_names)} cluster specificati[/info]")
            else:
                cluster_names = data_loader.get_all_cluster_names()
                self.console.print(f"[info]Analizzando tutti i {len(cluster_names)} cluster[/info]")

            # Load all execution entries
            self.console.print("[info]Caricamento dati di esecuzione...[/info]")
            all_entries = []

            for cluster_name in cluster_names:
                entries = data_loader.load_execution_results(cluster_name, 'both')
                all_entries.extend(entries)

            self.console.print(f"[success]✓ Caricati {len(all_entries)} entry di esecuzione[/success]")

            if not all_entries:
                self.console.print("[warning]⚠️  Nessun entry di esecuzione trovato![/warning]")
                self.wait_for_user()
                return

            # Detect anomalies
            self.console.print("\n[info]Rilevamento anomalie...[/info]")
            anomalies = anomaly_detector.detect_all(all_entries)

            self.console.print(f"[success]✓ Rilevate {len(anomalies)} anomalie[/success]")

            # Perform root cause analysis
            if root_cause and anomalies:
                self.console.print("\n[info]Esecuzione root cause analysis...[/info]")
                with Progress(
                    SpinnerColumn(),
                    TextColumn("[progress.description]{task.description}"),
                    console=self.console
                ) as progress:
                    task = progress.add_task(f"Analizzando {len(anomalies)} anomalie...", total=len(anomalies))
                    for anomaly in anomalies:
                        root_cause_analyzer.analyze(anomaly)
                        progress.update(task, advance=1)

                self.console.print("[success]✓ Root cause analysis completata[/success]")

            # Generate report
            self.console.print("\n[info]Generazione report...[/info]")
            report = report_generator.generate_full_report(anomalies, len(all_entries))

            # Print summary to console
            self.console.print("\n")
            self.console.print(Panel(
                report_generator.generate_summary_text(report),
                title="[bold cyan]Sommario Analisi[/bold cyan]",
                border_style="cyan"
            ))

            # Export if requested
            export_formats = export_format.split() if export_format.lower() != "all" else ['json', 'csv', 'markdown', 'text']

            if export_formats:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                base_filename = f"analysis_report_{timestamp}"

                exporter = ReportExporter()

                self.console.print("\n[info]Esportazione report...[/info]")
                for fmt in export_formats:
                    if fmt == 'json':
                        output_path = config.reports_dir / f"{base_filename}.json"
                        exporter.export_json(report, output_path)
                        self.console.print(f"[success]  ✓ JSON: {output_path}[/success]")

                    elif fmt == 'csv':
                        output_path = config.reports_dir / f"{base_filename}.csv"
                        exporter.export_csv(anomalies, output_path, include_recommendations=True)
                        self.console.print(f"[success]  ✓ CSV: {output_path}[/success]")

                    elif fmt == 'markdown':
                        output_path = config.reports_dir / f"{base_filename}.md"
                        exporter.export_markdown(report, output_path, include_details=True)
                        self.console.print(f"[success]  ✓ Markdown: {output_path}[/success]")

                    elif fmt == 'text':
                        output_path = config.reports_dir / f"{base_filename}.txt"
                        exporter.export_summary_text(report, output_path)
                        self.console.print(f"[success]  ✓ Text: {output_path}[/success]")

            self.console.print("\n[success]✅ Analisi completata con successo![/success]")

        except ImportError as e:
            self.console.print(f"[error]✗ Errore import modulo: {e}[/error]")
            self.console.print(f"[error]Traceback: {str(e)}[/error]")
        except Exception as e:
            self.console.print(f"[error]✗ Errore durante analisi: {e}[/error]")
            import traceback
            self.console.print(f"[error]{traceback.format_exc()}[/error]")

        self.wait_for_user()

    def calculate_statistics(self):
        """Option 3: Calculate statistics (metrics, improvement, patterns)"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]📊 CALCOLA STATISTICHE[/bold cyan]",
            border_style="cyan"
        ))

        # Options for statistics calculation
        self.console.print("\n[cyan]Tipi di statistiche disponibili:[/cyan]")
        self.console.print("  [1] Objective 1: Metrics per Prompt Version")
        self.console.print("  [2] Objective 2: Metrics per Programming Language")
        self.console.print("  [3] Objective 3: Improvement % per Model + Prompt")
        self.console.print("  [4] Objective 4: Metrics per Language + Model")
        self.console.print("  [5] Tutte le statistiche + Visualizzazioni")

        stat_choice = Prompt.ask(
            "\n[cyan]Seleziona opzione[/cyan]",
            choices=["1", "2", "3", "4", "5"],
            default="5"
        )

        generate_plots = Confirm.ask(
            "[cyan]Generare grafici (box plots)?[/cyan]",
            default=True
        )

        self.console.print("\n[yellow]⏳ Calcolo statistiche in corso...[/yellow]\n")

        try:
            # Import metrics module
            from metrics import main_exec_metrics_analysis

            self.console.print(f"[info]Calcolo statistiche: Objective {stat_choice}[/info]")

            if stat_choice == "5":
                # Run complete analysis
                self.console.print("[info]Esecuzione analisi completa...[/info]")
                main_exec_metrics_analysis.main()
                self.console.print("\n[success]✓ Analisi completa eseguita![/success]")
            else:
                # Run specific objective
                self.console.print(f"[info]Calcolo Objective {stat_choice}...[/info]")
                self.console.print("\n[warning]⚠️  Esecuzione objective specifico in sviluppo[/warning]")
                self.console.print("[info]Per ora, esegui analisi completa o modifica main_exec_metrics_analysis.py[/info]")

            if generate_plots:
                self.console.print("\n[info]Generazione grafici...[/info]")
                from metrics import execMetricStatsVisualizator
                self.console.print("[info]Grafici salvati in: metrics/execution_stats_plots/[/info]")

            self.console.print("\n[success]✓ Statistiche calcolate![/success]")
            self.console.print("[info]📁 Risultati salvati in: src/metrics/execution_stats/[/info]")

        except ImportError as e:
            self.console.print(f"[error]✗ Errore import modulo: {e}[/error]")
        except Exception as e:
            self.console.print(f"[error]✗ Errore durante calcolo: {e}[/error]")

        self.wait_for_user()

    def execute_complete_pipeline(self):
        """Option 4: Execute complete pipeline"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]⚡ PIPELINE COMPLETA DI ANALISI E RIESECUZIONE[/bold cyan]\n\n"
            "Workflow automatico:\n"
            "  1. 🔍 Analisi anomalie (unified_analyzer)\n"
            "  2. 📋 Generazione rerun queue\n"
            "  3. 🔄 Riesecuzione selettiva cluster\n"
            "  4. 📊 Ricalcolo statistiche\n"
            "  5. 📈 Rigenerazione grafici",
            border_style="cyan"
        ))

        # Gather parameters
        self.console.print("\n[bold cyan]Configurazione Pipeline:[/bold cyan]\n")

        clusters = Prompt.ask(
            "  Cluster da analizzare",
            default="all"
        )

        modes = Prompt.ask(
            "  Modalità (base/llm/all)",
            default="all"
        )

        num_executions = int(Prompt.ask(
            "  Numero di esecuzioni per entry",
            default="5"
        ))

        root_cause = Confirm.ask(
            "  Eseguire root cause analysis?",
            default=True
        )

        skip_rerun = Confirm.ask(
            "  Saltare riesecuzione (solo analisi)?",
            default=False
        )

        dry_run = Confirm.ask(
            "  Dry run (simula senza eseguire)?",
            default=False
        )

        proceed = Confirm.ask(
            "\n[yellow]⚡ Procedere con pipeline completa?[/yellow]",
            default=False
        )

        if not proceed:
            self.console.print("[info]Pipeline annullata.[/info]")
            self.wait_for_user()
            return

        self.console.print("\n[yellow]⏳ Esecuzione pipeline in corso...[/yellow]\n")

        try:
            # Import pipeline module
            from pipeline import run_analysis_pipeline

            # Execute pipeline
            result = run_analysis_pipeline(
                clusters=clusters,
                modes=modes,
                root_cause=root_cause,
                num_executions=num_executions,
                skip_rerun=skip_rerun,
                dry_run=dry_run,
                verbose=True,
                src_dir=None  # Auto-detect
            )

            # Display result summary
            self.console.print("\n")
            if result.success:
                self.console.print(Panel(
                    f"[bold green]✅ PIPELINE COMPLETATA CON SUCCESSO[/bold green]\n\n"
                    f"Anomalie rilevate: {result.anomalies_detected}\n"
                    f"Entry rieseguite: {result.entries_rerun}\n"
                    f"Tempo esecuzione: {result.execution_time_seconds:.2f}s\n\n"
                    f"Steps completati:\n" +
                    "\n".join([
                        f"  {'✅' if success else '❌'} {step.replace('_', ' ').title()}: {result.step_messages.get(step, '')}"
                        for step, success in result.step_results.items()
                    ]),
                    border_style="green"
                ))

                if result.rerun_queue_path:
                    self.console.print(f"\n[info]📄 Rerun queue salvata: {result.rerun_queue_path}[/info]")

            else:
                self.console.print(Panel(
                    f"[bold yellow]⚠️  PIPELINE COMPLETATA CON ERRORI[/bold yellow]\n\n"
                    f"Anomalie rilevate: {result.anomalies_detected}\n"
                    f"Entry rieseguite: {result.entries_rerun}\n"
                    f"Tempo esecuzione: {result.execution_time_seconds:.2f}s\n\n"
                    f"Steps completati:\n" +
                    "\n".join([
                        f"  {'✅' if success else '❌'} {step.replace('_', ' ').title()}: {result.step_messages.get(step, '')}"
                        for step, success in result.step_results.items()
                    ]),
                    border_style="yellow"
                ))

                self.console.print("\n[warning]Alcuni step sono falliti. Controlla i log per dettagli.[/warning]")

            # Additional info
            self.console.print("\n[cyan]📁 Output directories:[/cyan]")
            self.console.print("  - Rerun queues: src/rerun_queues/")
            self.console.print("  - Execution outputs: src/execution_outputs/")
            self.console.print("  - Statistics: src/metrics/execution_stats/")
            self.console.print("  - Plots: src/metrics/execution_stats_plots/")

        except ImportError as e:
            self.console.print(f"\n[error]✗ Errore import pipeline module: {e}[/error]")
            self.console.print("[info]Assicurati che pipeline.py esista in src/[/info]")
        except Exception as e:
            self.console.print(f"\n[error]✗ Errore durante pipeline: {e}[/error]")
            import traceback
            self.console.print(f"[error]{traceback.format_exc()}[/error]")

        self.wait_for_user()

    def view_dataset_statistics(self):
        """Option 5: View dataset statistics"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]📈 STATISTICHE DATASET[/bold cyan]",
            border_style="cyan"
        ))

        try:
            # Import stats module
            from stats import StatsHandler

            self.console.print("\n[yellow]⏳ Caricamento statistiche...[/yellow]\n")

            # Create stats handler
            stats_handler = StatsHandler()

            # Display statistics
            self.console.print(Rule("[bold cyan]Dataset Overview[/bold cyan]"))
            stats_handler.print_dataset_statistics()

            # Ask if user wants full analysis
            full_analysis = Confirm.ask(
                "\n[cyan]Eseguire analisi completa con grafici?[/cyan]",
                default=False
            )

            if full_analysis:
                self.console.print("\n[yellow]⏳ Generazione analisi completa...[/yellow]\n")
                stats_handler.full_analysis()
                self.console.print("\n[success]✓ Analisi completa generata![/success]")
                self.console.print("[info]Grafici salvati nella directory del progetto[/info]")

        except ImportError as e:
            self.console.print(f"[error]✗ Errore import modulo stats: {e}[/error]")
        except Exception as e:
            self.console.print(f"[error]✗ Errore durante visualizzazione: {e}[/error]")

        self.wait_for_user()

    def configuration_menu(self):
        """Option 6: Configuration and setup"""
        self.console.print("\n")
        self.console.print(Panel(
            "[bold cyan]⚙️  CONFIGURAZIONE E SETUP[/bold cyan]",
            border_style="cyan"
        ))

        self.console.print("\n[cyan]Opzioni di configurazione:[/cyan]")
        self.console.print("  [1] Setup GitHub Token")
        self.console.print("  [2] Configura API Keys (OpenAI, Claude, Gemini)")
        self.console.print("  [3] Verifica Dipendenze")
        self.console.print("  [4] Pulisci Cache/Temp Files")
        self.console.print("  [0] Torna al Menu Principale")

        config_choice = Prompt.ask(
            "\n[cyan]Seleziona opzione[/cyan]",
            choices=["0", "1", "2", "3", "4"],
            default="0"
        )

        if config_choice == "0":
            return
        elif config_choice == "1":
            self._setup_github_token()
        elif config_choice == "2":
            self._setup_api_keys()
        elif config_choice == "3":
            self._verify_dependencies()
        elif config_choice == "4":
            self._clean_cache()

        self.wait_for_user()

    def _setup_github_token(self):
        """Setup GitHub token"""
        self.console.print("\n[info]Setup GitHub Token[/info]")
        self.console.print("[warning]Il token GitHub è necessario per accedere alle API con rate limit più alti.[/warning]")

        try:
            from utility_dir.general_utils import setup_github_token
            setup_github_token()
            self.console.print("[success]✓ Token configurato![/success]")
        except Exception as e:
            self.console.print(f"[error]✗ Errore: {e}[/error]")

    def _setup_api_keys(self):
        """Setup API keys"""
        self.console.print("\n[info]Setup API Keys[/info]")
        self.console.print("[warning]Le API keys devono essere inserite nel file .env[/warning]")
        self.console.print("\n[cyan]File .env deve contenere:[/cyan]")
        self.console.print("  OPENAI_API_KEY=your_key_here")
        self.console.print("  ANTHROPIC_API_KEY=your_key_here")
        self.console.print("  GEMINI_API_KEY=your_key_here")

        env_path = Path(__file__).parent / ".env"
        if env_path.exists():
            self.console.print(f"\n[success]✓ File .env trovato: {env_path}[/success]")
        else:
            self.console.print(f"\n[warning]⚠️  File .env non trovato in: {env_path}[/warning]")
            self.console.print("[info]Crea il file .env con le tue API keys.[/info]")

    def _verify_dependencies(self):
        """Verify dependencies"""
        self.console.print("\n[info]Verifica dipendenze...[/info]\n")

        required_packages = [
            "rich", "openai", "anthropic", "google-generativeai",
            "psutil", "pytest", "tqdm", "python-dotenv"
        ]

        missing = []
        for package in required_packages:
            try:
                __import__(package.replace("-", "_"))
                self.console.print(f"[success]✓ {package}[/success]")
            except ImportError:
                self.console.print(f"[error]✗ {package} - MANCANTE[/error]")
                missing.append(package)

        if missing:
            self.console.print(f"\n[warning]⚠️  Pacchetti mancanti: {', '.join(missing)}[/warning]")
            self.console.print("[info]Esegui: pip install -r requirements.txt[/info]")
        else:
            self.console.print("\n[success]✓ Tutte le dipendenze sono installate![/success]")

    def _clean_cache(self):
        """Clean cache and temp files"""
        self.console.print("\n[info]Pulizia cache...[/info]")
        self.console.print("[warning]Funzionalità in sviluppo[/warning]")
        # TODO: Implement cache cleaning logic

    def wait_for_user(self):
        """Wait for user input before continuing"""
        self.console.print("\n")
        Prompt.ask("[dim]Premi INVIO per continuare[/dim]", default="")

    def run(self):
        """Main TUI loop"""
        while self.running:
            self.clear_screen()
            self.show_banner()
            self.show_main_menu()

            choice = Prompt.ask(
                "[bold cyan]Seleziona un'opzione[/bold cyan]",
                default="Q"
            ).upper()

            if choice == "1":
                self.execute_tests_on_cluster()
            elif choice == "2":
                self.analyze_execution_results()
            elif choice == "3":
                self.calculate_statistics()
            elif choice == "4":
                self.execute_complete_pipeline()
            elif choice == "5":
                self.view_dataset_statistics()
            elif choice == "6":
                self.configuration_menu()
            elif choice == "Q":
                self.console.print("\n[success]👋 Arrivederci![/success]\n")
                self.running = False
            else:
                self.console.print(f"\n[error]Opzione '{choice}' non valida![/error]")
                self.wait_for_user()


def main():
    """Main entry point"""
    try:
        tui = MainTUI()
        tui.run()
    except KeyboardInterrupt:
        console.print("\n\n[warning]⚠️  Interrotto dall'utente[/warning]\n")
        sys.exit(0)
    except Exception as e:
        console.print(f"\n[error]✗ Errore fatale: {e}[/error]\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
