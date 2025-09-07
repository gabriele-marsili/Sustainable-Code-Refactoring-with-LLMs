#include "difference_of_squares.h"

int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

int square_of_sum(int n) {
    long long sum = (long long)n * (n + 1) / 2;
    return (int)(sum * sum);
}

int difference_of_squares(int n) {
    long long sum_of_sq = (long long)n * (n + 1) * (2 * n + 1) / 6;
    long long sum = (long long)n * (n + 1) / 2;
    long long square_of_sum_val = sum * sum;
    return (int)(square_of_sum_val - sum_of_sq);
}