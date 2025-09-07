#include "acronym.h"
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return NULL;
    }

    size_t phrase_len = strlen(phrase);
    char *abbrev = malloc(phrase_len + 1);
    if (abbrev == NULL) {
        fprintf(stderr, "Malloc failed.");
        exit(EXIT_FAILURE);
    }

    int abbrev_idx = 0;
    int take_next = 1;

    for (size_t i = 0; i < phrase_len; i++) {
        char c = phrase[i];
        
        if (c == ' ' || c == '-') {
            take_next = 1;
        } else if (take_next && isalpha(c)) {
            abbrev[abbrev_idx++] = toupper(c);
            take_next = 0;
        }
    }

    abbrev[abbrev_idx] = '\0';
    
    char *result = realloc(abbrev, abbrev_idx + 1);
    return result ? result : abbrev;
}