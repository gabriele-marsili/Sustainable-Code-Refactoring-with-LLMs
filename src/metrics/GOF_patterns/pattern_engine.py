#!/usr/bin/env python3
"""
Script per l'analisi dei pattern di ingegneria del software nei codici generati dagli LLM
e la correlazione con i miglioramenti energetici.
"""

import sys
import os
import json
import argparse
import re

# from pathlib import Path
from typing import Dict, List, Any
from dataclasses import dataclass
from collections import defaultdict
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from scipy import stats

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from utility_dir import utility_paths


@dataclass
class PatternMatch:
    """rappresenta un pattern trovato nel codice."""

    pattern_name: str
    pattern_type: str
    confidence: float
    line_number: int
    code_snippet: str
    description: str


@dataclass
class CodeAnalysis:
    """contiene l'analisi di un file di codice."""

    file_id: str
    llm_type: str
    file_path: str
    patterns: List[PatternMatch]
    total_patterns: int
    pattern_categories: Dict[str, int]


class SoftwarePatternAnalyzer:
    """Analizzatore per identificare pattern di ingegneria del software."""

    def __init__(self):
        self.pattern_definitions = self._initialize_patterns()

    def _initialize_patterns(self) -> Dict[str, Dict]:
        """Inizializza le definizioni dei pattern da cercare."""
        return {
            # Creational Patterns
            "Singleton": {
                "type": "Creational",
                "patterns": [
                    r"class\s+\w+.*:\s*\n.*_instance\s*=\s*None",
                    r"def\s+__new__\s*\(.*\):",
                    r"if\s+cls\._instance\s+is\s+None:",
                    r"@staticmethod.*\n.*def\s+get_instance",
                    r"_instances\s*=\s*\{\}",
                ],
                "keywords": ["singleton", "instance", "__new__", "get_instance"],
            },
            "Factory Method": {
                "type": "Creational",
                "patterns": [
                    r"def\s+create_\w+\(.*\):",
                    r"class\s+\w*Factory\w*:",
                    r"def\s+make_\w+\(.*\):",
                    r"@staticmethod.*\n.*def\s+create",
                    r"if\s+\w+\s*==\s*['\"].+['\"].*return\s+\w+\(",
                ],
                "keywords": ["factory", "create", "make", "build"],
            },
            "Builder": {
                "type": "Creational",
                "patterns": [
                    r"class\s+\w*Builder\w*:",
                    r"def\s+build\(.*\):",
                    r"def\s+set_\w+\(.*\):",
                    r"return\s+self(?:\s*#.*)?$",
                    r"def\s+add_\w+\(.*\):",
                ],
                "keywords": ["builder", "build", "set_", "add_", "with_"],
            },
            # Structural Patterns
            "Adapter": {
                "type": "Structural",
                "patterns": [
                    r"class\s+\w*Adapter\w*:",
                    r"def\s+__init__.*adaptee",
                    r"self\._adaptee\.",
                    r"def\s+\w+\(.*\):\s*\n.*return\s+self\._\w+\.",
                ],
                "keywords": ["adapter", "adaptee", "adapt"],
            },
            "Decorator": {
                "type": "Structural",
                "patterns": [
                    r"@\w+",
                    r"def\s+\w+\(func\):",
                    r"def\s+wrapper\(.*\):",
                    r"functools\.wraps",
                    r"def\s+decorator\(",
                ],
                "keywords": ["decorator", "wrapper", "wraps"],
            },
            "Facade": {
                "type": "Structural",
                "patterns": [
                    r"class\s+\w*Facade\w*:",
                    r"def\s+\w+\(.*\):\s*\n.*self\._\w+\.\w+\(",
                    r"self\._\w+_manager",
                ],
                "keywords": ["facade", "manager", "interface"],
            },
            # Behavioral Patterns
            "Strategy": {
                "type": "Behavioral",
                "patterns": [
                    r"class\s+\w*Strategy\w*:",
                    r"def\s+execute\(.*\):",
                    r"self\._strategy\.",
                    r"def\s+set_strategy\(",
                    r"from\s+abc\s+import.*ABC.*abstractmethod",
                ],
                "keywords": ["strategy", "execute", "algorithm"],
            },
            "Observer": {
                "type": "Behavioral",
                "patterns": [
                    r"class\s+\w*Observer\w*:",
                    r"def\s+update\(.*\):",
                    r"def\s+notify\(.*\):",
                    r"self\._observers",
                    r"def\s+add_observer\(",
                    r"def\s+remove_observer\(",
                ],
                "keywords": ["observer", "notify", "update", "subscribe"],
            },
            "Command": {
                "type": "Behavioral",
                "patterns": [
                    r"class\s+\w*Command\w*:",
                    r"def\s+execute\(.*\):",
                    r"def\s+undo\(.*\):",
                    r"self\._receiver",
                    r"def\s+invoke\(",
                ],
                "keywords": ["command", "execute", "undo", "invoke"],
            },
            # Additional Software Engineering Patterns
            "Template Method": {
                "type": "Behavioral",
                "patterns": [
                    r"def\s+template_method\(",
                    r"self\.\w+_step\(\)",
                    r"raise\s+NotImplementedError",
                    r"# Template method",
                ],
                "keywords": ["template", "step", "abstract"],
            },
            "MVC": {
                "type": "Architectural",
                "patterns": [
                    r"class\s+\w*Model\w*:",
                    r"class\s+\w*View\w*:",
                    r"class\s+\w*Controller\w*:",
                    r"def\s+render\(",
                    r"def\s+handle_\w+\(",
                ],
                "keywords": ["model", "view", "controller", "mvc"],
            },
            "Repository": {
                "type": "Data Access",
                "patterns": [
                    r"class\s+\w*Repository\w*:",
                    r"def\s+find_by_\w+\(",
                    r"def\s+save\(",
                    r"def\s+delete\(",
                    r"def\s+find_all\(",
                ],
                "keywords": ["repository", "find_by", "save", "delete"],
            },
            "Dependency Injection": {
                "type": "Dependency Management",
                "patterns": [
                    r"def\s+__init__\(.*:.*\)",
                    r"self\._\w+\s*=\s*\w+",
                    r"@inject",
                    r"container\.get\(",
                ],
                "keywords": ["inject", "dependency", "container"],
            },
            # Code Quality Patterns
            "Early Return": {
                "type": "Code Quality",
                "patterns": [
                    r"if\s+.*:\s*\n\s*return",
                    r"if\s+not\s+.*:\s*\n\s*return",
                    r"return\s+.*\s+if\s+.*\s+else",
                ],
                "keywords": ["guard", "early_return", "validation"],
            },
            "Caching": {
                "type": "Performance",
                "patterns": [
                    r"@lru_cache",
                    r"@cache",
                    r"_cache\s*=\s*\{\}",
                    r"if\s+.*\s+in\s+cache:",
                    r"cache\[.*\]\s*=",
                ],
                "keywords": ["cache", "memoize", "lru_cache"],
            },
            "Lazy Loading": {
                "type": "Performance",
                "patterns": [
                    r"@property.*\n.*if\s+.*is\s+None:",
                    r"self\._\w+\s*=\s*None",
                    r"if\s+not\s+hasattr\(self",
                    r"lazy",
                ],
                "keywords": ["lazy", "property", "deferred"],
            },
        }

    def analyze_code(self, code: str, file_path: str) -> List[PatternMatch]:
        """Analizza il codice per identificare i pattern attraverso pattern matching (sfruttando regex)."""
        patterns_found = []
        lines = code.split("\n")

        for pattern_name, pattern_info in self.pattern_definitions.items():
            pattern_matches = self._find_pattern_matches(
                code, lines, pattern_name, pattern_info
            )
            patterns_found.extend(pattern_matches)

        return patterns_found

    def _find_pattern_matches(
        self, code: str, lines: List[str], pattern_name: str, pattern_info: Dict
    ) -> List[PatternMatch]:
        """Trova le corrispondenze per un pattern specifico."""
        matches = []
        regex_patterns = pattern_info["patterns"]
        keywords = pattern_info["keywords"]
        pattern_type = pattern_info["type"]

        # Check regex patterns
        regex_score = 0
        matched_lines = []

        for pattern in regex_patterns:
            regex_matches = list(
                re.finditer(pattern, code, re.MULTILINE | re.IGNORECASE)
            )
            if regex_matches:
                regex_score += len(regex_matches)
                for match in regex_matches:
                    line_num = code[: match.start()].count("\n") + 1
                    matched_lines.append((line_num, match.group()))

        # Check keywords
        keyword_score = 0
        code_lower = code.lower()
        for keyword in keywords:
            if keyword.lower() in code_lower:
                keyword_score += code_lower.count(keyword.lower())

        # Calculate confidence
        total_score = regex_score * 3 + keyword_score  # Regex matches weight more
        max_possible_score = len(regex_patterns) * 3 + len(keywords) * 2
        confidence = (
            min(total_score / max_possible_score, 1.0) if max_possible_score > 0 else 0
        )

        # If confidence is above threshold, create pattern match
        if confidence > 0.1:  # Threshold for pattern detection
            if matched_lines:
                line_num, code_snippet = matched_lines[0]
            else:
                line_num = 1
                code_snippet = "Keyword matches found"

            matches.append(
                PatternMatch(
                    pattern_name=pattern_name,
                    pattern_type=pattern_type,
                    confidence=confidence,
                    line_number=line_num,
                    code_snippet=code_snippet[:100],  # Limit snippet length
                    description=f"Pattern detected with {confidence:.2f} confidence",
                )
            )

        return matches


