#include <string>
#include <cstdint>
#include <algorithm>

namespace hexadecimal {

    int convert(std::string hex_num) {
        int32_t sum = 0;
        for (char c : hex_num) {
            int32_t digit;
            if (c >= '0' && c <= '9') {
                digit = c - '0';
            } else if (c >= 'a' && c <= 'f') {
                digit = c - 'a' + 10;
            } else if (c >= 'A' && c <= 'F') {
                digit = c - 'A' + 10;
            } else {
                return 0;
            }

            if (__builtin_mul_overflow(sum, 16, &sum)) {
                return 0;
            }
            if (__builtin_add_overflow(sum, digit, &sum)) {
                return 0;
            }
        }
        return sum;
    }
}