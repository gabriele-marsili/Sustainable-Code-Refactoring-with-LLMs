#run all
import json
import subprocess
import os
import time
from utility_dir import utility_paths
from dataclasses import dataclass, field
from typing import Dict, List, Tuple, Set
import atexit
import logging
from pathlib import Path
import concurrent.futures
import threading
from collections import defaultdict
import re

# Cluster state management
execution_state = {
    "base_clusters_processed": [],
    "llm_clusters_processed": [],
    "failed_clusters": [],
    "skipped_clusters": [],
    "start_time": time.time()
}

@dataclass
class ClusterExecutionStatus:
    """Status di esecuzione di un singolo cluster"""
    cluster_name: str
    total_executions: int = 0
    successful_executions: int = 0
    failed_executions: int = 0
    error_details: List[Dict] = field(default_factory=list)
    completion_percentage: float = 0.0
    last_execution_time: str = ""
    
    def update_status(self, success: bool, execution_time: float, error_msg: str = ""):
        """Aggiorna lo status di esecuzione"""
        self.total_executions += 1
        if success:
            self.successful_executions += 1
        else:
            self.failed_executions += 1
            self.error_details.append({
                "execution": self.total_executions,
                "error": error_msg,
                "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
            })
        
        self.completion_percentage = (self.successful_executions / self.total_executions) * 100
        self.last_execution_time = time.strftime('%Y-%m-%d %H:%M:%S')
    
    @property
    def is_healthy(self) -> bool:
        """Determina se il cluster ha un buon tasso di successo"""
        if self.total_executions == 0:
            return True
        return self.completion_percentage >= 80.0
    
    @property 
    def should_retry(self) -> bool:
        """Determina se il cluster dovrebbe essere riprovato"""
        return self.failed_executions > 0 and self.completion_percentage < 60.0

@dataclass
class OptimizedClusterAnalyzer:
    """Analizzatore ottimizzato per lo stato dei cluster"""
    base_clusters: Dict[str, ClusterExecutionStatus] = field(default_factory=dict)
    llm_clusters: Dict[str, ClusterExecutionStatus] = field(default_factory=dict)
    
    def __post_init__(self):
        self.logger = logging.getLogger(f"{__name__}.ClusterAnalyzer")
        self._setup_logging()
    
    def _setup_logging(self):
        """Setup logging"""
        log_dir = utility_paths.SRC_DIR / "logs" / "cluster_analysis"
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_file = log_dir / f"analysis_{int(time.time())}.log"
        
        handler = logging.FileHandler(log_file)
        handler.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        
        self.logger.setLevel(logging.INFO)
        self.logger.addHandler(handler)
    
    def analyze_existing_outputs(self) -> Tuple[Set[str], Set[str]]:
        """Analizza output esistenti per determinare cluster già completati"""
        output_dir = utility_paths.OUTPUT_DIR_FILEPATH
        if not output_dir.exists():
            self.logger.warning(f"Output directory non trovata: {output_dir}")
            return set(), set()
        
        completed_base = set()
        completed_llm = set()
        
        # Pattern di riconoscimento file
        base_pattern = re.compile(r'([^/]+)_results_(\d+)\.json$')
        llm_pattern = re.compile(r'([^/]+)_results_v(\d+)_(\d+)\.json$')
        
        # Contatori per cluster
        base_counts = defaultdict(int)
        llm_counts = defaultdict(lambda: defaultdict(int))
        
        for filename in output_dir.iterdir():
            if not filename.is_file() or not filename.name.endswith('.json'):
                continue
            
            # Controlla pattern base
            base_match = base_pattern.match(filename.name)
            if base_match:
                cluster_name = base_match.group(1)
                if self._validate_output_file(filename):
                    base_counts[cluster_name] += 1
                    if base_counts[cluster_name] >= 5:  # Richiesti 5 file per completamento
                        completed_base.add(cluster_name)
                continue
            
            # Controlla pattern LLM
            llm_match = llm_pattern.match(filename.name)
            if llm_match:
                cluster_name = llm_match.group(1)
                prompt_version = int(llm_match.group(2))
                if self._validate_output_file(filename):
                    llm_counts[cluster_name][prompt_version] += 1
                    
                    # Controlla se tutte le versioni prompt sono complete
                    if all(llm_counts[cluster_name][v] >= 5 for v in range(1, 5)):
                        completed_llm.add(cluster_name)
        
        self.logger.info(f"Trovati {len(completed_base)} cluster base completati")
        self.logger.info(f"Trovati {len(completed_llm)} cluster LLM completati")
        
        return completed_base, completed_llm
    
    def _validate_output_file(self, file_path: Path) -> bool:
        """Validazione veloce di un file di output"""
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            results = data.get('results', {})
            if not results:
                return False
            
            # Controllo base: almeno una entry con ID
            for lang, entries in results.items():
                if not entries:
                    continue
                for entry in entries:
                    if 'id' in entry and 'filename' in entry:
                        return True
            
            return False
        except (json.JSONDecodeError, IOError, KeyError):
            return False
    
    def get_execution_priority(self, available_clusters: List[str], 
                             completed_base: Set[str], completed_llm: Set[str]) -> Tuple[List[str], List[str]]:
        """Determina priorità di esecuzione basata su fallimenti precedenti e dipendenze"""
        
        pending_base = [c for c in available_clusters if c not in completed_base]
        pending_llm = [c for c in available_clusters if c not in completed_llm]
        
        # Ordina per priorità (cluster più piccoli prima, cluster con meno fallimenti prima)
        def get_cluster_priority(cluster_name: str) -> Tuple[int, int, str]:
            cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
            
            # Dimensione cluster (entry count)
            size = 0
            try:
                with open(cluster_path, 'r') as f:
                    data = json.load(f)
                size = sum(len(entries) for entries in data.values())
            except Exception:
                size = 999  # Penalizza cluster non leggibili
            
            # Fallimenti precedenti
            status = self.base_clusters.get(cluster_name) or self.llm_clusters.get(cluster_name)
            failure_count = status.failed_executions if status else 0
            
            return (failure_count, size, cluster_name)
        
        pending_base.sort(key=get_cluster_priority)
        pending_llm.sort(key=get_cluster_priority)
        
        return pending_base, pending_llm

