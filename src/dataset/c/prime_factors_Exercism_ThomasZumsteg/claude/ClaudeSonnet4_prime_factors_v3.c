#include "prime_factors.h"

size_t find_factors(uint64_t base, uint64_t factors[]) {
    if (base <= 1) return 0;
    
    size_t f = 0;
    
    while ((base & 1) == 0) {
        factors[f++] = 2;
        base >>= 1;
    }
    
    for (uint64_t divisor = 3; divisor * divisor <= base; divisor += 2) {
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