class EnergyCorrelationAnalyzer:
    """Analizzatore per correlazioni tra pattern e miglioramenti energetici."""

    def __init__(self, cluster_name: str):
        self.cluster_name = cluster_name

    def load_energy_data(self) -> Dict[str, Any]:
        """Carica i dati di miglioramento energetico."""
        energy_file = os.path.join(
            str(utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH),
            f"cluster_{self.cluster_name}_energy_improvement_report.json",
        )

        if not os.path.exists(energy_file):
            raise FileNotFoundError(f"Energy report not found: {energy_file}")

        with open(energy_file, "r") as f:
            return json.load(f)

    def correlate_patterns_with_energy(
        self, pattern_report: Dict, energy_data: Dict
    ) -> Dict[str, Any]:
        """Correla i pattern trovati con i miglioramenti energetici."""
        correlations = {
            "pattern_energy_correlation": {},
            "llm_performance": {},
            "statistical_analysis": {},
            "summary": {},
        }

        # Prepare data for correlation analysis
        pattern_counts = defaultdict(list)
        cpu_improvements = defaultdict(list)
        ram_improvements = defaultdict(list)
        time_improvements = defaultdict(list)

        # Extract data for each LLM type
        for llm_type in ["openAI", "gemini", "claude"]:
            if (
                llm_type in energy_data
                and llm_type in pattern_report
                and isinstance(pattern_report[llm_type], list)
                and isinstance(energy_data[llm_type], dict)
            ):
                energy_entries = energy_data[llm_type].get("entries", [])
                pattern_entries = pattern_report[llm_type]

                # Create lookup dict for energy data
                energy_lookup = {
                    entry["id"]: entry
                    for entry in energy_entries
                    if isinstance(entry, dict) and "id" in entry
                }

                for analysis in pattern_entries:
                    if isinstance(analysis, dict) and "file_id" in analysis:
                        file_id = analysis["file_id"]
                        if file_id in energy_lookup:
                            energy_entry = energy_lookup[file_id]

                            total_patterns = analysis.get("total_patterns", 0)
                            pattern_counts[llm_type].append(total_patterns)
                            cpu_improvements[llm_type].append(
                                energy_entry.get("CPU_improvement", 0)
                            )
                            ram_improvements[llm_type].append(
                                energy_entry.get("RAM_improvement", 0)
                            )
                            time_improvements[llm_type].append(
                                energy_entry.get("execution_time_improvement", 0)
                            )

        # Calculate correlations
        for llm_type in pattern_counts:
            if len(pattern_counts[llm_type]) > 1:
                try:
                    # Pearson correlation coefficients
                    x, y_cpu = _filter_finite_nonconstant(pattern_counts[llm_type], cpu_improvements[llm_type])
                    _, y_ram  = _filter_finite_nonconstant(pattern_counts[llm_type], ram_improvements[llm_type])
                    _, y_time = _filter_finite_nonconstant(pattern_counts[llm_type], time_improvements[llm_type])

                    cpu_corr = cpu_p = ram_corr = ram_p = time_corr = time_p = np.nan
                    if x is not None and y_cpu is not None:
                        cpu_corr, cpu_p = stats.pearsonr(x, y_cpu)
                    if x is not None and y_ram is not None:
                        ram_corr, ram_p = stats.pearsonr(x, y_ram)
                    if x is not None and y_time is not None:
                        time_corr, time_p = stats.pearsonr(x, y_time)

                    correlations["pattern_energy_correlation"][llm_type] = {
                        "cpu_correlation": cpu_corr,
                        "cpu_p_value": cpu_p,
                        "ram_correlation": ram_corr,
                        "ram_p_value": ram_p,
                        "execution_time_correlation": time_corr,
                        "execution_time_p_value": time_p,
                        "sample_size": len(pattern_counts[llm_type]),
                    }
                except Exception as e:
                    print(
                        f"Warning: Could not calculate correlations for {llm_type}: {e}"
                    )

        # Calculate summary statistics
        all_patterns = []
        all_cpu = []
        all_ram = []
        all_time = []

        for llm_type in pattern_counts:
            all_patterns.extend(pattern_counts[llm_type])
            all_cpu.extend(cpu_improvements[llm_type])
            all_ram.extend(ram_improvements[llm_type])
            all_time.extend(time_improvements[llm_type])

        if len(all_patterns) > 1:
            try:
                overall_cpu_corr, overall_cpu_p = stats.pearsonr(all_patterns, all_cpu)
                overall_ram_corr, overall_ram_p = stats.pearsonr(all_patterns, all_ram)
                overall_time_corr, overall_time_p = stats.pearsonr(
                    all_patterns, all_time
                )

                correlations["statistical_analysis"]["overall"] = {
                    "cpu_correlation": overall_cpu_corr,
                    "cpu_p_value": overall_cpu_p,
                    "ram_correlation": overall_ram_corr,
                    "ram_p_value": overall_ram_p,
                    "execution_time_correlation": overall_time_corr,
                    "execution_time_p_value": overall_time_p,
                    "total_samples": len(all_patterns),
                }
            except Exception as e:
                print(f"Warning: Could not calculate overall correlations: {e}")

        # Summary insights
        correlations["summary"] = {
            "strongest_correlation": self._find_strongest_correlation(correlations),
            "pattern_distribution": self._analyze_pattern_distribution(pattern_report),
            "energy_improvement_stats": {
                "mean_cpu_improvement": np.mean(all_cpu) if all_cpu else 0,
                "mean_ram_improvement": np.mean(all_ram) if all_ram else 0,
                "mean_time_improvement": np.mean(all_time) if all_time else 0,
                "std_cpu_improvement": np.std(all_cpu) if all_cpu else 0,
                "std_ram_improvement": np.std(all_ram) if all_ram else 0,
                "std_time_improvement": np.std(all_time) if all_time else 0,
            },
        }

        return correlations

    def _find_strongest_correlation(self, correlations: Dict) -> Dict:
        """Trova la correlazione più forte."""
        strongest = {"metric": "", "value": 0, "llm": "", "significance": ""}

        for llm_type, corr_data in correlations["pattern_energy_correlation"].items():
            for metric in [
                "cpu_correlation",
                "ram_correlation",
                "execution_time_correlation",
            ]:
                if metric in corr_data:
                    value = abs(corr_data[metric])
                    p_value = corr_data[metric.replace("correlation", "p_value")]

                    if value > abs(strongest["value"]):
                        strongest = {
                            "metric": metric,
                            "value": corr_data[metric],
                            "llm": llm_type,
                            "significance": "significant"
                            if p_value < 0.05
                            else "not_significant",
                            "p_value": p_value,
                        }

        return strongest

    def _analyze_pattern_distribution(self, pattern_report: Dict) -> Dict:
        """Analizza la distribuzione dei pattern."""
        pattern_counts = defaultdict(int)
        pattern_types = defaultdict(int)

        # Skip metadata keys and only process LLM types
        llm_types = ["openAI", "gemini", "claude"]

        for llm_type in llm_types:
            if llm_type in pattern_report and isinstance(
                pattern_report[llm_type], list
            ):
                for analysis in pattern_report[llm_type]:
                    # Ensure analysis is a dictionary
                    if isinstance(analysis, dict):
                        # Process pattern categories
                        if "pattern_categories" in analysis and isinstance(
                            analysis["pattern_categories"], dict
                        ):
                            for pattern_name, count in analysis[
                                "pattern_categories"
                            ].items():
                                pattern_counts[pattern_name] += count

                        # Process individual patterns
                        if "patterns" in analysis and isinstance(
                            analysis["patterns"], list
                        ):
                            for pattern in analysis["patterns"]:
                                if (
                                    isinstance(pattern, dict)
                                    and "pattern_type" in pattern
                                ):
                                    pattern_types[pattern["pattern_type"]] += 1

        return {
            "most_common_patterns": dict(
                sorted(pattern_counts.items(), key=lambda x: x[1], reverse=True)[:10]
            ),
            "pattern_type_distribution": dict(pattern_types),
        }


