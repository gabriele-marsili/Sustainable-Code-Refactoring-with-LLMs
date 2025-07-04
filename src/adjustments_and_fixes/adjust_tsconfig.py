import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset" / "typescript"

def copy_tsconfig_to_exercises():    
    tsconfig_src = DATASET_DIR / "tsconfig.json"
    package_json_path = BASE_DIR / "docker" / "typescript" / "package.json"

    if not tsconfig_src.exists():
        print(f"Errore: {tsconfig_src} non esiste.")
        return
    
    if not package_json_path.exists():
        print(f"Errore: {package_json_path} non esiste.")
        return

    # Cicla tutte le sottodirectory di src/dataset/typescript
    for subdir in DATASET_DIR.iterdir():
        if subdir.is_dir():
            tsconfig_target = subdir / "tsconfig.json"
            package_target = subdir / "package.json"
            shutil.copy(tsconfig_src, tsconfig_target)
            shutil.copy(package_json_path, package_target)
            print(f"Copiato tsconfig.json e package.json in {tsconfig_target}")

if __name__ == "__main__":
    copy_tsconfig_to_exercises()
