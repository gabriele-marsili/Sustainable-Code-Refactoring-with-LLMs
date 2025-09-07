#include "two_fer.h"
#include "string.h"

void two_fer(char *buffer, char *name) {
    const char *prefix = "One for ";
    const char *suffix = ", one for me.";
    const char *default_name = "you";
    
    strcpy(buffer, prefix);
    strcat(buffer, name ? name : default_name);
    strcat(buffer, suffix);
}