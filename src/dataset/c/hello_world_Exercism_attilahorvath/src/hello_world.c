#include "hello_world.h"
#include <stdio.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    if (name == NULL) {
        name = "World";
    }

    snprintf(buffer, BUFFER_LENGTH, "Hello, %s!", name);
}
