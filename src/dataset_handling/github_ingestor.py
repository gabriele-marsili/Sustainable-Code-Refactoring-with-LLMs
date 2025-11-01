"""
GitHub Ingestor for C/C++ Exercism Solutions

This module automates the ingestion of C and C++ code-test pairs from GitHub repositories
containing Exercism solutions. It validates completeness (source, tests, headers, build files),
avoids duplicates, and integrates entries into the project's dataset and cluster structure.

Author: AI Engineer for Sustainable Code Refactoring with LLMs
"""

import requests
import json
import logging
import time
import base64
from pathlib import Path
from typing import List, Dict, Optional, Set, Tuple
from dataclasses import dataclass
from datetime import datetime
import sys
import os

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

from utility_dir.utility_paths import (
    DATASET_DIR,
    CLUSTERS_DIR_FILEPATH,
    SRC_DIR
)
from utility_dir.general_utils import (
    read_json,
    write_json,
    load_github_token,
    RateLimiter
)


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class ExercismEntry:
    """Represents a validated Exercism exercise entry"""
    repo_name: str
    repo_owner: str
    exercise_name: str
    language: str  # 'c' or 'cpp'
    source_files: List[Dict]  # List of source file metadata from GitHub API
    test_files: List[Dict]  # List of test file metadata
    header_files: List[Dict]  # List of header files (.h)
    build_files: List[Dict]  # Makefile or CMakeLists.txt
    license_type: str = "Unknown"

    def get_unique_id(self) -> str:
        """Generate unique ID for this entry"""
        return f"{self.language}_{self.exercise_name}_{self.repo_owner}"


class GitHubAPIClient:
    """Handles GitHub API interactions with rate limiting and authentication"""

    def __init__(self, token: Optional[str] = None):
        self.token = token
        self.session = requests.Session()
        self.rate_limiter = RateLimiter(max_requests=50, time_window=60)

        # Set up headers
        self.headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Sustainable-Code-Refactoring-LLM-Research'
        }
        if self.token:
            self.headers['Authorization'] = f'token {self.token}'
            logger.info("GitHub API client initialized with authentication token")
        else:
            logger.warning("GitHub API client initialized WITHOUT token - rate limits will be strict")

    def search_repositories(self, query: str, language: str, per_page: int = 30) -> List[Dict]:
        """
        Search GitHub repositories

        Args:
            query: Search query string
            language: Programming language filter
            per_page: Results per page (max 100)

        Returns:
            List of repository metadata dictionaries
        """
        self.rate_limiter.wait_if_needed()

        url = "https://api.github.com/search/repositories"
        params = {
            'q': f'{query} language:{language}',
            'sort': 'stars',
            'order': 'desc',
            'per_page': min(per_page, 100)
        }

        try:
            response = self.session.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            data = response.json()
            logger.info(f"Found {data.get('total_count', 0)} repositories matching query")
            return data.get('items', [])
        except requests.RequestException as e:
            logger.error(f"Error searching repositories: {e}")
            return []

    def get_repo_contents(self, owner: str, repo: str, path: str = "") -> List[Dict]:
        """
        Get contents of a repository directory

        Args:
            owner: Repository owner
            repo: Repository name
            path: Path within repository

        Returns:
            List of file/directory metadata
        """
        self.rate_limiter.wait_if_needed()

        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

        try:
            response = self.session.get(url, headers=self.headers)
            if response.status_code == 404:
                logger.debug(f"Path not found: {path} in {owner}/{repo}")
                return []
            response.raise_for_status()
            return response.json() if isinstance(response.json(), list) else []
        except requests.RequestException as e:
            logger.error(f"Error getting repo contents: {e}")
            return []

    def get_file_content(self, owner: str, repo: str, file_path: str) -> Optional[str]:
        """
        Download file content from GitHub

        Args:
            owner: Repository owner
            repo: Repository name
            file_path: Path to file in repository

        Returns:
            File content as string, or None if error
        """
        self.rate_limiter.wait_if_needed()

        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"

        try:
            response = self.session.get(url, headers=self.headers)
            if response.status_code == 404:
                return None
            response.raise_for_status()

            data = response.json()
            if data.get('encoding') == 'base64':
                content = base64.b64decode(data['content']).decode('utf-8', errors='ignore')
                return content
            return data.get('content', '')
        except Exception as e:
            logger.error(f"Error getting file content {file_path}: {e}")
            return None


