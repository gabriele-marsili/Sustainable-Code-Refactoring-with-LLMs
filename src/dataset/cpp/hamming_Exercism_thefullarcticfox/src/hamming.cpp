#include "hamming.h"
#include <stdexcept>

namespace hamming {
	int	compute(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			throw std::domain_error("Unequal");

		int		dist = 0;
		size_t	i = 0;
		for (; i < s1.size(); i++)
			if (s1.at(i) != s2.at(i))
				++dist;
		return (dist);
	}
}  // namespace hamming