class OptimizedClusterRunner:
    """Runner ottimizzato per esecuzione parallela e intelligente dei cluster"""
    
    def __init__(self, max_concurrent_clusters=2):
        self.max_concurrent_clusters = max_concurrent_clusters
        self.analyzer = OptimizedClusterAnalyzer()
        self.lock = threading.RLock()
        
        # Statistics tracking
        self.stats = {
            'total_clusters_processed': 0,
            'successful_clusters': 0,
            'failed_clusters': 0,
            'skipped_clusters': 0,
            'start_time': time.time()
        }
        
        self._setup_logging()
        atexit.register(self.cleanup)
    
    def _setup_logging(self):
        """Setup logging per il runner"""
        log_dir = utility_paths.SRC_DIR / "logs" / "cluster_runner"
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_file = log_dir / f"runner_{int(time.time())}.log"
        
        # Setup logger
        self.logger = logging.getLogger(f"{__name__}.ClusterRunner")
        self.logger.setLevel(logging.INFO)
        
        # File handler
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Formatter
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
    
    def get_available_clusters(self) -> List[str]:
        """Ottiene tutti i cluster disponibili con filtri ottimizzati"""
        available_clusters = []
        clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH
        
        if not clusters_dir.exists():
            self.logger.error(f"Directory cluster non trovata: {clusters_dir}")
            return []
        
        for cluster_file in clusters_dir.iterdir():
            if not cluster_file.is_file() or not cluster_file.name.endswith('.json'):
                continue
            
            # Filtra cluster di debug/test
            if any(skip_pattern in cluster_file.name.lower() for skip_pattern in [
                'with_metrics', 'debug_', 'focused_', 'bad_entries', 'test_'
            ]):
                continue
            
            # Estrai nome cluster
            cluster_name = cluster_file.stem.replace("cluster_", "")
            available_clusters.append(cluster_name)
        
        self.logger.info(f"Trovati {len(available_clusters)} cluster disponibili")
        return sorted(available_clusters)
    
    def run_cluster_base(self, cluster_name: str, max_retries=2) -> bool:
        """Esecuzione ottimizzata test base per cluster"""
        for attempt in range(max_retries + 1):
            start_time = time.time()
            
            try:
                self.logger.info(f"Esecuzione BASE cluster {cluster_name} (tentativo {attempt + 1})")
                
                cmd = [
                    "python3", "run_tests_v2.py",
                    "--base-only",
                    "--cluster-name", f"cluster_{cluster_name}",
                    "--output-file", f"{cluster_name}_results",
                    "--webhook",
                    "--silent",
                    "--run_quantity", "5",
                    "--prompt-version", "1"
                ]
                
                result = subprocess.run(cmd, capture_output=True, text=True, timeout=1800)  # 30 min timeout
                
                execution_time = time.time() - start_time
                
                if result.returncode == 0:
                    self.logger.info(f"BASE cluster {cluster_name} completato in {execution_time:.2f}s")
                    
                    # Aggiorna statistics
                    with self.lock:
                        execution_state["base_clusters_processed"].append(cluster_name)
                        self.stats['successful_clusters'] += 1
                    
                    return True
                else:
                    error_msg = f"Errore BASE {cluster_name}: {result.stderr[-500:] if result.stderr else 'Unknown error'}"
                    self.logger.warning(error_msg)
                    
                    if attempt < max_retries:
                        wait_time = (attempt + 1) * 30  # Backoff progressivo
                        self.logger.info(f"Retry BASE {cluster_name} in {wait_time}s...")
                        time.sleep(wait_time)
                        continue
                    else:
                        with self.lock:
                            execution_state["failed_clusters"].append({
                                'cluster': cluster_name,
                                'type': 'base',
                                'error': error_msg
                            })
                        return False
                        
            except subprocess.TimeoutExpired:
                error_msg = f"Timeout BASE cluster {cluster_name} dopo {execution_time:.1f}s"
                self.logger.error(error_msg)
                
                if attempt < max_retries:
                    continue
                else:
                    with self.lock:
                        execution_state["failed_clusters"].append({
                            'cluster': cluster_name,
                            'type': 'base',
                            'error': error_msg
                        })
                    return False
                    
            except Exception as e:
                error_msg = f"Eccezione BASE {cluster_name}: {str(e)}"
                self.logger.error(error_msg)
                
                if attempt < max_retries:
                    time.sleep(60)  # Pausa più lunga per eccezioni
                    continue
                else:
                    with self.lock:
                        execution_state["failed_clusters"].append({
                            'cluster': cluster_name,
                            'type': 'base',
                            'error': error_msg
                        })
                    return False
        
        return False
    
    def run_cluster_llm(self, cluster_name: str, max_retries=2) -> bool:
        """Esecuzione ottimizzata test LLM per cluster"""
        success_count = 0
        
        for version in range(1, 5):  # Prompt versions 1-4
            for attempt in range(max_retries + 1):
                start_time = time.time()
                
                try:
                    self.logger.info(f"Esecuzione LLM cluster {cluster_name} v{version} (tentativo {attempt + 1})")
                    
                    cmd = [
                        "python3", "run_tests_v2.py",
                        "--llm-only",
                        "--cluster-name", f"cluster_{cluster_name}",
                        "--output-file", f"{cluster_name}_results_v{version}",
                        "--webhook",
                        "--silent",
                        "--run_quantity", "5",
                        "--prompt-version", str(version)
                    ]
                    
                    result = subprocess.run(cmd, capture_output=True, text=True, timeout=2400)  # 40 min timeout
                    
                    execution_time = time.time() - start_time
                    
                    if result.returncode == 0:
                        self.logger.info(f"LLM cluster {cluster_name} v{version} completato in {execution_time:.2f}s")
                        success_count += 1
                        break  # Esci dal loop retry per questa versione
                    else:
                        error_msg = f"Errore LLM {cluster_name} v{version}: {result.stderr[-500:] if result.stderr else 'Unknown error'}"
                        self.logger.warning(error_msg)
                        
                        if attempt < max_retries:
                            wait_time = (attempt + 1) * 45
                            self.logger.info(f"Retry LLM {cluster_name} v{version} in {wait_time}s...")
                            time.sleep(wait_time)
                        else:
                            self.logger.error(f"Fallimento definitivo LLM {cluster_name} v{version}")
                            
                except subprocess.TimeoutExpired:
                    error_msg = f"Timeout LLM cluster {cluster_name} v{version} dopo {execution_time:.1f}s"
                    self.logger.error(error_msg)
                    
                    if attempt < max_retries:
                        continue
                    else:
                        break
                        
                except Exception as e:
                    error_msg = f"Eccezione LLM {cluster_name} v{version}: {str(e)}"
                    self.logger.error(error_msg)
                    
                    if attempt < max_retries:
                        time.sleep(90)
                        continue
                    else:
                        break
        
        # Considera successo se almeno 3 su 4 versioni sono completate
        success = success_count >= 3
        
        with self.lock:
            if success:
                execution_state["llm_clusters_processed"].append(cluster_name)
                self.stats['successful_clusters'] += 1
            else:
                execution_state["failed_clusters"].append({
                    'cluster': cluster_name,
                    'type': 'llm',
                    'error': f"Solo {success_count}/4 versioni completate"
                })
        
        return success
    
    def run_cluster_batch(self, cluster_list: List[str], cluster_type: str) -> Dict[str, bool]:
        """Esecuzione batch ottimizzata con parallelismo controllato"""
        results = {}
        
        if not cluster_list:
            return results
        
        self.logger.info(f"Inizio batch {cluster_type}: {len(cluster_list)} cluster")
        
        # Funzione wrapper per esecuzione
        def execute_cluster(cluster_name: str) -> Tuple[str, bool]:
            try:
                if cluster_type == "base":
                    success = self.run_cluster_base(cluster_name)
                else:
                    success = self.run_cluster_llm(cluster_name)
                
                return cluster_name, success
            except Exception as e:
                self.logger.error(f"Errore esecuzione {cluster_name}: {e}")
                return cluster_name, False
        
        # Esecuzione parallela controllata
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_concurrent_clusters) as executor:
            # Submit tasks
            future_to_cluster = {
                executor.submit(execute_cluster, cluster): cluster 
                for cluster in cluster_list
            }
            
            # Collect results con progress tracking
            completed = 0
            for future in concurrent.futures.as_completed(future_to_cluster):
                cluster_name = future_to_cluster[future]
                
                try:
                    cluster_name, success = future.result(timeout=3600)  # 1 hour max per cluster
                    results[cluster_name] = success
                    
                    completed += 1
                    progress = (completed / len(cluster_list)) * 100
                    
                    status = "SUCCESS" if success else "FAILED"
                    self.logger.info(f"{cluster_type.upper()} Progress: {completed}/{len(cluster_list)} ({progress:.1f}%) - {cluster_name}: {status}")
                    
                except concurrent.futures.TimeoutError:
                    self.logger.error(f"Timeout globale per {cluster_name}")
                    results[cluster_name] = False
                except Exception as e:
                    self.logger.error(f"Eccezione future per {cluster_name}: {e}")
                    results[cluster_name] = False
        
        successful = sum(1 for success in results.values() if success)
        self.logger.info(f"Batch {cluster_type} completato: {successful}/{len(cluster_list)} successi")
        
        return results
    
    def run_all_clusters(self) -> bool:
        """Esecuzione completa e ottimizzata di tutti i cluster"""
        start_time = time.time()
        
        self.logger.info("Inizio esecuzione completa cluster")
        
        try:
            # Step 1: Analisi stato attuale
            available_clusters = self.get_available_clusters()
            completed_base, completed_llm = self.analyzer.analyze_existing_outputs()
            
            # Step 2: Determina cluster da processare
            pending_base, pending_llm = self.analyzer.get_execution_priority(
                available_clusters, completed_base, completed_llm
            )
            
            self.logger.info(f"Cluster da processare: {len(pending_base)} BASE, {len(pending_llm)} LLM")
            
            # Step 3: Esecuzione sequenziale per tipo (BASE prima di LLM)
            base_results = {}
            llm_results = {}
            
            if pending_base:
                self.logger.info("=== ESECUZIONE CLUSTER BASE ===")
                base_results = self.run_cluster_batch(pending_base, "base")
            
            if pending_llm:
                self.logger.info("=== ESECUZIONE CLUSTER LLM ===")
                # Piccola pausa per permettere cleanup tra batch
                time.sleep(30)
                llm_results = self.run_cluster_batch(pending_llm, "llm")
            
            # Step 4: Statistiche finali
            total_time = time.time() - start_time
            self._print_final_statistics(base_results, llm_results, total_time)
            
            # Considera successo se almeno 80% dei cluster sono completati
            total_attempted = len(base_results) + len(llm_results)
            total_successful = sum(base_results.values()) + sum(llm_results.values())
            
            success_rate = (total_successful / total_attempted) * 100 if total_attempted > 0 else 100
            
            return success_rate >= 80.0
            
        except Exception as e:
            self.logger.error(f"Errore critico in run_all_clusters: {e}")
            return False
        finally:
            self.cleanup()
    
    def _print_final_statistics(self, base_results: Dict[str, bool], 
                               llm_results: Dict[str, bool], total_time: float):
        """Stampa statistiche finali ottimizzate"""
        
        base_success = sum(1 for success in base_results.values() if success)
        base_total = len(base_results)
        
        llm_success = sum(1 for success in llm_results.values() if success)
        llm_total = len(llm_results)
        
        total_success = base_success + llm_success
        total_attempted = base_total + llm_total
        
        hours = int(total_time // 3600)
        minutes = int((total_time % 3600) // 60)
        seconds = int(total_time % 60)
        
        print("\n" + "="*80)
        print("STATISTICHE FINALI ESECUZIONE CLUSTER")
        print("="*80)
        
        print(f"Tempo totale esecuzione: {hours:02d}h {minutes:02d}m {seconds:02d}s")
        print()
        
        print("RISULTATI BASE:")
        print(f"  Completati con successo: {base_success}/{base_total} ({(base_success/base_total*100):.1f}%)" if base_total > 0 else "  Nessun cluster BASE processato")
        
        print("RISULTATI LLM:")
        print(f"  Completati con successo: {llm_success}/{llm_total} ({(llm_success/llm_total*100):.1f}%)" if llm_total > 0 else "  Nessun cluster LLM processato")
        
        print()
        print("TOTALE:")
        print(f"  Cluster processati: {total_attempted}")
        print(f"  Successi: {total_success}")
        print(f"  Fallimenti: {total_attempted - total_success}")
        print(f"  Tasso di successo: {(total_success/total_attempted*100):.1f}%" if total_attempted > 0 else "  N/A")
        
        # Cluster falliti
        failed_clusters = execution_state.get("failed_clusters", [])
        if failed_clusters:
            print(f"\nCLUSTER FALLITI ({len(failed_clusters)}):")
            for failure in failed_clusters[-10]:  # Mostra solo gli ultimi 10
                print(f"  - {failure.get('cluster', 'Unknown')} ({failure.get('type', 'unknown')}): {failure.get('error', 'Unknown error')[:100]}...")
        
        print("="*80)
        
        # Log dettagliato
        self.logger.info(f"Esecuzione completata: {total_success}/{total_attempted} successi in {total_time:.1f}s")
    
    def cleanup(self):
        """Cleanup finale"""
        self.logger.info("Cleanup esecuzione cluster completato")
        
        # Salva stato finale se necessario
        try:
            state_file = utility_paths.OUTPUT_DIR_FILEPATH / "execution_state.json"
            with open(state_file, 'w') as f:
                json.dump(execution_state, f, indent=2, default=str)
        except Exception as e:
            self.logger.warning(f"Impossibile salvare stato esecuzione: {e}")

def main():
    """Main function ottimizzata"""
    print("Avvio Optimized Cluster Runner...")
    print("="*60)
    
    # Configura runner con parallelismo controllato
    max_concurrent = min(os.cpu_count() or 2, 3)  # Max 3 cluster concorrenti
    runner = OptimizedClusterRunner(max_concurrent_clusters=max_concurrent)
    
    try:
        success = runner.run_all_clusters()
        
        if success:
            print("\nTutti i cluster sono stati processati con successo!")
            return 0
        else:
            print("\nAlcuni cluster hanno fallito. Controlla i log per dettagli.")
            return 1
            
    except KeyboardInterrupt:
        print("\nInterruzione utente rilevata. Cleanup in corso...")
        runner.cleanup()
        return 130
    except Exception as e:
        print(f"\nErrore critico: {e}")
        runner.cleanup()
        return 1

if __name__ == "__main__":
    exit(main())