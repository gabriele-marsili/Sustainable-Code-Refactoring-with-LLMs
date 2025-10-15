# Validation Reports - Documentation

**Generato il:** 2025-10-15
**Script di validazione:** `validate_execution_outputs.py`

---

## 📁 File Disponibili

### 1. **EXECUTIVE_SUMMARY.md** ⭐ START HERE
**Dimensione:** ~8KB
**Audience:** Project managers, ricercatori, stakeholders
**Contenuto:**
- Overview generale della validazione
- Metriche chiave di qualità
- Analisi per linguaggio di programmazione
- Raccomandazioni prioritizzate
- Impatto sulla ricerca

**Usa questo file per:** Ottenere una visione d'insieme rapida e decisioni strategiche.

---

### 2. **PROBLEMATIC_CLUSTERS.md**
**Dimensione:** ~10KB
**Audience:** Sviluppatori, data engineers
**Contenuto:**
- Lista dei 53 cluster con problemi
- Top 20 cluster più problematici
- Distribuzione degli errori per linguaggio
- Dettaglio completo di ogni cluster problematico

**Usa questo file per:** Identificare quali cluster richiedono re-esecuzione o debugging.

---

### 3. **validation_report.txt**
**Dimensione:** ~5.5MB
**Audience:** Developer tecnici, debugging
**Contenuto:**
- Report testuale completo
- Dettaglio di OGNI entry invalida
- Organizzato per cluster
- Include file paths, errori specifici, metriche

**Usa questo file per:** Debugging dettagliato di entry specifiche.

⚠️ **Attenzione:** File molto grande, utilizzare editor di testo capaci di gestire file di grandi dimensioni.

---

### 4. **validation_report_detailed.json**
**Dimensione:** ~2.5MB
**Audience:** Data scientists, automated analysis
**Contenuto:**
- Struttura JSON con tutti i dati
- Machine-readable
- Include metadati completi
- Perfetto per analisi programmatiche

**Usa questo file per:** Analisi ulteriori, scripting, integrazione con altri tool.

---

## 📊 Quick Stats

```
╔══════════════════════════════════════════════════════════╗
║              VALIDATION RESULTS SUMMARY                  ║
╠══════════════════════════════════════════════════════════╣
║  Files Analyzed        : 9,653                          ║
║  Total Entries         : 123,454                        ║
║  Valid Entries         : 119,621 (96.90%) ✅           ║
║  Invalid Entries       : 3,833   (3.10%)  ⚠️           ║
║  Clusters with Issues  : 53 / 385 (13.8%)              ║
╚══════════════════════════════════════════════════════════╝
```

---

## 🎯 Linguaggi - Vista Rapida

### 🟢 Eccellenti (> 99.5% validità)
- **Python**: 99.97% valid - 4 invalid su 13,143
- **Go**: 99.96% valid - 10 invalid su 24,500
- **TypeScript**: 99.95% valid - 19 invalid su 34,639
- **JavaScript**: 99.75% valid - 49 invalid su 19,568

### 🟡 Accettabili (95-99%)
- **Java** (uppercase): 99.59% valid - 31 invalid su 7,623
- **Java** (lowercase): 96.06% valid - 121 invalid su 3,072

### 🔴 Critici (< 90%)
- **C**: 85.50% valid - 1,775 invalid su 12,244 ⚠️
- **C++**: 78.95% valid - 1,824 invalid su 8,665 🚨

---

## 📈 Distribuzione Entry per Linguaggio

```
TypeScript  ██████████████████████████████ 34,639 (28.1%)
Go          ████████████████████ 24,500 (19.9%)
JavaScript  ████████████████ 19,568 (15.9%)
Python      ██████████ 13,143 (10.6%)
C           █████████ 12,244 (9.9%)
C++         ███████ 8,665 (7.0%)
Java        ██████ 7,623 (6.2%)
java        ██ 3,072 (2.5%)
```

---

## 🔍 Categorie di Errori Principali

### 1. **Valori NULL nelle metriche** (3,019 occorrenze)
**Sintomo:** `CPU_usage is None` o `RAM_usage is None`
**Cause probabili:**
- Fallimento esecuzione Docker
- Timeout
- Errori di parsing

**Linguaggi più colpiti:** C++ (1,596), C (702)

---

### 2. **Tempo di esecuzione = 0** (2,833 occorrenze)
**Sintomo:** `execution_time_ms is 0` o `execution_time_ms = 0`
**Cause probabili:**
- Misurazione non accurata
- Esecuzioni troppo rapide
- Bug negli strumenti di profiling

