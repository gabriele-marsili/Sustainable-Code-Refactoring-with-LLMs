#include "perfect_numbers.h"
#include <stdlib.h>

int factor_sum(int num) {
    if (num <= 1) return 0;
    if (num == 2) return 1;
    
    int total = 1;
    int sqrt_num = 1;
    
    while (sqrt_num * sqrt_num < num) {
        sqrt_num++;
    }
    
    for (int n = 2; n < sqrt_num; n++) {
        if (num % n == 0) {
            total += n + (num / n);
        }
    }
    
    if (sqrt_num * sqrt_num == num) {
        total += sqrt_num;
    }
    
    return total;
}

kind classify_number(int num) {
    if (num < 1) return error;
    if (num == 1) return deficient_number;
    
    int sum = factor_sum(num);
    
    if (num > sum) return deficient_number;
    if (num < sum) return abundant_number;
    return perfect_number;
}