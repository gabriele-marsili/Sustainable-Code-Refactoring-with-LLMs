#include "armstrong_numbers.h"
#include <stdint.h>
#include <stdio.h>
#include <math.h>

bool is_armstrong_number(int candidate)
{
    if(candidate < 0 ) return false;
    if(candidate < 10) return true;
    int result = 0;
    int num = candidate;
    int digits = floor(log10(candidate))+1;
    while (num > 0)
    {
        int r = num % 10;
        result += pow(r,digits);
        num /= 10;
    }
    return result == candidate;
}
