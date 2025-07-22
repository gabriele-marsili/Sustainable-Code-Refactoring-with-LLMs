#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    int div3 = (number % 3 == 0);
    int div5 = (number % 5 == 0);
    int div7 = (number % 7 == 0);

    if (div3 || div5 || div7) {
        char *p = buffer;
        size_t remaining = buffer_length;

        if (div3 && remaining > 6) {
            const char *s = "Pling";
            while (*s) { *p++ = *s++; remaining--; }
        }
        if (div5 && remaining > 6) {
            const char *s = "Plang";
            while (*s) { *p++ = *s++; remaining--; }
        }
        if (div7 && remaining > 6) {
            const char *s = "Plong";
            while (*s) { *p++ = *s++; remaining--; }
        }
        *p = '\0';
        return buffer;
    }

    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}
