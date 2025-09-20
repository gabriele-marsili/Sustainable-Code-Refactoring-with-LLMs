import sys
import os
import json
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rapidfuzz import fuzz
import warnings
warnings.filterwarnings('ignore')

# Assuming the utility_paths import works in your environment
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402

@dataclass
class SimilarityMetrics:
    """Container for similarity metrics between two LLM outputs"""
    fuzzy_ratio: float
    fuzzy_partial: float
    fuzzy_token_sort: float
    cosine_similarity: float
    average_similarity: float
    
@dataclass
class PerformanceMetrics:
    """Container for performance metrics from test execution"""
    execution_time_ms: Optional[float]
    cpu_usage: Optional[float]
    ram_usage: Optional[float]
    regression_test_passed: bool
    success_rate: float  # Percentage of successful test runs (0-100)

@dataclass
class BaselineMetrics:
    """Container for baseline performance metrics"""
    execution_time_ms: Optional[float]
    cpu_usage: Optional[float]
    ram_usage: Optional[float]
    success_rate: float

@dataclass
class LLMComparison:
    """Container for comparison between LLM outputs"""
    entry_id: str
    language: str
    cluster_name: str
    llm_pair: Tuple[str, str]
    similarity_metrics: SimilarityMetrics
    performance_metrics: Dict[str, PerformanceMetrics]  # key: llm_type
    baseline_metrics: Optional[BaselineMetrics]
    performance_improvement: Dict[str, float]  # improvement over baseline
    performance_similarity: float  # how similar the performance improvements are


