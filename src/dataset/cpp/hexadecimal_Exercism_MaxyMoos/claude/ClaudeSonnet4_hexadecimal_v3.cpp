#include "hexadecimal.h"

using namespace std;

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    int power = 1;
    
    for (int i = len - 1; i >= 0; i--)
    {
        char c = input[i];
        int digit_value;
        
        if (c >= '0' && c <= '9')
            digit_value = c - '0';
        else if (c >= 'a' && c <= 'f')
            digit_value = c - 'a' + 10;
        else if (c >= 'A' && c <= 'F')
            digit_value = c - 'A' + 10;
        else
            return 0;
            
        result += digit_value * power;
        if (i > 0) power *= 16;
    }
    return result;
}