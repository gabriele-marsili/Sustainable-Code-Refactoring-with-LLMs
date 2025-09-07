#include "perfect_numbers.h"

#include <stdio.h>
#include <math.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    if (number <= 1) return 0;

    int sum = 1;
    int sqrt_number = (int)sqrt(number);

    for (int i = 2; i <= sqrt_number; ++i) {
        if (number % i == 0) {
            sum += i;
            if (i * i != number) {
                sum += number / i;
            }
        }
    }
    return sum;
}

int classify_number(int number) {
    if (number <= 0) return ERROR;

    int aliquot_sum_result = aliquot_sum(number);

    if (aliquot_sum_result == number) {
        return PERFECT_NUMBER;
    } else if (aliquot_sum_result > number) {
        return ABUNDANT_NUMBER;
    } else {
        return DEFICIENT_NUMBER;
    }
}