#include "sieve.h"
#include <vector>

namespace sieve {
    std::vector<int> primes(int n) {
        if (n < 2) return {};

        std::vector<bool> isprime(n + 1, true);
        isprime[0] = isprime[1] = false;

        for (size_t p = 2; p * p <= n; ++p) {
            if (isprime[p]) {
                for (size_t i = p * p; i <= n; i += p) {
                    isprime[i] = false;
                }
            }
        }

        std::vector<int> primes;
        primes.reserve(n / 2); // Reserve approximate space to reduce reallocations
        for (size_t i = 2; i <= n; ++i) {
            if (isprime[i]) {
                primes.push_back(static_cast<int>(i));
            }
        }

        return primes;
    }
}  // namespace sieve