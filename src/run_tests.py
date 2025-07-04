import os
import json
import subprocess
import shutil
from pathlib import Path
from datetime import datetime
import re
import uuid

BASE_DIR = Path(__file__).resolve().parent
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


def run_tests_on_entry(entry, lang, base_only=False):
    path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
    container_name = f"test_{lang.lower()}"
    results = {}

    print(f"\n▶ Testing base code: {entry['id']} | path : {path}")
    base_log = run_container(lang, path.resolve(), container_name, entry["id"])
    base_metrics = None
    if lang != "typescript" : base_metrics =  parse_metrics(base_log)
    else : base_metrics = parse_metrics_typescript(base_log)
    results.update(base_metrics)

    # Salva path log per tracciabilità
    results["base_log"] = str(base_log)

    # Se presenti, testiamo i file LLM
    llm_results = []
    if "LLM_codeSnippetFilePaths" in entry and not base_only:
        for llm_path in entry["LLM_codeSnippetFilePaths"]:
            llm_file = Path(llm_path).name
            llm_name = llm_file.split("_")[0]
            print(f"  ↪ Testing LLM ({llm_name}): {llm_file}")
            llm_code_path = (DATASET_DIR / llm_path).parent
            #temp_filename = llm_file  # rinomina se necessario
            original_filename = Path(entry["codeSnippetFilePath"]).name

            # backup e sostituzione codice
            target_file = llm_code_path / original_filename
            backup = None
            if target_file.exists():
                backup = target_file.with_suffix(".bak")
                shutil.copy(target_file, backup)

            shutil.copy(llm_code_path / llm_file, target_file)

            # run test
            llm_log = run_container(lang, llm_code_path.resolve(), container_name, entry["id"])

            if lang != "typescript" : llm_metrics =  parse_metrics(llm_log)
            else : llm_metrics = parse_metrics_typescript(llm_log)


            # ripristina
            if backup:
                shutil.move(backup, target_file)

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

def main(base_only=False):
    LOGS_DIR.mkdir(exist_ok=True) #check and in case create logs dir 
    
    cluster_data = None
    with open(CLUSTER_JSON, "r", encoding="utf-8") as f: #open and get cluster data by focused cluster data file
        cluster_data = json.load(f)

    for lang, entries in cluster_data.items(): #for each language in cluster data file 
        for entry in entries: # for each entry of each language 
            print(f"\n=== Testing {entry['id']} ({lang}) ===")
            test_results = run_tests_on_entry(entry, lang, base_only=base_only)
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
    args = parser.parse_args()
    main(base_only=args.base_only)
