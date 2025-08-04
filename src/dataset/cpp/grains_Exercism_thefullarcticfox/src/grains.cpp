#include "grains.h"
#include <bitset>
#include <stdexcept>

namespace grains {
	unsigned long long	square(unsigned int n_of_square) {
		if (n_of_square < 1 || n_of_square > 64)
			throw std::out_of_range("number of square should be in range from 1 to 64");
		return 1ULL << (n_of_square - 1);
	}

	unsigned long long	total() {
		std::bitset<64>	bits;
		return bits.set().to_ullong();
	}
}  // namespace grains
