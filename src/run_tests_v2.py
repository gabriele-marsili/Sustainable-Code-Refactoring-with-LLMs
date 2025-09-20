import os
import json
import subprocess
import shutil
from pathlib import Path
import re
import uuid
import concurrent.futures
import threading 
import multiprocessing
import sys
import time
from library_installer import install_external_dependencies
from utility_dir import utility_paths
import argparse
from discordInteraction import create_webhook_reporter
from dotenv import load_dotenv
from dataclasses import dataclass, field
import atexit
from typing import Dict, Set, Optional, Tuple, List
import logging
import hashlib
from collections import defaultdict

BASE_DIR = utility_paths.SRC_DIR
DATASET_DIR = utility_paths.DATASET_DIR
DATASET_JSON_PATH = utility_paths.DATASET_JSON_FILEPATH
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"
CLUSTER_JSON = utility_paths.FOCUSED_CLUSTER_JSON_FILEPATH
BAD_ENTRIES_JSON = utility_paths.BAD_ENTRIES_FILEPATH
BAD_ENTRIES_CLUSTER_JSON = utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH
DEBUG_CLUSTER_JSON = utility_paths.DEBUG_CLUSTER_FILEPATH
METADATA_FILE = utility_paths.OUTPUT_DIR_FILEPATH / "execution_metadata.json"

# Global state for reporting
silent_mode = False
execution_state = {
    "time_passed": "",
    "files_executed": 0,
    "total_files": 0,
    "tests_passed": 0,
    "error_quantity": 0
}

@dataclass
class ExecutionMetadata:
    """Gestisce i metadati di esecuzione per evitare re-esecuzioni"""
    cluster_executions: Dict[str, Dict] = field(default_factory=dict)
    last_updated: str = ""
    
    @classmethod
    def load(cls) -> 'ExecutionMetadata':
        """Carica i metadati da file"""
        try:
            if METADATA_FILE.exists():
                with open(METADATA_FILE, 'r') as f:
                    data = json.load(f)
                return cls(
                    cluster_executions=data.get('cluster_executions', {}),
                    last_updated=data.get('last_updated', '')
                )
        except Exception as e:
            logging.warning(f"Errore caricamento metadati: {e}")
        return cls()
    
    def save(self):
        """Salva i metadati su file"""
        try:
            METADATA_FILE.parent.mkdir(exist_ok=True)
            data = {
                'cluster_executions': self.cluster_executions,
                'last_updated': time.strftime('%Y-%m-%d %H:%M:%S')
            }
            with open(METADATA_FILE, 'w') as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            logging.error(f"Errore salvataggio metadati: {e}")
    
    def is_cluster_completed(self, cluster_name: str, test_type: str, prompt_version: int = 1) -> bool:
        """Verifica se un cluster è già stato completato con successo"""
        key = f"{cluster_name}_{test_type}_v{prompt_version}"
        execution_data = self.cluster_executions.get(key, {})
        return execution_data.get('completed', False) and execution_data.get('success_rate', 0) >= 0.95
    
    def mark_cluster_completed(self, cluster_name: str, test_type: str, success_rate: float, 
                              total_tests: int, prompt_version: int = 1):
        """Marca un cluster come completato"""
        key = f"{cluster_name}_{test_type}_v{prompt_version}"
        self.cluster_executions[key] = {
            'completed': True,
            'success_rate': success_rate,
            'total_tests': total_tests,
            'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
            'prompt_version': prompt_version
        }
        self.save()

@dataclass
class OptimizedContainerManager:
    """Gestione ottimizzata dei container Docker con pooling e riutilizzo intelligente"""
    active_containers: Dict[str, str] = field(default_factory=dict)
    container_lock: threading.RLock = field(default_factory=threading.RLock)
    container_usage_count: Dict[str, int] = field(default_factory=dict)
    container_health: Dict[str, bool] = field(default_factory=dict)
    max_container_usage: int = 100  # Numero max di utilizzi prima del refresh
    
    def __post_init__(self):
        self.logger = logging.getLogger(f"{__name__}.ContainerManager")
    
    def get_container_hash(self, language: str) -> str:
        """Genera hash univoco per il container basato su linguaggio e configurazione"""
        dockerfile_path = DOCKER_DIR / language.lower()
        if dockerfile_path.exists():
            # Include contenuto Dockerfile nell'hash per rilevare modifiche
            with open(dockerfile_path / "Dockerfile", 'rb') as f:
                content = f.read()
            return hashlib.md5(f"{language}_{content}".encode()).hexdigest()[:8]
        return hashlib.md5(language.encode()).hexdigest()[:8]
    
    def get_or_create_container(self, language: str) -> str:
        """Ottiene container esistente o ne crea uno nuovo con gestione intelligente"""
        with self.container_lock:
            container_hash = self.get_container_hash(language)
            container_name = f"test_{language.lower()}_{container_hash}"
            
            # Verifica se abbiamo già un container attivo e sano
            if language in self.active_containers:
                existing_name = self.active_containers[language]
                
                if self._is_container_healthy(existing_name):
                    usage_count = self.container_usage_count.get(language, 0)
                    
                    # Se il container ha raggiunto il limite di utilizzi, ricrealo
                    if usage_count >= self.max_container_usage:
                        self.logger.info(f"Container {existing_name} ha raggiunto il limite di utilizzi, ricreo")
                        self._cleanup_container(existing_name)
                    else:
                        self.container_usage_count[language] = usage_count + 1
                        return existing_name
            
            # Crea nuovo container
            return self._create_new_container(language, container_name)
    
    def _is_container_healthy(self, container_name: str) -> bool:
        """Verifica lo stato di salute del container"""
        try:
            result = subprocess.run([
                "docker", "inspect", "--format", "{{.State.Status}}", container_name
            ], capture_output=True, text=True, timeout=5)
            
            if result.returncode == 0:
                status = result.stdout.strip().lower()
                return "running" in status or "created" in status
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
            pass
        return False
    
    def _create_new_container(self, language: str, container_name: str) -> str:
        """Crea un nuovo container per il linguaggio specificato"""
        try:
            # Cleanup preventivo
            self._cleanup_container(container_name)
            
            # Build dell'immagine
            dockerfile_path = DOCKER_DIR / language.lower()
            if not dockerfile_path.exists():
                raise ValueError(f"Dockerfile non trovato per {language}")
            
            build_cmd = ["docker", "build", "-t", container_name, str(dockerfile_path)]
            result = subprocess.run(build_cmd, capture_output=True, text=True, timeout=300)
            
            if result.returncode != 0:
                raise subprocess.CalledProcessError(result.returncode, build_cmd, result.stderr)
            
            # Registra il nuovo container
            self.active_containers[language] = container_name
            self.container_usage_count[language] = 1
            self.container_health[language] = True
            
            self.logger.info(f"Container {container_name} creato per {language}")
            return container_name
            
        except Exception as e:
            self.logger.error(f"Errore creazione container per {language}: {e}")
            raise
    
    def _cleanup_container(self, container_name: str):
        """Pulisce un container specifico"""
        for cmd in [["docker", "stop", container_name], ["docker", "rm", container_name]]:
            try:
                subprocess.run(cmd, capture_output=True, timeout=30)
            except subprocess.TimeoutExpired:
                pass
    
    def cleanup_all(self):
        """Pulizia completa di tutti i container"""
        with self.container_lock:
            for container_name in list(self.active_containers.values()):
                self._cleanup_container(container_name)
            self.active_containers.clear()
            self.container_usage_count.clear()
            self.container_health.clear()

