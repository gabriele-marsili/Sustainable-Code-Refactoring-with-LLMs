#!/usr/bin/env python3
"""
Exercism Dataset Updater
Scrapes Exercism exercises from GitHub and updates the dataset with new entries.
"""

import os
import sys


import json
import os
import re
import requests
import shutil
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Set
from dataclasses import dataclass
import logging

from dotenv import load_dotenv




@dataclass
class ExerciseEntry:
    """Data class representing an exercise entry in the dataset."""
    id: str
    filename: str
    language: str
    source: str
    code_snippet_file_path: str
    test_unit_file_path: str
    license_type: str
    download_date: str
    character_quantity: int
    word_quantity: int


class GitHubAPI:
    """GitHub API client for fetching Exercism exercises."""
    
    BASE_URL = "https://api.github.com"
    RAW_URL = "https://raw.githubusercontent.com"
    
    def __init__(self, token: Optional[str] = None):
        self.session = requests.Session()
        print(f"token = {token}")
        if token:
            self.session.headers.update({"Authorization": f"token {token}"})
        
        self.session.headers.update({"User-Agent": "Awesome-Octocat-App"})
        # Rate limiting
        self.last_request_time = 0
        self.min_request_interval = 1.0  # 1 second between requests
    
    def _rate_limit(self):
        """Implement rate limiting to avoid hitting GitHub API limits."""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        if time_since_last < self.min_request_interval:
            time.sleep(self.min_request_interval - time_since_last)
        self.last_request_time = time.time()
    
    def getLicense(self, repo_full_name:str)->str:
        url = f"{self.BASE_URL}/repos/{repo_full_name}"
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            json_data = response.json()[0] if isinstance(response.json(), list) else response.json()

            if json_data['license'] is None or json_data['license'] == "null" : return "None"
            return json_data['license']
        except requests.RequestException as e:
            logging.error(f"Error getting License:\n{e}")
            return "None"

    
    def search_repositories(self, language: str, exercise: str) -> List[Dict]:
        """Search for repositories containing the exercise for a specific language."""
        self._rate_limit()
        
        query = f"exercism {language} {exercise} in:name,description"
        url = f"{self.BASE_URL}/search/repositories"
        params = {
            "q": query,
            "sort": "stars",
            "order": "desc",
            "per_page": 10
        }
        
        try:
            response = self.session.get(url, params=params, timeout=30)
            response.raise_for_status()
            return response.json().get("items", [])
        except requests.RequestException as e:
            logging.error(f"Error searching repositories: {e}")
            return []
    
    def get_repository_contents(self, repo_full_name: str, path: str = "") -> List[Dict]:
        """Get contents of a repository at a specific path."""
        self._rate_limit()
        
        url = f"{self.BASE_URL}/repos/{repo_full_name}/contents/{path}"
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return response.json() if isinstance(response.json(), list) else [response.json()]
        except requests.RequestException as e:
            logging.error(f"Error getting repository contents: {e}")
            return []
    
    def download_file(self, download_url: str) -> Optional[str]:
        """Download a file from a GitHub repository."""
        self._rate_limit()
        
        
        
        try:
            response = self.session.get(download_url, timeout=30)            
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logging.error(f"Error downloading file by url {download_url}: {e}")
            return None


