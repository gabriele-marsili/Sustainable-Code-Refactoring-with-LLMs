#include <vector>
#include <stdexcept>
#include <cmath>
#include "nth_prime.h"

using namespace std;

namespace prime {

    int nth(int n) {
        if (n < 1) throw std::domain_error("out of range");

        if (n <= 2) {
            return (n == 1) ? 2 : 3;
        }

        vector<int> primes = {2, 3};
        int candidate = 5;

        while (primes.size() < n) {
            bool is_prime = true;
            int sqrt_candidate = sqrt(candidate);

            for (int p : primes) {
                if (p > sqrt_candidate) {
                    break;
                }
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