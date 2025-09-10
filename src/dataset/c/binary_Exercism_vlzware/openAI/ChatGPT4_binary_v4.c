#include "binary.h"

int convert(const char *binary)
{
    if (!binary || !*binary)
        return INVALID;

    int res = 0;
    char c;

    while ((c = *binary++)) {
        if (c == '1') {
            res = (res << 1) | 1;
        } else if (c == '0') {
            res <<= 1;
        } else {
            return INVALID;
        }
    }

    return res;
}