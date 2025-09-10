#include "roman_numerals.h"
#include <stdexcept>
#include <string>

namespace roman_numerals {
	std::string convert(int arabic_num) {
		if (arabic_num <= 0) {
			if (arabic_num < 0) {
				throw std::domain_error("less than zero");
			}
			return "";
		}

		static constexpr struct {
			int value;
			const char* numeral;
		} roman_digits[] = {
			{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
			{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
			{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
		};

		std::string res;
		res.reserve(16); 

		for (const auto& digit : roman_digits) {
			while (arabic_num >= digit.value) {
				arabic_num -= digit.value;
				res += digit.numeral;
			}
		}

		return res;
	}
}  // namespace roman_numerals