#include <cctype>
#include "hexadecimal.h"

namespace hexadecimal {

    int convert(const std::string& hex_num) {
        int sum = 0;

        for (char c : hex_num) {
            if (std::isdigit(c)) {
                sum = (sum << 4) + (c - '0');
            } else if (std::isxdigit(c)) {
                sum = (sum << 4) + 10 + (std::tolower(c) - 'a');
            } else {
                return 0;
            }
        }
        return sum;
    }
}