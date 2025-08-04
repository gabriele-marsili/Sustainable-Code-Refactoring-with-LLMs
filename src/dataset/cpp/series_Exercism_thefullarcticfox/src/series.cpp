#include "series.h"
#include <stdexcept>

namespace series {
	std::vector<int>	digits(const std::string& number) {
		std::vector<int>	res;
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

		std::vector< std::vector<int> >	res;
		for (size_t digit = 0; digit + digitcount <= number.size(); digit++)
			res.push_back(digits(number.substr(digit, digitcount)));
		return res;
	}
}  // namespace series
