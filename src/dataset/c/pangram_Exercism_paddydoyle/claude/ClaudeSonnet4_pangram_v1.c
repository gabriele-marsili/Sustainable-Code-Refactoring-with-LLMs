#include "pangram.h"

#include <ctype.h>

#define PANGRAM_MASK 0x3FFFFFF  // (1 << 26) - 1

bool is_pangram(const char *sentence) {
    unsigned int mask = 0;
    const char *ptr = sentence;
    
    if (sentence == NULL) {
        return false;
    }
    
    while (*ptr) {
        if (isalpha(*ptr)) {
            unsigned char c = tolower(*ptr);
            mask |= (1 << (c - 'a'));
            
            // Early exit if all letters found
            if (mask == PANGRAM_MASK) {
                return true;
            }
        }
        ptr++;
    }
    
    return mask == PANGRAM_MASK;
}