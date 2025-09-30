#!/usr/bin/env python3
"""
Pattern Analyzer v4

Features:
- Load cluster JSONs and execution results (base and prompt versions)
- Compute per-entry medians over 5 runs for CPU, RAM, TIME (lower is better)
- Correct improvement formula: (base - llm)/base * 100, guard base==0
- AST metrics (Python): node count, function count, nesting depth, cyclomatic complexity, Halstead
- Heuristic AST-like metrics for other languages (best-effort)
- Pattern detection (syntactic/idiomatic) per language; per-file frequencies
- Selection of interesting subset: high improvement (≥15%), low similarity (<75%)
- Statistics: Pearson/Spearman correlations; simple multivariate regression (numpy OLS)
- Publication-grade charts (PNG/PDF) and CSV exports
- Markdown report explaining methods and patterns
"""

import os
import sys
import json
import ast
import math
import logging
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any, Set
from dataclasses import dataclass
from collections import Counter, defaultdict

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import pearsonr, spearmanr

# Add project root utils
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Configuration constants
SIMILARITY_THRESHOLD_DEFAULT = 75.0
IMPROVEMENT_THRESHOLD_DEFAULT = 15.0
MAX_IMPROVEMENT_CLAMP = 200.0
MIN_IMPROVEMENT_CLAMP = -200.0

METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]


@dataclass
class ASTMetrics:
    node_count: int = 0
    function_count: int = 0
    depth: int = 0
    cyclomatic: int = 0
    halstead_vocab: int = 0
    halstead_length: int = 0
    halstead_volume: float = 0.0


@dataclass
class ClusterAnalysisResult:
    cluster_name: str
    overall_improvement: float
    avg_similarity: float
    entries_count: int
    detected_patterns: List[str]
    improvement_by_metric: Dict[str, float]
    selected_for_analysis: bool = False


@dataclass
class PatternCorrelation:
    pattern_name: str
    correlation_with_improvement: float
    p_value: float
    occurrences: int
    avg_improvement_when_present: float
    avg_improvement_when_absent: float


def _read_json(p: Path) -> Dict:
    try:
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.warning(f"Failed to read {p}: {e}")
        return {}


def _median(values: List[Optional[float]]) -> Optional[float]:
    vals = [v for v in values if v is not None and np.isfinite(v)]
    if not vals:
        return None
    return float(np.median(vals))


def _read_code_file(file_path: str) -> Optional[str]:
    """Read code content from file path."""
    if not file_path:
        return None
    
    path = Path(file_path)
    if not path.exists():
        # Try relative to dataset directory
        dataset_path = utility_paths.DATASET_DIR / file_path
        if dataset_path.exists():
            path = dataset_path
        else:
            return None
    
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        logger.warning(f"Failed to read code file {path}: {e}")
        return None


