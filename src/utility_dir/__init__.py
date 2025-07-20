"""
Utility directory package for path management and common utilities.

This package contains modules for managing file paths and common utility functions
used across the project.
"""

from .utility_paths import (
    CURRENT_FILE_DIR,
    SRC_DIR,
    DATASET_DIR,
    DATASET_JSON_FILEPATH,
    FOCUSED_CLUSTER_JSON_FILEPATH,
    FOCUSED_CLUSTER_2_JSON_FILEPATH,
    OUTPUT_DIR_FILEPATH,
    OUTPUT_DATASET_FILEPATH,
    OUTPUT_FOCUSED_CLUSTER_FILEPATH,
    CLUSTERS_DIR_FILEPATH,
    BAD_ENTRIES_FILEPATH,
    BAD_ENTRIES_CLUSTER_FILEPATH,
    DEBUG_CLUSTER_FILEPATH,
    LLM_CONFIGS_FILEPATH
)

__all__ = [
    'CURRENT_FILE_DIR',
    'SRC_DIR',
    'DATASET_DIR',
    'DATASET_JSON_FILEPATH',
    'FOCUSED_CLUSTER_JSON_FILEPATH',
    'FOCUSED_CLUSTER_2_JSON_FILEPATH',
    'OUTPUT_DIR_FILEPATH',
    'OUTPUT_DATASET_FILEPATH',
    'OUTPUT_FOCUSED_CLUSTER_FILEPATH',
    'CLUSTERS_DIR_FILEPATH',
    'BAD_ENTRIES_FILEPATH',
    'BAD_ENTRIES_CLUSTER_FILEPATH',
    'DEBUG_CLUSTER_FILEPATH',
    'LLM_CONFIGS_FILEPATH'
]

__version__ = '1.0.0'
__author__ = 'Mars'
__description__ = 'Utility package for path management in the thesis project'