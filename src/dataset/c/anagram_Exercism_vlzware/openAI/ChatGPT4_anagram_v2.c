#include "anagram.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

/* Convert string to lowercase in-place */
void to_lowercase(char *str) {
    while (*str) {
        *str = tolower(*str);
        str++;
    }
}

/* Count character frequencies for a-z */
void count_char_freq(const char *str, int *freq) {
    memset(freq, 0, 26 * sizeof(int));
    while (*str) {
        if (isalpha(*str)) {
            freq[tolower(*str) - 'a']++;
        }
        str++;
    }
}

void anagrams_for(const char *word, struct candidates *candidates) {
    if (!word || !candidates) return;

    int word_freq[26];
    count_char_freq(word, word_freq);

    for (size_t i = 0; i < candidates->count; i++) {
        struct candidate *tmp = &(candidates->candidate[i]);
        int candidate_freq[26];
        count_char_freq(tmp->candidate, candidate_freq);

        if (memcmp(word_freq, candidate_freq, 26 * sizeof(int)) == 0) {
            tmp->is_anagram = IS_ANAGRAM;
        } else {
            tmp->is_anagram = NOT_ANAGRAM;
        }
    }
}