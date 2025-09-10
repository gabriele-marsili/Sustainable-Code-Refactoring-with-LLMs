#include <string>
#include <algorithm>

namespace hexadecimal {

    int convert(std::string hex_num) {
        int sum = 0;
        for (char c : hex_num) {
            int digit;
            if (c >= '0' && c <= '9') {
                digit = c - '0';
            } else if (c >= 'a' && c <= 'f') {
                digit = c - 'a' + 10;
            } else if (c >= 'A' && c <= 'F') {
                digit = c - 'A' + 10;
            } else {
                return 0;
            }

            if (sum > (INT_MAX >> 4)) { // Check for potential overflow before shifting
                return 0;
            }
            sum = (sum << 4) | digit;
        }
        return sum;
    }
}