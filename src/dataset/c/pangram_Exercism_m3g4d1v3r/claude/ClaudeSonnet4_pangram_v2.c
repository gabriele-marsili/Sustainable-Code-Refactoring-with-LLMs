#include "pangram.h"

bool is_pangram(const char *sentence) {
    if (sentence == NULL) return false;
    
    uint32_t found_letters = 0;
    const uint32_t all_letters = (1U << ALPHABET_SIZE) - 1;
    
    for (const char *ptr = sentence; *ptr; ptr++) {
        char chr = *ptr;
        if (chr >= 'a' && chr <= 'z') {
            found_letters |= (1U << (chr - 'a'));
        } else if (chr >= 'A' && chr <= 'Z') {
            found_letters |= (1U << (chr - 'A'));
        }
        
        if (found_letters == all_letters) {
            return true;
        }
    }
    
    return found_letters == all_letters;
}