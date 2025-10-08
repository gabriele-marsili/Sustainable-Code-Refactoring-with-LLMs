"""
Configuration file per l'analisi delle metriche di esecuzione.
Centralizza tutte le configurazioni e costanti.
"""

from dataclasses import dataclass, field
from typing import List, Dict
from pathlib import Path


@dataclass
class MetricsConfig:
    """Configurazione per le metriche."""
    
    # Metriche da analizzare
    numeric_metrics: List[str] = field(default_factory=lambda: [
        "CPU_usage",
        "RAM_usage",
        "execution_time_ms"
    ])
    
    # Metrica booleana convertita in percentuale
    pass_rate_metric: str = "pass_rate"
    
    # Tutte le metriche
    @property
    def all_metrics(self) -> List[str]:
        return self.numeric_metrics + [self.pass_rate_metric]
    
    # Labels per le metriche
    metric_labels: Dict[str, str] = field(default_factory=lambda: {
        "CPU_usage": "CPU Usage (%)",
        "RAM_usage": "RAM Usage (KB)",
        "execution_time_ms": "Execution Time (ms)",
        "pass_rate": "Pass Rate (%)"
    })
    
    # Unità di misura
    metric_units: Dict[str, str] = field(default_factory=lambda: {
        "CPU_usage": "%",
        "RAM_usage": "KB",
        "execution_time_ms": "ms",
        "pass_rate": "%"
    })
    
    # Metriche dove valori più bassi sono migliori
    lower_is_better: List[str] = field(default_factory=lambda: [
        "CPU_usage",
        "RAM_usage",
        "execution_time_ms"
    ])
    
    # Metriche dove valori più alti sono migliori
    higher_is_better: List[str] = field(default_factory=lambda: [
        "pass_rate"
    ])


@dataclass
class LLMConfig:
    """Configurazione per i modelli LLM."""
    
    # Tipi di LLM
    llm_types: List[str] = field(default_factory=lambda: [
        "openai",
        "claude",
        "gemini"
    ])
    
    # Versioni dei prompt
    prompt_versions: List[str] = field(default_factory=lambda: [
        "v1", "v2", "v3", "v4"
    ])
    
    # Nomi display per LLM
    llm_display_names: Dict[str, str] = field(default_factory=lambda: {
        "openai": "OpenAI",
        "claude": "Claude",
        "gemini": "Gemini"
    })
    
    # Colori per LLM
    llm_colors: Dict[str, str] = field(default_factory=lambda: {
        "base": "#2ecc71",      # Verde
        "openai": "#3498db",    # Blu
        "claude": "#9b59b6",    # Viola
        "gemini": "#e74c3c"     # Rosso
    })


@dataclass
class LanguageConfig:
    """Configurazione per i linguaggi di programmazione."""
    
    # Linguaggi supportati
    languages: List[str] = field(default_factory=lambda: [
        "c",
        "c++",
        "go",
        "java",
        "python",
        "javascript",
        "typescript"
    ])
    
    # Nomi display per linguaggi
    language_display_names: Dict[str, str] = field(default_factory=lambda: {
        "c": "C",
        "c++": "C++",
        "go": "Go",
        "java": "Java",
        "python": "Python",
        "javascript": "JavaScript",
        "typescript": "TypeScript"
    })
    
    # Colori per linguaggi (per visualizzazioni future)
    language_colors: Dict[str, str] = field(default_factory=lambda: {
        "c": "#A8B9CC",
        "c++": "#F34B7D",
        "go": "#00ADD8",
        "java": "#B07219",
        "python": "#3572A5",
        "javascript": "#F1E05A",
        "typescript": "#2B7489"
    })


@dataclass
class ExecutionConfig:
    """Configurazione per le esecuzioni."""
    
    # Numero di esecuzioni per ogni test
    num_executions: int = 5
    
    # Timeout per esecuzione (secondi)
    execution_timeout: int = 300
    
    # File naming patterns
    base_results_pattern: str = "{cluster}_results_{exec_num}.json"
    llm_results_pattern: str = "{cluster}_results_{version}_{exec_num}.json"


