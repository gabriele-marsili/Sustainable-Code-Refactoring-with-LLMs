#include "hexadecimal.h"

using namespace std;

int pow(int exponent)
{
    int result = 1;
    while (--exponent > 0)
        result *= 16;
    return result;
}

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    int power = 1;

    for (int i = len - 1; i >= 0; i--)
    {
        if (input[i] >= '0' && input[i] <= '9')
            result += (input[i] - '0') * power;
        else if (input[i] >= 'a' && input[i] <= 'f')
            result += hexaTable[input[i]] * power;
        else
            return 0;

        power *= 16;
    }
    return result;
}