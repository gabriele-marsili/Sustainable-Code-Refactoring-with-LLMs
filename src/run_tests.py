import os
import json
import subprocess
import shutil
from pathlib import Path
import re
import uuid
from tempFileGestor import TempTestFile

BASE_DIR = Path(__file__).resolve().parent #./src
DATASET_DIR = BASE_DIR / "dataset"
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"
CLUSTER_JSON = BASE_DIR / "focused_cluster_datas.json"

def parse_metrics(log_path):
    print(f"parsing metrics of logpath : {log_path}")
    metrics = {
        "execution_time_ms": None,
        "CPU_usage": None,
        "RAM_usage": None,
    }

    with open(log_path) as f:
        for line in f:
            if "Elapsed (wall clock)" in line:
                time_match = re.search(r"(\d+):(\d+\.\d+)", line)
                if time_match:
                    minutes = int(time_match.group(1))
                    seconds = float(time_match.group(2))
                    metrics["execution_time_ms"] = int((minutes * 60 + seconds) * 1000)
            elif "Maximum resident set size" in line:
                metrics["RAM_usage"] = int(line.split(":")[1].strip())  # in KB
            elif "Percent of CPU this job got" in line:
                metrics["CPU_usage"] = float(line.split(":")[1].replace("%", "").strip())
    return metrics

def run_container(lang, mount_path, container_name,exercise_name):
    dockerfile_path = DOCKER_DIR / lang.lower()
    run_sh_path = dockerfile_path / "run.sh"
    
    target_run_sh = mount_path / "run.sh"    
    shutil.copy(run_sh_path, target_run_sh)
    
    if lang == "typescript":
        # Copia tsconfig.json 
        tsconfig_src = DATASET_DIR / "typescript" / "tsconfig.json"
        tsconfig_target = mount_path / "tsconfig.json"    
        shutil.copy(tsconfig_src, tsconfig_target)
            
        # Copia package.json 
        pkg_src = DOCKER_DIR / "typescript" / "package.json"
        pkg_target = mount_path / "package.json"    
        shutil.copy(pkg_src, pkg_target)

    
        # Copia jest.config.json
        jest_src = DOCKER_DIR / "typescript" / "jest.config.js"
        jest_target = mount_path / "jest.config.js"    
        shutil.copy(jest_src, jest_target)

        # Rimuove eventuali node_modules preesistenti nella directory host
        nm = mount_path / "node_modules"
        if nm.exists() and not nm.is_symlink():
            print(f"🧹 Rimuovo node_modules locale da {nm}")
            shutil.rmtree(nm)


    subprocess.run(["docker", "build", "-t", container_name, str(dockerfile_path)], check=True)

    result = subprocess.run([
        "docker", "run", "--rm",
        "-v", f"{mount_path}:/app",
        container_name
    ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

    print(result.stdout)  # per vedere i log del container
    if result.returncode != 0:
        print(f"Errore nel container | result:\n{result}")


    # Debug: mostra se il file esiste davvero
    print(f"🔎 Controllo output.log in {mount_path}")
    #print("📂 Contenuto post-run:", list(mount_path.iterdir()))



    log_file = mount_path / "output.log"
    
    final_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}.log"
    shutil.copy(log_file, final_log)
    
    # Salva anche il file di risorse se presente
    resource_log = mount_path / "resource_usage.log"
    if resource_log.exists():
        final_resource_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}_resource.log"
        shutil.copy(resource_log, final_resource_log)



    return log_file

def parse_metrics_typescript(log_path):
    print(f"parsing ts metrics of logpath : {log_path}")
    metrics = {
        "execution_time_ms": None,
        "CPU_usage": None,
        "RAM_usage": None,
        "success": None,
        "passed_tests": None,
        "failed_tests": None,
    }

    try:
        with open(log_path) as f:
            data = json.load(f)

        if "startTime" in data and "testResults" in data and data["testResults"]:
            first = data["testResults"][0]
            metrics["execution_time_ms"] = data.get("testResults")[0].get("endTime", 0) - data.get("startTime", 0)

        metrics["passed_tests"] = data.get("numPassedTests")
        metrics["failed_tests"] = data.get("numFailedTests")
        metrics["success"] = data.get("success")

        # Parse resource usage (if available)
        resource_path = log_path.parent / "resource_usage.log"
        if resource_path.exists():
            with open(resource_path) as f:
                for line in f:
                    if "Maximum resident set size" in line:
                        metrics["RAM_usage"] = int(line.split(":")[1].strip())  # in KB
                    elif "Percent of CPU this job got" in line:
                        metrics["CPU_usage"] = float(line.split(":")[1].replace("%", "").strip())
        else:
            print("⚠️ Nessun resource_usage.log trovato")


    except Exception as e:
        print(f"❌ Errore parsing log JSON: {e}")

    return metrics

