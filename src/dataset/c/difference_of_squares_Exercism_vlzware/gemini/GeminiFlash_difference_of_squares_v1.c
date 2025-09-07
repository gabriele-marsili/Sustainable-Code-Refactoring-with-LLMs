#include "difference_of_squares.h"

int square_of_sum(const int n) {
  long long sum = (long long)n * (n + 1) / 2;
  return (int)(sum * sum);
}

int sum_of_squares(const int n) {
  long long nn = (long long)n;
  return (int)(nn * (nn + 1) * (2 * nn + 1) / 6);
}

int difference_of_squares(const int n) {
  long long sum_of_sq = (long long)n * (n + 1) / 2;
  long long square_of_sum_val = sum_of_sq * sum_of_sq;
  long long sum_of_squares_val = (long long)n * (n + 1) * (2LL * n + 1) / 6;
  return (int)(square_of_sum_val - sum_of_squares_val);
}