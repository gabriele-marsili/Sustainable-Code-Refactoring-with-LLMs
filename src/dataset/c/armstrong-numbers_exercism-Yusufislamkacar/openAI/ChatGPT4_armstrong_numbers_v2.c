#include "armstrong_numbers.h"
#include <math.h>
#include <stdbool.h>

bool is_armstrong_number(int x) {
    if (x < 0) return false;

    int original = x, total = 0, digits = 0;
    int temp = x;

    // Calculate the number of digits
    while (temp > 0) {
        digits++;
        temp /= 10;
    }

    temp = x;

    // Calculate the Armstrong sum
    while (temp > 0) {
        int digit = temp % 10;
        total += pow(digit, digits);
        temp /= 10;
    }

    return total == original;
}