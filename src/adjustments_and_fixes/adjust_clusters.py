import os
import sys
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from utility_dir import utility_paths
import json

def adjust_out_cluster():
    cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / "cluster_raindrops.json"
    out_path = utility_paths.OUTPUT_DIR_FILEPATH / "raindrops_results_1.json"
    
    with open(cluster_path,"r",encoding="utf-8") as f:
        cluster_data = json.load(f)
        
    cluster_ids = []
    for _, entries in cluster_data.items():
        cluster_ids += [entry['id'] for entry in entries]
      
    with open(out_path, "r",encoding="utf-8") as f :
        out_data = json.load(f)
    
    c = 0
    
    for lang in out_data['results']:
        entries = out_data['results'][lang]
        indexes_of_entry_to_remove = []
        for i,entry in enumerate(entries) : 
            if entry['id'] not in cluster_ids:
                print(f"removing entry {entry['id']} by result file")
                indexes_of_entry_to_remove.append(i)
                c += 1
                                
        for i in reversed(indexes_of_entry_to_remove):
            del out_data['results'][lang][i]
            
            
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(out_data, f, indent=2, ensure_ascii=False)
    
    print(f"removed {c} files")

        
            

def main():    
    for file_path in os.listdir(utility_paths.OUTPUT_DIR_FILEPATH):        
        file_path = utility_paths.OUTPUT_DIR_FILEPATH / file_path
        print(f"file path = {file_path}")
        if os.path.isfile(file_path):
            with open(file_path,"r",encoding="utf-8") as f:
                data = json.load(f)
                
        if "typescript" not in data["results"]:
            print("Nessuna sezione 'typescript' trovata nel file")
            continue
        
        # Scansiona tutte le entries per trovare quelle con file .js
        counter = 0
        for i, entry in enumerate(data["results"]["typescript"]):
          
            # Controlla gli LLM_results per file .js
            if "LLM_results" in entry:
                llms_to_remove = []
                for j, llm in enumerate(entry["LLM_results"]):
                    #if llm.get("filename", "").endswith(".js"):
                    if llm.get("path", "").endswith(".js"):
                        llms_to_remove.append(j)
                
                # Rimuovi gli LLM_results con file .js (in ordine inverso per non alterare gli indici)
                for j in reversed(llms_to_remove):
                    del entry["LLM_results"][j]
                    counter += 1 
        print(f"LLM_results entries removed for entry {entry['id']} : {counter}")        
                
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
      
                    

if __name__ == "__main__":
    #main()
    adjust_out_cluster()