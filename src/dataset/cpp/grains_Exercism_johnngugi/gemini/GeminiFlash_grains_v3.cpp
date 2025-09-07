#include "grains.h"

namespace grains
{
    unsigned long long square(int n)
    {
        if (n <= 0 || n > 64) {
            return 0;
        }
        return (1ULL << (n - 1));
    }

    unsigned long long total()
    {
        return (1ULL << 64) - 1;
    }
}