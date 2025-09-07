#include "grains.h"

ull grains::square(int index)
{
    return 1ULL << (index - 1);
}

ull grains::total()
{
    return (1ULL << 64) - 1;
}