#include "nth_prime.h"
#include <vector>
#include <stdexcept>
#include <cmath>

namespace nth_prime {
    int nth(int n) {
        if (n == 0)
            throw std::domain_error("can't find zero");
        if (n == 1)
            return 2;
        if (n == 2)
            return 3;

        std::vector<int> primes;
        primes.reserve(n);
        primes.push_back(2);
        primes.push_back(3);

        int candidate = 5;
        while (primes.size() < static_cast<size_t>(n)) {
            bool is_prime = true;
            int sqrt_candidate = static_cast<int>(std::sqrt(candidate));
            
            for (int prime : primes) {
                if (prime > sqrt_candidate)
                    break;
                if (candidate % prime == 0) {
                    is_prime = false;
                    break;
                }
            }
            
            if (is_prime)
                primes.push_back(candidate);
            
            candidate += 2;
        }

        return primes[n - 1];
    }
}