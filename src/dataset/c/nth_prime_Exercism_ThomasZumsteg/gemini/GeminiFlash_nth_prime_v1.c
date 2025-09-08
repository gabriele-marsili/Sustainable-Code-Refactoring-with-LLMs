#include "nth_prime.h"
#include <stdbool.h>
#include <stdlib.h>
#include <math.h>

uint32_t nth(int n) {
    if (n <= 0) return 0;

    if (n == 1) return 2;
    if (n == 2) return 3;

    // Estimate the upper bound for the nth prime number.  This avoids unnecessary iterations.
    uint32_t upper_bound = (uint32_t)(n * (log(n) + log(log(n))));
    if (upper_bound < 13) upper_bound = 13; // handle small n cases

    bool *is_prime = calloc(upper_bound + 1, sizeof(bool));
    if (!is_prime) return 0; // Handle allocation failure

    // Initialize all numbers as potentially prime
    for (uint32_t i = 2; i <= upper_bound; ++i) {
        is_prime[i] = true;
    }

    // Sieve of Eratosthenes
    for (uint32_t p = 2; p * p <= upper_bound; ++p) {
        if (is_prime[p]) {
            for (uint32_t i = p * p; i <= upper_bound; i += p) {
                is_prime[i] = false;
            }
        }
    }

    // Count the primes and find the nth prime
    uint32_t prime_count = 0;
    uint32_t nth_prime = 0;
    for (uint32_t i = 2; i <= upper_bound; ++i) {
        if (is_prime[i]) {
            prime_count++;
            if (prime_count == n) {
                nth_prime = i;
                break;
            }
        }
    }

    free(is_prime);
    return nth_prime;
}