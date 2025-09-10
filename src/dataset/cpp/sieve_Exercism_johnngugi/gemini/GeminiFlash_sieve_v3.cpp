#include "sieve.h"
#include <cmath>

using namespace std;

namespace sieve
{
    vector<int> primes(int n)
    {
        if (n <= 1) return {};

        std::vector<bool> prime(n, true);
        std::vector<int> results;

        prime[0] = prime[1] = false;

        int limit = static_cast<int>(sqrt(n));

        for (int p = 2; p <= limit; ++p)
        {
            if (prime[p])
            {
                for (int i = p * p; i < n; i += p)
                {
                    prime[i] = false;
                }
            }
        }

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