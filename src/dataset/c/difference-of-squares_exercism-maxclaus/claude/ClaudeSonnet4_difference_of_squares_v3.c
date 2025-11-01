#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) {
  return (number * (number + 1) * ((number << 1) + 1)) / 6;
}

unsigned int square_of_sum(unsigned int number) {
  unsigned int sum = (number * (number + 1)) >> 1;
  return sum * sum;
}

unsigned int difference_of_squares(unsigned int number) {
  unsigned int sum = (number * (number + 1)) >> 1;
  return sum * sum - (number * (number + 1) * ((number << 1) + 1)) / 6;
}

unsigned int sum_of_squares_v1(unsigned int number) {
  unsigned int sum = 0;
  for (unsigned int i = 1; i <= number; i++)
    sum += (i * i);
  return sum;
}

unsigned int square_of_sum_v1(unsigned int number) {
  unsigned int sum = 0;
  for (unsigned int i = 1; i <= number; i++)
    sum += i;
  return sum * sum;
}

unsigned int difference_of_squares_v1(unsigned int number) {
  unsigned int result_sum_of_squares = 0;
  unsigned int result_square_of_sum = 0;
  for (unsigned int i = 1; i <= number; i++) {
    result_sum_of_squares += (i * i);
    result_square_of_sum += i;
  }
  return (result_square_of_sum * result_square_of_sum) - result_sum_of_squares;
}

unsigned int sum_of_squares_v2(unsigned int number) {
  return (number * (number + 1) * ((number << 1) + 1)) / 6;
}

unsigned int square_of_sum_v2(unsigned int number) {
  unsigned int sum = (number * (number + 1)) >> 1;
  return sum * sum;
}

unsigned int difference_of_squares_v2(unsigned int number) {
  unsigned int sum = (number * (number + 1)) >> 1;
  return sum * sum - (number * (number + 1) * ((number << 1) + 1)) / 6;
}