/**
 * Chech for anagrams:
 *
 * O(n) in the best case
 * O(log n) average
 * O(n^2) in the worst case
 *
 * i.e. one pass for each string + quicksort + strcmp
 *
 * A quicker solution is to use two vectors (arrays) of 26 (a-z)
 * but this would not work with unicode, or anything else than a-z
 */

#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* Function to check if two strings are anagrams */
bool is_anagram(const char *word1, const char *word2) {
    int len1 = 0, len2 = 0;
    int counts[26] = {0}; // Assuming only lowercase English letters

    // Calculate lengths and update character counts for word1
    while (word1[len1] != '\0') {
        if (!isalpha(word1[len1])) return false; // Only allow alphabet chars
        counts[tolower(word1[len1]) - 'a']++;
        len1++;
    }

    // Calculate length and update character counts for word2
    while (word2[len2] != '\0') {
        if (!isalpha(word2[len2])) return false; // Only allow alphabet chars
        counts[tolower(word2[len2]) - 'a']--;
        len2++;
    }

    // If lengths are different, they can't be anagrams
    if (len1 != len2) {
        return false;
    }

    // Check if all character counts are zero
    for (int i = 0; i < 26; i++) {
        if (counts[i] != 0) {
            return false;
        }
    }

    return true;
}


void anagrams_for(const char *word, struct candidates *candidates) {
    if ((word == NULL) || (candidates == NULL)) {
        return;
    }

    int word_len = 0;
    int word_counts[26] = {0};

    // Precompute the length and character counts of the input word
    while (word[word_len] != '\0') {
        if (!isalpha(word[word_len])) return; // early return if not alphabet
        word_counts[tolower(word[word_len]) - 'a']++;
        word_len++;
    }


    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &candidates->candidate[i];
        int candidate_len = 0;
        const char *candidate_word = tmp->candidate;

        // Early check for length difference
        while (candidate_word[candidate_len] != '\0') {
            candidate_len++;
        }

        if (candidate_len != word_len) {
            tmp->is_anagram = NOT_ANAGRAM;
            continue;
        }

        // Use the optimized is_anagram function
        tmp->is_anagram = is_anagram(word, candidate_word) ? IS_ANAGRAM : NOT_ANAGRAM;
    }
}