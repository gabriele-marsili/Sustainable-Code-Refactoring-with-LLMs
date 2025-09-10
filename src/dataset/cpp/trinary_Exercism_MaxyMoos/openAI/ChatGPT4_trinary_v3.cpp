#include "trinary.h"
#include <iostream>
#include <cmath>

typedef std::string::const_iterator str_iter;

int pow(int exponent)
{
    return static_cast<int>(std::pow(3, exponent));
}

int trinary::to_decimal(std::string input)
{
    int result = 0;

    for (str_iter it = input.begin(); it != input.end(); ++it)
    {
        if (*it < '0' || *it > '2')
            return 0;
        result = result * 3 + (*it - '0');
    }
    return result;
}