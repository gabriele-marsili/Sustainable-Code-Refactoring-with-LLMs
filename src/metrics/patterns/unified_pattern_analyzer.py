#!/usr/bin/env python3
"""
Unified Pattern Analyzer - Comprehensive Energy Pattern Analysis System

Integrates:
- Literature-based energy-efficient pattern detection
- Advanced similarity filtering
- Improvement-based cluster selection
- Statistical correlation analysis
- Publication-grade visualizations

"""

import os
import sys
import json
import ast
import logging
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any, Set
from dataclasses import dataclass, field
from collections import Counter, defaultdict
from datetime import datetime

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import pearsonr, spearmanr

# Add project root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths, general_utils

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


# ============================================================================
# CONFIGURATION
# ============================================================================

SIMILARITY_THRESHOLD = 75.0  # Low similarity = significant changes
IMPROVEMENT_THRESHOLD = 15.0  # Minimum improvement to consider
MAX_IMPROVEMENT_CLAMP = 200.0
MIN_IMPROVEMENT_CLAMP = -200.0

METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]


# ============================================================================
# DATA CLASSES
# ============================================================================

@dataclass
class ASTMetrics:
    """AST-based code complexity metrics"""
    node_count: int = 0
    function_count: int = 0
    class_count: int = 0
    depth: int = 0
    cyclomatic: int = 0
    loop_count: int = 0
    condition_count: int = 0


@dataclass
class PatternMatch:
    """Represents a detected pattern"""
    name: str
    category: str  # 'algorithmic', 'syntax', 'memory', 'control_flow', 'concurrency'
    language: str
    energy_impact: str  # 'high', 'medium', 'low'
    present_in_base: bool
    present_in_llm: bool

    @property
    def is_llm_introduced(self) -> bool:
        """Pattern introduced by LLM (not in base)"""
        return self.present_in_llm and not self.present_in_base


@dataclass
class ClusterAnalysis:
    """Analysis results for a single cluster"""
    cluster_name: str
    overall_improvement: float
    avg_similarity: float
    entries_count: int
    improvement_by_metric: Dict[str, float]
    detected_patterns: List[PatternMatch]
    selected_for_analysis: bool = False

    @property
    def llm_introduced_patterns(self) -> List[PatternMatch]:
        return [p for p in self.detected_patterns if p.is_llm_introduced]


@dataclass
class EntryComparison:
    """Comparison between base and LLM code for a single entry"""
    cluster: str
    language: str
    entry_id: str
    llm_type: str
    prompt_version: str

    # Similarity metrics
    similarity_index: Optional[float] = None
    fuzzy_score: Optional[float] = None
    cosine_score: Optional[float] = None

    # Performance improvements
    cpu_improvement: Optional[float] = None
    ram_improvement: Optional[float] = None
    time_improvement: Optional[float] = None
    overall_improvement: Optional[float] = None

    # Code metrics
    base_ast: Optional[ASTMetrics] = None
    llm_ast: Optional[ASTMetrics] = None

    # Patterns
    patterns: List[PatternMatch] = field(default_factory=list)

    # Paths
    base_path: str = ""
    llm_path: str = ""


# ============================================================================
# PATTERN DETECTION ENGINE
# ============================================================================

