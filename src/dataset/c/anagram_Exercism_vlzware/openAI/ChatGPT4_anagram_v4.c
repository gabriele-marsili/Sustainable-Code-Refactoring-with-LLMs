#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

void to_lowercase(char *str) {
    while (*str) {
        *str = tolower(*str);
        str++;
    }
}

int is_anagram(const char *word1, const char *word2, int len) {
    int char_count[256] = {0};
    for (int i = 0; i < len; i++) {
        char_count[(unsigned char)word1[i]]++;
        char_count[(unsigned char)word2[i]]--;
    }
    for (int i = 0; i < 256; i++) {
        if (char_count[i] != 0) return 0;
    }
    return 1;
}

void anagrams_for(const char *word, struct candidates *candidates) {
    if (!word || !candidates) return;

    char lower_word[MAX_STR_LEN];
    strncpy(lower_word, word, MAX_STR_LEN - 1);
    lower_word[MAX_STR_LEN - 1] = '\0';
    to_lowercase(lower_word);
    int word_len = strlen(lower_word);

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        char lower_candidate[MAX_STR_LEN];
        strncpy(lower_candidate, tmp->candidate, MAX_STR_LEN - 1);
        lower_candidate[MAX_STR_LEN - 1] = '\0';
        to_lowercase(lower_candidate);

        if (strlen(lower_candidate) != word_len || strcasecmp(lower_word, lower_candidate) == 0) {
            tmp->is_anagram = NOT_ANAGRAM;
        } else {
            tmp->is_anagram = is_anagram(lower_word, lower_candidate, word_len) ? IS_ANAGRAM : NOT_ANAGRAM;
        }
    }
}