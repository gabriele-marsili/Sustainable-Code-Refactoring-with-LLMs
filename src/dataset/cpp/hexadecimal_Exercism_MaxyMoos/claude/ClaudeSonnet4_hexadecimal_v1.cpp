#include "hexadecimal.h"

using namespace std;

int hexadecimal::convert(string input)
{
    int result = 0;
    int len = input.length();
    
    for (int i = 0; i < len; i++)
    {
        result *= 16;
        
        if (input[i] >= '0' && input[i] <= '9')
            result += input[i] - '0';
        else if (input[i] >= 'a' && input[i] <= 'f')
            result += input[i] - 'a' + 10;
        else if (input[i] >= 'A' && input[i] <= 'F')
            result += input[i] - 'A' + 10;
        else
            return 0;
    }
    return result;
}