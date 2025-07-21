#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    size_t pos = 0;
    // Append "Pling" if divisible by 3
    if (num % 3 == 0) {
        const char *pling = "Pling";
        for (size_t i = 0; i < 5 && pos + 1 < len; ++i) {
            sound[pos++] = pling[i];
        }
    }
    // Append "Plang" if divisible by 5
    if (num % 5 == 0) {
        const char *plang = "Plang";
        for (size_t i = 0; i < 5 && pos + 1 < len; ++i) {
            sound[pos++] = plang[i];
        }
    }
    // Append "Plong" if divisible by 7
    if (num % 7 == 0) {
        const char *plong = "Plong";
        for (size_t i = 0; i < 5 && pos + 1 < len; ++i) {
            sound[pos++] = plong[i];
        }
    }
    if (pos == 0) {
        // No match found, convert number to string
        snprintf(sound, len, "%d", num);
    } else {
        sound[pos] = '\0';
    }
    return sound;
}
