#include "largest_series_product.h"
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

int ctoi(char c) {
    return (c >= '0' && c <= '9') ? c - '0' : -1;
}

long largest_series_product(char *digits, int len) {
    if (len == 0) return 1;
    if (!digits || len < 0) return -1;

    int n = strlen(digits);
    if (n < len) return -1;

    long largest = 0, product = 1;
    int zero_count = 0;

    for (int i = 0; i < n; i++) {
        int d = ctoi(digits[i]);
        if (d < 0) return -1;

        if (i >= len) {
            int prev_d = ctoi(digits[i - len]);
            if (prev_d == 0) zero_count--;
            else product /= prev_d;
        }

        if (d == 0) {
            zero_count++;
            product = 1;
        } else {
            product *= d;
        }

        if (i >= len - 1 && zero_count == 0) {
            if (product > largest) largest = product;
        }
    }

    return largest;
}