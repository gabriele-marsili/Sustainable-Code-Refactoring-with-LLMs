#include "binary.h"
#include <string.h>

int convert(char *digits) {
    if (!digits) return INVALID;

    size_t len = strlen(digits);
    if (len == 0) return 0;

    int total = 0;
    for (size_t i = 0; i < len; ++i) {
        char d = digits[i];
        if (d == '1') {
            if (total > (INT_MAX - 1) / 2) return INVALID;
            total = (total << 1) | 1;
        } else if (d == '0') {
            if (total > INT_MAX / 2) return INVALID;
            total <<= 1;
        } else {
            return INVALID;
        }
    }
    return total;
}