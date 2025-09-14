#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

int ctoi(char c) {
    return (c >= '0' && c <= '9') ? c - '0' : -1;
}

long largest_series_product(char *digits, int len) {
    if (len == 0) return 1;
    if (!digits || *digits == '\0') return -1;
    
    int digits_len = strlen(digits);
    if (len > digits_len) return -1;
    
    long largest = 0;
    long product = 1;
    int zero_count = 0;
    
    for (int i = 0; i < len; i++) {
        int d = ctoi(digits[i]);
        if (d < 0) return -1;
        if (d == 0) {
            zero_count++;
        } else {
            product *= d;
        }
    }
    
    if (zero_count > 0) {
        largest = 0;
    } else {
        largest = product;
    }
    
    for (int i = len; i < digits_len; i++) {
        int old_digit = ctoi(digits[i - len]);
        int new_digit = ctoi(digits[i]);
        
        if (new_digit < 0) return -1;
        
        if (old_digit == 0) {
            zero_count--;
        } else {
            product /= old_digit;
        }
        
        if (new_digit == 0) {
            zero_count++;
        } else {
            product *= new_digit;
        }
        
        long current_product = (zero_count > 0) ? 0 : product;
        if (current_product > largest) {
            largest = current_product;
        }
    }
    
    return largest;
}