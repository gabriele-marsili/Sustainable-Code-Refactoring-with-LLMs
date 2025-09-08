#include "pascals_triangle.h"

namespace pascals_triangle {
	std::vector<std::vector<int>>	generate_rows(size_t n) {
		if (n == 0) return {};
		
		std::vector<std::vector<int>>	res;
		res.reserve(n);

		for (size_t	i = 0; i < n; i++) {
			std::vector<int> row;
			row.reserve(i + 1);
			
			row.push_back(1);
			for (size_t j = 1; j < i; j++) {
				row.push_back(res[i - 1][j - 1] + res[i - 1][j]);
			}
			if (i > 0) row.push_back(1);
			
			res.push_back(std::move(row));
		}
		return res;
	}
}  // namespace pascals_triangle