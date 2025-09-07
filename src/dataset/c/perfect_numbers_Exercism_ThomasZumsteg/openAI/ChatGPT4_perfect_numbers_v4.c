#include "perfect_numbers.h"
#include <math.h>

int factor_sum(int num) {
    if (num < 2) return 0;
    int total = 1;
    int sqrt_num = (int)sqrt(num);
    for (int n = 2; n <= sqrt_num; n++) {
        if (num % n == 0) {
            total += n;
            int pair = num / n;
            if (pair != n) total += pair;
        }
    }
    return total;
}

kind classify_number(int num) {
    if (num < 1) return error;
    int sum = factor_sum(num);
    if (num > sum) return deficient_number;
    if (num < sum) return abundant_number;
    return perfect_number;
}