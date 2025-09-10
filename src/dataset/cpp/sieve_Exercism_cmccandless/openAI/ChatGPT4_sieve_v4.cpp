#include "sieve.h"
#include <cmath>

vector<int> sieve::primes(int max)
{
    if (max <= 2) return {};

    vector<bool> np(max, false);
    vector<int> p;
    int sqrtMax = static_cast<int>(std::sqrt(max));

    for (int i = 2; i <= sqrtMax; ++i)
    {
        if (!np[i])
        {
            for (int j = i * i; j < max; j += i)
                np[j] = true;
        }
    }

    for (int i = 2; i < max; ++i)
    {
        if (!np[i])
            p.push_back(i);
    }

    return p;
}