class LLMAnalyzer:
    def __init__(self):
        self.clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        self.output_dir = utility_paths.OUTPUT_DIR_FILEPATH
        self.dataset_dir = utility_paths.DATASET_DIR
        
        # Initialize containers for analysis results
        self.comparisons: List[LLMComparison] = []
        self.baseline_cache: Dict[str, BaselineMetrics] = {}
        
    def read_json_file(self, path: Path) -> dict:
        """Read JSON file safely"""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading {path}: {e}")
            return {}
    
    def read_code_file(self, path: Path) -> str:
        """Read code file safely"""
        try:
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        except Exception as e:
            print(f"Error reading code file {path}: {e}")
            return ""
    
    def calculate_similarity_metrics(self, code1: str, code2: str) -> SimilarityMetrics:
        """Calculate comprehensive similarity metrics between two code snippets"""
        if not code1 or not code2:
            return SimilarityMetrics(0, 0, 0, 0, 0)
        
        # Fuzzy string matching metrics
        fuzzy_ratio = fuzz.ratio(code1, code2)
        fuzzy_partial = fuzz.partial_ratio(code1, code2)
        fuzzy_token_sort = fuzz. token_sort_ratio(code1, code2)
        
        # Cosine similarity using TF-IDF
        try:
            vectorizer = TfidfVectorizer(token_pattern=r"(?u)\b\w+\b")
            tfidf = vectorizer.fit_transform([code1, code2])
            cosine_sim = cosine_similarity(tfidf[0], tfidf[1])[0][0] * 100
        except Exception:
            cosine_sim = 0
        
        # Average similarity
        avg_sim = np.mean([fuzzy_ratio, fuzzy_partial, fuzzy_token_sort, cosine_sim])
        
        return SimilarityMetrics(
            fuzzy_ratio=fuzzy_ratio,
            fuzzy_partial=fuzzy_partial,
            fuzzy_token_sort=fuzzy_token_sort,
            cosine_similarity=cosine_sim,
            average_similarity=avg_sim
        )
    
    def extract_performance_metrics(self, results: List[dict]) -> PerformanceMetrics:
        """Extract and aggregate performance metrics from multiple test runs"""
        if not results:
            return PerformanceMetrics(None, None, None, False, 0.0)
        
        # Filter valid results
        passed_key = 'regrationTestPassed' if 'regrationTestPassed' in results[0] else 'regressionTestPassed'
        valid_results = [r for r in results if r.get(passed_key) is not None]
        
        if not valid_results:
            return PerformanceMetrics(None, None, None, False, 0.0)
        
        # Calculate success rate (percentage of runs that passed regression test)
        success_count = sum(1 for r in valid_results if r.get('regrationTestPassed', False))
        success_rate = (success_count / len(valid_results)) * 100
        
        # Calculate averages for successful runs only
        successful_runs = [r for r in valid_results if r.get('regrationTestPassed', False)]
        
        if successful_runs:
            exec_times = [r.get('execution_time_ms') for r in successful_runs if r.get('execution_time_ms') is not None]
            cpu_usages = [r.get('CPU_usage') for r in successful_runs if r.get('CPU_usage') is not None]
            ram_usages = [r.get('RAM_usage') for r in successful_runs if r.get('RAM_usage') is not None]
            
            avg_exec_time = np.mean(exec_times) if exec_times else None
            avg_cpu = np.mean(cpu_usages) if cpu_usages else None
            avg_ram = np.mean(ram_usages) if ram_usages else None
        else:
            avg_exec_time = avg_cpu = avg_ram = None
        
        return PerformanceMetrics(
            execution_time_ms=avg_exec_time,
            cpu_usage=avg_cpu,
            ram_usage=avg_ram,
            regression_test_passed=success_rate > 0,
            success_rate=success_rate
        )
    
    def load_baseline_performance(self, cluster_name: str, entry_id: str) -> Optional[BaselineMetrics]:
        """Load baseline performance for comparison"""
        if entry_id in self.baseline_cache:
            return self.baseline_cache[entry_id]
        
        cluster_base = cluster_name.replace('.json', '').replace("cluster_", "")
        baseline_results = []
        
        # Look for baseline result files (without version suffix)
        for i in range(1, 6):
            result_file = f"{cluster_base}_results_{i}.json"
            result_path = self.output_dir / result_file
            
            if result_path.exists():
                data = self.read_json_file(result_path)
                
                # Extract baseline results for this specific entry
                for _lang, entries in data.get('results', {}).items():
                    for entry in entries:
                        if entry.get('id') == entry_id:
                            # Check if this entry has baseline data (no LLM_results or direct metrics)
                            if 'LLM_results' not in entry and any(key in entry for key in ['execution_time_ms', 'CPU_usage', 'RAM_usage']):
                                baseline_results.append(entry)
        
        if baseline_results:
            baseline_perf = self.extract_performance_metrics(baseline_results)
            baseline_metrics = BaselineMetrics(
                execution_time_ms=baseline_perf.execution_time_ms,
                cpu_usage=baseline_perf.cpu_usage,
                ram_usage=baseline_perf.ram_usage,
                success_rate=baseline_perf.success_rate
            )
            self.baseline_cache[entry_id] = baseline_metrics
            return baseline_metrics
        
        return None
    
    def load_performance_results(self, cluster_name: str, entry_id: str, version: str = "v4") -> Dict[str, List[dict]]:
        """Load performance results for all LLM types and execution runs"""
        results = {}
        
        cluster_base = cluster_name.replace('.json', '').replace("cluster_", "")
        
        # Look for result files
        for i in range(1, 6):  # 5 execution runs
            result_file = f"{cluster_base}_results_{version}_{i}.json"
            result_path = self.output_dir / result_file
            
            if result_path.exists():
                data = self.read_json_file(result_path)
                
                # Extract results for this specific entry
                for _lang, entries in data.get('results', {}).items():
                    for entry in entries:
                        if entry.get('id') == entry_id:
                            for llm_result in entry.get('LLM_results', []):
                                llm_type = llm_result.get('LLM_type')
                                if llm_type:
                                    if llm_type not in results:
                                        results[llm_type] = []
                                    results[llm_type].append(llm_result)
        
        return results
    
    def calculate_delta_metrics(self, perf1: PerformanceMetrics, perf2: PerformanceMetrics, 
                               baseline: Optional[BaselineMetrics]) -> Dict[str, float]:
        """Calculate delta metrics vs baseline for both models and their differences"""
        if baseline is None:
            return {'missing_baseline': True}
        
        deltas = {}
        
        # Calculate delta for each model vs baseline
        for i, perf in enumerate([perf1, perf2], 1):
            model_deltas = {}
            
            # Success rate delta
            if perf.success_rate is not None and baseline.success_rate is not None:
                model_deltas['success_rate'] = perf.success_rate - baseline.success_rate
            
            # Execution time delta (negative = improvement)
            if perf.execution_time_ms is not None and baseline.execution_time_ms is not None:
                model_deltas['exec_time'] = perf.execution_time_ms - baseline.execution_time_ms
            
            # CPU delta (negative = improvement)
            if perf.cpu_usage is not None and baseline.cpu_usage is not None:
                model_deltas['cpu'] = perf.cpu_usage - baseline.cpu_usage
            
            # RAM delta (negative = improvement)
            if perf.ram_usage is not None and baseline.ram_usage is not None:
                model_deltas['ram'] = perf.ram_usage - baseline.ram_usage
            
            deltas[f'model{i}'] = model_deltas
        
        # Calculate differences between model deltas
        if 'model1' in deltas and 'model2' in deltas:
            delta_differences = {}
            for metric in ['success_rate', 'exec_time', 'cpu', 'ram']:
                if metric in deltas['model1'] and metric in deltas['model2']:
                    # Absolute difference between the two model's deltas
                    delta_differences[f'{metric}_delta_diff'] = abs(deltas['model1'][metric] - deltas['model2'][metric])
            
            deltas['delta_differences'] = delta_differences
        
        return deltas
    
    def calculate_performance_similarity(self, perf1: PerformanceMetrics, perf2: PerformanceMetrics, 
                                       baseline: Optional[BaselineMetrics]) -> Tuple[float, Dict[str, float]]:
        """Calculate delta metrics between models and baseline"""
        delta_metrics = self.calculate_delta_metrics(perf1, perf2, baseline)
        
        if 'missing_baseline' in delta_metrics:
            return 0.0, delta_metrics
        
        # Return average performance similarity (lower delta differences = higher similarity)
        if 'delta_differences' in delta_metrics:
            # Convert delta differences to similarity (lower difference = higher similarity)
            similarities = []
            for metric_diff in delta_metrics['delta_differences'].values():
                # Normalize difference to similarity (arbitrary scaling, can be adjusted)
                similarity = max(0, 100 - metric_diff)  # Simple linear scaling
                similarities.append(similarity)
            
            performance_similarity = np.mean(similarities) if similarities else 0
        else:
            performance_similarity = 0
        
        return performance_similarity, delta_metrics
    
    def analyze_cluster(self, cluster_name: str):
        """Analyze a single cluster for LLM similarities and performance"""
        cluster_path = self.clusters_dir / cluster_name
        if not cluster_path.exists():
            print(f"Cluster file not found: {cluster_path}")
            return
        
        cluster_data = self.read_json_file(cluster_path)
        print(f"Analyzing cluster: {cluster_name}")
        
        for language, entries in cluster_data.items():
            for entry in entries:
                entry_id = entry.get('id')
                if not entry_id:
                    continue
                
                # Get LLM files for version 4
                llm_files = {}
                for llm_data in entry.get('LLMs', []):
                    if 'v4' in llm_data.get('filename', ''):
                        llm_type = llm_data.get('type')
                        llm_path = llm_data.get('path', '')
                        llm_path = llm_path.split('dataset/')[1] if 'dataset/' in llm_path else llm_path
                        llm_path = llm_path.lstrip('/')
                        llm_path = self.dataset_dir / llm_path
                        
                        if llm_path.exists():
                            llm_files[llm_type] = {
                                'path': llm_path,
                                'code': self.read_code_file(llm_path)
                            }
                
                if len(llm_files) < 2:
                    continue
                
                # Load performance results and baseline
                performance_results = self.load_performance_results(cluster_name, entry_id)
                baseline_metrics = self.load_baseline_performance(cluster_name, entry_id)
                
                # Compare each pair of LLMs
                llm_types = list(llm_files.keys())
                for i in range(len(llm_types)):
                    for j in range(i + 1, len(llm_types)):
                        llm1, llm2 = llm_types[i], llm_types[j]
                        
                        # Calculate code similarity
                        similarity = self.calculate_similarity_metrics(
                            llm_files[llm1]['code'],
                            llm_files[llm2]['code']
                        )
                        
                        # Extract performance metrics
                        perf_metrics = {}
                        for llm_type in [llm1, llm2]:
                            if llm_type in performance_results:
                                perf_metrics[llm_type] = self.extract_performance_metrics(
                                    performance_results[llm_type]
                                )
                            else:
                                perf_metrics[llm_type] = PerformanceMetrics(None, None, None, False, 0.0)
                        
                        # Calculate performance similarity and delta metrics
                        perf_similarity, delta_metrics = self.calculate_performance_similarity(
                            perf_metrics[llm1], perf_metrics[llm2], baseline_metrics
                        )

                        
                        # Create comparison object
                        comparison = LLMComparison(
                            entry_id=entry_id,
                            language=language,
                            cluster_name=cluster_name,
                            llm_pair=(llm1, llm2),
                            similarity_metrics=similarity,
                            performance_metrics=perf_metrics,
                            baseline_metrics=baseline_metrics,
                            performance_improvement=delta_metrics,
                            performance_similarity=perf_similarity  # Not used in new approach
                        )
                        
                        self.comparisons.append(comparison)
    
    def analyze_all_clusters(self):
        """Analyze all clusters in the dataset"""
        cluster_files = [f for f in os.listdir(self.clusters_dir) 
                        if f.endswith('.json') and not any(skip in f for skip in 
                        ['.test', 'with_metrics', 'debug_', 'focused_', 'bad_entries'])]
        
        print(f"Found {len(cluster_files)} clusters to analyze")
        
        for i, cluster_file in enumerate(cluster_files, 1):
            print(f"Progress: {i}/{len(cluster_files)} ({i/len(cluster_files)*100:.1f}%)")
            self.analyze_cluster(cluster_file)
    
    def create_similarity_analysis(self) -> pd.DataFrame:
        """Create DataFrame for similarity analysis with delta metrics"""
        data = []
        
        for comp in self.comparisons:
            sim = comp.similarity_metrics
            
            # Get performance data
            perf_data = {}
            for llm_type, perf in comp.performance_metrics.items():
                perf_data[f"{llm_type}_success_rate"] = perf.success_rate
                perf_data[f"{llm_type}_exec_time"] = perf.execution_time_ms
                perf_data[f"{llm_type}_cpu"] = perf.cpu_usage
                perf_data[f"{llm_type}_ram"] = perf.ram_usage
            
            # Get delta metrics data
            delta_data = {}
            if isinstance(comp.performance_improvement, dict) and 'model1' in comp.performance_improvement:
                # Model 1 deltas
                if 'model1' in comp.performance_improvement:
                    for metric, value in comp.performance_improvement['model1'].items():
                        delta_data[f"delta_{metric}_model1"] = value
                
                # Model 2 deltas  
                if 'model2' in comp.performance_improvement:
                    for metric, value in comp.performance_improvement['model2'].items():
                        delta_data[f"delta_{metric}_model2"] = value
                
                # Delta differences
                if 'delta_differences' in comp.performance_improvement:
                    for metric, value in comp.performance_improvement['delta_differences'].items():
                        delta_data[metric] = value
            
            row = {
                'entry_id': comp.entry_id,
                'language': comp.language,
                'cluster': comp.cluster_name,
                'llm_pair': f"{comp.llm_pair[0]}_vs_{comp.llm_pair[1]}",
                'llm1': comp.llm_pair[0],
                'llm2': comp.llm_pair[1],
                'fuzzy_ratio': sim.fuzzy_ratio,
                'fuzzy_partial': sim.fuzzy_partial,
                'fuzzy_token_sort': sim.fuzzy_token_sort,
                'cosine_similarity': sim.cosine_similarity,
                'average_similarity': sim.average_similarity,
                'has_baseline': comp.baseline_metrics is not None,
                **perf_data,
                **delta_data
            }
            data.append(row)
        
        return pd.DataFrame(data)
    
    def create_individual_visualizations(self, df: pd.DataFrame):
        """Create individual visualization files focused on the main research question"""
        plt.style.use('default')
        
        # 1. MAIN RESEARCH QUESTION: Code Similarity vs Delta Metrics Differences
        metrics = ['success_rate', 'exec_time', 'cpu', 'ram']
        
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        axes = axes.flatten()
        
        for i, metric in enumerate(metrics):
            delta_diff_col = f"{metric}_delta_diff"
            if delta_diff_col in df.columns:
                valid_data = df[(df[delta_diff_col].notna()) & (df['average_similarity'].notna())]
                
                if len(valid_data) > 5:
                    axes[i].scatter(valid_data['average_similarity'], valid_data[delta_diff_col], alpha=0.6)
                    
                    # Add trend line
                    z = np.polyfit(valid_data['average_similarity'], valid_data[delta_diff_col], 1)
                    p = np.poly1d(z)
                    axes[i].plot(valid_data['average_similarity'], p(valid_data['average_similarity']), 
                                "r--", alpha=0.8)
                    
                    # Calculate correlation
                    corr_coeff, p_value = stats.pearsonr(valid_data['average_similarity'], valid_data[delta_diff_col])
                    
                    axes[i].set_xlabel('Code Similarity (%)')
                    axes[i].set_ylabel(f'{metric.replace("_", " ").title()} Delta Difference')
                    axes[i].set_title(f'{metric.replace("_", " ").title()}: r={corr_coeff:.3f}, p={p_value:.3f}')
                    axes[i].grid(True, alpha=0.3)
                else:
                    axes[i].text(0.5, 0.5, f'Insufficient data for {metric}', 
                                ha='center', va='center', transform=axes[i].transAxes)
                    axes[i].set_title(f'{metric.replace("_", " ").title()}: No data')
        
        plt.suptitle('MAIN ANALYSIS: Does Code Similarity Correlate with Similar Performance Changes?\n' + 
                    '(Lower Y values = more similar performance changes)', fontsize=16)
        plt.tight_layout()
        plt.savefig('01_code_similarity_vs_delta_differences.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 2. Similarity Distribution
        plt.figure(figsize=(12, 8))
        similarity_cols = ['fuzzy_ratio', 'fuzzy_partial', 'fuzzy_token_sort', 'cosine_similarity']
        
        for i, col in enumerate(similarity_cols):
            plt.subplot(2, 2, i+1)
            plt.hist(df[col].dropna(), bins=20, alpha=0.7, edgecolor='black')
            plt.axvline(df[col].mean(), color='red', linestyle='--', 
                       label=f'Mean: {df[col].mean():.1f}%')
            plt.xlabel('Similarity Score (%)')
            plt.ylabel('Frequency')
            plt.title(f'{col.replace("_", " ").title()}')
            plt.legend()
            plt.grid(True, alpha=0.3)
        
        plt.suptitle('Distribution of Code Similarity Metrics', fontsize=16)
        plt.tight_layout()
        plt.savefig('02_similarity_distribution.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 3. Similarity by LLM Pair
        plt.figure(figsize=(14, 8))
        
        pair_stats = df.groupby('llm_pair').agg({
            'average_similarity': ['mean', 'std', 'count']
        }).round(2)
        
        pair_means = pair_stats[('average_similarity', 'mean')].sort_values(ascending=True)
        pair_stds = pair_stats[('average_similarity', 'std')].reindex(pair_means.index)
        
        bars = plt.barh(range(len(pair_means)), pair_means.values)
        plt.errorbar(pair_means.values, range(len(pair_means)), 
                    xerr=pair_stds.values, fmt='none', color='black', alpha=0.7)
        
        plt.yticks(range(len(pair_means)), pair_means.index)
        plt.xlabel('Average Code Similarity (%)')
        plt.title('Code Similarity by LLM Pair')
        plt.grid(True, alpha=0.3, axis='x')
        
        # Add count annotations
        for i, (bar, count) in enumerate(zip(bars, pair_stats[('average_similarity', 'count')].reindex(pair_means.index))):
            plt.text(bar.get_width() + 1, bar.get_y() + bar.get_height()/2, 
                    f'n={int(count)}', va='center', ha='left', fontsize=10)
        
        plt.tight_layout()
        plt.savefig('03_similarity_by_llm_pair.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 4. Success Rate Analysis
        plt.figure(figsize=(12, 8))
        
        success_cols = [col for col in df.columns if col.endswith('_success_rate')]
        if success_cols:
            success_data = []
            for col in success_cols:
                llm_name = col.replace('_success_rate', '')
                values = df[col].dropna()
                for val in values:
                    success_data.append({'LLM': llm_name, 'Success Rate': val})
            
            success_df = pd.DataFrame(success_data)
            
            if not success_df.empty:
                sns.boxplot(data=success_df, x='LLM', y='Success Rate')
                plt.title('Success Rate Distribution by LLM\n(Percentage of 5 test runs that passed)')
                plt.ylabel('Success Rate (%)')
                plt.xlabel('LLM Type')
                plt.ylim(0, 100)
                
                # Add mean annotations
                for i, llm in enumerate(success_df['LLM'].unique()):
                    mean_val = success_df[success_df['LLM'] == llm]['Success Rate'].mean()
                    plt.text(i, mean_val + 3, f'μ={mean_val:.1f}%', ha='center', 
                           bbox=dict(boxstyle="round", facecolor='yellow', alpha=0.7))
        
        plt.tight_layout()
        plt.savefig('04_success_rate_by_llm.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 5. Delta Metrics Analysis (replacing the confusing performance improvements)
        has_deltas = any('delta_' in col and col.endswith(('_model1', '_model2')) for col in df.columns)
        if has_deltas:
            plt.figure(figsize=(16, 12))
            
            delta_metrics = ['success_rate', 'exec_time', 'cpu', 'ram']
            
            for i, metric in enumerate(delta_metrics):
                plt.subplot(2, 2, i+1)
                
                model1_col = f"delta_{metric}_model1"
                model2_col = f"delta_{metric}_model2"
                
                if model1_col in df.columns and model2_col in df.columns:
                    data_m1 = df[model1_col].dropna()
                    data_m2 = df[model2_col].dropna()
                    
                    if len(data_m1) > 0 and len(data_m2) > 0:
                        plt.hist([data_m1, data_m2], label=['Model 1', 'Model 2'], 
                                alpha=0.7, bins=20)
                        plt.axvline(0, color='red', linestyle='--', alpha=0.7, label='Baseline')
                        plt.xlabel(f'{metric.replace("_", " ").title()} Delta')
                        plt.ylabel('Frequency')
                        plt.title(f'{metric.replace("_", " ").title()} Changes vs Baseline')
                        plt.legend()
                        plt.grid(True, alpha=0.3)
            
            plt.suptitle('Performance Changes vs Baseline\n(Negative = improvement for exec_time, cpu, ram)', fontsize=16)
            plt.tight_layout()
            plt.savefig('05_delta_metrics_distribution.png', dpi=300, bbox_inches='tight')
            plt.close()
        
        # 6. Language-specific Similarity Analysis (reintrodotta)
        plt.figure(figsize=(12, 8))
        
        lang_stats = df.groupby('language').agg({
            'average_similarity': ['mean', 'std', 'count']
        }).round(2)
        
        lang_means = lang_stats[('average_similarity', 'mean')].sort_values(ascending=False)
        lang_stds = lang_stats[('average_similarity', 'std')].reindex(lang_means.index)
        
        bars = plt.bar(range(len(lang_means)), lang_means.values)
        plt.errorbar(range(len(lang_means)), lang_means.values, 
                    yerr=lang_stds.values, fmt='none', color='black', alpha=0.7)
        
        plt.xticks(range(len(lang_means)), lang_means.index, rotation=45)
        plt.ylabel('Average Code Similarity (%)')
        plt.title('Code Similarity by Programming Language')
        plt.grid(True, alpha=0.3, axis='y')
        
        # Add count annotations
        for i, (bar, count) in enumerate(zip(bars, lang_stats[('average_similarity', 'count')].reindex(lang_means.index))):
            plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1, 
                    f'n={int(count)}', ha='center', va='bottom', fontsize=10)
        
        plt.tight_layout()
        plt.savefig('06_similarity_by_language.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # 7. Heatmap: Language vs LLM Pair Similarity (reintrodotta e migliorata)
        plt.figure(figsize=(14, 8))
        
        pivot_data = df.pivot_table(values='average_similarity', 
                                  index='language', 
                                  columns='llm_pair', 
                                  aggfunc='mean')
        
        if not pivot_data.empty:
            sns.heatmap(pivot_data, annot=True, fmt='.1f', cmap='YlOrRd', 
                       cbar_kws={'label': 'Average Code Similarity (%)'})
            plt.title('Code Similarity Heatmap: Language vs LLM Pair\n(Shows which LLM pairs are most similar in each language)')
            plt.xlabel('LLM Pair')
            plt.ylabel('Programming Language')
            plt.xticks(rotation=45)
        
        plt.tight_layout()
        plt.savefig('07_language_llm_similarity_heatmap.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        print("Individual visualization files created:")
        print("- 01_code_similarity_vs_delta_differences.png (MAIN RESEARCH QUESTION)")
        print("- 02_similarity_distribution.png")
        print("- 03_similarity_by_llm_pair.png") 
        print("- 04_success_rate_by_llm.png")
        print("- 05_delta_metrics_distribution.png")
        print("- 06_similarity_by_language.png")
        print("- 07_language_llm_similarity_heatmap.png")
    
    def generate_focused_statistical_report(self, df: pd.DataFrame):
        """Generate statistical report focused on the delta metrics correlation"""
        print("\n" + "="*80)
        print("FOCUSED ANALYSIS: CODE SIMILARITY vs PERFORMANCE DELTA CORRELATION")
        print("="*80)
        
        # Basic dataset info
        print(f"\nDATASET OVERVIEW:")
        print(f"Total LLM pair comparisons: {len(df)}")
        print(f"Programming languages: {', '.join(sorted(df['language'].unique()))}")
        print(f"Clusters analyzed: {df['cluster'].nunique()}")
        print(f"Unique entries: {df['entry_id'].nunique()}")
        print(f"Entries with baseline data: {df['has_baseline'].sum()}")
        
        # Main research question analysis
        print(f"\nMAIN RESEARCH QUESTION:")
        print("Does code similarity between LLMs correlate with similar performance changes?")
        print("Formula: delta_metrica_X_modello1 - delta_metrica_X_modello2")
        print("Where: delta_metrica_X_modelloN = metrica_X_modelloN - metrica_X_baseline")
        print("-" * 70)
        
        metrics = ['success_rate', 'exec_time', 'cpu', 'ram']
        correlations_found = False
        
        for metric in metrics:
            delta_diff_col = f"{metric}_delta_diff"
            if delta_diff_col in df.columns:
                valid_data = df[(df[delta_diff_col].notna()) & (df['average_similarity'].notna())]
                
                if len(valid_data) > 5:
                    correlations_found = True
                    corr_coeff, p_value = stats.pearsonr(valid_data['average_similarity'], valid_data[delta_diff_col])
                    
                    print(f"\n{metric.replace('_', ' ').upper()} ANALYSIS:")
                    print(f"  Valid comparisons: {len(valid_data)}")
                    print(f"  Correlation coefficient: r = {corr_coeff:.3f}")
                    print(f"  P-value: p = {p_value:.3f}")
                    
                    # Interpretation
                    if p_value < 0.001:
                        significance = "highly significant (p < 0.001)"
                    elif p_value < 0.01:
                        significance = "significant (p < 0.01)" 
                    elif p_value < 0.05:
                        significance = "significant (p < 0.05)"
                    else:
                        significance = "not significant (p ≥ 0.05)"
                    
                    if abs(corr_coeff) > 0.7:
                        strength = "strong"
                    elif abs(corr_coeff) > 0.5:
                        strength = "moderate"
                    elif abs(corr_coeff) > 0.3:
                        strength = "weak to moderate"
                    else:
                        strength = "weak"
                    
                    direction = "negative" if corr_coeff < 0 else "positive"
                    
                    print(f"  Interpretation: {strength} {direction} correlation, {significance}")
                    
                    if corr_coeff < -0.3 and p_value < 0.05:
                        print(f"  ✓ FINDING: More similar code → smaller performance differences")
                    elif corr_coeff > 0.3 and p_value < 0.05:
                        print(f"  ✗ SURPRISING: More similar code → larger performance differences")
                    else:
                        print(f"  ~ NEUTRAL: No strong evidence of correlation")
                        
                    # Statistics of the delta differences
                    print(f"  Delta difference stats: {valid_data[delta_diff_col].mean():.2f} ± {valid_data[delta_diff_col].std():.2f}")
                else:
                    print(f"\n{metric.replace('_', ' ').upper()}: Insufficient data ({len(valid_data)} comparisons)")
        
        if not correlations_found:
            print("\n⚠️  WARNING: No sufficient data found for correlation analysis.")
            print("   Check if baseline performance data is available in your results files.")
        
        # Code similarity statistics
        print(f"\nCODE SIMILARITY STATISTICS:")
        print("-" * 30)
        similarity_cols = ['fuzzy_ratio', 'fuzzy_partial', 'fuzzy_token_sort', 'cosine_similarity', 'average_similarity']
        for col in similarity_cols:
            if col in df.columns:
                mean_val = df[col].mean()
                std_val = df[col].std()
                print(f"{col}: {mean_val:.1f}% ± {std_val:.1f}%")
        
        # LLM pair similarity ranking
        print(f"\nLLM PAIR SIMILARITY RANKING:")
        print("-" * 30)
        
        pair_stats = df.groupby('llm_pair').agg({
            'average_similarity': ['mean', 'std', 'count']
        }).round(1)
        
        pair_ranking = pair_stats[('average_similarity', 'mean')].sort_values(ascending=False)
        
        print("Most similar pairs:")
        for i, (pair, similarity) in enumerate(pair_ranking.head(3).items()):
            count = pair_stats.loc[pair, ('average_similarity', 'count')]
            std = pair_stats.loc[pair, ('average_similarity', 'std')]
            print(f"  {i+1}. {pair}: {similarity:.1f}% ± {std:.1f}% (n={int(count)})")
        
        print("\nLeast similar pairs:")
        for i, (pair, similarity) in enumerate(pair_ranking.tail(3).items()):
            count = pair_stats.loc[pair, ('average_similarity', 'count')]
            std = pair_stats.loc[pair, ('average_similarity', 'std')]
            print(f"  {i+1}. {pair}: {similarity:.1f}% ± {std:.1f}% (n={int(count)})")
        
        # Language-specific analysis
        print(f"\nLANGUAGE-SPECIFIC ANALYSIS:")
        print("-" * 30)
        
        lang_stats = df.groupby('language').agg({
            'average_similarity': ['mean', 'std', 'count']
        }).round(1)
        
        lang_ranking = lang_stats[('average_similarity', 'mean')].sort_values(ascending=False)
        
        for lang, similarity in lang_ranking.items():
            count = lang_stats.loc[lang, ('average_similarity', 'count')]
            std = lang_stats.loc[lang, ('average_similarity', 'std')]
            print(f"{lang}: {similarity:.1f}% ± {std:.1f}% (n={int(count)})")
        
        # Success rate analysis
        print(f"\nSUCCESS RATE ANALYSIS:")
        print("(Percentage of 5 test runs that passed regression tests)")
        print("-" * 50)
        
        success_cols = [col for col in df.columns if col.endswith('_success_rate')]
        for col in success_cols:
            if col in df.columns:
                llm_name = col.replace('_success_rate', '')
                values = df[col].dropna()
                if len(values) > 0:
                    mean_success = values.mean()
                    std_success = values.std()
                    print(f"{llm_name}: {mean_success:.1f}% ± {std_success:.1f}% (n={len(values)})")
        
        print("\n" + "="*80)
    
    def save_results(self, df: pd.DataFrame):
        """Save detailed results focused on delta metrics correlation"""
        # Save main DataFrame
        df.to_csv('llm_delta_analysis_detailed.csv', index=False)
        
        # Create focused summary for delta correlations
        summary = {
            'research_question': 'Does code similarity between LLMs correlate with similar performance changes vs baseline?',
            'formula': 'delta_diff = |delta_model1 - delta_model2| where delta_modelN = metricN - baseline_metric',
            'dataset_stats': {
                'total_comparisons': len(df),
                'languages': sorted(df['language'].unique()),
                'llm_pairs': sorted(df['llm_pair'].unique()),
                'clusters': df['cluster'].nunique(),
                'entries': df['entry_id'].nunique(),
                'entries_with_baseline': int(df['has_baseline'].sum())
            },
            'similarity_stats': {
                'code_similarity_mean': float(df['average_similarity'].mean()),
                'code_similarity_std': float(df['average_similarity'].std())
            },
            'correlation_analysis': {},
            'llm_pair_ranking': df.groupby('llm_pair')['average_similarity'].mean().sort_values(ascending=False).to_dict(),
            'language_ranking': df.groupby('language')['average_similarity'].mean().sort_values(ascending=False).to_dict()
        }
        
        # Add correlation analysis for each metric
        metrics = ['success_rate', 'exec_time', 'cpu', 'ram']
        for metric in metrics:
            delta_diff_col = f"{metric}_delta_diff"
            if delta_diff_col in df.columns:
                valid_data = df[(df[delta_diff_col].notna()) & (df['average_similarity'].notna())]
                
                if len(valid_data) > 5:
                    corr_coeff, p_value = stats.pearsonr(valid_data['average_similarity'], valid_data[delta_diff_col])
                    summary['correlation_analysis'][metric] = {
                        'correlation_coefficient': float(corr_coeff),
                        'p_value': float(p_value),
                        'significant': p_value < 0.05,
                        'sample_size': len(valid_data),
                        'interpretation': 'negative_correlation_good' if corr_coeff < -0.3 and p_value < 0.05 else 'no_strong_correlation'
                    }
        
        # Save summary
        with open('llm_delta_correlation_summary.json', 'w') as f:
            json.dump(summary, f, indent=2, default=str)
        
        # Save correlation data for further analysis
        correlation_cols = ['entry_id', 'language', 'llm_pair', 'average_similarity', 'has_baseline']
        delta_diff_cols = [col for col in df.columns if col.endswith('_delta_diff')]
        
        if delta_diff_cols:
            correlation_data = df[correlation_cols + delta_diff_cols].copy()
            correlation_data = correlation_data.dropna()
            correlation_data.to_csv('code_similarity_vs_delta_differences.csv', index=False)
        
        print(f"\nResults saved to:")
        print(f"- llm_delta_analysis_detailed.csv (full dataset)")
        print(f"- llm_delta_correlation_summary.json (focused summary)")
        if delta_diff_cols:
            print(f"- code_similarity_vs_delta_differences.csv (correlation data)")
    
    def run_complete_analysis(self):
        """Run the complete focused analysis pipeline"""
        print("Starting focused LLM similarity and performance delta correlation analysis...")
        print("Research Question: Do LLMs with similar code have similar performance changes vs baseline?")
        
        # Analyze all clusters
        self.analyze_all_clusters()
        
        if not self.comparisons:
            print("No comparisons found. Check your data paths and file structure.")
            return None
        
        # Create analysis DataFrame
        df = self.create_similarity_analysis()
        print(f"\nCreated analysis DataFrame with {len(df)} comparisons")
        
        # Generate individual visualizations
        print("\nCreating individual visualization files...")
        self.create_individual_visualizations(df)
        
        # Generate focused statistical report
        self.generate_focused_statistical_report(df)
        
        # Save results
        self.save_results(df)
        
        print("\nFocused analysis complete!")
        print("\nKey findings will be in:")
        print("1. 01_code_similarity_vs_delta_differences.png - Main research question visualization")
        print("2. llm_delta_correlation_summary.json - Statistical summary")
        print("3. Individual PNG files for each aspect of the analysis")
        
        return df



if __name__ == "__main__" :
    analyzer = LLMAnalyzer()
    results_df = analyzer.run_complete_analysis()