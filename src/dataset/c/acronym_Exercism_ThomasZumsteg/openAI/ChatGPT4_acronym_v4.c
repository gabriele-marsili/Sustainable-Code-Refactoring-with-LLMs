#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

int breaking_char(char c) {
    return c == ' ' || c == '-';
}

char *abbreviate(char *phrase) {
    size_t len = strlen(phrase);
    char *abbr = malloc(len + 1);
    if (!abbr) return NULL;

    char *q = abbr;
    int new_word = 1;

    for (char *p = phrase; *p; p++) {
        if (new_word && !breaking_char(*p)) {
            *q++ = toupper(*p);
            new_word = 0;
        }
        new_word = breaking_char(*p);
    }

    *q = '\0';
    return abbr;
}