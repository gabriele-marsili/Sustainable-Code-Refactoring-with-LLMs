#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    static const char *first = "One for ";
    static const char *second = ", one for me.";
    static const char *default_name = "you";
    
    const char *target_name = (name != NULL) ? name : default_name;
    
    strcpy(buffer, first);
    strcat(buffer, target_name);
    strcat(buffer, second);
}