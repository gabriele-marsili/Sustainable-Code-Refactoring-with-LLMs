#include "luhn.h"
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    bool is_second = false;

    for (int i = strlen(num) - 1; i >= 0; i--)
    {
        if (isspace(num[i]))
            continue;

        if (!isdigit(num[i]))
            return false;

        int digit = num[i] - '0';
        if (is_second)
        {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }

        sum += digit;
        is_second = !is_second;
        digit_count++;
    }

    return (digit_count >= 2 && sum % 10 == 0);
}