class ExercismValidator:
    """Validates C/C++ Exercism entries for completeness"""

    @staticmethod
    def is_source_file(filename: str, language: str) -> bool:
        """Check if file is a source code file"""
        if language == 'c':
            return filename.endswith('.c') and 'test' not in filename.lower()
        elif language == 'cpp':
            return filename.endswith('.cpp') and 'test' not in filename.lower()
        return False

    @staticmethod
    def is_test_file(filename: str, language: str) -> bool:
        """Check if file is a test file"""
        if language == 'c':
            return filename.endswith('.c') and 'test' in filename.lower()
        elif language == 'cpp':
            return (filename.endswith('.cpp') or filename.endswith('.cc')) and 'test' in filename.lower()
        return False

    @staticmethod
    def is_header_file(filename: str) -> bool:
        """Check if file is a header file"""
        return filename.endswith('.h') or filename.endswith('.hpp')

    @staticmethod
    def is_build_file(filename: str) -> bool:
        """Check if file is a build configuration file"""
        return filename.lower() in ['makefile', 'cmakelists.txt']

    @staticmethod
    def validate_entry(files: List[Dict], language: str) -> Tuple[bool, Dict]:
        """
        Validate that an exercise directory has all required files

        Args:
            files: List of file metadata from GitHub API
            language: 'c' or 'cpp'

        Returns:
            (is_valid, categorized_files) where categorized_files contains:
                - source_files: list
                - test_files: list
                - header_files: list
                - build_files: list
        """
        categorized = {
            'source_files': [],
            'test_files': [],
            'header_files': [],
            'build_files': []
        }

        for file_meta in files:
            if file_meta.get('type') != 'file':
                continue

            filename = file_meta.get('name', '')

            if ExercismValidator.is_source_file(filename, language):
                categorized['source_files'].append(file_meta)
            elif ExercismValidator.is_test_file(filename, language):
                categorized['test_files'].append(file_meta)
            elif ExercismValidator.is_header_file(filename):
                categorized['header_files'].append(file_meta)
            elif ExercismValidator.is_build_file(filename):
                categorized['build_files'].append(file_meta)

        # Validation rules
        has_source = len(categorized['source_files']) > 0
        has_tests = len(categorized['test_files']) > 0
        has_build = len(categorized['build_files']) > 0

        is_valid = has_source and has_tests and has_build

        if not is_valid:
            missing = []
            if not has_source:
                missing.append("source files")
            if not has_tests:
                missing.append("test files")
            if not has_build:
                missing.append("build files (Makefile/CMakeLists.txt)")
            logger.debug(f"Entry invalid - missing: {', '.join(missing)}")

        return is_valid, categorized


class DuplicateChecker:
    """Checks for duplicate entries in existing clusters"""

    def __init__(self, clusters_dir: Path):
        self.clusters_dir = clusters_dir
        self.existing_entries: Set[str] = set()
        self._load_existing_entries()

    def _load_existing_entries(self):
        """Load all existing entries from cluster files"""
        cluster_files = list(self.clusters_dir.glob("cluster_*.json"))
        logger.info(f"Loading existing entries from {len(cluster_files)} cluster files...")

        for cluster_file in cluster_files:
            if "debug" in cluster_file.name or "bad_entries" in cluster_file.name:
                continue

            try:
                cluster_data = read_json(cluster_file)
                for language, entries in cluster_data.items():
                    if language in ['c', 'cpp']:
                        for entry in entries:
                            # Create entry identifier
                            entry_id = entry.get('id', '')
                            source = entry.get('source', '')
                            exercise_name = entry.get('filename', '').replace('.c', '').replace('.cpp', '')

                            # Add multiple identifiers to catch duplicates
                            self.existing_entries.add(entry_id)
                            self.existing_entries.add(f"{language}_{exercise_name}_{source}")
            except Exception as e:
                logger.warning(f"Error reading cluster file {cluster_file}: {e}")

        logger.info(f"Loaded {len(self.existing_entries)} existing C/C++ entries")

    def is_duplicate(self, entry: ExercismEntry) -> bool:
        """Check if entry already exists"""
        entry_id = entry.get_unique_id()
        return entry_id in self.existing_entries


