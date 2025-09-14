#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

static inline int ctoi(char c) {
    return (c >= '0' && c <= '9') ? c - '0' : -1;
}

long largest_series_product(char *digits, int len) {
    if (len == 0) return 1;
    if (!digits || *digits == '\0') return -1;
    
    int digits_len = strlen(digits);
    if (digits_len < len) return -1;
    
    long largest = 0;
    long product = 1;
    int zero_count = 0;
    int digit_values[len];
    
    for (int i = 0; i < len; i++) {
        int d = ctoi(digits[i]);
        if (d < 0) return -1;
        digit_values[i] = d;
        if (d == 0) {
            zero_count++;
            product = 0;
        } else {
            product *= d;
        }
    }
    
    if (zero_count == 0) {
        largest = product;
    }
    
    for (int i = len; i < digits_len; i++) {
        int new_digit = ctoi(digits[i]);
        if (new_digit < 0) return -1;
        
        int old_digit = digit_values[i % len];
        digit_values[i % len] = new_digit;
        
        if (old_digit == 0) {
            zero_count--;
        }
        if (new_digit == 0) {
            zero_count++;
        }
        
        if (zero_count == 0) {
            if (old_digit != 0) {
                product = product / old_digit * new_digit;
            } else {
                product = 1;
                for (int j = 0; j < len; j++) {
                    product *= digit_values[j];
                }
            }
            if (product > largest) {
                largest = product;
            }
        }
    }
    
    return largest;
}