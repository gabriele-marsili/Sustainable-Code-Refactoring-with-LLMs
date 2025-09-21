#!/usr/bin/env python3
"""
- Aggrega le performance per file (media su esecuzioni).
- Calcola il miglioramento % dei file generati dagli LLM rispetto all'originale ( calcolato come (base_metric - llm_metric) / base_metric * 100 ).
- Effettua una sottoselezione, prendendo in considerazione i casi con similarity_index bassa e miglioramento alto.
- Estrae diff e pattern testuali introdotti dagli LLM.
- Salva i risultati e crea grafici in reports/.
"""

import json
import statistics
from pathlib import Path
import sys
import os
import difflib
import re
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Add parent dirs to path to find utility_dir
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402


# ---------- CONFIG ----------
SIMILARITY_THRESHOLD = 65.0   # considerati "diversi" dall'originale se < 65%
IMPROVEMENT_THRESHOLD = 10.0   # considerati "migliorati" se overall_improvement >= 10% (base rule)
TOP_PERCENTILE = 0.75         # in alternativa alla base rule: presi i top 25% per overall_improvement
WEIGHTS = {"TIME": 0.5, "CPU": 0.30, "RAM": 0.20}  # pesi per indice di miglioramento
REPORTS_DIR = utility_paths.METRICS_DIR_FILEPATH / "patterns" / "report"
DIFFS_DIR = REPORTS_DIR / "diffs"
CSV_OUT = REPORTS_DIR / "llm_improvement_candidates.csv"
PLOT_SIM_VS_IMPR = REPORTS_DIR / "similarity_vs_improvement.png"
PATTERN_BAR = REPORTS_DIR / "pattern_counts.png"
# ----------------------------

REPORTS_DIR.mkdir(parents=True, exist_ok=True)
DIFFS_DIR.mkdir(parents=True, exist_ok=True)


def read_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_mean(values):
    vals = [v for v in values if v is not None]
    return statistics.mean(vals) if vals else None


