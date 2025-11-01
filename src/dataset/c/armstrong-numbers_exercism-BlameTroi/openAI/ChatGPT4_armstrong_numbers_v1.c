#include <stdbool.h>
#include <math.h>

bool is_armstrong_number(int candidate)
{
    if (candidate < 0)
        return false;
    if (candidate < 10)
        return true;

    int original = candidate;
    int sum = 0;
    int digits = 0;

    // Calculate the number of digits
    for (int temp = candidate; temp > 0; temp /= 10)
        digits++;

    // Calculate the sum of digits raised to the power of the number of digits
    while (candidate > 0) {
        int digit = candidate % 10;
        candidate /= 10;
        sum += (int)pow(digit, digits);
        if (sum > original) // Early exit if sum exceeds original number
            return false;
    }

    return sum == original;
}