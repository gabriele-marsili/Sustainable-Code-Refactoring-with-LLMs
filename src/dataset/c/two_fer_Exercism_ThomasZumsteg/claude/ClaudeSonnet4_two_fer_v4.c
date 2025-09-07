#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, char *name) {
    if (name != NULL) {
        memcpy(buffer, "One for ", 8);
        strcpy(buffer + 8, name);
        strcpy(buffer + 8 + strlen(name), ", one for me.");
    } else {
        memcpy(buffer, "One for you, one for me.", 25);
    }
}