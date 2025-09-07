#include "two_fer.h"
#include "stdio.h"
#include "string.h"

void two_fer(char *buffer, char *name) {
    const char *default_name = "you";
    const char *used_name = (name != NULL) ? name : default_name;
    snprintf(buffer, strlen("One for , one for me.") + strlen(used_name) + 1, "One for %s, one for me.", used_name);
}