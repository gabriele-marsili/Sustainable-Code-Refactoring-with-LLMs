#include <algorithm>
#include <vector>
#include "pangram.h"

namespace pangram {

    bool is_pangram(const std::string& text) {
        
        uint32_t seen = 0;
        
        for (char c : text) {
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                if (c >= 'A' && c <= 'Z') {
                    c += 32;
                }
                seen |= (1u << (c - 'a'));
                if (seen == 0x3FFFFFF) {
                    return true;
                }
            }
        }
        
        return seen == 0x3FFFFFF;
    }
}