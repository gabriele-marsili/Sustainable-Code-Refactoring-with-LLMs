#include "prime_factors.h"
#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
    size_t idx = 0;

    // Handle factor of 2 separately for efficiency
    while (n % 2 == 0) {
        factors[idx++] = 2;
        n /= 2;
    }

    // Check odd factors up to sqrt(n)
    for (size_t factor = 3; factor <= sqrt(n); factor += 2) {
        while (n % factor == 0) {
            factors[idx++] = factor;
            n /= factor;
        }
    }

    // If n is still greater than 1, it is a prime factor
    if (n > 1) {
        factors[idx++] = n;
    }

    return idx;
}