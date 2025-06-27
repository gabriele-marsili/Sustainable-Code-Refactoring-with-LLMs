#ifndef RATIONAL_NUMBERS_H
#define RATIONAL_NUMBERS_H

#include <math.h>
#include <stdint.h>

typedef struct {
    int32_t numerator;
    int32_t denominator;
} rational_t;

// 4 basic operations
rational_t add(rational_t x, rational_t y);
rational_t subtract(rational_t x, rational_t y);
rational_t multiply(rational_t x, rational_t y);
rational_t divide(rational_t x, rational_t y);

// Exponentiations
rational_t exp_rational(rational_t x, int32_t n);
double exp_real(double x, rational_t y);

// Other
int32_t abs(int32_t input);
rational_t absolute(rational_t x);
rational_t reduce(rational_t input);
uint32_t gcd(uint32_t a, uint32_t b);

#endif
