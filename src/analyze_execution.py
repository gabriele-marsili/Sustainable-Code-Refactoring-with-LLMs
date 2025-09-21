#!/usr/bin/env python3
"""
Cluster Execution Status Analyzer
Analizza lo stato di esecuzione dei cluster BASE e LLM
"""
import time
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, field
from collections import defaultdict
import logging

# Assumo la struttura del progetto basata sul codice fornito

from utility_dir import utility_paths
CLUSTERS_DIR = utility_paths.CLUSTERS_DIR_FILEPATH
OUTPUT_DIR = utility_paths.OUTPUT_DIR_FILEPATH

@dataclass
class ClusterStats:
    """Statistiche per un singolo cluster"""
    name: str
    total_files_expected: int = 0
    total_files_found: int = 0
    languages: Dict[str, int] = field(default_factory=dict)  # lang -> entry count
    execution_files: List[str] = field(default_factory=list)
    is_complete: bool = False
    completion_percentage: float = 0.0
    
@dataclass
class EntryQualityStats:
    """Statistiche qualità delle entry per cluster"""
    cluster_name: str
    language_stats: Dict[str, Dict[str, int]] = field(default_factory=lambda: defaultdict(lambda: {
        'total_entries': 0,
        'valid_entries': 0,
        'percentage': 0.0
    }))

