#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, char *name) {
    const char* person = (name && *name) ? name : "you";
    size_t person_len = strlen(person);
    
    memcpy(buffer, "One for ", 8);
    memcpy(buffer + 8, person, person_len);
    memcpy(buffer + 8 + person_len, ", one for me.", 14);
    buffer[8 + person_len + 14] = '\0';
}