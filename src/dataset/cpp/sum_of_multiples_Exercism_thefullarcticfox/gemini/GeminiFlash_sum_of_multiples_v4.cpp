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
			for (int i = num; i < below; i += num) {
				if (std::find(multiples.begin(), multiples.end(), i) == multiples.end()) {
					multiples.push_back(i);
				}
			}
		}

		return std::accumulate(multiples.begin(), multiples.end(), 0);
	}
}  // namespace sum_of_multiples