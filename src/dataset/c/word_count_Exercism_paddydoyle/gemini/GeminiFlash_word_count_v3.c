#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t * words);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

int word_count(const char *input_text, word_count_word_t * words) {
    int already_found_index;
    int words_found = 0;

    // Initialize words array to empty strings and zero counts.
    for (int i = 0; i < MAX_WORDS; ++i) {
        words[i].text[0] = '\0';
        words[i].count = 0;
    }

    const char *delimiter = " ";
    char *token;
    char *input_copy = strdup(input_text); // Create a copy for strtok

    if (input_copy == NULL) {
        return -1; // Handle memory allocation failure
    }

    token = strtok(input_copy, delimiter);

    while (token != NULL) {
        size_t token_len = strlen(token);

        // Remove non-alphanumeric characters from the beginning and end
        while (token_len > 0 && !isalnum(token[0])) {
            token++;
            token_len--;
        }
        while (token_len > 0 && !isalnum(token[token_len - 1])) {
            token[token_len - 1] = '\0';
            token_len--;
        }

        if (token_len == 0) {
            token = strtok(NULL, delimiter);
            continue;
        }

        if (token_len > MAX_WORD_LENGTH) {
            free(input_copy);
            return EXCESSIVE_LENGTH_WORD;
        }

        if (words_found >= MAX_WORDS) {
            free(input_copy);
            return EXCESSIVE_NUMBER_OF_WORDS;
        }

        char buffer[MAX_WORD_LENGTH + 1];
        _safe_strncpy(buffer, token, token_len);
        _str_tolower(buffer, token_len);

        already_found_index = _is_already_found(buffer, words);

        if (already_found_index != -1) {
            words[already_found_index].count += 1;
        } else {
            _safe_strncpy(words[words_found].text, buffer, token_len);
            words[words_found].count = 1;
            words_found++;
        }

        token = strtok(NULL, delimiter);
    }

    free(input_copy);
    return words_found;
}

int _is_already_found(const char *word, word_count_word_t * words) {
    for (int i = 0; i < MAX_WORDS; i++) {
        if (words[i].text[0] == '\0') {
            return -1;
        }

        if (strcmp(word, words[i].text) == 0) {
            return i;
        }
    }

    return -1;
}

void _safe_strncpy(char *dest, const char *src, size_t n) {
    strncpy(dest, src, n);
    dest[n] = '\0';
}

void _str_tolower(char *str, int len) {
    for (int i = 0; i < len; i++) {
        str[i] = tolower((unsigned char)str[i]);
    }
}