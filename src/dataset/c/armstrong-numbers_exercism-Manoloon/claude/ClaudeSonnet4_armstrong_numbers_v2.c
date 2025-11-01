#include "armstrong_numbers.h"
#include <stdint.h>

bool is_armstrong_number(int candidate)
{
    if(candidate < 0) return false;
    if(candidate < 10) return true;
    
    // Count digits without floating point operations
    int temp = candidate;
    int digits = 0;
    while(temp > 0) {
        digits++;
        temp /= 10;
    }
    
    // Calculate powers using integer multiplication
    int result = 0;
    int num = candidate;
    while(num > 0) {
        int digit = num % 10;
        int power = 1;
        for(int i = 0; i < digits; i++) {
            power *= digit;
        }
        result += power;
        num /= 10;
        
        // Early exit if result exceeds candidate
        if(result > candidate) return false;
    }
    
    return result == candidate;
}