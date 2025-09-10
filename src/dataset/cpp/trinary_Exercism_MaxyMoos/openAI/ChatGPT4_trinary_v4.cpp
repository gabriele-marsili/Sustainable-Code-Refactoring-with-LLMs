#include "trinary.h"
#include <iostream>
#include <cmath>

typedef std::string::const_iterator str_iter;

int trinary::to_decimal(std::string input)
{
    int result = 0;

    for (char ch : input)
    {
        if (ch < '0' || ch > '2')
            return 0;
        result = result * 3 + (ch - '0');
    }
    return result;
}