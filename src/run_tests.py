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
import time
from collections import defaultdict
from library_installer import install_external_dependencies
from utility_dir import utility_paths
import argparse
from datetime import datetime
from disordInteraction import create_webhook_reporter

BASE_DIR = utility_paths.SRC_DIR
DATASET_DIR = utility_paths.DATASET_DIR
DATASET_JSON_PATH = utility_paths.DATASET_JSON_FILEPATH
DOCKER_DIR = BASE_DIR / "docker"
LOGS_DIR = BASE_DIR / "logs"
CLUSTER_JSON = utility_paths.FOCUSED_CLUSTER_JSON_FILEPATH
BAD_ENTRIES_JSON = utility_paths.BAD_ENTRIES_FILEPATH
BAD_ENTRIES_CLUSTER_JSON = utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH
DEBUG_CLUSTER_JSON = utility_paths.DEBUG_CLUSTER_FILEPATH
silent_mode = False
global time_passed
global files_executed
global total_files
global tests_passed
global error_quantity
time_passed = ""
files_executed = 0
total_files = 0
tests_passed = 0
error_quantity = 0


class TestRunner:
    """Gestisce l'esecuzione concorrente dei test"""
    
    def __init__(self, max_workers=None):
        self.max_workers = max_workers or min(multiprocessing.cpu_count(), 4)
        self.progress_lock = Lock()
        self.completed_tests = 0
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = []
        self.start_time = time.time()        
        self.container_pool = {}  # Dizionario per memorizzare i nomi dei container per linguaggio


    
    def _update_progress(self, test_id, success=True):
        global time_passed, files_executed, total_files, tests_passed, error_quantity
        """Aggiorna il progresso in modo thread-safe"""
        with self.progress_lock:
            self.completed_tests += 1
            if not success:
                self.failed_tests.append(test_id)
            progress = (self.completed_tests / self.total_tests) * 100
            progress_passed = (self.passed_tests / self.completed_tests) * 100
            c_time = time.time()
            elapsed_time_s = c_time - self.start_time
            hours = int(elapsed_time_s // 3600)
            minutes = int((elapsed_time_s % 3600) // 60)
            secs = int(elapsed_time_s % 60)
            time_passed = f"{hours:02d}h {minutes:02d}min {secs:02d}s"
            print(f"🔄 Progresso test: {self.completed_tests}/{self.total_tests} ({progress:.1f}%)\n🟩 Passed :  {self.passed_tests}/{self.completed_tests} ({progress_passed:.1f}%)\n⏳ Time passed : {time_passed}")
            tests_passed = self.passed_tests
            files_executed = self.completed_tests
            total_files = self.total_tests
            error_quantity = self.completed_tests - self.passed_tests
    
    def run_test_worker(self, test_info,run_with_docker_cache=True):
        """Worker per eseguire un singolo test"""
        entry, lang, test_type = test_info
        test_id = f"{entry['id']}_{test_type}"
        
        try:
            if not silent_mode : print(f"🧪 Esecuzione test: {test_id}")
            
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
            if not silent_mode : print(f"❌ {error_msg}")
            self._update_progress(test_id, False)               
            self.add_bad_entry_id(entry['id'],str(e),"",entry['language'])
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
        
        print(f"🚀 Inizio esecuzione {self.total_tests} test con {self.max_workers} worker\nrun_with_docker_cache = {run_with_docker_cache}")
        
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
        failed_tests = self.total_tests - self.passed_tests
        
        print(f"✅ Test completati: {self.passed_tests}/{self.total_tests} successi")
        if failed_tests > 0:
            print(f"❌ Test falliti: {failed_tests}")
            if not silent_mode : print(f"   Dettagli: {', '.join(self.failed_tests)}")
        
        return test_results


    def parse_metrics(self,log_path): 
        if not silent_mode : print(f"👀 parsing metrics of logpath : {log_path}")
        metrics = {
            "execution_time_ms": None,
            "CPU_usage": None,
            "RAM_usage": None,
            "regrationTestPassed": True 
        }
        
        with open(log_path) as f:
            log_content = f.read()

        # Cerca il tempo di esecuzione come somma di User + System time
        user_time_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)
        system_time_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)

        if user_time_match and system_time_match:
            user_time = float(user_time_match.group(1))
            system_time = float(system_time_match.group(1))
            metrics["execution_time_ms"] = int((user_time + system_time) * 1000)        
        else: #fallback a wall clock time
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
        if str(DATASET_DIR) not in file_path : file_path = str(DATASET_DIR) +"/"+ file_path
        path = Path(file_path)
        if not path.exists() or not path.suffix == ".js":
            if not silent_mode : print(f"❌ File non valido: {file_path}")
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

        if not silent_mode : print(f"✅ Conversione completata: {file_path} (backup creato)")



    def patch_import(self,test_file_path: Path):
        content = test_file_path.read_text()
        new_content = re.sub(r'from\s+solutions\.(\w+)\s+import', r'from \1 import', content)
        test_file_path.write_text(new_content)


    def add_bad_entry_id(self, entry_id: str, err_msg: str = "", log_file: Path = None,language:str=""):
        if not silent_mode : print(f"✍🏻 Writing bad entry: {entry_id}")
        
        # Converte log_file in stringa, se fornito come Path
        log_file_path = str(log_file) if log_file is not None else ""

        # Percorso assoluto al JSON
        bad_entries_path = Path(BAD_ENTRIES_JSON)

        # Crea file se non esiste
        if bad_entries_path.exists():
            with bad_entries_path.open("r", encoding="utf-8") as f:
                try:
                    dati = json.load(f)
                except json.JSONDecodeError:
                    if not silent_mode : print("⚠️ BAD_ENTRIES_JSON corrotto. Sovrascrivo.")
                    dati = {"entries": []}
        else:
            dati = {"entries": []}

        # Aggiungi nuova entry (evita duplicati se necessario)
        dati["entries"].append({
            "id": entry_id,
            "error_message": err_msg,
            "log_file_path": log_file_path,
            "language":language
        })

        # Scrittura sicura del file aggiornato
        with bad_entries_path.open("w", encoding="utf-8") as f:
            json.dump(dati, f, indent=4)
            
    
    
    def run_container(self,lang, mount_path, container_name, exercise_name:str, file_name:str, entry, LLM_dirName = "", run_with_cache=True, already_called = False):
        try:
            if not silent_mode : print(f"mount_path = {mount_path}")
            dockerfile_path = DOCKER_DIR / lang.lower()
            run_sh_path = dockerfile_path / "run.sh"
            
            target_run_sh = mount_path / "run.sh"    
            shutil.copy(run_sh_path, target_run_sh) #copia run.sh da docker directory a directory esercizio
            
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

            if lang == "python":
                utils_src_dir = DOCKER_DIR / "python" / "utils"
                utils_dest_dir_path = mount_path / "utils"
                if not utils_dest_dir_path.exists():
                    shutil.copytree(utils_src_dir,utils_dest_dir_path)
            
            if lang == "typescript": 
                # Copia tsconfig.json 
                tsconfig_src = DATASET_DIR / "typescript" / "tsconfig.json"
                tsconfig_target = mount_path / "tsconfig.json"    
                #print(f"tsconfig_src = {tsconfig_src}\ntsconfig_target = {tsconfig_target}")
                
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
                if not silent_mode : print(f"file name : {file_name}")
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
            err_msg = ""
            if result.returncode != 0:                                            
                if lang == "javascript":
                    self.convert_commonjs_to_esm(entry['testUnitFilePath'])
                    if not already_called : return self.run_container(lang, mount_path, container_name, exercise_name, file_name, entry, LLM_dirName , run_with_cache, True)
                
                if lang == "python" and not already_called:
                    test_path = DATASET_DIR / entry['testUnitFilePath']                                        
                    code_path = str(DATASET_DIR / entry['codeSnippetFilePath'])
                    
                    self.patch_import(test_path)
                    install_external_dependencies(code_path)
                    return self.run_container(lang, mount_path, container_name, exercise_name, file_name, entry, LLM_dirName , run_with_cache, True)
                
                err_msg = f"❌‼ Errore nel container {entry['id']} - {LLM_dirName} | result:\n{result}\n"
                if not silent_mode : print(err_msg)
                container_err_flag = True
                
                
            else: 
                if not silent_mode : print(f"🟢 Test unit executed for entry {entry['id']}")
                self.passed_tests += 1

            # Debug:
            #print(f"🔎 Controllo output.log in {mount_path}")
            #print("📂 content post-run:", list(mount_path.iterdir()))

            #copia del log file nella directory dell'esercizio
            log_file = mount_path / "output.log"     
            
    
            final_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}.log"
            
            if not final_log.exists():
                final_log.touch()
            
            shutil.copy(log_file, final_log)
            
            if LLM_dirName != "":
                target_log_path = mount_path / LLM_dirName / "output.log"
                if not silent_mode : print(f"target_log_path = {target_log_path}")
                
                if not target_log_path.exists():
                    target_log_path.touch()   
                
                shutil.copy(log_file, target_log_path) 
            
            
            # Salva anche il file di risorse, se presente
            resource_log = mount_path / "resource_usage.log"
            if resource_log.exists():
                final_resource_log = LOGS_DIR / f"{container_name}_{exercise_name}_{uuid.uuid4().hex[:8]}_resource.log"
                shutil.copy(resource_log, final_resource_log)

            if container_err_flag : 
                self.add_bad_entry_id(entry['id'], err_msg, log_file,entry['language'])

            return (log_file, container_err_flag)
        
        except Exception as e :
            if not silent_mode : print(f"\nexception in run container :\n{e}")

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
                if not silent_mode : print("⚠️ Nessun resource_usage.log trovato")


        except Exception as e:
            if not silent_mode : print(f"❌ Errore parsing log JSON:\n{e}")

        return metrics

    def read_and_print_file_content(self,file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
                if not silent_mode : print(f"File content:\n\n{content}\n")
        except FileNotFoundError:
            if not silent_mode : print(f"File non trovato: {file_path}")
        except UnicodeDecodeError:
            if not silent_mode : print(f"Errore nella codifica del file: {file_path}")


    def setup_container(self, lang, run_with_docker_cache):
        container_name = f"test_{lang.lower()}_persistant"
        
        try:
            # Controllo se il container esiste già e lo rimuovo per evitare conflitti da esecuzioni precedenti
            subprocess.run(["docker", "stop", container_name], capture_output=True, text=True)
            subprocess.run(["docker", "rm", container_name], capture_output=True, text=True)
        except subprocess.CalledProcessError:
            pass # Non fare nulla se il container non esiste
        
        print(f"➡️ Creazione e avvio del container per {lang}...")
        
        try:
            # Costruisci il container
            dockerfile_path = DOCKER_DIR / lang.lower()
            if run_with_docker_cache:
                subprocess.run(["docker", "build", "-t", container_name, str(dockerfile_path)], check=True)
            else:
                subprocess.run(["docker", "build", "--no-cache", "-t", container_name, str(dockerfile_path)], check=True)
            
            # Avvia il container in background
            subprocess.run(["docker", "run", "-d", "--name", container_name, "-v", f"{BASE_DIR.resolve()}:/app", container_name], check=True)
            
            self.container_pool[lang] = container_name
            print(f"✅ Container {container_name} creato e avviato.")
        except subprocess.CalledProcessError as e:
            print(f"❌ Errore nella creazione del container {container_name}: {e.stderr}")
            raise # Propaga l'errore per fallire l'intera esecuzione
        
    def run_tests_on_entry(self, entry, lang, base_only=False, llm_only=False, run_with_docker_cache=True):
        path = DATASET_DIR / Path(entry["testUnitFilePath"]).parent
        
        container_name = self.container_pool.get(lang)
        if not container_name:
            # Questo caso non dovrebbe verificarsi se la pre-inizializzazione funziona
            raise Exception(f"🤨 Container per il linguaggio '{lang}' non trovato.")

        results = {}
        parts = str(entry["codeSnippetFilePath"]).split("/")
        codeSnippetFileName = parts.pop()
        
        
        # Esegui i test sul codice base
        if not llm_only:
            if not silent_mode : print(f"\n➡️ Testing base code: {entry['id']}\n➡️ path : {path}")
                        
            (base_log,container_err_flag) = self.run_container(lang, path.resolve(), container_name, entry["id"],codeSnippetFileName, entry,"",run_with_docker_cache)
            
            base_metrics = None
            if lang != "typescript" : base_metrics =  self.parse_metrics(base_log)
            else : base_metrics = self.parse_metrics_typescript(base_log)
            if container_err_flag : base_metrics['regrationTestPassed'] = False
            results.update(base_metrics)
            
            #salva path log 
            results["base_log"] = str(base_log)
        else:
            results = entry

        # Esegui i test sui codici generati dagli LLM
        llm_results = []
        if "LLMs" in entry and not base_only:
            for LLM in entry["LLMs"]:
                llm_path = LLM["path"]
                llm_file = Path(llm_path).name
                llm_name = llm_file.split("_")[0]
                if not silent_mode : print(f"  ↪ Testing LLM ({llm_name}): {llm_file}")
                
                llm_type_dir = (DATASET_DIR / llm_path).parent
                llm_dirName = Path(llm_type_dir).name
                code_path_dir = llm_type_dir.parent  
                if lang == "c" or lang == "cpp":
                    code_path_dir = code_path_dir / "src"
                if not silent_mode : print(f"  ↪ code_path_dir : {code_path_dir}")
                        
                original_filename = Path(entry["codeSnippetFilePath"]).name
                if lang == "c" or lang == "cpp" or lang == "go":
                    original_filename = llm_file.split("_")[1]
                
                if not silent_mode : print(f"  ↪ original_filename : {original_filename}")
                

                # backup e sostituzione codice
                target_file = code_path_dir / original_filename
                
                if not silent_mode : print(f"  ↪ target_file : {target_file}")
                
                backup = None
                renamed_llm_path = None

                # Se Java: rinomina llm_file in original_filename
                if lang == "java":
                    source_path = llm_type_dir / llm_file
                    renamed_llm_path = llm_type_dir / original_filename
                    source_path.rename(renamed_llm_path)
                    if not silent_mode : print(f"🔁 Rinomino {llm_file} → {original_filename}")
                    
                if target_file.exists():
                    backup = target_file.with_suffix(".bak")
                    shutil.copy(target_file, backup)

                # Sovrascrive il codice del file snippet originario (salvato in backup) con il codice generato dal LLM
                
                if lang == "java":
                    shutil.copy(llm_type_dir / original_filename, target_file)
                else:
                    shutil.copy(llm_type_dir / llm_file, target_file)

                # debug :
                # self.read_and_print_file_content(target_file)
                
                if lang == "c" or lang == "cpp":
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
                    if not silent_mode : print(f"🔁 Ripristino nome {original_filename} → {llm_file}")

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

    def save_results_to_output_file(self, cluster_data, output_file):
        """Salva i risultati delle metriche in un file di output separato"""
        import datetime
        
        output_data = {
            "execution_date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "results": {}
        }
        
        for lang, entries in cluster_data.items():
            output_data["results"][lang] = []
            
            for entry in entries:
                result_entry = {
                    "id": entry["id"],
                    "filename": entry["filename"],
                    "language": entry["language"]
                }
                
                # Aggiungi metriche base se presenti
                if "CPU_usage" in entry:
                    result_entry["CPU_usage"] = entry["CPU_usage"]
                if "RAM_usage" in entry:
                    result_entry["RAM_usage"] = entry["RAM_usage"]
                if "execution_time_ms" in entry:
                    result_entry["execution_time_ms"] = entry["execution_time_ms"]
                
                # Aggiungi risultati LLM se presenti
                if "LLM_results" in entry and entry["LLM_results"]:
                    result_entry["LLM_results"] = entry["LLM_results"]
                
                output_data["results"][lang].append(result_entry)
        
        # Salva il file di output
        output_file = utility_paths.OUTPUT_DIR_FILEPATH / output_file
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=4, ensure_ascii=False)
        
        
        
        print(f"✅ Risultati salvati in {output_file}")

