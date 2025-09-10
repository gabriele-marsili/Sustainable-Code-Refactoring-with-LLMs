#include <string>
#include "hexadecimal.h"

namespace hexadecimal {

    int convert(const std::string& hex_num) {
        int sum = 0;

        for (char c : hex_num) {
            if ('0' <= c && c <= '9') {
                sum = (sum << 4) + (c - '0');
            }
            else if ('a' <= c && c <= 'f') {
                sum = (sum << 4) + (10 + (c - 'a'));
            }
            else if ('A' <= c && c <= 'F') {
                sum = (sum << 4) + (10 + (c - 'A'));
            }
            else {
                return 0;
            }
        }
        return sum;
    }
}