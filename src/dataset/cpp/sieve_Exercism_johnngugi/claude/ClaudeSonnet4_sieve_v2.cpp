#include "sieve.h"

using namespace std;

namespace sieve
{
    vector<int> primes(int n)
    {
        if (n <= 2) return {};
        
        std::vector<bool> prime(n + 1, true);
        std::vector<int> results;
        results.reserve(n / (log(n) > 0 ? log(n) : 1)); // Approximate prime count
        
        prime[0] = prime[1] = false;
        
        for (int p = 2; p * p <= n; p++)
        {
            if (prime[p])
            {
                for (int i = p * p; i <= n; i += p)
                    prime[i] = false;
            }
        }

        for (int i = 2; i <= n; ++i)
        {
            if (prime[i])
            {
                results.push_back(i);
            }
        }

        return results;
    }
}