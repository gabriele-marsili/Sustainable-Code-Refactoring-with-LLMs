#include <stdbool.h>
#include <stdio.h>

#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate) {
    if (candidate >= 0 && candidate < 10) {
        return true;
    }
    if (candidate > 9 && candidate < 100) {
        return false;
    }

    int num_digits = 0;
    int temp = candidate;
    while (temp != 0) {
        temp /= 10;
        num_digits++;
    }

    int sum = 0;
    temp = candidate;
    while (temp != 0) {
        int digit = temp % 10;
        temp /= 10;

        int power = 1;
        for (int i = 0; i < num_digits; i++) {
            power *= digit;
        }

        if (sum > __INT_MAX__ - power) {
            return false;
        }

        sum += power;
    }

    return sum == candidate;
}