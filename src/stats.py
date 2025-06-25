import json
from collections import Counter, defaultdict
from pathlib import Path
import matplotlib.pyplot as plt

def print_dataset_statistics():
    root_dir = Path("dataset")
    dataset_path = root_dir / "dataset.json"
    
    if not dataset_path.exists():
        print(f"[ERRORE] File non trovato: {dataset_path}")
        return

    with open(dataset_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    total_entries = 0
    language_counter = Counter()
    source_counter = Counter()
    clusters_same_language = defaultdict(lambda: defaultdict(list))  # {language: {filename: [entries]}}
    clusters_cross_language = defaultdict(list)  # {filename_no_ext: [entries]}

    for language, entries in data.items():
        for entry in entries:
            total_entries += 1
            language_counter[language] += 1
            source_counter[entry.get("source", "Unknown")] += 1

            filename = entry.get("filename")
            if filename:
                filename_no_ext = Path(filename).stem
                clusters_same_language[language][filename].append(entry)
                clusters_cross_language[filename_no_ext].append(entry)

    print("\n\n== Statistiche del Dataset ==")
    print(f"Totale entry: {total_entries}\n")

    print("Entry per linguaggio:")
    for lang, count in language_counter.items():
        print(f"  {lang}: {count}")

    print("\nEntry per source:")
    for source, count in source_counter.items():
        print(f"  {source}: {count}")

    print("\nCluster per linguaggio (filename condiviso):")
    for lang, filenames in clusters_same_language.items():
        for fname, entries in filenames.items():
            if len(entries) > 1:
                print(f"  {lang} - {fname}: {len(entries)} occorrenze")

    print("\nCluster cross-linguaggio (esercizi in più linguaggi):")
    for fname_stem, entries in clusters_cross_language.items():
        involved_langs = set(e["language"] for e in entries)
        if len(involved_langs) > 1:
            print(f"  - {fname_stem}: {len(entries)} entry da linguaggi: {', '.join(sorted(involved_langs))}")

    # Funzione per plottare i grafici
    def plot_bar_chart(counter, title, xlabel):
        if not counter:
            print(f"[INFO] Nessun dato per: {title}")
            return
        labels, values = zip(*sorted(counter.items(), key=lambda x: -x[1]))
        plt.figure(figsize=(10, 6))
        plt.bar(labels, values, color="skyblue")
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel("Numero di entry")
        plt.xticks(rotation=45, ha="right")
        plt.tight_layout()
        plt.show()

    # Visualizzazione grafica
    plot_bar_chart(language_counter, "Entry per Linguaggio", "Linguaggio")
    plot_bar_chart(source_counter, "Entry per Fonte", "Fonte")

    cross_lang_distribution = Counter()
    for fname_stem, entries in clusters_cross_language.items():
        involved_langs = set(e["language"] for e in entries)
        if len(involved_langs) > 1:
            cross_lang_distribution[len(involved_langs)] += 1

    plot_bar_chart(cross_lang_distribution, "Esercizi con Presenza Cross-Linguaggio", "Numero di Linguaggi Coinvolti")


