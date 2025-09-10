#include "binary.h"

int convert(const char *binary)
{
    if (!binary || !*binary)
        return INVALID;

    int res = 0;

    for (const char *ptr = binary; *ptr; ++ptr) {
        res <<= 1;
        if (*ptr == '1')
            res |= 1;
        else if (*ptr != '0')
            return INVALID;
    }

    return res;
}