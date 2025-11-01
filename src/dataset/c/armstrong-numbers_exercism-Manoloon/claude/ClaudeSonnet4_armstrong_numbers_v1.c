#include "armstrong_numbers.h"
#include <stdint.h>

bool is_armstrong_number(int candidate)
{
    if(candidate < 0) return false;
    if(candidate < 10) return true;
    
    int original = candidate;
    int digits = 0;
    int temp = candidate;
    
    // Count digits without floating point operations
    while(temp > 0) {
        digits++;
        temp /= 10;
    }
    
    // Pre-compute powers for digits 0-9 to avoid repeated pow() calls
    int powers[10];
    int base = 1;
    for(int i = 0; i < digits; i++) {
        base *= i == 0 ? 1 : i;
    }
    
    for(int i = 0; i < 10; i++) {
        int power = 1;
        for(int j = 0; j < digits; j++) {
            power *= i;
        }
        powers[i] = power;
    }
    
    int result = 0;
    temp = candidate;
    
    while(temp > 0) {
        int digit = temp % 10;
        result += powers[digit];
        temp /= 10;
    }
    
    return result == original;
}