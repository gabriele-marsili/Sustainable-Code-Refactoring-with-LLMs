#include "reverse_string.h"
#include <algorithm>

namespace reverse_string {
    // Pass by const reference, then return string built from reverse iterators.
    std::string reverse_string(const std::string& s) {
        return std::string(s.rbegin(), s.rend());
    }

    // Pass by value, reverse and return.
    /* std::string reverse_string(std::string s) {
        std::reverse(s.begin(), s.end());
        return s;
       } */
} // namespace reverse_string
