#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/*
 * Optimized Anagram Checker
 *
 * This implementation prioritizes performance and efficiency by:
 * 1. Using character frequency counting instead of sorting, resulting in O(n) time complexity.
 * 2. Avoiding unnecessary memory allocation.
 * 3. Performing case-insensitive comparisons directly.
 * 4. Early exit optimization.
 */

static bool is_anagram_optimized(const char *word, const char *candidate) {
    if (word == NULL || candidate == NULL) {
        return false;
    }

    int word_len = 0;
    while (word[word_len] != '\0') {
        word_len++;
    }

    int candidate_len = 0;
    while (candidate[candidate_len] != '\0') {
        candidate_len++;
    }

    if (word_len != candidate_len) {
        return false;
    }

    if (word_len == 0) {
        return true; // Empty strings are anagrams of each other
    }

    int word_counts[256] = {0};
    int candidate_counts[256] = {0};

    for (int i = 0; i < word_len; i++) {
        word_counts[(unsigned char)tolower(word[i])]++;
        candidate_counts[(unsigned char)tolower(candidate[i])]++;
    }

    for (int i = 0; i < 256; i++) {
        if (word_counts[i] != candidate_counts[i]) {
            return false;
        }
    }

    return true;
}


void anagrams_for(const char *word, struct candidates *candidates) {
    if (word == NULL || candidates == NULL) {
        return;
    }

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &candidates->candidate[i];
        tmp->is_anagram = is_anagram_optimized(word, tmp->candidate) ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}