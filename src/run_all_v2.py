import json 
import subprocess
import os
import time
from utility_dir import utility_paths
from dataclasses import dataclass, field
from typing import Dict, List, Tuple, Optional
import atexit
import threading
import queue
import concurrent.futures
from pathlib import Path
import logging
from datetime import datetime

# Clusters già processati
clusters_already_processed_base = ['raindrops', 'leap', 'pangram','bob','reverse_all_lists', 'elons_toy_car', 'pig_latin_translator', 'find_el_smaller_left_bigger_right', 'queens_problem', 'three_sum', 'check_if_point_inside_polygon', 'find_two_missing_numbers', 'a0059spiralmatrixii', 'a0094binarytreeinordertraversal', 'the_farm', 'sorting_room', 'a0138copylistwithrandompointer', 'election_day', 'a0152maximumproductsubarray', 'min_cost_coloring', 'a0116populatingnextrightpointersineachnode', 'unique_paths', 'bottle_song', 'container_with_most_water', 'linked_list_cycle', 'valid_parentheses', 'random_sample', 'check_if_two_rectangles_overlap', 'a0201bitwiseandofnumbersrange', 'chaitanas_colossal_coaster', 'a0144binarytreepreordertraversal', 'longest_common_prefix', 'count_divisibles_in_range', 'queen', 'nth_fibonacci_number', 'calculate_area_of_polygon', 'log_levels_alt', 'party_robot', 'meetup_schedule', 'sum_non_adjecent', 'card_games', 'zebra_puzzle', 'dn_dcharacter', 'complex_numbers', 'count_positives', 'a0215kthlargestelementinanarray', 'power_set', 'squeaky_clean', 'need_for_speed', 'rail_fence_cipher', 'a0120triangle', 'census', 'reverse_vowels', 'basic_calculator', 'prime_calculator', 'smallest_multiple', 'a0074search2dmatrix', 'a0055jumpgame', 'blackjack', 'best_time_to_buy_and_sell_stock', 'cars_assemble', 'welcome_to_tech_palace', 'summary_ranges', 'lasagna', 'a0064minimumpathsum', 'min_swaps', 'a0153findminimuminrotatedsortedarray', 'majority_element', 'a0114flattenbinarytreetolinkedlist', 'killer_sudoku_helper', 'a0147insertionsortlist', 'meteorology', 'find_first_missing_positive', 'a0127wordladder', 'ledger', 'a0207courseschedule', 'forth', 'palindrome_integer', 'tournament', 'a0092reverselinkedlistii', 'valid_anagram', 'longest_common_subsequence', 'mixed_juices', 'a0056mergeintervals', 'card_tricks', 'book_store', 'a0109convertsortedlisttobinarysearchtree', 'resistor_color_enum', 'snakes_and_ladders', 'freelancer_rates', 'making_the_grade', 'bowling', 'a0075sortcolors', 'log_levels', 'number_of_islands', 'merge_intervals', 'debug_cpp_entries_1', 'largest_series_product_calculator', 'valid_sudoku', 'longest_palindromic_substring', 'river_sizes', 'a0131palindromepartitioning', 'minimum_window_substring', 'reverse_integer', 'savings_account', 'little_sisters_vocab', 'bank_account_action_invalid_exception', 'error_handling', 'find_peak_element', 'a0001twosum', 'a0162findpeakelement', 'diamond_printer', 'interest_is_interesting', 'swap_first_and_last_word', 'little_sisters_essay', 'two_sum', 'a0151reversewordsinastring', 'a0000blank', 'product_of_array_except_self', 'a0213houserobberii', 'flatten_deep_list', 'lucky_numbers', 'weather_forecast', 'grep', 'secret_handshake', 'merge_sorted_array', 'reverse_string', 'find_one_missing_number', 'evaluate_reverse_polish_notation', 'rotate_array', 'a0089graycode', 'a0133clonegraph', 'postfix_evaluate', 'parsing_log_files', 'change', 'a0143reorderlist', 'a0093restore_ip_addresses', 'bob', 'candy', 'a0062uniquepaths', 'permutation_in_string', 'airport_robot', 'a0199binarytreerightsideview', 'odd_sum', 'bowling_game_log', 'tree_building', 'a0102binarytreelevelordertraversal', 'simple_linked_list', 'ransom_note', 'annalyns_infiltration', 'letter_combinations', 'a0073setmatrixzeros', 'a0098validatebinarysearchtree', 'yacht', 'minimum_absolute_difference_in_bst', 'animal_magic', 'poker', 'climbing_staircase', 'find_busiest_interval', 'a0079wordsearch', 'a0096uniquebinarysearchtrees', 'secrets', 'find_el_where_k_greater_or_equal', 'pangram', 'word_break', 'a0148sortlist', 'encode_and_decode_strings', 'gotta_snatch_em_all', 'a0130surroundedregions', 'paasio', 'find_missing_number_in_second_array', 'ghost_gobble_arcade_game', 'a0071simplitypath', 'a0146lrucache', 'a0086partitionlist', 'pythagorean_triplet', 'sort_rgb_array', 'count_consecutive_sums', 'a0082removeduplicatesfromsortedlistii', 'count_triplets_with_sum_k', 'a0103binarytreezigzaglevelordertraversal', 'a0134gasstation', 'valid_palindrome', 'a0165compareversionnumbers', 'guidos_gorgeous_lasagna', 'a0095uniquebinarysearchtreesii', 'chessboard', 'high_score_board', 'a0200numberofislands', 'logs_logs_logs', 'two_sum_ii_input_array_is_sorted', 'a0105constructbinarytreefrompreorderandinordertraversal', 'state_of_tic_tac_toe', 'a0210coursescheduleii', 'pig_latin', 'sliding_window_maximum', 'a0061rotatelist', 'word_search', 'a0080removeduplicatesfromsortedarrayii', 'longest_increasing_subarray', 'difference_of_squares_calculator', 'power', 'fancy_sequence', 'scale_generator', 'a0179largestnumber', 'a0090subsetsii', 'anagram_indices', 'jedliks_toy_car', 'parallel_letter_frequency', 'armstrong_numbers', 'reverse_ascending_sublists', 'pov', 'a0054spiralmatrix', 'a0142linkedlistcycleii', 'pangram_checker', 'luhn_validator', 'ordered_digits', 'find_min_path', 'set_matrix_zeroes', 'raindrops', 'split_coins', 'crypto_square', 'a0150evaluatereversepolishnotation', 'a0209minimumsizesubarraysum', 'a0208implementtrieprefixtree', 'a0091decodeways', 'a0077combinations', 'captains_log', 'a0129sumroottoleafnumbers', 'a0187repeateddnasequences', 'contains_duplicate', 'protein_translator', 'booking_up_for_beauty', 'find_element_range_sorted_array', 'elons_toys', 'find_unpaired', 'a0216combination_sumiii', 'football_match_reports', 'shuffle_array', 'minimum_size_subarray_sum', 'count_ip_addresses', 'kth_smallest', 'proverb', 'a0211addandsearchworddatastructuredesign', 'a0063uniquepathsii', 'flatten_array', 'min_stack', 'longest_substring_without_repeating_characters', 'currency_exchange', 'optical_character_reader', 'reverse_array', 'diffie_hellman', 'gross_store', 'longest_consecutive_sequence', 'dominoes', 'a0060permutationsequence', 'maximum_depth_of_binary_tree', 'minesweeper_board', 'a0166fractiontorecurringdecimal', 'jump_game', 'variable_length_quantity', 'a0078subsets', 'binary_tree_right_side_view', 'reverse_words_in_sentence', 'a0113pathsumii', 'salary_calculator', 'search_2d_matrix', 'markdown', 'spiral_matrix_builder', 'leap', 'longest_repeating_character_replacement', 'expenses', 'knapsack', 'a0139wordbreak', 'perfect_rectangle', 'twofer', 'resistor_color_trio']
clusters_already_processed_llm = ['raindrops', 'leap', 'pangram','bob','a0098validatebinarysearchtree', 'variable_length_quantity', 'lasagna', 'square_root', 'freelancer_rates', 'raindrops', 'a0093restore_ip_addresses', 'leap', 'a0165compareversionnumbers', 'power', 'rail_fence_cipher', 'valid_anagram', 'queen_attack', 'secrets', 'state_of_tic_tac_toe', 'squeaky_clean', 'a0211addandsearchworddatastructuredesign', 'weather_forecast', 'a0152maximumproductsubarray', 'difference_of_squares', 'find_peak_element', 'binary_tree_right_side_view', 'a0096uniquebinarysearchtrees', 'protein_translator', 'a0216combination_sumiii', 'sort_rgb_array', 'bowling', 'find_missing_number_in_second_array', 'gotta_snatch_em_all', 'merge_sorted_array', 'a0199binarytreerightsideview', 'summary_ranges', 'spiral_traversal', 'candy', 'need_for_speed', 'hamming', 'a0061rotatelist', 'contains_duplicate', 'encode_and_decode_strings', 'longest_palindromic_substring', 'dn_dcharacter', 'a0056mergeintervals', 'a0208implementtrieprefixtree', 'a0146lrucache', 'a0095uniquebinarysearchtreesii', 'a0113pathsumii', 'two_sum_ii_input_array_is_sorted', 'lucky_numbers', 'a0129sumroottoleafnumbers', 'card_tricks', 'scramblies', 'two_sum', 'isogram', 'a0094binarytreeinordertraversal', 'find_el_smaller_left_bigger_right', 'maximum_depth_of_binary_tree', 'pangram', 'nth_prime', 'majority_element', 'salary_calculator', 'atbash_cipher', 'postfix_evaluate', 'a0144binarytreepreordertraversal', 'reverse_string', 'ransom_note', 'proverb', 'log_levels', 'pangram_checker', 'climbing_staircase', 'a0133clonegraph', 'book_store', 'tree_building', 'poker', 'minimum_window_substring', 'annalyns_infiltration', 'collatz_conjecture', 'eliuds_eggs', 'human_readable_numbers.test.js', 'killer_sudoku_helper', 'a0073setmatrixzeros', 'grains', 'reverse_array', 'beer_song', 'gross_store', 'a0151reversewordsinastring', 'bottle_song', 'high_score_board', 'a0090subsetsii', 'a0064minimumpathsum', 'twofer', 'split_coins', 'hashtag_generator', 'a0131palindromepartitioning', 'anagram', 'simple_linked_list', 'all_your_base', 'elons_toys', 'two_fer', 'tournament', 'scale_generator', 'a0109convertsortedlisttobinarysearchtree', 'a0063uniquepathsii', 'evaluate_reverse_polish_notation', 'odd_sum', 'a0086partitionlist', 'bank_account_action_invalid_exception', 'set_matrix_zeroes', 'nth_fibonacci_number', 'clock', 'a0143reorderlist', 'kth_smallest', 'dominoes', 'longest_repeating_character_replacement', 'count_triplets_with_sum_k', 'a0139wordbreak', 'reverse_integer', 'zebra_puzzle', 'luhn_validator', 'perfect_numbers', 'calculate_area_of_polygon', 'chaitanas_colossal_coaster', 'a0162findpeakelement', 'say', 'markdown', 'minimum_size_subarray_sum', 'check_if_point_inside_polygon', 'house', 'forth']

