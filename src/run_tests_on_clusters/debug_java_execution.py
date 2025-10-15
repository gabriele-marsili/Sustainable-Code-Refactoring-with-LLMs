#!/usr/bin/env python3
"""
Debug script to test Java execution manually
"""

import subprocess
import sys
from pathlib import Path
import shutil
import os
import re



# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from utility_dir import utility_paths


def cleanup_container(container_name: str):
    """Safely cleanup a container"""
    commands = [
        ["docker", "stop", container_name],
        ["docker", "rm", container_name],
        ["docker", "rmi", container_name],  # Remove image for fresh build
    ]

    for cmd in commands:
        try:
            subprocess.run(cmd, capture_output=True, timeout=30)
        except subprocess.TimeoutExpired:
            print(f"Timeout running: {' '.join(cmd)}")
        except Exception:
            pass  # Continue cleanup even if some commands fail


def build_container(language: str, use_cache: bool = True) -> str:
    """Build container for specific language"""
    container_name = f"test_runner_{language.lower()}_persistent"
    dockerfile_path = utility_paths.SRC_DIR / "docker" / language.lower()

    if not dockerfile_path.exists():
        raise FileNotFoundError(f"Docker configuration not found for {language}")

    # VERIFICA ESPLICITA del Dockerfile
    dockerfile = dockerfile_path / "Dockerfile"
    if not dockerfile.exists():
        raise FileNotFoundError(f"Dockerfile not found in {dockerfile_path}")

    # Cleanup existing container/image
    cleanup_container(container_name)

    # Build new container - USA PATH ASSOLUTO e specifica esplicitamente il Dockerfile
    build_cmd = [
        "docker",
        "build",
        "-f",
        str(dockerfile.absolute()),  # Specifica esplicitamente il Dockerfile
        "-t",
        container_name,
        str(dockerfile_path.absolute()),  # Path assoluto del context
    ]

    if not use_cache:
        build_cmd.insert(2, "--no-cache")  # Inserisci DOPO "build"

    # DEBUG: logga il comando completo
    print(f"Building with command: {' '.join(build_cmd)}")

    try:
        result = subprocess.run(
            build_cmd,
            capture_output=True,
            text=True,
            timeout=60 * 20,
        )

        if result.returncode != 0:
            # Logga output completo per debugging
            print(f"Build stdout: {result.stdout}")
            print(f"Build stderr: {result.stderr}")
            raise subprocess.CalledProcessError(
                result.returncode, build_cmd, result.stdout, result.stderr
            )

        print(f"Successfully built container: {container_name}")
        return container_name

    except subprocess.TimeoutExpired:
        raise TimeoutError(f"Container build timeout for {language}")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Container build failed for {language}: {e.stderr}")


def setup_test_environment(language: str, mount_path: Path):
    """Setup test environment with proper file copying and configuration"""
    dockerfile_path = utility_paths.SRC_DIR / "docker" / language.lower()

    # Copy run.sh con permessi esecutivi
    run_sh_src = dockerfile_path / "run.sh"
    run_sh_dest = mount_path / "run.sh"

    if run_sh_src.exists():
        shutil.copy2(run_sh_src, run_sh_dest)
        # CRITICO: Setta i permessi DOPO la copia
        run_sh_dest.chmod(0o755)
        print(f"Copied and made executable: {run_sh_dest}")

        # Verifica che sia effettivamente eseguibile
        if not os.access(run_sh_dest, os.X_OK):
            print(f"run.sh is not executable: {run_sh_dest}")
            try:
                os.chmod(run_sh_dest, 0o755)
            except Exception as e:
                print(f"Failed to make run.sh executable: {e}")

    else:
        print(f"run.sh source not found: {run_sh_src}")

    files_to_copy = ["pom.xml", "build.gradle"]
    for filename in files_to_copy:
        src_file = dockerfile_path / filename
        if src_file.exists():
            shutil.copy2(src_file, mount_path / filename)
            print(f"Copied {filename}")


