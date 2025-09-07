#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>

#define MAX_LENGTH 32

char *abbreviate(char *phrase) {
    char buffer[MAX_LENGTH];
    int length = 0;
    int last_alnum = 0;
    char c;
    
    for (int i = 0; (c = phrase[i]) != '\0' && length < MAX_LENGTH; i++) {
        if (isalnum(c)) {
            if (!last_alnum) {
                buffer[length++] = toupper(c);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }
    
    char *abbreviation = (char*)malloc(length + 1);
    
    for (int i = 0; i < length; i++) {
        abbreviation[i] = buffer[i];
    }
    
    abbreviation[length] = '\0';
    
    return abbreviation;
}