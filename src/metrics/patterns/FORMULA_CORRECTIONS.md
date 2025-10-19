# Correzioni Formula Calcolo Improvement/Reduction

**Data**: 2025-10-18
**Issue**: Chiarimento terminologia e interpretazione dei valori di improvement

---

## Problema Identificato

La **formula matematica era corretta**, ma la **terminologia nei grafici era ambigua**.

### Formula Utilizzata (CORRETTA ✅)

```python
improvement = (base_metric - llm_metric) / base_metric * 100
```

### Interpretazione Corretta

Per metriche CPU/RAM/Time (dove **valori più bassi = migliore**):

| Condizione | Risultato Formula | Significato | Interpretazione |
|-----------|------------------|-------------|-----------------|
| `llm < base` | **Positivo** (es. +15%) | LLM usa **meno risorse** | ✅ **RIDUZIONE** (miglioramento) |
| `llm > base` | **Negativo** (es. -10%) | LLM usa **più risorse** | ❌ **AUMENTO** (degradazione) |
| `llm = base` | **Zero** (0%) | Nessuna differenza | Neutro |

### Esempio Concreto

```python
# Caso 1: Miglioramento
base_cpu = 100  # ms
llm_cpu = 85    # ms
improvement = (100 - 85) / 100 * 100 = +15%  # ✅ RIDUZIONE del 15%

# Caso 2: Degradazione
base_cpu = 100  # ms
llm_cpu = 115   # ms
improvement = (100 - 115) / 100 * 100 = -15%  # ❌ AUMENTO del 15%
```

---

## Modifiche Implementate

### 1. ✅ Terminologia Aggiornata nei Grafici

**Prima (Ambigua)**:
- "Improvement" senza chiarire il segno
- "Positive = Improvement, Negative = Degradation"

**Dopo (Chiara)**:
- "Resource Reduction" invece di "Improvement"
- "Positive = Reduction (Better), Negative = Increase (Worse)"
- Annotazioni esplicite sui grafici

### 2. ✅ Aggiornamenti Specifici per Grafico

#### `pattern_metric_specific_correlations.png`

**Label X-axis**:
- ❌ Prima: "Average Improvement (%)"
- ✅ Dopo: "Average Resource Reduction (%)"

**Titolo**:
- ❌ Prima: "Pattern Impact on Specific Performance Metrics (Positive = Improvement, Negative = Degradation)"
- ✅ Dopo: "Pattern Impact on Specific Performance Metrics (Positive = Reduction/Improvement, Negative = Increase/Degradation)"

**Annotazioni aggiunte**:
```python
ax.text(..., 'Better →', color='green')  # Per valori positivi
ax.text(..., '← Worse', color='red')    # Per valori negativi
```

#### `expected_improvements_by_pattern.png`

**Label assi**:
- ❌ Prima: "Expected Improvement (%)", "CPU Usage Improvement (%)", etc.
- ✅ Dopo: "Expected Resource Reduction (%)", "CPU Usage Reduction (%)", etc.

**Titoli subplot**:
- ❌ Prima: "Expected CPU Improvement"
- ✅ Dopo: "Expected CPU Reduction"

**Schema colori migliorato**:
```python
# Prima (colori non chiari)
colors_cpu = ['#FF6B6B' if m > 5 else '#FFA07A' if m > 0 else '#FFD1D1']

# Dopo (verde = good, rosso = bad)
colors_cpu = [
    '#2ECC71' if m > 5 else      # Verde scuro = strong reduction
    '#A9DFBF' if m > 0 else      # Verde chiaro = slight reduction
    '#E74C3C' if m < -5 else     # Rosso scuro = notable increase
    '#F1948A'                     # Rosso chiaro = slight increase
]
```

**Annotazione esplicativa aggiunta**:
```python
ax1.text(0.98, 0.98,
        'Positive = Reduction (Better)\nNegative = Increase (Worse)',
        transform=ax1.transAxes, ...)
```

#### `pattern_improvement_lookup_table.png`

**Titolo**:
- ❌ Prima: "Pattern-Improvement Lookup Table - What improvement can I expect from each pattern?"
- ✅ Dopo: "Pattern-Resource Reduction Lookup Table - What resource reduction can I expect from each pattern? (Positive = Reduction, Negative = Increase)"

**Interpretazioni**:
- ❌ Prima: "Strong improvement", "Moderate improvement", etc.
- ✅ Dopo: "Strong reduction", "Moderate reduction", "Slight increase", "Notable increase"

**Codifica colori**:
- ✅ Verde chiaro: Strong reduction (>5%)
- ✅ Giallo chiaro: Slight reduction (0-5%)
- ✅ Rosso chiaro: Increase (<0%)

#### `correlation_heatmap.png`

**Titolo**:
- ❌ Prima: "Pattern-Performance Correlations"
- ✅ Dopo: "Pattern-Resource Reduction Correlations"

