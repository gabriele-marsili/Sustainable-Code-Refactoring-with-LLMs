#include "pangram.h"

#include <ctype.h>

#define PANGRAM_MASK 0x3FFFFFF

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    unsigned int mask = 0;
    const char *ptr = sentence;
    
    while (*ptr && mask != PANGRAM_MASK) {
        if ((*ptr | 0x20) >= 'a' && (*ptr | 0x20) <= 'z') {
            mask |= 1U << ((*ptr | 0x20) - 'a');
        }
        ptr++;
    }

    return mask == PANGRAM_MASK;
}