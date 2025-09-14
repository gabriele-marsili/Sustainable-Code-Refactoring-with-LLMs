#include "hexadecimal.h"

using namespace std;

int pow(int exponent)
{
    int result = 1;
    for (int i = 1; i < exponent; i++)
        result <<= 4;
    return result;
}

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    
    for (int i = 0; i < len; i++)
    {
        char c = input[i];
        int digit_value;
        
        if (c >= '0' && c <= '9')
            digit_value = c - '0';
        else if (c >= 'a' && c <= 'f')
            digit_value = c - 'a' + 10;
        else
            return 0;
            
        result = (result << 4) + digit_value;
    }
    return result;
}