#include "binary_search.h"
#include <stdexcept>

namespace binary_search {
	size_t	find(std::vector<int> data, int value) {
		if (data.empty())
			throw std::domain_error("empty vector");

		size_t	left = 0, right = data.size() - 1;
		while (left <= right) {
			size_t	middle = left + (right - left) / 2;

			if (data.at(middle) == value)
				return middle;

			if (middle == 0)
				break;
			if (data.at(middle) < value)
				left = middle + 1;
			else
				right = middle - 1;
		}
		throw std::domain_error("not found");
	}
}  // namespace binary_search
