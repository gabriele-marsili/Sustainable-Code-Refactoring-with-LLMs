#include "luhn.h"

#include <stdbool.h>
#include <string.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;
    const char *p = num;

    while (*p) {
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
    size_t len = strlen(num);

    if (!input_is_valid(num)) {
        return false;
    }

    bool alternate = false;
    for (size_t i = len; i > 0; i--) {
        if (num[i - 1] >= '0' && num[i - 1] <= '9') {
            int digit = num[i - 1] - '0';

            if (alternate) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            luhn += digit;
            alternate = !alternate;
        }
    }

    return (luhn % 10 == 0);
}