# include "prime_factors.h"
# include <math.h>

size_t find_factors(uint64_t base, uint64_t factors[]) {
    size_t f = 0;

    // Handle the case of 2 as a factor
    while (base % 2 == 0) {
        factors[f++] = 2;
        base /= 2;
    }

    // Iterate through odd numbers up to the square root of the base
    for (uint64_t divisor = 3; divisor <= (uint64_t)sqrt(base); divisor += 2) {
        while (base % divisor == 0) {
            factors[f++] = divisor;
            base /= divisor;
        }
    }

    // If base is still greater than 1, it must be a prime number itself
    if (base > 1) {
        factors[f++] = base;
    }

    return f;
}