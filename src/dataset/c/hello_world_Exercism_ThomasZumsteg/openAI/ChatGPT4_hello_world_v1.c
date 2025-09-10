#include <stdio.h>
#include <string.h>
#include "hello_world.h"

#define HELLO "Hello, "

void hello(char *buffer, const char *name)
{
    const char *greet_name = (name == NULL) ? "World" : name;
    strcpy(buffer, HELLO);
    strcat(buffer, greet_name);
    strcat(buffer, "!");
}