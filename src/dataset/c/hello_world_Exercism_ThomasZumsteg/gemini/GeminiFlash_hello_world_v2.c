#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO "Hello, World"
#define HELLO_PREFIX "Hello, "
#define EXCLAMATION "!"

void hello(char *buffer, const char *name) {
    if (name == NULL) {
        name = "World";
    }

    size_t name_len = strlen(name);
    size_t prefix_len = strlen(HELLO_PREFIX);
    size_t exclamation_len = strlen(EXCLAMATION);

    memcpy(buffer, HELLO_PREFIX, prefix_len);
    memcpy(buffer + prefix_len, name, name_len);
    memcpy(buffer + prefix_len + name_len, EXCLAMATION, exclamation_len + 1); // Include null terminator
}