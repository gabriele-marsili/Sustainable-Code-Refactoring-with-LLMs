#include <algorithm>
#include <vector>
#include "pangram.h"

namespace pangram {

    bool is_pangram(const std::string& text) {
        
        uint32_t seen = 0;
        
        for (char c : text) {
            if (c >= 'A' && c <= 'Z') {
                seen |= 1u << (c - 'A');
            } else if (c >= 'a' && c <= 'z') {
                seen |= 1u << (c - 'a');
            }
            
            if (seen == 0x3FFFFFF) {
                return true;
            }
        }
        
        return seen == 0x3FFFFFF;
    }
}