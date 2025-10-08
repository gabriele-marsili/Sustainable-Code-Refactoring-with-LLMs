"""
Cross-Cluster Statistics Aggregator
Aggrega e confronta statistiche attraverso tutti i cluster analizzati.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths, general_utils
from exec_metrics_config import ExecMetricsAnalysisConfig
import numpy as np
from typing import Dict
import logging
import matplotlib.pyplot as plt
from collections import defaultdict


class CrossClusterAggregator:
    """Aggrega statistiche attraverso tutti i cluster."""
    
    def __init__(self, config: ExecMetricsAnalysisConfig = None):
        self.logger = logging.getLogger(__name__)
        self.config = config or ExecMetricsAnalysisConfig()
        
        self.stats_dir = utility_paths.METRICS_DIR_FILEPATH / "execution_stats"
        self.output_dir = utility_paths.METRICS_DIR_FILEPATH / "cross_cluster_analysis"
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    def load_all_objective_stats(self, objective: str) -> Dict:
        """Carica tutte le statistiche per un obiettivo specifico."""
        stats_file = self.stats_dir / f"{objective}_stats.json"
        
        if not stats_file.exists():
            self.logger.warning(f"Stats file not found: {stats_file}")
            return {}
        
        return general_utils.read_json(stats_file)
    
    def aggregate_objective_1_cross_cluster(self) -> Dict:
        """
        Aggrega Obiettivo 1 attraverso tutti i cluster.
        Calcola statistiche globali per versione del prompt.
        """
        self.logger.info("Aggregating Objective 1 across clusters")
        
        all_stats = self.load_all_objective_stats("objective_1")
        
        # Aggregate by prompt version across all clusters
        aggregated = defaultdict(lambda: defaultdict(list))
        
        for cluster_name, cluster_stats in all_stats.items():
            # Base code
            base_data = cluster_stats.get("base", {})
            for metric, values in base_data.items():
                if values:
                    aggregated["base"][metric].extend(values)
            
            # Prompt versions
            prompt_versions = cluster_stats.get("prompt_versions", {})
            for version, version_data in prompt_versions.items():
                for metric, values in version_data.items():
                    if values:
                        aggregated[version][metric].extend(values)
        
        # Calculate summary statistics
        summary = {}
        for version, metrics in aggregated.items():
            summary[version] = {}
            for metric, values in metrics.items():
                if values:
                    summary[version][metric] = {
                        "mean": float(np.mean(values)),
                        "median": float(np.median(values)),
                        "std": float(np.std(values)),
                        "min": float(np.min(values)),
                        "max": float(np.max(values)),
                        "count": len(values)
                    }
        
        return {
            "raw_data": dict(aggregated),
            "summary": summary,
            "num_clusters": len(all_stats)
        }
    
    def aggregate_objective_2_cross_cluster(self) -> Dict:
        """
        Aggrega Obiettivo 2 attraverso tutti i cluster.
        Calcola statistiche globali per linguaggio.
        """
        self.logger.info("Aggregating Objective 2 across clusters")
        
        all_stats = self.load_all_objective_stats("objective_2")
        
        # Aggregate by language
        base_aggregated = defaultdict(lambda: defaultdict(list))
        llm_aggregated = defaultdict(lambda: defaultdict(list))
        
        for cluster_name, cluster_stats in all_stats.items():
            # Base code by language
            base_by_lang = cluster_stats.get("base_by_language", {})
            for language, metrics in base_by_lang.items():
                for metric, values in metrics.items():
                    if values:
                        base_aggregated[language][metric].extend(values)
            
            # LLM code by language
            llm_by_lang = cluster_stats.get("llm_by_language", {})
            for language, metrics in llm_by_lang.items():
                for metric, values in metrics.items():
                    if values:
                        llm_aggregated[language][metric].extend(values)
        
        # Calculate summary statistics
        base_summary = self._calculate_language_summary(base_aggregated)
        llm_summary = self._calculate_language_summary(llm_aggregated)
        
        return {
            "base": {
                "raw_data": dict(base_aggregated),
                "summary": base_summary
            },
            "llm": {
                "raw_data": dict(llm_aggregated),
                "summary": llm_summary
            },
            "num_clusters": len(all_stats)
        }
    
    def aggregate_objective_3_cross_cluster(self) -> Dict:
        """
        Aggrega Obiettivo 3 attraverso tutti i cluster.
        Calcola statistiche globali per modello + versione.
        """
        self.logger.info("Aggregating Objective 3 across clusters")
        
        all_stats = self.load_all_objective_stats("objective_3")
        
        # Aggregate model+version stats
        model_version_aggregated = defaultdict(lambda: defaultdict(list))
        improvements_aggregated = defaultdict(lambda: defaultdict(list))
        
        for cluster_name, cluster_stats in all_stats.items():
            # Model + version stats
            mv_stats = cluster_stats.get("model_version_stats", {})
            for combo_key, metrics in mv_stats.items():
                for metric, values in metrics.items():
                    if values:
                        model_version_aggregated[combo_key][metric].extend(values)
            
            # Improvements
            mean_improvements = cluster_stats.get("mean_improvements", {})
            for combo_key, metrics in mean_improvements.items():
                for metric, improvement in metrics.items():
                    improvements_aggregated[combo_key][metric].append(improvement)
        
        # Calculate summary statistics
        mv_summary = {}
        for combo_key, metrics in model_version_aggregated.items():
            mv_summary[combo_key] = {}
            for metric, values in metrics.items():
                if values:
                    mv_summary[combo_key][metric] = {
                        "mean": float(np.mean(values)),
                        "median": float(np.median(values)),
                        "std": float(np.std(values)),
                        "count": len(values)
                    }
        
        # Calculate overall improvements
        improvements_summary = {}
        for combo_key, metrics in improvements_aggregated.items():
            improvements_summary[combo_key] = {}
            for metric, improvements in metrics.items():
                if improvements:
                    improvements_summary[combo_key][metric] = {
                        "mean": float(np.mean(improvements)),
                        "median": float(np.median(improvements)),
                        "std": float(np.std(improvements)),
                        "count": len(improvements)
                    }
        
        return {
            "model_version_stats": {
                "raw_data": dict(model_version_aggregated),
                "summary": mv_summary
            },
            "improvements": {
                "raw_data": dict(improvements_aggregated),
                "summary": improvements_summary
            },
            "num_clusters": len(all_stats)
        }
    
    def aggregate_objective_4_cross_cluster(self) -> Dict:
        """
        Aggrega Obiettivo 4 attraverso tutti i cluster.
        Calcola statistiche globali per linguaggio + modello.
        """
        self.logger.info("Aggregating Objective 4 across clusters")
        
        all_stats = self.load_all_objective_stats("objective_4")
        
        # Aggregate by language + model
        lang_model_aggregated = defaultdict(lambda: defaultdict(list))
        
        for cluster_name, cluster_stats in all_stats.items():
            lm_stats = cluster_stats.get("language_model_stats", {})
            for combo_key, metrics in lm_stats.items():
                for metric, values in metrics.items():
                    if values:
                        lang_model_aggregated[combo_key][metric].extend(values)
        
        # Calculate summary statistics
        summary = {}
        for combo_key, metrics in lang_model_aggregated.items():
            summary[combo_key] = {}
            for metric, values in metrics.items():
                if values:
                    summary[combo_key][metric] = {
                        "mean": float(np.mean(values)),
                        "median": float(np.median(values)),
                        "std": float(np.std(values)),
                        "count": len(values)
                    }
        
        return {
            "raw_data": dict(lang_model_aggregated),
            "summary": summary,
            "num_clusters": len(all_stats)
        }
    
    def _calculate_language_summary(self, aggregated: Dict) -> Dict:
        """Helper per calcolare summary statistics per linguaggio."""
        summary = {}
        for language, metrics in aggregated.items():
            summary[language] = {}
            for metric, values in metrics.items():
                if values:
                    summary[language][metric] = {
                        "mean": float(np.mean(values)),
                        "median": float(np.median(values)),
                        "std": float(np.std(values)),
                        "min": float(np.min(values)),
                        "max": float(np.max(values)),
                        "count": len(values)
                    }
        return summary
    
    def generate_global_rankings(self) -> Dict:
        """
        Genera rankings globali dei modelli basati sugli improvement.
        """
        self.logger.info("Generating global rankings")
        
        obj3_stats = self.aggregate_objective_3_cross_cluster()
        improvements = obj3_stats["improvements"]["summary"]
        
        # Calculate overall scores per model+version
        rankings = defaultdict(lambda: {"scores": [], "metrics": {}})
        
        for combo_key, metrics in improvements.items():
            total_score = 0
            metric_count = 0
            
            for metric, stats in metrics.items():
                improvement = stats["mean"]
                
                # Normalize improvement to score (0-100)
                if self.config.is_improvement_good(metric, improvement):
                    # Good improvement
                    score = min(100, abs(improvement))
                else:
                    # Bad improvement (penalize)
                    score = -min(100, abs(improvement))
                
                rankings[combo_key]["metrics"][metric] = {
                    "improvement": improvement,
                    "score": score
                }
                
                total_score += score
                metric_count += 1
            
            if metric_count > 0:
                rankings[combo_key]["overall_score"] = total_score / metric_count
                rankings[combo_key]["scores"].append(total_score / metric_count)
        
        # Sort by overall score
        sorted_rankings = sorted(
            rankings.items(),
            key=lambda x: x[1].get("overall_score", 0),
            reverse=True
        )
        
        return {
            "rankings": dict(sorted_rankings),
            "top_performers": sorted_rankings[:5],
            "worst_performers": sorted_rankings[-5:]
        }
    
    def visualize_global_overview(self):
        """Crea visualizzazioni di overview globale."""
        self.logger.info("Creating global overview visualizations")
        
        # 1. Overall improvement heatmap per model+version
        self._create_improvement_heatmap()
        
        # 2. Model comparison radar chart
        self._create_model_comparison_radar()
        
        # 3. Language performance comparison
        self._create_language_performance_chart()
    
    def _create_improvement_heatmap(self):
        """Crea heatmap degli improvement per modello+versione."""
        obj3_stats = self.aggregate_objective_3_cross_cluster()
        improvements = obj3_stats["improvements"]["summary"]
        
        if not improvements:
            self.logger.warning("No improvements data for heatmap")
            return
        
        # Prepare data for heatmap
        models_versions = []
        metrics_data = {metric: [] for metric in self.config.metrics.all_metrics}
        
        for combo_key in sorted(improvements.keys()):
            models_versions.append(combo_key.replace("_", " ").title())
            
            for metric in self.config.metrics.all_metrics:
                if metric in improvements[combo_key]:
                    value = improvements[combo_key][metric]["mean"]
                else:
                    value = 0
                metrics_data[metric].append(value)
        
        # Create heatmap
        fig, ax = plt.subplots(figsize=(14, 8))
        
        # Prepare matrix
        matrix = np.array([metrics_data[m] for m in self.config.metrics.all_metrics])
        
        # Plot heatmap
        im = ax.imshow(matrix, cmap='RdYlGn', aspect='auto', vmin=-50, vmax=50)
        
        # Set ticks
        ax.set_xticks(np.arange(len(models_versions)))
        ax.set_yticks(np.arange(len(self.config.metrics.all_metrics)))
        ax.set_xticklabels(models_versions, rotation=45, ha='right')
        ax.set_yticklabels([self.config.metrics.metric_labels[m] 
                           for m in self.config.metrics.all_metrics])
        
        # Add values to cells
        for i in range(len(self.config.metrics.all_metrics)):
            for j in range(len(models_versions)):
                value = matrix[i, j]
                _text = ax.text(j, i, f'{value:.1f}%',
                             ha="center", va="center",
                             color="black" if abs(value) < 25 else "white",
                             fontsize=8)
        
        ax.set_title("Mean Improvement (%) by Model+Version and Metric\nAcross All Clusters",
                    fontsize=14, fontweight='bold', pad=20)
        
        # Colorbar
        cbar = plt.colorbar(im, ax=ax)
        cbar.set_label('Improvement (%)', rotation=270, labelpad=20)
        
        plt.tight_layout()
        
        # Save
        filepath = self.output_dir / "global_improvement_heatmap.png"
        plt.savefig(filepath, dpi=300, bbox_inches='tight')
        plt.close(fig)
        
        self.logger.info(f"Saved global improvement heatmap to {filepath}")
    
    def _create_model_comparison_radar(self):
        """Crea radar chart per confronto modelli."""
        # Implementation would create a radar chart comparing models
        # across different metrics
        self.logger.info("Radar chart creation - placeholder")
    
    def _create_language_performance_chart(self):
        """Crea chart per performance per linguaggio."""
        obj2_stats = self.aggregate_objective_2_cross_cluster()
        
        # Create comparison chart
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        axes = axes.flatten()
        
        for idx, metric in enumerate(self.config.metrics.all_metrics):
            ax = axes[idx]
            
            # Extract data
            base_data = []
            llm_data = []
            languages = []
            
            base_by_lang = obj2_stats["base"]["summary"]
            llm_by_lang = obj2_stats["llm"]["summary"]
            
            for lang in sorted(set(base_by_lang.keys()) | set(llm_by_lang.keys())):
                if lang in base_by_lang and metric in base_by_lang[lang]:
                    base_mean = base_by_lang[lang][metric]["mean"]
                else:
                    base_mean = None
                
                if lang in llm_by_lang and metric in llm_by_lang[lang]:
                    llm_mean = llm_by_lang[lang][metric]["mean"]
                else:
                    llm_mean = None
                
                if base_mean is not None or llm_mean is not None:
                    languages.append(lang.upper())
                    base_data.append(base_mean if base_mean is not None else 0)
                    llm_data.append(llm_mean if llm_mean is not None else 0)
            
            # Plot
            x = np.arange(len(languages))
            width = 0.35
            
            ax.bar(x - width/2, base_data, width, label='Base Code', alpha=0.8)
            ax.bar(x + width/2, llm_data, width, label='LLM Code', alpha=0.8)
            
            ax.set_xlabel('Language', fontweight='bold')
            ax.set_ylabel(self.config.metrics.metric_labels[metric], fontweight='bold')
            ax.set_title(f'{self.config.metrics.metric_labels[metric]} by Language',
                        fontweight='bold')
            ax.set_xticks(x)
            ax.set_xticklabels(languages, rotation=45, ha='right')
            ax.legend()
            ax.grid(True, alpha=0.3, axis='y')
        
        plt.suptitle('Performance Comparison: Base vs LLM Code Across Languages',
                    fontsize=16, fontweight='bold', y=1.00)
        plt.tight_layout()
        
        # Save
        filepath = self.output_dir / "language_performance_comparison.png"
        plt.savefig(filepath, dpi=300, bbox_inches='tight')
        plt.close(fig)
        
        self.logger.info(f"Saved language performance chart to {filepath}")
    
    def aggregate_all(self) -> Dict:
        """Aggrega tutte le statistiche cross-cluster."""
        self.logger.info("Starting full cross-cluster aggregation")
        
        results = {
            "objective_1": self.aggregate_objective_1_cross_cluster(),
            "objective_2": self.aggregate_objective_2_cross_cluster(),
            "objective_3": self.aggregate_objective_3_cross_cluster(),
            "objective_4": self.aggregate_objective_4_cross_cluster(),
            "rankings": self.generate_global_rankings()
        }
        
        # Save results
        output_file = self.output_dir / "cross_cluster_aggregated_stats.json"
        general_utils.write_json(output_file, results)
        self.logger.info(f"Saved aggregated stats to {output_file}")
        
        # Create visualizations
        self.visualize_global_overview()
        
        return results


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    aggregator = CrossClusterAggregator()
    results = aggregator.aggregate_all()
    
    print("\n" + "="*80)
    print("Cross-Cluster Aggregation Complete!")
    print("="*80)
    print(f"Number of clusters processed: {results['objective_1']['num_clusters']}")
    print(f"Output directory: {aggregator.output_dir}")
    print("="*80 + "\n")