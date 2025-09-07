#include "anagram.h"
#include <ctype.h>
#include <string.h>
#include <stdbool.h>

void empty_array(size_t *array, size_t length) {
    memset(array, 0, length * sizeof(size_t));
}

void map_string_to_array(const char *str, size_t *array) {
    if (str == NULL || array == NULL) return;
    for (const char *s = str; *s; ++s) {
        char c = *s;
        if (c >= 'a' && c <= 'z') {
            array[c - 'a']++;
        } else if (c >= 'A' && c <= 'Z') {
            array[c - 'A']++;
        }
    }
}

bool compare_strings(const char *subject, const char *candidate) {
    if (subject == NULL || candidate == NULL) return false;
    size_t subject_len = strlen(subject);
    if (subject_len != strlen(candidate)) return false;

    for (size_t idx = 0; idx < subject_len; idx++) {
        if (toupper((unsigned char)subject[idx]) != toupper((unsigned char)candidate[idx])) return false;
    }
    return true;
}

bool match_arrays(const size_t *arr1, const size_t *arr2) {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (arr1[idx] != arr2[idx]) return false;
    }
    return true;
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (subject == NULL || candidates == NULL) return;

    size_t subject_array[ALPHABET_SIZE];
    empty_array(subject_array, ALPHABET_SIZE);
    map_string_to_array(subject, subject_array);

    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate = candidates->candidate[c_idx].word;

        if (candidate == NULL) {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            continue;
        }

        if (compare_strings(subject, candidate)) {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            continue;
        }

        size_t candidate_array[ALPHABET_SIZE];
        empty_array(candidate_array, ALPHABET_SIZE);
        map_string_to_array(candidate, candidate_array);

        candidates->candidate[c_idx].is_anagram = (match_arrays(subject_array, candidate_array) ? IS_ANAGRAM : NOT_ANAGRAM);
    }
}