#!/usr/bin/env python3
"""
Script per rimuovere le entries dal dataset.json che hanno ID corrispondenti
a quelli presenti nel file bad_entries.json
"""

import json
import os
from typing import Dict, List, Set


def load_json_file(file_path: str) -> Dict:
    """
    Carica un file JSON e ritorna il contenuto
    
    Args:
        file_path: Percorso del file JSON
        
    Returns:
        Dict: Contenuto del file JSON
        
    Raises:
        FileNotFoundError: Se il file non esiste
        json.JSONDecodeError: Se il file non è un JSON valido
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Errore: File {file_path} non trovato")
        raise
    except json.JSONDecodeError as e:
        print(f"Errore: {file_path} non è un JSON valido: {e}")
        raise


def save_json_file(data: Dict, file_path: str) -> None:
    """
    Salva i dati in un file JSON
    
    Args:
        data: Dati da salvare
        file_path: Percorso dove salvare il file
    """
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)


def get_bad_entry_ids(bad_entries_data: Dict) -> Set[str]:
    """
    Estrae gli ID delle entry da rimuovere
    
    Args:
        bad_entries_data: Dati dal file bad_entries.json
        
    Returns:
        Set[str]: Set degli ID da rimuovere
    """
    bad_ids = set()
    if "entries" in bad_entries_data:
        for entry in bad_entries_data["entries"]:
            if "id" in entry:
                bad_ids.add(entry["id"])
    return bad_ids


def remove_bad_entries(dataset: Dict, bad_ids: Set[str]) -> Dict:
    """
    Rimuove le entries con ID presenti nel set dei bad_ids
    
    Args:
        dataset: Dati del dataset
        bad_ids: Set degli ID da rimuovere
        
    Returns:
        Dict: Dataset pulito
    """
    cleaned_dataset = {}
    total_removed = 0
    
    # Itera attraverso ogni linguaggio nel dataset
    for language, entries in dataset.items():
        cleaned_entries = []
        
        for entry in entries:
            entry_id = entry.get("id", "")
            
            # Se l'ID non è nella lista dei bad_ids, mantieni l'entry
            if entry_id not in bad_ids:
                cleaned_entries.append(entry)
            else:
                print(f"Rimossa entry con ID: {entry_id}")
                total_removed += 1
        
        # Mantieni il linguaggio anche se non ha entries (opzionale)
        cleaned_dataset[language] = cleaned_entries
    
    print(f"\nTotale entries rimosse: {total_removed}")
    return cleaned_dataset


def main():
    """
    Funzione principale dello script
    """
    # Nomi dei file
    bad_entries_file = "../clusters/bad_entries.json"
    dataset_file = "../dataset/dataset.json" #"../clusters/debug_cluster_cpp.json"
    backup_file = "../dataset/dataset_backup.json"
    
    try:
        # Carica i file JSON
        print("Caricamento dei file...")
        bad_entries_data = load_json_file(bad_entries_file)
        dataset_data = load_json_file(dataset_file)
        
        # Crea un backup del dataset originale
        print("Creazione backup del dataset originale...")
        save_json_file(dataset_data, backup_file)
        print(f"Backup salvato in: {backup_file}")
        
        # Estrai gli ID delle bad entries
        bad_ids = get_bad_entry_ids(bad_entries_data)
        print(f"Trovati {len(bad_ids)} ID da rimuovere")
        
        if not bad_ids:
            print("Nessun ID da rimuovere trovato nel file bad_entries.json")
            return
        
        # Stampa gli ID che verranno rimossi
        print("ID da rimuovere:")
        for bad_id in sorted(bad_ids):
            print(f"  - {bad_id}")
        
        # Rimuovi le bad entries
        print("\nRimozione delle bad entries...")
        cleaned_dataset = remove_bad_entries(dataset_data, bad_ids)
        
        # Salva il dataset pulito
        save_json_file(cleaned_dataset, dataset_file)
        print(f"\nDataset pulito salvato in: {dataset_file}")
        
        # Statistiche finali
        print("\n=== STATISTICHE ===")
        for language, entries in cleaned_dataset.items():
            print(f"{language}: {len(entries)} entries rimanenti")
        
    except Exception as e:
        print(f"Errore durante l'esecuzione: {e}")
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())