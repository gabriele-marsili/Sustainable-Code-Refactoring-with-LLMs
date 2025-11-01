#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) {
    if (number < 2) {
        return 1;
    }
    return number * (number + 1) * (2 * number + 1) / 6;
}

unsigned int square_of_sum(unsigned int number) {
    if (number < 2) {
        return 1;
    }
    unsigned int sum = number * (number + 1) / 2;
    return sum * sum;
}

unsigned int difference_of_squares(unsigned int number) {
    if (number < 2) {
        return 0;
    }
    unsigned int sum_sq = sum_of_squares(number);
    unsigned int sq_sum = square_of_sum(number);
    return sq_sum - sum_sq;
}