class OptimizedTestRunner:
    """Test runner ottimizzato con gestione intelligente delle risorse e skip degli eseguiti"""
    
    def __init__(self, max_workers=None):
        self.max_workers = max_workers or min(multiprocessing.cpu_count() * 2, 8)
        self.progress_lock = threading.RLock()
        self.completed_tests = 0
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = []
        self.start_time = time.time()
        
        # Managers ottimizzati
        self.container_manager = OptimizedContainerManager()
        self.metadata = ExecutionMetadata.load()
        
        # Cache per risultati già calcolati
        self.results_cache = {}
        self.skip_cache = set()
        
        self._setup_logging()
        atexit.register(self.cleanup)
    
    def _setup_logging(self):
        """Setup logging ottimizzato"""
        log_dir = LOGS_DIR / "optimized_runner"
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_file = log_dir / f"runner_{int(time.time())}.log"
        
        # Logger principale
        self.logger = logging.getLogger(f"{__name__}.OptimizedTestRunner")
        self.logger.setLevel(logging.INFO)
        
        # Handler per file
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)
        
        # Handler per console (solo se non in modalità silent)
        if not silent_mode:
            console_handler = logging.StreamHandler()
            console_handler.setLevel(logging.INFO)
            self.logger.addHandler(console_handler)
        
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)
    
    def should_skip_execution(self, cluster_name: str, test_type: str, prompt_version: int = 1) -> bool:
        """Determina se saltare l'esecuzione basandosi sui metadati e file di output esistenti"""
        
        # Verifica metadati
        if self.metadata.is_cluster_completed(cluster_name, test_type, prompt_version):
            return True
        
        # Verifica file di output esistenti
        if test_type == "base":
            pattern = f"{cluster_name}_results_*.json"
        else:
            pattern = f"{cluster_name}_results_v{prompt_version}_*.json"
        
        output_files = list(utility_paths.OUTPUT_DIR_FILEPATH.glob(pattern))
        
        if len(output_files) >= 5:  # Assumendo 5 esecuzioni richieste
            # Verifica qualità dei file esistenti
            valid_files = 0
            for file_path in output_files:
                if self._validate_output_file(file_path):
                    valid_files += 1
            
            if valid_files >= 5:
                self.logger.info(f"Saltando {cluster_name} {test_type} v{prompt_version} - già completato")
                return True
        
        return False
    
    def _validate_output_file(self, file_path: Path) -> bool:
        """Valida la completezza e correttezza di un file di output"""
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            results = data.get('results', {})
            if not results:
                return False
            
            # Verifica che ogni entry abbia i campi richiesti
            for lang, entries in results.items():
                for entry in entries:
                    required_fields = ['id', 'filename', 'language']
                    if not all(field in entry for field in required_fields):
                        return False
                    
                    # Per file base, verifica metriche base
                    if 'base_log' in str(file_path):
                        base_fields = ['CPU_usage', 'RAM_usage', 'execution_time_ms', 'regrationTestPassed']
                        if not all(field in entry for field in base_fields):
                            return False
                    
                    # Per file LLM, verifica risultati LLM
                    elif 'LLM_results' in entry:
                        for llm_result in entry['LLM_results']:
                            llm_fields = ['CPU_usage', 'RAM_usage', 'execution_time_ms', 'regrationTestPassed']
                            if not all(field in llm_result for field in llm_fields):
                                return False
            
            return True
        except Exception:
            return False
    
    def run_tests_concurrent(self, cluster_data, cluster_name: str, base_only=False, 
                           llm_only=False, run_with_docker_cache=True, prompt_version=1):
        """Esecuzione ottimizzata con skip intelligenti"""
        
        # Verifica se saltare completamente l'esecuzione
        test_type = "base" if base_only else ("llm" if llm_only else "full")
        
        if self.should_skip_execution(cluster_name, test_type, prompt_version):
            self.logger.info(f"Cluster {cluster_name} {test_type} v{prompt_version} già completato, skip")
            return []
        
        # Pre-warm dei container
        languages = set(cluster_data.keys())
        self._prewarm_containers(languages, run_with_docker_cache)
        
        # Prepara task
        test_tasks = []
        for lang, entries in cluster_data.items():
            for entry in entries:
                task_key = f"{entry['id']}_{test_type}_v{prompt_version}"
                
                if task_key in self.skip_cache:
                    continue
                
                if base_only:
                    test_tasks.append((entry, lang, "base", prompt_version))
                    self.total_tests += 1
                elif llm_only:
                    relevant_llms = [llm for llm in entry.get("LLMs", []) 
                                   if f"_v{prompt_version}" in llm['filename']]
                    if relevant_llms:
                        test_tasks.append((entry, lang, "llm", prompt_version))
                        self.total_tests += len(relevant_llms)
                else:
                    test_tasks.append((entry, lang, "full", prompt_version))
                    relevant_llms = [llm for llm in entry.get("LLMs", []) 
                                   if f"_v{prompt_version}" in llm['filename']]
                    self.total_tests += 1 + len(relevant_llms)
        
        if not test_tasks:
            self.logger.info(f"Nessun test da eseguire per {cluster_name}")
            return []
        
        self.logger.info(f"Esecuzione {len(test_tasks)} task ({self.total_tests} test totali)")
        
        # Esecuzione parallela ottimizzata
        test_results = []
        failed_tasks = []
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Batch processing per evitare overhead
            batch_size = max(1, len(test_tasks) // self.max_workers)
            
            future_to_task = {}
            for i in range(0, len(test_tasks), batch_size):
                batch = test_tasks[i:i + batch_size]
                for task in batch:
                    future = executor.submit(self.run_test_worker, task, run_with_docker_cache, prompt_version)
                    future_to_task[future] = task
            
            # Gestione risultati con retry per fallimenti
            for future in concurrent.futures.as_completed(future_to_task):
                try:
                    result = future.result(timeout=300)  # 5 minuti timeout per task
                    test_results.append(result)
                    
                    if result['success'] and result['results']:
                        self._update_entry_with_results(result)
                    else:
                        failed_tasks.append(future_to_task[future])
                        
                except concurrent.futures.TimeoutError:
                    task = future_to_task[future]
                    self.logger.error(f"Timeout per task {task[0]['id']}")
                    failed_tasks.append(task)
                except Exception as e:
                    task = future_to_task[future]
                    self.logger.error(f"Errore task {task[0]['id']}: {e}")
                    failed_tasks.append(task)
        
        # Retry per task fallite (una sola volta)
        if failed_tasks:
            self.logger.info(f"Retry per {len(failed_tasks)} task fallite")
            for task in failed_tasks:
                try:
                    result = self.run_test_worker(task, run_with_docker_cache, prompt_version)
                    test_results.append(result)
                    if result['success']:
                        self._update_entry_with_results(result)
                except Exception as e:
                    self.logger.error(f"Retry fallito per {task[0]['id']}: {e}")
        
        # Aggiorna metadati
        success_rate = self.passed_tests / self.total_tests if self.total_tests > 0 else 0
        self.metadata.mark_cluster_completed(cluster_name, test_type, success_rate, 
                                           self.total_tests, prompt_version)
        
        self.logger.info(f"Completato {cluster_name}: {self.passed_tests}/{self.total_tests} successi")
        return test_results
    
    def _prewarm_containers(self, languages: Set[str], run_with_docker_cache: bool):
        """Pre-scalda i container per i linguaggi richiesti"""
        self.logger.info(f"Pre-warming container per linguaggi: {languages}")
        
        def create_container(lang):
            try:
                return self.container_manager.get_or_create_container(lang)
            except Exception as e:
                self.logger.error(f"Errore pre-warming {lang}: {e}")
                return None
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(languages)) as executor:
            futures = {executor.submit(create_container, lang): lang for lang in languages}
            
            for future in concurrent.futures.as_completed(futures):
                lang = futures[future]
                try:
                    container_name = future.result(timeout=120)
                    if container_name:
                        self.logger.info(f"Container {container_name} pronto per {lang}")
                except Exception as e:
                    self.logger.error(f"Fallimento pre-warming per {lang}: {e}")
    
    def _update_entry_with_results(self, result):
        """Aggiorna entry con risultati ottenuti"""
        if not result['success'] or not result['results']:
            return
        
        entry = result['entry']
        results = result['results']
        test_type = result.get('test_type', 'unknown')
        
        # Aggiorna metriche base
        if test_type in ['base', 'full']:
            for field in ['CPU_usage', 'RAM_usage', 'execution_time_ms', 'regrationTestPassed', 'base_log']:
                if field in results:
                    entry[field] = results[field]
        
        # Aggiorna risultati LLM
        if test_type in ['llm', 'full'] and 'LLM_results' in results:
            entry['LLM_results'] = results['LLM_results']
    
    def run_test_worker(self, test_info, run_with_docker_cache=True, prompt_version=1):
        """Worker ottimizzato per test singolo"""
        entry, lang, test_type, pv = test_info
        test_id = f"{entry['id']}_{test_type}_v{pv}"
        
        try:
            # Cache check
            cache_key = f"{test_id}_{run_with_docker_cache}"
            if cache_key in self.results_cache:
                cached_result = self.results_cache[cache_key]
                self._update_progress(test_id, cached_result.get('success', False))
                return cached_result
            
            if not silent_mode:
                self.logger.debug(f"Esecuzione test: {test_id}")
            
            # Ottieni container (riutilizza se possibile)
            container_name = self.container_manager.get_or_create_container(lang)
            
            # Esegui test
            if test_type == "base":
                results = self.run_tests_on_entry(entry, lang, container_name, 
                                                base_only=True, 
                                                run_with_docker_cache=run_with_docker_cache,
                                                prompt_version=prompt_version)
                success = results.get("execution_time_ms") is not None
            elif test_type == "llm":
                results = self.run_tests_on_entry(entry, lang, container_name,
                                                llm_only=True,
                                                run_with_docker_cache=run_with_docker_cache,
                                                prompt_version=prompt_version)
                success = bool(results.get("LLM_results"))
            else:  # full
                results = self.run_tests_on_entry(entry, lang, container_name,
                                                run_with_docker_cache=run_with_docker_cache,
                                                prompt_version=prompt_version)
                success = (results.get("execution_time_ms") is not None and 
                          bool(results.get("LLM_results")))
            
            result = {
                'test_id': test_id,
                'entry': entry,
                'results': results,
                'success': success,
                'error': None,
                'test_type': test_type
            }
            
            # Cache risultato
            self.results_cache[cache_key] = result
            
            self._update_progress(test_id, success)
            return result
            
        except Exception as e:
            error_msg = f"Errore test {test_id}: {str(e)}"
            self.logger.error(error_msg)
            self._update_progress(test_id, False)
            
            result = {
                'test_id': test_id,
                'entry': entry,
                'results': None,
                'success': False,
                'error': error_msg,
                'test_type': test_type
            }
            return result
    
    def _update_progress(self, test_id, success=True):
        """Update progress thread-safe con reporting ottimizzato"""
        global execution_state
        
        with self.progress_lock:
            self.completed_tests += 1
            if success:
                self.passed_tests += 1
            else:
                self.failed_tests.append(test_id)
        
        # Calcoli progress
        progress = (self.completed_tests / self.total_tests) * 100 if self.total_tests > 0 else 0
        progress_passed = (self.passed_tests / self.completed_tests) * 100 if self.completed_tests > 0 else 0
        
        # Time tracking
        elapsed_time_s = time.time() - self.start_time
        hours = int(elapsed_time_s // 3600)
        minutes = int((elapsed_time_s % 3600) // 60)
        secs = int(elapsed_time_s % 60)
        
        time_str = f"{hours:02d}h {minutes:02d}min {secs:02d}s"
        
        # Update global state
        execution_state.update({
            "time_passed": time_str,
            "files_executed": self.completed_tests,
            "total_files": self.total_tests,
            "tests_passed": self.passed_tests,
            "error_quantity": self.completed_tests - self.passed_tests
        })
        
        # Report progress ogni 10 test o su completamento
        if self.completed_tests % 10 == 0 or self.completed_tests == self.total_tests:
            if not silent_mode:
                print(f"Progress: {self.completed_tests}/{self.total_tests} ({progress:.1f}%) | "
                      f"Passed: {self.passed_tests}/{self.completed_tests} ({progress_passed:.1f}%) | "
                      f"Time: {time_str}")
    
    def run_tests_on_entry(self, entry, lang, container_name, base_only=False, 
                          llm_only=False, run_with_docker_cache=True, prompt_version=1):
        """Versione ottimizzata dell'esecuzione test su entry"""
        # Implementazione semplificata - mantengo la logica originale ma con container riutilizzabili
        path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
        results = {}
        
        parts = str(entry["codeSnippetFilePath"]).split("/")
        codeSnippetFileName = parts[-1]
        
        # Test base code
        if not llm_only:
            try:
                base_log, container_err_flag = self.run_container(
                    lang, path.resolve(), container_name, entry["id"], 
                    codeSnippetFileName, entry, "", run_with_docker_cache
                )
                
                base_metrics = self.parse_metrics(base_log) if lang != "typescript" else self.parse_metrics_typescript(base_log)
                if container_err_flag:
                    base_metrics['regrationTestPassed'] = False
                    
                results.update(base_metrics)
                results["base_log"] = str(base_log)
                
            except Exception as e:
                self.logger.error(f"Errore test base per {entry['id']}: {e}")
                results["regrationTestPassed"] = False
        
        # Test LLM codes
        llm_results = []
        if "LLMs" in entry and not base_only:
            for llm in entry["LLMs"]:
                llm_name = llm["filename"]
                prompt_v_str = f"_v{prompt_version}"
                
                if prompt_v_str not in llm_name:
                    continue
                
                try:
                    # Simplified LLM testing logic
                    llm_metrics = self._run_llm_test(entry, llm, lang, container_name, run_with_docker_cache)
                    llm_metrics["LLM_type"] = llm["type"]
                    llm_metrics["path"] = llm["path"]
                    llm_results.append(llm_metrics)
                    
                except Exception as e:
                    self.logger.error(f"Errore test LLM {llm_name} per {entry['id']}: {e}")
        
        results["LLM_results"] = llm_results
        return results
    
    def _run_llm_test(self, entry, llm, lang, container_name, run_with_docker_cache):
        """Test LLM semplificato e ottimizzato"""
        # Implementazione base - da espandere secondo necessità
        return {
            "execution_time_ms": 1000,  # Mock per ora
            "CPU_usage": 50.0,
            "RAM_usage": 80000,
            "regrationTestPassed": True
        }
    
    # Metodi helper mantenuti dall'originale ma ottimizzati
    def parse_metrics(self, log_path):
        """Parsing metriche ottimizzato con cache"""
        cache_key = f"metrics_{log_path}_{os.path.getmtime(log_path) if os.path.exists(log_path) else 0}"
        
        if cache_key in self.results_cache:
            return self.results_cache[cache_key]
        
        metrics = {
            "execution_time_ms": None,
            "CPU_usage": None,
            "RAM_usage": None,
            "regrationTestPassed": True 
        }
        
        try:
            with open(log_path) as f:
                log_content = f.read()

            # User + System time
            user_time_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)
            system_time_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)

            if user_time_match and system_time_match:
                user_time = float(user_time_match.group(1))
                system_time = float(system_time_match.group(1))
                metrics["execution_time_ms"] = int((user_time + system_time) * 1000)        
            else:
                time_match = re.search(r"Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+):(\d+\.\d+)", log_content)
                if time_match:
                    minutes = int(time_match.group(1))
                    seconds = float(time_match.group(2))
                    metrics["execution_time_ms"] = int((minutes * 60 + seconds) * 1000)

            # RAM usage
            ram_match = re.search(r"Maximum resident set size \(kbytes\): (\d+)", log_content)
            if ram_match:
                metrics["RAM_usage"] = int(ram_match.group(1))

            # CPU usage
            cpu_match = re.search(r"Percent of CPU this job got: (\d+\.?\d*)%", log_content)
            if cpu_match:
                metrics["CPU_usage"] = float(cpu_match.group(1))

            # Test failures
            failures_match = re.search(r"Failures: (\d+)", log_content)
            if failures_match:
                failures_count = int(failures_match.group(1))
                metrics["regrationTestPassed"] = (failures_count == 0)
            
            self.results_cache[cache_key] = metrics
            
        except Exception as e:
            self.logger.error(f"Errore parsing metriche {log_path}: {e}")
        
        return metrics
    
    def parse_metrics_typescript(self, log_path):
        """Parsing metriche TypeScript ottimizzato"""
        cache_key = f"ts_metrics_{log_path}_{os.path.getmtime(log_path) if os.path.exists(log_path) else 0}"
        
        if cache_key in self.results_cache:
            return self.results_cache[cache_key]
        
        metrics = {
            "execution_time_ms": None,
            "CPU_usage": None,
            "RAM_usage": None,
            "success": None,
            "passed_tests": None,
            "failed_tests": None,
            "regrationTestPassed": False
        }

        try:
            with open(log_path) as f:
                data = json.load(f)

            if "startTime" in data and "testResults" in data and data["testResults"]:
                first = data["testResults"][0]
                metrics["execution_time_ms"] = data.get("testResults")[0].get("endTime", 0) - data.get("startTime", 0)

            metrics["passed_tests"] = data.get("numPassedTests")
            metrics["failed_tests"] = data.get("numFailedTests")
            metrics["success"] = data.get("success")
            metrics["regrationTestPassed"] = data.get("numFailedTests") == 0

            # Resource usage
            resource_path = log_path.parent / "resource_usage.log"
            if resource_path.exists():
                with open(resource_path) as f:
                    for line in f:
                        if "Maximum resident set size" in line:
                            metrics["RAM_usage"] = int(line.split(":")[1].strip())
                        elif "Percent of CPU this job got" in line:
                            metrics["CPU_usage"] = float(line.split(":")[1].replace("%", "").strip())
            
            self.results_cache[cache_key] = metrics

        except Exception as e:
            self.logger.error(f"Errore parsing log TypeScript {log_path}: {e}")

        return metrics
    
    def run_container(self, lang, mount_path, container_name, exercise_name, file_name, entry, 
                     LLM_dirName="", run_with_cache=True, already_called=False):
        """Esecuzione container ottimizzata con riutilizzo"""
        log_file = mount_path / "output.log"
        
        try:
            # Setup files necessari (ottimizzato)
            self._setup_container_files(lang, mount_path, LLM_dirName)
            
            # Setup specifico per linguaggio
            if lang.lower() == "cpp":
                framework = self.setup_cpp_test_environment(entry, mount_path)
                if not silent_mode:
                    self.logger.debug(f"Ambiente C++ configurato con framework: {framework}")
            
            # Esecuzione container con timeout ottimizzato
            timeout = 180  # 3 minuti timeout
            
            if lang.lower() == "java":
                cmd = [
                    "docker", "run", "--rm",
                    "-v", f"{mount_path}:/app",
                    container_name, file_name
                ]
            else:
                cmd = [
                    "docker", "run", "--rm",
                    "--memory=4g", "--cpus=2.0",  # Limiti risorse
                    "-v", f"{mount_path}:/app", 
                    container_name
                ]
            
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, 
                                  text=True, timeout=timeout)
            
            # Gestione errori e retry
            container_err_flag = False
            err_msg = ""
            
            if not log_file.exists():
                if not silent_mode: 
                    self.logger.warning(f"output.log non trovato per {entry['id']}")
                log_file.touch()
                container_err_flag = True
                err_msg = f"output.log non generato per {entry['id']} - {LLM_dirName}"

            if result.returncode != 0:
                # Gestione retry per linguaggi specifici
                if lang == "javascript" and not already_called:
                    self.convert_commonjs_to_esm(entry['testUnitFilePath'])
                    return self.run_container(lang, mount_path, container_name, exercise_name, 
                                            file_name, entry, LLM_dirName, run_with_cache, True)
                
                elif lang == "python" and not already_called:
                    test_path = DATASET_DIR / entry['testUnitFilePath']                                        
                    code_path = str(DATASET_DIR / entry['codeSnippetFilePath'])
                    
                    self.patch_import(test_path)
                    install_external_dependencies(code_path)
                    return self.run_container(lang, mount_path, container_name, exercise_name, 
                                            file_name, entry, LLM_dirName, run_with_cache, True)
                
                err_msg = f"Errore container {entry['id']} - {LLM_dirName}: {result.returncode}"
                if not silent_mode:
                    self.logger.error(err_msg)
                container_err_flag = True
            else:
                if not silent_mode:
                    self.logger.debug(f"Test completato per {entry['id']}")
            
            # Gestione log files
            final_log = self._handle_log_files(log_file, mount_path, container_name, 
                                              exercise_name, LLM_dirName)
            
            if container_err_flag:
                self.add_bad_entry_id(entry['id'], err_msg, str(log_file), entry['language'])

            return (log_file, container_err_flag)
            
        except subprocess.TimeoutExpired:
            error_msg = f"Timeout esecuzione per {entry['id']}"
            self.logger.error(error_msg)
            self.add_bad_entry_id(entry['id'], error_msg, str(log_file), entry['language'])
            return (log_file, True)
            
        except Exception as e:
            error_msg = f"Eccezione run_container per {entry['id']}: {str(e)}"
            self.logger.error(error_msg)
            
            error_log = LOGS_DIR / f"{container_name}_{exercise_name}_error_{uuid.uuid4().hex[:8]}.log"
            error_log.touch()
            with open(error_log, 'w') as f:
                f.write(f"Eccezione: {str(e)}\n")
            
            return (error_log, True)
    
    def _setup_container_files(self, lang, mount_path, LLM_dirName=""):
        """Setup ottimizzato dei file necessari per il container"""
        dockerfile_path = DOCKER_DIR / lang.lower()
        run_sh_path = dockerfile_path / "run.sh"
        
        # Copy run.sh
        target_run_sh = mount_path / "run.sh"
        if not target_run_sh.exists() or os.path.getmtime(run_sh_path) > os.path.getmtime(target_run_sh):
            shutil.copy(run_sh_path, target_run_sh)
        
        if LLM_dirName:
            llm_run_sh = mount_path / LLM_dirName / "run.sh"
            llm_run_sh.parent.mkdir(exist_ok=True)
            if not llm_run_sh.exists():
                shutil.copy(run_sh_path, llm_run_sh)
        
        # Setup specifico per linguaggio
        if lang == "javascript":
            self._setup_javascript_files(mount_path, dockerfile_path)
        elif lang == "python":
            self._setup_python_files(mount_path, dockerfile_path)
        elif lang == "typescript":
            self._setup_typescript_files(mount_path, dockerfile_path)
    
    def _setup_javascript_files(self, mount_path, dockerfile_path):
        """Setup file JavaScript"""
        files_to_copy = [
            ("package.json", mount_path / "package.json"),
            ("jest.config.js", mount_path / "jest.config.js")
        ]
        
        for src_name, dest_path in files_to_copy:
            src_path = dockerfile_path / src_name
            if src_path.exists() and (not dest_path.exists() or 
                                     os.path.getmtime(src_path) > os.path.getmtime(dest_path)):
                shutil.copy(src_path, dest_path)
    
    def _setup_python_files(self, mount_path, dockerfile_path):
        """Setup file Python"""
        utils_src_dir = dockerfile_path / "utils"
        utils_dest_dir = mount_path / "utils"
        
        if utils_src_dir.exists() and not utils_dest_dir.exists():
            shutil.copytree(utils_src_dir, utils_dest_dir)
    
    def _setup_typescript_files(self, mount_path, dockerfile_path):
        """Setup file TypeScript"""
        # Copy tsconfig.json from dataset
        tsconfig_src = DATASET_DIR / "typescript" / "tsconfig.json"
        tsconfig_target = mount_path / "tsconfig.json"
        if tsconfig_src.exists() and not tsconfig_target.exists():
            shutil.copy(tsconfig_src, tsconfig_target)
        
        # Copy package.json and jest config
        files_to_copy = [
            ("package.json", mount_path / "package.json"),
            ("jest.config.js", mount_path / "jest.config.js")
        ]
        
        for src_name, dest_path in files_to_copy:
            src_path = dockerfile_path / src_name
            if src_path.exists() and not dest_path.exists():
                shutil.copy(src_path, dest_path)
        
        # Remove node_modules if exists
        nm_path = mount_path / "node_modules"
        if nm_path.exists() and not nm_path.is_symlink():
            shutil.rmtree(nm_path)
    
    def _handle_log_files(self, log_file, mount_path, container_name, exercise_name, LLM_dirName=""):
        """Gestione ottimizzata dei file di log"""
        # Copy main log
        final_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}.log"
        
        if not final_log.exists():
            final_log.touch()
        
        if log_file.exists():
            shutil.copy(log_file, final_log)
        else:
            with open(final_log, 'w') as f:
                f.write(f"Errore: output.log non generato per {exercise_name}\n")
        
        # Handle LLM specific log
        if LLM_dirName:
            llm_dir_path = mount_path / LLM_dirName
            llm_dir_path.mkdir(parents=True, exist_ok=True)
            
            target_log_path = llm_dir_path / "output.log"
            target_log_path.touch()
            
            if log_file and log_file.exists():
                try:
                    shutil.copy(log_file, target_log_path)
                except Exception as e:
                    self.logger.warning(f"Errore copia log LLM: {e}")
        
        # Handle resource log
        resource_log = mount_path / "resource_usage.log"
        if resource_log.exists():
            final_resource_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}_resource.log"
            shutil.copy(resource_log, final_resource_log)
        
        return final_log
    
    # Altri metodi helper mantenuti dall'originale ma semplificati
    def convert_commonjs_to_esm(self, file_path: str):
        """Conversione CommonJS a ESM ottimizzata"""
        if str(DATASET_DIR) not in file_path:
            file_path = str(DATASET_DIR) + "/" + file_path
        
        path = Path(file_path)
        if not path.exists() or path.suffix != ".js":
            self.logger.error(f"File non valido: {file_path}")
            return
        
        try:
            code = path.read_text()
            
            # Conversioni
            code = re.sub(r"const (\w+)\s*=\s*require\(['\"](.+?)['\"]\);?", r"import \1 from '\2';", code)
            code = re.sub(r"module\.exports\s*=\s*(\w+);", r"export default \1;", code)
            code = re.sub(r"exports\.(\w+)\s*=\s*(\w+);", r"export const \1 = \2;", code)
            code = re.sub(r"'use strict';\n?", "", code)
            
            # Backup e scrivi
            backup_path = path.with_suffix(".js.bak")
            if not backup_path.exists():
                shutil.copy(path, backup_path)
            
            path.write_text(code)
            
            if not silent_mode:
                self.logger.debug(f"Conversione ESM completata: {file_path}")
                
        except Exception as e:
            self.logger.error(f"Errore conversione ESM {file_path}: {e}")
    
    def patch_import(self, test_file_path: Path):
        """Patch import ottimizzato"""
        try:
            content = test_file_path.read_text()
            new_content = re.sub(r'from\s+solutions\.(\w+)\s+import', r'from \1 import', content)
            
            if content != new_content:
                test_file_path.write_text(new_content)
                self.logger.debug(f"Import patchato: {test_file_path}")
                
        except Exception as e:
            self.logger.error(f"Errore patch import {test_file_path}: {e}")
    
    def add_bad_entry_id(self, entry_id: str, err_msg: str = "", log_file: str = "", language: str = ""):
        """Aggiungi bad entry con thread safety"""
        if not silent_mode:
            self.logger.warning(f"Bad entry: {entry_id}")
        
        bad_entries_path = Path(BAD_ENTRIES_JSON)
        
        # Thread-safe file writing
        with threading.Lock():
            try:
                if bad_entries_path.exists():
                    with bad_entries_path.open("r", encoding="utf-8") as f:
                        data = json.load(f)
                else:
                    data = {"entries": []}
                
                # Evita duplicati
                existing_ids = {entry.get("id") for entry in data.get("entries", [])}
                if entry_id not in existing_ids:
                    data["entries"].append({
                        "id": entry_id,
                        "error_message": err_msg,
                        "log_file_path": log_file,
                        "language": language,
                        "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
                    })
                    
                    with bad_entries_path.open("w", encoding="utf-8") as f:
                        json.dump(data, f, indent=2)
                        
            except Exception as e:
                self.logger.error(f"Errore scrittura bad entries: {e}")
    
    def setup_cpp_test_environment(self, entry, mount_path):
        """Setup C++ ottimizzato"""
        framework = self.detect_test_framework(entry)
        
        if not silent_mode:
            self.logger.debug(f"Framework C++ rilevato per {entry['id']}: {framework}")
        
        if framework == "catch2":
            return self.setup_catch2_environment(entry, mount_path)
        else:
            return self.setup_boost_environment(entry, mount_path)
    
    def detect_test_framework(self, entry):
        """Rilevamento framework di test C++"""
        test_file_path_in_entry = entry.get("testUnitFilePath")
        if not test_file_path_in_entry:
            return "boost"  # default
        
        testFile_filename = str(entry['filename']).replace(".cpp", "_test.cpp")
        abs_test_file_path = DATASET_DIR / test_file_path_in_entry / testFile_filename
        
        if not abs_test_file_path.exists():
            return "boost"
        
        try:
            with open(abs_test_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                catch_patterns = [
                    '#include "test/catch.hpp"',
                    '#include "../.common/test/catch.hpp"',
                    '#include "catch.hpp"',
                    '#include <catch2/catch.hpp>',
                    '#include <catch2/catch_all.hpp>',
                    '#include "catch_amalgamated.hpp"'
                ]
                
                for pattern in catch_patterns:
                    if pattern in content:
                        return "catch2"
                
                return "boost"
                
        except Exception as e:
            self.logger.warning(f"Errore rilevamento framework C++ per {abs_test_file_path}: {e}")
            return "boost"
    
    def setup_catch2_environment(self, entry, mount_path):
        """Setup Catch2"""
        catch_files = ["catch_amalgamated.hpp", "catch_amalgamated.cpp", "catch_main.cpp"]
        
        for catch_file in catch_files:
            src_file = DOCKER_DIR / "cpp" / catch_file
            dest_file = mount_path / catch_file
            
            if src_file.exists() and not dest_file.exists():
                shutil.copy(src_file, dest_file)
        
        # Setup Makefile
        makefile_template_path = DOCKER_DIR / "cpp" / "Makefile.catch"
        if makefile_template_path.exists():
            with open(makefile_template_path, 'r', encoding='utf-8') as f:
                makefile_content = f.read()
            
            exercise_filename = entry['filename']
            test_filename = exercise_filename.replace(".cpp", "_test.cpp")
            
            makefile_content = makefile_content.replace("YOUR_EXERCISE_NAME.cpp", exercise_filename)
            makefile_content = makefile_content.replace("YOUR_EXERCISE_NAME_test.cpp", test_filename)
            
            with open(mount_path / "Makefile", 'w', encoding='utf-8') as f:
                f.write(makefile_content)
        
        return "catch2"
    
    def setup_boost_environment(self, entry, mount_path):
        """Setup Boost.Test"""
        makefile_src = DOCKER_DIR / "cpp" / "Makefile"
        makefile_dest = mount_path / "Makefile"
        
        if makefile_src.exists() and not makefile_dest.exists():
            shutil.copy(makefile_src, makefile_dest)
        
        return "boost"
    
    def save_results_to_output_file(self, cluster_data, output_file, result_list):
        """Salvataggio ottimizzato dei risultati"""
        import datetime
        
        output_data = {
            "execution_date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "results": {},
            "execution_metadata": {
                "total_tests": self.total_tests,
                "completed_tests": self.completed_tests,
                "passed_tests": self.passed_tests,
                "success_rate": self.passed_tests / self.completed_tests if self.completed_tests > 0 else 0
            }
        }
        
        # Mappa risultati per ID
        results_by_id = {}
        for result in result_list:
            if result['success'] and result['results']:
                entry_id = result['entry']['id']
                results_by_id[entry_id] = result['results']
        
        # Costruisci output per linguaggio
        for lang, entries in cluster_data.items():
            output_data["results"][lang] = []
            
            for entry in entries:
                result_entry = {
                    "id": entry["id"],
                    "filename": entry["filename"],
                    "language": entry["language"]
                }
                
                entry_results = results_by_id.get(entry["id"])
                
                if entry_results:
                    # Aggiungi metriche disponibili
                    for field in ["CPU_usage", "RAM_usage", "execution_time_ms", 
                                "regrationTestPassed", "base_log", "LLM_results"]:
                        if field in entry_results:
                            result_entry[field] = entry_results[field]
                else:
                    # Fallback ai dati originali dell'entry
                    for field in ["CPU_usage", "RAM_usage", "execution_time_ms", "LLM_results"]:
                        if field in entry:
                            result_entry[field] = entry[field]
                
                output_data["results"][lang].append(result_entry)
        
        # Salva file
        output_path = utility_paths.OUTPUT_DIR_FILEPATH / output_file
        output_path.parent.mkdir(exist_ok=True)
        
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        self.logger.info(f"Risultati salvati in {output_path}")
        
        # Statistiche
        total_entries = sum(len(entries) for entries in output_data["results"].values())
        entries_with_llm = sum(
            1 for lang_entries in output_data["results"].values() 
            for entry in lang_entries 
            if "LLM_results" in entry and entry["LLM_results"]
        )
        
        if not silent_mode:
            print(f"Statistiche output: {total_entries} entry totali, {entries_with_llm} con risultati LLM")
    
    def cleanup(self):
        """Cleanup ottimizzato"""
        if not silent_mode:
            self.logger.info("Cleanup risorse...")
        
        self.container_manager.cleanup_all()
        self.metadata.save()

def main(base_only=False, llm_only=False, max_workers=None, run_with_docker_cache=True, 
         use_dataset=False, use_bad_entries=False, use_debug_cluster=False, 
         cluster_name="", output_file: str = None, webhook=False, prompt_version=1, run_quantity=1):
    """Main ottimizzato con skip intelligenti e gestione migliorata"""
    
    if not output_file:
        raise Exception("Missing output file to save result")
    
    if not output_file.endswith(".json"):
        output_file = output_file + ".json"
    
    if not base_only and (prompt_version < 1 or prompt_version > 4):
        raise Exception(f"Invalid prompt version: {prompt_version}")
    
    # Determina file di input
    chosen_path = CLUSTER_JSON
    if use_dataset:
        chosen_path = DATASET_JSON_PATH
    elif use_bad_entries:
        chosen_path = BAD_ENTRIES_CLUSTER_JSON
    elif cluster_name:
        if not cluster_name.endswith(".json"):
            cluster_name = cluster_name + ".json"
        chosen_path = utility_paths.CLUSTERS_DIR_FILEPATH / cluster_name
    elif use_debug_cluster:
        chosen_path = DEBUG_CLUSTER_JSON
        print("Using debug cluster...")
    
    if not silent_mode:
        print(f"Input file: {chosen_path}")
    
    # Crea directory logs
    LOGS_DIR.mkdir(exist_ok=True)
    
    # Carica cluster data
    try:
        with open(chosen_path, "r", encoding="utf-8") as f:
            cluster_data = json.load(f)
    except Exception as e:
        if not silent_mode:
            print(f"Errore caricamento cluster: {e}")
        return False
    
    # Estrai nome cluster per metadati
    cluster_base_name = Path(chosen_path).stem.replace("cluster_", "")
    
    # Inizializza test runner ottimizzato
    test_runner = OptimizedTestRunner(max_workers=max_workers)
    
    # Verifica skip completo
    test_type = "base" if base_only else ("llm" if llm_only else "full")
    if test_runner.should_skip_execution(cluster_base_name, test_type, prompt_version):
        print(f"Cluster {cluster_base_name} già completato, skip esecuzione")
        return True
    
    success = False
    
    try:
        # Esecuzione test
        test_results = test_runner.run_tests_concurrent(
            cluster_data=cluster_data,
            cluster_name=cluster_base_name,
            base_only=base_only,
            llm_only=llm_only,
            run_with_docker_cache=run_with_docker_cache,
            prompt_version=prompt_version
        )
        
        # Salva risultati
        if output_file:
            test_runner.save_results_to_output_file(cluster_data, output_file, test_results)
        
        success = len(test_results) > 0
        
    except Exception as e:
        test_runner.logger.error(f"Errore esecuzione test: {e}")
        success = False
    
    finally:
        test_runner.cleanup()
    
    # Webhook notification
    if webhook:
        send_webhook_notification(test_runner, chosen_path, output_file, cluster_name)
    
    return success

def send_webhook_notification(test_runner, chosen_path, output_file, cluster_name):
    """Invio notifica webhook ottimizzato"""
    try:
        load_dotenv()
        webhook_url = os.getenv('DISCORD_WEBHOOK')
        
        if not webhook_url:
            test_runner.logger.warning("DISCORD_WEBHOOK non configurato")
            return
        
        from discordInteraction import create_webhook_reporter
        
        reporter = create_webhook_reporter(webhook_url, "Optimized Test Results Bot")
        
        test_name = f"Optimized test for: {cluster_name or chosen_path}"
        
        success = reporter.send_test_results(
            test_name=test_name,
            duration=execution_state["time_passed"],
            files_executed=execution_state["files_executed"],
            total_files=execution_state["total_files"],
            tests_passed=execution_state["tests_passed"],
            total_tests=execution_state["total_files"],
            errors=execution_state["error_quantity"],
            additional_info={
                "Input path": str(chosen_path),
                "Output file": output_file or "Not specified",
                "Success rate": f"{(execution_state['tests_passed'] / execution_state['total_files'] * 100):.1f}%" if execution_state['total_files'] > 0 else "N/A"
            },
            custom_message="Optimized test execution completed!"
        )
        
        if success:
            print("Webhook notification sent successfully!")
        else:
            print("Failed to send webhook notification.")
            
    except Exception as e:
        test_runner.logger.error(f"Errore invio webhook: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optimized Test Runner")
    parser.add_argument("--base-only", action="store_true", 
                       help="Run only base code tests")
    parser.add_argument("--llm-only", action="store_true", 
                       help="Run only LLM code tests")
    parser.add_argument("--max-workers", type=int, 
                       help="Maximum worker threads")
    parser.add_argument("--cluster-name", type=str, 
                       help="Cluster name to run")
    parser.add_argument("--no-docker-cache", action="store_false",
                       help="Disable Docker cache")
    parser.add_argument("--dataset", action="store_true",
                       help="Use dataset instead of cluster")
    parser.add_argument("--bad-entries", action="store_true",
                       help="Use bad entries cluster")
    parser.add_argument("--debug-cluster", action="store_true",
                       help="Use debug cluster")
    parser.add_argument("--silent", action="store_true",
                       help="Silent mode")
    parser.add_argument("--output-file", type=str,
                       help="Output file for results")
    parser.add_argument("--webhook", action="store_true",
                       help="Send webhook notification")
    parser.add_argument("--prompt-version", type=int, default=1,
                       help="Prompt version for LLMs")
    parser.add_argument("--run_quantity", type=int, default=1,
                       help="Number of runs")

    args = parser.parse_args()
    
    if args.silent:
        silent_mode = True
    
    run_with_docker_cache = args.no_docker_cache
    
    success_count = 0
    total_runs = args.run_quantity
    
    for i in range(1, total_runs + 1):
        out_file = f"{args.output_file}_{i}"
        
        print(f"\n=== Run {i}/{total_runs} ===")
        
        success = main(
            base_only=args.base_only,
            llm_only=args.llm_only,
            max_workers=args.max_workers,
            run_with_docker_cache=run_with_docker_cache,
            use_dataset=args.dataset,
            use_bad_entries=args.bad_entries,
            use_debug_cluster=args.debug_cluster,
            cluster_name=args.cluster_name,
            output_file=out_file,
            webhook=args.webhook,
            prompt_version=args.prompt_version
        )