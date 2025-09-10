#include "palindrome_products.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static bool is_palindrome(int num) {
  char str[20]; // Enough to hold max int
  snprintf(str, sizeof(str), "%d", num);
  size_t len = strlen(str);
  for (size_t i = 0; i < len / 2; i++) {
    if (str[i] != str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

Pair getPalindromeProduct(int small, int large) {
  Pair result = {0, 0};
  bool first_palindrome_found = false;

  for (int i = small; i <= large; i++) {
    for (int j = i; j <= large; j++) {
      int product = i * j;
      if (is_palindrome(product)) {
        if (!first_palindrome_found) {
          result.small_palind = product;
          result.larg_palind = product;
          first_palindrome_found = true;
        } else {
          if (product < result.small_palind) {
            result.small_palind = product;
          } else if (product > result.larg_palind) {
            result.larg_palind = product;
          }
        }
      }
    }
  }

  if (!first_palindrome_found) {
    result.small_palind = 0;
    result.larg_palind = 0;
  }

  return result;
}