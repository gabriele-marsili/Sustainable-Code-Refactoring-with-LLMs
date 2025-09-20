#include "anagram.h"

size_t subject_array[ALPHABET_SIZE];

void empty_array(size_t *array, size_t length) {
    memset(array, 0, length * sizeof(size_t));
}

void map_string_to_array(const char *str, size_t *array) {
    while (str && *str) {
        if (*str >= 'a' && *str <= 'z') {
            array[*str - 'a']++;
        } else if (*str >= 'A' && *str <= 'Z') {
            array[*str - 'A']++;
        }
        str++;
    }
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

        if (candidate && strlen(subject) == strlen(candidate)) {
            size_t candidate_array[ALPHABET_SIZE] = {0};
            map_string_to_array(candidate, candidate_array);

            if (strcasecmp(subject, candidate) != 0 && match_arrays(subject_array, candidate_array)) {
                candidates->candidate[c_idx].is_anagram = IS_ANAGRAM;
            } else {
                candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            }
        } else {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
        }
    }
}