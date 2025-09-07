#include "two_fer.h"
#include <stdio.h>
#include <string.h>

void two_fer(char *buffer, const char *name) {
    const char *name_ptr = (name != NULL) ? name : "you";
    snprintf(buffer, 256, "One for %s, one for me.", name_ptr);
}