# Pipeline LLM - Guida all'uso

## Installazione

1. Installa le dipendenze:
```bash
pip install -r requirements.txt
```

2. Assicurati che Ollama sia installato e in esecuzione:
```bash
# Installa Ollama (se non già installato)
curl -fsSL https://ollama.com/install.sh | sh

# Avvia Ollama
ollama serve

```

3. Verifica che Docker sia installato e funzionante:
```bash
docker --version
docker ps
```

## Utilizzo della Pipeline

### 1. Esecuzione completa (Generazione + Testing)

```bash
# Esegui la pipeline completa
python pipeline_manager.py

# Con numero specificato di worker
python pipeline_manager.py --max-workers 6
```

### 2. Solo generazione codici LLM

```bash
# Genera solo i codici migliorati dagli LLM
python pipeline_manager.py --generation-only

# Con worker personalizzati
python pipeline_manager.py --generation-only --max-workers 4
```

### 3. Solo testing

```bash
# Esegui solo i test (assumendo che i codici LLM siano già stati generati)
python pipeline_manager.py --testing-only

# Test solo sui codici base originali
python pipeline_manager.py --testing-only --base-only

# Test solo sui codici LLM
python pipeline_manager.py --testing-only --llm-only
```

### 4. Esecuzione diretta run_tests.py (modalità legacy migliorata)

```bash
# Test completo con concorrenza
python run_tests.py --max-workers 8

# Solo test base
python run_tests.py --base-only --max-workers 4

# Solo test LLM
python run_tests.py --llm-only --max-workers 6
```

## Struttura dei File

### File principali aggiunti:

1. **`llm_generator.py`** - Gestisce la generazione dei codici migliorati dagli LLM
2. **`pipeline_manager.py`** - Orchestratore principale delle due fasi
3. **`requirements.txt`** - Dipendenze necessarie

### Ottimizzazione delle performance

- **Worker threads**: Il numero di thread è automaticamente calcolato basandosi sui core CPU disponibili
- **Retry logic**: Gestione automatica dei fallimenti con backoff esponenziale
- **Memory management**: Gestione ottimizzata della memoria durante l'esecuzione parallela

## Monitoraggio e Logging

### Log di esecuzione

La pipeline genera log dettagliati, esempio:

```
2025-01-09 10:15:30 - INFO - Inizio generazione codici LLM
2025-01-09 10:15:31 - INFO - Usando 4 worker threads
2025-01-09 10:15:32 - INFO - Progresso: 12/240 (5.0%)
2025-01-09 10:16:45 - INFO - Generazione completata: 235/240 successi
2025-01-09 10:16:46 - INFO - Inizio fase testing
2025-01-09 10:16:47 - INFO - 🧪 Esecuzione test: go_raindrops_base
2025-01-09 10:16:48 - INFO - 🔄 Progresso test: 45/180 (25.0%)
```

### File di output

- **`dataset.json`** - Dataset aggiornato con i percorsi dei file generati
- **`focused_cluster_datas.json`** - Risultati dei test con metriche
- **`logs/`** - Directory con i log dettagliati di ogni esecuzione
