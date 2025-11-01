#include "binary.h"
#include <string.h>

int convert(const char *input) {
    int res = 0;
    size_t len = strlen(input);
    for (size_t i = 0; i < len; ++i) {
        if (input[i] != '0' && input[i] != '1') {
            return INVALID;
        }
        if (input[i] == '1') {
            res = (res << 1) | 1;
        } else {
            res = res << 1;
        }
    }
    return res;
}