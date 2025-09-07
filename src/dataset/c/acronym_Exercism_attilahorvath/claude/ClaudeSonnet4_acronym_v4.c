#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>

char *abbreviate(char *phrase) {
    if (!phrase) return NULL;
    
    int length = 0;
    int last_alnum = 0;
    
    for (int i = 0; phrase[i] != '\0'; i++) {
        if (isalnum(phrase[i])) {
            if (!last_alnum) {
                length++;
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }
    
    if (length == 0) return NULL;
    
    char *abbreviation = malloc(length + 1);
    if (!abbreviation) return NULL;
    
    int j = 0;
    last_alnum = 0;
    
    for (int i = 0; phrase[i] != '\0' && j < length; i++) {
        if (isalnum(phrase[i])) {
            if (!last_alnum) {
                abbreviation[j++] = toupper(phrase[i]);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }
    
    abbreviation[j] = '\0';
    return abbreviation;
}