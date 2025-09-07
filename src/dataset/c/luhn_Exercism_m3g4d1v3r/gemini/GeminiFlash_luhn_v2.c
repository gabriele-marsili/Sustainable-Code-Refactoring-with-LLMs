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
    if (!input_is_valid(num)) {
        return false;
    }

    size_t luhn_sum = 0;
    size_t digit_count = 0;
    const char *p = num;
    size_t len = 0;
    while(num[len] != '\0') len++;

    for (size_t i = len; i > 0; i--) {
        if (num[i-1] >= '0' && num[i-1] <= '9') {
            int digit = num[i-1] - '0';
            digit_count++;

            if (digit_count % 2 == 0) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            luhn_sum += digit;
        }
    }

    return (luhn_sum % 10 == 0);
}