class ClusterExecutionAnalyzer:
    """Analizzatore completo dello stato di esecuzione dei cluster"""
    
    def __init__(self, clusters_dir: Path = CLUSTERS_DIR, output_dir: Path = OUTPUT_DIR):
        self.clusters_dir = Path(clusters_dir)
        self.output_dir = Path(output_dir)
        self.logger = self._setup_logging()
        
        # Pattern per riconoscere i file di output
        self.base_pattern = re.compile(r'^([^_]+)_results_(\d+)\.json$')
        self.llm_pattern = re.compile(r'^([^_]+)_results_v(\d+)_(\d+)\.json$')
        
        # Cache per evitare letture multiple
        self._cluster_cache: Dict[str, Dict] = {}
        self._output_cache: Dict[str, Dict] = {}
    
    def _setup_logging(self) -> logging.Logger:
        """Setup logging"""
        logger = logging.getLogger(f"{__name__}.ClusterAnalyzer")
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            
        return logger
    
    def get_available_clusters(self) -> Dict[str, Dict]:
        """Ottiene tutti i cluster disponibili con le loro informazioni"""
        if not self.clusters_dir.exists():
            self.logger.error(f"Directory cluster non trovata: {self.clusters_dir}")
            return {}
        
        clusters = {}
        
        for cluster_file in self.clusters_dir.iterdir():
            if not cluster_file.name.endswith('.json') or not cluster_file.name.startswith('cluster_'):
                continue
                
            # Filtra cluster di debug/test
            if any(skip in cluster_file.name.lower() for skip in [
                'debug_', 'test_', 'focused_', 'bad_entries', 'with_metrics'
            ]):
                continue
            
            cluster_name = cluster_file.stem.replace('cluster_', '')
            
            try:
                with open(cluster_file, 'r', encoding='utf-8') as f:
                    cluster_data = json.load(f)
                    clusters[cluster_name] = cluster_data
                    self._cluster_cache[cluster_name] = cluster_data
            except (json.JSONDecodeError, IOError) as e:
                self.logger.warning(f"Impossibile leggere cluster {cluster_name}: {e}")
                continue
        
        self.logger.info(f"Trovati {len(clusters)} cluster validi")
        return clusters
    
    def analyze_cluster_structure(self, cluster_name: str, cluster_data: Dict) -> ClusterStats:
        """Analizza la struttura di un cluster per determinare le aspettative"""
        stats = ClusterStats(name=cluster_name)
        
        total_entries = 0
        for lang, entries in cluster_data.items():
            if isinstance(entries, list):
                entry_count = len(entries)
                stats.languages[lang] = entry_count
                total_entries += entry_count
        
        stats.total_files_expected = total_entries
        return stats
    
    def scan_output_files(self) -> Tuple[Dict[str, List[str]], Dict[str, List[str]]]:
        """Scansiona i file di output per trovare esecuzioni completate"""
        if not self.output_dir.exists():
            self.logger.warning(f"Directory output non trovata: {self.output_dir}")
            return {}, {}
        
        base_files = defaultdict(list)
        llm_files = defaultdict(list)
        
        for output_file in self.output_dir.iterdir():
            if not output_file.is_file() or not output_file.name.endswith('.json'):
                continue

            out_file_name = output_file.name            
            c_name = out_file_name.split("_results_")[0]
            is_llm_out = "_v" in output_file.name

            if is_llm_out :                       
                # Controlla pattern LLM
                llm_match = self.llm_pattern.match(output_file.name)
                if llm_match:
                    cluster_name = llm_match.group(1)
                    prompt_version = int(llm_match.group(2))
                    execution_num = int(llm_match.group(3))
                    llm_files[cluster_name].append(cluster_name)
                else:
                    #cluster_name = c_name
                    #final_part = output_file.name.split("_results_")[1]
                    #final_part = final_part.replace(".json","")
                    #parts = final_part.split("_")
                    #version_num = parts[0].replace("v","")
                    #exec_num = parts[1]
                    llm_files[c_name].append(c_name)
                
            else:
                # Controlla pattern base
                base_match = self.base_pattern.match(output_file.name)
                if base_match:
                    cluster_name = base_match.group(1)
                    execution_num = int(base_match.group(2))
                    base_files[cluster_name].append(cluster_name)
                    continue
                else:
                    base_files[c_name].append(c_name)


        # Ordina i file per cluster
        for cluster_name in base_files:
            base_files[cluster_name].sort()
        for cluster_name in llm_files:
            llm_files[cluster_name].sort()
        
        return dict(base_files), dict(llm_files)
    
    def analyze_base_clusters(self, available_clusters: Dict[str, Dict]) -> Dict[str, ClusterStats]:
        """Analizza completamento cluster BASE"""
        base_files, _ = self.scan_output_files()
        base_stats = {}
        
        for cluster_name, cluster_data in available_clusters.items():
            stats = self.analyze_cluster_structure(cluster_name, cluster_data)
            stats.execution_files = base_files.get(cluster_name, [])
            stats.total_files_found = len(stats.execution_files)
            
            # Un cluster base è completo se ha almeno 5 file di esecuzione
            stats.is_complete = stats.total_files_found >= 5
            stats.completion_percentage = min(100.0, (stats.total_files_found / 5) * 100)
            
            base_stats[cluster_name] = stats
        
        return base_stats
    
    def analyze_llm_clusters(self, available_clusters: Dict[str, Dict]) -> Dict[str, ClusterStats]:
        """Analizza completamento cluster LLM"""
        _, llm_files = self.scan_output_files()
        llm_stats = {}
        
        for cluster_name, cluster_data in available_clusters.items():
            stats = self.analyze_cluster_structure(cluster_name, cluster_data)
            cluster_files = llm_files.get(cluster_name, [])
            
            # Analizza per versione prompt (1-4)
            version_counts = defaultdict(int)
            for filename in cluster_files:
                match = self.llm_pattern.match(filename)
                if match:
                    version = int(match.group(2))
                    version_counts[version] += 1
            
            stats.execution_files = cluster_files
            stats.total_files_found = len(cluster_files)
            
            # Un cluster LLM è completo se ha almeno 5 file per ogni versione (1-4)
            expected_total = 5 * 4  # 5 esecuzioni x 4 versioni
            required_versions_complete = sum(1 for count in version_counts.values() if count >= 5)
            
            stats.is_complete = required_versions_complete >= 4
            stats.completion_percentage = (required_versions_complete / 4) * 100
            
            llm_stats[cluster_name] = stats
        
        return llm_stats
    
    def validate_file_content(self, file_path: Path, is_llm: bool = False) -> Tuple[int, int, Dict[str, Tuple[int, int]]]:
        """
        Valida il contenuto di un file di risultati
        Returns: (total_entries, valid_entries, lang_stats)
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            results = data.get('results', {})
            total_entries = 0
            valid_entries = 0
            lang_stats = {}
            
            for lang, entries in results.items():
                if not isinstance(entries, list):
                    continue
                
                lang_total = len(entries)
                lang_valid = 0
                
                for entry in entries:
                    total_entries += 1
                    
                    if is_llm:
                        # Per LLM, controlla LLM_results
                        llm_results = entry.get('LLM_results', [])
                        entry_valid = any(
                            all(key in result for key in ['CPU_usage', 'RAM_usage', 'execution_time_ms'])
                            for result in llm_results
                        )
                    else:
                        # Per base, controlla metriche dirette
                        entry_valid = all(key in entry for key in ['CPU_usage', 'RAM_usage', 'execution_time_ms'])
                    
                    if entry_valid:
                        valid_entries += 1
                        lang_valid += 1
                
                lang_stats[lang] = (lang_total, lang_valid)
            
            return total_entries, valid_entries, lang_stats
            
        except (json.JSONDecodeError, IOError, KeyError) as e:
            self.logger.warning(f"Errore validazione file {file_path}: {e}")
            return 0, 0, {}
    
    def analyze_entry_quality(self, cluster_stats: Dict[str, ClusterStats], is_llm: bool = False) -> Dict[str, EntryQualityStats]:
        """Analizza la qualità delle entry nei file di risultati"""
        quality_stats = {}
        
        for cluster_name, stats in cluster_stats.items():
            if not stats.execution_files:
                continue
            
            quality = EntryQualityStats(cluster_name=cluster_name)
            
            # Aggrega statistiche da tutti i file del cluster
            lang_totals = defaultdict(int)
            lang_valids = defaultdict(int)
            
            for filename in stats.execution_files:
                file_path = self.output_dir / filename
                if not file_path.exists():
                    continue
                
                total, valid, lang_stats = self.validate_file_content(file_path, is_llm)
                
                for lang, (lang_total, lang_valid) in lang_stats.items():
                    lang_totals[lang] += lang_total
                    lang_valids[lang] += lang_valid
            
            # Calcola percentuali finali
            for lang in lang_totals:
                total = lang_totals[lang]
                valid = lang_valids[lang]
                percentage = (valid / total * 100) if total > 0 else 0.0
                
                quality.language_stats[lang] = {
                    'total_entries': total,
                    'valid_entries': valid,
                    'percentage': percentage
                }
            
            quality_stats[cluster_name] = quality
        
        return quality_stats
    
    def generate_file_based_report(self) -> str:
        """Genera report basato solo sui file esistenti"""
        available_clusters = self.get_available_clusters()
        base_stats = self.analyze_base_clusters(available_clusters)
        llm_stats = self.analyze_llm_clusters(available_clusters)
        
        report = []
        report.append("="*80)
        report.append("CLUSTER EXECUTION STATUS REPORT - FILE BASED")
        report.append("="*80)
        report.append("\n")
        
        # BASE Clusters Summary
        base_complete = sum(1 for stats in base_stats.values() if stats.is_complete)
        base_total = len(base_stats)
        
        report.append("BASE CLUSTERS SUMMARY:")
        report.append(f"  Total clusters: {base_total}")
        report.append(f"  Complete clusters: {base_complete}")
        report.append(f"  Incomplete clusters: {base_total - base_complete}")
        report.append(f"  Completion rate: {(base_complete/base_total*100):.1f}%" if base_total > 0 else "  No clusters found")
        report.append("\n")
        
        # BASE Clusters Detail
        report.append("BASE CLUSTERS DETAIL:")
        incomplete_base = []
        for cluster_name, stats in sorted(base_stats.items()):
            status = "COMPLETE" if stats.is_complete else "INCOMPLETE"
            report.append(f"  {cluster_name:40} | Files: {stats.total_files_found:2}/5 | {status}")
            if not stats.is_complete:
                incomplete_base.append(cluster_name)
        report.append("\n")
        
        # LLM Clusters Summary
        llm_complete = sum(1 for stats in llm_stats.values() if stats.is_complete)
        llm_total = len(llm_stats)
        
        report.append("LLM CLUSTERS SUMMARY:")
        report.append(f"  Total clusters: {llm_total}")
        report.append(f"  Complete clusters: {llm_complete}")
        report.append(f"  Incomplete clusters: {llm_total - llm_complete}")
        report.append(f"  Completion rate: {(llm_complete/llm_total*100):.1f}%" if llm_total > 0 else "  No clusters found")
        report.append("\n")
        
        # LLM Clusters Detail
        report.append("LLM CLUSTERS DETAIL:")
        incomplete_llm = []
        for cluster_name, stats in sorted(llm_stats.items()):
            status = "COMPLETE" if stats.is_complete else "INCOMPLETE"
            report.append(f"  {cluster_name:40} | Files: {stats.total_files_found:2}/20 | {status}")
            if not stats.is_complete:
                incomplete_llm.append(cluster_name)
        report.append("\n")
        
        # Clusters to execute
        report.append("CLUSTERS TO EXECUTE:")
        report.append(f"  BASE (missing): {len(incomplete_base)}")
        for cluster in incomplete_base[:10]:  # Limita output
            report.append(f"    - {cluster}")
        if len(incomplete_base) > 10:
            report.append(f"    ... and {len(incomplete_base) - 10} more")
        report.append("\n")
        
        report.append(f"  LLM (missing): {len(incomplete_llm)}")
        for cluster in incomplete_llm[:10]:  # Limita output
            report.append(f"    - {cluster}")
        if len(incomplete_llm) > 10:
            report.append(f"    ... and {len(incomplete_llm) - 10} more")
        
        return "\n".join(report)
    
    def generate_quality_report(self) -> str:
        """Genera report dettagliato sulla qualità delle entry"""
        available_clusters = self.get_available_clusters()
        base_stats = self.analyze_base_clusters(available_clusters)
        llm_stats = self.analyze_llm_clusters(available_clusters)
        
        base_quality = self.analyze_entry_quality(base_stats, is_llm=False)
        llm_quality = self.analyze_entry_quality(llm_stats, is_llm=True)
        
        report = []
        report.append("="*80)
        report.append("CLUSTER EXECUTION QUALITY REPORT")
        report.append("="*80)
        report.append("\n")
        
        # BASE Quality Analysis
        report.append("BASE CLUSTERS QUALITY ANALYSIS:")
        report.append("-" * 50)
        
        for cluster_name in sorted(base_quality.keys()):
            quality = base_quality[cluster_name]
            if not quality.language_stats:
                continue
                
            report.append(f"\n{cluster_name}:")
            for lang, stats in quality.language_stats.items():
                total = stats['total_entries']
                valid = stats['valid_entries']
                percentage = stats['percentage']
                report.append(f"  {lang:12} -> {valid:3}/{total:3} entries valid ({percentage:5.1f}%)")
        
        report.append("\n" + "="*50)
        
        # LLM Quality Analysis
        report.append("LLM CLUSTERS QUALITY ANALYSIS:")
        report.append("-" * 50)
        
        for cluster_name in sorted(llm_quality.keys()):
            quality = llm_quality[cluster_name]
            if not quality.language_stats:
                continue
                
            report.append(f"\n{cluster_name}:")
            for lang, stats in quality.language_stats.items():
                total = stats['total_entries']
                valid = stats['valid_entries']
                percentage = stats['percentage']
                report.append(f"  {lang:12} -> {valid:3}/{total:3} entries valid ({percentage:5.1f}%)")
        
        return "\n".join(report)
    
    def export_analysis_json(self, output_file: Optional[Path] = None) -> Dict:
        """Esporta l'analisi completa in formato JSON"""
        available_clusters = self.get_available_clusters()
        base_stats = self.analyze_base_clusters(available_clusters)
        llm_stats = self.analyze_llm_clusters(available_clusters)
        base_quality = self.analyze_entry_quality(base_stats, is_llm=False)
        llm_quality = self.analyze_entry_quality(llm_stats, is_llm=True)
        
        analysis = {
            "timestamp": time.time(),
            "summary": {
                "total_clusters": len(available_clusters),
                "base_clusters": {
                    "total": len(base_stats),
                    "complete": sum(1 for s in base_stats.values() if s.is_complete),
                    "incomplete": sum(1 for s in base_stats.values() if not s.is_complete)
                },
                "llm_clusters": {
                    "total": len(llm_stats),
                    "complete": sum(1 for s in llm_stats.values() if s.is_complete),
                    "incomplete": sum(1 for s in llm_stats.values() if not s.is_complete)
                }
            },
            "base_analysis": {
                name: {
                    "is_complete": stats.is_complete,
                    "files_found": stats.total_files_found,
                    "completion_percentage": stats.completion_percentage,
                    "execution_files": stats.execution_files,
                    "quality": base_quality.get(name, {}).language_stats if name in base_quality else {}
                }
                for name, stats in base_stats.items()
            },
            "llm_analysis": {
                name: {
                    "is_complete": stats.is_complete,
                    "files_found": stats.total_files_found,
                    "completion_percentage": stats.completion_percentage,
                    "execution_files": stats.execution_files,
                    "quality": llm_quality.get(name, {}).language_stats if name in llm_quality else {}
                }
                for name, stats in llm_stats.items()
            }
        }
        
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(analysis, f, indent=2, ensure_ascii=False)
            self.logger.info(f"Analisi esportata in: {output_file}")
        
        return analysis

def main():
    """Main function per eseguire l'analisi"""
    print("Cluster Execution Analyzer")
    print("=" * 50)
    
    # Inizializza analyzer
    analyzer = ClusterExecutionAnalyzer()
    
    # Genera report file-based
    print("Generazione report basato sui file...")
    file_report = analyzer.generate_file_based_report()
    print(file_report)
    
    print("\n\n")
    
    # Genera report qualità
    print("Generazione report qualità...")
    quality_report = analyzer.generate_quality_report()
    print(quality_report)
    
    # Esporta analisi JSON
    output_json = Path("cluster_analysis.json")
    analyzer.export_analysis_json(output_json)
    print(f"\nAnalisi completa esportata in: {output_json}")

if __name__ == "__main__":
    main()