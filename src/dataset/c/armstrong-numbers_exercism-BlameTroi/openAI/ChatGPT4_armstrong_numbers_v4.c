#include <stdbool.h>
#include <math.h>

bool is_armstrong_number(int candidate)
{
    if (candidate < 10)
        return true;

    int original = candidate;
    int sum = 0;
    int digits = 0;

    // Calculate the number of digits
    for (int temp = candidate; temp > 0; temp /= 10)
        digits++;

    // Calculate the Armstrong sum
    while (candidate > 0) {
        int digit = candidate % 10;
        candidate /= 10;
        int power = 1;
        for (int i = 0; i < digits; i++) {
            power *= digit;
        }
        sum += power;
        if (sum > original) // Early exit if sum exceeds original
            return false;
    }

    return sum == original;
}