#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    char *ptr = sound;
    size_t remaining = len - 1; // Reserve space for null terminator
    
    // Check divisibility once and store results
    int div3 = (num % 3 == 0);
    int div5 = (num % 5 == 0);
    int div7 = (num % 7 == 0);
    
    if (div3) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
        remaining -= 5;
    }
    
    if (div5 && remaining >= 5) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
        remaining -= 5;
    }
    
    if (div7 && remaining >= 5) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
        remaining -= 5;
    }
    
    // If no sounds were added, convert number to string
    if (ptr == sound) {
        snprintf(sound, len, "%d", num);
    } else {
        *ptr = '\0';
    }
    
    return sound;
}