#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

int breaking_char(char c) {
    return c == ' ' || c == '-';
}

char *abbreviate(const char *phrase) {
    if (!phrase || !*phrase) return NULL;

    size_t len = strlen(phrase);
    char *abbr = malloc(len + 1); // Allocate enough memory for the worst case
    if (!abbr) return NULL;

    char *q = abbr;
    int new_word = 1;

    for (const char *p = phrase; *p; p++) {
        if (new_word && isalpha(*p)) {
            *q++ = toupper(*p);
            new_word = 0;
        }
        new_word = breaking_char(*p) ? 1 : new_word;
    }

    *q = '\0'; // Null-terminate the string
    return abbr;
}