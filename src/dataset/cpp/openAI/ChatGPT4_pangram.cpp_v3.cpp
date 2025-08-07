#include <string>
#include "pangram.h"

namespace pangram {

    bool is_pangram(std::string text) {
        unsigned int mask = 0;
        for (char c : text) {
            if (isalpha(c)) {
                mask |= 1u << (tolower(c) - 'a');
                if (mask == 0x3FFFFFF) return true;
            }
        }
        return mask == 0x3FFFFFF;
    }
}