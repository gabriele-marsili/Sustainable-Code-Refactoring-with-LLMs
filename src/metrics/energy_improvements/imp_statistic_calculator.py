"""
Calcola statistiche sugli improvements basandosi sui dati in ./clusters_improvements_data

Questo modulo fornisce funzionalità statistiche avanzate per analizzare i miglioramenti energetici
ottenuti dalle diverse versioni di LLM sui vari cluster di codice.

Autore: Sistema di analisi statistica per refactoring sostenibile
"""

import json
from dataclasses import dataclass, field, asdict
from typing import Dict, List, Tuple
from pathlib import Path
import logging
from collections import defaultdict
import numpy as np
from scipy import stats as scipy_stats

# Configurazione logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# DATACLASSES PER STRUTTURA DATI
# ============================================================================

@dataclass
class MetricImprovementData:
    """Dati dettagliati di miglioramento per una singola metrica"""
    improvement_percentage: float
    label: str  # "reduction", "degradation", "invalid"
    is_outlier: bool
    base_value: float
    llm_value: float

    def is_valid(self) -> bool:
        """Verifica se il dato è valido"""
        return self.improvement_percentage != -999 and self.label != "invalid"


@dataclass
class ImprovementData:
    """Dati di miglioramento per una combinazione LLM-prompt"""
    LLM_successfully_exec_quantity: int
    LLM_exec_quantity: int
    language: str
    CPU_usage: MetricImprovementData
    RAM_usage: MetricImprovementData
    execution_time_ms: MetricImprovementData
    regressionTestPassed: float

    def is_valid_improvement(self) -> bool:
        """Verifica se il miglioramento è valido"""
        return (
            self.CPU_usage.is_valid() and
            self.RAM_usage.is_valid() and
            self.execution_time_ms.is_valid()
        )

    def is_successful(self) -> bool:
        """Verifica se l'esecuzione è stata completamente di successo"""
        return self.LLM_successfully_exec_quantity == self.LLM_exec_quantity

    def has_outliers(self) -> bool:
        """Verifica se almeno una metrica è un outlier"""
        return (
            self.CPU_usage.is_outlier or
            self.RAM_usage.is_outlier or
            self.execution_time_ms.is_outlier
        )


# ============================================================================
# DATACLASSES PER STATISTICHE
# ============================================================================

@dataclass
class MetricStatistics:
    """Statistiche descrittive per una metrica specifica"""
    count: int
    mean: float
    median: float
    std: float
    min: float
    max: float
    q1: float  # Primo quartile
    q3: float  # Terzo quartile
    iqr: float  # Interquartile range
    
    # Statistiche aggiuntive per improvements
    reduction_count: int = 0
    degradation_count: int = 0
    outlier_count: int = 0

    @classmethod
    def from_values(cls, values: List[float], labels: List[str] = None, 
                    outliers: List[bool] = None) -> 'MetricStatistics':
        """Crea statistiche da lista di valori"""
        if not values:
            return cls(0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)

        arr = np.array(values)
        q1, median, q3 = np.percentile(arr, [25, 50, 75])

        # Conta reduction e degradation
        reduction_count = sum(1 for v in values if v < 0) if values else 0
        degradation_count = sum(1 for v in values if v >= 0) if values else 0
        outlier_count = sum(outliers) if outliers else 0

        return cls(
            count=len(values),
            mean=float(np.mean(arr)),
            median=float(median),
            std=float(np.std(arr, ddof=1)) if len(values) > 1 else 0.0,
            min=float(np.min(arr)),
            max=float(np.max(arr)),
            q1=float(q1),
            q3=float(q3),
            iqr=float(q3 - q1),
            reduction_count=reduction_count,
            degradation_count=degradation_count,
            outlier_count=outlier_count
        )


