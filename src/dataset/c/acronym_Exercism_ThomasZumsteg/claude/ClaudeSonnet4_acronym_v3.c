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
    int take_next = 1;
    
    for (const char *p = phrase; *p; p++) {
        if (take_next && isalpha(*p)) {
            *q++ = toupper(*p);
            take_next = 0;
        } else if (breaking_char(*p)) {
            take_next = 1;
        }
    }
    
    *q = '\0';
    
    size_t abbr_len = q - abbr;
    char *result = realloc(abbr, abbr_len + 1);
    return result ? result : abbr;
}