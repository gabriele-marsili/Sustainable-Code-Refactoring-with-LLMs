#!/usr/bin/env python3
"""
Demo script to showcase improved analysis capabilities with:
- Language-specific percentages
- Removal impact analysis
- Automatic generation of removal lists
"""

import sys
import json
from pathlib import Path
from datetime import datetime

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.reporters.report_generator import ReportGenerator

try:
    from rich.console import Console
    from rich.panel import Panel
    RICH_AVAILABLE = True
    console = Console()
except ImportError:
    RICH_AVAILABLE = False
    console = None


def print_message(message, style="info"):
    """Print message with or without rich"""
    if console:
        if style == "success":
            console.print(f"[green]{message}[/green]")
        elif style == "error":
            console.print(f"[red]{message}[/red]")
        elif style == "warning":
            console.print(f"[yellow]{message}[/yellow]")
        else:
            console.print(f"[cyan]{message}[/cyan]")
    else:
        print(message)


def main():
    """Run improved analysis"""
    if console:
        console.print("\n")
        console.print(Panel.fit(
            "[bold cyan]IMPROVED ANALYSIS SYSTEM DEMO[/bold cyan]\n"
            "✓ Language-specific percentages\n"
            "✓ Removal impact analysis\n"
            "✓ Automated removal list generation",
            border_style="cyan"
        ))
    else:
        print("\n" + "="*80)
        print("IMPROVED ANALYSIS SYSTEM DEMO")
        print("="*80)

    # Initialize components
    print_message("\n1. Initializing analysis components...")
    config = AnalyzerConfig()
    data_loader = DataLoader(config)
    anomaly_detector = AnomalyDetector(config)
    report_generator = ReportGenerator(config)
    print_message("✓ Components initialized", "success")

    # Load data
    print_message("\n2. Loading execution data...")
    cluster_names = data_loader.get_all_cluster_names()
    print_message(f"Found {len(cluster_names)} clusters")

    all_entries = []
    for cluster_name in cluster_names:
        try:
            entries = data_loader.load_execution_results(cluster_name, 'both')
            all_entries.extend(entries)
        except Exception as e:
            print_message(f"Warning: Failed to load cluster {cluster_name}: {e}", "warning")
            continue

    print_message(f"✓ Loaded {len(all_entries):,} execution entries", "success")

    if not all_entries:
        print_message("ERROR: No entries loaded!", "error")
        return

    # Detect anomalies
    print_message("\n3. Detecting anomalies...")
    anomalies = anomaly_detector.detect_all(all_entries)
    print_message(f"✓ Detected {len(anomalies):,} anomalies ({len(anomalies)/len(all_entries)*100:.2f}%)", "success")

    # Generate comprehensive report
    print_message("\n4. Generating comprehensive report with language statistics...")
    report = report_generator.generate_full_report(anomalies, len(all_entries), all_entries)

    # Display report
    print_message("\n" + "="*80)
    if console:
        console.print(Panel(
            report_generator.generate_summary_text(report),
            title="[bold cyan]Analysis Report[/bold cyan]",
            border_style="cyan"
        ))
    else:
        print(report_generator.generate_summary_text(report))

    # Generate removal impact analysis
    print_message("\n5. Analyzing removal impact...")
    impact = report_generator.generate_removal_impact_analysis(report, all_entries)

    print_message("\n" + "="*80)
    if console:
        console.print(Panel(
            report_generator.generate_removal_impact_text(impact),
            title="[bold yellow]Removal Impact Analysis[/bold yellow]",
            border_style="yellow"
        ))
    else:
        print(report_generator.generate_removal_impact_text(impact))

    # Generate and save removal list
    print_message("\n6. Generating removal list...")
    removal_dir = Path(__file__).parent / "removal_analysis"
    removal_dir.mkdir(exist_ok=True)

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    removal_list_path = removal_dir / f"entries_to_remove_{timestamp}.json"
    removal_list = report_generator.generate_removal_list(report, str(removal_list_path))

    print_message(f"✓ Generated removal list with {len(removal_list)} entries", "success")
    print_message(f"✓ Saved to: {removal_list_path}", "success")

    # Save impact analysis JSON
    impact_path = removal_dir / f"removal_impact_{timestamp}.json"
    with open(impact_path, 'w', encoding='utf-8') as f:
        json.dump(impact, f, indent=2, ensure_ascii=False)

    print_message(f"✓ Impact analysis saved to: {impact_path}", "success")

    # Save full report JSON
    report_path = removal_dir / f"full_analysis_report_{timestamp}.json"
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report.to_dict(), f, indent=2, ensure_ascii=False)

    print_message(f"✓ Full report saved to: {report_path}", "success")

    # Summary of files created
    print_message("\n" + "="*80)
    print_message("FILES GENERATED:")
    print_message(f"  1. Removal list: {removal_list_path}")
    print_message(f"  2. Impact analysis: {impact_path}")
    print_message(f"  3. Full report: {report_path}")

    # Key findings summary
    print_message("\n" + "="*80)
    print_message("KEY FINDINGS:")
    print_message(f"  • Total entries: {impact['total_entries']:,}")
    print_message(f"  • Problematic entries: {impact['problematic_entries']:,} ({impact['removal_percentage']:.2f}%)")
    print_message(f"  • Recommendation: {impact['recommendation']}")

    if impact['languages_severely_impacted']:
        print_message(f"\n  ⚠️  SEVERELY IMPACTED LANGUAGES:", "warning")
        for lang_info in impact['languages_severely_impacted']:
            print_message(f"     - {lang_info['language'].upper()}: {lang_info['loss_percentage']:.1f}% loss", "warning")

    print_message("\n✅ Analysis complete!\n", "success")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        if console:
            console.print(f"\n[bold red]ERROR: {e}[/bold red]\n")
        else:
            print(f"\nERROR: {e}\n")
        import traceback
        traceback.print_exc()
        sys.exit(1)
