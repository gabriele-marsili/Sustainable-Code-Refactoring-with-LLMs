#include "perfect_numbers.h"

#include <stdio.h>

int aliquot_sum(int number);

int aliquot_sum(int number) {
    if (number <= 1) return 0;
    
    int result = 1; // 1 is always a divisor for numbers > 1
    int sqrt_num = 1;
    
    // Find approximate square root
    while (sqrt_num * sqrt_num <= number) {
        sqrt_num++;
    }
    sqrt_num--;
    
    for (int i = 2; i <= sqrt_num; i++) {
        if (number % i == 0) {
            result += i;
            int complement = number / i;
            if (complement != i && complement != number) {
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