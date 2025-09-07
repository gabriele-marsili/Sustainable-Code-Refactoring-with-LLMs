#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
	bool	is_armstrong_number(const long n) {
		if (n < 0) return false;
		if (n < 10) return true;
		
		long tmp = n;
		int digit_count = 0;
		while (tmp > 0) {
			tmp /= 10;
			++digit_count;
		}
		
		long sum = 0;
		tmp = n;
		while (tmp > 0) {
			int digit = tmp % 10;
			sum += static_cast<long>(std::pow(digit, digit_count));
			tmp /= 10;
		}
		
		return (n == sum);
	}
}  // namespace armstrong_numbers