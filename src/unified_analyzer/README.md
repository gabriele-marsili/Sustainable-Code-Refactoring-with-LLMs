# Unified Analyzer

Un modulo Python completo per l'analisi dei risultati di esecuzione dei test, il rilevamento di anomalie e l'analisi delle cause root degli errori.

## Panoramica

Il Unified Analyzer consolida e migliora la logica di analisi precedentemente frammentata in più file, fornendo:

- **Rilevamento Anomalie**: Identifica outliers, valori invalidi e metriche mancanti
- **Analisi Causa Root**: Determina le cause probabili degli errori (test suite vs code bug)
- **Reporting Completo**: Genera report dettagliati in multipli formati (JSON, CSV, Markdown, Text)
- **CLI Professionale**: Interfaccia a riga di comando per analisi interattive

## Architettura

```
unified_analyzer/
├── core/                  # Componenti core (models, enums, config)
├── data/                  # Caricamento e parsing dati
├── analyzers/             # Rilevamento anomalie e root cause analysis
├── reporters/             # Generazione report ed export
├── cli/                   # Interfaccia CLI (futuro)
├── utils/                 # Utilità varie
└── main.py               # Script principale
```

### Componenti Principali

#### Core Layer
- **models.py**: Modelli dati (ExecutionEntry, Anomaly, AnalysisReport)
- **enums.py**: Enumerazioni (AnomalyType, RootCause, Severity)
- **config.py**: Configurazione dell'analyzer

#### Data Layer
- **loader.py**: Caricamento cluster e execution outputs
- **parser.py**: Parsing filename e strutture dati
- **validator.py**: Validazione dati

#### Analyzers Layer
- **anomaly_detector.py**: Rilevamento outliers, invalid values, missing metrics
- **log_analyzer.py**: Analisi file di log per estrazione errori
- **root_cause_analyzer.py**: Analisi cause root con logica avanzata

#### Reporters Layer
- **report_generator.py**: Generazione report completi
- **exporters.py**: Export in JSON, CSV, Markdown, Text

## Installazione

Nessuna installazione aggiuntiva necessaria. Il modulo usa le dipendenze già presenti nel progetto.

## Utilizzo

### Uso Base

```bash
# Analizza tutti i cluster
python src/unified_analyzer/main.py

# Analizza cluster specifici
python src/unified_analyzer/main.py --clusters contains_duplicate reverse_array

# Solo rilevamento valori invalidi (scan veloce)
python src/unified_analyzer/main.py --modes invalid missing
```

### Analisi Avanzata

```bash
# Analisi completa con root cause
python src/unified_analyzer/main.py --modes all --root-cause

# Analisi con threshold outliers personalizzato
python src/unified_analyzer/main.py --outlier-threshold 300

# Analisi solo risultati LLM
python src/unified_analyzer/main.py --test-type llm --root-cause
```

### Export Risultati

```bash
# Export in multipli formati
python src/unified_analyzer/main.py --export json csv markdown

# Export con directory custom
python src/unified_analyzer/main.py --export json --output-dir ./my_reports

# Scan veloce senza log analysis
python src/unified_analyzer/main.py --quick --export csv
```

### Modalità Verbose

```bash
# Output dettagliato per debugging
python src/unified_analyzer/main.py --verbose
```

## Opzioni CLI

```
--clusters CLUSTER [CLUSTER ...]
    Cluster specifici da analizzare (default: tutti)

--modes {invalid,missing,outliers,all} [{invalid,missing,outliers,all} ...]
    Modalità di analisi (default: all)
    - invalid: rileva valori <= 0 o None
    - missing: rileva metriche completamente assenti
    - outliers: rileva valori estremi (IQR method)
    - all: esegue tutte le analisi

--test-type {base,llm,both}
    Tipo di risultati da analizzare (default: both)

--root-cause
    Esegue analisi causa root (più lenta ma dettagliata)

--export {json,csv,markdown,text} [{json,csv,markdown,text} ...]
    Formati di export (multipli supportati)

--output-dir PATH
    Directory output per report

--outlier-threshold FLOAT
    Soglia percentuale per outliers (default: 500%)

--verbose, -v
    Output dettagliato

--quick
    Modalità scan veloce (no log analysis, no root cause)
```

## Uso Programmatico

```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.analyzers.root_cause_analyzer import RootCauseAnalyzer
from unified_analyzer.reporters.report_generator import ReportGenerator

# Configurazione
config = AnalyzerConfig.load_default()

# Inizializza componenti
data_loader = DataLoader(config)
anomaly_detector = AnomalyDetector(config)
root_cause_analyzer = RootCauseAnalyzer(config, data_loader)
report_generator = ReportGenerator(config)

# Carica dati
entries = data_loader.load_execution_results("contains_duplicate", "both")

# Rileva anomalie
anomalies = anomaly_detector.detect_all(entries)

# Analizza cause root
for anomaly in anomalies:
    root_cause_analyzer.analyze(anomaly)

# Genera report
report = report_generator.generate_full_report(anomalies, len(entries))

# Stampa summary
print(report_generator.generate_summary_text(report))

# Export
from unified_analyzer.reporters.exporters import ReportExporter
exporter = ReportExporter()
exporter.export_json(report, Path("report.json"))
```

