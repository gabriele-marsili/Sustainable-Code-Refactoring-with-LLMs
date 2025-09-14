#include "series.h"
#include <stdexcept>

namespace series {
	std::vector<int>	digits(const std::string& number) {
		std::vector<int>	res;
		res.reserve(number.size());
		for (char digit : number) {
			if (!std::isdigit(digit))
				throw std::domain_error("not a digit in number");
			res.push_back(digit - '0');
		}
		return res;
	}

	std::vector< std::vector<int> >	slice(const std::string& number, unsigned int digitcount) {
		if (digitcount > number.size())
			throw std::domain_error("digitcount is bigger than length of number");

		const size_t slice_count = number.size() - digitcount + 1;
		std::vector< std::vector<int> >	res;
		res.reserve(slice_count);
		
		for (size_t digit = 0; digit <= number.size() - digitcount; digit++) {
			std::vector<int> slice_digits;
			slice_digits.reserve(digitcount);
			
			for (size_t i = digit; i < digit + digitcount; i++) {
				if (!std::isdigit(number[i]))
					throw std::domain_error("not a digit in number");
				slice_digits.push_back(number[i] - '0');
			}
			res.push_back(std::move(slice_digits));
		}
		return res;
	}
}