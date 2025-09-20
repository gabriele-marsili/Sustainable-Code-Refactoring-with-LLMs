#include "all_your_base.h"
#include <stdio.h>

unsigned long int from_base(int8_t *digits, int base, size_t len) {
    if (base <= 1) return 0;
    unsigned long int result = 0;
    for (size_t i = 0; i < len; i++) {
        if (digits[i] < 0 || digits[i] >= base) return 0;
        result = result * base + digits[i];
    }
    return result;
}

size_t to_base(unsigned long int num, int base, int8_t *result) {
    if (base <= 1) return 0;
    size_t i = 0;
    do {
        result[i++] = num % base;
        num /= base;
    } while (num > 0);
    for (size_t j = 0; j < i / 2; j++) {
        int8_t temp = result[j];
        result[j] = result[i - j - 1];
        result[i - j - 1] = temp;
    }
    return i;
}

size_t rebase(int8_t *digits, int8_t f_base, int8_t t_base, size_t len) {
    if (len == 0 || f_base <= 1 || t_base <= 1) return 0;
    unsigned long int num = from_base(digits, f_base, len);
    return to_base(num, t_base, digits);
}