from dataclasses import dataclass, field
from typing import List

import json
from pathlib import Path
from typing import Dict

import time
from typing import Any, Callable
from functools import wraps
from threading import Lock
import logging
import enum
logger = logging.getLogger(__name__)


METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]
LLM_METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms", "regressionTestPassed"]


def read_json(path: Path) -> Dict:
    """Read JSON file with error handling."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {path}:\n{e}")
        return {}


def write_json(path: Path, data) -> None:
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error writing {path}:\n{e}")


@dataclass
class LLMEntry:
    type: str
    path: str
    word_quantity: int
    char_quantity: int
    filename: str
    fuzzy_score: float
    cosine_similarity_score: float
    similarity_index: float


@dataclass
class CodeEntry:
    id: str
    filename: str
    language: str
    source: str
    codeSnippetFilePath: str
    testUnitFilePath: str

    characterQuantity: int
    wordQuantity: int
    licenseType: str
    LLMs: List[LLMEntry] = field(default_factory=list)

    @staticmethod
    def from_dict(data: dict) -> "CodeEntry":
        llms_arr = data["LLMs"] if "LLMs" in data else []
        llms = [LLMEntry(**llm) for llm in llms_arr]
        # print(f"data :\n{data}")
        return CodeEntry(
            id=data["id"],
            filename=data["filename"],
            language=data["language"],
            source=data["source"],
            codeSnippetFilePath=data["codeSnippetFilePath"],
            testUnitFilePath=data["testUnitFilePath"],
            characterQuantity=data.get("characterQuantity", -1),
            wordQuantity=data.get("wordQuantity", -1),
            licenseType=data.get("licenseType", ""),
            LLMs=llms,
        )


class RateLimiter:
    """Rate limiter per controllo delle richieste API"""

    def __init__(self, max_requests: int = 60, time_window: int = 60):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = []
        self.lock = Lock()

    def wait_if_needed(self):
        """Attende se necessario per rispettare il rate limit"""
        with self.lock:
            now = time.time()

            # Rimuovi richieste vecchie
            self.requests = [
                req_time
                for req_time in self.requests
                if now - req_time < self.time_window
            ]

            # Controlla se abbiamo raggiunto il limite
            if len(self.requests) >= self.max_requests:
                oldest_request = min(self.requests)
                wait_time = self.time_window - (now - oldest_request)
                if wait_time > 0:
                    logger.info(
                        f"Rate limit raggiunto, attendo {wait_time:.1f} secondi"
                    )
                    time.sleep(wait_time)

            # Aggiungi la richiesta corrente
            self.requests.append(now)


def retry_with_backoff(max_retries: int = 3, base_delay: float = 1.0):
    """Decorator per retry con backoff esponenziale"""

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise e

                    delay = base_delay * (2**attempt)
                    logger.warning(
                        f"Tentativo {attempt + 1} fallito: {e}. Retry in {delay}s"
                    )
                    time.sleep(delay)

            return None

        return wrapper

    return decorator


class ModelValidator:
    """Validatore per le configurazioni dei modelli"""

    @staticmethod
    def validate_openai_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione OpenAI"""
        required_fields = ["model"]
        valid_models = ["gpt-4", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"]

        if not all(field in config for field in required_fields):
            return False

        if config["model"] not in valid_models:
            logger.warning(f"Modello OpenAI non riconosciuto: {config['model']}")

        return True

    @staticmethod
    def validate_gemini_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione Gemini"""
        required_fields = ["model"]
        valid_models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"]

        if not all(field in config for field in required_fields):
            return False

        if config["model"] not in valid_models:
            logger.warning(f"Modello Gemini non riconosciuto: {config['model']}")

        return True

    @staticmethod
    def validate_anthropic_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione Anthropic"""
        required_fields = ["model"]
        valid_models = [
            "claude-3-sonnet-20240229",
            "claude-3-opus-20240229",
            "claude-3-haiku-20240307",
            "claude-sonnet-4-20250514",
        ]

        if not all(field in config for field in required_fields):
            return False

        if config["model"] not in valid_models:
            logger.warning(f"Modello Anthropic non riconosciuto: {config['model']}")

        return True


def load_env_variables():
    """Carica le variabili d'ambiente"""
    try:
        from dotenv import load_dotenv

        load_dotenv()
        return True
    except ImportError:
        logger.warning(
            "python-dotenv non installato, uso variabili d'ambiente di sistema"
        )
        return False


def check_api_keys() -> Dict[str, bool]:
    """Controlla la disponibilità delle API keys"""
    import os

    keys_status = {
        "OPENAI_API_KEY": bool(os.getenv("OPENAI_API_KEY")),
        "GEMINI_API_KEY": bool(os.getenv("GEMINI_API_KEY")),
        "ANTHROPIC_API_KEY": bool(os.getenv("ANTHROPIC_API_KEY")),
    }

    return keys_status





def setup_github_token():
    """Configurarazione token GitHub"""
    print("=== Configurazione Token GitHub ===")
    print("Per un rate limiting migliore, è consigliato usare un token GitHub.")
    print("1. Vai su https://github.com/settings/tokens")
    print("2. Crea un nuovo token con scope 'public_repo'")
    print("3. Copia il token generato")
    print()
    
    token = input("Inserisci il token GitHub (premi Enter per saltare): ").strip()
    
    if token:
        # Salva in file di configurazione
        config_file = Path(".github_token")
        with open(config_file, 'w') as f:
            f.write(token)
        print(f"Token salvato in {config_file}")
        return token
    
    return None

def load_github_token():
    """Carica il token GitHub se disponibile"""
    config_file = Path(".github_token")
    if config_file.exists():
        with open(config_file, 'r') as f:
            return f.read().strip()
    return None






def get_cluster_names(cluster_dir_path:Path)->List[str] : 
    res = []
    for file_path in cluster_dir_path.glob("cluster_*.json"):
        if not any(
            skip in file_path.name
            for skip in ["debug", "test", "bad_entries", "focused_", "with_metrics"]
        ):
            file_name = file_path.name.replace("cluster_", "").replace(".json", "")
            res.append(file_name)

    return res


class LoggerLevel(enum.Enum) : 
    WARNING = "warning"
    INFO = "info"
    ERROR = "error"
    DEBUG = "debug"