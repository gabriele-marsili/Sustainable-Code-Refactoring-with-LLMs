#include "grains.h"

namespace grains
{
    constexpr unsigned long long square(int n)
    {
        return 1ULL << (n - 1);
    }

    constexpr unsigned long long total()
    {
        return (1ULL << 64) - 1;
    }
}