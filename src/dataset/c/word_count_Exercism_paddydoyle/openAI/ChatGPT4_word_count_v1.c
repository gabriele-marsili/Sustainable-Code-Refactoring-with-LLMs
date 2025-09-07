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
    int already_found_index;
    int words_found = 0;

    // Extended regex.
    const char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";
    regex_t regex;
    regmatch_t result;

    char buffer[MAX_WORD_LENGTH + 1];

    // Clear the words array
    memset(words, 0, MAX_WORDS * sizeof(*words));

    // Compile the regex
    if (regcomp(&regex, pattern, REG_EXTENDED | REG_ICASE) != 0) {
        perror("Regex failed to compile.\n");
        return -1;
    }

    while (regexec(&regex, input_text, 1, &result, 0) == 0) {
        size_t match_length = result.rm_eo - result.rm_so;

        if (match_length > MAX_WORD_LENGTH) {
            regfree(&regex);
            return EXCESSIVE_LENGTH_WORD;
        }

        if (words_found >= MAX_WORDS) {
            regfree(&regex);
            return EXCESSIVE_NUMBER_OF_WORDS;
        }

        _safe_strncpy(buffer, input_text + result.rm_so, match_length);
        _str_tolower(buffer, match_length);

        if ((already_found_index = _is_already_found(buffer, words)) != -1) {
            words[already_found_index].count += 1;
        } else {
            _safe_strncpy(words[words_found].text, buffer, match_length);
            words[words_found].count = 1;
            words_found++;
        }

        input_text += result.rm_eo; // Update the offset
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