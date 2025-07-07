#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    const int div3 = number % 3 == 0;
    const int div5 = number % 5 == 0;
    const int div7 = number % 7 == 0;
    
    if (div3 | div5 | div7) {
        char *ptr = buffer;
        size_t remaining = buffer_length;
        
        if (div3) {
            const int written = snprintf(ptr, remaining, "Pling");
            ptr += written;
            remaining -= written;
        }
        if (div5) {
            const int written = snprintf(ptr, remaining, "Plang");
            ptr += written;
            remaining -= written;
        }
        if (div7) {
            snprintf(ptr, remaining, "Plong");
        }
        
        return buffer;
    }
    
    snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}