#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    int divisible_by_3 = (number % 3 == 0);
    int divisible_by_5 = (number % 5 == 0);
    int divisible_by_7 = (number % 7 == 0);

    if (divisible_by_3 || divisible_by_5 || divisible_by_7) {
        char *ptr = buffer;
        size_t remaining = buffer_length;

        if (divisible_by_3 && remaining > 6) {  // "Pling" + '\0' = 6 chars, but we write concatenated so just check length > 6 for safety
            int written = snprintf(ptr, remaining, "Pling");
            if (written > 0 && (size_t)written < remaining) {
                ptr += written;
                remaining -= written;
            }
        }
        if (divisible_by_5 && remaining > 5) {
            int written = snprintf(ptr, remaining, "Plang");
            if (written > 0 && (size_t)written < remaining) {
                ptr += written;
                remaining -= written;
            }
        }
        if (divisible_by_7 && remaining > 5) {
            snprintf(ptr, remaining, "Plong");
        }
        return buffer;
    }

    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}
