#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
import glob
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from typing import Dict, Any, List, Tuple
import sys
from scipy.stats import pearsonr
import argparse


# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir import utility_paths  # noqa: E402

# Configurazione dello stile dei grafici
plt.style.use('default')
sns.set_palette("colorblind")

# =============================================================================
# CONFIGURAZIONE
# =============================================================================

# Categorie di metriche basate sulla ricerca
HIGH_IMPORTANCE_METRICS = [
    "halstead_length",
    "halstead_vocabulary",
    "halstead_effort",
    "loc",
    "math_operations",
    "numeric_literals",
    "max_nested_blocks",
]

MEDIUM_IMPORTANCE_METRICS = [
    "halstead_volume",
    "halstead_difficulty",
    "halstead_time",
    "cyclomatic_complexity",
    "maintainability_index",
    "comparisons",
    "loops",
    "variables",
    "string_literals",
    "unique_words",
]

KEYWORD_METRICS = [
    "conditional_statements",
    "loop_constructs",
    "function_definitions",
    "exception_handling",
    "logical_operators",
    "return_statements",
]

# Metriche energetiche
ENERGY_METRICS = ["cpu_usage", "ram_usage", "execution_time_ms"]

# =============================================================================
# FUNZIONI UTILITY
# =============================================================================