## Tipi di Anomalie Rilevate

### 1. Invalid Values
Valori di metriche <= 0 o None:
- `CPU_usage = 0`
- `RAM_usage = None`
- `execution_time_ms <= 0`

### 2. Missing Metrics
Metriche completamente assenti dall'entry

### 3. Outliers
Valori che deviano significativamente dalla mediana del gruppo (default: >500%)

## Root Cause Analysis

Il modulo implementa una logica sofisticata per distinguere tra errori della test suite e bug del codice:

### Strategia Multi-Livello

1. **Analisi Errori Compilazione**: Estrae il file sorgente dell'errore e determina se è test o code
2. **Analisi Link Errors**: Pattern matching su messaggi di linking
3. **Analisi Runtime Errors**: Stack trace e crash location
4. **Pattern Matching Error Messages**: Pattern noti per test suite vs code
5. **Analisi Metriche**: Test passed + metrics=0 → metrics collection failure
6. **Confronto con Entries Simili**: Failure rate per identificare problemi sistemici
7. **Euristica Linguaggio-Specifica**: Logica dedicata per C++, Java, etc.

### Root Causes Identificate

- `TEST_SUITE_ERROR`: Errore nella test suite
- `CODE_BUG`: Bug nel codice sotto test
- `COMPILATION_ERROR`: Errore di compilazione
- `RUNTIME_CRASH`: Crash runtime (segfault, nullptr, etc.)
- `TIMEOUT`: Timeout esecuzione
- `MEMORY_ERROR`: Errori di memoria
- `ASSERTION_FAILURE`: Fallimento asserzione
- `METRICS_COLLECTION_FAILURE`: Fallimento raccolta metriche
- `CONFIGURATION_ERROR`: Errore configurazione build
- `DOCKER_ERROR`: Problema Docker
- `UNKNOWN`: Causa non determinabile

## Esempi Output

### Console Summary

```
================================================================================
UNIFIED ANALYZER - ANALYSIS SUMMARY
================================================================================
Analysis Date: 2025-10-26 15:30:45
Total Entries Analyzed: 1,248
Total Anomalies Detected: 87
Anomaly Rate: 6.97%

Severity Breakdown:
----------------------------------------
  Critical   :    22 anomalies
  High       :    34 anomalies
  Medium     :    21 anomalies
  Low        :    10 anomalies

Anomaly Types:
----------------------------------------
  Invalid Value             :    53
  Missing Metrics           :    22
  Outlier                   :    12

By Programming Language:
----------------------------------------
  C              :    34 anomalies
  CPP            :    21 anomalies
  JAVA           :    18 anomalies
  PYTHON         :    14 anomalies

Top Root Causes:
----------------------------------------
  Test Suite Error              :    28
  Code Bug                      :    22
  Compilation Error             :    15
  Runtime Crash                 :    12
  Metrics Collection Failure    :     10
```

### Esportazione

- **JSON**: Report completo strutturato per parsing automatico
- **CSV**: Tabella anomalie per analisi in Excel/Python
- **Markdown**: Report human-readable con formattazione
- **Text**: Summary testuale per documentazione

## Backward Compatibility

Il modulo è completamente **backward compatible** con il codice esistente:

- Utilizza `utility_paths` e `general_utils` esistenti
- Non modifica i file di input/output esistenti
- Può essere usato affiancato agli script esistenti
- Naming conventions coerenti con il progetto

## Estensioni Future

Il modulo è progettato per essere esteso facilmente:

1. **CLI Interattiva con Rich**: TUI navigabile con tabelle e menu
2. **Visualizzazioni Grafiche**: Charts e plots con matplotlib/seaborn
3. **Integrazione CI/CD**: Plugin per pipeline automatizzate
4. **Dashboard Web**: Interfaccia web per visualizzazione risultati
5. **Machine Learning**: Predizione anomalie e classificazione automatica cause

## Troubleshooting

### "No execution entries found"
- Verificare che `src/execution_outputs/` contenga file JSON
- Controllare naming: `{cluster}_results_{num}.json`

### "Invalid cluster structure"
- Verificare formato JSON cluster in `src/clusters/`
- Controllare presenza chiavi `results` nei file output

### "Could not load log file"
- Log files potrebbero essere troppo grandi (>10MB default)
- Usare `--quick` per saltare log analysis

### Errori di import
- Verificare di essere nella directory src: `cd src && python -m unified_analyzer.main`

## Contribuire

Per aggiungere nuove funzionalità:

1. **Nuovi Pattern di Errore**: Aggiungere pattern in `log_analyzer.py`
2. **Nuove Root Causes**: Estendere enum in `core/enums.py`
3. **Nuovi Formati Export**: Aggiungere metodi in `exporters.py`
4. **Nuove Modalità Analisi**: Estendere `AnomalyDetector`

## Licenza

Parte del progetto di tesi "Sustainable Code Refactoring with LLMs"
