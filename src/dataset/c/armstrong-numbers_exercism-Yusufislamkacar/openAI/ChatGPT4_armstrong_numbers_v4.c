#include "armstrong_numbers.h"
#include <math.h>
#include <stdbool.h>

bool is_armstrong_number(int x) {
    if (x < 0) return false;

    int original = x, total = 0, digits = 0;
    int temp = x;

    while (temp > 0) {
        digits++;
        temp /= 10;
    }

    temp = x;
    while (temp > 0) {
        int digit = temp % 10;
        int power = 1;
        for (int i = 0; i < digits; i++) {
            power *= digit;
        }
        total += power;
        temp /= 10;
    }

    return total == original;
}