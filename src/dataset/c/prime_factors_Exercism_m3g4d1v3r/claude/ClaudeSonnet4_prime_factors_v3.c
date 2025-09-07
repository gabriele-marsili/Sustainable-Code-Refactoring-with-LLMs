#include "prime_factors.h"

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
    size_t idx = 0;
    
    while (n % 2 == 0) {
        factors[idx++] = 2;
        n /= 2;
    }
    
    for (uint64_t factor = 3; factor * factor <= n; factor += 2) {
        while (n % factor == 0) {
            factors[idx++] = factor;
            n /= factor;
        }
    }
    
    if (n > 1) {
        factors[idx++] = n;
    }
    
    return idx;
}