class EnergyPatternDetector:
    """
    Detects energy-efficient patterns based on literature review.
    Implements patterns from ENERGY_EFFICIENT_PATTERNS_LITERATURE.md
    """

    def __init__(self):
        self.patterns = self._initialize_patterns()

    def _initialize_patterns(self) -> Dict[str, Dict]:
        """Initialize pattern definitions from literature"""
        return {
            # ===== PYTHON PATTERNS =====
            "python_list_comprehension": {
                "regex": r"\[[^\]]+\s+for\s+[^\]]+\s+in\s+[^\]]+\]",
                "category": "syntax",
                "impact": "medium",
                "description": "List comprehension vs manual loop"
            },
            "python_dict_comprehension": {
                "regex": r"\{[^\}]+:\s*[^\}]+\s+for\s+[^\}]+\s+in\s+[^\}]+\}",
                "category": "syntax",
                "impact": "medium",
                "description": "Dict comprehension"
            },
            "python_generator_expression": {
                "regex": r"\([^\)]+\s+for\s+[^\)]+\s+in\s+[^\)]+\)",
                "category": "memory",
                "impact": "high",
                "description": "Generator for lazy evaluation"
            },
            "python_f_string": {
                "regex": r"f['\"][^'\"]*\{[^}]+\}[^'\"]*['\"]",
                "category": "syntax",
                "impact": "low",
                "description": "f-string formatting"
            },
            "python_builtin_sum": {
                "regex": r"\bsum\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Built-in sum() function"
            },
            "python_builtin_min_max": {
                "regex": r"\b(min|max)\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Built-in min/max"
            },
            "python_enumerate": {
                "regex": r"\benumerate\s*\(",
                "category": "syntax",
                "impact": "low",
                "description": "enumerate() vs manual indexing"
            },
            "python_zip": {
                "regex": r"\bzip\s*\(",
                "category": "syntax",
                "impact": "low",
                "description": "zip() for parallel iteration"
            },
            "python_any_all": {
                "regex": r"\b(any|all)\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "any/all for short-circuit evaluation"
            },
            "python_lambda": {
                "regex": r"\blambda\s+[^:]+:",
                "category": "syntax",
                "impact": "low",
                "description": "Lambda expression"
            },
            "python_with_statement": {
                "regex": r"^\s*with\s+",
                "category": "memory",
                "impact": "medium",
                "description": "Context manager (with)"
            },
            "python_lru_cache": {
                "regex": r"@(?:functools\.)?lru_cache|@cache",
                "category": "algorithmic",
                "impact": "high",
                "description": "Memoization with lru_cache"
            },
            "python_map_filter": {
                "regex": r"\b(map|filter|reduce)\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Functional programming"
            },
            "python_numpy_vectorization": {
                "regex": r"import\s+numpy|from\s+numpy|np\.\w+",
                "category": "algorithmic",
                "impact": "high",
                "description": "NumPy vectorization"
            },

            # ===== JAVASCRIPT/TYPESCRIPT PATTERNS =====
            "js_arrow_function": {
                "regex": r"(?:\w+\s*=>|=>\s*\w+|\([^)]*\)\s*=>)",
                "category": "syntax",
                "impact": "low",
                "description": "Arrow function"
            },
            "js_array_map": {
                "regex": r"\.map\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Array.map() method"
            },
            "js_array_filter": {
                "regex": r"\.filter\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Array.filter() method"
            },
            "js_array_reduce": {
                "regex": r"\.reduce\s*\(",
                "category": "algorithmic",
                "impact": "medium",
                "description": "Array.reduce() method"
            },
            "js_template_literals": {
                "regex": r"`[^`]*\$\{[^}]+\}[^`]*`",
                "category": "syntax",
                "impact": "low",
                "description": "Template literals"
            },
            "js_destructuring": {
                "regex": r"(?:const|let|var)\s*(?:\{[^}]+\}|\[[^\]]+\])\s*=",
                "category": "syntax",
                "impact": "low",
                "description": "Destructuring assignment"
            },
            "js_spread_operator": {
                "regex": r"\.\.\.\w+",
                "category": "syntax",
                "impact": "medium",
                "description": "Spread operator"
            },
            "js_async_await": {
                "regex": r"\b(async\s+function|await\s+)",
                "category": "concurrency",
                "impact": "medium",
                "description": "Async/await pattern"
            },
            "js_optional_chaining": {
                "regex": r"\?\.",
                "category": "syntax",
                "impact": "low",
                "description": "Optional chaining"
            },
            "js_nullish_coalescing": {
                "regex": r"\?\?",
                "category": "control_flow",
                "impact": "low",
                "description": "Nullish coalescing"
            },
            "js_for_of": {
                "regex": r"for\s*\(\s*(?:const|let|var)?\s*\w+\s+of\s+",
                "category": "syntax",
                "impact": "low",
                "description": "for-of loop"
            },

            # ===== JAVA PATTERNS =====
            "java_streams": {
                "regex": r"\.stream\s*\(\)|\.map\s*\(|\.filter\s*\(|\.reduce\s*\(|\.collect\s*\(",
                "category": "algorithmic",
                "impact": "high",
                "description": "Java Streams API"
            },
            "java_lambda": {
                "regex": r"->\s*",
                "category": "syntax",
                "impact": "medium",
                "description": "Lambda expression"
            },
            "java_method_reference": {
                "regex": r"::",
                "category": "syntax",
                "impact": "low",
                "description": "Method reference"
            },
            "java_optional": {
                "regex": r"\bOptional\.<|Optional\.of|Optional\.empty",
                "category": "control_flow",
                "impact": "low",
                "description": "Optional pattern"
            },
            "java_stringbuilder": {
                "regex": r"\bStringBuilder\b",
                "category": "memory",
                "impact": "high",
                "description": "StringBuilder for concatenation"
            },
            "java_enhanced_for": {
                "regex": r"for\s*\(\s*\w+\s+\w+\s*:\s*\w+\s*\)",
                "category": "syntax",
                "impact": "low",
                "description": "Enhanced for loop"
            },

            # ===== C/C++ PATTERNS =====
            "cpp_auto_keyword": {
                "regex": r"\bauto\s+\w+\s*=",
                "category": "syntax",
                "impact": "low",
                "description": "Auto keyword"
            },
            "cpp_range_for": {
                "regex": r"for\s*\(\s*(?:const\s+)?(?:auto|[\w:]+)\s*&?\s*\w+\s*:\s*\w+\s*\)",
                "category": "syntax",
                "impact": "low",
                "description": "Range-based for loop"
            },
            "cpp_lambda": {
                "regex": r"\[\s*[^\]]*\]\s*\([^)]*\)\s*(?:->\s*[\w:]+\s*)?\{",
                "category": "syntax",
                "impact": "low",
                "description": "Lambda expression"
            },
            "cpp_smart_pointers": {
                "regex": r"\b(?:std::)?(?:unique_ptr|shared_ptr|weak_ptr)<",
                "category": "memory",
                "impact": "high",
                "description": "Smart pointers"
            },
            "cpp_move_semantics": {
                "regex": r"\bstd::move\s*\(",
                "category": "memory",
                "impact": "high",
                "description": "Move semantics"
            },
            "cpp_constexpr": {
                "regex": r"\bconstexpr\b",
                "category": "algorithmic",
                "impact": "high",
                "description": "Compile-time computation"
            },
            "cpp_const_correctness": {
                "regex": r"\bconst\s+\w+|&\s*const\b",
                "category": "syntax",
                "impact": "low",
                "description": "Const correctness"
            },

            # ===== GO PATTERNS =====
            "go_goroutine": {
                "regex": r"\bgo\s+\w+\s*\(",
                "category": "concurrency",
                "impact": "high",
                "description": "Goroutine"
            },
            "go_channel": {
                "regex": r"\bchan\s+",
                "category": "concurrency",
                "impact": "medium",
                "description": "Channel"
            },
            "go_defer": {
                "regex": r"\bdefer\s+",
                "category": "memory",
                "impact": "low",
                "description": "Defer statement"
            },
            "go_range": {
                "regex": r"for\s+[^{]*\brange\s+",
                "category": "syntax",
                "impact": "low",
                "description": "Range loop"
            },
            "go_make": {
                "regex": r"\bmake\s*\(",
                "category": "memory",
                "impact": "medium",
                "description": "Make allocation"
            },
            "go_short_declaration": {
                "regex": r"\w+\s*:=",
                "category": "syntax",
                "impact": "low",
                "description": "Short variable declaration"
            },

            # ===== GENERIC PATTERNS (cross-language) =====
            "generic_early_return": {
                "regex": r"(?:^|\n)\s*(?:if|when)\s*\([^)]+\)\s*\{?\s*(?:return|break)",
                "category": "control_flow",
                "impact": "medium",
                "description": "Early return pattern"
            },
            "generic_guard_clause": {
                "regex": r"(?:^|\n)\s*(?:if|when)\s*\([^)]+\)\s*\{?\s*(?:return|throw)",
                "category": "control_flow",
                "impact": "medium",
                "description": "Guard clause"
            },
            "generic_memoization": {
                "regex": r"\b(?:memo|cache|cached|memoize|Cache|Memo)\b",
                "category": "algorithmic",
                "impact": "high",
                "description": "Memoization/caching"
            },
            "generic_constant_extraction": {
                "regex": r"(?:const|final|static\s+final|constexpr)\s+\w+\s*=",
                "category": "memory",
                "impact": "low",
                "description": "Constant extraction"
            },
            "generic_null_check": {
                "regex": r"(?:!=|!==)\s*(?:null|None|nil)|(?:null|None|nil)\s*(?:!=|!==)",
                "category": "control_flow",
                "impact": "low",
                "description": "Null/None check"
            },
        }

    def detect_patterns(self, base_code: str, llm_code: str, language: str) -> List[PatternMatch]:
        """
        Detect all patterns comparing base and LLM code.
        Returns only patterns introduced by LLM (not present in base).
        """
        if not base_code or not llm_code:
            return []

        lang_lower = language.lower()
        detected = []

        for pattern_name, pattern_def in self.patterns.items():
            # Check language applicability
            if not self._is_pattern_applicable(pattern_name, lang_lower):
                continue

            regex = pattern_def["regex"]
            present_in_base = bool(re.search(regex, base_code, re.MULTILINE | re.IGNORECASE))
            present_in_llm = bool(re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE))

            # Create pattern match object
            match = PatternMatch(
                name=pattern_name,
                category=pattern_def["category"],
                language=language,
                energy_impact=pattern_def["impact"],
                present_in_base=present_in_base,
                present_in_llm=present_in_llm
            )

            detected.append(match)

        return detected

    def _is_pattern_applicable(self, pattern_name: str, language: str) -> bool:
        """Check if pattern applies to this language"""
        lang = language.lower()

        # Language-specific patterns
        if pattern_name.startswith("python_") and lang != "python":
            return False
        if pattern_name.startswith("js_") and lang not in ("javascript", "js", "typescript", "ts"):
            return False
        if pattern_name.startswith("java_") and lang != "java":
            return False
        if pattern_name.startswith("cpp_") and lang not in ("c", "cpp", "c++"):
            return False
        if pattern_name.startswith("go_") and lang not in ("go", "golang"):
            return False

        # Generic patterns apply to all
        return True

    def detect_ast_patterns_python(self, base_code: str, llm_code: str) -> List[PatternMatch]:
        """Detect Python-specific AST patterns"""
        if not base_code or not llm_code:
            return []

        patterns = []

        try:
            base_tree = ast.parse(base_code)
            llm_tree = ast.parse(llm_code)

            # Check for specific AST constructs
            ast_checks = {
                "python_ast_with": (ast.With, "Context manager with statement"),
                "python_ast_try": (ast.Try, "Try-except error handling"),
                "python_ast_async": (ast.AsyncFunctionDef, "Async function"),
                "python_ast_comprehension": ((ast.ListComp, ast.DictComp, ast.SetComp, ast.GeneratorExp), "Comprehension"),
                "python_ast_decorator": (ast.FunctionDef, "Decorator usage"),  # Check decorators
            }

            for pattern_name, (node_types, description) in ast_checks.items():
                base_has = any(isinstance(n, node_types) for n in ast.walk(base_tree))
                llm_has = any(isinstance(n, node_types) for n in ast.walk(llm_tree))

                patterns.append(PatternMatch(
                    name=pattern_name,
                    category="syntax",
                    language="python",
                    energy_impact="medium",
                    present_in_base=base_has,
                    present_in_llm=llm_has
                ))

        except SyntaxError:
            pass  # Invalid Python code

        return patterns


