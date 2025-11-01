#include "pangram.h"
#include <ctype.h>

bool is_pangram(const char *sentence) 
{
    if (sentence == NULL) return false;
    
    unsigned int alphabet_mask = 0;
    const unsigned int complete_mask = 0x3FFFFFF; // 26 bits set
    
    for (const char *ptr = sentence; *ptr; ++ptr) {
        if (*ptr >= 'A' && *ptr <= 'Z') {
            alphabet_mask |= 1U << (*ptr - 'A');
        } else if (*ptr >= 'a' && *ptr <= 'z') {
            alphabet_mask |= 1U << (*ptr - 'a');
        }
        
        if (alphabet_mask == complete_mask) {
            return true;
        }
    }
    
    return alphabet_mask == complete_mask;
}