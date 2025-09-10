#include "sieve.h"

#include <cmath>
#include <vector>

namespace sieve {
    std::vector<int> primes(int n) {
        if (n <= 1) {
            return {};
        }

        std::vector<bool> prime(n, true);
        std::vector<int> results;

        // Optimization 1: Start from 2 and mark multiples as non-prime
        prime[0] = prime[1] = false;

        // Optimization 2: Iterate only up to the square root of n
        int limit = static_cast<int>(std::sqrt(n));

        for (int p = 2; p <= limit; ++p) {
            if (prime[p]) {
                // Optimization 3: Start marking multiples from p*p
                for (int i = p * p; i < n; i += p) {
                    prime[i] = false;
                }
            }
        }

        // Optimization 4: Reserve space for the results vector to avoid reallocations
        results.reserve(n / 4); // Heuristic: primes are less frequent as numbers grow

        for (int i = 2; i < n; ++i) {
            if (prime[i]) {
                results.push_back(i);
            }
        }

        return results;
    }
}