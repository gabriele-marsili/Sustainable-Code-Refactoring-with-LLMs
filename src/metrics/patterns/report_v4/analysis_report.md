#  Analysis Report V4

Analysis Date: 2025-09-23 13:25:27

## Executive Summary

- **Total Clusters Analyzed**: 383
- **Clusters Selected for Deep Analysis**: 248 (64.8%)
- **Selection Criteria**: Improvement ≥ 15.0% AND Similarity < 75.0%
- **Total Patterns Detected**: 58
- **Patterns with Strong Correlations**: 15 (|r| > 0.3)

## Methodology

### Cluster Selection Process
1. **Improvement Threshold**: Clusters must show ≥ 15.0% improvement in at least one metric (CPU, RAM, or execution time)
2. **Similarity Threshold**: Average similarity between base and LLM code must be < 75.0%
3. **Rationale**: Focus on cases where LLMs make significant changes that result in meaningful performance gains

### Pattern Detection
Multi-layered approach combining:
- **AST Analysis**: For Python, structural code changes
- **Regex Pattern Matching**: Language-specific constructs and idioms
- **Generic Patterns**: Cross-language improvements like early returns, memoization
- **Code Metrics**: Line reduction, complexity changes

### Statistical Analysis
- **Pearson Correlation**: Linear relationship between pattern presence and improvement
- **Significance Testing**: p-values to assess correlation reliability
- **Effect Size**: Average improvement difference with/without patterns

## Selected Clusters Summary

