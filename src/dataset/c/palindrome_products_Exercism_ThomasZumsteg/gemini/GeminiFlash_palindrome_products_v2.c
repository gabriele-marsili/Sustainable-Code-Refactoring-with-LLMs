#include "palindrome_products.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Define a maximum number of digits based on the maximum possible product.
// For example, if large is 999, then large * large is 998001, which has 6 digits.
// Using a fixed size avoids dynamic allocation and reduces overhead.
#define MAX_DIGITS 7 // Adjusted based on problem constraints

typedef struct {
  int small_palind;
  int larg_palind;
  bool found; // Flag to indicate if any palindrome was found
} PalindromeResult;

// Optimized palindrome check using integer arithmetic
bool is_palindrome(int num) {
  if (num < 0)
    return false; // Negative numbers are not palindromes

  int reversed_num = 0;
  int original_num = num;

  while (num > 0) {
    int remainder = num % 10;
    reversed_num = reversed_num * 10 + remainder;
    num /= 10;
  }

  return original_num == reversed_num;
}

Pair getPalindromeProduct(int small, int large) {
  PalindromeResult result = {0}; // Initialize all members to 0
  result.found = false;

  int product;

  for (int i = small; i <= large; i++) {
    for (int j = i; j <= large; j++) {
      product = i * j;

      if (is_palindrome(product)) {
        if (!result.found) {
          result.small_palind = product;
          result.larg_palind = product;
          result.found = true;
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

  Pair p;
  if (result.found) {
    p.small_palind = result.small_palind;
    p.larg_palind = result.larg_palind;
  } else {
    // Handle the case where no palindrome is found.  Return 0,0.
    p.small_palind = 0;
    p.larg_palind = 0;
  }

  return p;
}