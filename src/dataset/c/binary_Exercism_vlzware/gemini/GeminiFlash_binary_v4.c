#include "binary.h"
#include <string.h>
#include <stdbool.h>

int convert(const char *binary) {
    if (binary == NULL) {
        return INVALID;
    }

    int len = 0;
    while (binary[len] != '\0') {
        len++;
    }

    if (len == 0) {
        return INVALID;
    }

    int result = 0;
    for (int i = 0; i < len; ++i) {
        if (binary[i] == '1') {
            result = (result << 1) | 1;
        } else if (binary[i] == '0') {
            result = result << 1;
        } else {
            return INVALID;
        }
    }

    return result;
}