#include "pangram.h"
#include <ctype.h>

bool is_pangram(const char *sentence) 
{
    if (sentence == NULL) return false;
    
    unsigned int letter_mask = 0;
    const unsigned int complete_mask = 0x3FFFFFF;
    
    for (const char *ptr = sentence; *ptr; ++ptr) {
        int c = *ptr;
        if (c >= 'A' && c <= 'Z') {
            letter_mask |= 1U << (c - 'A');
        } else if (c >= 'a' && c <= 'z') {
            letter_mask |= 1U << (c - 'a');
        }
        
        if (letter_mask == complete_mask) {
            return true;
        }
    }
    
    return letter_mask == complete_mask;
}