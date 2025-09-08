#include "all_your_base.h"
#include <stdio.h>

unsigned long int from_base(int8_t *digits, int base, size_t len) {
    unsigned long int result = 0;
    int8_t *end = digits + len;
    for(int8_t *d = digits; d < end; d++) {
        if(*d < 0 || *d >= base) return 0;
        result = result * base + *d;
    }
    return result;
}

size_t to_base(unsigned long int num, int base, int8_t *result) {
    if(num == 0) {
        result[0] = 0;
        return 1;
    }
    
    int8_t digits[DIGITS_ARRAY_SIZE];
    size_t i = 0;
    while(num > 0) {
        digits[i++] = num % base;
        num /= base;
    }
    
    for(size_t j = 0; j < i; j++) {
        result[j] = digits[i - 1 - j];
    }
    return i;
}

size_t rebase(int8_t *digits, int8_t f_base, int8_t t_base, size_t len) {
    if(len == 0 || f_base <= 1 || t_base <= 1) return 0;
    if(len == 1 && digits[0] == 0) {
        digits[0] = 0;
        return 1;
    }
    
    unsigned long int num = from_base(digits, f_base, len);
    if(num == 0) return 0;
    return to_base(num, t_base, digits);
}