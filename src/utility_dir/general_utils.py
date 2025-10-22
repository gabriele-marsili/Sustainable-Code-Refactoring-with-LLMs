from dataclasses import dataclass, field
from typing import List, Optional

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


def get_cluster_path_list(CLUSTERS_DIR_FILEPATH:Path) -> List[Path]:
    """Get the list of all path of the clusters"""
    return [
        p
        for p in CLUSTERS_DIR_FILEPATH.glob("*.json")
        if "with_metrics" not in p.name
        and "debug_" not in p.name
        and "bad_entries" not in p.name
        and "cluster_" in p.name
    ]


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



#model enties from cluster dir 
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

# ---- model entries from results :


@dataclass
class LLMresult:
    """Model a single LLM res"""

    LLM_type: str
    path: str
    log: str

    # metrics :
    execution_time_ms: Optional[int] = None
    CPU_usage: Optional[float] = None
    RAM_usage: Optional[int] = None
    regressionTestPassed: bool = False

    # metadata on the single exec :
    success: Optional[bool] = False
    error_message: Optional[str] = None

    def is_valid(self) -> bool:
        """Check if metrics are meaningful"""
        return (
            self.execution_time_ms is not None
            and self.CPU_usage is not None
            and self.RAM_usage is not None
            and self.regressionTestPassed is not None
            and self.RAM_usage != 0
            and self.execution_time_ms != 0
        )

    def to_json(self) -> Dict[str, Any]:
        return self.__dict__

    @staticmethod
    def from_json(data: Dict[str, Any]) -> "LLMresult":
        data.pop("passed_tests", None)
        data.pop("failed_tests", None)
        data.pop("timestamp", None)
        data.pop("filename", None)

        if "log_path" in data:
            data["log"] = data["log_path"]

        if "error_message" not in data:
            data["error_message"] = None

        if "success" not in data:
            data["success"] = None

        if "log_path" in data:
            data["log"] = data["log_path"]
            data.pop("log_path", None)

        if "log" not in data:  # log fallback
            data["log"] = ""

        return LLMresult(**data)


@dataclass
class LLMentryResult:
    """Model a LLM entry result"""

    id: str
    filename: str
    language: str
    LLM_results: List[LLMresult]

    def is_valid(self) -> bool:
        for res in self.LLM_results:
            if not res.is_valid():
                return False

        return True

    def to_json(self) -> Dict[str, Any]:
        data = self.__dict__.copy()
        # Converte la lista di oggetti LLMExecutionResult nei loro dizionari
        data["LLM_results"] = [res.to_json() for res in self.LLM_results]
        return data

    @staticmethod
    def from_json(data: Dict[str, Any]) -> "LLMentryResult":
        llm_results = [LLMresult.from_json(res) for res in data.get("LLM_results", [])]

        return LLMentryResult(
            data["id"],
            data.get("filename", "Filename not found"),
            data.get("language", "Language not found"),
            llm_results,
        )


@dataclass
class BaseEntryResult:
    id: str
    filename: str
    language: str
    base_log: str

    # metrics
    execution_time_ms: Optional[int] = None
    CPU_usage: Optional[float] = None
    RAM_usage: Optional[int] = None
    regressionTestPassed: bool = False

    # exec metadata
    success: Optional[bool] = None
    error_message: Optional[str] = None
    log_path: Optional[str] = None

    def is_valid(self) -> bool:
        """Check if metrics are meaningful"""
        return (
            self.execution_time_ms is not None
            and self.CPU_usage is not None
            and self.RAM_usage is not None
            and self.regressionTestPassed is not None
            and self.RAM_usage != 0
            and self.execution_time_ms != 0
        )

    def to_json(self) -> Dict[str, Any]:
        """Converte l'istanza in un dizionario per la serializzazione JSON."""
        # Non serve importare asdict di dataclasses per questa classe semplice
        return self.__dict__

    def from_json(data: Dict[str, any]) -> "BaseEntryResult":
        if "timestamp" in data:
            data.pop("timestamp")

        if "success" not in data:
            data["success"] = None
        if "error_message" not in data:
            data["error_message"] = None
        if "log_path" not in data:
            data["log_path"] = None

        if "CPU_usage" not in data:
            data["CPU_usage"] = None
        if "RAM_usage" not in data:
            data["RAM_usage"] = None
        if "execution_time_ms" not in data:
            data["execution_time_ms"] = None
        if "regressionTestPassed" not in data:
            data["regressionTestPassed"] = None

        if "base_log" not in data:
            data["base_log"] = None

        if "filename" not in data:
            data["filename"] = ""

        return BaseEntryResult(**data)




# ---


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
        with open(config_file, "w") as f:
            f.write(token)
        print(f"Token salvato in {config_file}")
        return token

    return None


def load_github_token():
    """Carica il token GitHub se disponibile"""
    config_file = Path(".github_token")
    if config_file.exists():
        with open(config_file, "r") as f:
            return f.read().strip()
    return None


def get_cluster_names(cluster_dir_path: Path) -> List[str]:
    res = []
    for file_path in cluster_dir_path.glob("cluster_*.json"):
        if not any(
            skip in file_path.name
            for skip in ["debug", "test", "bad_entries", "focused_", "with_metrics"]
        ):
            file_name = file_path.name.replace("cluster_", "").replace(".json", "")
            res.append(file_name)

    return res


class LoggerLevel(enum.Enum):
    WARNING = "warning"
    INFO = "info"
    ERROR = "error"
    DEBUG = "debug"
