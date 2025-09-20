#include "luhn.h"
#include <linux/limits.h>
#include <stdbool.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;

    for (; *num != '\0'; num++) {
        if (*num >= '0' && *num <= '9') {
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
        if (*ptr >= '0' && *ptr <= '9') {
            size_t value = *ptr - '0';
            if (++j % 2 == 0) {
                value *= 2;
                if (value > 9) value -= 9;
            }
            luhn += value;
        }
    }
    return luhn % 10 == 0;
}