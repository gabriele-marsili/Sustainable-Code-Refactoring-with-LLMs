#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, char *name) {
    const char* default_name = "you";
    const char* actual_name = (name != NULL && *name != '\0') ? name : default_name;

    strcpy(buffer, "One for ");
    strcat(buffer, actual_name);
    strcat(buffer, ", one for me.");
}