#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name)
{
    const char *default_name = "you";
    const char *first = "One for ";
    const char *second = ", one for me.";

    if (name == NULL)
    {
        name = default_name;
    }

    strcpy(buffer, first);
    strcat(buffer, name);
    strcat(buffer, second);
}