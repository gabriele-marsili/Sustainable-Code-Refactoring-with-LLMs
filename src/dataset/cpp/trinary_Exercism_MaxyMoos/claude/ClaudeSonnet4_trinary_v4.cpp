#include "trinary.h"
#include <iostream>

int trinary::to_decimal(std::string input)
{
    if (input.empty()) return 0;
    
    int result = 0;
    int power = 1;
    
    for (auto it = input.rbegin(); it != input.rend(); ++it)
    {
        char digit = *it;
        if (digit < '0' || digit > '2')
            return 0;
        
        result += (digit - '0') * power;
        power *= 3;
    }
    
    return result;
}