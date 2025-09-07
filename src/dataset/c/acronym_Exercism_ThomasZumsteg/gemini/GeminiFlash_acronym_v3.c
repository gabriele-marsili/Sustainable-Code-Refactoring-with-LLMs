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
    size_t abbr_len = 0;

    for (size_t i = 0; i < phrase_len; ++i) {
        if (i == 0 || phrase[i-1] == ' ' || phrase[i-1] == '-') {
            abbr_len++;
        }
    }

    char *abbr = malloc(abbr_len + 1);
    if (abbr == NULL) {
        return NULL;
    }

    size_t j = 0;
    for (size_t i = 0; i < phrase_len; ++i) {
        if (i == 0 || phrase[i-1] == ' ' || phrase[i-1] == '-') {
            abbr[j++] = toupper(phrase[i]);
        }
    }

    abbr[abbr_len] = '\0';
    return abbr;
}