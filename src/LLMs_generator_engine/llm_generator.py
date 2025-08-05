import os
import json
import time
import asyncio
from pathlib import Path
from typing import Dict, List, Optional, Any
import concurrent.futures
from threading import Lock
import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum

# Imports condizionali per i vari provider
try:
    import ollama
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LLMProvider(Enum):
    OLLAMA = "ollama"
    OPENAI = "openai"
    GEMINI = "gemini"
    ANTHROPIC = "anthropic"

@dataclass
class LLMConfig:
    provider: LLMProvider
    model: str
    output_prefix: str
    folder: str
    api_key: Optional[str] = None
    temperature: float = 0.3
    top_p: float = 0.9
    max_tokens: int = 4000
    timeout: int = 60
    max_retries: int = 3

class LLMProviderAdapter(ABC):
    """Interfaccia astratta per i provider LLM"""
    
    @abstractmethod
    def generate(self, prompt: str, config: LLMConfig) -> Optional[str]:
        pass
    
    @abstractmethod
    def is_available(self) -> bool:
        pass

class OllamaAdapter(LLMProviderAdapter):
    """Adapter per Ollama"""
    
    def is_available(self) -> bool:
        return OLLAMA_AVAILABLE
    
    def generate(self, prompt: str, config: LLMConfig) -> Optional[str]:
        if not self.is_available():
            return None
            
        for attempt in range(config.max_retries):
            try:
                logger.info(f"Tentativo {attempt + 1}/{config.max_retries} per modello {config.model}")

                def call_ollama():
                    return ollama.generate(
                        model=config.model,
                        prompt=prompt,
                        options={
                            'temperature': config.temperature,
                            'top_p': config.top_p,
                            'stop': ['```']
                        }
                    )

                with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
                    future = executor.submit(call_ollama)
                    response = future.result(timeout=config.timeout)

                generated_code = response['response'].strip()
                return self._clean_markdown(generated_code)

            except concurrent.futures.TimeoutError:
                logger.warning(f"Timeout dopo {config.timeout}s per {config.model} (tentativo {attempt + 1})")
            except Exception as e:
                logger.warning(f"Errore generazione {config.model} (tentativo {attempt + 1}): {e}")

            if attempt < config.max_retries - 1:
                time.sleep(2 ** attempt)

        return None
    
    def _clean_markdown(self, generated_code: str) -> str:
        """Rimuove i markdown code blocks"""
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

class OpenAIAdapter(LLMProviderAdapter):
    """Adapter per OpenAI GPT"""
    
    def __init__(self):
        self.client = None
        if OPENAI_AVAILABLE:
            api_key = os.getenv('OPENAI_API_KEY')
            if api_key:
                self.client = openai.OpenAI(api_key=api_key)
    
    def is_available(self) -> bool:
        return OPENAI_AVAILABLE and self.client is not None
    
    def generate(self, prompt: str, config: LLMConfig) -> Optional[str]:
        if not self.is_available():
            return None
            
        for attempt in range(config.max_retries):
            try:
                logger.info(f"Tentativo {attempt + 1}/{config.max_retries} per modello {config.model}")
                
                response = self.client.chat.completions.create(
                    model=config.model,
                    messages=[
                        {"role": "system", "content": "You are an expert software engineer focused on code optimization."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=config.temperature,
                    top_p=config.top_p,
                    max_tokens=config.max_tokens,
                    timeout=config.timeout
                )
                
                generated_code = response.choices[0].message.content.strip()
                return self._clean_markdown(generated_code)
                
            except Exception as e:
                logger.warning(f"Errore generazione OpenAI (tentativo {attempt + 1}): {e}")
                
            if attempt < config.max_retries - 1:
                time.sleep(2 ** attempt)
        
        return None
    
    def _clean_markdown(self, generated_code: str) -> str:
        """Rimuove i markdown code blocks"""
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

class GeminiAdapter(LLMProviderAdapter):
    """Adapter per Google Gemini"""
    
    def __init__(self):
        self.client = None
        if GEMINI_AVAILABLE:
            api_key = os.getenv('GEMINI_API_KEY')
            if api_key:
                genai.configure(api_key=api_key)
                self.client = genai
    
    def is_available(self) -> bool:
        return GEMINI_AVAILABLE and self.client is not None
    
    def generate(self, prompt: str, config: LLMConfig) -> Optional[str]:
        if not self.is_available():
            return None
            
        for attempt in range(config.max_retries):
            try:
                logger.info(f"Tentativo {attempt + 1}/{config.max_retries} per modello {config.model}")
                
                model = genai.GenerativeModel(config.model)
                response = model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=config.temperature,
                        top_p=config.top_p,
                        max_output_tokens=config.max_tokens,
                    )
                )
                
                generated_code = response.text.strip()
                return self._clean_markdown(generated_code)
                
            except Exception as e:
                logger.warning(f"Errore generazione Gemini (tentativo {attempt + 1}): {e}")
                
            if attempt < config.max_retries - 1:
                time.sleep(2 ** attempt)
        
        return None
    
    def _clean_markdown(self, generated_code: str) -> str:
        """Rimuove i markdown code blocks"""
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

