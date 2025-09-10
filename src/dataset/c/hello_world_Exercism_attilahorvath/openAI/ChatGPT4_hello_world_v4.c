#include "hello_world.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    const char *default_name = "World";
    if (!name || !*name) {
        name = default_name;
    }

    size_t name_length = strnlen(name, BUFFER_LENGTH - 8);
    snprintf(buffer, BUFFER_LENGTH, "Hello, %.*s!", (int)name_length, name);
}