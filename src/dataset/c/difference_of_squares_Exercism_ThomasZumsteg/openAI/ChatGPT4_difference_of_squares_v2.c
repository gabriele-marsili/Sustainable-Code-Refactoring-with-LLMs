#include "difference_of_squares.h"

inline int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
}

inline int square_of_sum(int n) {
    int sum = n * (n + 1) / 2;
    return sum * sum;
}

inline int difference_of_squares(int n) {
    return (n * (n + 1) / 2) * (n * (n + 1) / 2) - n * (n + 1) * (2 * n + 1) / 6;
}