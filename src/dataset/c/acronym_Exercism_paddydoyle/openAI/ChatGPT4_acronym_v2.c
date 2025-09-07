#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return NULL;
    }

    size_t len = strlen(phrase);
    char *abbrev = malloc(len + 1);
    if (!abbrev) {
        return NULL;
    }

    size_t i = 0;
    int new_word = 1;

    for (size_t j = 0; j < len; j++) {
        if (isalpha(phrase[j]) && new_word) {
            abbrev[i++] = toupper(phrase[j]);
            new_word = 0;
        } else if (phrase[j] == ' ' || phrase[j] == '-') {
            new_word = 1;
        }
    }

    abbrev[i] = '\0';
    return abbrev;
}