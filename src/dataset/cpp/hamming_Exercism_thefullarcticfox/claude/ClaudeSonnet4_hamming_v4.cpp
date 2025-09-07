#include "hamming.h"
#include <stdexcept>

namespace hamming {
	int	compute(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			throw std::domain_error("Unequal");

		int dist = 0;
		const char* p1 = s1.data();
		const char* p2 = s2.data();
		const char* end = p1 + s1.size();
		
		for (; p1 != end; ++p1, ++p2)
			if (*p1 != *p2)
				++dist;
		return dist;
	}
}  // namespace hamming