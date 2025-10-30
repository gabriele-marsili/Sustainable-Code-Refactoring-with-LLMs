# Sustainable Code Refactoring with LLMs

## Progetto di Tesi - Università di Pisa

**Anno Accademico:** 2024/2025

---

## 📋 Indice

- [Introduzione](#introduzione)
- [Obiettivo della Tesi](#obiettivo-della-tesi)
- [Architettura del Sistema](#architettura-del-sistema)
- [Struttura della Directory](#struttura-della-directory)
- [Workflow Completo](#workflow-completo)
- [Stato del Progetto](#stato-del-progetto)
- [Quick Start](#quick-start)
- [Requisiti](#requisiti)
- [Comandi Principali](#comandi-principali)

---

## 🎯 Introduzione

Questo progetto di ricerca esplora l'utilizzo di **Large Language Models (LLMs)** per il **refactoring automatico di codice** con focus sulla **sostenibilità computazionale**. L'obiettivo è valutare se gli LLM possono generare codice ottimizzato che riduce:
- ⚡ Consumo energetico (CPU usage)
- 💾 Utilizzo di memoria (RAM usage)
- ⏱️ Tempo di esecuzione (execution time)

mantenendo la **correttezza funzionale** (test pass rate).

---

## 🎓 Obiettivo della Tesi

### Domanda di Ricerca Principale
**"Possono i Large Language Models generare automaticamente refactoring di codice che migliorano le metriche di sostenibilità senza compromettere la correttezza funzionale?"**

### Sotto-Obiettivi
1. **Dataset Creation:** Creare un dataset di coppie codice-test da repository Exercism
2. **LLM-Based Refactoring:** Generare versioni ottimizzate usando prompt engineering
3. **Metrics Collection:** Misurare CPU, RAM, tempo di esecuzione, test pass rate
4. **Comparative Analysis:** Confrontare baseline vs versioni LLM-generate
5. **Pattern Identification:** Identificare pattern di miglioramento per linguaggio e modello

---

## 🏗️ Architettura del Sistema

```
PIPELINE COMPLETA
=================
Dataset Creation → Clustering → LLM Generation → Docker Execution → Metrics Analysis → Unified Analyzer
```

---

## 📂 Struttura della Directory

```
src/
├── dataset/                      # Codice originale da Exercism (8 linguaggi)
├── clusters/                     # Cluster organizzati per esercizio
├── prompts/                      # Template prompt (v1, v2, v3, v4)
├── out_improvements_metadata/    # Codice generato da LLM
├── docker/                       # Dockerfiles per ogni linguaggio
├── execution_outputs/            # Risultati esecuzioni JSON
├── execution_reports/            # Report human-readable
├── metrics/                      # Analisi metriche e visualizzazioni
├── unified_analyzer/             # ⭐ MODULO UNIFICATO ANALISI ERRORI
├── debug_tools/                  # Tool per debugging manuale
├── utility_dir/                  # Utility condivise
├── old/                          # Codice deprecato (post-refactoring)
├── main.py                       # Entry point principale
└── requirements.txt              # Dipendenze Python
```

Vedi [CLAUDE.md](CLAUDE.md) per documentazione dettagliata architettura.

---

## 🔄 Workflow Completo

### 1. Dataset Creation
```bash
python src/main.py --add-sources -l python java typescript
python src/main.py --create-focused-cluster
```

### 2. LLM Generation
```bash
cd src/LLMs_generator_engine
python llm_generator.py --cluster-name two-sum --models openai claude gemini
```

### 3. Test Execution
```bash
cd src/run_tests_on_clusters
python run_tests_on_cluster.py --cluster-name two-sum --num-executions 5
```

### 4. Metrics Analysis
```bash
cd src/metrics
python main_exec_metrics_analysis.py
```

### 5. Unified Analysis
```bash
cd src
python -m unified_analyzer analyze --clusters all --modes all --root-cause --export json markdown
```

---

## 📊 Stato del Progetto

### ✅ Completato

- ✅ **Dataset Creation:** 8 linguaggi, ~150+ cluster, ~5000+ entry
- ✅ **LLM Integration:** OpenAI, Anthropic, Google - 4 prompt versions
- ✅ **Execution Infrastructure:** Docker containers, metrics collection
- ✅ **Metrics Analysis:** 4 obiettivi statistici + visualizations
- ✅ **Unified Analyzer:** Anomaly detection, root cause, auto-fixing

### 🚧 In Progress

- 🔨 CLI Unificato per workflow orchestration
- 🔨 Orchestration Layer completo
- 🔨 Cluster Rerunner per outlier handling

---

## 🚀 Quick Start

```bash
# Installazione
git clone [repository-url]
cd Sustainable-Code-Refactoring-with-LLMs
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurazione
cd src
cp .env.example .env  # Edit con le tue API keys

# Test rapido
cd run_tests_on_clusters
python run_tests_on_cluster.py --cluster-name blank --num-executions 1
```

---

## 📦 Requisiti

- Python 3.9+
- Docker Desktop
- API Keys: OpenAI, Anthropic, Google Gemini

---

## 💻 Comandi Principali

```bash
# Dataset
python src/main.py --statistics
python src/main.py --analysis --charts

# Unified Analyzer
python -m unified_analyzer analyze --help
python -m unified_analyzer validate --help
python -m unified_analyzer workflow --full

# Metrics
cd src/metrics
python main_exec_metrics_analysis.py
```

---

## 📚 Documentazione

- [CLAUDE.md](CLAUDE.md) - Documentazione completa architettura
- [src/unified_analyzer/README.md](src/unified_analyzer/README.md) - Unified Analyzer API
- [src/metrics/README_exec_metrics.md](src/metrics/README_exec_metrics.md) - Metrics analysis

---

**Ultima modifica:** 2025-10-28  
**Versione:** 2.0.0 (Post-Refactoring Unified Analyzer)
