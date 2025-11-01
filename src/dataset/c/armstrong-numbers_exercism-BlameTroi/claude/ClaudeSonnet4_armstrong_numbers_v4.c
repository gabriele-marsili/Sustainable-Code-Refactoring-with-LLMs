#include <stdio.h> 
#include <stdlib.h>
#include <errno.h>
#include <math.h>
#include <string.h>

#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate)
{
    if (candidate < 0)
        return false;
    if (candidate < 10)
        return true;
    if (candidate < 100)
        return false;

    int original = candidate;
    int digit_count = 0;
    int temp = candidate;
    
    while (temp > 0) {
        digit_count++;
        temp /= 10;
    }
    
    int sum = 0;
    temp = candidate;
    
    while (temp > 0) {
        int digit = temp % 10;
        int power_result = 1;
        for (int i = 0; i < digit_count; i++) {
            power_result *= digit;
        }
        sum += power_result;
        temp /= 10;
    }
    
    return sum == original;
}