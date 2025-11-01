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
    if (candidate < 0)
        return false;

    // count digits without string conversion
    int temp = candidate;
    int digit_count = 0;
    while (temp > 0) {
        digit_count++;
        temp /= 10;
    }

    // calculate sum using integer arithmetic
    temp = candidate;
    long long sum = 0;
    
    // precompute powers for digits 0-9 to avoid repeated pow() calls
    long long powers[10];
    for (int i = 0; i < 10; i++) {
        long long power = 1;
        for (int j = 0; j < digit_count; j++) {
            power *= i;
        }
        powers[i] = power;
    }
    
    while (temp > 0) {
        int digit = temp % 10;
        sum += powers[digit];
        temp /= 10;
        
        // early exit if sum exceeds candidate
        if (sum > candidate)
            return false;
    }

    return sum == candidate;
}