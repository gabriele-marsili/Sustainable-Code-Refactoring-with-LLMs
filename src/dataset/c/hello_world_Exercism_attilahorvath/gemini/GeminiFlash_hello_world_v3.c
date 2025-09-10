#include "hello_world.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    const char *effective_name = (name == NULL) ? "World" : name;
    size_t name_len = strlen(effective_name);

    if (name_len > BUFFER_LENGTH - 8) {
        strncpy(buffer, "Hello, ", BUFFER_LENGTH);
        strncat(buffer, effective_name, BUFFER_LENGTH - 8);
        buffer[BUFFER_LENGTH - 1] = '\0';
    } else {
        snprintf(buffer, BUFFER_LENGTH, "Hello, %s!", effective_name);
    }
}