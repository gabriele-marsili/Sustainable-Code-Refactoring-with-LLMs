#include "binary_search.h"
#include <stdexcept>
#include <algorithm>

namespace binary_search {
	size_t	find(std::vector<int> data, int value) {
		if (data.empty())
			throw std::domain_error("empty vector");

		size_t	left = 0, right = data.size(); // Correct right boundary
		while (left < right) { // Use < instead of <=
			size_t	middle = left + (right - left) / 2;

			if (data[middle] == value) // Use [] instead of at()
				return middle;

			if (data[middle] < value)
				left = middle + 1;
			else
				right = middle; // Correct right boundary update
		}
		throw std::domain_error("not found");
	}
}  // namespace binary_search