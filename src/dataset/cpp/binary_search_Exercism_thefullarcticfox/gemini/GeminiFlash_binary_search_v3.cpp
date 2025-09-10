#include "binary_search.h"
#include <stdexcept>
#include <algorithm>

namespace binary_search {
	size_t	find(std::vector<int> data, int value) {
		if (data.empty())
			throw std::domain_error("empty vector");

		size_t	left = 0, right = data.size(); // Use exclusive right bound

		while (left < right) { // Continue while range is valid
			size_t	middle = left + (right - left) / 2;

			if (data[middle] == value) // Use direct access instead of at()
				return middle;

			if (data[middle] < value)
				left = middle + 1;
			else
				right = middle; // Adjust right bound
		}
		throw std::domain_error("not found");
	}
}  // namespace binary_search