class AnthropicAdapter(LLMProviderAdapter):
    """Adapter per Anthropic Claude"""
    
    def __init__(self):
        self.client = None
        if ANTHROPIC_AVAILABLE:
            api_key = os.getenv('ANTHROPIC_API_KEY')
            if api_key:
                self.client = anthropic.Anthropic(api_key=api_key)
    
    def is_available(self) -> bool:
        return ANTHROPIC_AVAILABLE and self.client is not None
    
    def generate(self, prompt: str, config: LLMConfig) -> Optional[str]:
        if not self.is_available():
            return None
            
        for attempt in range(config.max_retries):
            try:
                logger.info(f"Tentativo {attempt + 1}/{config.max_retries} per modello {config.model}")
                
                message = self.client.messages.create(
                    model=config.model,
                    max_tokens=config.max_tokens,
                    temperature=config.temperature,
                    top_p=config.top_p,
                    messages=[
                        {"role": "user", "content": prompt}
                    ]
                )
                
                generated_code = message.content[0].text.strip()
                return self._clean_markdown(generated_code)
                
            except Exception as e:
                logger.warning(f"Errore generazione Anthropic (tentativo {attempt + 1}): {e}")
                
            if attempt < config.max_retries - 1:
                time.sleep(2 ** attempt)
        
        return None
    
    def _clean_markdown(self, generated_code: str) -> str:
        """Rimuove i markdown code blocks"""
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

