# include "prime_factors.h"
#include <cmath>

size_t find_factors(uint64_t base, uint64_t factors[]) {
    size_t f = 0;
    if (base <= 1) return f;

    while (base % 2 == 0) {
        factors[f++] = 2;
        base /= 2;
    }

    for (uint64_t divisor = 3; divisor <= sqrt(base); divisor += 2) {
        while (base % divisor == 0) {
            factors[f++] = divisor;
            base /= divisor;
        }
    }

    if (base > 1) {
        factors[f++] = base;
    }

    return f;
}