# ============================================================================
# AST ANALYZER
# ============================================================================

class ASTAnalyzer:
    """Analyzes code structure using AST (Python) or heuristics (other languages)"""

    def analyze(self, code: str, language: str) -> Optional[ASTMetrics]:
        """Analyze code and return metrics"""
        if not code:
            return None

        lang = language.lower()

        if lang == "python":
            return self._analyze_python(code)
        else:
            return self._analyze_heuristic(code, lang)

    def _analyze_python(self, code: str) -> Optional[ASTMetrics]:
        """Full AST analysis for Python"""
        try:
            tree = ast.parse(code)
        except SyntaxError:
            return None

        metrics = ASTMetrics()

        def max_depth(node: ast.AST, current: int = 0) -> int:
            children = list(ast.iter_child_nodes(node))
            if not children:
                return current
            return max(max_depth(child, current + 1) for child in children)

        for node in ast.walk(tree):
            metrics.node_count += 1

            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                metrics.function_count += 1
                metrics.cyclomatic += 1
            elif isinstance(node, ast.ClassDef):
                metrics.class_count += 1
            elif isinstance(node, (ast.For, ast.While, ast.AsyncFor)):
                metrics.loop_count += 1
                metrics.cyclomatic += 1
            elif isinstance(node, (ast.If, ast.IfExp)):
                metrics.condition_count += 1
                metrics.cyclomatic += 1
            elif isinstance(node, (ast.Try, ast.With, ast.BoolOp)):
                metrics.cyclomatic += 1

        metrics.depth = max_depth(tree)

        return metrics

    def _analyze_heuristic(self, code: str, language: str) -> Optional[ASTMetrics]:
        """Heuristic analysis for non-Python languages"""
        metrics = ASTMetrics()

        # Count based on regex patterns
        patterns = {
            "function": r"\b(?:function|func|def)\s+\w+",
            "class": r"\bclass\s+\w+",
            "if": r"\bif\s*\(",
            "for": r"\bfor\s*\(",
            "while": r"\bwhile\s*\(",
        }

        for construct, pattern in patterns.items():
            count = len(re.findall(pattern, code, re.MULTILINE))

            if construct == "function":
                metrics.function_count = count
                metrics.cyclomatic += count
            elif construct == "class":
                metrics.class_count = count
            elif construct in ("for", "while"):
                metrics.loop_count += count
                metrics.cyclomatic += count
            elif construct == "if":
                metrics.condition_count = count
                metrics.cyclomatic += count

        # Estimate depth by brace nesting
        depth = 0
        max_depth = 0
        for char in code:
            if char == "{":
                depth += 1
                max_depth = max(max_depth, depth)
            elif char == "}":
                depth = max(0, depth - 1)

        metrics.depth = max_depth
        metrics.node_count = len([line for line in code.split("\n") if line.strip()])

        return metrics


