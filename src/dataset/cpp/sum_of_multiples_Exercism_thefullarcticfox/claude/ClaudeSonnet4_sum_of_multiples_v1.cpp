#include "sum_of_multiples.h"
#include <vector>
#include <algorithm>

namespace sum_of_multiples {
	int to(const std::vector<int>& nums, int below) {
		if (below <= 1) return 0;
		
		std::vector<bool> seen(below, false);
		int sum = 0;
		
		for (int num : nums) {
			if (num <= 0 || num >= below) continue;
			
			for (int multiple = num; multiple < below; multiple += num) {
				if (!seen[multiple]) {
					seen[multiple] = true;
					sum += multiple;
				}
			}
		}
		
		return sum;
	}
}  // namespace sum_of_multiples