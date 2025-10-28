"""Data loader for cluster and execution data"""

import sys
import os
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from utility_dir import general_utils
from ..core.config import AnalyzerConfig
from ..core.models import ExecutionEntry
from .parser import FilenameParser
from .validator import DataValidator

logger = logging.getLogger(__name__)


class DataLoader:
    """Loads and manages data from clusters and execution outputs"""

    def __init__(self, config: AnalyzerConfig):
        """
        Initialize data loader

        Args:
            config: Analyzer configuration
        """
        self.config = config
        self.parser = FilenameParser()
        self.validator = DataValidator()
        self._cache = {} if config.cache_enabled else None

    @staticmethod
    def _safe_float(value) -> Optional[float]:
        """Safely convert value to float, handling strings and None"""
        if value is None:
            return None
        if isinstance(value, str):
            try:
                return float(value)
            except (ValueError, TypeError):
                return None
        if isinstance(value, (int, float)):
            return float(value)
        return None

    def get_all_cluster_names(self) -> List[str]:
        """
        Get list of all cluster names

        Returns:
            List of cluster names
        """
        if not self.config.clusters_dir.exists():
            logger.error(f"Clusters directory not found: {self.config.clusters_dir}")
            return []

        cluster_names = []
        for cluster_file in self.config.clusters_dir.iterdir():
            if not cluster_file.name.endswith('.json'):
                continue

            if not cluster_file.name.startswith('cluster_'):
                continue

            # Skip patterns
            if self.config.should_skip_cluster(cluster_file.name):
                continue

            cluster_name = self.parser.parse_cluster_filename(cluster_file.name)
            if cluster_name:
                cluster_names.append(cluster_name)

        cluster_names.sort()
        logger.info(f"Found {len(cluster_names)} clusters")
        return cluster_names

    def load_cluster_metadata(self, cluster_name: str) -> Optional[Dict]:
        """
        Load cluster metadata from cluster JSON file

        Args:
            cluster_name: Name of the cluster

        Returns:
            Dictionary with cluster data or None if error
        """
        cache_key = f"cluster_{cluster_name}"
        if self._cache is not None and cache_key in self._cache:
            return self._cache[cache_key]

        cluster_file = self.config.clusters_dir / f"cluster_{cluster_name}.json"

        if not cluster_file.exists():
            logger.warning(f"Cluster file not found: {cluster_file}")
            return None

        data = general_utils.read_json(cluster_file)

        if not data:
            logger.warning(f"Empty or invalid cluster file: {cluster_file}")
            return None

        # Validate structure
        is_valid, errors = self.validator.validate_cluster_structure(data)
        if not is_valid:
            logger.warning(f"Invalid cluster structure for {cluster_name}: {errors}")

        if self._cache is not None:
            self._cache[cache_key] = data

        return data

    def find_execution_files(
        self,
        cluster_name: str
    ) -> Tuple[List[Path], List[Path]]:
        """
        Find execution output files for a cluster

        Args:
            cluster_name: Name of the cluster

        Returns:
            Tuple of (base_files, llm_files)
        """
        if not self.config.output_dir.exists():
            logger.warning(f"Output directory not found: {self.config.output_dir}")
            return ([], [])

        base_files = []
        llm_files = []

        for output_file in self.config.output_dir.iterdir():
            if not output_file.is_file() or not output_file.name.endswith('.json'):
                continue

            filename = output_file.name

            # Check if belongs to this cluster
            if not filename.startswith(f"{cluster_name}_results_"):
                continue

            # Parse filename to determine type
            parsed = self.parser.parse_output_filename(filename)

            if parsed['test_type'] == 'base':
                base_files.append(output_file)
            elif parsed['test_type'] == 'llm':
                llm_files.append(output_file)

        base_files.sort()
        llm_files.sort()

        return (base_files, llm_files)

    def load_execution_results(
        self,
        cluster_name: str,
        test_type: str = 'both'
    ) -> List[ExecutionEntry]:
        """
        Load execution results for a cluster

        Args:
            cluster_name: Name of the cluster
            test_type: 'base', 'llm', or 'both'

        Returns:
            List of ExecutionEntry objects
        """
        entries = []

        base_files, llm_files = self.find_execution_files(cluster_name)

        if test_type in ['base', 'both']:
            for base_file in base_files:
                base_entries = self._load_base_execution_file(base_file, cluster_name)
                entries.extend(base_entries)

        if test_type in ['llm', 'both']:
            for llm_file in llm_files:
                llm_entries = self._load_llm_execution_file(llm_file, cluster_name)
                entries.extend(llm_entries)

        logger.info(f"Loaded {len(entries)} execution entries for cluster {cluster_name}")
        return entries

    def _load_base_execution_file(
        self,
        file_path: Path,
        cluster_name: str
    ) -> List[ExecutionEntry]:
        """Load base execution file"""
        entries = []

        data = general_utils.read_json(file_path)
        if not data or 'results' not in data:
            logger.warning(f"Invalid base execution file: {file_path.name}")
            return entries

        # Parse filename for metadata
        parsed = self.parser.parse_output_filename(file_path.name)
        exec_number = parsed['exec_number']

        results = data.get('results', {})

        for language, lang_entries in results.items():
            if not isinstance(lang_entries, list):
                continue

            for entry_data in lang_entries:
                entry = self._create_execution_entry(
                    entry_data=entry_data,
                    cluster_name=cluster_name,
                    language=language,
                    test_type='base',
                    exec_number=exec_number,
                    prompt_version=None,
                    llm_type=None
                )
                if entry:
                    entries.append(entry)

        return entries

    def _load_llm_execution_file(
        self,
        file_path: Path,
        cluster_name: str
    ) -> List[ExecutionEntry]:
        """Load LLM execution file"""
        entries = []

        data = general_utils.read_json(file_path)
        if not data or 'results' not in data:
            logger.warning(f"Invalid LLM execution file: {file_path.name}")
            return entries

        # Parse filename for metadata
        parsed = self.parser.parse_output_filename(file_path.name)
        exec_number = parsed['exec_number']
        prompt_version = parsed['prompt_version']

        results = data.get('results', {})

        for language, lang_entries in results.items():
            if not isinstance(lang_entries, list):
                continue

            for entry_data in lang_entries:
                # LLM entries have LLM_results array
                llm_results = entry_data.get('LLM_results', [])

                for llm_result in llm_results:
                    # Extract LLM type from path
                    llm_path = llm_result.get('path', '')
                    llm_type = self.parser.extract_llm_type_from_path(llm_path)

                    entry = self._create_execution_entry(
                        entry_data=llm_result,
                        cluster_name=cluster_name,
                        language=language,
                        test_type='llm',
                        exec_number=exec_number,
                        prompt_version=prompt_version,
                        llm_type=llm_type,
                        base_entry_data=entry_data  # For additional context
                    )
                    if entry:
                        entries.append(entry)

        return entries

    def _create_execution_entry(
        self,
        entry_data: Dict,
        cluster_name: str,
        language: str,
        test_type: str,
        exec_number: int,
        prompt_version: Optional[int],
        llm_type: Optional[str],
        base_entry_data: Optional[Dict] = None
    ) -> Optional[ExecutionEntry]:
        """Create ExecutionEntry from data"""

        try:
            # Get entry ID
            if test_type == 'llm' and base_entry_data:
                entry_id = base_entry_data.get('id', 'unknown')
                filename = base_entry_data.get('filename', 'unknown')
            else:
                entry_id = entry_data.get('id', 'unknown')
                filename = entry_data.get('filename', 'unknown')

            # Extract metrics and normalize to float
            execution_time_ms = self._safe_float(entry_data.get('execution_time_ms'))
            cpu_usage = self._safe_float(entry_data.get('CPU_usage'))
            ram_usage = self._safe_float(entry_data.get('RAM_usage'))
            regression_test_passed = entry_data.get('regressionTestPassed')

            # Extract error information
            success = entry_data.get('success')
            error_message = entry_data.get('error_message')
            log_path_str = entry_data.get('log_path') or entry_data.get('log')

            log_path = Path(log_path_str) if log_path_str else None

            # Extract paths
            code_path_str = entry_data.get('path')
            code_path = Path(code_path_str) if code_path_str else None

            # Normalize language
            language = self.parser.normalize_language_name(language)

            return ExecutionEntry(
                id=entry_id,
                cluster_name=cluster_name,
                language=language,
                filename=filename,
                test_type=test_type,
                exec_number=exec_number,
                prompt_version=prompt_version,
                llm_type=llm_type,
                execution_time_ms=execution_time_ms,
                cpu_usage=cpu_usage,
                ram_usage=ram_usage,
                regression_test_passed=regression_test_passed,
                success=success,
                error_message=error_message,
                log_path=log_path,
                code_path=code_path
            )

        except Exception as e:
            logger.error(f"Error creating ExecutionEntry: {e}")
            return None

    def load_log_file(self, log_path: Path) -> Optional[str]:
        """
        Load log file content

        Args:
            log_path: Path to log file

        Returns:
            Log content or None if error
        """
        if not log_path or not log_path.exists():
            return None

        try:
            # Check file size
            file_size_mb = log_path.stat().st_size / (1024 * 1024)
            if file_size_mb > self.config.max_log_size_mb:
                logger.warning(
                    f"Log file too large ({file_size_mb:.1f}MB): {log_path.name}"
                )
                return None

            with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()

        except Exception as e:
            logger.error(f"Error reading log file {log_path}: {e}")
            return None

    def get_cluster_entry_count(self, cluster_name: str) -> Dict[str, int]:
        """
        Get count of entries in a cluster

        Args:
            cluster_name: Name of the cluster

        Returns:
            Dictionary with counts by language
        """
        metadata = self.load_cluster_metadata(cluster_name)
        if not metadata:
            return {}

        counts = {}
        for language, entries in metadata.items():
            if isinstance(entries, list):
                counts[language] = len(entries)

        return counts
