#include "luhn.h"
#include <linux/limits.h>
#include <ctype.h>
#include <string.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;

    for (; *num; num++) {
        if (isdigit(*num)) {
            trimmed_len++;
        } else if (*num != ' ') {
            return false;
        }
    }
    return trimmed_len > 1;
}

bool luhn(const char *num) {
    if (!input_is_valid(num)) return false;

    size_t luhn = 0, j = 0;
    for (const char *ptr = num + strlen(num) - 1; ptr >= num; ptr--) {
        if (isdigit(*ptr)) {
            size_t value = *ptr - '0';
            if (++j % 2 == 0) {
                value = (value * 2 > 9) ? value * 2 - 9 : value * 2;
            }
            luhn += value;
        }
    }
    return luhn % 10 == 0;
}