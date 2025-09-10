#include "sieve.h"
#include <vector>

using namespace std;

vector<int> sieve::primes(int range)
{
    vector<int> result;
    if (range < 2) return result;

    vector<bool> isPrime(range + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= range; ++i)
    {
        if (isPrime[i])
        {
            for (int j = i * i; j <= range; j += i)
            {
                isPrime[j] = false;
            }
        }
    }

    for (int i = 2; i <= range; ++i)
    {
        if (isPrime[i])
        {
            result.push_back(i);
        }
    }

    return result;
}