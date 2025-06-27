#include "perfect_numbers.h"

#include <stdio.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    int result = 0;
    for (int count_nb = 1; count_nb < number; count_nb++) {
        if (number % count_nb == 0) result += count_nb;
    }
    return (result);
}

int classify_number(int number) {
    int aliquot_sum_result = aliquot_sum(number);
    if (number <= 0) return (ERROR);
    if (aliquot_sum_result == number) {
        return (PERFECT_NUMBER);
    } else if (aliquot_sum_result > number) {
        return (ABUNDANT_NUMBER);
    }
    return (DEFICIENT_NUMBER);
}
