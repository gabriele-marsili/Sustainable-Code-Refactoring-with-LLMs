#include "binary.h"
#include <string.h>
#include <stdbool.h>

int convert(const char *binary)
{
    if (binary == NULL)
        return INVALID;

    size_t len = strlen(binary);
    if (len == 0)
        return INVALID;

    int result = 0;
    for (size_t i = 0; i < len; ++i) {
        if (binary[i] == '1') {
            if (len > 31 && i == 0) return INVALID;
            if (result > (INT_MAX >> 1)) return INVALID;
            result = (result << 1) | 1;
        } else if (binary[i] == '0') {
            if (len > 31 && i == 0) return INVALID;
            if (result > (INT_MAX >> 1)) return INVALID;
            result <<= 1;
        } else {
            return INVALID;
        }
    }

    return result;
}