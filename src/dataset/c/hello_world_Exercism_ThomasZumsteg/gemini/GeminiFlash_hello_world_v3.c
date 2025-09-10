#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO_PREFIX "Hello, "
#define HELLO_SUFFIX "!"
#define DEFAULT_NAME "World"

void hello(char *buffer, const char *name) {
    if (name == NULL) {
        name = DEFAULT_NAME;
    }

    size_t name_len = strlen(name);
    size_t prefix_len = strlen(HELLO_PREFIX);
    size_t suffix_len = strlen(HELLO_SUFFIX);
    size_t total_len = prefix_len + name_len + suffix_len;

    memcpy(buffer, HELLO_PREFIX, prefix_len);
    memcpy(buffer + prefix_len, name, name_len);
    memcpy(buffer + prefix_len + name_len, HELLO_SUFFIX, suffix_len);
    buffer[total_len] = '\0';
}