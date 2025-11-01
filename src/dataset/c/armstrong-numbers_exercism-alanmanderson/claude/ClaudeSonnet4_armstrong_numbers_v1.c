#include "armstrong_numbers.h"
#include <stdio.h>

bool is_armstrong_number(int candidate) {
    if (candidate < 0) return false;
    if (candidate < 10) return true;
    
    int length = 0;
    int temp = candidate;
    
    // Count digits more efficiently
    while (temp > 0) {
        temp /= 10;
        length++;
    }
    
    int armstrong = 0;
    temp = candidate;
    
    while (temp > 0) {
        int digit = temp % 10;
        
        // Calculate power more efficiently
        int power = 1;
        for (int i = 0; i < length; i++) {
            power *= digit;
        }
        
        armstrong += power;
        
        // Early termination if sum exceeds candidate
        if (armstrong > candidate) return false;
        
        temp /= 10;
    }
    
    return armstrong == candidate;
}