def main(base_only=False, llm_only=False, max_workers=None, run_with_docker_cache = True, use_dataset = False, use_bad_entries = False,use_debug_cluster = False,cluster_name ="",output_file:str=None,webhook=False):
    """Esegue test suites su code snippet e codigi generati dagli LLMs.
    Attualmente sfrutta il cluster scelto anziché il dataset"""
        
    if not output_file : raise Exception("❌ Missing output file to save result")
    
    if not output_file.endswith(".json"):output_file = output_file + ".json"
    
        
    chosen_path = CLUSTER_JSON
    if use_dataset : chosen_path = DATASET_JSON_PATH
    if use_bad_entries : chosen_path = BAD_ENTRIES_CLUSTER_JSON
    if cluster_name and cluster_name != "" : 
        if not (cluster_name.endswith(".json")):cluster_name = cluster_name + ".json"
        chosen_path = utility_paths.CLUSTERS_DIR_FILEPATH / cluster_name
    if use_debug_cluster : 
        chosen_path = DEBUG_CLUSTER_JSON
        print("🪲 Using debug cluster...")
            
        
        
    if not silent_mode : print(f"chosen_path = {chosen_path}")
        
    LOGS_DIR.mkdir(exist_ok=True)    
    cluster_data = None
    try:
        with open(chosen_path, "r", encoding="utf-8") as f:
            cluster_data = json.load(f)
    except Exception as e:
        if not silent_mode : print(f"❌ Errore caricamento cluster data: {e}")
        return False
            
    


    test_runner = TestRunner(max_workers=max_workers)
        
    # Pre-inizializza i container prima di avviare i worker
    print("🐳 Pre-inizializzazione dei container Docker...")
    languages = set(cluster_data.keys())
    for lang in languages:
        test_runner.setup_container(lang, run_with_docker_cache)


    try:
        test_runner.run_tests_concurrent(
            cluster_data, 
            base_only=base_only, 
            llm_only=llm_only,
            run_with_docker_cache = run_with_docker_cache
        )
    except Exception as e:
        print(f"❌ Errore run test concurrent: {e}")
    finally:
       #  Pulizia dei container persistenti
        for lang, container_name in test_runner.container_pool.items():
            print(f"🛑 Fermo e rimuovo il container '{container_name}'...")
            subprocess.run(["docker", "stop", container_name], check=True)
            subprocess.run(["docker", "rm", container_name], check=True)
        print("✅ Pulizia dei container completata.")

        
        #Salva JSON aggiornato
        """
        try:
            with open(chosen_path, "w", encoding="utf-8") as f:
                json.dump(cluster_data, f, indent=4, ensure_ascii=False)
            print(f"✅ Dati salvati in {chosen_path}")
            return True
        except Exception as e:
            print(f"❌ Errore salvataggio: {e}")
        """

    if webhook : 
        WEBHOOK_URL = "https://discord.com/api/webhooks/1396529284327411857/zm_1miPBBZivw5gWUeXZpixwPdNItX3jaLQXa0rNFLmnXzv95neYStPxBbN6wFkabLen"
    
        # Crea reporter
        reporter = create_webhook_reporter(WEBHOOK_URL, "Test Results Bot")
        test_name = "Test for file : "+ str(chosen_path)
        if cluster_name and cluster_name != "":
            test_name = "Test for cluster : "+ str(cluster_name)
        success = reporter.send_test_results(
            test_name= test_name,
            duration=time_passed,
            files_executed=files_executed,
            total_files=total_files,
            tests_passed=tests_passed,
            total_tests=total_files,
            errors=error_quantity,
            additional_info={
                "Chosen path": chosen_path,
                "Output file": output_file or "Not chosen",                
            },
            custom_message="🚀 A test run completed!"
        )
        
        if success:
            print("Test results sent successfully!")
        else:
            print("Failed to send test results.")

        
    if output_file:
        try:
            print(f"ℹ️ Input file {chosen_path}")
            test_runner.save_results_to_output_file(cluster_data, output_file)
        except Exception as e:
            print(f"❌ Errore salvataggio output file: {e}")
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
    parser.add_argument("--cluster-name", type=str, 
                       help="Name of cluster to run")
    
    parser.add_argument("--no-docker-cache", action="store_false",
                       help="Non utilizzare la cache per i containers Docker")
    
    parser.add_argument("--dataset", action="store_true",
                       help="Use dataset for tests instead of cluster json")
    
    parser.add_argument("--bad-entries", action="store_true",
                       help="Use bad entries cluster for tests instead of cluster json")
    
    parser.add_argument("--debug-cluster", action="store_true",
                       help="Use debug cluster for tests instead of cluster json")
    
    parser.add_argument("--silent", action="store_true",
                       help="Excute in silent mode, shows only progress")
    
    parser.add_argument("--output-file", type=str,
                   help="File di output per salvare i risultati delle metriche")

    parser.add_argument("--webhook", action="store_true",
                       help="Send ds webhook when test ends")
    
    args = parser.parse_args()
    
    if not args.no_docker_cache: run_with_docker_cache = False
    else: run_with_docker_cache = True
    
    if args.silent:
        silent_mode = True
    
    success = main(
        base_only=args.base_only, 
        llm_only=args.llm_only,
        max_workers=args.max_workers,
        run_with_docker_cache = run_with_docker_cache,
        use_dataset = args.dataset,
        use_bad_entries = args.bad_entries,
        use_debug_cluster = args.debug_cluster,
        cluster_name=args.cluster_name,
        output_file=args.output_file,
        webhook=args.webhook,
        
    )
    
    if success:
        print("\n🎉 Test completati con successo!")
        exit(0)
    else:
        print("\n💥 Test falliti!")
        exit(1)