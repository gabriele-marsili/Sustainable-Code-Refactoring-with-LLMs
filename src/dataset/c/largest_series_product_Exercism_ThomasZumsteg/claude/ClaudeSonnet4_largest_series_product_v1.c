#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>

static inline int ctoi(char c) {
    return (c >= '0' && c <= '9') ? c - '0' : -1;
}

long largest_series_product(char *digits, int len) {
    if (len == 0) return 1;
    if (!digits || *digits == '\0') return -1;
    
    int digits_len = strlen(digits);
    if (len > digits_len) return -1;
    
    long largest = 0;
    
    for (int i = 0; i <= digits_len - len; i++) {
        long product = 1;
        int j;
        
        for (j = 0; j < len; j++) {
            int digit = ctoi(digits[i + j]);
            if (digit < 0) return -1;
            product *= digit;
        }
        
        if (product > largest) {
            largest = product;
        }
    }
    
    return largest;
}