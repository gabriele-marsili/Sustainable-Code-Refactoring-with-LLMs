#include "armstrong_numbers.h"
#include <stdbool.h>
#include <stdint.h>

bool is_armstrong_number(int candidate) {
  if (candidate < 0) return false;
  if (candidate < 10) return true;

  int num = candidate;
  int digits = 0;
  int temp = candidate;

  // Calculate the number of digits without using floating-point operations
  while (temp > 0) {
    temp /= 10;
    digits++;
  }

  int result = 0;
  num = candidate;

  while (num > 0) {
    int r = num % 10;
    int power = 1;

    // Calculate r^digits efficiently using a loop
    for (int i = 0; i < digits; i++) {
      if (power > (INT_MAX / r)) return false; // Check for potential overflow
      power *= r;
    }

    if (result > (INT_MAX - power)) return false; // Check for potential overflow
    result += power;
    num /= 10;
  }

  return result == candidate;
}