class ExercismDatasetUpdater:
    """Main class for updating the Exercism dataset."""
    
    # Language-specific file patterns
    LANGUAGE_PATTERNS = {
        "java": {
            "main_file": r"\.java$",
            "test_file": r"Test\.java$",
            "exclude_patterns": [r"Example\.java$", r"\.class$"]
        },
        "cpp": {
            "main_file": r"\.(cpp|cc|cxx)$",
            "header_file": r"\.(h|hpp)$",
            "test_file": r"test.*\.(cpp|cc|cxx)$",
            "exclude_patterns": [r"example\.", r"\.o$", r"\.exe$"]
        }
    }
    
    def __init__(self, dataset_path: Path = Path("../../src/dataset"), github_token: Optional[str] = None):
        dataset_dir = Path(__file__).resolve().parent.parent / "dataset"
        self.dataset_path = dataset_dir
        print(f"self.dataset_path = {self.dataset_path}")
        self.github = GitHubAPI(github_token)
        self.dataset_json_path = dataset_dir / "dataset.json"
        print(f"self.dataset_json_path = {self.dataset_json_path}")
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def load_existing_dataset(self) -> Dict:
        """Load the existing dataset.json file."""
        if not self.dataset_json_path.exists():
            return {}
        
        try:
            with open(self.dataset_json_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            self.logger.error(f"Error loading dataset.json: {e}")
            return {}
    
    def save_dataset(self, dataset: Dict):
        """Save the updated dataset to dataset.json."""
        try:
            with open(self.dataset_json_path, 'w', encoding='utf-8') as f:
                json.dump(dataset, f, indent=2, ensure_ascii=False)
            self.logger.info("Dataset saved successfully")
        except IOError as e:
            self.logger.error(f"Error saving dataset.json: {e}")
    
    def is_exercise_exists(self, dataset: Dict, language: str, exercise: str, source: str) -> bool:
        """Check if an exercise already exists in the dataset."""
        if language not in dataset:
            return False
        
        for entry in dataset[language]:
            entry_id_parts = entry.get("id", "").lower().split("_")
            if (exercise.lower().replace("-", "_") in entry_id_parts and 
                source.lower() in entry.get("source", "").lower()):
                return True
        
        return False
    
    def extract_exercise_files(self, repo_contents: List[Dict], language: str, exercise: str, repo_full_name) -> Tuple[List[Dict], List[Dict]]:
        """Extract main and test files from repository contents."""
        patterns = self.LANGUAGE_PATTERNS.get(language, {})
        main_files = []
        test_files = []
        
        for item in repo_contents:
            if item.get("type") != "file":
                if item['type'] == "dir" : 
                    subdir_path = item['path'] 
                    subcontents = self.github.get_repository_contents(repo_full_name,subdir_path)
                    if not subcontents:
                        continue
            
                    sub_main_files, sub_test_files =  self.extract_exercise_files(subcontents, language, exercise,repo_full_name)                                    
                    main_files += sub_main_files
                    test_files += sub_test_files
                    
                else:
                    continue
            
            filename = item.get("name", "")
            
            # Skip excluded patterns
            if any(re.search(pattern, filename, re.IGNORECASE) 
                   for pattern in patterns.get("exclude_patterns", [])):
                continue
            
            #item type == file !
            
            # Check for test files first (more specific)
            if re.search(patterns.get("test_file", ""), filename, re.IGNORECASE) or "/test" in item['path']:
                test_files.append(item)
            
            # Check for main files
            elif re.search(patterns.get("main_file", ""), filename, re.IGNORECASE):
                main_files.append(item)
            
            # For C++, also check for header files
            elif language == "cpp" and re.search(patterns.get("header_file", ""), filename, re.IGNORECASE):
                main_files.append(item)
        
        return main_files, test_files
    
    def find_exercise_in_repo(self, repo: Dict, language: str, exercise: str) -> Optional[Tuple[str, List[Dict], List[Dict]]]:
        """Find exercise files in a repository."""
        repo_full_name = repo["full_name"]
        
        # Common paths where exercises might be located
        search_paths = [
            "",  # Root
            "src",            
            "test",            
            exercise,
            f"{language}/{exercise}",
            f"exercises/{exercise}",
            f"exercises/{language}/{exercise}",
            f"src/{exercise}",
            f"{exercise}/src"
        ]
        
        for path in search_paths:
            print(f"path = {path}")
            contents = self.github.get_repository_contents(repo_full_name, path)
            if not contents:
                continue
            
            main_files, test_files = self.extract_exercise_files(contents, language, exercise,repo_full_name)
            
            if main_files and test_files:
                return path, main_files, test_files
            
            # If no files found at current level, check subdirectories
            for item in contents:
                if item.get("type") == "dir":
                    subdir_path = f"{path}/{item['path']}" if path else item["path"]
                    print(f"subdir_path = {subdir_path}")
                    subcontents = self.github.get_repository_contents(repo_full_name, subdir_path)
                    if subcontents:
                        main_files, test_files = self.extract_exercise_files(subcontents, language, exercise,repo_full_name)
                        if main_files and test_files:
                            return subdir_path, main_files, test_files
                        else :
                            for element in subcontents : 
                                if element['type'] == "dir":
                                    sub_sub_dir_path = element['path']
                                    print(f"sub_sub_dir_path = {sub_sub_dir_path}")
                                    sub_subcontents = self.github.get_repository_contents(repo_full_name, sub_sub_dir_path)
                                    if sub_subcontents:
                                        main_files, test_files = self.extract_exercise_files(sub_subcontents, language, exercise,repo_full_name)
                                        if main_files and test_files:
                                            return sub_sub_dir_path, main_files, test_files

        
        return None
    
    def create_exercise_directory(self, language: str, exercise: str, source: str) -> Path:
        """Create the directory structure for an exercise."""
        # Sanitize source name for directory
        source_clean = re.sub(r'[^\w\-_]', '_', source)
        if language == "java" : language = "Java"
        exercise_dir = self.dataset_path / language / f"{exercise}_{source_clean}"
        print(f"exercise_dir = {exercise_dir}")
        if language == "cpp":
            (exercise_dir / "src").mkdir(parents=True, exist_ok=True)
            (exercise_dir / "test").mkdir(parents=True, exist_ok=True)
        else:
            exercise_dir.mkdir(parents=True, exist_ok=True)
        
        return exercise_dir
    
    def download_exercise_files(self, repo_full_name: str, base_path: str, main_files: List[Dict], 
                              test_files: List[Dict], exercise_dir: Path, language: str) -> Tuple[Optional[str], int, int]:
        """Download and save exercise files."""
        main_filename = None
        total_chars = 0
        total_words = 0
        
        # Download main files
        for file_info in main_files:
            if file_info['type'] != "file" : continue
        
            
            download_url = file_info['download_url']
            print(f"download_url:\n{download_url}")
            if file_info['type'] != "file" or download_url == None : continue
            content = self.github.download_file(download_url)
            
            if content is None:
                continue
            
            if language == "cpp":
                save_path = exercise_dir / "src" / file_info['name']
            else:
                save_path = exercise_dir / file_info['name']
            
            with open(save_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # Count characters and words for the main source file
            if not main_filename and re.search(self.LANGUAGE_PATTERNS[language]["main_file"], file_info['name']):
                main_filename = file_info['name']
                total_chars += len(content)
                total_words += len(content.split())
        
        # Download test files
        for file_info in test_files:            
            
            download_url = file_info['download_url']
            print(f"download_url:\n{download_url}")
            if file_info['type'] != "file" or download_url == None : continue
            
            content = self.github.download_file(download_url)
            
            if content is None:
                continue
            
            if language == "cpp":
                save_path = exercise_dir / "test" / file_info['name']
            else:
                save_path = exercise_dir / file_info['name']
            
            with open(save_path, 'w', encoding='utf-8') as f:
                f.write(content)
        
        # Create Makefile for C++ exercises
        if language == "cpp":
            self.create_cpp_makefile(exercise_dir, main_filename)
        
        return main_filename, total_chars, total_words
    
    def create_cpp_makefile(self, exercise_dir: Path, main_filename: str):
        """Create a basic Makefile for C++ exercises."""
        if not main_filename:
            return
        
        executable_name = Path(main_filename).stem
        makefile_content =  """CXX = g++
CXXFLAGS = -std=c++17 -I src -I test -I /usr/local/include -DBOOST_TEST_DYN_LINK
LDFLAGS = -L/usr/local/lib -lboost_unit_test_framework

# Source and test files
SRC_FILES = $(wildcard src/*.cpp)
TEST_FILES = $(wildcard test/*.cpp)

# Object files
SRC_OBJ = $(patsubst src/%.cpp, obj/%.o, $(SRC_FILES))
TEST_OBJ = $(patsubst test/%.cpp, obj/%.o, $(TEST_FILES))

# Eseguibile di test
TARGET = test_exec

# Directory per gli object files
OBJ_DIR = obj

.PHONY: all clean

all: $(TARGET)

# Creazione della directory degli object files se non esiste
$(OBJ_DIR):
	mkdir -p $(OBJ_DIR)

$(TARGET): $(OBJ_DIR) $(SRC_OBJ) $(TEST_OBJ)
	@echo "🧪 Compilando l'eseguibile di test..."
	$(CXX) $(CXXFLAGS) $(SRC_OBJ) $(TEST_OBJ) -o $@ $(LDFLAGS)

$(OBJ_DIR)/%.o: src/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(OBJ_DIR)/%.o: test/%.cpp
	@echo "🔨 Compilando $<..."
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(OBJ_DIR) $(TARGET)
"""

        
        with open(exercise_dir / "Makefile", 'w') as f:
            f.write(makefile_content)
    
    def create_exercise_entry(self, language: str, exercise: str, source: str, 
                            main_filename: str, exercise_dir: Path, 
                            char_count: int, word_count: int,repo_full_name:str) -> ExerciseEntry:
        """Create an ExerciseEntry object."""
        source_clean = re.sub(r'[^\w\-_]', '_', source)
        entry_id = f"{language}_{exercise}_{source_clean}"
        
        if language == "cpp":
            code_path = f"{language}/{exercise_dir.name}/src"
            test_path = f"{language}/{exercise_dir.name}/test"
        else:
            code_path = f"Java/{exercise_dir.name}/"+(main_filename or f"{exercise}.{language}")
            test_path = f"Java/{exercise_dir.name}/"+f"{exercise}Test.{language}"
        
        l_type = "None"
        try:
            l_type = self.github.getLicense(repo_full_name)
        except Exception as e:
            print(f"exception in get l:\n{e}")
        
        return ExerciseEntry(
            id=entry_id,
            filename=main_filename or f"{exercise}.{language}",
            language=language,
            source=f"Exercism ({source})",
            code_snippet_file_path=code_path,
            test_unit_file_path=test_path,
            license_type=l_type,
            download_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            character_quantity=char_count,
            word_quantity=word_count
        )
    
    def process_exercise(self, language: str, exercise: str, dataset: Dict) -> bool:
        """Process a single exercise for a given language."""
        self.logger.info(f"Processing {language}/{exercise}")
        
        # Search for repositories
        repos = self.github.search_repositories(language, exercise)
        
        if not repos:
            self.logger.warning(f"No repositories found for {language}/{exercise}")
            return False
        
        for repo in repos:
            repo_name = repo["full_name"]
            source = repo["owner"]["login"]
            
            # Check if exercise already exists
            if self.is_exercise_exists(dataset, language, exercise, source):
                self.logger.info(f"Exercise {exercise} from {source} already exists, skipping")
                continue
            
            # Find exercise files in repository
            result = self.find_exercise_in_repo(repo, language, exercise)
            if not result:
                self.logger.warning(f"Exercise files not found in {repo_name}")
                continue
            
            base_path, main_files, test_files = result
            
            try:
                # Create directory structure
                exercise_dir = self.create_exercise_directory(language, exercise, source)
                
                # Download files
                main_filename, char_count, word_count = self.download_exercise_files(
                    repo_name, base_path, main_files, test_files, exercise_dir, language
                )
                
                if not main_filename:
                    self.logger.warning(f"No main file found for {exercise}")
                    shutil.rmtree(exercise_dir)
                    continue
                
                # Create entry
                entry = self.create_exercise_entry(
                    language, exercise, source, main_filename, 
                    exercise_dir, char_count, word_count,repo_name
                )
                print("entry created")
                
                # Add to dataset
                if language not in dataset:
                    dataset[language] = []
                
                dataset[language].append(entry.__dict__)
                
                self.logger.info(f"Successfully added {language}/{exercise} from {source}")
                return True
                
            except Exception as e:
                print(f"Error processing {exercise} from {repo_name}:\n{e}")
                if exercise_dir.exists():
                    shutil.rmtree(exercise_dir)
                continue
        
        return False
    
    def update_dataset(self, exercises_to_add: Dict[str, List[str]]):
        """Update the dataset with new exercises."""
        dataset = self.load_existing_dataset()
        
        total_exercises = sum(len(exercises) for exercises in exercises_to_add.values())
        processed = 0
        
        for language, exercises in exercises_to_add.items():
            self.logger.info(f"Processing {len(exercises)} exercises for {language}")
            
            # Remove duplicates while preserving order
            unique_exercises = list(dict.fromkeys(exercises))
            
            for exercise in unique_exercises:
                processed += 1
                self.logger.info(f"Progress: {processed}/{total_exercises}")
                
                try:
                    success = self.process_exercise(language, exercise, dataset)
                    if success:
                        # Save after each successful addition to avoid data loss
                        self.save_dataset(dataset)
                    
                    # Small delay to be respectful to GitHub API
                    time.sleep(2)
                    
                except KeyboardInterrupt:
                    self.logger.info("Process interrupted by user. Saving current progress...")
                    self.save_dataset(dataset)
                    return
                except Exception as e:
                    self.logger.error(f"Unexpected error processing {exercise}: {e}")
                    continue
        
        self.save_dataset(dataset)
        self.logger.info("Dataset update completed!")


def main():
    """Main function to run the dataset updater."""
    # Exercise lists
    exercises_to_add = {
        "java": [
            "anagram", "clock", "grains", "triangle", "etl", "allergies", "matrix", "series",
            "prime_factors", "hexadecimal", "meetup", "sublist", "minesweeper", "wordy",
            "bank-account", "difference-of-squares", "grade-school", "kindergarten-garden",
            "rotational-cipher", "spiral_matrix", "alphametics", "connect", "rectangles",
            "transpose", "react", "difference_of_squares", "hello_world", "phone_number",
            "queen_attack", "rna_transcription", "space_age", "sum_of_multiples", "atbash_cipher",
            "beer_song", "nth_prime", "nucleotide_count", "roman_numerals", "scrabble_score",
            "word_count", "high-scores", "linked-list", "bracket-push", "custom-set",
            "food-chain", "ocr-numbers", "palindrome-products", "pythagorean-triplet",
            "saddle-points", "two-bucket", "run-length-encoding", "beer-song", "flatten-array",
            "list-ops", "secret-handshake", "sum-of-multiples", "binary-search", "circular-buffer",
            "complex-numbers", "queen-attack", "rational-numbers", "word-search", "knapsack",
            "binary_search", "pascals_triangle", "resistor_color", "all_your_base",
            "binary_search_tree", "collatz_conjecture", "largest_series_product", "linked_list",
            "palindrome_products", "perfect_numbers", "robot_simulator", "run_length_encoding",
            "two_fer", "matching_brackets", "circular_buffer", "kindergarten_garden", "list_ops",
            "protein_translation", "resistor_color_duo", "reverse_string", "rotational_cipher",
            "saddle_points", "secret_handshake", "dnd_character"
        ],
        "cpp": [
            "isogram", "luhn", "diamond", "armstrong-numbers", "isbn-verifier", "matrix",
            "phone-number", "robot-name", "scrabble-score", "twelve-days", "two-fer",
            "prime_factors", "diamond", "matrix", "phone-number", "robot-name", "scrabble-score",
            "sublist", "minesweeper", "wordy", "bank-account", "difference-of-squares",
            "grade-school", "kindergarten-garden", "markdown", "protein-translation",
            "rotational-cipher", "word-count", "spiral_matrix", "alphametics", "connect",
            "pascals-triangle", "prime-factors", "rectangles", "rna-transcription",
            "simple-cipher", "transpose", "hello-world", "reverse-string", "space-age",
            "resistor-color-duo", "resistor-color", "spiral-matrix", "roman-numerals",
            "atbash-cipher", "pig-latin", "crypto-square", "octal", "react", "high-scores",
            "linked-list", "bracket-push", "custom-set", "food-chain", "ocr-numbers",
            "palindrome-products", "pythagorean-triplet", "saddle-points", "two-bucket",
            "run-length-encoding", "beer-song", "flatten-array", "list-ops", "secret-handshake",
            "sum-of-multiples", "binary-search", "circular-buffer", "complex-numbers",
            "queen-attack", "rational-numbers", "word-search", "dnd-character", "knapsack",
            "binary_search", "pascals_triangle", "resistor_color", "all_your_base",
            "binary_search_tree", "collatz_conjecture", "largest_series_product", "linked_list",
            "palindrome_products", "perfect_numbers", "robot_simulator", "run_length_encoding",
            "two_fer", "matching_brackets", "circular_buffer", "kindergarten_garden", "list_ops",
            "protein_translation", "resistor_color_duo", "reverse_string", "rotational_cipher",
            "saddle_points", "secret_handshake", "dnd_character"
        ]
    }
    
    # Carica le variabili dal file .env nella directory corrente
    load_dotenv()
    
    # Optional: Set GitHub token for higher rate limits
    github_token = os.getenv("GITHUB_TOKEN")  # Set this environment variable if you have a GitHub token
    
    updater = ExercismDatasetUpdater(
        dataset_path="src/dataset",
        github_token=github_token
    )
    
    # Update dataset
    updater.update_dataset(exercises_to_add)


if __name__ == "__main__":
    main()