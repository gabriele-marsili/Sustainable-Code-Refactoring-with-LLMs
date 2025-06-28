#include "hexadecimal.h"

using namespace std;

int pow(int exponent)
{
    int result = 1;
    for (int i = 1; i < exponent; i++)
        result *= 16;
    return result;
}

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    for (int i = 0; i < len; i++)
    {
        if ( input[i] >= '0' && input[i] <= '9' )
            result += (input[i] - '0') * pow(len - i);
        else if ( input[i] >= 'a' && input[i] <= 'f' )
            result += hexaTable[input[i]] * pow(len - i);
        else
            return 0;
    }
    return result;
}