#include "hello_world.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    const char *greeting = (name && *name) ? name : "World";
    snprintf(buffer, BUFFER_LENGTH, "Hello, %s!", greeting);
}