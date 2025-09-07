#include "luhn.h"
#include <ctype.h>
#include <string.h>
#include <stdlib.h>

bool luhn(const char *num)
{
    size_t sum = 0;
    size_t digit_count = 0;
    int element = 1;

    for (int i = strlen(num) - 1; i >= 0; i--)
    {
        if (isspace(num[i]))
            continue;

        if (!isdigit(num[i]))
            return false;

        int aux = num[i] - '0';
        if (element % 2 == 0)
        {
            aux *= 2;
            if (aux > 9)
                aux -= 9;
        }
        sum += aux;
        element++;
        digit_count++;
    }

    return (digit_count >= 2 && sum % 10 == 0);
}