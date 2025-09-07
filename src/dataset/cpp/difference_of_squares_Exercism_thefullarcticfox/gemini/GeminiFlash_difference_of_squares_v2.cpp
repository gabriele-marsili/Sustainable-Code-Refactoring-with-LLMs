#include "difference_of_squares.h"

namespace difference_of_squares {

long square_of_sum(long n) {
  long sum = n * (n + 1) / 2;
  return sum * sum;
}

long sum_of_squares(long n) {
  return n * (n + 1) * (2 * n + 1) / 6;
}

long difference(long n) {
  long sum_of_sq = n * (n + 1) * (2 * n + 1) / 6;
  long sum = n * (n + 1) / 2;
  long square_of_sum_val = sum * sum;
  return square_of_sum_val - sum_of_sq;
}

}  // namespace difference_of_squares