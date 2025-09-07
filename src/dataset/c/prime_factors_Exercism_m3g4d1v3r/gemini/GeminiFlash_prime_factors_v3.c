#include "prime_factors.h"
#include <math.h>

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
    size_t idx = 0;
    uint64_t factor = 2;

    while (n > 1 && idx < MAXFACTORS) {
        if (n % factor == 0) {
            factors[idx++] = factor;
            n /= factor;
        } else {
            if (factor * factor > n) {
                factor = n;
            } else {
                factor++;
            }
        }
    }

    if (n > 1 && idx == MAXFACTORS) {
        return 0;
    }

    return (idx);
}