| Cluster | Improvement (%) | Avg Similarity (%) | Entries | Top Metric Improvement |
|---------|-----------------|-------------------|---------|----------------------|
| knapsack | 98.5 | 55.5 | 2 | execution_time_ms: 98.9% |
| savings_account | 98.1 | 66.4 | 1 | execution_time_ms: 98.8% |
| parallel_letter_frequency | 97.7 | 74.9 | 2 | execution_time_ms: 98.8% |
| wordy | 97.6 | 70.4 | 6 | execution_time_ms: 98.9% |
| parsing_log_files | 97.6 | 63.3 | 2 | execution_time_ms: 98.8% |
| minesweeper | 97.4 | 65.7 | 11 | RAM_usage: 98.4% |
| largest_series_product | 97.1 | 63.8 | 6 | execution_time_ms: 98.9% |
| palindrome_products | 97.1 | 71.2 | 9 | execution_time_ms: 98.9% |
| welcome_to_tech_palace | 97.1 | 66.2 | 3 | execution_time_ms: 99.0% |
| grep | 97.1 | 70.3 | 3 | execution_time_ms: 98.9% |
| yacht | 97.0 | 47.7 | 3 | execution_time_ms: 98.9% |
| party_robot | 97.0 | 70.7 | 3 | execution_time_ms: 98.8% |
| ledger | 97.0 | 70.9 | 3 | execution_time_ms: 98.9% |
| change | 97.0 | 47.8 | 3 | execution_time_ms: 98.9% |
| state_of_tic_tac_toe | 96.9 | 73.2 | 1 | execution_time_ms: 97.5% |
| resistor_color_trio | 96.6 | 71.0 | 6 | CPU_usage: 97.5% |
| variable_length_quantity | 96.6 | 66.2 | 4 | execution_time_ms: 98.0% |
| book_store | 96.6 | 43.5 | 2 | execution_time_ms: 97.4% |
| tree_building | 96.5 | 71.3 | 2 | execution_time_ms: 97.5% |
| zebra_puzzle | 96.5 | 50.7 | 2 | execution_time_ms: 97.4% |
| paasio | 96.5 | 71.4 | 4 | execution_time_ms: 99.0% |
| forth | 96.5 | 46.4 | 2 | execution_time_ms: 97.4% |
| word_search | 96.4 | 70.8 | 6 | RAM_usage: 97.6% |
| bowling | 96.1 | 63.0 | 3 | execution_time_ms: 97.6% |
| rail_fence_cipher | 96.1 | 64.1 | 3 | execution_time_ms: 97.5% |
| dominoes | 96.1 | 50.6 | 3 | execution_time_ms: 97.6% |
| poker | 96.1 | 59.4 | 3 | execution_time_ms: 97.5% |
| alphametics | 95.9 | 63.0 | 6 | execution_time_ms: 99.5% |
| blackjack | 95.6 | 68.9 | 4 | RAM_usage: 96.6% |
| tournament | 95.5 | 61.9 | 4 | execution_time_ms: 97.5% |
| eliuds_eggs | 95.1 | 51.8 | 3 | CPU_usage: 97.2% |
| saddle_points | 95.1 | 60.2 | 9 | RAM_usage: 97.0% |
| flatten_array | 95.0 | 66.5 | 8 | RAM_usage: 96.5% |
| bottle_song | 94.9 | 69.2 | 2 | CPU_usage: 96.7% |
| accumulate | 94.8 | 66.4 | 7 | RAM_usage: 97.1% |
| dnd_character | 94.5 | 73.6 | 8 | RAM_usage: 96.3% |
| simple_linked_list | 94.2 | 69.7 | 4 | RAM_usage: 96.0% |
| scale_generator | 93.8 | 69.4 | 3 | RAM_usage: 95.5% |
| circular_buffer | 93.7 | 70.4 | 11 | execution_time_ms: 99.2% |
| leap | 93.1 | 67.7 | 33 | execution_time_ms: 94.3% |
| secret_handshake | 93.1 | 61.0 | 13 | execution_time_ms: 97.3% |
| raindrops | 93.1 | 59.3 | 25 | RAM_usage: 93.3% |
| pangram | 93.0 | 45.3 | 29 | RAM_usage: 93.3% |
| bob | 92.8 | 57.3 | 33 | RAM_usage: 93.2% |
| pangram_checker | 92.8 | 57.2 | 1 | CPU_usage: 96.4% |
| a0200numberofislands | 92.6 | 62.4 | 1 | CPU_usage: 95.5% |
| log_levels_alt | 92.6 | 70.7 | 1 | CPU_usage: 97.6% |
| luhn_validator | 92.5 | 70.1 | 2 | CPU_usage: 95.5% |
| diamond_printer | 92.5 | 53.7 | 1 | CPU_usage: 96.7% |
| killer_sudoku_helper | 92.4 | 70.0 | 1 | CPU_usage: 96.7% |
| pig_latin_translator | 92.4 | 50.1 | 1 | CPU_usage: 97.5% |
| proverb | 92.3 | 60.0 | 10 | RAM_usage: 95.2% |
| spiral_matrix_builder | 92.2 | 45.8 | 1 | CPU_usage: 97.6% |
| resistor_color_enum | 92.2 | 61.4 | 1 | CPU_usage: 97.7% |
| run_length_encoding | 92.1 | 58.8 | 14 | RAM_usage: 94.7% |
| football_match_reports | 92.1 | 45.8 | 2 | CPU_usage: 96.4% |
| captains_log | 92.0 | 74.7 | 3 | CPU_usage: 94.9% |
| linked_list | 92.0 | 73.5 | 18 | RAM_usage: 95.7% |
| strain | 91.9 | 70.1 | 11 | RAM_usage: 94.3% |
| two_bucket | 91.1 | 74.9 | 8 | RAM_usage: 94.5% |
| prime_calculator | 90.7 | 44.2 | 1 | CPU_usage: 96.8% |
| ocr_numbers | 90.6 | 68.2 | 5 | RAM_usage: 94.6% |
| transpose | 90.5 | 58.2 | 8 | RAM_usage: 94.8% |
| reverse_string | 90.4 | 49.2 | 25 | CPU_usage: 93.8% |
| binary_search_tree | 90.3 | 66.3 | 8 | execution_time_ms: 97.0% |
| freelancer_rates | 89.6 | 72.2 | 1 | CPU_usage: 95.3% |
| diamond | 89.5 | 60.6 | 10 | CPU_usage: 95.1% |
| lucky_numbers | 89.4 | 71.1 | 1 | CPU_usage: 94.4% |
| resistor_color | 89.2 | 67.1 | 15 | RAM_usage: 94.5% |
| sublist | 89.0 | 64.6 | 13 | RAM_usage: 94.4% |
| log_levels | 88.7 | 72.5 | 2 | CPU_usage: 94.8% |
| darts | 88.5 | 66.8 | 9 | RAM_usage: 94.1% |
| simple_cipher | 88.4 | 71.4 | 12 | CPU_usage: 94.3% |
| rotational_cipher | 88.3 | 57.4 | 13 | CPU_usage: 94.3% |
| two_fer | 88.0 | 70.6 | 26 | CPU_usage: 95.0% |
| resistor_color_duo | 87.8 | 60.9 | 15 | RAM_usage: 93.5% |
| gigasecond | 87.8 | 73.5 | 28 | CPU_usage: 92.7% |
| connect | 86.3 | 71.0 | 6 | RAM_usage: 91.5% |
| luhn | 86.1 | 60.5 | 20 | CPU_usage: 94.1% |
| pig_latin | 85.9 | 55.7 | 10 | CPU_usage: 93.7% |
| matrix | 85.4 | 61.0 | 18 | RAM_usage: 92.9% |
| atbash_cipher | 85.3 | 60.2 | 18 | CPU_usage: 93.1% |
| isogram | 84.4 | 54.5 | 24 | CPU_usage: 92.8% |
| armstrong_numbers | 84.0 | 57.3 | 16 | CPU_usage: 94.2% |
| rna_transcription | 83.9 | 66.5 | 33 | CPU_usage: 92.6% |
| kindergarten_garden | 83.8 | 69.3 | 9 | CPU_usage: 97.1% |
| difference_of_squares | 83.8 | 69.3 | 21 | CPU_usage: 93.7% |
| matching_brackets | 83.7 | 72.7 | 6 | CPU_usage: 94.0% |
| hello_world | 83.1 | 68.5 | 33 | CPU_usage: 93.9% |
| roman_numerals | 82.6 | 59.9 | 17 | CPU_usage: 93.6% |
| isbn_verifier | 82.5 | 56.0 | 14 | CPU_usage: 93.3% |
| bracket_push | 81.7 | 67.3 | 7 | CPU_usage: 90.6% |
| crypto_square | 81.5 | 72.1 | 11 | CPU_usage: 90.1% |
| say | 81.4 | 63.9 | 8 | execution_time_ms: 94.6% |
| largest_series_product_calculator | 81.2 | 74.4 | 3 | CPU_usage: 94.1% |
| triangle | 81.0 | 73.5 | 19 | CPU_usage: 94.4% |
| sieve | 80.9 | 62.0 | 15 | CPU_usage: 93.7% |
| etl | 80.5 | 63.1 | 18 | CPU_usage: 90.5% |
| spiral_matrix | 80.5 | 65.9 | 12 | CPU_usage: 92.9% |
| space_age | 80.0 | 62.8 | 31 | CPU_usage: 93.7% |
| markdown | 79.9 | 67.9 | 5 | CPU_usage: 92.4% |
| twelve_days | 79.8 | 72.4 | 9 | CPU_usage: 94.2% |
| allergies | 79.1 | 67.4 | 13 | execution_time_ms: 93.6% |
| anagram | 78.5 | 64.0 | 24 | CPU_usage: 93.6% |
| sum_of_multiples | 78.3 | 59.8 | 18 | CPU_usage: 94.0% |
| beer_song | 78.2 | 74.7 | 18 | CPU_usage: 91.5% |
| protein_translator | 77.9 | 36.1 | 1 | CPU_usage: 95.7% |
| acronym | 76.3 | 60.6 | 24 | CPU_usage: 91.6% |
| phone_number | 75.3 | 69.7 | 20 | CPU_usage: 92.7% |
| scrabble_score | 74.3 | 65.3 | 20 | CPU_usage: 91.1% |
| clock | 73.0 | 74.1 | 16 | CPU_usage: 91.5% |
| queen | 73.0 | 74.2 | 2 | CPU_usage: 96.3% |
| grains | 72.8 | 70.8 | 17 | CPU_usage: 92.9% |
| nth_prime | 72.5 | 70.4 | 7 | CPU_usage: 94.2% |
| binary | 72.3 | 68.2 | 12 | CPU_usage: 93.0% |
| word_count | 71.6 | 62.2 | 16 | CPU_usage: 92.3% |
| optical_character_reader | 71.5 | 64.4 | 1 | CPU_usage: 97.0% |
| prime_factors | 71.2 | 74.6 | 18 | CPU_usage: 93.2% |
| robot_simulator | 68.6 | 72.8 | 9 | CPU_usage: 87.8% |
| robot_name | 68.2 | 69.4 | 14 | CPU_usage: 93.3% |
| high_scores | 67.2 | 66.8 | 5 | CPU_usage: 93.9% |
| trinary | 63.0 | 70.3 | 8 | execution_time_ms: 98.9% |
| hexadecimal | 61.0 | 68.4 | 9 | CPU_usage: 90.9% |
| queens_problem | 52.3 | 58.1 | 1 | CPU_usage: 96.1% |
| find_el_smaller_left_bigger_right | 32.2 | 68.0 | 1 | CPU_usage: 95.1% |
| square_root | 31.6 | 51.4 | 4 | CPU_usage: 93.6% |
| a0094binarytreeinordertraversal | 28.5 | 69.9 | 1 | CPU_usage: 95.4% |
| a0152maximumproductsubarray | 23.8 | 63.7 | 1 | CPU_usage: 95.5% |
| a0090subsetsii | 23.7 | 68.2 | 1 | CPU_usage: 95.2% |
| a0199binarytreerightsideview | 23.7 | 66.9 | 1 | CPU_usage: 95.2% |
| a0144binarytreepreordertraversal | 23.6 | 73.6 | 1 | CPU_usage: 95.2% |
| a0131palindromepartitioning | 23.4 | 61.4 | 1 | CPU_usage: 95.4% |
| a0139wordbreak | 23.4 | 67.3 | 1 | CPU_usage: 95.0% |
| valid_anagram | 23.2 | 46.4 | 1 | CPU_usage: 95.6% |
| a0056mergeintervals | 18.4 | 72.6 | 1 | CPU_usage: 95.6% |
| a0216combination_sumiii | 18.3 | 69.7 | 1 | CPU_usage: 95.3% |
| a0093restore_ip_addresses | 18.3 | 56.3 | 1 | CPU_usage: 95.2% |
| odd_sum | 18.1 | 65.2 | 1 | CPU_usage: 95.2% |
| a0063uniquepathsii | 12.1 | 74.1 | 1 | CPU_usage: 95.4% |
| a0113pathsumii | 12.1 | 57.9 | 1 | CPU_usage: 95.4% |
| encode_and_decode_strings | 12.1 | 67.3 | 1 | CPU_usage: 95.6% |
| a0109convertsortedlisttobinarysearchtree | 12.0 | 59.4 | 1 | CPU_usage: 95.2% |
| a0061rotatelist | 12.0 | 68.8 | 1 | CPU_usage: 95.7% |
| a0086partitionlist | 11.9 | 60.4 | 1 | CPU_usage: 95.5% |
| candy | 11.9 | 74.4 | 1 | CPU_usage: 95.1% |
| split_coins | 11.9 | 70.4 | 1 | CPU_usage: 95.2% |
| reverse_array | 11.8 | 73.3 | 1 | CPU_usage: 95.6% |
| power | 11.8 | 74.2 | 1 | CPU_usage: 95.1% |
| a0096uniquebinarysearchtrees | 11.8 | 74.4 | 1 | CPU_usage: 95.1% |
| sort_rgb_array | 11.7 | 66.9 | 1 | CPU_usage: 95.1% |
| calculate_area_of_polygon | 11.7 | 62.0 | 1 | CPU_usage: 95.1% |
| longest_palindromic_substring | 11.7 | 67.0 | 1 | CPU_usage: 95.4% |
| product_of_array_except_self | 11.5 | 69.6 | 2 | CPU_usage: 94.1% |
| count_ip_addresses | 4.5 | 67.0 | 1 | CPU_usage: 95.2% |
| reverse_integer | 4.4 | 73.1 | 1 | CPU_usage: 95.4% |
| longest_repeating_character_replacement | 4.4 | 74.5 | 1 | CPU_usage: 95.6% |
| postfix_evaluate | 4.4 | 67.4 | 1 | CPU_usage: 95.5% |
| a0151reversewordsinastring | 4.3 | 63.8 | 1 | CPU_usage: 95.6% |
| a0143reorderlist | 4.3 | 68.1 | 1 | CPU_usage: 95.5% |
| ransom_note | 4.3 | 61.6 | 1 | CPU_usage: 95.3% |
| summary_ranges | 4.3 | 73.4 | 1 | CPU_usage: 95.6% |
| climbing_staircase | 4.3 | 70.3 | 1 | CPU_usage: 95.4% |
| minimum_window_substring | 4.3 | 70.8 | 1 | CPU_usage: 95.4% |
| contains_duplicate | 4.2 | 52.2 | 1 | CPU_usage: 95.4% |
| find_missing_number_in_second_array | 4.2 | 68.6 | 1 | CPU_usage: 95.5% |
| a0162findpeakelement | 4.1 | 73.8 | 1 | CPU_usage: 95.7% |
| kth_smallest | 4.1 | 73.9 | 1 | CPU_usage: 95.4% |
| a0165compareversionnumbers | 4.0 | 73.3 | 1 | CPU_usage: 95.0% |
| a0146lrucache | 4.0 | 67.3 | 1 | CPU_usage: 95.0% |
| a0129sumroottoleafnumbers | 4.0 | 66.4 | 1 | CPU_usage: 95.2% |
| a0054spiralmatrix | 0.7 | 49.9 | 1 | CPU_usage: 96.0% |
| shuffle_array | 0.5 | 64.7 | 1 | CPU_usage: 95.6% |
| a0134gasstation | -6.3 | 71.4 | 1 | CPU_usage: 96.3% |
| a0105constructbinarytreefrompreorderandinordertraversal | -6.4 | 64.3 | 1 | CPU_usage: 96.1% |
| a0130surroundedregions | -6.4 | 64.6 | 1 | CPU_usage: 96.1% |
| a0059spiralmatrixii | -6.4 | 60.4 | 1 | CPU_usage: 96.1% |
| a0179largestnumber | -6.5 | 73.1 | 1 | CPU_usage: 95.9% |
| a0089graycode | -6.5 | 73.3 | 1 | CPU_usage: 95.9% |
| a0078subsets | -6.5 | 62.5 | 1 | CPU_usage: 95.8% |
| a0055jumpgame | -6.6 | 72.7 | 1 | CPU_usage: 95.6% |
| min_swaps | -6.8 | 55.8 | 1 | CPU_usage: 95.8% |
| flatten_deep_list | -6.8 | 52.6 | 1 | CPU_usage: 96.0% |
| valid_palindrome | -6.8 | 60.3 | 1 | CPU_usage: 95.8% |
| longest_substring_without_repeating_characters | -7.4 | 53.3 | 2 | CPU_usage: 93.8% |
| check_if_point_inside_polygon | -13.4 | 54.7 | 1 | CPU_usage: 95.9% |
| a0079wordsearch | -14.8 | 72.6 | 1 | CPU_usage: 96.2% |
| a0215kthlargestelementinanarray | -14.8 | 68.7 | 1 | CPU_usage: 96.2% |
| a0187repeateddnasequences | -14.8 | 64.1 | 1 | CPU_usage: 96.2% |
| a0150evaluatereversepolishnotation | -14.9 | 52.7 | 1 | CPU_usage: 96.0% |
| best_time_to_buy_and_sell_stock | -14.9 | 70.0 | 1 | CPU_usage: 95.9% |
| a0153findminimuminrotatedsortedarray | -14.9 | 72.3 | 1 | CPU_usage: 95.8% |
| a0120triangle | -14.9 | 71.1 | 1 | CPU_usage: 95.9% |
| a0210coursescheduleii | -15.0 | 66.2 | 1 | CPU_usage: 95.5% |
| rotate_array | -15.0 | 74.2 | 1 | CPU_usage: 96.2% |
| a0138copylistwithrandompointer | -15.0 | 71.7 | 1 | CPU_usage: 96.1% |
| merge_intervals | -15.0 | 61.0 | 1 | CPU_usage: 96.2% |
| ordered_digits | -15.1 | 55.6 | 1 | CPU_usage: 96.0% |
| reverse_ascending_sublists | -15.1 | 63.1 | 1 | CPU_usage: 96.1% |
| reverse_all_lists | -15.1 | 54.9 | 1 | CPU_usage: 96.0% |
| find_min_path | -15.1 | 66.5 | 1 | CPU_usage: 95.9% |
| swap_first_and_last_word | -15.2 | 67.0 | 1 | CPU_usage: 95.9% |
| reverse_words_in_sentence | -15.2 | 68.6 | 1 | CPU_usage: 95.9% |
| jump_game | -15.2 | 72.3 | 1 | CPU_usage: 95.9% |
| a0071simplitypath | -15.2 | 72.8 | 1 | CPU_usage: 95.8% |
| smallest_multiple | -15.2 | 72.0 | 1 | CPU_usage: 95.8% |
| snakes_and_ladders | -15.2 | 58.2 | 1 | CPU_usage: 95.8% |
| minimum_absolute_difference_in_bst | -15.3 | 69.4 | 1 | CPU_usage: 95.6% |
| a0116populatingnextrightpointersineachnode | -15.3 | 73.3 | 1 | CPU_usage: 95.8% |
| a0213houserobberii | -24.9 | 73.3 | 1 | CPU_usage: 96.1% |
| a0001twosum | -24.9 | 74.9 | 1 | CPU_usage: 96.2% |
| a0209minimumsizesubarraysum | -24.9 | 67.4 | 1 | CPU_usage: 96.2% |
| a0080removeduplicatesfromsortedarrayii | -24.9 | 67.9 | 1 | CPU_usage: 96.2% |
| random_sample | -25.0 | 71.8 | 1 | CPU_usage: 96.1% |
| a0077combinations | -25.0 | 63.9 | 1 | CPU_usage: 96.1% |
| a0074search2dmatrix | -25.0 | 72.0 | 1 | CPU_usage: 96.0% |
| a0207courseschedule | -25.0 | 63.1 | 1 | CPU_usage: 96.0% |
| a0114flattenbinarytreetolinkedlist | -25.0 | 59.7 | 1 | CPU_usage: 96.1% |
| a0092reverselinkedlistii | -25.1 | 70.0 | 1 | CPU_usage: 95.9% |
| a0147insertionsortlist | -25.1 | 68.0 | 1 | CPU_usage: 96.2% |
| find_one_missing_number | -25.1 | 66.9 | 1 | CPU_usage: 96.2% |
| find_two_missing_numbers | -25.1 | 68.2 | 1 | CPU_usage: 96.1% |
| count_divisibles_in_range | -25.1 | 63.9 | 1 | CPU_usage: 96.2% |
| valid_sudoku | -25.1 | 58.6 | 1 | CPU_usage: 96.2% |
| unique_paths | -25.1 | 73.8 | 1 | CPU_usage: 96.1% |
| river_sizes | -25.2 | 71.4 | 1 | CPU_usage: 96.2% |
| fancy_sequence | -25.2 | 44.9 | 1 | CPU_usage: 96.2% |
| count_consecutive_sums | -25.2 | 56.4 | 1 | CPU_usage: 96.1% |
| a0166fractiontorecurringdecimal | -25.2 | 65.1 | 1 | CPU_usage: 96.2% |
| longest_common_prefix | -25.2 | 52.6 | 1 | CPU_usage: 96.1% |
| perfect_rectangle | -25.2 | 58.6 | 1 | CPU_usage: 96.2% |
| a0091decodeways | -25.2 | 68.1 | 1 | CPU_usage: 96.1% |
| count_positives | -25.2 | 57.4 | 1 | CPU_usage: 96.2% |
| letter_combinations | -25.2 | 60.6 | 1 | CPU_usage: 96.1% |
| sum_non_adjecent | -25.2 | 44.4 | 1 | CPU_usage: 96.2% |
| a0062uniquepaths | -25.2 | 71.3 | 1 | CPU_usage: 96.1% |
| word_break | -25.2 | 68.0 | 1 | CPU_usage: 96.0% |
| check_if_two_rectangles_overlap | -25.2 | 71.6 | 1 | CPU_usage: 96.1% |
| find_unpaired | -25.2 | 67.0 | 1 | CPU_usage: 96.0% |
| longest_common_subsequence | -25.2 | 72.0 | 1 | CPU_usage: 96.1% |
| search_2d_matrix | -25.2 | 66.4 | 1 | CPU_usage: 96.0% |
| guidos_gorgeous_lasagna | -25.2 | 72.3 | 1 | CPU_usage: 95.9% |
| min_cost_coloring | -25.2 | 60.5 | 1 | CPU_usage: 96.0% |
| permutation_in_string | -25.2 | 52.7 | 1 | CPU_usage: 96.0% |
| power_set | -25.2 | 57.2 | 1 | CPU_usage: 96.1% |
| reverse_vowels | -25.2 | 60.1 | 1 | CPU_usage: 96.0% |
| anagram_indices | -25.3 | 51.7 | 1 | CPU_usage: 96.0% |
| basic_calculator | -25.3 | 64.7 | 1 | CPU_usage: 95.7% |
| protein_translation | -34.6 | 66.4 | 14 | CPU_usage: 93.6% |

