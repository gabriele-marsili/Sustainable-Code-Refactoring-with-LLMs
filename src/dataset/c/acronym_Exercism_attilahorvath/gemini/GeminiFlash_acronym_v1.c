#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return strdup(""); // Return empty string for NULL or empty input
    }

    int length = 0;
    int last_alnum = 0;
    int i = 0;
    char c;
    char *abbreviation = NULL;
    char *result_ptr = NULL;

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
        return strdup(""); // Return empty string if no alphanumeric characters
    }

    abbreviation = (char*)malloc(length + 1);
    if (abbreviation == NULL) {
        return NULL; // Handle memory allocation failure
    }

    // Second pass: Populate the abbreviation
    i = 0;
    int j = 0;
    last_alnum = 0;
    result_ptr = abbreviation;

    while ((c = phrase[i]) != '\0') {
        if (isalnum(c)) {
            if (!last_alnum) {
                *result_ptr++ = toupper(c);
                j++;
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
        i++;
    }

    *result_ptr = '\0';

    return abbreviation;
}