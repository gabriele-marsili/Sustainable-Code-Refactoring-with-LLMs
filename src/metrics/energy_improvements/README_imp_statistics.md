# Improvement Statistics Calculator

## Descrizione

Il modulo `imp_statistic_calculator.py` fornisce un sistema completo e robusto per l'analisi statistica dei miglioramenti energetici ottenuti attraverso il refactoring con LLM.

## Funzionalità Principali

### 1. Statistiche Descrittive Complete
- **Metriche calcolate**: Media, Mediana, Deviazione Standard, Min, Max, Quartili, IQR
- **Ambiti di analisi**:
  - CPU usage improvement (%)
  - RAM usage improvement (%)
  - Execution time improvement (%)
  - Regression test pass rate (%)

### 2. Analisi per Categoria
- **Per Linguaggio di Programmazione**: Performance dei diversi linguaggi
- **Per LLM**: Confronto tra OpenAI, Claude e Gemini
- **Per Versione di Prompt**: Efficacia delle diverse versioni (v1-v4)

### 3. Test Statistici
- **ANOVA**: Verifica significatività differenze tra LLM e prompt versions
- **Correlazioni**: Analisi delle relazioni tra metriche (CPU-RAM, CPU-Time, RAM-Time)
- **P-values**: Determinazione della significatività statistica

### 4. Export e Reporting
- Export JSON strutturato
- Report console formattati
- Identificazione dei top improvements

## Installazione Dipendenze

```bash
pip install numpy scipy
```

## Utilizzo Base

### Quick Start

```python
from imp_statistic_calculator import ImprovementStatisticsCalculator

# Inizializza il calculator (usa directory di default)
calculator = ImprovementStatisticsCalculator()

# Carica i dati
calculator.load_data()

# Stampa summary completo
calculator.print_summary()
```

### Analisi Veloce

```python
from imp_statistic_calculator import quick_analysis

# Esegue analisi completa in una sola chiamata
stats = quick_analysis()

# Accedi alle statistiche
print(f"Media CPU improvement: {stats.CPU_usage.mean:.2f}%")
print(f"Mediana RAM improvement: {stats.RAM_usage.median:.2f}%")
```

### Export dei Risultati

```python
calculator = ImprovementStatisticsCalculator()
calculator.load_data()

# Esporta tutte le statistiche in JSON
calculator.export_statistics_to_json("output_statistics.json")
```

### Test Statistici

```python
calculator = ImprovementStatisticsCalculator()
calculator.load_data()

# Esegue test ANOVA e correlazioni
tests = calculator.perform_statistical_tests()

# Verifica significatività
if tests['llm_anova']['significant']:
    print("Differenze significative tra LLM!")
    print(f"p-value: {tests['llm_anova']['p_value']}")
```

### Identificazione Top Improvements

```python
calculator = ImprovementStatisticsCalculator()
calculator.load_data()

# Top 10 miglioramenti CPU
top_cpu = calculator.get_top_improvements('CPU_usage', n=10)

for i, improvement in enumerate(top_cpu, 1):
    print(f"{i}. {improvement['entry_id']}")
    print(f"   LLM: {improvement['llm']}, Prompt: {improvement['prompt']}")
    print(f"   CPU Improvement: {improvement['CPU_usage']:.2f}%")

# Top 10 miglioramenti RAM
top_ram = calculator.get_top_improvements('RAM_usage', n=10)

# Top 10 miglioramenti tempo di esecuzione
top_time = calculator.get_top_improvements('execution_time_ms', n=10)
```

## Utilizzo Avanzato

### Analisi Custom per Linguaggio

```python
calculator = ImprovementStatisticsCalculator()
calculator.load_data()
stats = calculator.calculate_comprehensive_statistics()

# Analizza per linguaggio specifico
for lang, lang_stats in stats.by_language.items():
    if lang == 'python':
        print(f"Python - Best LLM: {lang_stats.best_llm}")
        print(f"Python - Avg CPU: {lang_stats.avg_CPU_improvement:.2f}%")
```

