#include "difference_of_squares.h"

static inline int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

static inline int square_of_sum(int n) {
    int sum = n * (n + 1) / 2;
    return sum * sum;
}

int difference_of_squares(int n) {
    return square_of_sum(n) - sum_of_squares(n);
}