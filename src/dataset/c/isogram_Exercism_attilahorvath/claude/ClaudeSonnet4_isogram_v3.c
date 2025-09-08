#include "isogram.h"
#include <ctype.h>
#include <stdint.h>

int isIsogram(const char *string) {
    uint32_t seen = 0;
    int c;
    
    for (int i = 0; (c = string[i]) != '\0'; i++) {
        if (c >= 'A' && c <= 'Z') {
            c += 32;
        } else if (c < 'a' || c > 'z') {
            continue;
        }
        
        uint32_t bit = 1U << (c - 'a');
        if (seen & bit) {
            return 0;
        }
        seen |= bit;
    }
    
    return 1;
}