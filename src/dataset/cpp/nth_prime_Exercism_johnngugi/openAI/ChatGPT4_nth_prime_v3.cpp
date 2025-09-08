#include <vector>
#include <stdexcept>
#include <cmath>
#include "nth_prime.h"

namespace prime {

    int nth(int n) {
        if (n < 1) throw std::domain_error("out of range");

        std::vector<int> primes;
        primes.reserve(n);
        primes.push_back(2);

        for (int candidate = 3; primes.size() < n; candidate += 2) {
            bool is_prime = true;
            int limit = static_cast<int>(std::sqrt(candidate));
            for (int p : primes) {
                if (p > limit) break;
                if (candidate % p == 0) {
                    is_prime = false;
                    break;
                }
            }
            if (is_prime) primes.push_back(candidate);
        }

        return primes[n - 1];
    }
}