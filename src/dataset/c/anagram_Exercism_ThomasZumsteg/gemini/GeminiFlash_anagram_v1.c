#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

static int comp(const void* element_1, const void* element_2) {
    return tolower(*(const unsigned char*)element_1) - tolower(*(const unsigned char*)element_2);
}

static bool are_same_word(const char *word1, const char *word2) {
    size_t len1 = strlen(word1);
    size_t len2 = strlen(word2);

    if (len1 != len2) {
        return false;
    }

    for (size_t i = 0; i < len1; ++i) {
        if (tolower((unsigned char)word1[i]) != tolower((unsigned char)word2[i])) {
            return false;
        }
    }

    return true;
}

static char* sorted_letters(const char *word) {
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
    if (are_same_word(word1, word2)) {
        return 0;
    }

    char *sorted1 = sorted_letters(word1);
    if (!sorted1) return 0;

    char *sorted2 = sorted_letters(word2);
    if (!sorted2) {
        free(sorted1);
        return 0;
    }

    int result = (strcmp(sorted1, sorted2) == 0);

    free(sorted1);
    free(sorted2);

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