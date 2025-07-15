import ast
import importlib
import subprocess
import sys
import sysconfig

def is_stdlib_module(module_name):
    """Verifica se un modulo è parte della libreria standard di Python."""
    try:
        spec = importlib.util.find_spec(module_name)
        if spec and spec.origin:
            stdlib_path = sysconfig.get_paths()["stdlib"]
            return spec.origin.startswith(stdlib_path)
    except Exception:
        pass
    return False

def extract_imported_modules(filepath):
    """Estrae tutti i moduli importati da un file Python."""
    with open(filepath, "r", encoding="utf-8") as f:
        tree = ast.parse(f.read())
    modules = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                modules.add(alias.name.split('.')[0])
        elif isinstance(node, ast.ImportFrom):
            if node.module:
                modules.add(node.module.split('.')[0])
    return modules

def install_external_dependencies(filepath):
    """Installa con pip le librerie esterne usate nel file indicato."""
    imported_modules = extract_imported_modules(filepath)
    for module in imported_modules:
        try:
            importlib.import_module(module)
        except ImportError:
            if not is_stdlib_module(module):
                print(f"[INFO] Installing external module: {module}")
                subprocess.run(
                    [sys.executable, "-m", "pip", "install", module],
                    check=False
                )
            else:
                print(f"[DEBUG] {module} is part of stdlib, skipping")
        else:
            print(f"[DEBUG] {module} already installed")

