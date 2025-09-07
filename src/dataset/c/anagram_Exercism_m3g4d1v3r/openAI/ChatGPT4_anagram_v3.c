#include "anagram.h"
#include <ctype.h>
#include <string.h>

size_t subject_array[ALPHABET_SIZE];
size_t candidate_array[ALPHABET_SIZE];

void empty_array(size_t *array, size_t length) {
    memset(array, 0, length * sizeof(size_t));
}

void map_string_to_array(const char *str, size_t *array) {
    if (!str || !array) return;
    while (*str) {
        char ch = *str++;
        if (isalpha(ch)) {
            array[tolower(ch) - 'a']++;
        }
    }
}

bool compare_strings(const char *subject, const char *candidate) {
    if (!subject || !candidate) return false;
    size_t subject_len = strlen(subject);
    size_t candidate_len = strlen(candidate);
    if (subject_len != candidate_len) return false;
    for (size_t idx = 0; idx < subject_len; idx++) {
        if (tolower(subject[idx]) != tolower(candidate[idx])) return false;
    }
    return true;
}

bool match_arrays(const size_t *array1, const size_t *array2) {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (array1[idx] != array2[idx]) return false;
    }
    return true;
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (!subject || !candidates) return;
    empty_array(subject_array, ALPHABET_SIZE);
    map_string_to_array(subject, subject_array);
    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate = candidates->candidate[c_idx].word;
        empty_array(candidate_array, ALPHABET_SIZE);
        map_string_to_array(candidate, candidate_array);
        candidates->candidate[c_idx].is_anagram = 
            (!compare_strings(subject, candidate) && match_arrays(subject_array, candidate_array)) 
            ? IS_ANAGRAM 
            : NOT_ANAGRAM;
    }
}