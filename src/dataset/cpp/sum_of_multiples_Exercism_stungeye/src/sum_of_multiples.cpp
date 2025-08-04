#include "sum_of_multiples.h"

#include <algorithm>

namespace sum_of_multiples {

	int to(const std::vector<int>& factors, const int exclusive_upper_bound) {
		if (factors.empty()) {
			return 0;
		}

		auto sum = 0;

		for (auto i = 1; i < exclusive_upper_bound; ++i) {
			if (std::any_of(factors.begin(), factors.end(), [i](const auto factor) {
				return i % factor == 0;
			})) {
				sum += i;
			}
		}

		return sum;
	}
} // namespace sum_of_multiples
