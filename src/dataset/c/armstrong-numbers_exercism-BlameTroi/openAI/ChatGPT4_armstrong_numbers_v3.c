#include <stdio.h>
#include <stdbool.h>
#include <math.h>

#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate)
{
    if (candidate < 0)
        return false;

    int original = candidate;
    int sum = 0;
    int digits = 0;

    // Calculate the number of digits
    for (int temp = candidate; temp > 0; temp /= 10)
        digits++;

    // Calculate the Armstrong sum
    for (int temp = candidate; temp > 0; temp /= 10) {
        int digit = temp % 10;
        sum += (int)pow(digit, digits);
        if (sum > candidate) // Early exit if sum exceeds candidate
            return false;
    }

    return sum == original;
}