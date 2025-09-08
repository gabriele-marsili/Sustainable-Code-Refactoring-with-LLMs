#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) {
        return false;
    }
    
    unsigned int mask = 0;
    const char *p = phrase;
    
    while (*p) {
        char c = *p++;
        
        if (isalpha(c)) {
            c = tolower(c);
            unsigned int bit_pos = c - 'a';
            
            if (mask & (1u << bit_pos)) {
                return false;
            }
            
            mask |= (1u << bit_pos);
        }
    }
    
    return true;
}