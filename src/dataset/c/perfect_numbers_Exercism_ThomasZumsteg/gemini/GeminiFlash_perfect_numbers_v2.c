#include "perfect_numbers.h"
#include <math.h>

int factor_sum(int num) {
    if (num <= 1) return 0;

    int sum = 1;
    int sqrt_num = (int)sqrt(num);

    for (int i = 2; i <= sqrt_num; ++i) {
        if (num % i == 0) {
            sum += i;
            if (i * i != num) {
                sum += num / i;
            }
        }
    }
    return sum;
}

kind classify_number(int num) {
    if (num <= 0) {
        return error;
    }

    int sum = factor_sum(num);

    if (num == sum) {
        return perfect_number;
    } else if (num < sum) {
        return abundant_number;
    } else {
        return deficient_number;
    }
}