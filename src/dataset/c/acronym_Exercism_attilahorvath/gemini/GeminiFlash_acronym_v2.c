#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        char *empty = (char*)malloc(1);
        if (empty) {
            *empty = '\0';
        }
        return empty;
    }

    int length = 0;
    int last_alnum = 0;
    int i = 0;
    char c;

    // First pass: Calculate the length of the abbreviation
    while ((c = phrase[i]) != '\0') {
        if (isalnum(c)) {
            if (!last_alnum) {
                length++;
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
        i++;
    }

    if (length == 0) {
        char *empty = (char*)malloc(1);
        if (empty) {
            *empty = '\0';
        }
        return empty;
    }

    char *abbreviation = (char*)malloc(length + 1);
    if (abbreviation == NULL) {
        return NULL; // Handle allocation failure
    }

    int j = 0;
    i = 0;
    last_alnum = 0;
    // Second pass: Populate the abbreviation
    while ((c = phrase[i]) != '\0') {
        if (isalnum(c)) {
            if (!last_alnum) {
                abbreviation[j++] = toupper(c);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
        i++;
    }

    abbreviation[j] = '\0';

    return abbreviation;
}