# ============================================================================
# MAIN UNIFIED ANALYZER
# ============================================================================

class UnifiedPatternAnalyzer:
    """
    Unified system integrating:
    - Cluster selection based on similarity + improvement
    - Energy pattern detection from literature
    - Statistical correlation analysis
    - Advanced visualizations
    """

    def __init__(self,
                 similarity_threshold: float = SIMILARITY_THRESHOLD,
                 improvement_threshold: float = IMPROVEMENT_THRESHOLD):

        self.similarity_threshold = similarity_threshold
        self.improvement_threshold = improvement_threshold

        # Directories
        self.clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR
        self.improvements_dir = utility_paths.SRC_DIR / "out_improvements_metadata"

        # Output directory
        self.report_dir = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "unified_analysis"
        self.report_dir.mkdir(parents=True, exist_ok=True)

        # Components
        self.pattern_detector = EnergyPatternDetector()
        self.ast_analyzer = ASTAnalyzer()

        logger.info(f"Unified Pattern Analyzer initialized")
        logger.info(f"Similarity threshold: {similarity_threshold}%")
        logger.info(f"Improvement threshold: {improvement_threshold}%")

    def run_complete_analysis(self) -> Dict[str, Any]:
        """Execute complete unified analysis workflow"""

        logger.info("="*70)
        logger.info("UNIFIED PATTERN ANALYSIS - START")
        logger.info("="*70)

        # Step 1: Load improvement data and select clusters
        logger.info("\n[1/6] Loading cluster improvements and applying selection criteria...")
        cluster_analyses = self._select_clusters_for_analysis()
        selected = [c for c in cluster_analyses if c.selected_for_analysis]
        logger.info(f"  Selected {len(selected)}/{len(cluster_analyses)} clusters")

        # Step 2: Analyze patterns in selected clusters
        logger.info("\n[2/6] Detecting energy-efficient patterns in selected clusters...")
        entry_comparisons = self._analyze_selected_clusters(selected)
        logger.info(f"  Analyzed {len(entry_comparisons)} code pairs")

        # Step 3: Aggregate pattern statistics
        logger.info("\n[3/6] Aggregating pattern statistics...")
        pattern_stats = self._compute_pattern_statistics(entry_comparisons)
        logger.info(f"  Detected {pattern_stats['unique_patterns']} unique patterns")
        logger.info(f"  Total pattern occurrences: {pattern_stats['total_occurrences']}")

        # Step 4: Statistical correlation analysis
        logger.info("\n[4/6] Computing pattern-performance correlations...")
        correlations = self._compute_correlations(entry_comparisons, pattern_stats)
        significant = sum(1 for c in correlations if abs(c['correlation']) > 0.3)
        logger.info(f"  Found {significant} patterns with strong correlations (|r| > 0.3)")

        # Step 5: Generate visualizations
        logger.info("\n[5/6] Creating visualizations...")
        self._create_visualizations(cluster_analyses, entry_comparisons, pattern_stats, correlations)
        logger.info(f"  Saved visualizations to {self.report_dir}")

        # Step 6: Generate comprehensive report
        logger.info("\n[6/6] Generating comprehensive analysis report...")
        self._generate_markdown_report(cluster_analyses, entry_comparisons, pattern_stats, correlations)

        # Export data
        self._export_data(cluster_analyses, entry_comparisons, pattern_stats, correlations)

        logger.info("\n" + "="*70)
        logger.info("UNIFIED PATTERN ANALYSIS - COMPLETE")
        logger.info("="*70)
        logger.info(f"\nResults saved to: {self.report_dir}")

        return {
            "cluster_analyses": cluster_analyses,
            "entry_comparisons": entry_comparisons,
            "pattern_statistics": pattern_stats,
            "correlations": correlations,
            "report_dir": self.report_dir
        }

    def _select_clusters_for_analysis(self) -> List[ClusterAnalysis]:
        """Select clusters based on improvement and similarity criteria"""

        # Load improvement metadata
        improvements_data = {}
        if self.improvements_dir.exists():
            for imp_file in self.improvements_dir.glob("*.json"):
                cluster_name = imp_file.stem
                data = general_utils.read_json(imp_file)
                if data and "improvements_metadata" in data:
                    improvements_data[cluster_name] = data["improvements_metadata"]

        logger.info(f"  Loaded improvement data for {len(improvements_data)} clusters")

        cluster_analyses = []

        for cluster_name, imp_data in improvements_data.items():
            overall_improvement = imp_data.get("overall mean improvement", 0)
            metric_report = imp_data.get("metric cluster report", {})

            # Extract metric improvements
            improvements_by_metric = {}
            for metric in METRICS:
                if metric in metric_report:
                    metric_val = metric_report[metric].get("mean", 0)
                    improvements_by_metric[metric] = metric_val

            # Load cluster file for similarity
            cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"
            if not cluster_file.exists():
                continue

            cluster_data = general_utils.read_json(cluster_file)
            similarities = []
            entries_count = 0

            for lang, entries in cluster_data.items():
                for entry in entries:
                    entries_count += 1
                    for llm in entry.get("LLMs", []):
                        sim = llm.get("similarity_index")
                        if sim is not None:
                            similarities.append(sim)

            avg_similarity = np.mean(similarities) if similarities else 100

            # Selection: significant improvement AND low similarity
            selected = (
                any(improvements_by_metric.get(m, 0) >= self.improvement_threshold for m in METRICS)
                and avg_similarity < self.similarity_threshold
            )

            analysis = ClusterAnalysis(
                cluster_name=cluster_name,
                overall_improvement=overall_improvement,
                avg_similarity=avg_similarity,
                entries_count=entries_count,
                improvement_by_metric=improvements_by_metric,
                detected_patterns=[],  # Will be populated later
                selected_for_analysis=selected
            )

            cluster_analyses.append(analysis)

        return cluster_analyses

    def _analyze_selected_clusters(self, selected_clusters: List[ClusterAnalysis]) -> List[EntryComparison]:
        """Analyze patterns in selected clusters"""

        entry_comparisons = []

        for cluster_analysis in selected_clusters:
            cluster_name = cluster_analysis.cluster_name
            cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"

            if not cluster_file.exists():
                continue

            cluster_data = general_utils.read_json(cluster_file)

            for lang, entries in cluster_data.items():
                for entry in entries:
                    entry_id = entry.get("id", "unknown")

                    # Read base code
                    base_code_path = entry.get("codeSnippetFilePath", "")
                    if entry.get("language") in ("c", "cpp") and entry.get("filename"):
                        base_code_path = f"{base_code_path}/{entry['filename']}"

                    base_code = self._read_code(base_code_path)
                    base_ast = self.ast_analyzer.analyze(base_code or "", lang)

                    for llm in entry.get("LLMs", []):
                        llm_type = llm.get("type", "unknown")
                        llm_path = llm.get("path", "")

                        # Extract prompt version from filename (e.g., ChatGPT4_accumulate_v1.js -> v1)
                        prompt_version = llm.get("promptVersion") or llm.get("prompt_version")
                        if not prompt_version:
                            filename = llm.get("filename", "")
                            # Look for pattern _vN where N is 1-4
                            match = re.search(r'_v(\d+)\.', filename)
                            if match:
                                prompt_version = f"v{match.group(1)}"
                            else:
                                prompt_version = "vNA"

                        llm_code = self._read_code(llm_path)
                        llm_ast = self.ast_analyzer.analyze(llm_code or "", lang)

                        # Detect patterns
                        patterns = self.pattern_detector.detect_patterns(
                            base_code or "", llm_code or "", lang
                        )

                        # Add Python AST patterns
                        if lang.lower() == "python":
                            ast_patterns = self.pattern_detector.detect_ast_patterns_python(
                                base_code or "", llm_code or ""
                            )
                            patterns.extend(ast_patterns)

                        # Create comparison
                        comparison = EntryComparison(
                            cluster=cluster_name,
                            language=lang,
                            entry_id=entry_id,
                            llm_type=llm_type,
                            prompt_version=prompt_version,
                            similarity_index=llm.get("similarity_index"),
                            fuzzy_score=llm.get("fuzzy_score"),
                            cosine_score=llm.get("cosine_similarity_score"),
                            base_ast=base_ast,
                            llm_ast=llm_ast,
                            patterns=patterns,
                            base_path=base_code_path,
                            llm_path=llm_path
                        )

                        entry_comparisons.append(comparison)

                        # Add LLM-introduced patterns to cluster analysis
                        cluster_analysis.detected_patterns.extend(
                            [p for p in patterns if p.is_llm_introduced]
                        )

        return entry_comparisons

    def _read_code(self, path_str: str) -> Optional[str]:
        """Read code file"""
        if not path_str:
            return None

        path = Path(path_str)
        if not path.exists():
            path = self.dataset_dir / path_str
            if not path.exists():
                return None

        try:
            return path.read_text(encoding="utf-8", errors="ignore")
        except Exception as e:
            logger.warning(f"Error reading {path}: {e}")
            return None

    def _compute_pattern_statistics(self, entry_comparisons: List[EntryComparison]) -> Dict[str, Any]:
        """Compute aggregated pattern statistics"""

        pattern_counter = Counter()
        pattern_by_category = defaultdict(int)
        pattern_by_language = defaultdict(lambda: Counter())
        pattern_by_impact = defaultdict(int)

        for comparison in entry_comparisons:
            for pattern in comparison.patterns:
                if pattern.is_llm_introduced:
                    pattern_counter[pattern.name] += 1
                    pattern_by_category[pattern.category] += 1
                    pattern_by_language[comparison.language][pattern.name] += 1
                    pattern_by_impact[pattern.energy_impact] += 1

        return {
            "unique_patterns": len(pattern_counter),
            "total_occurrences": sum(pattern_counter.values()),
            "pattern_frequencies": dict(pattern_counter),
            "by_category": dict(pattern_by_category),
            "by_language": {lang: dict(counts) for lang, counts in pattern_by_language.items()},
            "by_impact": dict(pattern_by_impact)
        }

    def _compute_correlations(self, entry_comparisons: List[EntryComparison],
                             pattern_stats: Dict) -> List[Dict]:
        """Compute pattern-performance correlations"""

        # Load performance data from execution outputs
        perf_data = self._load_performance_data(entry_comparisons)

        if not perf_data:
            logger.warning("  No performance data available for correlation analysis")
            return []

        # Build pattern matrix and improvement vector
        pattern_names = list(pattern_stats["pattern_frequencies"].keys())
        pattern_matrix = []
        improvements = []

        for comp in entry_comparisons:
            perf_key = (comp.cluster, comp.entry_id, comp.llm_type, comp.prompt_version)
            perf = perf_data.get(perf_key)

            if not perf or perf.get('overall_improvement') is None:
                continue

            # Build pattern presence vector
            pattern_vector = []
            for pattern_name in pattern_names:
                has_pattern = any(p.name == pattern_name and p.is_llm_introduced
                                for p in comp.patterns)
                pattern_vector.append(1 if has_pattern else 0)

            pattern_matrix.append(pattern_vector)
            improvements.append(perf['overall_improvement'])

        if len(pattern_matrix) < 10:  # Need minimum samples
            logger.warning(f"  Insufficient data for correlation: {len(pattern_matrix)} samples")
            return []

        # Convert to numpy arrays
        X = np.array(pattern_matrix)
        y = np.array(improvements)

        # Compute correlations for each pattern
        correlations = []

        for i, pattern_name in enumerate(pattern_names):
            pattern_col = X[:, i]

            # Skip if pattern never occurs or always occurs
            if np.sum(pattern_col) < 3 or np.sum(pattern_col) == len(pattern_col):
                continue

            try:
                # Pearson correlation
                corr, p_value = pearsonr(pattern_col, y)

                # Get pattern metadata
                pattern_obj = self.pattern_detector.patterns.get(pattern_name, {})

                correlations.append({
                    "pattern": pattern_name,
                    "frequency": int(np.sum(pattern_col)),
                    "correlation": float(corr),
                    "p_value": float(p_value),
                    "category": pattern_obj.get("category", "unknown"),
                    "impact": pattern_obj.get("impact", "unknown"),
                    "significant": bool(p_value < 0.05)
                })

            except Exception as e:
                logger.warning(f"  Error computing correlation for {pattern_name}: {e}")
                continue

        # Sort by absolute correlation strength
        correlations.sort(key=lambda x: abs(x['correlation']), reverse=True)

        return correlations

    def _load_performance_data(self, entry_comparisons: List[EntryComparison]) -> Dict:
        """Load performance improvement data from execution outputs, aggregating across 5 runs"""

        perf_data = {}
        processed_count = 0
        skipped_no_files = 0
        skipped_no_match = 0

        for comp in entry_comparisons:
            cluster = comp.cluster
            entry_id = comp.entry_id
            llm_type = comp.llm_type
            prompt_v = comp.prompt_version

            # Skip entries without valid prompt version
            if prompt_v == "vNA":
                continue

            # Aggregate metrics across all 5 executions
            try:
                all_cpu_improvements = []
                all_ram_improvements = []
                all_time_improvements = []

                # Load all 5 execution runs
                for run_num in range(1, 6):
                    # Load base execution data
                    base_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{run_num}.json"
                    # Load LLM execution data (format: cluster_results_v{N}_{run}.json)
                    llm_exec_file = utility_paths.OUTPUT_DIR_FILEPATH / f"{cluster}_results_{prompt_v}_{run_num}.json"

                    if not base_exec_file.exists() or not llm_exec_file.exists():
                        continue

                    base_data = general_utils.read_json(base_exec_file)
                    llm_data = general_utils.read_json(llm_exec_file)

                    if not base_data or not llm_data:
                        continue

                    # Find the specific entry in base data
                    base_metrics = None
                    for lang_key, results in base_data.get("results", {}).items():
                        for result in results:
                            if result.get("id") == entry_id:
                                base_metrics = {
                                    'cpu': result.get("CPU_usage"),
                                    'ram': result.get("RAM_usage"),
                                    'time': result.get("execution_time_ms")
                                }
                                break
                        if base_metrics:
                            break

                    if not base_metrics:
                        continue

                    # Find the specific entry in LLM data
                    # Structure: results[lang] = [{"id": ..., "LLM_results": [{"LLM_type": ..., ...}]}]
                    llm_metrics = None
                    for lang_key, results in llm_data.get("results", {}).items():
                        for result in results:
                            if result.get("id") != entry_id:
                                continue

                            # LLM_results is an array with one element per LLM type
                            llm_results_array = result.get("LLM_results", [])
                            for llm_res in llm_results_array:
                                if llm_res.get("LLM_type") == llm_type:
                                    llm_metrics = {
                                        'cpu': llm_res.get("CPU_usage"),
                                        'ram': llm_res.get("RAM_usage"),
                                        'time': llm_res.get("execution_time_ms")
                                    }
                                    break
                            if llm_metrics:
                                break
                        if llm_metrics:
                            break

                    # Calculate improvements for this run
                    # Formula: (base - llm) / base * 100
                    # Positive = Reduction (LLM uses less resources) = GOOD
                    # Negative = Increase (LLM uses more resources) = BAD
                    if base_metrics and llm_metrics:
                        if base_metrics['cpu'] is not None and llm_metrics['cpu'] is not None and base_metrics['cpu'] > 0:
                            cpu_impr = (base_metrics['cpu'] - llm_metrics['cpu']) / base_metrics['cpu'] * 100
                            all_cpu_improvements.append(cpu_impr)

                        if base_metrics['ram'] is not None and llm_metrics['ram'] is not None and base_metrics['ram'] > 0:
                            ram_impr = (base_metrics['ram'] - llm_metrics['ram']) / base_metrics['ram'] * 100
                            all_ram_improvements.append(ram_impr)

                        if base_metrics['time'] is not None and llm_metrics['time'] is not None and base_metrics['time'] > 0:
                            time_impr = (base_metrics['time'] - llm_metrics['time']) / base_metrics['time'] * 100
                            all_time_improvements.append(time_impr)

                # Calculate mean improvements across all 5 runs
                if all_cpu_improvements or all_ram_improvements or all_time_improvements:
                    cpu_mean = np.mean(all_cpu_improvements) if all_cpu_improvements else None
                    ram_mean = np.mean(all_ram_improvements) if all_ram_improvements else None
                    time_mean = np.mean(all_time_improvements) if all_time_improvements else None

                    # Overall improvement is the mean of available metric improvements
                    valid_improvements = [x for x in [cpu_mean, ram_mean, time_mean] if x is not None]
                    overall = np.mean(valid_improvements) if valid_improvements else None

                    perf_key = (cluster, entry_id, llm_type, prompt_v)
                    perf_data[perf_key] = {
                        'overall_improvement': overall,
                        'cpu_improvement': cpu_mean,
                        'ram_improvement': ram_mean,
                        'time_improvement': time_mean,
                        'num_runs': max(len(all_cpu_improvements), len(all_ram_improvements), len(all_time_improvements))
                    }
                    processed_count += 1
                else:
                    skipped_no_match += 1

            except Exception as e:
                logger.debug(f"  Error loading performance for {cluster}/{entry_id}/{llm_type}/{prompt_v}: {e}")
                continue

        logger.info(f"  Loaded performance data for {len(perf_data)} entries")
        logger.info(f"  Processed: {processed_count}, Skipped (no files): {skipped_no_files}, Skipped (no match): {skipped_no_match}")
        return perf_data

    def _create_visualizations(self, cluster_analyses, entry_comparisons,
                              pattern_stats, correlations):
        """Create all visualizations"""

        from pattern_visualizator import PatternVisualizer

        visualizer = PatternVisualizer(self.report_dir)
        visualizer.create_all_visualizations(
            cluster_analyses,
            entry_comparisons,
            pattern_stats,
            correlations
        )

    def _generate_markdown_report(self, cluster_analyses, entry_comparisons,
                                  pattern_stats, correlations):
        """Generate comprehensive Markdown report"""

        selected = [c for c in cluster_analyses if c.selected_for_analysis]

        lines = [
            "# Unified Pattern Analysis Report",
            "",
            f"**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "",
            "## Executive Summary",
            "",
            f"- **Total Clusters Analyzed**: {len(cluster_analyses)}",
            f"- **Clusters Selected**: {len(selected)} ({len(selected)/len(cluster_analyses)*100:.1f}%)",
            f"- **Selection Criteria**:",
            f"  - Similarity < {self.similarity_threshold}%",
            f"  - Improvement ≥ {self.improvement_threshold}%",
            f"- **Code Pairs Analyzed**: {len(entry_comparisons)}",
            f"- **Unique Patterns Detected**: {pattern_stats['unique_patterns']}",
            f"- **Total Pattern Occurrences**: {pattern_stats['total_occurrences']}",
            "",
            "## Methodology",
            "",
            "### Pattern Detection",
            "Energy-efficient patterns detected based on scientific literature:",
            "- Pereira et al. (2017): Energy Efficiency across Programming Languages",
            "- Pinto & Castor (2017): Energy-Aware Software Engineering",
            "- Hindle (2012): Green Mining and Power Consumption",
            "",
            "### Pattern Categories",
            "1. **Algorithmic**: Complexity reduction, memoization, vectorization",
            "2. **Syntax**: Modern language features (comprehensions, lambdas, etc.)",
            "3. **Memory**: Smart pointers, object pooling, pre-allocation",
            "4. **Control Flow**: Early returns, guard clauses",
            "5. **Concurrency**: Async/await, goroutines, parallel streams",
            "",
            "## Selected Clusters",
            "",
            "| Cluster | Improvement (%) | Similarity (%) | Entries | Top Patterns |",
            "|---------|-----------------|----------------|---------|--------------|"
        ]

        for cluster in sorted(selected, key=lambda c: c.overall_improvement, reverse=True)[:20]:
            top_patterns = Counter([p.name for p in cluster.llm_introduced_patterns]).most_common(3)
            pattern_names = ", ".join([p[0].split('_')[-1] for p in top_patterns]) if top_patterns else "None"

            lines.append(
                f"| {cluster.cluster_name} | {cluster.overall_improvement:.1f} | "
                f"{cluster.avg_similarity:.1f} | {cluster.entries_count} | {pattern_names} |"
            )

        lines.extend([
            "",
            "## Pattern Statistics",
            "",
            "### Top 15 Most Frequent Patterns",
            "",
            "| Rank | Pattern | Frequency | Category | Energy Impact |",
            "|------|---------|-----------|----------|---------------|"
        ])

        sorted_patterns = sorted(
            pattern_stats['pattern_frequencies'].items(),
            key=lambda x: x[1],
            reverse=True
        )[:15]

        for rank, (pattern, freq) in enumerate(sorted_patterns, 1):
            pattern_def = self.pattern_detector.patterns.get(pattern, {})
            category = pattern_def.get('category', 'unknown')
            impact = pattern_def.get('impact', 'unknown')

            lines.append(
                f"| {rank} | {pattern} | {freq} | {category} | {impact} |"
            )

        lines.extend([
            "",
            "### Distribution by Category",
            ""
        ])

        for category, count in sorted(pattern_stats['by_category'].items(), key=lambda x: x[1], reverse=True):
            lines.append(f"- **{category.capitalize()}**: {count} occurrences")

        lines.extend([
            "",
            "### Distribution by Energy Impact",
            ""
        ])

        for impact in ['high', 'medium', 'low']:
            count = pattern_stats['by_impact'].get(impact, 0)
            total = sum(pattern_stats['by_impact'].values())
            pct = (count / total * 100) if total > 0 else 0
            lines.append(f"- **{impact.capitalize()} Impact**: {count} ({pct:.1f}%)")

        lines.extend([
            "",
            "## Statistical Correlation Analysis",
            ""
        ])

        if correlations:
            significant_corr = [c for c in correlations if c['significant']]
            positive_corr = [c for c in correlations if c['correlation'] > 0.2]
            negative_corr = [c for c in correlations if c['correlation'] < -0.2]

            lines.extend([
                f"- **Total Patterns Analyzed**: {len(correlations)}",
                f"- **Statistically Significant** (p < 0.05): {len(significant_corr)}",
                f"- **Positive Correlations** (r > 0.2): {len(positive_corr)}",
                f"- **Negative Correlations** (r < -0.2): {len(negative_corr)}",
                "",
                "### Top Positive Correlations",
                "(Patterns associated with performance improvement)",
                "",
                "| Pattern | Correlation | p-value | Frequency | Impact |",
                "|---------|-------------|---------|-----------|--------|"
            ])

            for corr in positive_corr[:10]:
                sig_mark = "***" if corr['p_value'] < 0.001 else "**" if corr['p_value'] < 0.01 else "*"
                lines.append(
                    f"| {corr['pattern']} | {corr['correlation']:.3f}{sig_mark} | "
                    f"{corr['p_value']:.4f} | {corr['frequency']} | {corr['impact']} |"
                )

            if negative_corr:
                lines.extend([
                    "",
                    "### Top Negative Correlations",
                    "(Patterns associated with performance degradation)",
                    "",
                    "| Pattern | Correlation | p-value | Frequency | Impact |",
                    "|---------|-------------|---------|-----------|--------|"
                ])

                for corr in negative_corr[:5]:
                    sig_mark = "***" if corr['p_value'] < 0.001 else "**" if corr['p_value'] < 0.01 else "*"
                    lines.append(
                        f"| {corr['pattern']} | {corr['correlation']:.3f}{sig_mark} | "
                        f"{corr['p_value']:.4f} | {corr['frequency']} | {corr['impact']} |"
                    )

        lines.extend([
            "",
            "## Key Findings",
            "",
            "### High-Impact Patterns (>30% energy reduction)",
            ""
        ])

        high_impact_patterns = {k: v for k, v in pattern_stats['pattern_frequencies'].items()
                               if self.pattern_detector.patterns.get(k, {}).get('impact') == 'high'}

        if high_impact_patterns:
            for pattern, freq in sorted(high_impact_patterns.items(), key=lambda x: x[1], reverse=True)[:5]:
                pattern_def = self.pattern_detector.patterns.get(pattern, {})
                lines.append(f"- **{pattern}**: {freq} occurrences - {pattern_def.get('description', '')}")
        else:
            lines.append("No high-impact patterns detected in this analysis.")

        lines.extend([
            "",
            "## Recommendations",
            "",
            "### For Code Optimization",
            ""
        ])

        if correlations and positive_corr:
            top_3 = positive_corr[:3]
            for i, corr in enumerate(top_3, 1):
                pattern_def = self.pattern_detector.patterns.get(corr['pattern'], {})
                lines.append(
                    f"{i}. **Prioritize {corr['pattern']}**: Shows {corr['correlation']:.1%} "
                    f"correlation with performance improvement. "
                    f"({pattern_def.get('description', 'No description')})"
                )

        lines.extend([
            "",
            "### For LLM Training/Prompting",
            f"- Focus on clusters with similarity < {self.similarity_threshold}% and improvement > {self.improvement_threshold}%",
            "- Encourage high-impact algorithmic patterns (memoization, vectorization, complexity reduction)",
            "- Promote modern language-specific idioms that show consistent positive correlations",
            "",
            "## Visualizations Generated",
            "- `cluster_selection_analysis.png`: Cluster selection criteria visualization",
            "- `pattern_frequencies.png`: Top 20 pattern frequency distribution",
            "- `pattern_categories.png`: Pattern distribution by category",
            "- `patterns_by_language.png`: Language-specific pattern heatmap",
            "- `energy_impact_distribution.png`: Distribution by energy impact level",
            "- `ast_complexity_analysis.png`: AST metric changes analysis",
            "",
            "## Data Files",
            "- `pattern_statistics.json`: Complete pattern statistics",
            "- `correlations.json`: Pattern-performance correlations",
            "- `selected_clusters.json`: Details of selected clusters",
            "- `entry_comparisons.csv`: Full comparison data",
            "",
            "---",
            f"*Report generated by Unified Pattern Analyzer v1.0*",
            f"*{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*"
        ])

        report_path = self.report_dir / "ANALYSIS_REPORT.md"
        report_path.write_text("\n".join(lines), encoding="utf-8")
        logger.info(f"  Report saved to {report_path}")

    def _export_data(self, cluster_analyses, entry_comparisons,
                    pattern_stats, correlations):
        """Export all data to JSON/CSV"""

        # Export pattern statistics
        with open(self.report_dir / "pattern_statistics.json", "w", encoding="utf-8") as f:
            json.dump(pattern_stats, f, indent=2, ensure_ascii=False)

        # Export correlations
        with open(self.report_dir / "correlations.json", "w", encoding="utf-8") as f:
            json.dump(correlations, f, indent=2, ensure_ascii=False)

        # Export selected clusters
        selected_clusters_data = []
        for cluster in cluster_analyses:
            if cluster.selected_for_analysis:
                selected_clusters_data.append({
                    "cluster_name": cluster.cluster_name,
                    "overall_improvement": cluster.overall_improvement,
                    "avg_similarity": cluster.avg_similarity,
                    "entries_count": cluster.entries_count,
                    "improvement_by_metric": cluster.improvement_by_metric,
                    "pattern_count": len(cluster.llm_introduced_patterns),
                    "top_patterns": [p.name for p in cluster.llm_introduced_patterns[:10]]
                })

        with open(self.report_dir / "selected_clusters.json", "w", encoding="utf-8") as f:
            json.dump(selected_clusters_data, f, indent=2, ensure_ascii=False)

        # Export entry comparisons as CSV
        csv_data = []
        for comp in entry_comparisons:
            llm_patterns = [p.name for p in comp.patterns if p.is_llm_introduced]

            csv_data.append({
                "cluster": comp.cluster,
                "language": comp.language,
                "entry_id": comp.entry_id,
                "llm_type": comp.llm_type,
                "prompt_version": comp.prompt_version,
                "similarity_index": comp.similarity_index,
                "fuzzy_score": comp.fuzzy_score,
                "cosine_score": comp.cosine_score,
                "pattern_count": len(llm_patterns),
                "patterns": ";".join(llm_patterns),
                "base_complexity": comp.base_ast.cyclomatic if comp.base_ast else None,
                "llm_complexity": comp.llm_ast.cyclomatic if comp.llm_ast else None,
                "base_depth": comp.base_ast.depth if comp.base_ast else None,
                "llm_depth": comp.llm_ast.depth if comp.llm_ast else None
            })

        df = pd.DataFrame(csv_data)
        df.to_csv(self.report_dir / "entry_comparisons.csv", index=False)

        logger.info(f"  Exported all data files to {self.report_dir}")


# ============================================================================
# MAIN ENTRY POINT
# ============================================================================

def main():
    """Main execution"""
    import argparse

    parser = argparse.ArgumentParser(description="Unified Pattern Analyzer")
    parser.add_argument("--similarity-threshold", type=float, default=SIMILARITY_THRESHOLD)
    parser.add_argument("--improvement-threshold", type=float, default=IMPROVEMENT_THRESHOLD)

    args = parser.parse_args()

    analyzer = UnifiedPatternAnalyzer(
        similarity_threshold=args.similarity_threshold,
        improvement_threshold=args.improvement_threshold
    )

    results = analyzer.run_complete_analysis()

    print(f"\n{'='*70}")
    print("ANALYSIS SUMMARY")
    print(f"{'='*70}")
    print(f"Selected clusters: {sum(1 for c in results['cluster_analyses'] if c.selected_for_analysis)}")
    print(f"Code pairs analyzed: {len(results['entry_comparisons'])}")
    print(f"Unique patterns detected: {results['pattern_statistics']['unique_patterns']}")
    print(f"Total pattern occurrences: {results['pattern_statistics']['total_occurrences']}")
    print(f"\nResults directory: {results['report_dir']}")


if __name__ == "__main__":
    main()
