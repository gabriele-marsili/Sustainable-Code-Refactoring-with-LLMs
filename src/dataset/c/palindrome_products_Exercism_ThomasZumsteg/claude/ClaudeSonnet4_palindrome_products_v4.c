#include "palindrome_products.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX_DIGITS (128)

static int is_palindrome_numeric(int num) {
    int original = num;
    int reversed = 0;
    
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num /= 10;
    }
    
    return original == reversed;
}

int is_palindrome(char *str) {
    int len = strlen(str);
    for(int i = 0; i < len / 2; i++) {
        if(str[i] != str[len - 1 - i]) return 0;
    }
    return 1;
}

Pair getPalindromeProduct(int small, int large) {
    Pair result = {0, 0};
    int product;
    int found_any = 0;

    for(int i = small; i <= large; i++) {
        for(int j = i; j <= large; j++) {
            product = i * j;
            if(is_palindrome_numeric(product)) {
                if(!found_any) {
                    result.small_palind = product;
                    result.larg_palind = product;
                    found_any = 1;
                } else {
                    if(product < result.small_palind)
                        result.small_palind = product;
                    if(product > result.larg_palind)
                        result.larg_palind = product;
                }
            }
        }
    }
    
    return result;
}