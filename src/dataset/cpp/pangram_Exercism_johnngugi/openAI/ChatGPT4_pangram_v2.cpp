#include <cctype>
#include <string>
#include "pangram.h"

namespace pangram {

    bool is_pangram(const std::string& text) {
        unsigned int mask = 0;
        for (char c : text) {
            if (isalpha(c)) {
                mask |= 1u << (tolower(c) - 'a');
                if (mask == 0x3FFFFFF) return true; // All 26 bits set
            }
        }
        return mask == 0x3FFFFFF;
    }
}