#include "nth_prime.h"
#include <stdexcept>
#include <cmath>

namespace nth_prime {
    int nth(int n) {
        if (n <= 0)
            throw std::domain_error("Input must be a positive integer.");

        if (n == 1)
            return 2;

        int count = 1; // Count of primes found (starting with 2)
        int candidate = 3; // Next number to check for primality

        while (true) {
            bool is_prime = true;
            int limit = static_cast<int>(std::sqrt(candidate));
            for (int i = 2; i <= limit; ++i) {
                if (candidate % i == 0) {
                    is_prime = false;
                    break;
                }
            }

            if (is_prime) {
                ++count;
                if (count == n)
                    return candidate;
            }

            candidate += 2; // Skip even numbers
        }
    }
}  // namespace nth_prime