import time
import asyncio
from typing import Dict, Any, Optional, Callable
from functools import wraps
from threading import Lock
import logging

logger = logging.getLogger(__name__)

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
            self.requests = [req_time for req_time in self.requests 
                           if now - req_time < self.time_window]
            
            # Controlla se abbiamo raggiunto il limite
            if len(self.requests) >= self.max_requests:
                oldest_request = min(self.requests)
                wait_time = self.time_window - (now - oldest_request)
                if wait_time > 0:
                    logger.info(f"Rate limit raggiunto, attendo {wait_time:.1f} secondi")
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
                    
                    delay = base_delay * (2 ** attempt)
                    logger.warning(f"Tentativo {attempt + 1} fallito: {e}. Retry in {delay}s")
                    time.sleep(delay)
            
            return None
        return wrapper
    return decorator
class ModelValidator:
    """Validatore per le configurazioni dei modelli"""
    
    @staticmethod
    def validate_openai_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione OpenAI"""
        required_fields = ['model']
        valid_models = ['gpt-4', 'gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo']
        
        if not all(field in config for field in required_fields):
            return False
        
        if config['model'] not in valid_models:
            logger.warning(f"Modello OpenAI non riconosciuto: {config['model']}")
        
        return True
    
    @staticmethod
    def validate_gemini_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione Gemini"""
        required_fields = ['model']
        valid_models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro']
        
        if not all(field in config for field in required_fields):
            return False
        
        if config['model'] not in valid_models:
            logger.warning(f"Modello Gemini non riconosciuto: {config['model']}")
        
        return True
    
    @staticmethod
    def validate_anthropic_config(config: Dict[str, Any]) -> bool:
        """Valida configurazione Anthropic"""
        required_fields = ['model']
        valid_models = [
            'claude-3-sonnet-20240229',
            'claude-3-opus-20240229',
            'claude-3-haiku-20240307',
            'claude-sonnet-4-20250514'
        ]
        
        if not all(field in config for field in required_fields):
            return False
        
        if config['model'] not in valid_models:
            logger.warning(f"Modello Anthropic non riconosciuto: {config['model']}")
        
        return True

def load_env_variables():
    """Carica le variabili d'ambiente"""
    try:
        from dotenv import load_dotenv
        load_dotenv()
        return True
    except ImportError:
        logger.warning("python-dotenv non installato, uso variabili d'ambiente di sistema")
        return False

def check_api_keys() -> Dict[str, bool]:
    """Controlla la disponibilità delle API keys"""
    import os
    
    keys_status = {
        'OPENAI_API_KEY': bool(os.getenv('OPENAI_API_KEY')),
        'GEMINI_API_KEY': bool(os.getenv('GEMINI_API_KEY')),
        'ANTHROPIC_API_KEY': bool(os.getenv('ANTHROPIC_API_KEY'))
    }
    
    return keys_status
