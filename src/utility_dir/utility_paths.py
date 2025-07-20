from pathlib import Path


SRC_DIR = Path("..")
DATASET_DIR = Path("../dataset")
DATASET_JSON_FILEPATH = Path("../dataset/dataset.json")
FOCUSED_CLUSTER_JSON_FILEPATH = Path("../clusters/focused_cluster_datas.json")
FOCUSED_CLUSTER_2_JSON_FILEPATH = Path("../clusters/focused_cluster_datas_2.json")

OUTPUT_DIR_FILEPATH  = Path("../execution_outputs")
OUTPUT_DATASET_FILEPATH = OUTPUT_DIR_FILEPATH / "dataset_outputs.json"
OUTPUT_FOCUSED_CLUSTER_FILEPATH = OUTPUT_DIR_FILEPATH / "focused_cluster_outputs.json"

CLUSTERS_DIR_FILEPATH = Path("../clusters")
BAD_ENTRIES_FILEPATH = Path("../clusters/bad_entries.json")
BAD_ENTRIES_CLUSTER_FILEPATH = Path("../clusters/bad_entries_cluster.json")
DEBUG_CLUSTER_FILEPATH = Path("../clusters/debug_cluster.json")
LLM_CONFIGS_FILEPATH = Path("../llm_configs.json")