**Linguaggi più colpiti:** C (1,541), C++ (1,292)

---

### 3. **Test di regressione falliti** (2,675 occorrenze)
**Sintomo:** `regressionTestPassed = False`
**Nota:** Questo può essere LEGITTIMO se il codice generato dall'LLM è effettivamente scorretto.

**Linguaggi più colpiti:** C (1,775), C++ (707)

---

## 🚨 Top 5 Cluster Problematici

| Rank | Cluster | Invalid | Primary Issue |
|------|---------|---------|---------------|
| 1 | `raindrops` | 600 | Zero execution time (C/C++) |
| 2 | `leap` | 540 | Zero execution time (C/C++) |
| 3 | `pangram` | 421 | Zero execution time (C/C++) |
| 4 | `anagram` | 210 | NULL values (C++) |
| 5 | `all_your_base` | 139 | Failed tests + Zero time (C++) |

**Pattern identificato:** I cluster con operazioni matematiche semplici su C/C++ mostrano problemi sistematici.

---

## 💡 Raccomandazioni Quick

### Urgente (Fare ORA)
1. ✅ Investigare sistema di esecuzione C/C++
2. ✅ Standardizzare nomenclatura linguaggi (java vs Java)

### Importante (Questa Settimana)
3. 🔍 Analizzare i 5 cluster più problematici (raindrops, leap, pangram, anagram, all_your_base)
4. 📊 Decidere strategia per dati invalidi nell'analisi statistica

### Monitoring
5. 👀 Verificare se pattern temporali (alcuni run più problematici di altri)
6. 🔧 Documentare setup C/C++ per riproducibilità

---

## 🛠️ Come Usare Questi Report

### Per Analisi Statistica
```python
import json

# Load detailed data
with open('validation_report_detailed.json', 'r') as f:
    data = json.load(f)

# Filter only valid entries
valid_entries = [e for e in data['invalid_entries'] if ...]

# Your analysis here
```

### Per Re-esecuzione Selettiva
```bash
# Identifica cluster da ri-eseguire
cat PROBLEMATIC_CLUSTERS.md | grep "raindrops\|leap\|pangram"

# Re-run specifici cluster
cd ../run_tests_on_clusters
python run_tests_on_cluster.py --cluster-name raindrops --num-executions 5
```

### Per Filtrare Dati nell'Analisi
Opzioni:
1. **Esclusione completa:** Rimuovere tutte le entry invalide
2. **Soglia di qualità:** Escludere cluster con > 10% invalidità
3. **Analisi pesata:** Dare meno peso a linguaggi problematici
4. **Analisi separata:** Report separati per C/C++ vs altri linguaggi

---

## 🔄 Re-run Strategy

Se decidi di ri-eseguire i test per migliorare la qualità:

### Priority 1: Top 5 Cluster
- raindrops
- leap
- pangram
- anagram
- all_your_base

**Impatto atteso:** Risolverà ~2,010 invalid entries (52% del totale)

### Priority 2: C/C++ System Fix
Se risolvi il problema di fondo con C/C++:
**Impatto atteso:** Risolverà ~3,599 invalid entries (94% del totale)

### Priority 3: Remaining 48 Clusters
**Impatto atteso:** Risolverà ~1,823 invalid entries (48% del totale)

---

## 📞 Support

Per domande o assistenza con i report di validazione:
1. Consulta `validate_execution_outputs.py` per la logica di validazione
2. Leggi `EXECUTIVE_SUMMARY.md` per il contesto generale
3. Verifica `PROBLEMATIC_CLUSTERS.md` per cluster specifici

---

## 📝 Note Tecniche

### Criteri di Validazione
Un'entry è considerata **valida** se:
1. ✅ Tutti i campi metriche sono presenti (non NULL)
2. ✅ `execution_time_ms` != 0
3. ✅ `regressionTestPassed` ha un valore (True/False, non NULL)

**Nota:** `regressionTestPassed = False` è valido (ma segnalato nelle statistiche).

### Struttura File JSON Analizzati
```json
{
  "results": {
    "language": [
      {
        "id": "entry_id",
        "language": "python",
        "LLM_results": [
          {
            "LLM_type": "openAI|claude|gemini",
            "execution_time_ms": 30,
            "CPU_usage": 44.0,
            "RAM_usage": 13952,
            "regressionTestPassed": true
          }
        ]
      }
    ]
  }
}
```

---

**Timestamp di generazione:** 2025-10-15
**Tempo di analisi:** ~10 minuti
**Versione script:** v1.0
