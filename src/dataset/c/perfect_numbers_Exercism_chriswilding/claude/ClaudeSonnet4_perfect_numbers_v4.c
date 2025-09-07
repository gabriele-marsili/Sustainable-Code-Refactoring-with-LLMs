#include "perfect_numbers.h"
#include <math.h>

kind classify_number(int number) {
  if (number < 1) return ERROR;
  if (number == 1) return DEFICIENT_NUMBER;

  int sum = 1;
  int sqrt_num = (int)sqrt(number);

  for (int i = 2; i <= sqrt_num; i++) {
    if (number % i == 0) {
      sum += i;
      if (i != number / i) {
        sum += number / i;
      }
      if (sum > number) return ABUNDANT_NUMBER;
    }
  }

  if (sum == number) return PERFECT_NUMBER;
  if (sum > number) return ABUNDANT_NUMBER;
  return DEFICIENT_NUMBER;
}