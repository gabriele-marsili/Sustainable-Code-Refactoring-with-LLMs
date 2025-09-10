#include "hello_world.h"
#include <stdio.h>

void hello(char *buffer, const char *name)
{
    const char *greeting = (name && *name) ? name : "World";
    sprintf(buffer, "Hello, %s!", greeting);
}