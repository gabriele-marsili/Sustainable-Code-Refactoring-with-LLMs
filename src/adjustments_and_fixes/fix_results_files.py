import sys
import os
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json


from utility_dir import utility_paths

#delete LLM_results from base code snippet output files
def main():
    c = 0
    for file_path in os.listdir(utility_paths.OUTPUT_DIR_FILEPATH):
        file_path = str(utility_paths.OUTPUT_DIR_FILEPATH / file_path)
        if "debug" not in file_path and "v1" not in file_path and "v2" not in file_path and "v3" not in file_path and "v4" not in file_path : 
            #=> file related to base snippet (should not contains LLM_results)
            try : 
                with open(file_path, "r",encoding="utf-8") as f:
                    data = json.load(f)
                
                for _lang, entries in data["results"].items():
                    for entry in entries:
                        entry.pop("LLM_results", None) 


                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

                print(F"fixed file {file_path}")
                c+=1

            except Exception as e :
                print(f"\nError fixing file {file_path}\n{e}")

    print(f"Total file debugged : {c}")
    if c == 20 : 
        res= "✅" 
    else : 
        res= "❌"

    print(f"All files debugged : {res}")

if __name__ == "__main__":
    main()