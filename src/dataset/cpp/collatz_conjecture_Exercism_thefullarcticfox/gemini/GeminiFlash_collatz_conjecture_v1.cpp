#include "collatz_conjecture.h"

namespace collatz_conjecture {
	int steps(int n) {
		if (n <= 0)
			throw std::domain_error("Input must be a positive integer.");

		int res = 0;
		long long num = n; // Use long long to prevent potential overflow

		while (num != 1) {
			if ((num & 1) == 0) { // Use bitwise AND for even number check
				num >>= 1;       // Use right bit shift for division by 2
			} else {
				if (num > (LLONG_MAX - 1) / 3) {
					throw std::overflow_error("Potential overflow detected.");
				}
				num = num * 3 + 1;
				if (num < 0) {
					throw std::overflow_error("Overflow occurred.");
				}
			}
			++res;
		}
		return res;
	}
} // namespace collatz_conjecture