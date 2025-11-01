#include "armstrong_numbers.h"
#include <math.h>
#include <stdbool.h>

bool is_armstrong_number(int candidate) {
  if (candidate < 0) {
    return false;
  }

  int num_digits = 0;
  int temp = candidate;
  while (temp != 0) {
    temp /= 10;
    num_digits++;
  }

  int sum = 0;
  temp = candidate;
  while (temp != 0) {
    int digit = temp % 10;
    sum += round(pow(digit, num_digits));
    temp /= 10;
  }

  return sum == candidate;
}