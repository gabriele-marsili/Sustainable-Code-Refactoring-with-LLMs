#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    char *ptr = sound;
    
    if (num % 3 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (num % 5 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (num % 7 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (ptr == sound) {
        snprintf(sound, len, "%d", num);
    } else {
        *ptr = '\0';
    }
    
    return sound;
}