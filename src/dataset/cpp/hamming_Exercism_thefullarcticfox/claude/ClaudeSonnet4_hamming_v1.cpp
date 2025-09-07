#include "hamming.h"
#include <stdexcept>

namespace hamming {
	int	compute(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			throw std::domain_error("Unequal");

		int dist = 0;
		const size_t size = s1.size();
		const char* p1 = s1.data();
		const char* p2 = s2.data();
		
		for (size_t i = 0; i < size; ++i) {
			if (p1[i] != p2[i])
				++dist;
		}
		return dist;
	}
}  // namespace hamming