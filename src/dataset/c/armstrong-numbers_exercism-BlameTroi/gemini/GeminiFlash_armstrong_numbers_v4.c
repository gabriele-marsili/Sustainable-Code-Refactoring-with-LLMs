#include <stdbool.h>
#include <stdio.h>
#include <math.h>

#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate) {
    if (candidate < 0) return false;

    int num_digits = 0;
    int temp = candidate;
    while (temp != 0) {
        temp /= 10;
        num_digits++;
    }

    if (num_digits == 0) return true; 

    int sum = 0;
    temp = candidate;
    while (temp != 0) {
        int digit = temp % 10;
        sum += (int)round(pow((double)digit, (double)num_digits));
        temp /= 10;
    }

    return sum == candidate;
}