#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include <regex.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t * words);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

int word_count(const char *input_text, word_count_word_t * words) {
    int already_found_index;
    int words_found = 0;
    int err_no;

    char buffer[MAX_WORD_LENGTH + 1];
    const char *current_word_start;
    size_t word_length;

    memset(words, 0, MAX_WORDS * sizeof(*words));

    while (*input_text != '\0' && words_found < MAX_WORDS) {
        // Skip non-alphanumeric characters at the beginning of the word
        while (*input_text != '\0' && !isalnum((unsigned char)*input_text)) {
            input_text++;
        }

        if (*input_text == '\0') {
            break; // End of input
        }

        current_word_start = input_text;
        word_length = 0;

        // Extract the word
        while (isalnum((unsigned char)*input_text) || (*input_text == '\'' && isalnum((unsigned char)input_text[1]))) {
            if (word_length < MAX_WORD_LENGTH) {
                buffer[word_length++] = *input_text;
                input_text++;
                if (*input_text == '\'' && !isalnum((unsigned char)input_text[1])) {
                    input_text++;
                    break;
                }
            } else {
                return EXCESSIVE_LENGTH_WORD;
            }
        }

        if (word_length > 0) {
            buffer[word_length] = '\0';
            _str_tolower(buffer, word_length);

            already_found_index = _is_already_found(buffer, words);
            if (already_found_index != -1) {
                words[already_found_index].count++;
            } else {
                _safe_strncpy(words[words_found].text, buffer, word_length);
                words[words_found].count = 1;
                words_found++;
            }
        }
    }

    if (*input_text != '\0' && words_found == MAX_WORDS) {
        return EXCESSIVE_NUMBER_OF_WORDS;
    }

    return words_found;
}


int _is_already_found(const char *word, word_count_word_t * words) {
    int i;

    for (i = 0; i < MAX_WORDS; i++) {
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