#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>

char *abbreviate(char *phrase) {
    char *abbreviation = (char*)malloc(32);
    int length = 0;
    int last_alnum = 0;
    char c;

    for (int i = 0; (c = phrase[i]) != '\0' && length < 31; i++) {
        if (isalnum(c)) {
            if (!last_alnum) {
                abbreviation[length++] = toupper(c);
            }
            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    abbreviation[length] = '\0';
    
    char *result = (char*)realloc(abbreviation, length + 1);
    return result ? result : abbreviation;
}