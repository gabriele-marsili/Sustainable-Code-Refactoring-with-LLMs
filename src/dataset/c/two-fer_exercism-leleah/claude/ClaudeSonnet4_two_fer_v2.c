#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    static const char prefix[] = "One for ";
    static const char suffix[] = ", one for me.";
    
    if (name == NULL) {
        name = "you";
    }
    
    strcpy(buffer, prefix);
    strcat(buffer, name);
    strcat(buffer, suffix);
}