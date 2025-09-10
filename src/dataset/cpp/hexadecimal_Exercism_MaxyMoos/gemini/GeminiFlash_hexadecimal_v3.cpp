#include "hexadecimal.h"
#include <algorithm>

using namespace std;

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();

    if (len == 0) return 0;

    for (int i = 0; i < len; ++i)
    {
        char c = input[i];
        int digit;

        if (c >= '0' && c <= '9')
        {
            digit = c - '0';
        }
        else if (c >= 'a' && c <= 'f')
        {
            digit = hexaTable[c];
        }
        else
        {
            return 0;
        }

        if (i < len - 1) {
            result = result * 16 + digit;
        } else {
            result = result * 16 + digit;
        }
    }

    return result;
}