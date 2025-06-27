#include "perfect_numbers.h"

kind classify_number(int number) {
  if (number < 1) return ERROR;

  int limit = number / 2 + 1;
  int sum = 0;

  for (int i = 1; i < limit; i++) {
    if (number % i == 0) {
      sum += i;
    }
  }

  if (sum == number) return PERFECT_NUMBER;
  if (sum > number) return ABUNDANT_NUMBER;
  return DEFICIENT_NUMBER;
}
