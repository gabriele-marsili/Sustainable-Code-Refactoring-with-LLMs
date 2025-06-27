#include "anagram.h"

size_t subject_array[ALPHABET_SIZE];
size_t candidate_array[ALPHABET_SIZE];

void empty_array(size_t *array, size_t length) {
    for (size_t idx = 0; idx < length; idx++) array[idx] = 0;
}

void map_string_to_array(const char *str, size_t *array) {
    if (str == NULL || array == NULL) return;
    while (*str != '\0') {
        if (*str >= 'a' && *str <= 'z') {
            array[*str - 'a']++;
        } else if (*str >= 'A' && *str <= 'Z') {
            array[*str - 'A']++;
        }
        str++;
    }
}

bool compare_strings(const char *subject, const char *candidate) {
    size_t subject_len;
    size_t candidate_len;

    if (subject == NULL || candidate == NULL) return (false);
    subject_len = strlen(subject);
    candidate_len = strlen(candidate);
    if (subject_len != candidate_len) return (false);
    for (size_t idx = 0; idx < subject_len; idx++) {
        if (toupper(subject[idx]) != toupper(candidate[idx])) return (false);
    }
    return (true);
}

bool match_arrays() {
    for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
        if (subject_array[idx] != candidate_array[idx]) return (false);
    }
    return (true);
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (subject == NULL || candidates == NULL) return;
    empty_array(subject_array, ALPHABET_SIZE);
    map_string_to_array(subject, subject_array);
    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate;
        empty_array(candidate_array, ALPHABET_SIZE);
        candidate = candidates->candidate[c_idx].word;
        map_string_to_array(candidate, candidate_array);
        if (compare_strings(subject, candidate) == false &&
            match_arrays() == true)
            candidates->candidate[c_idx].is_anagram = IS_ANAGRAM;
        else
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
    }
}
