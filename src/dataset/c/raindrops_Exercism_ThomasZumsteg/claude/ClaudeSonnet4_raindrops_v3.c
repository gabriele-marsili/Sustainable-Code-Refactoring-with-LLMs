#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    char *ptr = sound;
    size_t remaining = len;
    
    if (num % 3 == 0) {
        const char pling[] = "Pling";
        for (int i = 0; i < 5 && remaining > 1; i++) {
            *ptr++ = pling[i];
            remaining--;
        }
    }
    
    if (num % 5 == 0) {
        const char plang[] = "Plang";
        for (int i = 0; i < 5 && remaining > 1; i++) {
            *ptr++ = plang[i];
            remaining--;
        }
    }
    
    if (num % 7 == 0) {
        const char plong[] = "Plong";
        for (int i = 0; i < 5 && remaining > 1; i++) {
            *ptr++ = plong[i];
            remaining--;
        }
    }
    
    if (ptr == sound) {
        snprintf(sound, len, "%d", num);
    } else {
        *ptr = '\0';
    }
    
    return sound;
}