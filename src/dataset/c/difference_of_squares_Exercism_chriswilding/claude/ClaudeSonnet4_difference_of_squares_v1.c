#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number)
{
  return (number * (number + 1) * (2 * number + 1)) / 6;
}

unsigned int square_of_sum(unsigned int number)
{
  unsigned int sum = number * (number + 1) / 2;
  return sum * sum;
}

unsigned int difference_of_squares(unsigned int number)
{
  // Direct formula: n²(n+1)²/4 - n(n+1)(2n+1)/6
  // Simplified: n(n+1)[3n(n+1) - 2(2n+1)]/12
  // Further simplified: n(n+1)(n-1)(3n+2)/12
  unsigned int n = number;
  return (n * (n + 1) * (n - 1) * (3 * n + 2)) / 12;
}