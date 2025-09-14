#include "binary.h"

int convert(char *digits) {
    int total = 0;
    for(char *d = digits; *d; d++) {
        if(*d == '1') {
            total = (total << 1) | 1;
        } else if(*d == '0') {
            total <<= 1;
        } else {
            return INVALID;
        }
    }
    return total;
}