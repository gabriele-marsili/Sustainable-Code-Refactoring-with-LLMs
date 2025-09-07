#include "grains.h"

namespace grains
{
    unsigned long long square(int n)
    {
        if (n <= 0 || n > 64) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        return static_cast<unsigned long long>(1ULL << (n - 1));
    }

    unsigned long long total()
    {
        return static_cast<unsigned long long>((1ULL << 64) - 1);
    }
}