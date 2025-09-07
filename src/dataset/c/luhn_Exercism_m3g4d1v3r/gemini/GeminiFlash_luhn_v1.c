#include "luhn.h"
#include <stdbool.h>
#include <stddef.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;
    const char *p = num;

    while (*p != '\0') {
        if (*p >= '0' && *p <= '9') {
            trimmed_len++;
        } else if (*p != ' ') {
            return false;
        }
        p++;
    }
    return trimmed_len > 1;
}

bool luhn(const char *num) {
    size_t luhn = 0;
    size_t j = 0;
    size_t value;
    size_t num_len = 0;
    const char *p = num;

    if (!input_is_valid(num)) {
        return false;
    }

    while (num[num_len] != '\0') {
        num_len++;
    }

    for (size_t i = num_len; i > 0; i--) {
        if (num[i - 1] >= '0' && num[i - 1] <= '9') {
            j++;
            value = num[i - 1] - '0';
            if (j % 2 == 0) {
                value *= 2;
                if (value > 9) {
                    value -= 9;
                }
            }
            luhn += value;
        }
    }

    return (luhn % 10 == 0);
}