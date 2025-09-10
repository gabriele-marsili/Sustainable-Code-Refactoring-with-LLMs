#include "sieve.h"

vector<int> sieve::primes(int max)
{
    if (max <= 2) {
        return {};
    }

    vector<int> p;
    vector<bool> np(max, false);
    np[0] = np[1] = true;

    int limit = static_cast<int>(sqrt(max));

    for (int i = 2; i <= limit; ++i)
    {
        if (np[i]) continue;
        for (int j = i * i; j < max; j += i) np[j] = true;
    }

    for (int i = 2; i < max; ++i)
    {
        if (!np[i]) {
            p.push_back(i);
        }
    }
    return p;
}