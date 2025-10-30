# Entry Remover Tool - User Guide

**Tool**: `entry_remover.py`
**Purpose**: Rimuove entries problematiche dai file cluster JSON
**Safety**: Crea backup automatici prima di ogni modifica

---

## 🎯 Features

- ✅ Rimuove **SOLO** entries con `test_type: "base"`
- ✅ Crea backup automatici in `clusters/backups/TIMESTAMP/`
- ✅ Rimozione opzionale dei file di execution output correlati
- ✅ Modalità DRY RUN per test senza modifiche
- ✅ Report dettagliato con statistiche per linguaggio e cluster
- ✅ Conferma interattiva prima delle modifiche
- ✅ Progress bar per monitoraggio real-time

---

## 📋 Prerequisiti

1. File di removal list generato da `demo_improved_analysis.py`:
   ```
   removal_analysis/entries_to_remove_YYYYMMDD_HHMMSS.json
   ```

2. Directory clusters con file JSON:
   ```
   src/clusters/cluster_*.json
   ```

---

## 🚀 Usage

### Modalità DRY RUN (Test senza modifiche)

**Raccomandato per primo utilizzo!**

```bash
cd src

# Test solo rimozione da clusters
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --dry-run \
  --no-confirm

# Test con rimozione anche dei file execution output
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --dry-run \
  --no-confirm \
  --remove-execution-outputs
```

**Output:**
```
[DRY RUN] Would remove 2 entries from cluster_allergies.json
[DRY RUN] Would remove 6 entries from cluster_hello_world.json
...

Overall Statistics:
  Clusters processed: 53
  Clusters modified: 53
  Entries removed: 165
  Entries kept: 521
```

### Modalità PRODUCTION (Modifiche reali)

**⚠️ ATTENZIONE: Crea modifiche permanenti (con backup)**

```bash
# Solo rimozione da clusters (con conferma interattiva)
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json

# Rimozione da clusters + execution outputs (automatico)
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --no-confirm \
  --remove-execution-outputs
```

**Processo:**
1. Carica removal list
2. Filtra per entries con `test_type: "base"`
3. Chiede conferma (se non --no-confirm)
4. Crea backup di ogni cluster modificato
5. Rimuove entries dai cluster JSON
6. (Opzionale) Rimuove entries dai file execution output (base + LLM)
7. Genera report dettagliato

---

## 📊 Report Generato

### Console Output

```
╭─────────────────── Removal Report ────────────────────╮
│ Generated: 2025-10-30 10:19:35                        │
│ Mode: PRODUCTION                                       │
│                                                       │
│ Overall Statistics:                                   │
│   Clusters processed: 53                              │
│   Clusters modified: 53                               │
│   Entries removed: 165                                │
│   Entries kept: 521                                   │
│                                                       │
│ Removals by Language:                                 │
│   C               :    85 entries removed             │
│   CPP             :    38 entries removed             │
│   JAVASCRIPT      :    21 entries removed             │
│   TYPESCRIPT      :    12 entries removed             │
│   JAVA            :     5 entries removed             │
│   GO              :     3 entries removed             │
│   PYTHON          :     1 entries removed             │
│                                                       │
│ Top 20 Clusters by Removals:                          │
│   space_age       :  13 entries                       │
│   rna_transcription:  10 entries                      │
│   ...                                                 │
╰───────────────────────────────────────────────────────╯
```

### Files Generati

#### 1. `removal_reports/removal_report_YYYYMMDD_HHMMSS.txt`
Report testuale completo

#### 2. `removal_reports/removal_report_YYYYMMDD_HHMMSS.json`
Statistiche in formato JSON:

```json
{
  "generated_at": "2025-10-30T10:19:35",
  "dry_run": false,
  "stats": {
    "clusters_processed": 53,
    "clusters_modified": 53,
    "entries_removed": 165,
    "entries_kept": 521,
    "by_language": {
      "c": 85,
      "cpp": 38,
      "javascript": 21,
      ...
    },
    "by_cluster": {
      "space_age": 13,
      "rna_transcription": 10,
      ...
    }
  }
}
```

