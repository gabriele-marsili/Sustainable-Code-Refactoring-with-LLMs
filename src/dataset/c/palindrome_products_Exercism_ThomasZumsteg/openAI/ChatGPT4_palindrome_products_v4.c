#include "palindrome_products.h"
#include <stdlib.h>

#define MAX_DIGITS (128)

static int is_palindrome(int num) {
    int reversed = 0, original = num;
    while (num > 0) {
        reversed = reversed * 10 + (num % 10);
        num /= 10;
    }
    return original == reversed;
}

Pair getPalindromeProduct(int small, int large) {
    Pair result = { .small_palind = 0, .larg_palind = 0 };
    int found_small = 0;

    for (int i = large; i >= small; i--) {
        for (int j = i; j >= small; j--) {
            int product = i * j;
            if (product < result.small_palind && found_small) break;
            if (is_palindrome(product)) {
                if (!found_small || product < result.small_palind) {
                    result.small_palind = product;
                    found_small = 1;
                }
                if (product > result.larg_palind) {
                    result.larg_palind = product;
                }
            }
        }
    }
    return result;
}