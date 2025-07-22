#include "raindrops.h"
#include <stdio.h>
#include <string.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    size_t offset = 0;

    if (number % 3 == 0) {
        offset += snprintf(buffer + offset, buffer_length - offset, "Pling");
    }
    if (number % 5 == 0) {
        offset += snprintf(buffer + offset, buffer_length - offset, "Plang");
    }
    if (number % 7 == 0) {
        offset += snprintf(buffer + offset, buffer_length - offset, "Plong");
    }

    if (offset == 0) {
        snprintf(buffer, buffer_length, "%d", number);
    }

    return buffer;
}