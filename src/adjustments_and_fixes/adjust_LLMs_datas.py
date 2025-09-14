# Processa tutti i clusters nella relativa cartella andando a
# sistemare i files json associati inserendo i metadati relativi ai
# files generati dagli LLMs
import sys
import os

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import json
import re
import os.path
from utility_dir import utility_paths


def count_words_and_chars(file_path):
    """
    Legge un file e restituisce il numero di parole e caratteri.

    Args:
        file_path (str): Percorso del file da analizzare

    Returns:
        tuple: (word_count, char_count)
    """
    file_path = utility_paths.DATASET_DIR / file_path
    print(f"f path = {file_path}")
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

            # Conteggio caratteri (escludendo spazi bianchi e newline per il conteggio "pulito")
            char_count = len(content)

            # Conteggio parole (split su spazi bianchi e rimuove stringhe vuote)
            words = re.findall(r"\b\w+\b", content)
            word_count = len(words)

            return word_count, char_count
    except FileNotFoundError:
        print(f"Attenzione: File non trovato: {file_path}")
        return 0, 0
    except Exception as e:
        print(f"Errore nella lettura del file {file_path}: {e}")
        return 0, 0


def extract_llm_type(file_path):
    """
    Estrae il tipo di LLM dal percorso del file.

    Args:
        file_path (str): Percorso del file LLM

    Returns:
        str: Tipo di LLM (claude, gemini, openAI)
    """
    path_lower = file_path.lower()
    if "claude" in path_lower:
        return "claude"
    elif "gemini" in path_lower:
        return "gemini"
    elif "openai" in path_lower or "chatgpt" in path_lower:
        return "openAI"
    else:
        # Fallback: prova a estrarre dalla struttura della cartella
        path_parts = file_path.split("/")
        for part in path_parts:
            part_lower = part.lower()
            if part_lower in ["claude", "gemini", "openai"]:
                return part_lower if part_lower != "openai" else "openAI"
        return "unknown"


