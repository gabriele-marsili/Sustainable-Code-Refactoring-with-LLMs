#include "hamming.h"
#include <stdexcept>
#include <string>
#include <algorithm>

namespace hamming {
	int compute(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size()) {
			throw std::domain_error("Unequal");
		}

		int dist = 0;
		size_t size = s1.size();

		for (size_t i = 0; i < size; ++i) {
			dist += (s1[i] != s2[i]);
		}

		return dist;
	}
}  // namespace hamming