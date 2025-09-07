#include "perfect_numbers.h"

#include <stdio.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    if (number <= 1) return 0;
    
    int result = 1;
    int sqrt_num = 1;
    
    while (sqrt_num * sqrt_num < number) {
        sqrt_num++;
    }
    
    for (int divisor = 2; divisor <= sqrt_num; divisor++) {
        if (number % divisor == 0) {
            result += divisor;
            int complement = number / divisor;
            if (complement != divisor && complement != number) {
                result += complement;
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