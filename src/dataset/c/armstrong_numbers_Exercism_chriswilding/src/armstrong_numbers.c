#include "armstrong_numbers.h"

#include <math.h>

int is_armstrong_number(int candidate)
{
  int n_of_digits = log10(candidate) + 1;

  int total = 0;

  for (int i = 0; i < n_of_digits; i++)
  {
    int nth_digit = candidate % (int)pow(10, i + 1) / pow(10, i);
    total += pow(nth_digit, n_of_digits);
  }

  return candidate == total;
}