## Most Frequent Patterns

| Pattern | Occurrences | Description |
|---------|-------------|-------------|
| generic_single_responsibility | 4536 | Language-specific optimization |
| generic_loop_optimization | 3166 | Language-specific optimization |
| generic_constant_extraction | 2511 | Language-specific optimization |
| generic_guard_clause | 2451 | Language-specific optimization |
| generic_early_return | 1851 | Early returns reduce nesting |
| generic_factory_pattern | 970 | Language-specific optimization |
| go_make_slice | 845 | Language-specific optimization |
| js_arrow_function | 526 | Language-specific optimization |
| js_map_filter_reduce | 382 | Language-specific optimization |
| js_spread_operator | 379 | Language-specific optimization |
| go_short_declaration | 347 | Language-specific optimization |
| go_range_loop | 332 | Language-specific optimization |
| js_rest_parameters | 317 | Language-specific optimization |
| cpp_range_based_for | 304 | Range-based for loops replace traditional for loops |
| go_make_map | 294 | Language-specific optimization |

## Pattern-Performance Correlations

### Strongest Positive Correlations (Performance Improving)

| Pattern | Correlation | p-value | Avg Improvement With | Avg Improvement Without | Effect Size |
|---------|-------------|---------|---------------------|------------------------|-------------|
| go_make_slice | 0.611*** | 0.000 | 87.3% | 21.0% | 66.3% |
| generic_factory_pattern | 0.594*** | 0.000 | 86.0% | 21.6% | 64.4% |
| generic_loop_optimization | 0.568*** | 0.000 | 83.6% | 22.2% | 61.4% |
| generic_guard_clause | 0.549*** | 0.000 | 82.5% | 23.0% | 59.5% |
| generic_early_return | 0.539*** | 0.000 | 82.2% | 23.5% | 58.7% |
| generic_constant_extraction | 0.526*** | 0.000 | 83.3% | 24.7% | 58.7% |
| go_range_loop | 0.450*** | 0.000 | 90.1% | 30.4% | 59.7% |
| js_arrow_function | 0.406*** | 0.000 | 83.9% | 31.1% | 52.8% |
| go_short_declaration | 0.392*** | 0.000 | 90.5% | 32.8% | 57.6% |
| go_make_map | 0.348*** | 0.000 | 89.3% | 34.3% | 55.0% |

