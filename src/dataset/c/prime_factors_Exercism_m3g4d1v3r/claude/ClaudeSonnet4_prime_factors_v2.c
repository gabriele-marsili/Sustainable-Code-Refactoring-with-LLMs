#include "prime_factors.h"

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
    size_t idx = 0;
    
    // Handle factor 2 separately
    while (n % 2 == 0) {
        factors[idx++] = 2;
        n >>= 1;  // Divide by 2 using bit shift
    }
    
    // Check odd factors starting from 3
    for (uint64_t factor = 3; factor * factor <= n; factor += 2) {
        while (n % factor == 0) {
            factors[idx++] = factor;
            n /= factor;
        }
    }
    
    // If n is still > 1, then it's a prime factor
    if (n > 1) {
        factors[idx++] = n;
    }
    
    return idx;
}