---

## 💾 Backup System

### Location
```
src/clusters/backups/YYYYMMDD_HHMMSS/
```

Ogni esecuzione crea una directory con timestamp contenente i backup di tutti i cluster modificati.

### Esempio Struttura
```
clusters/
├── backups/
│   ├── 20251030_101935/
│   │   ├── cluster_allergies.json
│   │   ├── cluster_hello_world.json
│   │   └── ...
│   └── 20251030_102145/
│       └── ...
├── cluster_allergies.json          # File modificato
├── cluster_hello_world.json        # File modificato
└── ...
```

### Restore da Backup

Se necessario, ripristinare manualmente:

```bash
# Ripristina singolo cluster
cp clusters/backups/20251030_101935/cluster_hello_world.json clusters/

# Ripristina tutti i clusters
cp clusters/backups/20251030_101935/*.json clusters/
```

---

## 🔧 Command-Line Options

```bash
python3 unified_analyzer/tools/entry_remover.py [OPTIONS]
```

### Required Arguments

| Option | Description |
|--------|-------------|
| `--removal-list PATH` | Path al file JSON con entries da rimuovere |

### Optional Arguments

| Option | Description | Default |
|--------|-------------|---------|
| `--clusters-dir PATH` | Directory clusters | `src/clusters` |
| `--execution-outputs-dir PATH` | Directory execution outputs | `src/execution_outputs` |
| `--backup-dir PATH` | Directory backup | `clusters/backups` |
| `--output-report PATH` | Path report output | `removal_reports/report_TIMESTAMP.txt` |
| `--dry-run` | Test senza modifiche | `False` |
| `--no-confirm` | Salta conferma | `False` |
| `--remove-execution-outputs` | Rimuovi anche file execution output | `False` |

---

## 📝 Examples

### Example 1: Test Completo (Dry Run)

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --dry-run \
  --no-confirm
```

### Example 2: Rimozione Reale con Conferma

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json
```

Output:
```
⚠️  About to remove 165 base entries
Backups will be created automatically.

Proceed? [y/N]: y
```

### Example 3: Rimozione Automatica

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --no-confirm \
  --output-report my_reports/removal_$(date +%Y%m%d).txt
```

### Example 4: Rimozione con Execution Outputs

```bash
# Prima testa in dry run
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --dry-run \
  --remove-execution-outputs

# Poi esegui in produzione
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --no-confirm \
  --remove-execution-outputs
```

Questo rimuoverà:
- Le entries dai cluster JSON
- I risultati base dalle execution outputs (es. `cluster_results_1.json`)
- I risultati LLM correlati (es. `cluster_results_v1_1.json`, `cluster_results_v2_1.json`, ecc.)

### Example 5: Custom Directories

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_20251030_100852.json \
  --clusters-dir /path/to/clusters \
  --execution-outputs-dir /path/to/execution_outputs \
  --backup-dir /path/to/safe/backups
```

---

## ⚠️ Important Notes

### 1. SOLO Base Entries

Lo script rimuove **ESCLUSIVAMENTE** entries con:
```json
{
  "test_type": "base"
}
```

Entries con `"test_type": "llm"` vengono **IGNORATE**.

### 2. Backup Automatici

**Ogni cluster modificato** viene automaticamente salvato in backup prima delle modifiche.

### 3. Dry Run Prima di Tutto

**SEMPRE eseguire con --dry-run prima** per verificare:
- Numero di entries che verranno rimosse
- Clusters impattati
- Distribuzione per linguaggio

### 4. Rimozione Execution Outputs

Quando usi `--remove-execution-outputs`, il tool:
- Rimuove **TUTTE** le entries dall'ID specificato, sia base che LLM
- Cerca nei file con struttura `{"results": {"language": [entries]}}`
- Modifica i file JSON mantenendo le altre entries
- Rimuove completamente i file se rimangono vuoti
- **NON** crea backup dei file execution output (sono facilmente rigenerabili)

