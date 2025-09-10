#include "binary.h"
#include <iostream>
#include <string>

using namespace std;

int binary::convert(string input)
{
    int result = 0;
    int size = input.length();

    for (int i = 0; i < size; ++i)
    {
        char c = input[i];
        if (c != '0' && c != '1')
        {
            return 0;
        }

        result <<= 1; // Equivalent to multiplying by 2
        result += (c - '0');
    }

    return result;
}