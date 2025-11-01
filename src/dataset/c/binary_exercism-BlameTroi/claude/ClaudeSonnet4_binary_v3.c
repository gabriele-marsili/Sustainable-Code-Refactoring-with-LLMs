#include "binary.h"

int convert(const char *input) {
    if (!input) return INVALID;
    
    int val = 0;
    const char *curr = input;
    
    while (*curr) {
        if (*curr == '0') {
            val <<= 1;
        } else if (*curr == '1') {
            val = (val << 1) | 1;
        } else {
            return INVALID;
        }
        curr++;
    }
    
    return val;
}