def run_tests_on_entry(entry, lang, base_only=False, llm_only = False):
    path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
    container_name = f"test_{lang.lower()}"
    results = {}

    print(f"\n▶ Testing base code: {entry['id']} | path : {path}")
    if not llm_only:
        base_log = run_container(lang, path.resolve(), container_name, entry["id"])
        base_metrics = None
        if lang != "typescript" : base_metrics =  parse_metrics(base_log)
        else : base_metrics = parse_metrics_typescript(base_log)
        results.update(base_metrics)

        # Salva path log per tracciabilità
        results["base_log"] = str(base_log)
    else:
        results = entry

    # Se presenti, testiamo i file LLM
    llm_results = []
    if "LLM_codeSnippetFilePaths" in entry and not base_only:
        for llm_path in entry["LLM_codeSnippetFilePaths"]:
            llm_file = Path(llm_path).name
            llm_name = llm_file.split("_")[0]
            print(f"  ↪ Testing LLM ({llm_name}): {llm_file}")
            llm_type_dir = (DATASET_DIR / llm_path).parent
            code_path_dir = llm_type_dir.parent  
            if lang == "c" or lang == "cpp" or lang == "go":
                code_path_dir = code_path_dir / "src"
            print(f"  ↪ code_path_dir : {code_path_dir}")
                      
            original_filename = Path(entry["codeSnippetFilePath"]).name
            if lang == "c" or lang == "cpp" or lang == "go":
                original_filename = llm_file.split("_")[1]
            
            print(f"  ↪ original_filename : {original_filename}")
            

            # backup e sostituzione codice
            target_file = code_path_dir / original_filename
            
            print(f"  ↪ target_file : {target_file}")
            
            backup = None
            renamed_llm_path = None

            # Se Java: rinomina llm_file in original_filename
            if lang == "java":
                source_path = llm_type_dir / llm_file
                renamed_llm_path = llm_type_dir / original_filename
                source_path.rename(renamed_llm_path)
                print(f"🔁 Rinomino {llm_file} → {original_filename}")
                
            if target_file.exists():
                backup = target_file.with_suffix(".bak")
                shutil.copy(target_file, backup)

            # Sovrascrive il codice del file snippet originario (salvato in backup) con il codice generato dal LLM
            if lang == "java":
                shutil.copy(llm_type_dir / original_filename, target_file)
            else:
                shutil.copy(llm_type_dir / llm_file, target_file)

            """
            # Genera il file di test temporaneo
            base_test_path = DATASET_DIR / entry["testUnitFilePath"]
            func_name = get_tested_function_name(base_test_path)
            temp_test_file = TempTestFile(lang, base_test_path, target_file, func_name)
            temp_test_path = temp_test_file.temp_path

            # Backup e sostituzione test
            target_test_file = base_test_path.parent / base_test_path.name
            test_backup = target_test_file.with_suffix(".bak")
            shutil.copy(target_test_file, test_backup)
            shutil.copy(temp_test_path, target_test_file)
            """
            
            if lang == "c" or lang == "cpp" or lang == "go":
                code_path_dir = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
            
            # run test
            llm_log = run_container(lang, code_path_dir.resolve(), container_name, entry["id"])

            """
            # ripristina
            shutil.move(test_backup, target_test_file)
            temp_test_path.unlink()
            """
            
            if lang != "typescript" : llm_metrics =  parse_metrics(llm_log)
            else : llm_metrics = parse_metrics_typescript(llm_log)
            

            # ripristina codeSnippet originario
            if backup:
                shutil.move(backup, target_file)
            
            # Ripristina nome file LLM se era stato rinominato (solo Java)
            if lang == "java" and renamed_llm_path and not (llm_type_dir / llm_file).exists():
                renamed_llm_path.rename(llm_type_dir / llm_file)
                print(f"🔁 Ripristino nome {original_filename} → {llm_file}")

            # confronta
            llm_metrics["LLM_type"] = llm_name
            llm_metrics["execution_time_difference_ms"] = llm_metrics["execution_time_ms"] - results["execution_time_ms"]
            llm_metrics["CPU_usage_difference"] = llm_metrics["CPU_usage"] - results["CPU_usage"]
            llm_metrics["ram_usage_difference"] = llm_metrics["RAM_usage"] - results["RAM_usage"]
            llm_metrics["execution_time_improved"] = llm_metrics["execution_time_difference_ms"] < 0
            llm_metrics["CPU_improved"] = llm_metrics["CPU_usage_difference"] < 0
            llm_metrics["ram_improved"] = llm_metrics["ram_usage_difference"] < 0
            llm_metrics["regrationTestPassed"] = True  # TODO: analizzare log

            llm_metrics["log"] = str(llm_log)
            llm_results.append(llm_metrics)

    results["LLM_results"] = llm_results
    return results

