#include "anagram.h"

static size_t subject_array[ALPHABET_SIZE];

static inline void empty_array(size_t *array) {
    memset(array, 0, ALPHABET_SIZE * sizeof(size_t));
}

static inline void map_string_to_array(const char *str, size_t *array) {
    while (*str) {
        char c = *str;
        if (c >= 'a' && c <= 'z') {
            array[c - 'a']++;
        } else if (c >= 'A' && c <= 'Z') {
            array[c - 'A']++;
        }
        str++;
    }
}

static inline bool strings_equal(const char *subject, const char *candidate) {
    while (*subject && *candidate) {
        if ((*subject | 32) != (*candidate | 32)) return false;
        subject++;
        candidate++;
    }
    return *subject == *candidate;
}

static inline bool arrays_match(const size_t *arr1, const size_t *arr2) {
    return memcmp(arr1, arr2, ALPHABET_SIZE * sizeof(size_t)) == 0;
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (!subject || !candidates) return;
    
    empty_array(subject_array);
    map_string_to_array(subject, subject_array);
    
    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        size_t candidate_array[ALPHABET_SIZE] = {0};
        const char *candidate = candidates->candidate[c_idx].word;
        
        map_string_to_array(candidate, candidate_array);
        
        candidates->candidate[c_idx].is_anagram = 
            (!strings_equal(subject, candidate) && arrays_match(subject_array, candidate_array)) 
            ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}