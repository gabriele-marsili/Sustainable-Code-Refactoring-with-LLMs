#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    if (name == NULL)
    {
        name = "you";
    }
    strcpy(buffer, "One for ");
    strcat(buffer, name);
    strcat(buffer, ", one for me.");
}