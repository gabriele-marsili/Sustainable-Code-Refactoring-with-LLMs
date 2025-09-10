#include "hello_world.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name) {
    const char *effective_name = (name != NULL) ? name : "World";
    size_t name_len = strlen(effective_name);

    if (name_len > BUFFER_LENGTH - 9) {
        name_len = BUFFER_LENGTH - 9;
    }

    memcpy(buffer, "Hello, ", 7);
    memcpy(buffer + 7, effective_name, name_len);
    buffer[7 + name_len] = '!';
    buffer[7 + name_len + 1] = '\0';
}