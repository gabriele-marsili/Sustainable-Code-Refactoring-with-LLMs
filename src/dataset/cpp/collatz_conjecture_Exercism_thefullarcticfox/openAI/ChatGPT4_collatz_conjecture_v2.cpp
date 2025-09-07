#include "collatz_conjecture.h"

namespace collatz_conjecture {
	int steps(int n) {
		if (n <= 0)
			throw std::domain_error("Input must be greater than 0");
		int res = 0;
		while (n != 1) {
			if (n & 1) // Check if n is odd using bitwise AND
				n = n * 3 + 1;
			else
				n >>= 1; // Use bitwise shift for division by 2
			++res;
		}
		return res;
	}
}  // namespace collatz_conjecture