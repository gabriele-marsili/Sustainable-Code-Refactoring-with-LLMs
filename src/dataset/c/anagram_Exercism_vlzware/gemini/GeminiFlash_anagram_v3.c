#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

static bool is_anagram_optimized(const char *word1, const char *word2) {
    int len1 = strlen(word1);
    int len2 = strlen(word2);

    if (len1 != len2) {
        return false;
    }

    int char_counts[256] = {0};

    for (int i = 0; i < len1; i++) {
        char_counts[(unsigned char)tolower(word1[i])]++;
        char_counts[(unsigned char)tolower(word2[i])]--;
    }

    for (int i = 0; i < 256; i++) {
        if (char_counts[i] != 0) {
            return false;
        }
    }

    return true;
}

void anagrams_for(const char *word, struct candidates *candidates) {
    if ((word == NULL) || (candidates == NULL)) {
        return;
    }

    int word_len = strlen(word);
    char lower_word[MAX_STR_LEN];

    if (word_len >= MAX_STR_LEN) return;

    for (int i = 0; i < word_len; i++) {
        lower_word[i] = tolower(word[i]);
    }
    lower_word[word_len] = '\0';

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        int candidate_len = strlen(tmp->candidate);
        char lower_candidate[MAX_STR_LEN];

        if (candidate_len >= MAX_STR_LEN) {
            tmp->is_anagram = NOT_ANAGRAM;
            continue;
        }

        for (int j = 0; j < candidate_len; j++) {
            lower_candidate[j] = tolower(tmp->candidate[j]);
        }
        lower_candidate[candidate_len] = '\0';

        if (is_anagram_optimized(lower_word, lower_candidate)) {
            tmp->is_anagram = IS_ANAGRAM;
        } else {
            tmp->is_anagram = NOT_ANAGRAM;
        }
    }
}