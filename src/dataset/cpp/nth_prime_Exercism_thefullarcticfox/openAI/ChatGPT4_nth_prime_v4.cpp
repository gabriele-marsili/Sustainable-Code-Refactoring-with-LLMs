#include "nth_prime.h"
#include <vector>
#include <stdexcept>
#include <cmath>

namespace nth_prime {
    int nth(int n) {
        if (n <= 0)
            throw std::domain_error("can't find zero or negative primes");
        if (n == 1)
            return 2;

        int limit = static_cast<int>(n * (std::log(n) + std::log(std::log(n))));
        std::vector<bool> isprime(limit + 1, true);
        isprime[0] = isprime[1] = false;

        for (int p = 2; p <= std::sqrt(limit); ++p) {
            if (isprime[p]) {
                for (int i = p * p; i <= limit; i += p)
                    isprime[i] = false;
            }
        }

        int count = 0;
        for (int i = 2; i <= limit; ++i) {
            if (isprime[i]) {
                ++count;
                if (count == n)
                    return i;
            }
        }

        throw std::runtime_error("Prime not found within calculated range");
    }
}  // namespace nth_prime