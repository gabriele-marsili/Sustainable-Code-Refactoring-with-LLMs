#include "luhn.h"

#include <ctype.h>

bool luhn(const char *number)
{
    int sum = 0;
    int n = 0;
    bool double_digit = false;

    for (const char *p = number; *p; ++p) {
        if (*p == ' ')
            continue;

        if (!isdigit(*p))
            return false;

        int value = *p - '0';

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