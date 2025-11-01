#include "perfect_numbers.h"
#include <math.h>

kind classify_number(int num) {
    if (num < 1) return ERROR;
    if (num == 1) return DEFICIENT_NUMBER;

    int sum = 1;
    int limit = (int)sqrt(num);

    if (limit * limit == num) {
        sum += limit;
    } else {
        limit++;
    }

    for (int i = 2; i < limit; ++i) {
        if (num % i == 0) {
            sum += i + (num / i);
        }
    }

    if (sum > num) {
        return ABUNDANT_NUMBER;
    } else if (sum == num) {
        return PERFECT_NUMBER;
    } else {
        return DEFICIENT_NUMBER;
    }
}