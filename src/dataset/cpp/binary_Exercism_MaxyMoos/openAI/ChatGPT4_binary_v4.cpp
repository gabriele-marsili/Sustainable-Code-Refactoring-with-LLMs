#include "binary.h"
#include <iostream>
#include <cmath>

using namespace std;

int pow(int exponent)
{
    return 1 << exponent;
}

int binary::convert(string input)
{
    int result = 0;
    int size = input.length();
    for (char i : input)
    {
        int tmp = i - '0';
        if (tmp < 0 || tmp > 1)
            return 0;
        result = (result << 1) | tmp;
    }
    return result;
}