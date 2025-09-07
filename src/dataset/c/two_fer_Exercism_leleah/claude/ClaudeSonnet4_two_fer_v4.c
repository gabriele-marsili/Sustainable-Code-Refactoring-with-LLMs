#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    static const char prefix[] = "One for ";
    static const char suffix[] = ", one for me.";
    static const char default_name[] = "you";
    
    const char *actual_name = name ? name : default_name;
    
    strcpy(buffer, prefix);
    strcat(buffer, actual_name);
    strcat(buffer, suffix);
}