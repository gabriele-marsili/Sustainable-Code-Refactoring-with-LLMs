#include "luhn.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    if (!num || strlen(num) < 2) return false;

    int result = 0, counter = 0;
    for (size_t i = strlen(num); i-- > 0; )
    {
        char c = num[i];
        if (c == ' ') continue;
        if (!isdigit(c)) return false;

        int digit = c - '0';
        if (counter++ % 2 != 0)
        {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        result += digit;
    }
    return (result % 10 == 0);
}