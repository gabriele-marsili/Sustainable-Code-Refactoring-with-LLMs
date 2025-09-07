#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return NULL;
    }

    size_t phrase_len = strlen(phrase);
    size_t acronym_len = 0;

    // First pass: Determine the length of the acronym
    bool new_word = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            new_word = true;
        } else if (new_word && isalpha(phrase[i])) {
            acronym_len++;
            new_word = false;
        }
    }

    if (acronym_len == 0) {
        return NULL;
    }

    char *acronym = (char *)malloc(sizeof(char) * (acronym_len + 1));
    if (acronym == NULL) {
        return NULL;
    }

    // Second pass: Populate the acronym
    size_t acronym_index = 0;
    new_word = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (phrase[i] == ' ' || phrase[i] == '-') {
            new_word = true;
        } else if (new_word && isalpha(phrase[i])) {
            acronym[acronym_index++] = toupper(phrase[i]);
            new_word = false;
        }
    }

    acronym[acronym_index] = '\0';
    return acronym;
}