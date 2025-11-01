#include "binary.h"

int convert(const char *input) {
    int val = 0;

    for (; *input; input++) {
        if (*input == '0') {
            val <<= 1;
        } else if (*input == '1') {
            val = (val << 1) | 1;
        } else {
            return INVALID;
        }
    }

    return val;
}