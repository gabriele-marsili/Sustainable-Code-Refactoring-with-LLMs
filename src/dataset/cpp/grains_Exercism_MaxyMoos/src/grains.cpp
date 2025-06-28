#include "grains.h"

ull grains::square(int index)
{
    // This is way faster than calling the pow function from <cmath>
    int i = 1;
    ull ret = 1;
    while (i < index)
    {
        ret *= 2;
        i++;
    }
    return ret;
}

ull grains::total()
{
    ull sum = 0;
    for (int i = 1; i <= 64; i++)
        sum += square(i);
    return sum;
}