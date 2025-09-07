#include "acronym.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAX_LENGTH 32

char *abbreviate(char *phrase) {
    if (phrase == NULL || *phrase == '\0') {
        return strdup("");
    }

    char *abbreviation = NULL;
    char buffer[MAX_LENGTH];
    int length = 0;
    int last_was_space = 1;
    int i;

    for (i = 0; phrase[i] != '\0' && length < MAX_LENGTH; i++) {
        if (isalpha(phrase[i])) {
            if (last_was_space) {
                buffer[length++] = toupper(phrase[i]);
            }
            last_was_space = 0;
        } else if (phrase[i] == ' ' || phrase[i] == '-') {
            last_was_space = 1;
        } else {
            last_was_space = 0;
        }
    }

    abbreviation = (char*)malloc(length + 1);
    if (abbreviation == NULL) {
        return NULL;
    }

    memcpy(abbreviation, buffer, length);
    abbreviation[length] = '\0';

    return abbreviation;
}