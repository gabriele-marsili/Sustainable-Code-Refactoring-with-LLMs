#include "two_fer.h"
#include <string.h>

void two_fer(char *buffer, const char *name) {
    const char *first = "One for ";
    const char *second = ", one for me.";
    const char *default_name = "you";

    if (name == NULL) {
        name = default_name;
    }

    size_t first_len = strlen(first);
    size_t name_len = strlen(name);
    size_t second_len = strlen(second);

    memcpy(buffer, first, first_len);
    memcpy(buffer + first_len, name, name_len);
    memcpy(buffer + first_len + name_len, second, second_len);
    buffer[first_len + name_len + second_len] = '\0';
}