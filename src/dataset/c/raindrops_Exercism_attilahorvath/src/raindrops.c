#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    if (number % 3 == 0 || number % 5 == 0 || number % 7 == 0) {
        snprintf(buffer, buffer_length, "%s%s%s",
                 number % 3 == 0 ? "Pling" : "",
                 number % 5 == 0 ? "Plang" : "",
                 number % 7 == 0 ? "Plong" : "");
        return buffer;
    }

    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}
