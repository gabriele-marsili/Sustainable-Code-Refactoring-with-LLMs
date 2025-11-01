#include "binary.h"

// Convert string to int, binary digits. INVALID (-1) is
// returned if non 0 or 1 is found before end of string.
int convert(const char *input) {
    int val = 0;

    for (const char *curr = input; *curr; curr++) {
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