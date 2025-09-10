#include <stdio.h>
#include <string.h>
#include "hello_world.h"

#define DEFAULT_NAME "World"

void hello(char *buffer, const char *name)
{
    const char *greet_name = (name && *name) ? name : DEFAULT_NAME;
    snprintf(buffer, strlen("Hello, !") + strlen(greet_name) + 1, "Hello, %s!", greet_name);
}