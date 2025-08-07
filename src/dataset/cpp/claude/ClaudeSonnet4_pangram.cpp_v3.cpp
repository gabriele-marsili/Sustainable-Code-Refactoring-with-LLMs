#include <algorithm>
#include <cstdint>
#include "pangram.h"

namespace pangram {

    bool is_pangram(std::string text) {
        std::uint32_t letter_mask = 0;
        constexpr std::uint32_t complete_mask = (1U << 26) - 1;
        
        for (char c : text) {
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                letter_mask |= 1U << ((c | 32) - 'a');
                if (letter_mask == complete_mask) {
                    return true;
                }
            }
        }
        
        return letter_mask == complete_mask;
    }
}