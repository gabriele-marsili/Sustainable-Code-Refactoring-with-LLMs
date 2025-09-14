import os
import json
import time
import sys

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir import utility_paths
from api import gemini_api_gestor, claude_api_gestor, openai_api_gestor
from discordInteraction import DiscordWebhookReporter
from dotenv import load_dotenv
from datetime import datetime
import atexit

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
    "trinary",
    "robot_name",
    "hexadecimal",
    "series",
    "sum_of_multiples",
    "etl",
    "nucleotide_count",
    "food_chain",
    "twelve_days",
    "pangram_checker",
    "beer_song",
]

clusters_not_completed = []

clusters_not_processed = []

prompt_file_paths = [
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV2.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV3.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV4.txt",
]


def print_status():
    generator = LLMGenerator()
    generator.check_status()


atexit.register(print_status)


class LLMGenerator:
    def __init__(self):
        load_dotenv()
        WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK")
        print(f"WEBHOOK_URL = {WEBHOOK_URL}")
        if not WEBHOOK_URL:
            raise Exception("missing WEBHOOK_URL")
        self.reporter = DiscordWebhookReporter(WEBHOOK_URL, "LLM Generation Bot")

    def generate_llms_files_for_chosen_clusters(self):
        gemini_api_g = gemini_api_gestor.GeminiAIApiGestor()
        claude_api_g = claude_api_gestor.ClaudeApiGestor()
        openai_api_g = openai_api_gestor.OpenAIApiGestor()

        try:
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
                cluster_name = cluster_name.replace("cluster_", "").removesuffix(
                    ".json"
                )
                if (
                    cluster_name in clusters_already_processed
                    # or cluster_name in clusters_not_completed
                ):
                    continue
                else:
                    print(f"\n- Generating LLMs files for cluster {cluster_name}\n")

                    file_name = f"cluster_{cluster_name}.json"
                    cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / file_name

                    json_file_content = None
                    with open(cluster_path, "r", encoding="utf-8") as f:
                        json_file_content = json.load(f)

                    if not json_file_content:
                        raise Exception(
                            f"json file content is none for file path : {cluster_path}"
                        )

                    total_expected_files = 0
                    total_generated_files = 0
                    start_time = time.time()

                    for language, entries in json_file_content.items():
                        time.sleep(2)
                        for entry in entries:  # itera le entries
                            for prompt_v, prompt_path in enumerate(
                                prompt_file_paths, start=1
                            ):
                                code_file_path = (
                                    utility_paths.DATASET_DIR
                                    / entry["codeSnippetFilePath"]
                                )
                                parts = str(entry["codeSnippetFilePath"]).split("/")
                                dir_name = str(parts[0]) + "/" + str(parts[1])
                                exercise_dir_filepath = (
                                    utility_paths.DATASET_DIR / dir_name
                                )
                                filename = entry["filename"]
                                if language == "c" or language == "cpp":
                                    code_file_path = code_file_path / filename

                                # Ogni modello dovrebbe generare 1 file
                                total_expected_files += 3

                                print(
                                    f"📄 [{cluster_name}] Generating for `{filename}` | Prompt v{prompt_v}"
                                )

                                for model_name, generator in {
                                    "OpenAI": openai_api_g,
                                    "Claude": claude_api_g,
                                    "Gemini": gemini_api_g,
                                }.items():
                                    success = (
                                        generator.generate_and_save_LLM_code_by_files(
                                            prompt_path,
                                            code_file_path,
                                            exercise_dir_filepath,
                                            prompt_v,
                                            filename,
                                        )
                                    )

                                    if success:
                                        total_generated_files += 1
                                        print(
                                            f"   ✅ {model_name} generation successful"
                                        )
                                    else:
                                        print(f"   ❌ {model_name} generation failed")

                                time.sleep(0.5)

                    duration = time.time() - start_time
                    percent = (
                        (total_generated_files / total_expected_files * 100)
                        if total_expected_files
                        else 0
                    )

                    print(
                        f"\n📊 Cluster {cluster_name} complete: {total_generated_files}/{total_expected_files} files ({percent:.1f}%)\n"
                    )

                    # Invia webhook Discord
                    self.reporter.send_file_generation_report(
                        cluster_name=cluster_name,
                        generated_files=total_generated_files,
                        expected_files=total_expected_files,
                        additional_info={
                            "Duration": f"{duration:.1f}s",
                            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        },
                        custom_message=f"📦 Generazione file per cluster `{cluster_name}` completata!",
                    )

                    if (
                        percent >= 99.99
                        or total_generated_files == total_expected_files
                    ):
                        clusters_already_processed.append(cluster_name)
                    elif percent > 0:
                        clusters_not_completed.append(cluster_name)

                    else:
                        clusters_not_processed.append(cluster_name)

        except Exception as e:
            print(f"❌ Exception in generate_llms_files_for_chosen_clusters:\n{e}")
            self.reporter.send_simple_message(
                f"❌ Errore durante la generazione dei file: {e}"
            )

    def check_status(self):
        for cluster_name in clusters_not_completed:
            if cluster_name in clusters_already_processed:
                clusters_not_completed.remove(cluster_name)

        for cluster_name in clusters_not_processed:
            if cluster_name in clusters_already_processed:
                clusters_not_processed.remove(cluster_name)

        entries_to_process = 0
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
                print(f"\n- Checking status for cluster {cluster_name}\n")

                file_name = f"cluster_{cluster_name}.json"
                cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / file_name

                json_file_content = None
                with open(cluster_path, "r", encoding="utf-8") as f:
                    json_file_content = json.load(f)

                if json_file_content:
                    total_cluster_entries = 0
                    processed = 0
                    partially_processed = 0
                    NOT_processed = 0

                    for _language, entries in json_file_content.items():
                        total_cluster_entries += len(entries)

                        for i, entry in enumerate(entries):
                            if len(entry["LLMs"]) == 12:
                                # print(f"🟢 entry {entry['id']} with all 12 LLMs files | {i}/{total_cluster_entries} | cluster = {cluster_name}")
                                processed += 1
                            elif len(entry["LLMs"]) > 0:
                                # print(f"🟡 entry {entry['id']} with all > 0 LLMs files | {i}/{total_cluster_entries} | cluster = {cluster_name} added to cluster not completed")
                                partially_processed += 1
                            else:
                                # print(f"🔴 entry {entry['id']} with all 12 LLMs files | {i}/{total_cluster_entries} | cluster = {cluster_name}")
                                NOT_processed += 1

                    print(
                        f"Cluster {cluster_name}:\nprocessed : {processed}/{total_cluster_entries}\nNOT_processed : {NOT_processed}/{total_cluster_entries}\npartially_processed : {partially_processed}/{total_cluster_entries}\n\n"
                    )
                    if processed == total_cluster_entries:
                        clusters_already_processed.append(cluster_name)
                    elif NOT_processed == total_cluster_entries:
                        clusters_not_processed.append(cluster_name)
                        entries_to_process += NOT_processed
                    else:
                        clusters_not_completed.append(cluster_name)

        m1 = f"\nclusters not processed : {len(clusters_not_processed)}"

        m2 = f"\nclusters not completed : {len(clusters_not_completed)}"

        m3 = f"\nclusters processed : {len(clusters_already_processed)}"

        msg = f"Generation by LLMs status:\n{m1}\n{m2}\n{m3}"

        self.reporter.send_simple_message(msg)

        print(m1 + f"\n\n{clusters_not_processed}")
        print(m2 + f"\n\n{clusters_not_completed}")
        print(m3 + f"\n\n{clusters_already_processed}")

        print(
            f"\nTotal entries to processed : {entries_to_process}\nEstimated $ : {entries_to_process * 0.02} $"
        )


if __name__ == "__main__":
    generator = LLMGenerator()
    #generator.generate_llms_files_for_chosen_clusters()
    generator.check_status()
