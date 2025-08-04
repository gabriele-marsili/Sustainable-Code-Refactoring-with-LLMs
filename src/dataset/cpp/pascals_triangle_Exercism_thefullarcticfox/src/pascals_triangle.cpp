#include "pascals_triangle.h"

namespace pascals_triangle {
	std::vector<std::vector<int>>	generate_rows(size_t n) {
		std::vector<std::vector<int>>	res;
		res.resize(n);				//	prealloc and init rows

		for (size_t	i = 0; i < n; i++) {
			std::vector<int>	&row = res.at(i);
			row.reserve(i + 1);		//	preserve row for ints needed

			for (size_t	j = 0; j <= i; j++) {
				if (j == 0 || j == i)
					row.push_back(1);
				else {
					std::vector<int>&	prev = res.at(i - 1);
					row.push_back(prev.at(j - 1) + prev.at(j));
				}
			}
		}
		return (res);
	}
}  // namespace pascals_triangle
