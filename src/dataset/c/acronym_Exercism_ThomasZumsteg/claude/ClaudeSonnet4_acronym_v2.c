#include "acronym.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

char *abbreviate(char *phrase) {
    int len = strlen(phrase);
    char *abbr = malloc(len + 1);
    char *q = abbr;
    char prev = ' ';
    
    for (int i = 0; i < len; i++) {
        char c = phrase[i];
        if (isalpha(c) && (prev == ' ' || prev == '-')) {
            *q++ = (c >= 'a' && c <= 'z') ? c - 32 : c;
        }
        prev = c;
    }
    
    *q = '\0';
    return realloc(abbr, q - abbr + 1);
}