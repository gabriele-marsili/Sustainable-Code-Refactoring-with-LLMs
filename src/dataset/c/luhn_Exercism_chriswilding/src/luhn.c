#include "luhn.h"

#include <ctype.h>
#include <string.h>

bool luhn(const char *number)
{
    int n = 0;
    int sum = 0;

    int len = strlen(number) - 1;

    for (int i = len; i >= 0; i--) {
        char c = number[i];

        if (c == ' ')
            continue;

        if (!isdigit(c))
            return false;

        int value = c - '0';

        if (n % 2 == 1)
            value *= 2;

        if (value > 9)
            value -= 9;

        sum += value;
        n += 1;
    }

    return n > 1 && sum % 10 == 0;
}
