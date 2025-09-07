#include "anagram.h"

static size_t subject_array[ALPHABET_SIZE];
static size_t candidate_array[ALPHABET_SIZE];

static inline void empty_array(size_t *array) {
    memset(array, 0, ALPHABET_SIZE * sizeof(size_t));
}

static inline void map_string_to_array(const char *str, size_t *array) {
    if (!str || !array) return;
    
    for (const char *p = str; *p; p++) {
        if (*p >= 'a' && *p <= 'z') {
            array[*p - 'a']++;
        } else if (*p >= 'A' && *p <= 'Z') {
            array[*p - 'A']++;
        }
    }
}

static inline bool compare_strings(const char *subject, const char *candidate) {
    if (!subject || !candidate) return false;
    
    const char *s = subject;
    const char *c = candidate;
    
    while (*s && *c) {
        char s_upper = (*s >= 'a' && *s <= 'z') ? *s - 32 : *s;
        char c_upper = (*c >= 'a' && *c <= 'z') ? *c - 32 : *c;
        
        if (s_upper != c_upper) return false;
        s++;
        c++;
    }
    
    return *s == *c;
}

static inline bool match_arrays(void) {
    return memcmp(subject_array, candidate_array, ALPHABET_SIZE * sizeof(size_t)) == 0;
}

void find_anagrams(const char *subject, struct candidates *candidates) {
    if (!subject || !candidates) return;
    
    empty_array(subject_array);
    map_string_to_array(subject, subject_array);
    
    for (size_t c_idx = 0; c_idx < candidates->count; c_idx++) {
        const char *candidate = candidates->candidate[c_idx].word;
        
        empty_array(candidate_array);
        map_string_to_array(candidate, candidate_array);
        
        candidates->candidate[c_idx].is_anagram = 
            (!compare_strings(subject, candidate) && match_arrays()) ? 
            IS_ANAGRAM : NOT_ANAGRAM;
    }
}