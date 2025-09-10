#include "hexadecimal.h"

using namespace std;

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    for (int i = 0; i < len; ++i)
    {
        int digit;
        if (input[i] >= '0' && input[i] <= '9')
        {
            digit = input[i] - '0';
        }
        else if (input[i] >= 'a' && input[i] <= 'f')
        {
            digit = hexaTable[input[i]];
        }
        else
        {
            return 0;
        }

        result = result * 16 + digit;
    }
    return result;
}