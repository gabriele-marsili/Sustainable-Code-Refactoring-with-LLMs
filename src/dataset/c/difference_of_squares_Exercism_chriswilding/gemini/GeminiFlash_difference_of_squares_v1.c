#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) {
  unsigned int n = number;
  return n * (n + 1) * (2 * n + 1) / 6;
}

unsigned int square_of_sum(unsigned int number) {
  unsigned int sum = number;
  if (number % 2 == 0) {
    sum = (number / 2) * (number + 1);
  } else {
    sum = ((number + 1) / 2) * number;
  }
  return sum * sum;
}

unsigned int difference_of_squares(unsigned int number) {
  unsigned int sum_of_sq = (number * (number + 1) * (2 * number + 1)) / 6;
  unsigned int sum = number;
  if (number % 2 == 0) {
    sum = (number / 2) * (number + 1);
  } else {
    sum = ((number + 1) / 2) * number;
  }
  unsigned int square_of_sum_val = sum * sum;
  return square_of_sum_val - sum_of_sq;
}