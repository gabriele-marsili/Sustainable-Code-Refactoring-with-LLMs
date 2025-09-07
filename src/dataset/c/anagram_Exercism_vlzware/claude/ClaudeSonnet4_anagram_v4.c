#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

static inline int normalize_and_copy(const char* src, char* dest, int max_len)
{
    int len = 0;
    const char* s = src;
    char* d = dest;
    
    while (*s && len < max_len - 1) {
        *d = tolower((unsigned char)*s);
        d++;
        s++;
        len++;
    }
    *d = '\0';
    return len;
}

static inline int compare_chars(const void *a, const void *b)
{
    return *(const char*)a - *(const char*)b;
}

static inline int quick_length_check(const char* word1, const char* word2)
{
    int len1 = 0, len2 = 0;
    const char* p1 = word1;
    const char* p2 = word2;
    
    while (*p1) { len1++; p1++; }
    while (*p2) { len2++; p2++; }
    
    return (len1 == len2) ? len1 : -1;
}

void anagrams_for(const char *word, struct candidates *candidates)
{
    if (!word || !candidates || candidates->count == 0)
        return;

    char normalized_word[MAX_STR_LEN];
    const int word_len = normalize_and_copy(word, normalized_word, MAX_STR_LEN);
    
    if (word_len == 0) {
        for (size_t i = 0; i < candidates->count; i++) {
            candidates->candidate[i].is_anagram = NOT_ANAGRAM;
        }
        return;
    }
    
    qsort(normalized_word, word_len, sizeof(char), compare_chars);

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *current = &candidates->candidate[i];
        
        const int candidate_len = quick_length_check(word, current->candidate);
        if (candidate_len != word_len) {
            current->is_anagram = NOT_ANAGRAM;
            continue;
        }
        
        char normalized_candidate[MAX_STR_LEN];
        normalize_and_copy(current->candidate, normalized_candidate, MAX_STR_LEN);
        qsort(normalized_candidate, candidate_len, sizeof(char), compare_chars);
        
        current->is_anagram = (memcmp(normalized_word, normalized_candidate, word_len) == 0) 
                             ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}