#include "perfect_numbers.h"
#include <math.h>

int factor_sum(int num) {
    if (num <= 1) return 0;

    int total = 1;
    int sqrt_num = (int)sqrt(num);

    for (int n = 2; n <= sqrt_num; ++n) {
        if (num % n == 0) {
            total += n;
            int divisor = num / n;
            if (divisor != n) {
                total += divisor;
            }
        }
    }
    return total;
}

kind classify_number(int num) {
    if (num <= 0) return error;

    int sum = factor_sum(num);

    if (num == sum) return perfect_number;
    else if (num < sum) return abundant_number;
    else return deficient_number;
}