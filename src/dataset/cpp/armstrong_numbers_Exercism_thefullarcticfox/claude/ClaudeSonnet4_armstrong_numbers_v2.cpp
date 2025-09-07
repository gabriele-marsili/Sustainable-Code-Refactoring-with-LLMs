#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
	bool	is_armstrong_number(const long n) {
		if (n < 0) return false;
		if (n < 10) return true;
		
		// Count digits and calculate sum in single pass
		long tmp = n;
		int digit_count = 0;
		long sum = 0;
		
		// First pass: count digits
		long temp = n;
		while (temp > 0) {
			digit_count++;
			temp /= 10;
		}
		
		// Second pass: calculate sum
		tmp = n;
		while (tmp > 0) {
			int digit = tmp % 10;
			sum += std::pow(digit, digit_count);
			tmp /= 10;
		}
		
		return (n == sum);
	}
}  // namespace armstrong_numbers