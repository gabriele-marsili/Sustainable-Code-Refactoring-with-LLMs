#!/usr/bin/env python3
"""
Pattern Analyzer with AST Analysis
- Aggregates performance metrics across executions
- Calculates improvement percentages for LLM-generated code vs original
- Performs subset selection based on similarity and improvement thresholds
- Extracts textual and AST-based patterns introduced by LLMs
- Analyzes correlation between patterns and performance improvements
- Generates comprehensive reports with advanced visualizations
"""

import json
import statistics
import ast
import logging
from pathlib import Path
import sys
import os
import difflib
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
import matplotlib.pyplot as plt

# import seaborn as sns
import pandas as pd
import numpy as np
from scipy import stats

# import networkx as nx
from matplotlib.patches import Rectangle

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402

# ---------- CONFIG ----------
SIMILARITY_THRESHOLD = 65.0  # considerati "diversi" dall'originale se < 65%
IMPROVEMENT_THRESHOLD = (
    10.0  # considerati "migliorati" se overall_improvement >= 10% (base rule)
)
TOP_PERCENTILE = (
    0.75  # in alternativa alla base rule: presi i top 25% per overall_improvement
)

WEIGHTS = {"TIME": 0.5, "CPU": 0.30, "RAM": 0.20}  # pesi per indice di miglioramento
REPORTS_DIR = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "report"
DIFFS_DIR = REPORTS_DIR / "diffs"
JSON_OUT = REPORTS_DIR / "llm_improvement_candidates.json"
AST_PATTERNS_OUT = REPORTS_DIR / "ast_patterns.json"
PLOT_SIM_VS_IMPR = REPORTS_DIR / "similarity_vs_improvement.png"
PATTERN_BAR = REPORTS_DIR / "pattern_counts.png"
PATTERN_CORRELATION = REPORTS_DIR / "pattern_performance_correlation.png"
AST_COMPLEXITY = REPORTS_DIR / "ast_complexity_analysis.png"
IMPROVEMENT_HEATMAP = REPORTS_DIR / "improvement_heatmap.png"
PATTERN_NETWORK = REPORTS_DIR / "pattern_network.png"
# ----------------------------

# Setup directories and logging
REPORTS_DIR.mkdir(parents=True, exist_ok=True)
DIFFS_DIR.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@dataclass
class PerformanceMetrics:
    cpu: Optional[float] = None
    ram: Optional[float] = None
    time: Optional[float] = None
    pass_rate: Optional[float] = None


@dataclass
class ASTMetrics:
    node_count: int = 0
    depth: int = 0
    complexity: int = 0
    function_count: int = 0
    class_count: int = 0
    loop_count: int = 0
    condition_count: int = 0


@dataclass
class PatternAnalysis:
    textual_patterns: List[str]
    ast_patterns: List[str]
    ast_metrics: ASTMetrics
    improvement_score: Optional[float] = None


