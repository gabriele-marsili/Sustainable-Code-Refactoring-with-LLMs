#include "armstrong_numbers.h"

bool is_armstrong_number(int candidate) {
    if (candidate < 0) return false;
    if (candidate < 10) return true;
    
    int orig_candidate = candidate;
    int length = 0;
    int temp = candidate;
    
    while (temp > 0) {
        temp /= 10;
        length++;
    }
    
    int armstrong = 0;
    temp = candidate;
    
    while (temp > 0) {
        int digit = temp % 10;
        int power = 1;
        
        for (int i = 0; i < length; i++) {
            power *= digit;
        }
        
        armstrong += power;
        
        if (armstrong > orig_candidate) {
            return false;
        }
        
        temp /= 10;
    }
    
    return armstrong == orig_candidate;
}