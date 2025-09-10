#include "sieve.h"
#include <stdexcept>
#include <vector>
#include <cmath>

namespace sieve {
    std::vector<int> primes(int n) {
        if (n < 2) {
            return {};
        }

        std::vector<bool> is_prime(n + 1, true);
        is_prime[0] = is_prime[1] = false;

        for (int p = 2; p * p <= n; ++p) {
            if (is_prime[p]) {
                for (int i = p * p; i <= n; i += p) {
                    is_prime[i] = false;
                }
            }
        }

        std::vector<int> prime_numbers;
        prime_numbers.reserve(n / 3); // Approximate allocation to avoid reallocations

        for (int i = 2; i <= n; ++i) {
            if (is_prime[i]) {
                prime_numbers.push_back(i);
            }
        }

        return prime_numbers;
    }
} // namespace sieve