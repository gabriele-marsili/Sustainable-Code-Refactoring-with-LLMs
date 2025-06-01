#!/usr/bin/env python3
"""
Script di configurazione per la creazione del dataset codice-test
"""

import argparse
import os
from pathlib import Path
import sys

# Aggiungi il modulo principale
sys.path.append(str(Path(__file__).parent))
from datasetCreator import CodeTestDatasetCreator

def setup_github_token():
    """Aiuta l'utente a configurare il token GitHub"""
    print("=== Configurazione Token GitHub ===")
    print("Per un rate limiting migliore, è consigliato usare un token GitHub.")
    print("1. Vai su https://github.com/settings/tokens")
    print("2. Crea un nuovo token con scope 'public_repo'")
    print("3. Copia il token generato")
    print()
    
    token = input("Inserisci il token GitHub (premi Enter per saltare): ").strip()
    
    if token:
        # Salva in file di configurazione
        config_file = Path(".github_token")
        with open(config_file, 'w') as f:
            f.write(token)
        print(f"Token salvato in {config_file}")
        return token
    
    return None

def load_github_token():
    """Carica il token GitHub se disponibile"""
    config_file = Path(".github_token")
    if config_file.exists():
        with open(config_file, 'r') as f:
            return f.read().strip()
    return None

def main():
    parser = argparse.ArgumentParser(description="Crea dataset di coppie codice-test")
    parser.add_argument(
        '--languages', '-l', 
        nargs='+', 
        default=['python', 'java', 'javascript'],
        help='Linguaggi da processare (default: python java javascript). Supportati: python, java, javascript, cpp, c, go, rust, csharp, ruby, php'
    )
    parser.add_argument(
        '--output-dir', '-o',
        default='dataset',
        help='Directory di output (default: dataset)'
    )
    parser.add_argument(
        '--setup-token', '-t',
        action='store_true',
        help='Configura il token GitHub'
    )
    parser.add_argument(
        '--sources', '-s',
        nargs='+',
        default=['exercism', 'pyleet', 'codewars'],
        choices=['exercism', 'pyleet', 'codewars'],
        help='Fonti da utilizzare (default: tutte)'
    )
    parser.add_argument(
        '--max-files', '-m',
        type=int,
        default=None,
        help='Numero massimo di file per linguaggio (default: nessun limite)'
    )
    parser.add_argument(
        '--list-languages',
        action='store_true',
        help='Mostra tutti i linguaggi supportati'
    )
    
    args = parser.parse_args()
    
    # Mostra linguaggi supportati se richiesto
    if args.list_languages:
        print("Linguaggi supportati:")
        supported_langs = [
            'python', 'java', 'javascript', 'cpp', 'c', 
            'go', 'rust', 'csharp', 'ruby', 'php'
        ]
        for lang in supported_langs:
            print(f"  - {lang}")
        return
    
    # Setup token se richiesto
    if args.setup_token:
        setup_github_token()
        return
    
    # Carica token esistente
    token = load_github_token()
    
    # Crea il dataset creator
    creator = CodeTestDatasetCreator(args.output_dir)
    creator.github_token = token
    if args.max_files:
        creator.max_files_per_language = args.max_files
    
    print("=== Creazione Dataset Codice-Test ===")
    print(f"Linguaggi: {', '.join(args.languages)}")
    print(f"Fonti: {', '.join(args.sources)}")
    print(f"Directory output: {args.output_dir}")
    print(f"Token GitHub: {'Configurato' if token else 'Non configurato (rate limiting limitato)'}")
    
    # Informazioni sulle fonti
    source_info = {
        'exercism': 'Esercizi multi-linguaggio con soluzioni umane',
        'pyleet': 'Soluzioni Python per problemi LeetCode',
        'codewars': 'Kata JavaScript con test',
        'pytest-cases': 'Esempi pytest con casi di test parametrizzati'
    }
    
    print("\nFonti selezionate:")
    for source in args.sources:
        print(f"  - {source}: {source_info.get(source, 'Descrizione non disponibile')}")
    
    print()
    
    # Conferma prima di iniziare
    confirm = input("Continuare? (y/N): ").strip().lower()
    if confirm not in ['y', 'yes', 'si', 's']:
        print("Operazione annullata.")
        return
    
    # Esegui l'estrazione
    try:
        creator.run_full_extraction(args.sources, args.languages)
        
        # Statistiche finali
        csv_file = Path(args.output_dir) / "dataset.csv"
        if csv_file.exists():
            with open(csv_file, 'r') as f:
                lines = f.readlines()
                line_count = len(lines) - 1  # -1 per header
            
            print(f"\n=== Completato! ===")
            print(f"Coppie codice-test create: {line_count}")
            print(f"File CSV: {csv_file}")
            
            # Statistiche per linguaggio
            languages_count = {}
            sources_count = {}
            
            for line in lines[1:]:  # Salta header
                parts = line.strip().split(',')
                if len(parts) >= 6:
                    lang = parts[5]
                    source = parts[6]
                    languages_count[lang] = languages_count.get(lang, 0) + 1
                    sources_count[source] = sources_count.get(source, 0) + 1
            
            if languages_count:
                print("\nDistribuzione per linguaggio:")
                for lang, count in sorted(languages_count.items()):
                    print(f"  - {lang}: {count} coppie")
            
            if sources_count:
                print("\nDistribuzione per fonte:")
                for source, count in sorted(sources_count.items()):
                    print(f"  - {source}: {count} coppie")
        
    except KeyboardInterrupt:
        print("\nOperazione interrotta dall'utente.")
    except Exception as e:
        print(f"\nErrore durante l'esecuzione: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()