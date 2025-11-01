#include "armstrong_numbers.h"
#include <stdint.h>
#include <stdbool.h>

bool is_armstrong_number(int candidate)
{
    if (candidate < 0) return false;
    if (candidate < 10) return true;

    int result = 0;
    int num = candidate;
    int digits = 0;
    int powers[10] = {0};

    // Calculate the number of digits
    for (int temp = candidate; temp > 0; temp /= 10) {
        digits++;
    }

    // Precompute powers for digits 0-9
    for (int i = 0; i < 10; i++) {
        int power = 1;
        for (int j = 0; j < digits; j++) {
            power *= i;
        }
        powers[i] = power;
    }

    // Calculate Armstrong sum
    while (num > 0) {
        int r = num % 10;
        result += powers[r];
        num /= 10;
        if (result > candidate) return false; // Early exit if sum exceeds candidate
    }

    return result == candidate;
}