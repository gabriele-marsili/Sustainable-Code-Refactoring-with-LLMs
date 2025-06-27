#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) {
    unsigned int result = 0;
    for (unsigned int i = 1; i <= number; i++) {
        result += pow(i, 2);
    }
    printf("Sum of Squares: %d\n", result);
    return (result);
}

unsigned int square_of_sum(unsigned int number) {
    unsigned int result = 0;
    for (unsigned int i = 1; i <= number; i++) {
        result += i;
    }
    result = pow(result, 2);
    printf("Square of Sum: %d\n", result);
    return (result);
}

unsigned int difference_of_squares(unsigned int number) {
    return (square_of_sum(number) - sum_of_squares(number));
}
