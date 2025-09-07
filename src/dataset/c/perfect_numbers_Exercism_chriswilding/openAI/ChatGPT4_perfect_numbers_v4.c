#include "perfect_numbers.h"

kind classify_number(int number) {
  if (number < 1) return ERROR;

  int sum = 1;
  int sqrt_num = (int)sqrt(number);

  for (int i = 2; i <= sqrt_num; i++) {
    if (number % i == 0) {
      sum += i;
      int pair = number / i;
      if (pair != i) sum += pair;
    }
  }

  if (sum == number && number != 1) return PERFECT_NUMBER;
  if (sum > number) return ABUNDANT_NUMBER;
  return DEFICIENT_NUMBER;
}