#include "sieve.h"

vector<int> sieve::primes(int max)
{
    if (max < 2) return {};

    vector<int> p;
    vector<bool> np(max, false);

    for (int i = 2; i * i < max; i++)
    {
        if (!np[i])
        {
            for (int j = i * i; j < max; j += i)
                np[j] = true;
        }
    }

    for (int i = 2; i < max; i++)
    {
        if (!np[i])
            p.push_back(i);
    }

    return p;
}