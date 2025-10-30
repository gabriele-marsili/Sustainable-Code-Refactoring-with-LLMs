#include "two_fer.h"

void two_fer(char *buffer, const char *name)
{char *first = "One for ";
 char *second = ", one for me.";
    if (name == NULL)
    {
        name= "you";
    }
    sprintf(buffer, "%s%s%s", first, name, second);
}