class VisualizationEngine:
    """Motore per la creazione di visualizzazioni."""

    def __init__(self, cluster_name: str):
        self.cluster_name = cluster_name
        plt.style.use("seaborn-v0_8")
        sns.set_palette("husl")

    def create_visualizations(
        self, pattern_report: Dict, energy_data: Dict, correlations: Dict
    ):
        """Crea tutte le visualizzazioni."""
        output_dir = os.path.join(
            utility_paths.PATTERN_REPORTS_DIR,
            f"cluster_{self.cluster_name}_pattern_report_visualizations",
        )
        os.makedirs(output_dir, exist_ok=True)

        # 1. Pattern Distribution
        self._plot_pattern_distribution(pattern_report, output_dir)

        # 2. Energy Improvements by LLM
        self._plot_energy_improvements(energy_data, output_dir)

        # 3. Pattern vs Energy Correlation
        self._plot_correlation_analysis(
            pattern_report, energy_data, correlations, output_dir
        )

        # 4. Pattern Types Distribution
        self._plot_pattern_types(pattern_report, output_dir)

        print(f"Visualizations report saved to: {output_dir}")

    def _plot_pattern_distribution(self, pattern_report: Dict, output_dir: str):
        """Grafico della distribuzione dei pattern."""
        plt.figure(figsize=(12, 8))

        pattern_counts = defaultdict(int)
        llm_types = ["openAI", "gemini", "claude"]

        for llm_type in llm_types:
            if llm_type in pattern_report and isinstance(
                pattern_report[llm_type], list
            ):
                for analysis in pattern_report[llm_type]:
                    if isinstance(analysis, dict) and "pattern_categories" in analysis:
                        if isinstance(analysis["pattern_categories"], dict):
                            for pattern_name, count in analysis[
                                "pattern_categories"
                            ].items():
                                if isinstance(count, (int, float)):
                                    pattern_counts[pattern_name] += count

        if pattern_counts:
            patterns, counts = zip(
                *sorted(pattern_counts.items(), key=lambda x: x[1], reverse=True)
            )

            plt.bar(
                range(len(patterns)),
                counts,
                color=sns.color_palette("husl", len(patterns)),
            )
            plt.xlabel("Software Patterns")
            plt.ylabel("Occurrences")
            plt.title(f"Pattern Distribution in {self.cluster_name} Cluster")
            plt.xticks(range(len(patterns)), patterns, rotation=45, ha="right")
            plt.tight_layout()

            plt.savefig(
                os.path.join(output_dir, "pattern_distribution.png"),
                dpi=300,
                bbox_inches="tight",
            )
            plt.show()
            plt.close()
        else:
            print("Warning: No pattern data found for distribution plot")

    def _plot_energy_improvements(self, energy_data: Dict, output_dir: str):
        """Grafico dei miglioramenti energetici per LLM."""
        fig, axes = plt.subplots(1, 3, figsize=(18, 6))

        llm_types = ["openAI", "gemini", "claude"]
        metrics = ["CPU_improvement", "RAM_improvement", "execution_time_improvement"]
        metric_labels = [
            "CPU Improvement",
            "RAM Improvement",
            "Execution Time Improvement",
        ]

        for i, (metric, label) in enumerate(zip(metrics, metric_labels)):
            values = []
            labels = []

            for llm_type in llm_types:
                if llm_type in energy_data:
                    values.append(energy_data[llm_type][metric])
                    labels.append(llm_type)

            if values:
                bars = axes[i].bar(
                    labels, values, color=sns.color_palette("husl", len(values))
                )
                axes[i].set_title(label)
                axes[i].set_ylabel("Improvement Factor")

                # Add value labels on bars
                for bar, value in zip(bars, values):
                    height = bar.get_height()
                    axes[i].text(
                        bar.get_x() + bar.get_width() / 2.0,
                        height,
                        f"{value:.2f}",
                        ha="center",
                        va="bottom",
                    )

        plt.suptitle(f"Energy Improvements by LLM - {self.cluster_name} Cluster")
        plt.tight_layout()
        plt.savefig(
            os.path.join(output_dir, "energy_improvements_by_llm.png"),
            dpi=300,
            bbox_inches="tight",
        )
        plt.show()
        plt.close()

    def _plot_correlation_analysis(
        self,
        pattern_report: Dict,
        energy_data: Dict,
        correlations: Dict,
        output_dir: str,
    ):
        """Grafico dell'analisi di correlazione."""
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        axes = axes.flatten()

        # Prepare data
        data_for_plot = defaultdict(lambda: defaultdict(list))

        for llm_type in ["openAI", "gemini", "claude"]:
            if llm_type in energy_data and llm_type in pattern_report:
                energy_entries = energy_data[llm_type]["entries"]
                pattern_entries = pattern_report[llm_type]

                energy_lookup = {entry["id"]: entry for entry in energy_entries}

                for analysis in pattern_entries:
                    file_id = analysis["file_id"]
                    if file_id in energy_lookup:
                        energy_entry = energy_lookup[file_id]

                        data_for_plot[llm_type]["patterns"].append(
                            analysis["total_patterns"]
                        )
                        data_for_plot[llm_type]["cpu"].append(
                            energy_entry["CPU_improvement"]
                        )
                        data_for_plot[llm_type]["ram"].append(
                            energy_entry["RAM_improvement"]
                        )
                        data_for_plot[llm_type]["time"].append(
                            energy_entry["execution_time_improvement"]
                        )

        # Plot correlations
        plot_configs = [
            ("patterns", "cpu", "Pattern Count", "CPU Improvement"),
            ("patterns", "ram", "Pattern Count", "RAM Improvement"),
            ("patterns", "time", "Pattern Count", "Execution Time Improvement"),
            ("cpu", "ram", "CPU Improvement", "RAM Improvement"),
        ]

        colors = {"openAI": "red", "gemini": "blue", "claude": "green"}

        for i, (x_key, y_key, x_label, y_label) in enumerate(plot_configs):
            ax = axes[i]

            for llm_type in data_for_plot:
                if data_for_plot[llm_type][x_key] and data_for_plot[llm_type][y_key]:
                    ax.scatter(
                        data_for_plot[llm_type][x_key],
                        data_for_plot[llm_type][y_key],
                        alpha=0.7,
                        label=llm_type,
                        color=colors.get(llm_type, "gray"),
                    )

                    # Add trend line
                    # Add trend line (solo se ha senso)
                    if len(data_for_plot[llm_type][x_key]) > 1:
                        x_arr = np.array(data_for_plot[llm_type][x_key], dtype=float)
                        y_arr = np.array(data_for_plot[llm_type][y_key], dtype=float)

                        # Filtra valori non finiti
                        mask = np.isfinite(x_arr) & np.isfinite(y_arr)
                        x_arr, y_arr = x_arr[mask], y_arr[mask]

                        # Serve varianza su X e Y
                        if len(x_arr) > 1 and np.std(x_arr) > 1e-12 and np.std(y_arr) > 1e-12:
                            try:
                                z = np.polyfit(x_arr, y_arr, 1)
                                p = np.poly1d(z)
                                ax.plot(
                                    x_arr,
                                    p(x_arr),
                                    "--",
                                    color=colors.get(llm_type, "gray"),
                                    alpha=0.8,
                                )
                            except Exception as e:
                                print(f"⚠️ Trendline skipped for {llm_type}: {e}")


            ax.set_xlabel(x_label)
            ax.set_ylabel(y_label)
            ax.set_title(f"{x_label} vs {y_label}")
            ax.legend()
            ax.grid(True, alpha=0.3)

        plt.suptitle(
            f"Pattern-Energy Correlation Analysis - {self.cluster_name} Cluster"
        )
        plt.tight_layout()
        plt.savefig(
            os.path.join(output_dir, "correlation_analysis.png"),
            dpi=300,
            bbox_inches="tight",
        )
        plt.show()
        plt.close()

    def _plot_pattern_types(self, pattern_report: Dict, output_dir: str):
        """Grafico dei tipi di pattern."""
        plt.figure(figsize=(10, 8))

        pattern_types = defaultdict(int)
        llm_types = ["openAI", "gemini", "claude"]

        for llm_type in llm_types:
            if llm_type in pattern_report and isinstance(
                pattern_report[llm_type], list
            ):
                for analysis in pattern_report[llm_type]:
                    if isinstance(analysis, dict) and "patterns" in analysis:
                        if isinstance(analysis["patterns"], list):
                            for pattern in analysis["patterns"]:
                                if (
                                    isinstance(pattern, dict)
                                    and "pattern_type" in pattern
                                ):
                                    pattern_types[pattern["pattern_type"]] += 1

        if pattern_types:
            types, counts = zip(*pattern_types.items())

            plt.pie(
                counts,
                labels=types,
                autopct="%1.1f%%",
                startangle=90,
                colors=sns.color_palette("husl", len(types)),
            )
            plt.title(f"Distribution of Pattern Types - {self.cluster_name} Cluster")
            plt.axis("equal")

            plt.savefig(
                os.path.join(output_dir, "pattern_types_distribution.png"),
                dpi=300,
                bbox_inches="tight",
            )
            plt.show()
            plt.close()
        else:
            print("Warning: No pattern type data found for pie chart")


