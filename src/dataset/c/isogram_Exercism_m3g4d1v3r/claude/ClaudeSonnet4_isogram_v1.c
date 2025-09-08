#include "isogram.h"

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;
    
    uint32_t seen_mask = 0;
    
    while (*phrase != '\0') {
        char chr = *phrase++;
        int index = -1;
        
        if (chr >= 'a' && chr <= 'z') {
            index = chr - 'a';
        } else if (chr >= 'A' && chr <= 'Z') {
            index = chr - 'A';
        }
        
        if (index >= 0) {
            uint32_t bit_mask = 1U << index;
            if (seen_mask & bit_mask) return false;
            seen_mask |= bit_mask;
        }
    }
    
    return true;
}