### Analisi Custom per LLM

```python
stats = calculator.calculate_comprehensive_statistics()

# Confronta performance LLM
for llm, llm_stats in stats.by_llm.items():
    print(f"\n{llm}:")
    print(f"  Entries processate: {llm_stats.count}")
    print(f"  Success rate: {llm_stats.success_rate:.2f}%")
    print(f"  CPU: {llm_stats.avg_CPU_improvement:.2f}%")
    print(f"  RAM: {llm_stats.avg_RAM_improvement:.2f}%")
    print(f"  Time: {llm_stats.avg_time_improvement:.2f}%")
```

### Directory Custom

```python
# Specifica directory custom
calculator = ImprovementStatisticsCalculator(
    data_dir="/path/to/custom/improvements_data"
)
calculator.load_data()
```

## Struttura Output JSON

L'export JSON ha la seguente struttura:

```json
{
  "overall_statistics": {
    "CPU_usage": {
      "count": 1000,
      "mean": -15.5,
      "median": -12.3,
      "std": 8.2,
      "min": -45.2,
      "max": 5.1,
      "q1": -20.1,
      "q3": -8.5,
      "iqr": 11.6
    },
    "RAM_usage": { ... },
    "execution_time_ms": { ... },
    "regressionTestPassed": { ... }
  },
  "summary": {
    "total_entries": 5000,
    "valid_entries": 4200,
    "invalid_entries": 800
  },
  "by_language": {
    "python": {
      "language": "python",
      "count": 500,
      "avg_CPU_improvement": -12.5,
      "avg_RAM_improvement": -10.2,
      "avg_time_improvement": -18.7,
      "avg_test_pass_rate": 95.2,
      "best_llm": "claude",
      "best_prompt": "prompt_v3"
    },
    ...
  },
  "by_llm": {
    "openAI": {
      "llm_name": "openAI",
      "count": 1400,
      "avg_CPU_improvement": -14.2,
      "avg_RAM_improvement": -11.5,
      "avg_time_improvement": -16.8,
      "avg_test_pass_rate": 92.3,
      "best_prompt": "prompt_v2",
      "success_rate": 85.5
    },
    ...
  },
  "by_prompt": {
    "prompt_v1": { ... },
    ...
  },
  "statistical_tests": {
    "llm_anova": {
      "f_statistic": 12.45,
      "p_value": 0.0001,
      "significant": true
    },
    "prompt_anova": { ... },
    "correlations": {
      "CPU_RAM": 0.75,
      "CPU_Time": 0.68,
      "RAM_Time": 0.82
    }
  }
}
```

## Interpretazione dei Risultati

### Miglioramenti Negativi = Buoni
Per CPU, RAM e execution_time, **valori negativi indicano miglioramenti**:
- `-15%` CPU = 15% di riduzione nell'uso della CPU
- `-20%` RAM = 20% di riduzione nell'uso della memoria
- `-25%` Time = 25% di riduzione nel tempo di esecuzione

### Test Pass Rate
Per `regressionTestPassed`, **valori positivi sono buoni**:
- `100.0` = Tutti i test passano
- `95.0` = 95% dei test passano

### Significatività Statistica
- `p_value < 0.05`: Differenze statisticamente significative
- `p_value >= 0.05`: Differenze non significative (potrebbero essere casuali)

## Esempi Pratici

### Esempio 1: Report Completo

