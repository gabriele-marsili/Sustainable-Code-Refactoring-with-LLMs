#include "perfect_numbers.h"
#include <stdlib.h>

int factor_sum(int num) {
    if (num <= 1) return 0;
    
    int total = 1;
    int sqrt_num = 1;
    
    // Find integer square root to avoid repeated multiplication
    while ((sqrt_num + 1) * (sqrt_num + 1) <= num) {
        sqrt_num++;
    }
    
    for (int n = 2; n <= sqrt_num; n++) {
        if (num % n == 0) {
            total += n;
            int quotient = num / n;
            if (quotient != n) {
                total += quotient;
            }
        }
    }
    
    return total;
}

kind classify_number(int num) {
    if (num < 1) return error;
    if (num == 1) return deficient_number;
    
    int sum = factor_sum(num);
    
    if (num > sum) return deficient_number;
    else if (num < sum) return abundant_number;
    else return perfect_number;
}