def process_json_file(input_file_path, output_file_path=None):
    """
    Processa il file JSON aggiornando i metadati LLM.

    Args:
        input_file_path (str): Percorso del file JSON di input
        output_file_path (str): Percorso del file JSON di output (opzionale)
    """
    # Se non specificato, sovrascrive il file originale
    if output_file_path is None:
        output_file_path = input_file_path

    try:
        # Carica il file JSON
        with open(input_file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        print(f"Processando file JSON: {input_file_path}")

        DIRS = ["openAI", "claude", "gemini"]

        # Processa ogni linguaggio nel JSON
        for language, entries in data.items():
            print(f"\nProcessando linguaggio: {language}")

            for entry in entries:
                entry_id = entry.get("id", "ID sconosciuto")
                entry_filename = entry["filename"]
                print(f"  Processando entry: {entry_id}")

                if language == "java":
                    parts = str(entry["codeSnippetFilePath"]).split("/")
                    exercise_path = parts[0] + "/" + parts[1]
                else:
                    exercise_path = str(entry["codeSnippetFilePath"]).replace(
                        "/" + entry["filename"], ""
                    )
                if entry["language"] == "c" or entry["language"] == "cpp":
                    exercise_path = exercise_path.replace("/src", "")
                exercise_path = utility_paths.DATASET_DIR / exercise_path

                llms_data = []

                # Processa ogni percorso LLM
                for dir_name in DIRS:
                    print(f"exercise_path = {exercise_path}")
                    print(f"dir_name = {dir_name}")

                    complete_dir_path = exercise_path / dir_name
                    print(f"complete_dir_path = {complete_dir_path}")

                    if os.path.isdir(str(complete_dir_path)):
                        for LLM_file in os.scandir(str(complete_dir_path)):
                            print(
                                f"LLM file name : {LLM_file.name}\nentry_filename = {entry_filename}"
                            )
                            if (
                                LLM_file.is_file()
                                and not LLM_file.name.endswith(".json")
                                and not LLM_file.name.endswith("config.js")
                                and not LLM_file.name.endswith(".log")
                                and not LLM_file.name.endswith(".sh")
                                and not LLM_file.name.endswith(".h")
                                and LLM_file.name != entry_filename
                            ):
                                path = LLM_file.path

                                # Estrai il tipo di LLM
                                llm_type = extract_llm_type(path)

                                # Conta parole e caratteri
                                word_count, char_count = count_words_and_chars(path)

                                # Crea l'oggetto LLM
                                llm_obj = {
                                    "type": llm_type,
                                    "path": path,
                                    "word_quantity": word_count,
                                    "char_quantity": char_count,
                                    "filename": LLM_file.name,
                                }

                                llms_data.append(llm_obj)
                                print(
                                    f"      Tipo: {llm_type}, Parole: {word_count}, Caratteri: {char_count}"
                                )

                # Sostituisci LLM_codeSnippetFilePaths con LLMs
                entry["LLMs"] = llms_data

        # Salva il file JSON aggiornato
        with open(output_file_path, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)

        print(f"\nFile JSON aggiornato salvato in: {output_file_path}")

    except FileNotFoundError:
        print(f"Errore: File JSON non trovato: {input_file_path}")
    except json.JSONDecodeError as e:
        print(f"Errore nella decodifica JSON: {e}")
    except Exception as e:
        print(f"Errore generico: {e}")


def main():
    """
    Funzione principale dello script.
    """
    clusters_already_processed = [
        "leap",
        "raindrops",
        "pangram",
        "bob",
        "find_peak_element",
        "a0133clonegraph",
        "kth_smallest",
        "valid_anagram",
        "log_levels",
        "count_triplets_with_sum_k",
        "a0139wordbreak",
        "a0131palindromepartitioning",
        "luhn",
        "merge_sorted_array",
        "two_bucket",
        "maximum_depth_of_binary_tree",
        "a0211addandsearchworddatastructuredesign",
        "octal",
        "a0199binarytreerightsideview",
        "perfect_numbers",
        "two_sum",
        "squeaky_clean",
        "armstrong_numbers",
        "set_matrix_zeroes",
        "state_of_tic_tac_toe",
        "simple_cipher",
        "acronym",
        "a0129sumroottoleafnumbers",
        "luhn_validator",
        "run_length_encoding",
        "dn_dcharacter",
        "a0109convertsortedlisttobinarysearchtree",
        "postfix_evaluate",
        "zebra_puzzle",
        "atbash_cipher",
        "a0096uniquebinarysearchtrees",
        "summary_ranges",
        "killer_sudoku_helper",
        "contains_duplicate",
        "check_if_point_inside_polygon",
        "a0151reversewordsinastring",
        "reverse_string",
        "lasagna",
        "odd_sum",
        "majority_element",
        "a0165compareversionnumbers",
        "reverse_array",
        "twofer",
        "card_tricks",
        "longest_palindromic_substring",
        "a0063uniquepathsii",
        "bottle_song",
        "proverb",
        "a0056mergeintervals",
        "longest_repeating_character_replacement",
        "encode_and_decode_strings",
        "tournament",
        "elons_toys",
        "gross_store",
        "lucky_numbers",
        "book_store",
        "dominoes",
        "a0090subsetsii",
        "split_coins",
        "eliuds_eggs",
        "two_sum_ii_input_array_is_sorted",
        "list_ops",
        "weather_forecast",
        "reverse_integer",
        "a0094binarytreeinordertraversal",
        "a0208implementtrieprefixtree",
        "high_score_board",
        "flatten_array",
        "minimum_window_substring",
        "complex_numbers",
        "a0086partitionlist",
        "a0061rotatelist",
        "tree_building",
        "a0144binarytreepreordertraversal",
        "rational_numbers",
        "dnd_character",
        "power",
        "house",
        "need_for_speed",
        "rotational_cipher",
        "vehicle_purchase",
        "collatz_conjecture",
        "connect",
        "bank_account_action_invalid_exception",
        "candy",
        "secrets",
        "chaitanas_colossal_coaster",
        "two_fer",
        "bracket_push",
        "square_root",
        "protein_translator",
        "rectangles",
        "find_el_smaller_left_bigger_right",
        "a0152maximumproductsubarray",
        "binary_tree_right_side_view",
        "salary_calculator",
        "calculate_area_of_polygon",
        "rail_fence_cipher",
        "sort_rgb_array",
        "a0073setmatrixzeros",
        "product_of_array_except_self",
        "a0093restore_ip_addresses",
        "find_missing_number_in_second_array",
        "scale_generator",
        "markdown",
        "bowling",
        "a0216combination_sumiii",
        "a0143reorderlist",
        "all_your_base",
        "simple_linked_list",
        "container_with_most_water",
        "minimum_size_subarray_sum",
        "ransom_note",
        "poker",
        "strain",
        "annalyns_infiltration",
        "pascals_triangle",
        "variable_length_quantity",
        "isogram",
        "scramblies",
        "hashtag_generator",
        "spiral_traversal",
        "count_ip_addresses",
        "custom_set",
        "diamond_printer",
        "a0200numberofislands",
        "freelancer_rates",
        "climbing_staircase",
        "a0113pathsumii",
        "a0064minimumpathsum",
        "nth_fibonacci_number",
        "a0098validatebinarysearchtree",
        "forth",
        "gotta_snatch_em_all",
        "a0095uniquebinarysearchtreesii",
        "a0162findpeakelement",
        "evaluate_reverse_polish_notation",
        "a0146lrucache",
        "pig_latin",
        "allergies",
        "queen",
        "interest_is_interesting",
        "guidos_gorgeous_lasagna",
        "captains_log",
        "coordinate_transformation",
        "grep",
        "prime_calculator",
        "accumulate",
        "spiral_matrix",
        "blackjack",
        "meetup_schedule",
        "mixed_juices",
        "a0142linkedlistcycleii",
        "welcome_to_tech_palace",
        "minimum_absolute_difference_in_bst",
        "letter_combinations",
        "min_swaps",
        "a0000blank",
        "paasio",
        "little_sisters_vocab",
        "kindergarten_garden",
        "a0130surroundedregions",
        "largest_series_product",
        "mean_square_error",
        "react",
        "find_element_range_sorted_array",
        "perfect_rectangle",
        "minesweeper",
        "a0210coursescheduleii",
        "log_levels_alt",
        "hello_world",
        "wordy",
        "a0179largestnumber",
        "linked_list",
        "snakes_and_ladders",
        "secret_handshake",
        "a0120triangle",
        "a0138copylistwithrandompointer",
        "resistor_color_duo",
        "diffie_hellman",
        "shuffle_array",
        "elons_toy_car",
        "darts",
        "a0089graycode",
        "chessboard",
        "parallel_letter_frequency",
        "a0071simplitypath",
        "a0134gasstation",
        "amusement_park",
        "ghost_gobble_arcade_game",
        "a0207courseschedule",
        "a0075sortcolors",
        "error_handling",
        "longest_increasing_subarray",
        "a0001twosum",
        "a0060permutationsequence",
        "a0078subsets",
        "savings_account",
        "random_sample",
        "a0091decodeways",
        "little_sisters_essay",
        "generate_parentheses",
        "party_robot",
        "min_cost_coloring",
        "valid_sudoku",
        "merge_intervals",
        "ledger",
        "number_of_islands",
        "isbn_verifier",
        "election_day",
        "basic_calculator",
        "word_search",
        "matching_brackets",
        "diamond",
        "find_busiest_interval",
        "title_case",
        "a0059spiralmatrixii",
        "find_first_missing_positive",
        "typoglycemia_generator",
        "pov",
        "change",
        "valid_palindrome",
        "protein_translation",
        "sum_non_adjecent",
        "parsing_log_files",
        "high_scores",
        "find_el_where_k_greater_or_equal",
        "a0215kthlargestelementinanarray",
        "circular_buffer",
        "a0150evaluatereversepolishnotation",
        "queens_problem",
        "valid_parentheses",
        "lasagna_master",
        "count_positives",
        "a0201bitwiseandofnumbersrange",
        "flatten_deep_list",
        "best_time_to_buy_and_sell_stock",
        "word_break",
        "difference_of_squares_calculator",
        "rotate_array",
        "the_farm",
        "fancy_sequence",
        "a0105constructbinarytreefrompreorderandinordertraversal",
        "find_one_missing_number",
        "river_sizes",
        "jump_game",
        "a0187repeateddnasequences",
        "a0114flattenbinarytreetolinkedlist",
        "cars_assemble",
        "reverse_ascending_sublists",
        "animal_magic",
        "zipper",
        "longest_common_prefix",
        "count_divisibles_in_range",
        "a0102binarytreelevelordertraversal",
        "sublist",
        "reverse_vowels",
        "ozans_playlist",
        "anagram_indices",
        "knapsack",
        "min_stack",
        "logs_logs_logs",
        "count_consecutive_sums",
        "pig_latin_translator",
        "a0209minimumsizesubarraysum",
        "a0153findminimuminrotatedsortedarray",
        "domain_name",
        "ocr_numbers",
        "jedliks_toy_car",
        "linked_list_cycle",
        "spiral_matrix_builder",
        "permutation_in_string",
        "currency_exchange",
        "binary_search",
        "longest_common_subsequence",
        "meteorology",
        "a0148sortlist",
        "bank_account",
        "find_min_path",
        "matrix",
        "a0127wordladder",
        "a0166fractiontorecurringdecimal",
        "sliding_window_maximum",
        "palindrome_integer",
        "largest_series_product_calculator",
        "a0116populatingnextrightpointersineachnode",
        "find_two_missing_numbers",
        "longest_consecutive_sequence",
        "airport_robot",
        "a0077combinations",
        "bird_watcher",
        "yacht",
        "a0055jumpgame",
        "saddle_points",
        "longest_substring_without_repeating_characters",
        "ordered_digits",
        "minesweeper_board",
        "palindrome_products",
        "reverse_all_lists",
        "a0079wordsearch",
        "optical_character_reader",
        "search_2d_matrix",
        "a0147insertionsortlist",
        "unique_paths",
        "robot_simulator",
        "resistor_color_trio",
        "resistor_color",
        "smallest_multiple",
        "group_anagrams",
        "a0082removeduplicatesfromsortedlistii",
        "binary_search_tree",
        "check_if_two_rectangles_overlap",
        "making_the_grade",
        "football_match_reports",
        "a0213houserobberii",
        "a0054spiralmatrix",
        "a0103binarytreezigzaglevelordertraversal",
        "transpose",
        "expenses",
        "a0062uniquepaths",
        "a0092reverselinkedlistii",
        "swap_first_and_last_word",
        "find_unpaired",
        "a0074search2dmatrix",
        "power_set",
        "a0080removeduplicatesfromsortedarrayii",
        "sorting_room",
        "census",
        "resistor_color_enum",
        "pythagorean_triplet",
        "card_games",
        "reverse_words_in_sentence",
        "three_sum",
        "alphametics",
        "bowling_game_log",
        "human_readable_numbers",
        "booking_up_for_beauty",
        "human_readable_numbers.test.js",
        "hashtag_generator.test.js",
        "domain_name.test.js",
        "scramblies.test.js",
        "title_case.test.js",
        "typoglycemia_generator.test.js",
        "mean_square_error.test.js",
        "spiral_traversal.test.js",
        "prime_factors",
        "say",
        "word_count",
        "clock",
        "gigasecond",
        "scrabble_score",
        "rna_transcription",
        "grade_school",
        "hamming",
        "difference_of_squares",
        "queen_attack",
        "grains",
        "anagram",
        "crypto_square",
        "nth_prime",
        "meetup",
        "sieve",
        "space_age",
        "phone_number",
        "triangle",
        "roman_numerals",
        "binary",        
        "robot_name",        
        "series",        
        "etl",
        "food_chain",
        "nucleotide_count",
    ]

    clusters = []

    for cluster_name in os.listdir(
        utility_paths.CLUSTERS_DIR_FILEPATH
    ):  # itera i clusters
        if (
            cluster_name in clusters_already_processed
            or "with_metrics" in cluster_name
            or "debug_" in cluster_name
            or "focused_" in cluster_name
            or "bad_entries" in cluster_name
        ):
            continue
        cluster_name = cluster_name.replace("cluster_", "").removesuffix(".json")
        if cluster_name in clusters_already_processed:
            continue
        else:
            print(f"\n- Generating LLMs files for cluster {cluster_name}\n")

            file_name = f"cluster_{cluster_name}.json"
            cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / file_name

            clusters.append(cluster_path)

    for cluster in clusters:
        process_json_file(cluster)


if __name__ == "__main__":
    main()
