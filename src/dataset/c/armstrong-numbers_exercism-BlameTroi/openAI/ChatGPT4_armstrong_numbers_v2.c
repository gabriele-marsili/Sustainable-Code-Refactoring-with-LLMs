#include <stdbool.h>
#include <math.h>

bool is_armstrong_number(int candidate)
{
    if (candidate < 0)
        return false;

    int original = candidate;
    int sum = 0;
    int num_digits = 0;

    // Calculate the number of digits
    for (int temp = candidate; temp > 0; temp /= 10)
        num_digits++;

    // Calculate the sum of digits raised to the power of num_digits
    for (int temp = candidate; temp > 0; temp /= 10) {
        int digit = temp % 10;
        sum += (int)pow(digit, num_digits);
        if (sum > candidate) // Early exit if sum exceeds candidate
            return false;
    }

    return sum == original;
}