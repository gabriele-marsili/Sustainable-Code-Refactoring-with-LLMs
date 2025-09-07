#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
	bool	is_armstrong_number(const long n) {
		if (n < 0) return false;
		if (n < 10) return true;
		
		// Count digits without storing them
		long temp = n;
		int digit_count = 0;
		while (temp > 0) {
			temp /= 10;
			digit_count++;
		}
		
		// Calculate sum of powers directly
		temp = n;
		long sum = 0;
		while (temp > 0) {
			int digit = temp % 10;
			sum += std::pow(digit, digit_count);
			temp /= 10;
		}
		
		return (n == sum);
	}
}  // namespace armstrong_numbers