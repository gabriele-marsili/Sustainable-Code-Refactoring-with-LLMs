#include "armstrong_numbers.h"
#include <vector>

namespace armstrong_numbers {
	bool	is_armstrong_number(const long n) {
		std::vector<long>	digits;
		digits.reserve(20);

		//	push digits to vector
		for (long tmp = n; tmp != 0; tmp /= 10)
			digits.push_back(tmp % 10);

		//	find sum of digits powered by their count
		long	sum = 0;
		for (int digit : digits) {
			long	pow = 1;
			for (size_t i = 0; i < digits.size(); i++)
				pow *= digit;
			sum += pow;
		}

		return (n == sum);
	}
}  // namespace armstrong_numbers