class LLMGenerator:
    """Gestisce la generazione di codice migliorato usando diversi LLM"""
    
    def __init__(self, base_dir: Path, useClusterInstedOfDataset: bool = False):
        self.base_dir = base_dir
        self.dataset_dir = base_dir / "dataset"        
        self.prompt_file = base_dir.parent / "promptV1.txt"
        self.dataset_json = self.dataset_dir / "dataset.json"
        self.focused_cluster_json = base_dir / "focused_cluster_datas.json"
        if useClusterInstedOfDataset:
            self.dataset_json = self.focused_cluster_json
        
        # Inizializza gli adapter
        self.adapters = {
            LLMProvider.OLLAMA: OllamaAdapter(),
            LLMProvider.OPENAI: OpenAIAdapter(),
            LLMProvider.GEMINI: GeminiAdapter(),
            LLMProvider.ANTHROPIC: AnthropicAdapter()
        }
        
        # Configurazione modelli LLM
        self.llm_configs = self._load_llm_configs()
        
        # Lock per thread safety
        self.progress_lock = Lock()
        self.completed_tasks = 0
        self.total_tasks = 0
        
        # Carica il prompt template
        self.prompt_template = self._load_prompt_template()
    
    def _load_llm_configs(self) -> Dict[str, LLMConfig]:
        """Carica le configurazioni LLM da file o usa default"""
        config_file = self.base_dir / "llm_configs.json"
        
        # Configurazioni default
        default_configs = {
            "llama3": LLMConfig(
                provider=LLMProvider.OLLAMA,
                model="llama3",
                output_prefix="llama3",
                folder="llama3"
            ),
            "gpt4": LLMConfig(
                provider=LLMProvider.OPENAI,
                model="gpt-4",
                output_prefix="gpt4",
                folder="gpt4",
                max_tokens=4000
            ),
            "gpt4o": LLMConfig(
                provider=LLMProvider.OPENAI,
                model="gpt-4o",
                output_prefix="gpt4o",
                folder="gpt4o",
                max_tokens=4000
            ),
            "gemini_flash": LLMConfig(
                provider=LLMProvider.GEMINI,
                model="gemini-1.5-flash",
                output_prefix="gemini_flash",
                folder="gemini_flash",
                max_tokens=8000
            ),
            "claude_sonnet": LLMConfig(
                provider=LLMProvider.ANTHROPIC,
                model="claude-3-sonnet-20240229",
                output_prefix="claude_sonnet",
                folder="claude_sonnet",
                max_tokens=4000
            ),
            "claude_sonnet4": LLMConfig(
                provider=LLMProvider.ANTHROPIC,
                model="claude-sonnet-4-20250514",
                output_prefix="claude_sonnet4",
                folder="claude_sonnet4",
                max_tokens=4000
            )
        }
        
        # Carica configurazioni personalizzate se esistono
        if config_file.exists():
            try:
                with open(config_file, 'r', encoding='utf-8') as f:
                    custom_configs = json.load(f)
                    
                # Converti in oggetti LLMConfig
                for key, config_dict in custom_configs.items():
                    if key in default_configs:
                        # Aggiorna la configurazione default
                        for attr, value in config_dict.items():
                            if hasattr(default_configs[key], attr):
                                setattr(default_configs[key], attr, value)
                        
            except Exception as e:
                logger.warning(f"Errore caricamento configurazioni LLM: {e}")
        
        # Filtra solo i modelli disponibili
        available_configs = {}
        for key, config in default_configs.items():
            if self.adapters[config.provider].is_available():
                available_configs[key] = config
            else:
                logger.warning(f"Provider {config.provider.value} non disponibile per {key}")
        
        return available_configs
    
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
    
    def _generate_with_llm(self, config: LLMConfig, prompt: str) -> Optional[str]:
        """Genera codice usando il provider LLM specificato"""
        adapter = self.adapters[config.provider]
        return adapter.generate(prompt, config)
    
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
            generated_code = self._generate_with_llm(llm_config, prompt)
            
            if generated_code:
                # Determina il percorso di output
                exercise_dir = self.dataset_dir / Path(entry['testUnitFilePath']).parent
                llm_folder = exercise_dir / llm_config.folder
                
                # Crea nome file con prefisso LLM
                base_name = Path(entry['filename']).stem
                extension = Path(entry['filename']).suffix
                output_filename = f"{llm_config.output_prefix}_{base_name}{extension}"
                output_path = llm_folder / output_filename
                
                # Salva il codice generato
                if self._save_generated_code(generated_code, output_path):
                    result['success'] = True
                    result['output_path'] = str(output_path)
                else:
                    result['error'] = f"Errore salvataggio in {output_path}"
            else:
                result['error'] = f"Generazione fallita per {llm_config.model}"
                
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
                for llm_key, llm_config in self.llm_configs.items():
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
            for entry in entries: #to fix with LLM -> paths
                if entry['id'] in results_by_entry:
                    entry['LLM_codeSnippetFilePaths'] = results_by_entry[entry['id']]
    
    def list_available_models(self) -> Dict[str, str]:
        """Restituisce un dizionario dei modelli disponibili"""
        available = {}
        for key, config in self.llm_configs.items():
            available[key] = f"{config.provider.value}:{config.model}"
        return available
    
    def generate_all_codes(self, max_workers: Optional[int] = None, selected_models: Optional[List[str]] = None) -> bool:
        """Genera codici migliorati per tutti gli entry usando thread pool"""
        logger.info("Inizio generazione codici LLM")
        
        # Filtra modelli se specificato
        if selected_models:
            filtered_configs = {k: v for k, v in self.llm_configs.items() if k in selected_models}
            self.llm_configs = filtered_configs
        
        logger.info(f"Modelli disponibili: {list(self.llm_configs.keys())}")
        
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
    parser.add_argument("--models", nargs="+", 
                        help="Modelli specifici da usare (es: --models gpt4 claude_sonnet)")
    parser.add_argument("--list-models", action="store_true",
                        help="Mostra i modelli disponibili")
    parser.add_argument("--max-workers", type=int, default=None,
                        help="Numero massimo di worker threads")
    
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parent
    generator = LLMGenerator(base_dir, args.useClusterNotDatabase)

    if args.list_models:
        models = generator.list_available_models()
        print("Modelli disponibili:")
        for key, provider_model in models.items():
            print(f"  {key}: {provider_model}")
        exit(0)

    try:
        success = generator.generate_all_codes(
            max_workers=args.max_workers,
            selected_models=args.models
        )
        if success:
            logger.info("Generazione completata con successo!")
        else:
            logger.error("Generazione fallita!")

    except Exception as e:
        import traceback
        logger.error("Errore durante la generazione:")
        logger.error(traceback.format_exc())