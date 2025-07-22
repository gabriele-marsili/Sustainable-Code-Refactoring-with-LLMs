#include "raindrops.h"
#include <stdio.h>
#include <string.h>
const char *convert(char *buffer, size_t buffer_length, int number) {
    size_t offset = 0;
    _Bool has_prime_factor = 0;
    if (number % 3 == 0) {
        strncpy(buffer + offset, "Pling", buffer_length - offset);
        offset += strlen("Pling");
        has_prime_factor = 1;
    }
    if (number % 5 == 0) {
        strncpy(buffer + offset, "Plang", buffer_length - offset);
        offset += strlen("Plang");
        has_prime_factor = 1;
    }
    if (number % 7 == 0) {
        strncpy(buffer + offset, "Plong", buffer_length - offset);
        offset += strlen("Plong");
        has_prime_factor = 1;
    }
    if (has_prime_factor) {
        buffer[offset] = '\0';
        return buffer;
    }
    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}