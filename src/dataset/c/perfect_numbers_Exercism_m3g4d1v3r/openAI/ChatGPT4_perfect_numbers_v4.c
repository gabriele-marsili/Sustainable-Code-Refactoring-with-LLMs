#include "perfect_numbers.h"

#include <stdio.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    if (number <= 1) return 0;
    int result = 1;
    for (int i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            result += i;
            if (i != number / i) result += number / i;
        }
    }
    return result;
}

int classify_number(int number) {
    if (number <= 0) return ERROR;
    int aliquot_sum_result = aliquot_sum(number);
    if (aliquot_sum_result == number) {
        return PERFECT_NUMBER;
    } else if (aliquot_sum_result > number) {
        return ABUNDANT_NUMBER;
    }
    return DEFICIENT_NUMBER;
}