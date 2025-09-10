#include "palindrome_products.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Pre-calculate powers of 10 to avoid repeated calculations in is_palindrome
static int powers_of_10[10] = {
    1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000};

// Optimized is_palindrome function using integer arithmetic
bool is_palindrome(int num) {
  if (num < 0) return false;
  int divisor = 1;
  while (num / divisor >= 10) {
    divisor *= 10;
  }

  while (num != 0) {
    int leading = num / divisor;
    int trailing = num % 10;
    if (leading != trailing) {
      return false;
    }
    num = (num % divisor) / 10;
    divisor /= 100;
  }
  return true;
}

Pair getPalindromeProduct(int small, int large) {
  Pair result = {0, 0}; // Initialize to 0,0.  Return this if no palindromes found.
  bool found = false;

  for (int i = small; i <= large; i++) {
    for (int j = i; j <= large; j++) {
      int product = i * j;
      if (is_palindrome(product)) {
        if (!found) {
          result.small_palind = product;
          result.larg_palind = product;
          found = true;
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

  return result;
}