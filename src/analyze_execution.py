#!/usr/bin/env python3
"""
Simplified Cluster Execution Status Analyzer
Analizza lo stato di esecuzione dei cluster BASE e LLM con approccio diretto
"""
import json
import logging
from pathlib import Path
from typing import Dict, List, Tuple
from dataclasses import dataclass
from collections import defaultdict

from utility_dir import utility_paths

CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
OUTPUT_DIR = utility_paths.OUTPUT_DIR_FILEPATH

@dataclass
class ClusterExecutionStatus:
    """Status di esecuzione per un cluster"""
    name: str
    base_status: str  # "complete", "partial", "not_executed"
    llm_status: str   # "complete", "partial", "not_executed"
    base_avg_success_rate: float = 0.0
    llm_avg_success_rate: float = 0.0
    base_files_found: List[str] = None
    llm_files_found: List[str] = None
    
    def __post_init__(self):
        if self.base_files_found is None:
            self.base_files_found = []
        if self.llm_files_found is None:
            self.llm_files_found = []

class SimplifiedClusterAnalyzer:
    """Analizzatore semplificato per cluster di esecuzione"""
    
    def __init__(self, clusters_dir: Path = CLUSTERS_DIR, output_dir: Path = OUTPUT_DIR):
        self.clusters_dir = Path(clusters_dir)
        self.output_dir = Path(output_dir)
        self.logger = self._setup_logging()
        
        # Soglie per classificazione
        self.COMPLETE_THRESHOLD = 0.75  # 75% entries valide
        self.NOT_EXECUTED_THRESHOLD = 0.30  # sotto 30% considerato non eseguito
    
    def _setup_logging(self) -> logging.Logger:
        """Setup logging"""
        logger = logging.getLogger(f"{__name__}.SimplifiedAnalyzer")
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            
        return logger
    
    def get_cluster_names(self) -> List[str]:
        """Step 1: Legge i nomi dei cluster dalla cartella CLUSTERS_DIR"""
        if not self.clusters_dir.exists():
            self.logger.error(f"Directory cluster non trovata: {self.clusters_dir}")
            return []
        
        cluster_names = []
        for cluster_file in self.clusters_dir.iterdir():
            if not cluster_file.name.endswith('.json') or not cluster_file.name.startswith('cluster_'):
                continue
                
            # Filtra cluster di debug/test
            if any(skip in cluster_file.name.lower() for skip in [
                'debug_', 'test_', 'focused_', 'bad_entries', 'with_metrics'
            ]):
                continue
            
            cluster_name = cluster_file.stem.replace('cluster_', '')
            cluster_names.append(cluster_name)
        
        cluster_names.sort()
        self.logger.info(f"Trovati {len(cluster_names)} cluster: {cluster_names[:5]}..." if len(cluster_names) > 5 else str(cluster_names))
        return cluster_names
    
    def find_execution_files(self, cluster_name: str) -> Tuple[List[str], List[str]]:
        """Step 2: Trova i file di esecuzione per un cluster"""
        if not self.output_dir.exists():
            return [], []
        
        base_files = []
        llm_files = []
        
        # Pattern per file base: {cluster_name}_results_{exec_number}.json
        # Pattern per file LLM: {cluster_name}_results_v{version}_{exec_number}.json
        
        for output_file in self.output_dir.iterdir():
            if not output_file.is_file() or not output_file.name.endswith('.json'):
                continue
            
            filename = output_file.name
            
            # Controlla se appartiene al cluster corrente
            if not filename.startswith(f"{cluster_name}_results_"):
                continue
            
            # Determina se è base o LLM
            remaining_part = filename[len(f"{cluster_name}_results_"):]
            
            if remaining_part.startswith('v') and '_' in remaining_part:
                # File LLM: v{version}_{exec}.json
                llm_files.append(filename)
            else:
                # File base: {exec}.json
                base_files.append(filename)
        
        base_files.sort()
        llm_files.sort()
        
        return base_files, llm_files
    
    def calculate_success_rate(self, file_path: Path) -> float:
        """Step 3: Calcola la % di entries eseguite correttamente"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            results = data.get('results', {})
            total_entries = 0
            valid_entries = 0
            
            for lang, entries in results.items():
                if not isinstance(entries, list):
                    continue
                
                for entry in entries:
                    # Controlla se ha LLM_results (file LLM) o metriche dirette (file base)
                    if 'LLM_results' in entry:
                        # File LLM: controlla ogni risultato LLM
                        llm_results = entry.get('LLM_results', [])
                        for llm_result in llm_results:
                            total_entries += 1
                            if self._has_valid_metrics(llm_result):
                                valid_entries += 1
                    else:
                        # File base: controlla entry diretta
                        total_entries += 1
                        if self._has_valid_metrics(entry):
                            valid_entries += 1
            
            return (valid_entries / total_entries) if total_entries > 0 else 0.0
            
        except Exception as e:
            self.logger.warning(f"Errore lettura file {file_path}: {e}")
            return 0.0
    
    def _has_valid_metrics(self, entry: Dict) -> bool:
        """Controlla se un'entry ha le metriche richieste definite"""
        required_metrics = ['CPU_usage', 'RAM_usage', 'execution_time_ms']
        return all(
            metric in entry and entry[metric] is not None 
            for metric in required_metrics
        )
    
    def classify_cluster_status(self, success_rates: List[float]) -> str:
        """Step 4: Classifica il cluster basandosi sui success rates"""
        if not success_rates:
            return "not_executed"
        
        avg_rate = sum(success_rates) / len(success_rates)
        
        if avg_rate >= self.COMPLETE_THRESHOLD:
            return "complete"
        elif avg_rate < self.NOT_EXECUTED_THRESHOLD:
            return "not_executed"
        else:
            return "partial"
    
    def analyze_cluster(self, cluster_name: str) -> ClusterExecutionStatus:
        """Analizza un singolo cluster"""
        base_files, llm_files = self.find_execution_files(cluster_name)
        
        # Calcola success rates per file base
        base_success_rates = []
        for filename in base_files:
            file_path = self.output_dir / filename
            if file_path.exists():
                rate = self.calculate_success_rate(file_path)
                base_success_rates.append(rate)
        
        # Calcola success rates per file LLM
        llm_success_rates = []
        for filename in llm_files:
            file_path = self.output_dir / filename
            if file_path.exists():
                rate = self.calculate_success_rate(file_path)
                llm_success_rates.append(rate)
        
        # Classifica status
        base_status = self.classify_cluster_status(base_success_rates)
        llm_status = self.classify_cluster_status(llm_success_rates)
        
        # Calcola medie
        base_avg = sum(base_success_rates) / len(base_success_rates) if base_success_rates else 0.0
        llm_avg = sum(llm_success_rates) / len(llm_success_rates) if llm_success_rates else 0.0
        
        return ClusterExecutionStatus(
            name=cluster_name,
            base_status=base_status,
            llm_status=llm_status,
            base_avg_success_rate=base_avg,
            llm_avg_success_rate=llm_avg,
            base_files_found=base_files,
            llm_files_found=llm_files
        )
    
    def analyze_all_clusters(self) -> List[ClusterExecutionStatus]:
        """Analizza tutti i cluster"""
        cluster_names = self.get_cluster_names()
        results = []
        
        for cluster_name in cluster_names:
            self.logger.info(f"Analizzando cluster: {cluster_name}")
            status = self.analyze_cluster(cluster_name)
            results.append(status)
        
        return results
    
    def generate_lists(self, cluster_statuses: List[ClusterExecutionStatus]) -> Dict[str, List[str]]:
        """Genera liste di cluster per categoria"""
        lists = {
            'base_complete': [],
            'base_partial': [],
            'base_not_executed': [],
            'llm_complete': [],
            'llm_partial': [],
            'llm_not_executed': []
        }
        
        for status in cluster_statuses:
            # Base clusters
            lists[f'base_{status.base_status}'].append(status.name)
            
            # LLM clusters
            lists[f'llm_{status.llm_status}'].append(status.name)
        
        return lists
    
    def generate_report(self, cluster_statuses: List[ClusterExecutionStatus]) -> str:
        """Step 5: Genera il report"""
        lists = self.generate_lists(cluster_statuses)
        
        report = []
        report.append("=" * 80)
        report.append("SIMPLIFIED CLUSTER EXECUTION ANALYSIS")
        report.append("=" * 80)
        report.append(f"Total clusters analyzed: {len(cluster_statuses)}")
        report.append(f"Analysis thresholds: Complete ≥{self.COMPLETE_THRESHOLD*100:.0f}%, Not executed <{self.NOT_EXECUTED_THRESHOLD*100:.0f}%")
        report.append("")
        
        # Base clusters summary
        report.append("BASE CLUSTERS SUMMARY:")
        report.append("-" * 40)
        report.append(f"  Complete: {len(lists['base_complete'])}")
        report.append(f"  Partial: {len(lists['base_partial'])}")
        report.append(f"  Not executed: {len(lists['base_not_executed'])}")
        report.append("")
        
        # LLM clusters summary
        report.append("LLM CLUSTERS SUMMARY:")
        report.append("-" * 40)
        report.append(f"  Complete: {len(lists['llm_complete'])}")
        report.append(f"  Partial: {len(lists['llm_partial'])}")
        report.append(f"  Not executed: {len(lists['llm_not_executed'])}")
        report.append("")
        
        # Detailed status per cluster
        report.append("DETAILED CLUSTER STATUS:")
        report.append("-" * 40)
        report.append(f"{'Cluster Name':<30} {'Base Status':<12} {'Base Rate':<10} {'LLM Status':<12} {'LLM Rate':<10} {'Base Files':<10} {'LLM Files'}")
        report.append("-" * 120)
        
        for status in sorted(cluster_statuses, key=lambda x: x.name):
            report.append(
                f"{status.name:<30} "
                f"{status.base_status:<12} "
                f"{status.base_avg_success_rate*100:>8.1f}% "
                f"{status.llm_status:<12} "
                f"{status.llm_avg_success_rate*100:>8.1f}% "
                f"{len(status.base_files_found):>9} "
                f"{len(status.llm_files_found):>9}"
            )
        
        report.append("")
        
        # Lists for re-execution
        report.append("CLUSTERS TO RE-EXECUTE:")
        report.append("-" * 40)
        report.append("Base clusters not executed:")
        for cluster in lists['base_not_executed']:
            report.append(f"  - {cluster}")
        
        report.append("")
        report.append("LLM clusters not executed:")
        for cluster in lists['llm_not_executed']:
            report.append(f"  - {cluster}")
        
        return "\n".join(report)
    
    def get_clusters_to_reexecute(self) -> Dict[str, List[str]]:
        """Restituisce gli array di nomi per ri-eseguire i cluster non eseguiti"""
        cluster_statuses = self.analyze_all_clusters()
        lists = self.generate_lists(cluster_statuses)
        
        return {
            'base_not_executed': lists['base_not_executed'],
            'llm_not_executed': lists['llm_not_executed'],
            'base_partial': lists['base_partial'],  # Potrebbero essere utili anche questi
            'llm_partial': lists['llm_partial']
        }
    
    def export_analysis_json(self, output_file: Path = None) -> Dict:
        """Esporta l'analisi in formato JSON"""
        cluster_statuses = self.analyze_all_clusters()
        lists = self.generate_lists(cluster_statuses)
        
        analysis = {
            "thresholds": {
                "complete_threshold": self.COMPLETE_THRESHOLD,
                "not_executed_threshold": self.NOT_EXECUTED_THRESHOLD
            },
            "summary": {
                "total_clusters": len(cluster_statuses),
                "base_clusters": {
                    "complete": len(lists['base_complete']),
                    "partial": len(lists['base_partial']),
                    "not_executed": len(lists['base_not_executed'])
                },
                "llm_clusters": {
                    "complete": len(lists['llm_complete']),
                    "partial": len(lists['llm_partial']),
                    "not_executed": len(lists['llm_not_executed'])
                }
            },
            "execution_lists": lists,
            "detailed_status": [
                {
                    "name": status.name,
                    "base_status": status.base_status,
                    "base_avg_success_rate": status.base_avg_success_rate,
                    "base_files_count": len(status.base_files_found),
                    "llm_status": status.llm_status,
                    "llm_avg_success_rate": status.llm_avg_success_rate,
                    "llm_files_count": len(status.llm_files_found)
                }
                for status in cluster_statuses
            ]
        }
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(analysis, f, indent=2, ensure_ascii=False)
            self.logger.info(f"Analisi esportata in: {output_file}")
        
        return analysis

def main():
    """Main function"""
    print("Simplified Cluster Execution Analyzer")
    print("=" * 50)
    
    analyzer = SimplifiedClusterAnalyzer()
    
    # Analizza tutti i cluster
    cluster_statuses = analyzer.analyze_all_clusters()
    
    # Genera e stampa il report
    report = analyzer.generate_report(cluster_statuses)
    print(report)
    
    # Esporta in JSON
    output_json = Path("simplified_cluster_analysis.json")
    analyzer.export_analysis_json(output_json)
    print(f"\nAnalisi esportata in: {output_json}")
    
    # Mostra cluster da ri-eseguire
    clusters_to_reexecute = analyzer.get_clusters_to_reexecute()
    print(f"\n\nCLUSTERS TO RE-EXECUTE:")
    print(f"Base not executed ({len(clusters_to_reexecute['base_not_executed'])}): {clusters_to_reexecute['base_not_executed']}")
    print(f"LLM not executed ({len(clusters_to_reexecute['llm_not_executed'])}): {clusters_to_reexecute['llm_not_executed']}")

if __name__ == "__main__":
    main()