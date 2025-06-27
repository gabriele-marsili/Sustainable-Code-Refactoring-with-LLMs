#include "prime_factors.h"

size_t find_factors(uint64_t n, uint64_t factors[static MAXFACTORS]) {
    size_t idx = 0;
    size_t factor = 2;

    while (n > 1) {
        if (n % factor == 0) {
            factors[idx++] = factor;
            n /= factor;
        } else {
            factor++;
        }
    }
    return (idx);
}
