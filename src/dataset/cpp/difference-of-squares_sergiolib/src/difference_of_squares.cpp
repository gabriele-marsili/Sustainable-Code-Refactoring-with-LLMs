#include "difference_of_squares.h"
#include <math.h>

namespace difference_of_squares {
  int square_of_sum(int n) {
    return std::pow(n * (n + 1) / 2, 2);
  }

  int sum_of_squares(int n) {
    return n * (n + 1) * (2 * n + 1) / 6;
  }

  int difference(int n) {
    return square_of_sum(n) - sum_of_squares(n);
  }
}  // namespace difference_of_squares
