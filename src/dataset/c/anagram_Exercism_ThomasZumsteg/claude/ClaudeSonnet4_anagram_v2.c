#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>

int comp(const void* element_1, const void* element_2) {
    return *((char *)element_1) - *((char *)element_2);
}

void normalize_word(const char *word, char *normalized) {
    int j = 0;
    for (int i = 0; word[i]; i++) {
        if (word[i] != ' ') {
            normalized[j++] = tolower(word[i]);
        }
    }
    normalized[j] = '\0';
}

void get_sorted_letters(const char *word, char *sorted) {
    normalize_word(word, sorted);
    qsort(sorted, strlen(sorted), sizeof(char), comp);
}

int is_anagram(const char *word1, const char *word2) {
    char normalized1[MAX_STR_LEN];
    char normalized2[MAX_STR_LEN];
    
    normalize_word(word1, normalized1);
    normalize_word(word2, normalized2);
    
    if (strcmp(normalized1, normalized2) == 0)
        return 0;
    
    char sorted1[MAX_STR_LEN];
    char sorted2[MAX_STR_LEN];
    
    strcpy(sorted1, normalized1);
    strcpy(sorted2, normalized2);
    
    qsort(sorted1, strlen(sorted1), sizeof(char), comp);
    qsort(sorted2, strlen(sorted2), sizeof(char), comp);
    
    return strcmp(sorted1, sorted2) == 0;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };
    
    char anagram_sorted[MAX_STR_LEN];
    get_sorted_letters(anagram, anagram_sorted);
    
    for(int i = 0; i < words.size; i++) {
        if (is_anagram(words.vec[i], anagram)) {
            matches.vec[matches.size] = malloc(strlen(words.vec[i]) + 1);
            strcpy(matches.vec[matches.size], words.vec[i]);
            matches.size++;
        }
    }
    return matches;
}