```python
from pathlib import Path
from imp_statistic_calculator import ImprovementStatisticsCalculator

def generate_full_report():
    calculator = ImprovementStatisticsCalculator()
    calculator.load_data()

    # Stampa summary console
    calculator.print_summary()

    # Export JSON
    output_path = Path("reports/improvements_analysis.json")
    output_path.parent.mkdir(exist_ok=True)
    calculator.export_statistics_to_json(str(output_path))

    # Test statistici
    tests = calculator.perform_statistical_tests()

    print("\n=== SIGNIFICATIVITÀ STATISTICA ===")
    if tests['llm_anova']['significant']:
        print("✓ Differenze significative tra LLM")
    else:
        print("✗ Nessuna differenza significativa tra LLM")

    print(f"\nCorrelazione CPU-RAM: {tests['correlations']['CPU_RAM']:.3f}")

    return calculator

if __name__ == "__main__":
    generate_full_report()
```

### Esempio 2: Analisi Comparativa

```python
def compare_llms():
    calculator = ImprovementStatisticsCalculator()
    calculator.load_data()
    stats = calculator.calculate_comprehensive_statistics()

    print("\n=== CONFRONTO LLM ===")
    llm_performance = []

    for llm_name, llm_stats in stats.by_llm.items():
        llm_performance.append({
            'name': llm_name,
            'cpu': llm_stats.avg_CPU_improvement,
            'ram': llm_stats.avg_RAM_improvement,
            'time': llm_stats.avg_time_improvement,
            'success': llm_stats.success_rate
        })

    # Ordina per CPU improvement
    llm_performance.sort(key=lambda x: x['cpu'])

    print("\nRanking per CPU Improvement:")
    for i, llm in enumerate(llm_performance, 1):
        print(f"{i}. {llm['name']}: {llm['cpu']:.2f}%")

compare_llms()
```

### Esempio 3: Migliori Configurazioni

```python
def find_best_configurations():
    calculator = ImprovementStatisticsCalculator()
    calculator.load_data()

    print("\n=== TOP 5 CONFIGURAZIONI ===\n")

    for metric in ['CPU_usage', 'RAM_usage', 'execution_time_ms']:
        print(f"\nTop 5 per {metric}:")
        top = calculator.get_top_improvements(metric, n=5)

        for i, imp in enumerate(top, 1):
            print(f"{i}. {imp['llm']} + {imp['prompt']}")
            print(f"   Language: {imp['language']}")
            print(f"   Improvement: {imp[metric]:.2f}%")

find_best_configurations()
```

## Best Practices

1. **Carica sempre i dati prima di calcolare**: Chiama `load_data()` prima di qualsiasi analisi
2. **Verifica la validità**: Controlla `valid_entries` vs `invalid_entries` nel summary
3. **Usa test statistici**: Non affidarti solo alle medie, verifica la significatività
4. **Export regolari**: Salva i risultati in JSON per analisi successive
5. **Considera il contesto**: Un miglioramento del -5% potrebbe essere significativo per un sistema critico

## Logging

Il modulo usa Python logging. Per configurare il livello di log:

```python
import logging

logging.basicConfig(level=logging.DEBUG)  # Più verbose
logging.basicConfig(level=logging.WARNING)  # Meno verbose
```

## Troubleshooting

### Errore: Directory non trovata
```python
# Assicurati che la directory esista
from pathlib import Path
data_dir = Path("clusters_improvements_data")
if not data_dir.exists():
    print(f"Directory non trovata: {data_dir}")
```

### Errore: Nessun dato valido
```python
# Controlla la struttura dei file JSON
calculator = ImprovementStatisticsCalculator()
calculator.load_data()
stats = calculator.calculate_comprehensive_statistics()
print(f"Dati validi: {stats.valid_entries}/{stats.total_entries}")
```

### Warning durante il parsing
I warning indicano entries con dati malformati. Sono normali se alcuni cluster hanno dati parziali.

## Contributi

Per estendere il modulo:

1. Aggiungi nuove dataclass in `DATACLASSES PER STATISTICHE`
2. Implementa metodi di calcolo in `ImprovementStatisticsCalculator`
3. Aggiorna `export_statistics_to_json()` per includere nuovi dati
4. Documenta le modifiche in questo README

## Licenza

Parte del progetto "Sustainable Code Refactoring with LLMs"
