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

    // Extended regex.
    char *pattern = "[[:alnum:]]+('?[[:alnum:]]+)?";
    regex_t regex;

    char buffer[MAX_WORD_LENGTH + 1];

    regmatch_t result;

    //////////////////////////////////////////////////////////////////
    // Umm ok so we're re-using the 'actual' array in all of the tests
    // and so have to clear it completely before each run.
    //////////////////////////////////////////////////////////////////
    memset(words, 0, MAX_WORDS * sizeof(*words));

    /* Compile the regex */
    if ((err_no = regcomp(&regex, pattern, REG_EXTENDED | REG_ICASE)) != 0) {
        perror("Regex failed to compile.\n");
        exit(EXIT_FAILURE);
    }

    while (1) {
        if (regexec(&regex, input_text, 1, &result, 0) != 0) {
            break;
        }

        size_t word_len = result.rm_eo - result.rm_so;

        if (word_len > MAX_WORD_LENGTH) {
            regfree(&regex);
            return EXCESSIVE_LENGTH_WORD;
        }

        if (words_found >= MAX_WORDS) {
            regfree(&regex);
            return EXCESSIVE_NUMBER_OF_WORDS;
        }

        _safe_strncpy(buffer, input_text + result.rm_so, word_len);
        _str_tolower(buffer, word_len);

        already_found_index = _is_already_found(buffer, words);
        if (already_found_index != -1) {
            words[already_found_index].count += 1;
        } else {
            _safe_strncpy(words[words_found].text, buffer, word_len);
            words[words_found].count = 1;
            words_found++;
        }

        input_text += result.rm_eo; /* Update the offset */
    }

    regfree(&regex);

    return words_found;
}

// Horrible linear search of array. Dicts are nice.
int _is_already_found(const char *word, word_count_word_t * words) {
    int i;

    for (i = 0; i < MAX_WORDS; i++) {
        // Short-cut the search if possible.
        if (words[i].text[0] == '\0') {
            return -1;
        }

        if (strncasecmp(word, words[i].text, MAX_WORD_LENGTH) == 0) {
            return i;
        }
    }

    return -1;
}

// Horrible safe string copy, including null termination.
void _safe_strncpy(char *dest, const char *src, size_t n) {
    strncpy(dest, src, n);

    // Properly null terminate please.
    dest[n] = '\0';
}

// Horrible string tolower.
void _str_tolower(char *str, int len) {
    int i;

    for (i = 0; i < len; i++) {
        str[i] = tolower((unsigned char)str[i]);
    }
}