#include "armstrong_numbers.h"
#include <stdbool.h>
#include <stdio.h>

bool is_armstrong_number(int number) {
  if (number < 0) {
    return false;
  }

  int num_digits = 0;
  int temp = number;
  while (temp != 0) {
    temp /= 10;
    num_digits++;
  }

  if (num_digits == 0) {
    return true;
  }

  long sum = 0;
  temp = number;
  while (temp != 0) {
    int digit = temp % 10;
    long power = 1;
    for (int i = 0; i < num_digits; i++) {
      power *= digit;
    }

    if (power > __INT_MAX__ - sum){
        return false;
    }
    sum += power;
    temp /= 10;
  }

  return (sum == number);
}