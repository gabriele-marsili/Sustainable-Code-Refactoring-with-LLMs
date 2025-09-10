#include "series.h"
#include <stdexcept>
#include <algorithm>

namespace series {
	std::vector<int> digits(const std::string& number) {
		std::vector<int> res;
		res.reserve(number.size());
		std::transform(number.begin(), number.end(), std::back_inserter(res), [](char digit) {
			if (!std::isdigit(digit)) {
				throw std::domain_error("not a digit in number");
			}
			return digit - '0';
		});
		return res;
	}

	std::vector<std::vector<int>> slice(const std::string& number, unsigned int digitcount) {
		if (digitcount > number.size()) {
			throw std::domain_error("digitcount is bigger than length of number");
		}

		std::vector<std::vector<int>> res;
		res.reserve(number.size() - digitcount + 1);

		for (size_t digit = 0; digit + digitcount <= number.size(); ++digit) {
			std::vector<int> sub_digits;
			sub_digits.reserve(digitcount);
			for (size_t i = 0; i < digitcount; ++i) {
				char current_char = number[digit + i];
				if (!std::isdigit(current_char)) {
					throw std::domain_error("not a digit in number");
				}
				sub_digits.push_back(current_char - '0');
			}
			res.push_back(sub_digits);
		}
		return res;
	}
}  // namespace series