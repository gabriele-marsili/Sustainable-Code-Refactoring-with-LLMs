import os
import json
import time
import logging
from pathlib import Path
from typing import Dict, List, Optional
import concurrent.futures
from threading import Lock
import subprocess
import signal
import sys

from llm_generator import LLMGenerator

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PipelineManager:
    """Gestisce l'intera pipeline di generazione LLM e testing"""
    
    def __init__(self, base_dir: Path, useClusterNotDatabase = False):
        self.base_dir = base_dir
        self.dataset_json = base_dir / "dataset" / "dataset.json"
        self.focused_cluster_json = base_dir / "focused_cluster_datas.json"
        self.run_tests_script = base_dir / "run_tests.py"
        
        # Componenti pipeline
        self.llm_generator = LLMGenerator(base_dir,useClusterNotDatabase)
        
        # Thread pool settings
        self.max_workers = min(os.cpu_count() or 1, 8)
        
        # Progress tracking
        self.progress_lock = Lock()
        self.current_phase = "INIT"
        self.phase_progress = 0
        self.total_phases = 2
        
        # Gestione interruzioni
        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)
        self.interrupted = False
    
    def _signal_handler(self, signum, frame):
        """Gestisce interruzioni graceful"""
        logger.info(f"Ricevuto segnale {signum}. Fermando pipeline...")
        self.interrupted = True
    
    def _update_phase_progress(self, phase: str, progress: int):
        """Aggiorna il progresso della fase corrente"""
        with self.progress_lock:
            self.current_phase = phase
            self.phase_progress = progress
            logger.info(f"Fase: {phase} - Progresso: {progress}%")
    
    def _validate_environment(self) -> bool:
        """Valida l'ambiente necessario per la pipeline"""
        logger.info("Validazione ambiente...")
        
        # Verifica file necessari
        required_files = [
            self.dataset_json,
            self.run_tests_script,
            self.base_dir.parent / "promptV1.txt"
        ]
        
        for file_path in required_files:
            if not file_path.exists():
                logger.error(f"File mancante: {file_path}")
                return False
        
        # Verifica Docker
        try:
            result = subprocess.run(
                ["docker", "--version"], 
                capture_output=True, 
                text=True, 
                timeout=10
            )
            if result.returncode != 0:
                logger.error("Docker non disponibile")
                return False
        except Exception as e:
            logger.error(f"Errore verifica Docker: {e}")
            return False
        
        # Verifica Ollama
        try:
            import ollama
            # Test connection
            ollama.list()
            logger.info("Ollama disponibile")
        except Exception as e:
            logger.error(f"Errore connessione Ollama: {e}")
            return False
        
        logger.info("Ambiente validato con successo")
        return True
    
    def _prepare_testing_environment(self) -> bool:
        """Prepara l'ambiente per il testing"""
        logger.info("Preparazione ambiente testing...")
        
        # Crea directory logs se non esiste
        logs_dir = self.base_dir / "logs"
        logs_dir.mkdir(exist_ok=True)
        
        # Verifica che focused_cluster_datas.json esista
        if not self.focused_cluster_json.exists():
            logger.info("Creazione focused_cluster_datas.json dal dataset principale")
            try:
                with open(self.dataset_json, 'r', encoding='utf-8') as f:
                    dataset_data = json.load(f)
                
                with open(self.focused_cluster_json, 'w', encoding='utf-8') as f:
                    json.dump(dataset_data, f, indent=4, ensure_ascii=False)
                    
            except Exception as e:
                logger.error(f"Errore creazione focused_cluster_datas.json: {e}")
                return False
        
        return True
    
    def _run_test_phase(self, test_args: List[str] = None) -> bool:
        """Esegue la fase di testing"""
        logger.info("Inizio fase testing")
        
        if not self._prepare_testing_environment():
            return False
        
        # Prepara comando
        cmd = [sys.executable, str(self.run_tests_script)]
        if test_args:
            cmd.extend(test_args)
        
        try:
            # Esegui run_tests.py
            logger.info(f"Esecuzione: {' '.join(cmd)}")
            
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                universal_newlines=True
            )
            
            # Monitora output in tempo reale
            while True:
                if self.interrupted:
                    process.terminate()
                    logger.info("Testing interrotto dall'utente")
                    return False
                
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                
                if output:
                    logger.info(f"TEST: {output.strip()}")
            
            # Attendi completamento
            return_code = process.wait()
            
            if return_code == 0:
                logger.info("Testing completato con successo")
                return True
            else:
                logger.error(f"Testing fallito con codice {return_code}")
                return False
                
        except Exception as e:
            logger.error(f"Errore durante testing: {e}")
            return False
    
    def _generate_summary_report(self) -> Dict:
        """Genera report riassuntivo della pipeline"""
        logger.info("Generazione report riassuntivo...")
        
        report = {
            "pipeline_completed": True,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "phases": {
                "generation": {"status": "completed", "duration": None},
                "testing": {"status": "completed", "duration": None}
            },
            "statistics": {
                "total_entries": 0,
                "successful_generations": 0,
                "successful_tests": 0,
                "languages": []
            }
        }
        
        try:
            # Analizza risultati dal dataset
            with open(self.focused_cluster_json, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            total_entries = 0
            successful_generations = 0
            successful_tests = 0
            languages = list(data.keys())
            
            for lang, entries in data.items():
                total_entries += len(entries)
                
                for entry in entries:
                    # Conta generazioni riuscite
                    if 'LLM_codeSnippetFilePaths' in entry:
                        successful_generations += len(entry['LLM_codeSnippetFilePaths'])
                    
                    # Conta test riusciti
                    if 'LLM_results' in entry:
                        for result in entry['LLM_results']:
                            if result.get('regrationTestPassed', False):
                                successful_tests += 1
            
            report["statistics"].update({
                "total_entries": total_entries,
                "successful_generations": successful_generations,
                "successful_tests": successful_tests,
                "languages": languages
            })
            
        except Exception as e:
            logger.warning(f"Errore generazione statistiche: {e}")
            report["pipeline_completed"] = False
        
        return report
    
    def run_full_pipeline(self, 
                         skip_generation: bool = False,
                         skip_testing: bool = False,
                         test_args: List[str] = None) -> bool:
        """Esegue la pipeline completa"""
        logger.info("=== INIZIO PIPELINE COMPLETA ===")
        
        if self.interrupted:
            logger.info("Pipeline interrotta prima dell'inizio")
            return False
        
        # Validazione ambiente
        if not self._validate_environment():
            logger.error("Validazione ambiente fallita")
            return False
        
        start_time = time.time()
        
        # FASE 1: Generazione codici LLM
        if not skip_generation:
            self._update_phase_progress("GENERAZIONE", 0)
            logger.info("=== FASE 1: GENERAZIONE CODICI LLM ===")
            
            generation_start = time.time()
            success = self.llm_generator.generate_all_codes(max_workers=self.max_workers)
            generation_time = time.time() - generation_start
            
            if not success or self.interrupted:
                logger.error("Fase generazione fallita")
                return False
            
            self._update_phase_progress("GENERAZIONE", 100)
            logger.info(f"Generazione completata in {generation_time:.2f} secondi")
        else:
            logger.info("Saltata fase generazione")
        
        # Pausa tra le fasi per permettere cleanup
        if not self.interrupted:
            time.sleep(2)
        
        # FASE 2: Testing
        if not skip_testing and not self.interrupted:
            self._update_phase_progress("TESTING", 0)
            logger.info("=== FASE 2: TESTING ===")
            
            testing_start = time.time()
            success = self._run_test_phase(test_args)
            testing_time = time.time() - testing_start
            
            if not success or self.interrupted:
                logger.error("Fase testing fallita")
                return False
            
            self._update_phase_progress("TESTING", 100)
            logger.info(f"Testing completato in {testing_time:.2f} secondi")
        else:
            logger.info("Saltata fase testing")
        
        # Report finale
        total_time = time.time() - start_time
        report = self._generate_summary_report()
        
        logger.info("=== PIPELINE COMPLETATA ===")
        logger.info(f"Tempo totale: {total_time:.2f} secondi")
        logger.info(f"Linguaggi processati: {report['statistics']['languages']}")
        logger.info(f"Entry totali: {report['statistics']['total_entries']}")
        logger.info(f"Generazioni riuscite: {report['statistics']['successful_generations']}")
        logger.info(f"Test riusciti: {report['statistics']['successful_tests']}")
        
        return True
    
    def run_generation_only(self) -> bool:
        """Esegue solo la fase di generazione"""
        logger.info("=== ESECUZIONE SOLO GENERAZIONE ===")
        return self.run_full_pipeline(skip_testing=True)
    
    def run_testing_only(self, test_args: List[str] = None) -> bool:
        """Esegue solo la fase di testing"""
        logger.info("=== ESECUZIONE SOLO TESTING ===")
        return self.run_full_pipeline(skip_generation=True, test_args=test_args)


def execute_pipeline():
    """Funzione principale con CLI"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Pipeline Manager per generazione LLM e testing")
    
    parser.add_argument("--generation-only", action="store_true",
                       help="Esegui solo la fase di generazione")
    parser.add_argument("--testing-only", action="store_true",
                       help="Esegui solo la fase di testing")
    parser.add_argument("--base-only", action="store_true",
                       help="Esegui solo test sui codeSnippet originali")
    parser.add_argument("--llm-only", action="store_true",
                       help="Esegui solo test sui codeSnippet LLM")
    parser.add_argument("--max-workers", type=int,
                       help="Numero massimo di worker threads")
    
    parser.add_argument("--useClusterNotDatabase", type=bool,
                       help="Use cluster json instead of dataset for LLM generation")
    
    args = parser.parse_args()
    
    # Inizializza pipeline manager
    base_dir = Path(__file__).resolve().parent #src path
    pipeline = PipelineManager(base_dir,args.useClusterNotDatabase)
    
    # Override max_workers se specificato
    if args.max_workers:
        pipeline.max_workers = args.max_workers
    
    # Prepara argomenti per testing
    test_args = []
    if args.base_only:
        test_args.append("--base-only")
    if args.llm_only:
        test_args.append("--llm-only")
    
    # Esegui pipeline in base ai parametri
    try:
        if args.generation_only:
            success = pipeline.run_generation_only()
        elif args.testing_only:
            success = pipeline.run_testing_only(test_args)
        else:
            success = pipeline.run_full_pipeline(test_args=test_args)
        
        if success:
            logger.info("Pipeline completata con successo!")
            sys.exit(0)
        else:
            logger.error("Pipeline fallita!")
            sys.exit(1)
            
    except KeyboardInterrupt:
        logger.info("Pipeline interrotta dall'utente")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Errore generale pipeline: {e}")
        sys.exit(1)


if __name__ == "__main__":
    execute_pipeline()