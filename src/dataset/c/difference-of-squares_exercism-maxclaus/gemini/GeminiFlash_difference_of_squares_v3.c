#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) {
  return sum_of_squares_v2(number);
}

unsigned int square_of_sum(unsigned int number) {
  return square_of_sum_v2(number);
}

unsigned int difference_of_squares(unsigned int number) {
  return difference_of_squares_v2(number);
}

unsigned int sum_of_squares_v2(unsigned int number) {
  return (number * (number + 1) * ((number * 2) + 1)) / 6;
}

unsigned int square_of_sum_v2(unsigned int number) {
  unsigned int sum = (number * (number + 1)) / 2;
  return sum * sum;
}

unsigned int difference_of_squares_v2(unsigned int number) {
  unsigned int sum_of_squares_val = (number * (number + 1) * ((number * 2) + 1)) / 6;
  unsigned int sum = (number * (number + 1)) / 2;
  unsigned int square_of_sum_val = sum * sum;
  return square_of_sum_val - sum_of_squares_val;
}