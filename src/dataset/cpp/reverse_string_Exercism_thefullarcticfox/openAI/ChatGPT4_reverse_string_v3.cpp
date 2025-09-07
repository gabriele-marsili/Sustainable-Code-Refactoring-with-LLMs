#include "reverse_string.h"

namespace reverse_string {
    std::string reverse_string(const std::string& str) {
        std::string reversed = str;
        std::reverse(reversed.begin(), reversed.end());
        return reversed;
    }
}  // namespace reverse_string