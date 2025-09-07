#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return strdup("");
    }

    size_t phrase_len = strlen(phrase);
    char *abbr = malloc(phrase_len + 1);
    if (abbr == NULL) {
        return NULL;
    }

    size_t abbr_len = 0;
    bool need_abbr = true;

    for (size_t i = 0; i < phrase_len; ++i) {
        if (need_abbr) {
            abbr[abbr_len++] = toupper(phrase[i]);
            need_abbr = false;
        } else if (phrase[i] == ' ' || phrase[i] == '-') {
            need_abbr = true;
        }
    }

    abbr[abbr_len] = '\0';
    char *result = realloc(abbr, abbr_len + 1);
    if (result == NULL) {
        free(abbr);
        return NULL;
    }

    return result;
}