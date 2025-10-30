"""Parsing utilities for filenames and data structures"""

import re
from typing import Dict, Optional


class FilenameParser:
    """Parser for output filenames and cluster names"""

    @staticmethod
    def parse_output_filename(filename: str) -> Dict[str, Optional[any]]:
        """
        Parse output filename to extract metadata

        Formats (handles ALL naming conventions):
        - Base with prefix: a####cluster_name_results_{exec_number}.json
        - Base no prefix: cluster_name_results_{exec_number}.json
        - LLM with prefix: a####cluster_name_results_v{prompt_version}_{exec_number}.json
        - LLM no prefix: cluster_name_results_v{prompt_version}_{exec_number}.json

        Args:
            filename: Name of the output file

        Returns:
            Dictionary with keys: cluster_name, test_type, exec_number, prompt_version
        """
        # Remove .json extension
        name = filename.replace('.json', '')

        # Enhanced patterns to capture optional a#### prefix AS PART of cluster name
        # Pattern for LLM: (a####cluster_name)_results_v{version}_{exec_num}
        llm_pattern = r'^(.+)_results_v(\d+)_(\d+)$'
        # Pattern for base: (a####cluster_name)_results_{exec_num}
        base_pattern = r'^(.+)_results_(\d+)$'

        llm_match = re.match(llm_pattern, name)
        if llm_match:
            cluster_name = llm_match.group(1)
            prompt_version = int(llm_match.group(2))
            exec_num = int(llm_match.group(3))
            return {
                'cluster_name': cluster_name,
                'test_type': 'llm',
                'exec_number': exec_num,
                'prompt_version': prompt_version
            }

        base_match = re.match(base_pattern, name)
        if base_match:
            cluster_name = base_match.group(1)
            exec_num = int(base_match.group(2))
            return {
                'cluster_name': cluster_name,
                'test_type': 'base',
                'exec_number': exec_num,
                'prompt_version': None
            }

        return {
            'cluster_name': None,
            'test_type': None,
            'exec_number': None,
            'prompt_version': None
        }

    @staticmethod
    def parse_cluster_filename(filename: str) -> Optional[str]:
        """
        Extract cluster name from cluster filename

        Format: cluster_{name}.json

        Args:
            filename: Name of the cluster file

        Returns:
            Cluster name or None if pattern doesn't match
        """
        if not filename.startswith('cluster_') or not filename.endswith('.json'):
            return None

        # Remove prefix and suffix
        cluster_name = filename.replace('cluster_', '').replace('.json', '')

        # Remove any test/debug suffixes
        for suffix in ['.test', '.with_metrics']:
            if cluster_name.endswith(suffix):
                cluster_name = cluster_name.replace(suffix, '')

        return cluster_name

    @staticmethod
    def extract_error_file_path(error_line: str) -> Optional[str]:
        """
        Extract file path from compiler error line

        Common formats:
        - C++/C: "/path/to/file.cpp:10:5: error: something"
        - Java: "file.java:10: error: something"

        Args:
            error_line: Error message line

        Returns:
            File path or None
        """
        # Pattern: path/to/file:line:col: error
        match = re.match(r'^([^:]+):\d+(?::\d+)?:\s*(?:error|warning)', error_line)
        if match:
            return match.group(1)

        # Alternative pattern: file.ext(line,col): error
        match = re.match(r'^([^(]+)\(\d+,\d+\):\s*(?:error|warning)', error_line)
        if match:
            return match.group(1)

        return None

    @staticmethod
    def is_test_file(file_path: str) -> bool:
        """
        Determine if a file path is a test file

        Args:
            file_path: Path to check

        Returns:
            True if it's a test file
        """
        file_path_lower = file_path.lower()

        test_indicators = [
            'test', '_test', 'testsuite', 'spec', '_spec',
            'unittest', 'gtest', 'catch2'
        ]

        return any(indicator in file_path_lower for indicator in test_indicators)

    @staticmethod
    def extract_llm_type_from_path(file_path: str) -> Optional[str]:
        """
        Extract LLM type from file path

        Typical paths:
        - .../openAI/ChatGPT4_...
        - .../claude/ClaudeSonnet4_...
        - .../gemini/GeminiFlash_...

        Args:
            file_path: Path to LLM generated file

        Returns:
            LLM type (openAI, claude, gemini) or None
        """
        file_path_lower = file_path.lower()

        if 'openai' in file_path_lower or 'chatgpt' in file_path_lower:
            return 'openAI'
        elif 'claude' in file_path_lower:
            return 'claude'
        elif 'gemini' in file_path_lower:
            return 'gemini'

        return None

    @staticmethod
    def normalize_language_name(language: str) -> str:
        """
        Normalize language names for consistency

        Args:
            language: Language name

        Returns:
            Normalized language name
        """
        language_lower = language.lower()

        normalization_map = {
            'cpp': 'cpp',
            'c++': 'cpp',
            'cxx': 'cpp',
            'c': 'c',
            'java': 'java',
            'python': 'python',
            'py': 'python',
            'javascript': 'javascript',
            'js': 'javascript',
            'typescript': 'typescript',
            'ts': 'typescript',
            'go': 'go',
            'golang': 'go',
            'rust': 'rust',
            'rs': 'rust'
        }

        return normalization_map.get(language_lower, language)
