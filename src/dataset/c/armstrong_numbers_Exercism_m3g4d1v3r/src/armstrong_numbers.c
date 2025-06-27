#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate) {
    size_t factor;
    size_t n_digits;
    size_t acc;

    for (factor = 0; candidate / pow(10, factor) >= 1.0; factor++) {
    }
    n_digits = factor;
    acc = 0;
    for (factor = 0; candidate / pow(10, factor) >= 1.0; factor++) {
        acc += pow((candidate / (size_t)pow(10, factor)) % 10, n_digits);
    }
    return (acc == (size_t)candidate);
}
