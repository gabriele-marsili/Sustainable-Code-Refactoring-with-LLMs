#include "armstrong_numbers.h"
#include <math.h>

bool is_armstrong_number(int candidate) {
    if (candidate < 0) {
        return false;
    }

    int length = 0;
    int temp = candidate;
    while (temp != 0) {
        temp /= 10;
        length++;
    }

    int armstrong_sum = 0;
    temp = candidate;
    while (temp != 0) {
        int digit = temp % 10;
        armstrong_sum += round(pow(digit, length));
        temp /= 10;
    }

    return armstrong_sum == candidate;
}