def test_java_execution():
    """Test java execution manually"""

    # Test path
    # test_path = Path("/Users/piccoletto/Desktop/Everything/pisa/tesi/Sustainable-Code-Refactoring-with-LLMs/src/dataset/c/raindrops_Exercism_HeitorMP")

    test_path = Path(
        "/Users/piccoletto/Desktop/Everything/pisa/tesi/Sustainable-Code-Refactoring-with-LLMs/src/dataset/Java/accumulate_exercism-java-ThomasZumsteg"
    )

    print(f"Testing Java execution for: {test_path}")
    print(f"Path exists: {test_path.exists()}")

    for pattern in ["*.o", "*.out"]:
        for f in test_path.rglob(pattern):
            try:
                f.unlink()
                print(f"Deleted: {f}")
            except Exception as e:
                print(f"Could not delete {f}: {e}")

    output_log = test_path / "output.log"
    if output_log.exists():
        output_log.unlink()
        print("Deleted old output.log")

    setup_test_environment("java", test_path)

    # Check files
    print("\nFiles in directory:")
    for f in test_path.iterdir():
        print(f"  - {f.name}")

    # Check run.sh
    run_sh = test_path / "run.sh"
    print(f"\nrun.sh exists: {run_sh.exists()}")

    if run_sh.exists():
        print("\nContents of run.sh:")
        with open(run_sh, "r") as f:
            print(f.read())

    container_name = build_container("java", False)

    # Try to run in Docker
    print("\n" + "=" * 80)
    print("ATTEMPTING DOCKER EXECUTION")
    print("=" * 80)

    docker_cmd = [
        "docker",
        "run",
        "--rm",
        "--memory=4g",
        "--cpus=2.0",
        "-v",
        f"{test_path}:/app",
        "-w",
        "/app",
        f"{container_name}",
        "/bin/sh",
        "-c",
        "chmod +x ./run.sh && ./run.sh",
    ]

    print(f"\nDocker command: {' '.join(docker_cmd)}")

    try:
        result = subprocess.run(
            docker_cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=60,
        )

        print(f"\nExit code: {result.returncode}")
        print(f"\nOutput:\n{result.stdout}")

        # Check output.log
        output_log = test_path / "output.log"
        if output_log.exists():
            print("\n" + "=" * 80)
            print("CONTENTS OF output.log")
            print("=" * 80)
            with open(output_log, "r") as f:
                log_content = f.read()
                print(log_content)

            # Try to parse metrics
            print("\n" + "=" * 80)
            print("PARSING METRICS")
            print("=" * 80)

           

            user_match = re.search(r"User time \(seconds\): ([\d.]+)", log_content)

            elapsed_ns_match = re.search(r"Elapsed_ns: (\d+)", log_content)

            system_match = re.search(r"System time \(seconds\): ([\d.]+)", log_content)
            ram_match = re.search(
                r"Maximum resident set size \(kbytes\): (\d+)", log_content
            )
            cpu_match = re.search(r"Percent of CPU this job got: (\d+)%", log_content)

            if elapsed_ns_match:
                elapsed_ns = int(elapsed_ns_match.group(1))
                elapsed_us = elapsed_ns / 1_000
                elapsed_ms = elapsed_ns / 1_000_000
                elapsed_s = elapsed_ns / 1_000_000_000

                print(
                    f"Elapsed: {elapsed_s:.9f}s = {elapsed_ms:.6f}ms = {elapsed_us:.3f}μs = {elapsed_ns}ns"
                )
            else:
                print("⚠️  Timing metrics not found")

            print(f"User time found: {user_match.group(1) if user_match else 'NO'}")
            print(
                f"System time found: {system_match.group(1) if system_match else 'NO'}"
            )
            print(f"RAM found: {ram_match.group(1) if ram_match else 'NO'} KB")
            print(f"CPU found: {cpu_match.group(1) if cpu_match else 'NO'}%")

        else:
            print(f"\n❌ output.log NOT FOUND at {output_log}")

    except subprocess.TimeoutExpired:
        print("\n❌ TIMEOUT!")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback

        traceback.print_exc()

def check_and_fix_ava_filenames():
    """
    Scansiona la directory DATASET_DIR/Java, individua i file Java
    con nome errato e li rinomina per farli corrispondere alla classe pubblica
    contenuta al loro interno, rispettando le regole di Java.
    """
    
            
    java_path = utility_paths.DATASET_DIR / "Java"
    
    # Assicurati che il percorso esista
    if not java_path.exists():
        print(f"Errore: Il percorso {java_path} non esiste.")
        return

    # Espressione regolare per trovare la dichiarazione di una classe pubblica
    # Cerca "public class NomeClasse {"
    # Il gruppo di cattura 1 ([A-Za-z0-9_]+) cattura il nome della classe.
    CLASS_NAME_PATTERN = re.compile(r'class\s+([A-Za-z0-9_]+)', re.MULTILINE)

    for j_dir in os.scandir(java_path):
        if j_dir.is_dir():
            for j_content in os.scandir(j_dir.path):
                j_path_obj = Path(j_content.path)
                str_path = str(j_path_obj)
                
                # Condizione per file da rinominare
                if (
                    j_content.is_file()
                    and str_path.endswith(".java")
                    # Controlla se il nome del file non rispetta le convenzioni di Java
                    # Esempio: Inizia con minuscola OPPURE è tutto minuscolo
                    and (j_content.name[0].islower() or j_content.name.islower())
                ):
                    print(f"\nTentativo di rinomina per il file errato: {str_path}")
                    
                    try:
                        # 1. Lettura del file
                        with open(j_path_obj, 'r', encoding='utf-8') as f:
                            content = f.read()

                        # 2. Individuazione della classe pubblica
                        match = CLASS_NAME_PATTERN.search(content)

                        if match:
                            # Ottieni il nome della classe (gruppo 1 dell'espressione regolare)
                            public_class_name = match.group(1)
                            
                            # Crea il nuovo nome del file
                            new_filename = f"{public_class_name}.java"
                            new_path = j_path_obj.parent / new_filename

                            # 3. Cambio del filename
                            if new_path != j_path_obj:
                                os.rename(j_path_obj, new_path)
                                print(f"  ✅ Rinominato in: {new_path.name}")
                            else:
                                print(f"  ⚠️ Il nome del file è già corretto ({new_path.name}) nonostante la condizione iniziale.")
                                
                        else:
                            print("  ❌ Errore: Nessuna classe pubblica trovata nel file. Rinomina saltata.")
                            
                    except FileNotFoundError:
                        print(f"  ❌ Errore: File non trovato durante l'apertura: {str_path}")
                    except Exception as e:
                        print(f"  ❌ Errore durante la rinomina di {str_path}: {e}")


                # Logica esistente per directory LLM
                elif j_content.is_dir() and any(ai_name in j_content.path for ai_name in ["claude","gemini","openAI"]):
                    java_files = list(Path(j_content.path).rglob("*.java"))
                    if len(java_files) < 4:
                        print(
                            f"Not enough files ({len(java_files)}) for LLM dir | path = {j_content.path}"
                        )

# Esempio di esecuzione (devi assicurarti che Path e utility_paths funzionino nel tuo ambiente)
# check_java_filenames()
if __name__ == "__main__":
    print("=" * 80)
    print("JAVA EXECUTION DEBUG")
    print("=" * 80)
    # test_java_execution()
    check_and_fix_ava_filenames()