class Analyzer:
    def __init__(self):
        self.cluster_dir = utility_paths.CLUSTERS_DIR_FILEPATHz
        self.exec_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR

    def get_cluster_files(self):
        """get cluster files from cluster dir"""
        return [p for p in self.cluster_dir.glob("*.json") if "with_metrics" not in p.name and "debug_" not in p.name and "bad_entries" not in p.name]

    def get_execution_files_for_cluster(self, cluster_name: str):
        # returns list of exec files for that cluster
        # matches {clusterName}_results*.json
        return list(self.exec_dir.glob(f"{cluster_name}_results*.json"))

    def aggregate_performance(self, cluster_name: str):
        """
        Returns dict perf_avg keyed by (lang, type_or_llm_type, filename_stem)
        Each value: {"CPU": mean, "RAM": mean, "TIME": mean, "PASS_RATE": mean_bool}
        """
        perf_data = {}
        exec_files = self.get_execution_files_for_cluster(cluster_name) #get all _result files for that cluster 
        if not exec_files:
            return {}

        for ef in exec_files:
            try:
                content = read_json(ef) #result file content 
            except Exception:
                continue
            for lang, results in content.get("results", {}).items():
                for res in results: #res = entry 

                    # base case (exec of base code snippet)
                    if "LLM_results" not in res:
                        #file_path = str(res.get("base_log"))
                        #file_path = file_path.rexplace("output.log",res['filename'])
                        entry_id = res['id']
                        key = (lang, "original", entry_id)
                        rec = perf_data.setdefault(key, {"CPU": [], "RAM": [], "TIME": [], "PASS": []})
                        rec["CPU"].append(res.get("CPU_usage"))
                        rec["RAM"].append(res.get("RAM_usage"))
                        rec["TIME"].append(res.get("execution_time_ms"))
                        # regression test passed boolean -> 1/0 for average
                        rec["PASS"].append(1 if res.get("regrationTestPassed") else 0)
                    else:
                        # LLM results list
                        entry_id = res['id']
                        for llm_res in res.get("LLM_results", []):                            
                            llm_type = llm_res.get("LLM_type", "unknown")
                            path_stem = Path(llm_res.get("path", "")).stem
                            key = (lang, llm_type, path_stem)
                            rec = perf_data.setdefault(key, {"CPU": [], "RAM": [], "TIME": [], "PASS": []})
                            rec["CPU"].append(llm_res.get("CPU_usage"))
                            rec["RAM"].append(llm_res.get("RAM_usage"))
                            rec["TIME"].append(llm_res.get("execution_time_ms"))
                            rec["PASS"].append(1 if llm_res.get("regrationTestPassed") else 0)
        # compute averages safely
        perf_avg = {}
        for k, v in perf_data.items():
            cpu = safe_mean(v["CPU"])
            ram = safe_mean(v["RAM"])
            tim = safe_mean(v["TIME"])
            pass_rate = safe_mean(v["PASS"])  # 0..1 or None
            perf_avg[k] = {"CPU": cpu, "RAM": ram, "TIME": tim, "PASS_RATE": pass_rate}
        return perf_avg

    def read_code(self, path_str):
        if not path_str:
            return None
        p = Path(path_str)
        if not p.exists():
            # try relative to dataset dir
            p2 = self.dataset_dir / path_str
            if p2.exists():
                p = p2
            else:
                return None
        try:
            return p.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            return None

    def compute_improvement(self, base_value, llm_value):
        """
        Percent improvement where lower is better:
        (base - llm)/base * 100
        If base is None or zero -> return None
        """
        if base_value is None or llm_value is None:
            return None
        try:
            if base_value == 0:
                return None
            return (base_value - llm_value) / base_value * 100.0
        except Exception:
            return None

    def extract_patterns(self, language: str, base_code: str, llm_code: str):
        """
        Heuristics: regex-based features. Returns list of pattern keys that appear
        in llm_code but not in base_code.
        Extendable per language.
        """
        patterns = []

        # normalize presence check helper
        def has(pat, txt):
            return bool(re.search(pat, txt, flags=re.MULTILINE))

        b_code = base_code or ""
        l_code = llm_code or ""

        # Python patterns
        if language.lower() in ("python",):
            checks = {
                "list_comp": r"\[[^\]]+for\s+[^\]]+\]",
                "dict_comp": r"\{[^\}]+for\s+[^\}]+\}",
                "gen_exp": r"\([^\)]+for\s+[^\)]+\)",
                "fstring": r"f['\"]",
                "with_stmt": r"^\s*with\s+",
                "decorator_memo": r"@lru_cache|@functools\.lru_cache",
                "sum_builtin": r"\bsum\s*\(",
                "min_max_builtin": r"\b(min|max)\s*\(",
                "map_filter": r"\b(map|filter|reduce)\s*\(",
                "comprehension_any": r"for\s+.*in\s+.*:|for\s+.*in\s+.*\]",
                "type_hints": r"->\s*[A-Za-z_]" ,
                "recursion": r"def\s+\w+\(.*\):\s*\n\s+.*\breturn\b\s+\w+\(.*\)",
            }
            for key, pat in checks.items():
                if has(pat, l_code) and not has(pat, b_code):
                    patterns.append(key)

        # JavaScript / TypeScript patterns
        if language.lower() in ("javascript", "js", "typescript", "ts"):
            checks = {
                "arrow_fn": r"=>",
                "array_map": r"\.map\s*\(",
                "array_filter": r"\.filter\s*\(",
                "array_reduce": r"\.reduce\s*\(",
                "for_of": r"for\s*\(\s*(?:const|let|var)?\s*.*\s+of\s+",
                "async_await": r"\basync\b|\bawait\b",
                "const_let": r"\b(const|let)\b",
                "template_str": r"`[^`]*\$\{[^}]+\}[^`]*`",
            }
            for key, pat in checks.items():
                if has(pat, l_code) and not has(pat, b_code):
                    patterns.append(key)

        # Go patterns
        if language.lower() in ("go", "golang"):
            checks = {
                "range_loop": r"\brange\s+",
                "make_slice": r"\bmake\([^\)]*?\)",
                "goroutine": r"go\s+\w+\(",
                "defer": r"\bdefer\b",
            }
            for key, pat in checks.items():
                if has(pat, l_code) and not has(pat, b_code):
                    patterns.append(key)

        # C/C++/Java heuristics (very primitive)
        if language.lower() in ("java", "c", "c++", "cpp"):
            checks = {
                "streams_map": r"\.stream\(|\.map\(",
                "for_each": r"\bfor\s*\(",
                "enhanced_for": r"for\s*\(\s*[^\;]+\s*:\s*[^\)]+\)",
            }
            for key, pat in checks.items():
                if has(pat, l_code) and not has(pat, b_code):
                    patterns.append(key)

        return patterns

    def run(self):
        all_rows = []  # for final CSV
        #pattern_counter = Counter()
        #scatter_points = []  # tuples (similarity, overall_improvement, llm_type)

        # iterate clusters
        for cluster_file in self.get_cluster_files():
            cluster_name = cluster_file.stem.replace("cluster_", "").replace(".json", "")
            cluster_json = read_json(cluster_file)
            perf_avg = self.aggregate_performance(cluster_name)

            # iterate entries in cluster
            for lang, entries in cluster_json.items():
                for entry in entries:
                    # find base filename stem for key matching
                    #base_stem = Path(entry.get("filename", Path(entry.get("codeSnippetFilePath", "")).name)).stem
                    entry_id = entry['id']

                    # get base perf key
                    base_key = (lang, "original", entry_id)
                    base_perf = perf_avg.get(base_key)
                    if base_perf is None:
                        # try if original filename in codeSnippetFilePath stems
                        #alt_base_stem = Path(entry.get("codeSnippetFilePath", "")).stem
                        base_key = (lang, "original", entry_id)
                        base_perf = perf_avg.get(base_key)

                    # for each llm
                    for llm in entry.get("LLMs", []):
                        llm_type = llm.get("type", "unknown")
                        llm_stem = Path(llm.get("path", "")).stem
                        llm_key = (lang, llm_type, llm_stem)
                        llm_perf = perf_avg.get(llm_key)
                        if llm_perf is None:
                            # cannot evaluate improvement if no perf
                            continue

                        # similarity index already present in cluster metadata
                        sim_index = llm.get("similarity_index")  # percent
                        fuzzy = llm.get("fuzzy_score")
                        cosine = llm.get("cosine_similarity_score")

                        # compute per-metric percent improvements (positive = better)
                        impr_time = self.compute_improvement(base_perf.get("TIME") if base_perf else None, llm_perf.get("TIME"))
                        impr_cpu = self.compute_improvement(base_perf.get("CPU") if base_perf else None, llm_perf.get("CPU"))
                        impr_ram = self.compute_improvement(base_perf.get("RAM") if base_perf else None, llm_perf.get("RAM"))

                        # if base performance missing, skip
                        if base_perf is None:
                            continue

                        # combine improvements into an overall score (weighted)
                        comps = []
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
                                overall += (val * w)
                                wsum += w
                        overall_improvement = overall / wsum if wsum > 0 else None

                        # regression pass rates
                        base_pass = base_perf.get("PASS_RATE")
                        llm_pass = llm_perf.get("PASS_RATE")
                        # convert into percent
                        if base_pass is not None:
                            base_pass_pct = base_pass * 100.0
                        else:
                            base_pass_pct = None
                        if llm_pass is not None:
                            llm_pass_pct = llm_pass * 100.0
                        else:
                            llm_pass_pct = None

                        # benefit from test passing (if LLM makes tests pass while base failed)
                        pass_gain = None
                        if base_pass_pct is not None and llm_pass_pct is not None:
                            pass_gain = llm_pass_pct - base_pass_pct

                        # decide candidate: similarity lower than threshold AND overall_improvement above threshold
                        is_candidate = False
                        if overall_improvement is not None and sim_index is not None:
                            if sim_index < SIMILARITY_THRESHOLD and overall_improvement >= IMPROVEMENT_THRESHOLD:
                                is_candidate = True

                        # also collect top percentile later
                        all_rows.append({
                            "cluster": cluster_name,
                            "language": lang,
                            "id": entry.get("id"),
                            "base_stem": base_stem,
                            "llm_type": llm_type,
                            "prompt_version": llm.get("filename") or llm.get("prompt_version", "unknown"),
                            "similarity_index": sim_index,
                            "fuzzy": fuzzy,
                            "cosine": cosine,
                            "impr_time_pct": impr_time,
                            "impr_cpu_pct": impr_cpu,
                            "impr_ram_pct": impr_ram,
                            "overall_improvement": overall_improvement,
                            "base_pass_pct": base_pass_pct,
                            "llm_pass_pct": llm_pass_pct,
                            "pass_gain_pct": pass_gain,
                            "llm_path": llm.get("path"),
                            "base_path": entry.get("codeSnippetFilePath"),
                            "is_candidate_threshold": is_candidate
                        })

        df = pd.DataFrame(all_rows)

        # if we want top percentile instead of fixed threshold, mark top percentile
        if not df.empty:
            cutoff = df["overall_improvement"].dropna().quantile(TOP_PERCENTILE)
            df["is_top_percentile"] = df["overall_improvement"].apply(lambda v: True if v is not None and v >= cutoff else False)

        # final candidate selection: either threshold OR top percentile
        df["selected"] = df["is_candidate_threshold"] | df["is_top_percentile"].fillna(False)

        # Now for selected candidates, compute diffs and extract patterns
        selected_df = df[df["selected"] == True]
        pattern_summary = Counter()
        diff_paths = []
        for _, row in selected_df.iterrows():
            base_code = self.read_code(row["base_path"])
            llm_code = self.read_code(row["llm_path"])
            # produce unified diff and save
            try:
                base_lines = (base_code or "").splitlines(keepends=True)
                llm_lines = (llm_code or "").splitlines(keepends=True)
                diff = list(difflib.unified_diff(base_lines, llm_lines,
                                                 fromfile=f"base/{row['base_stem']}",
                                                 tofile=f"llm/{Path(row['llm_path']).stem}",
                                                 lineterm=""))
                diff_filename = DIFFS_DIR / f"{row['cluster']}_{row['language']}_{row['base_stem']}_{row['llm_type']}_{Path(row['llm_path']).stem}.diff"
                with open(diff_filename, "w", encoding="utf-8") as d_f:
                    d_f.writelines(line + ("\n" if not line.endswith("\n") else "") for line in diff)
                diff_paths.append(diff_filename)
            except Exception:
                diff = []

            # extract patterns
            patterns = self.extract_patterns(row["language"], base_code, llm_code)
            for p in patterns:
                pattern_summary[p] += 1

        # Save CSV results (selected and full)
        df.to_csv(REPORTS_DIR / "llm_improvement_all.csv", index=False)
        selected_df.to_csv(CSV_OUT, index=False)

        # Plot similarity vs improvement scatter
        if not df.empty:
            plt.figure(figsize=(9, 6))
            sns.scatterplot(data=df, x="similarity_index", y="overall_improvement", hue="llm_type", alpha=0.8)
            plt.axvline(SIMILARITY_THRESHOLD, color="grey", linestyle="--", label=f"sim thresh {SIMILARITY_THRESHOLD}%")
            plt.axhline(IMPROVEMENT_THRESHOLD, color="red", linestyle="--", label=f"impr thresh {IMPROVEMENT_THRESHOLD}%")
            plt.xlabel("Similarity Index (%)")
            plt.ylabel("Overall Improvement (%)")
            plt.title("Similarity vs Overall Improvement (all LLM entries)")
            plt.legend()
            plt.tight_layout()
            plt.savefig(PLOT_SIM_VS_IMPR)
            plt.close()

        # Plot pattern frequencies (for selected)
        if pattern_summary:
            pat_df = pd.DataFrame(pattern_summary.most_common(), columns=["pattern", "count"])
            plt.figure(figsize=(10, 6))
            sns.barplot(data=pat_df, x="count", y="pattern")
            plt.title("Pattern counts introduced by LLMs (selected candidates)")
            plt.xlabel("Count")
            plt.ylabel("Pattern")
            plt.tight_layout()
            plt.savefig(PATTERN_BAR)
            plt.close()

        # Write small summary
        summary = {
            "total_entries": len(df),
            "selected_count": len(selected_df),
            "diff_files": [str(p) for p in diff_paths],
            "pattern_counts": dict(pattern_summary)
        }
        with open(REPORTS_DIR / "summary.json", "w", encoding="utf-8") as s_f:
            json.dump(summary, s_f, indent=2)

        print("Finished. Reports saved to:", REPORTS_DIR)
        return df, selected_df, pattern_summary


if __name__ == "__main__":
    a = Analyzer()
    df_all, df_selected, patterns = a.run()
    print("Total rows:", len(df_all))
    print("Selected candidates:", len(df_selected))
    print("Top patterns:", patterns.most_common(10))
