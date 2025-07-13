import os
import json
import subprocess
import shutil
from pathlib import Path
import re
import uuid
from tempFileGestor import TempTestFile
import concurrent.futures
from threading import Lock
import multiprocessing
import sys




BASE_DIR = Path(__file__).resolve().parent #./src
DATASET_DIR = BASE_DIR / "dataset"
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"
CLUSTER_JSON = BASE_DIR / "focused_cluster_datas.json"

class TestRunner:
    """Gestisce l'esecuzione concorrente dei test"""
    
    def __init__(self, max_workers=None):
        self.max_workers = max_workers or min(multiprocessing.cpu_count(), 4)
        self.progress_lock = Lock()
        self.completed_tests = 0
        self.total_tests = 0
        self.failed_tests = []
    
    def _update_progress(self, test_id, success=True):
        """Aggiorna il progresso in modo thread-safe"""
        with self.progress_lock:
            self.completed_tests += 1
            if not success:
                self.failed_tests.append(test_id)
            progress = (self.completed_tests / self.total_tests) * 100
            print(f"🔄 Progresso test: {self.completed_tests}/{self.total_tests} ({progress:.1f}%)")
    
    def run_test_worker(self, test_info,run_with_docker_cache=True):
        """Worker per eseguire un singolo test"""
        entry, lang, test_type = test_info
        test_id = f"{entry['id']}_{test_type}"
        
        try:
            print(f"🧪 Esecuzione test: {test_id}")
            
            if test_type == "base":
                # Test del codice base
                results = self.run_tests_on_entry(entry, lang, base_only=True, run_with_docker_cache=run_with_docker_cache)
                success = results.get("execution_time_ms") is not None
            elif test_type == "llm":
                # Test solo LLM
                results = self.run_tests_on_entry(entry, lang, llm_only=True,run_with_docker_cache=run_with_docker_cache)
                success = bool(results.get("LLM_results"))
            else:
                # Test completo
                results = self.run_tests_on_entry(entry, lang,run_with_docker_cache=run_with_docker_cache)
                success = results.get("execution_time_ms") is not None
            
            self._update_progress(test_id, success)
            return {
                'test_id': test_id,
                'entry': entry,
                'results': results,
                'success': success,
                'error': None
            }
            
        except Exception as e:
            error_msg = f"Errore test {test_id}: {str(e)}"
            print(f"❌ {error_msg}")
            self._update_progress(test_id, False)
            return {
                'test_id': test_id,
                'entry': entry,
                'results': None,
                'success': False,
                'error': error_msg
            }
    
    def run_tests_concurrent(self, cluster_data, base_only=False, llm_only=False,run_with_docker_cache=True):
        """Esegue tutti i test in modo concorrente"""
        # Prepara lista dei test
        test_tasks = []
        for lang, entries in cluster_data.items():
            for entry in entries:
                if base_only:
                    test_tasks.append((entry, lang, "base"))
                elif llm_only:
                    test_tasks.append((entry, lang, "llm"))
                else:
                    test_tasks.append((entry, lang, "full"))
        
        self.total_tests = len(test_tasks)
        self.completed_tests = 0
        self.failed_tests = []
        
        print(f"🚀 Inizio esecuzione {self.total_tests} test con {self.max_workers} worker")
        
        # esecuzione in parallelo sfruttando Thread Pool Executor
        test_results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # sottomissione delle task
            future_to_task = {
                executor.submit(self.run_test_worker, task, run_with_docker_cache): task 
                for task in test_tasks
            }
            
            # raccolta dei risultati man mano che le task vengono completate
            for future in concurrent.futures.as_completed(future_to_task):
                result = future.result()
                test_results.append(result)
                
                # aggiornamento dell'entry (se il test ha successo)
                if result['success'] and result['results']:
                    entry = result['entry']
                    results = result['results']
                    
                    # aggiornamento delle metriche associate al code snippet di base
                    if not llm_only:
                        entry.update({
                            "CPU_usage": results.get("CPU_usage"),
                            "RAM_usage": results.get("RAM_usage"),
                            "execution_time_ms": results.get("execution_time_ms"),
                        })
                    
                    # aggiornamento delle metriche associate ai codici migliorati dagli LLMs
                    if not base_only and "LLM_results" in results:
                        entry["LLM_results"] = results["LLM_results"]
        
        # Statistiche esecuzione:
        successful_tests = sum(1 for r in test_results if r['success'])
        failed_tests = len(self.failed_tests)
        
        print(f"✅ Test completati: {successful_tests}/{self.total_tests} successi")
        if failed_tests > 0:
            print(f"❌ Test falliti: {failed_tests}")
            print(f"   Dettagli: {', '.join(self.failed_tests)}")
        
        return test_results


    def parse_metrics(self,log_path): 
        print(f"👀 parsing metrics of logpath : {log_path}")
        metrics = {
            "execution_time_ms": None,
            "CPU_usage": None,
            "RAM_usage": None,
            "regrationTestPassed": True 
        }
        
        with open(log_path) as f:
            log_content = f.read()

        # Cerca l'execution time
        time_match = re.search(r"Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+):(\d+\.\d+)", log_content)
        if time_match:
            minutes = int(time_match.group(1))
            seconds = float(time_match.group(2))
            metrics["execution_time_ms"] = int((minutes * 60 + seconds) * 1000)

        # Cerca l'uso della RAM
        ram_match = re.search(r"Maximum resident set size \(kbytes\): (\d+)", log_content)
        if ram_match:
            metrics["RAM_usage"] = int(ram_match.group(1))

        # Cerca l'uso della CPU
        cpu_match = re.search(r"Percent of CPU this job got: (\d+\.?\d*)%", log_content)
        if cpu_match:
            metrics["CPU_usage"] = float(cpu_match.group(1))

        # Cerca il numero di fallimenti
        failures_match = re.search(r"Failures: (\d+)", log_content)
        if failures_match:
            failures_count = int(failures_match.group(1))
            metrics["regrationTestPassed"] = (failures_count == 0)
        
        return metrics

    def convert_commonjs_to_esm(self,file_path: str):
        if DATASET_DIR not in file_path : file_path = DATASET_DIR + file_path
        path = Path(file_path)
        if not path.exists() or not path.suffix == ".js":
            print(f"❌ File non valido: {file_path}")
            sys.exit(1)

        code = path.read_text()

        # Convert require() → import
        def replace_require(match):
            var = match.group(1)
            module = match.group(2)
            return f"import {var} from '{module}';"

        code = re.sub(r"const (\w+)\s*=\s*require\(['\"](.+?)['\"]\);?", replace_require, code)

        # Convert module.exports or exports.foo → export
        code = re.sub(r"module\.exports\s*=\s*(\w+);", r"export default \1;", code)
        code = re.sub(r"exports\.(\w+)\s*=\s*(\w+);", r"export const \1 = \2;", code)

        # Optional: Remove "use strict" (not needed in ESM)
        code = re.sub(r"'use strict';\n?", "", code)

        # Backup
        path.with_suffix(".js.bak").write_text(path.read_text())
        path.write_text(code)

        print(f"✅ Conversione completata: {file_path} (backup creato)")


    def run_container(self,lang, mount_path, container_name, exercise_name:str, file_name:str, entry, LLM_dirName = "", run_with_cache=True, already_called = False):
        print(f"mount_path = {mount_path}")
        dockerfile_path = DOCKER_DIR / lang.lower()
        run_sh_path = dockerfile_path / "run.sh"
        
        target_run_sh = mount_path / "run.sh"    
        shutil.copy(run_sh_path, target_run_sh) #copia run.sh da docker directory a directory esercizio
        print(f"copyed run sh : {run_sh_path}\nin target run sh: {target_run_sh}")
        
        if LLM_dirName != "":
            target_run_sh =  mount_path / LLM_dirName / "run.sh"  
            shutil.copy(run_sh_path, target_run_sh)
        
        if lang == "javascript":
            target_package_json = mount_path / "package.json"              
            
            # Copia package.json
            pkg_json_src = DOCKER_DIR / "javascript" / "package.json"
            shutil.copy(pkg_json_src, target_package_json)
            
            # Copia jest config            
            target_jest_config = mount_path / "jest.config.js"
            jest_config_src = DOCKER_DIR / "javascript" / "jest.config.js"
            shutil.copy(jest_config_src, target_jest_config)

        
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

            # Rimuove eventuali node_modules preesistenti  
            nm = mount_path / "node_modules"
            if nm.exists() and not nm.is_symlink():                
                shutil.rmtree(nm)

        #build del container docker tramite subprocess
        if run_with_cache : subprocess.run(["docker", "build", "-t", container_name, str(dockerfile_path)], check=True)
        else : subprocess.run(["docker", "build", "--no-cache", "-t", container_name, str(dockerfile_path)], check=True)
        
        #esecuzione di run.sh => compilazione + esecuzione test unit 
        if lang.lower() == "java" :           
            print(f"file name : {file_name}")
            result = subprocess.run([
                "docker", "run", "--rm",
                "-v", f"{mount_path}:/app",
                container_name, file_name
            ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        
        else :
            result = subprocess.run([
                "docker", "run", "--rm",
                "-v", f"{mount_path}:/app",
                container_name
            ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

        #print(result.stdout)  
        container_err_flag = False
        if result.returncode != 0:                                            
            if lang == "javascript":
                self.convert_commonjs_to_esm(entry['testUnitFilePath'])
                if not already_called : return self.run_container(lang, mount_path, container_name, exercise_name, file_name, entry, LLM_dirName , run_with_cache, True)
            
            print(f"❌‼ Errore nel container {entry['id']} - {LLM_dirName} | result:\n{result}\n")
            container_err_flag = True
            
        else: print(f"🟢 Test unit executed for entry {entry['id']}")

        # Debug:
        #print(f"🔎 Controllo output.log in {mount_path}")
        #print("📂 Contenuto post-run:", list(mount_path.iterdir()))

        #copia del log file nella directory dell'esercizio
        log_file = mount_path / "output.log"     
        
        final_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}.log"
        shutil.copy(log_file, final_log)
        
        if LLM_dirName != "":
            target_log_path = mount_path / LLM_dirName / "output.log"
            print(f"target_log_path = {target_log_path}")
            shutil.copy(log_file, target_log_path) 
        
        
        # Salva anche il file di risorse, se presente
        resource_log = mount_path / "resource_usage.log"
        if resource_log.exists():
            final_resource_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}_resource.log"
            shutil.copy(resource_log, final_resource_log)

        return (log_file, container_err_flag)

    def parse_metrics_typescript(self,log_path):
        #print(f"parsing ts metrics of logpath : {log_path}")
        metrics = {
            "execution_time_ms": None,
            "CPU_usage": None,
            "RAM_usage": None,
            "success": None,
            "passed_tests": None,
            "failed_tests": None,
            "regrationTestPassed":False
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
            metrics["regrationTestPassed"] = data.get("numFailedTests") == 0

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
            print(f"❌ Errore parsing log JSON:\n{e}")

        return metrics

    def run_tests_on_entry(self,entry, lang, base_only=False, llm_only = False, run_with_docker_cache = True):
        path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
        container_name = f"test_{lang.lower()}"
        results = {}
        parts = str(entry["codeSnippetFilePath"]).split("/")
        codeSnippetFileName = parts.pop()

        print(f"\n➡️ Testing base code: {entry['id']}\n➡️ path : {path}")
        if not llm_only: #esecuzione test suites su base code snippets
            (base_log,container_err_flag) = self.run_container(lang, path.resolve(), container_name, entry["id"],codeSnippetFileName, entry,run_with_docker_cache)
            base_metrics = None
            if lang != "typescript" : base_metrics =  self.parse_metrics(base_log)
            else : base_metrics = self.parse_metrics_typescript(base_log)
            if container_err_flag : base_metrics['regrationTestPassed'] = False
            results.update(base_metrics)
            

            #salva path log 
            results["base_log"] = str(base_log)
        else:
            results = entry

        
        llm_results = []
        if "LLM_codeSnippetFilePaths" in entry and not base_only: #esecuzione test suites su codici generati dagli LLMs
            for llm_path in entry["LLM_codeSnippetFilePaths"]:
                llm_file = Path(llm_path).name
                llm_name = llm_file.split("_")[0]
                print(f"  ↪ Testing LLM ({llm_name}): {llm_file}")
                llm_type_dir = (DATASET_DIR / llm_path).parent
                llm_dirName = Path(llm_type_dir).name
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

               
                
                if lang == "c" or lang == "cpp" or lang == "go":
                    code_path_dir = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
                
                # run test
                (llm_log,container_err_flag) = self.run_container(lang, code_path_dir.resolve(), container_name, entry["id"],codeSnippetFileName, entry, llm_dirName,run_with_docker_cache)
                
               
                if lang != "typescript" : llm_metrics =  self.parse_metrics(llm_log)
                else : llm_metrics = self.parse_metrics_typescript(llm_log)
                if container_err_flag : llm_metrics['regrationTestPassed'] = False

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
                

                
                llm_metrics["log"] = str(llm_log).replace("output.log",f"{llm_dirName}/output.log")
                llm_results.append(llm_metrics)

        results["LLM_results"] = llm_results
        return results


def main(base_only=False, llm_only=False, max_workers=None, run_with_docker_cache = True):
    """Esegue test suites su code snippet e codigi generati dagli LLMs.
    Attualmente sfrutta il cluster scelto anziché il dataset"""
    
    
    LOGS_DIR.mkdir(exist_ok=True)    
    cluster_data = None
    try:
        with open(CLUSTER_JSON, "r", encoding="utf-8") as f:
            cluster_data = json.load(f)
    except Exception as e:
        print(f"❌ Errore caricamento cluster data: {e}")
        return False
        
    test_runner = TestRunner(max_workers=max_workers)
    test_runner.run_tests_concurrent(
        cluster_data, 
        base_only=base_only, 
        llm_only=llm_only,
        run_with_docker_cache = run_with_docker_cache
    )
    
    #Salva JSON aggiornato
    try:
        with open(CLUSTER_JSON, "w", encoding="utf-8") as f:
            json.dump(cluster_data, f, indent=4, ensure_ascii=False)
        print(f"✅ Dati salvati in {CLUSTER_JSON}")
        return True
    except Exception as e:
        print(f"❌ Errore salvataggio: {e}")
        return False


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-only", action="store_true", 
                       help="Esegui solo i test sui codeSnippet originali")
    parser.add_argument("--llm-only", action="store_true", 
                       help="Esegui solo i test sui codeSnippet LLM")
    parser.add_argument("--max-workers", type=int, 
                       help="Numero massimo di worker threads")
    
    parser.add_argument("--no-docker-cache", action="store_false",
                       help="Non utilizzare la cache per i containers Docker")
    
    
    args = parser.parse_args()
    
    if not args.no_docker_cache: run_with_docker_cache = False
    else: run_with_docker_cache = True
    
    
    success = main(
        base_only=args.base_only, 
        llm_only=args.llm_only,
        max_workers=args.max_workers,
        run_with_docker_cache = run_with_docker_cache
    )
    
    if success:
        print("\n🎉 Test completati con successo!")
        exit(0)
    else:
        print("\n💥 Test falliti!")
        exit(1)