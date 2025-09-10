#include "palindrome_products.h"
#include <stdio.h>
#include <stdlib.h>

int is_palindrome(int num) {
    int reversed = 0, original = num, digit;
    while (num > 0) {
        digit = num % 10;
        reversed = reversed * 10 + digit;
        num /= 10;
    }
    return original == reversed;
}

Pair getPalindromeProduct(int small, int large) {
    Pair result = { .small_palind = 0, .larg_palind = 0 };
    int product;

    for (int i = small; i <= large; i++) {
        for (int j = i; j <= large; j++) {
            product = i * j;
            if (is_palindrome(product)) {
                if (result.small_palind == 0 || product < result.small_palind)
                    result.small_palind = product;
                if (product > result.larg_palind)
                    result.larg_palind = product;
            }
        }
    }
    return result;
}