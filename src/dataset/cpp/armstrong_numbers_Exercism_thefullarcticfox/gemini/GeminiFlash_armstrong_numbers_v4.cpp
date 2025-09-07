#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
bool is_armstrong_number(const long n) {
  if (n < 0) return false;

  long num = n;
  int num_digits = 0;
  while (num != 0) {
    num /= 10;
    num_digits++;
  }

  long sum = 0;
  num = n;
  while (num != 0) {
    int digit = num % 10;
    sum += std::pow(digit, num_digits);
    num /= 10;
  }

  return (n == sum);
}
} // namespace armstrong_numbers