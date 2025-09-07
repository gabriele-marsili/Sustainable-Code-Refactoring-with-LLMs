#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

int comp(const void* element_1, const void* element_2) {
    return tolower(*(const unsigned char*)element_1) - tolower(*(const unsigned char*)element_2);
}

bool are_same_string(const char *str1, const char *str2) {
    if (str1 == NULL || str2 == NULL) {
        return false;
    }
    size_t len1 = strlen(str1);
    size_t len2 = strlen(str2);

    if (len1 != len2) {
        return false;
    }

    for (size_t i = 0; i < len1; ++i) {
        if (tolower((unsigned char)str1[i]) != tolower((unsigned char)str2[i])) {
            return false;
        }
    }

    return true;
}

char *sorted_letters(const char *word) {
    if (word == NULL) {
        return NULL;
    }

    size_t len = strlen(word);
    char *letters = malloc(len + 1);
    if (!letters) return NULL;

    for (size_t i = 0; i < len; ++i) {
        letters[i] = word[i];
    }
    letters[len] = '\0';

    qsort(letters, len, sizeof(char), comp);
    return letters;
}

int is_anagram(const char *word1, const char *word2) {
    if (word1 == NULL || word2 == NULL) {
        return 0;
    }

    if (are_same_string(word1, word2)) {
        return 0;
    }

    char *sorted_word1 = sorted_letters(word1);
    if (!sorted_word1) return 0;

    char *sorted_word2 = sorted_letters(word2);
    if (!sorted_word2) {
        free(sorted_word1);
        return 0;
    }

    int result = (strcmp(sorted_word1, sorted_word2) == 0);

    free(sorted_word1);
    free(sorted_word2);

    return result;
}

struct Vector anagrams_for(char *anagram, struct Vector words) {
    struct Vector matches = {
        .vec = malloc(sizeof(char *) * words.size),
        .size = 0
    };

    if (!matches.vec) {
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