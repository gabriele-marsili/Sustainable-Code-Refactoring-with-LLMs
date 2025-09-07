#include "luhn.h"

#include <ctype.h>

bool luhn(const char *number)
{
    int sum = 0;
    int n = 0;
    bool double_digit = false;

    for (const char *ptr = number; *ptr; ++ptr) {
        if (*ptr == ' ')
            continue;

        if (!isdigit(*ptr))
            return false;

        int value = *ptr - '0';

        if (double_digit) {
            value *= 2;
            if (value > 9)
                value -= 9;
        }

        sum += value;
        double_digit = !double_digit;
        ++n;
    }

    return n > 1 && sum % 10 == 0;
}