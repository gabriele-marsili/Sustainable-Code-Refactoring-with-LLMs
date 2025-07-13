#include "raindrops.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char *convert(char* sound, size_t len, int num) {
    // Clear the buffer and initialize length tracking.
    sound[0] = '\0';
    size_t current_len = 0;
    // Check for "Pling"
    if (num % 3 == 0) {
        strncat(sound, "Pling", len - current_len -1);
        current_len += strlen("Pling");
    }
    // Check for "Plang"
    if (num % 5 == 0) {
        strncat(sound, "Plang", len - current_len -1);
        current_len += strlen("Plang");
    }
    // Check for "Plong"
    if (num % 7 == 0) {
        strncat(sound, "Plong", len - current_len -1);
        current_len += strlen("Plong");
    }
    // If no "Pling", "Plang", or "Plong" was appended, convert the number to a string.
    if (current_len == 0) {
        snprintf(sound, len, "%d", num);
    }
    return sound;
}