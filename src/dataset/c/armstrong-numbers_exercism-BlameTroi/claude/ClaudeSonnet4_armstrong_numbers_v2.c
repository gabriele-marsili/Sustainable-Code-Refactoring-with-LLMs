// exercism armstrong numbers
// t.brumley june 2022

#include <stdio.h> 
#include <stdlib.h>
#include <errno.h>
#include <math.h>
#include <string.h>

#include "armstrong_numbers.h"

// is a given integer an armstrong number?
//
// an armstrong number is one where the sum of its digits each raised
// to the power of the number of digits equals the number.
//
// 9 -> 9^1 = 9 ** is **
// 10 -> 1^2 + 0^2 = 1 ** not **
// 4 -> 4^1 = 4 ** is **

bool is_armstrong_number(int candidate)
{
    // quick guards for some easy cases
    if (candidate >= 0 && candidate < 10)
        return true;
    if (candidate > 9 && candidate < 100)
        return false;

    // count digits and extract them without string conversion
    int temp = candidate;
    int digit_count = 0;
    int digits[10]; // max digits for 32-bit int
    
    while (temp > 0) {
        digits[digit_count] = temp % 10;
        temp /= 10;
        digit_count++;
    }

    // calculate sum using integer exponentiation
    int sum = 0;
    for (int i = 0; i < digit_count; i++) {
        int digit_power = 1;
        for (int j = 0; j < digit_count; j++) {
            digit_power *= digits[i];
        }
        sum += digit_power;
        
        // early exit if sum exceeds candidate
        if (sum > candidate) {
            return false;
        }
    }

    return sum == candidate;
}