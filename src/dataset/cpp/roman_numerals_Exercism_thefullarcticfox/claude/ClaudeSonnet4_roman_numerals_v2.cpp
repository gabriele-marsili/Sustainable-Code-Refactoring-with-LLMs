#include "roman_numerals.h"
#include <stdexcept>

namespace roman_numerals {
	std::string	convert(int arabic_num) {
		if (arabic_num < 0)
			throw std::domain_error("less than zero");

		static constexpr int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
		static constexpr const char* numerals[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

		std::string res;
		res.reserve(32);
		
		for (int i = 0; i < 13; ++i) {
			int count = arabic_num / values[i];
			if (count > 0) {
				arabic_num -= count * values[i];
				for (int j = 0; j < count; ++j) {
					res += numerals[i];
				}
			}
		}

		return res;
	}
}  // namespace roman_numerals