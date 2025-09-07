#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return NULL;
    }

    size_t phrase_len = strlen(phrase);
    size_t output_len = 0;
    bool first_letter_flag = true;

    // First pass: Determine the length of the acronym
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            first_letter_flag = true;
        } else if (first_letter_flag && isalpha(phrase[i])) {
            output_len++;
            first_letter_flag = false;
        }
    }

    if (output_len == 0) {
        return NULL;
    }

    char *result = (char *)malloc(sizeof(char) * (output_len + 1));
    if (result == NULL) {
        return NULL;
    }

    size_t result_index = 0;
    first_letter_flag = true;

    // Second pass: Populate the acronym
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            first_letter_flag = true;
        } else if (first_letter_flag && isalpha(phrase[i])) {
            result[result_index++] = toupper(phrase[i]);
            first_letter_flag = false;
        }
    }

    result[output_len] = '\0';
    return result;
}