### Strongest Negative Correlations (Performance Degrading)

| Pattern | Correlation | p-value | Avg Improvement With | Avg Improvement Without | Effect Size |
|---------|-------------|---------|---------------------|------------------------|-------------|
| python_generator_expression | -0.227*** | 0.000 | 7.6% | 44.1% | -36.5% |
| python_comprehension | -0.185** | 0.004 | 15.7% | 43.6% | -27.9% |
| generic_single_responsibility | -0.166** | 0.009 | 37.6% | 65.2% | -27.6% |
| python_lambda | -0.157* | 0.014 | -13.5% | 41.4% | -54.9% |
| python_list_comprehension | -0.152* | 0.017 | 1.8% | 41.7% | -39.9% |

*Significance levels: *** p<0.001, ** p<0.01, * p<0.05*

## Key Insights

### Performance-Enhancing Patterns
1. **go_make_slice**: Shows 66.3% better improvement when present (correlation: 0.611)
2. **generic_factory_pattern**: Shows 64.4% better improvement when present (correlation: 0.594)
3. **generic_loop_optimization**: Shows 61.4% better improvement when present (correlation: 0.568)
4. **generic_guard_clause**: Shows 59.5% better improvement when present (correlation: 0.549)
5. **generic_early_return**: Shows 58.7% better improvement when present (correlation: 0.539)

