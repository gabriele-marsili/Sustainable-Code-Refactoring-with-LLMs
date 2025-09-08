#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
    unsigned int mask = 0;
    
    if (phrase == NULL) {
        return false;
    }
    
    for (const char *p = phrase; *p; p++) {
        char c = *p;
        
        if (!isalpha(c) || c == ' ' || c == '-') {
            continue;
        }
        
        c = tolower(c);
        unsigned int bit_pos = c - 'a';
        
        if (mask & (1u << bit_pos)) {
            return false;
        }
        
        mask |= (1u << bit_pos);
    }
    
    return true;
}