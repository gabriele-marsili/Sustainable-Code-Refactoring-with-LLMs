#include "sum_of_multiples.h"
#include <numeric>
#include <vector>
#include <algorithm>

namespace sum_of_multiples {
	int to(const std::vector<int>& nums, int below) {
		std::vector<int> multiples;
		for (int num : nums) {
			if (num <= 0) continue;
			int limit = below / num;
			for (int i = 1; i <= limit; ++i) {
				int multiple = num * i;
				if (std::find(multiples.begin(), multiples.end(), multiple) == multiples.end()) {
					multiples.push_back(multiple);
				}
			}
		}
		return std::accumulate(multiples.begin(), multiples.end(), 0);
	}
}  // namespace sum_of_multiples