#include "binary.h"

int convert(const char *input) {
    int val = 0;

    for (const char *curr = input; *curr; ++curr) {
        if (*curr == '0') {
            val <<= 1;
        } else if (*curr == '1') {
            val = (val << 1) | 1;
        } else {
            return INVALID;
        }
    }

    return val;
}