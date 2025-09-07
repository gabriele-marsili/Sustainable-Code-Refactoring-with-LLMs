#include "collatz_conjecture.h"

namespace collatz_conjecture {
	int steps(int n) {
		if (n <= 0) {
			throw std::domain_error("Input must be a positive integer.");
		}

		int res = 0;
		unsigned int num = static_cast<unsigned int>(n); // Use unsigned int to avoid potential overflow

		while (num != 1) {
			if ((num & 1) == 0) { // Use bitwise AND for even number check
				num >>= 1;       // Use right bit shift for division by 2
			} else {
				if (num > (UINT_MAX - 1) / 3) {
					throw std::overflow_error("Potential overflow detected");
				}
				num = num * 3 + 1;
			}
			++res;
		}
		return res;
	}
} // namespace collatz_conjecture