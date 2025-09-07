#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    static const char *first = "One for ";
    static const char *second = ", one for me.";
    
    if (name == NULL) {
        name = "you";
    }
    
    strcpy(buffer, first);
    strcat(buffer, name);
    strcat(buffer, second);
}