**Legenda**:
- ❌ Prima: "Positive (improvement)", "Negative (degradation)"
- ✅ Dopo: "Positive (correlated with reduction)", "Negative (correlated with increase)"

### 3. ✅ Commenti nel Codice

Aggiunto in `unified_pattern_analyzer.py`:

```python
# Calculate improvements for this run
# Formula: (base - llm) / base * 100
# Positive = Reduction (LLM uses less resources) = GOOD
# Negative = Increase (LLM uses more resources) = BAD
```

---

## Verifiche Effettuate

### ✅ Formula Matematica

La formula è **CORRETTA** sia in:
- `unified_pattern_analyzer.py` (linea 1092-1104)
- `pattern_visualizator.py` (metodi di calcolo)

### ✅ Aggregazione 5 Esecuzioni

Il calcolo viene fatto correttamente:

1. **Per ogni entry**: si caricano 5 esecuzioni base + 5 esecuzioni LLM
2. **Per ogni run**: si calcola `(base - llm) / base * 100`
3. **Media**: si calcola `np.mean()` sulle 5 misurazioni
4. **12 combinazioni**: 4 prompt versions × 3 modelli vengono mantenute separate

Esempio codice:
```python
for run_num in range(1, 6):  # 5 esecuzioni
    base_exec_file = f"{cluster}_results_{run_num}.json"
    llm_exec_file = f"{cluster}_results_{prompt_v}_{run_num}.json"

    # Calcola improvement per questo run
    cpu_impr = (base_metrics['cpu'] - llm_metrics['cpu']) / base_metrics['cpu'] * 100
    all_cpu_improvements.append(cpu_impr)

# Media sulle 5 esecuzioni
cpu_mean = np.mean(all_cpu_improvements)
```

### ✅ Separazione Prompt/Modelli

Ogni combinazione `(entry_id, llm_type, prompt_version)` viene trattata separatamente:
- `prompt_version`: v1, v2, v3, v4
- `llm_type`: ChatGPT4, Claude, Gemini

Totale: **4 × 3 = 12 versioni LLM per ogni entry base**

---

## Grafici Rigenerati

Tutti i grafici sono stati rigenerati con la terminologia corretta:

1. ✅ `cluster_selection_analysis.png` (invariato)
2. ✅ `pattern_frequencies.png` (invariato)
3. ✅ `pattern_categories.png` (invariato)
4. ✅ `generic_patterns_cross_language_heatmap.png` (invariato)
5. ✅ `pattern_distribution_all_languages.png` (invariato)
6. ✅ `energy_impact_distribution.png` (invariato)
7. ✅ `correlation_heatmap.png` ← **AGGIORNATO**
8. ✅ `pattern_metric_specific_correlations.png` ← **AGGIORNATO**
9. ✅ `expected_improvements_by_pattern.png` ← **AGGIORNATO**
10. ✅ `pattern_improvement_lookup_table.png` ← **AGGIORNATO**

---

## Riepilogo Cambiamenti

### File Modificati

1. **`src/metrics/patterns/pattern_visualizator.py`**
   - Metodo `plot_pattern_metric_correlations()`: label e annotazioni
   - Metodo `plot_expected_improvements_by_pattern()`: label, colori, annotazioni
   - Metodo `_create_improvement_table()`: titolo, interpretazioni
   - Metodo `plot_correlation_heatmap()`: titolo e legenda

2. **`src/metrics/patterns/unified_pattern_analyzer.py`**
   - Aggiunti commenti esplicativi alla formula (linea 1090-1092)

---

## Interpretazione Visuale nei Grafici

### Schema Colori Standardizzato

| Valore | Colore | Significato |
|--------|--------|-------------|
| > +10% | 🟢 Verde scuro | Strong reduction |
| +5% to +10% | 🟢 Verde chiaro | Moderate reduction |
| 0% to +5% | 🟡 Giallo | Slight reduction |
| 0% to -5% | 🟠 Arancione chiaro | Slight increase |
| < -5% | 🔴 Rosso | Notable increase |

### Direzione degli Assi

```
← Worse  [-50%] ... [0%] ... [+50%] Better →
         Increase      |      Reduction
         (Bad)         |      (Good)
```

---

## Conclusioni

✅ **Formula matematica**: CORRETTA (era già giusta)
✅ **Terminologia**: AGGIORNATA (da "improvement" a "reduction")
✅ **Grafici**: RIGENERATI con label chiare
✅ **Colori**: MIGLIORATI (verde=good, rosso=bad)
✅ **Annotazioni**: AGGIUNTE per chiarezza

La documentazione ora riflette correttamente che:
- **Valori positivi** = **Riduzione risorse** = **Miglioramento** ✅
- **Valori negativi** = **Aumento risorse** = **Degradazione** ❌

Non c'è più ambiguità nell'interpretazione dei risultati.
