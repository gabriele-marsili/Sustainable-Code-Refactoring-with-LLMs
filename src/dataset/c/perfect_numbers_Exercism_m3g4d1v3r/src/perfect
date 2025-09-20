#include "perfect_numbers.h"

#include <stdio.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    if (number <= 1) return 0;
    int result = 1; // 1 is always a divisor (except for 0 and 1)
    for (int count_nb = 2; count_nb * count_nb <= number; count_nb++) {
        if (number % count_nb == 0) {
            result += count_nb;
            if (count_nb != number / count_nb) {
                result += number / count_nb;
            }
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