### Pattern Categories by Language

- **Python**: type_hints, generator_expression, comprehension, enumerate, list_comprehension
  (+7 more)
- **Generic**: loop_optimization, single_responsibility, constant_extraction, guard_clause, null_check
  (+4 more)
- **JavaScript/TypeScript**: class_syntax, template_literals, arrow_function, map_filter_reduce, optional_chaining
  (+5 more)
- **Go**: make_map, defer, make_slice, error_handling, range_loop
  (+7 more)
- **Java**: lambda, streams, method_reference, var_keyword, switch_expression
- **C++**: auto_keyword, range_based_for, constexpr, lambda, nullptr
  (+5 more)

## Recommendations

### For Code Optimization
- **Prioritize go_make_slice**: Strong positive correlation (0.611) with 66.3% additional improvement
- **Prioritize generic_factory_pattern**: Strong positive correlation (0.594) with 64.4% additional improvement
- **Prioritize generic_loop_optimization**: Strong positive correlation (0.568) with 61.4% additional improvement

### For LLM Training/Prompting
- Focus on clusters with similarity < 75.0% but improvement > 15.0%
- Encourage patterns that show consistent positive correlations
- Avoid patterns that correlate with performance degradation

## Files Generated
- `cluster_selection_analysis.png`: Cluster selection visualization
- `pattern_counts.png`: Pattern frequency chart
- `pattern_performance_correlation.png`: Correlation analysis charts
- `similarity_vs_improvement.png`: Similarity-improvement scatter plot
- `analysis_report.md`: This comprehensive report

---
Generated by Pattern Analyzer V4 on 2025-09-23 13:25:27