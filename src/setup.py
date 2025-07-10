import os
import sys
import subprocess
from pathlib import Path

def install_requirements():
    """Installa le dipendenze necessarie"""
    print("Installazione dipendenze...")
    
    # Lista delle dipendenze core
    core_deps = [
        "pathlib2>=2.3.6",
        "typing-extensions>=4.0.0",
        "python-dotenv>=1.0.0",
        "tenacity>=8.0.0"
    ]
    
    # Lista delle dipendenze opzionali per i vari provider
    optional_deps = {
        "ollama": ["ollama>=0.1.0"],
        "openai": ["openai>=1.0.0"],
        "gemini": ["google-generativeai>=0.3.0"],
        "anthropic": ["anthropic>=0.7.0"]
    }
    
    # Installa dipendenze core
    for dep in core_deps:
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", dep])
            print(f"✓ Installato: {dep}")
        except subprocess.CalledProcessError:
            print(f"✗ Errore installazione: {dep}")
    
    # Installa dipendenze opzionali
    print("\nInstallazione dipendenze opzionali...")
    for provider, deps in optional_deps.items():
        install_provider = input(f"Installare supporto per {provider}? (y/n): ").lower() == 'y'
        if install_provider:
            for dep in deps:
                try:
                    subprocess.check_call([sys.executable, "-m", "pip", "install", dep])
                    print(f"✓ Installato: {dep}")
                except subprocess.CalledProcessError:
                    print(f"✗ Errore installazione: {dep}")

def setup_env_file():
    """Crea il file .env se non esiste"""
    env_path = Path(".env")
    env_example_path = Path(".env.example")
    
    if not env_path.exists():
        if env_example_path.exists():
            # Copia dall'example
            with open(env_example_path, 'r') as f:
                content = f.read()
            with open(env_path, 'w') as f:
                f.write(content)
            print("✓ File .env creato da .env.example")
        else:
            # Crea un file .env base
            env_content = """# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Rate limiting settings
MAX_REQUESTS_PER_MINUTE=60
MAX_CONCURRENT_REQUESTS=5
"""
            with open(env_path, 'w') as f:
                f.write(env_content)
            print("✓ File .env creato")
        
        print("⚠️  Ricorda di configurare le tue API keys nel file .env")
    else:
        print("✓ File .env già esistente")

def setup_config_file():
    """Crea il file di configurazione LLM se non esiste"""
    config_path = Path("llm_configs.json")
    
    if not config_path.exists():
        config_content = """{
  "llama3": {
    "temperature": 0.2,
    "max_tokens": 3000,
    "timeout": 120
  },
  "gpt4": {
    "temperature": 0.1,
    "max_tokens": 4000,
    "timeout": 90
  },
  "gpt4o": {
    "temperature": 0.1,
    "max_tokens": 4000,
    "timeout": 90
  },
  "gemini_flash": {
    "temperature": 0.2,
    "max_tokens": 8000,
    "timeout": 60
  },
  "claude_sonnet": {
    "temperature": 0.1,
    "max_tokens": 4000,
    "timeout": 120
  },
  "claude_sonnet4": {
    "temperature": 0.1,
    "max_tokens": 4000,
    "timeout": 120
  }
}"""
        with open(config_path, 'w') as f:
            f.write(config_content)
        print("✓ File llm_configs.json creato")
    else:
        print("✓ File llm_configs.json già esistente")

def main():
    """Funzione principale di setup"""
    print("=== Setup LLM Generator Enhanced ===\n")
    
    # Installa dipendenze
    install_requirements()
    
    print("\n=== Configurazione Files ===")
    
    # Setup file .env
    setup_env_file()
    
    # Setup file configurazione
    setup_config_file()
    
    print("\n=== Setup Completato ===")
    print("1. Configura le tue API keys nel file .env")
    print("2. Personalizza le configurazioni in llm_configs.json se necessario")
    print("3. Esegui: python llm_generator.py --list-models per vedere i modelli disponibili")
    print("4. Esegui: python llm_generator.py --models gpt4 claude_sonnet per usare modelli specifici")

if __name__ == "__main__":
    main()