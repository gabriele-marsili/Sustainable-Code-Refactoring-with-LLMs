#include "grains.h"

namespace grains
{
    unsigned long long square(int n)
    {
        return 1ULL << (n - 1);
    }

    unsigned long long total()
    {
        return ~0ULL; // Equivalent to 2^64 - 1 for unsigned long long
    }
}