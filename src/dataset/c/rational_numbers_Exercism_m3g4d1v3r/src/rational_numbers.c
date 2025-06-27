#include "rational_numbers.h"

#include <math.h>

int32_t abs(int32_t input) {
    if (input < 0) return (-1 * input);
    return (input);
}

uint32_t gcd(uint32_t a, uint32_t b) {
    uint32_t lesser;
    uint32_t try_nb;

    if (a < b)
        lesser = a;
    else
        lesser = b;
    try_nb = lesser;
    if (try_nb == 0) return (++try_nb);
    while (a % try_nb != 0 || b % try_nb != 0) {
        try_nb--;
    }
    return (try_nb);
}

rational_t reduce(rational_t input) {
    int32_t input_gcd;
    rational_t result = {input.numerator, input.denominator};

    // First: edge cases
    if (input.numerator == 0 && input.denominator == 0) {
        return (result);
    } else if (input.numerator != 0 && input.denominator == 0) {
        return (result);
    } else if (input.numerator == 0 && input.denominator != 0) {
        result.denominator = 1;
        return (result);
    }
    input_gcd = gcd(abs(input.numerator), abs(input.denominator));
    // Ensure that the numerator is always the negative one if there's a
    // negative denominator. If both of them are negative, then both are
    // positive...
    if (input.numerator < 0 && input.denominator < 0) {
        input.numerator *= -1;
        input.denominator *= -1;
    } else if (input.numerator > 0 && input.denominator < 0) {
        input.numerator *= -1;
        input.denominator *= -1;
    }
    // Finally, reduce both numerator and denominator
    result.numerator = input.numerator / input_gcd;
    result.denominator = input.denominator / input_gcd;
    return (result);
}

rational_t add(rational_t x, rational_t y) {
    rational_t w;

    w.numerator = (x.numerator * y.denominator + y.numerator * x.denominator);
    w.denominator = (x.denominator * y.denominator);
    return (reduce(w));
}

rational_t subtract(rational_t x, rational_t y) {
    rational_t w;

    w.numerator = (x.numerator * y.denominator - y.numerator * x.denominator);
    w.denominator = (x.denominator * y.denominator);
    return (reduce(w));
}

rational_t multiply(rational_t x, rational_t y) {
    rational_t w;

    w.numerator = (x.numerator * y.numerator);
    w.denominator = (x.denominator * y.denominator);
    return (reduce(w));
}

rational_t divide(rational_t x, rational_t y) {
    rational_t w;

    w.numerator = (x.numerator * y.denominator);
    w.denominator = (y.numerator * x.denominator);
    return (reduce(w));
}

rational_t exp_rational(rational_t x, int32_t n) {
    rational_t w;

    if (n >= 0) {
        w.numerator = pow(x.numerator, n);
        w.denominator = pow(x.denominator, n);
    } else {
        w.numerator = pow(x.denominator, abs(n));
        w.denominator = pow(x.numerator, abs(n));
    }
    return (reduce(w));
}

double exp_real(double x, rational_t y) {
    double w;

    w = pow(pow(x, y.numerator), pow(y.denominator, -1));
    return (w);
}

rational_t absolute(rational_t x) {
    rational_t w;

    w.numerator = abs(x.numerator);
    w.denominator = abs(x.denominator);
    return (reduce(w));
}
