#include "all_your_base.h"
#include <stdio.h>
#include <algorithm>

unsigned long int from_base(int8_t *digits, int base, size_t len) {
    if (base <= 1) return 0;
    unsigned long int result = 0;
    for (size_t i = 0; i < len; ++i) {
        if (digits[i] < 0 || base <= digits[i]) return 0;
        if (__builtin_umull_overflow(result, base, &result)) return 0;
        if (__builtin_uaddl_overflow(result, digits[i], &result)) return 0;
    }
    return result;
}

size_t to_base(unsigned long int num, int base, int8_t *result) {
    if (base <= 1) return 0;
    size_t i = 0;
    if (num == 0) {
        result[0] = 0;
        return 1;
    }
    int8_t digits[DIGITS_ARRAY_SIZE];
    while (num > 0) {
        digits[i++] = num % base;
        num /= base;
    }
    std::reverse(digits, digits + i);
    std::copy(digits, digits + i, result);
    return i;
}

size_t rebase(int8_t *digits, int8_t f_base, int8_t t_base, size_t len) {
    if (f_base <= 1 || t_base <= 1 || len == 0) return 0;

    bool all_zeros = true;
    for (size_t i = 0; i < len; ++i) {
        if (digits[i] != 0) {
            all_zeros = false;
            break;
        }
    }
    if (all_zeros) {
        digits[0] = 0;
        return 1;
    }

    unsigned long int num = from_base(digits, f_base, len);
    if (num == 0 && (digits[0] != 0 || f_base <= 1)) return 0;
    return to_base(num, t_base, digits);
}