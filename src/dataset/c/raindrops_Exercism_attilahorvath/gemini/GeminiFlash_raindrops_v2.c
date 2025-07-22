#include "raindrops.h"
#include <stdio.h>
#include <string.h>
const char *convert(char *buffer, size_t buffer_length, int number) {
    size_t offset = 0;
    if (number % 3 == 0) {
        strncpy(buffer + offset, "Pling", buffer_length - offset);
        offset += strlen("Pling");
    }
    if (number % 5 == 0) {
        strncpy(buffer + offset, "Plang", buffer_length - offset);
        offset += strlen("Plang");
    }
    if (number % 7 == 0) {
        strncpy(buffer + offset, "Plong", buffer_length - offset);
        offset += strlen("Plong");
    }
    if (offset == 0) {
        snprintf(buffer, buffer_length, "%d", number);
    } else {
        buffer[offset] = '\0'; // Null-terminate the string
    }
    return buffer;
}