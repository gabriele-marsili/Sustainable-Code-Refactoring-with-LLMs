#include "palindrome_products.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_DIGITS (128)

bool is_palindrome(int num) {
    char str[MAX_DIGITS];
    sprintf(str, "%d", num);
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

Pair getPalindromeProduct(int small, int large) {
    Pair *p = NULL;
    int product;
    int smallest = -1;
    int largest = -1;

    for (int i = small; i <= large; i++) {
        for (int j = i; j <= large; j++) {
            product = i * j;
            if (is_palindrome(product)) {
                if (smallest == -1) {
                    smallest = product;
                    largest = product;
                } else {
                    if (product < smallest) {
                        smallest = product;
                    } else if (product > largest) {
                        largest = product;
                    }
                }
            }
        }
    }

    if (smallest != -1) {
        p = malloc(sizeof(Pair));
        if (p == NULL) {
            exit(EXIT_FAILURE);
        }
        p->small_palind = smallest;
        p->larg_palind = largest;
        return *p;
    } else {
        Pair empty_pair = {-1, -1};
        return empty_pair;
    }
}