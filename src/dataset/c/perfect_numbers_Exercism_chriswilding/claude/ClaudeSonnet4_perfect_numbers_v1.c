#include "perfect_numbers.h"

kind classify_number(int number) {
  if (number < 1) return ERROR;
  if (number == 1) return DEFICIENT_NUMBER;

  int sum = 1; // 1 is always a divisor
  int limit = number;

  for (int i = 2; i * i <= number; i++) {
    if (number % i == 0) {
      sum += i;
      if (i * i != number) {
        sum += number / i;
      }
      // Early termination for abundant numbers
      if (sum > number) return ABUNDANT_NUMBER;
    }
  }

  if (sum == number) return PERFECT_NUMBER;
  if (sum > number) return ABUNDANT_NUMBER;
  return DEFICIENT_NUMBER;
}