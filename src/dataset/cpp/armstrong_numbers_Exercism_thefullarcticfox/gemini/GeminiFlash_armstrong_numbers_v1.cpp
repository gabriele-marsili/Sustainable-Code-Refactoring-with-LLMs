#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
bool is_armstrong_number(const long n) {
  if (n < 0) {
    return false;
  }

  long num = n;
  int num_digits = 0;

  // Calculate the number of digits
  while (num != 0) {
    num /= 10;
    num_digits++;
  }

  num = n;
  long sum = 0;

  // Calculate the sum of digits raised to the power of num_digits
  while (num != 0) {
    int digit = num % 10;
    sum += std::pow(digit, num_digits);
    num /= 10;
  }

  return (n == sum);
}
} // namespace armstrong_numbers