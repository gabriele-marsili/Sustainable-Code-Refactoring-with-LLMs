#include "binary.h"

int convert(const char *input)
{
    int res = 0;
    const char *ptr = input;
    
    while (*ptr) {
        if (*ptr != '0' && *ptr != '1') {
            return INVALID;
        }
        res = (res << 1) + (*ptr - '0');
        ptr++;
    }
    
    return res;
}