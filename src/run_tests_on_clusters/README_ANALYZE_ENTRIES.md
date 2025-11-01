# Analizzatore Risultati Entry Exercism C/C++

Script per analizzare i risultati dei test delle nuove entry C/C++ provenienti da Exercism.

## Utilizzo

### Analisi Completa

```bash
cd src/run_tests_on_clusters
python3 analyze_new_entries.py
```

Output:
- Statistiche generali (base vs LLM)
- Success rate e metriche ottenute
- Categorizzazione errori
- Breakdown per linguaggio
- Top 10 cluster con più problemi

### Analisi Cluster Specifico

```bash
python3 analyze_new_entries.py --cluster 01_hello_world -v
```

Con `-v` (verbose) mostra dettagli per ogni entry.

### Export CSV

```bash
python3 analyze_new_entries.py --export-csv results.csv
```

Esporta tutti i risultati in formato CSV per analisi esterna.

### Opzioni Aggiuntive

```bash
# Mostra top 20 cluster invece di 10
python3 analyze_new_entries.py --top 20

# Combinazione: cluster specifico + export
python3 analyze_new_entries.py -c hello_world -v --export-csv hello_world.csv
```

## Output Spiegato

### Success Rates

- **Base Code**: Dovrebbe essere ~100% (se il build system funziona)
- **LLM Variants**: Atteso 60-75% (alcuni LLM cambiano signatures)

### Error Categories

| Categoria | Significato | Azione |
|-----------|-------------|--------|
| `unknown` | Test non ancora eseguito | Eseguire `run_new_c_cpp_entries.sh` |
| `type_mismatch` | LLM ha cambiato function signature | Normale - dato di ricerca |
| `compilation` | Errore di compilazione generico | Verificare build system |
| `metrics_parse_failure` | Test eseguito ma metriche non parsabili | Raro - verificare log |

### Interpretazione Risultati

#### ✅ Scenario Ottimale
```
Base code: 100% success, 100% metrics
LLM code: 60-75% success, 60-75% metrics
Error categories: type_mismatch (10-40%), compilation (0-5%)
```

#### ⚠️ Scenario Attuale (Esecuzione in Corso)
```
Base code: <100% success
LLM code: <50% success
Error categories: unknown (>50%)
→ Molti test non ancora eseguiti
```

#### ❌ Scenario Problematico
```
Base code: <50% success
Error categories: compilation (>20%)
→ Problemi con build system
```

## Esempi

### 1. Monitoraggio Progresso Batch Execution

```bash
# Prima dell'esecuzione
python3 analyze_new_entries.py
# Output: unknown errors ~100%

# Durante l'esecuzione (ogni ora)
watch -n 3600 'python3 analyze_new_entries.py | head -50'

# Dopo l'esecuzione
python3 analyze_new_entries.py --export-csv final_results.csv
```

### 2. Debug Cluster Specifico

```bash
# Trova cluster con problemi
python3 analyze_new_entries.py | grep "Failure rate: 100"

# Analizza in dettaglio
python3 analyze_new_entries.py -c problematic_cluster -v
```

### 3. Analisi Per Linguaggio

```bash
# Export e filtra con grep/awk
python3 analyze_new_entries.py --export-csv all.csv
grep ",c," all.csv > c_only.csv
grep ",cpp," all.csv > cpp_only.csv
```

## Struttura CSV Export

| Colonna | Descrizione |
|---------|-------------|
| `cluster` | Nome del cluster |
| `entry_id` | ID univoco entry |
| `language` | `c` o `cpp` |
| `is_base` | `True` per base code, `False` per LLM |
| `executed` | Test eseguito? |
| `success` | Test passato? |
| `has_metrics` | Metriche ottenute? |
| `execution_time_ms` | Tempo esecuzione (ms) |
| `cpu_usage` | CPU usage (%) |
| `ram_usage` | RAM usage (KB) |
| `regression_test_passed` | Regression test passato (solo LLM) |
| `error_category` | Categoria errore |
| `error_message` | Messaggio errore |
| `docker_exit_code` | Exit code Docker |

## Workflow Tipico

```bash
# 1. Verifica stato iniziale
python3 analyze_new_entries.py

# 2. Esegui batch test
./run_new_c_cpp_entries.sh

# 3. Durante esecuzione: monitora progresso
python3 analyze_new_entries.py | grep "Tests passed"

# 4. Dopo esecuzione: analisi completa
python3 analyze_new_entries.py --export-csv results.csv

# 5. Identifica problemi
python3 analyze_new_entries.py --top 20 | grep "100.0%"

# 6. Debug cluster specifici
for cluster in $(problematic clusters); do
    python3 analyze_new_entries.py -c $cluster -v
done
```

## Troubleshooting

### "Found 0 clusters"

**Causa**: Nessun cluster con entry Exercism C/C++ trovato

**Soluzione**: Verifica che i cluster contengano field `"source": "exercism-*"`

### "Tests passed: 0/X (0.0%)"

**Causa**: Test non ancora eseguiti o tutti falliti

**Soluzione**:
1. Controlla se `unknown` errors > 90% → esegui `run_new_c_cpp_entries.sh`
2. Se `compilation` errors > 50% → verifica build system

### "Metrics obtained: 0/X"

**Causa**: Metriche non parsate dai log

**Soluzione**: Verifica che `time_wrapper.py` stampi output nel formato atteso

## File Analizzati

Lo script analizza:
- **Cluster JSON**: `src/clusters/cluster_*.json`
- **Risultati Base**: `src/execution_outputs/{cluster}_results_*.json`
- **Risultati LLM**: `src/execution_outputs/{cluster}_results_v*_*.json`
- **Diagnostic Log**: `src/logs/test_runner_{lang}_persistent_{entry_id}_*_diagnostic.json`

## Note Tecniche

### Rilevamento Entry Exercism

Entry riconosciute tramite:
```python
entry.get("source", "").lower().startswith("exercism-")
```

### Lookup Risultati

- **Base**: `entry_id` → `result`
- **LLM**: `(entry_id, llm_path)` → `result`

### Categorizzazione Errori

Basata su diagnostic JSON:
- `type_mismatch`: ambiguating declaration, conflicting types
- `compilation`: generic compilation error
- `unknown`: nessun risultato trovato (non eseguito)

## Integrazione con Altri Tool

### Con Jupyter Notebook

```python
import pandas as pd

# Load CSV
df = pd.read_csv('results.csv')

# Analisi successi per modello LLM
llm_df = df[~df['is_base']]
llm_df['llm_type'] = llm_df['entry_id'].str.extract(r'(openAI|claude|gemini)')
success_by_llm = llm_df.groupby('llm_type')['success'].mean()
print(success_by_llm)
```

### Con Stats Dataset Creator

Questo script è complementare a `dataset_stats_creator.py`:
- `dataset_stats_creator.py`: Statistiche dataset generale
- `analyze_new_entries.py`: Statistiche esecuzione test Exercism

## Changelog

### 2025-10-31 - Initial Version

- Analisi completa entry Exercism C/C++
- Support base code e LLM variants
- Export CSV
- Categorizzazione errori
- Breakdown per linguaggio
- Top clusters by failure rate
