#include "armstrong_numbers.h"
#include <math.h>
#include <stdbool.h>

bool is_armstrong_number(int x) {
  if (x < 0) {
    return false;
  }

  int num_digits = 0;
  int temp = x;
  while (temp != 0) {
    temp /= 10;
    num_digits++;
  }

  if (num_digits == 0) {
    return true;
  }

  int original_x = x;
  long long sum = 0;
  while (x != 0) {
    int digit = x % 10;
    x /= 10;

    long long power = 1;
    for (int i = 0; i < num_digits; ++i) {
      power *= digit;
    }

    if (power > (long long)(__INT_MAX__ - sum)) {
      return false;
    }

    sum += power;
    if (sum > original_x)
        return false;
  }

  return (sum == original_x);
}