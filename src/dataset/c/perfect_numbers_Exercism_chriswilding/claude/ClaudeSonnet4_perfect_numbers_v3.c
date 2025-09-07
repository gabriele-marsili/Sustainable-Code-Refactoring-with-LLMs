#include "perfect_numbers.h"

kind classify_number(int number) {
  if (number < 1) return ERROR;
  if (number == 1) return DEFICIENT_NUMBER;

  int sum = 1;
  int sqrt_num = 1;
  
  while (sqrt_num * sqrt_num < number) {
    sqrt_num++;
  }

  for (int i = 2; i <= sqrt_num; i++) {
    if (number % i == 0) {
      sum += i;
      int complement = number / i;
      if (complement != i && complement != number) {
        sum += complement;
      }
    }
    if (sum > number) return ABUNDANT_NUMBER;
  }

  if (sum == number) return PERFECT_NUMBER;
  return DEFICIENT_NUMBER;
}