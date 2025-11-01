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
  int sum = 0;
  while (x != 0) {
    int digit = x % 10;
    sum += round(pow(digit, num_digits));
    x /= 10;
  }

  return sum == original_x;
}