#include "luhn.h"
#include <stdbool.h>
#include <stddef.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

bool luhn(const char *num) {
    size_t sum = 0;
    size_t len = strlen(num);
    size_t size = 0;

    for (size_t i = 0; i < len; ++i) {
        if (isdigit(num[i])) {
            size++;
        } else if (!isspace(num[i])) {
            return false;
        }
    }

    if (size < 2) {
        return false;
    }

    bool double_digit = false;
    for (size_t i = len; i-- > 0;) {
        if (isspace(num[i])) continue;

        int digit = num[i] - '0';

        if (double_digit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        double_digit = !double_digit;
    }

    return (sum % 10 == 0);
}