#include "pascals_triangle.h"
#include <vector>

namespace pascals_triangle {
	std::vector<std::vector<int>> generate_rows(size_t n) {
		std::vector<std::vector<int>> res;
		if (n == 0) return res;

		res.reserve(n);

		std::vector<int> prev_row;

		for (size_t i = 0; i < n; ++i) {
			std::vector<int> current_row(i + 1);
			current_row[0] = 1;
			current_row[i] = 1;

			for (size_t j = 1; j < i; ++j) {
				current_row[j] = prev_row[j - 1] + prev_row[j];
			}

			res.push_back(current_row);
			prev_row = std::move(current_row);
		}

		return res;
	}
}  // namespace pascals_triangle