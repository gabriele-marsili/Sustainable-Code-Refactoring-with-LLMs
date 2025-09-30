#!/usr/bin/env python3
"""
Pattern Analyzer v3

Features:
- Load cluster JSONs and execution results (base and prompt versions)
- Compute per-entry medians over 5 runs for CPU, RAM, TIME (lower is better)
- Correct improvement formula: (base - llm)/base * 100, guard base==0
- AST metrics (Python): node count, function count, nesting depth, cyclomatic complexity, Halstead
- Heuristic AST-like metrics for other languages (best-effort)
- Pattern detection (syntactic/idiomatic) per language; per-file frequencies
- Selection of interesting subset: high improvement, low similarity (thresholds configurable)
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
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass
from collections import Counter

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

# Add project root utils
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402


logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


# Defaults (overridable via CLI)
SIMILARITY_THRESHOLD_DEFAULT = 65.0
IMPROVEMENT_THRESHOLD_DEFAULT = 10.0
TOP_PERCENTILE_DEFAULT = 0.75
MAX_IMPROVEMENT_CLAMP = 200.0
MIN_IMPROVEMENT_CLAMP = -200.0


@dataclass
class PerfAgg:
    cpu: Optional[float]
    ram: Optional[float]
    time: Optional[float]
    pass_rate: Optional[float]


@dataclass
class ASTMetrics:
    node_count: int = 0
    function_count: int = 0
    depth: int = 0
    cyclomatic: int = 0
    halstead_vocab: int = 0
    halstead_length: int = 0
    halstead_volume: float = 0.0


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


class PatternAnalyzerV3:
    def __init__(self, outdir: Optional[Path] = None,
                 sim_threshold: float = SIMILARITY_THRESHOLD_DEFAULT,
                 impr_threshold: float = IMPROVEMENT_THRESHOLD_DEFAULT,
                 top_percentile: float = TOP_PERCENTILE_DEFAULT,
                 save_pdf: bool = False):
        self.clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR
        self.reports_dir = (outdir or (utility_paths.METRICS_DIR_FILEPATH / "patterns" / "v3"))
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.save_pdf = save_pdf

        self.SIM_T = sim_threshold
        self.IMPR_T = impr_threshold
        self.TOP_P = top_percentile

        # Output paths (as requested)
        self.PATH_PATTERN_COUNTS = self.reports_dir / "pattern_counts.png"
        self.PATH_PATTERN_CORR = self.reports_dir / "pattern_performance_correlation.png"
        self.PATH_SIM_VS_IMPR = self.reports_dir / "similarity_vs_improvement.png"
        self.PATH_REPORT_MD = self.reports_dir / "analysis_report.md"

    # ---------------- Execution data aggregation (medians over 5 runs) ----------------
    def _collect_base_runs(self, cluster: str) -> Dict[str, Dict[str, List[Optional[float]]]]:
        acc: Dict[str, Dict[str, List[Optional[float]]]] = {}
        for run in range(1, 6):
            fp = self.exec_dir / f"{cluster}_results_{run}.json"
            # Skip missing files silently
            if not fp.exists():
                continue
            if "_with_metrics" in cluster or "debug_" in cluster or "bad_entries" in cluster:
                continue
            data = _read_json(fp)
            for lang, items in data.get("results", {}).items():
                for it in items:
                    eid = it.get("id")
                    if eid is None:
                        continue
                    rec = acc.setdefault(eid, {"language": it.get("language", lang),
                                               "cpu": [], "ram": [], "time": [], "pass": []})
                    rec["cpu"].append(it.get("CPU_usage"))
                    rec["ram"].append(it.get("RAM_usage"))
                    rec["time"].append(it.get("execution_time_ms"))
                    rec["pass"].append(1 if it.get("regressionTestPassed") else 0)
        return acc

    def _collect_llm_runs(self, cluster: str) -> Dict[str, Dict[str, Any]]:
        acc: Dict[str, Dict[str, Any]] = {}
        # Helper to ingest a single results file and push LLM entries
        def ingest_results_file(fp: Path, pv_label: Optional[str]):
            if not fp.exists():
                return
            data = _read_json(fp)
            for lang, items in data.get("results", {}).items():
                for it in items:
                    base_id = it.get("id")
                    for llm in it.get("LLM_results", []):
                        llm_type = llm.get("LLM_type", "unknown")
                        # Resolve prompt version: prefer explicit, else provided label, else path-derived
                        explicit_pv = llm.get("promptVersion") or llm.get("prompt_version")
                        path_txt = llm.get("path", "") or ""
                        m = re.search(r"\bv([A-Za-z0-9]+)\b", path_txt)
                        from_path = f"v{m.group(1)}" if m else None
                        pv_final = explicit_pv or pv_label or from_path or "vNA"
                        key = f"{base_id}::{llm_type}::{pv_final}"
                        rec = acc.setdefault(key, {"base_id": base_id,
                                                   "language": it.get("language", lang),
                                                   "llm_type": llm_type,
                                                   "prompt_version": pv_final,
                                                   "cpu": [], "ram": [], "time": [], "pass": [],
                                                   "similarity_index": llm.get("similarity_index"),
                                                   "path": llm.get("path")})
                        rec["cpu"].append(llm.get("CPU_usage"))
                        rec["ram"].append(llm.get("RAM_usage"))
                        rec["time"].append(llm.get("execution_time_ms"))
                        rec["pass"].append(1 if llm.get("regressionTestPassed") else 0)

        # Versioned prompt files
        for pv in range(1, 5):
            for run in range(1, 6):
                ingest_results_file(self.exec_dir / f"{cluster}_results_v{pv}_{run}.json", f"v{pv}")

        # Also ingest non-versioned files that might contain LLM results
        for run in range(1, 6):
            ingest_results_file(self.exec_dir / f"{cluster}_results_{run}.json", None)
        return acc

    def _aggregate_medians(self, series: Dict[str, List[Optional[float]]]) -> PerfAgg:
        return PerfAgg(
            cpu=_median(series.get("cpu", [])),
            ram=_median(series.get("ram", [])),
            time=_median(series.get("time", [])),
            pass_rate=_median(series.get("pass", [])),
        )

    # ---------------- Improvements ----------------
    def _improvement_pct(self, base: Optional[float], llm: Optional[float]) -> Optional[float]:
        if base is None or llm is None:
            return None
        if base == 0:
            return None
        val = (base - llm) / abs(base) * 100.0
        if not np.isfinite(val):
            return None
        val = max(min(val, MAX_IMPROVEMENT_CLAMP), MIN_IMPROVEMENT_CLAMP)
        return float(val)

    # ---------------- Code reading ----------------
    def _read_code(self, path_str: Optional[str]) -> Optional[str]:
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
        except Exception:
            return None

    # ---------------- AST metrics (Python) ----------------
    def _python_ast_metrics(self, code: Optional[str]) -> Optional[ASTMetrics]:
        if not code:
            return None
        try:
            tree = ast.parse(code)
        except Exception:
            return None

        node_count = 0
        func_count = 0
        cyclo = 0

        def max_depth(node: ast.AST, d: int = 0) -> int:
            kids = list(ast.iter_child_nodes(node))
            if not kids:
                return d
            return max(max_depth(c, d + 1) for c in kids)

        # Halstead: rough tokenization by operators/operands via AST node types and names
        operators: Counter = Counter()
        operands: Counter = Counter()

        for n in ast.walk(tree):
            node_count += 1
            if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef)):
                func_count += 1
                cyclo += 1
            if isinstance(n, (ast.If, ast.IfExp, ast.For, ast.While, ast.BoolOp, ast.Try, ast.With, ast.AsyncFor)):
                cyclo += 1

            # Halstead operators/operands (coarse)
            if isinstance(n, (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.Mod, ast.Pow,
                              ast.BitAnd, ast.BitOr, ast.BitXor, ast.FloorDiv,
                              ast.And, ast.Or, ast.Not, ast.Eq, ast.NotEq, ast.Lt, ast.Gt, ast.LtE, ast.GtE)):
                operators[type(n).__name__] += 1
            if isinstance(n, ast.Call):
                operators["Call"] += 1
            if isinstance(n, ast.Assign):
                operators["Assign"] += 1
            if isinstance(n, ast.Name):
                operands[n.id] += 1
            if isinstance(n, ast.Constant):
                operands[repr(n.value)[:32]] += 1

        depth = max_depth(tree)
        n1 = len(operators)
        n2 = len(operands)
        N1 = sum(operators.values())
        N2 = sum(operands.values())
        vocab = n1 + n2
        length = N1 + N2
        volume = (length * math.log2(vocab)) if vocab > 0 and length > 0 else 0.0

        return ASTMetrics(
            node_count=node_count,
            function_count=func_count,
            depth=depth,
            cyclomatic=cyclo,
            halstead_vocab=vocab,
            halstead_length=length,
            halstead_volume=float(volume),
        )

    # ---------------- Pattern detection ----------------
    def _textual_patterns(self, language: str, base_code: str, llm_code: str) -> List[str]:
        lang = language.lower()
        b_code = base_code or ""
        l_code = llm_code or ""

        def has(pat: str, txt: str) -> bool:
            return bool(re.search(pat, txt, flags=re.MULTILINE | re.IGNORECASE))

        checks: Dict[str, str] = {}
        if lang in ("python",):
            checks = {
                "list_comprehension": r"\[[^\]]+for\s+[^\]]+in\s+[^\]]+\]",
                "dict_comprehension": r"\{[^\}]+for\s+[^\}]+in\s+[^\}]+\}",
                "generator_expression": r"\([^\)]+for\s+[^\)]+in\s+[^\)]+\)",
                "f_string": r"f['\"][^'\"]*\{[^}]+\}[^'\"]*['\"]",
                "lru_cache": r"@(?:functools\.)?lru_cache",
                "in_place_ops": r"[+\-*/]=\s*",
                "async_await": r"\basync\b|\bawait\b",
                "enumerate": r"\benumerate\s*\(",
                "zip": r"\bzip\s*\(",
                "any_all": r"\b(any|all)\s*\(",
            }
        elif lang in ("javascript", "js", "typescript", "ts"):
            checks = {
                "arrow_function": r"(?:\w+\s*=>|=>\s*\w+|\([^)]*\)\s*=>)",
                "async_await": r"\b(async\s+function|await\s+)",
                "optional_chaining": r"\?\.",
                "template_literals": r"`[^`]*\$\{[^}]+\}[^`]*`",
                "map_filter_reduce": r"\.(map|filter|reduce)\s*\(",
                "destructuring": r"(?:const|let|var)\s*(?:\{[^}]+\}|\[[^\]]+\])\s*=",
                "spread_operator": r"\.\.\.\w+",
                "memoization": r"\bMemo(ize|ization)\b|cache\s*=",
                "in_place_ops": r"[+\-*/]=\s*",
            }
        elif lang in ("go", "golang"):
            checks = {
                "goroutine": r"\bgo\s+\w+\s*\(",
                "defer": r"\bdefer\s+",
                "range_loop": r"for\s+[^{]*range\s+",
                "make": r"\bmake\s*\(",
                "channel": r"\bchan\s+",
                "in_place_ops": r"[+\-*/]=\s*",
            }
        elif lang in ("java", "c", "c++", "cpp"):
            checks = {
                "lambda_arrow": r"->",
                "streams": r"\.stream\s*\(|\.map\s*\(|\.filter\s*\(|\.reduce\s*\(",
                "enhanced_for": r"for\s*\(\s*\w+\s+\w+\s*:\s*\w+\s*\)",
                "in_place_ops": r"[+\-*/]=\s*",
            }

        res = []
        for k, pat in checks.items():
            if has(pat, l_code) and not has(pat, b_code):
                res.append(k)
        return res

    def _ast_patterns_python(self, code: Optional[str]) -> List[str]:
        if not code:
            return []
        try:
            tree = ast.parse(code)
        except Exception:
            return []
        pats = []
        if any(isinstance(n, ast.With) for n in ast.walk(tree)):
            pats.append("with_statement")
        if any(isinstance(n, ast.AsyncFunctionDef) for n in ast.walk(tree)):
            pats.append("async_function")
        if any(isinstance(n, (ast.ListComp, ast.SetComp, ast.DictComp, ast.GeneratorExp)) for n in ast.walk(tree)):
            pats.append("comprehension")
        return pats

    # ---------------- Main analysis ----------------
    def run(self) -> Tuple[pd.DataFrame, pd.DataFrame, Dict[str, float]]:
        all_rows: List[Dict[str, Any]] = []

        cluster_files = [p for p in self.clusters_dir.glob("cluster_*.json")]
        logger.info(f"Found {len(cluster_files)} cluster files")

        for cpath in cluster_files:
            cluster = cpath.stem.replace("cluster_", "")
            # Filtra cluster di debug/test
            if any(skip_pattern in cpath.name.lower() for skip_pattern in [
                'with_metrics', 'debug_', 'focused_', 'bad_entries', 'test_'
            ]):
                continue

            if "_with_metrics" in cluster or "debug_" in cluster or "bad_entries" in cluster:
                continue
            cluster_json = _read_json(cpath)
            base_runs = self._collect_base_runs(cluster)
            llm_runs = self._collect_llm_runs(cluster)
            logger.info(f"Cluster {cluster}: base entries={len(base_runs)} llm entries={len(llm_runs)}")

            # Precompute medians for base entries
            base_medians: Dict[str, PerfAgg] = {eid: self._aggregate_medians(series) for eid, series in base_runs.items()}

            # Iterate over cluster content
            for lang, entries in cluster_json.items():
                for entry in entries:
                    eid = entry.get("id")
                    base_perf = base_medians.get(eid)
                    if base_perf is None:
                        continue

                    base_code_path = entry.get("codeSnippetFilePath", "")
                    if entry.get("language") in ("c", "cpp") and entry.get("filename"):
                        base_code_path = f"{base_code_path}/{entry['filename']}"
                    if base_code_path and "dataset" not in base_code_path:
                        base_code_path = str(self.dataset_dir / base_code_path)
                    base_code = self._read_code(base_code_path)

                    for llm in entry.get("LLMs", []):
                        llm_type = llm.get("type", "unknown")
                        pv = llm.get("promptVersion") or llm.get("prompt_version")
                        if not pv:
                            pv = re.search(r"v(\w+)", llm.get("path", "") or "")
                            pv = f"v{pv.group(1)}" if pv else "vNA"
                        key = f"{eid}::{llm_type}::{pv}"
                        agg = llm_runs.get(key)
                        if not agg:
                            continue
                        llm_perf = self._aggregate_medians(agg)

                        # Improvements
                        impr_time = self._improvement_pct(base_perf.time, llm_perf.time)
                        impr_cpu = self._improvement_pct(base_perf.cpu, llm_perf.cpu)
                        impr_ram = self._improvement_pct(base_perf.ram, llm_perf.ram)

                        # Weighted overall
                        #_weights = {"time": 0.5, "cpu": 0.3, "ram": 0.2}
                        parts = [(impr_time, 0.5), (impr_cpu, 0.3), (impr_ram, 0.2)]
                        wsum = sum(w for v, w in parts if v is not None)
                        overall = sum(v * w for v, w in parts if v is not None) / wsum if wsum > 0 else None

                        llm_code = self._read_code(agg.get("path"))

                        # Patterns
                        tpatterns = self._textual_patterns(lang, base_code or "", llm_code or "")
                        ast_metrics_base: Optional[ASTMetrics] = None
                        ast_metrics_llm: Optional[ASTMetrics] = None
                        ast_pats = []
                        if lang.lower() == "python":
                            ast_metrics_base = self._python_ast_metrics(base_code)
                            ast_metrics_llm = self._python_ast_metrics(llm_code)
                            ast_pats = self._ast_patterns_python(llm_code)

                        # Row
                        row: Dict[str, Any] = {
                            "cluster": cluster,
                            "language": lang,
                            "id": eid,
                            "llm_type": llm_type,
                            "prompt_version": pv,
                            "similarity_index": agg.get("similarity_index"),
                            "impr_time_pct": impr_time,
                            "impr_cpu_pct": impr_cpu,
                            "impr_ram_pct": impr_ram,
                            "overall_improvement": overall,
                            "llm_path": agg.get("path"),
                            "base_path": base_code_path,
                        }

                        for p in tpatterns + ast_pats:
                            row[f"pattern_{p}"] = True

                        if ast_metrics_base and ast_metrics_llm:
                            row.update({
                                "base_node_count": ast_metrics_base.node_count,
                                "llm_node_count": ast_metrics_llm.node_count,
                                "base_function_count": ast_metrics_base.function_count,
                                "llm_function_count": ast_metrics_llm.function_count,
                                "base_depth": ast_metrics_base.depth,
                                "llm_depth": ast_metrics_llm.depth,
                                "base_cyclomatic": ast_metrics_base.cyclomatic,
                                "llm_cyclomatic": ast_metrics_llm.cyclomatic,
                                "base_halstead_volume": ast_metrics_base.halstead_volume,
                                "llm_halstead_volume": ast_metrics_llm.halstead_volume,
                            })

                        all_rows.append(row)

        df = pd.DataFrame(all_rows)
        if df.empty:
            logger.warning("No data aggregated. Check inputs.")
            return df, df, {}

        # Fill pattern booleans
        for c in [c for c in df.columns if c.startswith("pattern_")]:
            df[c] = df[c].fillna(False).astype(bool)

        # Candidate selection
        def is_candidate(r):
            s = r.get("similarity_index")
            o = r.get("overall_improvement")
            return (
                s is not None and 0 <= s <= 100 and s < self.SIM_T and
                (o is not None and o >= self.IMPR_T)
            )

        df["is_candidate"] = df.apply(is_candidate, axis=1)
        # Top percentile based on reasonable values
        if df["overall_improvement"].notna().any():
            valid = df["overall_improvement"].clip(MIN_IMPROVEMENT_CLAMP, MAX_IMPROVEMENT_CLAMP)
            cutoff = valid.quantile(self.TOP_P)
            df["is_top_percentile"] = df["overall_improvement"].ge(cutoff)
        else:
            df["is_top_percentile"] = False
        df["selected"] = df["is_candidate"] | df["is_top_percentile"]
        selected = df[df["selected"]].copy()

        # Pattern frequencies
        pattern_cols = [c for c in df.columns if c.startswith("pattern_")]
        pattern_counts = {c.replace("pattern_", ""): int(df[c].sum()) for c in pattern_cols}

        # Correlations
        corr_table = self._compute_correlations(df)

        # Regression
        reg_summary = self._multivariate_regression(df)

        # Plots
        self._plot_pattern_counts(pattern_counts)
        self._plot_similarity_vs_improvement(df)
        self._plot_pattern_correlation_heatmap(corr_table)

        # Exports
        df.to_csv(self.reports_dir / "all_entries_v3.csv", index=False)
        selected.to_csv(self.reports_dir / "selected_entries_v3.csv", index=False)
        with open(self.reports_dir / "correlations_v3.json", "w", encoding="utf-8") as f:
            json.dump(corr_table, f, indent=2)
        with open(self.reports_dir / "regression_v3.json", "w", encoding="utf-8") as f:
            json.dump(reg_summary, f, indent=2)

        # Report
        self._write_report(df, pattern_counts, corr_table, reg_summary)

        return df, selected, pattern_counts

    # ---------------- Stats helpers ----------------
    def _compute_correlations(self, df: pd.DataFrame) -> Dict[str, Dict[str, float]]:
        out: Dict[str, Dict[str, float]] = {}
        patterns = [c for c in df.columns if c.startswith("pattern_")]
        metrics = ["impr_time_pct", "impr_cpu_pct", "impr_ram_pct", "overall_improvement"]
        for p in patterns:
            out_p: Dict[str, float] = {}
            x = df[p].astype(int)
            for m in metrics:
                y = df[m]
                y = y[y.between(MIN_IMPROVEMENT_CLAMP, MAX_IMPROVEMENT_CLAMP, inclusive="both")]
                idx = x.index.intersection(y.index)
                if len(idx) < 5:
                    continue
                try:
                    r, _ = stats.pearsonr(x.loc[idx], y.loc[idx])
                    rs, _ = stats.spearmanr(x.loc[idx], y.loc[idx])
                    out_p[f"pearson_{m}"] = float(r)
                    out_p[f"spearman_{m}"] = float(rs)
                except Exception:
                    continue
            if out_p:
                out[p.replace("pattern_", "")] = out_p
        return out

    def _multivariate_regression(self, df: pd.DataFrame) -> Dict[str, Any]:
        y = df["overall_improvement"].astype(float).replace([np.inf, -np.inf], np.nan).dropna()
        pattern_cols = [c for c in df.columns if c.startswith("pattern_")]
        if len(pattern_cols) == 0 or len(y) < 10:
            return {}
        X = df.loc[y.index, pattern_cols].astype(int)
        # Add intercept
        X_mat = np.column_stack([np.ones(len(X))] + [X[c].values for c in pattern_cols])
        y_vec = y.values
        try:
            beta, _, _, _ = np.linalg.lstsq(X_mat, y_vec, rcond=None)
            y_hat = X_mat @ beta
            ss_res = float(np.sum((y_vec - y_hat) ** 2))
            ss_tot = float(np.sum((y_vec - np.mean(y_vec)) ** 2))
            r2 = 1.0 - ss_res / ss_tot if ss_tot > 0 else 0.0
            coefs = {"intercept": float(beta[0])}
            for i, c in enumerate(pattern_cols, start=1):
                coefs[c.replace("pattern_", "")] = float(beta[i])
            return {"r2": r2, "coefficients": coefs, "n": int(len(y))}
        except Exception as e:
            logger.warning(f"Regression failed: {e}")
            return {}

    # ---------------- Plots ----------------
    def _maybe_save_pdf(self, base: Path):
        if self.save_pdf:
            plt.savefig(base.with_suffix(".pdf"), bbox_inches="tight")

    def _plot_pattern_counts(self, counts: Dict[str, int]):
        if not counts:
            return
        top = dict(sorted(counts.items(), key=lambda x: x[1], reverse=True)[:20])
        fig, ax = plt.subplots(figsize=(12, max(5, len(top) * 0.4)))
        y = list(top.keys())
        v = list(top.values())
        ax.barh(y, v, color="#4E79A7", alpha=0.85)
        ax.set_xlabel("Occurrences")
        ax.set_title("Top Patterns Introduced by LLMs")
        for i, val in enumerate(v):
            ax.text(val + max(v) * 0.01, i, str(val), va="center")
        plt.tight_layout()
        plt.savefig(self.PATH_PATTERN_COUNTS, dpi=300, bbox_inches="tight")
        self._maybe_save_pdf(self.PATH_PATTERN_COUNTS)
        plt.close()

    def _plot_similarity_vs_improvement(self, df: pd.DataFrame):
        d = df.dropna(subset=["similarity_index", "overall_improvement"]).copy()
        if d.empty:
            return
        d = d[(d["overall_improvement"].between(MIN_IMPROVEMENT_CLAMP, MAX_IMPROVEMENT_CLAMP)) & (d["similarity_index"].between(0, 100))]
        fig, ax = plt.subplots(figsize=(10, 7))
        colors = {"openAI": "#FF6B6B", "claude": "#4ECDC4", "gemini": "#45B7D1"}
        for llm_type, grp in d.groupby("llm_type"):
            ax.scatter(grp["similarity_index"], grp["overall_improvement"], s=35,
                       alpha=0.7, label=f"{llm_type} (n={len(grp)})", color=colors.get(llm_type, "gray"))
        ax.axvline(self.SIM_T, ls="--", c="red", label=f"Similarity < {self.SIM_T}")
        ax.axhline(self.IMPR_T, ls="--", c="orange", label=f"Improvement >= {self.IMPR_T}%")
        ax.set_xlabel("Code Similarity Index (%)")
        ax.set_ylabel("Overall Improvement (%)")
        ax.set_title("Similarity vs Overall Improvement")
        ax.legend(loc="best")
        ax.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig(self.PATH_SIM_VS_IMPR, dpi=300, bbox_inches="tight")
        self._maybe_save_pdf(self.PATH_SIM_VS_IMPR)
        plt.close()

    def _plot_pattern_correlation_heatmap(self, corr: Dict[str, Dict[str, float]]):
        if not corr:
            return
        pats = list(corr.keys())
        mets = ["pearson_impr_time_pct", "pearson_impr_cpu_pct", "pearson_impr_ram_pct", "pearson_overall_improvement",
                "spearman_impr_time_pct", "spearman_impr_cpu_pct", "spearman_impr_ram_pct", "spearman_overall_improvement"]
        # Build matrix with missing filled as 0
        mat = np.zeros((len(pats), len(mets)))
        for i, p in enumerate(pats):
            for j, m in enumerate(mets):
                mat[i, j] = corr.get(p, {}).get(m, 0.0)
        fig, ax = plt.subplots(figsize=(12, max(6, len(pats) * 0.35)))
        im = ax.imshow(mat, cmap="RdBu_r", vmin=-1, vmax=1, aspect="auto")
        ax.set_xticks(range(len(mets)))
        ax.set_yticks(range(len(pats)))
        ax.set_xticklabels([m.replace("pearson_", "P:").replace("spearman_", "S:").replace("impr_", "").replace("_pct", "") for m in mets], rotation=45, ha="right")
        ax.set_yticklabels(pats)
        for i in range(len(pats)):
            for j in range(len(mets)):
                v = mat[i, j]
                ax.text(j, i, f"{v:.2f}", ha="center", va="center", color=("white" if abs(v) > 0.5 else "black"), fontsize=8)
        plt.colorbar(im, ax=ax, label="Correlation")
        ax.set_title("Pattern vs Performance Correlations (Pearson/Spearman)")
        plt.tight_layout()
        plt.savefig(self.PATH_PATTERN_CORR, dpi=300, bbox_inches="tight")
        self._maybe_save_pdf(self.PATH_PATTERN_CORR)
        plt.close()

    # ---------------- Report ----------------
    def _write_report(self, df: pd.DataFrame, pattern_counts: Dict[str, int], corr: Dict[str, Dict[str, float]], reg: Dict[str, Any]):
        lines: List[str] = []
        lines.append("# Pattern Analyzer v3 - Report")
        lines.append("")
        lines.append("## Dataset")
        lines.append(f"Entries analyzed: {len(df)}")
        lines.append(f"Selected (candidates or top percentile): {int(df.get('selected', pd.Series(dtype=bool)).sum())}")
        lines.append("")
        lines.append("## Improvement formula")
        lines.append("Lower-is-better metrics (CPU, RAM, time): (base - llm) / base * 100. If base==0, improvement is undefined and omitted. Medians over 5 runs are used.")
        lines.append("")
        lines.append("## Detected patterns")
        lines.append("Patterns are detected via language-aware regex and Python AST when available.")
        lines.append("")
        if pattern_counts:
            lines.append("Top patterns:")
            for k, v in sorted(pattern_counts.items(), key=lambda x: x[1], reverse=True)[:20]:
                lines.append(f"- {k}: {v}")
            lines.append("")
        lines.append("### Pattern definitions (subset)")
        lines.extend([
            "- arrow_function: JS/TS => syntax",
            "- list_comprehension: Python [x for ...]",
            "- generator_expression: Python (x for ...)",
            "- async_await: async def/await (Py) or async/await (JS/TS)",
            "- memoization: presence of memo/cache constructs (heuristic)",
            "- optional_chaining: JS/TS ?. operator",
            "- with_statement: Python context manager",
            "- comprehension: any Python list/dict/set/generator comprehension",
            "- in_place_ops: operators like +=, -=, *=, /=",
        ])
        lines.append("")
        lines.append("## Correlations")
        lines.append("We compute Pearson and Spearman correlations between pattern presence (binary) and improvements.")
        if corr:
            top = sorted(((p, d.get("pearson_overall_improvement", 0.0)) for p, d in corr.items()), key=lambda x: abs(x[1]), reverse=True)[:10]
            lines.append("Top patterns by |Pearson(overall_improvement)|:")
            for p, v in top:
                lines.append(f"- {p}: {v:+.3f}")
        lines.append("")
        lines.append("## Multivariate regression")
        if reg:
            lines.append(f"R^2: {reg.get('r2', 0.0):.3f} (n={reg.get('n')})")
            lines.append("Coefficients (impact on overall improvement, ceteris paribus):")
            for k, v in reg.get("coefficients", {}).items():
                lines.append(f"- {k}: {v:+.3f}")
        else:
            lines.append("Insufficient data for regression.")
        lines.append("")
        lines.append("## Figures")
        lines.append("- pattern_counts.png")
        lines.append("- pattern_performance_correlation.png")
        lines.append("- similarity_vs_improvement.png")
        lines.append("")

        self.PATH_REPORT_MD.write_text("\n".join(lines), encoding="utf-8")


def _build_argparser():
    import argparse
    ap = argparse.ArgumentParser(description="Pattern Analyzer v3")
    ap.add_argument("--outdir", type=str, default="", help="Output directory for reports")
    ap.add_argument("--similarity-threshold", type=float, default=SIMILARITY_THRESHOLD_DEFAULT)
    ap.add_argument("--improvement-threshold", type=float, default=IMPROVEMENT_THRESHOLD_DEFAULT)
    ap.add_argument("--top-percentile", type=float, default=TOP_PERCENTILE_DEFAULT)
    ap.add_argument("--save-pdf", action="store_true", help="Also save figures as PDF")
    return ap


def main():
    ap = _build_argparser()
    args = ap.parse_args()
    outdir = Path(args.outdir) if args.outdir else None
    analyzer = PatternAnalyzerV3(outdir=outdir,
                                 sim_threshold=args.similarity_threshold,
                                 impr_threshold=args.improvement_threshold,
                                 top_percentile=args.top_percentile,
                                 save_pdf=args.save_pdf)
    df, selected, pcounts = analyzer.run()
    print(f"Total entries: {len(df)} | Selected: {len(selected)} | Patterns: {len([k for k,v in pcounts.items() if v>0])}")
    print(f"Outputs in: {analyzer.reports_dir}")


if __name__ == "__main__":
    main()


