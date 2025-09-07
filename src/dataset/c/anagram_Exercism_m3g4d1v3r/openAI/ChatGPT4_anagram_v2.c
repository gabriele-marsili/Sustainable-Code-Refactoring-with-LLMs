#include "anagram.h"
#include <ctype.h>
#include <string.h>

void map_string_to_array(const char *str, size_t *array) {
    while (*str) {
        if (isalpha(*str)) {
            array[tolower(*str) - 'a']++;
        }
        str++;
    }
}

bool compare_lengths_and_case_insensitive(const char *subject, const char *candidate) {
    while (*subject && *candidate) {
        if (tolower(*subject++) != tolower(*candidate++)) return false;
    }
    return *subject == '\0' && *candidate == '\0';
}

bool match_arrays(const size_t *array1, const size_t *array2) {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (array1[idx] != array2[idx]) return false;
    }
    return true;
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (!subject || !candidates) return;

    size_t subject_array[ALPHABET_SIZE] = {0};
    map_string_to_array(subject, subject_array);

    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate = candidates->candidate[c_idx].word;
        size_t candidate_array[ALPHABET_SIZE] = {0};

        if (!compare_lengths_and_case_insensitive(subject, candidate)) {
            map_string_to_array(candidate, candidate_array);
            candidates->candidate[c_idx].is_anagram = match_arrays(subject_array, candidate_array) ? IS_ANAGRAM : NOT_ANAGRAM;
        } else {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
        }
    }
}