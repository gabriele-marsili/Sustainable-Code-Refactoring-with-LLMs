#include "pangram.h"

#include <ctype.h>

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    unsigned int mask = 0;
    const unsigned int pangram_mask = 0x3FFFFFF;
    
    for (const char *p = sentence; *p; p++) {
        if ((*p | 0x20) >= 'a' && (*p | 0x20) <= 'z') {
            mask |= 1U << ((*p | 0x20) - 'a');
            if (mask == pangram_mask) {
                return true;
            }
        }
    }
    
    return mask == pangram_mask;
}