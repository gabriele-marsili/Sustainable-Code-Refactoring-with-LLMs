#include "collatz_conjecture.h"
#include <stdexcept>

namespace collatz_conjecture {
	int steps(int n) {
		if (n <= 0) {
			throw std::domain_error("less or equals 0");
		}

		int res = 0;
		unsigned int num = static_cast<unsigned int>(n);

		while (num != 1) {
			if ((num & 1) == 0) {
				num >>= 1;
			} else {
				if (num > (UINT_MAX - 1) / 3) {
					throw std::overflow_error("Potential overflow");
				}
				num = num * 3 + 1;
			}
			++res;
		}

		return res;
	}
} // namespace collatz_conjecture