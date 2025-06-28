#include "trinary.h"
#include <iostream>

typedef std::string::const_iterator str_iter;

int pow(int exponent)
{
    int result = 1;
    for (int i = 1; i <= exponent; i++)
        result *= 3;
    return result;
}

int trinary::to_decimal(std::string input)
{
    int result = 0;
    int count = 0;

    for (str_iter it = input.begin(); it != input.end(); it++)
    {
        if ( *it != '0' && *it != '1' && *it != '2')
            return 0;
        result += (int(*it) - '0') * pow(input.size() - count - 1);
        count++;
    }
    return result;
}