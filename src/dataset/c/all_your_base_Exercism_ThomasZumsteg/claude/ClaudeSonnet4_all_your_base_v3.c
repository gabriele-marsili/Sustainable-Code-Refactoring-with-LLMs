#include "all_your_base.h"
#include <stdio.h>

unsigned long int from_base(int8_t *digits, int base, size_t len) {
    if (len == 0) return 0;
    
    unsigned long int result = 0;
    const int8_t *end = digits + len;
    
    for (const int8_t *d = digits; d < end; ++d) {
        if (*d < 0 || *d >= base) return 0;
        result = result * base + *d;
    }
    return result;
}

size_t to_base(unsigned long int num, int base, int8_t *result) {
    if (num == 0) {
        result[0] = 0;
        return 1;
    }
    
    size_t count = 0;
    unsigned long int temp = num;
    
    while (temp > 0) {
        temp /= base;
        ++count;
    }
    
    for (size_t i = count; i > 0; --i) {
        result[i - 1] = num % base;
        num /= base;
    }
    
    return count;
}

size_t rebase(int8_t *digits, int8_t f_base, int8_t t_base, size_t len) {
    if (len == 0 || f_base <= 1 || t_base <= 1) return 0;
    
    if (len == 1 && digits[0] == 0) {
        digits[0] = 0;
        return 1;
    }
    
    unsigned long int num = from_base(digits, f_base, len);
    if (num == 0) return 0;
    
    return to_base(num, t_base, digits);
}