def load_json_file(file_path: str) -> Dict[str, Any]:
    """Carica un file JSON."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Impossibile caricare il file {file_path}: {e}")
        return {}

def find_energy_report_files(cluster_name: str) -> Tuple[str, str]:
    """Trova i file deile metriche energetiche per un cluster."""
    base_pattern = f"cluster_{cluster_name}_base_energy_metrics_average_report.json"
    llm_pattern = f"cluster_{cluster_name}_llm_v4_energy_metrics_average_report.json"
    
    base_file = str(utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH / base_pattern)
    llm_file = str(utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH / llm_pattern)
    
    return base_file, llm_file

# =============================================================================
# ELABORAZIONE DATI
# =============================================================================

def extract_complexity_metrics(metrics_data: Dict[str, Any]) -> Dict[str, float]:
    """Estrae tutte le metriche di complessità da una entry."""
    complexity_metrics = {}
    
    # Estrai metriche da tutte le categorie
    for category in ["high_importance", "medium_importance", "keyword_metrics", 
                    "halstead_complete", "summary_stats"]:
        if category in metrics_data:
            for metric, value in metrics_data[category].items():
                if isinstance(value, (int, float)):
                    complexity_metrics[metric] = value
    
    return complexity_metrics

def process_cluster_data(cluster_data: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    """Elabora i dati del cluster per estrarre le metriche di complessità."""
    complexity_data = {}
    
    for lang, entries in cluster_data.items():
        for entry in entries:
            entry_id = entry.get("id")
            if not entry_id:
                continue
                
            # Metriche di base
            if "base_metrics" in entry:
                complexity_data[entry_id] = {
                    "language": lang,
                    "base_complexity": extract_complexity_metrics(entry["base_metrics"])
                }
            
            # Metriche LLM
            if "LLMs" in entry:
                for llm_entry in entry["LLMs"]:
                    llm_type = llm_entry.get("type")
                    if llm_type and "metrics" in llm_entry:
                        llm_key = f"{entry_id}_{llm_type}"
                        complexity_data[llm_key] = {
                            "language": lang,
                            "llm_type": llm_type,
                            "base_id": entry_id,  # Aggiungi riferimento all'ID base
                            "llm_complexity": extract_complexity_metrics(llm_entry["metrics"])
                        }
    
    return complexity_data

def process_energy_data(base_energy_data: Dict[str, Any], llm_energy_data: Dict[str, Any]) -> Dict[str, Dict[str, float]]:
    """Elabora i dati energetici per estrarre le medie."""
    energy_metrics = {}
    
    # Processa dati base
    if "entries" in base_energy_data:
        for entry_id, entry_data in base_energy_data["entries"].items():
            energy_metrics[entry_id] = {
                "base_cpu_usage_mean": entry_data.get("total_cpu_usage_mean", 0),
                "base_ram_usage_mean": entry_data.get("total_RAM_usage_mean", 0),
                "base_execution_time_ms_mean": entry_data.get("total_execution_time_ms_mean", 0)
            }
    
    # Processa dati LLM
    if "entries" in llm_energy_data:
        for entry_id, entry_data in llm_energy_data["entries"].items():
            # Per ogni tipo LLM nei risultati
            if "LLM_results" in entry_data:
                for llm_type, llm_results in entry_data["LLM_results"].items():
                    llm_key = f"{entry_id}_{llm_type}"
                    energy_metrics[llm_key] = {
                        "llm_cpu_usage_mean": llm_results.get("total_cpu_usage_mean", 0),
                        "llm_ram_usage_mean": llm_results.get("total_RAM_usage_mean", 0),
                        "llm_execution_time_ms_mean": llm_results.get("total_execution_time_ms_mean", 0),
                        "base_id": entry_id  # Aggiungi riferimento all'ID base
                    }
    
    return energy_metrics

def calculate_improvements(energy_data: Dict[str, Dict[str, float]]) -> Dict[str, Dict[str, float]]:
    """Calcola i miglioramenti percentuali per le metriche energetiche."""
    improvements = {}
    
    for entry_id, metrics in energy_data.items():
        # Per le entry LLM, calcola il miglioramento rispetto alla versione base
        if "base_id" in metrics and "llm_cpu_usage_mean" in metrics:
            base_id = metrics["base_id"]
            
            # Assicurati che esista la corrispondente entry base
            if base_id in energy_data and "base_cpu_usage_mean" in energy_data[base_id]:
                base_metrics = energy_data[base_id]
                
                base_cpu = base_metrics["base_cpu_usage_mean"]
                llm_cpu = metrics["llm_cpu_usage_mean"]
                cpu_improvement = ((base_cpu - llm_cpu) / base_cpu * 100) if base_cpu > 0 else 0
                
                base_ram = base_metrics["base_ram_usage_mean"]
                llm_ram = metrics["llm_ram_usage_mean"]
                ram_improvement = ((base_ram - llm_ram) / base_ram * 100) if base_ram > 0 else 0
                
                base_time = base_metrics["base_execution_time_ms_mean"]
                llm_time = metrics["llm_execution_time_ms_mean"]
                time_improvement = ((base_time - llm_time) / base_time * 100) if base_time > 0 else 0
                
                improvements[entry_id] = {
                    "cpu_improvement": cpu_improvement,
                    "ram_improvement": ram_improvement,
                    "time_improvement": time_improvement,
                    "overall_improvement": (cpu_improvement + ram_improvement + time_improvement) / 3
                }
    
    return improvements

def create_analysis_dataframe(complexity_data: Dict[str, Any], 
                             energy_data: Dict[str, Dict[str, float]],
                             improvements: Dict[str, Dict[str, float]]) -> pd.DataFrame:
    """Crea un DataFrame combinando metriche di complessità e miglioramenti energetici."""
    rows = []
    
    for entry_id, comp_metrics in complexity_data.items():
        # Processa solo le entry LLM (quelle con llm_type)
        if "llm_type" in comp_metrics and entry_id in energy_data and entry_id in improvements:
            row = {
                "entry_id": entry_id,
                "language": comp_metrics.get("language"),
                "llm_type": comp_metrics.get("llm_type"),
                "base_id": comp_metrics.get("base_id", "")
            }
            
            # Aggiungi metriche di complessità LLM
            if "llm_complexity" in comp_metrics:
                for metric, value in comp_metrics["llm_complexity"].items():
                    row[f"llm_{metric}"] = value
            
            # Aggiungi metriche di complessità base (se disponibili)
            base_id = comp_metrics.get("base_id")
            if base_id and base_id in complexity_data and "base_complexity" in complexity_data[base_id]:
                for metric, value in complexity_data[base_id]["base_complexity"].items():
                    row[f"base_{metric}"] = value
            
            # Aggiungi metriche energetiche
            for metric, value in energy_data[entry_id].items():
                if metric != "base_id":  # Escludi il campo base_id
                    row[metric] = value
            
            # Aggiungi miglioramenti
            for metric, value in improvements[entry_id].items():
                row[metric] = value
            
            rows.append(row)
    
    return pd.DataFrame(rows)

# =============================================================================
# ANALISI STATISTICHE
# =============================================================================

def calculate_correlations(df: pd.DataFrame, complexity_prefix: str = "llm_") -> pd.DataFrame:
    """Calcola le correlazioni tra metriche di complessità e miglioramenti energetici."""
    # Seleziona colonne di complessità e miglioramento
    complexity_cols = [col for col in df.columns if col.startswith(complexity_prefix) and 
                     col not in ["llm_type", "language", "entry_id", "base_id"]]
    improvement_cols = [col for col in df.columns if "improvement" in col]
    
    # Calcola correlazioni
    correlation_results = []
    
    for comp_col in complexity_cols:
        for imp_col in improvement_cols:
            # Rimuovi valori NaN
            valid_data = df[[comp_col, imp_col]].dropna()
            if len(valid_data) > 5:  # Almeno 5 punti dati
                corr, p_value = pearsonr(valid_data[comp_col], valid_data[imp_col])
                correlation_results.append({
                    "complexity_metric": comp_col.replace(complexity_prefix, ""),
                    "improvement_metric": imp_col,
                    "correlation": corr,
                    "p_value": p_value,
                    "n_samples": len(valid_data)
                })
    
    return pd.DataFrame(correlation_results)

def filter_significant_correlations(corr_df: pd.DataFrame, p_threshold: float = 0.05) -> pd.DataFrame:
    """Filtra le correlazioni significative."""
    return corr_df[corr_df["p_value"] < p_threshold].sort_values("correlation", key=abs, ascending=False)

# =============================================================================
# VISUALIZZAZIONI
# =============================================================================

def plot_energy_improvements(df: pd.DataFrame, cluster_name: str):
    """Crea un grafico a barre dei miglioramenti energetici medi."""
    improvement_cols = [col for col in df.columns if "improvement" in col and col != "overall_improvement"]
    
    if not improvement_cols:
        print("Nessuna metrica di miglioramento trovata")
        return
    
    # Calcola medie per tipo di miglioramento
    means = df[improvement_cols].mean()
    stds = df[improvement_cols].std()
    
    # Crea il grafico
    fig, ax = plt.subplots(figsize=(10, 6))
    
    x_pos = np.arange(len(improvement_cols))
    bars = ax.bar(x_pos, means, yerr=stds, capsize=5, alpha=0.7, color=['#2E8B57', '#4682B4', '#CD5C5C'])
    
    # Personalizza il grafico
    ax.set_xlabel('Metriche Energetiche')
    ax.set_ylabel('Miglioramento Percentuale (%)')
    ax.set_title(f'Miglioramenti Energetici Medi - {cluster_name}')
    ax.set_xticks(x_pos)
    ax.set_xticklabels([col.replace('_improvement', '').replace('_', ' ').title() for col in improvement_cols])
    ax.axhline(y=0, color='black', linestyle='-', alpha=0.3)
    
    # Aggiungi valori sulle barre
    for bar, mean in zip(bars, means):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + (3 if height >= 0 else -10),
                f'{mean:.1f}%', ha='center', va='bottom' if height >= 0 else 'top', fontweight='bold')
    
    plt.tight_layout()
    plt.show()

def plot_correlation_heatmap(corr_df: pd.DataFrame, cluster_name: str):
    """Crea una heatmap delle correlazioni significative."""
    if corr_df.empty:
        print("Nessuna correlazione significativa trovata")
        return
    
    # Prepara i dati per la heatmap
    pivot_data = corr_df.pivot_table(
        index="complexity_metric", 
        columns="improvement_metric", 
        values="correlation", 
        aggfunc='first'
    )
    
    # Crea la heatmap
    fig, ax = plt.subplots(figsize=(12, 10))
    
    # Usa una mappa di colori divergente
    cmap = sns.diverging_palette(220, 10, as_cmap=True)
    
    # Crea la heatmap
    sns.heatmap(pivot_data, annot=True, fmt=".2f", cmap=cmap, center=0,
                square=True, linewidths=0.5, cbar_kws={"shrink": .8}, ax=ax)
    
    # Personalizza il grafico
    ax.set_title(f'Correlazione tra Metriche di Complessità e Miglioramenti Energetici\n{cluster_name}', 
                fontsize=14, fontweight='bold', pad=20)
    
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.show()

def plot_top_correlations(corr_df: pd.DataFrame, cluster_name: str, top_n: int = 10):
    """Crea un grafico a barre delle correlazioni più forti."""
    if corr_df.empty:
        print("Nessuna correlazione significativa trovata")
        return
    
    # Seleziona le top_n correlazioni per valore assoluto
    top_corrs = corr_df.nlargest(top_n, "correlation", key=abs)
    
    # Crea il grafico
    fig, ax = plt.subforms(figsize=(12, 8))
    
    # Colori in base al segno della correlazione
    colors = ['#2E8B57' if x >= 0 else '#CD5C5C' for x in top_corrs["correlation"]]
    
    # Crea le barre
    y_pos = np.arange(len(top_corrs))
    bars = ax.barh(y_pos, top_corrs["correlation"], color=colors, alpha=0.7)
    
    # Personalizza il grafico
    ax.set_yticks(y_pos)
    ax.set_yticklabels([f"{row['complexity_metric']} vs {row['improvement_metric']}" 
                       for _, row in top_corrs.iterrows()])
    ax.set_xlabel('Coefficiente di Correlazione')
    ax.set_title(f'Top {top_n} Correlazioni tra Complessità e Miglioramenti Energetici\n{cluster_name}', 
                fontsize=14, fontweight='bold', pad=20)
    
    # Aggiungi una linea verticale a zero
    ax.axvline(x=0, color='black', linestyle='-', alpha=0.3)
    
    # Aggiungi i valori delle correlazioni
    for i, (_, row) in enumerate(top_corrs.iterrows()):
        ax.text(row['correlation'] + (0.01 if row['correlation'] >= 0 else -0.05), 
                i, f'r = {row["correlation"]:.2f}\np = {row["p_value"]:.3f}', 
                va='center', ha='left' if row['correlation'] >= 0 else 'right',
                fontweight='bold')
    
    plt.tight_layout()
    plt.show()

def plot_complexity_vs_improvement(df: pd.DataFrame, complexity_metric: str, 
                                  improvement_metric: str, cluster_name: str):
    """Crea un grafico di dispersione tra una metrica di complessità e un miglioramento."""
    comp_col = f"llm_{complexity_metric}"
    
    if comp_col not in df.columns or improvement_metric not in df.columns:
        print(f"Metriche non trovate: {comp_col} or {improvement_metric}")
        return
    
    # Rimuovi valori NaN
    plot_data = df[[comp_col, improvement_metric]].dropna()
    
    if len(plot_data) < 5:
        print("Dati insufficienti per il grafico")
        return
    
    # Calcola correlazione
    corr, p_value = pearsonr(plot_data[comp_col], plot_data[improvement_metric])
    
    # Crea il grafico
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Crea lo scatter plot
    sns.scatterplot(data=plot_data, x=comp_col, y=improvement_metric, ax=ax, alpha=0.7)
    
    # Aggiungi linea di tendenza
    z = np.polyfit(plot_data[comp_col], plot_data[improvement_metric], 1)
    p = np.poly1d(z)
    ax.plot(plot_data[comp_col], p(plot_data[comp_col]), "r--", alpha=0.8)
    
    # Personalizza il grafico
    ax.set_xlabel(complexity_metric.replace('_', ' ').title())
    ax.set_ylabel(improvement_metric.replace('_', ' ').title())
    ax.set_title(f'{complexity_metric.replace("_", " ").title()} vs {improvement_metric.replace("_", " ").title()}\n'
                f'{cluster_name} (r = {corr:.2f}, p = {p_value:.3f})')
    
    # Aggiungi una linea orizzontale a zero per il miglioramento
    ax.axhline(y=0, color='black', linestyle='-', alpha=0.3)
    
    plt.tight_layout()
    plt.show()

# =============================================================================
# PIPELINE PRINCIPALE
# =============================================================================

def main():
    """Pipeline principale di analisi."""
    parser = argparse.ArgumentParser(description="Analisi correlazione tra complessità codice e miglioramenti energetici")
    parser.add_argument("--cluster", "-c", required=True, help="Nome del cluster")
    
    args = parser.parse_args()
    
    # Estrai nome del cluster
    cluster_name = args.cluster
    if not cluster_name:
        print("Impossibile estrarre il nome del cluster dal file specificato")
        return
    
    print(f"[INFO] Analisi del cluster: {cluster_name}")
    
    # Trova i file di report energetici
    base_energy_file, llm_energy_file = find_energy_report_files(cluster_name)
    
    if not base_energy_file or not llm_energy_file:
        print("File di report energetici non trovati")
        return
    
    print(f"[INFO] File energetici trovati: {base_energy_file}, {llm_energy_file}")
    
    # Carica i dati
    print("[1/6] Caricamento dati...")
    cluster_file_path = str(utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.with_metrics.json")
    cluster_data = load_json_file(cluster_file_path)
    base_energy_data = load_json_file(base_energy_file)
    llm_energy_data = load_json_file(llm_energy_file)
    
    if not cluster_data or not base_energy_data or not llm_energy_data:
        print("Impossibile caricare tutti i file necessari")
        return
    
    # Elabora i dati
    print("[2/6] Elaborazione metriche di complessità...")
    complexity_data = process_cluster_data(cluster_data)
    
    print("[3/6] Elaborazione metriche energetiche...")
    energy_data = process_energy_data(base_energy_data, llm_energy_data)
    
    print("[4/6] Calcolo miglioramenti energetici...")
    improvements = calculate_improvements(energy_data)
    
    print("[5/6] Creazione dataframe di analisi...")
    df = create_analysis_dataframe(complexity_data, energy_data, improvements)
    
    if df.empty:
        print("Nessun dato disponibile per l'analisi")
        return
    
    print(f"[INFO] DataFrame creato con {len(df)} righe e {len(df.columns)} colonne")
    
    # Analisi delle correlazioni
    print("[6/6] Calcolo correlazioni...")
    correlations = calculate_correlations(df)
    significant_corrs = filter_significant_correlations(correlations)
    
    # Stampa risultati
    print("\n" + "="*80)
    print("RISULTATI ANALISI")
    print("="*80)
    print(f"Cluster: {cluster_name}")
    print(f"Numero di confronti: {len(df)}")
    print(f"Correlazioni totali calcolate: {len(correlations)}")
    print(f"Correlazioni significative (p < 0.05): {len(significant_corrs)}")
    
    if not significant_corrs.empty:
        print("\nTop 5 correlazioni significative:")
        for i, (_, row) in enumerate(significant_corrs.head(5).iterrows()):
            print(f"{i+1}. {row['complexity_metric']} vs {row['improvement_metric']}: "
                  f"r = {row['correlation']:.2f}, p = {row['p_value']:.3f}")
    
    # Visualizzazioni
    print("\nGenerazione visualizzazioni...")
    
    # 1. Miglioramenti energetici medi
    plot_energy_improvements(df, cluster_name)
    
    # 2. Heatmap delle correlazioni (solo se ci sono correlazioni significative)
    if not significant_corrs.empty:
        plot_correlation_heatmap(significant_corrs, cluster_name)
        plot_top_correlations(significant_corrs, cluster_name)
        
        # 3. Grafici di dispersione per le correlazioni più forti
        top_correlation = significant_corrs.iloc[0]
        plot_complexity_vs_improvement(
            df, 
            top_correlation["complexity_metric"], 
            top_correlation["improvement_metric"], 
            cluster_name
        )
    
    print("Analisi completata!")

if __name__ == "__main__":
    main()