@dataclass
class VisualizationConfig:
    """Configurazione per le visualizzazioni."""
    
    # Figure size defaults
    figure_sizes: Dict[str, tuple] = field(default_factory=lambda: {
        "objective_1": (14, 6),
        "objective_2": (14, 6),
        "objective_3": (20, 7),
        "objective_4": (20, 7)
    })
    
    # DPI per export
    export_dpi: int = 300
    
    # Stile matplotlib/seaborn
    plot_style: str = "whitegrid"
    color_palette: str = "husl"
    
    # Font sizes
    title_fontsize: int = 14
    label_fontsize: int = 12
    tick_fontsize: int = 10
    annotation_fontsize: int = 8
    
    # Box plot settings
    show_means: bool = True
    show_outliers: bool = True
    box_alpha: float = 0.7
    
    # Grid settings
    grid_alpha: float = 0.3
    
    # Improvement annotation colors
    improvement_colors: Dict[str, str] = field(default_factory=lambda: {
        "good": "green",
        "bad": "red",
        "neutral": "gray"
    })


@dataclass
class StatisticsConfig:
    """Configurazione per i calcoli statistici."""
    
    # Soglie per considerare un improvement significativo (%)
    significance_thresholds: Dict[str, float] = field(default_factory=lambda: {
        "CPU_usage": 5.0,
        "RAM_usage": 10.0,
        "execution_time_ms": 10.0,
        "pass_rate": 5.0
    })
    
    # Metodo per calcolare la media (mean, median, trimmed_mean)
    aggregation_method: str = "mean"
    
    # Percentile per trimmed mean
    trim_percentile: float = 0.1
    
    # Confidence interval level
    confidence_level: float = 0.95
    
    # Outlier detection method (IQR, Z-score)
    outlier_method: str = "IQR"
    outlier_iqr_multiplier: float = 1.5
    outlier_z_threshold: float = 3.0


@dataclass
class OutputConfig:
    """Configurazione per gli output."""
    
    # Formati di export
    export_formats: List[str] = field(default_factory=lambda: [
        "png", "pdf"
    ])
    
    # Salva anche statistiche intermedie
    save_intermediate_stats: bool = True
    
    # Comprimi file JSON output
    compress_json: bool = False
    
    # Genera report markdown
    generate_markdown_report: bool = True
    
    # Genera report HTML
    generate_html_report: bool = False


