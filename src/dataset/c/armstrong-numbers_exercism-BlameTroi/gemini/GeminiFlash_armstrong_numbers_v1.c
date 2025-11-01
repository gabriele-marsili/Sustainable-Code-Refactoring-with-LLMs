#include "armstrong_numbers.h"
#include <stdbool.h>
#include <stdio.h>

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

  if (num_digits == 0) {
    return true; // Handle the case where candidate is 0
  }

  int sum = 0;
  temp = candidate;
  while (temp != 0) {
    int digit = temp % 10;
    temp /= 10;

    int power = 1;
    for (int i = 0; i < num_digits; i++) {
      if (power > INT_MAX / digit) {
        return false;
      }
      power *= digit;
    }

    if (sum > INT_MAX - power) {
      return false;
    }
    sum += power;
  }

  return sum == candidate;
}