#include "difference_of_squares.h"

int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

int square_of_sum(int n) {
    int sum = n * (n + 1) / 2;
    return sum * sum;
}

int difference_of_squares(int n) {
    return n * (n + 1) * (n * n - n - 1) / 12;
}