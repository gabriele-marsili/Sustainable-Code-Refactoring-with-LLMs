#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return calloc(1, sizeof(char));
    }

    size_t phrase_len = strlen(phrase);
    size_t abbr_len = 0;

    // First pass to count the number of characters in the acronym
    bool need_char = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (need_char) {
            abbr_len++;
            need_char = false;
        }
        if (phrase[i] == ' ' || phrase[i] == '-') {
            need_char = true;
        }
    }

    char *abbr = malloc(abbr_len + 1);
    if (abbr == NULL) {
        return NULL; // Handle memory allocation failure
    }

    size_t j = 0;
    need_char = true;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (need_char) {
            abbr[j++] = toupper(phrase[i]);
            need_char = false;
        }
        if (phrase[i] == ' ' || phrase[i] == '-') {
            need_char = true;
        }
    }
    abbr[abbr_len] = '\0';

    return abbr;
}