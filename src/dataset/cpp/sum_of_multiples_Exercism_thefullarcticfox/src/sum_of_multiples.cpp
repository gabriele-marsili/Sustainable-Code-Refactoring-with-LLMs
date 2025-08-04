#include "sum_of_multiples.h"
#include <set>
using std::set;

namespace sum_of_multiples {
	int		to(const std::vector<int>& nums, int below) {
		std::set<int>	muliples;

		for (auto num : nums)
			for (int i = 1; num > 0 && num * i < below; i++)
				muliples.insert(num * i);

		int	res = 0;
		for (auto x : muliples)
			res += x;
		return (res);
	}
}  // namespace sum_of_multiples
