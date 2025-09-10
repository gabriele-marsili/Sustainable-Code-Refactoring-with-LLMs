#include "binary.h"
#include <iostream>
#include <cmath>

using namespace std;

int pow(int exponent)
{
    return 1 << exponent; // Use bitwise shift for power of 2
}

int binary::convert(string input)
{
    int result = 0;
    int size = input.length() - 1;
    for (char i : input)
    {
        int tmp = i - '0';
        if (tmp < 0 || tmp > 9)
            return 0;
        result += tmp * (1 << size); // Replace pow with bitwise shift
        size--;
    }
    return result;
}