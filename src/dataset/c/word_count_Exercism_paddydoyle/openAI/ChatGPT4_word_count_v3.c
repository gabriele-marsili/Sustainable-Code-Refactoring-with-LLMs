#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>

#include "word_count.h"

int _is_already_found(const char *word, word_count_word_t *words);
void _safe_strncpy(char *dest, const char *src, size_t n);
void _str_tolower(char *str, int len);

int word_count(const char *input_text, word_count_word_t *words) {
    int words_found = 0;

    const char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";
    regex_t regex;
    regmatch_t result;

    memset(words, 0, MAX_WORDS * sizeof(*words));

    if (regcomp(&regex, pattern, REG_EXTENDED | REG_ICASE) != 0) {
        return -1;
    }

    while (regexec(&regex, input_text, 1, &result, 0) == 0) {
        size_t word_length = result.rm_eo - result.rm_so;

        if (word_length > MAX_WORD_LENGTH) {
            regfree(&regex);
            return EXCESSIVE_LENGTH_WORD;
        }

        if (words_found >= MAX_WORDS) {
            regfree(&regex);
            return EXCESSIVE_NUMBER_OF_WORDS;
        }

        char buffer[MAX_WORD_LENGTH + 1];
        _safe_strncpy(buffer, input_text + result.rm_so, word_length);
        _str_tolower(buffer, word_length);

        int already_found_index = _is_already_found(buffer, words);
        if (already_found_index != -1) {
            words[already_found_index].count++;
        } else {
            _safe_strncpy(words[words_found].text, buffer, word_length);
            words[words_found].count = 1;
            words_found++;
        }

        input_text += result.rm_eo;
    }

    regfree(&regex);
    return words_found;
}

int _is_already_found(const char *word, word_count_word_t *words) {
    for (int i = 0; i < MAX_WORDS && words[i].text[0] != '\0'; i++) {
        if (strncasecmp(word, words[i].text, MAX_WORD_LENGTH) == 0) {
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