#include "perfect_numbers.h"
#include <math.h>

kind classify_number(int number) {
  if (number < 1) return ERROR;

  int sum = 1;
  if (number > 1) {
    int limit = (int)sqrt(number);
    for (int i = 2; i <= limit; i++) {
      if (number % i == 0) {
        sum += i;
        int divisor = number / i;
        if (divisor != i) {
          sum += divisor;
        }
      }
    }
  }

  if (sum == number) return PERFECT_NUMBER;
  if (sum > number) return ABUNDANT_NUMBER;
  return DEFICIENT_NUMBER;
}