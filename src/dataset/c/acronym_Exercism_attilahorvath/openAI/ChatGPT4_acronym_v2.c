#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>

char *abbreviate(const char *phrase) {
    if (!phrase) return NULL;

    int length = 0;
    int last_alnum = 0;
    char c;

    // First pass: calculate the length of the abbreviation
    for (int i = 0; (c = phrase[i]) != '\0'; i++) {
        if (isalnum(c)) {
            if (!last_alnum) {
                length++;
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    // Allocate memory for the abbreviation
    char *abbreviation = (char *)malloc(length + 1);
    if (!abbreviation) return NULL;

    // Second pass: build the abbreviation
    int j = 0;
    last_alnum = 0;
    for (int i = 0; (c = phrase[i]) != '\0'; i++) {
        if (isalnum(c)) {
            if (!last_alnum) {
                abbreviation[j++] = toupper(c);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    abbreviation[j] = '\0';
    return abbreviation;
}