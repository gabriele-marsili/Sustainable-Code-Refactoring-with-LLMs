#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

int comp(const void* element_1, const void* element_2) {
    return tolower(*(const unsigned char*)element_1) - tolower(*(const unsigned char*)element_2);
}

char *lower(const char word[MAX_STR_LEN]) {
    size_t len = strlen(word);
    char *word_lower = malloc(len + 1);
    if (!word_lower) return NULL;

    for (size_t i = 0; i < len; i++) {
        word_lower[i] = tolower((unsigned char)word[i]);
    }
    word_lower[len] = '\0';
    return word_lower;
}

char *letters(const char word[MAX_STR_LEN]) {
    size_t len = strlen(word);
    char *letters = malloc(len + 1);
    if (!letters) return NULL;

    strcpy(letters, word);
    qsort(letters, len, sizeof(char), comp);
    return letters;
}

bool is_anagram(const char *word1, const char *word2) {
    size_t len1 = strlen(word1);
    size_t len2 = strlen(word2);

    if (len1 != len2) return false;

    char *lower1 = lower(word1);
    if (!lower1) return false;
    char *lower2 = lower(word2);
    if (!lower2) {
        free(lower1);
        return false;
    }

    if (!strcmp(lower1, lower2)) {
        free(lower1);
        free(lower2);
        return false;
    }
    free(lower1);
    free(lower2);

    char *letters1 = letters(word1);
    if (!letters1) return false;
    char *letters2 = letters(word2);
    if (!letters2) {
        free(letters1);
        return false;
    }

    bool result = !strcmp(letters1, letters2);
    free(letters1);
    free(letters2);
    return result;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };

    if (!matches.vec) {
        matches.size = 0;
        return matches;
    }

    for (int i = 0; i < words.size; i++) {
        if (is_anagram(words.vec[i], anagram)) {
            matches.vec[matches.size] = words.vec[i];
            matches.size++;
        }
    }
    return matches;
}