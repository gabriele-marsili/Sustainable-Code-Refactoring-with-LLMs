#include "difference_of_squares.h"

int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

int square_of_sum(int n) {
    int sum = n * (n + 1) / 2;
    return sum * sum;
}

int difference_of_squares(int n) {
    int n_plus_1 = n + 1;
    int sum_formula = n * n_plus_1 / 2;
    int square_sum = sum_formula * sum_formula;
    int sum_squares = n * n_plus_1 * (2 * n + 1) / 6;
    return square_sum - sum_squares;
}