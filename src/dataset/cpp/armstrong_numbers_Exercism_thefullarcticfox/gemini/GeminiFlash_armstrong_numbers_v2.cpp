#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
bool is_armstrong_number(const long n) {
  if (n < 0) {
    return false;
  }

  long num_digits = 0;
  long temp = n;
  while (temp != 0) {
    temp /= 10;
    num_digits++;
  }

  long sum = 0;
  temp = n;
  while (temp != 0) {
    int digit = temp % 10;
    sum += std::pow(digit, num_digits);
    temp /= 10;
  }

  return (n == sum);
}
} // namespace armstrong_numbers