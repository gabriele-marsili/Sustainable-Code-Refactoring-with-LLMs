#include "anagram.h"
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

static int compare_chars(const void *a, const void *b) {
    return *(const char *)a - *(const char *)b;
}

static void string_to_lower(char *str) {
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
}

static char *sort_string(const char *str) {
    size_t len = strlen(str);
    char *sorted_str = malloc(len + 1);
    if (!sorted_str) return NULL;

    strcpy(sorted_str, str);
    qsort(sorted_str, len, sizeof(char), compare_chars);
    return sorted_str;
}

bool is_anagram(const char *word1, const char *word2) {
    size_t len1 = strlen(word1);
    size_t len2 = strlen(word2);

    if (len1 != len2 || strcmp(word1, word2) == 0) {
        return false;
    }

    char *lower_word1 = malloc(len1 + 1);
    char *lower_word2 = malloc(len2 + 1);

    if (!lower_word1 || !lower_word2) {
        free(lower_word1);
        free(lower_word2);
        return false;
    }

    strcpy(lower_word1, word1);
    strcpy(lower_word2, word2);

    string_to_lower(lower_word1);
    string_to_lower(lower_word2);

    char *sorted_word1 = sort_string(lower_word1);
    char *sorted_word2 = sort_string(lower_word2);

    free(lower_word1);
    free(lower_word2);

    if (!sorted_word1 || !sorted_word2) {
        free(sorted_word1);
        free(sorted_word2);
        return false;
    }

    bool result = (strcmp(sorted_word1, sorted_word2) == 0);

    free(sorted_word1);
    free(sorted_word2);

    return result;
}


struct Vector anagrams_for(char *anagram, struct Vector words) {
    size_t anagram_len = strlen(anagram);
    char *lower_anagram = malloc(anagram_len + 1);
    if (!lower_anagram) {
        struct Vector empty_matches = {NULL, 0};
        return empty_matches;
    }
    strcpy(lower_anagram, anagram);
    string_to_lower(lower_anagram);
    char *sorted_anagram = sort_string(lower_anagram);
    free(lower_anagram);

    struct Vector matches = {
        malloc(sizeof(char *) * words.size),
        0
    };

    if (!matches.vec) {
        free(sorted_anagram);
        struct Vector empty_matches = {NULL, 0};
        return empty_matches;
    }

    for (int i = 0; i < words.size; i++) {
        size_t word_len = strlen(words.vec[i]);

        if (anagram_len != word_len) continue;

        char *lower_word = malloc(word_len + 1);
        if (!lower_word) continue;

        strcpy(lower_word, words.vec[i]);
        string_to_lower(lower_word);
        char *sorted_word = sort_string(lower_word);
        free(lower_word);

        if (!sorted_word) continue;

        if (strcmp(sorted_anagram, sorted_word) == 0 && strcmp(anagram, words.vec[i]) != 0) {
            matches.vec[matches.size] = words.vec[i];
            matches.size++;
        }
        free(sorted_word);
    }
    free(sorted_anagram);
    return matches;
}