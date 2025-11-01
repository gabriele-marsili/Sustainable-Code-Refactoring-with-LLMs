#!/usr/bin/env python3
"""
Analizzatore Risultati per Nuove Entry C/C++ Exercism

Analizza i risultati dei test per le nuove entry C/C++ provenienti da Exercism
e fornisce statistiche dettagliate su:
- Successi vs fallimenti
- Metriche ottenute correttamente
- Categorizzazione errori
- Confronto base code vs LLM variants

Usage:
    python analyze_new_entries.py [--verbose] [--export-csv] [--cluster CLUSTER_NAME]
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from collections import defaultdict, Counter
from dataclasses import dataclass, asdict
import argparse

# Add parent directory to path for imports
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from utility_dir.utility_paths import (
    CLUSTERS_DIR_FILEPATH,
    OUTPUT_DIR_FILEPATH,
    SRC_DIR,
)


@dataclass
class EntryAnalysis:
    """Risultati analisi per una singola entry"""
    entry_id: str
    language: str
    cluster: str
    is_base: bool

    # Execution status
    executed: bool
    success: bool
    has_metrics: bool

    # Metrics
    execution_time_ms: Optional[float]
    cpu_usage: Optional[float]
    ram_usage: Optional[int]
    regression_test_passed: Optional[bool]

    # Error info
    error_category: Optional[str]
    error_message: Optional[str]
    docker_exit_code: Optional[int]


@dataclass
class ClusterStats:
    """Statistiche per un cluster"""
    cluster_name: str
    total_entries: int
    base_entries: int
    llm_entries: int

    # Success metrics
    base_success: int
    base_with_metrics: int
    llm_success: int
    llm_with_metrics: int

    # Failures
    base_failures: int
    llm_failures: int

    # Error categories
    error_categories: Dict[str, int]

    # Languages
    languages: List[str]


class NewEntriesAnalyzer:
    """Analizzatore per risultati nuove entry Exercism"""

    def __init__(self):
        self.clusters_dir = CLUSTERS_DIR_FILEPATH
        self.outputs_dir = OUTPUT_DIR_FILEPATH
        self.logs_dir = SRC_DIR / "logs"

        # Pattern per identificare nuove entry Exercism
        self.exercism_pattern = r"exercism-"

        # Storage analisi
        self.entries: List[EntryAnalysis] = []
        self.cluster_stats: Dict[str, ClusterStats] = {}

    def find_new_entry_clusters(self) -> List[str]:
        """Trova tutti i cluster con nuove entry Exercism C/C++"""
        new_clusters = []

        for cluster_file in self.clusters_dir.glob("cluster_*.json"):
            try:
                with open(cluster_file, 'r') as f:
                    data = json.load(f)

                # Controlla se ha entry exercism in C o C++ (by source field)
                has_exercism = False
                for lang in ["c", "cpp"]:
                    if lang in data:
                        for entry in data[lang]:
                            source = entry.get("source", "")
                            if "exercism-" in source.lower():
                                has_exercism = True
                                break
                    if has_exercism:
                        break

                if has_exercism:
                    cluster_name = cluster_file.stem.replace("cluster_", "")
                    new_clusters.append(cluster_name)

            except Exception as e:
                print(f"⚠️  Error reading {cluster_file}: {e}")
                continue

        return sorted(new_clusters)

    def load_cluster_data(self, cluster_name: str) -> Dict:
        """Carica dati del cluster"""
        cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"
        with open(cluster_file, 'r') as f:
            return json.load(f)

    def load_execution_results(self, cluster_name: str) -> List[Dict]:
        """Carica tutti i risultati di esecuzione per un cluster"""
        results = []

        # Pattern per file risultati: {cluster}_results_*.json
        patterns = [
            f"{cluster_name}_results_*.json",      # Base runs
            f"{cluster_name}_results_v*_*.json",   # LLM runs
        ]

        for pattern in patterns:
            for result_file in self.outputs_dir.glob(pattern):
                try:
                    with open(result_file, 'r') as f:
                        data = json.load(f)
                        results.append(data)
                except Exception as e:
                    print(f"⚠️  Error reading {result_file}: {e}")

        return results

    def load_diagnostic_log(self, entry_id: str, language: str) -> Optional[Dict]:
        """Carica log diagnostico per un'entry"""
        # Pattern: test_runner_{lang}_persistent_{entry_id}_{timestamp}_diagnostic.json
        pattern = f"test_runner_{language}_persistent_{entry_id}_*_diagnostic.json"

        diagnostic_files = list(self.logs_dir.glob(pattern))
        if not diagnostic_files:
            return None

        # Prendi il più recente
        latest = max(diagnostic_files, key=lambda p: p.stat().st_mtime)

        try:
            with open(latest, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️  Error reading diagnostic {latest}: {e}")
            return None

    def analyze_entry(
        self,
        entry: Dict,
        cluster_name: str,
        is_base: bool,
        result_data: Optional[Dict] = None
    ) -> EntryAnalysis:
        """Analizza una singola entry"""

        entry_id = entry["id"]
        language = entry["language"]

        # Default values
        executed = False
        success = False
        has_metrics = False
        execution_time_ms = None
        cpu_usage = None
        ram_usage = None
        regression_test_passed = None
        error_category = None
        error_message = None
        docker_exit_code = None

        # Se abbiamo dati risultato, usali
        if result_data:
            executed = True
            success = result_data.get("success", False)

            # Check metrics
            execution_time_ms = result_data.get("execution_time_ms")
            cpu_usage = result_data.get("CPU_usage")
            ram_usage = result_data.get("RAM_usage")

            has_metrics = all([
                execution_time_ms is not None,
                cpu_usage is not None,
                ram_usage is not None
            ])

            regression_test_passed = result_data.get("regressionTestPassed")
            error_message = result_data.get("error_message")

        # Carica diagnostic log per dettagli errore (solo se fallito)
        if not success:
            diagnostic = self.load_diagnostic_log(entry_id, language)
            if diagnostic:
                error_category = diagnostic.get("error_category")
                docker_exit_code = diagnostic.get("docker_exit_code")

                # Override error message if available in diagnostic
                if not error_message and diagnostic.get("error_message"):
                    error_message = diagnostic["error_message"]

        return EntryAnalysis(
            entry_id=entry_id,
            language=language,
            cluster=cluster_name,
            is_base=is_base,
            executed=executed,
            success=success,
            has_metrics=has_metrics,
            execution_time_ms=execution_time_ms,
            cpu_usage=cpu_usage,
            ram_usage=ram_usage,
            regression_test_passed=regression_test_passed,
            error_category=error_category,
            error_message=error_message,
            docker_exit_code=docker_exit_code
        )

    def analyze_cluster(self, cluster_name: str, verbose: bool = False) -> ClusterStats:
        """Analizza un intero cluster"""

        if verbose:
            print(f"\n📊 Analyzing cluster: {cluster_name}")

        # Load cluster data
        cluster_data = self.load_cluster_data(cluster_name)

        # Load execution results
        execution_results = self.load_execution_results(cluster_name)

        # Build result lookup:
        # For base: entry_id -> result
        # For LLM: (entry_id, llm_path) -> result
        # Since each test runs multiple times (5 runs), we need to aggregate:
        # - If ANY run succeeded, mark as executed
        # - Keep the best result (prioritize success=True)
        base_result_lookup = {}
        llm_result_lookup = {}

        for exec_result in execution_results:
            if "results" in exec_result:
                for lang, entries in exec_result["results"].items():
                    for entry_result in entries:
                        entry_id = entry_result.get("id")
                        if not entry_id:
                            continue

                        # Check if this is base or LLM result
                        if "LLM_results" in entry_result:
                            # LLM results - store by (entry_id, path)
                            for llm_res in entry_result["LLM_results"]:
                                llm_path = llm_res.get("path")
                                if llm_path:
                                    key = (entry_id, llm_path)
                                    # Keep best result (prioritize success)
                                    if key not in llm_result_lookup or llm_res.get("success", False):
                                        llm_result_lookup[key] = llm_res
                        else:
                            # Base result - keep best result (prioritize success)
                            if entry_id not in base_result_lookup or entry_result.get("success", False):
                                base_result_lookup[entry_id] = entry_result

        # Analyze entries
        total_entries = 0
        base_entries = 0
        llm_entries = 0
        base_success = 0
        base_with_metrics = 0
        llm_success = 0
        llm_with_metrics = 0
        base_failures = 0
        llm_failures = 0
        error_categories = Counter()
        languages = set()

        for lang in ["c", "cpp"]:
            if lang not in cluster_data:
                continue

            for base_entry in cluster_data[lang]:
                entry_id = base_entry["id"]

                # Filter only exercism entries (by source field)
                source = base_entry.get("source", "")
                if "exercism-" not in source.lower():
                    continue

                languages.add(lang)

                # ========= Analyze BASE entry =========
                total_entries += 1
                base_entries += 1

                result_data = base_result_lookup.get(entry_id)
                analysis = self.analyze_entry(base_entry, cluster_name, True, result_data)
                self.entries.append(analysis)

                if analysis.error_category:
                    error_categories[analysis.error_category] += 1

                if analysis.success:
                    base_success += 1
                else:
                    base_failures += 1

                if analysis.has_metrics:
                    base_with_metrics += 1

                if verbose:
                    status = "✅" if analysis.success else "❌"
                    metrics = "📊" if analysis.has_metrics else "⚠️"
                    print(f"  {status} {metrics} [BASE] {entry_id[:45]:<45} | {analysis.error_category or 'OK'}")

                # ========= Analyze LLM variants =========
                llm_variants = base_entry.get("LLMs", [])
                for llm_variant in llm_variants:
                    total_entries += 1
                    llm_entries += 1

                    # Create pseudo-entry for LLM variant
                    llm_path = llm_variant["path"]
                    llm_entry = {
                        "id": entry_id,
                        "filename": llm_variant["filename"],
                        "language": lang,
                        "codeSnippetFilePath": llm_path,
                    }

                    # Lookup LLM result by (entry_id, path)
                    lookup_key = (entry_id, llm_path)
                    llm_result_data = llm_result_lookup.get(lookup_key)

                    analysis = self.analyze_entry(llm_entry, cluster_name, False, llm_result_data)
                    self.entries.append(analysis)

                    if analysis.error_category:
                        error_categories[analysis.error_category] += 1

                    if analysis.success:
                        llm_success += 1
                    else:
                        llm_failures += 1

                    if analysis.has_metrics:
                        llm_with_metrics += 1

                    if verbose:
                        status = "✅" if analysis.success else "❌"
                        metrics = "📊" if analysis.has_metrics else "⚠️"
                        llm_type = llm_variant.get("type", "?")[:6]
                        print(f"  {status} {metrics} [{llm_type:>6}] {llm_variant['filename'][:45]:<45} | {analysis.error_category or 'OK'}")

        stats = ClusterStats(
            cluster_name=cluster_name,
            total_entries=total_entries,
            base_entries=base_entries,
            llm_entries=llm_entries,
            base_success=base_success,
            base_with_metrics=base_with_metrics,
            llm_success=llm_success,
            llm_with_metrics=llm_with_metrics,
            base_failures=base_failures,
            llm_failures=llm_failures,
            error_categories=dict(error_categories),
            languages=sorted(languages)
        )

        self.cluster_stats[cluster_name] = stats
        return stats

    def analyze_all(self, verbose: bool = False, specific_cluster: Optional[str] = None):
        """Analizza tutti i cluster o uno specifico"""

        if specific_cluster:
            clusters = [specific_cluster]
        else:
            clusters = self.find_new_entry_clusters()

        print(f"🔍 Found {len(clusters)} clusters with new Exercism C/C++ entries")

        for cluster in clusters:
            self.analyze_cluster(cluster, verbose)

    def print_summary(self):
        """Stampa summary completo"""

        print("\n" + "="*80)
        print("📊 ANALYSIS SUMMARY - NEW EXERCISM C/C++ ENTRIES")
        print("="*80)

        # Overall stats
        total_clusters = len(self.cluster_stats)
        total_entries = sum(s.total_entries for s in self.cluster_stats.values())
        total_base = sum(s.base_entries for s in self.cluster_stats.values())
        total_llm = sum(s.llm_entries for s in self.cluster_stats.values())

        print(f"\n📦 OVERALL STATISTICS")
        print(f"{'─'*80}")
        print(f"  Clusters analyzed:      {total_clusters}")
        print(f"  Total entries:          {total_entries}")
        print(f"    - Base entries:       {total_base}")
        print(f"    - LLM variants:       {total_llm}")

        # Success rates
        total_base_success = sum(s.base_success for s in self.cluster_stats.values())
        total_base_with_metrics = sum(s.base_with_metrics for s in self.cluster_stats.values())
        total_llm_success = sum(s.llm_success for s in self.cluster_stats.values())
        total_llm_with_metrics = sum(s.llm_with_metrics for s in self.cluster_stats.values())

        base_success_rate = (total_base_success / total_base * 100) if total_base > 0 else 0
        base_metrics_rate = (total_base_with_metrics / total_base * 100) if total_base > 0 else 0
        llm_success_rate = (total_llm_success / total_llm * 100) if total_llm > 0 else 0
        llm_metrics_rate = (total_llm_with_metrics / total_llm * 100) if total_llm > 0 else 0

        print(f"\n✅ BASE CODE RESULTS")
        print(f"{'─'*80}")
        print(f"  Tests passed:           {total_base_success}/{total_base} ({base_success_rate:.1f}%)")
        print(f"  Metrics obtained:       {total_base_with_metrics}/{total_base} ({base_metrics_rate:.1f}%)")

        print(f"\n🤖 LLM VARIANTS RESULTS")
        print(f"{'─'*80}")
        print(f"  Tests passed:           {total_llm_success}/{total_llm} ({llm_success_rate:.1f}%)")
        print(f"  Metrics obtained:       {total_llm_with_metrics}/{total_llm} ({llm_metrics_rate:.1f}%)")

        # Error categories
        all_error_categories = Counter()
        for stats in self.cluster_stats.values():
            for category, count in stats.error_categories.items():
                all_error_categories[category] += count

        print(f"\n❌ ERROR CATEGORIES")
        print(f"{'─'*80}")
        if all_error_categories:
            for category, count in all_error_categories.most_common():
                pct = (count / total_entries * 100) if total_entries > 0 else 0
                print(f"  {category:<30} {count:>5} ({pct:>5.1f}%)")
        else:
            print("  No errors found!")

        # Language breakdown
        lang_stats = defaultdict(lambda: {"base": 0, "llm": 0, "base_success": 0, "llm_success": 0})
        for entry in self.entries:
            lang = entry.language
            if entry.is_base:
                lang_stats[lang]["base"] += 1
                if entry.success:
                    lang_stats[lang]["base_success"] += 1
            else:
                lang_stats[lang]["llm"] += 1
                if entry.success:
                    lang_stats[lang]["llm_success"] += 1

        print(f"\n🔤 LANGUAGE BREAKDOWN")
        print(f"{'─'*80}")
        for lang in sorted(lang_stats.keys()):
            stats = lang_stats[lang]
            base_rate = (stats["base_success"] / stats["base"] * 100) if stats["base"] > 0 else 0
            llm_rate = (stats["llm_success"] / stats["llm"] * 100) if stats["llm"] > 0 else 0

            print(f"  {lang.upper()}")
            print(f"    Base:  {stats['base_success']}/{stats['base']} ({base_rate:.1f}%)")
            print(f"    LLM:   {stats['llm_success']}/{stats['llm']} ({llm_rate:.1f}%)")

        # Top issues
        print(f"\n⚠️  TOP ISSUES")
        print(f"{'─'*80}")

        issues = Counter()
        for entry in self.entries:
            if not entry.success:
                key = entry.error_category or "unknown"
                issues[key] += 1

        for issue, count in issues.most_common(5):
            print(f"  {issue:<30} {count:>5} failures")

        print("\n" + "="*80)

    def print_cluster_details(self, top_n: int = 10):
        """Stampa dettagli top N cluster per problemi"""

        # Sort by failure rate
        sorted_clusters = sorted(
            self.cluster_stats.values(),
            key=lambda s: (s.base_failures + s.llm_failures) / max(s.total_entries, 1),
            reverse=True
        )[:top_n]

        print(f"\n📋 TOP {top_n} CLUSTERS BY FAILURE RATE")
        print("="*80)

        for stats in sorted_clusters:
            total_failures = stats.base_failures + stats.llm_failures
            failure_rate = (total_failures / stats.total_entries * 100) if stats.total_entries > 0 else 0

            print(f"\n  {stats.cluster_name}")
            print(f"  {'─'*76}")
            print(f"    Total entries:    {stats.total_entries} ({', '.join(stats.languages)})")
            print(f"    Base:             {stats.base_success}/{stats.base_entries} passed")
            print(f"    LLM:              {stats.llm_success}/{stats.llm_entries} passed")
            print(f"    Failure rate:     {failure_rate:.1f}%")
            if stats.error_categories:
                print(f"    Main errors:      {', '.join(list(stats.error_categories.keys())[:3])}")

    def export_csv(self, output_file: Path):
        """Esporta risultati in CSV"""
        import csv

        with open(output_file, 'w', newline='') as f:
            fieldnames = [
                'cluster', 'entry_id', 'language', 'is_base',
                'executed', 'success', 'has_metrics',
                'execution_time_ms', 'cpu_usage', 'ram_usage',
                'regression_test_passed',
                'error_category', 'error_message', 'docker_exit_code'
            ]

            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()

            for entry in self.entries:
                row = asdict(entry)
                writer.writerow(row)

        print(f"\n💾 Results exported to: {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Analyze test results for new Exercism C/C++ entries"
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Show detailed per-entry analysis"
    )
    parser.add_argument(
        "-c", "--cluster",
        type=str,
        help="Analyze specific cluster only"
    )
    parser.add_argument(
        "--export-csv",
        type=str,
        help="Export results to CSV file"
    )
    parser.add_argument(
        "--top",
        type=int,
        default=10,
        help="Number of top clusters to show in detail (default: 10)"
    )

    args = parser.parse_args()

    # Create analyzer
    analyzer = NewEntriesAnalyzer()

    # Run analysis
    analyzer.analyze_all(verbose=args.verbose, specific_cluster=args.cluster)

    # Print summary
    analyzer.print_summary()

    # Print cluster details
    if not args.cluster:
        analyzer.print_cluster_details(top_n=args.top)

    # Export CSV if requested
    if args.export_csv:
        output_path = Path(args.export_csv)
        analyzer.export_csv(output_path)

    print()


if __name__ == "__main__":
    main()
