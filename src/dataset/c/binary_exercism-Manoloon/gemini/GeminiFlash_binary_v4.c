#include "binary.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int convert(const char *input) {
    if (input == NULL) return 0;

    size_t length = 0;
    const char *p = input;
    while (*p != '\0') {
        if (*p != '0' && *p != '1') {
            return INVALID;
        }
        p++;
        length++;
    }

    if (length == 0) return 0;

    int result = 0;
    for (size_t i = 0; i < length; ++i) {
        result <<= 1;
        if (input[i] == '1') {
            result |= 1;
        }
    }

    return result;
}