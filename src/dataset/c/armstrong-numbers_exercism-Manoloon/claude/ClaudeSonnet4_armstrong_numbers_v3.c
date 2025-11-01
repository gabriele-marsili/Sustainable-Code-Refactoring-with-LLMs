#include "armstrong_numbers.h"
#include <stdint.h>

bool is_armstrong_number(int candidate)
{
    if(candidate < 0) return false;
    if(candidate < 10) return true;
    
    int original = candidate;
    int digits = 0;
    int temp = candidate;
    
    while(temp > 0) {
        digits++;
        temp /= 10;
    }
    
    int result = 0;
    temp = candidate;
    
    while(temp > 0) {
        int digit = temp % 10;
        int power = 1;
        for(int i = 0; i < digits; i++) {
            power *= digit;
        }
        result += power;
        temp /= 10;
        
        if(result > original) return false;
    }
    
    return result == original;
}