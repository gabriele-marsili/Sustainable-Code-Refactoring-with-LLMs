#include "complex_numbers.h"

complex_t c_add(complex_t a, complex_t b) {
    complex_t result;

    result.real = a.real + b.real;
    result.imag = a.imag + b.imag;
    return (result);
}

complex_t c_sub(complex_t a, complex_t b) {
    complex_t result;

    result.real = a.real - b.real;
    result.imag = a.imag - b.imag;
    return (result);
}

complex_t c_mul(complex_t a, complex_t b) {
    complex_t result;

    result.real = a.real * b.real - a.imag * b.imag;
    result.imag = a.imag * b.real + a.real * b.imag;
    return (result);
}

complex_t c_div(complex_t a, complex_t b) {
    complex_t result;

    double denominator = (pow(b.real, 2) + pow(b.imag, 2));
    result.real = (a.real * b.real + a.imag * b.imag) / denominator;
    result.imag = (a.imag * b.real - a.real * b.imag) / denominator;
    return (result);
}

double c_abs(complex_t x) { return (sqrt(pow(x.real, 2) + pow(x.imag, 2))); }

complex_t c_conjugate(complex_t x) {
    complex_t result;

    result.real = x.real;
    result.imag = -1 * x.imag;
    return (result);
}

double c_real(complex_t x) { return (x.real); }

double c_imag(complex_t x) { return (x.imag); }

complex_t c_exp(complex_t x) {
    complex_t result;

    result.real = pow(M_EULER, x.real) * cos(x.imag);
    result.imag = pow(M_EULER, x.real) * sin(x.imag);
    return (result);
}
