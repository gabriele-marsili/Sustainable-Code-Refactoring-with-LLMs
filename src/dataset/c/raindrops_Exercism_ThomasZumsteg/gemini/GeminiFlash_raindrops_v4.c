#include "raindrops.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char *convert(char* sound, size_t len, int num) {
    size_t offset = 0;
    if (num % 3 == 0) {
        memcpy(sound + offset, "Pling", 5);
        offset += 5;
    }
    if (num % 5 == 0) {
        memcpy(sound + offset, "Plang", 5);
        offset += 5;
    }
    if (num % 7 == 0) {
        memcpy(sound + offset, "Plong", 5);
        offset += 5;
    }
    if (offset == 0) {
        snprintf(sound, len, "%d", num);
    } else {
        sound[offset] = '\0';
    }
    return sound;
}