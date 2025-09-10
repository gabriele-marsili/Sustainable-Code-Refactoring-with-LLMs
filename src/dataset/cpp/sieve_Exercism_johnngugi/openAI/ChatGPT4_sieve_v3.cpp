#include "sieve.h"

using namespace std;

namespace sieve
{
    vector<int> primes(int n)
    {
        if (n < 2) return {};

        vector<bool> prime(n, true);
        prime[0] = prime[1] = false;
        vector<int> results;

        for (int p = 2; p * p < n; ++p)
        {
            if (prime[p])
            {
                for (int i = p * p; i < n; i += p)
                {
                    prime[i] = false;
                }
            }
        }

        results.reserve(n / log(n)); // Approximation for the number of primes
        for (int i = 2; i < n; ++i)
        {
            if (prime[i])
            {
                results.push_back(i);
            }
        }

        return results;
    }
}