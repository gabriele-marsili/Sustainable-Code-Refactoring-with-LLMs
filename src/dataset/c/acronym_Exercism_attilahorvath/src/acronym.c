#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>

#define MAX_LENGTH 32

char *abbreviate(char *phrase) {
    char *abbreviation = NULL;

    char buffer[MAX_LENGTH];

    int length = 0;
    int last_alnum = 0;
    int i, j = 0;
    char c;

    for (i = 0; (c = phrase[i]) != '\0'; i++) {
        if (isalnum(c)) {
            if (!last_alnum) {
                length++;
                buffer[j++] = toupper(c);
                if (j >= MAX_LENGTH) {
                    break;
                }
            }

            last_alnum = 1;
        } else {
            last_alnum = 0;
        }
    }

    abbreviation = (char*)malloc(length + 1);

    for (i = 0; i < length; i++) {
        abbreviation[i] = buffer[i];
    }

    abbreviation[i++] = '\0';

    return abbreviation;
}
