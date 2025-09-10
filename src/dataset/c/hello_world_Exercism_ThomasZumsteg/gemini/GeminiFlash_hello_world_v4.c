#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO_BASE "Hello, "
#define WORLD "World"
#define EXCLAMATION "!"

void hello(char *buffer, const char *name) {
    const char *effective_name = (name != NULL) ? name : WORLD;
    size_t base_len = strlen(HELLO_BASE);
    size_t name_len = strlen(effective_name);
    size_t exclamation_len = strlen(EXCLAMATION);

    memcpy(buffer, HELLO_BASE, base_len);
    memcpy(buffer + base_len, effective_name, name_len);
    memcpy(buffer + base_len + name_len, EXCLAMATION, exclamation_len);
    buffer[base_len + name_len + exclamation_len] = '\0';
}