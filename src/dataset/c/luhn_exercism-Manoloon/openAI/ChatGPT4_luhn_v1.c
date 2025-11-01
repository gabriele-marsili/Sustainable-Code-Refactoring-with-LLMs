#include "luhn.h"
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    if (!num || strlen(num) < 2) return false;

    int result = 0, counter = 0;

    for (const char *ptr = num + strlen(num) - 1; ptr >= num; --ptr)
    {
        if (*ptr == ' ') continue;
        if (!isdigit(*ptr)) return false;

        int digit = *ptr - '0';
        if (counter++ % 2)
        {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        result += digit;
    }

    return (result % 10 == 0);
}