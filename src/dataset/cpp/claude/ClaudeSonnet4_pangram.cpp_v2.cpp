#include <algorithm>
#include <vector>
#include "pangram.h"

namespace pangram {

    bool is_pangram(std::string text) {
        
        uint32_t letter_mask = 0;
        
        for (char c : text) {
            if (c >= 'A' && c <= 'Z') {
                letter_mask |= (1u << (c - 'A'));
            } else if (c >= 'a' && c <= 'z') {
                letter_mask |= (1u << (c - 'a'));
            }
            
            if (letter_mask == 0x3FFFFFF) {
                return true;
            }
        }
        
        return letter_mask == 0x3FFFFFF;
    }
}