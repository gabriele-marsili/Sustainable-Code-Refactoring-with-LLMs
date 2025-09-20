#include "luhn.h"
#include <cctype>

namespace luhn {
	bool valid(const std::string& str) {
		int sum = 0;
		int digit_count = 0;
		bool double_digit = false;

		for (auto it = str.rbegin(); it != str.rend(); ++it) {
			if (*it == ' ')
				continue;
			if (!std::isdigit(*it))
				return false;

			int digit = *it - '0';
			if (double_digit) {
				digit *= 2;
				if (digit > 9)
					digit -= 9;
			}
			sum += digit;
			double_digit = !double_digit;
			++digit_count;
		}

		return digit_count > 1 && sum % 10 == 0;
	}
}  // namespace luhn