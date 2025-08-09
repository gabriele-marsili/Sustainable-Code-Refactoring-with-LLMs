#include <algorithm>
#include <vector>
#include "pangram.h"

namespace pangram {

    bool is_pangram(std::string text) {
        
        uint32_t seen = 0;
        const uint32_t all_letters = 0x3FFFFFF; // 26 bits set
        
        for (char c : text) {
            if (c >= 'A' && c <= 'Z') {
                seen |= (1u << (c - 'A'));
            } else if (c >= 'a' && c <= 'z') {
                seen |= (1u << (c - 'a'));
            }
            
            if (seen == all_letters) {
                return true;
            }
        }
        
        return seen == all_letters;
    }
}