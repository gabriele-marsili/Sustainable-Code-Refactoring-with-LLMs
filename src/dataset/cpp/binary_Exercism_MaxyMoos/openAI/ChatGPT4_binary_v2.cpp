#include "binary.h"
#include <iostream>
#include <cmath>

using namespace std;

int binary::convert(string input)
{
    int result = 0;
    int size = input.length() - 1;
    for (char i : input)
    {
        int tmp = i - '0';
        if (tmp < 0 || tmp > 9)
            return 0;
        result += tmp << size; // Use bitwise shift instead of pow
        size--;
    }
    return result;
}