#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return strdup("");
    }

    size_t phrase_len = strlen(phrase);
    size_t abbreviation_len = 0;
    char *abbreviation = NULL;
    char *temp = NULL;
    int last_alnum = 0;
    int i;

    for (i = 0; i < phrase_len; i++) {
        if (isalnum(phrase[i])) {
            if (!last_alnum) {
                abbreviation_len++;
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    if (abbreviation_len == 0) {
        return strdup("");
    }

    abbreviation = (char*)malloc(abbreviation_len + 1);
    if (abbreviation == NULL) {
        return NULL;
    }

    size_t j = 0;
    last_alnum = 0;
    for (i = 0; i < phrase_len; i++) {
        if (isalnum(phrase[i])) {
            if (!last_alnum) {
                abbreviation[j++] = toupper(phrase[i]);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    abbreviation[j] = '\0';

    return abbreviation;
}