@dataclass
class ComprehensiveStatistics:
    """Statistiche complete per tutti i miglioramenti"""
    CPU_usage: MetricStatistics
    RAM_usage: MetricStatistics
    execution_time_ms: MetricStatistics
    regressionTestPassed: MetricStatistics

    # Metriche aggregate
    total_entries: int
    valid_entries: int
    invalid_entries: int
    outlier_entries: int

    # Distribuzione per categoria
    by_language: Dict[str, 'LanguageStatistics'] = field(default_factory=dict)
    by_llm: Dict[str, 'LLMStatistics'] = field(default_factory=dict)
    by_prompt: Dict[str, 'PromptStatistics'] = field(default_factory=dict)


@dataclass
class LanguageStatistics:
    """Statistiche aggregate per linguaggio"""
    language: str
    count: int
    avg_CPU_improvement: float
    avg_RAM_improvement: float
    avg_time_improvement: float
    avg_test_pass_rate: float
    best_llm: str
    best_prompt: str
    
    # Dettagli aggiuntivi
    cpu_reduction_rate: float = 0.0
    ram_reduction_rate: float = 0.0
    time_reduction_rate: float = 0.0


@dataclass
class LLMStatistics:
    """Statistiche aggregate per LLM"""
    llm_name: str
    count: int
    avg_CPU_improvement: float
    avg_RAM_improvement: float
    avg_time_improvement: float
    avg_test_pass_rate: float
    best_prompt: str
    success_rate: float
    
    # Dettagli aggiuntivi
    cpu_reduction_rate: float = 0.0
    ram_reduction_rate: float = 0.0
    time_reduction_rate: float = 0.0
    outlier_rate: float = 0.0


@dataclass
class PromptStatistics:
    """Statistiche aggregate per versione di prompt"""
    prompt_version: str
    count: int
    avg_CPU_improvement: float
    avg_RAM_improvement: float
    avg_time_improvement: float
    avg_test_pass_rate: float
    best_llm: str
    
    # Dettagli aggiuntivi
    cpu_reduction_rate: float = 0.0
    ram_reduction_rate: float = 0.0
    time_reduction_rate: float = 0.0


# ============================================================================
# CLASSE PRINCIPALE PER CALCOLO STATISTICHE
# ============================================================================

