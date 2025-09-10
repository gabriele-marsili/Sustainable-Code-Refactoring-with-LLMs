#include "binary.h"
#include <stddef.h>

int convert(const char *binary)
{
    if (binary == NULL)
        return INVALID;

    int res = 0;
    int i = 0;

    while (binary[i] != '\0') {
        if (binary[i] == '1') {
            if (res > (INT_MAX >> 1)) return INVALID;
            res = (res << 1) | 1;
        } else if (binary[i] == '0') {
            if (res > (INT_MAX >> 1)) return INVALID;
            res = res << 1;
        } else {
            return INVALID;
        }
        i++;
    }

    return res;
}