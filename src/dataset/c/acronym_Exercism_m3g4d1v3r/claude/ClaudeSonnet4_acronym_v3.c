#include "acronym.h"
#include <ctype.h>
#include <stdlib.h>

char *abbreviate(const char *phrase) {
    if (phrase == NULL) return NULL;
    
    size_t output_len = 0;
    const char *p = phrase;
    bool next_is_first = true;
    
    while (*p) {
        if (*p == ' ' || *p == '-') {
            next_is_first = true;
        } else if (next_is_first && isalpha(*p)) {
            output_len++;
            next_is_first = false;
        }
        p++;
    }
    
    if (output_len == 0) return NULL;
    
    char *result = malloc(output_len + 1);
    if (result == NULL) return NULL;
    
    char *out = result;
    p = phrase;
    next_is_first = true;
    
    while (*p) {
        if (*p == ' ' || *p == '-') {
            next_is_first = true;
        } else if (next_is_first && isalpha(*p)) {
            *out++ = toupper(*p);
            next_is_first = false;
        }
        p++;
    }
    
    *out = '\0';
    return result;
}