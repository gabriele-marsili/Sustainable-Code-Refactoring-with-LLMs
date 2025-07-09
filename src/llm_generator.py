import os
import json
import time
import ollama
from pathlib import Path
from typing import Dict, List, Optional
import concurrent.futures
from threading import Lock
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LLMGenerator:
    """Gestisce la generazione di codice migliorato usando diversi LLM"""
    
    def __init__(self, base_dir: Path, useClusterInstedOfDataset = False):
        self.base_dir = base_dir
        self.dataset_dir = base_dir / "dataset"        
        self.prompt_file = base_dir.parent / "promptV1.txt"
        self.dataset_json = self.dataset_dir / "dataset.json"
        self.focused_cluster_json = base_dir / "focused_cluster_datas.json"
        if useClusterInstedOfDataset : self.dataset_json = self.focused_cluster_json
        
        # Configurazione modelli LLM
        self.llm_models = {
            "claude": {
                "model": "claude3-sonnet", 
                "output_prefix": "ClaudeSonnet3",
                "folder": "claude"
            },
            "gemini": {
                "model": "gemini-flash", 
                "output_prefix": "GeminiFlash", 
                "folder": "gemini"
            },
            "openai": {
                "model": "gpt-4", 
                "output_prefix": "ChatGPT4", 
                "folder": "openAI"
            }
        }
        
        # Lock per thread safety
        self.progress_lock = Lock()
        self.completed_tasks = 0
        self.total_tasks = 0
        
        # Carica il prompt template
        self.prompt_template = self._load_prompt_template()
    
    def _load_prompt_template(self) -> str:
        """Carica il template del prompt dal file .txt"""
        try:
            with open(self.prompt_file, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"File prompt {self.prompt_file} non trovato")
            return "You are an experienced software engineer.\nBelow is a code snippet delimited by triple backticks (```), without the tests.\nYour task is to return the same optimized snippet, maintaining the original behavior (compatibility with the test suite):\n\n```\n{code}\n```\n\nOptimize the code according to these criteria, in order of priority:\n1. Efficiency and speed of execution\n2. Minimal resource use (e.g., memory)\n3. Sustainability of maintenance and execution\n4. Software engineering best practices\n\nRespond only with updated code, without further explanation."
    
    def _get_code_content(self, code_path: Path) -> str:
        """Legge il contenuto del file di codice il cui path è passato come parametro"""
        try:
            with open(code_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            logger.error(f"Errore lettura file {code_path}: {e}")
            return ""
    
    def _generate_with_ollama(self, model: str, prompt: str, max_retries: int = 3) -> Optional[str]:
        """Genera codice usando Ollama con retry logic"""
        for attempt in range(max_retries):
            try:
                logger.info(f"Tentativo {attempt + 1}/{max_retries} per modello {model}")
                
                response = ollama.generate(
                    model=model,
                    prompt=prompt,
                    options={
                        'temperature': 0.3,
                        'top_p': 0.9,
                        'stop': ['```']
                    }
                )
                
                generated_code = response['response'].strip()
                
                # Pulisci il codice generato (rimuovi eventuali markdown)
                if '```' in generated_code:
                    lines = generated_code.split('\n')
                    clean_lines = []
                    in_code_block = False
                    
                    for line in lines:
                        if line.strip().startswith('```'):
                            in_code_block = not in_code_block
                            continue
                        if in_code_block or not line.strip().startswith('```'):
                            clean_lines.append(line)
                    
                    generated_code = '\n'.join(clean_lines).strip()
                
                return generated_code
                
            except Exception as e:
                logger.warning(f"Errore generazione {model} (tentativo {attempt + 1}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    logger.error(f"Fallimento definitivo per {model}")
                    return None
        
        return None
    
    def _save_generated_code(self, code: str, output_path: Path) -> bool:
        """Salva il codice generato nel file di output"""
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(code)
            logger.info(f"Codice salvato in {output_path}")
            return True
        except Exception as e:
            logger.error(f"Errore salvataggio {output_path}: {e}")
            return False
    
    def _update_progress(self):
        """Aggiorna il progresso in modo thread-safe"""
        with self.progress_lock:
            self.completed_tasks += 1
            progress = (self.completed_tasks / self.total_tasks) * 100
            logger.info(f"Progresso: {self.completed_tasks}/{self.total_tasks} ({progress:.1f}%)")
    
    def _generate_single_code(self, task_info: Dict) -> Dict:
        """Genera codice per un singolo task"""
        entry = task_info['entry']
        lang = task_info['lang']
        llm_key = task_info['llm_key']
        llm_config = task_info['llm_config']
        
        result = {
            'entry_id': entry['id'],
            'lang': lang,
            'llm_key': llm_key,
            'success': False,
            'output_path': None,
            'error': None
        }
        
        try:
            # Determina il percorso del file di codice originale
            code_path = self.dataset_dir / entry['codeSnippetFilePath']
            
            # Per linguaggi con src folder, aggiungi il filename
            if lang in ['c', 'cpp', 'go']:
                code_path = code_path / entry['filename']
            elif lang == 'java':
                # Per Java, il filename è nella root della directory
                code_path = code_path.parent / entry['filename']
            
            if not code_path.exists():
                result['error'] = f"File codice non trovato: {code_path}"
                return result
            
            # Leggi il codice originale
            original_code = self._get_code_content(code_path)
            if not original_code:
                result['error'] = f"Impossibile leggere il codice da {code_path}"
                return result
            
            # Prepara il prompt
            prompt = self.prompt_template.format(code=original_code)
            
            # Genera il codice migliorato
            generated_code = self._generate_with_ollama(llm_config['model'], prompt)
            
            if generated_code:
                # Determina il percorso di output
                exercise_dir = self.dataset_dir / Path(entry['testUnitFilePath']).parent
                llm_folder = exercise_dir / llm_config['folder']
                
                # Crea nome file con prefisso LLM
                base_name = Path(entry['filename']).stem
                extension = Path(entry['filename']).suffix
                output_filename = f"{llm_config['output_prefix']}_{base_name}{extension}"
                output_path = llm_folder / output_filename
                
                # Salva il codice generato
                if self._save_generated_code(generated_code, output_path):
                    result['success'] = True
                    result['output_path'] = str(output_path)
                else:
                    result['error'] = f"Errore salvataggio in {output_path}"
            else:
                result['error'] = f"Generazione fallita per {llm_config['model']}"
                
        except Exception as e:
            result['error'] = f"Errore generale: {str(e)}"
        
        finally:
            self._update_progress()
        
        return result
    
    def _prepare_tasks(self, dataset_data: Dict) -> List[Dict]:
        """Prepara la lista dei task per la generazione"""
        tasks = []
        
        for lang, entries in dataset_data.items():
            for entry in entries:
                for llm_key, llm_config in self.llm_models.items():
                    task = {
                        'entry': entry,
                        'lang': lang,
                        'llm_key': llm_key,
                        'llm_config': llm_config
                    }
                    tasks.append(task)
        
        return tasks
    
    def _update_dataset_with_generated_paths(self, dataset_data: Dict, results: List[Dict]):
        """Aggiorna il dataset con i percorsi dei file generati"""
        # Organizza i risultati per entry_id
        results_by_entry = {}
        for result in results:
            if result['success']:
                entry_id = result['entry_id']
                if entry_id not in results_by_entry:
                    results_by_entry[entry_id] = []
                results_by_entry[entry_id].append(result['output_path'])
        
        # Aggiorna il dataset
        for lang, entries in dataset_data.items():
            for entry in entries:
                if entry['id'] in results_by_entry:
                    entry['LLM_codeSnippetFilePaths'] = results_by_entry[entry['id']]
    
    def generate_all_codes(self, max_workers: Optional[int] = None) -> bool:
        """Genera codici migliorati per tutti gli entry usando thread pool"""
        logger.info("Inizio generazione codici LLM")
        
        # Carica dataset
        try:
            with open(self.dataset_json, 'r', encoding='utf-8') as f:
                dataset_data = json.load(f)
        except Exception as e:
            logger.error(f"Errore caricamento dataset: {e}")
            return False
        
        # Prepara tasks
        tasks = self._prepare_tasks(dataset_data)
        self.total_tasks = len(tasks)
        self.completed_tasks = 0
        
        logger.info(f"Preparati {self.total_tasks} task di generazione")
        
        # Determina numero di worker
        if max_workers is None:
            max_workers = min(os.cpu_count() or 1, 4)  # Max 4 per non sovraccaricare i servizi LLM
        
        logger.info(f"Usando {max_workers} worker threads")
        
        # Esegui generazione in parallelo
        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_task = {
                executor.submit(self._generate_single_code, task): task 
                for task in tasks
            }
            
            for future in concurrent.futures.as_completed(future_to_task):
                result = future.result()
                results.append(result)
                
                if not result['success']:
                    logger.warning(f"Fallimento task {result['entry_id']} - {result['llm_key']}: {result['error']}")
        
        # Statistiche finali
        successful = sum(1 for r in results if r['success'])
        logger.info(f"Generazione completata: {successful}/{len(results)} successi")
        
        # Aggiorna dataset con i percorsi generati
        self._update_dataset_with_generated_paths(dataset_data, results)
        
        # Salva dataset aggiornato
        try:
            with open(self.dataset_json, 'w', encoding='utf-8') as f:
                json.dump(dataset_data, f, indent=4, ensure_ascii=False)
            
            # Crea anche focused_cluster_datas.json se non esiste
            if not self.focused_cluster_json.exists():
                with open(self.focused_cluster_json, 'w', encoding='utf-8') as f:
                    json.dump(dataset_data, f, indent=4, ensure_ascii=False)
            
            logger.info("Dataset aggiornato con successo")
            return True
            
        except Exception as e:
            logger.error(f"Errore salvataggio dataset: {e}")
            return False


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Pipeline Manager per generazione LLM e testing")
    
    parser.add_argument("--useClusterNotDatabase", action="store_true",
                       help="Esegui dal cluster anziché dal database")

    args = parser.parse_args()
    
    # Test del generatore
    base_dir = Path(__file__).resolve().parent #src path
    generator = LLMGenerator(base_dir,args.useClusterNotDatabase)
    
    try:
        import ollama
        # Test connection
        ollama.list()
        logger.info("Ollama disponibile")
        
        success = generator.generate_all_codes()
        if success:
            logger.info("Generazione completata con successo!")
        else:
            logger.error("Generazione fallita!")
    except Exception as e:
        logger.error(f"Errore connessione Ollama: {e}")
        
    
   