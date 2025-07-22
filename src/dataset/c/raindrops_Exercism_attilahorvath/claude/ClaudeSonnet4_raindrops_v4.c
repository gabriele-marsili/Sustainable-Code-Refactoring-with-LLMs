#include "raindrops.h"
#include <stdio.h>
#include <string.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    const int mod3 = number % 3;
    const int mod5 = number % 5;
    const int mod7 = number % 7;
    
    if (mod3 == 0 || mod5 == 0 || mod7 == 0) {
        char *ptr = buffer;
        size_t remaining = buffer_length;
        
        if (mod3 == 0) {
            const size_t len = 5;
            if (remaining > len) {
                memcpy(ptr, "Pling", len);
                ptr += len;
                remaining -= len;
            }
        }
        
        if (mod5 == 0) {
            const size_t len = 5;
            if (remaining > len) {
                memcpy(ptr, "Plang", len);
                ptr += len;
                remaining -= len;
            }
        }
        
        if (mod7 == 0) {
            const size_t len = 5;
            if (remaining > len) {
                memcpy(ptr, "Plong", len);
                ptr += len;
                remaining -= len;
            }
        }
        
        if (remaining > 0) {
            *ptr = '\0';
        }
        
        return buffer;
    }
    
    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}