#include "binary.h"
#include <string.h>

int convert(char *digits) {
    if (!digits) return INVALID;

    int total = 0;
    size_t len = strlen(digits);

    for (size_t i = 0; i < len; ++i) {
        if (digits[i] == '1') {
            total = (total << 1) | 1;
        } else if (digits[i] == '0') {
            total <<= 1;
        } else {
            return INVALID;
        }

        if (total < 0) return INVALID; // Check for overflow
    }

    return total;
}