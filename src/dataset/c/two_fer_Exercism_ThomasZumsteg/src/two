#include "two_fer.h"
#include "stdio.h"
#include "string.h"

void two_fer(char *buffer, char *name) {
    const char *default_name = "you";
    const char *used_name = (name != NULL) ? name : default_name;
    strcpy(buffer, "One for ");
    strcat(buffer, used_name);
    strcat(buffer, ", one for me.");
}