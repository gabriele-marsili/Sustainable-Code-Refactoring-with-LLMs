#include "luhn.h"

#include <linux/limits.h>

bool input_is_valid(const char *num) {
    size_t trimmed_len = 0;

    while (*num != '\0') {
        if (!(*num >= '0' && *num <= '9')) {
            if (*num != ' ') return (false);
        } else {
            trimmed_len++;
        }
        num++;
    }
    return (trimmed_len > 1);
}

bool luhn(const char *num) {
    size_t j, luhn, num_len, value;

    luhn = 0;
    j = 0;
    num_len = strlen(num);
    if (input_is_valid(num) == false) return (false);
    num += num_len;
    for (size_t i = 1; i <= num_len; i++) {
        if (*(num - i) >= '0' && *(num - i) <= '9') {
            j++;
            value = *(num - i) - '0';
            if (j % 2 == 0) {
                value *= 2;
                if (value > 9) value -= 9;
            }
            luhn += value;
        }
    }
    if (luhn % 10 == 0) {
        return (true);
    }
    return (false);
}
