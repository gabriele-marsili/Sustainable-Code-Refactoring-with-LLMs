#include "perfect_numbers.h"
#include <stdlib.h>
#include <math.h>

int factor_sum(int num) {
    if (num < 2) return 0; // Early return for numbers less than 2
    int total = 1;
    int sqrt_num = (int)sqrt(num); // Compute square root once
    for (int n = 2; n <= sqrt_num; n++) {
        if (num % n == 0) {
            total += n;
            int complement = num / n;
            if (complement != n) total += complement; // Avoid double-counting the square root
        }
    }
    return total;
}

kind classify_number(int num) {
    if (num < 1) return error; // Early return for invalid input
    int sum = factor_sum(num);
    if (num > sum) return deficient_number;
    if (num < sum) return abundant_number;
    return perfect_number;
}