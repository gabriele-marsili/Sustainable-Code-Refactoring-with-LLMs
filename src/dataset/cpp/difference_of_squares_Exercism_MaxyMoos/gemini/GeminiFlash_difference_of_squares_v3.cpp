#include "difference_of_squares.h"

long squares::square_of_sums(int a) {
    long sum = (long)a * (a + 1) / 2;
    return sum * sum;
}

long squares::sum_of_squares(int a) {
    return (long)a * (a + 1) * (2 * a + 1) / 6;
}

long squares::difference(int a) {
    long sum_of_sums = (long)a * (a + 1) / 2;
    long square_of_sums = sum_of_sums * sum_of_sums;
    long sum_of_squares = (long)a * (a + 1) * (2 * a + 1) / 6;
    return square_of_sums - sum_of_squares;
}