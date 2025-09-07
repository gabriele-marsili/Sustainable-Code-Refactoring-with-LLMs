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
    size_t len1 = strlen(word1), len2 = strlen(word2);
    if (len1 != len2) return 0;

    char *temp1 = malloc(len1 + 1);
    char *temp2 = malloc(len2 + 1);
    if (!temp1 || !temp2) {
        free(temp1);
        free(temp2);
        return 0;
    }

    strcpy(temp1, word1);
    strcpy(temp2, word2);

    to_lower_inplace(temp1);
    to_lower_inplace(temp2);

    sort_letters_inplace(temp1);
    sort_letters_inplace(temp2);

    int result = strcmp(temp1, temp2) == 0;

    free(temp1);
    free(temp2);

    return result;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };
    if (!matches.vec) return matches;

    size_t anagram_len = strlen(anagram);
    char *sorted_anagram = malloc(anagram_len + 1);
    if (!sorted_anagram) {
        free(matches.vec);
        matches.vec = NULL;
        return matches;
    }

    strcpy(sorted_anagram, anagram);
    to_lower_inplace(sorted_anagram);
    sort_letters_inplace(sorted_anagram);

    for (int i = 0; i < words.size; i++) {
        char *current_word = words.vec[i];
        size_t current_len = strlen(current_word);

        if (current_len != anagram_len) continue;

        char *sorted_word = malloc(current_len + 1);
        if (!sorted_word) continue;

        strcpy(sorted_word, current_word);
        to_lower_inplace(sorted_word);
        sort_letters_inplace(sorted_word);

        if (strcmp(sorted_word, sorted_anagram) == 0) {
            matches.vec[matches.size] = malloc(current_len + 1);
            if (matches.vec[matches.size]) {
                strcpy(matches.vec[matches.size++], current_word);
            }
        }

        free(sorted_word);
    }

    free(sorted_anagram);
    return matches;
}