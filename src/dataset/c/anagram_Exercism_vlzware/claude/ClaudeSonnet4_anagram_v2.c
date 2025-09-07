/**
 * Check for anagrams:
 *
 * O(n) optimized version using character frequency counting
 * More energy efficient than sorting approach
 */

#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

/* Convert to lowercase and get length */
static int normalize_and_length(const char* src, char* dest)
{
    int len = 0;
    while (*src) {
        dest[len] = tolower(*src);
        len++;
        src++;
    }
    dest[len] = '\0';
    return len;
}

/* Create frequency map for characters */
static void create_freq_map(const char* str, int len, int* freq)
{
    memset(freq, 0, 256 * sizeof(int));
    for (int i = 0; i < len; i++) {
        freq[(unsigned char)str[i]]++;
    }
}

/* Compare two frequency maps */
static int compare_freq_maps(const int* freq1, const int* freq2)
{
    for (int i = 0; i < 256; i++) {
        if (freq1[i] != freq2[i]) {
            return 0;
        }
    }
    return 1;
}

void anagrams_for(const char *word, struct candidates *candidates)
{
    if ((word == NULL) || (candidates == NULL))
        return;

    char normalized_word[MAX_STR_LEN];
    const int word_len = normalize_and_length(word, normalized_word);
    
    int word_freq[256];
    create_freq_map(normalized_word, word_len, word_freq);

    for (int i = 0; i < (int)candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        
        char normalized_candidate[MAX_STR_LEN];
        int candidate_len = normalize_and_length(tmp->candidate, normalized_candidate);
        
        if (candidate_len != word_len) {
            tmp->is_anagram = NOT_ANAGRAM;
        } else {
            int candidate_freq[256];
            create_freq_map(normalized_candidate, candidate_len, candidate_freq);
            tmp->is_anagram = compare_freq_maps(word_freq, candidate_freq) ? IS_ANAGRAM : NOT_ANAGRAM;
        }
    }
}