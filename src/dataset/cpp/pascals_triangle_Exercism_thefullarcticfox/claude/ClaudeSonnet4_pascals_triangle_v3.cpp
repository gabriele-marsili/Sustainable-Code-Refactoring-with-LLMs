#include "pascals_triangle.h"

namespace pascals_triangle {
	std::vector<std::vector<int>>	generate_rows(size_t n) {
		if (n == 0) return {};
		
		std::vector<std::vector<int>>	res;
		res.reserve(n);
		
		res.emplace_back(1, 1);
		
		for (size_t i = 1; i < n; i++) {
			res.emplace_back();
			std::vector<int>& row = res[i];
			std::vector<int>& prev = res[i - 1];
			
			row.reserve(i + 1);
			row.push_back(1);
			
			for (size_t j = 1; j < i; j++) {
				row.push_back(prev[j - 1] + prev[j]);
			}
			
			row.push_back(1);
		}
		
		return res;
	}
}