# main.py

#!/usr/bin/env python3
"""
Script di configurazione per la creazione del dataset codice-test
"""

import argparse
import os
from pathlib import Path
import sys
import csv 

sys.path.append(str(Path(__file__).parent))
from datasetCreator import CodeTestDatasetCreator

def setup_github_token():
    """Configurarazione token GitHub"""
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
        default=['python', 'java', 'javascript', 'typescript','rust','go'],
        help='Linguaggi da processare (default: python java javascript typescript rust go). Supportati: python, java, javascript, typescript, cpp, c, go, rust, csharp, ruby, php'
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
        default=[
            #'java-thomasZumsteg'
            #"java-exercism-shyvum"
            #"LauriESB"
            #"RinatMambetov"
            #"blogscot"
            #"mandarussell"
            #"uzilan"
            #"robiworks"
            #"ThomasZumsteg-js"
            #"oguzsh"
            #"ffflorian"
            #"programmiri"
            #"irvingbennett"
            "PhymasSC"
        ],
        choices=[
            #'java-thomasZumsteg'
            #"java-exercism-shyvum"
            #"LauriESB"
            #"RinatMambetov"
            #"blogscot"
            #"mandarussell"
            #"uzilan"
            #"robiworks"
            #"ThomasZumsteg-js"
            #"oguzsh"
            #"ffflorian"
            #"programmiri"
            #"irvingbennett"
            "PhymasSC"
        ],
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
            'python', 'java', 'javascript', 'typescript', 'cpp', 'c', 
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
    
    # Informazioni sulle fonti aggiornate
    source_info = { 
        'java-thomasZumsteg': 'Java exercism by an user'
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
        
        # Statistiche finali aggiornate per usare self.processed_ids e self.language_counts
        csv_file = Path(args.output_dir) / "dataset.csv"
        if csv_file.exists():
            print(f"\n=== Completato! ===")
            print(f"Coppie codice-test create (totale): {len(creator.processed_ids)}")
            print(f"File CSV: {csv_file}")
            
            # Statistiche per linguaggio e fonte basate sui dati interni del creator
            if creator.language_counts:
                print("\nDistribuzione per linguaggio:")
                for lang, count in sorted(creator.language_counts.items()):
                    print(f"  - {lang}: {count} coppie")
            
            # Per le statistiche per fonte, dovremmo re-leggere il CSV
            # o modificare `add_to_csv` per aggiornare anche un `sources_count` interno
            # Per semplicità, qui rileggiamo il CSV per la fonte
            sources_count = {}
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                next(reader, None) # Salta header
                for row in reader:
                    if len(row) >= 7: # Assicurati che la riga abbia abbastanza colonne
                        source_name = row[6] # La fonte è nella settima colonna
                        sources_count[source_name] = sources_count.get(source_name, 0) + 1
            
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