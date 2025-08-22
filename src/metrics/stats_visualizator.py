

import os
import sys
import json
# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from utility_dir import utility_paths  # noqa: E402
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
#from scipy import stats



def load_report(filepath):
    with open(filepath, "r") as f:
        return json.load(f)

def show_summary(data, filename):
    print(f"\n📊 Report: {filename}")
    print("-" * 40)
    print(f"Mean CPU Reduction Improvement (%): {data.get('mean_CPU_improvement', 0):.2f}")
    print(f"Mean RAM Reduction Improvement (%): {data.get('mean_RAM_improvement', 0):.6f}")
    print(f"Mean Execution Time Reduction Improvement (%): {data.get('mean_execution_time_improvement', 0):.2f}")

    print("\nPer Model Summary:")
    for model in ["openAI", "gemini", "claude"]:
        if model in data:
            m = data[model]
            print(f"\n▶ {model}")
            print(f"  CPU Reduction Improvement (%): {m['CPU_improvement']:.2f}")
            print(f"  RAM Reduction Improvement (%): {m['RAM_improvement']:.6f}")
            print(f"  Execution Time Reduction Improvement (%): {m['execution_time_improvement']:.2f}")

def plot_metrics(data, filename):
    models = []
    cpu_vals, ram_vals, time_vals = [], [], []

    for model in ["openAI", "gemini", "claude"]:
        if model in data:
            models.append(model)
            cpu_vals.append(data[model]["CPU_improvement"])
            ram_vals.append(data[model]["RAM_improvement"])
            time_vals.append(data[model]["execution_time_improvement"])

    # CPU Reduction Improvement (%)
    plt.figure()
    plt.bar(models, cpu_vals)
    plt.title(f"CPU Reduction Improvement (%) - {filename}")
    plt.ylabel("CPU Reduction Improvement (%)")
    plt.show()

    # RAM Reduction Improvement (%)
    plt.figure()
    plt.bar(models, ram_vals)
    plt.title(f"RAM Reduction Improvement (%) - {filename}")
    plt.ylabel("RAM Reduction Improvement (%)")
    plt.show()

    # Execution Time Reduction Improvement (%)
    plt.figure()
    plt.bar(models, time_vals)
    plt.title(f"Execution Time Reduction Improvement (%) - {filename}")
    plt.ylabel("Execution Time Reduction Improvement (%)")
    plt.show()



def load_energy_report(path):
    with open(path, "r") as f:
        return json.load(f)

def load_metrics(path):
    with open(path, "r") as f:
        return json.load(f)

def build_dataframe(energy_data, metrics_data):
    rows = []

    # cicla su tutti i modelli (openAI, gemini, claude)
    for model, model_data in energy_data.items():
        if not isinstance(model_data, dict) or "entries" not in model_data:
            continue

        for entry in model_data["entries"]:
            entry_id = entry["id"]
            cpu = entry["CPU_improvement"]
            ram = entry["RAM_improvement"]
            time = entry["execution_time_improvement"]

            # cerca lo snippet corrispondente nelle metriche
            for lang, snippets in metrics_data.items():
                for snippet in snippets:
                    if snippet["id"] in entry_id:  # match semplice (puoi raffinarlo)
                        base = snippet["base_metrics"]["medium_importance"]

                        rows.append({
                            "id": entry_id,
                            "model": model,
                            "CPU_improvement": cpu,
                            "RAM_improvement": ram,
                            "execution_time_improvement": time,
                            "cyclomatic_complexity": base.get("cyclomatic_complexity"),
                            "maintainability_index": base.get("maintainability_index"),
                            "halstead_effort": base.get("halstead_effort"),
                            "halstead_volume": base.get("halstead_volume"),
                            "halstead_difficulty": base.get("halstead_difficulty"),
                            "loc": snippet["base_metrics"]["high_importance"].get("loc")
                        })
    return pd.DataFrame(rows)

def analyze_correlations(df):
    metrics = ["cyclomatic_complexity", "maintainability_index", "halstead_effort",
               "halstead_volume", "halstead_difficulty", "loc"]

    improvements = ["CPU_improvement", "RAM_improvement", "execution_time_improvement"]

    corr = df[metrics + improvements].corr(method="pearson")
    return corr.loc[metrics, improvements]

def plot_results(df, corr):
    # Heatmap delle correlazioni
    plt.figure(figsize=(max(8, len(corr.columns) * 0.7), 
                        max(6, len(corr.index) * 0.5)))
    sns.heatmap(corr, annot=True, cmap="coolwarm", center=0, fmt=".2f",
                annot_kws={"size": 8})
    plt.title("Correlation between Complexity Metrics and Energy Improvements", fontsize=12, pad=20)
    plt.xticks(rotation=45, ha="right")
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.show()

    # Pairplot: scatter matrix con regressione lineare
    selected_cols = [
        "cyclomatic_complexity",
        "maintainability_index",
        "halstead_volume",
        "halstead_difficulty",
        "loc",
        "CPU_improvement",
        "RAM_improvement",
        "execution_time_improvement"
    ]
    sns.pairplot(
        df[selected_cols + ["model"]],
        hue="model",
        diag_kind="kde",
        kind="reg",
        plot_kws={'line_kws': {"color": "red"}, 'scatter_kws': {"alpha": 0.6}}
    )
    plt.suptitle("Pairplot: Complexity Metrics vs Energy Improvements", y=1.02)
    plt.show()

    # Boxplot: distribuzione dei miglioramenti per modello
    for metric in ["CPU_improvement", "RAM_improvement", "execution_time_improvement"]:
        plt.figure(figsize=(7,5))
        sns.boxplot(data=df, x="model", y=metric)
        plt.title(f"Distribution of {metric.replace('_', ' ').title()} by Model", fontsize=12, pad=15)
        plt.xlabel("Model")
        plt.ylabel(metric.replace("_", " ").title())
        plt.tight_layout()
        plt.show()

    # Regression plots singoli: relazioni chiave
    sns.lmplot(data=df, x="cyclomatic_complexity", y="CPU_improvement", hue="model", height=5, aspect=1.2)
    plt.title("Cyclomatic Complexity vs CPU Improvement", fontsize=12, pad=15)
    plt.show()

    sns.lmplot(data=df, x="maintainability_index", y="execution_time_improvement", hue="model", height=5, aspect=1.2)
    plt.title("Maintainability Index vs Execution Time Improvement", fontsize=12, pad=15)
    plt.show()

if __name__ == "__main__":
    
    cluster_names = [
        'bob',
        'leap',
        'raindrops',
        'pangram',
    ]
    for cluster_name in cluster_names:
        
        energy_path = utility_paths.ENERGY_METRICS_REPORTS_DIR_FILEPATH / f"cluster_{cluster_name}_energy_improvement_report.json"        
        metrics_path = utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.with_metrics.json"
        
        #data = load_report(energy_path)
        #show_summary(data, energy_path.name)
        #plot_metrics(data, energy_path.stem)                

        energy_data = load_energy_report(energy_path)
        metrics_data = load_metrics(metrics_path)

        df = build_dataframe(energy_data, metrics_data)
        print("🔎 Dati combinati:\n", df.head())

        corr = analyze_correlations(df)
        print("\n📈 Correlazioni (Pearson):\n", corr)

        plot_results(df, corr)
