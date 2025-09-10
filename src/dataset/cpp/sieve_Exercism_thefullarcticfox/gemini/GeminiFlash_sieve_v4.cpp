#include "sieve.h"
#include <vector>
#include <cmath>

namespace sieve {
    std::vector<int> primes(int n) {
        if (n < 2) {
            return {};
        }

        std::vector<bool> is_prime(n + 1, true);
        is_prime[0] = is_prime[1] = false;

        size_t limit = std::sqrt(n);
        for (size_t p = 2; p <= limit; ++p) {
            if (is_prime[p]) {
                for (size_t i = p * p; i <= n; i += p) {
                    is_prime[i] = false;
                }
            }
        }

        std::vector<int> prime_numbers;
        prime_numbers.reserve(n / 2); // Heuristic: primes are sparse

        for (int i = 2; i <= n; ++i) {
            if (is_prime[i]) {
                prime_numbers.push_back(i);
            }
        }

        return prime_numbers;
    }
} // namespace sieve