#include "anagram.h"

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (subject == NULL || candidates == NULL) return;
    
    size_t subject_array[ALPHABET_SIZE] = {0};
    size_t subject_len = 0;
    
    // Map subject string and calculate length in one pass
    const char *s = subject;
    while (*s != '\0') {
        if (*s >= 'a' && *s <= 'z') {
            subject_array[*s - 'a']++;
        } else if (*s >= 'A' && *s <= 'Z') {
            subject_array[*s - 'A']++;
        }
        subject_len++;
        s++;
    }
    
    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate = candidates->candidate[c_idx].word;
        
        if (candidate == NULL) {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            continue;
        }
        
        // Quick length check first
        size_t candidate_len = 0;
        const char *c = candidate;
        while (*c != '\0') {
            candidate_len++;
            c++;
        }
        
        if (subject_len != candidate_len) {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            continue;
        }
        
        // Check if strings are identical (case-insensitive)
        bool identical = true;
        for (size_t idx = 0; idx < subject_len; idx++) {
            char s_char = subject[idx];
            char c_char = candidate[idx];
            if (s_char >= 'a' && s_char <= 'z') s_char -= 32;
            if (c_char >= 'a' && c_char <= 'z') c_char -= 32;
            if (s_char != c_char) {
                identical = false;
                break;
            }
        }
        
        if (identical) {
            candidates->candidate[c_idx].is_anagram = NOT_ANAGRAM;
            continue;
        }
        
        // Map candidate string and compare arrays simultaneously
        size_t candidate_array[ALPHABET_SIZE] = {0};
        c = candidate;
        while (*c != '\0') {
            if (*c >= 'a' && *c <= 'z') {
                candidate_array[*c - 'a']++;
            } else if (*c >= 'A' && *c <= 'Z') {
                candidate_array[*c - 'A']++;
            }
            c++;
        }
        
        // Compare arrays
        bool is_anagram = true;
        for (size_t idx = 0; idx < ALPHABET_SIZE; idx++) {
            if (subject_array[idx] != candidate_array[idx]) {
                is_anagram = false;
                break;
            }
        }
        
        candidates->candidate[c_idx].is_anagram = is_anagram ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}