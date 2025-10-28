# Integration Guide - Unified Analyzer

Guida all'integrazione del Unified Analyzer con il codice esistente del progetto.

## Backward Compatibility

Il modulo Unified Analyzer è completamente **backward compatible** con il codice esistente. Non richiede modifiche al codice attuale e può essere usato affiancato agli script esistenti.

## Confronto con Moduli Esistenti

### 1. `analyze_execution.py` (execution_sanity_checks)

**Codice Esistente:**
```python
from src.execution_sanity_checks.analyze_execution import SimplifiedClusterAnalyzer

analyzer = SimplifiedClusterAnalyzer()
cluster_statuses = analyzer.analyze_all_clusters()
report = analyzer.generate_report(cluster_statuses)
print(report)
```

**Unified Analyzer Equivalente:**
```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.reporters.report_generator import ReportGenerator

config = AnalyzerConfig.load_default()
data_loader = DataLoader(config)
anomaly_detector = AnomalyDetector(config)
report_generator = ReportGenerator(config)

# Carica dati
cluster_names = data_loader.get_all_cluster_names()
all_entries = []
for name in cluster_names:
    all_entries.extend(data_loader.load_execution_results(name))

# Analizza
anomalies = anomaly_detector.detect_all(all_entries)
report = report_generator.generate_full_report(anomalies, len(all_entries))

# Stampa
print(report_generator.generate_summary_text(report))
```

**Vantaggi Unified Analyzer:**
- Analisi più dettagliata con severity levels
- Root cause analysis integrata
- Export in multipli formati
- Statistiche più complete

### 2. `sanity_checker.py` (execution_sanity_checks)

**Codice Esistente:**
```python
from src.execution_sanity_checks.sanity_checker import SanityChecker

checker = SanityChecker()
checker.sanity_checks()
```

**Unified Analyzer Equivalente:**
```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.core.enums import AnalysisMode

# Configurazione simile a sanity check
config = AnalyzerConfig()
config.enabled_modes = [AnalysisMode.INVALID_VALUES, AnalysisMode.MISSING_METRICS]

# Usa main.py o programmaticamente
# python src/unified_analyzer/main.py --modes invalid missing
```

**Vantaggi Unified Analyzer:**
- Metriche di successo più sofisticate
- Separazione clara tra anomaly types
- Tracking più dettagliato degli errori

### 3. `analyze_invalid_outputs.py` (run_tests_on_clusters)

**Codice Esistente:**
```python
from src.run_tests_on_clusters.analyze_invalid_outputs import InvalidOutputAnalyzer

analyzer = InvalidOutputAnalyzer(output_dir)
results = analyzer.analyze_all_outputs()
analyzer.print_summary(results)
analyzer.save_report(report_path)
```

**Unified Analyzer Equivalente:**
```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.reporters.exporters import ReportExporter

config = AnalyzerConfig()
config.enabled_modes = [AnalysisMode.INVALID_VALUES, AnalysisMode.MISSING_METRICS]

data_loader = DataLoader(config)
detector = AnomalyDetector(config)

# Analizza tutti i cluster
cluster_names = data_loader.get_all_cluster_names()
all_entries = []
for name in cluster_names:
    all_entries.extend(data_loader.load_execution_results(name))

anomalies = detector.detect_all(all_entries)

# Export
exporter = ReportExporter()
exporter.export_json(report, "invalid_outputs_report.json")
```

**Vantaggi Unified Analyzer:**
- Distinction tra invalid values e missing metrics
- Priority languages supportato nativamente
- Root cause analysis per ogni anomalia

### 4. `outlier_filter.py` (run_tests_on_clusters)

**Codice Esistente:**
```python
from src.run_tests_on_clusters.outlier_filter import OutlierFilter

outlier_filter = OutlierFilter(outlier_report_path)
outlier_filter.load_outlier_report()
affected_entries = outlier_filter.get_base_entry_ids_to_execute(cluster_name)
```

**Unified Analyzer Equivalente:**
```python
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.core.enums import AnalysisMode, AnomalyType
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector

config = AnalyzerConfig.for_outlier_detection()
data_loader = DataLoader(config)
detector = AnomalyDetector(config)

# Carica e rileva outliers
entries = data_loader.load_execution_results(cluster_name)
outliers = detector.detect_outliers(entries, threshold_percentage=500.0)

# Estrai entry IDs
outlier_entry_ids = {anomaly.entry.id for anomaly in outliers}
```

**Vantaggi Unified Analyzer:**
- IQR method con threshold configurabile
- Severity levels per prioritizzazione
- Integrazione con root cause analysis

## Migrazione Graduale

È possibile migrare gradualmente al Unified Analyzer:

### Step 1: Affiancamento
Usa entrambi i sistemi in parallelo per comparare risultati:

```python
# Vecchio sistema
from src.execution_sanity_checks.sanity_checker import SanityChecker
old_checker = SanityChecker()
old_checker.sanity_checks()

# Nuovo sistema
import subprocess
subprocess.run(["python", "src/unified_analyzer/main.py", "--export", "json"])

# Compara risultati manualmente
```

### Step 2: Transizione Parziale
Usa Unified Analyzer per nuove analisi, mantieni vecchi script per compatibilità:

```python
# Nuove analisi
if use_unified_analyzer:
    from unified_analyzer import ...
    # Unified analyzer code
else:
    # Old code
    from src.execution_sanity_checks import ...
```

### Step 3: Migrazione Completa
Sostituisci completamente i vecchi script con Unified Analyzer.

## Utilizzo con Scripts Esistenti

