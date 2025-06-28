#include "binary_search.h"
#include <stdexcept>

std::size_t binary_search::find(std::vector<int> data, std::size_t target) {

	if (data.size() == 0)
		throw std::domain_error("No data!");

	std::size_t right = data.size()-1;
	std::size_t left = 0;
	while (left <= right) {
		std::size_t middle = (left + right) / 2;
		if (data[middle] > target) {
			if ( middle == 0)						//used only for cases where there is no target in data, to prevent overflow (right = 0 - 1)
				throw std::domain_error("Not found!");
			right = middle - 1;
		}
		else if (data[middle] < target)
			left = middle + 1;
		else if (data[middle] == target)
			return middle;
	}
	throw std::domain_error("Not found!");
}