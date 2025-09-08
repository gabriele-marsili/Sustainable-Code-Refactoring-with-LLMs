#include "all_your_base.h"
#include <stdio.h>
#include <stdlib.h>

unsigned long int from_base(const int8_t *digits, int base, size_t len) {
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

    if (num == 0) {
        result[0] = 0;
        return 1;
    }

    int8_t digits[DIGITS_ARRAY_SIZE];
    size_t i = 0;
    while (num > 0 && i < DIGITS_ARRAY_SIZE) {
        digits[i++] = num % base;
        num /= base;
    }

    if (i == DIGITS_ARRAY_SIZE && num > 0) return 0;

    for (size_t j = 0; j < i; ++j) {
        result[j] = digits[i - 1 - j];
    }

    return i;
}

size_t rebase(int8_t *digits, int8_t f_base, int8_t t_base, size_t len) {
    if (f_base <= 1 || t_base <= 1 || len == 0) return 0;

    unsigned long int num = from_base(digits, f_base, len);
    if (num == 0 && (digits[0] != 0 || len != 1)) return 0;

    return to_base(num, t_base, digits);
}