### 5. Verifica Post-Rimozione

Dopo la rimozione, verificare:

```bash
# Conta entries per cluster
python3 -c "
import json
from pathlib import Path

total_entries = 0
for f in Path('clusters').glob('cluster_*.json'):
    data = json.load(open(f))
    for lang, entries in data.items():
        if isinstance(entries, list):
            total_entries += len(entries)
print(f'Total entries remaining: {total_entries}')
"

# Conta entries negli execution outputs (se rimosse)
python3 -c "
import json
from pathlib import Path

total_entries = 0
for f in Path('execution_outputs').glob('*_results_*.json'):
    data = json.load(open(f))
    if 'results' in data:
        for lang, entries in data['results'].items():
            if isinstance(entries, list):
                total_entries += len(entries)
print(f'Total execution output entries: {total_entries}')
"
```

---

## 🔍 Troubleshooting

### Errore: "Removal list not found"

**Soluzione**: Verifica il path del file removal list:
```bash
ls -la removal_analysis/entries_to_remove_*.json
```

### Errore: "Cluster file not found"

**Soluzione**: Verifica che la directory clusters sia corretta:
```bash
ls -la clusters/cluster_*.json | head -5
```

### Nessuna Entry Rimossa

**Causa**: Removal list contiene solo entries "llm", non "base"

**Soluzione**: Verifica il contenuto:
```bash
python3 -c "
import json
data = json.load(open('removal_analysis/entries_to_remove_20251030_100852.json'))
base_count = sum(1 for e in data['entries'] if e['test_type'] == 'base')
llm_count = sum(1 for e in data['entries'] if e['test_type'] == 'llm')
print(f'Base entries: {base_count}')
print(f'LLM entries: {llm_count}')
"
```

---

## 📈 Workflow Completo

### Step 1: Genera Removal List

```bash
python3 demo_improved_analysis.py
```

Output: `removal_analysis/entries_to_remove_YYYYMMDD_HHMMSS.json`

### Step 2: Test in Dry Run

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_YYYYMMDD_HHMMSS.json \
  --dry-run \
  --no-confirm
```

Verifica output e statistiche.

### Step 3: Esegui Rimozione

```bash
python3 unified_analyzer/tools/entry_remover.py \
  --removal-list removal_analysis/entries_to_remove_YYYYMMDD_HHMMSS.json
```

Conferma quando richiesto.

### Step 4: Verifica Risultati

```bash
# Controlla report
cat removal_reports/removal_report_YYYYMMDD_HHMMSS.txt

# Controlla backup
ls -la clusters/backups/YYYYMMDD_HHMMSS/

# Conta entries rimanenti
python3 -c "
import json
from pathlib import Path

clusters = list(Path('clusters').glob('cluster_*.json'))
total = sum(
    len(entries)
    for f in clusters
    for lang, entries in json.load(open(f)).items()
    if isinstance(entries, list)
)
print(f'Total entries: {total}')
"
```

### Step 5: Commit Modifiche (Opzionale)

```bash
git status
git add clusters/
git commit -m "Remove problematic base entries (165 entries removed)"
```

---

## 🎯 Success Criteria

Dopo l'esecuzione, dovresti avere:

- ✅ 165 base entries rimosse dai cluster JSON
- ✅ 521 entries mantenute
- ✅ 53 cluster files modificati
- ✅ Backup completi in `clusters/backups/`
- ✅ Report dettagliato in `removal_reports/`
- ✅ 0 entries LLM rimosse (filtrate)

---

## 📞 Support

In caso di problemi:

1. Verifica con `--dry-run` prima di modifiche reali
2. Controlla i log e il report generato
3. I backup sono sempre disponibili in `clusters/backups/`
4. Ogni modifica è reversibile ripristinando dai backup

**Remember**: I backup vengono creati automaticamente, quindi le modifiche sono sempre reversibili! 🛡️