class ExecMetricsAnalysisConfig:
    """Configurazione globale per l'analisi."""
    
    def __init__(self):
        self.metrics = MetricsConfig()
        self.llm = LLMConfig()
        self.language = LanguageConfig()
        self.execution = ExecutionConfig()
        self.visualization = VisualizationConfig()
        self.statistics = StatisticsConfig()
        self.output = OutputConfig()
    
    def get_base_results_filename(self, cluster: str, exec_num: int) -> str:
        """Genera il nome del file per i risultati base."""
        return self.execution.base_results_pattern.format(
            cluster=cluster,
            exec_num=exec_num
        )
    
    def get_llm_results_filename(self, cluster: str, version: str, exec_num: int) -> str:
        """Genera il nome del file per i risultati LLM."""
        return self.execution.llm_results_pattern.format(
            cluster=cluster,
            version=version,
            exec_num=exec_num
        )
    
    def is_improvement_good(self, metric: str, improvement: float) -> bool:
        """
        Determina se un improvement è positivo o negativo.
        
        Args:
            metric: Nome della metrica
            improvement: Valore dell'improvement (%)
        
        Returns:
            True se l'improvement è positivo
        """
        if metric in self.metrics.lower_is_better:
            # Per metriche "lower is better", improvement negativo è buono
            return improvement < 0
        elif metric in self.metrics.higher_is_better:
            # Per metriche "higher is better", improvement positivo è buono
            return improvement > 0
        else:
            return False
    
    def is_improvement_significant(self, metric: str, improvement: float) -> bool:
        """
        Determina se un improvement è statisticamente significativo.
        
        Args:
            metric: Nome della metrica
            improvement: Valore dell'improvement (%)
        
        Returns:
            True se l'improvement supera la soglia di significatività
        """
        threshold = self.statistics.significance_thresholds.get(metric, 5.0)
        return abs(improvement) > threshold
    
    def get_improvement_category(self, metric: str, improvement: float) -> str:
        """
        Categorizza un improvement.
        
        Returns:
            "good", "bad", o "neutral"
        """
        if not self.is_improvement_significant(metric, improvement):
            return "neutral"
        
        return "good" if self.is_improvement_good(metric, improvement) else "bad"
    
    def to_dict(self) -> Dict:
        """Esporta la configurazione come dizionario."""
        return {
            "metrics": {
                "numeric_metrics": self.metrics.numeric_metrics,
                "pass_rate_metric": self.metrics.pass_rate_metric,
                "metric_labels": self.metrics.metric_labels,
                "metric_units": self.metrics.metric_units
            },
            "llm": {
                "llm_types": self.llm.llm_types,
                "prompt_versions": self.llm.prompt_versions,
                "llm_display_names": self.llm.llm_display_names
            },
            "language": {
                "languages": self.language.languages,
                "language_display_names": self.language.language_display_names
            },
            "execution": {
                "num_executions": self.execution.num_executions,
                "execution_timeout": self.execution.execution_timeout
            },
            "visualization": {
                "export_dpi": self.visualization.export_dpi,
                "plot_style": self.visualization.plot_style
            },
            "statistics": {
                "significance_thresholds": self.statistics.significance_thresholds,
                "aggregation_method": self.statistics.aggregation_method
            }
        }
    
    def save_config(self, filepath: Path):
        """Salva la configurazione su file."""
        import json
        with open(filepath, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
    
    @classmethod
    def load_config(cls, filepath: Path) -> "ExecMetricsAnalysisConfig":
        """Carica la configurazione da file."""
        import json
        config = cls()
        
        if filepath.exists():
            with open(filepath, 'r') as f:
                _data = json.load(f)
                # Update config with loaded data
                # (implementazione opzionale per override dei valori default)
        
        return config


# Istanza globale della configurazione
default_config = ExecMetricsAnalysisConfig()


if __name__ == "__main__":
    # Test della configurazione
    config = ExecMetricsAnalysisConfig()
    
    print("=== Metrics Configuration ===")
    print(f"Numeric metrics: {config.metrics.numeric_metrics}")
    print(f"Pass rate metric: {config.metrics.pass_rate_metric}")
    print(f"All metrics: {config.metrics.all_metrics}")
    
    print("\n=== LLM Configuration ===")
    print(f"LLM types: {config.llm.llm_types}")
    print(f"Prompt versions: {config.llm.prompt_versions}")
    
    print("\n=== Test Improvement Evaluation ===")
    test_cases = [
        ("CPU_usage", -20.0),      # Good
        ("CPU_usage", 15.0),        # Bad
        ("pass_rate", 10.0),        # Good
        ("pass_rate", -5.0),        # Bad
        ("execution_time_ms", -2.0) # Neutral (below threshold)
    ]
    
    for metric, improvement in test_cases:
        is_good = config.is_improvement_good(metric, improvement)
        is_significant = config.is_improvement_significant(metric, improvement)
        category = config.get_improvement_category(metric, improvement)
        
        print(f"{metric}: {improvement:+.1f}% -> {category.upper()} "
              f"(good={is_good}, significant={is_significant})")
    
    print("\n=== File Naming ===")
    print(f"Base: {config.get_base_results_filename('accumulate', 1)}")
    print(f"LLM: {config.get_llm_results_filename('accumulate', 'v2', 3)}")