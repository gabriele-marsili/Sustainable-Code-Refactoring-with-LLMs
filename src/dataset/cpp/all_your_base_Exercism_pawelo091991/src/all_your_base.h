#if !defined(ALL_YOUR_BASE_H)
#define ALL_YOUR_BASE_H
#include <vector>
#include <cmath>
#include <algorithm>
#include <stdexcept>

namespace all_your_base {
	std::vector<unsigned int> convert(unsigned int curBas,
		std::vector<unsigned int> dgt, unsigned int tarBas);
}  // namespace all_your_base

#endif // ALL_YOUR_BASE_H