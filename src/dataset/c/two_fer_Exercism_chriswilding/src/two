#include "two_fer.h"

#include <stddef.h>

void two_fer(char *buffer, const char *name)
{
    const char *default_name = "you";
    const char *used_name = name ? name : default_name;
    while (*used_name) {
        *buffer++ = *used_name++;
    }
    const char *suffix = ", one for me.";
    while (*suffix) {
        *buffer++ = *suffix++;
    }
    *buffer = '\0';
}