#include "prime_factors.h"

size_t find_factors(uint64_t base, uint64_t factors[]) {
    size_t f = 0;
    
    while ((base & 1) == 0) {
        factors[f++] = 2;
        base >>= 1;
    }
    
    uint64_t divisor = 3;
    uint64_t limit = base;
    
    while (divisor * divisor <= limit) {
        while (base % divisor == 0) {
            factors[f++] = divisor;
            base /= divisor;
        }
        divisor += 2;
        if (base < limit) {
            limit = base;
        }
    }
    
    if (base > 1) {
        factors[f++] = base;
    }
    
    return f;
}