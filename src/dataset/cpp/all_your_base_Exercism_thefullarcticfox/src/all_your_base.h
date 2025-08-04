#if !defined(ALL_YOUR_BASE_H)
#define ALL_YOUR_BASE_H
#include <vector>

namespace all_your_base {
	std::vector<unsigned int>	convert(unsigned int inbase,
		const std::vector<unsigned int>& indigits, unsigned int outbase);
}  // namespace all_your_base

#endif // ALL_YOUR_BASE_H
