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

    // First pass: Determine the length of the acronym
    bool need_letter = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            need_letter = true;
        } else if (need_letter && isalpha(phrase[i])) {
            output_len++;
            need_letter = false;
        }
    }

    if (output_len == 0) {
        return NULL;
    }

    char *result = malloc(sizeof(char) * (output_len + 1));
    if (result == NULL) {
        return NULL;
    }

    // Second pass: Populate the acronym
    size_t result_index = 0;
    need_letter = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            need_letter = true;
        } else if (need_letter && isalpha(phrase[i])) {
            result[result_index++] = toupper(phrase[i]);
            need_letter = false;
        }
    }

    result[output_len] = '\0';
    return result;
}