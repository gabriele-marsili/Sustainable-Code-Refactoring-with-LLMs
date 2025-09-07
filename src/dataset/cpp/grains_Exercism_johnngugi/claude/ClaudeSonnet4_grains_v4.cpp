#include "grains.h"

namespace grains
{
    unsigned long long square(int n)
    {
        return 1ULL << (n - 1);
    }

    unsigned long long total()
    {
        return 18446744073709551615ULL;
    }
}