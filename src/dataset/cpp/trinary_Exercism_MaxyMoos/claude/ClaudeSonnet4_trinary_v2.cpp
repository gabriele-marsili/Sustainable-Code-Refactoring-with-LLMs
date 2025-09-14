#include "trinary.h"
#include <iostream>

int trinary::to_decimal(std::string input)
{
    int result = 0;
    int power = 1;
    
    for (auto it = input.rbegin(); it != input.rend(); ++it)
    {
        if (*it < '0' || *it > '2')
            return 0;
        
        if (*it != '0')
            result += (*it - '0') * power;
        
        power *= 3;
    }
    return result;
}