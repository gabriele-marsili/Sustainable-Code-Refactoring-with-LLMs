#include "binary.h"

int convert(char *digits) {
    int total = 0;
    char d;
    while ((d = *digits++) != '\0') {
        if (d == '1') {
            total = (total << 1) | 1;
        } else if (d == '0') {
            total <<= 1;
        } else {
            return INVALID;
        }
    }
    return total;
}