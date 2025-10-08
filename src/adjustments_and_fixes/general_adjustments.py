from pathlib import Path
import json
from stats import StatsHandler
from fileMetadata import Metadata

def adjustMetadata(stats_handler:StatsHandler):
    root_dir = Path("dataset")
    jsonDataset_file = root_dir / "dataset.json"

    # Carica il file JSON
    with open(jsonDataset_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated = False  # Flag per capire se ci sono stati aggiornamenti

    c = 0
    removed_c = 0
    for language, entries in data.items():
        for i, entry in enumerate(entries):
            if not entry.get("licenseType") or not entry.get("wordQuantity"):
                code_path = root_dir / entry.get('codeSnippetFilePath')
                file_name = entry.get("filename")
                
                # Calcolo metadati
                try:
                    metadata_obj = Metadata(code_path, file_name)
                    metadata = {
                        'downloadDate': metadata_obj.download_date(),
                        'characterQuantity': metadata_obj.character_count(),
                        'wordQuantity': metadata_obj.word_count(),
                        'licenseType': "None"
                    }

                    # Aggiorna l'entry con i nuovi metadati
                    entry.update(metadata)
                    updated = True
                    c+=1
                
                except FileNotFoundError as file_not_found_err :
                    # Rimuovi l'entry dal dataset
                    del data[language][i]
                    removed_c+=1

                    # Se la lista per quel linguaggio è vuota, elimina anche la chiave
                    if not data[language]:
                        del data[language]

    # Salva di nuovo il JSON se ci sono stati aggiornamenti
    if updated:
        with open(jsonDataset_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Dataset aggiornato con nuovi metadati\n{c} entry aggiornate\n{removed_c} entry rimosse")
        stats_handler.print_dataset_statistics()
    else:
        print("Nessun metadato da aggiornare.")     
        
def adjusPaths():
    root_dir = Path("dataset")
    jsonDataset_file = root_dir / "dataset.json"

    # Carica il file JSON
    with open(jsonDataset_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated = False  # Flag per capire se ci sono stati aggiornamenti

    c = 0
    
    for language, entries in data.items():
        for i, entry in enumerate(entries):  
            language = entry.get("language")
            source = entry.get("source")
            codeSnippetFilePath = str(entry.get("codeSnippetFilePath"))
            testUnitFilePath = str(entry.get("testUnitFilePath"))
            
            if language and language not in ["Java","javascript","typescript"]:
                u = False
                #if source not in codeSnippetFilePath : 
                if "dataset/" in codeSnippetFilePath or "dataset/" in testUnitFilePath:
                    codeSnippetFilePath_updated = ""
                    testFilePath_updated = ""
                    parts = codeSnippetFilePath.split("/")
                    print(f"parts:\n{parts}")                    
                    test_parts = testUnitFilePath.split("/")
                    print(f"test_parts:\n{test_parts}")
                    for i in range(len(parts)):
                        if i == 0 or parts[i] == "dataset": pass
                        elif i == len(parts)-1 : codeSnippetFilePath_updated += parts[i]
                        else : codeSnippetFilePath_updated += (parts[i]+"/")

                    for i in range(len(test_parts)):
                        if i == 0 or test_parts[i] == "dataset" : pass
                        elif i == len(test_parts)-1 : testFilePath_updated += test_parts[i]
                        else : testFilePath_updated += (test_parts[i]+"/")

                    print(f"codeSnippetFilePath_updated:\n{codeSnippetFilePath_updated}")
                    
                    print(f"testFilePath_updated:\n{testFilePath_updated}")
                    
                    
                    updated_data = {
                        "codeSnippetFilePath" : codeSnippetFilePath_updated,
                        "testUnitFilePath" : testFilePath_updated
                    }
                    # Aggiorna l'entry con i nuovi metadati
                    entry.update(updated_data)
                    u = True
                    
                if u :
                    updated = u
                    c+=1
                
            
    # Salva di nuovo il JSON se ci sono stati aggiornamenti
    if updated:
        with open(jsonDataset_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print(f"Dataset aggiornato (paths aggiornati)\n{c} entry aggiornate")
        
    else:
        print("Nessun'entry da aggiornare.")     

def adjust_licenses():
        root_dir = Path("dataset")        
        dataset_path: str = str(root_dir / "dataset.json")
        license_dict = {
            "mtrajk_coding_problems": "MIT",
            "exercism-java-shyvum": "None",
            "exercism-java-ThomasZumsteg": "None",
            "LauriESB": "None",
            "exercism-java-RinatMambetov": "None",
            "mandarussell": "GPL-3.0 license",            
            "exercism-javascript-ffflorian": "GPL-3.0 license",
            "exercism-javascript-PhymasSC": "MIT",
            "Exercism-typescript-chriswilding": "MIT"           
        }

        # Carica il dataset
        with open(dataset_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Itera su ogni linguaggio
        for language, entries in data.items():
            for entry in entries:
                source = entry.get("source", "")
                if source in license_dict:
                    entry["licenseType"] = license_dict[source]
                else:
                    # Se non c'è nel dizionario
                    if "licenseType" not in entry:
                        entry["licenseType"] = "None"
                    # Se esiste, lo lascia invariato

        # Salva il dataset aggiornato
        with open(dataset_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

        print("Licenses updated in dataset.json")

