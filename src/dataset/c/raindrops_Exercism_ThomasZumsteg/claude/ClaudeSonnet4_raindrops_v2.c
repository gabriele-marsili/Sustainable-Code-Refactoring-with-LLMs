#include "raindrops.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char *convert(char* sound, size_t len, int num) {
    char* ptr = sound;
    
    // Check divisibility and copy strings directly without strlen calls
    if (num % 3 == 0) {
        memcpy(ptr, "Pling", 5);
        ptr += 5;
    }
    
    if (num % 5 == 0) {
        memcpy(ptr, "Plang", 5);
        ptr += 5;
    }
    
    if (num % 7 == 0) {
        memcpy(ptr, "Plong", 5);
        ptr += 5;
    }
    
    // If no sounds were added, convert number to string
    if (ptr == sound) {
        snprintf(sound, len, "%d", num);
    } else {
        *ptr = '\0';
    }
    
    return sound;
}