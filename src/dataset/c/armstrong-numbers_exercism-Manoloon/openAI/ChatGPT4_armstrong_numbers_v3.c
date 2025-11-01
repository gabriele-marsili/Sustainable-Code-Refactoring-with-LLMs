#include "armstrong_numbers.h"
#include <stdint.h>
#include <stdbool.h>

bool is_armstrong_number(int candidate)
{
    if (candidate < 0) return false;
    if (candidate < 10) return true;

    int result = 0, num = candidate, digits = 0, powers[10] = {0};

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
        result += powers[num % 10];
        num /= 10;
    }

    return result == candidate;
}