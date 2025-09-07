#include "two_fer.h"

#include <stddef.h>

void two_fer(char *buffer, const char *name)
{
    const char *target = name ? name : "you";
    while (*target) {
        *buffer++ = *target++;
    }
    const char suffix[] = ", one for me.";
    for (size_t i = 0; suffix[i] != '\0'; ++i) {
        *buffer++ = suffix[i];
    }
    *buffer = '\0';
}