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
    int at_word_start = 1;

    for (size_t i = 0; i < phrase_len; i++) {
        char c = phrase[i];
        
        if (c == ' ' || c == '-') {
            at_word_start = 1;
        } else if (at_word_start && isalpha(c)) {
            abbrev[abbrev_idx++] = toupper(c);
            at_word_start = 0;
        }
    }

    abbrev[abbrev_idx] = '\0';
    
    // Resize to actual needed size
    char *result = realloc(abbrev, abbrev_idx + 1);
    return result ? result : abbrev;
}