class GitHubIngestor:
    """Main ingestor class - orchestrates the entire process"""

    def __init__(self, dataset_dir: Path, clusters_dir: Path, github_token: Optional[str] = None):
        self.dataset_dir = dataset_dir
        self.clusters_dir = clusters_dir
        self.api_client = GitHubAPIClient(github_token)
        self.validator = ExercismValidator()
        self.duplicate_checker = DuplicateChecker(clusters_dir)
        self.ingested_count = {'c': 0, 'cpp': 0}

    def search_exercism_repos(self, language: str, max_repos: int = 20) -> List[Dict]:
        """
        Search for Exercism repositories for a specific language

        Args:
            language: 'c' or 'cpp'
            max_repos: Maximum repositories to search

        Returns:
            List of repository metadata
        """
        search_lang = 'c' if language == 'c' else 'c++'
        query = f"exercism {search_lang}"

        logger.info(f"Searching for Exercism {language.upper()} repositories...")
        repos = self.api_client.search_repositories(query, search_lang, per_page=max_repos)

        # Filter for repos that likely contain exercism solutions
        filtered_repos = []
        for repo in repos:
            repo_name = repo.get('name', '').lower()
            repo_desc = repo.get('description', '').lower() if repo.get('description') else ''

            if 'exercism' in repo_name or 'exercism' in repo_desc:
                filtered_repos.append(repo)

        logger.info(f"Found {len(filtered_repos)} relevant Exercism repositories")
        return filtered_repos

    def explore_repo_for_exercises(self, repo: Dict, language: str) -> List[ExercismEntry]:
        """
        Explore repository structure to find valid Exercism exercises

        Args:
            repo: Repository metadata from GitHub API
            language: 'c' or 'cpp'

        Returns:
            List of validated ExercismEntry objects
        """
        owner = repo['owner']['login']
        repo_name = repo['name']
        valid_entries = []

        logger.info(f"Exploring {owner}/{repo_name} for {language.upper()} exercises...")

        # Common Exercism repo structures
        possible_paths = [
            f"{language}",
            f"exercism/{language}",
            f"{language}/exercises",
            ""  # Root level
        ]

        for base_path in possible_paths:
            contents = self.api_client.get_repo_contents(owner, repo_name, base_path)

            if not contents:
                continue

            # Look for exercise directories
            for item in contents:
                if item.get('type') != 'dir':
                    continue

                exercise_name = item['name']
                exercise_path = item['path']

                # Skip non-exercise directories
                if exercise_name.startswith('.') or exercise_name in ['build', 'bin', 'obj', 'test', 'tests']:
                    continue

                logger.debug(f"  Checking exercise: {exercise_name}")

                # Get exercise directory contents
                exercise_files = self.api_client.get_repo_contents(owner, repo_name, exercise_path)

                # Validate exercise
                is_valid, categorized = self.validator.validate_entry(exercise_files, language)

                if is_valid:
                    entry = ExercismEntry(
                        repo_name=repo_name,
                        repo_owner=owner,
                        exercise_name=exercise_name,
                        language=language,
                        source_files=categorized['source_files'],
                        test_files=categorized['test_files'],
                        header_files=categorized['header_files'],
                        build_files=categorized['build_files'],
                        license_type=repo.get('license', {}).get('name', 'Unknown') if repo.get('license') else 'Unknown'
                    )

                    # Check for duplicates
                    if not self.duplicate_checker.is_duplicate(entry):
                        valid_entries.append(entry)
                        logger.info(f"    ✓ Valid entry found: {exercise_name}")
                    else:
                        logger.debug(f"    ✗ Duplicate skipped: {exercise_name}")

        return valid_entries

    def download_and_save_entry(self, entry: ExercismEntry) -> bool:
        """
        Download entry files and save to dataset structure

        Args:
            entry: ExercismEntry object

        Returns:
            True if successful, False otherwise
        """
        # Create directory structure: src/dataset/{language}/{exercise}_{source}/
        source_clean = entry.repo_owner.replace(" ", "_").replace("(", "").replace(")", "")
        entry_dir_name = f"{entry.exercise_name}_exercism-{source_clean}"
        entry_base_dir = self.dataset_dir / entry.language / entry_dir_name

        src_dir = entry_base_dir / "src"
        test_dir = entry_base_dir / "test"

        try:
            # Create directories
            src_dir.mkdir(parents=True, exist_ok=True)
            test_dir.mkdir(parents=True, exist_ok=True)

            logger.info(f"Downloading files for {entry.exercise_name}...")

            # Download source files and their headers to src/
            for file_meta in entry.source_files + entry.header_files:
                content = self.api_client.get_file_content(
                    entry.repo_owner,
                    entry.repo_name,
                    file_meta['path']
                )
                if content is None:
                    logger.error(f"  Failed to download {file_meta['name']}")
                    return False

                file_path = src_dir / file_meta['name']
                file_path.write_text(content, encoding='utf-8')
                logger.debug(f"  ✓ {file_meta['name']} → src/")

            # Download test files to test/
            for file_meta in entry.test_files:
                content = self.api_client.get_file_content(
                    entry.repo_owner,
                    entry.repo_name,
                    file_meta['path']
                )
                if content is None:
                    logger.error(f"  Failed to download {file_meta['name']}")
                    return False

                file_path = test_dir / file_meta['name']
                file_path.write_text(content, encoding='utf-8')
                logger.debug(f"  ✓ {file_meta['name']} → test/")

            # Check if test directory needs header files (unity.h, catch.hpp, etc.)
            # These are often in the test directory on Exercism
            test_headers = [f for f in entry.header_files if 'test' in f.get('path', '').lower() or
                           'unity' in f.get('name', '').lower() or
                           'catch' in f.get('name', '').lower()]

            for file_meta in test_headers:
                content = self.api_client.get_file_content(
                    entry.repo_owner,
                    entry.repo_name,
                    file_meta['path']
                )
                if content:
                    file_path = test_dir / file_meta['name']
                    file_path.write_text(content, encoding='utf-8')
                    logger.debug(f"  ✓ {file_meta['name']} → test/")

            # Download build files to root of entry directory
            for file_meta in entry.build_files:
                content = self.api_client.get_file_content(
                    entry.repo_owner,
                    entry.repo_name,
                    file_meta['path']
                )
                if content is None:
                    logger.error(f"  Failed to download {file_meta['name']}")
                    return False

                file_path = entry_base_dir / file_meta['name']
                file_path.write_text(content, encoding='utf-8')
                logger.debug(f"  ✓ {file_meta['name']} → ./")

            logger.info(f"✓ Successfully saved all files for {entry.exercise_name}")
            return True

        except Exception as e:
            logger.error(f"Error saving entry {entry.exercise_name}: {e}")
            # Cleanup on failure
            if entry_base_dir.exists():
                import shutil
                shutil.rmtree(entry_base_dir, ignore_errors=True)
            return False

    def update_cluster_json(self, entry: ExercismEntry, entry_dir_name: str) -> bool:
        """
        Update or create cluster JSON file for the exercise

        Args:
            entry: ExercismEntry object
            entry_dir_name: Name of the directory where files were saved

        Returns:
            True if successful, False otherwise
        """
        cluster_name = entry.exercise_name.lower().replace("-", "_").replace(" ", "_")
        cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"

        try:
            # Load existing cluster or create new
            if cluster_file.exists():
                cluster_data = read_json(cluster_file)
            else:
                cluster_data = {}

            # Ensure language key exists
            if entry.language not in cluster_data:
                cluster_data[entry.language] = []

            # Create new entry metadata
            source_clean = entry.repo_owner.replace(" ", "_").replace("(", "").replace(")", "")

            # Find main source file
            main_source_file = entry.source_files[0] if entry.source_files else None
            main_test_file = entry.test_files[0] if entry.test_files else None

            if not main_source_file or not main_test_file:
                logger.error(f"Missing source or test file for {entry.exercise_name}")
                return False

            # Count characters and words
            content = self.api_client.get_file_content(
                entry.repo_owner,
                entry.repo_name,
                main_source_file['path']
            )
            char_count = len(content) if content else 0
            word_count = len(content.split()) if content else 0

            # Reject entries with empty source files
            if char_count == 0:
                logger.error(f"Source file is empty for {entry.exercise_name}. Skipping.")
                return False

            new_entry = {
                "id": entry.get_unique_id(),
                "filename": main_source_file['name'],
                "language": entry.language,
                "source": f"exercism-{source_clean}",
                "codeSnippetFilePath": f"{entry.language}/{entry_dir_name}/src",
                "testUnitFilePath": f"{entry.language}/{entry_dir_name}/test",
                "downloadDate": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "characterQuantity": char_count,
                "wordQuantity": word_count,
                "licenseType": entry.license_type,
                "LLMs": []
            }

            # Add to cluster
            cluster_data[entry.language].append(new_entry)

            # Save cluster file
            write_json(cluster_file, cluster_data)
            logger.info(f"✓ Updated cluster file: {cluster_file.name}")

            return True

        except Exception as e:
            logger.error(f"Error updating cluster JSON for {entry.exercise_name}: {e}")
            return False

    def ingest_entries(self, language: str, max_repos: int = 10, max_entries_per_lang: int = 20) -> int:
        """
        Main ingestion workflow for a language

        Args:
            language: 'c' or 'cpp'
            max_repos: Maximum repositories to search
            max_entries_per_lang: Maximum entries to ingest per language

        Returns:
            Number of entries successfully ingested
        """
        logger.info(f"\n{'='*60}")
        logger.info(f"Starting ingestion for {language.upper()}")
        logger.info(f"{'='*60}\n")

        # Search repositories
        repos = self.search_exercism_repos(language, max_repos)

        if not repos:
            logger.warning(f"No repositories found for {language}")
            return 0

        ingested = 0

        # Process each repository
        for repo in repos:
            if ingested >= max_entries_per_lang:
                logger.info(f"Reached maximum entries limit ({max_entries_per_lang}) for {language}")
                break

            # Find valid exercises in repo
            valid_entries = self.explore_repo_for_exercises(repo, language)

            # Process each valid entry
            for entry in valid_entries:
                if ingested >= max_entries_per_lang:
                    break

                # Download and save
                source_clean = entry.repo_owner.replace(" ", "_").replace("(", "").replace(")", "")
                entry_dir_name = f"{entry.exercise_name}_exercism-{source_clean}"

                if self.download_and_save_entry(entry):
                    # Update cluster
                    if self.update_cluster_json(entry, entry_dir_name):
                        ingested += 1
                        self.ingested_count[language] += 1
                        logger.info(f"✅ Successfully ingested: {entry.exercise_name} ({ingested}/{max_entries_per_lang})")
                    else:
                        logger.warning(f"⚠️  Downloaded but failed to update cluster for: {entry.exercise_name}")
                else:
                    logger.error(f"❌ Failed to download: {entry.exercise_name}")

                # Small delay between entries
                time.sleep(1)

        logger.info(f"\n{'='*60}")
        logger.info(f"Ingestion complete for {language.upper()}: {ingested} new entries added")
        logger.info(f"{'='*60}\n")

        return ingested

    def run(self, languages: List[str] = ['c', 'cpp'], max_repos: int = 10, max_entries: int = 20):
        """
        Run the complete ingestion process

        Args:
            languages: List of languages to process
            max_repos: Maximum repositories per language
            max_entries: Maximum entries per language
        """
        logger.info("="*60)
        logger.info("GitHub Ingestor for C/C++ Exercism Solutions")
        logger.info("="*60)

        total_ingested = 0

        for lang in languages:
            if lang not in ['c', 'cpp']:
                logger.warning(f"Unsupported language: {lang}. Skipping.")
                continue

            count = self.ingest_entries(lang, max_repos, max_entries)
            total_ingested += count

        # Final summary
        logger.info("\n" + "="*60)
        logger.info("INGESTION SUMMARY")
        logger.info("="*60)
        logger.info(f"Total new entries ingested: {total_ingested}")
        logger.info(f"  - C:   {self.ingested_count.get('c', 0)}")
        logger.info(f"  - C++: {self.ingested_count.get('cpp', 0)}")
        logger.info("="*60)


