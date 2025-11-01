#include "armstrong_numbers.h"
#include <cmath>

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

  int sum = 0;
  temp = number;
  while (temp != 0) {
    int digit = temp % 10;
    sum += std::pow(digit, num_digits);
    temp /= 10;
  }

  return sum == number;
}