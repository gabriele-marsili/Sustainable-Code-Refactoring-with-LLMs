#include "binary.h"

int convert(const char *binary)
{
    if (!binary || !*binary)
        return INVALID;

    int res = 0;

    for (int i = 0; binary[i]; i++) {
        if (binary[i] == '1') {
            res = (res << 1) | 1;
        } else if (binary[i] == '0') {
            res <<= 1;
        } else {
            return INVALID;
        }
    }

    return res;
}