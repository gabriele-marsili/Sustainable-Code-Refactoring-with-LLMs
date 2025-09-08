#include "isogram.h"

bool is_isogram(const char phrase[]) {
    if (phrase == NULL) return false;
    
    uint32_t seen_lowercase = 0;
    uint32_t seen_uppercase = 0;
    
    while (*phrase != '\0') {
        char chr = *phrase++;
        
        if (chr >= 'a' && chr <= 'z') {
            uint32_t bit = 1U << (chr - 'a');
            if (seen_lowercase & bit) return false;
            seen_lowercase |= bit;
        } else if (chr >= 'A' && chr <= 'Z') {
            uint32_t bit = 1U << (chr - 'A');
            if (seen_uppercase & bit) return false;
            seen_uppercase |= bit;
        }
    }
    
    return true;
}