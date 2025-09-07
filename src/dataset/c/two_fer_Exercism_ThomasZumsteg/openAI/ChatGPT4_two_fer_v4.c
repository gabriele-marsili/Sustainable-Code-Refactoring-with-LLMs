#include "two_fer.h"
#include "stdio.h"
#include "string.h"

void two_fer(char *buffer, char *name) {
    const char *default_name = "you";
    const char *use_name = (name && *name) ? name : default_name;
    snprintf(buffer, 32, "One for %s, one for me.", use_name);
}