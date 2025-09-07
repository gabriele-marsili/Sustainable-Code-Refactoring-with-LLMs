#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, char *name) {
    const char* default_name = "you";
    const char* name_to_use = (name != NULL) ? name : default_name;

    strcpy(buffer, "One for ");
    strcat(buffer, name_to_use);
    strcat(buffer, ", one for me.");
}