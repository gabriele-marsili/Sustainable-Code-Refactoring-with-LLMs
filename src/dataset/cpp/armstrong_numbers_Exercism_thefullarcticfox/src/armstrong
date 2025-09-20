#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
	bool is_armstrong_number(const long n) {
		// Calculate the number of digits
		int num_digits = (n == 0) ? 1 : static_cast<int>(std::log10(n) + 1);

		// Calculate the sum of digits raised to the power of num_digits
		long sum = 0;
		for (long tmp = n; tmp != 0; tmp /= 10) {
			int digit = tmp % 10;
			sum += std::pow(digit, num_digits);
			if (sum > n) return false; // Early exit if sum exceeds n
		}

		return (n == sum);
	}
}  // namespace armstrong_numbers