class ImprovementStatisticsCalculator:
    """
    Calcolatore principale per statistiche sugli improvements.

    Fornisce analisi statistiche complete su:
    - Miglioramenti per metrica (CPU, RAM, tempo, test pass rate)
    - Distribuzione per linguaggio di programmazione
    - Performance per LLM
    - Efficacia per versione di prompt
    - Test statistici di significatività
    """

    def __init__(self, data_dir: str = None):
        """
        Inizializza il calcolatore.

        Args:
            data_dir: Directory contenente i file JSON degli improvements
        """
        if data_dir is None:
            # Path relativo alla directory del modulo
            self.data_dir = Path(__file__).parent / "clusters_improvements_data"
        else:
            self.data_dir = Path(data_dir)

        self.entries: Dict[str, Dict] = {}
        self.loaded = False

        logger.info(f"ImprovementStatisticsCalculator inizializzato con directory: {self.data_dir}")

    def load_data(self) -> None:
        """Carica tutti i file JSON dalla directory"""
        if not self.data_dir.exists():
            raise FileNotFoundError(f"Directory non trovata: {self.data_dir}")

        json_files = list(self.data_dir.glob("improvements_cluster_*.json"))
        logger.info(f"Trovati {len(json_files)} file da processare")

        for json_file in json_files:
            try:
                self._load_single_file(json_file)
            except Exception as e:
                logger.error(f"Errore nel caricamento di {json_file.name}: {e}")
                continue

        self.loaded = True
        logger.info(f"Caricati {len(self.entries)} entries totali")

    def _load_single_file(self, file_path: Path) -> None:
        """Carica un singolo file JSON"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Ogni file contiene entries con struttura: entry_id -> improvements_data
        for entry_id, entry_data in data.items():
            self.entries[entry_id] = entry_data

    def _parse_metric_improvement(self, metric_data: dict) -> MetricImprovementData:
        """Parse di un singolo MetricImprovementData"""
        return MetricImprovementData(
            improvement_percentage=metric_data['improvement_percentage'],
            label=metric_data['label'],
            is_outlier=metric_data['is_outlier'],
            base_value=metric_data['base_value'],
            llm_value=metric_data['llm_value']
        )

    def _parse_improvement_data(self, imp_data: dict) -> ImprovementData:
        """Parse di un ImprovementData completo"""
        return ImprovementData(
            LLM_successfully_exec_quantity=imp_data['LLM_successfully_exec_quantity'],
            LLM_exec_quantity=imp_data['LLM_exec_quantity'],
            language=imp_data['language'],
            CPU_usage=self._parse_metric_improvement(imp_data['CPU_usage']),
            RAM_usage=self._parse_metric_improvement(imp_data['RAM_usage']),
            execution_time_ms=self._parse_metric_improvement(imp_data['execution_time_ms']),
            regressionTestPassed=imp_data['regressionTestPassed']
        )

    def calculate_comprehensive_statistics(self) -> ComprehensiveStatistics:
        """
        Calcola statistiche complete su tutti i dati.

        Returns:
            Oggetto ComprehensiveStatistics con tutte le metriche
        """
        if not self.loaded:
            self.load_data()

        # Estrai tutti i miglioramenti validi
        all_improvements = self._extract_all_improvements()

        # Calcola statistiche per metrica
        cpu_values = [imp['CPU_usage'] for imp in all_improvements]
        cpu_labels = [imp['CPU_label'] for imp in all_improvements]
        cpu_outliers = [imp['CPU_outlier'] for imp in all_improvements]
        
        ram_values = [imp['RAM_usage'] for imp in all_improvements]
        ram_labels = [imp['RAM_label'] for imp in all_improvements]
        ram_outliers = [imp['RAM_outlier'] for imp in all_improvements]
        
        time_values = [imp['execution_time_ms'] for imp in all_improvements]
        time_labels = [imp['time_label'] for imp in all_improvements]
        time_outliers = [imp['time_outlier'] for imp in all_improvements]
        
        test_values = [imp['regressionTestPassed'] for imp in all_improvements]

        cpu_stats = MetricStatistics.from_values(cpu_values, cpu_labels, cpu_outliers)
        ram_stats = MetricStatistics.from_values(ram_values, ram_labels, ram_outliers)
        time_stats = MetricStatistics.from_values(time_values, time_labels, time_outliers)
        test_stats = MetricStatistics.from_values(test_values)

        # Calcola statistiche per categoria
        by_language = self._calculate_language_statistics(all_improvements)
        by_llm = self._calculate_llm_statistics(all_improvements)
        by_prompt = self._calculate_prompt_statistics(all_improvements)

        # Conta entries valide/invalide
        valid_count = len(all_improvements)
        total_count = sum(
            1 for entry_data in self.entries.values()
            for llm_name in ['openAI', 'claude', 'gemini']
            for prompt_name in ['prompt_v1', 'prompt_v2', 'prompt_v3', 'prompt_v4']
        )
        
        outlier_count = sum(1 for imp in all_improvements if imp['has_outlier'])

        return ComprehensiveStatistics(
            CPU_usage=cpu_stats,
            RAM_usage=ram_stats,
            execution_time_ms=time_stats,
            regressionTestPassed=test_stats,
            total_entries=total_count,
            valid_entries=valid_count,
            invalid_entries=total_count - valid_count,
            outlier_entries=outlier_count,
            by_language=by_language,
            by_llm=by_llm,
            by_prompt=by_prompt
        )

    def _extract_all_improvements(self) -> List[dict]:
        """Estrae tutti i miglioramenti validi in formato flat"""
        improvements = []

        for entry_id, entry_data in self.entries.items():
            improvements_data = entry_data.get('improvements_data', {})

            for llm_name in ['openAI', 'claude', 'gemini']:
                llm_improvements = improvements_data.get(llm_name, {})

                for prompt_name in ['prompt_v1', 'prompt_v2', 'prompt_v3', 'prompt_v4']:
                    imp_data = llm_improvements.get(prompt_name, {})
                    
                    # Verifica che i dati siano validi
                    if not imp_data or imp_data.get('language') == '':
                        continue
                    
                    try:
                        improvement = self._parse_improvement_data(imp_data)
                        
                        if improvement.is_valid_improvement():
                            improvements.append({
                                'entry_id': entry_id,
                                'llm': llm_name,
                                'prompt': prompt_name,
                                'language': improvement.language,
                                'CPU_usage': improvement.CPU_usage.improvement_percentage,
                                'CPU_label': improvement.CPU_usage.label,
                                'CPU_outlier': improvement.CPU_usage.is_outlier,
                                'RAM_usage': improvement.RAM_usage.improvement_percentage,
                                'RAM_label': improvement.RAM_usage.label,
                                'RAM_outlier': improvement.RAM_usage.is_outlier,
                                'execution_time_ms': improvement.execution_time_ms.improvement_percentage,
                                'time_label': improvement.execution_time_ms.label,
                                'time_outlier': improvement.execution_time_ms.is_outlier,
                                'regressionTestPassed': improvement.regressionTestPassed,
                                'successfully_exec': improvement.LLM_successfully_exec_quantity,
                                'total_exec': improvement.LLM_exec_quantity,
                                'has_outlier': improvement.has_outliers()
                            })
                    except Exception as e:
                        logger.warning(f"Errore nel parsing di {entry_id}/{llm_name}/{prompt_name}: {e}")
                        continue

        return improvements

    def _calculate_language_statistics(self, improvements: List[dict]) -> Dict[str, LanguageStatistics]:
        """Calcola statistiche aggregate per linguaggio"""
        lang_groups = defaultdict(list)

        for imp in improvements:
            if imp['language']:
                lang_groups[imp['language']].append(imp)

        language_stats = {}
        for lang, group in lang_groups.items():
            cpu_improvements = [i['CPU_usage'] for i in group]
            ram_improvements = [i['RAM_usage'] for i in group]
            time_improvements = [i['execution_time_ms'] for i in group]
            test_rates = [i['regressionTestPassed'] for i in group]

            # Trova migliore LLM e prompt per questo linguaggio
            best_llm = max(set(i['llm'] for i in group),
                          key=lambda x: np.mean([i['CPU_usage'] for i in group if i['llm'] == x]))
            best_prompt = max(set(i['prompt'] for i in group),
                            key=lambda x: np.mean([i['CPU_usage'] for i in group if i['prompt'] == x]))

            # Calcola reduction rates
            cpu_reduction_rate = sum(1 for v in cpu_improvements if v < 0) / len(cpu_improvements) * 100
            ram_reduction_rate = sum(1 for v in ram_improvements if v < 0) / len(ram_improvements) * 100
            time_reduction_rate = sum(1 for v in time_improvements if v < 0) / len(time_improvements) * 100

            language_stats[lang] = LanguageStatistics(
                language=lang,
                count=len(group),
                avg_CPU_improvement=float(np.mean(cpu_improvements)),
                avg_RAM_improvement=float(np.mean(ram_improvements)),
                avg_time_improvement=float(np.mean(time_improvements)),
                avg_test_pass_rate=float(np.mean(test_rates)),
                best_llm=best_llm,
                best_prompt=best_prompt,
                cpu_reduction_rate=cpu_reduction_rate,
                ram_reduction_rate=ram_reduction_rate,
                time_reduction_rate=time_reduction_rate
            )

        return language_stats

    def _calculate_llm_statistics(self, improvements: List[dict]) -> Dict[str, LLMStatistics]:
        """Calcola statistiche aggregate per LLM"""
        llm_groups = defaultdict(list)

        for imp in improvements:
            llm_groups[imp['llm']].append(imp)

        llm_stats = {}
        for llm, group in llm_groups.items():
            cpu_improvements = [i['CPU_usage'] for i in group]
            ram_improvements = [i['RAM_usage'] for i in group]
            time_improvements = [i['execution_time_ms'] for i in group]
            test_rates = [i['regressionTestPassed'] for i in group]

            # Trova miglior prompt
            best_prompt = max(set(i['prompt'] for i in group),
                            key=lambda x: np.mean([i['CPU_usage'] for i in group if i['prompt'] == x]))

            # Calcola success rate
            total_exec = sum(i['total_exec'] for i in group)
            successful_exec = sum(i['successfully_exec'] for i in group)
            success_rate = (successful_exec / total_exec * 100) if total_exec > 0 else 0.0

            # Calcola reduction rates
            cpu_reduction_rate = sum(1 for v in cpu_improvements if v < 0) / len(cpu_improvements) * 100
            ram_reduction_rate = sum(1 for v in ram_improvements if v < 0) / len(ram_improvements) * 100
            time_reduction_rate = sum(1 for v in time_improvements if v < 0) / len(time_improvements) * 100
            
            # Calcola outlier rate
            outlier_rate = sum(1 for i in group if i['has_outlier']) / len(group) * 100

            llm_stats[llm] = LLMStatistics(
                llm_name=llm,
                count=len(group),
                avg_CPU_improvement=float(np.mean(cpu_improvements)),
                avg_RAM_improvement=float(np.mean(ram_improvements)),
                avg_time_improvement=float(np.mean(time_improvements)),
                avg_test_pass_rate=float(np.mean(test_rates)),
                best_prompt=best_prompt,
                success_rate=success_rate,
                cpu_reduction_rate=cpu_reduction_rate,
                ram_reduction_rate=ram_reduction_rate,
                time_reduction_rate=time_reduction_rate,
                outlier_rate=outlier_rate
            )

        return llm_stats

    def _calculate_prompt_statistics(self, improvements: List[dict]) -> Dict[str, PromptStatistics]:
        """Calcola statistiche aggregate per versione di prompt"""
        prompt_groups = defaultdict(list)

        for imp in improvements:
            prompt_groups[imp['prompt']].append(imp)

        prompt_stats = {}
        for prompt, group in prompt_groups.items():
            cpu_improvements = [i['CPU_usage'] for i in group]
            ram_improvements = [i['RAM_usage'] for i in group]
            time_improvements = [i['execution_time_ms'] for i in group]
            test_rates = [i['regressionTestPassed'] for i in group]

            # Trova miglior LLM
            best_llm = max(set(i['llm'] for i in group),
                          key=lambda x: np.mean([i['CPU_usage'] for i in group if i['llm'] == x]))

            # Calcola reduction rates
            cpu_reduction_rate = sum(1 for v in cpu_improvements if v < 0) / len(cpu_improvements) * 100
            ram_reduction_rate = sum(1 for v in ram_improvements if v < 0) / len(ram_improvements) * 100
            time_reduction_rate = sum(1 for v in time_improvements if v < 0) / len(time_improvements) * 100

            prompt_stats[prompt] = PromptStatistics(
                prompt_version=prompt,
                count=len(group),
                avg_CPU_improvement=float(np.mean(cpu_improvements)),
                avg_RAM_improvement=float(np.mean(ram_improvements)),
                avg_time_improvement=float(np.mean(time_improvements)),
                avg_test_pass_rate=float(np.mean(test_rates)),
                best_llm=best_llm,
                cpu_reduction_rate=cpu_reduction_rate,
                ram_reduction_rate=ram_reduction_rate,
                time_reduction_rate=time_reduction_rate
            )

        return prompt_stats

    def perform_statistical_tests(self) -> Dict[str, dict]:
        """
        Esegue test statistici di significatività.

        Returns:
            Dizionario con risultati dei test (ANOVA, t-test, etc.)
        """
        if not self.loaded:
            self.load_data()

        improvements = self._extract_all_improvements()
        results = {}

        # Test ANOVA per confronto tra LLM
        llm_groups = defaultdict(list)
        for imp in improvements:
            llm_groups[imp['llm']].append(imp['CPU_usage'])

        if len(llm_groups) > 1 and all(len(g) > 0 for g in llm_groups.values()):
            f_stat, p_value = scipy_stats.f_oneway(*llm_groups.values())
            results['llm_anova_cpu'] = {
                'f_statistic': float(f_stat),
                'p_value': float(p_value),
                'significant': bool(p_value < 0.05)
            }

        # Test ANOVA per confronto tra prompt versions
        prompt_groups = defaultdict(list)
        for imp in improvements:
            prompt_groups[imp['prompt']].append(imp['CPU_usage'])

        if len(prompt_groups) > 1 and all(len(g) > 0 for g in prompt_groups.values()):
            f_stat, p_value = scipy_stats.f_oneway(*prompt_groups.values())
            results['prompt_anova_cpu'] = {
                'f_statistic': float(f_stat),
                'p_value': float(p_value),
                'significant': bool(p_value < 0.05)
            }

        # Test di correlazione tra metriche
        cpu_vals = [i['CPU_usage'] for i in improvements]
        ram_vals = [i['RAM_usage'] for i in improvements]
        time_vals = [i['execution_time_ms'] for i in improvements]

        if len(cpu_vals) > 1:
            results['correlations'] = {
                'CPU_RAM': float(np.corrcoef(cpu_vals, ram_vals)[0, 1]),
                'CPU_Time': float(np.corrcoef(cpu_vals, time_vals)[0, 1]),
                'RAM_Time': float(np.corrcoef(ram_vals, time_vals)[0, 1])
            }

        return results

    def get_top_improvements(self, metric: str = 'CPU_usage', n: int = 10) -> List[dict]:
        """
        Ritorna i migliori N improvements per una metrica specifica.

        Args:
            metric: Metrica da considerare ('CPU_usage', 'RAM_usage', 'execution_time_ms')
            n: Numero di risultati da ritornare

        Returns:
            Lista dei migliori improvements
        """
        if not self.loaded:
            self.load_data()

        improvements = self._extract_all_improvements()

        # Ordina in base alla metrica (valori negativi sono migliori)
        sorted_improvements = sorted(improvements, key=lambda x: x[metric])

        return sorted_improvements[:n]

    def export_statistics_to_json(self, output_path: str) -> None:
        """
        Esporta le statistiche in formato JSON.

        Args:
            output_path: Path del file di output
        """
        stats = self.calculate_comprehensive_statistics()
        tests = self.perform_statistical_tests()

        output = {
            'overall_statistics': {
                'CPU_usage': asdict(stats.CPU_usage),
                'RAM_usage': asdict(stats.RAM_usage),
                'execution_time_ms': asdict(stats.execution_time_ms),
                'regressionTestPassed': asdict(stats.regressionTestPassed)
            },
            'summary': {
                'total_entries': stats.total_entries,
                'valid_entries': stats.valid_entries,
                'invalid_entries': stats.invalid_entries,
                'outlier_entries': stats.outlier_entries
            },
            'by_language': {k: asdict(v) for k, v in stats.by_language.items()},
            'by_llm': {k: asdict(v) for k, v in stats.by_llm.items()},
            'by_prompt': {k: asdict(v) for k, v in stats.by_prompt.items()},
            'statistical_tests': tests
        }

        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
            

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)

        logger.info(f"Statistiche esportate in: {output_path}")

    def print_summary(self) -> None:
        """Stampa un summary leggibile delle statistiche"""
        stats = self.calculate_comprehensive_statistics()

        print("\n" + "="*80)
        print("IMPROVEMENT STATISTICS SUMMARY")
        print("="*80)

        print(f"\nTotal Entries: {stats.total_entries}")
        print(f"Valid Entries: {stats.valid_entries}")
        print(f"Invalid Entries: {stats.invalid_entries}")
        print(f"Outlier Entries: {stats.outlier_entries}")
        print(f"Validity Rate: {stats.valid_entries/stats.total_entries*100:.2f}%")

        print("\n" + "-"*80)
        print("OVERALL METRICS")
        print("-"*80)

        for metric_name in ['CPU_usage', 'RAM_usage', 'execution_time_ms']:
            metric = getattr(stats, metric_name)
            print(f"\n{metric_name}:")
            print(f"  Mean: {metric.mean:.2f}%")
            print(f"  Median: {metric.median:.2f}%")
            print(f"  Std: {metric.std:.2f}%")
            print(f"  Range: [{metric.min:.2f}%, {metric.max:.2f}%]")
            print(f"  IQR: {metric.iqr:.2f}%")
            print(f"  Reductions: {metric.reduction_count} ({metric.reduction_count/metric.count*100:.1f}%)")
            print(f"  Degradations: {metric.degradation_count} ({metric.degradation_count/metric.count*100:.1f}%)")
            print(f"  Outliers: {metric.outlier_count} ({metric.outlier_count/metric.count*100:.1f}%)")

        print("\n" + "-"*80)
        print("BY LLM")
        print("-"*80)

        for llm_name, llm_stats in sorted(stats.by_llm.items()):
            print(f"\n{llm_name}:")
            print(f"  Count: {llm_stats.count}")
            print(f"  Avg CPU Improvement: {llm_stats.avg_CPU_improvement:.2f}%")
            print(f"  Avg RAM Improvement: {llm_stats.avg_RAM_improvement:.2f}%")
            print(f"  Avg Time Improvement: {llm_stats.avg_time_improvement:.2f}%")
            print(f"  CPU Reduction Rate: {llm_stats.cpu_reduction_rate:.1f}%")
            print(f"  RAM Reduction Rate: {llm_stats.ram_reduction_rate:.1f}%")
            print(f"  Time Reduction Rate: {llm_stats.time_reduction_rate:.1f}%")
            print(f"  Success Rate: {llm_stats.success_rate:.2f}%")
            print(f"  Outlier Rate: {llm_stats.outlier_rate:.1f}%")
            print(f"  Best Prompt: {llm_stats.best_prompt}")

        print("\n" + "-"*80)
        print("BY PROMPT VERSION")
        print("-"*80)

        for prompt_name in sorted(stats.by_prompt.keys()):
            prompt_stats = stats.by_prompt[prompt_name]
            print(f"\n{prompt_name}:")
            print(f"  Count: {prompt_stats.count}")
            print(f"  Avg CPU Improvement: {prompt_stats.avg_CPU_improvement:.2f}%")
            print(f"  Avg RAM Improvement: {prompt_stats.avg_RAM_improvement:.2f}%")
            print(f"  Avg Time Improvement: {prompt_stats.avg_time_improvement:.2f}%")
            print(f"  CPU Reduction Rate: {prompt_stats.cpu_reduction_rate:.1f}%")
            print(f"  RAM Reduction Rate: {prompt_stats.ram_reduction_rate:.1f}%")
            print(f"  Time Reduction Rate: {prompt_stats.time_reduction_rate:.1f}%")
            print(f"  Best LLM: {prompt_stats.best_llm}")

        print("\n" + "-"*80)
        print("BY LANGUAGE")
        print("-"*80)

        for lang, lang_stats in sorted(stats.by_language.items()):
            print(f"\n{lang}:")
            print(f"  Count: {lang_stats.count}")
            print(f"  Avg CPU Improvement: {lang_stats.avg_CPU_improvement:.2f}%")
            print(f"  Avg RAM Improvement: {lang_stats.avg_RAM_improvement:.2f}%")
            print(f"  Avg Time Improvement: {lang_stats.avg_time_improvement:.2f}%")
            print(f"  CPU Reduction Rate: {lang_stats.cpu_reduction_rate:.1f}%")
            print(f"  RAM Reduction Rate: {lang_stats.ram_reduction_rate:.1f}%")
            print(f"  Time Reduction Rate: {lang_stats.time_reduction_rate:.1f}%")
            print(f"  Best LLM: {lang_stats.best_llm}")
            print(f"  Best Prompt: {lang_stats.best_prompt}")

        print("\n" + "="*80)


# ============================================================================
# FUNZIONI DI UTILITY
# ============================================================================

def create_calculator(data_dir: str = None) -> ImprovementStatisticsCalculator:
    """Factory function per creare un calculator"""
    return ImprovementStatisticsCalculator(data_dir)


def quick_analysis(data_dir: str = None) -> ComprehensiveStatistics:
    """Esegue una rapida analisi completa"""
    calc = create_calculator(data_dir)
    calc.load_data()
    return calc.calculate_comprehensive_statistics()


# ============================================================================
# MAIN - ESEMPIO DI UTILIZZO
# ============================================================================

if __name__ == "__main__":
    # Esempio di utilizzo
    print("Inizializzazione ImprovementStatisticsCalculator...")

    calculator = ImprovementStatisticsCalculator()

    print("Caricamento dati...")
    calculator.load_data()

    print("Calcolo statistiche...")
    calculator.print_summary()

    # Esporta risultati
    output_dir = Path(__file__).parent / "statistics_output"
    output_dir.mkdir(exist_ok=True)

    output_file = output_dir / "comprehensive_statistics.json"
    calculator.export_statistics_to_json(str(output_file))

    # Test statistici
    print("\n" + "="*80)
    print("STATISTICAL TESTS")
    print("="*80)
    tests = calculator.perform_statistical_tests()
    print(json.dumps(tests, indent=2))

    # Top improvements per metrica
    print("\n" + "="*80)
    print("TOP 5 CPU IMPROVEMENTS (Best Reductions)")
    print("="*80)
    top_cpu = calculator.get_top_improvements('CPU_usage', n=5)
    for i, imp in enumerate(top_cpu, 1):
        print(f"{i}. {imp['entry_id']} - {imp['llm']} {imp['prompt']}: {imp['CPU_usage']:.2f}%")
        print(f"   Language: {imp['language']}, Label: {imp['CPU_label']}, Outlier: {imp['CPU_outlier']}")

    print("\n" + "="*80)
    print("TOP 5 RAM IMPROVEMENTS (Best Reductions)")
    print("="*80)
    top_ram = calculator.get_top_improvements('RAM_usage', n=5)
    for i, imp in enumerate(top_ram, 1):
        print(f"{i}. {imp['entry_id']} - {imp['llm']} {imp['prompt']}: {imp['RAM_usage']:.2f}%")
        print(f"   Language: {imp['language']}, Label: {imp['RAM_label']}, Outlier: {imp['RAM_outlier']}")

    print("\n" + "="*80)
    print("TOP 5 EXECUTION TIME IMPROVEMENTS (Best Reductions)")
    print("="*80)
    top_time = calculator.get_top_improvements('execution_time_ms', n=5)
    for i, imp in enumerate(top_time, 1):
        print(f"{i}. {imp['entry_id']} - {imp['llm']} {imp['prompt']}: {imp['execution_time_ms']:.2f}%")
        print(f"   Language: {imp['language']}, Label: {imp['time_label']}, Outlier: {imp['time_outlier']}")

    print("\nAnalisi completata!")