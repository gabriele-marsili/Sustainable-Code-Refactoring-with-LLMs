import json
from pathlib import Path
from typing import Dict

METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms"]
LLM_METRICS = ["CPU_usage", "RAM_usage", "execution_time_ms", "regressionTestPassed"]


def read_json(path: Path) -> Dict:
    """Read JSON file with error handling."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {path}:\n{e}")
        return {}


def write_json(path: Path, data) -> None:
    try:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error writing {path}:\n{e}")
