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

    long largest = 0, product = 1;
    int zero_count = 0, digit_count = 0;

    for (char *p = digits; *p; p++) {
        int d = ctoi(*p);
        if (d < 0) return -1;

        if (d == 0) {
            zero_count++;
        } else {
            product *= d;
        }

        digit_count++;
        if (digit_count > len) {
            int removed_digit = ctoi(*(p - len));
            if (removed_digit == 0) {
                zero_count--;
            } else {
                product /= removed_digit;
            }
            digit_count--;
        }

        if (zero_count == 0 && digit_count == len) {
            if (product > largest) {
                largest = product;
            }
        }
    }

    return (digit_count < len) ? -1 : largest;
}