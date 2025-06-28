#include "difference_of_squares.h"

#include <cmath>

namespace difference_of_squares {

int square_of_sum(int n) { return std::pow((std::pow(n, 2) + n) / 2, 2); }

int sum_of_squares(int n) {
  return (2 * std::pow(n, 3) + 3 * std::pow(n, 2) + n) / 6;
}

int difference(int n) { return square_of_sum(n) - sum_of_squares(n); }

} // namespace difference_of_squares
