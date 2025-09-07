#include "difference_of_squares.h"

int square_of_sum(const int n) {
  long long sum = (long long)n * (n + 1) / 2;
  return (int)(sum * sum);
}

int sum_of_squares(const int n) {
  return n * (n + 1) * (2 * n + 1) / 6;
}

int difference_of_squares(const int n) {
  long long square_of_sums = (long long)n * (n + 1) / 2;
  square_of_sums *= square_of_sums;
  return (int)(square_of_sums - sum_of_squares(n));
}