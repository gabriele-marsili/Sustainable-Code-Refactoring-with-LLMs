#include "binary.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int convert(const char *input) {
    if (input == NULL) return 0;

    size_t length = 0;
    while (input[length] != '\0') {
        length++;
    }

    if (length == 0) return 0;

    int result = 0;
    for (size_t i = 0; i < length; ++i) {
        if (!isdigit(input[i])) return INVALID;

        if (input[i] == '1') {
            if (__builtin_mul_overflow(result, 2, &result)) return INVALID;
            result += 1;
        } else if (input[i] == '0') {
            if (__builtin_mul_overflow(result, 2, &result)) return INVALID;
        } else {
            return INVALID;
        }
    }

    return result;
}