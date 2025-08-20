import sys
import os
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json


from utility_dir import utility_paths

#delete LLM_results from base code snippet output files
def main():
    for file_path in os.listdir(utility_paths.OUTPUT_DIR_FILEPATH):
        if "v1" not in file_path and "v2" not in file_path and "v3" not in file_path and "v4" not in file_path : 
            #=> file related to base snippet (should not contains LLM_results)
            try : 
                with open(file_path, "r",encoding="utf-8") as f:
                    data = json.load(f)
                
                for _lang, entries in data["results"]:
                    for entry in entries:
                        if "LLM_results" in entry:
                            del entry["LLM_results"]

                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

                print(F"fixed file {file_path}")


            except Exception as e :
                print(f"\nError fixing file {file_path}\n{e}")

if __name__ == "__main__":
    main()