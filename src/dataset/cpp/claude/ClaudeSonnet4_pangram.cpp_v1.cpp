#include <algorithm>
#include <vector>
#include "pangram.h"

namespace pangram {

    bool is_pangram(std::string text) {
        
        uint32_t letter_mask = 0;
        constexpr uint32_t all_letters = (1U << 26) - 1;
        
        for (char c : text) {
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                char lower_c = c | 0x20;  // Fast lowercase conversion
                letter_mask |= 1U << (lower_c - 'a');
                
                if (letter_mask == all_letters) {
                    return true;  // Early exit when all letters found
                }
            }
        }
        
        return letter_mask == all_letters;
    }
}