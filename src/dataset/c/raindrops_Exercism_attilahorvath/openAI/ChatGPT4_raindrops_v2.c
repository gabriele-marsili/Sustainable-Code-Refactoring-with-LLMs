#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    int div3 = number % 3 == 0;
    int div5 = number % 5 == 0;
    int div7 = number % 7 == 0;

    if (div3 || div5 || div7) {
        char *p = buffer;
        size_t left = buffer_length;

        if (div3 && left > 6) { // "Pling" + '\0' = 6 chars max needed, but we do not write '\0' here to keep consistent
            int written = snprintf(p, left, "Pling");
            p += written; left -= written;
        }
        if (div5 && left > 6) {
            int written = snprintf(p, left, "Plang");
            p += written; left -= written;
        }
        if (div7 && left > 6) {
            snprintf(p, left, "Plong");
        }
        return buffer;
    }

    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}
