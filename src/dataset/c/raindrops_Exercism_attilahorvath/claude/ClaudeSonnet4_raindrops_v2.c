#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    int mod3 = number % 3;
    int mod5 = number % 5;
    int mod7 = number % 7;
    
    if (mod3 == 0 || mod5 == 0 || mod7 == 0) {
        char *p = buffer;
        size_t remaining = buffer_length;
        
        if (mod3 == 0) {
            const char *pling = "Pling";
            while (*pling && remaining > 1) {
                *p++ = *pling++;
                remaining--;
            }
        }
        
        if (mod5 == 0) {
            const char *plang = "Plang";
            while (*plang && remaining > 1) {
                *p++ = *plang++;
                remaining--;
            }
        }
        
        if (mod7 == 0) {
            const char *plong = "Plong";
            while (*plong && remaining > 1) {
                *p++ = *plong++;
                remaining--;
            }
        }
        
        *p = '\0';
        return buffer;
    }

    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}