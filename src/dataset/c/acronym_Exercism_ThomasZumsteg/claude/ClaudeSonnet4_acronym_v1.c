#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

char *abbreviate(char *phrase) {
    if (!phrase) return NULL;
    
    size_t len = strlen(phrase);
    char *abbr = malloc(len + 1);
    if (!abbr) return NULL;
    
    char *q = abbr;
    char prev = ' ';
    
    for (char *p = phrase; *p; p++) {
        if ((prev == ' ' || prev == '-') && isalpha(*p)) {
            *q++ = toupper(*p);
        }
        prev = *p;
    }
    
    *q = '\0';
    return realloc(abbr, q - abbr + 1);
}