class PatternEnergyAnalyzer:
    """Classe principale per l'analisi completa."""

    def __init__(self, cluster_name: str, prompt_version: int = 4):
        self.cluster_name = cluster_name
        self.prompt_version = prompt_version
        self.pattern_analyzer = SoftwarePatternAnalyzer()
        self.energy_analyzer = EnergyCorrelationAnalyzer(cluster_name)
        self.visualizer = VisualizationEngine(cluster_name)

        # Ensure output directory exists
        os.makedirs(utility_paths.PATTERN_REPORTS_DIR, exist_ok=True)

    def run_full_analysis(self):
        """Esegue l'analisi completa."""
        print(f"Starting analysis for cluster: {self.cluster_name}")
        print(f"Analyzing prompt version: v{self.prompt_version}")

        try:
            # Step 1-4: Load data and analyze patterns
            cluster_data = self._load_cluster_data()
            pattern_report = self._analyze_llm_patterns(cluster_data)
            self._save_pattern_report(pattern_report)

            # Step 5-6: Load energy data and correlate
            energy_data = self.energy_analyzer.load_energy_data()
            correlations = self.energy_analyzer.correlate_patterns_with_energy(
                pattern_report, energy_data
            )
            self._save_correlation_report(correlations)

            # Step 7: Create visualizations
            self.visualizer.create_visualizations(
                pattern_report, energy_data, correlations
            )

            # Print summary
            self._print_summary(pattern_report, correlations)

            print("\nAnalysis completed successfully!")
            print(f"Reports saved in: {utility_paths.PATTERN_REPORTS_DIR}")

        except Exception as e:
            print(f"Error during analysis: {e}")
            raise

    def _load_cluster_data(self) -> Dict:
        """Carica i dati del cluster."""
        cluster_file = os.path.join(
            utility_paths.CLUSTERS_DIR_FILEPATH, f"cluster_{self.cluster_name}.json"
        )

        if not os.path.exists(cluster_file):
            raise FileNotFoundError(f"Cluster file not found: {cluster_file}")

        with open(cluster_file, "r", encoding="utf-8") as f:
            return json.load(f)

    def _analyze_llm_patterns(self, cluster_data: Dict) -> Dict:
        """Analizza i pattern nei codici generati dagli LLM."""
        pattern_report = {
            "cluster_name": self.cluster_name,
            "prompt_version": self.prompt_version,
            "analysis_date": pd.Timestamp.now().isoformat(),
            "openAI": [],
            "gemini": [],
            "claude": [],
        }

        # Process each language in the cluster
        for language, entries in cluster_data.items():
            for entry in entries:
                self._process_entry_llms(entry, pattern_report)

        return pattern_report

    def _process_entry_llms(self, entry: Dict, pattern_report: Dict):
        """Processa i codici LLM per un singolo entry."""
        entry_id = entry["id"]

        # Filter LLMs by prompt version
        relevant_llms = [
            llm
            for llm in entry["LLMs"]
            if f"_v{self.prompt_version}" in llm["filename"]
        ]

        for llm in relevant_llms:
            llm_type = llm["type"]
            file_path = os.path.join(utility_paths.DATASET_DIR, llm["path"])

            try:
                # Read the code file
                with open(file_path, "r", encoding="utf-8") as f:
                    code_content = f.read()

                # Analyze patterns
                patterns = self.pattern_analyzer.analyze_code(code_content, file_path)

                # Create analysis object
                analysis = CodeAnalysis(
                    file_id=entry_id,
                    llm_type=llm_type,
                    file_path=file_path,
                    patterns=patterns,
                    total_patterns=len(patterns),
                    pattern_categories=self._categorize_patterns(patterns),
                )

                # Convert to dict for JSON serialization
                analysis_dict = {
                    "file_id": analysis.file_id,
                    "llm_type": analysis.llm_type,
                    "file_path": analysis.file_path,
                    "total_patterns": analysis.total_patterns,
                    "pattern_categories": analysis.pattern_categories,
                    "patterns": [
                        {
                            "pattern_name": p.pattern_name,
                            "pattern_type": p.pattern_type,
                            "confidence": p.confidence,
                            "line_number": p.line_number,
                            "code_snippet": p.code_snippet,
                            "description": p.description,
                        }
                        for p in analysis.patterns
                    ],
                }

                # Add to appropriate LLM section
                if llm_type in pattern_report:
                    pattern_report[llm_type].append(analysis_dict)

                print(
                    f"Analyzed {llm_type} - {entry_id}: {len(patterns)} patterns found"
                )

            except Exception as e:
                print(f"Error analyzing {file_path}: {e}")
                continue

    def _categorize_patterns(self, patterns: List[PatternMatch]) -> Dict[str, int]:
        """Categorizza i pattern per tipo."""
        categories = defaultdict(int)
        for pattern in patterns:
            categories[pattern.pattern_name] += 1
        return dict(categories)

    def _save_pattern_report(self, pattern_report: Dict):
        """Salva il report dei pattern."""
        output_file = os.path.join(
            utility_paths.PATTERN_REPORTS_DIR,
            f"pattern_report_{self.cluster_name}_v{self.prompt_version}.json",
        )

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(pattern_report, f, indent=2, ensure_ascii=False)

        print(f"Pattern report saved to: {output_file}")

    def _save_correlation_report(self, correlations: Dict):
        """Salva il report delle correlazioni."""
        output_file = os.path.join(
            utility_paths.PATTERN_REPORTS_DIR,
            f"correlation_report_{self.cluster_name}_v{self.prompt_version}.json",
        )

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(correlations, f, indent=2, ensure_ascii=False)

        print(f"Correlation report saved to: {output_file}")

    def _print_summary(self, pattern_report: Dict, correlations: Dict):
        """Stampa un riassunto dei risultati."""
        print("\n" + "=" * 60)
        print(f"ANALYSIS SUMMARY - {self.cluster_name.upper()} CLUSTER")
        print("=" * 60)

        # Pattern statistics
        total_files = sum(
            len(pattern_report[llm])
            for llm in ["openAI", "gemini", "claude"]
            if llm in pattern_report
        )
        total_patterns = sum(
            sum(analysis["total_patterns"] for analysis in pattern_report[llm])
            for llm in ["openAI", "gemini", "claude"]
            if llm in pattern_report
        )

        print(f"Total files analyzed: {total_files}")
        print(f"Total patterns found: {total_patterns}")
        print(
            f"Average patterns per file: {total_patterns / total_files:.2f}"
            if total_files > 0
            else "N/A"
        )

        # Pattern distribution by LLM
        print("\nPattern Count by LLM:")
        for llm_type in ["openAI", "gemini", "claude"]:
            if llm_type in pattern_report:
                llm_patterns = sum(
                    analysis["total_patterns"] for analysis in pattern_report[llm_type]
                )
                llm_files = len(pattern_report[llm_type])
                avg_patterns = llm_patterns / llm_files if llm_files > 0 else 0
                print(
                    f"  {llm_type}: {llm_patterns} patterns in {llm_files} files (avg: {avg_patterns:.2f})"
                )

        # Most common patterns
        if (
            "summary" in correlations
            and "pattern_distribution" in correlations["summary"]
        ):
            common_patterns = correlations["summary"]["pattern_distribution"][
                "most_common_patterns"
            ]
            print("\nMost Common Patterns:")
            for pattern, count in list(common_patterns.items())[:5]:
                print(f"  {pattern}: {count} occurrences")

        # Correlation insights
        if (
            "summary" in correlations
            and "strongest_correlation" in correlations["summary"]
        ):
            strongest = correlations["summary"]["strongest_correlation"]
            if strongest["value"] != 0:
                print("\nStrongest Correlation:")
                print(f"  Metric: {strongest['metric'].replace('_', ' ').title()}")
                print(f"  LLM: {strongest['llm']}")
                print(f"  Correlation: {strongest['value']:.3f}")
                print(f"  Significance: {strongest['significance']}")
                print(f"  P-value: {strongest['p_value']:.4f}")

        # Energy improvement summary
        if (
            "summary" in correlations
            and "energy_improvement_stats" in correlations["summary"]
        ):
            energy_stats = correlations["summary"]["energy_improvement_stats"]
            print("\nEnergy Improvement Statistics:")
            print(
                f"  Mean CPU Improvement: {energy_stats['mean_cpu_improvement']:.2f}x"
            )
            print(f"  Mean RAM Improvement: {energy_stats['mean_ram_improvement']:.4f}")
            print(
                f"  Mean Time Improvement: {energy_stats['mean_time_improvement']:.2f}x"
            )

        print("=" * 60)