class PatternAnalyzerV4:
    """Pattern Analyzer with cluster selection and pattern detection."""
    
    def __init__(self, 
                 similarity_threshold: float = SIMILARITY_THRESHOLD_DEFAULT,
                 improvement_threshold: float = IMPROVEMENT_THRESHOLD_DEFAULT):
        self.report_dir = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "report_v4"
        self.report_dir.mkdir(parents=True, exist_ok=True)
        self.improvements_dir = utility_paths.SRC_DIR / "out_improvements_metadata"
        
        self.similarity_threshold = similarity_threshold
        self.improvement_threshold = improvement_threshold
        
        # Output paths
        self.PATH_PATTERN_COUNTS = self.report_dir / "pattern_counts.png"
        self.PATH_PATTERN_CORR = self.report_dir / "pattern_performance_correlation.png"
        self.PATH_SIM_VS_IMPR = self.report_dir / "similarity_vs_improvement.png"
        self.PATH_CLUSTER_SELECTION = self.report_dir / "cluster_selection_analysis.png"
        Path(self.PATH_CLUSTER_SELECTION).parent.mkdir(parents=True, exist_ok=True)
        self.PATH_REPORT_MD = self.report_dir / "analysis_report.md"
        
    def load_cluster_improvements(self) -> Dict[str, Dict]:
        """Load improvement metadata for all clusters."""
        improvements = {}
        
        if not self.improvements_dir.exists():
            logger.error(f"Improvements directory not found: {self.improvements_dir}")
            return improvements
        
        for improvement_file in self.improvements_dir.glob("*.json"):
            cluster_name = improvement_file.stem
            improvement_data = _read_json(improvement_file)
            if improvement_data and "improvements_metadata" in improvement_data:
                improvements[cluster_name] = improvement_data["improvements_metadata"]
                
        logger.info(f"Loaded improvement data for {len(improvements)} clusters")
        return improvements
        
    def select_clusters_for_analysis(self) -> List[ClusterAnalysisResult]:
        """Select clusters based on improvement and similarity criteria."""
        improvements_data = self.load_cluster_improvements()
        selected_clusters = []
        
        for cluster_name, data in improvements_data.items():
            overall_improvement = data.get("overall mean improvement", 0)
            metric_report = data.get("metric cluster report", {})
            
            # Check if any metric has improvement >= threshold
            has_significant_improvement = False
            improvements_by_metric = {}
            
            for metric in METRICS:
                if metric in metric_report:
                    metric_improvement = metric_report[metric].get("mean", 0)
                    improvements_by_metric[metric] = metric_improvement
                    if metric_improvement >= self.improvement_threshold:
                        has_significant_improvement = True
            
            # Load cluster data to check similarity
            cluster_file = utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
            if not cluster_file.exists():
                continue
                
            cluster_data = _read_json(cluster_file)
            similarities = []
            entries_count = 0
            
            for lang, entries in cluster_data.items():
                for entry in entries:
                    entries_count += 1
                    for llm in entry.get("LLMs", []):
                        similarity = llm.get("similarity_index")
                        if similarity is not None:
                            similarities.append(similarity)
            
            avg_similarity = np.mean(similarities) if similarities else 100
            
            # Selection criteria: significant improvement AND low similarity
            selected = (has_significant_improvement and 
                       avg_similarity < self.similarity_threshold)
            
            result = ClusterAnalysisResult(
                cluster_name=cluster_name,
                overall_improvement=overall_improvement,
                avg_similarity=avg_similarity,
                entries_count=entries_count,
                detected_patterns=[],
                improvement_by_metric=improvements_by_metric,
                selected_for_analysis=selected
            )
            
            selected_clusters.append(result)
        
        selected_count = sum(1 for c in selected_clusters if c.selected_for_analysis)
        logger.info(f"Selected {selected_count} clusters out of {len(selected_clusters)} for analysis")
        
        return selected_clusters
    
    def extract_patterns_from_code(self, base_code: str, llm_code: str, language: str) -> List[str]:
        """Extract patterns introduced by LLM compared to base code."""
        if not base_code or not llm_code:
            return []
        
        patterns = []
        lang = language.lower()
        
        # Language-specific pattern detection
        if lang == "python":
            patterns.extend(self._detect_python_patterns(base_code, llm_code))
        elif lang in ["java"]:
            patterns.extend(self._detect_java_patterns(base_code, llm_code))
        elif lang in ["cpp", "c++"]:
            patterns.extend(self._detect_cpp_patterns(base_code, llm_code))
        elif lang == "go":
            patterns.extend(self._detect_go_patterns(base_code, llm_code))
        elif lang in ["javascript", "js", "typescript", "ts"]:
            patterns.extend(self._detect_js_patterns(base_code, llm_code))
        
        # Generic patterns applicable to multiple languages
        patterns.extend(self._detect_generic_patterns(base_code, llm_code, lang))
        
        return list(set(patterns))  # Remove duplicates
    
    def _detect_python_patterns(self, base_code: str, llm_code: str) -> List[str]:
        """Detect Python-specific patterns."""
        patterns = []
        
        # AST-based patterns
        try:
            base_ast = ast.parse(base_code)
            llm_ast = ast.parse(llm_code)
            
            base_features = self._extract_python_ast_features(base_ast)
            llm_features = self._extract_python_ast_features(llm_ast)
            
            # Check for introduced features
            for feature, present in llm_features.items():
                if present and not base_features.get(feature, False):
                    patterns.append(f"python_{feature}")
                    
        except SyntaxError:
            pass  # Handle malformed code gracefully
        
        # Regex-based patterns
        regex_patterns = {
            "list_comprehension": r"\[[^\]]+for\s+[^\]]+in\s+[^\]]+\]",
            "dict_comprehension": r"\{[^\}]+:\s*[^\}]+for\s+[^\}]+in\s+[^\}]+\}",
            "generator_expression": r"\([^\)]+for\s+[^\)]+in\s+[^\)]+\)",
            "f_string": r"f['\"][^'\"]*\{[^}]+\}[^'\"]*['\"]",
            "lambda": r"lambda\s+[^:]+:",
            "decorators": r"@\w+",
            "context_manager": r"with\s+\w+.*:",
            "async_await": r"\b(async\s+def|await\s+)",
            "type_hints": r":\s*\w+\s*=|def\s+\w+\([^)]*:\s*\w+",
            "dataclass": r"@dataclass",
            "enumerate": r"\benumerate\s*\(",
            "zip": r"\bzip\s*\(",
            "any_all": r"\b(any|all)\s*\(",
        }
        
        for pattern_name, regex in regex_patterns.items():
            if (re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE) and 
                not re.search(regex, base_code, re.MULTILINE | re.IGNORECASE)):
                patterns.append(f"python_{pattern_name}")
        
        return patterns
    
    def _extract_python_ast_features(self, tree: ast.AST) -> Dict[str, bool]:
        """Extract boolean features from Python AST."""
        features = {}
        
        for node in ast.walk(tree):
            # Comprehensions
            if isinstance(node, (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)):
                features["comprehension"] = True
            
            # Context managers
            elif isinstance(node, ast.With):
                features["with_statement"] = True
                
            # Async features
            elif isinstance(node, ast.AsyncFunctionDef):
                features["async_function"] = True
            elif isinstance(node, ast.Await):
                features["await"] = True
                
            # Advanced features
            elif isinstance(node, ast.Lambda):
                features["lambda"] = True
            elif isinstance(node, ast.YieldFrom):
                features["yield_from"] = True
            elif isinstance(node, ast.Starred):
                features["unpacking"] = True
        
        return features
    
    def _detect_java_patterns(self, base_code: str, llm_code: str) -> List[str]:
        """Detect Java-specific patterns."""
        patterns = []
        
        java_patterns = {
            "streams": r"\.stream\s*\(\)|\.map\s*\(|\.filter\s*\(|\.reduce\s*\(|\.collect\s*\(",
            "lambda": r"->",
            "optional": r"Optional\.<|Optional\.of",
            "method_reference": r"::",
            "var_keyword": r"\bvar\s+\w+\s*=",
            "switch_expression": r"switch\s*\([^)]+\)\s*\{[^}]*->",
            "records": r"\brecord\s+\w+",
            "sealed_class": r"\bsealed\s+class",
            "pattern_matching": r"instanceof\s+\w+\s+\w+",
            "text_blocks": r'"""[\s\S]*?"""',
        }
        
        for pattern_name, regex in java_patterns.items():
            if (re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE) and 
                not re.search(regex, base_code, re.MULTILINE | re.IGNORECASE)):
                patterns.append(f"java_{pattern_name}")
        
        return patterns
    
    def _detect_cpp_patterns(self, base_code: str, llm_code: str) -> List[str]:
        """Detect C++-specific patterns."""
        patterns = []
        
        cpp_patterns = {
            "auto_keyword": r"\bauto\s+\w+\s*=",
            "range_based_for": r"for\s*\(\s*(?:const\s+)?(?:auto|[\w:]+)\s*&?\s*\w+\s*:\s*\w+\s*\)",
            "lambda": r"\[\s*[^\]]*\]\s*\([^)]*\)\s*(?:->\s*[\w:]+\s*)?\{",
            "smart_pointers": r"\b(?:std::)?(?:unique_ptr|shared_ptr|weak_ptr)<",
            "move_semantics": r"\bstd::move\s*\(",
            "constexpr": r"\bconstexpr\b",
            "nullptr": r"\bnullptr\b",
            "override": r"\boverride\b",
            "final": r"\bfinal\b",
            "uniform_init": r"\w+\s*\{[^}]*\}",
            "structured_binding": r"auto\s*\[\s*\w+(?:\s*,\s*\w+)*\s*\]\s*=",
            "if_constexpr": r"\bif\s+constexpr\b",
        }
        
        for pattern_name, regex in cpp_patterns.items():
            if (re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE) and 
                not re.search(regex, base_code, re.MULTILINE | re.IGNORECASE)):
                patterns.append(f"cpp_{pattern_name}")
        
        return patterns
    
    def _detect_go_patterns(self, base_code: str, llm_code: str) -> List[str]:
        """Detect Go-specific patterns."""
        patterns = []
        
        go_patterns = {
            "goroutine": r"\bgo\s+\w+\s*\(",
            "channels": r"\bchan\s+",
            "defer": r"\bdefer\s+",
            "range_loop": r"for\s+[^{]*range\s+",
            "error_handling": r"if\s+err\s*!=\s*nil",
            "make_slice": r"\bmake\s*\(\s*\[\]",
            "make_map": r"\bmake\s*\(\s*map\[",
            "interface_assertion": r"\.\([^)]+\)",
            "select_statement": r"\bselect\s*\{",
            "blank_identifier": r"_\s*:?=",
            "short_declaration": r"\w+\s*:=",
            "method_set": r"func\s*\([^)]*\)\s*\w+",
        }
        
        for pattern_name, regex in go_patterns.items():
            if (re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE) and 
                not re.search(regex, base_code, re.MULTILINE | re.IGNORECASE)):
                patterns.append(f"go_{pattern_name}")
        
        return patterns
    
    def _detect_js_patterns(self, base_code: str, llm_code: str) -> List[str]:
        """Detect JavaScript/TypeScript-specific patterns."""
        patterns = []
        
        js_patterns = {
            "arrow_function": r"(?:\w+\s*=>|=>\s*\w+|\([^)]*\)\s*=>)",
            "destructuring": r"(?:const|let|var)\s*(?:\{[^}]+\}|\[[^\]]+\])\s*=",
            "template_literals": r"`[^`]*\$\{[^}]+\}[^`]*`",
            "spread_operator": r"\.\.\.\w+",
            "rest_parameters": r"\.\.\.\w+\s*\)",
            "async_await": r"\b(async\s+function|await\s+)",
            "promise_chain": r"\.then\s*\(|\.catch\s*\(",
            "map_filter_reduce": r"\.(map|filter|reduce|forEach)\s*\(",
            "optional_chaining": r"\?\.",
            "nullish_coalescing": r"\?\?",
            "class_syntax": r"\bclass\s+\w+",
            "modules": r"\b(import|export)\s+",
        }
        
        for pattern_name, regex in js_patterns.items():
            if (re.search(regex, llm_code, re.MULTILINE | re.IGNORECASE) and 
                not re.search(regex, base_code, re.MULTILINE | re.IGNORECASE)):
                patterns.append(f"js_{pattern_name}")
        
        return patterns
    
    def _detect_generic_patterns(self, base_code: str, llm_code: str, language: str) -> List[str]:
        """Detect generic patterns applicable across languages."""
        patterns = []
        
        generic_patterns = {
            "early_return": r"(?:^|\n)\s*(?:if|when)\s*\([^)]+\)\s*(?:return|break|continue)",
            "guard_clause": r"(?:^|\n)\s*(?:if|when)\s*\([^)]+\)\s*\{?\s*(?:return|throw)",
            "loop_optimization": r"for\s*\([^;]*;[^;]*;[^)]*\)",
            "memoization": r"\b(?:memo|cache|cached|memoize)\b",
            "factory_pattern": r"\b(?:create|build|make)\w*\s*\(",
            "builder_pattern": r"\.(?:with|set)\w*\s*\([^)]*\)\s*\.|\bbuilder\(\)",
            "null_check": r"(?:!=|!==)\s*null|null\s*(?:!=|!==)",
            "constant_extraction": r"(?:const|final|static\s+final)\s+\w+\s*=",
            "single_responsibility": len(llm_code.split('\n')) < len(base_code.split('\n')) * 0.8,
            "error_handling_improvement": r"try\s*\{|catch\s*\(|except\s*:",
        }
        
        for pattern_name, pattern in generic_patterns.items():
            if pattern_name == "single_responsibility":
                if pattern:  # Boolean check for line count reduction
                    patterns.append(f"generic_{pattern_name}")
            else:
                if (isinstance(pattern, str) and 
                    re.search(pattern, llm_code, re.MULTILINE | re.IGNORECASE) and 
                    not re.search(pattern, base_code, re.MULTILINE | re.IGNORECASE)):
                    patterns.append(f"generic_{pattern_name}")
        
        return patterns
    
    def analyze_patterns_in_clusters(self, selected_clusters: List[ClusterAnalysisResult]) -> Dict[str, Any]:
        """Analyze patterns in selected clusters."""
        all_patterns = Counter()
        cluster_patterns = {}
        pattern_improvements = defaultdict(list)
        
        for cluster_result in selected_clusters:
            if not cluster_result.selected_for_analysis:
                continue
                
            cluster_name = cluster_result.cluster_name
            cluster_file = utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
            
            if not cluster_file.exists():
                continue
                
            cluster_data = _read_json(cluster_file)
            cluster_patterns[cluster_name] = []
            
            for lang, entries in cluster_data.items():
                for entry in entries:
                    # Read base code
                    base_code_path = entry.get("codeSnippetFilePath", "")
                    if entry.get("language") in ("c", "cpp") and entry.get("filename"):
                        base_code_path = f"{base_code_path}/{entry['filename']}"
                    
                    base_code = _read_code_file(base_code_path)
                    
                    for llm in entry.get("LLMs", []):
                        llm_code_path = llm.get("path", "")
                        llm_code = _read_code_file(llm_code_path)
                        
                        if base_code and llm_code:
                            patterns = self.extract_patterns_from_code(
                                base_code, llm_code, entry.get("language", lang)
                            )
                            
                            for pattern in patterns:
                                all_patterns[pattern] += 1
                                cluster_patterns[cluster_name].append(pattern)
                                pattern_improvements[pattern].append(
                                    cluster_result.overall_improvement
                                )
        
        return {
            "all_patterns": dict(all_patterns),
            "cluster_patterns": cluster_patterns,
            "pattern_improvements": dict(pattern_improvements)
        }
    
    def calculate_pattern_correlations(self, pattern_data: Dict[str, Any]) -> List[PatternCorrelation]:
        """Calculate correlations between patterns and improvements."""
        correlations = []
        pattern_improvements = pattern_data["pattern_improvements"]
        
        for pattern_name, improvements in pattern_improvements.items():
            if len(improvements) < 5:  # Need minimum samples
                continue
                
            # Create binary indicator for pattern presence
            all_improvements = []
            pattern_indicators = []
            
            # Collect all improvements (with and without pattern)
            for cluster_name, cluster_patterns in pattern_data["cluster_patterns"].items():
                # Get cluster improvement from the loaded data
                improvements_data = self.load_cluster_improvements()
                if cluster_name in improvements_data:
                    cluster_improvement = improvements_data[cluster_name]["overall mean improvement"]
                    all_improvements.append(cluster_improvement)
                    pattern_indicators.append(1 if pattern_name in cluster_patterns else 0)
            
            if len(set(pattern_indicators)) < 2:  # Need variation in pattern presence
                continue
                
            # Calculate correlation
            try:
                correlation, p_value = pearsonr(pattern_indicators, all_improvements)
                
                # Calculate averages
                with_pattern = [imp for i, imp in enumerate(all_improvements) if pattern_indicators[i] == 1]
                without_pattern = [imp for i, imp in enumerate(all_improvements) if pattern_indicators[i] == 0]
                
                avg_with = np.mean(with_pattern) if with_pattern else 0
                avg_without = np.mean(without_pattern) if without_pattern else 0
                
                correlation_result = PatternCorrelation(
                    pattern_name=pattern_name,
                    correlation_with_improvement=correlation,
                    p_value=p_value,
                    occurrences=sum(pattern_indicators),
                    avg_improvement_when_present=avg_with,
                    avg_improvement_when_absent=avg_without
                )
                
                correlations.append(correlation_result)
                
            except Exception as e:
                logger.warning(f"Failed to calculate correlation for {pattern_name}: {e}")
        
        # Sort by absolute correlation strength
        correlations.sort(key=lambda x: abs(x.correlation_with_improvement), reverse=True)
        return correlations
    
    def create_visualizations(self, 
                            selected_clusters: List[ClusterAnalysisResult],
                            pattern_data: Dict[str, Any],
                            correlations: List[PatternCorrelation]):
        """Create comprehensive visualizations."""
        # Set style
        plt.style.use('seaborn-v0_8')
        
        # 1. Cluster selection scatter plot
        self._plot_cluster_selection(selected_clusters)
        
        # 2. Pattern frequency bar chart
        self._plot_pattern_frequencies(pattern_data["all_patterns"])
        
        # 3. Pattern-improvement correlation heatmap
        self._plot_pattern_correlations(correlations)
        
        # 4. Similarity vs Improvement scatter
        self._plot_similarity_vs_improvement(selected_clusters)
    
    def _plot_cluster_selection(self, selected_clusters: List[ClusterAnalysisResult]):
        """Plot cluster selection based on similarity and improvement."""
        fig, ax = plt.subplots(figsize=(12, 8))
        
        selected = [c for c in selected_clusters if c.selected_for_analysis]
        not_selected = [c for c in selected_clusters if not c.selected_for_analysis]
        
        # Plot non-selected clusters
        if not_selected:
            ax.scatter([c.avg_similarity for c in not_selected],
                      [c.overall_improvement for c in not_selected],
                      alpha=0.6, s=50, c='lightgray', label='Not Selected')
        
        # Plot selected clusters
        if selected:
            ax.scatter([c.avg_similarity for c in selected],
                      [c.overall_improvement for c in selected],
                      alpha=0.8, s=80, c='red', label='Selected for Analysis')
        
        # Add threshold lines
        ax.axvline(self.similarity_threshold, color='blue', linestyle='--', 
                   label=f'Similarity < {self.similarity_threshold}%')
        ax.axhline(self.improvement_threshold, color='green', linestyle='--', 
                   label=f'Improvement ≥ {self.improvement_threshold}%')
        
        ax.set_xlabel('Average Similarity (%)')
        ax.set_ylabel('Overall Improvement (%)')
        ax.set_title('Cluster Selection for Pattern Analysis')
        ax.legend()
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.PATH_CLUSTER_SELECTION, dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_pattern_frequencies(self, pattern_counts: Dict[str, int]):
        """Plot pattern frequency bar chart."""
        if not pattern_counts:
            return
            
        # Get top 20 patterns
        top_patterns = dict(sorted(pattern_counts.items(), 
                                 key=lambda x: x[1], reverse=True)[:20])
        
        fig, ax = plt.subplots(figsize=(14, 8))
        
        patterns = list(top_patterns.keys())
        counts = list(top_patterns.values())
        
        bars = ax.barh(patterns, counts, color='steelblue', alpha=0.8)
        
        # Add value labels on bars
        for bar in bars:
            width = bar.get_width()
            ax.text(width + 0.1, bar.get_y() + bar.get_height()/2, 
                   f'{int(width)}', ha='left', va='center')
        
        ax.set_xlabel('Occurrences')
        ax.set_title('Top 20 Patterns Introduced by LLMs')
        ax.grid(True, axis='x', alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.PATH_PATTERN_COUNTS, dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_pattern_correlations(self, correlations: List[PatternCorrelation]):
        """Plot pattern-improvement correlations."""
        if not correlations:
            return
            
        # Take top 15 correlations by absolute value
        top_correlations = correlations[:15]
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
        
        # Correlation strength plot
        patterns = [c.pattern_name for c in top_correlations]
        corr_values = [c.correlation_with_improvement for c in top_correlations]
        colors = ['red' if x < 0 else 'green' for x in corr_values]
        
        bars1 = ax1.barh(patterns, corr_values, color=colors, alpha=0.7)
        ax1.set_xlabel('Correlation with Improvement')
        ax1.set_title('Pattern-Improvement Correlations')
        ax1.grid(True, axis='x', alpha=0.3)
        ax1.axvline(0, color='black', linewidth=0.8)
        
        # Improvement comparison plot
        patterns_short = [p.replace('python_', '').replace('java_', '').replace('cpp_', '')
                         .replace('go_', '').replace('js_', '').replace('generic_', '')[:15] 
                         for p in patterns[:10]]
        with_pattern = [c.avg_improvement_when_present for c in top_correlations[:10]]
        without_pattern = [c.avg_improvement_when_absent for c in top_correlations[:10]]
        
        x = np.arange(len(patterns_short))
        width = 0.35
        
        ax2.bar(x - width/2, with_pattern, width, label='With Pattern', alpha=0.8, color='steelblue')
        ax2.bar(x + width/2, without_pattern, width, label='Without Pattern', alpha=0.8, color='orange')
        
        ax2.set_xlabel('Pattern')
        ax2.set_ylabel('Average Improvement (%)')
        ax2.set_title('Improvement: With vs Without Pattern')
        ax2.set_xticks(x)
        ax2.set_xticklabels(patterns_short, rotation=45, ha='right')
        ax2.legend()
        ax2.grid(True, axis='y', alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.PATH_PATTERN_CORR, dpi=300, bbox_inches='tight')
        plt.close()
    
    def _plot_similarity_vs_improvement(self, selected_clusters: List[ClusterAnalysisResult]):
        """Plot similarity vs improvement scatter plot."""
        fig, ax = plt.subplots(figsize=(10, 7))
        
        selected = [c for c in selected_clusters if c.selected_for_analysis]
        not_selected = [c for c in selected_clusters if not c.selected_for_analysis]
        
        # Plot clusters with size proportional to entries count
        if not_selected:
            sizes = [max(20, min(200, c.entries_count * 5)) for c in not_selected]
            ax.scatter([c.avg_similarity for c in not_selected],
                      [c.overall_improvement for c in not_selected],
                      s=sizes, alpha=0.5, c='lightgray', label='Not Selected')
        
        if selected:
            sizes = [max(20, min(200, c.entries_count * 5)) for c in selected]
            ax.scatter([c.avg_similarity for c in selected],
                      [c.overall_improvement for c in selected],
                      s=sizes, alpha=0.8, c='red', label='Selected')
        
        # Add threshold lines
        ax.axvline(self.similarity_threshold, color='blue', linestyle='--', alpha=0.7,
                   label=f'Similarity < {self.similarity_threshold}%')
        ax.axhline(self.improvement_threshold, color='green', linestyle='--', alpha=0.7,
                   label=f'Improvement ≥ {self.improvement_threshold}%')
        
        ax.set_xlabel('Average Code Similarity (%)')
        ax.set_ylabel('Overall Performance Improvement (%)')
        ax.set_title('Cluster Selection: Similarity vs Improvement')
        ax.legend()
        ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.PATH_SIM_VS_IMPR, dpi=300, bbox_inches='tight')
        plt.close()
    
    def generate_analysis_report(self, 
                               selected_clusters: List[ClusterAnalysisResult],
                               pattern_data: Dict[str, Any],
                               correlations: List[PatternCorrelation]):
        """Generate comprehensive analysis report."""
        lines = []
        
        # Header
        lines.extend([
            "#  Analysis Report V4",
            "",
            f"Analysis Date: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "",
            "## Executive Summary",
            ""
        ])
        
        # Summary statistics
        total_clusters = len(selected_clusters)
        selected_count = sum(1 for c in selected_clusters if c.selected_for_analysis)
        total_patterns = len(pattern_data["all_patterns"])
        significant_correlations = sum(1 for c in correlations if abs(c.correlation_with_improvement) > 0.3)
        
        lines.extend([
            f"- **Total Clusters Analyzed**: {total_clusters}",
            f"- **Clusters Selected for Deep Analysis**: {selected_count} ({selected_count/total_clusters*100:.1f}%)",
            f"- **Selection Criteria**: Improvement ≥ {self.improvement_threshold}% AND Similarity < {self.similarity_threshold}%",
            f"- **Total Patterns Detected**: {total_patterns}",
            f"- **Patterns with Strong Correlations**: {significant_correlations} (|r| > 0.3)",
            "",
            "## Methodology",
            "",
            "### Cluster Selection Process",
            f"1. **Improvement Threshold**: Clusters must show ≥ {self.improvement_threshold}% improvement in at least one metric (CPU, RAM, or execution time)",
            f"2. **Similarity Threshold**: Average similarity between base and LLM code must be < {self.similarity_threshold}%",
            "3. **Rationale**: Focus on cases where LLMs make significant changes that result in meaningful performance gains",
            "",
            "### Pattern Detection",
            "Multi-layered approach combining:",
            "- **AST Analysis**: For Python, structural code changes",
            "- **Regex Pattern Matching**: Language-specific constructs and idioms", 
            "- **Generic Patterns**: Cross-language improvements like early returns, memoization",
            "- **Code Metrics**: Line reduction, complexity changes",
            "",
            "### Statistical Analysis",
            "- **Pearson Correlation**: Linear relationship between pattern presence and improvement",
            "- **Significance Testing**: p-values to assess correlation reliability",
            "- **Effect Size**: Average improvement difference with/without patterns",
            ""
        ])
        
        # Selected clusters summary
        if selected_count > 0:
            lines.extend([
                "## Selected Clusters Summary",
                "",
                "| Cluster | Improvement (%) | Avg Similarity (%) | Entries | Top Metric Improvement |",
                "|---------|-----------------|-------------------|---------|----------------------|"
            ])
            
            for cluster in sorted([c for c in selected_clusters if c.selected_for_analysis], 
                                key=lambda x: x.overall_improvement, reverse=True):
                top_metric = max(cluster.improvement_by_metric.items(), key=lambda x: x[1])
                lines.append(f"| {cluster.cluster_name} | {cluster.overall_improvement:.1f} | "
                           f"{cluster.avg_similarity:.1f} | {cluster.entries_count} | "
                           f"{top_metric[0]}: {top_metric[1]:.1f}% |")
            lines.append("")
        
        # Top patterns
        if pattern_data["all_patterns"]:
            lines.extend([
                "## Most Frequent Patterns",
                "",
                "| Pattern | Occurrences | Description |",
                "|---------|-------------|-------------|"
            ])
            
            pattern_descriptions = {
                "python_list_comprehension": "List comprehensions replace explicit loops",
                "python_f_string": "f-strings replace string concatenation/formatting",
                "python_enumerate": "enumerate() replaces manual index tracking",
                "java_streams": "Stream API replaces traditional loops",
                "java_lambda": "Lambda expressions replace anonymous classes",
                "cpp_auto_keyword": "Auto keyword replaces explicit type declarations",
                "cpp_range_based_for": "Range-based for loops replace traditional for loops",
                "go_goroutine": "Goroutines for concurrent execution",
                "go_defer": "Defer statements for resource cleanup",
                "generic_early_return": "Early returns reduce nesting",
                "generic_memoization": "Caching to avoid redundant computations"
            }
            
            top_patterns = sorted(pattern_data["all_patterns"].items(), 
                                key=lambda x: x[1], reverse=True)[:15]
            
            for pattern, count in top_patterns:
                description = pattern_descriptions.get(pattern, "Language-specific optimization")
                lines.append(f"| {pattern} | {count} | {description} |")
            lines.append("")
        
        # Correlation analysis
        if correlations:
            lines.extend([
                "## Pattern-Performance Correlations",
                "",
                "### Strongest Positive Correlations (Performance Improving)",
                "",
                "| Pattern | Correlation | p-value | Avg Improvement With | Avg Improvement Without | Effect Size |",
                "|---------|-------------|---------|---------------------|------------------------|-------------|"
            ])
            
            positive_corr = [c for c in correlations if c.correlation_with_improvement > 0.1][:10]
            for corr in positive_corr:
                effect_size = corr.avg_improvement_when_present - corr.avg_improvement_when_absent
                significance = "***" if corr.p_value < 0.001 else "**" if corr.p_value < 0.01 else "*" if corr.p_value < 0.05 else ""
                lines.append(f"| {corr.pattern_name} | {corr.correlation_with_improvement:.3f}{significance} | "
                           f"{corr.p_value:.3f} | {corr.avg_improvement_when_present:.1f}% | "
                           f"{corr.avg_improvement_when_absent:.1f}% | {effect_size:.1f}% |")
            
            lines.extend([
                "",
                "### Strongest Negative Correlations (Performance Degrading)",
                "",
                "| Pattern | Correlation | p-value | Avg Improvement With | Avg Improvement Without | Effect Size |",
                "|---------|-------------|---------|---------------------|------------------------|-------------|"
            ])
            
            negative_corr = [c for c in correlations if c.correlation_with_improvement < -0.1][:5]
            for corr in negative_corr:
                effect_size = corr.avg_improvement_when_present - corr.avg_improvement_when_absent
                significance = "***" if corr.p_value < 0.001 else "**" if corr.p_value < 0.01 else "*" if corr.p_value < 0.05 else ""
                lines.append(f"| {corr.pattern_name} | {corr.correlation_with_improvement:.3f}{significance} | "
                           f"{corr.p_value:.3f} | {corr.avg_improvement_when_present:.1f}% | "
                           f"{corr.avg_improvement_when_absent:.1f}% | {effect_size:.1f}% |")
            
            lines.append("")
            lines.append("*Significance levels: *** p<0.001, ** p<0.01, * p<0.05*")
            lines.append("")
        
        # Key insights
        lines.extend([
            "## Key Insights",
            "",
            "### Performance-Enhancing Patterns"
        ])
        
        if correlations:
            top_positive = [c for c in correlations if c.correlation_with_improvement > 0.2][:5]
            for i, corr in enumerate(top_positive, 1):
                effect = corr.avg_improvement_when_present - corr.avg_improvement_when_absent
                lines.append(f"{i}. **{corr.pattern_name}**: Shows {effect:.1f}% better improvement when present "
                           f"(correlation: {corr.correlation_with_improvement:.3f})")
        
        lines.extend([
            "",
            "### Pattern Categories by Language",
            ""
        ])
        
        # Group patterns by language
        pattern_by_lang = defaultdict(list)
        for pattern in pattern_data["all_patterns"].keys():
            if pattern.startswith("python_"):
                pattern_by_lang["Python"].append(pattern.replace("python_", ""))
            elif pattern.startswith("java_"):
                pattern_by_lang["Java"].append(pattern.replace("java_", ""))
            elif pattern.startswith("cpp_"):
                pattern_by_lang["C++"].append(pattern.replace("cpp_", ""))
            elif pattern.startswith("go_"):
                pattern_by_lang["Go"].append(pattern.replace("go_", ""))
            elif pattern.startswith("js_"):
                pattern_by_lang["JavaScript/TypeScript"].append(pattern.replace("js_", ""))
            elif pattern.startswith("generic_"):
                pattern_by_lang["Generic"].append(pattern.replace("generic_", ""))
        
        for lang, patterns in pattern_by_lang.items():
            lines.append(f"- **{lang}**: {', '.join(patterns[:5])}")
            if len(patterns) > 5:
                lines.append(f"  (+{len(patterns)-5} more)")
        
        lines.extend([
            "",
            "## Recommendations",
            "",
            "### For Code Optimization"
        ])
        
        if correlations:
            recommendations = []
            for corr in correlations[:3]:
                if corr.correlation_with_improvement > 0.2:
                    recommendations.append(f"- **Prioritize {corr.pattern_name}**: "
                                         f"Strong positive correlation ({corr.correlation_with_improvement:.3f}) "
                                         f"with {corr.avg_improvement_when_present - corr.avg_improvement_when_absent:.1f}% "
                                         f"additional improvement")
            lines.extend(recommendations)
        
        lines.extend([
            "",
            "### For LLM Training/Prompting",
            f"- Focus on clusters with similarity < {self.similarity_threshold}% but improvement > {self.improvement_threshold}%",
            "- Encourage patterns that show consistent positive correlations",
            "- Avoid patterns that correlate with performance degradation",
            "",
            "## Files Generated",
            "- `cluster_selection_analysis.png`: Cluster selection visualization",
            "- `pattern_counts.png`: Pattern frequency chart",
            "- `pattern_performance_correlation.png`: Correlation analysis charts", 
            "- `similarity_vs_improvement.png`: Similarity-improvement scatter plot",
            "- `analysis_report.md`: This comprehensive report",
            "",
            f"---",
            f"Generated by Pattern Analyzer V4 on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}"
        ])
        
        # Write report
        report_content = "\n".join(lines)
        self.PATH_REPORT_MD.write_text(report_content, encoding="utf-8")
        logger.info(f"Analysis report written to {self.PATH_REPORT_MD}")
    
    def export_data(self, 
                   selected_clusters: List[ClusterAnalysisResult],
                   pattern_data: Dict[str, Any],
                   correlations: List[PatternCorrelation]):
        """Export analysis data to CSV files."""
        
        # Export cluster analysis results
        cluster_df = pd.DataFrame([
            {
                "cluster_name": c.cluster_name,
                "overall_improvement": c.overall_improvement,
                "avg_similarity": c.avg_similarity,
                "entries_count": c.entries_count,
                "selected": c.selected_for_analysis,
                **{f"{metric}_improvement": c.improvement_by_metric.get(metric, 0) 
                   for metric in METRICS}
            }
            for c in selected_clusters
        ])
        cluster_df.to_csv(self.report_dir / "cluster_analysis.csv", index=False)
        
        # Export pattern correlations
        if correlations:
            corr_df = pd.DataFrame([
                {
                    "pattern": c.pattern_name,
                    "correlation": c.correlation_with_improvement,
                    "p_value": c.p_value,
                    "occurrences": c.occurrences,
                    "avg_improvement_with": c.avg_improvement_when_present,
                    "avg_improvement_without": c.avg_improvement_when_absent,
                    "effect_size": c.avg_improvement_when_present - c.avg_improvement_when_absent
                }
                for c in correlations
            ])
            corr_df.to_csv(self.report_dir / "pattern_correlations.csv", index=False)
        
        # Export pattern frequencies
        pattern_freq_df = pd.DataFrame(list(pattern_data["all_patterns"].items()), 
                                     columns=["pattern", "frequency"])
        pattern_freq_df.to_csv(self.report_dir / "pattern_frequencies.csv", index=False)
        
        logger.info(f"Data exported to CSV files in {self.report_dir}")
    
    def run_complete_analysis(self):
        """Run the complete pattern analysis workflow."""
        logger.info("Starting Pattern Analysis V4")
        
        # Step 1: Select clusters for analysis
        logger.info("Step 1: Selecting clusters based on improvement and similarity criteria")
        selected_clusters = self.select_clusters_for_analysis()
        
        # Step 2: Analyze patterns in selected clusters
        logger.info("Step 2: Analyzing patterns in selected clusters")
        pattern_data = self.analyze_patterns_in_clusters(selected_clusters)
        
        # Step 3: Calculate pattern-performance correlations
        logger.info("Step 3: Calculating pattern-performance correlations")
        correlations = self.calculate_pattern_correlations(pattern_data)
        
        # Step 4: Create visualizations
        logger.info("Step 4: Creating visualizations")
        self.create_visualizations(selected_clusters, pattern_data, correlations)
        
        # Step 5: Generate comprehensive report
        logger.info("Step 5: Generating analysis report")
        self.generate_analysis_report(selected_clusters, pattern_data, correlations)
        
        # Step 6: Export data
        logger.info("Step 6: Exporting data to CSV files")
        self.export_data(selected_clusters, pattern_data, correlations)
        
        # Summary
        selected_count = sum(1 for c in selected_clusters if c.selected_for_analysis)
        total_patterns = len(pattern_data["all_patterns"])
        significant_correlations = sum(1 for c in correlations if abs(c.correlation_with_improvement) > 0.3)
        
        logger.info(f"Analysis Complete!")
        logger.info(f"- Selected {selected_count} clusters for analysis")
        logger.info(f"- Detected {total_patterns} unique patterns")
        logger.info(f"- Found {significant_correlations} patterns with strong correlations")
        logger.info(f"- Results saved to: {self.report_dir}")
        
        return {
            "selected_clusters": selected_clusters,
            "pattern_data": pattern_data,
            "correlations": correlations,
            "report_dir": self.report_dir
        }


def main():
    """Main function to run the pattern analysis."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Pattern Analyzer V4")
    parser.add_argument("--similarity-threshold", type=float, default=SIMILARITY_THRESHOLD_DEFAULT,
                       help=f"Similarity threshold for cluster selection (default: {SIMILARITY_THRESHOLD_DEFAULT})")
    parser.add_argument("--improvement-threshold", type=float, default=IMPROVEMENT_THRESHOLD_DEFAULT,
                       help=f"Improvement threshold for cluster selection (default: {IMPROVEMENT_THRESHOLD_DEFAULT})")
    
    args = parser.parse_args()
    
    # Initialize and run analyzer
    analyzer = PatternAnalyzerV4(
        similarity_threshold=args.similarity_threshold,
        improvement_threshold=args.improvement_threshold
    )
    
    results = analyzer.run_complete_analysis()
    
    print(f"\nAnalysis completed successfully!")
    print(f"Selected clusters: {sum(1 for c in results['selected_clusters'] if c.selected_for_analysis)}")
    print(f"Patterns detected: {len(results['pattern_data']['all_patterns'])}")
    print(f"Report location: {results['report_dir']}")


if __name__ == "__main__":
    main()