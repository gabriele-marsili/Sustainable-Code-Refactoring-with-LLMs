#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO "Hello, World"
#define HELLO_PREFIX "Hello, "
#define HELLO_SUFFIX "!"

void hello(char *buffer, const char *name) {
    if (name == NULL) {
        name = "World";
    }

    size_t name_len = strlen(name);
    size_t prefix_len = sizeof(HELLO_PREFIX) - 1;
    size_t suffix_len = sizeof(HELLO_SUFFIX) - 1;

    memcpy(buffer, HELLO_PREFIX, prefix_len);
    memcpy(buffer + prefix_len, name, name_len);
    memcpy(buffer + prefix_len + name_len, HELLO_SUFFIX, suffix_len);
    buffer[prefix_len + name_len + suffix_len] = '\0';
}