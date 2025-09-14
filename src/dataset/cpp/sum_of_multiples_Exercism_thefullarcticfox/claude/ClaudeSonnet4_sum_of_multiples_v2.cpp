#include "sum_of_multiples.h"
#include <vector>
#include <algorithm>

namespace sum_of_multiples {
	int to(const std::vector<int>& nums, int below) {
		if (below <= 1) return 0;
		
		std::vector<bool> is_multiple(below, false);
		
		for (int num : nums) {
			if (num > 0 && num < below) {
				for (int multiple = num; multiple < below; multiple += num) {
					is_multiple[multiple] = true;
				}
			}
		}
		
		int sum = 0;
		for (int i = 1; i < below; ++i) {
			if (is_multiple[i]) {
				sum += i;
			}
		}
		
		return sum;
	}
}  // namespace sum_of_multiples