def get_tested_function_name(file_path):
    """
    Estrae il nome della funzione testata da un file di test.
    
    Args:
        file_path (str): Path del file di test
        
    Returns:
        str: Nome della funzione testata, o None se non trovata
    """
    
    if not os.path.exists(file_path):
        return None
    
    # Determina il linguaggio dall'estensione
    extension = Path(file_path).suffix.lower()
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return None
    
    # Pattern per diversi linguaggi
    patterns = {
        '.py': [
            r'from\s+\w+\s+import\s+(\w+)',
            r'import\s+\w+\.(\w+)',
            r'def\s+test_(\w+)',
            r'(\w+)\s*\(',  # chiamate di funzione generiche
        ],
        '.java': [
            r'import\s+static\s+\w+\.(\w+)',
            r'import\s+\w+\.(\w+)',
            r'(\w+)\s*\(',
        ],
        '.js': [
            r'const\s+\{\s*(\w+)\s*\}\s*=\s*require',
            r'import\s+\{\s*(\w+)\s*\}',
            r'import\s+(\w+)\s+from',
            r'(\w+)\s*\(',
        ],
        '.ts': [
            r'import\s+\{\s*(\w+)\s*\}',
            r'import\s+(\w+)\s+from',
            r'(\w+)\s*\(',
        ],
        '.c': [
            r'#include\s*[<"](\w+)\.h[>"]',
            r'extern\s+\w+\s+(\w+)',
            r'(\w+)\s*\(',
        ],
        '.cpp': [
            r'#include\s*[<"](\w+)\.h[>"]',
            r'extern\s+\w+\s+(\w+)',
            r'(\w+)\s*\(',
        ],
        '.go': [
            r'import\s+".*?/(\w+)"',
            r'func\s+Test\w*(\w+)',
            r'(\w+)\s*\(',
        ]
    }
    
    # Trova i pattern corrispondenti
    language_patterns = patterns.get(extension, [])
    
    found_functions = []
    
    for pattern in language_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE)
        if matches:
            found_functions.extend(matches)
    
    # Filtra funzioni comuni di test e utility
    excluded = {'test', 'main', 'setUp', 'tearDown', 'before', 'after', 'describe', 'it', 'expect', 'assert'}
    
    # Rimuovi duplicati e funzioni escluse
    unique_functions = []
    for func in found_functions:
        if func.lower() not in excluded and func not in unique_functions:
            unique_functions.append(func)
    
    # Strategia di selezione: prendi la prima funzione trovata negli import/dichiarazioni
    # o la più comune se ci sono più candidati
    if unique_functions:
        return unique_functions[0]
    
    return None

def main(base_only=False, llm_only = False):
    LOGS_DIR.mkdir(exist_ok=True) #check and in case create logs dir 
    
    cluster_data = None
    with open(CLUSTER_JSON, "r", encoding="utf-8") as f: #open and get cluster data by focused cluster data file
        cluster_data = json.load(f)

    for lang, entries in cluster_data.items(): #for each language in cluster data file 
        for entry in entries: # for each entry of each language 
            print(f"\n=== Testing {entry['id']} ({lang}) ===")
            test_results = run_tests_on_entry(entry, lang, base_only=base_only, llm_only=llm_only)
            # Merge into entry
            entry.update({
                "CPU_usage": test_results.get("CPU_usage"),
                "RAM_usage": test_results.get("RAM_usage"),
                "execution_time_ms": test_results.get("execution_time_ms"),
                "LLM_results": test_results.get("LLM_results"),
            })

    # save updated JSON
    with open(CLUSTER_JSON, "w", encoding="utf-8") as f:
        json.dump(cluster_data, f, indent=4)
    print("\n✅ Test completati. Dati aggiornati in focused_cluster_datas.json.")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-only", action="store_true", help="Esegui solo i test sui codeSnippet originali")
    parser.add_argument("--llm_only", action="store_true", help="Esegui solo i test sui codeSnippet originali")
    args = parser.parse_args()
    main(base_only=args.base_only, llm_only= args.llm_only)
