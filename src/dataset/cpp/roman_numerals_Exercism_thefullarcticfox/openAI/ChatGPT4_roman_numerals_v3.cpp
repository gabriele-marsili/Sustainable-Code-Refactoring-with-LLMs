#include "roman_numerals.h"
#include <stdexcept>
#include <array>

namespace roman_numerals {
	std::string convert(int arabic_num) {
		if (arabic_num < 0)
			throw std::domain_error("less than zero");

		constexpr std::array<std::pair<int, const char*>, 13> roman_digits{{
			{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
			{100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
			{10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
		}};

		std::string res;
		for (const auto& [value, symbol] : roman_digits) {
			while (arabic_num >= value) {
				arabic_num -= value;
				res.append(symbol);
			}
		}

		return res;
	}
}  // namespace roman_numerals