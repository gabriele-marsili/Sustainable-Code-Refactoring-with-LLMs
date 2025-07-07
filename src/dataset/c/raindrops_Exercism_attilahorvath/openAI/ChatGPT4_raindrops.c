#include "raindrops.h"
#include <stdio.h>
#include <string.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    buffer[0] = '\0';

    if (number % 3 == 0) strncat(buffer, "Pling", buffer_length - strlen(buffer) - 1);
    if (number % 5 == 0) strncat(buffer, "Plang", buffer_length - strlen(buffer) - 1);
    if (number % 7 == 0) strncat(buffer, "Plong", buffer_length - strlen(buffer) - 1);

    if (buffer[0] == '\0')
        snprintf(buffer, buffer_length, "%d", number);

    return buffer;
}
