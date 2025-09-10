#include "sum_of_multiples.h"
#include <numeric>

int sum_of_multiples::to(vector<int> nums, int max) {
  std::vector<bool> multiples(max, false);
  for (int n : nums) {
    if (n == 0) continue;
    for (int i = n; i < max; i += n) {
      multiples[i] = true;
    }
  }

  int sum = 0;
  for (int i = 0; i < max; ++i) {
    if (multiples[i]) {
      sum += i;
    }
  }
  return sum;
}