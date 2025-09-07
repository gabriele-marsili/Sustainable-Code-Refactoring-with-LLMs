#include "luhn.h"

#include <ctype.h>

bool luhn(const char *number)
{
    int sum = 0, n = 0;

    for (const char *p = number + strlen(number) - 1; p >= number; --p) {
        if (*p == ' ')
            continue;

        if (!isdigit(*p))
            return false;

        int value = *p - '0';
        if (n++ % 2)
            value = (value * 2 > 9) ? value * 2 - 9 : value * 2;

        sum += value;
    }

    return n > 1 && sum % 10 == 0;
}