# utility
def _filter_finite_nonconstant(x_list, y_list):
    """Return filtered np.arrays (x, y) con soli valori finiti e almeno 2 valori unici per x e y.
    Se non possibile, ritorna (None, None). Se y è costante, ritorna (x, None) per saltare fit/correlazione.
    """
    try:
        x = np.asarray(x_list, dtype=float)
        y = np.asarray(y_list, dtype=float)
    except Exception:
        return None, None
    mask = np.isfinite(x) & np.isfinite(y)
    x = x[mask]
    y = y[mask]
    if x.size < 2 or y.size < 2:
        return None, None
    if np.allclose(np.nanstd(x), 0.0) or np.unique(x).size < 2:
        return None, None
    if np.allclose(np.nanstd(y), 0.0) or np.unique(y).size < 2:
        return x, None
    return x, y


def main():
    """Funzione principale per l'esecuzione da command line."""
    parser = argparse.ArgumentParser(
        description="Analyze software patterns in LLM-generated code and correlate with energy improvements"
    )
    parser.add_argument(
        "cluster_name", help="Name of the cluster to analyze (e.g., 'bob')"
    )
    parser.add_argument(
        "--prompt-version",
        "-v",
        type=int,
        default=4,
        help="Prompt version to analyze (default: 4)",
    )
    parser.add_argument("--verbose", action="store_true", help="Enable verbose output")

    args = parser.parse_args()

    try:
        # Validate cluster name
        cluster_file = os.path.join(
            utility_paths.CLUSTERS_DIR_FILEPATH, f"cluster_{args.cluster_name}.json"
        )
        if not os.path.exists(cluster_file):
            print(f"Error: Cluster file not found: {cluster_file}")
            print(f"Available clusters in {utility_paths.CLUSTERS_DIR_FILEPATH}:")
            for f in os.listdir(utility_paths.CLUSTERS_DIR_FILEPATH):
                if (
                    f.startswith("cluster_")
                    and f.endswith(".json")
                    and "energy" not in f
                ):
                    cluster_name = f.replace("cluster_", "").replace(".json", "")
                    print(f"  - {cluster_name}")
            return 1

        # Run analysis
        analyzer = PatternEnergyAnalyzer(args.cluster_name, args.prompt_version)
        analyzer.run_full_analysis()

        return 0

    except KeyboardInterrupt:
        print("\nAnalysis interrupted by user")
        return 1
    except Exception as e:
        print(f"Error: {e}")
        if args.verbose:
            import traceback

            traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(main())
 