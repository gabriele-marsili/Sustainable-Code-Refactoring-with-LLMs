#include "hamming.h"
#include <stdexcept>

namespace hamming {
	int compute(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			throw std::domain_error("Unequal");

		int dist = 0;
		for (size_t i = 0, n = s1.size(); i < n; ++i) {
			dist += (s1[i] != s2[i]);
		}
		return dist;
	}
}  // namespace hamming