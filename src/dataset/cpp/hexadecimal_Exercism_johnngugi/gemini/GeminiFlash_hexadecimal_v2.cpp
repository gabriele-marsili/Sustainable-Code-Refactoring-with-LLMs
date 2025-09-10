#include <string>
#include <cstdint>

namespace hexadecimal {

    int convert(const std::string& hex_num) {
        int32_t sum = 0;
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

            if (sum > (INT32_MAX >> 4)) {
                return 0; 
            }
            sum = (sum << 4) | digit;
        }
        return sum;
    }
}