### Integrazione in `run_all_tests.py`

Dopo l'esecuzione dei test, puoi automaticamente analizzare i risultati:

```python
# Alla fine di run_all_tests.py
print("\nRunning Unified Analyzer...")
import subprocess
result = subprocess.run([
    "python", "src/unified_analyzer/main.py",
    "--export", "json", "csv",
    "--root-cause"
], capture_output=True, text=True)
print(result.stdout)
```

### Integrazione in `main_exec_metrics_analysis.py`

Usa Unified Analyzer come pre-processing step:

```python
# All'inizio di main_exec_metrics_analysis.py
from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector

# Rileva e filtra anomalie prima del calcolo metriche
config = AnalyzerConfig.for_quick_scan()
data_loader = DataLoader(config)
detector = AnomalyDetector(config)

cluster_names = data_loader.get_all_cluster_names()
for cluster_name in cluster_names:
    entries = data_loader.load_execution_results(cluster_name)
    anomalies = detector.detect_all(entries)

    if anomalies:
        print(f"WARNING: {len(anomalies)} anomalies detected in {cluster_name}")
        # Filtra entries con anomalie o procedi comunque
```

## Wrapper Functions per Compatibilità

Per facilitare la transizione, puoi creare wrapper functions:

```python
# src/unified_analyzer/compat.py

from unified_analyzer.core.config import AnalyzerConfig
from unified_analyzer.data.loader import DataLoader
from unified_analyzer.analyzers.anomaly_detector import AnomalyDetector
from unified_analyzer.reporters.report_generator import ReportGenerator

def sanity_check_all_clusters():
    """
    Wrapper compatibile con SanityChecker.sanity_checks()
    """
    config = AnalyzerConfig.load_default()
    data_loader = DataLoader(config)
    detector = AnomalyDetector(config)
    generator = ReportGenerator(config)

    cluster_names = data_loader.get_all_cluster_names()
    all_entries = []
    for name in cluster_names:
        all_entries.extend(data_loader.load_execution_results(name))

    anomalies = detector.detect_all(all_entries)
    report = generator.generate_full_report(anomalies, len(all_entries))

    return {
        'total_clusters': len(cluster_names),
        'total_entries': len(all_entries),
        'total_anomalies': len(anomalies),
        'report': report
    }

def get_clusters_to_rerun(priority_only=True):
    """
    Wrapper compatibile con InvalidOutputAnalyzer.get_clusters_to_rerun()
    """
    config = AnalyzerConfig()
    if priority_only:
        config.priority_languages = ['c', 'cpp', 'java']

    data_loader = DataLoader(config)
    detector = AnomalyDetector(config)

    cluster_names = data_loader.get_all_cluster_names()
    clusters_with_issues = []

    for name in cluster_names:
        entries = data_loader.load_execution_results(name)
        anomalies = detector.detect_all(entries)

        if anomalies:
            clusters_with_issues.append(name)

    return clusters_with_issues
```

Uso:

```python
from unified_analyzer.compat import sanity_check_all_clusters, get_clusters_to_rerun

# Invece di SanityChecker
results = sanity_check_all_clusters()

# Invece di InvalidOutputAnalyzer
clusters = get_clusters_to_rerun(priority_only=True)
```

## Accesso ai Dati Esistenti

Il Unified Analyzer usa gli stessi paths e utility:

```python
from unified_analyzer.core.config import AnalyzerConfig

config = AnalyzerConfig.load_default()

# Usa utility_paths esistenti
print(f"Clusters: {config.clusters_dir}")  # utility_paths.CLUSTERS_DIR_FILEPATH
print(f"Outputs: {config.output_dir}")     # utility_paths.OUTPUT_DIR_FILEPATH
print(f"Logs: {config.logs_dir}")          # utility_paths.SRC_DIR / "logs"
```

## Testing Parallelismo

Puoi testare entrambi i sistemi in parallelo:

```bash
# Test con vecchio sistema
python src/execution_sanity_checks/sanity_checker.py > old_results.txt

# Test con Unified Analyzer
python src/unified_analyzer/main.py --export text --output-dir ./compare > new_results.txt

# Compara
diff old_results.txt compare/analysis_report_*.txt
```

## Note Importanti

1. **Non Modifica File di Input**: Unified Analyzer legge solo, non modifica mai cluster o output files

2. **Report Separati**: I report sono salvati in `src/unified_analyzer/reports/` per non interferire con report esistenti

3. **Logging Indipendente**: Usa logging Python standard, non interferisce con log esistenti

4. **No Dependencies Extra**: Usa solo dipendenze già presenti nel progetto

5. **Testato con Dati Esistenti**: Compatibile con tutti i formati di cluster e output files attuali

## Benefici dell'Integrazione

1. **Analisi più profonda** senza modificare workflow esistente
2. **Root cause analysis** per debugging più rapido
3. **Export multipli formati** per diverse use cases
4. **Backward compatible** al 100%
5. **Facilmente estendibile** per nuove funzionalità

## Support

Per domande sull'integrazione o problemi di compatibilità:
1. Controlla README.md per esempi d'uso
2. Esegui example_usage.py per vedere tutti i casi d'uso
3. Consulta i docstring nei moduli Python

## Roadmap Integrazione

- [ ] Phase 1: Testing parallelo (settimana 1-2)
- [ ] Phase 2: Uso affiancato per nuove analisi (settimana 3-4)
- [ ] Phase 3: Migrazione graduale scripts esistenti (mese 2)
- [ ] Phase 4: Sostituzione completa (opzionale, mese 3+)
