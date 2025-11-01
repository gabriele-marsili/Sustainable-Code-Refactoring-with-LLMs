#include "armstrong_numbers.h"

bool is_armstrong_number(int x) {
    if (x < 0) return false;
    if (x < 10) return true;
    
    int original = x;
    int digit_count = 0;
    int temp = x;
    
    // Count digits
    while (temp > 0) {
        digit_count++;
        temp /= 10;
    }
    
    // Calculate sum of powers
    int sum = 0;
    temp = x;
    while (temp > 0) {
        int digit = temp % 10;
        int power = 1;
        for (int i = 0; i < digit_count; i++) {
            power *= digit;
        }
        sum += power;
        temp /= 10;
    }
    
    return sum == original;
}