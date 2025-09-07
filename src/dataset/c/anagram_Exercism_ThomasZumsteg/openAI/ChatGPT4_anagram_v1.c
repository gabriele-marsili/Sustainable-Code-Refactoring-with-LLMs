#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

int comp(const void* element_1, const void* element_2) {
    return *((char *)element_1) - *((char *)element_2);
}

void to_lower_inplace(char *word) {
    for (int i = 0; word[i]; i++) {
        word[i] = tolower(word[i]);
    }
}

void extract_sorted_letters(const char *word, char *result) {
    strcpy(result, word);
    to_lower_inplace(result);
    qsort(result, strlen(result), sizeof(char), comp);
}

int is_anagram(const char *word1, const char *word2) {
    if (strcasecmp(word1, word2) == 0) {
        return 0;
    }
    char sorted1[MAX_STR_LEN], sorted2[MAX_STR_LEN];
    extract_sorted_letters(word1, sorted1);
    extract_sorted_letters(word2, sorted2);
    return strcmp(sorted1, sorted2) == 0;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };
    char sorted_anagram[MAX_STR_LEN];
    extract_sorted_letters(anagram, sorted_anagram);

    for (int i = 0; i < words.size; i++) {
        char sorted_word[MAX_STR_LEN];
        extract_sorted_letters(words.vec[i], sorted_word);
        if (strcmp(sorted_anagram, sorted_word) == 0 && strcasecmp(anagram, words.vec[i]) != 0) {
            matches.vec[matches.size] = malloc(strlen(words.vec[i]) + 1);
            strcpy(matches.vec[matches.size++], words.vec[i]);
        }
    }
    return matches;
}