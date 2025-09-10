#include "sum_of_multiples.h"
#include <numeric>
#include <vector>
#include <algorithm>

namespace sum_of_multiples {
int to(const std::vector<int>& nums, int below) {
  std::vector<int> multiples;
  multiples.reserve(below);

  for (int num : nums) {
    if (num <= 0) continue;
    int multiple = num;
    while (multiple < below) {
      if (std::find(multiples.begin(), multiples.end(), multiple) == multiples.end()) {
        multiples.push_back(multiple);
      }
      if (multiple > below / num) break; //Prevent overflow
      multiple += num;
    }
  }

  return std::accumulate(multiples.begin(), multiples.end(), 0);
}
} // namespace sum_of_multiples