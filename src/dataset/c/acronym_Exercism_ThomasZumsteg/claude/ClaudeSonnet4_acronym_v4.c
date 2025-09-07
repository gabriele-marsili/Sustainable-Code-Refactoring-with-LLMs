#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

int breaking_char(char c) {
    return c == ' ' || c == '-';
}

char *abbreviate(char *phrase) {
    if (!phrase) return NULL;
    
    size_t len = strlen(phrase);
    if (len == 0) {
        char *abbr = malloc(1);
        *abbr = '\0';
        return abbr;
    }
    
    char *abbr = malloc(len + 1);
    char *q = abbr;
    int at_word_start = 1;
    
    for (const char *p = phrase; *p; p++) {
        if (at_word_start && isalpha(*p)) {
            *q++ = toupper(*p);
            at_word_start = 0;
        } else if (breaking_char(*p)) {
            at_word_start = 1;
        } else if (!isalpha(*p)) {
            at_word_start = 1;
        }
    }
    
    *q = '\0';
    return abbr;
}