#include <stdio.h>
#include <string.h>
#include "hello_world.h"

#define HELLO "Hello, "

void hello(char *buffer, const char *name)
{
    if (name == NULL || *name == '\0')
        name = "World";
    strcpy(buffer, HELLO);
    strcat(buffer, name);
    strcat(buffer, "!");
}