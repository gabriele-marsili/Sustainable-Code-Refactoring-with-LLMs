#include "binary.h"

int convert(const char *digits) {
    int total = 0;
    char c;
    while ((c = *digits++)) {
        if (c == '1') {
            total = (total << 1) | 1;
        } else if (c == '0') {
            total <<= 1;
        } else {
            return INVALID;
        }
    }
    return total;
}