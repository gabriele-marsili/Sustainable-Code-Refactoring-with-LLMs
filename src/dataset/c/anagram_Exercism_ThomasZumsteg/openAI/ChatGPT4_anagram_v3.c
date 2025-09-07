#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

int comp(const void* element_1, const void* element_2) {
    return (*(char *)element_1) - (*(char *)element_2);
}

void to_lower_inplace(char *word) {
    for (int i = 0; word[i]; i++) {
        word[i] = tolower(word[i]);
    }
}

void sort_letters_inplace(char *word) {
    qsort(word, strlen(word), sizeof(char), comp);
}

int is_anagram(const char *word1, const char *word2) {
    if (strcasecmp(word1, word2) == 0) return 0;

    char temp1[MAX_STR_LEN], temp2[MAX_STR_LEN];
    strncpy(temp1, word1, MAX_STR_LEN);
    strncpy(temp2, word2, MAX_STR_LEN);

    to_lower_inplace(temp1);
    to_lower_inplace(temp2);

    sort_letters_inplace(temp1);
    sort_letters_inplace(temp2);

    return strcmp(temp1, temp2) == 0;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };

    char anagram_sorted[MAX_STR_LEN];
    strncpy(anagram_sorted, anagram, MAX_STR_LEN);
    to_lower_inplace(anagram_sorted);
    sort_letters_inplace(anagram_sorted);

    for (int i = 0; i < words.size; i++) {
        char word_sorted[MAX_STR_LEN];
        strncpy(word_sorted, words.vec[i], MAX_STR_LEN);
        to_lower_inplace(word_sorted);
        sort_letters_inplace(word_sorted);

        if (strcmp(anagram_sorted, word_sorted) == 0 && strcasecmp(anagram, words.vec[i]) != 0) {
            matches.vec[matches.size] = malloc(strlen(words.vec[i]) + 1);
            strcpy(matches.vec[matches.size++], words.vec[i]);
        }
    }

    return matches;
}