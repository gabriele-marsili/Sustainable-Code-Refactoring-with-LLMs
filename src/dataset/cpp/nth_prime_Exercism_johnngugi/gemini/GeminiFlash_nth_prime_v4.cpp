#include <vector>
#include <stdexcept>
#include <cmath>
#include "nth_prime.h"

using namespace std;

namespace prime {

    int nth(int n) {
        if (n < 1) throw std::domain_error("out of range");

        if (n == 1) return 2;

        vector<int> primes;
        primes.reserve(n);
        primes.push_back(2);

        int candidate = 3;
        while (primes.size() < n) {
            bool is_prime = true;
            int sqrt_candidate = sqrt(candidate);
            for (int p : primes) {
                if (p > sqrt_candidate) break;
                if (candidate % p == 0) {
                    is_prime = false;
                    break;
                }
            }
            if (is_prime) {
                primes.push_back(candidate);
            }
            candidate += 2;
        }

        return primes[n - 1];
    }
}