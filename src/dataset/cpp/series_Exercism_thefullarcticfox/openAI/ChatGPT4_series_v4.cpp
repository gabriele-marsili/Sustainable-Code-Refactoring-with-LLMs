#include "series.h"
#include <stdexcept>
#include <vector>
#include <cctype>

namespace series {
	std::vector<int> digits(const std::string& number) {
		std::vector<int> res;
		res.reserve(number.size());
		for (char digit : number) {
			if (!std::isdigit(digit))
				throw std::domain_error("not a digit in number");
			res.push_back(digit - '0');
		}
		return res;
	}

	std::vector<std::vector<int>> slice(const std::string& number, unsigned int digitcount) {
		if (digitcount > number.size())
			throw std::domain_error("digitcount is bigger than length of number");

		std::vector<std::vector<int>> res;
		res.reserve(number.size() - digitcount + 1);
		for (size_t digit = 0; digit + digitcount <= number.size(); ++digit) {
			std::vector<int> slice;
			slice.reserve(digitcount);
			for (size_t i = 0; i < digitcount; ++i) {
				char c = number[digit + i];
				if (!std::isdigit(c))
					throw std::domain_error("not a digit in number");
				slice.push_back(c - '0');
			}
			res.push_back(std::move(slice));
		}
		return res;
	}
}  // namespace series