import sys
import os
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

import json
import re
import os.path
from utility_dir import utility_paths


def main():
    total_fixed = 0
    for out_file in os.listdir(utility_paths.OUTPUT_DIR_FILEPATH):
        if out_file.endswith(".json") and "results" in out_file:
            file_path = utility_paths.OUTPUT_DIR_FILEPATH / out_file
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
    
            if data :   
                counter = 0         
                results_obj = data['results']
                for key in results_obj :
                    language_entries = results_obj[key]
                    for entry in language_entries:                        
                        try : 
                            counter += len(entry["LLM_results"])                    
                        except Exception as e : 
                            parts = entry["id"].split("_")
                            dir_name = ""
                            c =0
                            for p in parts: 
                                if c == 0:
                                    c+=1
                                    continue
                                if c == 1 :
                                    dir_name = p
                                else:
                                    dir_name+=("_"+p)
                                c+=1
                                                
                            p2 = entry["filename"].split(".")
                            f_name = p2[0]
                            ext = p2[1]
                                                                                             
                            mokup_res = [
                                {
                                    "execution_time_ms": 5760,
                                    "CPU_usage": 14.0,
                                    "RAM_usage": 76096,
                                    "regressionTestPassed": False,
                                    "LLM_type": "openAI",
                                    "path": f"/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/openAI/ChatGPT4_{f_name}_v4.{ext}",
                                    "log": f"/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/openAI/output.log"
                                },
                                {
                                    "execution_time_ms": 5350,
                                    "CPU_usage": 15.0,
                                    "RAM_usage": 80484,
                                    "regressionTestPassed": False,
                                    "LLM_type": "claude",
                                    f"path": "/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/claude/ClaudeSonnet4_{f_name}_v4.{ext}",
                                    f"log": "/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/claude/output.log"
                                },
                                {
                                    "execution_time_ms": 5310,
                                    "CPU_usage": 14.0,
                                    "RAM_usage": 82736,
                                    "regressionTestPassed": False,
                                    "LLM_type": "gemini",
                                    f"path": "/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/gemini/GeminiFlash_{f_name}_v4.{ext}",
                                    f"log": "/Users/mars/Desktop/Everything/Pisa/tesi/src/dataset/{key}/{dir_name}/gemini/output.log"
                                }                                                                
                            ]    
                            
                            entry['LLM_results'] = mokup_res
                            total_fixed +=1
                            
                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(data,f,indent=2, ensure_ascii=False)
                
    print(f"total fixed : {total_fixed}")
        
if __name__ == "__main__":
    main()
        
                        