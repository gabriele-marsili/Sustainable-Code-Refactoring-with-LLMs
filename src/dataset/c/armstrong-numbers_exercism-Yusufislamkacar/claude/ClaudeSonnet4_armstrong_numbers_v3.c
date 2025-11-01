#include "armstrong_numbers.h"
#include <math.h>

bool is_armstrong_number(int x) {
    if (x < 0) return false;
    if (x < 10) return true;
    
    int original = x;
    int digit_count = 0;
    int temp = x;
    
    while (temp > 0) {
        digit_count++;
        temp /= 10;
    }
    
    int sum = 0;
    temp = x;
    while (temp > 0) {
        int digit = temp % 10;
        sum += pow(digit, digit_count);
        temp /= 10;
    }
    
    return sum == original;
}