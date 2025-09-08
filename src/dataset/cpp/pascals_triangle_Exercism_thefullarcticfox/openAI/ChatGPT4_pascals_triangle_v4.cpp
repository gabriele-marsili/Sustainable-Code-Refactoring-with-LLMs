#include "pascals_triangle.h"

namespace pascals_triangle {
	std::vector<std::vector<int>> generate_rows(size_t n) {
		std::vector<std::vector<int>> res;
		res.reserve(n); // Preallocate outer vector

		for (size_t i = 0; i < n; i++) {
			std::vector<int> row(i + 1, 1); // Initialize row with 1s
			for (size_t j = 1; j < i; j++) {
				row[j] = res[i - 1][j - 1] + res[i - 1][j];
			}
			res.push_back(std::move(row)); // Move row to avoid copying
		}
		return res;
	}
}  // namespace pascals_triangle