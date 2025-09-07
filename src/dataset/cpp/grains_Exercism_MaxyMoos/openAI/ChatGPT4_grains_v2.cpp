#include "grains.h"

ull grains::square(int index)
{
    return 1ULL << (index - 1); // Use bit-shifting for O(1) computation
}

ull grains::total()
{
    return (1ULL << 64) - 1; // Sum of a geometric series: 2^64 - 1
}