#include "luhn.h"

#include <ctype.h>
#include <string.h>

bool luhn(const char *number)
{
    int sum = 0, n = 0;
    for (int i = strlen(number) - 1; i >= 0; i--) {
        char c = number[i];
        if (c == ' ') continue;
        if (!isdigit(c)) return false;

        int value = c - '0';
        if (n++ % 2) value = (value * 2 > 9) ? value * 2 - 9 : value * 2;
        sum += value;
    }
    return n > 1 && sum % 10 == 0;
}