# Enhanced execution status tracking
@dataclass
class ExecutionStatus:
    """Enhanced classe per tracciare lo stato di esecuzione di un cluster"""
    cluster_name: str
    total_executions: int = 0
    correct_executions: int = 0
    incorrect_entries: List[Dict] = field(default_factory=list)
    last_execution_time: Optional[str] = None
    estimated_completion_time: Optional[str] = None
    
    @property
    def completion_percentage(self) -> float:
        return (self.correct_executions / self.total_executions * 100) if self.total_executions > 0 else 0
    
    @property
    def status(self) -> str:
        if self.correct_executions == 0:
            return "not_executed"
        elif self.correct_executions == self.total_executions:
            return "fully_executed"
        else:
            return "partially_executed"
    
    @property
    def error_percentage(self) -> float:
        if not hasattr(self, '_total_entries') or self._total_entries == 0:
            return 0.0
        return (len(self.incorrect_entries) / self._total_entries) * 100


@dataclass
class ContainerManager:
    """Gestisce i container Docker riutilizzabili per linguaggio"""
    active_containers: Dict[str, str] = field(default_factory=dict)
    container_lock: threading.Lock = field(default_factory=threading.Lock)
    container_usage_count: Dict[str, int] = field(default_factory=dict)
    
    def get_or_create_container(self, language: str) -> str:
        """Ottiene un container esistente o ne crea uno nuovo se necessario"""
        with self.container_lock:
            if language in self.active_containers:
                # Incrementa usage counter
                self.container_usage_count[language] = self.container_usage_count.get(language, 0) + 1
                return self.active_containers[language]
            
            # Crea nuovo container
            container_name = f"test_{language.lower()}_shared_{int(time.time())}"
            self.active_containers[language] = container_name
            self.container_usage_count[language] = 1
            return container_name
    
    def cleanup_unused_containers(self, threshold_hours: int = 1):
        """Pulisce container non utilizzati da più di threshold_hours"""
        #_current_time = time.time()
        to_remove = []
        
        with self.container_lock:
            for language, container_name in self.active_containers.items():
                try:
                    # Controlla quando è stato creato il container
                    result = subprocess.run([
                        "docker", "inspect", "--format", "{{.Created}}", container_name
                    ], capture_output=True, text=True, check=True)
                    
                    creation_time = datetime.fromisoformat(result.stdout.strip().replace('Z', '+00:00'))
                    age_hours = (datetime.now(creation_time.tzinfo) - creation_time).total_seconds() / 3600
                    
                    if age_hours > threshold_hours and self.container_usage_count.get(language, 0) == 0:
                        to_remove.append(language)
                        
                except subprocess.CalledProcessError:
                    # Container non esiste più, rimuovilo dalla lista
                    to_remove.append(language)
            
            for language in to_remove:
                container_name = self.active_containers.pop(language, None)
                self.container_usage_count.pop(language, None)
                if container_name:
                    self._stop_and_remove_container(container_name)
    
    def _stop_and_remove_container(self, container_name: str):
        """Helper per fermare e rimuovere un container"""
        try:
            subprocess.run(["docker", "stop", container_name], 
                         capture_output=True, timeout=30)
            subprocess.run(["docker", "rm", container_name], 
                         capture_output=True, timeout=30)
        except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
            pass  # Container potrebbe essere già stato rimosso
    
    def cleanup_all(self):
        """Pulisce tutti i container attivi"""
        with self.container_lock:
            for container_name in self.active_containers.values():
                self._stop_and_remove_container(container_name)
            self.active_containers.clear()
            self.container_usage_count.clear()


