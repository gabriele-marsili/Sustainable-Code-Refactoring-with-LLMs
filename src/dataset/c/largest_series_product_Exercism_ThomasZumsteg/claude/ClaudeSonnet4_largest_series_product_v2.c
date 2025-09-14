#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

long largest_series_product(char *digits, int len) {
    if(len == 0) return 1;
    
    int digits_len = strlen(digits);
    if(digits_len == 0) return -1;
    if(digits_len < len) return -1;
    
    long largest = 0;
    long product = 1;
    int zero_count = 0;
    
    // Initialize first window
    for(int i = 0; i < len; i++) {
        if(digits[i] < '0' || digits[i] > '9') return -1;
        int digit = digits[i] - '0';
        if(digit == 0) {
            zero_count++;
        } else {
            product *= digit;
        }
    }
    
    largest = (zero_count > 0) ? 0 : product;
    
    // Slide the window
    for(int i = len; i < digits_len; i++) {
        if(digits[i] < '0' || digits[i] > '9') return -1;
        
        // Remove leftmost digit
        int old_digit = digits[i - len] - '0';
        if(old_digit == 0) {
            zero_count--;
        } else {
            product /= old_digit;
        }
        
        // Add new digit
        int new_digit = digits[i] - '0';
        if(new_digit == 0) {
            zero_count++;
        } else {
            product *= new_digit;
        }
        
        long current_product = (zero_count > 0) ? 0 : product;
        if(current_product > largest) {
            largest = current_product;
        }
    }
    
    return largest;
}