def main():
    """Main entry point"""
    import argparse

    parser = argparse.ArgumentParser(
        description='GitHub Ingestor for C/C++ Exercism Solutions'
    )
    parser.add_argument(
        '--languages',
        nargs='+',
        choices=['c', 'cpp'],
        default=['c', 'cpp'],
        help='Languages to process (default: c cpp)'
    )
    parser.add_argument(
        '--max-repos',
        type=int,
        default=10,
        help='Maximum repositories to search per language (default: 10)'
    )
    parser.add_argument(
        '--max-entries',
        type=int,
        default=20,
        help='Maximum entries to ingest per language (default: 20)'
    )
    parser.add_argument(
        '--token',
        type=str,
        help='GitHub API token (optional, will try to load from .github_token if not provided)'
    )

    args = parser.parse_args()

    # Get GitHub token
    token = args.token
    if not token:
        token = load_github_token()
        if not token:
            logger.warning("No GitHub token provided. API rate limits will be strict (60 requests/hour)")
            response = input("Continue without token? (y/n): ")
            if response.lower() != 'y':
                logger.info("Exiting...")
                return

    # Initialize ingestor
    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Run ingestion
    ingestor.run(
        languages=args.languages,
        max_repos=args.max_repos,
        max_entries=args.max_entries
    )


if __name__ == "__main__":
    main()