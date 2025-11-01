#include "armstrong_numbers.h"
#include <stdint.h>
#include <stdbool.h>

bool is_armstrong_number(int candidate) {
  if (candidate < 0) return false;
  if (candidate < 10) return true;

  int num = candidate;
  int digits = 0;
  int temp = candidate;

  while (temp > 0) {
    digits++;
    temp /= 10;
  }

  int result = 0;
  num = candidate;

  while (num > 0) {
    int r = num % 10;
    int power = 1;
    for (int i = 0; i < digits; i++) {
      power *= r;
    }
    if (result > INT_MAX - power) return false;
    result += power;
    num /= 10;
  }

  return result == candidate;
}