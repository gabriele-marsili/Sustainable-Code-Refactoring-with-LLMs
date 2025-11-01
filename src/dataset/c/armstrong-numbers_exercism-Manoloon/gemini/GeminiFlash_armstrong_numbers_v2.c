#include "armstrong_numbers.h"
#include <stdbool.h>
#include <stdint.h>

static unsigned int power(int base, int exp) {
    unsigned int res = 1;
    for (int i = 0; i < exp; i++) {
        res *= base;
    }
    return res;
}

bool is_armstrong_number(int candidate) {
    if (candidate < 0) return false;
    if (candidate < 10) return true;

    int num = candidate;
    int digits = 0;
    int temp = candidate;

    while (temp != 0) {
        temp /= 10;
        digits++;
    }

    unsigned int result = 0;
    num = candidate;

    while (num != 0) {
        int digit = num % 10;
        result += power(digit, digits);
        num /= 10;
        if (result > candidate) return false;
    }

    return result == (unsigned int)candidate;
}