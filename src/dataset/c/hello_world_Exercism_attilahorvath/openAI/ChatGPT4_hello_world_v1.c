#include "hello_world.h"
#include <stdio.h>
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    const char *greeting = "Hello, ";
    const char *default_name = "World";
    const char *target_name = (name != NULL) ? name : default_name;

    size_t greeting_len = strlen(greeting);
    size_t name_len = strlen(target_name);

    if (greeting_len + name_len + 2 < BUFFER_LENGTH) {
        memcpy(buffer, greeting, greeting_len);
        memcpy(buffer + greeting_len, target_name, name_len);
        buffer[greeting_len + name_len] = '!';
        buffer[greeting_len + name_len + 1] = '\0';
    } else {
        snprintf(buffer, BUFFER_LENGTH, "%s%s!", greeting, target_name);
    }
}