#include <vector>
#include <stdexcept>
#include <cmath>
#include "nth_prime.h"

namespace prime {

    int nth(int n) {
        if (n < 1) throw std::domain_error("out of range");

        std::vector<int> primes;
        primes.reserve(n); // Reserve memory upfront to avoid reallocations
        primes.push_back(2);

        for (int candidate = 3; primes.size() < n; candidate += 2) {
            bool is_prime = true;
            int limit = std::sqrt(candidate); // Only check divisors up to the square root
            for (int prime : primes) {
                if (prime > limit) break;
                if (candidate % prime == 0) {
                    is_prime = false;
                    break;
                }
            }
            if (is_prime) primes.push_back(candidate);
        }

        return primes[n - 1];
    }
}