def read_json(path: Path) -> Dict:
    """Read JSON file with error handling."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading (read json) {path}: {e}")
        return {}


def safe_mean(values: List[Optional[float]]) -> Optional[float]:
    """Calculate mean of values, ignoring None values."""
    vals = [v for v in values if v is not None]
    return statistics.mean(vals) if vals else None


class ASTAnalyzer:
    """Advanced AST analysis for pattern detection."""

    def __init__(self):
        self.language_parsers = {
            "python": self._parse_python,
            "java": self._parse_java_like,
            "javascript": self._parse_javascript_like,
            "js": self._parse_javascript_like,
            "typescript": self._parse_javascript_like,
            "ts": self._parse_javascript_like,
            "go": self._parse_go_like,
            "cpp": self._parse_cpp_like,
            "c": self._parse_cpp_like,
        }

    def analyze_code(self, code: str, language: str) -> ASTMetrics:
        """Analyze code structure using AST when possible."""
        if not code:
            return ASTMetrics()

        parser = self.language_parsers.get(language.lower())
        if parser:
            return parser(code)
        else:
            return self._fallback_analysis(code)

    def _parse_python(self, code: str) -> ASTMetrics:
        """Parse Python code using built-in AST module."""
        try:
            tree = ast.parse(code)
            return self._analyze_python_ast(tree)
        except SyntaxError:
            logger.warning("Python syntax error, falling back to text analysis")
            return self._fallback_analysis(code)

    def _analyze_python_ast(self, tree: ast.AST) -> ASTMetrics:
        """Extract metrics from Python AST."""
        metrics = ASTMetrics()

        class ASTVisitor(ast.NodeVisitor):
            def __init__(self):
                self.depth = 0
                self.max_depth = 0
                self.node_count = 0
                self.complexity = 1  # Start with 1 for basic complexity

            def visit(self, node):
                self.node_count += 1
                self.depth += 1
                self.max_depth = max(self.max_depth, self.depth)

                # Count complexity-adding constructs
                if isinstance(node, (ast.If, ast.For, ast.While, ast.Try, ast.With)):
                    self.complexity += 1
                elif isinstance(node, (ast.BoolOp, ast.Compare)):
                    self.complexity += len(getattr(node, "ops", [])) or 1

                # Count specific constructs
                if isinstance(node, ast.FunctionDef):
                    metrics.function_count += 1
                elif isinstance(node, ast.ClassDef):
                    metrics.class_count += 1
                elif isinstance(node, (ast.For, ast.While)):
                    metrics.loop_count += 1
                elif isinstance(node, ast.If):
                    metrics.condition_count += 1

                self.generic_visit(node)
                self.depth -= 1

        visitor = ASTVisitor()
        visitor.visit(tree)

        metrics.node_count = visitor.node_count
        metrics.depth = visitor.max_depth
        metrics.complexity = visitor.complexity

        return metrics

    def _parse_java_like(self, code: str) -> ASTMetrics:
        """Parse Java-like languages using regex patterns."""
        return self._regex_based_analysis(
            code,
            {
                "function": r"(?:public|private|protected)?\s*(?:static)?\s*\w+\s+\w+\s*\([^)]*\)\s*\{",
                "class": r"(?:public|private)?\s*class\s+\w+",
                "if": r"\bif\s*\(",
                "for": r"\bfor\s*\(",
                "while": r"\bwhile\s*\(",
                "switch": r"\bswitch\s*\(",
            },
        )

    def _parse_javascript_like(self, code: str) -> ASTMetrics:
        """Parse JavaScript/TypeScript using regex patterns."""
        return self._regex_based_analysis(
            code,
            {
                "function": r"function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>|\w+\s*:\s*function",
                "class": r"class\s+\w+",
                "if": r"\bif\s*\(",
                "for": r"\bfor\s*\(",
                "while": r"\bwhile\s*\(",
                "switch": r"\bswitch\s*\(",
            },
        )

    def _parse_go_like(self, code: str) -> ASTMetrics:
        """Parse Go using regex patterns."""
        return self._regex_based_analysis(
            code,
            {
                "function": r"func\s+\w+\s*\([^)]*\)",
                "struct": r"type\s+\w+\s+struct",
                "if": r"\bif\s+",
                "for": r"\bfor\s+",
                "switch": r"\bswitch\s+",
            },
        )

    def _parse_cpp_like(self, code: str) -> ASTMetrics:
        """Parse C/C++ using regex patterns."""
        return self._regex_based_analysis(
            code,
            {
                "function": r"(?:\w+\s+)*\w+\s+\w+\s*\([^)]*\)\s*\{",
                "class": r"class\s+\w+",
                "struct": r"struct\s+\w+",
                "if": r"\bif\s*\(",
                "for": r"\bfor\s*\(",
                "while": r"\bwhile\s*\(",
                "switch": r"\bswitch\s*\(",
            },
        )

    def _regex_based_analysis(self, code: str, patterns: Dict[str, str]) -> ASTMetrics:
        """Perform regex-based analysis for languages without AST support."""
        metrics = ASTMetrics()

        for pattern_type, pattern in patterns.items():
            matches = re.findall(pattern, code, re.MULTILINE | re.IGNORECASE)
            count = len(matches)

            if pattern_type in ["function", "func"]:
                metrics.function_count = count
            elif pattern_type in ["class", "struct"]:
                metrics.class_count = count
            elif pattern_type == "if":
                metrics.condition_count = count
            elif pattern_type in ["for", "while"]:
                metrics.loop_count += count

        # Estimate complexity and other metrics
        metrics.complexity = 1 + metrics.condition_count + metrics.loop_count
        metrics.node_count = len(code.split())  # Rough approximation
        metrics.depth = self._estimate_nesting_depth(code)

        return metrics

    def _estimate_nesting_depth(self, code: str) -> int:
        """Estimate nesting depth by counting braces."""
        depth = 0
        max_depth = 0

        for char in code:
            if char == "{":
                depth += 1
                max_depth = max(max_depth, depth)
            elif char == "}":
                depth = max(0, depth - 1)

        return max_depth

    def _fallback_analysis(self, code: str) -> ASTMetrics:
        """Fallback analysis for unsupported languages."""
        metrics = ASTMetrics()

        # Basic counts using simple heuristics
        lines = code.split("\n")
        metrics.node_count = len([line for line in lines if line.strip()])
        metrics.depth = (
            max(len(line) - len(line.lstrip()) for line in lines if line.strip()) // 4
        )

        # Basic pattern counting
        patterns = ["if", "for", "while", "function", "class", "def", "func"]
        for pattern in patterns:
            count = len(re.findall(rf"\b{pattern}\b", code, re.IGNORECASE))
            if pattern in ["if"]:
                metrics.condition_count += count
            elif pattern in ["for", "while"]:
                metrics.loop_count += count
            elif pattern in ["function", "def", "func"]:
                metrics.function_count += count
            elif pattern in ["class"]:
                metrics.class_count += count

        metrics.complexity = 1 + metrics.condition_count + metrics.loop_count

        return metrics


class PatternAnalyzer:
    """analyzer with AST support and advanced pattern detection."""

    def __init__(self):
        self.cluster_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR
        self.ast_analyzer = ASTAnalyzer()

    def get_cluster_files(self) -> List[Path]:
        """Get cluster files from cluster directory."""
        return [
            p
            for p in self.cluster_dir.glob("*.json")
            if "with_metrics" not in p.name
            and "debug_" not in p.name
            and "bad_entries" not in p.name
        ]

    def get_execution_files_for_cluster(self, cluster_name: str) -> List[Path]:
        """Get execution files for a specific cluster."""
        return list(self.exec_dir.glob(f"{cluster_name}_results*.json"))

    def aggregate_performance(
        self, cluster_name: str
    ) -> Dict[Tuple[str, str, str], PerformanceMetrics]:
        """Aggregate performance metrics across executions."""
        perf_data = defaultdict(lambda: {"CPU": [], "RAM": [], "TIME": [], "PASS": []})
        exec_files = self.get_execution_files_for_cluster(cluster_name)

        if not exec_files:
            return {}

        for ef in exec_files:
            content = read_json(ef)
            if not content:
                continue

            for lang, results in content.get("results", {}).items():
                for res in results:
                    entry_id = res.get("id", "unknown")

                    # Base case (original code)
                    if "LLM_results" not in res:
                        key = (lang, "original", entry_id)
                        rec = perf_data[key]
                        rec["CPU"].append(res.get("CPU_usage"))
                        rec["RAM"].append(res.get("RAM_usage"))
                        rec["TIME"].append(res.get("execution_time_ms"))
                        rec["PASS"].append(1 if res.get("regressionTestPassed") else 0)
                    else:
                        # LLM results
                        for llm_res in res.get("LLM_results", []):
                            llm_type = llm_res.get("LLM_type", "unknown")
                            path_stem = Path(llm_res.get("path", "")).stem
                            key = (lang, llm_type, path_stem)
                            rec = perf_data[key]
                            rec["CPU"].append(llm_res.get("CPU_usage"))
                            rec["RAM"].append(llm_res.get("RAM_usage"))
                            rec["TIME"].append(llm_res.get("execution_time_ms"))
                            rec["PASS"].append(
                                1 if llm_res.get("regressionTestPassed") else 0
                            )

        # Compute averages
        perf_avg = {}
        for key, data in perf_data.items():
            perf_avg[key] = PerformanceMetrics(
                cpu=safe_mean(data["CPU"]),
                ram=safe_mean(data["RAM"]),
                time=safe_mean(data["TIME"]),
                pass_rate=safe_mean(data["PASS"]),
            )

        return perf_avg

    def read_code(self, path_str: str) -> Optional[str]:
        """Read code file with error handling."""
        if not path_str:
            return None

        p = Path(path_str)
        if not p.exists():
            p2 = self.dataset_dir / path_str
            if p2.exists():
                p = p2
            else:
                return None

        try:
            return p.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            logger.warning(f"Error reading (read code) {p}: {e}")
            return None

    def compute_improvement(
        self, base_value: Optional[float], llm_value: Optional[float]
    ) -> Optional[float]:
        """Compute percentage improvement (positive = better)."""
        if base_value is None or llm_value is None or base_value == 0:
            return None

        try:
            return (base_value - llm_value) / base_value * 100.0
        except Exception:
            return None

    def extract_textual_patterns(
        self, language: str, base_code: str, llm_code: str
    ) -> List[str]:
        """Extract textual patterns using regex."""
        patterns = []
        b_code = base_code or ""
        l_code = llm_code or ""

        def has_pattern(pat: str, txt: str) -> bool:
            return bool(re.search(pat, txt, flags=re.MULTILINE | re.IGNORECASE))

        # Language-specific patterns
        if language.lower() in ("python",):
            checks = {
                "list_comprehension": r"\[[^\]]+for\s+[^\]]+\]",
                "dict_comprehension": r"\{[^\}]+for\s+[^\}]+\}",
                "generator_expression": r"\([^\)]+for\s+[^\)]+\)",
                "f_string": r"f['\"]",
                "with_statement": r"^\s*with\s+",
                "lru_cache_decorator": r"@lru_cache|@functools\.lru_cache",
                "builtin_sum": r"\bsum\s*\(",
                "builtin_min_max": r"\b(min|max)\s*\(",
                "functional_programming": r"\b(map|filter|reduce)\s*\(",
                "type_hints": r"->\s*[A-Za-z_]",
                "lambda_expression": r"\blambda\s+",
                "enumerate_usage": r"\benumerate\s*\(",
                "zip_usage": r"\bzip\s*\(",
                "any_all_usage": r"\b(any|all)\s*\(",
            }
        elif language.lower() in ("javascript", "js", "typescript", "ts"):
            checks = {
                "arrow_function": r"=>",
                "array_map": r"\.map\s*\(",
                "array_filter": r"\.filter\s*\(",
                "array_reduce": r"\.reduce\s*\(",
                "for_of_loop": r"for\s*\(\s*(?:const|let|var)?\s*.*\s+of\s+",
                "async_await": r"\b(async|await)\b",
                "const_let": r"\b(const|let)\b",
                "template_literals": r"`[^`]*\$\{[^}]+\}[^`]*`",
                "destructuring": r"(?:const|let|var)\s*\{[^}]+\}\s*=",
                "spread_operator": r"\.\.\.",
                "optional_chaining": r"\?\.",
            }
        elif language.lower() in ("go", "golang"):
            checks = {
                "range_loop": r"\brange\s+",
                "make_allocation": r"\bmake\([^\)]*?\)",
                "goroutine": r"\bgo\s+\w+\(",
                "defer_statement": r"\bdefer\b",
                "channel_usage": r"\bchan\s+",
                "interface_usage": r"\binterface\s*\{",
                "slice_usage": r"\[\]",
            }
        elif language.lower() in ("java", "c", "c++", "cpp"):
            checks = {
                "stream_api": r"\.stream\(\)|\.map\(|\.filter\(|\.reduce\(",
                "enhanced_for": r"for\s*\(\s*[^\;]+\s*:\s*[^\)]+\)",
                "lambda_expression": r"->",
                "optional_usage": r"\bOptional\b",
                "collection_methods": r"\b(forEach|collect|toList)\b",
            }
        else:
            checks = {}

        for key, pattern in checks.items():
            if has_pattern(pattern, l_code) and not has_pattern(pattern, b_code):
                patterns.append(key)

        return patterns

    def extract_ast_patterns(
        self, language: str, base_code: str, llm_code: str
    ) -> Tuple[List[str], ASTMetrics, ASTMetrics]:
        """Extract AST-based patterns and complexity metrics."""
        base_ast = self.ast_analyzer.analyze_code(base_code or "", language)
        llm_ast = self.ast_analyzer.analyze_code(llm_code or "", language)

        patterns = []

        # Compare AST metrics to identify patterns
        if llm_ast.complexity > base_ast.complexity * 1.2:
            patterns.append("increased_complexity")
        elif llm_ast.complexity < base_ast.complexity * 0.8:
            patterns.append("reduced_complexity")

        if llm_ast.function_count > base_ast.function_count:
            patterns.append("function_extraction")

        if llm_ast.depth < base_ast.depth * 0.8:
            patterns.append("reduced_nesting")
        elif llm_ast.depth > base_ast.depth * 1.2:
            patterns.append("increased_nesting")

        if llm_ast.loop_count != base_ast.loop_count:
            if llm_ast.loop_count > base_ast.loop_count:
                patterns.append("loop_addition")
            else:
                patterns.append("loop_optimization")

        return patterns, base_ast, llm_ast

    def create_visualizations(
        self,
        df: pd.DataFrame,
        pattern_counter: Counter,
        ast_patterns: Dict,
        correlation_data: Dict,
    ):
        """Create comprehensive visualizations."""
        plt.style.use("seaborn-v0_8")

        # 1. Similarity vs Improvement scatter plot 
        fig, ax = plt.subplots(figsize=(12, 8))

        # Create scatter plot with different markers for each LLM type
        llm_types = df["llm_type"].unique()
        colors = plt.cm.Set1(np.linspace(0, 1, len(llm_types)))

        for llm_type, color in zip(llm_types, colors):
            llm_data = df[df["llm_type"] == llm_type]
            ax.scatter(
                llm_data["similarity_index"],
                llm_data["overall_improvement"],
                c=[color],
                alpha=0.7,
                s=60,
                label=llm_type,
                edgecolors="black",
                linewidth=0.5,
            )

        # Add threshold lines
        ax.axvline(
            SIMILARITY_THRESHOLD,
            color="red",
            linestyle="--",
            alpha=0.8,
            label=f"Similarity threshold ({SIMILARITY_THRESHOLD}%)",
        )
        ax.axhline(
            IMPROVEMENT_THRESHOLD,
            color="orange",
            linestyle="--",
            alpha=0.8,
            label=f"Improvement threshold ({IMPROVEMENT_THRESHOLD}%)",
        )

        # Highlight selected quadrant
        ax.add_patch(
            Rectangle(
                (0, IMPROVEMENT_THRESHOLD),
                SIMILARITY_THRESHOLD,
                df["overall_improvement"].max() - IMPROVEMENT_THRESHOLD,
                alpha=0.1,
                color="green",
                label="Selected region",
            )
        )

        ax.set_xlabel("Similarity Index (%)", fontsize=12)
        ax.set_ylabel("Overall Improvement (%)", fontsize=12)
        ax.set_title(
            "Code Similarity vs Performance Improvement Analysis",
            fontsize=14,
            fontweight="bold",
        )
        ax.legend(bbox_to_anchor=(1.05, 1), loc="upper left")
        ax.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(PLOT_SIM_VS_IMPR, dpi=300, bbox_inches="tight")
        plt.close()

        # 2. Pattern frequency bar chart 
        if pattern_counter:
            fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))

            # Textual patterns
            textual_patterns = {
                k: v for k, v in pattern_counter.items() if not k.startswith("ast_")
            }
            if textual_patterns:
                pat_df = pd.DataFrame(
                    list(textual_patterns.items())[:15], columns=["pattern", "count"]
                )
                bars1 = ax1.barh(
                    pat_df["pattern"],
                    pat_df["count"],
                    color="skyblue",
                    edgecolor="navy",
                    alpha=0.7,
                )
                ax1.set_title(
                    "Top 15 Textual Patterns Introduced by LLMs",
                    fontsize=12,
                    fontweight="bold",
                )
                ax1.set_xlabel("Frequency")

                # Add value labels on bars
                for bar in bars1:
                    width = bar.get_width()
                    ax1.text(
                        width,
                        bar.get_y() + bar.get_height() / 2,
                        f"{int(width)}",
                        ha="left",
                        va="center",
                        fontweight="bold",
                    )

            # AST patterns
            ast_pattern_counts = Counter()
            for patterns_list in ast_patterns.values():
                ast_pattern_counts.update(patterns_list)

            if ast_pattern_counts:
                ast_df = pd.DataFrame(
                    list(ast_pattern_counts.items())[:15], columns=["pattern", "count"]
                )
                bars2 = ax2.barh(
                    ast_df["pattern"],
                    ast_df["count"],
                    color="lightcoral",
                    edgecolor="darkred",
                    alpha=0.7,
                )
                ax2.set_title(
                    "Top 15 AST-Based Patterns Introduced by LLMs",
                    fontsize=12,
                    fontweight="bold",
                )
                ax2.set_xlabel("Frequency")

                # Add value labels on bars
                for bar in bars2:
                    width = bar.get_width()
                    ax2.text(
                        width,
                        bar.get_y() + bar.get_height() / 2,
                        f"{int(width)}",
                        ha="left",
                        va="center",
                        fontweight="bold",
                    )

            plt.tight_layout()
            plt.savefig(PATTERN_BAR, dpi=300, bbox_inches="tight")
            plt.close()

        # 3. Pattern-Performance Correlation Analysis
        if correlation_data:
            self._create_correlation_heatmap(correlation_data)

        # 4. AST Complexity Analysis
        self._create_ast_complexity_analysis(df)

        # 5. Improvement Distribution Heatmap
        self._create_improvement_heatmap(df)

    def _create_correlation_heatmap(self, correlation_data: Dict):
        """Create correlation heatmap between patterns and improvements."""
        if not correlation_data:
            return

        # Convert correlation data to matrix
        patterns = list(correlation_data.keys())
        metrics = [
            "time_improvement",
            "cpu_improvement",
            "ram_improvement",
            "overall_improvement",
        ]

        corr_matrix = np.zeros((len(patterns), len(metrics)))
        for i, pattern in enumerate(patterns):
            for j, metric in enumerate(metrics):
                corr_matrix[i, j] = correlation_data[pattern].get(metric, 0)

        fig, ax = plt.subplots(figsize=(10, max(8, len(patterns) * 0.4)))

        im = ax.imshow(corr_matrix, cmap="RdYlBu_r", aspect="auto", vmin=-1, vmax=1)

        # Set ticks and labels
        ax.set_xticks(range(len(metrics)))
        ax.set_yticks(range(len(patterns)))
        ax.set_xticklabels([m.replace("_", " ").title() for m in metrics])
        ax.set_yticklabels(patterns)

        # Add correlation values as text
        for i in range(len(patterns)):
            for j in range(len(metrics)):
                _text = ax.text(
                    j,
                    i,
                    f"{corr_matrix[i, j]:.2f}",
                    ha="center",
                    va="center",
                    color="black",
                    fontweight="bold",
                )

        ax.set_title(
            "Pattern-Performance Correlation Analysis", fontsize=14, fontweight="bold"
        )

        # Add colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label("Correlation Coefficient", rotation=270, labelpad=15)

        plt.tight_layout()
        plt.savefig(PATTERN_CORRELATION, dpi=300, bbox_inches="tight")
        plt.close()

    def _create_ast_complexity_analysis(self, df: pd.DataFrame):
        """Create AST complexity analysis visualization."""
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 12))

        # Filter data with valid AST metrics
        ast_data = df.dropna(
            subset=["base_complexity", "llm_complexity", "overall_improvement"]
        )

        if len(ast_data) > 0:
            # Complexity change vs improvement
            complexity_change = ast_data["llm_complexity"] - ast_data["base_complexity"]
            ax1.scatter(
                complexity_change, ast_data["overall_improvement"], alpha=0.6, s=50
            )
            ax1.set_xlabel("Complexity Change")
            ax1.set_ylabel("Overall Improvement (%)")
            ax1.set_title("Complexity Change vs Performance Improvement")
            ax1.grid(True, alpha=0.3)

            # Add trend line
            if len(complexity_change) > 1:
                z = np.polyfit(complexity_change, ast_data["overall_improvement"], 1)
                p = np.poly1d(z)
                ax1.plot(
                    sorted(complexity_change),
                    p(sorted(complexity_change)),
                    "r--",
                    alpha=0.8,
                )

            # Function count analysis
            func_change = (
                ast_data["llm_function_count"] - ast_data["base_function_count"]
            )
            ax2.scatter(
                func_change,
                ast_data["overall_improvement"],
                alpha=0.6,
                s=50,
                color="orange",
            )
            ax2.set_xlabel("Function Count Change")
            ax2.set_ylabel("Overall Improvement (%)")
            ax2.set_title("Function Count Change vs Performance Improvement")
            ax2.grid(True, alpha=0.3)

            # Depth analysis
            depth_change = ast_data["llm_depth"] - ast_data["base_depth"]
            ax3.scatter(
                depth_change,
                ast_data["overall_improvement"],
                alpha=0.6,
                s=50,
                color="green",
            )
            ax3.set_xlabel("Nesting Depth Change")
            ax3.set_ylabel("Overall Improvement (%)")
            ax3.set_title("Nesting Depth Change vs Performance Improvement")
            ax3.grid(True, alpha=0.3)

            # Overall AST metrics distribution
            ast_metrics = [
                "base_complexity",
                "llm_complexity",
                "base_function_count",
                "llm_function_count",
            ]
            valid_metrics = [col for col in ast_metrics if col in ast_data.columns]

            if valid_metrics:
                ast_data[valid_metrics].boxplot(ax=ax4)
                ax4.set_title("AST Metrics Distribution")
                ax4.set_ylabel("Count/Score")
                ax4.tick_params(axis="x", rotation=45)

        plt.tight_layout()
        plt.savefig(AST_COMPLEXITY, dpi=300, bbox_inches="tight")
        plt.close()

    def _create_improvement_heatmap(self, df: pd.DataFrame):
        """Create heatmap showing improvement distribution across languages and LLM types."""
        # Pivot data for heatmap
        pivot_data = df.pivot_table(
            values="overall_improvement",
            index="language",
            columns="llm_type",
            aggfunc="mean",
        )

        if not pivot_data.empty:
            fig, ax = plt.subplots(figsize=(10, 6))

            im = ax.imshow(pivot_data.values, cmap="RdYlGn", aspect="auto")

            # Set ticks and labels
            ax.set_xticks(range(len(pivot_data.columns)))
            ax.set_yticks(range(len(pivot_data.index)))
            ax.set_xticklabels(pivot_data.columns)
            ax.set_yticklabels(pivot_data.index)

            # Add values as text
            for i in range(len(pivot_data.index)):
                for j in range(len(pivot_data.columns)):
                    value = pivot_data.iloc[i, j]
                    if not pd.isna(value):
                        _text = ax.text(
                            j,
                            i,
                            f"{value:.1f}%",
                            ha="center",
                            va="center",
                            color="white"
                            if abs(value) > pivot_data.values.std()
                            else "black",
                            fontweight="bold",
                        )

            ax.set_title(
                "Average Performance Improvement by Language and LLM Type",
                fontsize=14,
                fontweight="bold",
            )

            # Add colorbar
            cbar = plt.colorbar(im, ax=ax)
            cbar.set_label("Average Improvement (%)", rotation=270, labelpad=15)

            plt.tight_layout()
            plt.savefig(IMPROVEMENT_HEATMAP, dpi=300, bbox_inches="tight")
            plt.close()

    def analyze_pattern_correlations(self, df: pd.DataFrame) -> Dict:
        """Analyze correlations between patterns and performance improvements."""
        correlation_data = {}

        # Get all pattern columns
        pattern_columns = [col for col in df.columns if col.startswith("pattern_")]
        improvement_columns = [
            "impr_time_pct",
            "impr_cpu_pct",
            "impr_ram_pct",
            "overall_improvement",
        ]

        for pattern_col in pattern_columns:
            pattern_name = pattern_col.replace("pattern_", "")
            correlation_data[pattern_name] = {}

            for imp_col in improvement_columns:
                # Calculate correlation
                pattern_data = df[pattern_col].astype(int)  # Convert boolean to int
                improvement_data = df[imp_col].dropna()

                if len(pattern_data) > 1 and len(improvement_data) > 1:
                    # Align the data
                    common_indices = pattern_data.index.intersection(
                        improvement_data.index
                    )
                    if len(common_indices) > 1:
                        corr, p_value = stats.pearsonr(
                            pattern_data.loc[common_indices],
                            improvement_data.loc[common_indices],
                        )
                        correlation_data[pattern_name][
                            imp_col.replace("impr_", "").replace("_pct", "_improvement")
                        ] = corr

        return correlation_data

    def generate_comprehensive_report(
        self,
        df: pd.DataFrame,
        selected_df: pd.DataFrame,
        pattern_summary: Counter,
        ast_patterns: Dict,
    ) -> Dict:
        """Generate comprehensive analysis report."""
        total_entries = len(df)
        selected_count = len(selected_df)

        # Statistical analysis
        improvement_stats = {
            "mean": df["overall_improvement"].mean()
            if not df["overall_improvement"].isna().all()
            else None,
            "median": df["overall_improvement"].median()
            if not df["overall_improvement"].isna().all()
            else None,
            "std": df["overall_improvement"].std()
            if not df["overall_improvement"].isna().all()
            else None,
            "min": df["overall_improvement"].min()
            if not df["overall_improvement"].isna().all()
            else None,
            "max": df["overall_improvement"].max()
            if not df["overall_improvement"].isna().all()
            else None,
        }

        similarity_stats = {
            "mean": df["similarity_index"].mean()
            if not df["similarity_index"].isna().all()
            else None,
            "median": df["similarity_index"].median()
            if not df["similarity_index"].isna().all()
            else None,
            "std": df["similarity_index"].std()
            if not df["similarity_index"].isna().all()
            else None,
        }

        # LLM type analysis
        llm_analysis = {}
        for llm_type in df["llm_type"].unique():
            llm_data = df[df["llm_type"] == llm_type]
            llm_analysis[llm_type] = {
                "count": len(llm_data),
                "avg_improvement": llm_data["overall_improvement"].mean()
                if not llm_data["overall_improvement"].isna().all()
                else None,
                "avg_similarity": llm_data["similarity_index"].mean()
                if not llm_data["similarity_index"].isna().all()
                else None,
                "selected_count": len(selected_df[selected_df["llm_type"] == llm_type]),
            }

        # Language analysis
        language_analysis = {}
        for language in df["language"].unique():
            lang_data = df[df["language"] == language]
            language_analysis[language] = {
                "count": len(lang_data),
                "avg_improvement": lang_data["overall_improvement"].mean()
                if not lang_data["overall_improvement"].isna().all()
                else None,
                "avg_similarity": lang_data["similarity_index"].mean()
                if not lang_data["similarity_index"].isna().all()
                else None,
            }

        # Pattern effectiveness analysis
        pattern_effectiveness = {}
        for pattern, count in pattern_summary.most_common(20):
            # Find entries with this pattern
            pattern_entries = selected_df[
                selected_df["textual_patterns"].apply(
                    lambda x: pattern in x if isinstance(x, list) else False
                )
            ]

            if len(pattern_entries) > 0:
                pattern_effectiveness[pattern] = {
                    "frequency": count,
                    "avg_improvement": pattern_entries["overall_improvement"].mean(),
                    "median_improvement": pattern_entries[
                        "overall_improvement"
                    ].median(),
                    "affected_languages": pattern_entries["language"].unique().tolist(),
                }

        report = {
            "analysis_summary": {
                "total_entries": total_entries,
                "selected_candidates": selected_count,
                "selection_rate": selected_count / total_entries * 100
                if total_entries > 0
                else 0,
                "similarity_threshold": SIMILARITY_THRESHOLD,
                "improvement_threshold": IMPROVEMENT_THRESHOLD,
            },
            "performance_statistics": {
                "improvement": improvement_stats,
                "similarity": similarity_stats,
            },
            "llm_analysis": llm_analysis,
            "language_analysis": language_analysis,
            "pattern_analysis": {
                "textual_patterns": dict(pattern_summary.most_common(20)),
                "pattern_effectiveness": pattern_effectiveness,
                "total_unique_patterns": len(pattern_summary),
            },
            "ast_analysis": {
                "entries_with_ast_data": len([k for k, v in ast_patterns.items() if v]),
                "unique_ast_patterns": len(set(sum(ast_patterns.values(), []))),
            },
            "recommendations": self._generate_recommendations(
                selected_df, pattern_effectiveness
            ),
        }

        return report

    def _generate_recommendations(
        self, selected_df: pd.DataFrame, pattern_effectiveness: Dict
    ) -> List[str]:
        """Generate actionable recommendations based on analysis."""
        recommendations = []

        # Top performing patterns
        top_patterns = sorted(
            pattern_effectiveness.items(),
            key=lambda x: x[1]["avg_improvement"],
            reverse=True,
        )[:5]

        if top_patterns:
            recommendations.append(
                f"Focus on implementing these high-impact patterns: {', '.join([p[0] for p in top_patterns])}"
            )

        # LLM type recommendations
        if not selected_df.empty:
            best_llm = (
                selected_df.groupby("llm_type")["overall_improvement"].mean().idxmax()
            )
            recommendations.append(
                f"Consider prioritizing {best_llm} for code optimization tasks"
            )

        # Language-specific insights
        lang_performance = selected_df.groupby("language")["overall_improvement"].mean()
        if not lang_performance.empty:
            best_lang = lang_performance.idxmax()
            recommendations.append(
                f"LLMs show strongest improvements in {best_lang} code"
            )

        # Pattern frequency insights
        if pattern_effectiveness:
            frequent_effective = [
                p
                for p, data in pattern_effectiveness.items()
                if data["frequency"] >= 3 and data["avg_improvement"] > 15
            ]
            if frequent_effective:
                recommendations.append(
                    f"These patterns appear frequently and show consistent improvements: {', '.join(frequent_effective)}"
                )

        return recommendations

    def run(self) -> Tuple[pd.DataFrame, pd.DataFrame, Counter]:
        """Run the complete analysis."""
        logger.info("Starting pattern analysis...")

        all_rows = []
        pattern_counter = Counter()
        ast_patterns = {}

        cluster_files = self.get_cluster_files()
        logger.info(f"Processing {len(cluster_files)} cluster files...")

        for cluster_file in cluster_files:
            cluster_name = cluster_file.stem.replace("cluster_", "").replace(
                ".json", ""
            )
            logger.info(f"Processing cluster: {cluster_name}")

            cluster_json = read_json(cluster_file)
            if not cluster_json:
                continue

            perf_avg = self.aggregate_performance(cluster_name)

            for lang, entries in cluster_json.items():
                for entry in entries:
                    entry_id = entry.get("id", "unknown")
                    base_key = (lang, "original", entry_id)
                    base_perf = perf_avg.get(base_key)

                    if base_perf is None:
                        continue

                    for llm in entry.get("LLMs", []):
                        llm_type = llm.get("type", "unknown")
                        llm_stem = Path(llm.get("path", "")).stem
                        llm_key = (lang, llm_type, llm_stem)
                        llm_perf = perf_avg.get(llm_key)

                        if llm_perf is None:
                            continue

                        # Read code files
                        base_code_file_path = entry.get("codeSnippetFilePath", "")
                        entry_lang = entry['language']
                        if entry_lang == "c" or entry_lang == "cpp" : 
                            base_code_file_path += "/" + entry['filename']

                        if "dataset" not in base_code_file_path :
                            base_code_file_path = str(utility_paths.DATASET_DIR / base_code_file_path)

                        base_code = self.read_code(base_code_file_path)
                        llm_code = self.read_code(llm.get("path", ""))

                        # Extract patterns
                        textual_patterns = self.extract_textual_patterns(
                            lang, base_code, llm_code
                        )
                        ast_pattern_list, base_ast, llm_ast = self.extract_ast_patterns(
                            lang, base_code, llm_code
                        )

                        # Update counters
                        pattern_counter.update(textual_patterns)
                        ast_patterns[f"{cluster_name}_{lang}_{entry_id}_{llm_type}"] = (
                            ast_pattern_list
                        )

                        # Calculate improvements
                        impr_time = self.compute_improvement(
                            base_perf.time, llm_perf.time
                        )
                        impr_cpu = self.compute_improvement(base_perf.cpu, llm_perf.cpu)
                        impr_ram = self.compute_improvement(base_perf.ram, llm_perf.ram)

                        # Calculate overall improvement
                        overall = 0.0
                        wsum = 0.0
                        for name, w in WEIGHTS.items():
                            val = None
                            if name == "TIME":
                                val = impr_time
                            elif name == "CPU":
                                val = impr_cpu
                            elif name == "RAM":
                                val = impr_ram
                            if val is not None:
                                overall += val * w
                                wsum += w
                        overall_improvement = overall / wsum if wsum > 0 else None

                        # Selection criteria
                        sim_index = llm.get("similarity_index")
                        is_candidate = (
                            overall_improvement is not None
                            and sim_index is not None
                            and sim_index < SIMILARITY_THRESHOLD
                            and overall_improvement >= IMPROVEMENT_THRESHOLD
                        )

                        # Create row data
                        row_data = {
                            "cluster": cluster_name,
                            "language": lang,
                            "id": entry_id,
                            "llm_type": llm_type,
                            "similarity_index": sim_index,
                            "fuzzy": llm.get("fuzzy_score"),
                            "cosine": llm.get("cosine_similarity_score"),
                            "impr_time_pct": impr_time,
                            "impr_cpu_pct": impr_cpu,
                            "impr_ram_pct": impr_ram,
                            "overall_improvement": overall_improvement,
                            "base_pass_pct": base_perf.pass_rate * 100
                            if base_perf.pass_rate is not None
                            else None,
                            "llm_pass_pct": llm_perf.pass_rate * 100
                            if llm_perf.pass_rate is not None
                            else None,
                            "llm_path": llm.get("path"),
                            "base_path": base_code_file_path,
                            "is_candidate": is_candidate,
                            "textual_patterns": textual_patterns,
                            "ast_patterns": ast_pattern_list,
                            "base_complexity": base_ast.complexity,
                            "llm_complexity": llm_ast.complexity,
                            "base_function_count": base_ast.function_count,
                            "llm_function_count": llm_ast.function_count,
                            "base_depth": base_ast.depth,
                            "llm_depth": llm_ast.depth,
                        }

                        # Add pattern presence as boolean columns
                        all_patterns = set(textual_patterns + ast_pattern_list)
                        for pattern in all_patterns:
                            row_data[f"pattern_{pattern}"] = True

                        all_rows.append(row_data)

        # Create DataFrame
        df = pd.DataFrame(all_rows)

        if df.empty:
            logger.warning("No data found. Please check your file paths and data.")
            return df, df, Counter()

        # Fill missing pattern columns
        pattern_cols = [col for col in df.columns if col.startswith("pattern_")]
        for col in pattern_cols:
            #df[col] = df[col].fillna(False) # => warning
            df[col] = df[col].fillna(False).infer_objects(copy=False)


        # Top percentile selection
        if not df["overall_improvement"].isna().all():
            cutoff = df["overall_improvement"].dropna().quantile(TOP_PERCENTILE)
            df["is_top_percentile"] = df["overall_improvement"].apply(
                lambda v: True if v is not None and v >= cutoff else False
            )
        else:
            df["is_top_percentile"] = False

        # Final selection
        df["selected"] = df["is_candidate"] | df["is_top_percentile"]
        selected_df = df[df["selected"]].copy()

        logger.info(
            f"Analysis complete. {len(selected_df)} candidates selected from {len(df)} total entries."
        )

        # Generate diffs for selected candidates
        self._generate_diffs(selected_df)

        # Analyze correlations
        correlation_data = self.analyze_pattern_correlations(df)

        # Create visualizations
        self.create_visualizations(df, pattern_counter, ast_patterns, correlation_data)

        # Generate comprehensive report
        report = self.generate_comprehensive_report(
            df, selected_df, pattern_counter, ast_patterns
        )

        # Save results
        self._save_results(df, selected_df, report, ast_patterns)

        return df, selected_df, pattern_counter

    def _generate_diffs(self, selected_df: pd.DataFrame):
        """Generate diff files for selected candidates."""
        logger.info("Generating diff files...")

        for _, row in selected_df.iterrows():
            try:                
                base_code = self.read_code(row["base_path"]) #base path fixed before creating pd dataframe
                llm_code = self.read_code(row["llm_path"])

                if base_code and llm_code:
                    base_lines = base_code.splitlines(keepends=True)
                    llm_lines = llm_code.splitlines(keepends=True)

                    diff = list(
                        difflib.unified_diff(
                            base_lines,
                            llm_lines,
                            fromfile=f"base/{Path(row['base_path']).name}",
                            tofile=f"llm/{Path(row['llm_path']).name}",
                            lineterm="",
                        )
                    )

                    diff_filename = (
                        DIFFS_DIR
                        / f"{row['cluster']}_{row['language']}_{row['id']}_{row['llm_type']}.diff"
                    )

                    with open(diff_filename, "w", encoding="utf-8") as d_f:
                        for line in diff:
                            d_f.write(line + "\n")
            except Exception as e:
                logger.warning(f"Error generating diff for {row['id']}: {e}\n-> row = {row}")

    def _save_results(
        self,
        df: pd.DataFrame,
        selected_df: pd.DataFrame,
        report: Dict,
        ast_patterns: Dict,
    ):
        """Save all results to JSON files."""
        logger.info("Saving results...")

        # Convert DataFrames to JSON-serializable format
        def df_to_json_safe(dataframe):
            result = dataframe.to_dict("records")
            for record in result:
                for key, value in record.items():
                    # Se è uno scalare, allora controlliamo con pd.isna
                    if isinstance(value, (int, float, str)) or value is None:
                        if pd.isna(value):
                            record[key] = None
                    # Se è un array numpy, convertiamo in lista
                    elif isinstance(value, np.ndarray):
                        record[key] = value.tolist()
                    # Altrimenti lasciamo così (es. liste o dizionari)
            return result


        # Save main results
        main_results = {
            "all_entries": df_to_json_safe(df),
            "selected_candidates": df_to_json_safe(selected_df),
            "analysis_report": report,
        }

        with open(JSON_OUT, "w", encoding="utf-8") as f:
            json.dump(main_results, f, indent=2, ensure_ascii=False)

        # Save AST patterns
        with open(AST_PATTERNS_OUT, "w", encoding="utf-8") as f:
            json.dump(ast_patterns, f, indent=2, ensure_ascii=False)

        # Save summary report
        summary_file = REPORTS_DIR / "analysis_summary.json"
        with open(summary_file, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        logger.info(f"Results saved to {REPORTS_DIR}")


def main():
    """Main execution function."""
    try:
        analyzer = PatternAnalyzer()
        df_all, df_selected, patterns = analyzer.run()

        print(f"\n{'=' * 60}")
        print("PATTERN ANALYSIS COMPLETE")
        print(f"{'=' * 60}")
        print(f"Total entries analyzed: {len(df_all)}")
        print(f"Selected candidates: {len(df_selected)}")
        print(
            f"Selection rate: {len(df_selected) / len(df_all) * 100:.1f}%"
            if len(df_all) > 0
            else "N/A"
        )
        print(f"Unique patterns found: {len(patterns)}")
        print("\nTop 10 patterns:")
        for pattern, count in patterns.most_common(10):
            print(f"  {pattern}: {count}")

        print(f"\nReports generated in: {REPORTS_DIR}")
        print(f"- Main results: {JSON_OUT}")
        print(f"- AST patterns: {AST_PATTERNS_OUT}")
        print(f"- Visualizations: {PLOT_SIM_VS_IMPR}, {PATTERN_BAR}, etc.")

    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        raise


if __name__ == "__main__":
    main()
