#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

int ctoi(char c) {
    if (c < '0' || '9' < c) return -1;
    return c - '0';
}

long largest_series_product(char *digits, int len) {
    if (digits == NULL || len < 0) return -1;
    size_t digits_len = strlen(digits);

    if (digits_len == 0) return len == 0 ? 1 : -1;

    if (len > (int)digits_len) return -1;

    long largest = 0;
    if (len == 0) return 1;

    for (size_t i = 0; i <= digits_len - (size_t)len; ++i) {
        long product = 1;
        for (int j = 0; j < len; ++j) {
            int digit = ctoi(digits[i + j]);
            if (digit < 0) return -1;
            if (product > LONG_MAX / digit) return -1;
            product *= digit;
        }
        if (product > largest) {
            largest = product;
        }
    }

    return largest;
}