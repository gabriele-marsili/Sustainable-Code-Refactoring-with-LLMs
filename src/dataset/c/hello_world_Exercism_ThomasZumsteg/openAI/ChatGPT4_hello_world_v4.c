#include <stdio.h>
#include <string.h>
#include "hello_world.h"

#define HELLO "Hello, World!"

void hello(char *buffer, const char *name)
{
    const char *greeting = (name && *name) ? name : "World";
    snprintf(buffer, strlen(greeting) + 9, "Hello, %s!", greeting);
}