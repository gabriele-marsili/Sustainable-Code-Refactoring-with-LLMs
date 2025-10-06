

from dataclasses import dataclass, field
from typing import List

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



@dataclass
class LLMEntry:
    type: str
    path: str
    word_quantity: int
    char_quantity: int
    filename: str
    fuzzy_score: float
    cosine_similarity_score: float
    similarity_index: float


@dataclass
class CodeEntry:
    id: str
    filename: str
    language: str
    source: str
    codeSnippetFilePath: str
    testUnitFilePath: str
 
    characterQuantity: int
    wordQuantity: int
    licenseType: str
    LLMs: List[LLMEntry] = field(default_factory=list)

    @staticmethod
    def from_dict(data: dict) -> "CodeEntry":
        llms_arr = data['LLMs'] if 'LLMs' in data else []
        llms = [LLMEntry(**llm) for llm in llms_arr]
        #print(f"data :\n{data}")
        return CodeEntry(
            id=data["id"],
            filename=data["filename"],
            language=data["language"],
            source=data["source"],
            codeSnippetFilePath=data["codeSnippetFilePath"],
            testUnitFilePath=data["testUnitFilePath"],            
            characterQuantity=data.get("characterQuantity",-1),
            wordQuantity=data.get("wordQuantity",-1),
            licenseType=data.get("licenseType",""),
            LLMs=llms
        )