@dataclass
class ExecutionMetadata:
    """Metadati di esecuzione persistenti"""
    clusters_completed: Dict[str, Dict] = field(default_factory=dict)
    execution_history: List[Dict] = field(default_factory=list)
    last_update: str = field(default_factory=lambda: datetime.now().isoformat())
    total_execution_time: float = 0.0
    
    @classmethod
    def load_from_file(cls, filepath: Path) -> 'ExecutionMetadata':
        """Carica metadati da file"""
        if filepath.exists():
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                return cls(**data)
            except (json.JSONDecodeError, TypeError):
                logging.warning(f"Corrupted metadata file {filepath}, creating new one")
        return cls()
    
    def save_to_file(self, filepath: Path):
        """Salva metadati su file"""
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump({
                'clusters_completed': self.clusters_completed,
                'execution_history': self.execution_history,
                'last_update': datetime.now().isoformat(),
                'total_execution_time': self.total_execution_time
            }, f, indent=2)


class EnhancedTestOrchestrator:
    """Orchestratore migliorato per l'esecuzione dei test"""
    
    def __init__(self, max_workers: int = None, metadata_file: str = "execution_metadata.json"):
        self.max_workers = max_workers or min(os.cpu_count(), 8)
        self.container_manager = ContainerManager()
        self.metadata_file = Path(utility_paths.OUTPUT_DIR_FILEPATH) / metadata_file
        self.metadata = ExecutionMetadata.load_from_file(self.metadata_file)
        self.execution_queue = queue.PriorityQueue()
        self.results_lock = threading.Lock()
        self.start_time = time.time()
        
        # Setup logging
        self._setup_logging()
        
        # Register cleanup
        atexit.register(self.cleanup)
    
    def _setup_logging(self):
        """Configura sistema di logging avanzato"""
        log_dir = Path(utility_paths.SRC_DIR) / "logs" / "orchestrator"
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_file = log_dir / f"execution_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def analyze_cluster_completion(self) -> Dict[str, ExecutionStatus]:
        """Analisi migliorata dello stato dei cluster"""
        output_dir = Path(utility_paths.OUTPUT_DIR_FILEPATH)
        results = {}
        
        if not output_dir.exists():
            self.logger.warning(f"Output directory not found: {output_dir}")
            return results
        
        for filename in output_dir.glob("*.json"):
            if filename.name == self.metadata_file.name:
                continue
                
            cluster_name, file_type, correct_count, incorrect_entries, total_entries = self._analyze_output_file(filename)
            
            if cluster_name not in results:
                results[cluster_name] = ExecutionStatus(cluster_name)
                results[cluster_name]._total_entries = 0
            
            status = results[cluster_name]
            status.total_executions += 1
            status._total_entries += total_entries
            
            # Considera file come corretto se ha meno del 5% di errori
            error_percentage = (len(incorrect_entries) / total_entries * 100) if total_entries > 0 else 100
            if error_percentage <= 5:
                status.correct_executions += 1
            
            status.incorrect_entries.extend(incorrect_entries)
            status.last_execution_time = datetime.now().isoformat()
        
        return results
    
    def _analyze_output_file(self, filepath: Path) -> Tuple[str, str, int, List[Dict], int]:
        """Analizza un singolo file di output"""
        filename = filepath.name
        cluster_name, file_type, prompt_version, execution_number = self._parse_filename(filename)
        
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError) as e:
            self.logger.error(f"Error reading file {filename}: {e}")
            return cluster_name, file_type, 0, [{"filename": filename, "error": str(e)}], 1
        
        if not content or "results" not in content:
            return cluster_name, file_type, 0, [{"filename": filename, "error": "No results"}], 1
        
        correct_count = 0
        incorrect_entries = []
        total_entries = 0
        
        for language, entries in content["results"].items():
            if not isinstance(entries, list):
                continue
                
            for entry in entries:
                total_entries += 1
                entry_id = entry.get("id", "UNKNOWN_ID")
                
                if self._is_entry_correct(entry):
                    correct_count += 1
                else:
                    incorrect_entries.append({
                        "filename": filename,
                        "entry_id": entry_id,
                        "cluster_name": cluster_name,
                        "language": language
                    })
        
        return cluster_name, file_type, correct_count, incorrect_entries, total_entries
    
    def _parse_filename(self, filename: str) -> Tuple[str, str, int, int]:
        """Parse filename migliorato"""
        basename = filename.replace(".json", "")
        
        if "_results_v" in basename:
            parts = basename.split("_results_v")
            cluster_name = parts[0]
            
            version_exec = parts[1]
            if "_" in version_exec:
                prompt_version_str, execution_number_str = version_exec.split("_", 1)
            else:
                prompt_version_str = version_exec
                execution_number_str = "1"
            
            try:
                prompt_version = int(prompt_version_str)
                execution_number = int(execution_number_str)
            except ValueError:
                prompt_version = 1
                execution_number = 1
                
            return cluster_name, "llm", prompt_version, execution_number
        
        elif "_results_" in basename:
            parts = basename.split("_results_")
            cluster_name = parts[0]
            
            try:
                execution_number = int(parts[1])
            except (ValueError, IndexError):
                execution_number = 1
                
            return cluster_name, "base", 1, execution_number
        
        elif basename.endswith("_results"):
            cluster_name = basename.replace("_results", "")
            return cluster_name, "base", 1, 1
        
        return basename, "base", 1, 1
    
    def _is_entry_correct(self, entry: Dict) -> bool:
        """Verifica se un'entry è corretta"""
        required_base_fields = ["CPU_usage", "RAM_usage", "execution_time_ms", "regrationTestPassed", "base_log"]
        required_llm_fields = ["CPU_usage", "RAM_usage", "execution_time_ms", "regrationTestPassed"]
        
        if "LLM_results" in entry:
            if not isinstance(entry["LLM_results"], list):
                return False
            
            for llm_result in entry["LLM_results"]:
                if not all(field in llm_result for field in required_llm_fields):
                    return False
            return True
        else:
            return all(field in entry for field in required_base_fields)
    
    def get_clusters_to_execute(self) -> List[str]:
        """Ottiene lista dei cluster da eseguire"""
        all_clusters = []
        clusters_dir = Path(utility_paths.CLUSTERS_DIR_FILEPATH)
        
        for cluster_file in clusters_dir.glob("cluster_*.json"):
            cluster_name = cluster_file.stem.replace("cluster_", "")
            
            # Skip clusters con pattern specifici
            if any(pattern in cluster_name for pattern in [
                "with_metrics", "debug_", "focused_", "bad_entries"
            ]):
                continue
            
            all_clusters.append(cluster_name)
        
        # Filtra cluster già completati
        completed_analysis = self.analyze_cluster_completion()
        clusters_to_execute = []
        
        for cluster in all_clusters:
            if cluster not in completed_analysis or completed_analysis[cluster].status != "fully_executed":
                clusters_to_execute.append(cluster)
        
        return sorted(clusters_to_execute)
    
    def execute_cluster_parallel(self, cluster_name: str, execution_type: str = "both") -> bool:
        """Esecuzione parallela migliorata di un cluster"""
        self.logger.info(f"Starting execution of cluster: {cluster_name} (type: {execution_type})")
        start_time = time.time()
        
        try:
            tasks = []
            
            if execution_type in ["both", "base"]:
                # Base executions (5 runs)
                for run in range(1, 6):
                    tasks.append({
                        'type': 'base',
                        'cluster': cluster_name,
                        'run': run,
                        'priority': 1  # High priority for base tests
                    })
            
            if execution_type in ["both", "llm"]:
                # LLM executions (4 prompt versions, 5 runs each)
                for version in range(1, 5):
                    for run in range(1, 6):
                        tasks.append({
                            'type': 'llm',
                            'cluster': cluster_name,
                            'version': version,
                            'run': run,
                            'priority': 2  # Lower priority for LLM tests
                        })
            
            # Execute tasks with thread pool
            with concurrent.futures.ThreadPoolExecutor(max_workers=min(self.max_workers, len(tasks))) as executor:
                future_to_task = {
                    executor.submit(self._execute_single_task, task): task 
                    for task in tasks
                }
                
                success_count = 0
                total_tasks = len(tasks)
                
                for future in concurrent.futures.as_completed(future_to_task):
                    task = future_to_task[future]
                    try:
                        success = future.result()
                        if success:
                            success_count += 1
                        
                        progress = (success_count / total_tasks) * 100
                        self.logger.info(f"Cluster {cluster_name} progress: {success_count}/{total_tasks} ({progress:.1f}%)")
                        
                    except Exception as e:
                        self.logger.error(f"Task failed: {task}, error: {e}")
            
            execution_time = time.time() - start_time
            self.logger.info(f"Completed cluster {cluster_name} in {execution_time:.2f}s ({success_count}/{total_tasks} successful)")
            
            # Update metadata
            self._update_execution_metadata(cluster_name, execution_time, success_count, total_tasks)
            
            return success_count == total_tasks
            
        except Exception as e:
            self.logger.error(f"Exception in cluster {cluster_name}: {e}")
            return False
    
    def _execute_single_task(self, task: Dict) -> bool:
        """Esegue un singolo task (base o LLM)"""
        cluster_name = task['cluster']
        
        try:
            if task['type'] == 'base':
                return self._run_base_test(cluster_name, task['run'])
            else:
                return self._run_llm_test(cluster_name, task['version'], task['run'])
        except Exception as e:
            self.logger.error(f"Task execution failed: {task}, error: {e}")
            return False
    
    def _run_base_test(self, cluster_name: str, run_number: int) -> bool:
        """Esegue un test base"""

        parsed_cluster_name = cluster_name.replace("cluster_","").replace(".json","")
        if parsed_cluster_name in clusters_already_processed_base : 
            return True
        

        cmd = [
            "python3", "run_tests.py",
            "--base-only",
            "--cluster-name", f"cluster_{cluster_name}",
            "--output-file", f"{cluster_name}_results_{run_number}",
            "--webhook", #"--silent",
            "--run_quantity", "5",
            "--prompt-version", "1"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            self.logger.error(f"BASE test failed for {cluster_name}_run_{run_number}: {result.stderr}")
            return False
        
        return True
    
    def _run_llm_test(self, cluster_name: str, version: int, run_number: int) -> bool:
        """Esegue un test LLM"""
        
        parsed_cluster_name = cluster_name.replace("cluster_","").replace(".json","")
        if parsed_cluster_name in clusters_already_processed_llm : 
            return True
        
        cmd = [
            "python3", "run_tests.py",
            "--llm-only",
            "--cluster-name", f"cluster_{cluster_name}",
            "--output-file", f"{cluster_name}_results_v{version}_{run_number}",
            "--webhook", #"--silent",
            "--run_quantity", "5",
            "--prompt-version", str(version)
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            self.logger.error(f"LLM test failed for {cluster_name}_v{version}_run_{run_number}: {result.stderr}")
            return False
        
        return True
    
    def _update_execution_metadata(self, cluster_name: str, execution_time: float, success_count: int, total_tasks: int):
        """Aggiorna metadati di esecuzione"""
        with self.results_lock:
            self.metadata.clusters_completed[cluster_name] = {
                'completion_time': datetime.now().isoformat(),
                'execution_time_seconds': execution_time,
                'success_rate': success_count / total_tasks,
                'total_tasks': total_tasks
            }
            
            self.metadata.execution_history.append({
                'cluster': cluster_name,
                'timestamp': datetime.now().isoformat(),
                'execution_time': execution_time,
                'success_count': success_count,
                'total_tasks': total_tasks
            })
            
            self.metadata.total_execution_time += execution_time
            self.metadata.save_to_file(self.metadata_file)
    
    def run_all_clusters(self, execution_type: str = "both") -> bool:
        """Esecuzione di tutti i cluster con gestione avanzata"""
        clusters_to_execute = self.get_clusters_to_execute()
        
        if not clusters_to_execute:
            self.logger.info("No clusters to execute - all completed")
            return True
        
        self.logger.info(f"Starting execution of {len(clusters_to_execute)} clusters")
        
        total_success = 0
        total_failed = 0
        
        for i, cluster in enumerate(clusters_to_execute, 1):
            self.logger.info(f"Processing cluster {i}/{len(clusters_to_execute)}: {cluster}")
            
            if self.execute_cluster_parallel(cluster, execution_type):
                total_success += 1
            else:
                total_failed += 1
            
            # Cleanup containers periodically
            if i % 10 == 0:
                self.container_manager.cleanup_unused_containers()
            
            progress = (i / len(clusters_to_execute)) * 100
            self.logger.info(f"Overall progress: {i}/{len(clusters_to_execute)} ({progress:.1f}%)")
        
        # Final statistics
        total_time = time.time() - self.start_time
        self.logger.info(f"Execution completed - Success: {total_success}, Failed: {total_failed}")
        self.logger.info(f"Total time: {total_time:.2f}s, Average per cluster: {total_time/len(clusters_to_execute):.2f}s")
        
        return total_failed == 0
    
    def cleanup(self):
        """Cleanup resources"""
        self.logger.info("Cleaning up resources...")
        self.container_manager.cleanup_all()
        self.metadata.save_to_file(self.metadata_file)
    
    def print_status_report(self):
        """Stampa report dettagliato dello stato"""
        analysis = self.analyze_cluster_completion()
        
        if not analysis:
            print("No execution data found.")
            return
        
        print("="*80)
        print("ENHANCED CLUSTER EXECUTION STATUS REPORT")
        print("="*80)
        
        stats = {
            'fully_executed': 0,
            'partially_executed': 0,
            'not_executed': 0,
            'total': len(analysis)
        }
        
        for status in analysis.values():
            stats[status.status] += 1
        
        print(f"Total clusters: {stats['total']}")
        print(f"✅ Fully executed: {stats['fully_executed']} ({stats['fully_executed']/stats['total']*100:.1f}%)")
        print(f"🔶 Partially executed: {stats['partially_executed']} ({stats['partially_executed']/stats['total']*100:.1f}%)")
        print(f"❌ Not executed: {stats['not_executed']} ({stats['not_executed']/stats['total']*100:.1f}%)")
        
        # Show recent execution history
        if self.metadata.execution_history:
            print("\n📈 RECENT EXECUTION HISTORY:")
            for entry in self.metadata.execution_history[-10:]:  # Last 10
                print(f"  {entry['timestamp'][:19]} - {entry['cluster']} - {entry['execution_time']:.1f}s")
        
        print("="*80)


@dataclass
class ClusterAnalysisResults:
    """Classe per contenere i risultati dell'analisi dei cluster"""
    base_clusters: Dict[str, ExecutionStatus] = field(default_factory=dict)
    llm_clusters: Dict[str, ExecutionStatus] = field(default_factory=dict)
    
    def get_statistics(self, cluster_type: str) -> Dict[str, int]:
        clusters = self.base_clusters if cluster_type == "base" else self.llm_clusters
        stats = {"fully_executed": 0, "partially_executed": 0, "not_executed": 0, "total": len(clusters)}
        
        for status in clusters.values():
            stats[status.status] += 1
        
        return stats



def parse_filename(filename: str) -> Tuple[str, str, int, int]:
    """
    Parsea il nome del file per estrarre informazioni
    Returns: (cluster_name, file_type, prompt_version, execution_number)
    file_type: 'base' o 'llm'
    """
    # Rimuovi estensione .json
    basename = filename.replace(".json", "")
    
    # Pattern per file LLM: {cluster_name}_results_v{prompt_version}_{execution_number}
    if "_results_v" in basename:
        parts = basename.split("_results_v")
        cluster_name = parts[0]
        
        # Estrai prompt_version e execution_number
        version_exec = parts[1]
        if "_" in version_exec:
            prompt_version_str, execution_number_str = version_exec.split("_", 1)
        else:
            prompt_version_str = version_exec
            execution_number_str = "1"
        
        try:
            prompt_version = int(prompt_version_str)
            execution_number = int(execution_number_str)
        except ValueError:
            prompt_version = 1
            execution_number = 1
            
        return cluster_name, "llm", prompt_version, execution_number
    
    # Pattern per file base: {cluster_name}_results_{execution_number}
    elif "_results_" in basename:
        parts = basename.split("_results_")
        cluster_name = parts[0]
        
        try:
            execution_number = int(parts[1])
        except (ValueError, IndexError):
            execution_number = 1
            
        return cluster_name, "base", 1, execution_number
    
    # Pattern per file base senza numero: {cluster_name}_results
    elif basename.endswith("_results"):
        cluster_name = basename.replace("_results", "")
        return cluster_name, "base", 1, 1
    
    # Fallback
    return basename, "base", 1, 1
 


def is_entry_correct(entry: Dict) -> bool:
    """
    Verifica se un'entry è corretta controllando la presenza dei campi obbligatori
    """
    required_base_fields = ["CPU_usage", "RAM_usage", "execution_time_ms", "regrationTestPassed", "base_log"]
    required_llm_fields = ["CPU_usage", "RAM_usage", "execution_time_ms", "regrationTestPassed"]
    
    # Se ha LLM_results, controlla i campi LLM
    if "LLM_results" in entry:
        if not isinstance(entry["LLM_results"], list):
            return False
        
        for llm_result in entry["LLM_results"]:
            if not all(field in llm_result for field in required_llm_fields):
                return False
        return True
    else:
        # Altrimenti controlla i campi base
        return all(field in entry for field in required_base_fields)


def analyze_output_file(filepath: str, filename: str) -> Tuple[str, str, int, List[Dict], int]:
    """
    Analizza un singolo file di output
    Returns: (cluster_name, file_type, correct_entries_count, incorrect_entries_list, total_entries_count)
    """
    cluster_name, file_type, prompt_version, execution_number = parse_filename(filename)
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError) as e:
        print(f"⚠️ Error reading file {filename}: {e}")
        return cluster_name, file_type, 0, [{"filename": filename, "entry_id": "FILE_ERROR", "cluster_name": cluster_name, "error": str(e)}], 1
    
    if not content or "results" not in content:
        return cluster_name, file_type, 0, [{"filename": filename, "entry_id": "NO_RESULTS", "cluster_name": cluster_name}], 1
    
    results = content["results"]
    correct_count = 0
    incorrect_entries = []
    total_entries = 0
    
    for language, entries in results.items():
        if not isinstance(entries, list):
            continue
            
        for entry in entries:
            total_entries += 1
            entry_id = entry.get("id", "UNKNOWN_ID")
            
            if is_entry_correct(entry):
                correct_count += 1
            else:
                incorrect_entries.append({
                    "filename": filename,
                    "entry_id": entry_id,
                    "cluster_name": cluster_name,
                    "language": language,
                    "missing_fields": [field for field in ["CPU_usage", "RAM_usage", "execution_time_ms", "regrationTestPassed", "base_log"] if field not in entry]
                })
    
    return cluster_name, file_type, correct_count, incorrect_entries, total_entries



def check_clusters_already_executed():
    """
    Funzione migliorata per analizzare lo stato di esecuzione dei cluster
    """
    print("🔍 Analyzing cluster execution status...\n")
    
    output_dir = utility_paths.OUTPUT_DIR_FILEPATH
    if not os.path.exists(output_dir):
        print(f"❌ Output directory not found: {output_dir}")
        return
    
    results = ClusterAnalysisResults()
    
    # Analizza tutti i file di output
    for filename in os.listdir(output_dir):
        if not filename.endswith(".json"):
            continue
            
        filepath = os.path.join(output_dir, filename)
        cluster_name, file_type, correct_count, incorrect_entries, total_entries = analyze_output_file(filepath, filename)
        
        # Seleziona il dizionario appropriato
        clusters_dict = results.base_clusters if file_type == "base" else results.llm_clusters
        
        # Inizializza o aggiorna lo status del cluster
        if cluster_name not in clusters_dict:
            clusters_dict[cluster_name] = ExecutionStatus(cluster_name)
            clusters_dict[cluster_name]._total_entries = 0
        
        status = clusters_dict[cluster_name]
        status.total_executions += 1
        status._total_entries += total_entries
        
        # Calcola la percentuale di errore per questo file
        error_percentage = (len(incorrect_entries) / total_entries * 100) if total_entries > 0 else 100
        
        # Considera il file come eseguito se ha meno del 10% di errori
        if error_percentage <= 10:
            status.correct_executions += 1
        
        # Aggiungi sempre le entries incorrette per il tracking
        status.incorrect_entries.extend(incorrect_entries)
    
    # Stampa risultati
    print_analysis_results(results)
    
    return results


def print_analysis_results(results: ClusterAnalysisResults):
    """Stampa i risultati dell'analisi in modo formattato"""
    
    def print_cluster_category(clusters_dict: Dict[str, ExecutionStatus], category: str, cluster_type: str):
        filtered_clusters = {name: status for name, status in clusters_dict.items() if status.status == category}
        
        if not filtered_clusters:
            print("  📋 None")
            return
        
        for name, status in filtered_clusters.items():
            completion = status.completion_percentage
            error_pct = status.error_percentage if hasattr(status, 'error_percentage') else 0
            print(f"  📋 {name} ({status.correct_executions}/{status.total_executions} executions - {completion:.1f}%) [errors: {error_pct:.1f}%]")
            
            # Mostra entries incorrette per cluster parzialmente eseguiti
            if category == "partially_executed" and status.incorrect_entries:
                print(f"      ⚠️  Incorrect entries: {len(status.incorrect_entries)}")
                for entry in status.incorrect_entries[:3]:  # Mostra solo le prime 3
                    entry_id = entry.get("entry_id", "UNKNOWN")
                    filename = entry.get("filename", "UNKNOWN")
                    print(f"         - {entry_id} in {filename}")
                if len(status.incorrect_entries) > 3:
                    print(f"         - ... and {len(status.incorrect_entries) - 3} more")
    
    def print_statistics(cluster_type: str):
        stats = results.get_statistics(cluster_type)
        total = stats["total"]
        
        if total == 0:
            print(f"📊 No {cluster_type} clusters found\n")
            return
        
        print(f"📊 {cluster_type.upper()} CLUSTERS STATISTICS:")
        print(f"  Total clusters: {total}")
        print(f"  ✅ Fully executed: {stats['fully_executed']} ({stats['fully_executed']/total*100:.1f}%)")
        print(f"  🔶 Partially executed: {stats['partially_executed']} ({stats['partially_executed']/total*100:.1f}%)")
        print(f"  ❌ Not executed: {stats['not_executed']} ({stats['not_executed']/total*100:.1f}%)")
        print()
    
    # Stampa statistiche generali
    print("="*60)
    print("📈 CLUSTER EXECUTION ANALYSIS RESULTS")
    print("="*60)
    
    print_statistics("base")
    print_statistics("llm")
    
    # Dettaglio per tipo di cluster
    for cluster_type, clusters_dict in [("BASE", results.base_clusters), ("LLM", results.llm_clusters)]:
        if not clusters_dict:
            continue
            
        print(f"\n🔍 {cluster_type} CLUSTERS DETAILED STATUS:")
        print("-" * 40)
        
        print("✅ FULLY EXECUTED CLUSTERS:")
        print_cluster_category(clusters_dict, "fully_executed", cluster_type.lower())
        
        print("\n🔶 PARTIALLY EXECUTED CLUSTERS:")
        print_cluster_category(clusters_dict, "partially_executed", cluster_type.lower())
        
        print("\n❌ NOT EXECUTED CLUSTERS:")
        print_cluster_category(clusters_dict, "not_executed", cluster_type.lower())
        
        print()
    
    # Summary finale
    base_stats = results.get_statistics("base")
    llm_stats = results.get_statistics("llm")
    total_clusters = base_stats["total"] + llm_stats["total"]
    total_completed = base_stats["fully_executed"] + llm_stats["fully_executed"]
    
    print("="*60)
    print("🎯 FINAL SUMMARY:")
    print(f"  Total clusters analyzed: {total_clusters}")
    print(f"  Total fully completed: {total_completed} ({total_completed/total_clusters*100:.1f}%)")
    print("="*60)
    
    # Stampa gli array di clusters eseguiti per uso futuro
    print("\n📝 CLUSTERS ARRAYS FOR FUTURE REFERENCE:")
    print("-" * 50)
    
    # Base clusters eseguiti
    fully_executed_base = [name for name, status in results.base_clusters.items() if status.status == "fully_executed"]
    if fully_executed_base:
        print("🔵 FULLY EXECUTED BASE CLUSTERS:")
        print(f"clusters_already_processed_base = {fully_executed_base}")
        print()
    
    # LLM clusters eseguiti  
    fully_executed_llm = [name for name, status in results.llm_clusters.items() if status.status == "fully_executed"]
    if fully_executed_llm:
        print("🟡 FULLY EXECUTED LLM CLUSTERS:")
        print(f"clusters_already_processed_llm = {fully_executed_llm}")
        print()
    
    # Combinato (tutti i clusters completamente eseguiti)
    all_fully_executed = list(set(fully_executed_base + fully_executed_llm))
    if all_fully_executed:
        print("🟢 ALL FULLY EXECUTED CLUSTERS (COMBINED):")
        print(f"clusters_already_processed = {sorted(all_fully_executed)}")
        print()
        
    print("💡 You can copy these arrays to avoid re-running completed clusters in future executions.")
    


def main():
    """Main function con orchestratore migliorato"""
    orchestrator = EnhancedTestOrchestrator(max_workers=8)
    
    # Print initial status
    orchestrator.print_status_report()
    
    # Run all clusters
    success = orchestrator.run_all_clusters(execution_type="both")
    
    # Print final status
    orchestrator.print_status_report()
    
    return success


if __name__ == "__main__":
    atexit.register(check_clusters_already_executed)    
    
    success = main()
    exit(0 if success else 1)